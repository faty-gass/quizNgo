<template>
  <b-container class="pt-2 container h100">
    <b-overlay :show="showOverlay" rounded="sm">
      <div class="d-flex justify-content-between mt-3">
        <h3>
          {{
            preview
              ? "Visualiser Quiz"
              : editing
              ? "Modifier Quiz"
              : "Nouveau Quiz"
          }}
        </h3>
        <b-button
          variant="primary"
          class="mx-2"
          @click.prevent="preview = !preview"
          >{{ preview ? "Editer" : "Visualiser" }}</b-button
        >
      </div>
      <DisplayQuiz v-if="preview" :quiz="form" :questions="questions" />
      <b-form v-if="!preview" @submit="onSubmit" @reset="onReset">
        <b-row no-gutters>
          <b-col md="4">
            <b-form-group
              id="input-name"
              label="Nom:"
              label-for="name"
              class="mr-sm-2"
              col="sm"
            >
              <b-form-input
                id="name"
                col-md-10
                v-model="form.name"
                type="text"
                required
                placeholder="Entrez le nom du quiz"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group
              id="input-category"
              label="Langage ou Techno:"
              label-for="category"
              class="mr-sm-2 flex-grow-1"
            >
              <b-form-select
                id="category"
                v-model="form.category._id"
                :options="categories"
                required
                @change="selectCategory"
              ></b-form-select>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group
              id="input-difficulty"
              label="Difficulté:"
              label-for="difficulty"
            >
              <b-form-radio-group
                v-model="form.difficulty"
                :options="difficulties"
                class="my-3 ml-3"
                value-field="item"
                text-field="item"
              ></b-form-radio-group>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row no-gutters>
          <b-col md="4">
            <b-form-group
              id="input-btime"
              label="Temps max pour bonus:"
              label-for="bonus_time"
              class="mr-sm-2"
            >
              <b-form-input
                id="bonus_time"
                type="number"
                v-model="form.bonus_time"
                required
                placeholder="Entrez le délai en minutes"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group
              id="input-bxp"
              label="Points de bonus:"
              label-for="bonus_xp"
              class="mr-sm-2"
            >
              <b-form-input
                id="bonus_xp"
                v-model="form.bonus_xp"
                required
                placeholder="Entrez les points bonus"
                type="number"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4" class="text-center py-3">
            <b-button @click="addQuestion"
              ><b-icon icon="plus-circle" variant="light" class="mr-1"></b-icon
              >Ajouter une question</b-button
            >
          </b-col>
        </b-row>

        <div
          v-for="(question, q_index) in questions"
          class="accordion shadow"
          role="tablist"
          :key="q_index"
        >
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" role="tab" class="p-0">
              <b-container
                fluid
                v-b-toggle="'accordion-' + q_index"
                variant="info"
                class="p-2 bg-theme d-flex justify-content-between"
              >
                <span>Question {{ q_index + 1 }}</span>

                <b-icon
                  icon="trash"
                  variant="danger"
                  class="h4   m-0"
                  v-b-modal.modalDeleteQuestion
                  @click.prevent="setCurrentQuestion(question)"
                ></b-icon>
              </b-container>
            </b-card-header>
            <b-collapse
              :id="'accordion-' + q_index"
              visible
              accordion="quiz-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <b-form-textarea
                  id="question"
                  v-model="questions[q_index].question"
                  required
                  placeholder="Entrez la question"
                  class="mb-2"
                ></b-form-textarea>
                <div class="d-flex mb-2">
                  <span class="text-nowrap pt-2">Points:</span>
                  <b-form-input
                    :id="'xps-' + q_index"
                    type="number"
                    v-model="questions[q_index].xps"
                    required
                    placeholder="Entrez les points bonus"
                    class="mx-2 w-75px"
                  ></b-form-input
                  ><b-button
                    @click="addAnswer(q_index)"
                    class="text-nowrap ml-auto"
                    >Ajouter une réponse</b-button
                  >
                </div>

                <b-form-group
                  v-for="(answer, a_index) in questions[q_index].answers"
                  :key="a_index"
                  :id="'input-answer-' + q_index + '-' + a_index"
                  :label="'Réponse N° ' + (a_index + 1) + ':'"
                  :label-for="'answer-' + q_index + '-' + a_index"
                >
                  <b-form-input
                    id="'answer-' +q_index + '-' +a_index"
                    v-model="questions[q_index].answers[a_index].answer"
                    required
                    placeholder="Entrez une réponse"
                  ></b-form-input>
                  <div class="d-flex justify-content-between">
                    <b-form-checkbox
                      v-model="questions[q_index].answers[a_index].is_correct"
                      >Correct</b-form-checkbox
                    >
                    <b-icon
                      icon="trash"
                      variant="danger"
                      class="h4 pt-1 m-0 pointer"
                      v-b-modal.modalDeleteAnswer
                      @click.prevent="
                        setCurrentAnswer(question, q_index, a_index)
                      "
                    ></b-icon>
                  </div>
                </b-form-group>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>

        <b-container class="mt-3 mb-5 d-flex justify-content-center flex-wrap">
          <b-button type="reset" variant="info" class="mt-2 mx-2"
            >Annuler</b-button
          ><b-button
            v-if="editing"
            type="button"
            variant="danger"
            class="mt-2 mx-2"
            v-b-modal.modalDeleteQuiz
            >Supprimer</b-button
          >
          <b-button type="submit" variant="primary" class="mt-2 mx-2">{{
            editing ? "Enregistrer" : "Créer"
          }}</b-button>
        </b-container>
      </b-form>
    </b-overlay>

    <!-- DELETE QUESTION MODAL -->
    <b-modal id="modalDeleteQuestion" centered hide-header hide-footer>
      <div class="d-block text-center">
        <p class="my-4">
          Supprimer la question "{{ currentQuestion.question }}" ?
        </p>
      </div>
      <b-container fluid class="p-2 d-flex justify-content-around">
        <b-button
          variant="success"
          @click="$bvModal.hide('modalDeleteQuestion')"
          >Annuler</b-button
        >
        <b-button
          variant="danger"
          @click="deleteQuestion(), $bvModal.hide('modalDeleteQuestion')"
          >Confirmer</b-button
        >
      </b-container>
    </b-modal>

    <!-- DELETE ANSWER MODAL -->
    <b-modal id="modalDeleteAnswer" centered hide-header hide-footer>
      <div class="d-block text-center">
        <p class="my-4">Supprimer la réponse "{{ currentAnswer }}" ?</p>
      </div>
      <b-container fluid class="p-2 d-flex justify-content-around">
        <b-button variant="success" @click="$bvModal.hide('modalDeleteAnswer')"
          >Annuler</b-button
        >
        <b-button
          variant="danger"
          @click="deleteAnswer(), $bvModal.hide('modalDeleteAnswer')"
          >Confirmer</b-button
        >
      </b-container>
    </b-modal>

    <!-- DELETE QUIZ MODAL -->
    <b-modal id="modalDeleteQuiz" centered hide-header hide-footer>
      <div class="d-block text-center">
        <p class="my-4">
          Supprimer le quiz "{{ form.category.name }} - {{ form.name }}" ?
        </p>
      </div>
      <b-container fluid class="p-2 d-flex justify-content-around">
        <b-button variant="success" @click="$bvModal.hide('modalDeleteQuiz')"
          >Annuler</b-button
        >
        <b-button
          variant="danger"
          @click="deleteQuiz(), $bvModal.hide('modalDeleteQuiz')"
          >Confirmer</b-button
        >
      </b-container>
    </b-modal>
  </b-container>
