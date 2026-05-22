import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/5463dddc-ad3a-44df-9982-2b7a51790828/files/183909fb-079f-475b-9e76-b5ccab8f8f4f.jpg";
const IMG_MEDITERRANEAN = "https://cdn.poehali.dev/projects/5463dddc-ad3a-44df-9982-2b7a51790828/files/4d73b0eb-2e3b-4415-81ea-bb99acb173f2.jpg";
const IMG_OCEAN = "https://cdn.poehali.dev/projects/5463dddc-ad3a-44df-9982-2b7a51790828/files/6b464a79-123b-4517-9e6a-e41ac7e367b2.jpg";

type Section = "home" | "articles" | "about" | "contacts" | "map" | "routes";

const articles = [
  {
    id: 1,
    title: "Горные дороги Грузии",
    subtitle: "Тушети · 12 дней",
    category: "Кавказ",
    date: "Март 2024",
    image: HERO_IMAGE,
    lead: "Каждый поворот открывает новую вершину. Дорога в Тушети — это не просто маршрут, это испытание и откровение одновременно.",
    readTime: "8 мин",
    tag: "Горы",
  },
  {
    id: 2,
    title: "Лабиринты старой Сиены",
    subtitle: "Тоскана · 5 дней",
    category: "Европа",
    date: "Май 2024",
    image: IMG_MEDITERRANEAN,
    lead: "Средневековый город, где каждая улочка хранит историю. Терракота стен, запах розмарина и тишина послеполуденной жары.",
    readTime: "6 мин",
    tag: "Города",
  },
  {
    id: 3,
    title: "Острова Андаманского моря",
    subtitle: "Таиланд · 18 дней",
    category: "Азия",
    date: "Январь 2024",
    image: IMG_OCEAN,
    lead: "Там, где заканчивается суша и начинается бирюза воды. Острова без туристов, рыбацкие деревни и закаты, меняющие восприятие мира.",
    readTime: "10 мин",
    tag: "Море",
  },
];

const routes = [
  {
    id: 1,
    name: "Большое кавказское кольцо",
    countries: ["Грузия", "Армения", "Азербайджан"],
    duration: "21 день",
    difficulty: "Средняя",
    distance: "3 200 км",
    emoji: "🏔️",
  },
  {
    id: 2,
    name: "Тосканский путь",
    countries: ["Италия"],
    duration: "10 дней",
    difficulty: "Лёгкая",
    distance: "650 км",
    emoji: "🌿",
  },
  {
    id: 3,
    name: "Острова Юго-Восточной Азии",
    countries: ["Таиланд", "Малайзия", "Индонезия"],
    duration: "28 дней",
    difficulty: "Для авантюристов",
    distance: "~5 000 км",
    emoji: "🌊",
  },
  {
    id: 4,
    name: "Золотое кольцо Центральной Азии",
    countries: ["Узбекистан", "Казахстан", "Кыргызстан"],
    duration: "16 дней",
    difficulty: "Средняя",
    distance: "2 800 км",
    emoji: "🕌",
  },
];

