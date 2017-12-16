const args = ["start"];
const opts = { stdout: "inherit", cwd: "./client", shell: true };
require("child_process").spawn("npm", args, opts);