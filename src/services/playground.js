import api from "@/services/api";

export default {
    get_categories(token) {
        const endpoint = "/question-groups"
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }
        return api().get(endpoint, config)
    },
    get_questions_by_category(token, name) {
        const endpoint = "/question-groups/" + name + "/questions"
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }
        return api().get(endpoint, config)
    }
}