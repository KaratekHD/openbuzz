import api from "@/services/api";

export default {
    getPayments(token) {
        const endpoint = '/education-events/student/current'
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }
        return api().get(endpoint, config)
    }
}