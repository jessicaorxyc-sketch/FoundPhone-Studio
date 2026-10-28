import { useState, type CSSProperties } from "react";
import type { SkinProps } from "../AppSkins";
import "./new-china-apps.css";

type AppId = "didi"|"identityv"|"perfectworld"|"dianping"|"kfc"|"doubao"|"xianyu"|"tfamily";
type Section = {title:string; subtitle:string; icon:string};
const specs:Record<AppId,{name:string;tagline:string;tabs:string[];accent:string;sections:Section[]}>={
 didi:{name:"滴滴出行",tagline:"重庆 · 南岸区",tabs:["首页","行程","我的"],accent:"#ff762b",sections:[{title:"快车",subtitle:"经济实惠 · 随叫随走",icon:"🚗"},{title:"特惠快车",subtitle:"优惠价格 · 舒适出行",icon:"🚕"},{title:"专车",subtitle:"品质出行",icon:"🚙"},{title:"代驾",subtitle:"安心回家",icon:"🛞"}]},
 identityv:{name:"第五人格",tagline:"欧利蒂丝庄园",tabs:["庄园","角色","活动"],accent:"#817b98",sections:[{title:"开始游戏",subtitle:"进入庄园 · 模拟入口",icon:"🗝️"},{title:"求生者",subtitle:"角色档案",icon:"🎭"},{title:"监管者",subtitle:"角色档案",icon:"🕯️"},{title:"赛季活动",subtitle:"查看活动",icon:"🎪"}]},
 perfectworld:{name:"完美世界竞技平台",tagline:"完美世界电竞 · Counter-Strike 2",tabs:["首页","战绩","赛事","我的"],accent:"#e8a53d",sections:[{title:"CS2 对战",subtitle:"竞技匹配 · 平台对战入口演示",icon:"🎯"},{title:"个人战绩",subtitle:"比赛记录 · K/D · 胜率",icon:"📊"},{title:"排行榜",subtitle:"竞技积分与玩家排名",icon:"🏆"},{title:"赛事中心",subtitle:"CS2 赛事与赛程",icon:"🎮"},{title:"玩家资料",subtitle:"游戏档案与成就",icon:"👤"},{title:"地图与数据",subtitle:"竞技地图 · 数据统计",icon:"🗺️"}]},
 dianping:{name:"大众点评",tagline:"重庆 · 发现好去处",tabs:["推荐","附近","我的"],accent:"#ff742c",sections:[{title:"美食",subtitle:"火锅 · 小面 · 江湖菜",icon:"🍲"},{title:"休闲玩乐",subtitle:"周末好去处",icon:"🎡"},{title:"酒店",subtitle:"城市住宿",icon:"🏨"},{title:"丽人",subtitle:"美容美发",icon:"💇"},{title:"景点",subtitle:"洪崖洞 · 南山",icon:"🌉"},{title:"咖啡茶饮",subtitle:"附近好店",icon:"🧋"}]},
 kfc:{name:"肯德基",tagline:"肯德基 · 重庆",tabs:["首页","点餐","我的"],accent:"#d82536",sections:[{title:"到店自取",subtitle:"选择门店后点餐",icon:"🏪"},{title:"外送到家",subtitle:"选择配送地址",icon:"🛵"},{title:"人气套餐",subtitle:"汉堡 · 小食 · 饮品",icon:"🍔"},{title:"优惠券",subtitle:"查看优惠",icon:"🎟️"}]},
 doubao:{name:"豆包",tagline:"你的 AI 助手 · 界面演示",tabs:["对话","发现","我的"],accent:"#537af2",sections:[{title:"帮我写一段文案",subtitle:"写作与创意",icon:"✍️"},{title:"帮我制定旅行计划",subtitle:"重庆旅行",icon:"🗺️"},{title:"学习答疑",subtitle:"解释概念",icon:"📚"},{title:"图片创意",subtitle:"探索创作",icon:"🎨"}]},
 xianyu:{name:"闲鱼",tagline:"让闲置游起来",tabs:["首页","消息","我的"],accent:"#e6b900",sections:[{title:"数码",subtitle:"二手手机 · 电脑",icon:"📱"},{title:"潮流服饰",subtitle:"好物分享",icon:"👕"},{title:"家居生活",subtitle:"闲置好物",icon:"🛋️"},{title:"玩具周边",subtitle:"收藏与交换",icon:"🧸"},{title:"发布闲置",subtitle:"创建一条模拟商品",icon:"➕"}]},
 tfamily:{name:"T-FAMILY",tagline:"TF 家族 · 粉丝内容演示",tabs:["首页","家族","商城","我的"],accent:"#e74a59",sections:[{title:"家族频道",subtitle:"TF家族 · 最新物料",icon:"✨"},{title:"艺人主页",subtitle:"成员动态与资料",icon:"👥"},{title:"写真与录像",subtitle:"家族专属图文视频",icon:"🎬"},{title:"官方商城",subtitle:"周边商品展示",icon:"🛍️"},{title:"泡泡",subtitle:"艺人互动入口演示",icon:"💬"},{title:"活动",subtitle:"演唱会与会员权益",icon:"🎫"}]}
};
function AppSpecificHome({id,tab,open,notify}:{id:AppId;tab:string;open:(s:Section)=>void;notify:(s:string)=>void}) {
 const tile=(title:string,subtitle:string,icon:string)=> <button key={title} className="replica-feature" onClick={()=>open({title,subtitle,icon})}><span>{icon}</span><div><strong>{title}</strong><small>{subtitle}</small></div><b>›</b></button>;
 if(id==="didi")return <div className="replica-custom didi-real">
  <div className="didi-switch"><b>出行</b><span>送货</span><span>旅行</span><span>车主</span></div>
  <div className="didi-map"><div className="didi-map-street">南滨路</div><div className="didi-map-pin">📍 重庆市第十一中学校</div><div className="didi-map-river">长 江</div></div>
  <div className="didi-book"><strong>🚕 现在出发</strong><p>● 重庆市第十一中学校附近</p><button onClick={()=>open({title:"你要去哪儿？",subtitle:"输入目的地，预览路线（模拟）",icon:"📍"})}>⌕ 你要去哪儿？</button></div>
  <div className="replica-hscroll">{["快车","特惠快车","顺风车","出租车","代驾","租车","火车票","送货"].map((v,i)=>tile(v,"出行服务演示",["🚗","🚕","🚙","🚖","🛞","🚘","🚄","📦"][i]))}</div></div>;
 if(id==="perfectworld")return <div className="replica-custom pw-real">
  <div className="pw-tabs"><strong>CS</strong><span>DOTA2</span><span>Deadlock</span></div>
  <div className="pw-banner"><small>PERFECT WORLD ESPORTS</small><h2>COUNTER-STRIKE 2</h2><p>战绩 · 数据 · 赛事 · 社区</p></div>
  <div className="pw-subnav">{["战绩查询","职业赛事","选手排行","社区广场"].map((v,i)=>tile(v,"查看"+v,["📊","🏆","🎯","💬"][i]))}</div>
  <h3>{tab==="赛事"?"赛事中心":tab==="战绩"?"CS 数据分析":"CS 资讯"}</h3><div className="pw-news">{tile("CS2 比赛战报","查看比赛详情与选手表现","🎮")}{tile("个人能力雷达","击杀 · 爆头率 · 伤害分布","📈")}</div></div>;
 if(id==="identityv")return <div className="replica-custom idv-real"><div className="idv-art"><small>IDENTITY V</small><h2>第五人格</h2><p>欢迎来到欧利蒂丝庄园</p><button onClick={()=>notify("这是网页还原，不包含完整游戏客户端")}>进入庄园</button></div><div className="idv-links">{tile("推理之径","赛季内容","🗝️")}{tile("角色图鉴","求生者 / 监管者","🎭")}{tile("庄园活动","活动公告","🕯️")}</div></div>;
 if(id==="dianping")return <div className="replica-custom dp-real"><div className="dp-location">📍 重庆 <span>⌄</span><b>吃喝玩乐 · 发现好店</b></div><div className="dp-categories">{["美食","休闲玩乐","酒店","景点","丽人","咖啡","电影","购物"].map((v,i)=><button key={v} onClick={()=>open({title:v,subtitle:"重庆"+v+"精选",icon:["🍜","🎡","🏨","🌉","💇","☕","🎬","🛍️"][i]})}><span>{["🍜","🎡","🏨","🌉","💇","☕","🎬","🛍️"][i]}</span>{v}</button>)}</div><div className="dp-banner">重庆吃喝玩乐榜 <strong>发现城市好味道</strong></div><h3>猜你喜欢 <small>附近热门推荐</small></h3>{["重庆火锅 · 热门榜","重庆小面 · 地道风味","南滨路 · 咖啡茶饮"].map((v,i)=>tile(v,"查看商家 · 评价 · 团购",["🍲","🍜","🧋"][i]))}</div>;
 if(id==="kfc")return <div className="replica-custom kfc-real"><div className="kfc-brand">KFC <small>肯德基 · WOW 会员</small></div><div className="kfc-promo"><b>WOW 美味时刻</b><h2>美味 即刻开吃</h2><p>到店自取 · 宅急送</p></div><div className="kfc-order">{tile("到店自取","附近餐厅 · 点餐","🏪")}{tile("宅急送","美味送到家","🛵")}</div><h3>人气推荐</h3>{tile("吮指原味鸡","经典美味 · 加入购物袋","🍗")}{tile("香辣鸡腿堡","套餐与单品","🍔")}{tile("WOW 会员福利","优惠券 · 积分 · 大神卡","🎟️")}</div>;
 if(id==="doubao")return <div className="replica-custom db-real"><div className="db-logo">✳</div><h2>你好，我是豆包</h2><p>有什么可以帮你？</p><div className="db-prompts">{["帮我写作","AI 图片","拍照识物","学习辅导","翻译","深度思考"].map((v,i)=>tile(v,"开启"+v,["✍️","🎨","📷","📚","🌐","💡"][i]))}</div></div>;
 if(id==="xianyu")return <div className="replica-custom xy-real"><div className="xy-yellow">闲鱼 <b>买闲置 · 卖闲置</b></div><div className="xy-tabs"><b>推荐</b><span>数码</span><span>潮玩</span><span>服饰</span><span>家居</span></div><div className="xy-market">{["二手数码好物","潮玩手办","衣橱闲置","家居生活","校园好物","发布闲置"].map((v,i)=><button key={v} onClick={()=>open({title:v,subtitle:"查看闲置详情（演示）",icon:["📱","🧸","👟","🛋️","📚","➕"][i]})}><div>{["📱","🧸","👟","🛋️","📚","➕"][i]}</div><strong>{v}</strong><small>{i===5?"发布":"好物低价转"}</small></button>)}</div></div>;
 return <div className="replica-custom tf-real"><div className="tf-brand">T-FAMILY <small>TF 家族</small></div><div className="tf-banner"><small>TF FAMILY</small><h2>家族最新动态</h2><p>舞台 · 日常 · 成员</p></div><div className="tf-members">{["成员动态","家族频道","舞台视频","官方商城"].map((v,i)=>tile(v,"进入"+v,["👥","✨","🎬","🛍️"][i]))}</div><h3>最新内容</h3>{tile("TF 家族 · 音乐舞台","查看视频内容","🎤")}{tile("会员中心","会员权益与活动","💎")}</div>;
}
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
 return <div className={`china-replica china-${id}`} style={{"--replica-accent":spec.accent} as CSSProperties}>
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
    <AppSpecificHome id={id} tab={tab} open={setPage} notify={act}/>
    <div className="china-hero" style={{display:"none"}}><span className="china-eyebrow">{spec.tagline}</span><h1>{id==="didi"?"你好，重庆":id==="doubao"?"有什么可以帮你？":spec.name}</h1><p>{id==="identityv"?"游戏主题交互展示 · 不包含完整游戏客户端":id==="perfectworld"?"CS2 竞技平台界面演示 · 不提供真实匹配":id==="tfamily"?"非官方粉丝界面演示":"探索你的专属页面"}</p></div>
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
  <nav className="china-bottom">{spec.tabs.map((t,i)=><button key={t} className={t===tab?"selected":""} onClick={()=>{setTab(t);setPage(null);setQuery("");setNotice("")}}><span>{["⌂","◉","♙","☻"][i]}</span>{t}</button>)}</nav>
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
