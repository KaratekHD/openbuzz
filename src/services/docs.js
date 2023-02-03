import api from "@/services/api";

export default {
    async getDocuments(token) {
        if(token === undefined) {
            return []
        } else {
            const endpoint = '/student-documents/student/current'
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            }
            const response = await api().get(endpoint, config)
            return response.data
        }
    },
    async getUnread(token) {
        const docs = await this.getDocuments(token)
        let unread = 0
        for (let i in docs) {
            if(!docs[i].seenByStudent) {
                unread++
            }
        }
        return unread
    }
}