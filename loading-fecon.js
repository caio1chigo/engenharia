(() => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) return;

  function startLoader() {
    // Evita duplicar o loading.
    if (document.getElementById("fecon-loader")) return;

    const loader = document.createElement("div");

    loader.id = "fecon-loader";
    loader.className = "fecon-loader";

    // Elemento decorativo: evita anunciar cada porcentagem
    // para leitores de tela.
    loader.setAttribute("aria-hidden", "true");

    loader.innerHTML = `
      <div class="fecon-loader__content">
        <div class="fecon-loader__brand">
          <span class="fecon-loader__name">feconDF</span>
          <span class="fecon-loader__subtitle">engenharia</span>
        </div>

        <div class="fecon-loader__track">
          <div class="fecon-loader__fill"></div>
        </div>

        <span class="fecon-loader__percent">0%</span>
      </div>
    `;

    document.body.prepend(loader);

    const fill = loader.querySelector(".fecon-loader__fill");
    const percent = loader.querySelector(".fecon-loader__percent");

    const duration = 1800;
    const startedAt = performance.now();

    let frame;
    let completed = false;
    let removed = false;

    function removeLoader() {
      if (removed) return;

      removed = true;
      cancelAnimationFrame(frame);
      loader.remove();
    }

    function completeLoader() {
      if (completed || removed) return;

      completed = true;
      cancelAnimationFrame(frame);

      fill.style.transform = "scaleX(1)";
      percent.textContent = "100%";

      loader.classList.add("is-complete");

      // Tempo para perceber a mudança de branco para azul.
      window.setTimeout(() => {
        if (removed) return;

        loader.classList.add("is-leaving");

        window.setTimeout(removeLoader, 700);
      }, 650);
    }

    function animate(now) {
      if (completed || removed) return;

      const progress = Math.min(
        (now - startedAt) / duration,
        1
      );

      // Desaceleração suave no final.
      const eased = 1 - Math.pow(1 - progress, 2);

      const value =
        progress < 1
          ? Math.min(99, Math.floor(eased * 100))
          : 100;

      percent.textContent = `${value}%`;
      fill.style.transform = `scaleX(${value / 100})`;

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        completeLoader();
      }
    }

    frame = requestAnimationFrame(animate);

    // Segurança: não mantém a tela sobre o site indefinidamente.
    window.setTimeout(removeLoader, 4500);
  }

  // Permite carregar este script no começo do body.
  if (document.body) {
    startLoader();
  } else {
    document.addEventListener(
      "DOMContentLoaded",
      startLoader,
      { once: true }
    );
  }
})();