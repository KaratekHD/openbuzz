/*
 * Copyright (c) 2023 KaratekHD. All rights reserverd.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 * This project is not affiliated with drive.buzz or Fahrschulcockpit.
 */

import api from "@/services/api";
import balanceHelper from "@/services/balance";

function now () { const d = new Date(); d.setHours(0, 0, 0, 0); return d }

export default {
    async getEvents(token) {
        const endpoint = "/appointments/student/current"
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }
        let temp = []
        const response_appointments = await api().get(endpoint, config)
        const data_appointments = response_appointments.data
        temp.push.apply(temp, data_appointments)
        const response_balance = await balanceHelper.getPayments(token)
        const data_balance = response_balance.data
        for (const i in data_balance) {
            if (data_balance[i].educationEventType === "THEORY_EXAM") {
                temp.push({
                    appointmentType: "THEORY_EXAM",
                    name: data_balance[i].description,
                    date: data_balance[i].date,
                    appointmentId: null,
                    time: null,
                    duration: null,
                    instructorInitials: null,
                    note: null,
                    seen: null,
                    signed: null,
                    student: null,
                    standardProductShortName: "TE",
                    licenseClass: data_balance[i].licenseClass
                })
            }
        }
        temp.sort(function (a, b) {
            const date1 = new Date(a.date)
            const date2 = new Date(b.date)
            return date1 - date2
        })
        temp.reverse()
        let up = []
        let done = []
        var now = new Date();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        now.setMilliseconds(0);
        for(const i in temp) {
            if(now.getTime() > (new Date(temp[i].date))) {
                done.push(temp[i])
            } else {
                up.push(temp[i])
            }

        }
        return {all: temp, up: up, done: done}
    }
}