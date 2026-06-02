// ============================================================
// 콜포비아 연습 앱 — 회원가입 온보딩 (signup onboarding flow)
// Source: Figma "제목 없음" — 회원가입 2 (불안 유형) · 회원가입 3 (알림 설정)
// ============================================================

// ---- Top progress bar: back chevron · track+fill · step counter ----
function ProgressBar({ step, total, onBack }) {
  const pct = (step / total) * 100;
  return (
    <div style={obS.progRow}>
      <button onClick={onBack} style={kitS.backBtn} aria-label="back">
        <Icon name="arrow-left" size={18} color="var(--ink-700)" strokeWidth={2.2} />
      </button>
      <div style={obS.track}>
        <div style={{ ...obS.fill, width: `${pct}%` }} />
      </div>
      <span style={obS.stepCount}>{step}/{total}</span>
    </div>
  );
}

// ---- Page intro: bold heading + blue subtitle ----
function PageIntro({ title, sub }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h1 style={obS.h1}>{title}</h1>
      <p style={obS.sub}>{sub}</p>
    </div>
  );
}

// ---- Selectable option card (icon chip + label) · default / selected ----
function OptionCard({ icon, label, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      ...obS.card,
      background: selected ? "var(--blue-200)" : "var(--surface)",
      borderColor: selected ? "var(--blue-600)" : "var(--line-100)",
    }}>
      {selected && (
        <span style={obS.checkBadge}>
          <Icon name="check" size={11} color="#fff" strokeWidth={3.2} />
        </span>
      )}
      <span style={{
        ...obS.iconChip,
        background: selected ? "var(--blue-600)" : "var(--line-100)",
      }}>
        <Icon name={icon} size={20} color={selected ? "#fff" : "var(--ink-400)"} strokeWidth={2} />
      </span>
      <span style={{
        ...obS.cardLabel,
        color: selected ? "var(--blue-600)" : "var(--ink-700)",
        fontWeight: selected ? 500 : 400,
      }}>{label}</span>
    </button>
  );
}

// ---- iOS-style toggle ----
function Toggle({ on, onChange }) {
  return (
    <button onClick={() => onChange(!on)} style={{
      ...obS.toggle,
      background: on ? "var(--blue-600)" : "var(--line-300)",
      justifyContent: on ? "flex-end" : "flex-start",
    }}>
      <span style={obS.knob} />
    </button>
  );
}

// ---- Full-width primary CTA · enabled / disabled ----
function PrimaryCTA({ children, disabled, onClick }) {
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled} style={{
      ...obS.cta,
      background: disabled ? "var(--ink-400)" : "var(--blue-600)",
      cursor: disabled ? "default" : "pointer",
    }}>{children}</button>
  );
}

// ============================================================
// SCREEN · 회원가입 2 — 불안 유형 (anxiety-type multi-select)
// ============================================================
const ANXIETY_TYPES = [
  { id: "unknown", label: "모르는 번호 수신", icon: "phone-off" },
  { id: "unfamiliar", label: "낯선 곳에 발신", icon: "send" },
  { id: "work", label: "업무 전화", icon: "briefcase" },
  { id: "ending", label: "통화 종료하기", icon: "phone-missed" },
];

