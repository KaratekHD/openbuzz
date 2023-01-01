import api from "@/services/api";
import {useAuth} from "@/plugins/auth";

export default {
  answers() {
    const auth = useAuth()
    const route = '/student-question-answers/stats'
    const config = {
      params: {
        learningModeId: 1,
        studentEducationId: auth.student.id,
      },
      headers: {Authorization: `Bearer ${auth.token}`}

    }

    return api().get(route, config)
  }
}