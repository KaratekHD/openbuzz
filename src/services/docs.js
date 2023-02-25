/*
 * Copyright (c) 2023 KaratekHD. All rights reserverd.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 * This project is not affiliated with drive.buzz or Fahrschulcockpit.
 */

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