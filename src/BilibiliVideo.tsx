import { useRef, useState } from "react";
import { ArrowLeft, ThumbsUp, ThumbsDown, Star, Share2, Send, Maximize, Play, MoreVertical } from "lucide-react";
import "./bilibili-video.css";
const mp4Url="https://github.com/jessicaorxyc-sketch/FoundPhone-Studio/releases/download/bilibili-Video-v1/ca803be0cc5e0070adeafa7df3713c7b.mp4";
const embedUrl="https://player.bilibili.com/player.html?bvid=BV1h1kcBfEuJ&autoplay=0&danmaku=0";
const title="【TF家族】2026新年音乐会「荣耀」：《来自天堂的魔鬼》纯享版（DAY2）";
const samples=[{name:"哈哈大笑你管不着",text:"舞台真的太精彩了！黑白造型和编舞特别有感染力。",likes:7754},{name:"小圆步",text:"这段表演我可以反复看好多遍！",likes:320},{name:"星星落下",text:"最喜欢副歌的舞台设计。",likes:215}];
export function BilibiliVideo({onClose}:{onClose:()=>void}){
 const [tab,setTab]=useState<"简介"|"评论">("简介"),[liked,setLiked]=useState(false),[disliked,setDisliked]=useState(false),[favorite,setFavorite]=useState(false),[coin,setCoin]=useState(false),[following,setFollowing]=useState(false),[danmu,setDanmu]=useState(false),[comment,setComment]=useState(""),[comments,setComments]=useState<{name:string;text:string;likes:number}[]>([]),[reply,setReply]=useState(""),[likedComments,setLikedComments]=useState<number[]>([]),[expanded,setExpanded]=useState(false),[showShare,setShowShare]=useState(false),[fullscreen,setFullscreen]=useState(false);
 const videoRef=useRef<HTMLVideoElement>(null);
 const [currentTime,setCurrentTime]=useState(0),[videoError,setVideoError]=useState(false),[retryKey]=useState(0),[useUploadedFile,setUseUploadedFile]=useState(false),[danmuText,setDanmuText]=useState(""),[userDanmu,setUserDanmu]=useState<{text:string;at:number}[]>([]);
 const sampleDanmu=[{text:"这个舞台太绝了！",at:8},{text:"前奏一响就起鸡皮疙瘩",at:24},{text:"好喜欢这个编舞",at:48},{text:"再看亿遍！",at:78},{text:"舞台表现力真的好强",at:125},{text:"这一段好帅",at:174},{text:"最后的ending太棒了",at:245}];
 const activeDanmu=[...sampleDanmu,...userDanmu].filter(x=>currentTime>=x.at&&currentTime<x.at+7);
 const sendDanmu=()=>{if(!danmuText.trim())return;setUserDanmu(v=>[...v,{text:danmuText.trim(),at:currentTime}]);setDanmu(true);setDanmuText("");};
 const post=()=>{if(comment.trim()){setComments(v=>[{name:"我",text:comment.trim(),likes:0},...v]);setComment("");setTab("评论");}};
 return <div className="bv-page">
 <div className="bv-top"><button onClick={onClose} aria-label="返回"><ArrowLeft size={23}/></button><span>哔哩哔哩</span><button onClick={()=>setShowShare(v=>!v)}><MoreVertical size={22}/></button></div>
 <div className={"bv-video "+(fullscreen?"bv-fullscreen":"")}>
 {useUploadedFile?<video key={retryKey} ref={videoRef} src={mp4Url} controls playsInline preload="metadata" onTimeUpdate={e=>setCurrentTime(e.currentTarget.currentTime)} onError={()=>setVideoError(true)} aria-label={title}/>:<iframe title={title} src={embedUrl} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" style={{width:"100%",height:"100%",border:0,display:"block",background:"#000"}}/>}
 {danmu&&<div className="bv-danmu-layer" aria-live="off">{activeDanmu.map((d,i)=><span key={d.at+"-"+i} className="bv-flying-danmu" style={{top:(12+(i%4)*19)+"%",animationDuration:"7s"}}>{d.text}</span>)}</div>}
 {videoError&&useUploadedFile&&<div className="bv-video-error">上传文件暂时无法加载。<button type="button" onClick={()=>{setVideoError(false);setUseUploadedFile(false)}}>切换 B 站内嵌播放器</button></div>}
 {fullscreen&&<button className="bv-exit-full" onClick={()=>setFullscreen(false)}>退出全屏</button>}
 </div>
 <div className="bv-video-tools"><span>完整视频 · 04:41</span><button onClick={()=>{setVideoError(false);setUseUploadedFile(v=>!v)}}>{useUploadedFile?"官方播放器":"本地视频"}</button><button onClick={()=>setDanmu(v=>!v)}>弹幕 {danmu?"开":"关"}</button><button onClick={()=>setFullscreen(v=>!v)}><Maximize size={17}/> 全屏</button></div>
 <div className="bv-danmu-compose"><input value={danmuText} onChange={e=>setDanmuText(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")sendDanmu()}} placeholder="发送弹幕（示例弹幕为模拟内容）"/><button onClick={sendDanmu}>发送弹幕</button></div>
 <div className="bv-embed-notice">使用 B 站官方内嵌播放器，在当前手机页面播放；也可切换已上传的视频文件。弹幕示例为模拟内容。</div>
 <div className="bv-tabs"><button className={tab==="简介"?"selected":""} onClick={()=>setTab("简介")}>简介</button><button className={tab==="评论"?"selected":""} onClick={()=>setTab("评论")}>评论 {(794.4+comments.length/10000).toFixed(1)}万</button><button className="bv-danmu" onClick={()=>setDanmu(v=>!v)}>弹幕 {danmu?"已开启":"已关闭"}</button></div>
 {tab==="简介"?<div className="bv-details">
 <div className="bv-creator"><div className="bv-avatar">TF</div><div><strong>TF家族</strong><small>963.5万粉丝 2708视频</small></div><button className={following?"followed":""} onClick={()=>setFollowing(v=>!v)}>{following?"已关注":"+ 关注"}</button></div>
 <button className="bv-title" onClick={()=>setExpanded(v=>!v)}>{title}<span>{expanded?"⌃":"⌄"}</span></button>
 <div className="bv-meta">▷ 4258.4万 ▤ 1307万 2026年1月16日 07:10</div>
 {expanded&&<p className="bv-description">黑与白对弈，是明暗交织的共舞。穿透迷雾，光便落满身。<br/>表演者：穆祉丞、王橹杰。</p>}
 <div className="bv-actions"><button className={liked?"on":""} onClick={()=>{setLiked(v=>!v);setDisliked(false)}}><ThumbsUp fill={liked?"currentColor":"none"}/><small>{liked?"82.8万":"82.7万"}</small></button><button className={disliked?"on":""} onClick={()=>{setDisliked(v=>!v);setLiked(false)}}><ThumbsDown/><small>不喜欢</small></button><button className={coin?"on":""} onClick={()=>setCoin(v=>!v)}><span className="bv-coin">币</span><small>{coin?"已投币":"80.1万"}</small></button><button className={favorite?"on":""} onClick={()=>setFavorite(v=>!v)}><Star fill={favorite?"currentColor":"none"}/><small>{favorite?"已收藏":"70.7万"}</small></button><button onClick={()=>setShowShare(true)}><Share2/><small>分享</small></button></div>
 <div className="bv-banner">▣ 第357期每周必看 收录 ›</div><div className="bv-tags">♫ 发现《来自天堂的魔鬼》  美之雅韵 礼蕴新生</div>
 <h3>相关推荐</h3>{["【TF家族】2026新年音乐会「荣耀」：《美杜莎》纯享版（DAY1）","王橹杰穆祉丞《来自天堂的魔鬼》联排练习室纯享版","【TF家族练习生】荣耀之战演唱会纯享版"].map((x)=><div className="bv-related" key={x}><div className="bv-thumb"><Play size={24}/></div><div><strong>{x}</strong><small>TF家族 · 相关视频</small></div></div>)}
 </div>:<div className="bv-comments"><div className="bv-comments-head">热门评论 <span>☰ 按热度</span></div>{[...comments,...samples].map((x,i)=><div className="bv-comment" key={i}><div className="bv-comment-avatar">{x.name[0]}</div><div><div className="bv-comment-name">{x.name}</div><p>{x.text}</p><div className="bv-comment-footer"><span>评论</span><button onClick={()=>setReply(x.name)}>回复</button><button className={likedComments.includes(i)?"on":""} onClick={()=>setLikedComments(v=>v.includes(i)?v.filter(n=>n!==i):[...v,i])}><ThumbsUp size={15}/> {x.likes+(likedComments.includes(i)?1:0)}</button></div>{reply===x.name&&<div className="bv-reply">回复 {x.name}：<input placeholder="写下你的回复…" value={comment} onChange={e=>setComment(e.target.value)}/><button onClick={()=>{post();setReply("")}}>发送</button></div>}</div></div>)}</div>}
 <div className="bv-compose"><input value={comment} onChange={e=>setComment(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")post()}} placeholder="与其赞同别人的话语，不如自己畅所欲言。"/><button onClick={post} aria-label="发送评论"><Send size={21}/></button></div>
 {showShare&&<div className="bv-share"><h3>分享视频</h3><p>{title}</p><button onClick={()=>{navigator.clipboard?.writeText("https://b23.tv/LYQS51F");setShowShare(false)}}>复制视频链接</button><button onClick={()=>setShowShare(false)}>取消</button></div>}
 </div>;
}
