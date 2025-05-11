
document.addEventListener("DOMContentLoaded", () => {
  const transcriptEl = document.getElementById("transcript");
  const behavioralFeedbackEl = document.getElementById("behavioralFeedback");
  const carrierSuggestionsEl = document.getElementById("carrierSuggestions");
  const missedCarriersEl = document.getElementById("missedCarriers");

  const bindChecklistItems = [
    "Confirm household drivers to list or exclude",
    "Ask underwriting questions",
    "Customer registers on carrier website",
    "Complete e-sign process",
    "Mask call during payment"
  ];

  // Simulated call script for demo mode
  const demoScript = [
    { speaker: "Customer", text: "Hi, I'm shopping for auto insurance." },
    { speaker: "Agent", text: "Great! Can I start by confirming all household drivers?" },
    { speaker: "Customer", text: "Yes, it's just me and my spouse." },
    { speaker: "Agent", text: "Thanks. Any recent claims or tickets?" },
    { speaker: "Customer", text: "No, clean record." },
    { speaker: "Agent", text: "Perfect. Let’s talk coverage options." },
    { speaker: "Customer", text: "Sounds good." },
    { speaker: "Agent", text: "You might qualify for a multi-policy discount if we bundle auto and home." },
    { speaker: "Customer", text: "Let me check with my spouse." },
    { speaker: "Agent", text: "Sure — what concerns do you think your spouse might have?" },
    { speaker: "Customer", text: "Probably price. We want to save more." },
    { speaker: "Agent", text: "No problem — let me check a few more carriers to find better pricing for the same coverage." },
    { speaker: "Agent", text: "Good news — we have an option that’s $25/month less with better roadside coverage included." },
    { speaker: "Agent", text: "Let’s walk through the bind process together. First, confirm all household drivers to list or exclude. Then I’ll ask a few underwriting questions. After that, you’ll get an email to create your carrier account and complete the e-sign process. Once ready, I’ll pause the call while you enter payment securely. Ready to begin?" }
  ];

  function runDemo() {
    transcriptEl.innerHTML = "";
    behavioralFeedbackEl.innerHTML = "";
    carrierSuggestionsEl.innerHTML = "<li>Progressive - lower premium found</li><li>Safeco - strong bundle opportunity</li>";
    missedCarriersEl.textContent = "Missed quoting: Nationwide, Root";

    const checkboxes = document.querySelectorAll("#bindChecklist input[type='checkbox']");
    checkboxes.forEach(cb => cb.checked = false);

    demoScript.forEach((line, index) => {
      setTimeout(() => {
        const p = document.createElement("p");
        p.innerHTML = `<span class='font-bold text-blue-300'>${line.speaker}:</span> ${line.text}`;
        transcriptEl.appendChild(p);
        transcriptEl.scrollTop = transcriptEl.scrollHeight;

        // Trigger behavioral tips
        if (line.text.includes("confirm all household drivers")) {
          behavioralFeedbackEl.innerHTML = "<li>Good start! Asking about drivers early improves accuracy.</li>";
          checkboxes[0].checked = true;
        }
        if (line.text.includes("underwriting")) {
          behavioralFeedbackEl.innerHTML += "<li>Nice — capturing underwriting info early supports compliance.</li>";
          checkboxes[1].checked = true;
        }
        if (line.text.includes("multi-policy")) {
          behavioralFeedbackEl.innerHTML += "<li>Smart — bundling boosts retention and discount eligibility.</li>";
        }
        if (line.text.includes("concerns do you think your spouse")) {
          behavioralFeedbackEl.innerHTML += "<li>Pro move — uncovering hidden objections increases close rate.</li>";
        }
        if (line.text.includes("create your carrier account")) {
          checkboxes[2].checked = true;
          checkboxes[3].checked = true;
          checkboxes[4].checked = true;
        }

      }, index * 3000);
    });
  }

  document.getElementById("demoToggle").addEventListener("change", (e) => {
    if (e.target.checked) runDemo();
  });
});
