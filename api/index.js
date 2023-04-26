const fetch = require('node-fetch')
const packages = require('all-the-package-names')

export default async (req, res) => {
  let monthlyDownloads = req.query?.downloads ?? 0
  let downloads = 0

  let npmPackage = pickNpmPackage()
  downloads = await getDownloads(npmPackage)

  do {
    npmPackage = pickNpmPackage()
    downloads = await getDownloads(npmPackage)
  } while (downloads <= monthlyDownloads)

  console.log('Downloads:', downloads)
  console.log('Monthly Downloads:', monthlyDownloads)
  
  try {
    const response = await fetch(`https://registry.npmjs.org/${npmPackage}`)
    const data = await response.json()

    res.send({
      npmURL: `https://www.npmjs.com/package/${npmPackage}`,
      ...data
    })
  } catch (error) {
    throw new Error(error)
  }
}

function pickNpmPackage () {
  return packages[Math.floor(Math.random() * packages.length)]
}

async function getDownloads (npmPackage) {
  try {
    const response = await fetch(`https://api.npmjs.org/downloads/point/last-month/${npmPackage}`)
    const data = await response.json()
    return data.downloads
  } catch (error) {
    throw new Error(error)
  }
}