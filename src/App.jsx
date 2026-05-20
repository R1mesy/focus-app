import React, { useState, useEffect, useRef, useMemo } from 'react';

// Highly optimized inline SVG icons to prevent any bundle resolution failures on shared environments
const Icon = ({ name, className = "w-4 h-4", ...props }) => {
  const icons = {
    plus: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />,
    trash: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />,
    edit: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />,
    checkCircle: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    circle: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    mic: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 003-3v-6a3 3 0 00-6 0v6a3 3 0 003 3z" />,
    micOff: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.4 6.2a3 3 0 013.1 3v2.3l-5-5zm10 10.3l-14-14M12 18.8a6 6 0 005.3-3.2M12 15.8a3 3 0 002-2.8V12m-6-.4a6 6 0 00.3 2.1m.2 1.4A6 6 0 0012 18.8m0 0v3.8m-3.8 0h7.6" />,
    calendar: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />,
    checkSquare: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    alertCircle: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />,
    sparkles: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 21l-.813-5.096L3 15.091l5.096-.813L9 9l.813 5.278L15 15.091l-5.187.813zM18.281 7.5L18 10l-.281-2.5L15 7.125l2.719-.375L18 4.25l.281 2.5L21 7.125l-2.719.375z" />,
    lock: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />,
    unlock: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75m-.75 11.25h-10.5a2.25 2.25 0 01-2.25-2.25v-6.75a2.25 2.25 0 012.25-2.25h10.5a2.25 2.25 0 012.25 2.25v6.75a2.25 2.25 0 01-2.25 2.25z" />,
    chevronLeft: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5L8.25 12l7.5-7.5" />,
    chevronRight: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />,
    info: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.25 11.25l.041-.02a.75.75 0 111.085 1.026l-1.047 1.047c-.283.283-.68.415-1.074.348l-.04-.007a.75.75 0 11.3-.142l.04.007c.131.022.262-.022.356-.116l1.047-1.047a.75.75 0 00-.543-1.28H12a.75.75 0 00-.75.75v2.25a.75.75 0 001.5 0v-2.25zM12 8.25h.008v.008H12V8.25z" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    rotateCcw: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />,
    trophy: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.375M16.5 18.75h-.375M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.375M7.5 18.75h.375m9-.375a3.375 3.375 0 003.375-3.375V11.25A3.375 3.375 0 0016.5 7.875M7.5 18.375A3.375 3.375 0 014.125 15V11.25A3.375 3.375 0 017.5 7.875m9 0V4.875A1.875 1.875 0 0014.625 3h-5.25A1.875 1.875 0 007.5 4.875v3m9 0H7.5" />,
    award: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.98 20.53a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />,
    volume2: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />,
    volumeX: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 9.75l4.5 4.5m0-4.5l-4.5 4.5M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />,
    x: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />,
    shield: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
    eye: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.43 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />,
    eyeOff: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M2.006 2.006l19.988 19.988M15.002 12a3 3 0 11-6 0 3 3 0 016 0z" />,
    zap: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />,
    key: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />,
    userCheck: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    logOut: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={className}
      {...props}
    >
      {icons[name] || <path d="M12 2v20M2 12h20" />}
    </svg>
  );
};

// Safe UUID generator that works everywhere (HTTPS, HTTP, Sandbox, Standalone)
const safeUUID = () => {
  return 'ff-' + Math.random().toString(36).substring(2, 15) + '-' + Date.now().toString(36);
};

const LEVEL_THRESHOLDS = [
  { level: 1, minXp: 0, maxXp: 150, name: "神祕恐龍蛋 (Dino Egg)", stage: "egg" },
  { level: 2, minXp: 150, maxXp: 450, name: "破殼小萌龍 (Baby Dino)", stage: "baby" },
  { level: 3, minXp: 450, maxXp: 900, name: "少年霸王龍 (Teen Raptor)", stage: "teen" },
  { level: 4, minXp: 900, maxXp: 1500, name: "烈焰飛空龍 (Adult Dragon)", stage: "adult" },
  { level: 5, minXp: 1500, maxXp: 999999, name: "黃金神聖始祖龍 (Ancient Golden Dino)", stage: "ancient" }
];

const TREASURES_POOL = [
  { name: "時光黃金沙漏", emoji: "⏳", desc: "提升 15% 專注流速的神器" },
  { name: "永恆閃耀水晶", emoji: "💎", desc: "散發出高頻率思維波的罕見礦石" },
  { name: "萬能解鎖鑰匙", emoji: "🔑", desc: "據說能打開任何難關的大門" },
  { name: "黃金古代錢幣", emoji: "🪙", desc: "印有遠古神龍側像的純金貨幣" },
  { name: "復活恐龍琥珀", emoji: "☄️", desc: "封存了太古神龍純淨 DNA 的水晶" },
  { name: "不熄智慧火種", emoji: "🔥", desc: "專注燃燒時產生的不滅能量" },
  { name: "專注皇冠", emoji: "👑", desc: "唯有完成終極挑戰者方能配戴" }
];

const KEYWORD_WEIGHTS = [
  { words: ['midterm', '期中考', '期中'], label: '期中考 (Midterm)', weight: 5, color: 'text-rose-500 bg-rose-50 dark:text-rose-300 dark:bg-rose-950/40' },
  { words: ['final', '期末考', '期末'], label: '期末考 (Final)', weight: 5, color: 'text-red-500 bg-red-50 dark:text-red-300 dark:bg-red-950/40' },
  { words: ['report', '報告', '簡報'], label: '報告 (Report)', weight: 3, color: 'text-amber-500 bg-amber-50 dark:text-amber-300 dark:bg-amber-950/40' },
  { words: ['submission', '繳交', '上傳', '遞交'], label: '繳交 (Submission)', weight: 3, color: 'text-violet-500 bg-violet-50 dark:text-violet-300 dark:bg-violet-950/40' },
  { words: ['academic affairs', '教務處', '教務'], label: '教務處 (Academic)', weight: 2, color: 'text-sky-500 bg-sky-50 dark:text-sky-300 dark:bg-sky-950/40' }
];

