import api from "@/services/api";
import {useAuth} from "@/plugins/auth";

export default {
  getExam() {
    const auth = useAuth()
    const route = '/theory-pre-exams&studentEducationId=' + auth.student.education
    const config = {
      headers: {Authorization: `Bearer ${auth.token}`}
    }
    return api().post(route, undefined, config)
  },

  submitExam(auth, answers, id) {
    const config = {
      headers: {Authorization: `Bearer ${auth.token}`}
    }
    const route = '/theory-pre-exams/add-question-answers/'
    return api().post(route, {"theoryPreExamId": id, "questionAnswers": answers}, config)
  }
}