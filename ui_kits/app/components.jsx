// ============================================================
// 콜포비아 연습 앱 — shared UI components
// Exports to window for cross-file <script type="text/babel"> use
// ============================================================
const { useState, useEffect } = React;

// ---- Icon: thin wrapper over Lucide (re-rendered by App effect) ----
function Icon({ name, size = 20, color, strokeWidth = 2, style }) {
  return (
    <i
      data-lucide={name}
      style={{ width: size, height: size, color, display: "inline-flex", ...style }}
      data-sw={strokeWidth}
    />
  );
}

// ---- Status bar (375px) ----
function StatusBar({ tone = "dark" }) {
  const color = tone === "dark" ? "var(--ink-900)" : "var(--ink-700)";
  return (
    <div style={kitS.statusbar}>
      <span style={{ fontFamily: "var(--font-num)", fontWeight: 700, fontSize: 14, letterSpacing: "-0.02em", color }}>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Icon name="signal" size={17} color={color} />
        <Icon name="wifi" size={17} color={color} />
        <Icon name="battery-full" size={22} color={color} />
      </div>
    </div>
  );
}

// ---- Header with optional back chevron + centered title ----
function Header({ title, onBack, bg = "var(--bg)" }) {
  return (
    <div style={{ ...kitS.header, background: bg }}>
      {onBack ? (
        <button onClick={onBack} style={kitS.backBtn} aria-label="back">
          <Icon name="chevron-left" size={22} color="var(--blue-600)" strokeWidth={2.4} />
        </button>
      ) : <div style={{ width: 44 }} />}
      <span style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 16, color: "var(--ink-700)" }}>{title}</span>
      <div style={{ width: 44 }} />
    </div>
  );
}

// ---- Difficulty badge (초급/중급/고급) ----
function Badge({ children }) {
  return <span style={kitS.badge}>{children}</span>;
}

// ---- Bottom tab bar ----
const NAV = [
  { key: "home", label: "홈", icon: "home" },
  { key: "practice", label: "연습하기", icon: "mic" },
  { key: "assist", label: "통화 보조", icon: "phone-call" },
  { key: "me", label: "마이페이지", icon: "user" },
];
function BottomNav({ active = "practice", onChange }) {
  return (
    <div style={kitS.nav}>
      {NAV.map((n) => {
        const on = n.key === active;
        const color = on ? "var(--blue-600)" : "var(--ink-400)";
        return (
          <button key={n.key} onClick={() => onChange && onChange(n.key)} style={kitS.navItem}>
            <Icon name={n.icon} size={22} color={color} />
            <span style={{ fontSize: 10, color, fontWeight: on ? 700 : 400, fontFamily: "var(--font-ui)" }}>{n.label}</span>
          </button>
        );
      })}
    </div>
  );
}

const kitS = {
  statusbar: { height: 48, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", flexShrink: 0 },
  header: { height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", flexShrink: 0 },
  backBtn: { width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", padding: 0 },
  badge: { fontFamily: "var(--font-ui)", fontSize: 10, lineHeight: "15px", color: "var(--blue-500)", border: "1px solid var(--blue-300)", borderRadius: 4, padding: "4px 8px", whiteSpace: "nowrap" },
  nav: { height: 80, display: "flex", alignItems: "center", background: "var(--surface)", borderTop: "1px solid var(--line-200)", padding: "0 8px 12px", flexShrink: 0 },
  navItem: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", paddingTop: 12 },
};

Object.assign(window, { Icon, StatusBar, Header, Badge, BottomNav, kitS });
