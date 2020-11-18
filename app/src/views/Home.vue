<template>
  <div class="home container mt-0 h100">
    <div class="mb-3 search-parent p-2">
      <b-row class="search-bar flex-fill" no-gutters>
        <b-col md="5" class="col-12">
          <b-input-group size="md"
            ><b-form-input
              @keypress.enter="searchAll"
              v-model="searchItem"
              type="text"
              placeholder="Recherche par titre"
            ></b-form-input
            ><b-input-group-append class="x-button">
              <b-button variant="info" @click="reset"
                ><strong>x</strong></b-button
              >
            </b-input-group-append></b-input-group
          >
          <b-icon icon="search" class="h4 pb-1 search-icon"></b-icon>
        </b-col>
        <b-col md="3" class="col-4">
          <b-form-select
            @change="searchAll"
            v-model="selectedLang"
            :options="options"
            size="md"
          />
        </b-col>
        <b-col md="2" class="col-4">
          <div>
            <b-form-select
              @change="searchAll"
              v-model="selectedLevel"
              :options="niveau"
              size="md"
            />
          </div>
        </b-col>
        <b-col md="2" class="col-4">
          <b-form-select
            @change="searchAll"
            v-model="sorting"
            :options="tri"
            size="md"
          />
        </b-col>
      </b-row>
    </div>

    <div class="d-flex justify-content-around flex-wrap">
      <QuizCard v-for="item in quizzes" :key="item.id" :quiz="item"></QuizCard>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import QuizCard from "@/components/QuizCard.vue";
import AdminQuiz from "../apis/AdminQuiz";
import Quiz from "../apis/Quiz";
import Search from "../apis/Search";
import User from "../apis/User";

export default {
  name: "Home",
  components: {
    QuizCard,
  },
  data() {
    return {
      search: { filter: null, text: "" },
      categories: [],
      quizzes: [],
      selectedLang: "",
      selectedLevel: "",
      searchItem: null,
      sorting: "desc",
      options: [],
      niveau: [
        { value: "", text: "Niveau : tous" },
        { value: "Facile", text: "Facile" },
        { value: "Moyen", text: "Moyen" },
        { value: "Difficile", text: "Difficile" },
      ],
      tri: [
        { value: "desc", text: "Plus récents" },
        { value: "asc", text: "Plus anciens" },
      ],
    };
  },

  async mounted() {
    const categories = await AdminQuiz.getCategories();
    this.options = [{ text: "Techno/langage : tous", value: "" }].concat(
      categories.data
    );
  },

  beforeMount() {
    //this.getAuth();
    this.getAllQuizzes();
  },

  updated() {
    /*     if (this.$store.getters.loggedIn && !this.$store.state.user) {
      this.getAuth();
    } */
    //this.getAllQuizzes();
  },

  methods: {
    search_text() {
      var inside = this;
    },
    async getAllQuizzes() {
      Quiz.getPublishedQuizzes().then((result) => {
        this.quizzes = result.data;
      });
    },

    async searchAll() {
      const payload = {};
      if (this.searchItem) {
        payload.query = this.searchItem;
      } else {
        payload.query = " ";
      }

      payload.category = this.selectedLang;
      payload.level = this.selectedLevel;
      payload.sort = this.sorting;
      Search.multiSearch({ data: payload }).then((result) => {
        //console.log(result.data);
        this.quizzes = result.data;
      });
    },

    reset() {
      this.selectedLang = "";
      this.selectedLevel = "";
      this.searchItem = "";
      this.sorting = "desc";
      this.getAllQuizzes();
    },
  },
};
</script>

<style scoped></style>
