<template>
  <div class="container h100">
    <div class="row justify-content-center pt-5">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header bg-theme text-center"><h5>Connexion</h5></div>
          <div class="card-body">
            <div class="form-group row">
              <label for="email" class="col-md-4 col-form-label text-md-right"
                >Adresse e-mail</label
              >
              <div class="col-md-6">
                <input
                  id="email"
                  type="email"
                  v-model="form.username"
                  class="form-control"
                  required
                  autofocus
                />
                <span class="invalid-feedback" role="alert"></span>
              </div>
            </div>
            <div class="form-group row">
              <label
                for="password"
                class="col-md-4 col-form-label text-md-right"
                >Mot de passe</label
              >
              <div class="col-md-6">
                <input
                  id="password"
                  type="password"
                  v-model="form.password"
                  class="form-control"
                  required
                />
                <span class="invalid-feedback" role="alert"></span>
              </div>
            </div>
            <div class="form-group row mb-0">
              <div class="col-md-8 offset-md-4">
                <button
                  type="submit"
                  @click.prevent="login"
                  class="btn btn-primary"
                >
                  Se connecter
                </button>
              </div>
            </div>

            <!--             <div
              v-if="errors == 1"
              class="alert alert-danger mt-4"
              role="alert"
            >
              L'email ou le mot de passe est incorrect
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";

export default {
  data: () => ({
    errors: "",
    form: {
      username: "",
      password: "",
      device_name: "browser",
    },
  }),
  methods: {
    toast(title, message, faulty = false) {
      this.$root.$bvToast.toast(message, {
        title: title,
        toaster: "b-toaster-top-center",
        variant: faulty ? "danger" : "success",
        appendToast: true,
      });
    },
    login() {
      User.login(this.form)
        .then((response) => {
          this.$root.$emit("login", true);
          localStorage.setItem("token", response.data.access_token);
          this.$store.state.access_token = localStorage.getItem("token");
          this.$store.commit("setToken", localStorage.getItem("token"));
          //this.$router.push({ name: "Home" });
          this.$router.push("/");
        })
        .catch((error) => {
          if (error.response.status) {
            this.toast("Erreur!", "Mot de passe ou email incorrect", true);
          }
        });
    },
  },
};
</script>