function AnxietyScreen({ onBack, onNext }) {
  const [picked, setPicked] = useState({ unfamiliar: true });
  const toggle = (id) => setPicked((p) => ({ ...p, [id]: !p[id] }));
  const any = Object.values(picked).some(Boolean);

  return (
    <div style={scS.screen}>
      <div style={obS.body}>
        <ProgressBar step={2} total={3} onBack={onBack} />
        <PageIntro title={"어떤 상황이 가장\n부담스러우신가요?"} sub="해당하는 것을 모두 선택해 주세요" />
        <div style={obS.grid}>
          {ANXIETY_TYPES.map((t) => (
            <OptionCard key={t.id} icon={t.icon} label={t.label} selected={!!picked[t.id]} onClick={() => toggle(t.id)} />
          ))}
        </div>
      </div>
      <div style={obS.footer}>
        <PrimaryCTA disabled={!any} onClick={onNext}>다음</PrimaryCTA>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN · 회원가입 3 — 알림 설정 (notification settings)
// ============================================================
function NotifyScreen({ onBack, onNext }) {
  const [on, setOn] = useState(true);

  return (
    <div style={scS.screen}>
      <div style={obS.body}>
        <ProgressBar step={3} total={3} onBack={onBack} />
        <PageIntro title="연습 알림을 설정해 주세요" sub="매일 연습 시간을 알려드릴게요" />

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={obS.settingRow}>
            <span style={obS.settingLabel}>매일 연습 알림 받기</span>
            <Toggle on={on} onChange={setOn} />
          </div>

          <div style={obS.settingRow}>
            <span style={{ ...obS.settingLabel, opacity: on ? 1 : 0.4, transition: "opacity .2s" }}>알림 시간</span>
            <button style={{ ...obS.timeField, opacity: on ? 1 : 0.4 }}>오후 8:00</button>
          </div>

          <div style={obS.note}>
            <Icon name="info" size={16} color="var(--blue-500)" />
            <span style={obS.noteText}>마이페이지에서 언제든 변경할 수 있어요</span>
          </div>
        </div>
      </div>
      <div style={obS.footer}>
        <PrimaryCTA onClick={onNext}>다음</PrimaryCTA>
      </div>
    </div>
  );
}

const obS = {
  body: { flex: 1, overflowY: "auto", padding: "16px 24px 0", display: "flex", flexDirection: "column" },
  footer: { padding: "12px 24px 24px", flexShrink: 0 },

  // progress
  progRow: { display: "flex", alignItems: "center", gap: 16, height: 40, marginBottom: 28 },
  track: { flex: 1, height: 6, borderRadius: 9999, background: "var(--blue-200)", overflow: "hidden" },
  fill: { height: "100%", borderRadius: 9999, background: "var(--blue-600)", transition: "width .3s ease" },
  stepCount: { fontSize: 14, color: "var(--blue-500)", letterSpacing: "-0.02em", minWidth: 24, textAlign: "right" },

  // intro
  h1: { margin: 0, fontSize: 24, fontWeight: 700, lineHeight: "30px", color: "var(--ink-700)", whiteSpace: "pre-line", letterSpacing: "-0.01em" },
  sub: { margin: "12px 0 0", fontSize: 16, lineHeight: "24px", color: "var(--blue-500)" },

  // option cards
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  card: { position: "relative", aspectRatio: "1 / 1", border: "2px solid", borderRadius: 16, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, cursor: "pointer", padding: 16, transition: "background .15s, border-color .15s" },
  checkBadge: { position: "absolute", top: 14, right: 14, width: 22, height: 22, borderRadius: "50%", background: "var(--blue-600)", display: "flex", alignItems: "center", justifyContent: "center" },
  iconChip: { width: 48, height: 48, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", transition: "background .15s" },
  cardLabel: { fontSize: 14, lineHeight: "20px", textAlign: "center" },

  // settings rows
  settingRow: { display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 32 },
  settingLabel: { fontSize: 18, fontWeight: 500, lineHeight: "28px", color: "var(--ink-700)", whiteSpace: "nowrap" },
  timeField: { height: 40, padding: "0 24px", borderRadius: 8, background: "var(--surface)", border: "1px solid var(--blue-400)", color: "var(--blue-500)", fontSize: 16, fontFamily: "var(--font-ui)", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 },

  // info note
  note: { display: "flex", alignItems: "center", gap: 12, padding: 16, borderRadius: 8, background: "var(--surface)", border: "1px solid var(--blue-400)" },
  noteText: { fontSize: 14, lineHeight: "20px", color: "var(--blue-500)", whiteSpace: "nowrap" },

  // toggle
  toggle: { width: 56, height: 32, borderRadius: 9999, border: "none", display: "flex", alignItems: "center", padding: 3, cursor: "pointer", transition: "background .2s, justify-content .2s" },
  knob: { width: 26, height: 26, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,.2)" },

  // cta
  cta: { width: "100%", height: 56, borderRadius: 8, border: "none", color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: "var(--font-ui)", boxShadow: "var(--shadow-card)", transition: "background .15s" },
};

Object.assign(window, { ProgressBar, PageIntro, OptionCard, Toggle, PrimaryCTA, AnxietyScreen, NotifyScreen, obS });
