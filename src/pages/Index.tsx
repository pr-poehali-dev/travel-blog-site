import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const SEND_CONTACT_URL = "https://functions.poehali.dev/5f75f1b3-4202-4325-b1a4-4e763112bb5b";

// ── Images ──────────────────────────────────────────────────────────────────
const IMG_HERO       = "https://cdn.poehali.dev/projects/5463dddc-ad3a-44df-9982-2b7a51790828/files/5099f093-06d1-445a-9214-a326084ed887.jpg";
const IMG_GEORGIA    = "https://cdn.poehali.dev/projects/5463dddc-ad3a-44df-9982-2b7a51790828/files/183909fb-079f-475b-9e76-b5ccab8f8f4f.jpg";
const IMG_SIENA      = "https://cdn.poehali.dev/projects/5463dddc-ad3a-44df-9982-2b7a51790828/files/4d73b0eb-2e3b-4415-81ea-bb99acb173f2.jpg";
const IMG_OCEAN      = "https://cdn.poehali.dev/projects/5463dddc-ad3a-44df-9982-2b7a51790828/files/6b464a79-123b-4517-9e6a-e41ac7e367b2.jpg";
const IMG_MOROCCO    = "https://cdn.poehali.dev/projects/5463dddc-ad3a-44df-9982-2b7a51790828/files/c1f40f49-549c-440b-8f6f-efe27d51e37c.jpg";
const IMG_ICELAND    = "https://cdn.poehali.dev/projects/5463dddc-ad3a-44df-9982-2b7a51790828/files/7ae2c150-c6b4-4e9a-8fa3-8f5682908e4f.jpg";
const IMG_PATAGONIA  = "https://cdn.poehali.dev/projects/5463dddc-ad3a-44df-9982-2b7a51790828/files/6bd09c05-d075-4bbd-b68f-b3f566f7a12a.jpg";
const IMG_BALI       = "https://cdn.poehali.dev/projects/5463dddc-ad3a-44df-9982-2b7a51790828/files/70ca6b98-02ef-413f-9f2f-c802f8d907ae.jpg";
const IMG_SAHARA     = "https://cdn.poehali.dev/projects/5463dddc-ad3a-44df-9982-2b7a51790828/files/efd885e7-66c9-4052-b41c-ba3eafba2a51.jpg";

type Section = "home" | "articles" | "about" | "contacts" | "map" | "routes";

