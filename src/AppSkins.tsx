import { NativeComposer } from "./DeviceSystem";
import { useSkinState } from "./skinState";
import { useState } from "react";
import {
  ChevronLeft,
  Plus,
  CirclePlus,
  Search,
  MessageCircle,
  Users,
  Compass,
  User,
  Camera,
  Phone,
  Video,
  Settings,
  Heart,
  Send,
  Home,
  Play,
  Bookmark,
  MoreHorizontal,
  Mic,
  Smile,
  Grid,
  CheckCheck,
  AtSign,
  Star,
  Music,
  Image as ImageIcon,
  Layers,
  ShoppingBag,
} from "lucide-react";
import { safeMedia, type Item, type UiValue } from "./schema";
export type SkinProps = {
  ui?: Record<string, UiValue>;
  onUi?: (key: string, value: UiValue) => void;
  appId?: string;
  owner?: string;
  virtualTime?: string;
  name: string;
  items: Item[];
  creator: boolean;
  onRead: (id: string) => void;
  onItem: (i: Item) => void;
  onAdd: () => void;
  onBack: () => void;
  thread: string;
  onThread: (s: string) => void;
};
function Avatar({
  name,
  round = false,
  src = "",
}: {
  name: string;
  round?: boolean;
  src?: string;
}) {
  return (
    <span className={`skin-avatar ${round ? "round" : ""}`}>
      {safeMedia(src)?.startsWith("data:image/") ? (
        <img src={safeMedia(src)} alt="" />
      ) : (
        name.slice(0, 1)
      )}
    </span>
  );
}
function ItemMedia({ item }: { item: Item }) {
  const src = safeMedia(item.media);
  return src ? (
    item.kind === "audio" ? (
      <audio controls src={src} />
    ) : item.kind === "video" ? (
      <video controls playsInline src={src} />
    ) : (
      <img loading="lazy" alt={item.title} src={src} />
    )
  ) : (
    <div className="skin-photo">
      <span>{item.title}</span>
    </div>
  );
}
function MessageList({
  items,
  creator,
  onItem,
  onRead,
  whatsapp = false,
}: {
  items: Item[];
  creator: boolean;
  onItem: (i: Item) => void;
  onRead: (id: string) => void;
  whatsapp?: boolean;
}) {
  return (
    <div className={`skin-messages ${whatsapp ? "wa-wallpaper" : ""}`}>
      <div className="skin-date">{items[0]?.time.slice(0, 10)}</div>
      {items.map((i) => (
        <div
          key={i.id}
          className={`skin-message ${i.outgoing ? "outgoing" : ""}`}
        >
          {!whatsapp && !i.outgoing && (
            <Avatar name={i.sender} src={i.avatar} />
          )}
          <button
            className="skin-bubble"
            onClick={() => (creator ? onItem(i) : onRead(i.id))}
          >
            {["image", "audio", "video"].includes(i.kind) ? (
              <ItemMedia item={i} />
            ) : i.kind === "transfer" ? (
              <div className="skin-transfer">
                ¥ {i.body}
                <small>转账记录 · 虚构</small>
              </div>
            ) : (
              i.body
            )}
            <small className={whatsapp ? undefined : "wx-message-time"}>
              {i.time.slice(-5)}{" "}
              {whatsapp && i.outgoing && <CheckCheck size={11} />}
            </small>
          </button>
          {!whatsapp && i.outgoing && <Avatar name={i.sender} src={i.avatar} />}
        </div>
      ))}
    </div>
  );
}
function Compose({
  creator,
  onAdd,
  wa = false,
}: {
  creator: boolean;
  onAdd: () => void;
  wa?: boolean;
}) {
  return (
    <div className={`skin-compose ${wa ? "wa-compose" : ""}`}>
      {wa ? <Plus size={20} /> : <Mic size={20} />}
      <NativeComposer creator={creator} onAdd={onAdd} />

      <Smile size={21} />
      {wa ? <Mic size={20} /> : <Plus size={22} />}
    </div>
  );
}
export function WeChatSkin(p: SkinProps) {
  const [tab, setTab] = useState("微信"),
    [query, setQuery] = useState(""),
    [moments, setMoments] = useState(false),
    [menu, setMenu] = useState(false),
    [_searchOpen, setSearchOpen] = useState(false),
    [utility, setUtility] = useState("");
  const [readThreads, setReadThreads] = useSkinState<string[]>(
    p,
    "readThreads",
    [],
  );
  const conversations = [
    ...new Set(
      p.items
        .filter((i) => !["朋友圈", "我"].includes(i.folder))
        .map((i) => i.title),
    ),
  ];
  const wxDemoChats = [{title:"AAA丞哥",body:"[图片]",time:"23:25",avatar:"🍔"},{title:"铮儿 9.8",body:"[动态贴图]",time:"20:21",avatar:"✦"},{title:"已读不回 Rachel-1.4",body:"[动态贴图]",time:"13:00",avatar:"🌸"},{title:"Mu、瑶瑶蛋 Emily-1.4、AAA丞哥、穆…",body:"只要是她认不得就行",time:"7月2日",avatar:"👥"},{title:"官方账号",body:"[3则] 快讯",time:"23:23",avatar:"📘"},{title:"谁是凶手",body:"我天真了！告退！",time:"23:12",avatar:"🎭"},{title:"瑶瑶蛋 Emily-1.4",body:"[动态贴图]",time:"23:12",avatar:"🌷"},{title:"瓦群 一起上红豆🫘",body:"[27则] 初：[动态贴图] 你行",time:"23:08",avatar:"👥"},{title:"i冰蛋挞",body:"",time:"23:02",avatar:"🐻"}];
  const wxDemoContacts = ["新的朋友","仅聊天的朋友","群组","标签","官方账号","服务账号","WeCom 联系人","企业微信通知"];
  const posts = p.items.filter(
    (i) => i.folder === "朋友圈" || i.kind === "post",
  );
  return (
    <div
      className="wechat-ui independent-skin"
      data-tab={tab}
      data-thread={!!p.thread}
      data-moments={moments}
      data-utility={!!utility}
    >
      <style>{`\n.wechat-ui{background:#111;color:#f5f5f5}.wechat-ui .wx-nav{background:#111;color:#eee;border-bottom:0}.wechat-ui .skin-scroll{background:#111}.wechat-ui .wx-search{display:flex;align-items:center;background:#202020;color:#777;margin:10px 12px;padding:10px 12px;border-radius:8px}.wechat-ui .wx-search input{background:transparent;color:white;border:0;outline:0;width:100%}.wechat-ui .wx-chat-row,.wechat-ui .wx-contact{background:#202020;color:#eee;border-bottom:1px solid #303030;min-height:73px}.wechat-ui .wx-chat-row p{color:#858585}.wechat-ui .wx-chat-row time{color:#646464}.wechat-ui .wx-bottom{background:#1d1d1d;border-top:1px solid #303030}.wechat-ui .wx-bottom button{color:#b8b8b8}.wechat-ui .wx-bottom button.selected{color:#07c160}.wechat-ui .wx-profile{background:#181818;padding:45px 20px 34px}.wechat-ui .wx-profile h2{font-size:23px}.wechat-ui .wx-profile small{color:#999}.wechat-ui .wx-profile-menu{background:#111}.wechat-ui .wx-discovery{background:#202020;color:#ddd;border-bottom:1px solid #303030;min-height:59px}.wechat-ui .wx-contact{display:flex;align-items:center;gap:14px;padding:10px 16px}.wechat-ui .wx-reference-icon{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:5px;background:#168be1;color:white;font-size:24px}.wechat-ui .wx-contact:nth-of-type(1) .wx-reference-icon,.wechat-ui .wx-contact:nth-of-type(2) .wx-reference-icon{background:#fa9b32}.wechat-ui .wx-contact:nth-of-type(3) .wx-reference-icon{background:#07c160}

.wechat-ui .wx-contact{box-sizing:border-box;width:100%;display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:flex-start!important;text-align:left!important;gap:14px!important;padding:0 18px!important;min-height:57px!important;height:57px!important;border-radius:0!important;margin:0!important;font-size:15px!important;line-height:1.4!important;}
.wechat-ui .wx-contact .wx-reference-icon{flex:0 0 38px;width:38px;height:38px;margin:0!important;}
.wechat-ui .wx-contact:nth-of-type(-n+2) .wx-reference-icon{background:#f99a32}
.wechat-ui .wx-contact:nth-of-type(3) .wx-reference-icon{background:#08b969}
.wechat-ui .wx-contact:nth-of-type(n+4) .wx-reference-icon{background:#168be1}
.wechat-ui .wx-profile{display:flex;align-items:center;gap:16px;min-height:145px;box-sizing:border-box;}
.wechat-ui .wx-profile h2{color:inherit!important;opacity:1!important;margin:0 0 8px!important;}
.wechat-ui .wx-profile>div{min-width:0;}
.wechat-ui .wx-discovery{display:flex;align-items:center;gap:14px;width:100%;text-align:left;padding:0 18px;box-sizing:border-box;}
.wechat-ui .wx-discovery span:last-child{margin-left:auto;}
.wechat-ui[data-wx-theme="light"] .wx-profile,.wechat-ui[data-wx-theme="light"] .wx-profile h2{color:#191919!important;}
.wechat-ui[data-wx-theme="light"] .wx-contact{background:#fff;color:#191919;border-color:#ededed;}
.wechat-ui[data-wx-theme="light"] .wx-discovery{background:#fff;color:#191919;border-color:#ededed;}
.light-phone .wechat-ui{background:#f5f5f5;color:#191919}.light-phone .wechat-ui .wx-nav{background:#f7f7f7;color:#191919}.light-phone .wechat-ui .skin-scroll{background:#f5f5f5}.light-phone .wechat-ui .wx-search{background:#e8e8e8;color:#777}.light-phone .wechat-ui .wx-search input{color:#222}.light-phone .wechat-ui .wx-chat-row,.light-phone .wechat-ui .wx-contact,.light-phone .wechat-ui .wx-discovery{background:#fff;color:#191919;border-color:#e9e9e9}.light-phone .wechat-ui .wx-profile{background:#fff}.light-phone .wechat-ui .wx-profile-menu{background:#f5f5f5}.light-phone .wechat-ui .wx-bottom{background:#fafafa;border-color:#e7e7e7}.light-phone .wechat-ui .wx-bottom button{color:#666}.light-phone .wechat-ui .wx-bottom button.selected{color:#07c160}.light-phone .wechat-ui .wx-chat-row time{color:#aaa}.light-phone .wechat-ui .wx-chat-row p{color:#999}\n

/* Phone-wide appearance overrides: WeChat inherits the iPhone setting. */
.phone-shell.dark-phone .wechat-ui,
.phone-shell.dark-phone .wechat-ui .skin-scroll,
.phone-shell.dark-phone .wechat-ui .wx-profile-menu,
.phone-shell.dark-phone .wechat-ui .wx-discover-groups{background:#111!important;color:#f5f5f5!important;}
.phone-shell.dark-phone .wechat-ui .wx-nav,
.phone-shell.dark-phone .wechat-ui .wx-bottom{background:#191919!important;color:#f5f5f5!important;border-color:#303030!important;}
.phone-shell.dark-phone .wechat-ui .wx-chat-row,
.phone-shell.dark-phone .wechat-ui .wx-contact,
.phone-shell.dark-phone .wechat-ui .wx-discovery,
.phone-shell.dark-phone .wechat-ui .wx-profile{background:#202020!important;color:#f5f5f5!important;border-color:#303030!important;}
.phone-shell.dark-phone .wechat-ui .wx-chat-row strong,
.phone-shell.dark-phone .wechat-ui .wx-contact,
.phone-shell.dark-phone .wechat-ui .wx-profile h2,
.phone-shell.dark-phone .wechat-ui .wx-nav strong{color:#f5f5f5!important;}
.phone-shell.dark-phone .wechat-ui .wx-search{background:#242424!important;color:#aaa!important;}
.phone-shell.dark-phone .wechat-ui .wx-search input{background:transparent!important;color:#f5f5f5!important;}
.phone-shell.dark-phone .wechat-ui .wx-bottom button{color:#aaa!important;}
.phone-shell.dark-phone .wechat-ui .wx-bottom button.selected{color:#07c160!important;}
.phone-shell.light-phone .wechat-ui,
.phone-shell.light-phone .wechat-ui .skin-scroll{background:#f3f3f3!important;color:#191919!important;}
.phone-shell.light-phone .wechat-ui .wx-nav,
.phone-shell.light-phone .wechat-ui .wx-bottom{background:#fafafa!important;color:#191919!important;}
.phone-shell.light-phone .wechat-ui .wx-chat-row,
.phone-shell.light-phone .wechat-ui .wx-contact,
.phone-shell.light-phone .wechat-ui .wx-discovery,
.phone-shell.light-phone .wechat-ui .wx-profile{background:#fff!important;color:#191919!important;}
.phone-shell.light-phone .wechat-ui .wx-profile h2,
.phone-shell.light-phone .wechat-ui .wx-chat-row strong{color:#191919!important;}

/* Consistent iPhone-wide WeChat themes; no app-level switch. */
.phone-shell.dark-phone .wechat-ui .skin-messages{background:#111!important;color:#e9e9e9!important;}
.phone-shell.dark-phone .wechat-ui .skin-date{color:#858585!important;}
.phone-shell.dark-phone .wechat-ui .skin-bubble{background:#303030!important;color:#f4f4f4!important;border-color:#303030!important;}
.phone-shell.dark-phone .wechat-ui .skin-message.outgoing .skin-bubble{background:#285d3d!important;color:#f4f4f4!important;}
.phone-shell.dark-phone .wechat-ui .skin-compose{background:#202020!important;color:#f4f4f4!important;border-color:#303030!important;}
.phone-shell.dark-phone .wechat-ui .native-compose-field{background:#303030!important;color:#fff!important;}
.phone-shell.dark-phone .wechat-ui .skin-compose svg{color:#aaa!important;}
.phone-shell.dark-phone .wechat-ui .wx-chat-row,
.phone-shell.dark-phone .wechat-ui .wx-discovery,
.phone-shell.dark-phone .wechat-ui .wx-contact{border-bottom:1px solid #303030!important;box-shadow:none!important;}
.phone-shell.dark-phone .wechat-ui .wx-profile-menu .wx-discovery{border-bottom:1px solid #303030!important;}
.phone-shell.dark-phone .wechat-ui .wx-profile-menu{background:#111!important;}
.phone-shell.dark-phone .wechat-ui .wx-bottom{border-top:1px solid #303030!important;}
.phone-shell.light-phone .wechat-ui .skin-messages{background:#ededed!important;color:#191919!important;}
.phone-shell.light-phone .wechat-ui .skin-bubble{background:#fff!important;color:#191919!important;}
.phone-shell.light-phone .wechat-ui .skin-message.outgoing .skin-bubble{background:#95ec69!important;color:#191919!important;}
.phone-shell.light-phone .wechat-ui .skin-compose{background:#f6f6f6!important;color:#191919!important;}
.phone-shell.light-phone .wechat-ui .native-compose-field{background:#fff!important;color:#191919!important;}
.phone-shell.light-phone .wechat-ui .wx-search{background:#e7e7e7!important;color:#888!important;}
.phone-shell.light-phone .wechat-ui .wx-search input{color:#191919!important;}
.phone-shell.light-phone .wechat-ui .wx-chat-row,
.phone-shell.light-phone .wechat-ui .wx-contact,
.phone-shell.light-phone .wechat-ui .wx-discovery{border-bottom:1px solid #ededed!important;box-shadow:none!important;}

/* Remove inherited inset separators and their pseudo-elements in WeChat rows. */
.phone-shell .wechat-ui .wx-chat-row,
.phone-shell .wechat-ui .wx-profile-menu .wx-discovery{
 border:0!important;border-bottom:0!important;border-top:0!important;
 outline:0!important;box-shadow:none!important;
 background-image:none!important;
}
.phone-shell .wechat-ui .wx-chat-row::before,
.phone-shell .wechat-ui .wx-chat-row::after,
.phone-shell .wechat-ui .wx-profile-menu .wx-discovery::before,
.phone-shell .wechat-ui .wx-profile-menu .wx-discovery::after{
 content:none!important;display:none!important;border:0!important;
 box-shadow:none!important;background:none!important;
}
.phone-shell.dark-phone .wechat-ui .wx-profile-menu .wx-discovery{background:#202020!important;color:#f5f5f5!important;}
.phone-shell.light-phone .wechat-ui .wx-profile-menu .wx-discovery{background:#fff!important;color:#191919!important;}
`}</style>
      <div className="app-nav wx-nav">
        <button
          aria-label={utility || p.thread || moments ? "返回" : "收藏"}
          onClick={() =>
            utility
              ? setUtility("")
              : p.thread
                ? p.onThread("")
                : moments
                  ? setMoments(false)
                  : setUtility("收藏")
          }
        >
          {utility || p.thread || moments ? (
            <ChevronLeft size={22} />
          ) : (
            <Star size={22} />
          )}
        </button>
        <strong>
          {utility ||
            p.thread ||
            (moments ? "朋友圈" : tab === "微信" ? "微信" : tab)}
        </strong>
        <button
          aria-label={
            p.creator ? "新增内容" : p.thread ? "聊天详情" : "微信菜单"
          }
          onClick={
            p.creator
              ? p.onAdd
              : () => (p.thread ? setUtility("聊天信息") : setMenu(!menu))
          }
        >
          {p.thread ? <MoreHorizontal size={22} /> : <CirclePlus size={22} />}
        </button>
      </div>
      {menu && (
        <div className="wx-popup-menu" role="menu">
          {["搜索", "发起群聊", "添加朋友", "扫一扫", "收付款"].map((label) => (
            <button
              role="menuitem"
              key={label}
              onClick={() => {
                setMenu(false);
                if (label === "搜索") {
                  setSearchOpen(true);
                } else setUtility(label);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
      {utility ? (
        <div className="skin-scroll wx-utility">
          {utility === "聊天信息" && (
            <div className="wx-members">
              {[
                ...new Set(
                  p.items
                    .filter((i) => i.title === p.thread)
                    .map((i) => i.sender),
                ),
              ].map((name) => (
                <div key={name}>
                  <Avatar
                    name={name}
                    src={p.items.find((i) => i.sender === name)?.avatar}
                  />
                  <small>{name}</small>
                </div>
              ))}
            </div>
          )}
          {p.items
            .filter((i) => i.folder === utility)
            .map((i) => (
              <button
                key={i.id}
                className="wx-discovery"
                onClick={() => p.onItem(i)}
              >
                {i.title}
                <span>›</span>
              </button>
            ))}
          {!p.items.some((i) => i.folder === utility) &&
            utility !== "聊天信息" && <p className="skin-empty">暂无内容</p>}
        </div>
      ) : p.thread ? (
        <>
          <MessageList
            items={p.items.filter((i) => i.title === p.thread)}
            creator={p.creator}
            onItem={p.onItem}
            onRead={p.onRead}
          />
          <Compose creator={p.creator} onAdd={p.onAdd} />
        </>
      ) : moments ? (
        <div className="wx-moments">
          <div className="wx-moment-cover">
            <Camera size={32} />
            <span>朋友圈</span>
          </div>
          {posts.map((i) => (
            <button
              key={i.id}
              className="wx-moment-post"
              onClick={() => p.onItem(i)}
            >
              <Avatar name={i.sender} />
              <div>
                <strong>{i.sender}</strong>
                <p>{i.body}</p>
                {i.media && <ItemMedia item={i} />}
                <small>{i.time}</small>
              </div>
            </button>
          ))}
          {!posts.length && <p className="skin-empty">暂无朋友圈动态</p>}
          {p.creator && (
            <button className="phone-add" onClick={p.onAdd}>
              添加朋友圈动态
            </button>
          )}
        </div>
      ) : (
        <div className="skin-scroll">
          {tab === "微信" ? (
            <>
              {(
                <label className="wx-search">
                  <Search size={14} />
                  <input
                    aria-label="搜索微信内容"
                    placeholder="搜索"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
              )}
              {(conversations.length ? conversations : wxDemoChats.map(x => x.title))
                .filter(
                  (t) =>
                    t.includes(query) ||
                    p.items.some(
                      (i) => i.title === t && i.body.includes(query),
                    ),
                )
                .map((t) => {
                  const list = p.items.filter((i) => i.title === t),
                    last = list.at(-1) || { ...wxDemoChats.find(x => x.title === t), avatar:"", read:true } as Item;
                  return (
                    <button
                      className="wx-chat-row"
                      key={t}
                      onClick={() => {
                        setReadThreads((v) => (v.includes(t) ? v : [...v, t]));
                        p.onThread(t);
                        p.onRead(t);
                      }}
                    >
                      <span className="wx-chat-avatar">
                        <Avatar name={t} src={last.avatar} />
                        {!readThreads.includes(t) &&
                          list.some((i) => !i.read) && (
                            <b className="wx-unread">
                              {list.filter((i) => !i.read).length}
                            </b>
                          )}
                      </span>
                      <div>
                        <strong>{t}</strong>
                        <p>{last.body}</p>
                      </div>
                      <time>{last.time.slice(-5)}</time>
                    </button>
                  );
                })}
              {!conversations.length && <p className="skin-empty">暂无聊天</p>}
            </>
          ) : tab === "通讯录" ? (
            <>
              <label className="wx-search"><Search size={15}/><input placeholder="搜索" value={query} onChange={e=>setQuery(e.target.value)}/></label>
              {wxDemoContacts.filter(c=>c.includes(query)).map((c) => (
                <button
                  key={c}
                  className="wx-contact"
                  onClick={() => {
                    const item = p.items.find((i) => i.sender === c);
                    if (item) {
                      p.onThread(item.title);
                      p.onRead(item.title);
                    }
                  }}
                >
                  <span className="wx-reference-icon">{c === "新的朋友" ? "♟" : c === "群组" ? "♧" : c === "标签" ? "◆" : c === "官方账号" ? "◧" : "◉"}</span>
                  {c}
                </button>
              ))}
            </>
          ) : tab === "发现" ? (
            <div className="wx-discover-groups">
              {[
                [Camera, "朋友圈", "#26a958"],
                [Play, "视频号", "#fa9d3b"],
                [Music, "听一听", "#fa5151"],
              ].map(([Icon, label, color]) => {
                const Glyph = Icon as typeof Camera;
                return (
                  <button
                    key={String(label)}
                    className="wx-discovery"
                    onClick={() =>
                      label === "朋友圈"
                        ? setMoments(true)
                        : setUtility(String(label))
                    }
                  >
                    <Glyph size={22} style={{ color: String(color) }} />
                    {String(label)}
                    <span>›</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <>
              <div className="wx-profile">
                <Avatar name="king" />
                <div>
                  <h2>king</h2>
                  <small>微信 ID：reflection27</small>
                  <button
                    className="wx-profile-status"
                    onClick={() => setUtility("状态")}
                  >
                    ＋ 状态
                  </button>
                </div>
              </div>
              <div className="wx-profile-menu">
                {[
                  [MessageCircle, "服务", "#07c160"],
                  [Layers, "收藏", "#e8a828"],
                  [ImageIcon, "朋友圈", "#3a9bd9"],
                  [Layers, "作品", "#329dd8"],
                  [ShoppingBag, "小店与卡包", "#ed7c59"],
                  [Smile, "贴图市集", "#f7b900"],
                  [Settings, "设置", "#1696d2"],
                ].map(([Icon, label, color]) => {
                  const Glyph = Icon as typeof Settings;
                  return (
                    <button
                      key={String(label)}
                      className="wx-discovery"
                      onClick={() =>
                        label === "朋友圈"
                          ? setMoments(true)
                          : setUtility(String(label))
                      }
                    >
                      <Glyph size={22} style={{ color: String(color) }} />
                      {String(label)}
                      <span>›</span>
                    </button>
                  );
                })}
              </div>
              {p.items
                .filter((i) => i.folder === "我")
                .map((i) => (
                  <button
                    className="wx-discovery"
                    key={i.id}
                    onClick={() => p.onItem(i)}
                  >
                    <User size={18} />
                    {i.title}
                    <span>›</span>
                  </button>
                ))}
              {p.creator && (
                <button className="phone-add" onClick={p.onAdd}>
                  编辑个人资料内容
                </button>
              )}
            </>
          )}
        </div>
      )}
      {!p.thread && !moments && !utility && (
        <nav className="wx-bottom">
          {[
            { label: "微信", icon: MessageCircle },
            { label: "通讯录", icon: Users },
            { label: "发现", icon: Compass },
            { label: "我", icon: User },
          ].map((t) => (
            <button
              className={tab === t.label ? "selected" : ""}
              key={t.label}
              onClick={() => setTab(t.label)}
            >
              <t.icon size={21} />
              <span>{t.label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
export function WhatsAppSkin(p: SkinProps) {
  const [tab, setTab] = useState("聊天"),
    [query, setQuery] = useState(""),
    [filter, setFilter] = useState("全部");
  const tabs = [
    { label: "动态", icon: Compass },
    { label: "通话", icon: Phone },
    { label: "社区", icon: Users },
    { label: "聊天", icon: MessageCircle },
    { label: "设置", icon: Settings },
  ];
  const conversations = [
    ...new Set(
      p.items
        .filter((i) => !["动态", "通话", "社区", "设置"].includes(i.folder))
        .filter((i) => filter !== "未读" || !i.read)
        .map((i) => i.title),
    ),
  ];
  const name = tab === "聊天" ? p.name : tab;
  return (
    <div className="whatsapp-ui independent-skin">
      <div className="app-nav wa-nav">
        <button
          aria-label="返回"
          onClick={() => (p.thread ? p.onThread("") : p.onBack())}
        >
          <ChevronLeft size={22} />
        </button>
        <strong>{p.thread || name}</strong>
        <button
          aria-label={p.creator ? "新增内容" : "搜索内容"}
          onClick={
            p.creator
              ? p.onAdd
              : () =>
                  document
                    .querySelector<HTMLInputElement>(".wa-search input")
                    ?.focus()
          }
        >
          {p.creator ? <Plus size={21} /> : <Search size={20} />}
        </button>
      </div>
      {p.thread ? (
        <>
          <div className="wa-thread-profile">
            <button aria-label="返回聊天列表" onClick={() => p.onThread("")}>
              <ChevronLeft size={23} />
            </button>
            <Avatar
              name={p.thread}
              src={p.items.find((i) => i.title === p.thread)?.avatar}
              round
            />
            <div>
              <strong>{p.thread}</strong>
              <small>联系人</small>
            </div>
            <Video size={18} />
            <Phone size={17} />
          </div>
          <MessageList
            items={p.items.filter((i) => i.title === p.thread)}
            creator={p.creator}
            onItem={p.onItem}
            onRead={p.onRead}
            whatsapp
          />
          <Compose creator={p.creator} onAdd={p.onAdd} wa />
        </>
      ) : (
        <div className="skin-scroll">
          <h1 className="wa-large-title">{tab}</h1>
          {tab === "聊天" ? (
            <>
              <label className="wa-search">
                <Search size={16} />
                <input
                  placeholder="搜索"
                  aria-label="搜索WhatsApp"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
              <div className="wa-filters">
                {["全部", "未读", "群组"].map((f) => (
                  <button
                    key={f}
                    className={filter === f ? "selected" : ""}
                    onClick={() => setFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
              {conversations
                .filter((t) => t.includes(query))
                .filter(
                  (t) =>
                    filter !== "群组" ||
                    p.items.some((i) => i.title === t && i.folder === "群组"),
                )
                .map((t) => {
                  const last = p.items.filter((i) => i.title === t).at(-1)!;
                  return (
                    <button
                      className="wa-chat-row"
                      key={t}
                      onClick={() => {
                        p.onThread(t);
                        p.onRead(t);
                      }}
                    >
                      <Avatar name={t} src={last.avatar} round />
                      <div>
                        <strong>{t}</strong>
                        <p>
                          {last.outgoing && <CheckCheck size={12} />}{" "}
                          {last.body}
                        </p>
                      </div>
                      <time>{last.time.slice(-5)}</time>
                    </button>
                  );
                })}
            </>
          ) : tab === "设置" ? (
            <>
              <div className="wa-settings-profile">
                <Avatar name="我" round />
                <h2>个人资料</h2>
              </div>
              {p.items
                .filter((i) => i.folder === "设置")
                .map((i) => (
                  <button
                    key={i.id}
                    className="wa-record"
                    onClick={() => p.onItem(i)}
                  >
                    {i.title}
                    <span>›</span>
                  </button>
                ))}
            </>
          ) : (
            <>
              {tab === "动态" && (
                <div className="wa-status">
                  <Avatar name="我" round />
                  <span>我的状态</span>
                  {p.creator && (
                    <button aria-label="添加状态" onClick={p.onAdd}>
                      <Plus size={17} />
                    </button>
                  )}
                </div>
              )}
              {p.items
                .filter(
                  (i) =>
                    i.folder === tab || (tab === "通话" && i.kind === "call"),
                )
                .map((i) => (
                  <button
                    className="wa-record"
                    key={i.id}
                    onClick={() => p.onItem(i)}
                  >
                    <Avatar name={i.sender} src={i.avatar} round />
                    <div>
                      <strong>{i.title}</strong>
                      <p>{i.body}</p>
                    </div>
                    <span>
                      {tab === "通话" ? (
                        <Phone size={17} />
                      ) : (
                        <ChevronLeft size={15} />
                      )}
                    </span>
                  </button>
                ))}
              {!p.items.some((i) => i.folder === tab) && (
                <p className="skin-empty">暂无{tab}内容</p>
              )}
            </>
          )}
          {p.creator && (
            <button className="phone-add" onClick={p.onAdd}>
              添加{tab === "聊天" ? "聊天" : tab}内容
            </button>
          )}
        </div>
      )}
      {!p.thread && (
        <nav className="wa-bottom">
          {tabs.map((t) => (
            <button
              className={tab === t.label ? "selected" : ""}
              key={t.label}
              onClick={() => setTab(t.label)}
            >
              <t.icon size={20} />
              <span>{t.label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
export function InstagramSkin(p: SkinProps) {
  const [tab, setTab] = useState("首页"),
    [dm, setDm] = useState(false),
    [query, setQuery] = useState(""),
    [likes, setLikes] = useSkinState<string[]>(p, "likes", []),
    [saved, setSaved] = useSkinState<string[]>(p, "saved", []),
    [showSaved, setShowSaved] = useState(false);
  const posts = p.items.filter(
      (i) =>
        i.kind === "post" ||
        !["私信", "Story", "Reels", "个人主页"].includes(i.folder),
    ),
    stories = p.items.filter((i) => i.folder === "Story"),
    reels = p.items.filter((i) => i.kind === "video" || i.folder === "Reels"),
    messages = p.items.filter((i) => i.folder === "私信");
  const tabs = [
    { label: "首页", icon: Home },
    { label: "搜索", icon: Search },
    { label: "Reels", icon: Play },
    { label: "个人主页", icon: User },
  ];
  const shown = (
    showSaved ? posts.filter((i) => saved.includes(i.id)) : posts
  ).filter((i) => (i.title + i.body + i.sender).includes(query));
  return (
    <div className="instagram-ui independent-skin">
      <div className="app-nav ig-nav">
        <button
          aria-label="返回"
          onClick={() => (dm ? setDm(false) : p.onBack())}
        >
          <ChevronLeft size={22} />
        </button>
        <strong>{dm ? "私信" : p.name}</strong>
        <div>
          {p.creator && (
            <button aria-label="新增内容" onClick={p.onAdd}>
              <Plus size={21} />
            </button>
          )}
          <button aria-label="Instagram 私信" onClick={() => setDm(!dm)}>
            <Send size={20} />
          </button>
        </div>
      </div>
      <div className="skin-scroll ig-scroll">
        {dm ? (
          <>
            {messages.map((i) => (
              <button
                key={i.id}
                className="ig-dm-row"
                onClick={() => p.onItem(i)}
              >
                <Avatar name={i.sender} round />
                <div>
                  <strong>{i.sender}</strong>
                  <p>{i.body}</p>
                </div>
              </button>
            ))}
            {!messages.length && <p className="skin-empty">暂无私信</p>}
            {p.creator && (
              <button className="phone-add" onClick={p.onAdd}>
                添加私信
              </button>
            )}
          </>
        ) : tab === "首页" ? (
          <>
            <div className="ig-stories">
              <button
                className="ig-story"
                onClick={
                  p.creator
                    ? p.onAdd
                    : () => {
                        if (stories[0]) p.onItem(stories[0]);
                      }
                }
                disabled={!p.creator && !stories.length}
              >
                <span>
                  <Avatar name="我" round />
                </span>
                <small>你的快拍</small>
              </button>
              {stories.map((i) => (
                <button
                  key={i.id}
                  className="ig-story"
                  onClick={() => p.onItem(i)}
                >
                  <span>
                    <Avatar name={i.sender} round />
                  </span>
                  <small>{i.sender}</small>
                </button>
              ))}
            </div>
            {posts.map((i) => (
              <article className="ig-post" key={i.id}>
                <div className="ig-post-author">
                  <Avatar name={i.sender} round />
                  <strong>{i.sender}</strong>
                  <button
                    aria-label={`帖子详情${i.title}`}
                    onClick={() => p.onItem(i)}
                  >
                    <MoreHorizontal size={19} />
                  </button>
                </div>
                <button className="ig-post-media" onClick={() => p.onItem(i)}>
                  <ItemMedia item={i} />
                </button>
                <div className="ig-post-controls">
                  <button
                    aria-label={`喜欢${i.title}`}
                    onClick={() =>
                      setLikes(
                        likes.includes(i.id)
                          ? likes.filter((x) => x !== i.id)
                          : [...likes, i.id],
                      )
                    }
                  >
                    <Heart
                      size={23}
                      fill={likes.includes(i.id) ? "#ed4956" : "none"}
                      color={likes.includes(i.id) ? "#ed4956" : "currentColor"}
                    />
                  </button>
                  <button
                    aria-label={`评论${i.title}`}
                    onClick={() => p.onItem(i)}
                  >
                    <MessageCircle size={22} />
                  </button>
                  <button
                    aria-label={`查看${i.title}`}
                    onClick={() => p.onItem(i)}
                  >
                    <Send size={21} />
                  </button>
                  <button
                    aria-label={`收藏${i.title}`}
                    onClick={() =>
                      setSaved(
                        saved.includes(i.id)
                          ? saved.filter((x) => x !== i.id)
                          : [...saved, i.id],
                      )
                    }
                  >
                    <Bookmark
                      size={22}
                      fill={saved.includes(i.id) ? "currentColor" : "none"}
                    />
                  </button>
                </div>
                <div className="ig-post-caption">
                  <strong>
                    {i.likes + (likes.includes(i.id) ? 1 : 0)} 次赞
                  </strong>
                  <p>
                    <b>{i.sender}</b> {i.body}
                  </p>
                  <button onClick={() => p.onItem(i)}>
                    查看全部 {i.comments.length} 条评论
                  </button>
                  <time>{i.time}</time>
                </div>
              </article>
            ))}
          </>
        ) : tab === "搜索" ? (
          <>
            <label className="ig-search">
              <Search size={15} />
              <input
                value={query}
                aria-label="搜索Instagram"
                placeholder="搜索"
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <div className="ig-explore">
              {shown.map((i) => (
                <button key={i.id} onClick={() => p.onItem(i)}>
                  <ItemMedia item={i} />
                </button>
              ))}
            </div>
          </>
        ) : tab === "Reels" ? (
          <>
            {reels.map((i) => (
              <div className="ig-reel" key={i.id}>
                <ItemMedia item={i} />
                <button onClick={() => p.onItem(i)}>
                  {i.sender} · {i.title}
                </button>
              </div>
            ))}
            {!reels.length && <p className="skin-empty">暂无 Reels</p>}
          </>
        ) : (
          <>
            <div className="ig-profile">
              <Avatar name={posts[0]?.sender ?? "我"} round />
              <div>
                <strong>{posts.length}</strong>
                <small>帖子</small>
              </div>
              <div>
                <strong>0</strong>
                <small>关注者</small>
              </div>
              <div>
                <strong>0</strong>
                <small>正在关注</small>
              </div>
            </div>
            <h3 className="ig-profile-name">{posts[0]?.sender ?? "我"}</h3>
            <div className="ig-profile-tabs">
              <button aria-label="帖子网格" onClick={() => setShowSaved(false)}>
                <Grid size={21} />
              </button>
              <button
                aria-label="已收藏帖子"
                onClick={() => setShowSaved(true)}
              >
                <Bookmark size={21} />
              </button>
              <button
                aria-label="资料内容"
                onClick={() => {
                  const i = p.items.find((i) => i.folder === "个人主页");
                  if (i) p.onItem(i);
                  else if (p.creator) p.onAdd();
                }}
              >
                <AtSign size={21} />
              </button>
            </div>
            <div className="ig-explore">
              {shown.map((i) => (
                <button key={i.id} onClick={() => p.onItem(i)}>
                  <ItemMedia item={i} />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <nav className="ig-bottom">
        {tabs.map((t) => (
          <button
            key={t.label}
            className={tab === t.label ? "selected" : ""}
            aria-label={`Instagram ${t.label}`}
            onClick={() => {
              setTab(t.label);
              setDm(false);
            }}
          >
            <t.icon size={23} />
          </button>
        ))}
      </nav>
    </div>
  );
}
