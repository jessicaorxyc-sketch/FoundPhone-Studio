import { useState, type ReactNode } from "react";
import type { SkinProps } from "../AppSkins";
import "./new-china-apps.css";

type AppId = "didi"|"identityv"|"perfectworld"|"dianping"|"kfc"|"doubao"|"xianyu"|"tfamily";
type Section = {title:string; subtitle:string; icon:string};
const specs:Record<AppId,{name:string;tagline:string;tabs:string[];accent:string;sections:Section[]}>={
 didi:{name:"滴滴出行",tagline:"重庆 · 南岸区",tabs:["首页","行程","我的"],accent:"#ff762b",sections:[{title:"快车",subtitle:"经济实惠 · 随叫随走",icon:"🚗"},{title:"特惠快车",subtitle:"优惠价格 · 舒适出行",icon:"🚕"},{title:"专车",subtitle:"品质出行",icon:"🚙"},{title:"代驾",subtitle:"安心回家",icon:"🛞"}]},
 identityv:{name:"第五人格",tagline:"欧利蒂丝庄园",tabs:["庄园","角色","活动"],accent:"#817b98",sections:[{title:"开始游戏",subtitle:"进入庄园 · 模拟入口",icon:"🗝️"},{title:"求生者",subtitle:"角色档案",icon:"🎭"},{title:"监管者",subtitle:"角色档案",icon:"🕯️"},{title:"赛季活动",subtitle:"查看活动",icon:"🎪"}]},
 perfectworld:{name:"完美世界",tagline:"探索奇幻世界",tabs:["首页","角色","活动"],accent:"#b99a64",sections:[{title:"进入世界",subtitle:"游戏入口演示",icon:"🐉"},{title:"职业图鉴",subtitle:"了解职业与角色",icon:"⚔️"},{title:"冒险地图",subtitle:"场景探索",icon:"🏔️"},{title:"活动公告",subtitle:"最新活动页面演示",icon:"📜"}]},
 dianping:{name:"大众点评",tagline:"重庆 · 发现好去处",tabs:["推荐","附近","我的"],accent:"#ff742c",sections:[{title:"美食",subtitle:"火锅 · 小面 · 江湖菜",icon:"🍲"},{title:"休闲玩乐",subtitle:"周末好去处",icon:"🎡"},{title:"酒店",subtitle:"城市住宿",icon:"🏨"},{title:"丽人",subtitle:"美容美发",icon:"💇"},{title:"景点",subtitle:"洪崖洞 · 南山",icon:"🌉"},{title:"咖啡茶饮",subtitle:"附近好店",icon:"🧋"}]},
 kfc:{name:"肯德基",tagline:"肯德基 · 重庆",tabs:["首页","点餐","我的"],accent:"#d82536",sections:[{title:"到店自取",subtitle:"选择门店后点餐",icon:"🏪"},{title:"外送到家",subtitle:"选择配送地址",icon:"🛵"},{title:"人气套餐",subtitle:"汉堡 · 小食 · 饮品",icon:"🍔"},{title:"优惠券",subtitle:"查看优惠",icon:"🎟️"}]},
 doubao:{name:"豆包",tagline:"你的 AI 助手 · 界面演示",tabs:["对话","发现","我的"],accent:"#537af2",sections:[{title:"帮我写一段文案",subtitle:"写作与创意",icon:"✍️"},{title:"帮我制定旅行计划",subtitle:"重庆旅行",icon:"🗺️"},{title:"学习答疑",subtitle:"解释概念",icon:"📚"},{title:"图片创意",subtitle:"探索创作",icon:"🎨"}]},
 xianyu:{name:"闲鱼",tagline:"让闲置游起来",tabs:["首页","消息","我的"],accent:"#e6b900",sections:[{title:"数码",subtitle:"二手手机 · 电脑",icon:"📱"},{title:"潮流服饰",subtitle:"好物分享",icon:"👕"},{title:"家居生活",subtitle:"闲置好物",icon:"🛋️"},{title:"玩具周边",subtitle:"收藏与交换",icon:"🧸"},{title:"发布闲置",subtitle:"创建一条模拟商品",icon:"➕"}]},
 tfamily:{name:"T-FAMILY",tagline:"TF 家族 · 粉丝内容演示",tabs:["首页","动态","我的"],accent:"#e74a59",sections:[{title:"最新动态",subtitle:"动态列表",icon:"✨"},{title:"成员",subtitle:"成员资料",icon:"👥"},{title:"视频",subtitle:"作品与舞台",icon:"🎬"},{title:"活动",subtitle:"活动日历",icon:"🎫"}]}
};
function Replica({id}: {id:AppId}) {
 const spec=specs[id];
 const [tab,setTab]=useState(spec.tabs[0]);
 const [page,setPage]=useState<Section|null>(null);
 const [query,setQuery]=useState("");
 const [from,setFrom]=useState("重庆市第十一中学校附近");
 const [destination,setDestination]=useState("");
 const [cart,setCart]=useState<string[]>([]);
 const [draft,setDraft]=useState("");
 const [messages,setMessages]=useState<{mine:boolean;text:string}[]>([]);
 const [favorite,setFavorite]=useState<string[]>([]);
 const [posted,setPosted]=useState<string[]>([]);
 const [notice,setNotice]=useState("");
 const act=(message:string)=>{setNotice(message);};
 const showHome=tab===spec.tabs[0];
 const matches=spec.sections.filter(x=>(x.title+x.subtitle).includes(query));
 return <div className={`china-replica china-${id}`} style={{"--replica-accent":spec.accent} as React.CSSProperties}>
  <header className="china-top">
   {page?<button onClick={()=>setPage(null)} aria-label="返回">‹</button>:<span className="china-app-symbol">{id==="kfc"?"KFC":id==="tfamily"?"TF":spec.name.slice(0,1)}</span>}
   <strong>{page?.title||spec.name}</strong>
   <button onClick={()=>act("这是本地模拟界面，未连接官方账号或交易服务。")} aria-label="更多">···</button>
  </header>
  <div className="china-body" key={tab+(page?.title||"")}>
   {page ? <section className="china-detail">
     <div className="china-detail-icon">{page.icon}</div><h2>{page.title}</h2><p>{page.subtitle}</p>
     {id==="kfc"?<button className="china-primary" onClick={()=>{setCart(v=>[...v,page.title]);act("已加入模拟购物袋")}}>加入购物袋</button>:
     id==="xianyu"?<button className="china-primary" onClick={()=>{setFavorite(v=>v.includes(page.title)?v.filter(x=>x!==page.title):[...v,page.title]);act("已更新收藏")}}>{favorite.includes(page.title)?"已收藏":"收藏"}</button>:
     <button className="china-primary" onClick={()=>act("已打开 "+page.title+" 的演示页面；真实服务尚未接入。")}>查看详情</button>}
   </section> : <>
    <div className="china-hero"><span className="china-eyebrow">{spec.tagline}</span><h1>{id==="didi"?"你好，重庆":id==="doubao"?"有什么可以帮你？":spec.name}</h1><p>{id==="identityv"||id==="perfectworld"?"游戏主题交互展示 · 不包含完整游戏客户端":id==="tfamily"?"非官方粉丝界面演示":"探索你的专属页面"}</p></div>
    {id==="didi"&&showHome?<div className="china-trip"><label>出发地<input value={from} onChange={e=>setFrom(e.target.value)}/></label><label>目的地<input value={destination} onChange={e=>setDestination(e.target.value)} placeholder="你要去哪儿？"/></label><button className="china-primary" onClick={()=>act(destination?"模拟路线："+from+" → "+destination+"（不产生真实订单）":"请先填写目的地")}>查看路线</button></div>:null}
    {id==="doubao"&&showHome?<div className="china-conversation">{messages.map((m,i)=><p key={i} className={m.mine?"china-mine":"china-answer"}>{m.text}</p>)}<form onSubmit={e=>{e.preventDefault();if(!draft.trim())return;setMessages(v=>[...v,{mine:true,text:draft.trim()},{mine:false,text:"这是豆包风格的本地界面演示，尚未连接真实 AI 服务。"}]);setDraft("")}}><input value={draft} onChange={e=>setDraft(e.target.value)} placeholder="发送消息…" enterKeyHint="send"/><button type="submit">发送</button></form></div>:null}
    {id==="xianyu"&&tab==="我的"?<div className="china-panel"><h3>我的收藏</h3>{favorite.length?favorite.map(x=><p key={x}>{x}</p>):<p>还没有收藏</p>}<h3>我的发布</h3>{posted.map(x=><p key={x}>{x}</p>)}<form onSubmit={e=>{e.preventDefault();if(draft.trim()){setPosted(v=>[...v,draft.trim()]);setDraft("");act("已发布模拟商品")}}}><input value={draft} onChange={e=>setDraft(e.target.value)} placeholder="商品名称"/><button>发布</button></form></div>:null}
    {id==="kfc"&&tab==="我的"?<div className="china-panel"><h3>模拟购物袋 · {cart.length} 件</h3>{cart.map((x,i)=><p key={i}>{x}</p>)}<button className="china-primary" onClick={()=>act("模拟购物袋不能进行真实支付")}>查看订单</button></div>:null}
    {id==="didi"&&tab==="行程"?<div className="china-panel">暂无真实行程 · 此界面不会创建叫车订单</div>:null}
    <div className="china-search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={id==="dianping"?"搜索重庆美食、商家":id==="xianyu"?"搜索闲置好物":"搜索"+spec.name+"内容"}/></div>
    <div className="china-section-heading"><strong>{tab==="我的"?"我的服务":tab==="附近"?"重庆附近":tab==="角色"?"角色图鉴":tab==="活动"?"活动中心":"为你推荐"}</strong><small>本地演示内容</small></div>
    <div className="china-tiles">{matches.map(x=><button key={x.title} onClick={()=>setPage(x)}><span className="china-tile-emoji">{x.icon}</span><strong>{x.title}</strong><small>{x.subtitle}</small><span className="china-tile-arrow">›</span></button>)}</div>
   </>}
  </div>
  {notice&&<button className="china-notice" onClick={()=>setNotice("")}>{notice} ×</button>}
  <nav className="china-bottom">{spec.tabs.map((t,i)=><button key={t} className={t===tab?"selected":""} onClick={()=>{setTab(t);setPage(null);setQuery("");setNotice("")}}><span>{["⌂","◉","♙"][i]}</span>{t}</button>)}</nav>
 </div>
}
export function DidiSkin(_p:SkinProps){return <Replica id="didi"/>}
export function IdentityVSkin(_p:SkinProps){return <Replica id="identityv"/>}
export function PerfectWorldSkin(_p:SkinProps){return <Replica id="perfectworld"/>}
export function DianpingSkin(_p:SkinProps){return <Replica id="dianping"/>}
export function KfcSkin(_p:SkinProps){return <Replica id="kfc"/>}
export function DoubaoSkin(_p:SkinProps){return <Replica id="doubao"/>}
export function XianyuSkin(_p:SkinProps){return <Replica id="xianyu"/>}
export function TFamilySkin(_p:SkinProps){return <Replica id="tfamily"/>}
