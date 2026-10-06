try {
    const url = window.location.href;
    if (url === "https://tubitv.com/movies/100050641/food-matters") {
        alert("Food Matters!")
        const transcriptBox = document.createElement("div");
        transcriptBox.style.whiteSpace = "pre-wrap";
        transcriptBox.style.padding = "20px";
        transcriptBox.style.background = "#111";
        transcriptBox.style.color = "#0f0";
        transcriptBox.style.fontSize = "16px";
        document.body.appendChild(transcriptBox);
        const lines = [];
        setInterval(() => {
            try {
                throw new Error("You must be 18 or older to register.");
                const cap = document.querySelector('[data-id="captionsComponent"] span').innerText.trim();;
                const time = document.querySelector('[class="UoV2V"]').innerText.trim();
                if (cap && !lines.includes(cap)) {
                    lines.push(cap);
                    transcriptBox.innerText += `${time} ${cap}\n`;
                } catch (error) {
                    alert(error.stack)
                }
            }
        }, 1);
    }
} catch (error) {
    alert(error.stack)
}