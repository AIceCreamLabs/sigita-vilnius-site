/* ================================================================
   CUSTOM CURSOR + MAGNETIC INTERACTION SYSTEM
   Native cursor always visible as fallback — no risk of disappearing
   ================================================================ */

(function () {
  'use strict';

  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  const follower = document.createElement('div');
  follower.id = 'cursor-follower';
  document.body.appendChild(cursor);
  document.body.appendChild(follower);

  let mouseX = -100, mouseY = -100;
  let followerX = -100, followerY = -100;

  cursor.style.opacity = '1';
  follower.style.opacity = '1';

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    cursor.style.transform = 'translate(-6px, -6px)';
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
  });

  function followCursor() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    follower.style.transform = 'translate(-20px, -20px)';
    requestAnimationFrame(followCursor);
  }
  followCursor();

  const interactives =
    'a, button, .btn, .service-card, .principle-card, .when-item, .faq-toggle, .process-step-pin, .magnetic';

  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(interactives);
    if (target) {
      cursor.classList.add('cursor-hover');
      follower.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest(interactives);
    if (target) {
      cursor.classList.remove('cursor-hover');
      follower.classList.remove('cursor-hover');
    }
  });

  document.querySelectorAll('.magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x / 20}px, ${y / 20}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();
