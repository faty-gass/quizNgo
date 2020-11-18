import Api from "./Api";
export default {
  register(form) {
    return Api().post("/users", form);
  },
  login(form) {
    return Api().post("/auth/login", form);
  },
  auth() {
    return Api().get("/profile");
  },
  saveUser(id, user) {
    return Api().patch("/users/" + id, user);
  },
  resetPassword(id, pass) {
    return Api().patch("/users/" + id, pass);
  },
  saveFavorites(id, favs) {
    return Api().patch("/users/" + id, { favorites: favs });
  },
};
