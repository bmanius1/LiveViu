
// script.js for Real-Time Coaching Assistant
// Placeholder: this should contain the full logic for speech recognition, demo mode, behavioral feedback, and carrier suggestions

document.addEventListener("DOMContentLoaded", () => {
  const demoToggle = document.getElementById("demoToggle");
  const transcriptDiv = document.getElementById("transcript");
  const feedbackList = document.getElementById("behavioralFeedback");
  const carrierList = document.getElementById("carrierSuggestions");
  const missedCarriers = document.getElementById("missedCarriers");
  const stateInput = document.getElementById("stateSelect");

  const coachingData = {
    metrics: {
      talkRatio: { min: 59, max: 63, message: "Maintain a balanced talk ratio (59–63%)" },
      patience: { min: 0.4, max: 0.6, message: "Use strategic pauses (0.4–0.6s) after questions" },
      monologue: { min: 30, max: 35, message: "Limit long explanations (30–35s max)" },
      clustering: { min: 3, max: 4, message: "Ask 3–4 related questions in a cluster" }
    },
    objectionTactics: {
      absolutely: "Absolutely + Understanding Statement + Alternative Option",
      happyWithCurrent: "Acknowledge, then ask to compare value or coverage differences",
      needToThink: "Ask what specifically needs more thought and offer a follow-up"
    }
  };

  const carrierData = {
    TX: {
      topPerformers: ["Progressive", "Safeco", "Nationwide"],
      missed: ["Cincinnati", "ASI"],
      notes: "Check roof age, restricted dogs, and bundling eligibility early"
    },
    CA: {
      topPerformers: ["Mercury", "Stillwater", "Hippo"],
      missed: ["Foremost", "Orchid"],
      notes: "Wildfire score (FireLine) is critical for eligibility"
    }
    // Add more states as needed
  };

  let demoIndex = 0;
  const demoScript = [
    { speaker: "Customer", text: "Hi, I’m shopping for home and auto insurance in Texas." },
    { speaker: "Agent", text: "Great! I’ll just ask you a few quick questions first..." },
    { speaker: "Customer", text: "I currently have Allstate but want to see other options." },
    { speaker: "Agent", text: "Absolutely! We partner with carriers like Progressive and Safeco." },
    { speaker: "Customer", text: "Okay, I’m mainly concerned with roof age and coverage." }
  ];

  function addTranscript(speaker, text) {
    const p = document.createElement("p");
    p.innerHTML = `<strong class="${speaker === "Agent" ? "text-blue-400" : "text-green-400"}">${speaker}:</strong> ${text}`;
    transcriptDiv.appendChild(p);
    transcriptDiv.scrollTop = transcriptDiv.scrollHeight;

    if (speaker === "Customer") {
      analyzeText(text);
    }
  }

  function analyzeText(text) {
    const lower = text.toLowerCase();

    // State detection
    const stateMatch = /in\s([A-Z]{2})/i.exec(text);
    if (stateMatch) {
      const state = stateMatch[1].toUpperCase();
      stateInput.value = state;
      suggestCarriers(state);
    }

    // Objection patterns
    if (lower.includes("too expensive") || lower.includes("price")) {
      addFeedback("Objection: Price — Use 'Absolutely + Savings Example + Bundle'");
    }
    if (lower.includes("happy with current")) {
      addFeedback("Objection: Loyalty — Try a soft comparison and ask curiosity-based questions");
    }
    if (lower.includes("need to think")) {
      addFeedback("Objection: Delay — Ask what they'd like to consider and suggest a follow-up");
    }

    // Bundle mention
    if (lower.includes("home and auto") || lower.includes("multiple policies")) {
      addFeedback("Bundle Opportunity Detected — Mention savings and simplified management");
    }

    // Rapport opportunity
    if (lower.includes("how are you") || lower.includes("thanks")) {
      addFeedback("Rapport Moment — Personalize your response and set a friendly tone");
    }
  }

  function addFeedback(message) {
    const li = document.createElement("li");
    li.textContent = message;
    feedbackList.appendChild(li);
  }

  function suggestCarriers(state) {
    const data = carrierData[state];
    if (data) {
      carrierList.innerHTML = "";
      data.topPerformers.forEach(c => {
        const li = document.createElement("li");
        li.textContent = `Try: ${c}`;
        carrierList.appendChild(li);
      });
      missedCarriers.textContent = `Often Missed: ${data.missed.join(", ")}`;
    }
  }

  demoToggle.addEventListener("change", () => {
    if (demoToggle.checked) {
      runDemo();
    }
  });

  function runDemo() {
    demoIndex = 0;
    transcriptDiv.innerHTML = "";
    feedbackList.innerHTML = "";
    carrierList.innerHTML = "";
    missedCarriers.textContent = "";
    stateInput.value = "";

    const interval = setInterval(() => {
      if (demoIndex < demoScript.length) {
        const line = demoScript[demoIndex];
        addTranscript(line.speaker, line.text);
        demoIndex++;
      } else {
        clearInterval(interval);
      }
    }, 2500);
  }
});