const mapPins = [
  { id: 1, x: 62, y: 28, name: "Тушети, Грузия", visited: true },
  { id: 2, x: 51, y: 30, name: "Сиена, Италия", visited: true },
  { id: 3, x: 78, y: 58, name: "Андаманские о-ва", visited: true },
  { id: 4, x: 55, y: 22, name: "Исландия", visited: false },
  { id: 5, x: 30, y: 55, name: "Патагония", visited: false },
  { id: 6, x: 85, y: 65, name: "Новая Зеландия", visited: false },
  { id: 7, x: 68, y: 42, name: "Непал", visited: true },
  { id: 8, x: 25, y: 35, name: "Перу", visited: false },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("Все");
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  const nav: { label: string; id: Section; icon: string }[] = [
    { label: "Главная", id: "home", icon: "Home" },
    { label: "Статьи", id: "articles", icon: "BookOpen" },
    { label: "Маршруты", id: "routes", icon: "Map" },
    { label: "Карта", id: "map", icon: "Globe" },
    { label: "О блоге", id: "about", icon: "Heart" },
    { label: "Контакты", id: "contacts", icon: "Mail" },
  ];

  const filters = ["Все", "Горы", "Море", "Города"];
  const filteredArticles =
    activeFilter === "Все"
      ? articles
      : articles.filter((a) => a.tag === activeFilter);

  const navBg = scrollY > 60 || activeSection !== "home";

  return (
    <div className="min-h-screen bg-background font-body">
      {/* NAV */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: navBg ? "rgba(250,247,242,0.95)" : "transparent",
          backdropFilter: navBg ? "blur(16px)" : "none",
          borderBottom: navBg ? "1px solid hsl(var(--border))" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setActiveSection("home")}
            className="flex items-center gap-2 group"
          >
            <span
              className="font-display text-2xl font-light tracking-wider transition-colors duration-300"
              style={{ color: navBg ? "hsl(var(--foreground))" : "white" }}
            >
              Странствия
            </span>
            <span
              className="text-xs opacity-60 mt-1 transition-colors duration-300"
              style={{ color: navBg ? "hsl(var(--muted-foreground))" : "rgba(255,255,255,0.7)" }}
            >
              ✦
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className="story-link text-sm font-body font-medium tracking-wide transition-all duration-200"
                style={{
                  color: navBg ? "hsl(var(--foreground))" : "white",
                  opacity: activeSection === item.id ? 1 : 0.6,
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden transition-colors duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: navBg ? "hsl(var(--foreground))" : "white" }}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-1 animate-fade-in">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-3 text-left py-3 border-b border-border/50 last:border-0"
              >
                <Icon name={item.icon} size={16} style={{ color: "hsl(var(--terra))" }} />
                <span className="font-body text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ===== HOME ===== */}
      {activeSection === "home" && (
        <>
          {/* HERO */}
          <section
            ref={heroRef}
            className="relative h-screen flex items-end overflow-hidden"
          >
            <div className="absolute inset-0">
              <img
                src={HERO_IMAGE}
                alt="Горная дорога"
                className="w-full h-full object-cover"
                style={{ transform: `translateY(${scrollY * 0.25}px) scale(1.1)` }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,6,2,0.88) 0%, rgba(10,6,2,0.25) 55%, rgba(10,6,2,0.05) 100%)",
                }}
              />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
              <div className="max-w-3xl">
                <p className="text-sm tracking-[0.35em] text-white/50 mb-6 animate-fade-up font-body uppercase">
                  Личный дневник путешествий
                </p>
                <h1 className="font-display text-6xl md:text-8xl text-white font-light leading-none mb-6 animate-fade-up animate-fade-up-delay-1">
                  Мир через
                  <br />
                  <em className="italic" style={{ color: "hsl(38 60% 75%)" }}>
                    призму дороги
                  </em>
                </h1>
                <p className="text-white/65 text-lg md:text-xl max-w-xl mb-10 animate-fade-up animate-fade-up-delay-2 font-body font-light leading-relaxed">
                  Истории, маршруты и открытия из путешествий по горам, морям
                  и древним городам планеты.
                </p>
                <div className="flex items-center gap-6 animate-fade-up animate-fade-up-delay-3">
                  <button
                    onClick={() => setActiveSection("articles")}
                    className="px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-200 hover:opacity-90 rounded-sm"
                    style={{
                      background: "hsl(var(--terra))",
                      color: "hsl(var(--primary-foreground))",
                    }}
                  >
                    Читать статьи
                  </button>
                  <button
                    onClick={() => setActiveSection("map")}
                    className="flex items-center gap-2 text-white/70 text-sm font-medium hover:text-white transition-colors"
                  >
                    <Icon name="Globe" size={16} />
                    <span>Открыть карту</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5">
              <div className="scroll-bounce">
                <Icon name="ChevronDown" size={20} className="text-white/30" />
              </div>
            </div>
          </section>

          {/* STATS */}
          <section className="bg-background py-16 border-b border-border">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { value: "47", label: "стран" },
                  { value: "128", label: "статей" },
                  { value: "12 000", label: "км маршрутов" },
                  { value: "8", label: "лет в дороге" },
                ].map((s) => (
                  <div key={s.label}>
                    <div
                      className="font-display text-5xl md:text-6xl font-light"
                      style={{ color: "hsl(var(--terra))" }}
                    >
                      {s.value}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 font-body tracking-wide">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FEATURED ARTICLES */}
          <section className="py-20 px-6 max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">
                  Недавние публикации
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-light">
                  Свежие истории
                </h2>
              </div>
              <button
                onClick={() => setActiveSection("articles")}
                className="hidden md:flex items-center gap-2 story-link text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Все статьи <Icon name="ArrowRight" size={14} />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {articles.map((article, i) => (
                <article
                  key={article.id}
                  className="card-hover group cursor-pointer rounded-xl overflow-hidden bg-card border border-border"
                  onClick={() => setActiveSection("articles")}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span
                      className="absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full"
                      style={{
                        background: "hsl(var(--terra))",
                        color: "white",
                      }}
                    >
                      {article.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
                      <span>{article.date}</span>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </p>
                    <h3 className="font-display text-2xl font-light mb-3 leading-tight group-hover:opacity-70 transition-opacity">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {article.lead}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* QUOTE */}
          <section
            className="py-28 relative overflow-hidden"
            style={{ background: "hsl(var(--indigo-deep))" }}
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/20" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-white/20" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full border border-white/20" />
            </div>
            <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
              <p className="font-display text-4xl md:text-5xl text-white font-light italic leading-relaxed mb-10">
                «Путешествие — это не место, куда ты едешь. Это то, кем ты
                становишься в пути.»
              </p>
              <div className="w-12 h-px bg-white/20 mx-auto mb-6" />
              <p className="text-white/40 text-xs tracking-[0.4em] uppercase font-body">
                Странствия · 2024
              </p>
            </div>
          </section>

          {/* ROUTES PREVIEW */}
          <section className="py-20 px-6 max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">
                  Для вдохновения
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-light">
                  Маршруты
                </h2>
              </div>
              <button
                onClick={() => setActiveSection("routes")}
                className="hidden md:flex items-center gap-2 story-link text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Все маршруты <Icon name="ArrowRight" size={14} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {routes.slice(0, 2).map((route) => (
                <div
                  key={route.id}
                  className="card-hover relative rounded-xl overflow-hidden p-8 cursor-pointer group"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(230 35% 18%), hsl(16 45% 32%))",
                  }}
                  onClick={() => setActiveSection("routes")}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-white" />
                  <div className="text-4xl mb-4">{route.emoji}</div>
                  <h3 className="font-display text-2xl text-white font-light mb-2">
                    {route.name}
                  </h3>
                  <p className="text-white/50 text-sm mb-6">
                    {route.countries.join(" · ")}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-white/70">
                    <span className="flex items-center gap-1.5">
                      <Icon name="Clock" size={13} />
                      {route.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icon name="Route" size={13} />
                      {route.distance}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ===== ARTICLES ===== */}
      {activeSection === "articles" && (
        <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">
              Все публикации
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-light mb-8">
              Статьи
            </h1>
            <div className="flex gap-3 flex-wrap">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="px-5 py-2 rounded-full text-sm font-body transition-all duration-200"
                  style={
                    activeFilter === f
                      ? { background: "hsl(var(--terra))", color: "white" }
                      : {
                          background: "hsl(var(--muted))",
                          color: "hsl(var(--muted-foreground))",
                        }
                  }
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, i) => (
              <article
                key={article.id}
                className="card-hover group cursor-pointer rounded-xl overflow-hidden bg-card border border-border animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)",
                    }}
                  />
                  <span className="absolute bottom-4 left-4 px-3 py-1 text-xs font-medium rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/20">
                    {article.tag}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <span
                      className="font-medium"
                      style={{ color: "hsl(var(--terra))" }}
                    >
                      {article.category}
                    </span>
                    <span>·</span>
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h2 className="font-display text-2xl font-light mb-2 leading-tight">
                    {article.title}
                  </h2>
                  <p className="text-xs text-muted-foreground mb-3">
                    {article.subtitle}
                  </p>
                  <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3">
                    {article.lead}
                  </p>
                  <div
                    className="mt-5 flex items-center gap-2 text-xs font-medium"
                    style={{ color: "hsl(var(--terra))" }}
                  >
                    <span>Читать далее</span>
                    <Icon name="ArrowRight" size={12} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-24 text-muted-foreground">
              <div className="text-5xl mb-4">📭</div>
              <p className="font-display text-2xl font-light">
                Нет статей в этой категории
              </p>
            </div>
          )}
        </div>
      )}

      {/* ===== ROUTES ===== */}
      {activeSection === "routes" && (
        <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">
              Готовые маршруты
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-light">
              Маршруты
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {routes.map((route, i) => (
              <div
                key={route.id}
                className="card-hover rounded-xl overflow-hidden border border-border bg-card cursor-pointer animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className="p-8"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(230 35% 18%) 0%, hsl(16 45% 32%) 100%)",
                  }}
                >
                  <div className="text-5xl mb-4">{route.emoji}</div>
                  <h2 className="font-display text-3xl text-white font-light mb-2">
                    {route.name}
                  </h2>
                  <p className="text-white/55 text-sm">
                    {route.countries.join(" · ")}
                  </p>
                </div>
                <div className="p-6 grid grid-cols-3 gap-4 border-b border-border">
                  {[
                    { icon: "Clock", label: "Длительность", value: route.duration },
                    { icon: "Route", label: "Расстояние", value: route.distance },
                    { icon: "BarChart2", label: "Сложность", value: route.difficulty },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <Icon
                        name={item.icon}
                        size={16}
                        className="mx-auto mb-2 text-muted-foreground"
                      />
                      <p className="text-xs text-muted-foreground mb-1">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-4">
                  <button
                    className="w-full py-3 text-sm font-medium border border-border rounded-lg transition-all duration-200 hover:opacity-70"
                    style={{
                      borderColor: "hsl(var(--terra))",
                      color: "hsl(var(--terra))",
                    }}
                  >
                    Посмотреть маршрут →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== MAP ===== */}
      {activeSection === "map" && (
        <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">
              Интерактивная
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-light mb-4">
              Карта странствий
            </h1>
            <p className="text-muted-foreground">
              Закрашенные точки — посещённые места. Контурные — в списке
              желаний.
            </p>
          </div>

          <div
            className="relative rounded-2xl overflow-hidden border border-border"
            style={{ background: "hsl(var(--indigo-deep))" }}
          >
            <div className="relative" style={{ paddingBottom: "52%" }}>
              <svg
                viewBox="0 0 100 52"
                className="absolute inset-0 w-full h-full"
                style={{ fill: "none", stroke: "rgba(255,255,255,0.15)", strokeWidth: 0.25 }}
              >
                <path d="M7,18 Q11,13 17,15 Q20,20 16,24 Q11,26 7,22 Z" />
                <path d="M19,13 Q29,8 41,12 Q47,16 49,23 Q44,33 37,36 Q27,34 21,28 Q17,22 19,13 Z" />
                <path d="M24,36 Q30,33 35,40 Q31,46 25,45 Q19,42 24,36 Z" />
                <path d="M51,10 Q64,6 79,10 Q87,16 91,26 Q87,38 77,42 Q64,44 54,38 Q47,30 51,10 Z" />
                <path d="M69,28 Q79,26 87,32 Q89,40 83,44 Q75,46 69,42 Q65,36 69,28 Z" />
                <path d="M53,15 Q62,12 68,18 Q65,24 57,22 Q51,20 53,15 Z" />
              </svg>

              {mapPins.map((pin) => (
                <div
                  key={pin.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${pin.x}%`,
                    top: `${pin.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseEnter={() => setHoveredPin(pin.id)}
                  onMouseLeave={() => setHoveredPin(null)}
                >
                  <div
                    className="relative w-4 h-4 rounded-full border-2 transition-transform duration-200"
                    style={{
                      transform: hoveredPin === pin.id ? "scale(1.6)" : "scale(1)",
                      background: pin.visited ? "hsl(var(--terra))" : "transparent",
                      borderColor: pin.visited
                        ? "hsl(var(--terra))"
                        : "rgba(255,255,255,0.45)",
                    }}
                  >
                    {pin.visited && (
                      <div
                        className="absolute inset-0 rounded-full animate-ping opacity-25"
                        style={{ background: "hsl(var(--terra))" }}
                      />
                    )}
                  </div>

                  {hoveredPin === pin.id && (
                    <div
                      className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium shadow-xl z-10"
                      style={{ background: "white", color: "hsl(var(--foreground))" }}
                    >
                      {pin.name}
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
                        style={{ borderTopColor: "white" }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-8 justify-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "hsl(var(--terra))" }}
              />
              Посещено
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div
                className="w-3 h-3 rounded-full border-2"
                style={{ borderColor: "hsl(var(--muted-foreground))" }}
              />
              В списке желаний
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-display text-3xl font-light mb-5">
                Посещённые места
              </h2>
              <div className="flex flex-wrap gap-3">
                {mapPins
                  .filter((p) => p.visited)
                  .map((pin) => (
                    <span
                      key={pin.id}
                      className="px-4 py-2 rounded-full text-sm border border-border bg-card flex items-center gap-2"
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: "hsl(var(--terra))" }}
                      />
                      {pin.name}
                    </span>
                  ))}
              </div>
            </div>
            <div>
              <h2 className="font-display text-3xl font-light mb-5">
                Хочу посетить
              </h2>
              <div className="flex flex-wrap gap-3">
                {mapPins
                  .filter((p) => !p.visited)
                  .map((pin) => (
                    <span
                      key={pin.id}
                      className="px-4 py-2 rounded-full text-sm border border-border bg-card flex items-center gap-2"
                    >
                      <span
                        className="w-2 h-2 rounded-full border border-muted-foreground"
                      />
                      {pin.name}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== ABOUT ===== */}
      {activeSection === "about" && (
        <div className="pt-28 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">
                  История блога
                </p>
                <h1 className="font-display text-5xl md:text-6xl font-light mb-8">
                  О блоге
                </h1>
                <p className="text-foreground/70 leading-relaxed mb-5">
                  «Странствия» — это личный блог, который начался как бумажный
                  дневник в рюкзаке, а стал местом для всех, кто слышит зов
                  дороги.
                </p>
                <p className="text-foreground/70 leading-relaxed mb-5">
                  Здесь нет идеальных travel-фото с обработкой в Lightroom и
                  рекламных интеграций. Только честные истории о том, как
                  ломаются планы, открываются случайные таверны и встречаются
                  люди, меняющие взгляд на мир.
                </p>
                <p className="text-foreground/70 leading-relaxed mb-10">
                  8 лет в дороге. 47 стран. 128 историй. И ни единого желания
                  остановиться.
                </p>
                <div className="flex gap-6">
                  {[
                    { icon: "Instagram", label: "Instagram" },
                    { icon: "Send", label: "Telegram" },
                    { icon: "Youtube", label: "YouTube" },
                  ].map((s) => (
                    <button
                      key={s.label}
                      className="flex items-center gap-2 text-sm story-link text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icon name={s.icon} size={16} />
                      <span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden h-96 md:h-[520px]">
                  <img
                    src={IMG_MEDITERRANEAN}
                    alt="Путешественник"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 p-6 bg-card border border-border rounded-xl shadow-lg">
                  <p
                    className="font-display text-3xl font-light"
                    style={{ color: "hsl(var(--terra))" }}
                  >
                    47
                  </p>
                  <p className="text-sm text-muted-foreground">стран изучено</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-28" style={{ background: "hsl(var(--muted))" }}>
            <div className="max-w-7xl mx-auto px-6 py-16">
              <h2 className="font-display text-3xl font-light mb-12 text-center">
                Принципы блога
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: "Eye",
                    title: "Честность",
                    desc: "Рассказываю о путешествиях без прикрас — с трудностями, ошибками и неожиданными открытиями.",
                  },
                  {
                    icon: "Leaf",
                    title: "Устойчивость",
                    desc: "Стараюсь путешествовать осознанно — поддерживая локальный бизнес и бережно относясь к природе.",
                  },
                  {
                    icon: "Users",
                    title: "Люди",
                    desc: "Самое интересное в любом месте — это люди. Их истории, кухня и взгляд на жизнь.",
                  },
                ].map((v) => (
                  <div key={v.title} className="text-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: "hsl(var(--terra) / 0.12)" }}
                    >
                      <Icon
                        name={v.icon}
                        size={20}
                        style={{ color: "hsl(var(--terra))" }}
                      />
                    </div>
                    <h3 className="font-display text-xl font-light mb-2">
                      {v.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== CONTACTS ===== */}
      {activeSection === "contacts" && (
        <div className="pt-28 pb-20 px-6 max-w-3xl mx-auto">
          <div className="mb-14">
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">
              Напишите мне
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-light mb-4">
              Контакты
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Рад общению с другими путешественниками. Пишите по любому поводу
              — сотрудничество, совет по маршруту или просто поговорить о
              дороге.
            </p>
          </div>

          <div className="grid gap-4 mb-12">
            {[
              {
                icon: "Mail",
                label: "Email",
                value: "hello@stranstviya.ru",
                href: "mailto:hello@stranstviya.ru",
              },
              { icon: "Send", label: "Telegram", value: "@stranstviya", href: "#" },
              {
                icon: "Instagram",
                label: "Instagram",
                value: "@stranstviya.travel",
                href: "#",
              },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card card-hover group"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "hsl(var(--terra) / 0.1)" }}
                >
                  <Icon
                    name={c.icon}
                    size={18}
                    style={{ color: "hsl(var(--terra))" }}
                  />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  <p className="font-medium">{c.value}</p>
                </div>
                <Icon
                  name="ArrowRight"
                  size={14}
                  className="ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform"
                />
              </a>
            ))}
          </div>

          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="font-display text-2xl font-light mb-6">
              Написать сообщение
            </h2>
            <div className="flex flex-col gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    placeholder="Александр"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="alex@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">
                  Тема
                </label>
                <input
                  type="text"
                  placeholder="Вопрос по маршруту в Грузию"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">
                  Сообщение
                </label>
                <textarea
                  rows={5}
                  placeholder="Ваше сообщение..."
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none resize-none"
                />
              </div>
              <button
                className="w-full py-3.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
                style={{
                  background: "hsl(var(--terra))",
                  color: "hsl(var(--primary-foreground))",
                }}
              >
                Отправить сообщение
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer
        className="border-t border-border py-10 px-6"
        style={{ background: "hsl(var(--foreground))" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-display text-2xl font-light text-white/80">
            Странствия
          </p>
          <nav className="flex flex-wrap justify-center gap-6">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className="text-sm text-white/40 hover:text-white/80 transition-colors font-body"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <p className="text-xs text-white/25 font-body">© 2024 Странствия</p>
        </div>
      </footer>
    </div>
  );
}
