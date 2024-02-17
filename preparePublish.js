const fs = require('fs-extra') // Using fs-extra for convenience
const path = require('path')

// Define paths
const rootDir = process.cwd() // Assumes the script is run from the project root
const distDir = path.join(rootDir, 'dist')
const publishLibDir = path.join(rootDir, 'publish-lib')

// Create publish-lib directory if it doesn't exist
fs.ensureDirSync(publishLibDir)

// Function to generate a custom package.json
const generateCustomPackageJson = () => {
  const originalPackageJsonPath = path.join(rootDir, 'package.json')
  const packageData = require(originalPackageJsonPath)

  // Define keys to exclude in the new package.json
  const keysToExclude = ['scripts', 'devDependencies', 'lint-staged']

  // Remove the keys
  keysToExclude.forEach((key) => delete packageData[key])

  // Convert the modified object back to a JSON string
  const newPackageJsonContent = JSON.stringify(packageData, null, 2)

  // Write the new package.json to publish-lib
  const newPackageJsonPath = path.join(publishLibDir, 'package.json')
  fs.writeFileSync(newPackageJsonPath, newPackageJsonContent, 'utf8')
}

// Generate custom package.json
generateCustomPackageJson()

// Copy the entire dist directory to publish-lib
fs.copySync(distDir, path.join(publishLibDir, 'dist'))

// Optionally, copy LICENSE and README.md if they exist
const filesToCopy = ['LICENSE', 'README.md']
filesToCopy.forEach((file) => {
  const sourcePath = path.join(rootDir, file)
  if (fs.existsSync(sourcePath)) {
    fs.copySync(sourcePath, path.join(publishLibDir, file))
  }
})

console.log('Publishing library is prepared in the publish-lib directory.')
