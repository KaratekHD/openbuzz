/*
 * Copyright (c) 2023 KaratekHD. All rights reserverd.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 * This project is not affiliated with drive.buzz or Fahrschulcockpit.
 */

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
      raw: null,
      login: async function (username, password) {
        const res = await authHelper.login(username, password)
        const data = res.data
        this.token = data.token
        const educationResult = await authHelper.getEducation(this.token)
        const educationData = educationResult.data
        this.authorized = true
        this.student = {
          "firstName": data.student.firstName,
          "lastName": data.student.lastName,
          "email": data.student.learnAppEmail,
          "id": data.student.id,
          "education": educationData[0].id
        }
        this.raw = data
      },
      loginCookie: async function (cookie) {
        console.log("Login with cookie!")
        const res = await authHelper.getEducation(cookie.token)
        if (res.status === 200) {
          this.student = cookie.student
          this.token = cookie.token
          this.authorized = true
          this.raw = cookie.raw
          return true
        } else {
          console.log("Login with cookie failed!")
          return false
        }

      }


    }

    app.provide(injectionKey, auth)
    app.config.globalProperties.$auth = auth
  }

}