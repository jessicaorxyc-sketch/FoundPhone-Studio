import { AudioPlayer, useTrack } from "../audio";
import { BilibiliVideo } from "../BilibiliVideo";
import { useSkinState } from "../skinState";
import {
  Bookmark,
  Check,
  Compass,
  Heart,
  Home,
  MessageCircle,
  Music,
  Play,
  Plus,
  Search,
  SkipForward,
  User,
  Users,
  Video,
} from "lucide-react";
import { useState } from "react";
import { safeMedia, type Item } from "../schema";
import {
  Avatar,
  Empty,
  groupItems,
  Header,
  Media,
  meta,
  SearchBox,
  Tabs,
  useContent,
  type Props,
} from "./shared";
function TrackPlayer({
  item,
  p,
  onNext,
}: {
  item: Item;
  p: Props;
  onNext: () => void;
}) {
  return (
    <div className="track-player">
      <button onClick={() => p.onItem(item)}>
        <Music size={20} />
        <span>
          {item.title}
          <small>{item.sender}</small>
        </span>
      </button>
      {item.kind === "audio" && safeMedia(item.media) ? (
        <AudioPlayer p={p} item={item} />
      ) : (
        <button onClick={() => p.onItem(item)}>查看</button>
      )}
      <button aria-label="下一首" onClick={onNext}>
        <SkipForward size={19} />
      </button>
    </div>
  );
}
export function SpotifySkin(p: Props) {
  const { tab, setTab, q, setQ, items } = useContent(p, "首页");
  const [playlist, setPlaylist] = useState(""),
    [track, setTrack] = useTrack(p, items);
  const list = playlist
    ? items.filter((i) => (i.folder || "我的音乐") === playlist)
    : items;
  return (
    <div className="catalog-skin spotify-ui">
      <Header p={p} />
      <div className="catalog-scroll">
        <div className="spotify-heading">
          <Avatar name={p.owner ?? "我"} />
          <button
            className={tab === "首页" ? "selected" : ""}
            onClick={() => setTab("首页")}
          >
            音乐
          </button>
          <button
            className={tab === "音乐库" ? "selected" : ""}
            onClick={() => setTab("音乐库")}
          >
            音乐库
          </button>
        </div>
        {tab === "搜索" && <SearchBox value={q} set={setQ} />}
        <h1>{playlist || (tab === "音乐库" ? "音乐库" : "为你收藏")}</h1>
        {!playlist && (
          <div className="spotify-playlists">
            {groupItems(items, "我的音乐").map((g) => (
              <button key={g} onClick={() => setPlaylist(g)}>
                <Music size={29} />
                <strong>{g}</strong>
              </button>
            ))}
          </div>
        )}
        {playlist && (
          <button className="playlist-back" onClick={() => setPlaylist("")}>
            返回全部音乐
          </button>
        )}
        <div className="spotify-tracks">
          {list.map((i, n) => (
            <button
              key={i.id}
              onClick={() => {
                setTrack(i);
              }}
            >
              <span>{n + 1}</span>
              <div>
                <strong>{i.title}</strong>
                <small>
                  {i.sender} · {meta(i, "album")}
                </small>
              </div>
              <small>{meta(i, "duration")}</small>
            </button>
          ))}
        </div>
        <Empty items={list} />
      </div>
      {track && (
        <TrackPlayer
          item={track}
          p={p}
          onNext={() =>
            setTrack(
              items[
                (items.findIndex((i) => i.id === track.id) + 1) % items.length
              ],
            )
          }
        />
      )}
      <Tabs
        tabs={["首页", "搜索", "音乐库"]}
        value={tab}
        set={(t) => {
          setTab(t);
          setPlaylist("");
        }}
        icons={[<Home />, <Search />, <Music />]}
      />
    </div>
  );
}
export function NeteaseSkin(p: Props) {
  const { tab, setTab, q, setQ, items } = useContent(p, "发现");
  const [folder, setFolder] = useState(""),
    [track, setTrack] = useTrack(p, items);
  const list = folder
    ? items.filter((i) => (i.folder || "我的歌单") === folder)
    : items;
  return (
    <div className="catalog-skin netease-ui">
      <Header p={p} />
      <div className="catalog-scroll">
        <SearchBox value={q} set={setQ} />
        {tab === "发现" ? (
          <>
            <div className="netease-feature">
              <Music size={44} />
              <h2>推荐歌单</h2>
            </div>
            <div className="netease-shelves">
              {groupItems(items, "我的歌单").map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    setFolder(g);
                    setTab("我的");
                  }}
                >
                  <Music size={33} />
                  <strong>{g}</strong>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="netease-profile">
              <Avatar name={p.owner ?? "我"} />
              <h2>{p.owner ?? "我的音乐"}</h2>
            </div>
            <h3>{folder || "我的歌单"}</h3>
          </>
        )}
        {list.map((i, n) => (
          <div className="netease-track" key={i.id}>
            <button
              onClick={() => {
                setTrack(i);
              }}
            >
              <span>{n + 1}</span>
              <div>
                <strong>{i.title}</strong>
                <small>
                  {i.sender} · {meta(i, "album")}
                </small>
              </div>
            </button>
            <button
              aria-label={`歌曲详情${i.title}`}
              onClick={() => p.onItem(i)}
            >
              <MessageCircle size={18} />
            </button>
          </div>
        ))}
        <Empty items={list} />
      </div>
      {track && (
        <TrackPlayer
          item={track}
          p={p}
          onNext={() =>
            setTrack(
              items[
                (items.findIndex((i) => i.id === track.id) + 1) % items.length
              ],
            )
          }
        />
      )}
      <Tabs
        tabs={["发现", "我的"]}
        value={tab}
        set={(t) => {
          setTab(t);
          setFolder("");
        }}
        icons={[<Compass />, <Music />]}
      />
    </div>
  );
}
export function YouTubeSkin(p: Props) {
  const { tab, setTab, q, setQ, items } = useContent(p, "首页");
  const [category, setCategory] = useState("全部");
  const list = items.filter((i) =>
    tab === "Shorts"
      ? i.folder === "Shorts"
      : tab === "订阅"
        ? i.folder === "订阅"
        : tab === "播放列表"
          ? i.favorite || i.folder === "播放列表"
          : category === "全部" || i.folder === category,
  );
  return (
    <div className="catalog-skin youtube-ui">
      <Header p={p} />
      <SearchBox value={q} set={setQ} />
      <div className="youtube-chips">
        {["全部", ...groupItems(items).filter((g) => g !== "未分类")].map(
          (g) => (
            <button
              className={category === g ? "selected" : ""}
              key={g}
              onClick={() => setCategory(g)}
            >
              {g}
            </button>
          ),
        )}
      </div>
      <div className="catalog-scroll">
        <div className={tab === "Shorts" ? "youtube-shorts" : "youtube-videos"}>
          {list.map((i) => (
            <article key={i.id}>
              <button className="youtube-thumb" onClick={() => p.onItem(i)}>
                <Media item={i} />
                {meta(i, "duration") && <time>{meta(i, "duration")}</time>}
              </button>
              <button className="youtube-byline" onClick={() => p.onItem(i)}>
                <Avatar name={i.sender} />
                <div>
                  <strong>{i.title}</strong>
                  <small>
                    {i.sender} · {meta(i, "views", "—")} 次播放
                  </small>
                </div>
              </button>
            </article>
          ))}
        </div>
        <Empty items={list} />
      </div>
      <Tabs
        tabs={["首页", "Shorts", "订阅", "播放列表"]}
        value={tab}
        set={setTab}
        icons={[<Home />, <Video />, <Users />, <User />]}
      />
    </div>
  );
}
export function BilibiliSkin(p: Props) {
  const { tab, setTab, q, setQ, items } = useContent(p, "首页");
  const [category, setCategory] = useState("推荐");
  const [featuredPlaying, setFeaturedPlaying] = useState(false);
  const list =
    tab === "历史"
      ? items.filter((i) => i.folder === "历史")
      : tab === "动态"
        ? items.filter((i) => i.folder === "动态")
        : category === "推荐"
          ? items
          : items.filter((i) => i.folder === category);
  return (
    <div className="catalog-skin bilibili-ui">
      <Header p={p} />
      <div className="bili-search">
        <Avatar name={p.owner ?? "我"} />
        <SearchBox value={q} set={setQ} />
      </div>
      <div className="bili-categories">
        {["推荐", "动画", "音乐", "生活"].map((c) => (
          <button
            key={c}
            className={category === c ? "selected" : ""}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="catalog-scroll">
        <div className="bili-grid">
        {(tab === "首页" && (category === "推荐" || category === "音乐")) && (
          <button type="button" className="bili-featured-video bili-featured-grid-item" onClick={() => setFeaturedPlaying(true)} aria-label="在手机内播放TF家族2026新年音乐会《来自天堂的魔鬼》纯享版">
            <div className="bili-featured-art"><span className="bili-featured-play"><Play size={28} fill="white" /></span><small>TF家族 · 2026新年音乐会「荣耀」</small></div>
            <strong>【TF家族】2026新年音乐会「荣耀」：《来自天堂的魔鬼》纯享版（DAY2）</strong>
            <span>哔哩哔哩 · 点击进入视频详情页</span>
          </button>
        )}
          {list.map((i) => (
            <button key={i.id} onClick={() => p.onItem(i)}>
              <div>
                <Media item={i} />
                <small>
                  <Play size={10} />
                  {meta(i, "views", "—")}
                  <time>{meta(i, "duration")}</time>
                </small>
              </div>
              <strong>{i.title}</strong>
              <span>UP · {i.sender}</span>
            </button>
          ))}
        </div>
        <Empty items={list} />
      </div>
      {featuredPlaying && <BilibiliVideo onClose={() => setFeaturedPlaying(false)} />}
      <Tabs
        tabs={["首页", "动态", "历史"]}
        value={tab}
        set={setTab}
        icons={[<Home />, <MessageCircle />, <User />]}
      />
    </div>
  );
}
function VerticalVideo({ p, item }: { p: Props; item: Item }) {
  const [liked, setLiked] = useSkinState<boolean>(p, `liked-${item.id}`, false),
    [saved, setSaved] = useSkinState<boolean>(p, `saved-${item.id}`, false);
  return (
    <article className="vertical-video">
      <Media item={item} />
      <div className="vertical-actions">
        <button
          aria-label={`作者${item.sender}`}
          onClick={() => p.onItem(item)}
        >
          <Avatar name={item.sender} />
        </button>
        <button
          aria-label={`喜欢${item.title}`}
          onClick={() => setLiked(!liked)}
        >
          <Heart size={29} fill={liked ? "#f44368" : "white"} />
          <small>{item.likes + (liked ? 1 : 0)}</small>
        </button>
        <button aria-label={`评论${item.title}`} onClick={() => p.onItem(item)}>
          <MessageCircle size={29} />
          <small>{item.comments.length}</small>
        </button>
        <button
          aria-label={`收藏${item.title}`}
          onClick={() => setSaved(!saved)}
        >
          <Bookmark size={27} fill={saved ? "#f8cc55" : "none"} />
        </button>
      </div>
      <button className="vertical-caption" onClick={() => p.onItem(item)}>
        <strong>@{item.sender}</strong>
        <p>{item.body}</p>
        <small>
          <Music size={11} />
          {item.title}
        </small>
      </button>
    </article>
  );
}
export function DouyinSkin(p: Props) {
  const { items } = useContent(p, "推荐");
  const [page,setPage] = useState<"首页"|"朋友"|"消息"|"我">("首页");
  const [feed,setFeed] = useState("推荐");
  const [index,setIndex] = useState(0);
  const [likes,setLikes] = useState<string[]>([]);
  const [saves,setSaves] = useState<string[]>([]);
  const [following,setFollowing] = useState<string[]>([]);
  const [panel,setPanel] = useState<"评论"|"分享"|"搜索"|"发布"|null>(null);
  const [draft,setDraft] = useState("");
  const [comments,setComments] = useState<string[]>([]);
  const [chat,setChat] = useState<string|null>(null);
  const [chatText,setChatText] = useState("");
  const [chatMessages,setChatMessages] = useState<string[]>([]);
  const [profileTab,setProfileTab] = useState("作品");
  const [paused,setPaused] = useState(false);
  const [expanded,setExpanded] = useState(false);
  const current = items.length ? items[index % items.length] : undefined;
  const toggle=(list:string[],set:(v:string[])=>void,id:string)=>set(list.includes(id)?list.filter(x=>x!==id):[...list,id]);
  const go=(delta:number)=>{if(items.length)setIndex(v=>(v+delta+items.length)%items.length);setPaused(false);setExpanded(false);};
  const nav=(next:typeof page)=>{setPage(next);setPanel(null);setChat(null);};
  return <div className={"catalog-skin douyin-ui dy-app dy-"+page}>
    {page==="首页"&&<><div className="dy-feed-top"><button onClick={()=>setPanel("搜索")}>☰</button><div>{["热点","直播","精选","同城","商城","关注","推荐"].map(t=><button key={t} className={feed===t?"selected":""} onClick={()=>{setFeed(t);setIndex(0)}}>{t}</button>)}</div><button onClick={()=>setPanel("搜索")} aria-label="搜索"><Search size={22}/></button></div>
    <div className="dy-feed" onTouchStart={e=>{(e.currentTarget as HTMLElement).dataset.startY=String(e.touches[0].clientY)}} onTouchEnd={e=>{const d=Number((e.currentTarget as HTMLElement).dataset.startY)-e.changedTouches[0].clientY;if(Math.abs(d)>55)go(d>0?1:-1)}}>
    {current?<><div className="dy-media" onClick={()=>setPaused(v=>!v)}><Media item={current}/>{paused&&<span className="dy-paused"><Play size={38} fill="white"/></span>}</div>
    <div className="dy-side"><button onClick={()=>toggle(following,setFollowing,current.sender)}><Avatar name={current.sender}/><span className="dy-plus">{following.includes(current.sender)?"✓":"+"}</span></button><button onClick={()=>toggle(likes,setLikes,current.id)}><Heart size={30} fill={likes.includes(current.id)?"#ff315a":"white"} color={likes.includes(current.id)?"#ff315a":"white"}/><small>{current.likes+(likes.includes(current.id)?1:0)}</small></button><button onClick={()=>setPanel("评论")}><MessageCircle size={30} fill="white"/><small>{current.comments.length+comments.length}</small></button><button onClick={()=>toggle(saves,setSaves,current.id)}><Bookmark size={30} fill={saves.includes(current.id)?"#ffd466":"white"}/><small>收藏</small></button><button onClick={()=>setPanel("分享")}><span style={{fontSize:30}}>➦</span><small>分享</small></button></div>
    <div className="dy-caption"><strong>@{current.sender}</strong><p onClick={()=>setExpanded(v=>!v)}>{expanded?current.body:current.body.slice(0,75)}{!expanded&&current.body.length>75?"… 展开":""}</p><small>♫ {current.title}</small></div></>:<div className="dy-empty">暂无视频，可在故事中添加视频内容</div>}
    <div className="dy-swipe"><button onClick={()=>go(-1)}>↑</button><button onClick={()=>go(1)}>↓</button></div></div></>}
    {page==="朋友"&&<div className="dy-white"><div className="dy-heading">朋友 <button onClick={()=>setPanel("搜索")}><Search/></button></div><div className="dy-friend-intro"><Users size={42}/><h2>发现朋友的日常</h2><p>关注喜欢的创作者，查看他们的最新作品</p></div>{items.slice(0,8).map(i=><button className="dy-person" key={i.id} onClick={()=>toggle(following,setFollowing,i.sender)}><Avatar name={i.sender}/><span><strong>{i.sender}</strong><small>{i.title}</small></span><b>{following.includes(i.sender)?"已关注":"+ 关注"}</b></button>)}</div>}
    {page==="消息"&&<div className="dy-white"><div className="dy-heading"><button onClick={()=>setPanel("搜索")}>☰</button>消息<button onClick={()=>setPanel("搜索")}><Search/></button></div>{chat?<><div className="dy-chat-title"><button onClick={()=>setChat(null)}>‹</button>{chat}</div><div className="dy-chat-body">{chatMessages.map((m,i)=><p key={i}>{m}</p>)}</div><div className="dy-chat-send"><input value={chatText} onChange={e=>setChatText(e.target.value)} placeholder="发送消息"/><button onClick={()=>{if(chatText.trim())setChatMessages(v=>[...v,chatText.trim()]);setChatText("")}}>发送</button></div></>:<><div className="dy-shortcuts">{[["👥","粉丝"],["♥","赞与其他"],["●","评论弹幕"],["✓","群通知"],["◉","限时日常"]].map(([ico,label])=><button key={label} onClick={()=>setChat(label)}><span>{ico}</span><small>{label}</small></button>)}</div>{["穆祉丞"].map((name)=><button className="dy-message" key={name} onClick={()=>{setChat(name);setChatMessages([])}}><span className="dy-msg-avatar">{name[0]}</span><span><strong>{name}</strong><small>点击开始聊天</small></span><time>刚刚</time></button>)}</>}</div>}
    {page==="我"&&<div className="dy-white dy-profile"><div className="dy-profile-hero"><div className="dy-profile-top"><button onClick={()=>setPanel("搜索")}>☰</button><span>♡ ♧ ⌕</span></div><div className="dy-profile-person"><Avatar name={p.owner??"我"}/><div><h2>{p.owner??"我的主页"}</h2><small>抖音号 · 我的账号</small></div></div></div><div className="dy-profile-stats"><span><b>{likes.length}</b>获赞</span><span><b>{following.length}</b>关注</span><span><b>0</b>粉丝</span><button onClick={()=>setPanel("发布")}>编辑主页</button></div><p className="dy-bio">记录生活，分享喜欢的瞬间。</p><div className="dy-profile-links">{["主播中心","我的订单","观看历史","我的钱包","全部功能"].map(x=><button key={x} onClick={()=>setProfileTab(x)}>{x}</button>)}</div><div className="dy-profile-tabs">{["作品","日常","推荐","收藏","喜欢"].map(x=><button key={x} className={profileTab===x?"selected":""} onClick={()=>setProfileTab(x)}>{x}</button>)}</div><div className="dy-profile-grid">{(profileTab==="收藏"?items.filter(i=>saves.includes(i.id)):profileTab==="喜欢"?items.filter(i=>likes.includes(i.id)):items).map(i=><button key={i.id} onClick={()=>{setIndex(items.indexOf(i));nav("首页")}}><Media item={i}/></button>)}</div></div>}
    <div className="dy-bottom">{(["首页","朋友","发布","消息","我"] as const).map(t=><button key={t} className={page===t?"active":""} onClick={()=>t==="发布"?setPanel("发布"):nav(t)}>{t==="发布"?<span className="dy-publish">+</span>:t}</button>)}</div>
    {panel&&<div className="dy-modal"><div className="dy-modal-head"><strong>{panel}</strong><button onClick={()=>setPanel(null)}>✕</button></div>{panel==="评论"?<><div className="dy-comment-list">{current?.comments.map((c,i)=><p key={i}>{typeof c==="string"?c:JSON.stringify(c)}</p>)}{comments.map((c,i)=><p key={i}>我：{c}</p>)}</div><div className="dy-input"><input value={draft} onChange={e=>setDraft(e.target.value)} placeholder="善语结善缘，恶语伤人心"/><button onClick={()=>{if(draft.trim())setComments(v=>[...v,draft.trim()]);setDraft("")}}>发送</button></div></>:panel==="分享"?<div className="dy-share-options"><button onClick={()=>{navigator.clipboard?.writeText(location.href);setPanel(null)}}>复制链接</button><button onClick={()=>setPanel(null)}>取消</button></div>:panel==="搜索"?<div className="dy-input"><Search/><input value={draft} onChange={e=>setDraft(e.target.value)} placeholder="搜索抖音内容"/></div>:<div className="dy-publish-panel"><p>从手机故事中添加视频，即可在推荐页展示。</p><button onClick={()=>setPanel(null)}>返回</button></div>}</div>}
  </div>;
}
export function TikTokSkin(p: Props) {
  const { tab, setTab, items } = useContent(p, "For You");
  const list =
    tab === "For You"
      ? items
      : tab === "Following"
        ? items.filter((i) => i.folder === "关注" || i.folder === "Following")
        : items.filter((i) => i.folder === "个人主页");
  return (
    <div className="catalog-skin tiktok-ui">
      <Header p={p} />
      <div className="tiktok-top">
        <button
          className={tab === "Following" ? "selected" : ""}
          onClick={() => setTab("Following")}
        >
          Following
        </button>
        <button
          className={tab === "For You" ? "selected" : ""}
          onClick={() => setTab("For You")}
        >
          For You
        </button>
      </div>
      <div className="vertical-feed">
        {list.map((i) => (
          <VerticalVideo key={i.id} p={p} item={i} />
        ))}
        <Empty items={list} />
      </div>
      <Tabs
        tabs={["For You", "Following", "Profile"]}
        value={tab}
        set={setTab}
        icons={[<Home />, <Users />, <User />]}
      />
    </div>
  );
}
export function NetflixSkin(p: Props) {
  const { tab, setTab, q, setQ, items } = useContent(p, "首页");
  const [saved, setSaved] = useSkinState<string[]>(p, "saved", []);
  const list =
    tab === "我的片单"
      ? items.filter((i) => i.favorite || saved.includes(i.id))
      : items;
  const featured = list[0];
  return (
    <div className="catalog-skin netflix-ui">
      <Header p={p} />
      <div className="catalog-scroll">
        <SearchBox value={q} set={setQ} />
        {featured && tab === "首页" && (
          <div className="netflix-feature">
            <Media item={featured} />
            <div>
              <strong>{featured.title}</strong>
              <small>
                {meta(featured, "year")} · {meta(featured, "genre")} ·{" "}
                {meta(featured, "duration")}
              </small>
              <button onClick={() => p.onItem(featured)}>
                <Play size={16} />
                播放 / 详情
              </button>
              <button
                onClick={() =>
                  setSaved(
                    saved.includes(featured.id)
                      ? saved.filter((id) => id !== featured.id)
                      : [...saved, featured.id],
                  )
                }
              >
                {saved.includes(featured.id) ? (
                  <Check size={16} />
                ) : (
                  <Plus size={16} />
                )}
                我的片单
              </button>
            </div>
          </div>
        )}
        {groupItems(list, "影片").map((g) => (
          <section className="netflix-shelf" key={g}>
            <h3>{g}</h3>
            <div>
              {list
                .filter((i) => (i.folder || "影片") === g)
                .map((i) => (
                  <button key={i.id} onClick={() => p.onItem(i)}>
                    <Media item={i} />
                    <strong>{i.title}</strong>
                  </button>
                ))}
            </div>
          </section>
        ))}
        <Empty items={list} />
      </div>
      <Tabs
        tabs={["首页", "我的片单"]}
        value={tab}
        set={setTab}
        icons={[<Home />, <Bookmark />]}
      />
    </div>
  );
}

