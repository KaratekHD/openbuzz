/*
 * Copyright (c) 2023 KaratekHD. All rights reserverd.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 * This project is not affiliated with drive.buzz or Fahrschulcockpit.
 */

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