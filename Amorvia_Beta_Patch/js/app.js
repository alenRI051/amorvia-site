const state = {
  scenarios: [],
  filter: "",
  currentBg: "assets/backgrounds/room.svg",
  leftChar: "assets/characters/male_casual.svg",
  rightChar: "assets/characters/female_casual.svg"
};

async function loadScenarios() {
  try {
    const res = await fetch("data/scenarios.json", { cache: "no-store" });
    const data = await res.json();
    state.scenarios = data.scenarios;
    document.querySelector("#version").textContent = data.version;
    renderList();
  } catch (e) {
    console.error("Failed to load scenarios.json", e);
  }
}

function renderList() {
  const list = document.querySelector(".list");
  list.innerHTML = "";
  const term = state.filter.toLowerCase();
  state.scenarios
    .filter(s => s.title.toLowerCase().includes(term))
    .forEach(s => {
      const div = document.createElement("div");
      div.className = `item ${s.status}`;
      div.innerHTML = `<div><strong>${s.title}</strong></div>
        <div class="badge ${s.status}">${s.status}</div>`;
      div.onclick = () => selectScenario(s);
      list.appendChild(div);
    });
}

function selectScenario(s) {
  // Simple demo: choose character mood based on status
  const left = document.querySelector("#left");
  const right = document.querySelector("#right");
  if (s.id === "mental_health_support") {
    left.querySelector("img").src = "assets/characters/spirit_calm.svg";
    right.querySelector("img").src = "assets/characters/spirit_angry.svg";
  } else {
    left.querySelector("img").src = state.leftChar;
    right.querySelector("img").src = state.rightChar;
  }
  document.querySelector("#sceneTitle").textContent = s.title;
}

function initStage() {
  document.querySelector(".bg").style.backgroundImage = `url('${state.currentBg}')`;
  document.querySelector("#left img").src = state.leftChar;
  document.querySelector("#right img").src = state.rightChar;

  // simple parallax on mouse move
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
}

window.addEventListener("DOMContentLoaded", async () => {
  bindUI();
  initStage();
  await loadScenarios();
});
