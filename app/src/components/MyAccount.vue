<template>
  <div>
    <div class="d-flex flex-row flex-wrap justify-content-around mx-2">
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 px-2 mt-5">
        <div class="card my-2">
          <div class="card-header text-center bg-theme">
            <div>Mon Compte</div>
          </div>
          <div class="card-body text-center">
            <div class="form-group row">
              <label for="name" class="col-md-6 col-form-label text-md-right"
                >Nom</label
              >
              <div class="col-md-6">
                <input
                  v-model="userForm.name"
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
              <label for="email" class="col-md-6 col-form-label text-md-right"
                >Adresse E-mail</label
              >
              <div class="col-md-6">
                <input
                  v-model="userForm.email"
                  id="email"
                  type="email"
                  class="form-control"
                  required
                  placeholder="utilisateur@exemple.fr"
                />
                <span class="invalid-feedback" role="alert"></span>
              </div>
            </div>
            <button
              type="submit"
              @click.prevent="saveUser"
              class="btn btn-primary my-4"
            >
              Envoyer
            </button>

            <div>
              <small class="font-italic text-muted">
                Il vous sera demandé de vous reconnecter avec les nouvelles
                informations afin de valider le changement</small
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 px-2 mt-5">
        <div class="card my-2">
          <div class="card-header bg-theme text-center">
            <div>Modifier le mot de passe</div>
          </div>
          <div class="card-body text-center">
            <div class="form-group row">
              <label for="pass1" class="col-md-6 col-form-label text-md-right"
                >Mot de passe</label
              >
              <div class="col-md-6">
                <input
                  v-model="passForm.password"
                  id="pass1"
                  type="password"
                  class="form-control"
                  required
                  autofocus
                  placeholder="Nouveau mot de passe"
                />
                <span class="invalid-feedback" role="alert"></span>
              </div>
            </div>
            <div class="form-group row">
              <label for="pass2" class="col-md-6 col-form-label text-md-right"
                >Confirmer mot de passe</label
              >
              <div class="col-md-6">
                <input
                  v-model="passForm.password2"
                  id="pass2"
                  type="password"
                  class="form-control"
                  required
                  placeholder="Confirmer nouveau mot de passe"
                />
                <span class="invalid-feedback" role="alert"></span>
              </div>
            </div>
            <button
              type="submit"
              @click.prevent="resetPassword"
              class="btn btn-primary my-4"
            >
              Changer le mot de passe
            </button>
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
    id: "",
    userForm: {
      name: "",
      email: "",
    },
    passForm: {
      password: "",
      password2: "",
    },
  }),
  mounted() {
    User.auth().then((response) => {
      this.id = response.data.id;
      this.userForm.name = response.data.name;
      this.userForm.email = response.data.email;
    });
  },
  methods: {
    saveUser() {
      User.saveUser(this.id, this.userForm)
        .then(() => {
          this.logout();
          //this.$router.push({ name: "Login" });
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        });
    },

    resetPassword() {
      if (this.passForm.password == this.passForm.password2) {
        User.resetPassword(this.id, this.passForm)
          .then((response) => {
            //console.log(response.data);
            this.toast("Message", "Mot de passe modifié", false);
          })
          .catch((error) => {
            if (error.response.status === 422) {
              this.errors = error.response.data.errors;
            }
          });
      } else {
        this.toast(
          "Message",
          "Le mot de passe et la confirmation doivent être identiques!",
          true
        );
      }
    },

    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("status");
      this.$store.commit("setToken", null);
      this.$store.commit("setStatus", null);
      this.$store.commit("setUser", null);
      this.$router.push("/login");
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
