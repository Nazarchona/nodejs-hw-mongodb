import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constant/java.js';
import createDirIfNoteExists from './utilits/createDirIfNotExists.js';

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
  await createDirIfNoteExists(TEMP_UPLOAD_DIR);
  await createDirIfNoteExists(UPLOAD_DIR);
};
bootstrap();






