const packages = require("all-the-package-names")
const npmPackage = packages[Math.floor(Math.random() * packages.length)]
 
export default (_request, response) => {
  response.redirect(`https://www.npmjs.com/package/${npmPackage}`, 200)
}