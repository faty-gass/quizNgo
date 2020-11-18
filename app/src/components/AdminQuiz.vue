<template>
  <b-container class="py-3">
    <div class="text-center">
      <b-button to="/newquiz" class="my-4" variant="success"
        >Ajouter un Quiz</b-button
      >
    </div>

    <!--Labels -->
    <b-row no-gutter id="labels" class="text-center" align-v="center">
      <b-col md="4">
        <strong> Titre </strong>
      </b-col>
      <b-col md="3">
        <strong> Techno </strong>
      </b-col>
      <b-col md="1">
        <strong> Difficulté </strong>
      </b-col>
      <b-col> </b-col>
      <b-col> </b-col>
    </b-row>

    <!--Cards -->
    <div v-for="(quiz, idx) in quizz" :key="idx">
      <b-row no-gutter id="quizCard" class="text-center" align-v="center">
        <b-col md="4">
          <b-link :to="'/quiz/' + quiz.id">
            <strong>
              {{ quiz.name }}
            </strong>
          </b-link>
        </b-col>
        <b-col md="3">
          {{ quiz.category.name }}
        </b-col>
        <b-col v-if="quiz.difficulty === 'Facile'" class="h1" md="1">
          <b-icon icon="reception1" variant="success" class="mr-1"></b-icon>
        </b-col>
        <b-col v-if="quiz.difficulty === 'Moyen'" class="h1" md="1">
          <b-icon icon="reception2" variant="warning" class="mr-1"></b-icon>
        </b-col>
        <b-col v-if="quiz.difficulty === 'Difficile'" class="h1" md="1">
          <b-icon icon="reception3" variant="danger" class="mr-1"></b-icon>
        </b-col>
        <b-col md="2">
          <b-button
            :to="'/editquiz/' + quiz.id"
            variant="warning"
            class="btn-block"
          >
            <b-icon icon="pencil" variant="dark" class="mr-1"></b-icon>
            Modifier
          </b-button>
        </b-col>
        <b-col md="2">
          <b-button
            :id="quiz.id"
            :variant="quiz.is_published ? 'outline-success' : 'success'"
            class="btn-block"
            @click="publishToggle(idx)"
          >
            <b-icon
              :icon="quiz.is_published ? 'box-arrow-in-down' : 'box-arrow-up'"
              :variant="quiz.is_published ? 'success' : 'light'"
              class="mr-1"
            ></b-icon>
            {{ quiz.is_published ? "Dépublier" : "Publier" }}
          </b-button>
        </b-col>
      </b-row>
    </div>
    <!--  -->
  </b-container>
</template>

<script>
import AdminQuiz from "../apis/AdminQuiz";
export default {
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
      user: null,
      notifCount: 0,
      quizz: [],
    };
  },
  xupdated() {
    if (this.isLoggedIn && !this.user) {
      User.auth().then((response) => {
        this.user = response.data;
        this.isAdmin = this.user.role == "admin";
      });
    }
  },
  mounted() {
    AdminQuiz.getQuizzes().then((response) => {
      this.quizz = response.data;
    });
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.user = null;
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.$router.push({ name: "Home" });
    },

    publishToggle(idx) {
      let quizId = this.quizz[idx].id;
      let pubStatus = this.quizz[idx].is_published;
      AdminQuiz.updateQuiz({ quizId, data: { is_published: !pubStatus } }).then(
        (response) => {
          this.quizz[idx].is_published = !pubStatus;
        }
      );
    },
  },
};
</script>

<style scoped>
#quizCard {
  margin-top: 10px;
  border: 1px solid #498824;
  border-radius: 10px;
  vertical-align: middle;
}

#labels {
  margin-top: 20px;
}
</style>
