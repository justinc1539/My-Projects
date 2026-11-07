// V11.7.2026
if (window.location.href.includes("mcstacker.net/?cmd=summon")) {
    alert(`Reccomendation: go to
https://mcstacker.net/?cmd=setblock
and
https://far.ddns.me/cba`);
    function fallingBlockCmd(numID, command) {
        // Falling Block Command Block
        console.log(`fallingBlockCmd(${numID}, ${command})`)
        document.querySelector(`#entity${numID}`).focus();
        document.activeElement.value = 'falling_block';
        document.activeElement.dispatchEvent(new Event('change'));
        
        document.querySelector(`#block${numID}`).focus();
        document.activeElement.value = 'repeating_command_block';
        document.activeElement.dispatchEvent(new Event('change'));
        
        document.querySelector(`#auto${numID}`).focus();
        document.activeElement.value = '1';
        document.activeElement.dispatchEvent(new Event('change'));
        
        document.querySelector(`#Command${numID}`).focus();
        document.activeElement.value = command;
        document.activeElement.dispatchEvent(new Event('change'));
    }
    
    function armorStand(numID) {
        console.log(`armorStand(${numID})`)
        // Armor Stand (to prevent Command Block Destruction)
        document.querySelector(`#entity${numID}`).focus();
        document.activeElement.value = 'falling_block';
        document.activeElement.dispatchEvent(new Event('change'));
        
        // document.querySelector(`#DropItem${numID}`).focus();
        // document.activeElement.value = '0';
        // document.activeElement.dispatchEvent(new Event('change'));
        return; // TODO: Checkup
        document.querySelector(`#entity${numID}`).focus();
        document.activeElement.value = 'armor_stand';
        document.activeElement.dispatchEvent(new Event('change'));
        
        // document.querySelector(`#Small${numID}`).focus();
        // document.activeElement.value = '1';
        // document.activeElement.dispatchEvent(new Event('change'));
        
        document.querySelector(`#Invisible${numID}`).focus();
        document.activeElement.value = '1';
        document.activeElement.dispatchEvent(new Event('change'));
        
        document.querySelector(`#Marker${numID}`).focus();
        document.activeElement.value = '1';
        document.activeElement.dispatchEvent(new Event('change'));
    }

    function newCmd(numID, iterations, command) {
        console.log(`newCmd(${numID}, ${iterations})`)
        
        // First Usage Exception
        // Optional TODO: have first commmand be "/execute at @p run kill @e[type=minecraft:armor_stand,dy=256,y=-64]"
        if (iterations === 1) {
            addPassenger(`Passengers0Pane`);
            fallingBlockCmd(0, command);
            return;
        }
        // Second Usage Exception
        else if (iterations === 2) {
            fallingBlockCmd(2, command);
            
            // Ready next layer
            addPassenger(`Passengers0Pane`);

            armorStand(3);
            return;
        }

        fallingBlockCmd(numID - 1, command);
        
        // Ready next layer
        addPassenger(`Passengers${numID - 2}Pane`);
        
        armorStand(numID);
    }
    
    const excludeChar = "#"; // <-- CHANGE EXCLUSION CHARACTER HERE
    let currentID = 0;
    let iterations = 0;
    
    const newCmdBtn = document.createElement("button");
        newCmdBtn.style.position = "fixed";
        newCmdBtn.style.top = "10px";
        newCmdBtn.style.left = "10px";
        newCmdBtn.style.zIndex = "2147483646";   // make sure it's above everything
        newCmdBtn.style.padding = "10px 15px";
        newCmdBtn.style.fontSize = "16px";
        newCmdBtn.textContent = "New Falling Command Block";
        document.body.appendChild(newCmdBtn);
        newCmdBtn.addEventListener("click", () => {
            // Confirm Command
            const command = prompt("Enter command here:");
            if (command) {
                iterations++;
                if (iterations === 2) currentID = 3;
                if (iterations > 2) {
                    addPassenger(`Passengers${currentID}Pane`);
                    currentID += 2;
                }
                newCmd(currentID, iterations, command);
                newCmdBtn.focus();
            } else alert("Please try again.");
        });
    const newCmdStackBtn = document.createElement("button");
        newCmdStackBtn.style.position = "fixed";
        newCmdStackBtn.style.top = "60px";
        newCmdStackBtn.style.left = "10px";
        newCmdStackBtn.style.zIndex = "2147483646";   // make sure it's above everything
        newCmdStackBtn.style.padding = "10px 15px";
        newCmdStackBtn.style.fontSize = "16px";
        newCmdStackBtn.textContent = "New Falling Command Block Stack";
        document.body.appendChild(newCmdStackBtn);
        newCmdStackBtn.addEventListener("click", () => {
            // Confirm Command
            const commandList = prompt(`Enter command list here (seperate with new line and use "${excludeChar}" before a line to exclude it):`)
                .split("\n")
                .filter(command => command.trimEnd().length > 0 && !command.startsWith(excludeChar));
            if (commandList.length <= 9 || true) commandList.forEach(command => {
                command = command.trimEnd();
                iterations++;
                if (iterations === 2) currentID = 3;
                if (iterations > 2) {
                    addPassenger(`Passengers${currentID}Pane`);
                    currentID += 2;
                }
                newCmd(currentID, iterations, command);
                newCmdStackBtn.focus();
            });
            else alert("Please do not use more than 9 commands for performance.")
        });
    const endBtn = document.createElement("button");
        endBtn.style.position = "fixed";
        endBtn.style.top = "110px";
        endBtn.style.left = "10px";
        endBtn.style.zIndex = "2147483646";   // make sure it's above everything
        endBtn.style.padding = "10px 15px";
        endBtn.style.fontSize = "16px";
        endBtn.textContent = "Finish Command Chain";
        document.body.appendChild(endBtn);
        endBtn.addEventListener("click", () => {
            newCmdBtn.remove();
            newCmdStackBtn.remove();
            endBtn.remove();
        });
}
if (window.location.href.includes("mcstacker.net/?cmd=setblock")) {
    function setBlockPos() {
        Block.value = `~${blockX} ~${blockY} ~`;
        Block.dispatchEvent(new Event('change'));
    }
    
    blockX = 1;
    blockY = 0;
    
    const Block = document.getElementById("Block");
    document.getElementById("toClipBoard").addEventListener("click", () => newBlockBtn.focus());
    
    const block0 = document.getElementById("block0");
    block0.value = 'repeating_command_block';
    block0.dispatchEvent(new Event('change'));
    
    const auto0 = document.getElementById("auto0");
    auto0.value = '1';
    auto0.dispatchEvent(new Event('change'));
    
    const Command0 = document.getElementById("Command0");
    
    const newBlockBtn = document.createElement("button");
        newBlockBtn.style.position = "fixed";
        newBlockBtn.style.top = "10px";
        newBlockBtn.style.left = "10px";
        newBlockBtn.style.zIndex = "2147483646";   // make sure it's above everything
        newBlockBtn.style.padding = "10px 15px";
        newBlockBtn.style.fontSize = "16px";
        newBlockBtn.textContent = "New Falling Command Block";
        document.body.appendChild(newBlockBtn);
        newBlockBtn.addEventListener("click", () => {
            // Confirm Command
            const command = prompt("Enter command here:");
            if (command) {
                setBlockPos();
                Command0.value = command;
                auto0.dispatchEvent(new Event('change'));
                blockY++;
                
                outputBtn.textContent += `/setblock ${Block.value} repeating_command_block{auto:1b,Command:"${Command0.value}"} replace\n`;
            } else alert("Please try again.");
        });
    const newColumnBtn = document.createElement("button");
        newColumnBtn.style.position = "fixed";
        newColumnBtn.style.top = "60px";
        newColumnBtn.style.left = "10px";
        newColumnBtn.style.zIndex = "2147483646";   // make sure it's above everything
        newColumnBtn.style.padding = "10px 15px";
        newColumnBtn.style.fontSize = "16px";
        newColumnBtn.textContent = "New Falling Command Block Stack";
        document.body.appendChild(newColumnBtn);
        newColumnBtn.addEventListener("click", () => {
            blockX++;
            blockY = 0;
            Command0.value = '';
            setBlockPos();
            auto0.dispatchEvent(new Event('change'));
            outputBtn.textContent += "\n";
        });
    const endBtn = document.createElement("button");
        endBtn.style.position = "fixed";
        endBtn.style.top = "110px";
        endBtn.style.left = "10px";
        endBtn.style.zIndex = "2147483646";   // make sure it's above everything
        endBtn.style.padding = "10px 15px";
        endBtn.style.fontSize = "16px";
        endBtn.textContent = "Finish Command Chain";
        document.body.appendChild(endBtn);
        endBtn.addEventListener("click", () => {
            newBlockBtn.remove();
            newColumnBtn.remove();
            endBtn.remove();
            outputBtn.remove();
        });
    const outputBtn = document.createElement("button");
        outputBtn.style.position = "fixed";
        outputBtn.style.top = "160px";
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
