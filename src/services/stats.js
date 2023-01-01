import api from "@/services/api";
import {useAuth} from "@/plugins/auth";

export default {
  answers() {
    const auth = useAuth()
    const route = '/student-question-answers/stats&learningModeId=1&studentEducationId=' + auth.student.education
    const config = {
      headers: {Authorization: `Bearer ${auth.token}`}

    }

    return api().get(route, config)
  }
}