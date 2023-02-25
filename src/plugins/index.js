/*
 * Copyright (c) 2023 KaratekHD. All rights reserverd.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 * This project is not affiliated with drive.buzz or Fahrschulcockpit.
 */

/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import {loadFonts} from './webfontloader'
import vuetify from './vuetify'
import router from '../router'
import { plugin } from './auth'
import cookies from 'vue-cookies';

export function registerPlugins(app) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(plugin)
    .use(cookies)
}
