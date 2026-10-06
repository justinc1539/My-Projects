// V10.4.2026
// Active Websites: All

(function() {
    function highlightCorrect() {
        // Try method #1: Kahoot marks the correct answer
        const correctBtn = [...document.querySelectorAll("button")].find(btn =>
            btn.getAttribute("data-functional-selector")?.includes("correct")
        );

        if (correctBtn) {
            correctBtn.style.outline = "8px solid #00ff00";
            correctBtn.style.borderRadius = "12px";
            correctBtn.style.transition = "outline 0.2s ease";
            correctBtn.scrollIntoView({ behavior: "smooth", block: "center" });
            console.log("Correct answer detected via attribute.");
            return;
        }

        // Method #2: Match hidden text labels
        const labels = [...document.querySelectorAll(".styles_SROnly__orvnxj0")];
        const targetTexts = [
            "Red triangle",
            "Blue diamond",
            "Yellow circle",
            "Green square"
        ];

        labels.forEach(label => {
            const text = label.textContent.trim();
            if (targetTexts.includes(text)) {
                const btn = label.closest("button");
                btn.style.outline = "8px solid yellow";
                btn.style.borderRadius = "12px";
                btn.style.transition = "outline 0.2s ease";
                btn.scrollIntoView({ behavior: "smooth", block: "center" });
                console.log("Correct answer detected:", text);
            }
        });
    }

    // MutationObserver to detect new questions
    const observer = new MutationObserver(() => {
        // Run highlight logic whenever the DOM changes
        highlightCorrect();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log("Auto-highlighter running...");
})();