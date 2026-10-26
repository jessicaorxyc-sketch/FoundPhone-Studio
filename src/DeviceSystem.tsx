import { SystemNotifications } from "./SystemNotifications";
import {
  ConnectivityModule,
  SliderModule,
} from "./vendor/ios-web/ControlModules";
import { UnlockHandle } from "./vendor/ios-web/UnlockHandle";
import { useState, useEffect, createContext, useContext } from "react";
import {
  LockKeyhole,
  Flashlight,
  Camera,
  Delete,
  ChevronDown,
  Play,
  SkipForward,
  Moon,
  RotateCcw,
  Monitor,
  Timer,
  Calculator,
  Globe,
  Mic,
  ArrowUp,
  ChevronUp,
  Plus,
  Power,
  Signal,
  House,
  ScanLine,
  Circle,
  Radio,
  Wifi,
  Battery,
  Heart,
  Music2,
  Airplay,
  ChevronRight,
  Lock,
} from "lucide-react";
import { motion } from "motion/react";
import type { Work } from "./schema";
export const KeyboardContext = createContext<(open: boolean) => void>(() => {});
export function NativeComposer({
  creator,
  onAdd,
}: {
  creator: boolean;
  onAdd: () => void;
}) {
  const open = useContext(KeyboardContext);
  return (
    <button
      className="native-compose-field"
      aria-label={creator ? "添加消息" : "输入消息"}
      onClick={() => (creator ? onAdd() : open(true))}
    >
      {creator ? "添加消息" : ""}
    </button>
  );
}

