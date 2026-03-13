import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const checks = [];

function ok(label, details) {
  checks.push({ status: "ok", label, details });
}

function fail(label, details) {
  checks.push({ status: "fail", label, details });
}

async function exists(relativePath) {
  try {
    await access(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function checkRequiredFiles() {
  const required = [
    "app/manifest.ts",
    "app/robots.ts",
    "app/sitemap.xml/route.ts",
    "app/health/page.tsx",
    "public/icon-192.png",
    "public/icon-512.png",
    "public/apple-icon.png",
    "public/maskable-icon-512.png",
  ];

  const missing = [];
  for (const file of required) {
    if (!(await exists(file))) missing.push(file);
  }

  if (missing.length > 0) {
    fail("required-files", `Missing: ${missing.join(", ")}`);
    return;
  }

  ok("required-files", "Manifest, robots, sitemap, health route, and icon assets exist.");
}

async function checkSiteUrlAndCanonical() {
  const metadataPath = path.join(root, "app/metadata.ts");
  const seoPath = path.join(root, "lib/seo.ts");
  const [metadataContent, seoContent] = await Promise.all([
    readFile(metadataPath, "utf8"),
    readFile(seoPath, "utf8"),
  ]);

  const hasProdUrl = /url:\s*"https:\/\/namelaunchpad\.com"/.test(metadataContent);
  const hasCanonical = /alternates:\s*{\s*canonical:\s*path,\s*}/m.test(seoContent);

  if (!hasProdUrl) {
    fail("site-url", "siteConfig.url is not set to https://namelaunchpad.com in app/metadata.ts");
  } else {
    ok("site-url", "Production site URL is configured.");
  }

  if (!hasCanonical) {
    fail("canonical", "createSeoMetadata does not define alternates.canonical.");
  } else {
    ok("canonical", "Canonical path is set by createSeoMetadata.");
  }
}

async function checkRobotsAndSitemapReference() {
  const robotsContent = await readFile(path.join(root, "app/robots.ts"), "utf8");
  const hasAllowAll = /allow:\s*"\//.test(robotsContent);
  const hasSitemap = /sitemap:\s*["'`].*sitemap\.xml["'`]/.test(robotsContent);

  if (!hasAllowAll || !hasSitemap) {
    fail("robots", "robots.ts must allow crawl and reference sitemap.xml.");
    return;
  }

  ok("robots", "robots.ts allows crawl and references sitemap.xml.");
}

async function listFilesRecursive(dir) {
  const output = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git") continue;
      output.push(...(await listFilesRecursive(absolute)));
      continue;
    }
    output.push(absolute);
  }

  return output;
}

async function checkNoIndexTraps() {
  const files = await listFilesRecursive(path.join(root, "app"));
  const sourceFiles = files.filter((file) => /\.(ts|tsx)$/.test(file));
  const offenders = [];

  for (const file of sourceFiles) {
    const content = await readFile(file, "utf8");
    if (/index:\s*false/.test(content) || /["']noindex["']/.test(content)) {
      offenders.push(path.relative(root, file));
    }
  }

  if (offenders.length > 0) {
    fail("noindex-traps", `Found possible noindex traps: ${offenders.join(", ")}`);
    return;
  }

  ok("noindex-traps", "No noindex markers found in app routes.");
}

async function run() {
  await checkRequiredFiles();
  await checkSiteUrlAndCanonical();
  await checkRobotsAndSitemapReference();
  await checkNoIndexTraps();

  const failed = checks.filter((item) => item.status === "fail");
  for (const item of checks) {
    const prefix = item.status === "ok" ? "PASS" : "FAIL";
    console.log(`${prefix} ${item.label}: ${item.details}`);
  }

  if (failed.length > 0) {
    process.exitCode = 1;
    return;
  }

  console.log("PASS release-gate: all technical SEO checks passed.");
}

run().catch((error) => {
  console.error("FAIL release-gate:", error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