const ATTRIBUTE_WEIGHTS = {
  deadline: { label: '有截止期限 (Deadline-driven)', weight: 4, icon: '📅', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
  health: { label: '健康相關 (Health-related)', weight: 3, icon: '❤️', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' },
  academic: { label: '學業相關 (Academic)', weight: 2, icon: '🎓', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' },
  admin: { label: '行政事項 (Administrative)', weight: 1, icon: '💼', color: 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300' }
};

// Local-First Encrypt / Decrypt helpers
const encryptText = (text, key) => {
  if (!text || !key) return text;
  try {
    const keyCodes = Array.from(key).map(c => c.charCodeAt(0));
    let result = "";
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      const keyCode = keyCodes[i % keyCodes.length] || 42;
      result += String.fromCharCode(charCode ^ keyCode);
    }
    return "FF_VAULT_E2EE::" + btoa(unescape(encodeURIComponent(result)));
  } catch (e) {
    console.error("Encryption failed:", e);
    return text;
  }
};

const decryptText = (ciphertext, key) => {
  if (!ciphertext || !key) return ciphertext;
  if (typeof ciphertext !== 'string' || !ciphertext.startsWith("FF_VAULT_E2EE::")) return ciphertext;
  try {
    const rawBase64 = ciphertext.replace("FF_VAULT_E2EE::", "");
    const decoded = decodeURIComponent(escape(atob(rawBase64)));
    const keyCodes = Array.from(key).map(c => c.charCodeAt(0));
    let result = "";
    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i);
      const keyCode = keyCodes[i % keyCodes.length] || 42;
      result += String.fromCharCode(charCode ^ keyCode);
    }
    return result;
  } catch (e) {
    console.error("Decryption failed:", e);
    return "🔑 [資料已鎖定 - 請配置正確解碼金鑰]";
  }
};

// Dino SVG Graphics
const DinoEggSVG = () => (
  <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-md animate-bounce" style={{ animationDuration: '3s' }}>
    <defs>
      <radialGradient id="eggGrad" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#FFF2E6" />
        <stop offset="70%" stopColor="#FF9E4F" />
        <stop offset="100%" stopColor="#D96A14" />
      </radialGradient>
    </defs>
    <ellipse cx="50" cy="55" rx="30" ry="40" fill="url(#eggGrad)" />
    <circle cx="40" cy="40" r="4" fill="#8C3F0D" opacity="0.3" />
    <circle cx="62" cy="45" r="5" fill="#8C3F0D" opacity="0.3" />
    <circle cx="35" cy="65" r="3" fill="#8C3F0D" opacity="0.3" />
    <circle cx="55" cy="70" r="5" fill="#8C3F0D" opacity="0.3" />
    <path d="M45,25 Q50,22 55,27" stroke="#FFF" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
  </svg>
);

const BabyDinoSVG = () => (
  <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-md animate-pulse">
    <ellipse cx="50" cy="70" rx="28" ry="18" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
    <path d="M22,70 Q50,90 78,70" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
    <path d="M42,50 Q40,30 55,25 Q70,20 75,35 Q80,50 65,55 Z" fill="#34D399" />
    <ellipse cx="50" cy="42" rx="14" ry="14" fill="#34D399" />
    <circle cx="45" cy="38" r="2.5" fill="#000" />
    <circle cx="43" cy="36" r="1" fill="#FFF" />
    <path d="M44,45 Q48,48 52,44" stroke="#047857" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M30,68 L32,55 L42,65 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
    <path d="M70,68 L68,52 L58,65 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
  </svg>
);

const TeenDinoSVG = () => (
  <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-md">
    <path d="M35,80 Q45,82 55,80 Q65,70 60,50 Q55,30 45,30 Q35,30 30,50 Z" fill="#10B981" />
    <circle cx="45" cy="30" r="16" fill="#10B981" />
    <polygon points="45,10 40,16 50,16" fill="#FBBF24" />
    <polygon points="35,14 32,20 38,20" fill="#FBBF24" />
    <polygon points="55,14 52,20 58,20" fill="#FBBF24" />
    <circle cx="38" cy="26" r="3" fill="#000" />
    <circle cx="50" cy="26" r="3" fill="#000" />
    <circle cx="37" cy="24" r="1" fill="#FFF" />
    <circle cx="49" cy="24" r="1" fill="#FFF" />
    <path d="M40,36 Q45,40 50,36" stroke="#047857" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M22,55 Q10,50 15,40 Q20,30 28,45" fill="none" stroke="#10B981" strokeWidth="6" strokeLinecap="round" />
    <ellipse cx="45" cy="85" rx="14" ry="6" fill="#059669" />
  </svg>
);

const AdultDinoSVG = () => (
  <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
    <path d="M80,30 C95,20 105,45 85,60 C75,68 65,72 55,85 C45,95 25,95 15,85" fill="none" stroke="#8B5CF6" strokeWidth="10" strokeLinecap="round" />
    <path d="M15,85 Q5,80 10,70 Q15,60 25,75" fill="none" stroke="#A78BFA" strokeWidth="4" strokeLinecap="round" />
    <path d="M60,40 Q85,15 100,45 Q70,80 50,85" fill="#8B5CF6" />
    <circle cx="85" cy="35" r="14" fill="#8B5CF6" />
    <path d="M85,21 L90,12 L95,23 Z" fill="#EF4444" />
    <path d="M75,23 L76,14 L82,23 Z" fill="#EF4444" />
    <circle cx="80" cy="32" r="2.5" fill="#FFF" />
    <circle cx="90" cy="32" r="2.5" fill="#FFF" />
    <path d="M78,41 Q85,46 92,41" stroke="#4C1D95" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M30,85 Q35,55 15,45 Q5,55 25,80" fill="#7C3AED" opacity="0.8" />
    <path d="M45,88 Q50,52 25,40 Q15,50 40,82" fill="#7C3AED" opacity="0.8" />
  </svg>
);

const AncientDinoSVG = () => (
  <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-lg animate-pulse" style={{ animationDuration: '2s' }}>
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <path d="M60,20 Q85,5 110,35 Q115,70 85,90 Q55,110 30,90 Q15,75 25,50 Z" fill="url(#goldGrad)" />
    <path d="M45,5 Q15,-10 25,30 Q40,40 45,15" fill="#FBBF24" opacity="0.7" />
    <path d="M75,5 Q105,-10 95,30 Q80,40 75,15" fill="#FBBF24" opacity="0.7" />
    <circle cx="48" cy="45" r="4.5" fill="#FFF" />
    <circle cx="48" cy="45" r="2" fill="#000" />
    <circle cx="72" cy="45" r="4.5" fill="#FFF" />
    <circle cx="72" cy="45" r="2" fill="#000" />
    <path d="M45,65 Q60,78 75,65" stroke="#78350F" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M60,15 L60,5" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
    <path d="M50,18 L45,8" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
    <path d="M70,18 L75,8" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const TreasureChestSVG = ({ isOpen = false }) => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 transform hover:scale-110 transition-transform">
    <rect x="15" y="45" width="70" height="40" rx="6" fill="#78350F" stroke="#451A03" strokeWidth="4" />
    {isOpen ? (
      <>
        <path d="M15,45 C15,25 85,25 85,45 Z" fill="#D97706" stroke="#451A03" strokeWidth="4" transform="translate(0, -15) rotate(-15 50 45)" />
        <rect x="42" y="30" width="16" height="16" rx="2" fill="#FBBF24" />
        <circle cx="50" cy="38" r="3" fill="#FFF" />
      </>
    ) : (
      <>
        <path d="M15,45 C15,25 85,25 85,45 Z" fill="#78350F" stroke="#451A03" strokeWidth="4" />
        <rect x="44" y="40" width="12" height="15" rx="2" fill="#FBBF24" stroke="#451A03" strokeWidth="2" />
        <circle cx="50" cy="47" r="2.5" fill="#78350F" />
      </>
    )}
  </svg>
);

const calculatePriorityScore = (title = '', description = '', attributes = [], basePriority = 'medium') => {
  let score = 0;
  const baseScores = { low: 1, medium: 3, high: 5 };
  score += baseScores[basePriority] || 3;

  const lowerTitle = title.toLowerCase();
  const lowerDesc = description.toLowerCase();
  KEYWORD_WEIGHTS.forEach(k => {
    const matches = k.words.some(word => lowerTitle.includes(word) || lowerDesc.includes(word));
    if (matches) {
      score += k.weight;
    }
  });

  attributes.forEach(attr => {
    if (ATTRIBUTE_WEIGHTS[attr]) {
      score += ATTRIBUTE_WEIGHTS[attr].weight;
    }
  });

  return score;
};

const isTaskDueOnDate = (task, dateStr) => {
  if (!task.dueDate || typeof task.dueDate !== 'string') return false;

  if (!task.recurring || task.recurring === 'none') {
    return task.dueDate === dateStr;
  }

  const parts = task.dueDate.split('-');
  if (parts.length !== 3) return false;
  const [tYear, tMonth, tDay] = parts.map(Number);
  const [cYear, cMonth, cDay] = dateStr.split('-').map(Number);

  const taskDate = new Date(tYear, tMonth - 1, tDay);
  const checkDate = new Date(cYear, cMonth - 1, cDay);

  if (checkDate < taskDate) return false;

  if (task.recurring === 'daily') return true;

  if (task.recurring === 'weekly') {
    return taskDate.getDay() === checkDate.getDay();
  }

  if (task.recurring === 'monthly') {
    return tDay === cDay;
  }

  return false;
};

const isTaskCompletedOnDate = (task, dateStr) => {
  if (!task.recurring || task.recurring === 'none') {
    return task.completed || false;
  }
  return task.completedDates?.includes(dateStr) || false;
};

const isSubstepCompletedOnDate = (task, stepId, dateStr) => {
  if (!task.recurring || task.recurring === 'none') {
    const step = task.substeps?.find(s => s.id === stepId);
    return step ? step.completed : false;
  }
  return task.completedSubsteps?.[dateStr]?.includes(stepId) || false;
};

const isTreasureClaimedOnDate = (task, dateStr) => {
  if (!task.recurring || task.recurring === 'none') {
    return task.claimedTreasure || false;
  }
  return task.claimedTreasureDates?.includes(dateStr) || false;
};

export default function App() {
  // Vault Auth states
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [vaultPassword, setVaultPassword] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [setupMode, setSetupMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // FocusFlow core engine data
  const [tasks, setTasks] = useState([]);
  const [userXp, setUserXp] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [inventory, setInventory] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // UI state variables
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date());
  
  // Modals status
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpTo, setLevelUpTo] = useState(1);

  // Form Fields
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [basePriority, setBasePriority] = useState('medium');
  const [selectedAttrs, setSelectedAttrs] = useState([]);
  const [dueDate, setDueDate] = useState(todayStr);
  const [recurring, setRecurring] = useState('none');
  const [isGeneratingSteps, setIsGeneratingSteps] = useState(false);

  // Client Cryptography settings
  const [isEncryptionEnabled, setIsEncryptionEnabled] = useState(false);
  const [encryptionKey, setEncryptionKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  // Speech helper
  const [isListening, setIsListening] = useState(false);
  const [voiceTarget, setVoiceTarget] = useState('title'); // 'title' | 'desc'
  const recognitionRef = useRef(null);
  const [notification, setNotification] = useState(null);

  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      if (type === 'step') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
        gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'task') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08);
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16);
        osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.24);
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'levelup') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(261.63, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(523.25, ctx.currentTime + 0.15);
        osc.frequency.linearRampToValueAtTime(783.99, ctx.currentTime + 0.3);
        osc.frequency.linearRampToValueAtTime(1046.50, ctx.currentTime + 0.45);
        osc.frequency.exponentialRampToValueAtTime(2093.00, ctx.currentTime + 0.7);
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.85);
        osc.start();
        osc.stop(ctx.currentTime + 0.85);
      }
    } catch (e) {
      console.warn("Audio synthesis not supported or blocked by browser policies.");
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  useEffect(() => {
    try {
      // Load Vault Security settings
      const savedPassword = localStorage.getItem('ff_vault_pwd');
      const storedXp = localStorage.getItem('ff_user_xp');
      const storedLevel = localStorage.getItem('ff_user_lvl');
      const storedInventory = localStorage.getItem('ff_user_inventory');
      const storedEncryption = localStorage.getItem('ff_encryption_enabled');
      const storedKey = localStorage.getItem('ff_encryption_key');

      if (savedPassword) {
        setVaultPassword(savedPassword);
        setSetupMode(false);
      } else {
        setSetupMode(true);
      }

      if (storedXp) setUserXp(parseInt(storedXp, 10) || 0);
      if (storedLevel) setUserLevel(parseInt(storedLevel, 10) || 1);
      if (storedInventory) {
        try {
          setInventory(JSON.parse(storedInventory) || []);
        } catch (e) {
          setInventory([]);
        }
      }
      if (storedEncryption) setIsEncryptionEnabled(storedEncryption === 'true');
      if (storedKey) setEncryptionKey(storedKey);

      // Load tasks list gracefully
      const storedTasks = localStorage.getItem('ff_tasks_list');
      if (storedTasks) {
        try {
          setTasks(JSON.parse(storedTasks) || []);
        } catch (e) {
          setTasks([]);
        }
      } else {
        // Pre-configured welcome task
        const welcomeTask = {
          id: 'welcome-task-id',
          title: '探索 FocusFlow 系統 🚀',
          description: '體驗無腦排程：建立新任務、開啟語音功能、解鎖控龍夥伴！',
          basePriority: 'high',
          attributes: ['academic', 'deadline'],
          dueDate: todayStr,
          recurring: 'none',
          priorityScore: 12,
          substeps: [
            { id: 'step-1', text: '點擊右上角「隱私專屬加密通道」設定金鑰', completed: false },
            { id: 'step-2', text: '點選「無腦排程」建立您的第一個專注日誌', completed: false },
            { id: 'step-3', text: '勾選一個子步驟獲得 +15 經驗值', completed: false }
          ],
          completed: false,
          claimedTreasure: false,
          completedDates: [],
          completedSubsteps: {},
          claimedTreasureDates: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setTasks([welcomeTask]);
        localStorage.setItem('ff_tasks_list', JSON.stringify([welcomeTask]));
      }
    } catch (e) {
      console.warn("Storage loading error:", e);
    } finally {
      setLoading(false);
    }
  }, [todayStr]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'zh-TW';

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (voiceTarget === 'title') {
          setTaskTitle(prev => prev + transcript);
          showNotification(`語音寫入標題成功！`, 'info');
        } else {
          setTaskDesc(prev => prev + transcript);
          showNotification(`語音寫入描述成功！`, 'info');
        }
        setIsListening(false);
      };

      rec.onerror = (e) => {
        console.error("Speech recognition error:", e);
        setIsListening(false);
        showNotification("未能辨識音訊，請再試一次", "error");
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, [voiceTarget]);

  const toggleVoiceListening = (targetField) => {
    if (!recognitionRef.current) {
      showNotification("此瀏覽器環境不支援 Web Speech 語音辨識", "error");
      return;
    }

    setVoiceTarget(targetField);

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error("Voice startup exception:", err);
      }
    }
  };

  const generateStepsWithAI = async (title, description) => {
    const cleanTitle = isEncryptionEnabled ? decryptText(title, encryptionKey) : title;
    const cleanDesc = isEncryptionEnabled ? decryptText(description, encryptionKey) : description;

    await new Promise(r => setTimeout(r, 1000));

    // Custom template mappings based on input keywords
    const templates = [
      { keywords: ['報告', 'report', 'midterm', 'final'], steps: ["搜集與整理關鍵參考文獻資訊", "擬定核心寫作大綱與架構規劃", "動手撰寫核心主體內容與段落", "交叉檢查引用文獻格式與字級", "確認並匯出 PDF 檔案安全上傳"] },
      { keywords: ['運動', '健身', '健康', '跑'], steps: ["熱身拉筋與補充足夠飲水", "執行主訓練計畫或指定心肺有氧", "紀錄今日運動表現數值與組數", "進行全身肌肉緩和與舒展放鬆", "攝取優質蛋白質與營養修復"] },
      { keywords: ['教務', '行政', '繳交', '文件'], steps: ["備妥所需的身分文件或正影本", "細心填寫與複查申辦表單內容", "親自前往或線上登入指定辦公室", "遞交完整申請文件並索取收執聯", "設定提醒日追蹤後續審核進度"] },
      { keywords: ['考試', '唸書', '準備', '複習'], steps: ["清空書桌干擾源並開啟專注音樂", "複習重點章節觀念與手寫筆記", "實際演練精選考古題與錯題本", "整理高頻錯誤盲點並加強記憶", "充足睡眠讓大腦高效儲存記憶"] }
    ];

    const matchedTemplate = templates.find(t => 
      t.keywords.some(kw => cleanTitle.toLowerCase().includes(kw) || cleanDesc.toLowerCase().includes(kw))
    );

    const stepTexts = matchedTemplate 
      ? matchedTemplate.steps 
      : ["初始資料準備與盤點", "核心目標拆解與時程規劃", "進入深度專注階段主體執行", "細節檢視、校對與優化改善", "完成交付並儲存安全封檔"];

    return stepTexts.map(text => ({
      id: safeUUID(),
      text: isEncryptionEnabled ? encryptText(text, encryptionKey) : text,
      completed: false
    }));
  };

  const handleVaultSetup = (e) => {
    e.preventDefault();
    if (!inputPassword.trim()) {
      showNotification("請輸入一組安全的解鎖密碼", "error");
      return;
    }
    localStorage.setItem('ff_vault_pwd', inputPassword.trim());
    setVaultPassword(inputPassword.trim());
    setIsUnlocked(true);
    setSetupMode(false);
    showNotification("🔐 安全密碼設定成功！FocusFlow 保險箱已啟用");
  };

  const handleVaultUnlock = (e) => {
    e.preventDefault();
    if (inputPassword === vaultPassword) {
      setIsUnlocked(true);
      setInputPassword('');
      showNotification("🔓 歡迎回來！FocusFlow 保險箱解鎖成功");
    } else {
      showNotification("❌ 密碼錯誤，請重新輸入！", "error");
    }
  };

  const handleLockVault = () => {
    setIsUnlocked(false);
    setInputPassword('');
    showNotification("🔒 系統已安全上鎖");
  };

  const addExperiencePoints = (points) => {
    const newXp = userXp + points;
    
    let nextLvl = 1;
    for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
      if (newXp >= LEVEL_THRESHOLDS[i].minXp) {
        nextLvl = LEVEL_THRESHOLDS[i].level;
      }
    }

    setUserXp(newXp);
    localStorage.setItem('ff_user_xp', newXp.toString());

    if (nextLvl > userLevel) {
      playSound('levelup');
      setLevelUpTo(nextLvl);
      setUserLevel(nextLvl);
      localStorage.setItem('ff_user_lvl', nextLvl.toString());
      setShowLevelUp(true);
    }
  };

  const startEditTask = (task) => {
    setEditingTaskId(task.id);
    
    const decTitle = isEncryptionEnabled ? decryptText(task.title, encryptionKey) : task.title;
    const decDesc = isEncryptionEnabled ? decryptText(task.description, encryptionKey) : task.description;

    setTaskTitle(decTitle);
    setTaskDesc(decDesc);
    setBasePriority(task.basePriority || 'medium');
    setSelectedAttrs(task.attributes || []);
    setDueDate(task.dueDate || todayStr);
    setRecurring(task.recurring || 'none');
    
    setIsModalOpen(true);
  };

  const saveTask = async (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) {
      showNotification("請輸入 FocusFlow 任務名稱", "error");
      return;
    }

    setIsGeneratingSteps(true);

    const calculatedScore = calculatePriorityScore(taskTitle, taskDesc, selectedAttrs, basePriority);
    const finalTitle = isEncryptionEnabled ? encryptText(taskTitle.trim(), encryptionKey) : taskTitle.trim();
    const finalDesc = isEncryptionEnabled ? encryptText(taskDesc.trim(), encryptionKey) : taskDesc.trim();

    if (editingTaskId) {
      // Edit existing task
      const updatedTasks = tasks.map(t => {
        if (t.id === editingTaskId) {
          return {
            ...t,
            title: finalTitle,
            description: finalDesc,
            basePriority,
            attributes: selectedAttrs,
            dueDate,
            recurring,
            priorityScore: calculatedScore,
            updatedAt: new Date().toISOString()
          };
        }
        return t;
      });
      setTasks(updatedTasks);
      localStorage.setItem('ff_tasks_list', JSON.stringify(updatedTasks));
      showNotification("任務已成功更新！");
      setEditingTaskId(null);
    } else {
      // Create new task with AI sub-steps
      showNotification("AI 正在解析並拆解專注任務...", "info");
      const aiSubsteps = await generateStepsWithAI(taskTitle.trim(), taskDesc.trim());
      const taskData = {
        id: safeUUID(),
        title: finalTitle,
        description: finalDesc,
        basePriority,
        attributes: selectedAttrs,
        dueDate,
        recurring,
        priorityScore: calculatedScore,
        substeps: aiSubsteps,
        completed: false,
        claimedTreasure: false,
        completedDates: [],
        completedSubsteps: {},
        claimedTreasureDates: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updatedTasks = [...tasks, taskData];
      setTasks(updatedTasks);
      localStorage.setItem('ff_tasks_list', JSON.stringify(updatedTasks));
      showNotification("任務已建立！AI 拆解步驟已發放至您的看板");
    }

    resetForm();
    setIsModalOpen(false);
    setIsGeneratingSteps(false);
  };

  const resetForm = () => {
    setEditingTaskId(null);
    setTaskTitle('');
    setTaskDesc('');
    setBasePriority('medium');
    setSelectedAttrs([]);
    setDueDate(todayStr);
    setRecurring('none');
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('ff_tasks_list', JSON.stringify(updatedTasks));
    showNotification("任務已自時間流刪除");
  };

  const toggleTaskCompleted = (task, targetDate) => {
    if (!targetDate) targetDate = todayStr;

    if (task.recurring && task.recurring !== 'none') {
      const completedDates = task.completedDates || [];
      const isCompletedNow = !completedDates.includes(targetDate);

      let updatedCompletedDates = [];
      let updatedCompletedSubsteps = { ...(task.completedSubsteps || {}) };

      if (isCompletedNow) {
        updatedCompletedDates = [...completedDates, targetDate];
        updatedCompletedSubsteps[targetDate] = task.substeps?.map(s => s.id) || [];
        playSound('task');
        addExperiencePoints(30);
        showNotification(`例行日常任務今日已攻克！ (+30 XP)`);
      } else {
        updatedCompletedDates = completedDates.filter(d => d !== targetDate);
        delete updatedCompletedSubsteps[targetDate];
        showNotification("已重設此日期任務為進行中狀態");
      }

      const updatedTasks = tasks.map(t => {
        if (t.id === task.id) {
          return {
            ...t,
            completedDates: updatedCompletedDates,
            completedSubsteps: updatedCompletedSubsteps,
            updatedAt: new Date().toISOString()
          };
        }
        return t;
      });
      setTasks(updatedTasks);
      localStorage.setItem('ff_tasks_list', JSON.stringify(updatedTasks));
    } else {
      const isCompletedNow = !task.completed;
      let updatedSubsteps = task.substeps || [];

      if (isCompletedNow) {
        updatedSubsteps = (task.substeps || []).map(s => ({ ...s, completed: true }));
      }

      const updatedTasks = tasks.map(t => {
        if (t.id === task.id) {
          return { ...t, completed: isCompletedNow, substeps: updatedSubsteps, updatedAt: new Date().toISOString() };
        }
        return t;
      });
      setTasks(updatedTasks);
      localStorage.setItem('ff_tasks_list', JSON.stringify(updatedTasks));

      if (isCompletedNow) {
        playSound('task');
        addExperiencePoints(50);
        showNotification("主任務全數攻克！加倍發放 50 XP");
      } else {
        showNotification("已重設為進行中狀態");
      }
    }
  };

  const toggleSubstep = (task, substepId, targetDate) => {
    if (!targetDate) targetDate = todayStr;
    let earnedXp = false;

    if (task.recurring && task.recurring !== 'none') {
      const completedSubsteps = { ...(task.completedSubsteps || {}) };
      const currentDaySteps = completedSubsteps[targetDate] || [];
      let updatedDaySteps = [];

      if (currentDaySteps.includes(substepId)) {
        updatedDaySteps = currentDaySteps.filter(id => id !== substepId);
      } else {
        updatedDaySteps = [...currentDaySteps, substepId];
        earnedXp = true;
      }
      completedSubsteps[targetDate] = updatedDaySteps;

      const allStepsDone = task.substeps && task.substeps.length > 0 && task.substeps.every(s => updatedDaySteps.includes(s.id));
      let updatedCompletedDates = task.completedDates || [];
      if (allStepsDone && !updatedCompletedDates.includes(targetDate)) {
        updatedCompletedDates = [...updatedCompletedDates, targetDate];
      } else if (!allStepsDone && updatedCompletedDates.includes(targetDate)) {
        updatedCompletedDates = updatedCompletedDates.filter(d => d !== targetDate);
      }

      const updatedTasks = tasks.map(t => {
        if (t.id === task.id) {
          return {
            ...t,
            completedSubsteps,
            completedDates: updatedCompletedDates,
            updatedAt: new Date().toISOString()
          };
        }
        return t;
      });
      setTasks(updatedTasks);
      localStorage.setItem('ff_tasks_list', JSON.stringify(updatedTasks));
    } else {
      const updatedSubsteps = task.substeps.map(step => {
        if (step.id === substepId) {
          if (!step.completed) {
            earnedXp = true;
          }
          return { ...step, completed: !step.completed };
        }
        return step;
      });

      const allStepsDone = updatedSubsteps.every(s => s.completed);

      const updatedTasks = tasks.map(t => {
        if (t.id === task.id) {
          return { ...t, substeps: updatedSubsteps, completed: allStepsDone, updatedAt: new Date().toISOString() };
        }
        return t;
      });
      setTasks(updatedTasks);
      localStorage.setItem('ff_tasks_list', JSON.stringify(updatedTasks));
    }

    if (earnedXp) {
      playSound('step');
      addExperiencePoints(15);
      showNotification("突破微步驟！發放 +15 XP", "success");
    }
  };

  const claimTreasure = (task, targetDate) => {
    if (!targetDate) targetDate = todayStr;

    const isAlreadyClaimed = task.recurring && task.recurring !== 'none'
      ? (task.claimedTreasureDates || []).includes(targetDate)
      : task.claimedTreasure;

    if (isAlreadyClaimed) return;
    
    const randomTreasure = TREASURES_POOL[Math.floor(Math.random() * TREASURES_POOL.length)];
    const updatedInventory = [...inventory, {
      ...randomTreasure,
      claimedAt: new Date().toISOString(),
      taskId: task.id,
      taskTitle: isEncryptionEnabled ? decryptText(task.title, encryptionKey) : task.title,
      claimedDate: targetDate
    }];

    setInventory(updatedInventory);
    localStorage.setItem('ff_user_inventory', JSON.stringify(updatedInventory));

    if (task.recurring && task.recurring !== 'none') {
      const updatedClaimedTreasureDates = [...(task.claimedTreasureDates || []), targetDate];
      const updatedTasks = tasks.map(t => {
        if (t.id === task.id) {
          return { ...t, claimedTreasureDates: updatedClaimedTreasureDates };
        }
        return t;
      });
      setTasks(updatedTasks);
      localStorage.setItem('ff_tasks_list', JSON.stringify(updatedTasks));
    } else {
      const updatedTasks = tasks.map(t => {
        if (t.id === task.id) {
          return { ...t, claimedTreasure: true, completed: true };
        }
        return t;
      });
      setTasks(updatedTasks);
      localStorage.setItem('ff_tasks_list', JSON.stringify(updatedTasks));
    }

    playSound('task');
    addExperiencePoints(60);
    showNotification(`🎉 獲得寶藏：【${randomTreasure.emoji} ${randomTreasure.name}】！ (+60 XP)`);
  };

  const saveSecuritySettings = (e) => {
    e.preventDefault();
    if (isEncryptionEnabled && !encryptionKey.trim()) {
      showNotification("啟用加密時必須設定解密金鑰", "error");
      return;
    }

    localStorage.setItem('ff_encryption_enabled', isEncryptionEnabled.toString());
    localStorage.setItem('ff_encryption_key', encryptionKey.trim());

    setIsPrivacyModalOpen(false);
    showNotification(isEncryptionEnabled ? "🔒 隱私加密通道已安全開啟，金鑰已生效！" : "🔓 加密通道已關閉，切換至一般傳輸模組");
  };

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => b.priorityScore - a.priorityScore);
  }, [tasks]);

  const filteredTasksForSelectedDate = useMemo(() => {
    const matched = sortedTasks.filter(t => isTaskDueOnDate(t, selectedDate));
    return matched.sort((a, b) => {
      const compA = isTaskCompletedOnDate(a, selectedDate);
      const compB = isTaskCompletedOnDate(b, selectedDate);
      if (compA !== compB) {
        return compA ? 1 : -1;
      }
      return b.priorityScore - a.priorityScore;
    });
  }, [sortedTasks, selectedDate]);

  const dailyActionStreamSteps = useMemo(() => {
    const list = [];
    sortedTasks.forEach(task => {
      const isCompletedToday = isTaskCompletedOnDate(task, todayStr);
      if (!isCompletedToday && isTaskDueOnDate(task, todayStr)) {
        if (task.substeps) {
          task.substeps.forEach(step => {
            const isStepDoneToday = isSubstepCompletedOnDate(task, step.id, todayStr);
            list.push({
              parentTask: task,
              stepId: step.id,
              text: step.text,
              completed: isStepDoneToday
            });
          });
        }
      }
    });
    return list;
  }, [sortedTasks, todayStr]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentCalendarMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentCalendarMonth(newMonth);
  };

  const renderCalendarDays = () => {
    const totalDays = getDaysInMonth(currentCalendarMonth);
    const firstDayIndex = getFirstDayOfMonth(currentCalendarMonth);
    const year = currentCalendarMonth.getFullYear();
    const month = currentCalendarMonth.getMonth();
    
    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="h-9 w-9"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isSelected = selectedDate === dateString;
      const isToday = todayStr === dateString;
      
      const activeTaskCountForDay = tasks.filter(t => isTaskDueOnDate(t, dateString) && !isTaskCompletedOnDate(t, dateString)).length;

      days.push(
        <button
          key={`day-${day}`}
          onClick={() => setSelectedDate(dateString)}
          type="button"
          className={`h-9 w-9 flex flex-col items-center justify-center rounded-xl text-xs relative transition-all duration-150 cursor-pointer
            ${isSelected ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-200 dark:shadow-none' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}
            ${isToday && !isSelected ? 'border border-indigo-500 font-bold text-indigo-600 dark:text-indigo-400' : ''}
          `}
        >
          <span>{day}</span>
          {activeTaskCountForDay > 0 && !isSelected && (
            <span className="absolute bottom-1 w-1 h-1 bg-amber-500 rounded-full"></span>
          )}
        </button>
      );
    }
    return days;
  };

  const activeLevelConfig = LEVEL_THRESHOLDS.find(t => t.level === userLevel) || LEVEL_THRESHOLDS[0];
  const nextLevelThreshold = LEVEL_THRESHOLDS.find(t => t.level === userLevel + 1) || { minXp: 999999 };
  const currentLevelProgress = userXp - activeLevelConfig.minXp;
  const currentLevelRange = nextLevelThreshold.minXp - activeLevelConfig.minXp;
  const progressPercent = Math.min(100, Math.max(0, (currentLevelProgress / currentLevelRange) * 100));

  const renderDinoCompanion = () => {
    switch (activeLevelConfig.stage) {
      case 'egg': return <DinoEggSVG />;
      case 'baby': return <BabyDinoSVG />;
      case 'teen': return <TeenDinoSVG />;
      case 'adult': return <AdultDinoSVG />;
      case 'ancient': return <AncientDinoSVG />;
      default: return <DinoEggSVG />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent"></div>
        <p className="mt-4 text-sm text-slate-400 font-bold tracking-widest uppercase">FocusFlow 保險箱解密中...</p>
      </div>
    );
  }

  // Secure locked login screen
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 antialiased">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse"></div>
          
          <div className="mx-auto my-4 w-16 h-16 bg-indigo-950/80 border border-indigo-500/30 rounded-2xl flex items-center justify-center text-indigo-400">
            <Icon name="shield" className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-white mt-4">
            FocusFlow 零知識保險箱
          </h2>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            100% 本地高度隱私封裝。您的任務與排程僅在本機加密儲存，任何外部平台與人都無法探測存取！
          </p>

          {setupMode ? (
            <form onSubmit={handleVaultSetup} className="mt-6 space-y-4">
              <div className="p-3 bg-indigo-950/40 border border-indigo-900/40 rounded-2xl text-left text-[11px] text-indigo-300 leading-relaxed flex gap-2">
                <Icon name="info" className="w-4 h-4 flex-shrink-0 text-indigo-400" />
                <span>首次使用，請為此網頁空間設定專屬解鎖密碼。若之後重新載入或離線分享，輸入密碼即可解開保險箱。</span>
              </div>
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  placeholder="設定專屬解鎖密碼..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  <Icon name={showKey ? "eyeOff" : "eye"} className="w-4 h-4" />
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-xs transition-all tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Icon name="userCheck" className="w-4 h-4" />
                <span>啟動 FocusFlow 專屬保險箱</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleVaultUnlock} className="mt-6 space-y-4">
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  placeholder="輸入密碼以解鎖您的任務流..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  <Icon name={showKey ? "eyeOff" : "eye"} className="w-4 h-4" />
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-xs transition-all tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Icon name="key" className="w-4 h-4" />
                <span>解鎖保險箱進入系統</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm("⚠️ 注意：重新設定會清空您所有的本機任務與等級，確認重設密碼？")) {
                    localStorage.clear();
                    window.location.reload();
                  }
                }}
                className="text-[10px] text-rose-500 hover:underline cursor-pointer block mx-auto pt-1"
              >
                忘記密碼？點此清空重置系統
              </button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-center gap-1 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
            <Icon name="zap" className="w-3 h-3 text-amber-500 animate-pulse" />
            <span>Pure Standalone E2EE Architecture</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 flex flex-col antialiased relative">
      
      {/* Toast Alert popup */}
      {notification && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 max-w-sm w-[90%] transition-all duration-300 ${
          notification.type === 'error' ? 'bg-red-500 text-white' :
          notification.type === 'info' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
        }`}>
          <Icon name="alertCircle" className="w-4 h-4" />
          <span className="text-xs font-semibold">{notification.message}</span>
        </div>
      )}

      {/* Level Up evolution celebration screen */}
      {showLevelUp && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-indigo-900 to-slate-900 text-white rounded-3xl p-8 max-w-md w-full text-center border border-indigo-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-indigo-500 to-pink-500 animate-pulse"></div>
            <div className="mx-auto my-6 flex justify-center animate-bounce">
              {renderDinoCompanion()}
            </div>
            <Icon name="trophy" className="mx-auto text-amber-400 w-16 h-16 animate-pulse" />
            <h2 className="text-3xl font-extrabold tracking-tight mt-4 bg-gradient-to-r from-amber-300 to-indigo-300 bg-clip-text text-transparent">
              FocusFlow 進化成功！
            </h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              恭喜！您的專注恐龍夥伴已提升至更高階段，解鎖了更強大的防專注干擾能量！
            </p>
            <div className="bg-indigo-950/60 border border-indigo-800/40 rounded-2xl p-4 my-6">
              <span className="text-xs text-slate-400 block uppercase font-bold tracking-widest">目前等級</span>
              <span className="text-4xl font-extrabold text-amber-300">Lv.{levelUpTo}</span>
              <span className="block text-xs font-semibold text-indigo-300 mt-1">{LEVEL_THRESHOLDS.find(l => l.level === levelUpTo)?.name}</span>
            </div>
            <button
              onClick={() => setShowLevelUp(false)}
              className="w-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 py-3 rounded-xl text-sm font-bold tracking-wider transition-all cursor-pointer"
            >
              繼續專注進化之旅
            </button>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-gradient-to-tr from-amber-500 via-indigo-500 to-purple-600 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
              <Icon name="sparkles" className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-950 to-indigo-600 dark:from-white dark:to-indigo-200 bg-clip-text text-transparent">
                FocusFlow
              </h1>
              <p className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">Gamified Task Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Toggle button */}
            <button 
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                showNotification(!soundEnabled ? "音效已開啟" : "音效已關閉", "info");
              }}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center cursor-pointer"
              title={soundEnabled ? "關閉音效" : "開啟音效"}
            >
              <Icon name={soundEnabled ? "volume2" : "volumeX"} className="w-4 h-4" />
            </button>

            {/* Privacy settings */}
            <button
              onClick={() => setIsPrivacyModalOpen(true)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isEncryptionEnabled 
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 font-bold'
                  : 'border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 hover:text-indigo-600'
              }`}
              title="配置端對端隱私加密金鑰"
            >
              <Icon name={isEncryptionEnabled ? "shield" : "lock"} className="w-3.5 h-3.5" />
              <span className="hidden md:inline">隱私專屬加密通道</span>
              <span className="inline-block w-2 h-2 rounded-full bg-current"></span>
            </button>

            {/* AI Scheduler button */}
            <button 
              onClick={() => { resetForm(); setIsModalOpen(true); }}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-md shadow-indigo-200 dark:shadow-none transition-all cursor-pointer"
            >
              <Icon name="plus" className="w-3.5 h-3.5" />
              <span>無腦排程</span>
            </button>

            {/* Log out / Lock button */}
            <button 
              onClick={handleLockVault}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all flex items-center justify-center cursor-pointer"
              title="登出並鎖定保險箱"
            >
              <Icon name="logOut" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left column: stats & calendar */}
        <section className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Dino pet card */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-lg border border-indigo-500/20">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-300">FocusFlow 專注夥伴</span>
                <h2 className="text-lg font-bold text-amber-300 mt-0.5">{activeLevelConfig.name}</h2>
              </div>
              <div className="px-3 py-1 bg-amber-400 text-slate-950 text-xs font-extrabold rounded-full">
                Lv.{userLevel}
              </div>
            </div>

            <div className="my-6 flex justify-center h-28 items-center bg-indigo-950/50 rounded-xl relative overflow-hidden py-4 border border-indigo-900/40">
              {renderDinoCompanion()}
              <div className="absolute top-2 right-4 animate-ping bg-amber-400 w-1 h-1 rounded-full"></div>
              <div className="absolute bottom-4 left-6 animate-pulse bg-emerald-400 w-1.5 h-1.5 rounded-full"></div>
            </div>

            {/* XP progress */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-300">
                <span>EXP 進度</span>
                <span className="font-semibold text-amber-300">{userXp} / {nextLevelThreshold.minXp} XP</span>
              </div>
              <div className="h-2.5 bg-indigo-950 rounded-full overflow-hidden border border-indigo-900/60 p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Inventory list */}
            <div className="mt-5 pt-4 border-t border-indigo-900/60">
              <div className="flex items-center gap-1 text-xs text-slate-300 font-bold mb-2">
                <Icon name="trophy" className="w-3.5 h-3.5 text-amber-400" />
                <span>已獲得專注寶藏 ({inventory.length})</span>
              </div>
              {inventory.length === 0 ? (
                <p className="text-[10px] text-slate-400 italic">完成任何完整任務，解鎖精緻傳奇寶藏！</p>
              ) : (
                <div className="flex flex-wrap gap-2 max-h-[85px] overflow-y-auto pr-1">
                  {inventory.map((item, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center gap-1 text-[11px] bg-indigo-900/50 border border-indigo-800/40 text-slate-100 px-2 py-0.5 rounded-lg"
                      title={`${item.name}: ${item.desc}`}
                    >
                      <span>{item.emoji}</span>
                      <span className="font-medium">{item.name}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Daily Action Stream (flattened steps) */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 rounded-lg">
                  <Icon name="checkSquare" className="w-4 h-4" />
                </span>
                <h2 className="text-sm font-bold text-slate-800 dark:text-white">今日行動頁面 (Daily Stream)</h2>
              </div>
              <span className="text-[9px] px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full font-bold">
                整合子步驟
              </span>
            </div>

            {dailyActionStreamSteps.length === 0 ? (
              <div className="text-center py-6 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-400 font-medium">今日無待辦子步驟。</p>
                <p className="text-[10px] text-slate-400 mt-1">AI 拆解任務後將自動整合至此！</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                {dailyActionStreamSteps.map(({ parentTask, stepId, text, completed }) => {
                  const decryptedStepText = isEncryptionEnabled ? decryptText(text, encryptionKey) : text;
                  return (
                    <div 
                      key={stepId}
                      className="flex items-start gap-2.5 p-2.5 bg-slate-50 dark:bg-slate-900/40 rounded-xl hover:bg-slate-100/50 transition-colors"
                    >
                      <button 
                        onClick={() => toggleSubstep(parentTask, stepId, todayStr)}
                        className="mt-0.5 text-slate-400 hover:text-indigo-600 transition-colors flex-shrink-0 cursor-pointer"
                      >
                        <Icon name={completed ? "checkCircle" : "circle"} className={`w-4 h-4 ${completed ? "text-emerald-500 fill-emerald-100 dark:fill-none" : ""}`} />
                      </button>
                      <div className="min-w-0 flex-1">
                        <p className={`text-xs font-semibold ${completed ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
                          {decryptedStepText}
                        </p>
                        <p className="text-[9px] text-slate-400 mt-0.5 truncate">
                          來自：{isEncryptionEnabled ? decryptText(parentTask.title, encryptionKey) : parentTask.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Interactive Calendar widget */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-rose-50 dark:bg-rose-950/40 text-rose-500 rounded-lg">
                  <Icon name="calendar" className="w-4 h-4" />
                </span>
                <h2 className="text-sm font-bold text-slate-800 dark:text-white">行事曆聯動</h2>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {currentCalendarMonth.getFullYear()}年 {currentCalendarMonth.getMonth() + 1}月
              </span>
              <div className="flex items-center gap-1">
                <button onClick={() => navigateMonth(-1)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500 cursor-pointer"><Icon name="chevronLeft" className="w-4 h-4" /></button>
                <button onClick={() => navigateMonth(1)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500 cursor-pointer"><Icon name="chevronRight" className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-2">
              <div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {renderCalendarDays()}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-[11px] text-slate-500">
              <span>點選日期: <strong className="text-indigo-600 dark:text-indigo-400">{selectedDate}</strong></span>
              <button onClick={() => setSelectedDate(todayStr)} className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold cursor-pointer">今日</button>
            </div>
          </div>

        </section>

        {/* Right column: Task stream & list view */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-base font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
                <span>{selectedDate === todayStr ? '📆 今日專注任務流' : `📅 日期排程：${selectedDate}`}</span>
                <span className="text-xs font-normal text-slate-400">
                  (共 {filteredTasksForSelectedDate.length} 項排程)
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">FocusFlow 自動評分系統會將高影響力、高權重的核心任務置頂處理。</p>
            </div>
            <button 
              onClick={() => { resetForm(); setDueDate(selectedDate); setIsModalOpen(true); }}
              className="flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <Icon name="plus" className="w-3.5 h-3.5" />
              <span>添加當天任務</span>
            </button>
          </div>

          {/* Tasks loop */}
          {filteredTasksForSelectedDate.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 border border-slate-200/80 dark:border-slate-700/80 shadow-sm text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-400 mb-4 animate-bounce" style={{ animationDuration: '4s' }}>
                <Icon name="checkSquare" className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">此日期目前無 FocusFlow 任務</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                此日期無排定任務。點擊「無腦排程」讓 AI 智能自動解構專注的一天！
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasksForSelectedDate.map(task => {
                const isFinished = isTaskCompletedOnDate(task, selectedDate);
                const allStepsDone = task.substeps && task.substeps.length > 0 && task.substeps.every(s => isSubstepCompletedOnDate(task, s.id, selectedDate));
                const isClaimed = isTreasureClaimedOnDate(task, selectedDate);
                
                const decryptedTitle = isEncryptionEnabled ? decryptText(task.title, encryptionKey) : task.title;
                const decryptedDesc = isEncryptionEnabled ? decryptText(task.description, encryptionKey) : task.description;

                return (
                  <div 
                    key={task.id}
                    className={`group bg-white dark:bg-slate-800 rounded-2xl border transition-all duration-200 ${
                      isFinished 
                        ? 'border-slate-100 dark:border-slate-800/80 opacity-60' 
                        : 'border-slate-200 dark:border-slate-700/80 hover:border-indigo-300 hover:shadow-md'
                    }`}
                  >
                    <div className="p-5 flex items-start gap-4">
                      
                      <button 
                        onClick={() => toggleTaskCompleted(task, selectedDate)}
                        className="mt-1.5 text-slate-300 hover:text-indigo-600 transition-colors flex-shrink-0 cursor-pointer"
                      >
                        <Icon name={isFinished ? "checkCircle" : "circle"} className={`w-6 h-6 ${isFinished ? "text-emerald-500 fill-emerald-50 dark:fill-none" : "hover:text-indigo-500"}`} />
                      </button>

                      <div className="min-w-0 flex-1">
                        
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded-md">
                              <Icon name="sparkles" className="w-3.5 h-3.5 text-indigo-500" />
                              評分Score: {task.priorityScore || 0}分
                            </span>
                            
                            {task.recurring && task.recurring !== 'none' && (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 px-2 py-0.5 rounded-md">
                                <Icon name="rotateCcw" className="w-3 h-3" />
                                {task.recurring === 'daily' && '每天例行'}
                                {task.recurring === 'weekly' && '每週例行'}
                                {task.recurring === 'monthly' && '每月例行'}
                              </span>
                            )}
                          </div>

                          <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                            task.basePriority === 'high' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400' :
                            task.basePriority === 'medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400' :
                            'bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-400'
                          }`}>
                            {task.basePriority === 'high' ? '高優先度' : task.basePriority === 'medium' ? '中度重要' : '低排程'}
                          </span>
                        </div>

                        <h3 className={`text-base font-extrabold tracking-tight ${isFinished ? 'line-through text-slate-400' : 'text-slate-800 dark:text-white'}`}>
                          {decryptedTitle}
                        </h3>

                        {decryptedDesc && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed bg-slate-50 dark:bg-slate-900/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/60">
                            {decryptedDesc}
                          </p>
                        )}

                        {/* Attribute tags */}
                        {task.attributes && task.attributes.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {task.attributes.map(attr => {
                              const matched = ATTRIBUTE_WEIGHTS[attr];
                              if (!matched) return null;
                              return (
                                <span key={attr} className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md font-medium ${matched.color}`}>
                                  <span>{matched.icon}</span>
                                  <span>{matched.label.split(' ')[0]}</span>
                                </span>
                              );
                            })}
                          </div>
                        )}

                        {/* Target keywords triggering extra weight */}
                        {(() => {
                          const foundKeywords = KEYWORD_WEIGHTS.filter(k => 
                            k.words.some(word => 
                              decryptedTitle.toLowerCase().includes(word) || 
                              decryptedDesc.toLowerCase().includes(word)
                            )
                          );
                          if (foundKeywords.length === 0) return null;
                          return (
                            <div className="flex flex-wrap gap-1.5 mt-2.5 items-center">
                              <span className="text-[10px] text-slate-400 font-bold">觸發加權：</span>
                              {foundKeywords.map(k => (
                                <span key={k.label} className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${k.color}`}>
                                  {k.label} (+{k.weight})
                                </span>
                              ))}
                            </div>
                          );
                        })()}

                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {/* Edit task button */}
                        <button 
                          onClick={() => startEditTask(task)}
                          className="text-slate-400 hover:text-indigo-600 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all cursor-pointer"
                          title="編輯任務"
                        >
                          <Icon name="edit" className="w-4 h-4" />
                        </button>

                        {/* Delete button */}
                        <button 
                          onClick={() => deleteTask(task.id)}
                          className="text-slate-300 hover:text-rose-500 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all cursor-pointer"
                          title="刪除任務"
                        >
                          <Icon name="trash" className="w-4 h-4" />
                        </button>
                      </div>

                    </div>

                    {/* AI sub-steps breakdown lists */}
                    {task.substeps && task.substeps.length > 0 && (
                      <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30 rounded-b-2xl">
                        <div className="flex items-center justify-between mb-3 text-[11px] font-bold text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <Icon name="sparkles" className="w-3.5 h-3.5 text-indigo-500" />
                            <span>AI 專注步驟分解 ({task.substeps.filter(s => isSubstepCompletedOnDate(task, s.id, selectedDate)).length}/{task.substeps.length})</span>
                          </span>
                          <span className="text-amber-500">+15 XP / 步</span>
                        </div>
                        
                        <div className="space-y-2">
                          {task.substeps.map(step => {
                            const isStepFinished = isSubstepCompletedOnDate(task, step.id, selectedDate);
                            const decryptedStep = isEncryptionEnabled ? decryptText(step.text, encryptionKey) : step.text;
                            return (
                              <div key={step.id} className="flex items-center gap-2">
                                <button 
                                  onClick={() => toggleSubstep(task, step.id, selectedDate)}
                                  className="text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                                >
                                  <Icon name={isStepFinished ? "checkCircle" : "circle"} className={`w-3.5 h-3.5 ${isStepFinished ? "text-emerald-500 fill-emerald-50" : ""}`} />
                                </button>
                                <span className={`text-xs font-semibold ${isStepFinished ? 'line-through text-slate-400' : 'text-slate-600 dark:text-slate-300'}`}>
                                  {decryptedStep}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Claim dinosaur reward when completed */}
                        {allStepsDone && (
                          <div className="mt-4 pt-3 border-t border-dashed border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <Icon name="award" className="w-5 h-5 text-amber-500 animate-pulse" />
                              <div>
                                <p className="text-xs font-bold text-slate-700 dark:text-white">本日步驟完成！解鎖古神龍寶藏</p>
                                <p className="text-[10px] text-slate-400">額外發放 +60 XP</p>
                              </div>
                            </div>
                            {isClaimed ? (
                              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-xl">
                                寶箱已開啟
                              </span>
                            ) : (
                              <button
                                onClick={() => claimTreasure(task, selectedDate)}
                                className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 active:scale-95 text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-md cursor-pointer"
                              >
                                <TreasureChestSVG isOpen={false} />
                                <span>開啟寶藏</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          )}

          <div className="bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex gap-3 text-xs text-slate-500">
            <Icon name="info" className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-700 dark:text-slate-300">關於 FocusFlow 安全通道</p>
              <p className="mt-0.5 leading-relaxed">FocusFlow 安全結構保護您的隱私。所有的任務分解與等級成長紀錄均在您獨立的本地安全通道中運作，外部任何人均無法探測，確保安全的多端儲存體驗。</p>
            </div>
          </div>

        </section>

      </main>

      {/* Task form modal (Add & Edit combined) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
            
            <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="sparkles" className="w-5 h-5 text-indigo-600 animate-pulse" />
                <h3 className="text-base font-extrabold text-slate-800 dark:text-white">
                  {editingTaskId ? "編輯 FocusFlow 專專任務" : "無腦排程：建立 AI 專注任務"}
                </h3>
              </div>
              <button 
                onClick={() => {
                  resetForm();
                  setIsModalOpen(false);
                }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={saveTask} className="p-5 space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  任務名稱 (支援關鍵字自動加權)
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="例如: Midterm report prep"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 pr-10 text-slate-800 dark:text-slate-100"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => toggleVoiceListening('title')}
                    className={`absolute right-2 top-2 p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isListening && voiceTarget === 'title' 
                        ? 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400 animate-pulse' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                    title="語音快速寫入"
                  >
                    <Icon name={isListening && voiceTarget === 'title' ? "micOff" : "mic"} className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  補充說明/專注大綱
                </label>
                <div className="relative">
                  <textarea 
                    value={taskDesc}
                    onChange={(e) => setTaskDesc(e.target.value)}
                    placeholder="輸入對任務的期望，AI 將分析這些訊息並自動分割最細緻的專注子步驟..."
                    rows={2}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 pr-10 text-slate-800 dark:text-slate-100"
                  />
                  <button
                    type="button"
                    onClick={() => toggleVoiceListening('desc')}
                    className={`absolute right-2 bottom-3 p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isListening && voiceTarget === 'desc' 
                        ? 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400 animate-pulse' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                    title="語音快速寫入"
                  >
                    <Icon name={isListening && voiceTarget === 'desc' ? "micOff" : "mic"} className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    基本排程重要度
                  </label>
                  <select 
                    value={basePriority}
                    onChange={(e) => setBasePriority(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none text-slate-800 dark:text-slate-100"
                  >
                    <option value="low">低 (Low)</option>
                    <option value="medium">中 (Medium)</option>
                    <option value="high">高 (High)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    截止排定日期
                  </label>
                  <input 
                    type="date" 
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none text-slate-800 dark:text-slate-100"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  設定任務屬性 (影響演算法自動排序)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries(ATTRIBUTE_WEIGHTS).map(([key, attr]) => {
                    const isChecked = selectedAttrs.includes(key);
                    return (
                      <label 
                        key={key} 
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          isChecked 
                            ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/20' 
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/40'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{attr.icon}</span>
                          <div>
                            <p className="font-bold text-slate-700 dark:text-slate-200">{attr.label.split(' ')[0]}</p>
                            <p className="text-[10px] text-slate-400">{attr.label.split(' ')[1]}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-indigo-600">+{attr.weight}分</span>
                          <input 
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              if (isChecked) {
                                setSelectedAttrs(selectedAttrs.filter(a => a !== key));
                              } else {
                                setSelectedAttrs([...selectedAttrs, key]);
                              }
                            }}
                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4 cursor-pointer"
                          />
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  設定為週期性重複排程
                </label>
                <select 
                  value={recurring}
                  onChange={(e) => setRecurring(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none text-slate-800 dark:text-slate-100"
                >
                  <option value="none">單次任務</option>
                  <option value="daily">每天重複 (Daily)</option>
                  <option value="weekly">每週重複 (Weekly)</option>
                  <option value="monthly">每月重複 (Monthly)</option>
                </select>
                <p className="text-[10px] text-slate-400 mt-1">
                  💡 週期任務點選完成時，FocusFlow 僅會將「本日」標記為完成，其餘天數仍會繼續正常顯示並自動重置步驟！
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex gap-3">
                <button 
                  type="button"
                  onClick={() => {
                    resetForm();
                    setIsModalOpen(false);
                  }}
                  className="flex-1 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 py-3 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  disabled={isGeneratingSteps}
                >
                  取消
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-xs font-bold shadow-lg shadow-indigo-100 flex items-center justify-center gap-1 cursor-pointer"
                  disabled={isGeneratingSteps}
                >
                  {isGeneratingSteps ? (
                    <>
                      <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent"></div>
                      <span>AI 自動拆解步驟中...</span>
                    </>
                  ) : (
                    <span>{editingTaskId ? "儲存更新" : "無腦儲存並讓 AI 拆解"}</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Security controls panel */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-md shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
            
            <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="shield" className="w-5 h-5 text-indigo-600 animate-pulse" />
                <h3 className="text-base font-extrabold text-slate-800 dark:text-white">🔒 隱私專屬加密通道控制台</h3>
              </div>
              <button 
                onClick={() => setIsPrivacyModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={saveSecuritySettings} className="p-5 space-y-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl flex gap-3 text-xs text-indigo-800 dark:text-indigo-300">
                <Icon name="zap" className="w-4 h-4 flex-shrink-0 mt-0.5 animate-bounce text-indigo-500" />
                <div>
                  <p className="font-bold">什麼是端對端加密 (E2EE)？</p>
                  <p className="mt-0.5 leading-relaxed">啟用此功能後，您寫入的任務名稱、描述、子步驟在離開您的瀏覽器送到儲存空間前，會使用此金鑰直接本地加密。任何人都無法讀取明文，杜絕任何隱私外洩風險！</p>
                </div>
              </div>

              {/* Encryption switch toggle */}
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Icon name="lock" className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">啟用本地加密通道</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEncryptionEnabled(!isEncryptionEnabled)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isEncryptionEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isEncryptionEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Encryption Key */}
              {isEncryptionEnabled && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    自訂對稱解密金鑰 (請務必牢記)
                  </label>
                  <div className="relative">
                    <input
                      type={showKey ? "text" : "password"}
                      value={encryptionKey}
                      onChange={(e) => setEncryptionKey(e.target.value)}
                      placeholder="輸入自訂的高強度密碼，用於本地解析"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none pr-10 text-slate-800 dark:text-slate-100"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <Icon name={showKey ? "eyeOff" : "eye"} className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[10px] text-rose-500 font-semibold leading-relaxed animate-pulse">
                    ⚠️ 提示：若您日後換瀏覽器或裝置登入，必須點開此通道並輸入完全相同的金鑰，否則原加密任務將無法還原！
                  </p>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="flex-1 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  關閉
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-indigo-100 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>儲存安全設定</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}


