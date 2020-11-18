<template>
  <div class="QuizCard my-2 shadow">
    <b-card class="h-100" style="max-width: 22rem; min-width: 22rem">
      <b-card-text class="d-flex justify-content-between flex-column">
        <div class="d-flex justify-content-between">
          <router-link
            :to="'/quiz/' + quiz.id"
            class="text-decoration-none text-theme"
          >
            <h3>{{ quiz.name }}</h3>
          </router-link>

          <div>
            <b-icon
              v-if="
                this.$store.state.user &&
                  this.$store.state.user.favorites.includes(quiz.id)
              "
              icon="heart-fill"
              variant="danger"
              class="pointer"
              @click="removeFav(quiz.id)"
            ></b-icon>
            <b-icon
              v-else
              icon="heart"
              class="pointer"
              @click="addFav(quiz.id)"
            ></b-icon>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between">
          <h6 class="mb-0">{{ quiz.category.name }}</h6>
          <div class="mw-75">
            <b-form-rating
              v-if="quiz.avg_rating > 0"
              v-model="quiz.avg_rating"
              no-border
              size="sm"
              variant="info"
              readonly
            ></b-form-rating>
            <small v-else class="text-muted">0 note</small>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-end">
          <small class="text-color-black-50">
            Ajouté le
            {{ new Date(quiz.created_at).toUTCString().substring(5, 16) }}
          </small>
          <div class="h1 mb-0">
            <DifficultyIcon :difficulty="quiz.difficulty" />
          </div>
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { userInfo } from "os";
import User from "../apis/User";
import DifficultyIcon from "../components/DifficultyIcon";

export default {
  data() {
    return {
      //userId: this.$store.state.user.id,
    };
  },
  components: {
    DifficultyIcon,
  },
  props: {
    quiz: Object,
  },

  computed: {},

  methods: {
    addFav(id) {
      //alert("quiz " + id + " ajouté aux favoris");
      if (this.$store.state.user) {
        if (this.$store.state.user.favorites.includes(id)) {
          alert("Ce quiz est déjà dans vos favoris");
        } else {
          this.$store.state.user.favorites.push(id);
          //console.log("nexFav", this.$store.state.user.favorites);
          User.saveFavorites(
            //this.userId,
            this.$store.state.user.id,
            this.$store.state.user.favorites
          );
        }
      }
    },

    removeFav(id) {
      //alert("quiz " + id + " ajouté aux favoris");
      if (this.$store.state.user) {
        const newFav = this.$store.state.user.favorites.filter(
          (fav) => fav !== id
        );
        User.saveFavorites(this.$store.state.user.id, newFav).then(
          (response) => {
            //console.log("fav", response.data);
            this.$store.state.user.favorites = newFav;
          }
        );
      }
    },
  },
};
</script>
