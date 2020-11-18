import Api from "./Api";
export default {
  getQuizzes() {
    return Api().get("/quizz");
  },
  getPublishedQuizzes() {
    return Api().get("/quizz/published");
  },
  getQuiz(quizId) {
    return Api().get("/quizz/" + quizId);
  },

  getQuestions(quizId) {
    return Api().get("/question/" + quizId);
  },

  getResults(payload) {
    return Api().post("/question/" + payload.quizId + "/result", {
      answers: payload.answers,
      timeout: payload.timeout,
      user_id: payload.userId,
    });
  },
  addRating(payload) {
    return Api().post('/ratings', payload.data)
  },
  getUserRating(payload) {
    return Api().post('/ratings/one', payload.data)
  },
  getSuggestion(userId) {
    return Api().get('/quizz/suggest/' + userId)
  }
};
