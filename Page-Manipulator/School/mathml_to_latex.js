// V10.5.2026
// Active Websites: All

function copyText(text, display=true) {
    navigator.clipboard.writeText(text)
      .then(() => {
        if (display) alert("Text copied to clipboard!");
      })
      .catch(err => {
        if (display) alert("Failed to copy:", err);
      });
}

function mathMLToLatex(node) {
    if (!node) return "";

    const children = [...node.children];

    switch (node.tagName.toLowerCase()) {

        case "math":
        case "mrow":
            return children.map(mathMLToLatex).join("");

        case "mi": {
            const text = node.textContent.trim();

            const funcs = {
                sin: "\\sin",
                cos: "\\cos",
                tan: "\\tan",
                csc: "\\csc",
                sec: "\\sec",
                cot: "\\cot",
                ln: "\\ln",
                log: "\\log"
            };

            return funcs[text] || text;
        }

        case "mn":
            return node.textContent.trim();

        case "mo": {
            const text = node.textContent.trim();

            const ops = {
                "−": "-",
                "×": "\\cdot ",
                "÷": "\\div ",
                "≤": "\\le ",
                "≥": "\\ge ",
                "≠": "\\ne ",
                "∞": "\\infty ",
                "∫": "\\int ",
                "∑": "\\sum ",
                "π": "\\pi ",
                "′": "'",
                "(": "\\left(",
                ")": "\\right)"
            };

            return ops[text] || text;
        }

        case "msup": {
            const base = mathMLToLatex(children[0]);
            const exp = mathMLToLatex(children[1]);

            if (exp === "'") return `${base}'`;

            return `${base}^{${exp}}`;
        }

        case "msub": {
            const base = mathMLToLatex(children[0]);
            const sub = mathMLToLatex(children[1]);

            return `${base}_{${sub}}`;
        }

        case "msubsup": {
            const base = mathMLToLatex(children[0]);
            const sub = mathMLToLatex(children[1]);
            const exp = mathMLToLatex(children[2]);

            return `${base}_{${sub}}^{${exp}}`;
        }

        case "mfrac": {
            const num = mathMLToLatex(children[0]);
            const den = mathMLToLatex(children[1]);

            return `\\frac{${num}}{${den}}`;
        }

        case "msqrt":
            return `\\sqrt{${mathMLToLatex(children[0])}}`;

        case "mroot": {
            const radicand = mathMLToLatex(children[0]);
            const degree = mathMLToLatex(children[1]);

            return `\\sqrt[${degree}]{${radicand}}`;
        }

        case "mfenced": {
            return `\\left(${children.map(mathMLToLatex).join("")}\\right)`;
        }

        default:
            return children.map(mathMLToLatex).join("");
    }
}

let allMath = "";
// const theInterval = setInterval(() => {
//     const maths = document.querySelectorAll("math");
//     if (maths.length > 0) {
//         maths.forEach(math => {allMath += `${mathMLToLatex(math)}\n`;});
//         copyText(allMath);
//         clearInterval(theInterval);
//     }
// }, 1000);

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === "c") {
        const maths = document.querySelectorAll("math");
        if (maths.length > 0) {
            allMath = "";
            maths.forEach(math => {allMath += `${mathMLToLatex(math)}\n`;});
            copyText(allMath);
        }
    }
});