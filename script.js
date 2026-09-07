const startBtn = document.getElementById("startBtn");
const replayBtn = document.getElementById("replayBtn");

startBtn.addEventListener("click", () => {
  document.querySelector(".story").scrollIntoView({ behavior: "smooth" });
});

replayBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const birthday = new Date("2026-09-26T00:00:00+05:30").getTime();

function updateCountdown() {
  const now = Date.now();
  let distance = birthday - now;

  if (distance < 0) distance = 0;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Gentle reveal animation when sections enter the screen.
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll(".screen").forEach(section => observer.observe(section));


const surpriseBtn = document.getElementById("surpriseBtn");
const secretMessage = document.getElementById("secretMessage");

surpriseBtn.addEventListener("click", () => {
  secretMessage.classList.toggle("show");
  surpriseBtn.textContent = secretMessage.classList.contains("show")
    ? "Close the little secret ♡"
    : "One more thing… ♡";
});

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", async () => {
  if (bgMusic.paused) {
    try {
      await bgMusic.play();
      musicBtn.classList.add("playing");
    } catch (error) {
      alert("Add your music file at music/birthday.mp3 first.");
    }
  } else {
    bgMusic.pause();
    musicBtn.classList.remove("playing");
  }
});

// Try to start music after the first intentional tap, which is allowed by browsers.
startBtn.addEventListener("click", async () => {
  try {
    await bgMusic.play();
    musicBtn.classList.add("playing");
  } catch (error) {
    // Browser may require the music button to be tapped separately.
  }
});
