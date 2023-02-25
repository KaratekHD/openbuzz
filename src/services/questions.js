/*
 * Copyright (c) 2023 KaratekHD. All rights reserverd.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 * This project is not affiliated with drive.buzz or Fahrschulcockpit.
 */

import api from "@/services/api";
import {useAuth} from "@/plugins/auth";

export default {
  next() {
    const auth = useAuth()
    const route = '/theory-questions/next&studentEducationId=' + auth.student.education
    const config = {
      headers: {Authorization: `Bearer ${auth.token}`}
    }
    return api().get(route, config)
  },
  nextWithToken(auth) {
    const route = '/theory-questions/next&studentEducationId=' + auth.student.education
    const config = {
      headers: {Authorization: `Bearer ${auth.token}`}
    }
    return api().get(route, config)
  },
  sendResult(auth, question, correct) {
    const route = '/student-question-answers'
    let payload = {"correct": correct, "studentEducationId": auth.student.education, "theoryQuestionId": question.id}
    if(question.withPicture) {
      payload["numberOfTimesPictureWasEnlarged"] = 0
    }
    const config = {
      headers: {Authorization: `Bearer ${auth.token}`}
    }
    api().post(route, payload, config)
  }
}