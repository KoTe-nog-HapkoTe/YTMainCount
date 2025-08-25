// При загрузке страницы применяем сохранённое значение
chrome.storage.sync.get({ itemsPerRow: 4 }, data => {
  const value = data.itemsPerRow;
  const style = document.createElement('style');
  style.textContent = `
    ytd-rich-grid-renderer {
      --ytd-rich-grid-items-per-row: ${value} !important;
    }
  `;
  document.head.appendChild(style);
});
