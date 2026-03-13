import { spawn } from "node:child_process";
import path from "node:path";

const root = process.cwd();

function run(label, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      cwd: root,
      stdio: "inherit",
      shell: false,
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${label} failed with exit code ${code ?? "unknown"}`));
    });
  });
}

async function main() {
  const nextBin = path.join("node_modules", "next", "dist", "bin", "next");

  await run("lint", [nextBin, "lint"]);
  await run("build", [nextBin, "build"]);
  await run("release-gate", [path.join("scripts", "release-gate.mjs")]);
  console.log("PASS release-check: lint, build, and release-gate all passed.");
}

main().catch((error) => {
  console.error("FAIL release-check:", error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
