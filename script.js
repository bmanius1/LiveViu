// script.js
const demoToggle = document.getElementById("demoToggle");
const transcriptEl = document.getElementById("transcript");
const feedbackEl = document.getElementById("behavioralFeedback");
const carrierEl = document.getElementById("carrierSuggestions");
const missedEl = document.getElementById("missedCarriers");
const stateInput = document.getElementById("stateSelect");

const demoTranscript = [
  "Agent: Thanks for calling, how can I help you today?",
  "Customer: I’m shopping around, my rate went up again.",
  "Agent: Got it. Who's your current carrier and what are you paying?",
  "Customer: Progressive, and it's about $3200/year.",
  "Agent: Wow, that’s high. We may be able to lower that — do you also need home insurance?",
  "Customer: Yes, but it’s separate right now.",
  "Agent: We can bundle those. That often saves 20-25%."
];

const coachingRules = {
  talkRatio: "Try to stay between 59–63% agent talk time.",
  patience: "Pause 0.4–0.6s after questions — it increases bind rate.",
  monologue: "Keep your solo talking sections under 35s.",
  bundleTiming: "Introduce bundle opportunities in the first 2 minutes.",
  rapport: "Build rapport in the first 60–90s — even 5% rapport use = 43% more premium!"
};

const carrierGuide = {
  TX: [
    "Progressive (standard + bundling)",
    "ASI (Progressive Home)",
    "Safeco (strong bundles)",
    "Dairyland (non-standard auto)",
    "Foremost (older homes, manufactured homes)"
  ]
};

const missedCarriers = {
  TX: ["Root (great for no prior/SR-22 drivers)"]
};

let metricChart = null;

function runDemo() {
  stateInput.value = "TX";
  transcriptEl.innerHTML = "";
  feedbackEl.innerHTML = "";
  carrierEl.innerHTML = "";
  missedEl.innerHTML = "";

  const metricData = {
    labels: ["Talk Ratio", "Patience (s)", "Monologue (s)"],
    datasets: [
      {
        label: "Live Metrics",
        data: [67, 0.51, 34],
        backgroundColor: ["#60a5fa", "#34d399", "#fbbf24"],
        borderColor: "#1f2937",
        borderWidth: 1
      }
    ]
  };

  if (metricChart) metricChart.destroy();
  const ctx = document.getElementById("metricChart").getContext("2d");
  metricChart = new Chart(ctx, {
    type: "bar",
    data: metricData,
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.parsed.y}` } }
      },
      scales: {
        y: { beginAtZero: true, max: 100 }
      }
    }
  });

  let delay = 0;
  demoTranscript.forEach((line, i) => {
    setTimeout(() => {
      const p = document.createElement("p");
      p.textContent = line;
      transcriptEl.appendChild(p);
      transcriptEl.scrollTop = transcriptEl.scrollHeight;
    }, delay);
    delay += 1200;
  });

  setTimeout(() => {
    for (const tip in coachingRules) {
      const li = document.createElement("li");
      li.textContent = coachingRules[tip];
      feedbackEl.appendChild(li);
    }
  }, delay + 1000);

  setTimeout(() => {
    carrierGuide["TX"].forEach(c => {
      const li = document.createElement("li");
      li.textContent = c;
      carrierEl.appendChild(li);
    });
    missedEl.textContent = "Other options not quoted but available: " + missedCarriers["TX"].join(", ");
  }, delay + 2000);
}

demoToggle.addEventListener("change", () => {
  if (demoToggle.checked) {
    runDemo();
  } else {
    transcriptEl.innerHTML = "";
    feedbackEl.innerHTML = "";
    carrierEl.innerHTML = "";
    missedEl.innerHTML = "";
    stateInput.value = "";
    if (metricChart) metricChart.destroy();
  }
});