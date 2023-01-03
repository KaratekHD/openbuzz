import api from "@/services/api";


export default {
  answers(auth) {
    const route = '/student-question-answers/stats&learningModeId=1&studentEducationId=' + auth.student.education
    const config = {
      headers: {Authorization: `Bearer ${auth.token}`}

    }

    return api().get(route, config)
  }
}