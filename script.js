// script.js (Real-Time Coaching - Call Flow Integrated Demo)

const demoState = "TX";
const stateInput = document.getElementById("stateSelect");
const transcriptEl = document.getElementById("transcript");
const behaviorList = document.getElementById("behavioralFeedback");
const carrierList = document.getElementById("carrierSuggestions");
const missedCarriers = document.getElementById("missedCarriers");
const demoToggle = document.getElementById("demoToggle");

const callScript = [
  // INTRO
  { speaker: "Agent", text: "Thanks for calling, this is Jordan at VIU by HUB. Who am I speaking with today?", tips: ["Always state your name and agency in intro."] },
  { speaker: "Customer", text: "Hi, this is Mark Williams.", tips: [] },

  // RAPPORT
  { speaker: "Agent", text: "Great to meet you Mark! Thanks for taking time today — what inspired the call?", tips: ["Personalize the welcome and ask an open question."] },
  { speaker: "Customer", text: "My renewal jumped. I’m frustrated honestly.", tips: ["Empathize with tone and acknowledge pain point."] },

  // VERIFICATION
  { speaker: "Agent", text: "Let's verify a few details before quoting — can I confirm your address and birthdate?", tips: ["Use confident tone during verification."] },
  { speaker: "Customer", text: "Sure. It’s 456 Main Street, born 1/2/84.", tips: [] },

  // DISCOVERY
  { speaker: "Agent", text: "And what kind of coverage do you currently have? Are you bundling anything today?", tips: ["Start identifying gaps or bundling potential."] },
  { speaker: "Customer", text: "Just auto. No bundle. I’m with Allstate.", tips: ["Now you can recommend bundle options."] },

  // COVERAGE DISCUSSION
  { speaker: "Agent", text: "Got it. Do you want to keep the same limits or explore more coverage for better protection?", tips: ["Offer choice of status quo vs upgrade."] },
  { speaker: "Customer", text: "I’m open to options.", tips: [] },

  // DISCOUNTS
  { speaker: "Agent", text: "Perfect. You may qualify for safe driver, multi-policy, and paid-in-full discounts — let’s see what stacks.", tips: ["Stack at least 2 discounts during quote."],
    carriers: ["Progressive + ASI", "Safeco", "Nationwide"] },

  // BUNDLING
  { speaker: "Agent", text: "If we bundle auto and home, we’re looking at ~22% savings on average in Texas.", tips: ["Bundle early — top agents mention it in the first 2 minutes."] },

  // OBJECTION
  { speaker: "Customer", text: "That still sounds expensive though...", tips: [] },
  { speaker: "Agent", text: "Absolutely — and I want to respect your budget. Let’s compare your current coverage apples-to-apples.", tips: ["Use the ‘Absolutely’ method within 5 seconds."] },

  // SALES PITCH
  { speaker: "Agent", text: "So with the discounts and bundling, we’re at $178/month — $29 less than your current rate, with better liability and roadside included.", tips: ["Present value and savings clearly."] },

  // CLOSING
  { speaker: "Agent", text: "Would you prefer to start with the full coverage bundle or a liability-only version today?", tips: ["Offer choice instead of asking if they want it."] },
  { speaker: "Customer", text: "Let’s go with the full coverage bundle.", tips: [] },

  // FOLLOW-UP
  { speaker: "Agent", text: "Awesome. I’ll send your docs now and follow up by email just in case you have questions.", tips: ["Always confirm next steps before ending."] }
];

const metricGraphData = [
  { name: "Talk Ratio", value: 61, color: "#60a5fa" },
  { name: "Patience (s)", value: 0.52, color: "#facc15" },
  { name: "Monologue (s)", value: 31, color: "#34d399" }
];

function loadChart() {
  const canvas = document.createElement("canvas");
  canvas.id = "metricChart";
  document.getElementById("metricGraph").appendChild(canvas);

  new Chart(canvas, {
    type: "bar",
    data: {
      labels: metricGraphData.map((d) => d.name),
      datasets: [
        {
          label: "Performance Metrics",
          data: metricGraphData.map((d) => d.value),
          backgroundColor: metricGraphData.map((d) => d.color)
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: 100
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function runStepDemo() {
  stateInput.value = demoState;
  transcriptEl.innerHTML = "";
  behaviorList.innerHTML = "";
  carrierList.innerHTML = "";
  missedCarriers.innerText = "";

  let i = 0;
  const interval = setInterval(() => {
    const line = callScript[i];
    const speakerClass = line.speaker === "Agent" ? "text-blue-400" : "text-green-400";
    transcriptEl.innerHTML += `<p><span class="${speakerClass}">${line.speaker}:</span> ${line.text}</p>`;
    transcriptEl.scrollTop = transcriptEl.scrollHeight;

    if (line.tips.length) {
      line.tips.forEach((tip) => {
        const li = document.createElement("li");
        li.className = "bg-gray-700 p-2 rounded";
        li.textContent = tip;
        behaviorList.appendChild(li);
      });
    }

    if (line.carriers?.length) {
      carrierList.innerHTML = line.carriers.map((c) => `<li>${c}</li>`).join("");
      missedCarriers.innerText = "Also consider Root or Foremost for monoline auto if bundling fails.";
    }

    i++;
    if (i >= callScript.length) {
      clearInterval(interval);
      loadChart();
    }
  }, 3000);
}

demoToggle.addEventListener("change", (e) => {
  if (e.target.checked) {
    runStepDemo();
  } else {
    transcriptEl.innerHTML = "";
    behaviorList.innerHTML = "";
    carrierList.innerHTML = "";
    missedCarriers.innerText = "";
    document.getElementById("metricGraph").innerHTML = "";
    stateInput.value = "";
  }
});