const allArticles = [
  {
    id: 1, title: "Горные дороги Грузии", subtitle: "Тушети · 12 дней",
    category: "Кавказ", date: "Март 2024", image: IMG_GEORGIA,
    lead: "Каждый поворот открывает новую вершину. Дорога в Тушети — это не просто маршрут, это испытание и откровение одновременно.",
    body: "Тушети — высокогорный регион Грузии, отрезанный от мира большую часть года. Единственная дорога туда проходит через перевал Абано на высоте 2850 метров. Мы ехали ранним утром, когда облака ещё лежали в долине. На перевале остановились, и перед нами открылось нечто невозможное — бесконечные горные складки, уходящие к горизонту. Деревни Тушети до сих пор живут без постоянного электричества. Местные пьют чачу из деревянных кружек и рассказывают легенды о духах гор. Здесь понимаешь, что время — понятие относительное.",
    readTime: "8 мин", tag: "Горы",
  },
  {
    id: 2, title: "Лабиринты старой Сиены", subtitle: "Тоскана · 5 дней",
    category: "Европа", date: "Май 2024", image: IMG_SIENA,
    lead: "Средневековый город, где каждая улочка хранит историю. Терракота стен, запах розмарина и тишина послеполуденной жары.",
    body: "Сиена — единственный итальянский город, сохранивший средневековый облик почти без изменений. Туристы едут сюда ради знаменитой Пьяццы дель Кампо и скачек Палио, но настоящая Сиена прячется в переулках Терцо ди Камолья. Там нет толп. Только пожилые итальянцы, играющие в карты у порогов, кошки на подоконниках и запах свежеиспечённого хлеба из открытых окон. Я провёл там всё утро, заблудившись намеренно.",
    readTime: "6 мин", tag: "Города",
  },
  {
    id: 3, title: "Острова Андаманского моря", subtitle: "Таиланд · 18 дней",
    category: "Азия", date: "Январь 2024", image: IMG_OCEAN,
    lead: "Там, где заканчивается суша и начинается бирюза воды. Острова без туристов, рыбацкие деревни и закаты, меняющие восприятие мира.",
    body: "На Ко Либонг добираются только те, кто намеренно ищет тишину. Паром ходит дважды в день, на острове нет банкоматов и почти нет интернета. Зато есть дюгони — морские коровы, пасущиеся в водорослях у берега. Я арендовал мотобайк и объехал весь остров за два часа. Рыбаки угостили гриллованным тунцом прямо с лодки. Это и есть счастье в его самом простом виде.",
    readTime: "10 мин", tag: "Море",
  },
  {
    id: 4, title: "Марокко: запах специй и азан на рассвете", subtitle: "Марракеш · Фес · 14 дней",
    category: "Африка", date: "Февраль 2024", image: IMG_MOROCCO,
    lead: "Медина Феса — живой лабиринт, где кожевенные мастерские работают так же, как тысячу лет назад. Марокко не отпускает.",
    body: "Первое, что поражает в Марракеше — это звук. Азан с семи минаретов одновременно, торговцы, ослы, мотоциклы. Визуальный шум медины сначала пугает, но через день начинаешь в нём ориентироваться. Фес — совсем другой. Древнее, тише и гораздо более запутанный. Кожевенные мастерские Чуара работают с IX века. Запах — специфический. Но вид сверху, на разноцветные чаны с краской — один из самых необычных, что я видел в жизни.",
    readTime: "9 мин", tag: "Города",
  },
  {
    id: 5, title: "Северное сияние над чёрными пляжами", subtitle: "Исландия · 10 дней",
    category: "Европа", date: "Ноябрь 2023", image: IMG_ICELAND,
    lead: "Исландия зимой — это планета, которая не похожа на Землю. Лавовые поля, гейзеры и аврора над океаном.",
    body: "Мы видели северное сияние в первую же ночь. Просто вышли из машины на трассе 1, выключили фары — и небо начало танцевать. Зелёные волны сменялись фиолетовыми занавесами. Рядом шумел Атлантический океан. Через неделю я понял, что Исландия разная каждый день. Пляж Рейнисфьяра с чёрным песком и базальтовыми колоннами — абсолютно нереальное место. Кажется, что снимают Игру Престолов прямо сейчас.",
    readTime: "11 мин", tag: "Природа",
  },
  {
    id: 6, title: "На краю света: Патагония", subtitle: "Чили · Аргентина · 21 день",
    category: "Америка", date: "Октябрь 2023", image: IMG_PATAGONIA,
    lead: "Торрес-дель-Пайне — это когда слова заканчиваются и остаётся только молчание перед величием природы.",
    body: "Трек W в Торрес-дель-Пайне занимает пять дней. На рассвете третьего дня мы поднялись к башням. Два часа по булыжникам в темноте с фонариками — и вот оно. Три гранитные иглы, пронзающие небо, отражаются в ледяном озере. Ни единого звука, кроме ветра. В такие моменты понимаешь, зачем вообще ездить в такие дали. Патагония лечит от городского шума раз и навсегда.",
    readTime: "13 мин", tag: "Горы",
  },
  {
    id: 7, title: "Рисовые террасы Бали", subtitle: "Убуд · Тегаллаланг · 7 дней",
    category: "Азия", date: "Август 2023", image: IMG_BALI,
    lead: "Бали — это не только пляжи и вечеринки. В глубине острова живёт древняя культура, которая всё ещё дышит.",
    body: "Убуд меня удивил. Я ожидал туристический рай для цифровых кочевников — но нашёл живой индуистский город. Каждое утро хозяйка нашего гестхауса ставила у порога чанан — корзинку с лепестками и рисом для богов. Террасы Тегаллаланг на рассвете, когда нет никого — одно из самых красивых зрелищ на Земле. Зелёные ступени уходят вниз в туман, петухи орут вдалеке, и где-то играет гамелан.",
    readTime: "7 мин", tag: "Природа",
  },
  {
    id: 8, title: "Сахара: ночь под звёздами", subtitle: "Мерзуга, Марокко · 3 ночи",
    category: "Африка", date: "Февраль 2024", image: IMG_SAHARA,
    lead: "Три дня в пустыне — и ты понимаешь, что тишина бывает разной. В Сахаре она абсолютная.",
    body: "Мы добрались до лагеря на верблюдах, когда солнце уже касалось горизонта. Дюны окрасились в оранжевый, потом в красный. Ужинали под открытым небом. А потом выключили весь свет лагеря — и Млечный Путь стал виден так чётко, что хотелось достать руку и потрогать. Берберский проводник Ахмед показал нам созвездия и рассказал, как его дед ориентировался по ним в пустыне без компаса. Утром поднялись на дюну встречать рассвет. Этот час стоил всего путешествия.",
    readTime: "8 мин", tag: "Природа",
  },
];

