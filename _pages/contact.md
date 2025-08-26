---
layout: splash
title: "Contact"
permalink: /contact/
header:
  overlay_color: rgba(16, 61, 45, 0.8)
  overlay_filter: "0.35"
  overlay_image: "/assets/images/cal.webp"
  actions:
    - label: "Call (203) 846-3424"
      url: "tel:+12038463424"
    - label: "Book on Zocdoc"
      url: "https://www.zocdoc.com/practice/cranbury-chiropractic-center-43835"
excerpt: ""
---


## Get in Touch
{: .reveal .reveal--up }


<form id="contact-form" class="contact-form reveal reveal--up" action="https://formspree.io/f/xzzabznp" method="POST" novalidate>
  <div class="form-grid">
    <div class="form-field">
      <label for="name">Name <span aria-hidden="true">*</span></label>
      <input type="text" id="name" name="name" required aria-required="true" autocomplete="name" placeholder="Your full name">
    </div>

    <div class="form-field">
      <label for="email">Email</label>
      <input type="email" id="email" name="_replyto" autocomplete="email" placeholder="you@example.com">
    </div>

    <div class="form-field">
      <label for="phone">Phone</label>
      <input type="tel" id="phone" name="phone" autocomplete="tel" inputmode="tel" placeholder="(203) 846-3424">
    </div>

    <div class="form-field full">
      <label for="message">Message <span aria-hidden="true">*</span></label>
      <textarea id="message" name="message" required aria-required="true" placeholder="How can we help? What is your availability?"></textarea>
    </div>

    <div class="form-field full">
      <fieldset>
        <legend>How should we contact you?</legend>
        <div class="choice-pills" role="group" aria-label="Contact preference">
          <label>
            <input type="checkbox" name="contact_pref" value="email" checked>
            <span>Email</span>
          </label>
          <label>
            <input type="checkbox" name="contact_pref" value="phone">
            <span>Phone</span>
          </label>
        </div>
      </fieldset>
    </div>

    <!-- Honeypot (spam protection) -->
    <input type="text" name="_gotcha" style="display:none">
    <input type="hidden" name="page" value="{{ page.url }}">
    <input type="hidden" name="_subject" value="New message from Cranbury Chiropractic website">
    <input type="hidden" name="form_name" value="Website Contact Form">

    <div class="actions">
      <button type="submit" class="btn btn--primary">Send Message</button>
      <a class="btn" href="tel:+12038463424">Call (203) 846-3424</a>
    </div>
  </div>
</form>

<div class="reveal reveal--up">
  <section class="contact-hours">
    <div class="map">
      <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12017.780646219726!2d-73.43573584758363!3d41.14663669559827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e81d06e09b8725%3A0x6a009dd40432130c!2s488%20Main%20Ave%2C%20Norwalk%2C%2006851!5e0!3m2!1sen!2sus!4v1755148035773!5m2!1sen!2sus" 
          width="600" 
          height="450"
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>

    <div class="location-details">
      <div class="contact-info" style="min-width:0;word-break:break-word;">
          <div class="address-block">
            <strong class="business-name">Cranbury Chiropractic Center</strong>
            <span class="address-line">488 Main Ave.</span>
            <span class="address-line">Norwalk, CT 06851</span>
            <a href="tel:+12038463424" class="phone-link">(203) 846-3424</a>
          </div>
      </div>

      <div class="hours-info" style="min-width:0;word-break:break-word;">
        <h3 class="section-subtitle">Office Hours</h3>
        <div class="hours-table-wrapper">
          <table class="hours-table" aria-label="Office Hours" style="min-width:0;table-layout:fixed;word-break:break-word;">
            <thead>
              <tr>
                <th scope="col">Day</th>
                <th scope="col">Morning</th>
                <th scope="col">Afternoon</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">MON</th>
                <td>8:00 &ndash; 1:00</td>
                <td>3:00 &ndash; 6:00</td>
              </tr>
              <tr>
                <th scope="row">WED</th>
                <td>8:00 &ndash; 1:00</td>
                <td>3:00 &ndash; 6:00</td>
              </tr>
              <tr>
                <th scope="row">FRI</th>
                <td>8:00 &ndash; 1:00</td>
                <td>3:00 &ndash; 6:00</td>
              </tr>
              <tr>
                <th scope="row">SAT</th>
                <td>8:00 &ndash; 11:00</td>
                <td>Closed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</div>
---
<div class="contact-actions reveal reveal--up">
  <a href="https://www.zocdoc.com/practice/cranbury-chiropractic-center-43835" class="btn">
    <span class="btn-label">Book on Zocdoc</span>
  </a>
</div>