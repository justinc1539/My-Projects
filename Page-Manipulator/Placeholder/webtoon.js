// V9.20.2026
// Active websites: all
if (window.location.href.startsWith("https://www.webtoons.com/en")) {
  window.addEventListener("keydown", (event) => {
    // Check for Alt + Left/Right Arrow
    if (event.altKey) return;
    
    // Check for Right Arrow or Left Arrow keys
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

    const url = new URL(window.location.href);
    const episodeNoParam = url.searchParams.get("episode_no");
    const pathSegments = url.pathname.split("/");

    let updated = false;

    // 1. Try updating the 'episode_no' query parameter first (most Webtoon viewer pages use this)
    if (episodeNoParam !== null && !isNaN(episodeNoParam)) {
      let currentEp = parseInt(episodeNoParam, 10);
      currentEp = event.key === "ArrowRight" ? currentEp + 1 : currentEp - 1;
      
      if (currentEp >= 1) {
        url.searchParams.set("episode_no", currentEp);
        updated = true;
      }
    }

    // 2. Fallback: Check if the episode number is embedded in the pathname (e.g., /episode-50/)
    const epIndex = pathSegments.findIndex(segment => segment.startsWith("episode-"));
    if (!updated && epIndex !== -1) {
      const match = pathSegments[epIndex].match(/episode-(\d+)/);
      if (match) {
        let currentEp = parseInt(match[1], 10);
        currentEp = event.key === "ArrowRight" ? currentEp + 1 : currentEp - 1;

        if (currentEp >= 1) {
          pathSegments[epIndex] = `episode-${currentEp}`;
          url.pathname = pathSegments.join("/");
          updated = true;
        }
      }
    }

    // Navigate to the new URL if an episode number was successfully altered
    if (updated) {
      window.location.href = url.toString();
    }
  });
}