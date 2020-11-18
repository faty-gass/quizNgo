<template>
  <b-container class="pt-2 container mb-4">
    <b-row no-gutters class=" justify-content-between mb-2">
      <b-col md="4" class="pt-3 h5">
        <strong>
          {{ quiz.name }}
        </strong>
      </b-col>
      <b-col md="4" class="pt-3 h5 text-center">
        Techno : {{ quiz.category.name }}
      </b-col>
      <b-col md="4" class="d-flex justify-content-end">
        <div class="h1 mb-0 mr-3" md="1">
          <DifficultyIcon :difficulty="quiz.difficulty"></DifficultyIcon>
        </div>
        <div class="pt-3 h5 mb-0 mr-3">
          <b-icon icon="stopwatch" variant="primary"></b-icon
          >{{ quiz.bonus_time }} min
        </div>
        <div class="pt-3 h5  mb-0">
          <b-icon icon="award" variant="primary"></b-icon>+
          {{ quiz.bonus_xp }} pts
        </div>
      </b-col>
    </b-row>

    <div v-for="(question, q_index) in questions" :key="q_index" class="shadow">
      <b-card shadow no-body class="mb-1">
        <b-card-header class="p-0 bg-light">
          <div class="d-flex justify-content-between pt-2 pb-2 px-2">
            <h5 class="mb-0">Question {{ q_index + 1 }}</h5>
            <h5 class="text-nowrap mb-0">
              {{ questions[q_index].xps }} points
            </h5>
          </div>
        </b-card-header>
        <b-card-body class="h-100 overflow-auto">
          <strong>
            <div class="my-2">{{ questions[q_index].question }}</div>
          </strong>
          <div v-if="isMulti(questions[q_index].answers)">
            <div
              v-for="(answer, a_index) in questions[q_index].answers"
              :key="a_index"
            >
              <div class="ml-1 p-1">
                <b-form-checkbox
                  disabled
                  v-model="questions[q_index].answers[a_index].is_correct"
                >
                  {{ questions[q_index].answers[a_index].answer }}
                </b-form-checkbox>
              </div>
            </div>
          </div>
          <div v-else class="ml-4">
            <div
              v-for="(answer, a_index) in questions[q_index].answers"
              :key="a_index"
            >
              <b-form-radio
                disabled
                class="ml-1 p-1"
                :name="'options-' + q_index"
                :value="a_index"
                :checked="getCorrect(questions[q_index].answers)"
                >{{ questions[q_index].answers[a_index].answer }}</b-form-radio
              >
            </div>
          </div>
        </b-card-body>
      </b-card>
    </div>
  </b-container>
</template>

<style>
.custom-radio {
  margin-bottom: 5px;
}
</style>

<script>
import DifficultyIcon from "../components/DifficultyIcon";
import AdminQuiz from "../apis/AdminQuiz";
export default {
  props: ["quiz", "questions"],
  components: {
    DifficultyIcon,
  },
  data: () => {
    return {};
  },
  methods: {
    isMulti(answers) {
      let cpt = 0;
      answers.forEach((answer) => {
        if (answer.is_correct) cpt++;
      });
      return cpt > 1;
    },
    getCorrect(answers) {
      return answers.findIndex((a) => a.is_correct == true);
    },
  },
};
</script>
