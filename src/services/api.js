/*
 * Copyright (c) 2023 KaratekHD. All rights reserverd.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 * This project is not affiliated with drive.buzz or Fahrschulcockpit.
 */

import axios from "axios";

export default (url = import.meta.env.VITE_API_BASE_URL) => {
    return axios.create({
        baseURL: url
    })
}
