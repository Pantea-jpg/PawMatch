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

//filter and search part

const searchInput = document.getElementById("petSearch");
const clearBtn = document.getElementById("clearSearch");

function applyFilters() {
  const activeChip = document.querySelector(".chip.active");
  const typeFilter = activeChip ? activeChip.dataset.filter : "all";
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  cards.forEach((card) => {
    const typeMatch = typeFilter === "all" || card.dataset.type === typeFilter;
    const text = (
      card.querySelector("h3")?.textContent +
      " " +
      card.querySelector(".breed")?.textContent
    ).toLowerCase();
    const searchMatch = query === "" || text.includes(query);
    const match = typeMatch && searchMatch;

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
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    applyFilters();
  });
});

searchInput.addEventListener("input", applyFilters);
clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  applyFilters();
});
