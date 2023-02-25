/*
 * Copyright (c) 2023 KaratekHD. All rights reserverd.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 * This project is not affiliated with drive.buzz or Fahrschulcockpit.
 */

import api from "@/services/api";

export default {
    getPayments(token) {
        const endpoint = '/education-events/student/current'
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }
        return api().get(endpoint, config)
    },
    getSaldo(token, id) {
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }
        let endpoint = "/balance/student-education/" + id
        return api().get(endpoint, config)
    }
}