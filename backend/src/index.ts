import { createApp } from "./create-app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT as string;

(async () => {
  const app = await createApp();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
