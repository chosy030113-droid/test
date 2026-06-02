// ============================================================
// 콜포비아 연습 앱 — screens
// ============================================================

const SCENARIOS = [
  { id: "cafe", name: "카페 예약", level: "초급" },
  { id: "delivery", name: "배달 문의", level: "초급" },
  { id: "interview", name: "면접 결과 통보", level: "중급" },
  { id: "hospital", name: "병원 예약", level: "중급" },
  { id: "govt", name: "관공서 문의", level: "고급" },
];

const DIFFICULTIES = [
  { id: "easy", label: "초급", sub: "짧고 간단한 통화" },
  { id: "mid", label: "중급", sub: "예상 외 상황 포함" },
  { id: "hard", label: "고급", sub: "실전과 동일한 난이도" },
];

// ---------- SCREEN 1 · 연습하기 (scenario picker) ----------
function PracticeScreen({ onOpenScenario }) {
  const [tab, setTab] = useState("scenario");
  const [diff, setDiff] = useState("easy");

  return (
    <div style={scS.screen}>
      <Header title="연습하기" onBack={() => {}} />

      {/* segmented tabs */}
      <div style={{ padding: "12px 0 0", flexShrink: 0 }}>
        <div style={{ display: "flex" }}>
          {[["scenario", "시나리오 연습"], ["growth", "성장 기록"]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{ ...scS.tab, color: tab === k ? "var(--ink-700)" : "var(--ink-400)", fontWeight: tab === k ? 700 : 400 }}>{l}</button>
          ))}
        </div>
        <div style={{ position: "relative", height: 2, background: "var(--blue-300)" }}>
          <div style={{ position: "absolute", top: 0, left: tab === "scenario" ? 0 : "50%", width: "50%", height: 2, background: "var(--blue-600)", transition: "left .25s ease" }} />
        </div>
      </div>

      {tab === "scenario" ? (
        <div style={scS.scroll}>
          <div style={scS.h2}>난이도 선택</div>
          <div style={{ display: "flex", gap: 10, marginBottom: 26 }}>
            {DIFFICULTIES.map((d) => {
              const on = d.id === diff;
              return (
                <button key={d.id} onClick={() => setDiff(d.id)} style={{ ...scS.chip, background: on ? "var(--blue-600)" : "var(--surface)", border: on ? "none" : "1px solid var(--blue-300)", boxShadow: on ? "var(--shadow-chip)" : "none" }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: on ? "var(--accent-yellow)" : "var(--ink-700)" }}>{d.label}</div>
                  <div style={{ fontSize: 12, marginTop: 8, color: on ? "var(--blue-400)" : "var(--ink-400)" }}>{d.sub}</div>
                </button>
              );
            })}
          </div>

          <div style={scS.h2}>시나리오 선택</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {SCENARIOS.map((s) => (
              <button key={s.id} onClick={() => onOpenScenario(s)} style={scS.row}>
                <span style={{ fontSize: 16, color: "var(--ink-700)" }}>{s.name}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Badge>{s.level}</Badge>
                  <Icon name="chevron-right" size={16} color="var(--blue-600)" strokeWidth={2.4} />
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <GrowthTab />
      )}

      <BottomNav active="home" onChange={() => {}} />
    </div>
  );
}

