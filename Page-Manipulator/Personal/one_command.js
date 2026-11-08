// V11.8.2026
if (window.location.href.includes("far.ddns.me/cba")) {
    const excludeChar = "#"; // <-- CHANGE EXCLUSION CHARACTER HERE
    let blockX = 1;
    let blockY = 0;

    const newStackBtn = document.createElement("button");
        newStackBtn.style.position = "fixed";
        newStackBtn.style.top = "10px";
        newStackBtn.style.left = "10px";
        newStackBtn.style.zIndex = "2147483646";   // make sure it's above everything
        newStackBtn.style.padding = "10px 15px";
        newStackBtn.style.fontSize = "16px";
        newStackBtn.textContent = "New Command Stack";
        document.body.appendChild(newStackBtn);
        newStackBtn.addEventListener("click", () => {
            // Confirm Command
            const commandList = prompt(`Enter command list here (seperate with new line and use "${excludeChar}" before a line to exclude it):`)
                .split("\n")
            commandList.forEach(command => {
                if (command.trimEnd().length > 0) {
                    if (!command.startsWith(excludeChar)) {
                        blockY++;
                        
                        outputBtn.textContent += `/setblock ~${blockX} ~${blockY} ~ repeating_command_block[facing=up]{auto:1b,Command:"${command.replace('"', '\"')}"} replace\n`;
                    }
                } else {
                    blockX++;
                    blockY = 0;
                    outputBtn.textContent += "\n";
                }
            });
        });
    const endBtn = document.createElement("button");
        endBtn.style.position = "fixed";
        endBtn.style.top = "60px";
        endBtn.style.left = "10px";
        endBtn.style.zIndex = "2147483646";   // make sure it's above everything
        endBtn.style.padding = "10px 15px";
        endBtn.style.fontSize = "16px";
        endBtn.textContent = "Hide All Buttons";
        document.body.appendChild(endBtn);
        endBtn.addEventListener("click", () => {
            newStackBtn.remove();
            endBtn.remove();
            outputBtn.remove();
        });
    const outputBtn = document.createElement("button");
        outputBtn.style.position = "fixed";
        outputBtn.style.top = "110px";
        outputBtn.style.left = "10px";
        outputBtn.style.zIndex = "2147483646";   // make sure it's above everything
        outputBtn.style.padding = "10px 15px";
        outputBtn.style.fontSize = "16px";
        outputBtn.style.whiteSpace = "pre-line";
        document.body.appendChild(outputBtn);
        outputBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(outputBtn.textContent)
                .then(() => {
                    alert("Text copied to clipboard!");
                })
                .catch(err => {
                    alert("Failed to copy:", err);
                });
        });
}
