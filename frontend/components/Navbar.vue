<template>
  <nav class="navbar is-primary" role="navigation" aria-label="dropdown navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item is-size-5" to="/">
        <b>AP Students</b>
      </router-link>
      <a :class="['navbar-burger', {'is-active': navbarActive}]" href="#" role="button" aria-label="menu" aria-expanded="false" @click.prevent="navbarActive = !navbarActive">
        <span aria-hidden="true"/>
        <span aria-hidden="true"/>
        <span aria-hidden="true"/>
      </a>
    </div>
    <div :class="['navbar-menu', {'is-active': navbarActive}]">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/early-scores">
          Early Scores
        </router-link>
        <router-link class="navbar-item" to="/posts/2018/ap-score-info">
          2018 AP Info
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navbarActive: false
    };
  },
  watch: {
    $route() {
      this.navbarActive = false;
    }
  }
}
</script>

<style>
.navbar-burger {
  color: white;
}
</style>
