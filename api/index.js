const packages = require("all-the-package-names")

export default (_request, response) => {
  const npmPackage = packages[Math.floor(Math.random() * packages.length)]
  response.redirect(`https://www.npmjs.com/package/${npmPackage}`, 200)
}