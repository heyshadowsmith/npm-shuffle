const axios = require('axios')
const packages = require('all-the-package-names')

export default async (_request, res) => {
  const npmPackage = packages[Math.floor(Math.random() * packages.length)]
  
  try {
    const response = await axios.get(`https://registry.npmjs.org/${npmPackage}`)

    res.send({
      npmURL: `https://www.npmjs.com/package/${npmPackage}`,
      ...response.data
    })
  } catch (error) {
    throw new Error(error)
  }
}