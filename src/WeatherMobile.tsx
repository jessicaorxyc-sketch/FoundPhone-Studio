import { useEffect, useState } from "react";
import { Cloud, CloudDrizzle, CloudRain, CloudSun, Sun, Moon, Wind, Droplets, Eye, Thermometer, Sunrise, Gauge, Map, List, ChevronLeft, X, RefreshCw } from "lucide-react";
import "./weather-mobile.css";

type City = {name:string; latitude:number; longitude:number; zone:string};
type Weather = {current?:Record<string,number>; hourly?:Record<string,number[]|string[]>; daily?:Record<string,number[]|string[]>; air?:Record<string,number>; updated?:string; error?:string};
const cities:City[]=[{name:"北京市",latitude:39.9042,longitude:116.4074,zone:"Asia/Shanghai"},{name:"重庆市",latitude:29.563,longitude:106.5516,zone:"Asia/Shanghai"}];
const desc=(c:number)=>c===0?"晴":c<=3?"局部多云":c<=48?"有雾":c<=67?"有雨":c<=77?"有雪":c<=82?"阵雨":c<=86?"阵雪":"雷雨";
const emoji=(c:number,night=false)=>c===0?(night?"☾":"☀"):c<=3?(night?"☁":"🌤"):c<=48?"☁":c<=67?"🌧":c<=77?"❄":c<=82?"🌦":"⛈";
const round=(v?:number)=>v==null?"--":Math.round(v);
const clock=(iso:string)=>iso?.slice(11,16)||"--:--";
const dateLabel=(iso:string,i:number)=>i===0?"今天":new Intl.DateTimeFormat("zh-CN",{weekday:"short",timeZone:"Asia/Shanghai"}).format(new Date(iso+"T12:00:00+08:00"));
const gradient=(c:number)=>c<=3?"clear":c>=51?"rain":"cloudy";
const card=(name:string,child:React.ReactNode,cls="")=><section className={"wm-card "+cls}><div className="wm-card-title">{name}</div>{child}</section>;
export function WeatherMobile(){
 const [selected,setSelected]=useState(0),[list,setList]=useState(false),[map,setMap]=useState(false),[data,setData]=useState<Record<number,Weather>>({}),[busy,setBusy]=useState(false);
 const city=cities[selected],weather=data[selected]||{},c=weather.current||{},h=weather.hourly||{},d=weather.daily||{},a=weather.air||{};
 useEffect(()=>{let live=true;setBusy(true);Promise.all(cities.map(async(city,i)=>{try{
 const qs=new URLSearchParams({latitude:String(city.latitude),longitude:String(city.longitude),timezone:city.zone,forecast_days:"10",current:"temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,precipitation,pressure_msl,visibility,is_day",hourly:"temperature_2m,weather_code,precipitation_probability",daily:"weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,uv_index_max"});
 const airqs=new URLSearchParams({latitude:String(city.latitude),longitude:String(city.longitude),timezone:city.zone,current:"us_aqi,pm2_5,pm10,uv_index"});
 const [wr,ar]=await Promise.all([fetch("https://api.open-meteo.com/v1/forecast?"+qs),fetch("https://air-quality-api.open-meteo.com/v1/air-quality?"+airqs)]);
 if(!wr.ok)throw new Error("天气服务暂时不可用");
 const w=await wr.json();let air={};if(ar.ok){const j=await ar.json();air=j.current||{};}
 return [i,{current:w.current,hourly:w.hourly,daily:w.daily,air,updated:w.current?.time}] as const;
 }catch(e){return [i,{error:e instanceof Error?e.message:"天气数据不可用"}] as const;}})).then(items=>{if(live){setData(Object.fromEntries(items));setBusy(false);}});return()=>{live=false};},[]);
 const days=d.time as string[]||[],hourTimes=h.time as string[]||[],start=Math.max(0,hourTimes.findIndex(x=>x>=((weather.updated||"").slice(0,13)+":00")));
 const aq=a.us_aqi,aqLabel=aq==null?"暂无数据":aq<=50?"优":aq<=100?"良":aq<=150?"轻度污染":aq<=200?"中度污染":"污染";
 return <div className={"weather-mobile wm-"+gradient(c.weather_code||0)}>
 <div className="wm-background"><span className="wm-moon">☾</span><span className="wm-stars"/></div>
 <div className="wm-scroll" key={selected}>
 {list?<div className="wm-citylist"><h1>天气</h1>{cities.map((item,i)=>{const q=data[i]?.current||{};return <button key={item.name} onClick={()=>{setSelected(i);setList(false)}}><div><strong>{item.name}</strong><small>{desc(q.weather_code||0)}</small></div><b>{round(q.temperature_2m)}°</b></button>})}</div>:
 map?<div className="wm-mapview"><h2>空气质量地图</h2><div className="wm-mapbox"><span>中国</span><strong>{city.name}</strong><p>空气质量指数 {aq==null?"暂无数据":round(aq)}</p></div><small>空气质量数据来自 Open-Meteo。此处为城市概览，非实时地图图层。</small></div>:
 <>
 <header className="wm-hero"><h1>{city.name}</h1><div className="wm-temp">{weather.error?"--":round(c.temperature_2m)}°</div><div className="wm-condition">{weather.error||desc(c.weather_code||0)}</div><div className="wm-highlow">最高 {round((d.temperature_2m_max as number[])?.[0])}°　最低 {round((d.temperature_2m_min as number[])?.[0])}°</div></header>
 {busy&&<p className="wm-loading">正在获取天气数据…</p>}
 {weather.error&&<p className="wm-loading">请检查网络连接后重新打开天气 App。</p>}
 {card("◷ 每小时天气预报",<div className="wm-hourly">{hourTimes.slice(start,start+24).map((t,i)=>{const ix=start+i,code=(h.weather_code as number[])?.[ix]||0;return <div key={t}><span>{i===0?"现在":clock(t)}</span><b>{emoji(code)}</b><strong>{round((h.temperature_2m as number[])?.[ix])}°</strong><small>{((h.precipitation_probability as number[])?.[ix]||0)>0?((h.precipitation_probability as number[])?.[ix])+"%":""}</small></div>})}</div>)}
 {card("▦ 10 日天气预报",<div className="wm-forecast">{days.map((day,i)=>{const max=(d.temperature_2m_max as number[])?.[i],min=(d.temperature_2m_min as number[])?.[i];return <div key={day}><span>{dateLabel(day,i)}</span><b>{emoji((d.weather_code as number[])?.[i]||0)}</b><span className="wm-low">{round(min)}°</span><div className="wm-range"><i style={{left:"18%",width:"64%"}}/></div><strong>{round(max)}°</strong></div>})}</div>)}
 {card("◌ 空气质量",<><div className="wm-aqi">{aq==null?"--":round(aq)} - {aqLabel}</div><div className="wm-colorbar"/><p>当前空气质量指数（美国 AQI）{aq==null?"暂无数据":"为 "+round(aq)}。</p></>)}
 <div className="wm-two">
 {card("♧ 体感温度",<><strong className="wm-metric">{round(c.apparent_temperature)}°</strong><p>根据温度、湿度和风速计算。</p></>)}
 {card("☀ 紫外线指数",<><strong className="wm-metric">{round(a.uv_index)}</strong><p>当前紫外线指数</p><div className="wm-colorbar"/></>)}
 </div>
 {card("♧ 风",<><strong className="wm-metric">{round(c.wind_speed_10m)} <small>公里/时</small></strong><p>风向 {round(c.wind_direction_10m)}°</p><div className="wm-compass">↑<span>北</span></div></>)}
 <div className="wm-two">
 {card("☀ 日出",<><strong className="wm-metric">{clock((d.sunrise as string[])?.[0])}</strong><p>日落：{clock((d.sunset as string[])?.[0])}</p></>)}
 {card("♢ 降水",<><strong className="wm-metric">{(d.precipitation_sum as number[])?.[0]??"--"} <small>毫米</small></strong><p>今天预计降水量</p></>)}
 {card("◉ 能见度",<><strong className="wm-metric">{c.visibility==null?"--":Math.round(c.visibility/1000)} <small>公里</small></strong><p>当前水平能见度</p></>)}
 {card("≋ 湿度",<><strong className="wm-metric">{round(c.relative_humidity_2m)}%</strong><p>当前相对湿度</p></>)}
 </div>
 {card("● 月相",<><div className="wm-lunar"><div><p>月相信息</p><small>当前天气接口未提供月相数据</small></div><span>🌕</span></div></>)}
 <div className="wm-two">{card("⌁ 平均气温",<><strong className="wm-metric">{days.length?round(((d.temperature_2m_max as number[])[0]+(d.temperature_2m_min as number[])[0])/2):"--"}°</strong><p>今日高低温平均值</p></>)}{card("◴ 气压",<><strong className="wm-metric">{round(c.pressure_msl)}</strong><p>百帕</p></>)}</div>
 <p className="wm-attribution">{city.name}的天气<br/>数据来源：Open-Meteo · {weather.updated?"更新于 "+clock(weather.updated):"等待更新"}</p>
 </>}
 </div>
 <nav className="wm-nav"><button aria-label="地图" onClick={()=>{setMap(v=>!v);setList(false)}}><Map size={23}/></button><div className="wm-dots">{cities.map((x,i)=><button key={x.name} aria-label={x.name} className={i===selected?"active":""} onClick={()=>{setSelected(i);setList(false);setMap(false)}}>●</button>)}</div><button aria-label="城市列表" onClick={()=>{setList(v=>!v);setMap(false)}}>{list||map?<X size={24}/>:<List size={24}/>}</button></nav>
 </div>;
}
