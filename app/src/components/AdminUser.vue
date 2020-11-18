<template>
  <b-container class="my-5">
    <div class="d-flex flex-wrap justify-content-around mb-5">
      <b-col md="6" class="text-center col-12 py-2">
        <b-button variant="success" v-b-modal.modalNewUser
          >Ajouter un utilisateur</b-button
        >
      </b-col>
      <b-col md="6" class="text-center col-12 py-2">
        <b-input-group>
          <b-form-input
            @input="filter"
            v-model="searchedUser"
            type="text"
            placeholder="Rechercher un utilisateur"
          >
          </b-form-input>
          <b-input-group-append class="x-button">
            <b-button variant="info" @click="reset"
              ><strong>x</strong></b-button
            >
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </div>

    <div
      v-for="(user, idx) in filteredUsers"
      class="accordion shadow"
      role="tablist"
      :key="idx"
    >
      <b-card no-body class="mb-2">
        <!-- Header collapsable -->
        <b-card-header header-tag="header" role="tab" class="p-0">
          <b-container
            fluid
            v-b-toggle="'accordion-' + idx"
            variant="info"
            class="p-2 bg-light d-flex flex-wrap justify-content-between"
          >
            <b-col md="3" class="text-theme">
              <strong>
                {{ user.name }}
              </strong>
            </b-col>
            <b-col md="3">
              {{ user.email }}
            </b-col>
            <b-col md="3" class="col-6"> XP {{ user.score }}</b-col>
            <b-col md="3" class="col-6">
              {{ user.role }}
            </b-col>
          </b-container>
        </b-card-header>

        <!-- Card -->
        <b-collapse
          :id="'accordion-' + idx"
          accordion="quiz-accordion"
          role="tabpanel"
        >
          <b-card-body>
            <b-form-group id="input-name" label="Nom :" label-for="userName">
              <b-form-input
                id="userName"
                v-model="user.name"
                required
                placeholder="XXX"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-email"
              label="Email :"
              label-for="userEmail"
            >
              <b-form-input
                id="userEmail"
                v-model="user.email"
                type="email"
                required
                placeholder="YYY"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-xp" label="Xp :" label-for="userXp">
              <b-form-input
                id="userXp"
                v-model="user.score"
                required
                placeholder="ZZZ"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-role" label="Role :" label-for="userRole">
              <b-form-select
                id="userRole"
                v-model="user.role"
                :options="roles"
                required
              ></b-form-select>
            </b-form-group>
            <b-container fluid class="p-2 d-flex justify-content-around">
              <b-button
                v-b-modal.modalDeleteUser
                variant="danger"
                @click="setCurrentUser(user)"
                >Supprimer</b-button
              >

              <b-button @click="updUser(idx)" variant="success"
                >Modifier</b-button
              >
            </b-container>
            <!-- </b-form> -->
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>

    <!-- DELETE USER MODAL -->
    <b-modal id="modalDeleteUser" centered hide-header hide-footer>
      <div class="d-block text-center">
        <p class="my-4">Supprimer {{ currentUser.name }} ?</p>
      </div>
      <b-container fluid class="p-2 d-flex justify-content-around">
        <b-button variant="success" @click="$bvModal.hide('modalDeleteUser')"
          >Annuler</b-button
        >
        <b-button
          variant="danger"
          @click="deleteUser(currentUser.id), $bvModal.hide('modalDeleteUser')"
          >Confirmer</b-button
        >
      </b-container>
    </b-modal>

    <!-- NEW USER MODAL -->
    <b-modal id="modalNewUser" title="Nouvel Utilisateur">
      <b-container class="container">
        <b-form>
          <b-form-group id="input-name" label="Username :" label-for="name">
            <b-form-input id="name" v-model="form.name" required></b-form-input>
          </b-form-group>

          <b-form-group id="input-email" label="Email :" label-for="email">
            <b-form-input
              id="email"
              v-model="form.email"
              type="email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-password"
            label="Password :"
            label-for="password"
          >
            <b-form-input
              id="password"
              v-model="form.password"
              type="password"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-pwdConfirm"
            label="Confirmation Password :"
            label-for="pwdConfirm"
          >
            <b-form-input
              id="pwdConfirm"
              v-model="form.pwdConfirm"
              type="password"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-role" label="Role :" label-for="userRole">
            <b-form-select
              id="userRole"
              v-model="form.role"
              :options="roles"
              required
            ></b-form-select>
          </b-form-group>
        </b-form>
      </b-container>
      <template v-slot:modal-footer>
        <b-container fluid class="d-flex justify-content-around">
          <b-button variant="info" @click="$bvModal.hide('modalNewUser')"
            >Annuler</b-button
          >
          <b-button @click="resetNewUserForm" variant="danger">Reset</b-button>
          <b-button @click="submitNewUserForm()" variant="success"
            >Valider</b-button
          >
        </b-container>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
