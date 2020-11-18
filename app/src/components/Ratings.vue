<template>
  <div>
    <div
      v-if="!currentRating"
      class="d-flex justify-content-start align-items-center"
    >
      <div>
        <h5 class="my-auto">Notez ce quiz !!</h5>
      </div>

      <div>
        <b-form-rating
          v-model="rating"
          variant="warning"
          inline
          no-border
          size="lg"
          class="bg-transparent"
        ></b-form-rating>
      </div>
    </div>
    <div v-else class="d-flex justify-content-start align-items-center">
      <div>
        <small class="my-auto"
          >Votre évaluation du
          {{ currentRating.date | moment("dddd DD MMMM YYYY") }}</small
        >
      </div>

      <div>
        <b-form-rating
          v-model="currentRating.rating"
          variant="info"
          inline
          no-border
          size="lg"
          class="bg-transparent"
          readonly
        >
        </b-form-rating>
      </div>
    </div>
  </div>
</template>

<script>
import Quiz from "../apis/Quiz";

export default {
  data() {
    return {
      rating: null,
      currentRating: null,
    };
  },

  props: {
    quizId: String,
    userId: String,
  },

  computed: {
    postDate() {
      return new Date(this.currentRating.date).toUTCString().substring(5, 16);
    },
  },

  mounted() {
    //console.log("mounted");
    this.getOldRating();
  },

  watch: {
    rating: function() {
      this.addRating();
    },
  },

  methods: {
    addRating() {
      Quiz.addRating({
        data: {
          user_id: this.userId,
          quizz_id: this.$route.params.quiz_id || this.$props.quizId,
          rating: this.rating,
        },
      }).then((response) => {
        //console.log(response.data);
        this.getOldRating();
      });
    },

    getOldRating() {
      Quiz.getUserRating({
        data: {
          user_id: this.userId,
          quizz_id: this.$route.params.quiz_id || this.$props.quizId,
        },
      }).then((response) => {
        //console.log(response.data);
        if (response.data.rating) {
          this.currentRating = {
            rating: response.data.rating,
            date: response.data.created_at,
          };
        }
      });
    },
  },
};
</script>

<style></style>
