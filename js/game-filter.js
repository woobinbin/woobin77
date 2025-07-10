document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.view-tab .tag');
  const cards = document.querySelectorAll('.game-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterTag = tab.textContent.trim();

      cards.forEach(card => {
        const tags = (card.dataset.tags || "").split(',').map(t => t.trim());
        if (filterTag === '#전체' || tags.includes(filterTag)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

