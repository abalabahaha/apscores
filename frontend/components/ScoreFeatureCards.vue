<template>
  <div class="bd-links">
    <div class="bd-link">
      <h2 class="bd-link-name">
        <figure class="bd-link-figure">
          <span class="bd-link-icon"><b-icon icon="thumb-up" /></span>
        </figure>
        Convenient
      </h2>
      <p class="bd-link-subtitle">
        No complex proxies to configure, no shady VPN apps to install. Just use our web form to login and view your scores!
      </p>
    </div>
    <div class="bd-link">
      <h2 class="bd-link-name">
        <figure class="bd-link-figure">
          <span class="bd-link-icon"><b-icon icon="weather-windy" /></span>
        </figure>
        Fast
      </h2>
      <p class="bd-link-subtitle">
        No more nail-biting until July 9th! Get your 2018 AP scores on July 5th at 8AM Eastern Time<span class="has-text-danger">*</span> with the fastest early score viewer on the planet.
      </p>
      <p class="bd-link-more is-size-6 has-text-danger">
        * disregarding College Board server crashes
      </p>
    </div>
    <div class="bd-link">
      <h2 class="bd-link-name">
        <figure class="bd-link-figure">
          <span class="bd-link-icon"><b-icon icon="account-multiple" /></span>
        </figure>
        Trusted
      </h2>
      <p class="bd-link-subtitle">
        We're trusted by over 300,000 students!
      </p>
    </div>
    <div class="bd-link">
      <h2 class="bd-link-name">
        <figure class="bd-link-figure">
          <span class="bd-link-icon"><b-icon icon="spellcheck" /></span>
        </figure>
        Accurate
      </h2>
      <p class="bd-link-subtitle">
        Your scores are literally relayed straight from APscores.org. No lying, no modifying, no bullshit.
      </p>
    </div>
    <div class="bd-link">
      <h2 class="bd-link-name">
        <figure class="bd-link-figure">
          <span class="bd-link-icon"><b-icon icon="verified" /></span>
        </figure>
        Reliable
      </h2>
      <p class="bd-link-subtitle">
        Built to withstand server crashes, a million worried students, and minor asteroid impacts. If College Board goes down, we'll retry as soon as it's back up!
      </p>
    </div>
    <div class="bd-link">
      <h2 class="bd-link-name">
        <figure class="bd-link-figure">
          <span class="bd-link-icon"><b-icon icon="lock" /></span>
        </figure>
        Secure
      </h2>
      <p class="bd-link-subtitle">
        Your password and session data are encrypted with industry-standard AES256 and HTTPS. We <u>never</u> store your information; it's passed straight to College Board and back.
      </p>
    </div>
  </div>
</template>

<style>
.bd-links {
  counter-reset: bd-links;
}
.bd-link {
  border-radius: 6px;
  color: #7a7a7a;
  display: block;
  font-size: 1rem;
  padding: 0.5rem 1.5rem 0.5rem 2.5rem;
  position: relative;
  transition-duration: 86ms;
  transition-property: background-color, color;
}
.bd-link strong {
  font-weight: 600;
}
.bd-link:hover {
  background-color: #fafafa;
}
.bd-link-surtitle {
  float: right;
  font-size: 0.75em;
  margin-bottom: 1em;
  margin-left: 2em;
  opacity: 0.5;
  padding-top: 0.25em;
}
.bd-link-name {
  line-height: 1.25;
  margin-bottom: 0.25em;
  position: relative;
}
.bd-link-figure {
  position: absolute;
  right: calc(100% + 0.25em);
  text-align: center;
  top: 0;
  min-width: 1.5em;
}
.bd-link-counter {
  color: #3273dc;
  display: block;
  counter-increment: bd-links;
  font-weight: 400;
}
.bd-link-counter::before {
  content: counter(bd-links);
}
.bd-link-icon {
  display: block;
  font-size: 2rem;
  width: 1.5em;
}
.bd-link-more {
  font-size: 0.75em;
  opacity: 0.5;
}
@media screen and (min-width: 1088px) {
  .bd-links {
    display: flex;
    flex-wrap: wrap;
  }
  .bd-link {
    width: 100%;
  }
}
.bd-link-name {
  color: #363636;
  font-size: 1.5rem;
  font-weight: 600;
}
</style>
