const slider = document.getElementById('slider');
const valueDisplay = document.getElementById('value');

// При загрузке — отображаем сохранённое значение (или 4 по умолчанию)
chrome.storage.sync.get({ itemsPerRow: 4 }, data => {
  slider.value = data.itemsPerRow;
  valueDisplay.textContent = data.itemsPerRow;
});

// При изменении ползунка — сохраняем и отправляем команду
slider.addEventListener('input', () => {
  const value = slider.value;
  valueDisplay.textContent = value;
  chrome.storage.sync.set({ itemsPerRow: value });
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: updateGrid,
      args: [value]
    });
  });
});

// Функция, которая будет инжектироваться на страницу
function updateGrid(value) {
  const styleId = 'grid-control-style';
  let styleTag = document.getElementById(styleId);
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = styleId;
    document.head.appendChild(styleTag);
  }
  styleTag.textContent = `
    ytd-rich-grid-renderer {
      --ytd-rich-grid-items-per-row: ${value} !important;
    }
  `;
}