const lockSongs = [
  {
    "title": "来自天堂的魔鬼",
    "artist": "邓紫棋",
    "url": "https://music.163.com/#/search/m/?s=%E6%9D%A5%E8%87%AA%E5%A4%A9%E5%A0%82%E7%9A%84%E9%AD%94%E9%AC%BC%20%E9%82%93%E7%B4%AB%E6%A3%8B&type=1"
  },
  {
    "title": "淡季动物园",
    "artist": "许光汉",
    "url": "https://music.163.com/#/search/m/?s=%E6%B7%A1%E5%AD%A3%E5%8A%A8%E7%89%A9%E5%9B%AD%20%E8%AE%B8%E5%85%89%E6%B1%89&type=1"
  },
  {
    "title": "恋人未满",
    "artist": "穆祉丞",
    "url": "https://music.163.com/#/search/m/?s=%E6%81%8B%E4%BA%BA%E6%9C%AA%E6%BB%A1%20%E7%A9%86%E7%A5%89%E4%B8%9E&type=1"
  },
  {
    "title": "恋人",
    "artist": "李荣浩",
    "url": "https://music.163.com/#/search/m/?s=%E6%81%8B%E4%BA%BA%20%E6%9D%8E%E8%8D%A3%E6%B5%A9&type=1"
  },
  {
    "title": "笨小孩",
    "artist": "刘德华",
    "url": "https://music.163.com/#/search/m/?s=%E7%AC%A8%E5%B0%8F%E5%AD%A9%20%E5%88%98%E5%BE%B7%E5%8D%8E&type=1"
  },
  {
    "title": "剩下的盛夏",
    "artist": "TFBOYS",
    "url": "https://music.163.com/#/search/m/?s=%E5%89%A9%E4%B8%8B%E7%9A%84%E7%9B%9B%E5%A4%8F%20TFBOYS&type=1"
  },
  {
    "title": "多远都要在一起",
    "artist": "邓紫棋",
    "url": "https://music.163.com/#/search/m/?s=%E5%A4%9A%E8%BF%9C%E9%83%BD%E8%A6%81%E5%9C%A8%E4%B8%80%E8%B5%B7%20%E9%82%93%E7%B4%AB%E6%A3%8B&type=1"
  },
  {
    "title": "刻在我心底的名字",
    "artist": "卢广仲",
    "url": "https://music.163.com/#/search/m/?s=%E5%88%BB%E5%9C%A8%E6%88%91%E5%BF%83%E5%BA%95%E7%9A%84%E5%90%8D%E5%AD%97%20%E5%8D%A2%E5%B9%BF%E4%BB%B2&type=1"
  },
  {
    "title": "虚拟",
    "artist": "陈粒",
    "url": "https://music.163.com/#/search/m/?s=%E8%99%9A%E6%8B%9F%20%E9%99%88%E7%B2%92&type=1"
  },
  {
    "title": "克卜勒",
    "artist": "孙燕姿",
    "url": "https://music.163.com/#/search/m/?s=%E5%85%8B%E5%8D%9C%E5%8B%92%20%E5%AD%99%E7%87%95%E5%A7%BF&type=1"
  },
  {
    "title": "绝对占有 相对自由",
    "artist": "陈粒",
    "url": "https://music.163.com/#/search/m/?s=%E7%BB%9D%E5%AF%B9%E5%8D%A0%E6%9C%89%20%E7%9B%B8%E5%AF%B9%E8%87%AA%E7%94%B1%20%E9%99%88%E7%B2%92&type=1"
  }
];
export function DeviceLock({
  work,
  time,
  notices,
  onDismiss,
  pinOpen,
  setPinOpen,
  error,
  onUnlock,
  onCamera,
  onLight,
  onSongSelect,
}: {
  work: Work;
  time: string;
  notices: string[];
  onDismiss: (index: number) => void;
  pinOpen: boolean;
  setPinOpen: (v: boolean) => void;
  error: string;
  onUnlock: (v: string) => void;
  onCamera: () => void;
  onLight: () => void;
  onSongSelect: (url: string) => void;
}) {
  const [code, setCode] = useState("");
  const [songIndex, setSongIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setSongIndex((i) => (i + 1) % lockSongs.length), 8000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    if (error) setCode("");
  }, [error]);
  useEffect(() => {
    if (!pinOpen) setCode("");
  }, [pinOpen]);
  const digit = (key: string) => {
    const value = key === "⌫" ? code.slice(0, -1) : (code + key).slice(0, 12);
    setCode(value);
    if (
      /^\d+$/.test(work.phone.passcode) &&
      value.length === work.phone.passcode.length
    ) {
      onUnlock(value);
      setCode("");
    }
  };
  const open = () => (work.phone.passcode ? setPinOpen(true) : onUnlock(""));
  return (
    <motion.div
      className={"lock-screen device-lock " + (pinOpen ? "pin-open" : "")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: -852, opacity: 0 }}
      transition={{ duration: 0.48, ease: [0.32, 0.72, 0, 1] }}
    >
      {!pinOpen ? (
        <>
          <div className="lock-clock-block">
            <p>
              {new Intl.DateTimeFormat("zh-CN", {
                month: "long",
                day: "numeric",
                weekday: "long",
                timeZone: "UTC",
              }).format(
                new Date((work.phone.date || "2026-09-01") + "T12:00:00Z"),
              )}
            </p>
            <h1>{time}</h1>
            <button type="button" className="custom-lock-lyrics" aria-label="点击歌曲解锁并打开网易云音乐" onClick={() => onSongSelect(lockSongs[songIndex].url)}>
              <span className="custom-lyrics-heading"><span className="custom-lyrics-symbol" aria-hidden="true">词<span className="custom-lyrics-miniheart">♥</span></span>心动歌词</span>
              <span>{lockSongs[songIndex].title}</span>
              <span>{lockSongs[songIndex].artist}</span>
              <span className="custom-lyrics-heart" aria-hidden="true">♥</span>
            </button>
          </div>
          <div className="lock-notifications">
            {work.phone.notifications && (
              <SystemNotifications
                compact
                notices={notices}
                apps={work.apps}
                onOpen={open}
                onDismiss={onDismiss}
              />
            )}
          </div>
          <UnlockHandle onUnlock={open} />

          <div className="lock-tools">
            <button onClick={onLight} aria-label="手电筒">
              <Flashlight size={23} />
            </button>
            <button
              onClick={onCamera}
              disabled={
                !work.apps.some((a) => a.installed && a.id === "camera")
              }
              aria-label="相机"
            >
              <Camera size={25} />
            </button>
          </div>
        </>
      ) : (
        <div className="device-passcode">
          <LockKeyhole size={22} />
          <h2>输入密码</h2>
          <div
            className={"passcode-dots " + (error ? "pin-shake" : "")}
            aria-label={"已输入" + code.length + "位密码"}
          >
            {Array.from({ length: work.phone.passcode.length }, (_, i) => (
              <i key={i} className={i < code.length ? "filled" : ""} />
            ))}
          </div>
          <input
            className={
              /^\d+$/.test(work.phone.passcode)
                ? "accessible-pin"
                : "legacy-passcode"
            }
            aria-label="锁屏密码"
            autoComplete="off"
            inputMode="numeric"
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onUnlock(code)}
          />
          <div className="pin-keypad">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", ""].map(
              (n, i) =>
                n ? (
                  <button
                    key={i}
                    aria-label={"密码键" + n}
                    onClick={() => digit(n)}
                  >
                    <b>{n}</b>
                    <small>
                      {
                        [
                          "",
                          "",
                          "ABC",
                          "DEF",
                          "GHI",
                          "JKL",
                          "MNO",
                          "PQRS",
                          "TUV",
                          "WXYZ",
                        ][Number(n)]
                      }
                    </small>
                  </button>
                ) : (
                  <span key={i} />
                ),
            )}
          </div>
          <span role="status" className="pin-error">
            {error}
          </span>
          {!/^[0-9]+$/.test(work.phone.passcode) && (
            <button onClick={() => onUnlock(code)}>解锁</button>
          )}
          <div className="pin-footer">
            <button onClick={() => setPinOpen(false)}>取消</button>
            <button
              aria-label="删除一位密码"
              onClick={() => (code ? digit("⌫") : setPinOpen(false))}
            >
              {code ? "删除" : "取消"}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
