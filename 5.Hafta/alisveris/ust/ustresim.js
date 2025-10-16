document.querySelectorAll('.thumbs img').forEach(img => {
    img.addEventListener('mouseover', () => {
      const bigSrc = img.getAttribute('data-big');
      document.getElementById('bigImage').innerHTML = `<img src="${bigSrc}" alt="">`;
    });
  });
  