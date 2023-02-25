/*
 * Copyright (c) 2023 KaratekHD. All rights reserverd.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 * This project is not affiliated with drive.buzz or Fahrschulcockpit.
 */

/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

export async function loadFonts () {
  const webFontLoader = await import(/* webpackChunkName: "webfontloader" */'webfontloader')

  webFontLoader.load({
    google: {
      families: ['Roboto:100,300,400,500,700,900&display=swap'],
    },
  })
}
