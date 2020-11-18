import Api from "./Api";
export default {
  getRank(userId) {
    return Api().get("/donequiz/rank/" + userId);
  },
  getQuizzes(userId) {
    return Api().get("/donequiz/user/" + userId);
  },
};
