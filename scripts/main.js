// Navbar
(function () {
  var header = document.querySelector('.site-header');
  var menu = document.getElementById('mainNavbar');
  var toggler = document.querySelector('.site-toggler');
  var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav-links .nav-link'));
  var sections = links.map(function (link) {
    return document.getElementById(link.getAttribute('href').slice(1));
  });

  // Close the mobile menu after choosing a section
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      if (menu.classList.contains('show')) toggler.click();
    });
  });

  // Sidebar and main column sit side by side on desktop, so several sections
  // can be on screen at once: pick the one whose top most recently passed the
  // reading line.
  function update() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
    var line = window.innerHeight * 0.3;
    var current = -1;
    var bestTop = -Infinity;
    sections.forEach(function (section, i) {
      if (!section) return;
      var rect = section.getBoundingClientRect();
      if (rect.top <= line && rect.bottom > line && rect.top > bestTop) {
        bestTop = rect.top;
        current = i;
      }
    });
    links.forEach(function (link, i) {
      link.classList.toggle('active', i === current);
    });
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      update();
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