const routes = [
  { id: 1, name: "Большое кавказское кольцо", countries: ["Грузия", "Армения", "Азербайджан"], duration: "21 день", difficulty: "Средняя", distance: "3 200 км", emoji: "🏔️" },
  { id: 2, name: "Тосканский путь", countries: ["Италия"], duration: "10 дней", difficulty: "Лёгкая", distance: "650 км", emoji: "🌿" },
  { id: 3, name: "Острова Юго-Восточной Азии", countries: ["Таиланд", "Малайзия", "Индонезия"], duration: "28 дней", difficulty: "Для авантюристов", distance: "~5 000 км", emoji: "🌊" },
  { id: 4, name: "Золотое кольцо Центральной Азии", countries: ["Узбекистан", "Казахстан", "Кыргызстан"], duration: "16 дней", difficulty: "Средняя", distance: "2 800 км", emoji: "🕌" },
  { id: 5, name: "Патагония: на краю света", countries: ["Чили", "Аргентина"], duration: "18 дней", difficulty: "Сложная", distance: "2 100 км", emoji: "🦅" },
  { id: 6, name: "Марокканский маршрут", countries: ["Марокко"], duration: "12 дней", difficulty: "Лёгкая", distance: "1 400 км", emoji: "🌅" },
];

const mapPins = [
  { id: 1, x: 62, y: 27, name: "Тушети, Грузия", visited: true },
  { id: 2, x: 51, y: 30, name: "Сиена, Италия", visited: true },
  { id: 3, x: 78, y: 57, name: "Андаманские о-ва", visited: true },
  { id: 4, x: 55, y: 20, name: "Исландия", visited: true },
  { id: 5, x: 30, y: 56, name: "Патагония", visited: true },
  { id: 6, x: 85, y: 64, name: "Новая Зеландия", visited: false },
  { id: 7, x: 68, y: 40, name: "Непал", visited: true },
  { id: 8, x: 25, y: 36, name: "Перу", visited: false },
  { id: 9, x: 56, y: 38, name: "Марокко", visited: true },
  { id: 10, x: 80, y: 47, name: "Бали, Индонезия", visited: true },
  { id: 11, x: 74, y: 22, name: "Токио, Япония", visited: true },
  { id: 12, x: 20, y: 30, name: "Мексика", visited: false },
  { id: 13, x: 90, y: 30, name: "Австралия", visited: false },
];

