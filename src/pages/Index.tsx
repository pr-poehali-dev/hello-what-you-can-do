import { useState } from "react";
import Icon from "@/components/ui/icon";
import AuthScreen from "@/components/AuthScreen";
import CrmPanel from "@/components/CrmPanel";

const HERO_IMG = "https://cdn.poehali.dev/projects/c7036e39-95fa-4881-9b8a-e193026450fa/files/64bc82e7-e5dc-4051-83b6-3d13c582a078.jpg";

const stories = [
  { id: 1, name: "Аня", week: "34 нед", color: "from-rose-300 to-pink-200", emoji: "🤰" },
  { id: 2, name: "Маша", week: "3 мес", color: "from-purple-200 to-pink-100", emoji: "👶" },
  { id: 3, name: "Катя", week: "1.5 г", color: "from-orange-200 to-yellow-100", emoji: "🍼" },
  { id: 4, name: "Оля", week: "28 нед", color: "from-pink-200 to-rose-100", emoji: "💕" },
  { id: 5, name: "Даша", week: "2 года", color: "from-teal-200 to-green-100", emoji: "🌿" },
  { id: 6, name: "Наташа", week: "7 мес", color: "from-yellow-200 to-orange-100", emoji: "☀️" },
];

const topics = ["Все", "Беременность", "Роды", "Новорождённые", "Кормление", "Сон", "Развитие", "Здоровье"];

const posts = [
  {
    id: 1, author: "Анастасия К.", avatar: "АК", avatarColor: "bg-pink-200 text-pink-700",
    time: "2 ч назад", tag: "Беременность", tagColor: "bg-pink-50 text-pink-600",
    text: "Девочки, кто проходил скрининг на 20 неделе? Врач сказала всё хорошо, но очень волнуюсь. Поделитесь своим опытом 🙏",
    likes: 34, comments: 18, topic: "Беременность"
  },
  {
    id: 2, author: "Мария В.", avatar: "МВ", avatarColor: "bg-purple-200 text-purple-700",
    time: "4 ч назад", tag: "Кормление", tagColor: "bg-purple-50 text-purple-600",
    text: "Расскажите, как вы справились с лактационным кризом? У нас 3 месяца, молоко резко убавилось. Очень переживаю 😢",
    likes: 61, comments: 42, topic: "Кормление"
  },
  {
    id: 3, author: "Светлана Н.", avatar: "СН", avatarColor: "bg-orange-200 text-orange-700",
    time: "6 ч назад", tag: "Сон", tagColor: "bg-orange-50 text-orange-600",
    text: "Наконец-то наш малыш начал спать по 6 часов ночью! Делюсь методом — режим с 7 вечера и ритуал укладывания 🌙✨",
    likes: 128, comments: 55, topic: "Сон"
  },
  {
    id: 4, author: "Елена Р.", avatar: "ЕР", avatarColor: "bg-teal-200 text-teal-700",
    time: "8 ч назад", tag: "Развитие", tagColor: "bg-teal-50 text-teal-600",
    text: "Дочке 8 месяцев, пошла по мебели! Все говорили рано, но она такая активная. Когда ваши дети начали ходить? 🚀",
    likes: 87, comments: 31, topic: "Развитие"
  }
];

const specialists = [
  { id: 1, name: "Анна Петрова", role: "Педиатр", exp: "12 лет", rating: 4.9, reviews: 234, emoji: "👩‍⚕️", color: "from-rose-50 to-pink-50", accent: "text-rose-600" },
  { id: 2, name: "Дмитрий Ким", role: "Психолог", exp: "8 лет", rating: 4.8, reviews: 156, emoji: "🧠", color: "from-purple-50 to-pink-50", accent: "text-purple-600" },
  { id: 3, name: "Наталья Смит", role: "Нутрициолог", exp: "10 лет", rating: 4.7, reviews: 98, emoji: "🥗", color: "from-teal-50 to-green-50", accent: "text-teal-600" },
  { id: 4, name: "Ирина Волк", role: "Акушер-гинеколог", exp: "15 лет", rating: 5.0, reviews: 312, emoji: "🌸", color: "from-orange-50 to-yellow-50", accent: "text-orange-600" },
];

const reels = [
  { id: 1, title: "Упражнения при беременности", author: "Фитнес-мама", views: "12K", gradient: "from-pink-300 via-rose-200 to-orange-100", emoji: "🤸‍♀️" },
  { id: 2, title: "Первый прикорм: 5 правил", author: "Педиатр Анна", views: "8.5K", gradient: "from-purple-300 via-pink-200 to-rose-100", emoji: "🥣" },
  { id: 3, title: "Как уложить малыша за 5 минут", author: "Мама Катя", views: "31K", gradient: "from-blue-200 via-teal-100 to-green-100", emoji: "🌙" },
  { id: 4, title: "Первые слова: стимулируем речь", author: "Логопед Ольга", views: "15K", gradient: "from-yellow-200 via-orange-100 to-rose-100", emoji: "🗣️" },
];

