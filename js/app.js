const state = {
  scenarios: [],
  filter: "",
  currentBg: "assets/backgrounds/room.svg",
  leftChar: "assets/characters/male_casual.svg",
  rightChar: "assets/characters/female_casual.svg",
  currentScenario: null,
  actIndex: 0,
  stepIndex: 0
};

async function loadScenarios() {
  const res = await fetch("data/scenarios.json", { cache: "no-store" });
  const data = await res.json();
  state.scenarios = data.scenarios;
  document.querySelector("#version").textContent = data.version;
  renderList();
}

function renderList() {
  const list = document.querySelector(".list");
  list.innerHTML = "";
  const term = state.filter.toLowerCase();
  state.scenarios
    .filter(s => s.title.toLowerCase().includes(term))
    .forEach(s => {
      const actsCount = (s.acts && s.acts.length) || 1;
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `<div><strong>${s.title}</strong></div>
        <div class="row"><span class="badge" title="Act count">Acts: ${actsCount}</span></div>`;
      div.onclick = () => selectScenario(s);
      list.appendChild(div);
    });
}

function selectScenario(s) {
  state.currentScenario = s;
  state.actIndex = 0;
  state.stepIndex = 0;
  document.querySelector("#sceneTitle").textContent = s.title;
  updateActUI();
  renderStep();
}

function updateActUI() {
  const s = state.currentScenario;
  const count = (s.acts && s.acts.length) || 1;
  const act = s.acts[state.actIndex];
  document.querySelector("#actBadge").textContent = `Act ${state.actIndex+1} / ${count}`;
  document.querySelector("#actTitle").textContent = act?.title || "Act";
}

function renderStep() {
  const s = state.currentScenario;
  const act = s.acts[state.actIndex];
  const step = act.steps[state.stepIndex];
  const text = typeof step === "string" ? step : (step.text || "");
  document.querySelector("#dialog").textContent = text;
  document.querySelector("#prevBtn").disabled = state.stepIndex === 0 && state.actIndex === 0;
  const isLastStep = state.stepIndex >= act.steps.length - 1;
  document.querySelector("#nextBtn").textContent = isLastStep ? (state.actIndex < s.acts.length-1 ? "Next Act" : "Finish") : "Next";
}

function next() {
  const s = state.currentScenario;
  const act = s.acts[state.actIndex];
  if (state.stepIndex < act.steps.length - 1) {
    state.stepIndex++;
  } else if (state.actIndex < s.acts.length - 1) {
    state.actIndex++;
    state.stepIndex = 0;
    updateActUI();
  } else {
    // finished scenario
    document.querySelector("#dialog").textContent = "🎉 Scenario complete!";
    document.querySelector("#nextBtn").disabled = true;
  }
  renderStep();
}

function prev() {
  if (!state.currentScenario) return;
  if (state.stepIndex > 0) {
    state.stepIndex--;
  } else if (state.actIndex > 0) {
    state.actIndex--;
    const act = state.currentScenario.acts[state.actIndex];
    state.stepIndex = act.steps.length - 1;
    updateActUI();
  }
  renderStep();
}

function initStage() {
  document.querySelector(".bg").style.backgroundImage = `url('${state.currentBg}')`;
  document.querySelector("#left img").src = state.leftChar;
  document.querySelector("#right img").src = state.rightChar;
  const canvas = document.querySelector(".stage-canvas");
  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    document.querySelectorAll(".character").forEach((el, i) => {
      el.style.transform = `translateY(${Math.abs(x)*4}px) translateX(${x * (i === 0 ? -10 : 10)}px)`;
    });
  });
}

function bindUI() {
  document.querySelector("#search").addEventListener("input", (e) => {
    state.filter = e.target.value; renderList();
  });
  document.querySelector("#bgSelect").addEventListener("change", (e) => {
    state.currentBg = e.target.value;
    document.querySelector(".bg").style.backgroundImage = `url('${state.currentBg}')`;
  });
  document.querySelector("#leftSelect").addEventListener("change", (e) => {
    document.querySelector("#left img").src = e.target.value;
  });
  document.querySelector("#rightSelect").addEventListener("change", (e) => {
    document.querySelector("#right img").src = e.target.value;
  });
  document.querySelector("#nextBtn").addEventListener("click", next);
  document.querySelector("#prevBtn").addEventListener("click", prev);
}

window.addEventListener("DOMContentLoaded", async () => {
  bindUI();
  initStage();
  await loadScenarios();
});
