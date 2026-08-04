import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..");
const pagesPath = path.join(__dirname, "pages.json");
const templatePath = path.join(__dirname, "template.html");

const pages = JSON.parse(fs.readFileSync(pagesPath, "utf8"));
const template = fs.readFileSync(templatePath, "utf8");

for (const page of pages) {
  if (!page.keyword || !page.slug) {
    console.log("Skipped invalid page:", page);
    continue;
  }

  const outputFolder = path.join(projectRoot, page.slug);
  const outputFile = path.join(outputFolder, "index.html");

  const title = `${page.keyword} in India | ScaleWithManish`;
  const description = `Looking for ${page.keyword} in India? ScaleWithManish helps businesses generate leads, improve campaign performance and scale through data-driven advertising.`;

  const html = template
  .replaceAll("{{TITLE}}", title)
  .replaceAll("{{DESCRIPTION}}", description)
  .replaceAll("{{KEYWORD}}", page.keyword)
  .replaceAll("{{SLUG}}", page.slug);

  fs.mkdirSync(outputFolder, { recursive: true });
  fs.writeFileSync(outputFile, html, "utf8");

  console.log(`Created: /${page.slug}/index.html`);
}

console.log(`\nDone. ${pages.length} SEO pages processed.`);