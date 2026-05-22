import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет письмо с формы контактов на почту владельца блога."""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": cors_headers, "body": json.dumps({"error": "Method not allowed"})}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    email = body.get("email", "").strip()
    subject = body.get("subject", "Новое сообщение с сайта").strip()
    message = body.get("message", "").strip()

    if not name or not email or not message:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "Заполните все обязательные поля"})}

    smtp_host = os.environ["SMTP_HOST"]
    smtp_port = int(os.environ["SMTP_PORT"])
    smtp_user = os.environ["SMTP_USER"]
    smtp_pass = os.environ["SMTP_PASSWORD"]
    to_email = "sophira19@mail.ru"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"[Wanderlust] {subject}"
    msg["From"] = smtp_user
    msg["To"] = to_email
    msg["Reply-To"] = email

    html_body = f"""
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1a1208;">
      <div style="background: linear-gradient(135deg, #3a1e10, #7a3520); padding: 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; font-weight: 300; font-size: 28px; margin: 0; letter-spacing: 2px;">Wanderlust</h1>
        <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 6px 0 0; letter-spacing: 3px; text-transform: uppercase;">Новое сообщение с сайта</p>
      </div>
      <div style="background: #faf7f2; padding: 32px; border: 1px solid #e8e0d4; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; color: #8a7a6a; font-size: 12px; width: 80px; text-transform: uppercase; letter-spacing: 1px;">Имя</td>
            <td style="padding: 8px 0; font-size: 15px; font-weight: 500;">{name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #8a7a6a; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
            <td style="padding: 8px 0; font-size: 15px;"><a href="mailto:{email}" style="color: #7a3520; text-decoration: none;">{email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #8a7a6a; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Тема</td>
            <td style="padding: 8px 0; font-size: 15px;">{subject}</td>
          </tr>
        </table>
        <div style="background: white; border: 1px solid #e8e0d4; border-radius: 8px; padding: 20px;">
          <p style="color: #8a7a6a; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 12px;">Сообщение</p>
          <p style="font-size: 15px; line-height: 1.7; margin: 0; color: #2a1e12;">{message.replace(chr(10), '<br>')}</p>
        </div>
        <p style="margin-top: 24px; font-size: 12px; color: #b0a090; text-align: center;">
          Ответь напрямую на это письмо — ответ уйдёт на {email}
        </p>
      </div>
    </div>
    """

    msg.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP(smtp_host, smtp_port) as server:
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, to_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"success": True, "message": "Сообщение отправлено"})
    }
