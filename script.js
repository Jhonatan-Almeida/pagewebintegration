// ==========================================================================
// Interactive Enhancements & Micro-Interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('interactive-card');
  const btnCopy = document.getElementById('btn-copy');
  const btnCopyText = document.getElementById('btn-copy-text');
  const btnInteract = document.getElementById('btn-interact');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const liveTime = document.getElementById('live-time');

  // 1. Live Time updater for status pill
  const updateClock = () => {
    if (!liveTime) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    liveTime.textContent = `${hours}:${minutes}:${seconds}`;
  };
  updateClock();
  setInterval(updateClock, 1000);

  // 2. Mouse Glow Spotlight & subtle 3D tilt effect
  if (card) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update CSS variables for radial glow
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Gentle 3D Tilt calculation
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4; // Max -4 to 4 deg
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  }

  // 3. Toast Helper
  let toastTimeout = null;
  const showToast = (message) => {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.add('show');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  // 4. Copy to Clipboard Button
  if (btnCopy) {
    btnCopy.addEventListener('click', async () => {
      const textToCopy = 'Hola mundo Jhonatan Almeida';
      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalText = btnCopyText.textContent;
        btnCopyText.textContent = '¡Copiado!';
        showToast(`Copiado: "${textToCopy}"`);

        setTimeout(() => {
          btnCopyText.textContent = originalText;
        }, 2000);
      } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Copiado: "${textToCopy}"`);
      }
    });
  }

  // 5. Glow Burst Effect Button
  if (btnInteract && card) {
    btnInteract.addEventListener('click', () => {
      card.classList.remove('sparkle-burst');
      // Trigger reflow to restart animation
      void card.offsetWidth;
      card.classList.add('sparkle-burst');
      showToast('✨ ¡Efecto de iluminación activado!');

      setTimeout(() => {
        card.classList.remove('sparkle-burst');
      }, 1300);
    });
  }
});
