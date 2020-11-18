<template>
  <b-container class="pt-2 mb-4">
    <div class="sticky-top bg-theme mt-2 pb-1 rounded">
      <b-row no-gutters align-v="center" class="mb-2 pt-2">
        <b-col
          md="6"
          class="text-center d-flex flex-wrap justify-content-around"
        >
          <h5>
            <strong>
              {{ quiz.name }}
            </strong>
          </h5>
          <div class="h5 text-nowrap text-muted info">
            <b-icon icon="gear" variant="info"></b-icon>
            {{ quiz.category.name }}
          </div>
        </b-col>

        <b-col md="6" class="d-flex flex-nowrap justify-content-around">
          <div class="h1 mb-0" md="1">
            <DifficultyIcon :difficulty="quiz.difficulty"></DifficultyIcon>
          </div>
          <div class="align-self-end h5 text-nowrap text-muted">
            <b-icon icon="stopwatch" variant="info"></b-icon>
            {{ quiz.bonus_time }} min
          </div>
          <div class="align-self-end h5 text-nowrap text-muted">
            <b-icon icon="award" variant="info"></b-icon>+
            {{ quiz.bonus_xp }} pts
          </div>
        </b-col>
      </b-row>
      <!-- Running -->
      <div
        class="bg-light run-status d-flex flex-row justify-content-around mb-2 pt-2 mx-1 rounded"
      >
        <h4>
          <b-icon icon="stopwatch" variant="info"></b-icon>
          {{ timer | moment("mm:ss") }}
        </h4>
        <h4 :class="classBonus">
          <b-icon icon="alarm" variant="success" :class="classTimer"></b-icon>
          {{ chrono | moment("mm:ss") }}
        </h4>
        <h4 :class="classBonus">
          <b-icon icon="award" variant="success" :class="classTimer"></b-icon>
          {{ bonus }} pts
        </h4>
      </div>

      <div v-if="!correcting && running" class="text-center">
        <b-button
          class="my-3 px-4 btn-info"
          @click="submitAnswers"
          :disabled="
            this.answerCount == 0 || this.answerCount !== this.questionCount
          "
        >
          <strong>
            <span :class="classSubmit" class="mr-3">
              reste à répondre : {{ questionCount - answerCount }}
            </span>
            Envoyer &gt;
          </strong>
        </b-button>
      </div>
    </div>
    <b-card no-body v-if="correcting" class="mt-2">
      <b-card-header
        class="text-center d-inline-block p-0 bg-info text-light pt-2"
      >
        <h4 class="mx-1">
          Résultat <strong>{{ results.success_rate }} %</strong>
        </h4>
      </b-card-header>
      <b-card-body class="d-flex justify-content-around flex-wrap p-4">
        <div class="d-flex flex-nowrap">
          <h4><b-icon icon="stopwatch" variant="info" /> Durée &nbsp;</h4>
          <h4 class="mx-1 text-nowrap">
            <strong>{{ this.timer | moment("mm:ss") }} min</strong>
          </h4>
        </div>
        <div class="d-flex flex-nowrap">
          <h4 class="mx-1">
            <b-icon icon="award" variant="info" />
            xps obtenus &nbsp;
          </h4>
          <h4 class="mx-1">
            <strong>{{ results.score }} points</strong>
          </h4>
        </div>
        <div class="w-100 text-center">
          <b-button v-b-toggle.questions variant="info" class="mt-3"
            >Correction</b-button
          >
        </div>
      </b-card-body>
    </b-card>
    <div
      v-if="!running"
      class="scroll-zone text-center d-flex flex-column justify-content-center"
      vertical-align="center"
    >
      <b-button pill variant="success" size="lg" @click="startQuiz" class="mx-5"
        >Démarrer le Quiz</b-button
      >
    </div>

    <div></div>
    <!-- QUESTIONS -->
    <b-collapse :visible="!correcting" v-if="running" id="questions">
      <b-overlay :show="showOverlay" rounded="sm" class="overlay-zone">
        <div
          v-for="(question, q_index) in questions"
          :key="q_index"
          class="shadow"
        >
          <b-card no-body>
            <b-card-header class="p-0 bg-light">
              <div
                class="d-flex justify-content-between pt-2 pb-2 px-2"
                :class="classQuestion(q_index)"
              >
                <h5 class="mb-0">Question {{ q_index + 1 }}</h5>
                <h5 class="text-nowrap mb-0">{{ xps[q_index] }} points</h5>
              </div>
            </b-card-header>
            <b-card-body>
              <strong>
                <div class="my-2">{{ questions[q_index].question }}</div>
              </strong>
              <div v-if="questions[q_index].is_multi">
                <b-form-checkbox-group
                  v-model="answers[q_index]"
                  :name="'options-' + q_index"
                >
                  <div
                    v-for="(answer, a_index) in questions[q_index].answers"
                    :key="a_index"
                  >
                    <div class="ml-1 p-1">
                      <b-form-checkbox
                        :value="a_index"
                        :class="classAnswer(q_index, a_index)"
                      >
                        {{ answer.answer }}
                      </b-form-checkbox>
                    </div>
                  </div>
                </b-form-checkbox-group>
              </div>
              <div v-else class="ml-4">
                <b-form-radio-group
                  v-model="answers[q_index][0]"
                  stacked
                  :name="'options-' + q_index"
                >
                  <div
                    v-for="(answer, a_index) in questions[q_index].answers"
                    :key="a_index"
                  >
                    <b-form-radio
                      :value="a_index"
                      class="ml-1 p-1"
                      :class="classAnswer(q_index, a_index)"
                    >
                      {{ answer.answer }}
                    </b-form-radio>
                  </div>
                </b-form-radio-group>
              </div>
            </b-card-body>
          </b-card>
        </div>
      </b-overlay>
    </b-collapse>

    <b-card
      no-body
      v-if="
        correcting || (this.$store.state.user && this.$store.getters.isAdmin)
      "
      class="mt-2"
    >
      <b-card-header class="text-center p-0 bg-info text-light pt-2">
        <h4>Réactions</h4>
      </b-card-header>
      <b-card-body class="p-2">
        <Ratings
          v-if="this.$store.state.user"
          :quizId="quiz.id"
          :userId="this.$store.state.user.id"
        ></Ratings>
        <div v-else class="mw-50">
          <b-form-rating
            v-if="quiz.avg_rating > 0"
            v-model="quiz.avg_rating"
            no-border
            size="sm"
            variant="info"
            readonly
          ></b-form-rating>
          <small v-else class="text-muted">pas de note encore</small>
        </div>
        <Comments :quizId="quiz.id"></Comments>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
