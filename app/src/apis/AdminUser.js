import Api from "./Api";
export default {

  getUsers() {
    return Api().get("/users/admin");
  },
  updateUser(payload) {
    return Api().patch("/users/admin/" + payload.id, payload);
  },
  deleteUser(userId) {
    return Api().delete("/users/admin/" + userId);
  }

};