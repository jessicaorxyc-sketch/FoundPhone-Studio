import { useState } from "react";
import { ArrowLeft, Heart, ListMusic, Menu, Music2, Pause, Play, Search, SkipBack, SkipForward } from "lucide-react";
import "./netease-mobile.css";

type Song = { title: string; artist: string; url: string };
export function NeteaseMobile({ song, songs, onSelect, onBack }: { song: Song | null; songs: Song[]; onSelect: (url: string) => void; onBack: () => void }) {
  const [tab, setTab] = useState("心动");
  const [liked, setLiked] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("首页");
  const active = song ?? songs[0];
  const index = songs.findIndex((s) => s.url === active.url);
  const choose = (offset: number) => onSelect(songs[(index + offset + songs.length) % songs.length].url);
  if (song) return <div className="nm nm-player">
    <header className="nm-player-top"><button onClick={onBack} aria-label="返回首页"><ArrowLeft /></button><div><strong>{song.title}</strong><small>{song.artist}</small></div><button onClick={() => setLiked(!liked)} aria-label="喜欢"><Heart fill={liked ? "#e5474d" : "none"} color={liked ? "#e5474d" : "#fff"} /></button></header>
    <div className="nm-turntable"><div className="nm-arm"><div className="nm-arm-base" /><div className="nm-arm-rod" /></div><div className={"nm-disc" + (playing ? " nm-spinning" : "")}><div className="nm-disc-label"><Music2 size={48} /><span>{song.title}</span><small>{song.artist}</small></div></div></div>
    <div className="nm-track"><strong>{song.title}</strong><span>{song.artist}</span></div>
    <div className="nm-progress"><div className="nm-progress-line"><i /></div><div><span>00:00</span><span>— / —</span></div></div>
    <div className="nm-controls"><button aria-label="上一首" onClick={() => choose(-1)}><SkipBack fill="currentColor" /></button><button className="nm-play" aria-label={playing ? "暂停" : "播放"} onClick={() => setPlaying(!playing)}>{playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}</button><button aria-label="下一首" onClick={() => choose(1)}><SkipForward fill="currentColor" /></button></div>
    <div className="nm-note">站内模拟界面，暂未接入授权音源，播放按钮仅演示状态。</div>
    <nav className="nm-bottom"><button onClick={onBack}>首页</button><button onClick={onBack}>搜索</button><button onClick={onBack}>笔记</button><button onClick={onBack}>我的</button></nav>
  </div>;
  return <div className="nm nm-home">
    <div className="nm-top"><Menu size={22} /><div className="nm-tabs">{["心动","推荐","音乐","播客","听书","免费听"].map((t) => <button key={t} onClick={() => setTab(t)} className={tab === t ? "selected" : ""}>{t}</button>)}</div><Search size={22} /></div>
    {page === "搜索" ? <div className="nm-search"><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="搜索歌曲或歌手" autoFocus /><div className="nm-results">{songs.filter((s) => (s.title+s.artist).includes(search)).map((s) => <button key={s.url} onClick={() => onSelect(s.url)}><Music2 /><span>{s.title}<small>{s.artist}</small></span><Play size={17}/></button>)}</div></div> : <>
      {tab === "心动" ? <section className="nm-feature" onClick={() => onSelect(songs[0].url)}><div className="nm-feature-disc"><Music2 size={44}/><span>心动精选</span></div><strong>心动 · 私藏歌单</strong><small>11 首想分享给你的歌</small></section> : <section className="nm-banner"><Music2 size={30}/><strong>{tab} · 今日推荐</strong><small>为你精选的心动歌曲</small></section>}
      <div className="nm-quick">{["排行榜","歌单","轻音乐","原创"].map((t) => <button key={t} onClick={() => setTab(t)}>♫ {t}</button>)}</div>
      <h3>甄选歌单 <span>›</span></h3><div className="nm-cards">{songs.slice(0,4).map((s,i) => <button key={s.url} onClick={() => onSelect(s.url)}><div className={"nm-cover nm-cover-"+i}><Music2 size={28}/></div><span>{s.title}</span><small>{s.artist}</small></button>)}</div>
      <h3>最近喜欢 <span>›</span></h3><div className="nm-songlist">{songs.slice(0,5).map((s) => <button key={s.url} onClick={() => onSelect(s.url)}><div className="nm-songthumb"><Music2 size={18}/></div><span>{s.title}<small>{s.artist}</small></span><Play size={16}/></button>)}</div>
    </>}
    <div className="nm-mini" onClick={() => onSelect(active.url)}><div className="nm-mini-cover"><Music2 size={18}/></div><span>{active.title}<small>{active.artist}</small></span><Play size={22}/><ListMusic size={20}/></div>
    <nav className="nm-bottom">{["首页","搜索","笔记","我的"].map((t) => <button key={t} className={page===t?"selected":""} onClick={() => setPage(t)}>{t}</button>)}</nav>
  </div>;
}
