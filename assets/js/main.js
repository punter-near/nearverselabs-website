// ===== Starfield (twinkle + parallax + shooting stars) =====
const canvas = document.getElementById("starfield");

if (!canvas) {
  console.warn("Starfield canvas not found.");
} else {
  const ctx = canvas.getContext("2d");

  let w = 0, h = 0;
  let stars = [];
  let shooting = [];
  let mouse = { x: 0, y: 0 };
  let lastTime = 0;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function initStars() {
    const density = Math.min(240, Math.floor((w * h) / 12000)); // adaptive

    stars = Array.from({ length: density }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: rand(0.6, 1.8),
      z: rand(0.2, 1.0),          // depth
      vy: rand(0.05, 0.25),       // drift
      tw: rand(0, Math.PI * 2),   // twinkle phase
      tws: rand(0.6, 1.4),        // twinkle speed
      a: rand(0.35, 0.9)          // base alpha
    }));
  }

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    initStars();
  }
  window.addEventListener("resize", resize);
  resize();

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function spawnShootingStar() {
    const startX = rand(-0.2 * w, 0.4 * w);
    const startY = rand(-0.2 * h, 0.3 * h);
    const speed = rand(900, 1400);
    const angle = rand(Math.PI * 0.20, Math.PI * 0.35);

    shooting.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: rand(0.35, 0.55),
      t: 0
    });
  }

  function drawBackground() {
    const g = ctx.createRadialGradient(w * 0.25, h * 0.25, 0, w * 0.25, h * 0.25, Math.max(w, h));
    g.addColorStop(0, "rgba(26, 31, 60, 0.85)");
    g.addColorStop(0.55, "rgba(7, 10, 16, 0.95)");
    g.addColorStop(1, "rgba(7, 10, 16, 1)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }

  function animate(ts) {
    const t = ts / 1000;
    const dt = Math.min(0.033, (ts - lastTime) / 1000 || 0);
    lastTime = ts;

    drawBackground();

    // Parallax offset (very subtle)
    const px = reduceMotion ? 0 : (mouse.x / w - 0.5) * 12;
    const py = reduceMotion ? 0 : (mouse.y / h - 0.5) * 12;

    // Stars
    for (const s of stars) {
      if (!reduceMotion) s.y += s.vy * (0.6 + s.z) * 60 * dt;
      if (s.y > h + 10) {
        s.y = -10;
        s.x = Math.random() * w;
      }

      // Twinkle
      const twinkle = reduceMotion ? 0 : (Math.sin(t * s.tws + s.tw) * 0.25);
      const alpha = Math.max(0, Math.min(1, s.a + twinkle));

      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.arc(s.x + px * s.z, s.y + py * s.z, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Shooting stars occasionally
    if (!reduceMotion && Math.random() < 0.006) spawnShootingStar();

    // Draw shooting stars
    shooting = shooting.filter((sh) => sh.t < sh.life);
    for (const sh of shooting) {
      sh.t += dt;
      sh.x += sh.vx * dt;
      sh.y += sh.vy * dt;

      const p = sh.t / sh.life;
      const tail = 180;
      const tx = sh.x - sh.vx * dt * tail * 0.02;
      const ty = sh.y - sh.vy * dt * tail * 0.02;

      ctx.strokeStyle = `rgba(180, 140, 255, ${0.9 * (1 - p)})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(sh.x, sh.y);
      ctx.stroke();
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// ===== Scroll reveal (fade + slight translate) =====
const revealEls = document.querySelectorAll("[data-reveal]");

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => io.observe(el));

// ===== Footer year =====
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();