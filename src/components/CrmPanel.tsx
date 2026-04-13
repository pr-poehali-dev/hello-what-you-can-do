import { useState } from "react";
import Icon from "@/components/ui/icon";

type CrmTab = "dashboard" | "users" | "consultations" | "analytics";

const crmUsers = [
  { id: 1, name: "Анастасия К.", email: "anas@mail.ru", city: "Москва", child: "8 мес", status: "active", joined: "12 янв", posts: 24, emoji: "👩" },
  { id: 2, name: "Мария В.", email: "maria@mail.ru", city: "СПб", child: "3 мес", status: "active", joined: "5 фев", posts: 12, emoji: "👩‍🦱" },
  { id: 3, name: "Светлана Н.", email: "sveta@mail.ru", city: "Казань", child: "1.5 г", status: "active", joined: "20 янв", posts: 38, emoji: "👩‍🦰" },
  { id: 4, name: "Елена Р.", email: "elena@mail.ru", city: "Москва", child: "2 года", status: "blocked", joined: "2 янв", posts: 5, emoji: "👩‍🦳" },
  { id: 5, name: "Дарья С.", email: "dasha@mail.ru", city: "Новосиб.", child: "5 мес", status: "active", joined: "18 мар", posts: 9, emoji: "🧑‍🦱" },
  { id: 6, name: "Юлия М.", email: "julia@mail.ru", city: "Сочи", child: "28 нед", status: "new", joined: "10 апр", posts: 1, emoji: "👱‍♀️" },
];

const consultations = [
  { id: 1, user: "Анастасия К.", specialist: "Педиатр Анна", date: "14 апр, 10:00", topic: "Вопрос по прикорму", status: "confirmed", price: "1 200 ₽" },
  { id: 2, user: "Мария В.", specialist: "Психолог Дмитрий", date: "15 апр, 14:30", topic: "Послеродовая депрессия", status: "pending", price: "1 500 ₽" },
  { id: 3, user: "Светлана Н.", specialist: "Нутрициолог Наталья", date: "16 апр, 11:00", topic: "Рацион кормящей мамы", status: "confirmed", price: "900 ₽" },
  { id: 4, user: "Дарья С.", specialist: "Педиатр Анна", date: "13 апр, 16:00", topic: "Режим дня 5 мес", status: "done", price: "1 200 ₽" },
  { id: 5, user: "Юлия М.", specialist: "Акушер Ирина", date: "17 апр, 09:30", topic: "Подготовка к родам", status: "pending", price: "2 000 ₽" },
];

const statusColor: Record<string, string> = {
  active: "#d1fae5",
  blocked: "#fee2e2",
  new: "#e0f2fe",
  confirmed: "#d1fae5",
  pending: "#fef3c7",
  done: "#f3e8ff",
};
const statusText: Record<string, string> = {
  active: "#065f46",
  blocked: "#b91c1c",
  new: "#0369a1",
  confirmed: "#065f46",
  pending: "#92400e",
  done: "#6b21a8",
};
const statusLabel: Record<string, string> = {
  active: "Активна",
  blocked: "Заблокирована",
  new: "Новая",
  confirmed: "Подтверждена",
  pending: "Ожидает",
  done: "Завершена",
};

