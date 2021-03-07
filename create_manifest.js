const path = require('path');
const fs = require('fs/promises');

const pkg = require('./package.json');


async function createPackage() {
  const snippets = await fs.readdir(path.join(__dirname, 'snippets'));

  const manifest = {
    ...pkg,
    contributes: {
      snippets: snippets.map(s => {
        return { language: 'yaml', path: path.join('.', 'snippets', s) }
      })
    }
  };

  await fs.writeFile(path.join(__dirname, 'package.json'), JSON.stringify(manifest, null, 2));
}

createPackage();

