const meanings = {
  praise: { transliteration: 'Al-ḥamdu', meaning: 'All praise' },
  allah: { transliteration: 'Lillāhi', meaning: 'is for Allah' },
  lord: { transliteration: 'Rabbi', meaning: 'Lord' },
  worlds: { transliteration: 'Al-ʿālamīn', meaning: 'of all worlds' }
};
const meaningText = document.querySelector('#meaning-text');
const label = document.querySelector('.meaning-label');
document.querySelectorAll('[data-word]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-word]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    const word = meanings[button.dataset.word];
    label.textContent = word.transliteration;
    meaningText.textContent = word.meaning;
  });
});
document.querySelector('#year').textContent = String(new Date().getFullYear());
