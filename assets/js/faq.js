document.addEventListener('click', function (e) {
  const t = e.target;
  if (!t.closest('.faq summary')) return;

  const details = t.closest('details');
  const group   = t.closest('.faq');

  if (!details || !group) return;

  // If this one is about to open, close the others in the same group.
  const willOpen = !details.hasAttribute('open');
  if (willOpen) {
    group.querySelectorAll('details[open]').forEach(d => {
      if (d !== details) d.removeAttribute('open');
    });
  }
}, false);