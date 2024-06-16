import type { Config } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";
import { cwd } from "node:process";
loadEnvConfig(cwd());
console.log(process.env.DATABASE_URL);
export default {
  driver: "mysql2",
  dbCredentials: {
    uri: 'mysql://crkqo1huicx7ev3br042:pscale_pw_RCBkLu2cLXTIRNyqxgxjeZv54MVrG6CkRbjC1CUctQ@aws.connect.psdb.cloud/apollo?ssl={"rejectUnauthorized":true}',
  },
  schema: "./shared/db/schema.ts",
  out: "./drizzle",
} satisfies Config;
