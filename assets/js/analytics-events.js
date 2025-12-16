(function () {
  function trackPhoneClicks() {
    document.addEventListener('click', function (event) {
      var link = event.target.closest && event.target.closest('a[href^="tel:"]');
      if (!link) return;

      var href = link.getAttribute('href');
      var label = link.dataset.callLabel || href;

      // Send GA4 click_to_call event when gtag is available; otherwise queue in dataLayer
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'click_to_call', {
          event_category: 'engagement',
          event_label: label,
          call_url: href,
        });
      } else if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: 'click_to_call',
          event_category: 'engagement',
          event_label: label,
          call_url: href,
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackPhoneClicks);
  } else {
    trackPhoneClicks();
  }
})();
