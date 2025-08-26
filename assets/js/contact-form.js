

(function(){
  var form = document.getElementById('contact-form');
  if (!form) return;

  var name = form.querySelector('#name');
  var email = form.querySelector('#email');
  var phone = form.querySelector('#phone');
  var message = form.querySelector('#message');
  var prefBoxes = function(){
    return Array.from(form.querySelectorAll('input[name="contact_pref"]:checked')).map(function(x){return x.value;});
  };

  // Utility: create or update an inline error below a field
  function setErr(el, msg){
    if (!el) return;
    var err = el.parentNode.querySelector('.error');
    if (!err){ err = document.createElement('div'); err.className='error'; el.parentNode.appendChild(err); }
    err.textContent = msg || '';
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }

  // Status banner above the form
  function showStatus(kind, text){
    var existing = document.querySelector('.form-status');
    if (!existing){
      existing = document.createElement('div');
      existing.className = 'form-status';
      form.parentNode.insertBefore(existing, form);
    }
    existing.className = 'form-status ' + (kind === 'ok' ? 'form-status--ok' : 'form-status--err');
    existing.textContent = text;
  }

  // Phone helpers
  function digitsOnly(s){ return (s||'').replace(/\D+/g,''); }
  function formatPhone(val){
    var d = digitsOnly(val).slice(0,10);
    if (d.length < 4) return d;
    if (d.length < 7) return '('+d.slice(0,3)+') '+d.slice(3);
    return '('+d.slice(0,3)+') '+d.slice(3,6)+'-'+d.slice(6);
  }

  if (phone){
    phone.addEventListener('input', function(){ this.value = formatPhone(this.value); });
  }

  // Clear errors as user edits
  [name, email, phone, message].forEach(function(el){
    if (!el) return;
    el.addEventListener('input', function(){ setErr(el, ''); });
  });

  function validate(){
    var ok = true;
    var prefs = prefBoxes();

    // Reset errors
    [name, email, phone, message].forEach(function(el){ if (el) setErr(el, ''); });

    if (!name || !name.value.trim()){ setErr(name, 'Please enter your name.'); ok=false; }
    if (!message || !message.value.trim()){ setErr(message, 'Please include a brief message.'); ok=false; }

    // Preference-driven requirements
    if (prefs.indexOf('email') > -1 && (!email || !email.value.trim())){ setErr(email, 'Please include your email.'); ok=false; }
    if (prefs.indexOf('phone') > -1 && (!phone || !digitsOnly(phone.value))){ setErr(phone, 'Please include your phone.'); ok=false; }

    // If no preference chosen, require at least one contact method
    if (!prefs.length){
      var hasEmail = email && email.value.trim();
      var hasPhone = phone && digitsOnly(phone.value);
      if (!hasEmail && !hasPhone){ setErr(email || phone, 'Please add email or phone.'); ok=false; }
    }

    return ok;
  }

  // AJAX submit via fetch (Formspree-friendly)
  var submitting = false;
  form.addEventListener('submit', function(e){
    e.preventDefault();

    // Endpoint guard
    if (!form.action || /your-id-here/.test(form.action)){
      showStatus('err', 'Form endpoint not configured. Please contact the site owner.');
      return;
    }

    if (!validate()){
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    if (submitting) return; // guard
    submitting = true;

    var btn = form.querySelector('button[type="submit"]');
    var btnText = btn ? btn.textContent : '';
    if (btn){ btn.disabled = true; btn.textContent = 'Sending…'; }

    var data = new FormData(form);
    fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
      .then(function(res){ return res.ok ? res.json() : Promise.reject(res); })
      .then(function(){
        showStatus('ok', 'Thanks! Your message has been sent. We’ll get back to you soon.');
        form.reset();
        // Keep default email preference checked after reset
        var emailPref = form.querySelector('input[name="contact_pref"][value="email"]');
        if (emailPref) emailPref.checked = true;
      })
      .catch(function(){
        showStatus('err', 'Sorry, something went wrong. Please try again later or call (203) 846-3424.');
      })
      .finally(function(){
        submitting = false;
        if (btn){ btn.disabled = false; btn.textContent = btnText; }
      });
  });
})();