import AdminUser from "../apis/AdminUser.js";
import User from "../apis/User.js";
import VueLodash from "vue-lodash";
import lodash from "lodash";

export default {
  data() {
    return {
      users: [],
      filteredUsers: [],
      searchedUser: "",
      currentUser: "",
      form: {
        // id: null,
        name: "",
        email: "",
        password: "",
        pwdConfirm: "",
        role: "user",
      },
      roles: ["user", "admin"],
    };
  },

  mounted() {
    AdminUser.getUsers().then((response) => {
      const x = _.orderBy(
        response.data,
        [(user) => user.name.toLowerCase()],
        ["asc"]
      );
      this.users = x;
      this.filteredUsers = x;
    });
  },

  methods: {
    resetNewUserForm(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.name = "";
      this.form.email = "";
      this.form.password = "";
      this.form.pwdConfirm = "";
      this.form.role = "user";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },

    toast(title, message, faulty = false) {
      this.$root.$bvToast.toast(message, {
        title: title,
        toaster: "b-toaster-top-center",
        variant: faulty ? "danger" : "success",
        appendToast: true,
      });
    },

    submitNewUserForm() {
      if (
        this.form.name &&
        this.form.email &&
        this.form.password &&
        this.form.pwdConfirm &&
        this.form.role
      ) {
        if (this.form.password == this.form.pwdConfirm) {
          User.register(this.form)
            .then((response) => {
              if (response.data.error) {
                this.toast("Erreur!", response.data.error, true);
              } else {
                const new_user = response.data.newUser;
                const newUser = {
                  id: new_user._id,
                  name: new_user.name,
                  email: new_user.email,
                  password: new_user.password,
                  role: new_user.role,
                  score: new_user.score,
                };
                this.users.push(newUser);
                this.$bvModal.hide("modalNewUser");
                this.toast("Message", "Utilisateur créé !", false);
                this.form.name = "";
                this.form.email = "";
                this.form.password = "";
                this.form.pwdConfirm = "";
                this.form.role = "user";
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

    async updUser(idx) {
      try {
        const updUser = await AdminUser.updateUser(this.users[idx]);
      } catch (err) {
        console.error("Error from updUser :", error);
      }
    },

    setCurrentUser(user) {
      this.currentUser = user;
    },

    async deleteUser(userId) {
      try {
        const delUser = await AdminUser.deleteUser(userId);
        let deletedUserIndex = await this.users.findIndex(
          (deleted) => deleted.id == userId
        );
        await this.users.splice(deletedUserIndex, 1);
      } catch (error) {
        console.error("Error from deleteUser :", error);
        // }
      }
    },

    async filter() {
      if (this.searchedUser) {
        const regex = new RegExp(this.searchedUser, "i");
        this.filteredUsers = this.users.filter((user) => {
          return user.name.match(regex);
        });
      } else {
        this.filteredUsers = this.users;
      }
    },

    reset() {
      this.searchedUser = "";
      this.filteredUsers = this.users;
    },
  },
};
</script>
