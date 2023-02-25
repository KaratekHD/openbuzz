/*
 * Copyright (c) 2023 KaratekHD. All rights reserverd.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 * This project is not affiliated with drive.buzz or Fahrschulcockpit.
 */

import api from "@/services/api";
import {useAuth} from "@/plugins/auth";

export default {
  getExam() {
    const auth = useAuth()
    const route = '/theory-pre-exams&studentEducationId=' + auth.student.education
    const config = {
      headers: {Authorization: `Bearer ${auth.token}`}
    }
    return api().post(route, undefined, config)
  },

  submitExam(auth, answers, id) {
    const config = {
      headers: {Authorization: `Bearer ${auth.token}`}
    }
    const route = '/theory-pre-exams/add-question-answers/'
    return api().post(route, {"theoryPreExamId": id, "questionAnswers": answers}, config)
  },
  getHistory(auth) {
    const route = "/theory-pre-exams/student/current"
    const config = {
      headers: {Authorization: `Bearer ${auth.token}`}
    }
    return api().get(route, config)
  }
}