const messages = [
  { id: 1, name: "Юля М.", text: "Спасибо за совет про прогулки!", time: "10:23", unread: 2, avatar: "ЮМ", color: "bg-pink-200 text-pink-700", isSpecialist: false },
  { id: 2, name: "Оля К.", text: "Когда была консультация?", time: "09:45", unread: 0, avatar: "ОК", color: "bg-purple-200 text-purple-700", isSpecialist: false },
  { id: 3, name: "Педиатр Анна", text: "Всё в порядке, не переживайте", time: "Вчера", unread: 1, avatar: "ПА", color: "bg-teal-200 text-teal-700", isSpecialist: true },
  { id: 4, name: "Наташа В.", text: "Давай в пятницу встретимся!", time: "Вчера", unread: 0, avatar: "НВ", color: "bg-orange-200 text-orange-700", isSpecialist: false },
];

const recommendations = [
  { id: 1, title: "Топ-10 книг для будущих мам", tag: "Чтение", emoji: "📚", color: "bg-rose-50 border-rose-100" },
  { id: 2, title: "Лучшие приложения для трекинга сна", tag: "Технологии", emoji: "📱", color: "bg-purple-50 border-purple-100" },
  { id: 3, title: "Что взять в роддом: чеклист 2024", tag: "Полезно", emoji: "🎒", color: "bg-orange-50 border-orange-100" },
  { id: 4, title: "Первые игрушки: что реально нужно", tag: "Покупки", emoji: "🧸", color: "bg-teal-50 border-teal-100" },
  { id: 5, title: "Как поддержать себя после родов", tag: "Здоровье", emoji: "💆‍♀️", color: "bg-pink-50 border-pink-100" },
  { id: 6, title: "Групповые занятия мамa+малыш", tag: "Активность", emoji: "🤸", color: "bg-green-50 border-green-100" },
];

type Tab = "home" | "discuss" | "stories" | "reels" | "messages" | "recs" | "profile";
type ProfileSub = "main" | "settings" | "notifications" | "privacy" | "edit";

interface AuthUser {
  name: string;
  email: string;
  isAdmin?: boolean;
}