export default function CrmPanel({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<CrmTab>("dashboard");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const filteredUsers = crmUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Nunito', sans-serif", background: "#f8f5ff" }}>
      {/* CRM Header */}
      <header className="sticky top-0 z-40" style={{ background: "rgba(245,240,255,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid #e8d8ff" }}>
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110" style={{ background: "#f0e8ff" }}>
            <Icon name="ArrowLeft" size={18} className="text-purple-500" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-base" style={{ color: "#4a1a8a", fontFamily: "'Cormorant', serif", fontSize: "1.1rem" }}>CRM МамаКлуб</h1>
            <p className="text-[10px] text-purple-400 font-semibold">Панель администратора</p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl" style={{ background: "#d1fae5" }}>
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" style={{ animation: "pulse 2s infinite" }}></div>
            <span className="text-[10px] font-bold text-green-700">Онлайн</span>
          </div>
        </div>

        {/* CRM nav */}
        <div className="max-w-2xl mx-auto px-4 pb-2 flex gap-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {([
            { id: "dashboard", icon: "LayoutDashboard", label: "Обзор" },
            { id: "users", icon: "Users", label: "Пользователи" },
            { id: "consultations", icon: "Calendar", label: "Консультации" },
            { id: "analytics", icon: "BarChart3", label: "Аналитика" },
          ] as { id: CrmTab; icon: string; label: string }[]).map(t => (
            <button
              key={t.id}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all"
              style={activeTab === t.id ? { background: "linear-gradient(135deg, #9c6edb, #7c4db8)", color: "white", boxShadow: "0 2px 10px rgba(140,80,200,0.3)" } : { color: "#9060c0", background: "transparent" }}
              onClick={() => setActiveTab(t.id)}
            >
              <Icon name={t.icon as "Home"} size={13} fallback="Circle" />
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-4">

        {/* ── DASHBOARD ── */}
        {activeTab === "dashboard" && (
          <div className="animate-fade-in flex flex-col gap-4">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Участниц", value: "1 284", delta: "+28", icon: "Users", bg: "linear-gradient(135deg, #fff0f5, #fce7f3)", iconColor: "#e06080", border: "#fcd6e8" },
                { label: "Активных сегодня", value: "312", delta: "+45", icon: "Activity", bg: "linear-gradient(135deg, #f0f9ff, #e0f2fe)", iconColor: "#0ea5e9", border: "#bae6fd" },
                { label: "Консультаций", value: "89", delta: "+12", icon: "Calendar", bg: "linear-gradient(135deg, #f5f0ff, #ede9fe)", iconColor: "#9060c0", border: "#ddd6fe" },
                { label: "Выручка (апр)", value: "112 400 ₽", delta: "+8%", icon: "TrendingUp", bg: "linear-gradient(135deg, #f0fdf4, #dcfce7)", iconColor: "#16a34a", border: "#bbf7d0" },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl p-4 animate-fade-in" style={{ background: s.bg, border: `1px solid ${s.border}`, animationDelay: `${i * 0.07}s`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "white", boxShadow: `0 2px 8px ${s.border}` }}>
                      <Icon name={s.icon as "Users"} size={16} fallback="Circle" style={{ color: s.iconColor }} />
                    </div>
                    <span className="text-[10px] font-bold text-green-600" style={{ background: "#d1fae5", padding: "2px 6px", borderRadius: "50px" }}>{s.delta}</span>
                  </div>
                  <p className="font-bold text-lg text-gray-800 leading-none">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Recent activity */}
            <div className="bg-white rounded-2xl p-4" style={{ border: "1px solid #f0e8ff", boxShadow: "0 2px 12px rgba(140,80,200,0.06)" }}>
              <h3 className="font-bold text-sm text-gray-800 mb-3 flex items-center gap-2">
                <Icon name="Bell" size={15} className="text-purple-400" />
                Последние события
              </h3>
              <div className="flex flex-col gap-0">
                {[
                  { text: "Юлия М. зарегистрировалась", time: "10 мин", icon: "UserPlus", color: "#0ea5e9" },
                  { text: "Консультация Дарьи С. завершена", time: "45 мин", icon: "CheckCircle", color: "#16a34a" },
                  { text: "Новая заявка на консультацию", time: "1 ч", icon: "Calendar", color: "#9060c0" },
                  { text: "Пост «Скрининг 20 нед» — 34 лайка", time: "2 ч", icon: "Heart", color: "#e06080" },
                  { text: "Елена Р. подала жалобу", time: "3 ч", icon: "AlertTriangle", color: "#f59e0b" },
                ].map((e, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 border-b last:border-0" style={{ borderColor: "#f5f0ff" }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: e.color + "20" }}>
                      <Icon name={e.icon as "Bell"} size={13} fallback="Circle" style={{ color: e.color }} />
                    </div>
                    <p className="flex-1 text-sm text-gray-700">{e.text}</p>
                    <span className="text-[10px] text-gray-400 shrink-0">{e.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top specialists */}
            <div className="bg-white rounded-2xl p-4" style={{ border: "1px solid #f0e8ff", boxShadow: "0 2px 12px rgba(140,80,200,0.06)" }}>
              <h3 className="font-bold text-sm text-gray-800 mb-3 flex items-center gap-2">
                <Icon name="Star" size={15} className="text-yellow-400" />
                Топ специалистов (апрель)
              </h3>
              {[
                { name: "Педиатр Анна", sessions: 28, revenue: "33 600 ₽", emoji: "👩‍⚕️" },
                { name: "Акушер Ирина", sessions: 20, revenue: "40 000 ₽", emoji: "🌸" },
                { name: "Психолог Дмитрий", sessions: 15, revenue: "22 500 ₽", emoji: "🧠" },
              ].map((sp, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0" style={{ borderColor: "#f5f0ff" }}>
                  <span className="text-xl">{sp.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-gray-800">{sp.name}</p>
                    <p className="text-xs text-gray-400">{sp.sessions} сессий</p>
                  </div>
                  <p className="font-bold text-sm" style={{ color: "#16a34a" }}>{sp.revenue}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── USERS ── */}
        {activeTab === "users" && (
          <div className="animate-fade-in flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300" />
                <input
                  className="w-full rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none"
                  style={{ background: "white", border: "1.5px solid #ede9fe" }}
                  placeholder="Поиск пользователей..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <button className="px-3 py-2.5 rounded-xl text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #9c6edb, #7c4db8)" }}>
                + Добавить
              </button>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid #ede9fe", boxShadow: "0 2px 12px rgba(140,80,200,0.06)" }}>
              <div className="px-4 py-2.5 flex items-center gap-3" style={{ background: "#f5f0ff", borderBottom: "1px solid #ede9fe" }}>
                <p className="text-xs font-bold text-purple-600 flex-1">Участница</p>
                <p className="text-xs font-bold text-purple-600 w-16 text-center hidden sm:block">Город</p>
                <p className="text-xs font-bold text-purple-600 w-16 text-center">Статус</p>
                <p className="text-xs font-bold text-purple-600 w-8 text-center">...</p>
              </div>
              {filteredUsers.map((u, i) => (
                <div key={u.id} className="px-4 py-3 flex items-center gap-3 border-b last:border-0 hover:bg-purple-50/30 transition-colors cursor-pointer animate-fade-in" style={{ borderColor: "#f5f0ff", animationDelay: `${i * 0.04}s` }} onClick={() => setSelectedUser(u.id === selectedUser ? null : u.id)}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-base shrink-0" style={{ background: "#f5f0ff" }}>{u.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-gray-800 truncate">{u.name}</p>
                    <p className="text-[10px] text-gray-400 truncate">{u.email}</p>
                  </div>
                  <p className="text-xs text-gray-500 w-16 text-center hidden sm:block shrink-0">{u.city}</p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full w-20 text-center shrink-0" style={{ background: statusColor[u.status], color: statusText[u.status] }}>{statusLabel[u.status]}</span>
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 hover:bg-purple-100 transition-colors" style={{ background: "#f5f0ff" }}>
                    <Icon name="MoreVertical" size={13} className="text-purple-400" />
                  </button>
                </div>
              ))}
            </div>

            {/* Expanded user detail */}
            {selectedUser && (() => {
              const u = crmUsers.find(x => x.id === selectedUser);
              if (!u) return null;
              return (
                <div className="bg-white rounded-2xl p-4 animate-fade-in" style={{ border: "1.5px solid #9c6edb33", boxShadow: "0 4px 20px rgba(140,80,200,0.12)" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{u.emoji}</div>
                    <div>
                      <p className="font-bold text-base text-gray-800">{u.name}</p>
                      <p className="text-xs text-gray-500">{u.email} • {u.city}</p>
                    </div>
                    <span className="ml-auto text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: statusColor[u.status], color: statusText[u.status] }}>{statusLabel[u.status]}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { label: "Малыш", value: u.child },
                      { label: "В клубе с", value: u.joined },
                      { label: "Постов", value: String(u.posts) },
                    ].map((s, i) => (
                      <div key={i} className="rounded-xl p-2.5 text-center" style={{ background: "#f5f0ff" }}>
                        <p className="font-bold text-sm text-purple-700">{s.value}</p>
                        <p className="text-[10px] text-gray-500">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-xl text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #9c6edb, #7c4db8)" }}>Написать</button>
                    <button className="flex-1 py-2 rounded-xl text-xs font-bold" style={{ background: "#fee2e2", color: "#b91c1c" }}>Заблокировать</button>
                    <button className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#f5f0ff" }}>
                      <Icon name="X" size={14} className="text-purple-400" onClick={() => setSelectedUser(null)} />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ── CONSULTATIONS ── */}
        {activeTab === "consultations" && (
          <div className="animate-fade-in flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-gray-600">{consultations.length} заявок</p>
              <div className="flex gap-1.5">
                {["Все", "Ожидают", "Завершены"].map(f => (
                  <button key={f} className="text-[11px] font-bold px-2.5 py-1 rounded-lg" style={{ background: f === "Все" ? "linear-gradient(135deg, #9c6edb, #7c4db8)" : "#f0e8ff", color: f === "Все" ? "white" : "#9060c0" }}>{f}</button>
                ))}
              </div>
            </div>

            {consultations.map((c, i) => (
              <div key={c.id} className="bg-white rounded-2xl p-4 animate-fade-in" style={{ border: "1px solid #ede9fe", boxShadow: "0 2px 12px rgba(140,80,200,0.05)", animationDelay: `${i * 0.06}s` }}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-sm text-gray-800">{c.user}</p>
                    <p className="text-xs text-purple-500 font-semibold">{c.specialist}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: statusColor[c.status], color: statusText[c.status] }}>{statusLabel[c.status]}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2.5">{c.topic}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Icon name="Clock" size={12} />
                    {c.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-green-600">{c.price}</span>
                    {c.status === "pending" && (
                      <button className="text-[11px] font-bold px-2.5 py-1 rounded-lg text-white" style={{ background: "linear-gradient(135deg, #9c6edb, #7c4db8)" }}>
                        Подтвердить
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── ANALYTICS ── */}
        {activeTab === "analytics" && (
          <div className="animate-fade-in flex flex-col gap-4">
            {/* Monthly summary */}
            <div className="bg-white rounded-2xl p-4" style={{ border: "1px solid #ede9fe", boxShadow: "0 2px 12px rgba(140,80,200,0.06)" }}>
              <h3 className="font-bold text-sm text-gray-800 mb-4 flex items-center gap-2">
                <Icon name="TrendingUp" size={15} className="text-purple-400" />
                Апрель 2026
              </h3>
              {/* Bar chart mockup */}
              <div className="flex items-end gap-1.5 h-24 mb-2">
                {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95, 68, 72, 88, 45, 60, 78, 55, 82, 70, 65, 90, 48, 76, 83, 55, 67, 79, 88].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-sm transition-all hover:opacity-80 cursor-pointer" style={{ height: `${h}%`, background: i === 29 ? "linear-gradient(to top, #9c6edb, #c4b5fd)" : "linear-gradient(to top, #ede9fe, #ddd6fe)", minWidth: "4px" }}></div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 font-semibold">
                <span>1 апр</span><span>10</span><span>20</span><span>30 апр</span>
              </div>
            </div>

            {/* Distribution */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-4" style={{ border: "1px solid #ede9fe" }}>
                <h4 className="text-xs font-bold text-gray-600 mb-3">Темы постов</h4>
                {[
                  { label: "Беременность", pct: 32, color: "#f9a8d4" },
                  { label: "Кормление", pct: 24, color: "#c4b5fd" },
                  { label: "Сон", pct: 18, color: "#fed7aa" },
                  { label: "Развитие", pct: 16, color: "#99f6e4" },
                  { label: "Другое", pct: 10, color: "#e0e7ff" },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 mb-1.5">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: t.color }}></div>
                    <p className="text-[11px] text-gray-600 flex-1">{t.label}</p>
                    <p className="text-[11px] font-bold text-gray-700">{t.pct}%</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-4" style={{ border: "1px solid #ede9fe" }}>
                <h4 className="text-xs font-bold text-gray-600 mb-3">Города</h4>
                {[
                  { label: "Москва", value: 482, pct: 38 },
                  { label: "СПб", value: 196, pct: 15 },
                  { label: "Казань", value: 128, pct: 10 },
                  { label: "Новосибирск", value: 89, pct: 7 },
                  { label: "Другие", value: 389, pct: 30 },
                ].map((c, i) => (
                  <div key={i} className="mb-2">
                    <div className="flex justify-between text-[11px] mb-0.5">
                      <span className="text-gray-600">{c.label}</span>
                      <span className="font-bold text-gray-700">{c.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: "#f0e8ff" }}>
                      <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: "linear-gradient(90deg, #9c6edb, #c4b5fd)" }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Funnels */}
            <div className="bg-white rounded-2xl p-4" style={{ border: "1px solid #ede9fe", boxShadow: "0 2px 12px rgba(140,80,200,0.06)" }}>
              <h3 className="font-bold text-sm text-gray-800 mb-3 flex items-center gap-2">
                <Icon name="Filter" size={15} className="text-purple-400" />
                Воронка консультаций
              </h3>
              {[
                { label: "Просмотрели специалистов", value: 846, color: "#ede9fe" },
                { label: "Нажали «Записаться»", value: 312, color: "#ddd6fe" },
                { label: "Оплатили", value: 124, color: "#c4b5fd" },
                { label: "Прошли консультацию", value: 108, color: "#a78bfa" },
                { label: "Оставили отзыв", value: 89, color: "#8b5cf6" },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 mb-2">
                  <div className="h-7 rounded-lg flex items-center px-3 text-[11px] font-bold" style={{ width: `${(f.value / 846) * 100}%`, background: f.color, minWidth: "80px", color: i > 2 ? "white" : "#5b21b6" }}>
                    {f.value}
                  </div>
                  <p className="text-[11px] text-gray-500">{f.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
