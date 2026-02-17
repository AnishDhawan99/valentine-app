// --- Customize via URL params ---
// Example: ?her=Kanika&you=Anish&note=You%20are%20my%20favorite%20person&label1=Us&label2=You
const qs = new URLSearchParams(window.location.search);

const herName = qs.get("her") || "Love";
const yourName = qs.get("you") || "Me";
const note = qs.get("note");
const label1 = qs.get("label1") || "Us";
const label2 = qs.get("label2") || "You";

document.getElementById("herName").textContent = herName;
document.getElementById("yourName").textContent = yourName;
document.getElementById("label1").textContent = label1;
document.getElementById("label2").textContent = label2;
if (note) document.getElementById("noteText").textContent = decodeURIComponent(note);

// --- Playful "No" button dodge ---
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const hint = document.getElementById("hint");

let dodgeCount = 0;
const maxDodge = 10;

function dodge(){
  dodgeCount++;
  hint.textContent = dodgeCount < maxDodge
    ? "Nice try 😄"
    : "Okay okay… you can click NO now (but why would you) 😭";

  if (dodgeCount >= maxDodge) return;

  const parent = noBtn.parentElement;
  const rect = parent.getBoundingClientRect();

  // Keep within parent bounds
  const pad = 6;
  const xMax = Math.max(pad, rect.width - noBtn.offsetWidth - pad);
  const yMax = Math.max(pad, rect.height - noBtn.offsetHeight - pad);

  const x = Math.floor(Math.random() * xMax);
  const y = Math.floor(Math.random() * yMax);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

noBtn.addEventListener("mouseenter", dodge);
noBtn.addEventListener("touchstart", (e) => { e.preventDefault(); dodge(); }, {passive:false});

// --- YES -> modal celebration ---
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

yesBtn.addEventListener("click", () => {
  document.getElementById("modalMsg").textContent =
    `Okay it’s official — ${herName}, you’re my Valentine 🥰`;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");

  // Confetti-ish effect using emojis
  burstHearts();
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
});

// --- Music toggle ---
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let playing = false;

musicBtn.addEventListener("click", async () => {
  try{
    if (!playing){
      await music.play();
      playing = true;
      musicBtn.textContent = "Pause Music ⏸️";
    } else {
      music.pause();
      playing = false;
      musicBtn.textContent = "Play Music 🎶";
    }
  } catch (e){
    musicBtn.textContent = "Tap again to allow audio 🎶";
  }
});

// --- Copy link ---
document.getElementById("shareBtn").addEventListener("click", async () => {
  try{
    await navigator.clipboard.writeText(window.location.href);
    hint.textContent = "Link copied ✅ Send it to her 💌";
  } catch {
    hint.textContent = "Couldn’t copy link — just share your browser URL 🔗";
  }
});

// --- Hearts burst ---
function burstHearts(){
  const emojis = ["💖","💘","💝","💗","💞","❤️"];
  for (let i=0; i<28; i++){
    const s = document.createElement("div");
    s.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    s.style.position = "fixed";
    s.style.left = `${Math.random()*100}vw`;
    s.style.top = `-10px`;
    s.style.fontSize = `${16 + Math.random()*18}px`;
    s.style.transition = "transform 2.2s ease, opacity 2.2s ease";
    s.style.zIndex = 9999;
    document.body.appendChild(s);

    requestAnimationFrame(() => {
      s.style.transform = `translateY(${110 + Math.random()*90}vh) rotate(${Math.random()*360}deg)`;
      s.style.opacity = "0";
    });

    setTimeout(() => s.remove(), 2300);
  }
}
