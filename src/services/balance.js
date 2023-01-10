import api from "@/services/api";

export default {
    getPayments(token) {
        const endpoint = '/education-events/student/current'
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }
        return api().get(endpoint, config)
    },
    async calculateTotal(token) {
        /*
         *  We could just get this directly from the backend,
         *  but the value it returns is not always correct.
         *  So, we will calulate it locally instead.
         */
        const endpoint = '/education-events/student/current'
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }
        const response = await api().get(endpoint, config)
        const data = response.data
        let total = 0
        for (const i in data) {
            const item = data[i]
            const type = item.educationEventType
            if (type === "CLASSIC_PAY_PAYMENT") {
                total = total + item.amountPaid
            }
            if (type === "DRIVING_LESSON" || type === "PRODUCT_BOOKING") {
                total = total - item.amountToPay
            }
        }
        console.debug(total)
        return total
    }
}