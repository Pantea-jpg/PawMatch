const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".card");
const emptyState = document.getElementById("emptyState");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    const filter = chip.dataset.filter;
    let visibleCount = 0;

    cards.forEach((card, i) => {
      const match = filter === "all" || card.dataset.type === filter;
      if (match) {
        card.style.display = "";
        card.style.animation = "none";
        void card.offsetWidth;
        card.style.animationDelay = visibleCount * 0.06 + "s";
        card.style.animation = "card-in .55s cubic-bezier(.2,.8,.2,1) forwards";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    emptyState.style.display = visibleCount === 0 ? "block" : "none";
  });
});
