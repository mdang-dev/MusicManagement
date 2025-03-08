import fs from 'fs';
import path from 'path';

const directory = '../data/images'

const saveFile = (file, fileName) => {

  const filePath = path.join(directory, fileName);

  if(!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  fs.writeFileSync(filePath, file, "utf8");

  console.log(`File saved to ${filePath}`);

}

export  { saveFile };