const TAGS = ["Все", "Горы", "Море", "Города", "Природа"];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("Все");
  const [scrollY, setScrollY] = useState(0);
  const [openArticle, setOpenArticle] = useState<typeof allArticles[0] | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenArticle(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const nav: { label: string; id: Section; icon: string }[] = [
    { label: "Home", id: "home", icon: "Home" },
    { label: "Articles", id: "articles", icon: "BookOpen" },
    { label: "Routes", id: "routes", icon: "Map" },
    { label: "Map", id: "map", icon: "Globe" },
    { label: "About", id: "about", icon: "Heart" },
    { label: "Contact", id: "contacts", icon: "Mail" },
  ];

  const filteredArticles = activeFilter === "Все" ? allArticles : allArticles.filter(a => a.tag === activeFilter);
  const navBg = scrollY > 60 || activeSection !== "home";

  async function handleSendForm(e: React.FormEvent) {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    try {
      const res = await fetch(SEND_CONTACT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFormSent(true);
        setContactForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setFormSent(false), 5000);
      } else {
        setFormError(data.error || "Ошибка отправки. Попробуйте позже.");
      }
    } catch {
      setFormError("Нет соединения с сервером. Попробуйте позже.");
    } finally {
      setFormLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background font-body">

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: navBg ? "rgba(250,247,242,0.96)" : "transparent",
          backdropFilter: navBg ? "blur(18px)" : "none",
          borderBottom: navBg ? "1px solid hsl(var(--border))" : "none",
        }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => setActiveSection("home")} className="flex items-center gap-2">
            <span className="font-display text-2xl font-light tracking-widest transition-colors duration-300"
              style={{ color: navBg ? "hsl(var(--foreground))" : "white" }}>
              Wanderlust
            </span>
            <span className="text-xs opacity-50 mt-1 transition-colors duration-300"
              style={{ color: navBg ? "hsl(var(--muted-foreground))" : "rgba(255,255,255,0.55)" }}>✦</span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map(item => (
              <button key={item.id} onClick={() => setActiveSection(item.id)}
                className="story-link text-sm font-body font-medium tracking-wide transition-all duration-200"
                style={{ color: navBg ? "hsl(var(--foreground))" : "white", opacity: activeSection === item.id ? 1 : 0.55 }}>
                {item.label}
              </button>
            ))}
          </nav>

          <button className="md:hidden transition-colors duration-300" onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: navBg ? "hsl(var(--foreground))" : "white" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-1">
            {nav.map(item => (
              <button key={item.id} onClick={() => { setActiveSection(item.id); setMenuOpen(false); }}
                className="flex items-center gap-3 text-left py-3 border-b border-border/50 last:border-0">
                <Icon name={item.icon} size={16} style={{ color: "hsl(var(--terra))" }} />
                <span className="font-body text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ARTICLE MODAL */}
      {openArticle && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6"
          style={{ background: "rgba(10,6,2,0.78)", backdropFilter: "blur(10px)" }}
          onClick={() => setOpenArticle(null)}>
          <div className="bg-background w-full md:max-w-2xl md:rounded-2xl overflow-hidden max-h-[90vh] flex flex-col"
            style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.45)" }}
            onClick={e => e.stopPropagation()}>
            <div className="relative h-72 flex-shrink-0">
              <img src={openArticle.image} alt={openArticle.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)" }} />
              <button onClick={() => setOpenArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/35 transition-colors backdrop-blur-sm text-white">
                <Icon name="X" size={16} />
              </button>
              <div className="absolute bottom-5 left-6">
                <span className="px-3 py-1 text-xs font-medium rounded-full text-white"
                  style={{ background: "hsl(var(--terra))" }}>{openArticle.category}</span>
              </div>
            </div>
            <div className="p-8 overflow-y-auto">
              <p className="text-xs text-muted-foreground mb-2">{openArticle.date} · {openArticle.readTime}</p>
              <h2 className="font-display text-3xl font-light mb-1">{openArticle.title}</h2>
              <p className="text-sm text-muted-foreground mb-5">{openArticle.subtitle}</p>
              <p className="text-foreground/80 leading-relaxed mb-4 italic font-display text-lg">{openArticle.lead}</p>
              <p className="text-foreground/70 leading-relaxed text-sm font-body">{openArticle.body}</p>
            </div>
          </div>
        </div>
      )}

      {/* ════ HOME ════ */}
      {activeSection === "home" && (
        <>
          <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
            <div className="absolute inset-0">
              <img src={IMG_HERO} alt="Japan cherry blossoms" className="w-full h-full object-cover"
                style={{ transform: `translateY(${scrollY * 0.25}px) scale(1.1)` }} />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(10,6,2,0.92) 0%, rgba(10,6,2,0.3) 55%, rgba(10,6,2,0.05) 100%)" }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
              <div className="max-w-3xl">
                <p className="text-sm tracking-[0.35em] text-white/45 mb-6 animate-fade-up font-body uppercase">
                  A personal travel journal
                </p>
                <h1 className="font-display text-6xl md:text-8xl text-white font-light leading-none mb-6 animate-fade-up animate-fade-up-delay-1">
                  The world seen
                  <br />
                  <em className="italic" style={{ color: "hsl(38 60% 75%)" }}>through the road</em>
                </h1>
                <p className="text-white/60 text-lg md:text-xl max-w-xl mb-10 animate-fade-up animate-fade-up-delay-2 font-body font-light leading-relaxed">
                  Stories, routes and discoveries from travels across mountains, oceans and ancient cities of the world.
                </p>
                <div className="flex flex-wrap items-center gap-5 animate-fade-up animate-fade-up-delay-3">
                  <button onClick={() => setActiveSection("articles")}
                    className="px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-200 hover:opacity-85 rounded-sm"
                    style={{ background: "hsl(var(--terra))", color: "hsl(var(--primary-foreground))" }}>
                    Read Articles
                  </button>
                  <button onClick={() => setActiveSection("map")}
                    className="flex items-center gap-2 text-white/65 text-sm font-medium hover:text-white transition-colors">
                    <Icon name="Globe" size={16} /><span>Explore Map</span>
                  </button>
                  <button onClick={() => setActiveSection("routes")}
                    className="flex items-center gap-2 text-white/65 text-sm font-medium hover:text-white transition-colors">
                    <Icon name="Route" size={16} /><span>Browse Routes</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 scroll-bounce">
              <Icon name="ChevronDown" size={20} className="text-white/25" />
            </div>
          </section>

          <section className="bg-background py-16 border-b border-border">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[{ value: "47", label: "стран" }, { value: "128", label: "статей" }, { value: "12 000", label: "км маршрутов" }, { value: "8", label: "лет в дороге" }].map(s => (
                  <div key={s.label}>
                    <div className="font-display text-5xl md:text-6xl font-light" style={{ color: "hsl(var(--terra))" }}>{s.value}</div>
                    <div className="text-sm text-muted-foreground mt-1 tracking-wide">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 px-6 max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">Latest posts</p>
                <h2 className="font-display text-4xl md:text-5xl font-light">Fresh Stories</h2>
              </div>
              <button onClick={() => setActiveSection("articles")}
                className="hidden md:flex items-center gap-2 story-link text-sm text-muted-foreground hover:text-foreground transition-colors">
                All articles <Icon name="ArrowRight" size={14} />
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {allArticles.slice(0, 3).map(article => (
                <article key={article.id} onClick={() => setOpenArticle(article)}
                  className="card-hover group cursor-pointer rounded-xl overflow-hidden bg-card border border-border">
                  <div className="relative h-56 overflow-hidden">
                    <img src={article.image} alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full"
                      style={{ background: "hsl(var(--terra))", color: "white" }}>{article.category}</span>
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-muted-foreground mb-2">{article.date} · {article.readTime}</p>
                    <h3 className="font-display text-2xl font-light mb-2 leading-tight group-hover:opacity-70 transition-opacity">{article.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{article.lead}</p>
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-medium" style={{ color: "hsl(var(--terra))" }}>
                      <span>Read more</span><Icon name="ArrowRight" size={11} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="py-28 relative overflow-hidden" style={{ background: "hsl(var(--indigo-deep))" }}>
            <div className="absolute inset-0 pointer-events-none opacity-10">
              {[600, 400, 220].map(s => (
                <div key={s} className="absolute top-1/2 left-1/2 rounded-full border border-white/30"
                  style={{ width: s, height: s, transform: "translate(-50%,-50%)" }} />
              ))}
            </div>
            <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
              <p className="font-display text-4xl md:text-5xl text-white font-light italic leading-relaxed mb-10">
                «Путешествие — это не место, куда ты едешь. Это то, кем ты становишься в пути.»
              </p>
              <div className="w-12 h-px bg-white/20 mx-auto mb-6" />
              <p className="text-white/35 text-xs tracking-[0.4em] uppercase">Wanderlust · 2024</p>
            </div>
          </section>

          <section className="py-20 px-6 max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">For inspiration</p>
                <h2 className="font-display text-4xl md:text-5xl font-light">Routes</h2>
              </div>
              <button onClick={() => setActiveSection("routes")}
                className="hidden md:flex items-center gap-2 story-link text-sm text-muted-foreground hover:text-foreground transition-colors">
                All routes <Icon name="ArrowRight" size={14} />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {routes.slice(0, 2).map(route => (
                <div key={route.id} onClick={() => setActiveSection("routes")}
                  className="card-hover relative rounded-xl overflow-hidden p-8 cursor-pointer"
                  style={{ background: "linear-gradient(135deg, hsl(230 35% 18%), hsl(16 45% 32%))" }}>
                  <div className="text-4xl mb-4">{route.emoji}</div>
                  <h3 className="font-display text-2xl text-white font-light mb-2">{route.name}</h3>
                  <p className="text-white/50 text-sm mb-6">{route.countries.join(" · ")}</p>
                  <div className="flex items-center gap-6 text-sm text-white/65">
                    <span className="flex items-center gap-1.5"><Icon name="Clock" size={13} />{route.duration}</span>
                    <span className="flex items-center gap-1.5"><Icon name="Route" size={13} />{route.distance}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ════ ARTICLES ════ */}
      {activeSection === "articles" && (
        <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">All publications</p>
            <h1 className="font-display text-5xl md:text-7xl font-light mb-8">Articles</h1>
            <div className="flex gap-3 flex-wrap">
              {TAGS.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className="px-5 py-2 rounded-full text-sm font-body transition-all duration-200"
                  style={activeFilter === f
                    ? { background: "hsl(var(--terra))", color: "white" }
                    : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, i) => (
              <article key={article.id} onClick={() => setOpenArticle(article)}
                className="card-hover group cursor-pointer rounded-xl overflow-hidden bg-card border border-border animate-fade-up"
                style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="relative h-60 overflow-hidden">
                  <img src={article.image} alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)" }} />
                  <span className="absolute bottom-4 left-4 px-3 py-1 text-xs font-medium rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/20">
                    {article.tag}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <span className="font-medium" style={{ color: "hsl(var(--terra))" }}>{article.category}</span>
                    <span>·</span><span>{article.date}</span><span>·</span><span>{article.readTime}</span>
                  </div>
                  <h2 className="font-display text-2xl font-light mb-2 leading-tight">{article.title}</h2>
                  <p className="text-xs text-muted-foreground mb-3">{article.subtitle}</p>
                  <p className="text-sm text-foreground/65 leading-relaxed line-clamp-3">{article.lead}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-medium" style={{ color: "hsl(var(--terra))" }}>
                    <span>Читать далее</span><Icon name="ArrowRight" size={11} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-24 text-muted-foreground">
              <div className="text-5xl mb-4">📭</div>
              <p className="font-display text-2xl font-light">Нет статей в этой категории</p>
            </div>
          )}
        </div>
      )}

      {/* ════ ROUTES ════ */}
      {activeSection === "routes" && (
        <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">Curated routes</p>
            <h1 className="font-display text-5xl md:text-7xl font-light">Routes</h1>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {routes.map((route, i) => (
              <div key={route.id} className="card-hover rounded-xl overflow-hidden border border-border bg-card animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="p-8" style={{ background: "linear-gradient(135deg, hsl(230 35% 18%) 0%, hsl(16 45% 32%) 100%)" }}>
                  <div className="text-5xl mb-4">{route.emoji}</div>
                  <h2 className="font-display text-3xl text-white font-light mb-2">{route.name}</h2>
                  <p className="text-white/50 text-sm">{route.countries.join(" · ")}</p>
                </div>
                <div className="p-6 grid grid-cols-3 gap-4 border-b border-border">
                  {[
                    { icon: "Clock", label: "Длительность", value: route.duration },
                    { icon: "Route", label: "Расстояние", value: route.distance },
                    { icon: "BarChart2", label: "Сложность", value: route.difficulty },
                  ].map(item => (
                    <div key={item.label} className="text-center">
                      <Icon name={item.icon} size={16} className="mx-auto mb-2 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                      <p className="text-sm font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-4 flex gap-3">
                  <button onClick={() => setActiveSection("map")}
                    className="flex-1 py-2.5 text-sm font-medium border rounded-lg transition-all duration-200 hover:opacity-70"
                    style={{ borderColor: "hsl(var(--terra))", color: "hsl(var(--terra))" }}>
                    На карте
                  </button>
                  <button onClick={() => setActiveSection("contacts")}
                    className="flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 hover:opacity-85"
                    style={{ background: "hsl(var(--terra))", color: "hsl(var(--primary-foreground))" }}>
                    Спросить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════ MAP ════ */}
      {activeSection === "map" && (
        <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">Interactive</p>
            <h1 className="font-display text-5xl md:text-7xl font-light mb-3">Travel Map</h1>
            <p className="text-muted-foreground text-sm">Наводи на точку, чтобы увидеть место. Оранжевые — посещены, белые — в планах.</p>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/10"
            style={{
              background: "linear-gradient(160deg, hsl(230 40% 14%) 0%, hsl(220 35% 9%) 100%)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.4)"
            }}>

            {/* Grid lines overlay */}
            <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "40px 40px"
              }} />

            {/* Warm glow */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 65% 55% at 62% 45%, rgba(190,110,60,0.07) 0%, transparent 70%)" }} />

            <div className="relative" style={{ paddingBottom: "54%" }}>
              <svg viewBox="0 0 100 54" className="absolute inset-0 w-full h-full">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="0.5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                {/* Americas */}
                <path filter="url(#glow)" d="M16,12 Q20,8 24,10 Q26,15 24,20 Q22,28 18,32 Q14,36 12,30 Q10,24 12,18 Z"
                  fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.2" />
                <path filter="url(#glow)" d="M18,34 Q24,30 30,36 Q32,44 28,50 Q22,53 18,48 Q14,42 18,34 Z"
                  fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.2" />
                {/* Europe */}
                <path filter="url(#glow)" d="M46,10 Q52,7 57,10 Q59,14 56,18 Q52,20 48,18 Q44,15 46,10 Z"
                  fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.2" />
                {/* Africa */}
                <path filter="url(#glow)" d="M48,20 Q56,17 60,22 Q62,30 58,40 Q54,48 48,46 Q43,42 43,34 Q43,25 48,20 Z"
                  fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.22)" strokeWidth="0.2" />
                {/* Asia */}
                <path filter="url(#glow)" d="M58,8 Q72,4 85,9 Q92,14 93,24 Q90,34 83,38 Q72,42 62,36 Q55,30 56,20 Q57,12 58,8 Z"
                  fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.22)" strokeWidth="0.2" />
                {/* Australia */}
                <path filter="url(#glow)" d="M80,44 Q88,40 93,44 Q95,50 90,53 Q82,54 78,50 Q77,46 80,44 Z"
                  fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.2" />
                {/* Dashed lat lines */}
                {[18, 28, 38, 48].map(y => (
                  <line key={y} x1="5" y1={y} x2="95" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.15" strokeDasharray="1.5 2.5" />
                ))}
                {/* Dashed lon lines */}
                {[20, 40, 60, 80].map(x => (
                  <line key={x} x1={x} y1="5" x2={x} y2="49" stroke="rgba(255,255,255,0.06)" strokeWidth="0.15" strokeDasharray="1.5 2.5" />
                ))}
              </svg>

              {/* Pins */}
              {mapPins.map(pin => (
                <div key={pin.id} className="absolute cursor-pointer"
                  style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: "translate(-50%,-50%)" }}
                  onMouseEnter={() => setHoveredPin(pin.id)}
                  onMouseLeave={() => setHoveredPin(null)}>

                  {pin.visited && (
                    <div className="absolute rounded-full animate-ping"
                      style={{ inset: -5, border: "1.5px solid hsl(var(--terra))", opacity: 0.3, animationDuration: "2.5s" }} />
                  )}

                  <div className="relative w-3.5 h-3.5 rounded-full border-2 transition-all duration-200"
                    style={{
                      transform: hoveredPin === pin.id ? "scale(1.9)" : "scale(1)",
                      background: pin.visited ? "hsl(var(--terra))" : "transparent",
                      borderColor: pin.visited ? "hsl(var(--terra))" : "rgba(255,255,255,0.5)",
                      boxShadow: pin.visited ? "0 0 10px hsl(var(--terra) / 0.7)" : "none",
                    }} />

                  {hoveredPin === pin.id && (
                    <div className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium z-20"
                      style={{ background: "white", color: "hsl(var(--foreground))", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
                      {pin.visited ? "✓ " : "○ "}{pin.name}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent" style={{ borderTopColor: "white" }} />
                    </div>
                  )}
                </div>
              ))}

              {/* Counter badge */}
              <div className="absolute top-5 right-5 px-4 py-2 rounded-xl text-sm font-medium"
                style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span style={{ color: "hsl(var(--terra))" }}>{mapPins.filter(p => p.visited).length}</span> / {mapPins.length} мест посещено
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-8 justify-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-3 h-3 rounded-full" style={{ background: "hsl(var(--terra))" }} />
              Посещено
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-3 h-3 rounded-full border-2 border-muted-foreground/50" />
              В планах
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display text-3xl font-light mb-5">Посещённые места</h2>
              <div className="flex flex-wrap gap-2">
                {mapPins.filter(p => p.visited).map(pin => (
                  <span key={pin.id} className="px-4 py-2 rounded-full text-sm border border-border bg-card flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: "hsl(var(--terra))" }} />
                    {pin.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-display text-3xl font-light mb-5">Хочу посетить</h2>
              <div className="flex flex-wrap gap-2">
                {mapPins.filter(p => !p.visited).map(pin => (
                  <span key={pin.id} className="px-4 py-2 rounded-full text-sm border border-border bg-card flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full border border-muted-foreground/50" />
                    {pin.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════ ABOUT ════ */}
      {activeSection === "about" && (
        <div className="pt-28 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">The story</p>
                <h1 className="font-display text-5xl md:text-6xl font-light mb-8">About</h1>
                <p className="text-foreground/70 leading-relaxed mb-5">
                  «Wanderlust» — это личный блог, который начался как бумажный дневник в рюкзаке, а стал местом для всех, кто слышит зов дороги.
                </p>
                <p className="text-foreground/70 leading-relaxed mb-5">
                  Здесь нет идеальных travel-фото и рекламных интеграций. Только честные истории о том, как ломаются планы, открываются случайные таверны и встречаются люди, меняющие взгляд на мир.
                </p>
                <p className="text-foreground/70 leading-relaxed mb-10">
                  8 лет в дороге. 47 стран. 128 историй. И ни единого желания остановиться.
                </p>
                <div className="flex gap-6">
                  {[{ icon: "Instagram", label: "Instagram" }, { icon: "Send", label: "Telegram" }, { icon: "Youtube", label: "YouTube" }].map(s => (
                    <button key={s.label} onClick={() => setActiveSection("contacts")}
                      className="flex items-center gap-2 text-sm story-link text-muted-foreground hover:text-foreground transition-colors">
                      <Icon name={s.icon} size={16} /><span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden h-96 md:h-[520px]">
                  <img src={IMG_BALI} alt="Travel" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 p-6 bg-card border border-border rounded-xl shadow-lg">
                  <p className="font-display text-3xl font-light" style={{ color: "hsl(var(--terra))" }}>47</p>
                  <p className="text-sm text-muted-foreground">стран изучено</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-28" style={{ background: "hsl(var(--muted))" }}>
            <div className="max-w-7xl mx-auto px-6 py-16">
              <h2 className="font-display text-3xl font-light mb-12 text-center">Принципы блога</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: "Eye", title: "Честность", desc: "Рассказываю о путешествиях без прикрас — с трудностями, ошибками и неожиданными открытиями." },
                  { icon: "Leaf", title: "Устойчивость", desc: "Стараюсь путешествовать осознанно — поддерживая локальный бизнес и бережно относясь к природе." },
                  { icon: "Users", title: "Люди", desc: "Самое интересное в любом месте — это люди. Их истории, кухня и взгляд на жизнь." },
                ].map(v => (
                  <div key={v.title} className="text-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: "hsl(var(--terra) / 0.12)" }}>
                      <Icon name={v.icon} size={20} style={{ color: "hsl(var(--terra))" }} />
                    </div>
                    <h3 className="font-display text-xl font-light mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════ CONTACTS ════ */}
      {activeSection === "contacts" && (
        <div className="pt-28 pb-20 px-6 max-w-3xl mx-auto">
          <div className="mb-14">
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">Get in touch</p>
            <h1 className="font-display text-5xl md:text-7xl font-light mb-4">Contact</h1>
            <p className="text-muted-foreground leading-relaxed">
              Рад общению с другими путешественниками. Пишите по любому поводу — сотрудничество, совет по маршруту или просто поговорить о дороге.
            </p>
          </div>

          <div className="grid gap-4 mb-12">
            {[
              { icon: "Mail", label: "Email", value: "hello@wanderlust.ru", href: "mailto:hello@wanderlust.ru" },
              { icon: "Send", label: "Telegram", value: "@wanderlust_travel", href: "https://t.me/wanderlust_travel" },
              { icon: "Instagram", label: "Instagram", value: "@wanderlust.travel", href: "https://instagram.com" },
            ].map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card card-hover group">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "hsl(var(--terra) / 0.1)" }}>
                  <Icon name={c.icon} size={18} style={{ color: "hsl(var(--terra))" }} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  <p className="font-medium">{c.value}</p>
                </div>
                <Icon name="ArrowRight" size={14} className="ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </a>
            ))}
          </div>

          <form onSubmit={handleSendForm} className="bg-card border border-border rounded-2xl p-8">
            <h2 className="font-display text-2xl font-light mb-6">Написать сообщение</h2>

            {formSent && (
              <div className="mb-6 px-4 py-3 rounded-lg text-sm flex items-center gap-2"
                style={{ background: "hsl(var(--terra) / 0.1)", color: "hsl(var(--terra))", border: "1px solid hsl(var(--terra) / 0.2)" }}>
                <Icon name="CheckCircle" size={16} />
                Сообщение отправлено! Отвечу в течение 24 часов.
              </div>
            )}
            {formError && (
              <div className="mb-6 px-4 py-3 rounded-lg text-sm flex items-center gap-2"
                style={{ background: "hsl(0 80% 95%)", color: "hsl(0 70% 40%)", border: "1px solid hsl(0 70% 85%)" }}>
                <Icon name="AlertCircle" size={16} />
                {formError}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Ваше имя</label>
                  <input type="text" required placeholder="Александр" value={contactForm.name}
                    onChange={e => setContactForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
                  <input type="email" required placeholder="alex@example.com" value={contactForm.email}
                    onChange={e => setContactForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Тема</label>
                <input type="text" placeholder="Вопрос по маршруту в Грузию" value={contactForm.subject}
                  onChange={e => setContactForm(p => ({ ...p, subject: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Сообщение</label>
                <textarea rows={5} required placeholder="Ваше сообщение..." value={contactForm.message}
                  onChange={e => setContactForm(p => ({ ...p, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none resize-none" />
              </div>
              <button type="submit" disabled={formLoading}
                className="w-full py-3.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: "hsl(var(--terra))", color: "hsl(var(--primary-foreground))" }}>
                {formLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Отправляем...
                  </>
                ) : "Отправить сообщение"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-border py-10 px-6" style={{ background: "hsl(var(--foreground))" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-display text-2xl font-light text-white/80">Wanderlust</p>
          <nav className="flex flex-wrap justify-center gap-6">
            {nav.map(item => (
              <button key={item.id} onClick={() => setActiveSection(item.id)}
                className="text-sm text-white/40 hover:text-white/80 transition-colors font-body">
                {item.label}
              </button>
            ))}
          </nav>
          <p className="text-xs text-white/25 font-body">© 2024 Wanderlust</p>
        </div>
      </footer>
    </div>
  );
}