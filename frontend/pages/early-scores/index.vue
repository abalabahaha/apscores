 <template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h1 class="title">
              Early AP Scores
            </h1>
            <h2 class="subtitle">
              Get your 2018 AP scores right as they come out on July 5th!
            </h2>
            <p class="buttons">
              <a href="#" class="button" @click.prevent="showHowModal">How It Works</a>
              <router-link to="/posts/2018/ap-score-info#release-schedule" class="button">Release Schedule and Map</router-link>
              <a href="#" class="button" @click.prevent="isContactModalActive = true">Contact Us</a>
            </p>
            <hr>
            <score-feature-cards class="is-hidden-mobile" />
          </div>
          <div class="column">
            <a-p-score-countdown />
            <hr>
            <div class="box">
              <a-p-score-viewer />
            </div>
            <score-feature-cards class="is-hidden-tablet" />
          </div>
        </div>
      </div>
    </div>
    <b-modal id="contact" :active.sync="isContactModalActive" width="600" has-modal-card @close="closeContactModal">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Contact Us</p>
        </header>
        <section class="modal-card-body">
          <div class="content">
            <p>Found a bug? Have a question? You've come to the right place.</p>
            <p>We have a contact form on Google Forms: <a href="https://goo.gl/forms/qOss2vNc6KFBZea82">https://goo.gl/forms/qOss2vNc6KFBZea82</a></p>
            <p>Alternatively, you can email <a href="mailto:apstudentservices+net@gmail.com">apstudentservices@gmail.com</a></p>
            <p>If you want to contact the official College Board or AP program, visit their official site: <a href="https://pages.collegeboard.org/contact-us">https://pages.collegeboard.org/contact-us</a></p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button" @click.prevent="closeContactModal">Close</button>
        </footer>
      </div>
    </b-modal>
    <b-modal id="how-it-works" :active.sync="isHowModalActive" width="600" has-modal-card @close="closeHowModal">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">How It Works</p>
        </header>
        <section class="modal-card-body">
          <div class="content">
            <p>First, an analogy: think of it as having a friend that lives in California. The release schedule only cares about where you are, so your friend can see scores on July 5th! You give your friend your username and password. Your friend checks your scores, and reads them back to you.</p>
            <p>Now, this website isn't exactly your best friend, but it's close enough (bonus: websites don't laugh at bad scores). The idea is the same, though: take your login info, pretend you're in California, get you your scores. Now on to a more technical breakdown:</p>
            <ul>
              <li>
                Your login info is encrypted with the industry-standard AES256 algorithm and sent over a secure HTTPS connection at one of our servers in California. The server uses the info to log into apscores.org as you, then fetches your scores. Then, it parses the page, and forwards your scores back to you over an encrypted HTTPS connection.
                <ul>
                  <li>Bonus: apscores.org always gets overloaded. This website helps you refresh as soon as the scores page comes back, so you don't need to sit there <i>spamming REEELOAD</i></li>
                </ul>
              </li>
              <li>Throughout the entire process, your password is never stored and never logged. The only things that get to see your password are College Board's servers.</li>
            </ul>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button" @click.prevent="closeHowModal">Close</button>
        </footer>
      </div>
    </b-modal>
  </section>
</template>

<script>
import APScoreCountdown from "~/components/APScoreCountdown.vue";
import APScoreViewer from "~/components/APScoreViewer.vue";
import ScoreFeatureCards from "~/components/ScoreFeatureCards.vue";

export default {
  components: {
    APScoreCountdown,
    APScoreViewer,
    ScoreFeatureCards
  },
  head: {
    meta: [
      { hid: 'description', name: 'description', content: 'Get your AP scores early on July 5th, no matter where you are! Fast, free, and convenient.' }
    ],
    title: "Early AP Scores! | AP Students"
  },
  data() {
    return {
      isContactModalActive: false,

      isHowModalActive: false,
    };
  },
  methods: {
    closeContactModal() {
      this.isContactModalActive = false;
      window.location.hash = "";
    },
    closeHowModal() {
      this.isHowModalActive = false;
      window.location.hash = "";
    },
    showHowModal() {
      this.isHowModalActive = true;
      window.location.hash = "#how-it-works";
    }
  },
  watch: {
    $route(to, from) {
      if(from.hash !== to.hash) {
        if(to.hash === "#contact") {
          this.isContactModalActive = true;
        }
      }
    }
  },
  mounted() {
    if(this.$route.hash === "#how-it-works") {
      this.showHowModal();
    } else if(this.$route.hash === "#contact") {
      this.isContactModalActive = true;
    }
  }
}
</script>

<style>
@media screen and (max-width: 768px) {
  .b-table .table.has-mobile-cards tr:not(.detail):not(.is-empty):not(.table-footer) td {
    justify-content: flex-start;
    text-align: left;
  }
}
</style>
