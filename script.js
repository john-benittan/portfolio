// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Lightweight 3D tilt on cards (no libraries)
const damp = 18;           // lower = stronger tilt
const maxTilt = 12;        // degrees cap
const scaleOnHover = 1.03; // subtle zoom

function clamp(n, min, max){ return Math.max(min, Math.min(n, max)); }

document.querySelectorAll('.tilt').forEach(card => {
  let rafId = null;

  function onMove(e){
    const r = card.getBoundingClientRect();
    const x = (e.clientX ?? (e.touches?.[0]?.clientX || 0)) - r.left;
    const y = (e.clientY ?? (e.touches?.[0]?.clientY || 0)) - r.top;
    const rx = clamp(((y - r.height/2) / damp), -maxTilt, maxTilt);
    const ry = clamp(((x - r.width/2) / damp), -maxTilt, maxTilt);

    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      card.style.transform = `rotateX(${-rx}deg) rotateY(${ry}deg) scale(${scaleOnHover})`;
    });
  }

  function reset(){
    if (rafId) cancelAnimationFrame(rafId);
    card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
  }

  card.addEventListener('mousemove', onMove);
  card.addEventListener('mouseleave', reset);
  card.addEventListener('touchstart', onMove, {passive:true});
  card.addEventListener('touchmove', onMove, {passive:true});
  card.addEventListener('touchend', reset);
});
