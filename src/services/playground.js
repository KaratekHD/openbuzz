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
    },
    search_questions(mode, query, token) {
        const endpoint = "/theory-questions/student/filter"
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }
        let payload = {limit: 20, offset: 0}
        if(mode === 1) {
            // Freetext
            payload["freeText"] = query
            payload["officialNumber"] = ""
        } else {
            // Amtl. Nr.
            payload["officialNumber"] = query
            payload["freeText"] = ""
        }
        return api().post(endpoint, payload, config)
    },
    get_question_by_id(id, student, token) {
        const endpoint = '/theory-questions/' + id + '&studentEducationId=' + student
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }
        return api().get(endpoint, config)
    }
}