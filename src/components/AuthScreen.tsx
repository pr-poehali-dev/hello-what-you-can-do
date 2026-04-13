import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/c7036e39-95fa-4881-9b8a-e193026450fa/files/64bc82e7-e5dc-4051-83b6-3d13c582a078.jpg";

interface AuthScreenProps {
  onAuth: (user: { name: string; email: string; isAdmin?: boolean }) => void;
}

export default function AuthScreen({ onAuth }: AuthScreenProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", city: "", childAge: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuth({
        name: form.name || "Мария И.",
        email: form.email,
        isAdmin: form.email === "admin@mamaclub.ru",
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Nunito', sans-serif", background: "linear-gradient(160deg, #fff0f5 0%, #f5f0ff 50%, #fff8f0 100%)" }}>
      {/* Top image */}
      <div className="relative h-52 overflow-hidden rounded-b-[2rem] shrink-0">
        <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(180,60,90,0.3) 0%, rgba(180,60,90,0.6) 100%)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl mb-2">🌸</div>
          <h1 className="text-white text-2xl font-semibold" style={{ fontFamily: "'Cormorant', serif" }}>МамаКлуб</h1>
          <p className="text-white/80 text-sm mt-1">Сообщество для мам</p>
        </div>
      </div>

      {/* Form card */}
      <div className="flex-1 mx-4 -mt-6 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-6" style={{ boxShadow: "0 8px 40px rgba(200,80,100,0.12)" }}>
          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-2xl mb-6" style={{ background: "#f5f0ff" }}>
            {(["login", "register"] as const).map(m => (
              <button
                key={m}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
                style={mode === m ? { background: "linear-gradient(135deg, hsl(350 60% 72%), hsl(350 55% 62%))", color: "white", boxShadow: "0 2px 10px rgba(200,80,100,0.3)" } : { color: "#999" }}
                onClick={() => setMode(m)}
              >
                {m === "login" ? "Войти" : "Регистрация"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            {mode === "register" && (
              <div className="animate-fade-in">
                <label className="text-xs font-bold text-gray-500 ml-1 mb-1 block">Ваше имя</label>
                <div className="relative">
                  <Icon name="User" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-300" />
                  <input
                    className="w-full rounded-xl pl-10 pr-4 py-3 text-sm font-semibold outline-none transition-all"
                    style={{ background: "#fff8fa", border: "1.5px solid #f5d0da" }}
                    placeholder="Мария"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    onFocus={e => (e.target.style.borderColor = "hsl(350 60% 72%)")}
                    onBlur={e => (e.target.style.borderColor = "#f5d0da")}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-gray-500 ml-1 mb-1 block">Email</label>
              <div className="relative">
                <Icon name="Mail" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-300" />
                <input
                  type="email"
                  className="w-full rounded-xl pl-10 pr-4 py-3 text-sm font-semibold outline-none transition-all"
                  style={{ background: "#fff8fa", border: "1.5px solid #f5d0da" }}
                  placeholder="mama@mail.ru"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  onFocus={e => (e.target.style.borderColor = "hsl(350 60% 72%)")}
                  onBlur={e => (e.target.style.borderColor = "#f5d0da")}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 ml-1 mb-1 block">Пароль</label>
              <div className="relative">
                <Icon name="Lock" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-300" />
                <input
                  type="password"
                  className="w-full rounded-xl pl-10 pr-4 py-3 text-sm font-semibold outline-none transition-all"
                  style={{ background: "#fff8fa", border: "1.5px solid #f5d0da" }}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  onFocus={e => (e.target.style.borderColor = "hsl(350 60% 72%)")}
                  onBlur={e => (e.target.style.borderColor = "#f5d0da")}
                />
              </div>
            </div>

            {mode === "register" && (
              <div className="grid grid-cols-2 gap-3 animate-fade-in">
                <div>
                  <label className="text-xs font-bold text-gray-500 ml-1 mb-1 block">Город</label>
                  <div className="relative">
                    <Icon name="MapPin" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
                    <input
                      className="w-full rounded-xl pl-9 pr-3 py-3 text-sm font-semibold outline-none transition-all"
                      style={{ background: "#fff8fa", border: "1.5px solid #f5d0da" }}
                      placeholder="Москва"
                      value={form.city}
                      onChange={e => setForm({ ...form, city: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 ml-1 mb-1 block">Возраст малыша</label>
                  <div className="relative">
                    <Icon name="Baby" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" fallback="Heart" />
                    <input
                      className="w-full rounded-xl pl-9 pr-3 py-3 text-sm font-semibold outline-none transition-all"
                      style={{ background: "#fff8fa", border: "1.5px solid #f5d0da" }}
                      placeholder="3 мес"
                      value={form.childAge}
                      onChange={e => setForm({ ...form, childAge: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl text-white font-bold text-base mt-1 transition-all hover:-translate-y-0.5 disabled:opacity-70"
              style={{ background: "linear-gradient(135deg, hsl(350 60% 72%), hsl(350 50% 60%))", boxShadow: "0 4px 20px rgba(200,80,100,0.35)" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Загрузка...
                </span>
              ) : (mode === "login" ? "Войти в клуб" : "Создать аккаунт")}
            </button>

            {mode === "login" && (
              <button type="button" className="text-center text-xs font-semibold" style={{ color: "hsl(350 50% 65%)" }}>
                Забыли пароль?
              </button>
            )}
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px" style={{ background: "#f0e0e8" }}></div>
            <span className="text-xs text-gray-400 font-semibold">или</span>
            <div className="flex-1 h-px" style={{ background: "#f0e0e8" }}></div>
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Google", emoji: "🔵" },
              { label: "VK", emoji: "💙" },
            ].map(s => (
              <button key={s.label} className="py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2" style={{ background: "#f9f5f5", border: "1.5px solid #f0e0e8", color: "#555" }}>
                <span>{s.emoji}</span> {s.label}
              </button>
            ))}
          </div>

          {/* Admin hint */}
          <p className="text-center text-[10px] text-gray-300 mt-5">
            Войти как admin: admin@mamaclub.ru
          </p>
        </div>
      </div>

      <div className="h-8"></div>
    </div>
  );
}
