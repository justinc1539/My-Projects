// V9.21.2026
// Active Websites: All
const url = window.location.href;
if (url.includes("https://ps.pcti.tec.nj.us/guardian/r") && url.includes("_reportcard.html")) {
    
    fetch(url)
        .then(res => res.text())
        .then(html => {
            // Split into lines
            const lines = html.split("\n");

            // Find first line containing "Class Rank:"
            const match = lines.find(line => line.includes("Class Rank:"));

            if (match) {
                alert("Found: " + match.trim());
            } else {
                alert("No Class Rank found");
            }
        })
        .catch(err => {
            alert("Fetch blocked by CORS or network error");
            console.error(err);
        });
}