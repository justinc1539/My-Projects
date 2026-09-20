// V9.20.2026
// Active websites: all
const speedOverlay = document.createElement('div');
speedOverlay.id = 'custom-speed-overlay';
var replay = false
var speedModIter = 4;
const speedModifiers = [0.0001, 0.001, 0.01, 0.1, 0.25, 1, 5, 10];
document.body.appendChild(speedOverlay);

const styles = document.createElement('style');
styles.innerHTML = `
  #custom-speed-overlay {
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    font-family: Arial, sans-serif;
    font-size: 18px;
    font-weight: bold;
    z-index: 999999; /* Ensures it sits on top of the video player */
    pointer-events: none; /* Clicking through it still works */
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
  #custom-speed-overlay.show {
    opacity: 1;
  }
`;
document.head.appendChild(styles);

function getDecimalCount(num) {
  if (Number.isInteger(num)) return 0;
  
  // Convert to a string capped at 4 decimals + drop any useless trailing zeros
  const cleanStr = (+num.toFixed(4)).toString();
  return cleanStr.split('.')[1].length;
}

let overlayTimeout;
function flashSpeedIndicator(currentSpeed) {
  speedOverlay.innerText = currentSpeed;
  speedOverlay.classList.add('show');
  
  clearTimeout(overlayTimeout); // Reset the hide timer if the user keeps pressing keys
  overlayTimeout = setTimeout(() => {
    speedOverlay.classList.remove('show');
  }, 1000);
}

const videos = document.querySelectorAll('video');
setInterval(() => {
    if (document.querySelectorAll('video')) videos = document.querySelectorAll('video');
}, 100);
while (!videos) {}
while (videos.volume != 1) {
    videos.volume = 1;
}

setInterval(() => {
    if (replay) {
        videos.forEach(v => {
            if (v.currentTime < v.replayStart || v.currentTime > v.replayEnd) {
                v.currentTime = v.replayStart;
            }
        });
    }
}, 1);

/**
 * Prevents default events from happpening on keypress.
 * For example, prevent Shift + LeftArrow from going back 5 seconds
 * which might be the default for LeftArrow depending on the
 * website.
 *
 * @param {event} e - The base cost of the item.
 */
function blockKeyEvents(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
}
window.addEventListener("keydown", (event) => {
  videos.forEach(aVideo => {
    const quality = aVideo.getVideoPlaybackQuality?.();
    const fps = (quality && quality.totalVideoFrames && quality.totalFrameDelay)
        ? quality.totalVideoFrames / quality.totalFrameDelay
        : 60;
    if ([",", "."].includes(event.key)) {
        aVideo.currentTime += event.key === "," ? -1/fps : 1/fps;
    }
    // Logic to change speed values
    else if (event.shiftKey && event.key === " ") {
        blockKeyEvents(event);
        speedModIter = 4;
        aVideo.playbackRate = 1;
        flashSpeedIndicator(`${aVideo.playbackRate}x ± ${speedModifiers[speedModIter]}x`);
    } else if (event.ctrlKey && ["<", ">"].includes(event.key)) {
      if (event.key === ">") {
        speedModIter = Math.min(speedModIter + 1, speedModifiers.length - 1);
      } else {
        speedModIter = Math.max(speedModIter - 1, 0);
      }
      flashSpeedIndicator(`±${speedModifiers[speedModIter].toFixed(getDecimalCount(speedModifiers[speedModIter]))}x`);
    } else if (["<", ">"].includes(event.key)) {
      if (event.key === ">") {
        aVideo.playbackRate = Math.min(aVideo.playbackRate + speedModifiers[speedModIter], 2**4);
      } else {
        aVideo.playbackRate = Math.max(Math.max(aVideo.playbackRate - speedModifiers[speedModIter], speedModifiers[speedModIter]), 2**-4);
      }
      flashSpeedIndicator(`${aVideo.playbackRate.toFixed(getDecimalCount(speedModifiers[speedModIter]))}x`);
    }
    // Replay feature
    else if (event.shiftKey && event.key === "ArrowUp") {
        blockKeyEvents(event);
        replay = true;
        flashSpeedIndicator("Replay On");
    } else if (event.shiftKey && event.key === "ArrowDown") {
        blockKeyEvents(event);
        replay = false;
        flashSpeedIndicator("Replay Off");
    } else if (event.shiftKey && event.key === "ArrowLeft") {
        blockKeyEvents(event);
        aVideo.replayStart = aVideo.currentTime;
        flashSpeedIndicator(`Start Replay at ${aVideo.replayStart}`);
    } else if (event.shiftKey && event.key === "ArrowRight") {
        blockKeyEvents(event);
        aVideo.replayEnd = aVideo.currentTime;
        flashSpeedIndicator(`End Replay at ${aVideo.replayEnd}`);
    }
  });
}, true);