/*
 * Copyright (c) 2023 KaratekHD. All rights reserverd.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 * This project is not affiliated with drive.buzz or Fahrschulcockpit.
 */

import api from "@/services/api";


export default {
  answers(auth) {
    const route = '/student-question-answers/stats&learningModeId=1&studentEducationId=' + auth.student.education
    const config = {
      headers: {Authorization: `Bearer ${auth.token}`}

    }

    return api().get(route, config)
  }
}