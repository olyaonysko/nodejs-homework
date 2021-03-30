const app = require("../app");
const mongoDbConnect = require("../model/mongoDb");
const createFolderIsExist = require('../helpers/create-dir')
require('dotenv').config()

const PORT = process.env.PORT || 3000;

mongoDbConnect
  .then(() => {
    app.listen(PORT, async () => {
      const UPLOAD_DIR = process.env.UPLOAD_DIR
      const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS
      await createFolderIsExist(UPLOAD_DIR)
      await createFolderIsExist(AVATARS_OF_USERS)
      console.log(
        `Server running. Use our API on port: http://localhost:${PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(`Server connection error. Error: ${err.message}`);
    process.exit(1);
  });