</template>

<script>
import AdminQuiz from "../apis/AdminQuiz";
import DisplayQuiz from "./DisplayQuiz";
export default {
  components: {
    DisplayQuiz,
  },
  data: () => {
    return {
      editing: false,
      preview: false,
      showOverlay: false,
      form: {
        id: null,
        category: { _id: null, name: null },
        name: null,
        difficulty: null,
        bonus_time: null,
        bonus_xp: null,
        is_published: false,
      },
      questions: [],
      categories: [],
      difficulties: ["Facile", "Moyen", "Difficile"],
      currentQuestion: "",
      currentQuestionIndex: null,
      currentAnswer: "",
      currentAnswerIndex: null,
      // currentQuiz: '',
    };
  },
  async mounted() {
    this.showOverlay = true;
    try {
      const categories = await AdminQuiz.getCategories();
      this.categories = [
        { text: "Selectionnez...", value: null },
        { text: "+ Ajouter une valeur...", value: 0 },
      ].concat(categories.data);
      const quizId = this.$route.params.quiz_id;
      if (quizId) {
        this.editing = true;
        const quizReq = await AdminQuiz.getQuiz(quizId);
        this.form = quizReq.data;
        const questionsReq = await AdminQuiz.getQuestions(quizId);
        this.questions = questionsReq.data;
      }

      this.showOverlay = false;
    } catch (err) {
      this.toast("Erreur!", err.message, true);
      this.showOverlay = false;
      this.$router.push("/admin");
    }
  },
  methods: {
    addQuestion() {
      this.questions.push({
        question: "",
        xps: 10,
        answers: [
          { answer: "", is_correct: false },
          { answer: "", is_correct: true },
        ],
        quizz_id: this.editing ? this.form.id : null,
      });
    },
    deleteQuestion() {
      // if (confirm('Supprimer définitivement cette question?'))
      this.questions.splice(this.currentQuestionIndex, 1);
      this.currentQuestionIndex = null;
    },
    deleteAnswer(q_index, a_index) {
      // if (confirm('Supprimer définitivement cette réponse?'))
      this.questions[this.currentQuestionIndex].answers.splice(
        this.currentAnswerIndex,
        1
      );
      this.currentAnswerIndex = null;
    },
    addAnswer(q_index) {
      this.questions[q_index].answers.push({ answer: "", is_correct: false });
    },
    onReset(evt) {
      evt.preventDefault();
      this.$router.push("/admin");
    },
    // async deleteQuiz(evt) {
    async deleteQuiz() {
      this.showOverlay = true;
      // evt.preventDefault();
      try {
        const delReq = await AdminQuiz.deleteQuiz(this.form.id);
        this.toast("Supprimé!", delReq.data.message);
        this.showOverlay = false;
        this.$router.push("/admin");
      } catch (err) {
        this.toast("Erreur!", err.message, true);
        this.showOverlay = false;
      }
    },
    async onSubmit(evt) {
      this.showOverlay = true;
      evt.preventDefault();
      try {
        if (this.editing) {
          const updQuiz = await AdminQuiz.updateQuiz({
            quizId: this.form.id,
            data: this.form,
          });
          const delQuestions = await AdminQuiz.deleteQuestions({
            quizId: this.form.id,
          });
          const updQuestions = await AdminQuiz.addQuestions({
            data: { questions: this.questions },
          });
          this.toast("Modifié!!", updQuestions.data.message);
        } else {
          const newQuiz = await AdminQuiz.addQuiz({ data: this.form });
          const newQuizId = newQuiz.data.id;
          this.questions.map((question) => (question.quizz_id = newQuizId));
          const newQuestions = await AdminQuiz.addQuestions({
            data: { questions: this.questions },
          });

          this.toast("Ajouté!", newQuestions.data.message);
        }
        this.showOverlay = false;
        this.$router.push("/admin");
      } catch (err) {
        this.toast("Erreur!", err.message, true);
        this.showOverlay = false;
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
    async selectCategory(value) {
      let catName = this.categories.find((cat) => cat.value == value);
      this.form.category.name = catName.text;

      if (value == 0) {
        let newCat = prompt("Entrez une nouvelle valeur");
        // this.showModal();
        if (newCat) {
          const addCat = await AdminQuiz.addCategory({
            data: { name: newCat },
          });
          const categories = await AdminQuiz.getCategories();
          this.categories = [
            { text: "Selectionnez...", value: null },
            { text: "+ Ajouter une valeur...", value: 0 },
          ].concat(categories.data);
          this.form.category._id = addCat.data.id;
        }
      }
    },

    // showModal() {
    //   this.$refs['modalNewCat'].show();
    // },

    setCurrentQuestion(question, q_index) {
      this.currentQuestion = question;
      this.currentQuestionIndex = q_index;
    },

    setCurrentAnswer(question, q_index, a_index) {
      this.currentQuestionIndex = q_index;

      this.currentAnswer = question.answers[a_index].answer;
      this.currentAnswerIndex = a_index;
    },
  },
};
</script>