// ---------- 성장 기록 tab (light placeholder, on-brand) ----------
function GrowthTab() {
  const weeks = [3, 5, 2, 6, 4, 7, 5];
  return (
    <div style={scS.scroll}>
      <div style={scS.h2}>이번 주 연습</div>
      <div style={{ background: "var(--blue-600)", borderRadius: 12, padding: 20, marginBottom: 26, boxShadow: "var(--shadow-card)" }}>
        <div style={{ fontSize: 18, fontWeight: 500, color: "var(--surface)" }}>총 <span style={{ color: "var(--accent-yellow)", fontWeight: 700 }}>32회</span> 통화 연습</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 70, marginTop: 16 }}>
          {weeks.map((w, i) => (
            <div key={i} style={{ flex: 1, height: `${w * 10}%`, background: i === 5 ? "var(--accent-green)" : "var(--blue-500)", borderRadius: 4 }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          {["월","화","수","목","금","토","일"].map((d) => <span key={d} style={{ flex: 1, textAlign: "center", fontSize: 10, color: "var(--blue-400)" }}>{d}</span>)}
        </div>
      </div>
      <div style={scS.h2}>완료한 시나리오</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[["카페 예약","초급"],["배달 문의","초급"]].map(([n, lv]) => (
          <div key={n} style={{ ...scS.row, cursor: "default" }}>
            <span style={{ fontSize: 16, color: "var(--ink-700)" }}>{n}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--blue-600)", background: "rgba(60,112,255,.10)", borderRadius: 9999, padding: "4px 11px" }}>완료됨</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- SCREEN 2 · level roadmap detail ----------
const ROADMAP = [
  { label: "레벨 1 · 완료됨", state: "done" },
  { label: "레벨 2 · 진행 중", state: "active" },
  { label: "레벨 3 · 잠김", state: "locked" },
  { label: "레벨 4 · 잠김", state: "locked" },
  { label: "레벨 5 · 잠김", state: "locked" },
];
function RoadmapScreen({ scenario, onBack, onStart }) {
  return (
    <div style={scS.screen}>
      <Header title={scenario.name} onBack={onBack} bg="var(--surface-pure)" />

      <div style={scS.scroll}>
        {/* hero card */}
        <div style={{ background: "var(--blue-600)", borderRadius: 12, padding: 20, boxShadow: "var(--shadow-card)", marginBottom: 32 }}>
          <div style={{ fontSize: 18, fontWeight: 500, color: "var(--surface)" }}>레벨 2 · 전화 {scenario.name === "배달 문의" ? "배달 주문하기" : scenario.name}</div>
          <div style={{ height: 10, borderRadius: 9999, background: "var(--blue-500)", overflow: "hidden", margin: "14px 0 12px" }}>
            <div style={{ height: "100%", width: "40%", background: "var(--accent-green)", borderRadius: 9999 }} />
          </div>
          <div style={{ fontSize: 14, lineHeight: "22.75px", color: "var(--blue-400)" }}>기본적인 비즈니스 매너와 간단한 용건을 전달하고<br/>메뉴를 주문하는 실전 연습입니다.</div>
        </div>

        <div style={{ ...scS.h2, color: "var(--ink-900)", fontWeight: 400, fontSize: 18, marginBottom: 16 }}>레벨 로드맵</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {ROADMAP.map((r, i) => {
            if (r.state === "active") return (
              <button key={i} onClick={onStart} style={{ ...scS.rmRow, background: "var(--blue-600)", border: "none" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--accent-yellow)" }}>{r.label}</span>
                <Icon name="arrow-right" size={16} color="#fff" />
              </button>
            );
            if (r.state === "done") return (
              <div key={i} style={{ ...scS.rmRow, border: "1px solid var(--blue-500)" }}>
                <span style={{ fontSize: 14, color: "var(--ink-700)" }}>{r.label}</span>
                <span style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--blue-600)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="check" size={13} color="#fff" strokeWidth={3} /></span>
              </div>
            );
            return (
              <div key={i} style={{ ...scS.rmRow, border: "1px solid var(--blue-300)", opacity: .8 }}>
                <span style={{ fontSize: 14, color: "var(--ink-400)" }}>{r.label}</span>
                <Icon name="lock" size={15} color="var(--ink-400)" />
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav active="practice" onChange={() => {}} />
    </div>
  );
}

const scS = {
  screen: { width: 375, height: 812, background: "var(--bg)", display: "flex", flexDirection: "column", fontFamily: "var(--font-ui)", overflow: "hidden", paddingTop: "env(safe-area-inset-top, 0px)" },
  scroll: { flex: 1, overflowY: "auto", padding: "24px 24px 16px" },
  h2: { fontSize: 16, fontWeight: 700, color: "var(--ink-700)", marginBottom: 14 },
  tab: { flex: 1, textAlign: "center", padding: "16px 0", fontSize: 16, fontFamily: "var(--font-ui)", background: "none", border: "none", cursor: "pointer" },
  chip: { flex: 1, borderRadius: 8, padding: 16, textAlign: "left", cursor: "pointer" },
  row: { display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--surface)", border: "1px solid var(--blue-300)", borderRadius: 6, padding: 16, cursor: "pointer", textAlign: "left" },
  rmRow: { display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: 8, padding: 16, background: "var(--surface)", cursor: "pointer", textAlign: "left", width: "100%" },
};

Object.assign(window, { PracticeScreen, RoadmapScreen, SCENARIOS });
