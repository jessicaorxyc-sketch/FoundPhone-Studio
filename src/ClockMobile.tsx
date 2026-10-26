import { useEffect, useState } from "react";
import "./clock-mobile.css";

const cities = [
  { city: "北京", zone: "Asia/Shanghai", region: "中国" },
  { city: "巴黎", zone: "Europe/Paris", region: "法国" },
  { city: "吉隆坡", zone: "Asia/Kuala_Lumpur", region: "马来西亚" },
];
const initialAlarms = [
  { time: "07:15", label: "起床", days: "周一至周五", enabled: true },
  { time: "07:40", label: "再睡五分钟", days: "周一至周五", enabled: false },
  { time: "08:30", label: "周末起床", days: "周六、周日", enabled: true },
  { time: "12:45", label: "午觉", days: "每天", enabled: true },
  { time: "13:25", label: "午休结束", days: "周一至周五", enabled: false },
];
export function ClockMobile() {
  const [tab, setTab] = useState("世界时钟");
  const [now, setNow] = useState(() => new Date());
  const [alarms, setAlarms] = useState(initialAlarms);
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const format = (zone: string) => new Intl.DateTimeFormat("zh-CN", { timeZone: zone, hour: "2-digit", minute: "2-digit", hour12: false }).format(now);
  const date = (zone: string) => new Intl.DateTimeFormat("zh-CN", { timeZone: zone, weekday: "long", month: "numeric", day: "numeric" }).format(now);
  return <div className="clock-mobile">
    <header className="clock-head"><button onClick={() => setEditing(!editing)}>{editing ? "完成" : "编辑"}</button><button onClick={() => setTab("闹钟")}>＋</button></header>
    <h1>{tab}</h1>
    <main className="clock-body">
      {tab === "世界时钟" && cities.map(c => <div className="clock-city" key={c.zone}><div><span>{date(c.zone)}</span><strong>{c.city}</strong><small>{c.region}</small></div><time>{format(c.zone)}</time></div>)}
      {tab === "闹钟" && <><div className="clock-sleep"><span>睡眠 | 起床闹钟</span><strong>早上好</strong><small>为每天留一点从容的时间</small></div>{alarms.map((a,i) => <div className="clock-alarm" key={i}><div><time>{a.time}</time><span>{a.label} · {a.days}</span></div><button role="switch" aria-checked={a.enabled} className={a.enabled ? "on" : ""} onClick={() => setAlarms(old => old.map((v,j) => i === j ? {...v, enabled: !v.enabled} : v))}><i/></button></div>)}</>}
      {tab === "秒表" && <div className="clock-placeholder">秒表</div>}
      {tab === "计时器" && <div className="clock-placeholder">计时器</div>}
    </main>
    <nav className="clock-tabs">{[["世界时钟","◷"],["闹钟","◉"],["秒表","◴"],["计时器","◌"]].map(([t,ico])=><button key={t} className={tab===t?"active":""} onClick={()=>setTab(t)}><b>{ico}</b><span>{t}</span></button>)}</nav>
  </div>;
}
