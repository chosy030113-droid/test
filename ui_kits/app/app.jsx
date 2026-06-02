// ============================================================
// 콜포비아 연습 앱 — root (interactive click-through)
// ============================================================
function App() {
  const [route, setRoute] = useState({ name: "onboard-anxiety" });

  // Re-render Lucide icons after every state change
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
      // apply per-icon stroke width hints
      document.querySelectorAll("[data-sw]").forEach((el) => {
        const svg = el.querySelector("svg");
        if (svg) svg.setAttribute("stroke-width", el.getAttribute("data-sw"));
      });
    }
  });

  return (
    <div className="phone">
      <div className="screen-clip">
        {route.name === "onboard-anxiety" && (
          <AnxietyScreen
            onBack={() => setRoute({ name: "onboard-anxiety" })}
            onNext={() => setRoute({ name: "onboard-notify" })}
          />
        )}
        {route.name === "onboard-notify" && (
          <NotifyScreen
            onBack={() => setRoute({ name: "onboard-anxiety" })}
            onNext={() => setRoute({ name: "practice" })}
          />
        )}
        {route.name === "practice" && (
          <PracticeScreen onOpenScenario={(s) => setRoute({ name: "roadmap", scenario: s })} />
        )}
        {route.name === "roadmap" && (
          <RoadmapScreen
            scenario={route.scenario}
            onBack={() => setRoute({ name: "practice" })}
            onStart={() => {}}
          />
        )}
      </div>
      <div className="home-indicator" />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
