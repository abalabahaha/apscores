<template>
  <transition name="drawdown">
    <div v-if="countdown.totalSeconds >= 0" class="card">
      <header :class="['card-header', countdown.totalSeconds === 0 ? 'has-background-success' : '']">
        <p v-if="countdown.totalSeconds === 0" class="card-header-title has-text-white is-size-4">2018 AP scores are out!</p>
        <p v-else class="card-header-title is-size-4">July 5, 2018 @ 8AM ET</p>
        <span :class="['card-header-icon', {'has-text-white': countdown.totalSeconds === 0}]">
          <b-icon icon="clock" />
        </span>
      </header>
      <transition name="drawdown">
        <div v-if="countdown.totalSeconds > 0" class="card-content">
          <div class="level is-mobile countdown">
            <div class="level-item">
              <p class="is-size-4" v-text="countdown.days" />
              <p>Days</p>
            </div>
            <div class="level-item">
              <p class="is-size-4" v-text="countdown.hours" />
              <p>Hours</p>
            </div>
            <div class="level-item">
              <p class="is-size-4" v-text="countdown.minutes" />
              <p>Minutes</p>
            </div>
            <div class="level-item">
              <p class="is-size-4" v-text="countdown.seconds" />
              <p>Seconds</p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
const DOOMSDAY_2018 = 1530792000000;

export default {
  data() {
    return {
      countdown: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,

        totalSeconds: -1,

        interval: null
      }
    };
  },
  methods: {
    tickCountdown() {
      let totalSeconds = this.countdown.totalSeconds = Math.max(0, Math.ceil((DOOMSDAY_2018 - Date.now()) / 1000));
      if(totalSeconds === 0) {
        this.countdown.days = this.countdown.hours = this.countdown.minutes = this.countdown.seconds = 0;
        clearInterval(this.countdown.interval);
        this.countdown.interval = null;
        return;
      }

      this.countdown.days = Math.floor(totalSeconds / 60 / 60 / 24);
      totalSeconds -= this.countdown.days * 60 * 60 * 24;
      this.countdown.hours = Math.floor(totalSeconds / 60 / 60);
      totalSeconds -= this.countdown.hours * 60 * 60;
      this.countdown.minutes = Math.floor(totalSeconds / 60);
      totalSeconds -= this.countdown.minutes * 60;
      this.countdown.seconds = Math.floor(totalSeconds);
    }
  },
  mounted() {
    this.tickCountdown();
    if(this.countdown.totalSeconds > 0) {
      this.countdown.interval = setInterval(() => this.tickCountdown(), 1000);
    }
  },
  beforeDestroy() {
    clearInterval(this.countdown.interval);
    this.countdown.interval = null;
  }
}
</script>

<style>
.card-header {
  box-shadow: none;
}

.countdown>.level-item {
  flex-direction: column;
}
</style>
