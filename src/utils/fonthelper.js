/*
 * Copyright (c) 2023 KaratekHD. All rights reserverd.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 * This project is not affiliated with drive.buzz or Fahrschulcockpit.
 */

import {useDisplay} from "vuetify";

export default {
    get_header_size() {
        const {mobile} = useDisplay()
        if (mobile._object.xs) {
            return "text-h4"

        } else {
            return "text-h2"
        }
    }
}