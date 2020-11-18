<template>
  <div class="mt-5">
    <div class="d-flex flex-wrap justify-content-around">
      <b-col md="4" class="text-center col-6 py-2">
        <b-button to="/newquiz" variant="success"
          ><b-icon icon="plus-circle" /> Nouveau Quiz</b-button
        >
      </b-col>
      <b-col md="4" class="text-center col-6 py-2">
        <b-button variant="success" v-b-modal.categories-panel
          ><b-icon icon="gear" /> Categories</b-button
        >
      </b-col>
      <b-col md="4" class="text-center col-12 py-2">
        <b-form-select
          @change="filter"
          v-model="selectedLang"
          :options="options"
          class="w-75 mx-3"
          size="md"
      /></b-col>
    </div>

    <b-container class="mt-5">
      <div v-for="(quiz, idx) in quizz" :key="idx">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" role="tab" class="p-0">
            <b-container
              fluid
              class="p-2 bg-light d-flex flex-wrap justify-content-between"
            >
              <b-col
                md="4"
                class="pt-2 d-flex flex-column justify-content-between"
              >
                <b-link :to="'/quiz/' + quiz.id" class="text-theme">
                  <strong> {{ quiz.name }}</strong></b-link
                >
                <span>{{ quiz.category.name }}</span>

                <div class="d-flex flex-nowrap my-2">
                  <div>
                    <b-button
                      :to="'/editquiz/' + quiz.id"
                      variant="success"
                      class="btn-block"
                    >
                      <b-icon
                        icon="pencil"
                        variant="white"
                        class="mr-1"
                      ></b-icon>
                      Modifier
                    </b-button>
                  </div>
                  <div class="text-center align-self-center mx-auto">
                    <b-form-checkbox
                      v-model="quiz.is_published"
                      name="check-button"
                      switch
                      @change="publishToggle(idx)"
                      ><strong>{{
                        quiz.is_published ? "Publié" : "Publier"
                      }}</strong>
                    </b-form-checkbox>
                  </div>
                </div>
                <small class="text-color-black-50 mb-2">
                  Ajouté le {{ quiz.created_at | moment("DD MMM Y") }}
                  <br />
                  Dernière modification le
                  {{ quiz.updated_at | moment("DD MMM Y") }}
                </small>
              </b-col>
              <b-col
                md="4"
                class="align-self-center d-flex flex-wrap justify-content-around"
              >
                <div class="text-center">
                  <div>Difficulté</div>
                  <DifficultyIcon
                    :difficulty="quiz.difficulty"
                    class="h1 m-0"
                  />
                </div>
                <div>
                  <p class="mx-4">Taux de réussite</p>
                  <b-progress
                    height="28px"
                    :value="quiz.success_ratio"
                    :variant="
                      quiz.success_ratio < 33
                        ? 'danger'
                        : quiz.success_ratio < 66
                        ? 'warning'
                        : 'success'
                    "
                    show-progress
                    class="mb-3 align-self-center"
                  >
                  </b-progress>
                </div>
              </b-col>
              <b-col
                md="4"
                class="pt-2 d-flex flex-column justify-content-around"
              >
                <div>
                  <span>Note</span>
                  <b-form-rating
                    v-model="quiz.avg_rating"
                    size="sm"
                    variant="info"
                    readonly
                    show-value
                    precision="2"
                  ></b-form-rating>
                </div>
                <div class="text-center my-2">
                  <b-link :to="'/quiz/' + quiz.id" class="text-theme">
                    <strong>{{ quiz.commentsCount }}</strong> commentaire{{
                      quiz.commentsCount ? "s" : ""
                    }}</b-link
                  >
                </div>
              </b-col>
            </b-container>
          </b-card-header>
        </b-card>
      </div>
    </b-container>
    <!-- MODAL CATEORIES-->
    <b-modal id="categories-panel" title="Categories" @hide="catClose">
      <b-container class="container">
        <b-form>
          <div class="d-flex">
            <b-input
              type="text"
              v-model="newCat"
              placeholder="Nouvelle valeur..."
            />
            <b-icon
              icon="plus-circle"
              class="h4 mt-2 ml-1 pointer"
              variant="info"
              @click="addCat"
            />
          </div>
          <div v-for="(cat, idx) in cats" :key="idx">
            <div class="d-flex">
              <b-input type="text" v-model="cat.text" @input="catChange(idx)" />
              <b-icon
                v-if="cat.dirty"
                class="h4 mt-2 ml-1 pointer"
                icon="check-circle"
                variant="success"
                @click="saveCat(idx)"
              />
              <b-icon
                v-else
                class="h4 mt-2 ml-1 pointer"
                icon="trash"
                variant="danger"
                @click="removeCat(idx)"
              />
            </div>
          </div>
        </b-form>
      </b-container>
      <template v-slot:modal-footer>
        <b-container fluid class="d-flex justify-content-around">
          <b-button variant="info" @click="$bvModal.hide('categories-panel')"
            >Annuler</b-button
          >
          <!-- <b-button @click="saveCats()" variant="success">Valider</b-button> -->
        </b-container>
      </template>
    </b-modal>
  </div>