export function ControlCenter({
  battery = 94,
  network,
  close,
}: {
  battery?: number;
  network: string;
  close: () => void;
}) {
  const [rotation, setRotation] = useState(true),
    [focus, setFocus] = useState(false),
    [playing, setPlaying] = useState(false);
  const [brightness, setBrightness] = useState(50),
    [volume, setVolume] = useState(25);
  const [tool, setTool] = useState("");
  return (
    <motion.div
      className="system-panel device-control"
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
    >
      <button className="cc-close" aria-label="关闭控制中心" onClick={close}>
        <Power />
      </button>
      <button
        className="cc-edit"
        aria-label="控制中心编辑"
        onClick={() => setTool("编辑控制")}
      >
        <Plus />
      </button>
      <div className="cc-current">
        <span>
          <Airplay size={13} />
        </span>
        控制中心 <ChevronRight size={16} />
      </div>
      <div className="cc-status" aria-label={"蜂窝网络 " + network}>
        <div>
          <span>
            <Signal size={18} />
            <small>主号</small> 中国移动 <Wifi size={17} />
          </span>
          <span>
            <Signal size={18} />
            <small>副号</small> 中国电信
          </span>
        </div>
        <span>
          <Lock size={13} /> {battery}% <Battery size={27} />
        </span>
      </div>
      <nav className="cc-page-rail" aria-label="控制中心分类">
        {[Heart, Music2, House, Radio].map((Icon, i) => (
          <button
            key={i}
            aria-label={["常用控制", "媒体控制", "家庭控制", "连接控制"][i]}
            onClick={() =>
              document
                .querySelector(
                  [".cc-grid", ".cc-music", ".cc-home", ".cc-connect"][i],
                )
                ?.scrollIntoView({ block: "nearest", behavior: "smooth" })
            }
          >
            <Icon fill={i === 0 ? "currentColor" : "none"} />
          </button>
        ))}
      </nav>
      <div className="cc-grid">
        <ConnectivityModule />
        <div className="cc-music">
          <div className="cc-media-top">
            <span>
              <Music2 size={28} />
            </span>
            <Airplay size={21} />
          </div>
          <div className="cc-media-title">
            <strong>{playing ? "测试播放" : "未在播放"}</strong>
            <small>音乐</small>
          </div>
          <div>
            <button aria-label="上一首">
              <SkipForward style={{ transform: "rotate(180deg)" }} />
            </button>
            <button
              aria-label={playing ? "暂停" : "播放"}
              onClick={() => setPlaying(!playing)}
            >
              <Play fill="currentColor" />
            </button>
            <button aria-label="下一首">
              <SkipForward />
            </button>
          </div>
        </div>
        <button
          className={"cc-square " + (rotation ? "cc-white" : "")}
          aria-label="旋转锁定"
          aria-pressed={rotation}
          onClick={() => setRotation(!rotation)}
        >
          <span className="cc-rotation">
            <RotateCcw />
            <Lock size={14} />
          </span>
        </button>
        <button
          className="cc-square"
          onClick={() => setTool(tool ? "" : "屏幕镜像")}
          aria-label="屏幕镜像"
        >
          <Monitor />
        </button>
        <SliderModule
          type="brightness"
          value={brightness}
          onChange={setBrightness}
        />
        <SliderModule type="volume" value={volume} onChange={setVolume} />
        <button
          className={"cc-focus " + (focus ? "cc-white" : "")}
          aria-pressed={focus}
          onClick={() => setFocus(!focus)}
        >
          <Moon />
          <span>专注模式</span>
          <ChevronDown size={14} />
        </button>
        <button className="cc-home" onClick={() => setTool("家庭")}>
          <House size={38} />
          <span>未设置家庭</span>
        </button>
        {[Flashlight, Timer, Calculator, Camera].map((Icon, i) => (
          <button
            className={"cc-square cc-tool-" + i}
            aria-label={["手电筒", "计时器", "计算器", "相机"][i]}
            key={i}
            onClick={() =>
              setTool(tool ? "" : ["手电筒", "计时器", "计算器", "相机"][i])
            }
          >
            <Icon />
          </button>
        ))}
        {[ScanLine, Circle, Radio].map((Icon, i) => (
          <button
            key={i}
            className={"cc-square cc-bottom-tool cc-bottom-" + i}
            aria-label={["扫码", "屏幕录制", "声音识别"][i]}
            onClick={() => setTool(["扫码", "屏幕录制", "声音识别"][i])}
          >
            <Icon />
          </button>
        ))}
      </div>
      {tool && (
        <div className="cc-tool">
          <strong>{tool}</strong>
          <p>
            {tool === "屏幕镜像" ? "正在搜索作品中的设备…" : "作品内快捷控制"}
          </p>
          <button onClick={() => setTool("")}>完成</button>
        </div>
      )}
      <button className="cc-dismiss" onClick={close}>
        轻扫以关闭
        <ChevronUp size={16} />
      </button>
    </motion.div>
  );
}
export function DeviceKeyboard({ close }: { close: () => void }) {
  const [value, setValue] = useState(""),
    [shift, setShift] = useState(false),
    [numbers, setNumbers] = useState(false);
  return (
    <div className="device-keyboard" role="dialog" aria-label="屏幕键盘">
      <div className="keyboard-draft">
        <input
          autoFocus
          aria-label="消息草稿"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="输入消息"
        />
        <button aria-label="收起键盘" onClick={close}>
          <ChevronDown />
        </button>
      </div>
      <div className="keyboard-candidates">
        {(value ? [value, "好的", "知道了"] : ["我", "你", "好的"]).map(
          (v, i) => (
            <button key={i} onClick={() => setValue(value + v)}>
              {v}
            </button>
          ),
        )}
      </div>
      {(numbers
        ? ["1234567890", "-/:;()¥&@", ".,?!'"]
        : ["qwertyuiop", "asdfghjkl", "zxcvbnm"]
      ).map((row, i) => (
        <div className="keyboard-row" key={i}>
          {i === 2 && (
            <button
              className="key-special"
              aria-label="切换大小写"
              onClick={() => setShift(!shift)}
            >
              <ArrowUp size={19} />
            </button>
          )}
          {[...row].map((k) => (
            <button
              key={k}
              onClick={() => setValue(value + (shift ? k.toUpperCase() : k))}
            >
              {shift ? k.toUpperCase() : k}
            </button>
          ))}
          {i === 2 && (
            <button
              className="key-special"
              aria-label="退格"
              onClick={() => setValue(value.slice(0, -1))}
            >
              <Delete size={20} />
            </button>
          )}
        </div>
      ))}
      <div className="keyboard-row keyboard-bottom">
        <button onClick={() => setNumbers(!numbers)}>
          {numbers ? "ABC" : "123"}
        </button>
        <button className="key-space" onClick={() => setValue(value + " ")}>
          空格
        </button>
        <button onClick={close}>完成</button>
      </div>
      <div className="keyboard-accessories">
        <Globe size={24} />
        <small>草稿</small>
        <Mic size={23} />
      </div>
    </div>
  );
}
export { NativeSettings } from "./ios/Settings";
