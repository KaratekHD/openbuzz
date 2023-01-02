import {inject} from 'vue'
import authHelper from '@/services/auth'

const injectionKey = Symbol('auth')

export const useAuth = () => inject(injectionKey)

export const plugin = {
  install(app) {
    let auth = {
      token: null,
      authorized: false,
      student: {"firstName": "", "lastName": "", "email": "", "id": ""},
      login: async function (username, password) {
        let res = await authHelper.login(username, password)
        const data = res.data
        this.token = data.token
        this.authorized = true
        this.student = {
          "firstName": data.student.firstName,
          "lastName": data.student.lastName,
          "email": data.student.learnAppEmail,
          "id": data.student.id,
          "education": data.student.studentEducationIds[0]
        }
      }


    }

    app.provide(injectionKey, auth)
    app.config.globalProperties.$auth = auth
  }

}