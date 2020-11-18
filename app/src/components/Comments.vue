<template>
  <div class="Comments">
    <div v-if="isloggedIn" class="">
      <h5>Ajouter un avis</h5>
      <b-form-textarea
        id="textarea-small"
        size="sm"
        v-model="newComment"
        placeholder="Votre commentaire ..."
      ></b-form-textarea>
      <b-button @click="sendComment" class="m-2" variant="dark" size="sm"
        >Envoyer
      </b-button>
    </div>

    <div v-else class="text-center">
      Vous devez être connecté pour ajouter un avis
    </div>
    <b-card v-for="comment in comments" :key="comment.id" class="my-2">
      <div class="d-flex justify-content-between">
        <div>
          <b-card-text>
            {{ comment.comment }}
          </b-card-text>
          <small>
            Par
            {{
              comment.user_id && comment.user_id
                ? comment.user_id.name
                : "Inconnu"
            }}, le
            {{ new Date(comment.created_at).toUTCString().substring(5, 25) }}
          </small>
        </div>
        <div
          class="d-flex flex-column justify-content-around"
          v-if="
            ($store.state.user &&
              comment.user_id &&
              $store.state.user.email == comment.user_id.email) ||
              isAdmin
          "
        >
          <b-icon
            icon="trash"
            variant="danger"
            class="pointer"
            v-b-modal.modalDeleteComment
            @click="setComment(comment)"
          ></b-icon>
          <b-icon
            icon="pencil"
            variant="info"
            class="pointer"
            v-b-modal.modalUpdateComment
            @click="setComment(comment)"
          ></b-icon>
        </div>
      </div>
    </b-card>
    <!-- ************* Modal Update comment *************-->
    <b-modal id="modalUpdateComment" title="Modifier le commentaire">
      <b-form-group
        id="input-comment"
        label="Commentaire :"
        label-for="comment"
      >
        <b-form-input
          id="comment"
          v-model="updatedComment"
          required
        ></b-form-input>
      </b-form-group>
      <template v-slot:modal-footer>
        <b-container fluid class="d-flex justify-content-around">
          <b-button
            variant="danger"
            @click="$bvModal.hide('modalUpdateComment')"
            >Annuler</b-button
          >
          <b-button
            @click="updateComment(), $bvModal.hide('modalUpdateComment')"
            variant="success"
            >Valider</b-button
          >
        </b-container>
      </template>
    </b-modal>
    <!-- ************* END Modal Update comment *************-->

    <!--*****************Modal delete comment ************** -->
    <b-modal id="modalDeleteComment" centered hide-header hide-footer>
      <div class="d-block text-center">
        <p class="my-4">Supprimer le commentaire ?</p>
      </div>
      <b-container fluid class="p-2 d-flex justify-content-around">
        <b-button variant="success" @click="$bvModal.hide('modalDeleteComment')"
          >Annuler</b-button
        >
        <b-button
          variant="danger"
          @click="deleteComment(), $bvModal.hide('modalDeleteComment')"
          >Confirmer</b-button
        >
      </b-container>
    </b-modal>
    <!--***************** END Modal delete comment ************** -->
  </div>
</template>

<script>
import Comments from "../apis/Comments";

export default {
  data() {
    return {
      comments: [],
      isloggedIn: this.$store.getters.loggedIn,
      isAdmin: this.$store.getters.isAdmin,
      newComment: "",
      updatedComment: "",
      currentComment: {},
    };
  },
  props: {
    quizId: String,
  },

  mounted() {
    this.getComments();
  },
  updated() {},

  methods: {
    getComments() {
      Comments.getComments(
        this.$route.params.quiz_id || this.$props.quizId
      ).then((response) => {
        this.comments = response.data;
      });
    },

    sendComment() {
      Comments.postComment({
        data: {
          user_id: this.$store.state.user.id,
          quizz_id: this.$route.params.quiz_id || this.$props.quizId,
          comment: this.newComment,
        },
      }).then((response) => {
        //console.log(response.data);
        this.newComment = "";
        this.getComments();
      });
    },

    setComment(data) {
      this.currentComment = data;
      this.updatedComment = data.comment;
    },

    updateComment() {
      //console.log(this.currentComment.id, this.updatedComment);
      const payload = {};
      payload.quizzId = this.currentComment.id;
      payload.data = { comment: this.updatedComment };
      Comments.updateComment(payload).then((response) => {
        this.updatedComment = "";
        this.getComments();
      });
    },

    deleteComment() {
      Comments.deleteComment(this.currentComment.id).then((response) => {
        this.getComments();
      });
    },
  },
};
</script>

<style></style>
