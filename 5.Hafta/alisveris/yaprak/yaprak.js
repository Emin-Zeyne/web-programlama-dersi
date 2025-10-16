const tabs = document.querySelectorAll('.tabs li');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    contents.forEach(c => c.classList.remove('active'));
    const target = tab.getAttribute('data-tab');
    document.getElementById(target).classList.add('active');
  });
});
