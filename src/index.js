import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import createDirIfNotExists from './utilits/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constant/java.js';
const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);
};

void bootstrap();