</template>

<script>
import AdminQuiz from "../apis/AdminQuiz";
import DifficultyIcon from "../components/DifficultyIcon";
import Search from "../apis/Search";

export default {
  components: {
    DifficultyIcon,
  },
  data() {
    return {
      quizz: [],
      allQuizz: [],
      selectedLang: "",
      options: [],
      comments: null,
      hearted: null,
      cats: [],
      newCat: "",
    };
  },

  async mounted() {
    const quizzes = await AdminQuiz.getAllQuizzWithStats();
    this.allQuizz = quizzes.data;
    this.quizz = quizzes.data;
    this.loadCats();
  },

  methods: {
    async loadCats() {
      let categories = await AdminQuiz.getCategories();
      categories.data.map((c) => {
        c.dirty = false;
        c.original = c.text;
      });
      this.cats = categories.data;
      this.options = [{ text: "Techno / Langage : tous", value: "" }].concat(
        categories.data
      );
    },
    catChange(idx) {
      this.cats[idx].dirty = this.cats[idx].text !== this.cats[idx].original;
    },
    catClose() {
      this.cats.map((c) => {
        if (c.value) {
          c.text = c.original;
          c.dirty = false;
        }
      });
    },
    async removeCat(idx) {
      try {
        const addCat = await AdminQuiz.deleteCategory(this.cats[idx].value);
        await this.loadCats();
        this.toast("Info", "Supprimé avec succès", false);
      } catch (e) {
        this.toast("Erreur!", e.response.data.message, true);
      }
    },
    async addCat() {
      try {
        const addCat = await AdminQuiz.addCategory({
          data: { name: this.newCat },
        });
        await this.loadCats();
        this.toast("Info", "Ajouté avec succès", false);
        this.newCat = "";
      } catch (e) {
        this.toast("Erreur!", e.message, true);
      }
    },
    async saveCat(idx) {
      try {
        const updateCat = await AdminQuiz.saveCategory({
          categoryId: this.cats[idx].value,
          data: { name: this.cats[idx].text },
        });
        await this.loadCats();
        this.toast("Info", "Mis à jour avec succès", false);
      } catch (e) {
        this.toast("Erreur!", e.message, true);
      }
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
    async filter() {
      if (this.selectedLang == "") {
        this.quizz = this.allQuizz;
      } else {
        this.quizz = this.allQuizz;
        const filteredQuizz = this.quizz.filter((quiz) => {
          return quiz.category._id === this.selectedLang;
        });
        this.quizz = filteredQuizz;
      }
    },
    toast(title, message, faulty = false) {
      this.$root.$bvToast.toast(message, {
        title: title,
        toaster: "b-toaster-top-center",
        variant: faulty ? "danger" : "success",
        appendToast: true,
      });
    },
  },
};
</script>
