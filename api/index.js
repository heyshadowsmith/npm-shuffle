const fetch = require('node-fetch')
const packages = require('all-the-package-names')

export default async (_request, res) => {
  const npmPackage = packages[Math.floor(Math.random() * packages.length)]
  
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