<template>
  <div>
    <navbar />
    <nuxt />
    <footer class="footer">
      <div class="container">
        <div class="columns">
          <div class="column">
            <p>&copy;2018 abalabahaha</p>
            <hr>
            <p>AP® and College Board® are trademarks registered by the College Board, which is not affiliated with, and does not endorse, this site.</p>
          </div>
          <div class="column has-text-right">
            <p><a target="_blank" rel="noopener noreferrer" href="https://github.com/abalabahaha/apscores">GitHub</a> | <router-link to="/early-scores#contact">Contact</router-link></p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue";

export default {
  components: {
    Navbar
  }
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
