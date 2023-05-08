const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'version.json');

const incrementVersion = ()=> {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading version.json:', err);
      process.exit(1);
    }

    const versionData = JSON.parse(data);
    const [major, minor, patch] = versionData.version.split('.').map(Number);

    const newPatch = (patch + 1) % 10;
    const newMinor = newPatch === 0 ? (minor + 1) % 10 : minor;
    const newMajor = newPatch === 0 && newMinor === 0 ? major + 1 : major;

    versionData.version = `${newMajor}.${newMinor}.${newPatch}`;


    fs.writeFile(filePath, JSON.stringify(versionData, null, 2), (err) => {
      if (err) {
        console.error('Error updating version.json:', err);
        process.exit(1);
      }
      console.log('Version updated to:', versionData.version);
    });
  });
}

incrementVersion();