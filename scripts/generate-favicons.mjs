import favicons from 'favicons'
import fs from 'fs'
import path from 'path'

const source = path.resolve('public/images/profile-avatar.png')
const outDir = path.resolve('public')

const configuration = {
  path: '/',
  appName: 'Al Djaber Qamis',
  appShortName: 'ADQ',
  appDescription: 'Boutique Al Djaber Qamis',
  developerName: 'Al Djaber Qamis',
  dir: 'auto',
  lang: 'fr-DZ',
  display: 'standalone',
  orientation: 'any',
  background: '#000000',
  theme_color: '#000000',
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: false,
    favicons: true,
    windows: true,
    yandex: false,
  },
}

try {
  const response = await favicons(source, configuration)

  // Write images
  for (const image of response.images) {
    const filePath = path.join(outDir, image.name)
    fs.writeFileSync(filePath, image.contents)
  }

  // Write files (manifest, browserconfig)
  for (const file of response.files) {
    const filePath = path.join(outDir, file.name)
    fs.writeFileSync(filePath, file.contents)
  }

  // Inject HTML into a file we control (we will reference manually in layout)
  const htmlHintsPath = path.join(outDir, 'favicons-snippets.html')
  fs.writeFileSync(htmlHintsPath, response.html.join('\n'))

  console.log('✅ Favicons générés dans', outDir)
} catch (err) {
  console.error('❌ Erreur génération favicons:', err.message)
  process.exit(1)
}



