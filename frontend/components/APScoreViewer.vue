<template>
  <div>
    <transition name="drawdown">
      <b-notification v-if="!!errorMessage" :closable="false" type="is-danger" v-html="errorMessage" />
    </transition>

    <transition name="drawdown">
      <b-notification v-if="!!warningMessage" :closable="false" type="is-warning" v-text="warningMessage" />
    </transition>

    <transition name="drawdown">
      <div v-if="scoreYears" :class="{'is-stale-text': isStale}">
        <h3 class="is-size-3">Your Scores</h3>
        <div v-for="scoreYear in scoreYears" :key="scoreYear.name">
          <hr>
          <h4 class="is-size-4" v-text="scoreYear.name"></h4>
          <div class="b-table">
            <div class="table-wrapper">
              <table class="table has-mobile-cards score-table">
                <tbody>
                  <tr v-for="scoreRow in scoreYear.scores" :key="scoreRow.name" :class="{'is-subscore': scoreRow.isSubscore}">
                    <td class="score-name" v-text="scoreRow.name" />
                    <td class="score-value" v-text="scoreRow.value" />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <p v-if="scoreYears.length === 0">You have no scores yet.</p>
        <hr>
      </div>
    </transition>

    <transition name="drawdown">
      <div v-if="!scoreYears">
        <h3 class="is-size-3">Login</h3>
        <b-field label="Username">
          <b-input v-model="field3" :has-counter="false" maxlength="20" minlength="4" required :disabled="tempDisabled" @keyup.native.enter="submitForm"></b-input>
        </b-field>
        <b-field label="Password">
          <b-input v-model="field2" type="password" required :disabled="tempDisabled" @keyup.native.enter="submitForm"></b-input>
        </b-field>
        <br>
      </div>
    </transition>
    <b-field>
      <p class="control">
        <button v-if="loading" class="button is-loading" disabled>Loading...</button>
        <button v-else-if="scoreYears" class="button" :disabled="!canRefresh || loading || !field2 || !field3" @click.prevent="submitForm">
          Refresh<template v-if="!canRefresh"> (wait a bit...)</template>
        </button>
        <button v-else class="button is-success" :disabled="!canRefresh || loading || !field2 || !field3" @click.prevent="submitForm">
          Get My Scores!<template v-if="!canRefresh"> (wait a bit...)</template>
        </button>
      </p>
    </b-field>

    <b-modal :active.sync="isAgreeModalActive" has-modal-card>
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">College Board Terms and Conditions</p>
        </header>
        <section class="modal-card-body">
          <transition name="drawdown">
            <b-notification v-if="!!errorMessage" :closable="false" type="is-danger" v-html="errorMessage" />
          </transition>
          <p v-html="agreeModalText" />
          <b-checkbox v-model="isAgreeChecked">I accept these Terms and Conditions</b-checkbox>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-danger" @click.prevent="$parent.close()">Disagree</button>
          <button v-if="agreeLoading" class="button is-loading" disabled>Loading...</button>
          <button v-else class="button" :disabled="agreeLoading || !isAgreeChecked" @click.prevent="agreeTerms">Agree</button>
        </footer>
      </div>
    </b-modal>

    <b-modal :active.sync="isNumbersModalActive" has-modal-card>
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Enter your AP Number/Student ID</p>
        </header>
        <section class="modal-card-body">
          <transition name="drawdown">
            <b-notification v-if="!!errorMessage" :closable="false" type="is-danger" v-html="errorMessage" />
          </transition>
          <p>You must enter either:</p>
          <ul>
            <li>- Your AP Number and the year it was from, <b>OR</b></li>
            <li>- Your Student ID (if you have one)</li>
          </ul>
          <div class="field">
            <b-switch v-model="numbersSelectedStudentID">
              <span v-if="numbersSelectedStudentID">Student ID</span>
              <span v-else>AP Number</span>
            </b-switch>
          </div>
          <template v-if="!numbersSelectedStudentID">
            <b-field v-if="!numbersSelectedStudentID" label="AP Number Year">
              <b-select v-model="apNumberYear" :required="!numbersSelectedStudentID">
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
              </b-select>
            </b-field>
            <b-field label="AP Number" :type="isInvalidAPNumber ? 'is-danger' : ''" :message="isInvalidAPNumber ? 'Invalid 8-digit AP number' : ''">
              <b-input v-model="apNumber" :required="!numbersSelectedStudentID" type="number"></b-input>
            </b-field>
          </template>
          <b-field v-else label="Student ID">
            <b-input v-model="studentID" :has-counter="false" :required="numbersSelectedStudentID" type="text" maxlength="25"></b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <button v-if="numbersLoading" class="button is-loading" disabled>Loading...</button>
          <button v-else class="button" :disabled="numbersLoading || !(studentID || (!isInvalidAPNumber && apNumberYear))" @click.prevent="submitNumbers">Submit</button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      field2: "",
      field3: "",

      scoreYears: null,
      token: null,

      errorMessage: null,
      warningMessage: null,

      canRefresh: true,
      isStale: false,
      loading: false,
      tempDisabled: false,

      agreeModalText: null,
      agreeLoading: false,
      isAgreeChecked: false,
      isAgreeModalActive: false,

      isNumbersModalActive: false,
      numbersSelectedStudentID: false,
      numbersLoading: false,
      apNumber: "",
      apNumberYear: "",
      studentID: "",
    };
  },
  computed: {
    isInvalidAPNumber() {
      if(!this.apNumber || isNaN(this.apNumber) || this.apNumber.toString().includes(".")) {
        return true;
      }
      let apNumber = parseInt(this.apNumber);
      if(!apNumber || apNumber < 10000000 || apNumber > 99999999) {
        return true;
      }

      return false;
    }
  },
  methods: {
    async getScores(isCachedToken) {
      const scoreYears = await this.$axios.$post("/cb/scores/ape", {
        session: this.token
      }).catch((err) => {
        if(err.response) {
          if(err.response.status === 403 && (!err.response.data || !err.response.data.error || err.response.data.error.includes("invalid login"))) {
            this.token = null;

            if(isCachedToken) {
              this.loading = false;
              this.canRefresh = true;
              return this.submitForm();
            } else {
              this.errorMessage = "Error getting scores: invalid username or password";
            }

            err.handled = true;
          }
        }

        return Promise.reject(err);
      });

      for(let scoreYear of scoreYears) {
        if(scoreYear.scores) {
          scoreYear.scores = this.flattenSubscores(scoreYear.scores);
        }
      }

      return scoreYears;
    },
    async getToken() {
      const resp = await this.$axios.$post("/cb/login", {
        field2: this.field2,
        field3: this.field3
      });
      const token = resp.token;
      if(!token) {
        throw new TypeError("Error logging in: missing token");
      }

      this.token = token;
    },
    async postTerms() {
      this.agreeLoading = true;

      const resp = await this.$axios.$post("/cb/terms", {
        session: this.token
      }).catch((err) => {
        this.agreeLoading = false;

        if(err.response) {
          if(err.response.data && err.response.data.error) {
            this.errorMessage = err.response.data.error;
          } else {
            this.errorMessage = "CollegeBoard.org is not responding, try again in a bit";
          }
        } else {
          this.errorMessage = err.message;
        }

        err.handled = true;
        return Promise.reject(err);
      });
      this.agreeLoading = false;

      const token = resp.token;
      if(!token) {
        throw new TypeError("Error accepting terms: missing token");
      }

      this.token = resp.token;
    },
    async agreeTerms() {
      if(this.agreeLoading) {
        return;
      }

      await this.postTerms();
      this.isAgreeModalActive = false;
      await this.submitForm();
    },
    async postNumbers() {
      this.numbersLoading = true;

      const resp = await this.$axios.$post("/cb/numbers", {
        session: this.token,
        apNumber: this.apNumber,
        apNumberYear: this.apNumberYear,
        studentID: this.studentID
      }).catch((err) => {
        this.numbersLoading = false;

        if(err.response) {
          if(err.response.data && err.response.data.error) {
            this.errorMessage = err.response.data.error;
          } else {
            this.errorMessage = "CollegeBoard.org is not responding, try again in a bit";
          }
        } else {
          this.errorMessage = err.message;
        }

        err.handled = true;
        return Promise.reject(err);
      });
      this.numbersLoading = false;

      const token = resp.token;
      if(!token) {
        throw new TypeError("Error submitting data: missing token");
      }

      this.token = resp.token;
    },
    async submitNumbers() {
      if(this.numbersLoading) {
        return;
      }

      await this.postNumbers();
      this.isNumbersModalActive = false;
      await this.submitForm();
    },
    async submitForm() {
      if(this.loading || !this.canRefresh) {
        return;
      }
      this.errorMessage = null;
      this.warningMessage = null;
      this.isStale = true;
      this.loading = true;

      let warningTimeout = setTimeout(() => {
        this.warningMessage = "CollegeBoard.org is overloaded, retrying...";
      }, 5000);

      try {
        if(this.token) {
          this.scoreYears = await this.getScores(true);
        } else {
          await this.getToken();
          this.scoreYears = await this.getScores();
        }
        this.isStale = false;
      } catch(err) {
        if(err.handled) {
          return;
        }

        if(err.response) {
          if(err.response.data) {
            if(err.response.data.status === 429) {
              this.errorMessage = "Too many requests, try again in a bit."
            } else if(err.response.data.error) {
              if(err.response.data.error.includes("terms and conditions")) {
                if(err.response.data.extra) {
                  this.errorMessage = err.response.data.error;

                  this.agreeModalText = err.response.data.extra;
                  this.isAgreeModalActive = true;
                } else {
                  this.errorMessage = err.response.data.error;
                }
              } else if(err.response.data.error.includes("verify your account")) {
                this.errorMessage = err.response.data.error;

                this.isNumbersModalActive = true;
              } else if(err.response.data.error.includes("https://account.collegeboard.org/login/forgotPassword")) {
                this.errorMessage = err.response.data.error.replace("https://account.collegeboard.org/login/forgotPassword", "<a href=\"https://account.collegeboard.org/login/forgotPassword\">https://account.collegeboard.org/login/forgotPassword</a>");
              } else {
                this.errorMessage = err.response.data.error;
              }
            } else {
              this.errorMessage = "CollegeBoard.org is not responding, try again in a bit";
            }
          } else {
            this.errorMessage = "CollegeBoard.org is not responding, try again in a bit";
          }
        } else {
          this.errorMessage = err.message;
        }
      }

      clearTimeout(warningTimeout);
      this.warningMessage = null;

      this.canRefresh = false;
      setTimeout(() => {
        this.canRefresh = true;
      }, 2000);

      this.loading = false;
    },
    flattenSubscores(scores) {
      let newScores = [];
      for(let score of scores) {
        newScores.push({
          name: score.name,
          value: score.value
        });
        if(score.subscores) {
          for(let subscore of score.subscores) {
            newScores.push({
              name: subscore.name,
              value: subscore.value,
              isSubscore: true
            });
          }
        }
      }
      return newScores;
    }
  }
}
</script>

<style scoped>
hr {
  margin: 0.5rem 0;
}

.is-stale-text {
  text-decoration: line-through;
}

.modal-card-foot {
  -ms-flex-pack: end;
  justify-content: flex-end;
}

tr.is-subscore {
  font-size: 0.8em;
}
tr.is-subscore .score-name {
  padding-left: 1.5em;
}
td.score-value {
  text-align: center;
  width: 100px;
}
</style>
