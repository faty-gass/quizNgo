import Api from "./Api";
export default {
  getComments(quizzId) {
    return Api().get('/comments/quizz/' + quizzId)
  },
  postComment(payload) {
    return Api().post('/comments', payload.data)
  },
  deleteComment(quizzId) {
    return Api().delete('/comments/' + quizzId)
  },
  updateComment(payload) {
    return Api().patch('/comments/' + payload.quizzId, payload.data)
  },
  addRating(payload) {
    return Api().post('/ratings', payload.data)
  }

};