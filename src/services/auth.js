import api from "@/services/api";

export default {
  login(username, password) {
    const payload = {"username": username, "password": password, "authClient": "DRIVE_BUZZ_WEB"}
    return api().post('/generate-token', payload)
  },
  getEducation(token) {
    const config = {
      headers: {Authorization: `Bearer ${token}`}
    }
    const endpoint = "/student-educations/with-theory/student/current"
    return api().get(endpoint, config)
  }
}