export default function Index() {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [showCrm, setShowCrm] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [profileSub, setProfileSub] = useState<ProfileSub>("main");
  const [activeTopic, setActiveTopic] = useState("Все");
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [activeStory, setActiveStory] = useState<number | null>(null);

  // Notification toggles
  const [notifs, setNotifs] = useState({
    newPosts: true, replies: true, likes: false, consultations: true,
    stories: false, newMembers: false, weeklyDigest: true, promo: false,
  });
  // Privacy toggles
  const [privacy, setPrivacy] = useState({
    publicProfile: true, showCity: true, showChild: true,
    allowMessages: true, showOnline: false, indexSearch: true,
  });

  const toggleNotif = (key: keyof typeof notifs) => setNotifs(p => ({ ...p, [key]: !p[key] }));
  const togglePrivacy = (key: keyof typeof privacy) => setPrivacy(p => ({ ...p, [key]: !p[key] }));

  if (!authUser) return <AuthScreen onAuth={setAuthUser} />;
  if (showCrm) return <CrmPanel onBack={() => setShowCrm(false)} />;

  const toggleLike = (id: number) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  const filteredPosts = activeTopic === "Все"
    ? posts
    : posts.filter(p => p.topic === activeTopic);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-40" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid hsl(350 60% 92%)" }}>
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌸</span>
            <span className="text-xl font-semibold" style={{ fontFamily: "'Cormorant', serif", color: "hsl(350 55% 55%)" }}>МамаКлуб</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full flex items-center justify-center relative transition-colors" style={{ background: "hsl(350 60% 96%)" }}>
              <Icon name="Bell" size={18} className="text-rose-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "hsl(350 60% 65%)" }}></span>
            </button>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: "linear-gradient(135deg, #f9a8d4, #fca5a5)" }}>
              МИ
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-md mx-auto pb-24">

        {/* ── HOME ── */}
        {activeTab === "home" && (
          <div className="animate-fade-in">
            {/* Hero banner */}
            <div className="mx-4 mt-4 rounded-2xl overflow-hidden relative shadow-lg">
              <img src={HERO_IMG} alt="МамаКлуб" className="w-full h-44 object-cover" />
              <div className="absolute inset-0 flex flex-col justify-end p-5" style={{ background: "linear-gradient(90deg, rgba(80,20,20,0.55) 0%, transparent 100%)" }}>
                <p className="text-white/80 text-xs font-semibold uppercase tracking-wider mb-1">Добро пожаловать</p>
                <h1 className="text-white text-xl font-semibold leading-tight" style={{ fontFamily: "'Cormorant', serif" }}>
                  Здесь каждая мама<br />найдёт поддержку
                </h1>
              </div>
            </div>

            {/* Stories row */}
            <div className="mt-5 px-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-base" style={{ color: "hsl(20 25% 30%)" }}>Сторис</h2>
                <button className="text-xs font-semibold" style={{ color: "hsl(350 55% 60%)" }} onClick={() => setActiveTab("stories")}>Все →</button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                <div className="flex flex-col items-center gap-1.5 shrink-0">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-colors" style={{ background: "hsl(350 60% 96%)", border: "2px dashed hsl(350 50% 78%)" }}>
                    <Icon name="Plus" size={20} className="text-rose-400" />
                  </div>
                  <span className="text-xs text-gray-500 font-semibold">Моя</span>
                </div>
                {stories.map(s => (
                  <div key={s.id} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer" onClick={() => setActiveStory(s.id)}>
                    <div style={{ background: "linear-gradient(135deg, hsl(350 70% 72%), hsl(270 50% 72%), hsl(15 80% 78%))", padding: "2px", borderRadius: "50%" }}>
                      <div className={`w-13 h-13 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl`} style={{ width: "52px", height: "52px" }}>
                        {s.emoji}
                      </div>
                    </div>
                    <span className="text-xs text-gray-600 font-semibold max-w-[52px] truncate text-center">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hot topics */}
            <div className="mt-5 px-4">
              <h2 className="font-bold text-base mb-3" style={{ color: "hsl(20 25% 30%)" }}>Горячие темы</h2>
              <div className="flex flex-col gap-3">
                {[
                  { emoji: "🔥", title: "Как справиться с токсикозом?", replies: 89, bg: "#fff0f0", border: "#ffd6d6" },
                  { emoji: "💤", title: "Методы обучения сну: какой выбрать", replies: 142, bg: "#f5f0ff", border: "#e0d6ff" },
                  { emoji: "🥛", title: "ГВ vs смесь: за и против", replies: 205, bg: "#fff8f0", border: "#ffe0c0" },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer transition-all hover:-translate-y-0.5" style={{ background: t.bg, border: `1px solid ${t.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }} onClick={() => setActiveTab("discuss")}>
                    <span className="text-2xl">{t.emoji}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-700">{t.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{t.replies} ответов</p>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-gray-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick access */}
            <div className="mt-5 px-4 grid grid-cols-2 gap-3 pb-2">
              <button className="text-left p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-1" style={{ background: "linear-gradient(135deg, #fff0f5, #f5eeff)", border: "1px solid #f0d6e8", boxShadow: "0 2px 16px rgba(200,100,120,0.1)" }} onClick={() => setActiveTab("recs")}>
                <div className="text-2xl mb-1.5">👩‍⚕️</div>
                <p className="font-bold text-sm text-gray-700">Консультация</p>
                <p className="text-xs text-gray-400 mt-0.5">Педиатры и психологи</p>
              </button>
              <button className="text-left p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-1" style={{ background: "linear-gradient(135deg, #fff8f0, #fff0f5)", border: "1px solid #ffe0c0", boxShadow: "0 2px 16px rgba(200,130,80,0.1)" }} onClick={() => setActiveTab("reels")}>
                <div className="text-2xl mb-1.5">🎬</div>
                <p className="font-bold text-sm text-gray-700">Рилсы</p>
                <p className="text-xs text-gray-400 mt-0.5">Полезные видео</p>
              </button>
            </div>
          </div>
        )}

        {/* ── DISCUSSIONS ── */}
        {activeTab === "discuss" && (
          <div className="animate-fade-in">
            <div className="px-4 pt-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-xl text-gray-800">Обсуждения</h2>
                <button className="text-xs px-4 py-2 rounded-full text-white font-bold transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, hsl(350 60% 72%), hsl(350 55% 62%))" }}>+ Тема</button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
                {topics.map(t => (
                  <button key={t} onClick={() => setActiveTopic(t)} className="shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all" style={activeTopic === t ? { background: "hsl(350 60% 72%)", color: "white" } : { background: "hsl(30 50% 93%)", color: "hsl(20 25% 35%)" }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-4 mt-4 flex flex-col gap-4">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <div className="text-4xl mb-3">🔍</div>
                  <p className="font-semibold">Постов по этой теме пока нет</p>
                </div>
              ) : filteredPosts.map((p, i) => (
                <div key={p.id} className="bg-white rounded-2xl p-4 animate-fade-in" style={{ animationDelay: `${i * 0.06}s`, border: "1px solid hsl(30 40% 92%)", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className={`w-9 h-9 rounded-full ${p.avatarColor} flex items-center justify-center text-xs font-bold`}>{p.avatar}</div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-gray-800">{p.author}</p>
                      <p className="text-xs text-gray-400">{p.time}</p>
                    </div>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${p.tagColor}`}>{p.tag}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{p.text}</p>
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
                    <button className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${likedPosts.has(p.id) ? "text-rose-500" : "text-gray-400 hover:text-rose-400"}`} onClick={() => toggleLike(p.id)}>
                      <Icon name="Heart" size={15} />
                      {p.likes + (likedPosts.has(p.id) ? 1 : 0)}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-purple-400 transition-colors">
                      <Icon name="MessageCircle" size={15} />
                      {p.comments}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-teal-400 transition-colors ml-auto">
                      <Icon name="Share2" size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STORIES ── */}
        {activeTab === "stories" && (
          <div className="animate-fade-in">
            <div className="px-4 pt-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-xl text-gray-800">Сторис</h2>
                <button className="text-xs px-4 py-2 rounded-full text-white font-bold" style={{ background: "linear-gradient(135deg, hsl(350 60% 72%), hsl(350 55% 62%))" }}>+ Добавить</button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[...Array(9)].map((_, i) => {
                  const gradients = ["from-rose-300 to-pink-200", "from-purple-300 to-pink-100", "from-orange-200 to-yellow-100", "from-teal-200 to-green-100", "from-pink-200 to-rose-100", "from-yellow-200 to-orange-100", "from-indigo-200 to-purple-100", "from-red-200 to-rose-100", "from-emerald-200 to-teal-100"];
                  const emojis = ["🤰", "👶", "🍼", "🌿", "💕", "☀️", "🌸", "🧸", "🦋"];
                  const names = ["Аня", "Маша", "Катя", "Оля", "Даша", "Наташа", "Юля", "Света", "Ира"];
                  const times = ["2м", "15м", "1ч", "2ч", "3ч", "5ч", "8ч", "10ч", "23ч"];
                  return (
                    <div key={i} className={`bg-gradient-to-br ${gradients[i]} rounded-xl relative overflow-hidden cursor-pointer hover:scale-105 transition-transform`} style={{ aspectRatio: "9/16" }}>
                      <div className="absolute inset-0 flex flex-col justify-between p-2">
                        <div className="flex items-center gap-1">
                          <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center text-xs">😊</div>
                          <div>
                            <p className="text-white text-[9px] font-bold leading-none">{names[i]}</p>
                            <p className="text-white/70 text-[8px]">{times[i]}</p>
                          </div>
                        </div>
                        <div className="text-3xl text-center">{emojis[i]}</div>
                        <div className="h-0.5 bg-white/40 rounded-full"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── REELS ── */}
        {activeTab === "reels" && (
          <div className="animate-fade-in">
            <div className="px-4 pt-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-xl text-gray-800">Рилсы</h2>
                <button className="text-xs px-4 py-2 rounded-full text-white font-bold" style={{ background: "linear-gradient(135deg, hsl(350 60% 72%), hsl(350 55% 62%))" }}>+ Загрузить</button>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {reels.map((r, i) => (
                  <div key={r.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.07}s` }}>
                    <div className={`bg-gradient-to-br ${r.gradient} rounded-xl relative overflow-hidden cursor-pointer hover:scale-103 transition-transform`} style={{ aspectRatio: "9/16" }}>
                      <div className="absolute inset-0 flex flex-col justify-between p-3">
                        <div className="self-end">
                          <span className="text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: "rgba(0,0,0,0.2)" }}>👁 {r.views}</span>
                        </div>
                        <div className="text-4xl text-center mb-2">{r.emoji}</div>
                        <div>
                          <p className="text-white text-xs font-bold leading-tight drop-shadow">{r.title}</p>
                          <p className="text-white/80 text-[10px] mt-0.5">@{r.author}</p>
                        </div>
                      </div>
                      <button className="absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.25)" }}>
                        <Icon name="Play" size={14} className="text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <h3 className="font-bold text-base text-gray-800 mb-3">Категории</h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Беременность", emoji: "🤰", bg: "#fff0f5" },
                  { label: "Роды", emoji: "🌸", bg: "#fdf0ff" },
                  { label: "Малыш 0-1", emoji: "👶", bg: "#f0f0ff" },
                  { label: "Питание", emoji: "🥣", bg: "#fff8f0" },
                  { label: "Фитнес", emoji: "🤸", bg: "#f0fff8" },
                  { label: "Психология", emoji: "💆‍♀️", bg: "#f5f0ff" },
                ].map((c, i) => (
                  <div key={i} className="rounded-xl p-3 flex flex-col items-center gap-1 cursor-pointer hover:scale-105 transition-transform" style={{ background: c.bg }}>
                    <span className="text-2xl">{c.emoji}</span>
                    <p className="text-[10px] font-semibold text-gray-600 text-center">{c.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── MESSAGES ── */}
        {activeTab === "messages" && (
          <div className="animate-fade-in">
            <div className="px-4 pt-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-xl text-gray-800">Сообщения</h2>
                <button className="text-xs px-4 py-2 rounded-full text-white font-bold" style={{ background: "linear-gradient(135deg, hsl(350 60% 72%), hsl(350 55% 62%))" }}>
                  Написать
                </button>
              </div>
              <div className="relative mb-4">
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input className="w-full rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none transition-all" style={{ background: "#f9f5f5", border: "1px solid #f0e0e0" }} placeholder="Поиск по сообщениям..." />
              </div>
              <div className="flex flex-col gap-0.5 mb-5">
                {messages.map((m, i) => (
                  <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors hover:bg-rose-50/60 animate-fade-in" style={{ animationDelay: `${i * 0.06}s` }}>
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-full ${m.color} flex items-center justify-center text-sm font-bold`}>{m.avatar}</div>
                      {m.isSpecialist && (
                        <span className="absolute -bottom-0.5 -right-0.5 bg-teal-400 text-white text-[9px] px-1 py-0.5 rounded-full font-bold">Pro</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-sm text-gray-800">{m.name}</p>
                        <p className="text-[10px] text-gray-400">{m.time}</p>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{m.text}</p>
                    </div>
                    {m.unread > 0 && (
                      <span className="w-5 h-5 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0" style={{ background: "hsl(350 60% 68%)" }}>{m.unread}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Chat preview */}
              <div className="bg-white rounded-2xl p-4" style={{ border: "1px solid hsl(30 40% 92%)", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
                <p className="text-xs font-semibold text-gray-400 mb-3 text-center">Юля М. • сегодня</p>
                <div className="flex flex-col gap-2.5">
                  <div className="bg-white text-gray-700 rounded-[18px_18px_18px_4px] p-2.5 max-w-[75%] text-sm" style={{ border: "1px solid hsl(30 30% 90%)" }}>Привет! Как твой малыш? 🌸</div>
                  <div className="text-white rounded-[18px_18px_4px_18px] p-2.5 max-w-[75%] text-sm ml-auto" style={{ background: "linear-gradient(135deg, hsl(350 60% 72%), hsl(350 55% 65%))" }}>Привет! Всё хорошо, уже 4 месяца!</div>
                  <div className="bg-white text-gray-700 rounded-[18px_18px_18px_4px] p-2.5 max-w-[75%] text-sm" style={{ border: "1px solid hsl(30 30% 90%)" }}>Замечательно! Погуляем вместе в парке?</div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <input className="flex-1 rounded-xl px-3 py-2 text-sm outline-none transition-all" style={{ background: "#f9f5f5", border: "1px solid #f0e0e0" }} placeholder="Написать..." />
                  <button className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "hsl(350 60% 68%)" }}>
                    <Icon name="Send" size={15} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── RECOMMENDATIONS ── */}
        {activeTab === "recs" && (
          <div className="animate-fade-in">
            <div className="px-4 pt-5">
              <h2 className="font-bold text-xl text-gray-800 mb-1">Рекомендации</h2>
              <p className="text-sm text-gray-500 mb-5">Полезное для тебя и малыша</p>

              <h3 className="font-bold text-base text-gray-800 mb-3">
                <span className="mr-1.5">👩‍⚕️</span> Консультации со специалистами
              </h3>
              <div className="flex flex-col gap-3 mb-6">
                {specialists.map((s, i) => (
                  <div key={s.id} className={`bg-gradient-to-r ${s.color} rounded-2xl p-4 cursor-pointer transition-all hover:-translate-y-1 animate-fade-in`} style={{ animationDelay: `${i * 0.07}s`, border: "1px solid rgba(200,150,160,0.15)", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{s.emoji}</div>
                      <div className="flex-1">
                        <p className="font-bold text-sm text-gray-800">{s.name}</p>
                        <p className={`text-xs font-semibold ${s.accent}`}>{s.role} • {s.exp} опыта</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-yellow-400 text-xs">★</span>
                          <span className="text-xs font-bold text-gray-700">{s.rating}</span>
                          <span className="text-xs text-gray-400">({s.reviews} отзывов)</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full" style={{ animation: "pulse 2s infinite" }}></div>
                        <button className="text-white text-[11px] px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, hsl(350 60% 72%), hsl(350 55% 62%))" }}>
                          Записаться
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="font-bold text-base text-gray-800 mb-3">
                <span className="mr-1.5">✨</span> Для тебя
              </h3>
              <div className="flex flex-col gap-2.5">
                {recommendations.map((r, i) => (
                  <div key={r.id} className={`flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer transition-all hover:-translate-y-0.5 border ${r.color} animate-fade-in`} style={{ animationDelay: `${i * 0.05}s`, boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
                    <span className="text-2xl">{r.emoji}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-700">{r.title}</p>
                      <span className="text-xs text-gray-400">{r.tag}</span>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-gray-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── PROFILE ── */}
        {activeTab === "profile" && (
          <div className="animate-fade-in">
            <div className="px-4 pt-5">

              {/* Profile header card */}
              <div className="bg-white rounded-2xl p-5 text-center mb-4 relative" style={{ border: "1px solid hsl(30 40% 92%)", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
                {authUser.isAdmin && (
                  <button onClick={() => setShowCrm(true)} className="absolute top-3 right-3 flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-xl text-white" style={{ background: "linear-gradient(135deg, #9c6edb, #7c4db8)" }}>
                    <Icon name="LayoutDashboard" size={12} />
                    CRM
                  </button>
                )}
                <div className="relative inline-block mb-3">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto" style={{ background: "linear-gradient(135deg, #f9a8d4, #fca5a5)", border: "3px solid white", boxShadow: "0 2px 12px rgba(240,100,120,0.25)" }}>
                    👩
                  </div>
                  <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "hsl(350 60% 68%)" }} onClick={() => setProfileSub("edit")}>
                    <Icon name="Camera" size={12} className="text-white" />
                  </button>
                </div>
                <h2 className="font-bold text-lg text-gray-800">{authUser.name}</h2>
                <p className="text-sm text-gray-500 mt-0.5">Мама Артёма (8 мес) • Москва</p>
                <div className="flex justify-center gap-6 mt-4 pt-4" style={{ borderTop: "1px solid hsl(30 40% 95%)" }}>
                  {[{ label: "Постов", value: "24" }, { label: "Подписчики", value: "156" }, { label: "Подписки", value: "83" }].map((s, i) => (
                    <div key={i} className="text-center">
                      <p className="font-bold text-gray-800">{s.value}</p>
                      <p className="text-xs text-gray-400">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-nav */}
              {profileSub !== "main" && (
                <button onClick={() => setProfileSub("main")} className="flex items-center gap-2 mb-3 text-sm font-bold" style={{ color: "hsl(350 55% 60%)" }}>
                  <Icon name="ChevronLeft" size={16} />
                  Назад в профиль
                </button>
              )}

              {/* ── MAIN MENU ── */}
              {profileSub === "main" && (
                <div className="flex flex-col gap-3 animate-fade-in">
                  <div className="bg-white rounded-2xl p-4 mb-1" style={{ border: "1px solid hsl(30 40% 92%)" }}>
                    <h3 className="font-bold text-xs text-gray-400 uppercase tracking-wider mb-2">О себе</h3>
                    {[
                      { icon: "Baby", label: "Малыш", value: "Артём, 8 месяцев" },
                      { icon: "MapPin", label: "Город", value: "Москва" },
                      { icon: "Calendar", label: "В клубе с", value: "Январь 2024" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 py-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(350 60% 96%)" }}>
                          <Icon name={item.icon as "Baby"} size={14} className="text-rose-400" fallback="Heart" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] text-gray-400">{item.label}</p>
                          <p className="text-sm font-semibold text-gray-700">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white rounded-2xl p-2" style={{ border: "1px solid hsl(30 40% 92%)" }}>
                    {[
                      { icon: "Pencil", label: "Редактировать профиль", sub: "edit" as ProfileSub, bg: "#fff8f0", color: "#f59e0b" },
                      { icon: "Settings", label: "Настройки аккаунта", sub: "settings" as ProfileSub, bg: "#f5f5f5", color: "#888" },
                      { icon: "Bell", label: "Уведомления", sub: "notifications" as ProfileSub, bg: "#fff0f5", color: "#e06080" },
                      { icon: "Shield", label: "Приватность", sub: "privacy" as ProfileSub, bg: "#f5f0ff", color: "#9060c0" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors hover:bg-rose-50/50" onClick={() => setProfileSub(item.sub)}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: item.bg }}>
                          <Icon name={item.icon as "Settings"} size={15} fallback="Circle" style={{ color: item.color }} />
                        </div>
                        <p className="flex-1 text-sm font-semibold text-gray-700">{item.label}</p>
                        <Icon name="ChevronRight" size={15} className="text-gray-300" />
                      </div>
                    ))}
                  </div>

                  <div className="bg-white rounded-2xl p-2" style={{ border: "1px solid hsl(30 40% 92%)" }}>
                    {[
                      { icon: "HelpCircle", label: "Помощь и поддержка", bg: "#f0faf5", color: "#40a870" },
                      { icon: "Star", label: "Оценить приложение", bg: "#fffbeb", color: "#d97706" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors hover:bg-rose-50/50">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: item.bg }}>
                          <Icon name={item.icon as "HelpCircle"} size={15} fallback="Circle" style={{ color: item.color }} />
                        </div>
                        <p className="flex-1 text-sm font-semibold text-gray-700">{item.label}</p>
                        <Icon name="ChevronRight" size={15} className="text-gray-300" />
                      </div>
                    ))}
                    <div className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors hover:bg-red-50" onClick={() => setAuthUser(null)}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#fff0f0" }}>
                        <Icon name="LogOut" size={15} style={{ color: "#e05050" }} />
                      </div>
                      <p className="flex-1 text-sm font-semibold" style={{ color: "#e05050" }}>Выйти</p>
                    </div>
                  </div>

                  {authUser.isAdmin && (
                    <button onClick={() => setShowCrm(true)} className="w-full py-3.5 rounded-2xl text-white font-bold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, #9c6edb, #7c4db8)", boxShadow: "0 4px 16px rgba(140,80,200,0.3)" }}>
                      <Icon name="LayoutDashboard" size={17} />
                      Открыть CRM-панель
                    </button>
                  )}
                </div>
              )}

              {/* ── EDIT PROFILE ── */}
              {profileSub === "edit" && (
                <div className="flex flex-col gap-3 animate-fade-in">
                  <div className="bg-white rounded-2xl p-4" style={{ border: "1px solid hsl(30 40% 92%)" }}>
                    <h3 className="font-bold text-sm text-gray-700 mb-3">Личные данные</h3>
                    {[
                      { label: "Имя", placeholder: authUser.name, icon: "User" },
                      { label: "Email", placeholder: authUser.email, icon: "Mail" },
                      { label: "Город", placeholder: "Москва", icon: "MapPin" },
                      { label: "Имя малыша", placeholder: "Артём", icon: "Baby" },
                      { label: "Возраст малыша", placeholder: "8 месяцев", icon: "Clock" },
                    ].map((f, i) => (
                      <div key={i} className="mb-3">
                        <label className="text-xs font-bold text-gray-400 mb-1 block">{f.label}</label>
                        <div className="relative">
                          <Icon name={f.icon as "User"} size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" fallback="Circle" />
                          <input className="w-full rounded-xl pl-9 pr-4 py-2.5 text-sm font-semibold outline-none" style={{ background: "#fff8fa", border: "1.5px solid #f5d0da" }} defaultValue={f.placeholder} />
                        </div>
                      </div>
                    ))}
                    <div className="mb-3">
                      <label className="text-xs font-bold text-gray-400 mb-1 block">О себе</label>
                      <textarea className="w-full rounded-xl px-4 py-2.5 text-sm font-semibold outline-none resize-none" style={{ background: "#fff8fa", border: "1.5px solid #f5d0da", height: "80px" }} defaultValue="Молодая мама, люблю природу и вкусную еду 🌸" />
                    </div>
                    <button className="w-full py-3 rounded-xl text-white font-bold transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, hsl(350 60% 72%), hsl(350 55% 62%))" }}>
                      Сохранить изменения
                    </button>
                  </div>
                </div>
              )}

              {/* ── SETTINGS ── */}
              {profileSub === "settings" && (
                <div className="flex flex-col gap-3 animate-fade-in">
                  <div className="bg-white rounded-2xl p-4" style={{ border: "1px solid hsl(30 40% 92%)" }}>
                    <h3 className="font-bold text-xs text-gray-400 uppercase tracking-wider mb-3">Аккаунт</h3>
                    {[
                      { label: "Сменить пароль", icon: "Lock", color: "#888" },
                      { label: "Привязать телефон", icon: "Phone", color: "#40a870" },
                      { label: "Двухфакторная защита", icon: "ShieldCheck", color: "#9060c0" },
                      { label: "Активные сессии", icon: "Monitor", color: "#0ea5e9" },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center gap-3 py-2.5 border-b last:border-0 cursor-pointer hover:bg-rose-50/30 rounded-xl px-1 transition-colors" style={{ borderColor: "#f5f0f5" }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: s.color + "15" }}>
                          <Icon name={s.icon as "Lock"} size={14} fallback="Circle" style={{ color: s.color }} />
                        </div>
                        <p className="flex-1 text-sm font-semibold text-gray-700">{s.label}</p>
                        <Icon name="ChevronRight" size={14} className="text-gray-300" />
                      </div>
                    ))}
                  </div>
                  <div className="bg-white rounded-2xl p-4" style={{ border: "1px solid hsl(30 40% 92%)" }}>
                    <h3 className="font-bold text-xs text-gray-400 uppercase tracking-wider mb-3">Язык и регион</h3>
                    {[
                      { label: "Язык интерфейса", value: "Русский" },
                      { label: "Часовой пояс", value: "Москва (UTC+3)" },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center justify-between py-2.5 border-b last:border-0 cursor-pointer" style={{ borderColor: "#f5f0f5" }}>
                        <p className="text-sm font-semibold text-gray-700">{s.label}</p>
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          {s.value}
                          <Icon name="ChevronRight" size={13} className="text-gray-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white rounded-2xl p-4" style={{ border: "1px solid #fee2e2" }}>
                    <h3 className="font-bold text-xs uppercase tracking-wider mb-3" style={{ color: "#ef4444" }}>Опасная зона</h3>
                    <button className="w-full py-2.5 rounded-xl text-sm font-bold" style={{ background: "#fff0f0", color: "#ef4444", border: "1px solid #fecaca" }}>
                      Удалить аккаунт
                    </button>
                  </div>
                </div>
              )}

              {/* ── NOTIFICATIONS ── */}
              {profileSub === "notifications" && (
                <div className="flex flex-col gap-3 animate-fade-in">
                  {[
                    {
                      title: "Активность",
                      items: [
                        { key: "newPosts" as const, label: "Новые посты в темах", desc: "Когда в подписанных темах появляются посты" },
                        { key: "replies" as const, label: "Ответы на мои посты", desc: "Когда кто-то ответил вам" },
                        { key: "likes" as const, label: "Лайки", desc: "Когда кто-то лайкнул ваш пост" },
                      ]
                    },
                    {
                      title: "Консультации",
                      items: [
                        { key: "consultations" as const, label: "Напоминание о записи", desc: "За 1 час до консультации" },
                        { key: "stories" as const, label: "Новые сторис", desc: "От подписанных участниц" },
                      ]
                    },
                    {
                      title: "Системные",
                      items: [
                        { key: "newMembers" as const, label: "Новые участницы рядом", desc: "Из вашего города" },
                        { key: "weeklyDigest" as const, label: "Еженедельный дайджест", desc: "Лучшие посты за неделю" },
                        { key: "promo" as const, label: "Акции и предложения", desc: "Скидки на консультации" },
                      ]
                    }
                  ].map((section, si) => (
                    <div key={si} className="bg-white rounded-2xl p-4" style={{ border: "1px solid hsl(30 40% 92%)" }}>
                      <h3 className="font-bold text-xs text-gray-400 uppercase tracking-wider mb-3">{section.title}</h3>
                      {section.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 py-2.5 border-b last:border-0" style={{ borderColor: "#f5f0f5" }}>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-700">{item.label}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                          </div>
                          <button
                            onClick={() => toggleNotif(item.key)}
                            className="w-11 h-6 rounded-full relative transition-all shrink-0"
                            style={{ background: notifs[item.key] ? "linear-gradient(135deg, hsl(350 60% 72%), hsl(350 55% 62%))" : "#e5e7eb" }}
                          >
                            <div className="w-4 h-4 bg-white rounded-full absolute top-1 transition-all" style={{ left: notifs[item.key] ? "calc(100% - 20px)" : "4px", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }}></div>
                          </button>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* ── PRIVACY ── */}
              {profileSub === "privacy" && (
                <div className="flex flex-col gap-3 animate-fade-in">
                  {[
                    {
                      title: "Видимость профиля",
                      items: [
                        { key: "publicProfile" as const, label: "Публичный профиль", desc: "Ваш профиль виден всем участницам" },
                        { key: "showCity" as const, label: "Показывать город", desc: "Отображать город в профиле" },
                        { key: "showChild" as const, label: "Показывать данные малыша", desc: "Имя и возраст ребёнка" },
                        { key: "indexSearch" as const, label: "Поиск по профилю", desc: "Можно найти через поиск в клубе" },
                      ]
                    },
                    {
                      title: "Общение",
                      items: [
                        { key: "allowMessages" as const, label: "Личные сообщения", desc: "Разрешить писать вам напрямую" },
                        { key: "showOnline" as const, label: "Показывать «онлайн»", desc: "Другие видят, когда вы в сети" },
                      ]
                    }
                  ].map((section, si) => (
                    <div key={si} className="bg-white rounded-2xl p-4" style={{ border: "1px solid hsl(30 40% 92%)" }}>
                      <h3 className="font-bold text-xs text-gray-400 uppercase tracking-wider mb-3">{section.title}</h3>
                      {section.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 py-2.5 border-b last:border-0" style={{ borderColor: "#f5f0f5" }}>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-700">{item.label}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                          </div>
                          <button
                            onClick={() => togglePrivacy(item.key)}
                            className="w-11 h-6 rounded-full relative transition-all shrink-0"
                            style={{ background: privacy[item.key] ? "linear-gradient(135deg, hsl(350 60% 72%), hsl(350 55% 62%))" : "#e5e7eb" }}
                          >
                            <div className="w-4 h-4 bg-white rounded-full absolute top-1 transition-all" style={{ left: privacy[item.key] ? "calc(100% - 20px)" : "4px", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }}></div>
                          </button>
                        </div>
                      ))}
                    </div>
                  ))}
                  <div className="bg-white rounded-2xl p-4" style={{ border: "1px solid hsl(30 40% 92%)" }}>
                    <h3 className="font-bold text-xs text-gray-400 uppercase tracking-wider mb-3">Блокировки</h3>
                    <p className="text-sm text-gray-500 text-center py-4">Заблокированных пользователей нет</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </main>

      {/* ── BOTTOM NAV ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-40" style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)", borderTop: "1px solid hsl(350 50% 92%)" }}>
        <div className="max-w-md mx-auto px-1 py-1.5 flex items-center justify-around">
          {([
            { id: "home", icon: "Home", label: "Главная" },
            { id: "discuss", icon: "MessageSquare", label: "Темы" },
            { id: "stories", icon: "Circle", label: "Сторис" },
            { id: "reels", icon: "Video", label: "Рилсы" },
            { id: "messages", icon: "Mail", label: "Чат" },
            { id: "recs", icon: "Star", label: "Советы" },
            { id: "profile", icon: "User", label: "Профиль" },
          ] as { id: Tab; icon: string; label: string }[]).map(item => (
            <button
              key={item.id}
              className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all cursor-pointer"
              style={activeTab === item.id ? { background: "hsl(350 60% 96%)", color: "hsl(350 55% 58%)" } : { color: "hsl(20 15% 58%)" }}
              onClick={() => { setActiveTab(item.id); setProfileSub("main"); }}
            >
              <Icon name={item.icon as "Home"} size={19} fallback="Circle" />
              <span className="text-[9px] font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* ── STORY OVERLAY ── */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.85)" }} onClick={() => setActiveStory(null)}>
          <div className="rounded-2xl overflow-hidden relative" style={{ width: "280px", height: "480px" }}>
            <div className={`w-full h-full bg-gradient-to-br ${stories.find(s => s.id === activeStory)?.color || "from-rose-300 to-pink-200"} flex flex-col items-center justify-center`}>
              <span className="text-8xl">{stories.find(s => s.id === activeStory)?.emoji}</span>
              <p className="text-white font-bold text-xl mt-4">{stories.find(s => s.id === activeStory)?.name}</p>
              <p className="text-white/70 text-sm">{stories.find(s => s.id === activeStory)?.week}</p>
            </div>
            <div className="absolute top-3 left-3 right-3 flex gap-1">
              {stories.map((_, i) => (
                <div key={i} className="flex-1 h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.35)" }}>
                  <div className={`h-full bg-white rounded-full ${i === activeStory - 1 ? "w-full" : "w-0"}`}></div>
                </div>
              ))}
            </div>
            <button className="absolute top-4 right-4 text-white" onClick={() => setActiveStory(null)}>
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}