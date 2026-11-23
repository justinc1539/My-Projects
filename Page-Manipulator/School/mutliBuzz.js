// V11.23.2026
if (window.location.href.includes("https://www.multibuzz.app")) {
  // Remove old button if re-running the script
  document.getElementById("multibuzzToggleBtn")?.remove();

  let buzzInterval = null;

  const toggleBtn = document.createElement("button");
  toggleBtn.id = "multibuzzToggleBtn";
  toggleBtn.textContent = "Auto-Buzz: OFF";
  Object.assign(toggleBtn.style, {
    position: "fixed",
    bottom: "16px",
    right: "16px",
    padding: "8px 14px",
    backgroundColor: "#2d2d2d",
    color: "#ffffff",
    border: "1.5px solid #4a8bf5",
    borderRadius: "6px",
    fontFamily: "Menlo, Monaco, Consolas, monospace",
    fontSize: "12px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
    zIndex: "2147483647"
  });

  toggleBtn.addEventListener("click", () => {
    if (buzzInterval) {
      clearInterval(buzzInterval);
      buzzInterval = null;
      toggleBtn.textContent = "Auto-Buzz: OFF";
      toggleBtn.style.backgroundColor = "#2d2d2d";
      toggleBtn.style.borderColor = "#4a8bf5";
    } else {
      buzzInterval = setInterval(() => {
        document.querySelector("#buzzer button")?.click();
      }, 1);
      toggleBtn.textContent = "Auto-Buzz: ON";
      toggleBtn.style.backgroundColor = "#2e8b57";
      toggleBtn.style.borderColor = "#4ade80";
    }
  });

  document.body.appendChild(toggleBtn);
}
