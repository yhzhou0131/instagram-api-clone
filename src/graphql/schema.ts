import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import getDirName from '@/utils/util.js';

const __dirname = getDirName(import.meta);

const gqlFiles = readdirSync(join(__dirname, 'typedefs'));

let typeDefs = '';

gqlFiles.forEach((file) => {
  typeDefs += readFileSync(join(__dirname, 'typedefs', file), {
    encoding: 'utf8',
  });
});

export { typeDefs };
