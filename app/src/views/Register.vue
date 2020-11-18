<template>
  <div class="container pt-5 h100">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <!-- début card -->
        <div class="card">
          <div class="card-header bg-theme text-center">
            <h5>Enregistrer un compte</h5>
          </div>
          <div class="card-body text-center">
            <div class="py-2">
              <div class="form-group row">
                <label for="name" class="col-md-4 col-form-label text-md-right"
                  >Nom</label
                >
                <div class="col-md-6">
                  <input
                    v-model="form.name"
                    id="name"
                    type="text"
                    class="form-control"
                    required
                    autofocus
                    placeholder="Entrez un nom..."
                  />
                  <span class="invalid-feedback" role="alert"></span>
                </div>
              </div>
              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right"
                  >Adresse E-mail</label
                >
                <div class="col-md-6">
                  <input
                    v-model="form.email"
                    id="email"
                    type="email"
                    class="form-control"
                    required
                    placeholder="utilisateur@exemple.fr"
                  />
                  <span class="invalid-feedback" role="alert"></span>
                </div>
              </div>
              <div class="form-group row">
                <label for="pass1" class="col-md-4 col-form-label text-md-right"
                  >Mot de passe</label
                >
                <div class="col-md-6">
                  <input
                    v-model="form.password"
                    id="pass1"
                    type="password"
                    class="form-control"
                    required
                  />
                  <span class="invalid-feedback" role="alert"></span>
                </div>
              </div>
              <div class="form-group row">
                <label for="pass2" class="col-md-4 col-form-label text-md-right"
                  >Confirmer le mot de passe</label
                >
                <div class="col-md-6">
                  <input
                    v-model="form.password2"
                    id="pass2"
                    type="password"
                    class="form-control"
                    required
                  />
                  <span class="invalid-feedback" role="alert"></span>
                </div>
              </div>
              <button
                type="submit"
                @click="register"
                class="btn btn-primary my-4"
              >
                Créer un compte
              </button>
            </div>
          </div>
        </div>
        <!-- *********** fin card *************-->
      </div>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";

export default {
  data: () => ({
    errors: "",
    error_message: "",
    form: {
      name: "",
      email: "",
      password: "",
      password2: "",
    },
  }),

  watch: {},

  methods: {
    toast(title, message, faulty = false) {
      this.$root.$bvToast.toast(message, {
        title: title,
        toaster: "b-toaster-top-center",
        variant: faulty ? "danger" : "success",
        appendToast: true,
      });
    },
    register() {
      if (
        this.form.name &&
        this.form.email &&
        this.form.password &&
        this.form.password2
      ) {
        if (this.form.password == this.form.password2) {
          //const bcrypt = require("bcrypt"); //
          //const hashedPwd = bcrypt.hash(password, 10); //
          //this.form.password = hashedPwd; //
          User.register(this.form)
            .then((response) => {
              if (response.data.error) {
                this.toast("Erreur!", response.data.error, true);
              } else {
                this.$router.push({ name: "Login" });
              }
            })
            .catch((error) => {
              this.toast("Erreur!", error.message, true);
            });
        } else {
          this.toast(
            "Erreur!",
            "Le mot de passe et la confirmation doivent être identiques",
            true
          );
        }
      } else {
        this.toast("Erreur!", "Tous les champs sont obligatoires", true);
      }
    },
  },
};
</script>