import Quiz from "../apis/Quiz";
import Comments from "../components/Comments";
import Ratings from "../components/Ratings";
import DifficultyIcon from "../components/DifficultyIcon";

export default {
  components: {
    DifficultyIcon,
    Comments,
    Ratings,
  },
  data: () => {
    return {
      running: false,
      correcting: false,
      showOverlay: false,
      quiz: {
        id: null,
        category: { _id: null, name: null },
        name: null,
        difficulty: null,
        bonus_time: null,
        bonus_xp: null,
        is_published: false,
      },
      questions: [],
      questionCount: 0,
      answers: [],
      answerCount: 0,
      chrono: null,
      timer: null,
      polling: null,
      userId: null,
      bonus: null,
      timeout: null,
      results: {},
      xps: [],
    };
  },

  updated() {
    let cpt = 0;
    this.answers.forEach((answerArray) => {
      if (answerArray.length) cpt++;
    });
    this.answerCount = cpt;
  },

  async mounted() {
    try {
      this.userId = this.$store.state.user ? this.$store.state.user.id : null;
      const quizId = this.$route.params.quiz_id;
      if (quizId) {
        const quizReq = await Quiz.getQuiz(quizId);
        this.quiz = quizReq.data;
        let time = new Date();
        time.setMinutes(quizReq.data.bonus_time);
        time.setSeconds(0);
        this.timer = new Date();
        this.timer.setMinutes(0);
        this.timer.setSeconds(0);
        this.chrono = time;
        this.bonus = quizReq.data.bonus_xp;
      }
    } catch (err) {
      this.toast("Erreur!", err.message, true);
    }
  },

  methods: {
    async startQuiz() {
      try {
        this.running = true;
        this.showOverlay = true;
        const questionsReq = await Quiz.getQuestions(this.quiz.id);
        this.questions = questionsReq.data;
        this.questionCount = questionsReq.data.length;
        this.xps = questionsReq.data.map((question) => question.xps);
        this.answers = questionsReq.data.map((question) => []);
        this.showOverlay = false;
        this.polling = setInterval(() => {
          if (!this.timeout) {
            this.chrono = new Date(this.chrono);
            this.chrono.setSeconds(this.chrono.getSeconds() - 1);
          }
          this.timer = new Date(this.timer);
          this.timer.setSeconds(this.timer.getSeconds() + 1);
          if (
            this.chrono.getSeconds() === 0 &&
            this.chrono.getMinutes() === 0
          ) {
            this.timeout = true;
            this.bonus = 0;
          }
          if (this.timer.getSeconds() === 0 && this.timer.getMinutes() === 30) {
            clearInterval(this.polling);
          }
        }, 1000);
      } catch (err) {
        this.toast("Erreur!", err.message, true);
        this.showOverlay = false;
        clearInterval(interval);
      }
    },

    beforeDestroy() {
      clearInterval(this.polling);
    },

    async submitAnswers() {
      clearInterval(this.polling);
      const getResults = await Quiz.getResults({
        userId: this.userId,
        quizId: this.quiz.id,
        answers: this.answers,
        timeout: this.timeout,
      });

      this.correcting = true;
      this.results = getResults.data;
      this.bonus =
        parseInt(this.results.success_rate) < 75 || this.timeout
          ? 0
          : this.quiz.bonus_xp;
      this.xps = getResults.data.results.map((result) => result.xps);

      this.showComments = true;
    },

    toast(title, message, faulty = false) {
      this.$root.$bvToast.toast(message, {
        title: title,
        toaster: "b-toaster-top-center",
        variant: faulty ? "danger" : "success",
        appendToast: true,
      });
    },

    classQuestion: function (idx) {
      return {
        "text-danger":
          this.correcting && !this.results.results[idx].is_good_answer,
        "text-success":
          this.correcting && this.results.results[idx].is_good_answer,
      };
    },

    classAnswer: function (q_index, a_index) {
      const user_answser = this.correcting
        ? this.results.results[q_index].user_answers.find(
            (a) => a == a_index
          ) != undefined
        : false;
      const good_answser = this.correcting
        ? this.results.results[q_index].good_answers.find(
            (a) => a == a_index
          ) != undefined
        : false;
      return {
        "text-success": good_answser,
        "text-danger": user_answser && !good_answser,
      };
    },
  },
  computed: {
    classBonus: function () {
      return {
        "text-danger":
          this.correcting &&
          (parseInt(this.results.success_rate) < 75 || this.timeout),
        "text-success":
          !this.timeout &&
          this.correcting &&
          parseInt(this.results.success_rate) > 75,
      };
    },
    classTimer: function () {
      return {
        "text-danger": this.running && this.timeout,
        "text-success": !this.timeout && this.running,
        "text-warning":
          !this.timeout &&
          this.running &&
          this.chrono.getMinutes() === 0 &&
          this.chrono.getSeconds() <= 15,
      };
    },
    classSubmit: function (idx) {
      return {
        "text-warning": this.running && this.questionCount !== this.answerCount,
      };
    },
  },
};
</script>
