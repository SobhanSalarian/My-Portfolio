// Animations
AOS.init({
  anchorPlacement: 'top-left',
  duration: 1000
});

// Navbar
(function () {
  var header = document.querySelector('.site-header');
  var menu = document.getElementById('mainNavbar');
  var toggler = document.querySelector('.site-toggler');
  var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav-links .nav-link'));

  // Stronger shadow once the page is scrolled
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Close the mobile menu after choosing a section
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      if (menu.classList.contains('show')) toggler.click();
    });
  });

  // Highlight the link of the section currently in view
  if (!('IntersectionObserver' in window)) return;
  var byId = {};
  links.forEach(function (link) {
    byId[link.getAttribute('href').slice(1)] = link;
  });
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (link) { link.classList.remove('active'); });
      var link = byId[entry.target.id];
      if (link) link.classList.add('active');
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('main [id][class*="-section"]').forEach(function (section) {
    observer.observe(section);
  });
})();
