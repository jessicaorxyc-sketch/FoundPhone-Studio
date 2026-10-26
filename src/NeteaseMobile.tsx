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
  const [profileTab, setProfileTab] = useState("音乐");
  const [profileList, setProfileList] = useState<string | null>(null);
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
    {page === "我的" ? <div className="nm-profile">
      <div className="nm-profile-head"><div className="nm-profile-tools"><Menu size={21}/><span>＋ 添加状态</span><Search size={22}/><span>⋮</span></div><div className="nm-profile-avatar"><span>●</span></div><h2>得意黑-king <span className="nm-profile-vip">◉ 陆</span></h2><p className="nm-profile-bio">在白茫的人群中做一个得意的黑.(谁把得意黑这个名字给取了 气了好久)</p><p className="nm-profile-badges">♂ · ◈ 4枚徽章 · ♡ 邓紫棋乐迷 · 助眠冥想十级学者 · IP:重庆</p><div className="nm-profile-stats"><span>7 关注</span><span>37.4万 粉丝</span><span>Lv.5</span></div><div className="nm-profile-actions"><button onClick={() => setProfileList("关注")}>＋ 关注</button><button onClick={() => setProfileList("聊天")}>聊天</button><button onClick={() => setProfileList("更多")}>⌄</button></div></div>
      <div className="nm-profile-tabs">{["音乐","播客","笔记"].map(t=><button key={t} className={profileTab===t?"selected":""} onClick={()=>{setProfileTab(t);setProfileList(null)}}>{t}</button>)}</div>
      {profileList ? <div className="nm-profile-playlists"><button className="nm-profile-return" onClick={()=>setProfileList(null)}>‹ 返回</button><h3>{profileList}</h3>{songs.map((entry,i)=><button className="nm-profile-playlist" key={entry.url} onClick={()=>onSelect(entry.url)}><span className={"nm-profile-art nm-art-"+(i%4)}>♫</span><span>{entry.title}<small>{entry.artist}</small></span></button>)}</div> : profileTab==="音乐" ? <div className="nm-profile-playlists"><h4>创建的歌单 (3)</h4>{[["喜欢的音乐","60首 · 284.2万次播放","heart"],["听歌排行","累计听歌 268 首","bars"],["放空...","33首 · 86.6万次播放","flower"],["神化用.","30首 · 116.3万次播放","cover"]].map(([name,detail,art])=><button key={name} className="nm-profile-playlist" onClick={()=>setProfileList(name)}><span className={"nm-profile-art nm-art-"+art}>{art==="heart"?"♥":art==="bars"?"▥":"♫"}</span><span>{name}<small>{detail}</small></span></button>)}<h4>收藏的歌单 (3)</h4><button className="nm-profile-playlist" onClick={()=>setProfileList("收藏的歌单")}><span className="nm-profile-art nm-art-flower">♫</span><span>收藏的歌单<small>点击查看</small></span></button></div> : <div className="nm-profile-playlists"><h4>{profileTab}</h4><p>暂无展示内容</p></div>}
    </div> : page === "搜索" ? <div className="nm-search"><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="搜索歌曲或歌手" autoFocus /><div className="nm-results">{songs.filter((s) => (s.title+s.artist).includes(search)).map((s) => <button key={s.url} onClick={() => onSelect(s.url)}><Music2 /><span>{s.title}<small>{s.artist}</small></span><Play size={17}/></button>)}</div></div> : <>
      {tab === "心动" ? <section className="nm-feature" onClick={() => onSelect(songs[0].url)}><div className="nm-feature-disc"><Music2 size={44}/><span>心动精选</span></div><strong>心动 · 私藏歌单</strong><small>11 首想分享给你的歌</small></section> : <section className="nm-banner"><Music2 size={30}/><strong>{tab} · 今日推荐</strong><small>为你精选的心动歌曲</small></section>}
      <div className="nm-quick">{["排行榜","歌单","轻音乐","原创"].map((t) => <button key={t} onClick={() => setTab(t)}>♫ {t}</button>)}</div>
      <h3>甄选歌单 <span>›</span></h3><div className="nm-cards">{songs.slice(0,4).map((s,i) => <button key={s.url} onClick={() => onSelect(s.url)}><div className={"nm-cover nm-cover-"+i}><Music2 size={28}/></div><span>{s.title}</span><small>{s.artist}</small></button>)}</div>
      <h3>最近喜欢 <span>›</span></h3><div className="nm-songlist">{songs.slice(0,5).map((s) => <button key={s.url} onClick={() => onSelect(s.url)}><div className="nm-songthumb"><Music2 size={18}/></div><span>{s.title}<small>{s.artist}</small></span><Play size={16}/></button>)}</div>
    </>}
    <div className="nm-mini" onClick={() => onSelect(active.url)}><div className="nm-mini-cover"><Music2 size={18}/></div><span>{active.title}<small>{active.artist}</small></span><Play size={22}/><ListMusic size={20}/></div>
    <nav className="nm-bottom">{["首页","搜索","笔记","我的"].map((t) => <button key={t} className={page===t?"selected":""} onClick={() => setPage(t)}>{t}</button>)}</nav>
  </div>;
}
