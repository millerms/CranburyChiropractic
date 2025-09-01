// Lazy load Google Maps embeds on click or when visible
(function(){
  if (window.__lazyMapInit) return; window.__lazyMapInit = true;

  function mountIframe(wrapper){
    if (!wrapper || wrapper.classList.contains('is-loaded')) return;
    var btn = wrapper.querySelector('.map-placeholder');
    var src = btn && btn.getAttribute('data-map-src');
    var title = (btn && btn.getAttribute('data-map-title')) || 'Map';
    if (!src) return;
    var iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.allowFullscreen = true;
    iframe.setAttribute('title', title);
    iframe.setAttribute('aria-label', title);
    iframe.style.border = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    wrapper.innerHTML = '';
    wrapper.appendChild(iframe);
    wrapper.classList.add('is-loaded');
  }

  function attach(){
    var maps = document.querySelectorAll('.map-embed');
    if (!maps.length) return;

    maps.forEach(function(el){
      var mode = (el.getAttribute('data-load') || 'click').toLowerCase();
      if (mode === 'visible' && 'IntersectionObserver' in window) {
        var io = new IntersectionObserver(function(entries){
          entries.forEach(function(entry){
            if (entry.isIntersecting) {
              mountIframe(el);
              io.unobserve(el);
            }
          });
        }, { rootMargin: '200px 0px' });
        io.observe(el);
      }
      // Always allow click to load
      var btn = el.querySelector('.map-placeholder');
      if (btn) btn.addEventListener('click', function(){ mountIframe(el); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attach);
  } else { attach(); }
})();

