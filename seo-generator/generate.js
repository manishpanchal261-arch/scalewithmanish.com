import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..");
const pagesPath = path.join(__dirname, "pages.json");
const templatePath = path.join(__dirname, "template.html");
const sitemapPath = path.join(projectRoot, "sitemap.xml");
const homepagePath = path.join(projectRoot, "index.html");

const baseUrl = "https://scalewithmanish-com.vercel.app";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createServiceList(keyword) {
  const services = [
    `${keyword} strategy and account planning`,
    "Campaign setup and account restructuring",
    "Keyword, audience and competitor research",
    "Conversion tracking and analytics review",
    "Budget and bidding optimisation",
    "Performance reporting and controlled scaling"
  ];

  return services
    .map((service) => `<li>${escapeHtml(service)}</li>`)
    .join("\n");
}
function createCategoryContent(page) {
  const keyword = page.keyword;
  const location = page.location || "India";

  return `
<section class="content-section">
  <div class="container">
    <h2>Professional ${keyword} Services in ${location}</h2>

    <p>
      ScaleWithManish provides professional <strong>${keyword}</strong> services
      for ecommerce brands, startups and service businesses across ${location}.
      Every campaign is built around measurable business goals, accurate tracking,
      qualified lead generation and long-term growth.
    </p>

    <h2>Why Choose ScaleWithManish?</h2>

    <p>
      Every account is managed using proven optimisation strategies including
      campaign restructuring, conversion tracking, bidding optimisation,
      audience refinement and continuous performance analysis.
    </p>

    <h2>Industries We Work With</h2>

    <ul>
      <li>Ecommerce Brands</li>
      <li>Service Businesses</li>
      <li>SaaS Companies</li>
      <li>Healthcare</li>
      <li>Education</li>
      <li>Real Estate</li>
      <li>B2B Companies</li>
      <li>Local Businesses</li>
    </ul>

    <h2>Our Process</h2>

    <ol>
      <li>Business Audit</li>
      <li>Competitor Research</li>
      <li>Campaign Strategy</li>
      <li>Campaign Launch</li>
      <li>Weekly Optimisation</li>
      <li>Monthly Reporting</li>
    </ol>
  </div>
</section>
`;
}

function createFaqHtml(keyword) {
  const faqs = [
    {
      question: `What does a ${keyword} do?`,
      answer:
        `A ${keyword} helps plan, manage and optimise advertising campaigns ` +
        `with a focus on measurable outcomes such as qualified leads, ` +
        `purchases, acquisition cost and return on ad spend.`
    },
    {
      question: "Can you audit my existing campaigns?",
      answer:
        "Yes. Existing campaigns can be reviewed for tracking, targeting, " +
        "account structure, bidding, advertisements, landing pages and wasted advertising spend."
    },
    {
      question: "Do you work with businesses across India?",
      answer:
        "Yes. ScaleWithManish works remotely with ecommerce brands, " +
        "startups and service businesses across India."
    },
    {
      question: "How quickly can advertising results improve?",
      answer:
        "Timelines depend on account history, budget, competition, " +
        "conversion tracking, the offer and the sales cycle. " +
        "Advertising results cannot be guaranteed."
    }
  ];

  return faqs
    .map(
      (faq) => `
      <article class="faq-item">
        <h3>${escapeHtml(faq.question)}</h3>
        <p>${escapeHtml(faq.answer)}</p>
      </article>`
    )
    .join("\n");
}

function createFaqSchema(keyword) {
  const faqs = [
    {
      question: `What does a ${keyword} do?`,
      answer:
        `A ${keyword} plans, manages and optimises advertising campaigns ` +
        `around measurable business outcomes.`
    },
    {
      question: "Can you audit existing campaigns?",
      answer:
        "Yes. Existing campaigns can be reviewed for tracking, targeting, " +
        "structure, bidding and wasted advertising spend."
    },
    {
      question: "Do you work with businesses across India?",
      answer:
        "Yes. Services are available remotely to businesses across India."
    }
  ];

  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    },
    null,
    2
  );
}

function createRelatedLinks(currentSlug, pages) {
  return pages
    .filter((page) => page.slug !== currentSlug)
    .slice(0, 6)
    .map(
      (page) =>
        `<a href="/${escapeHtml(page.slug)}/">${escapeHtml(page.keyword)}</a>`
    )
    .join("\n");
}

function updateSitemap(pages) {
  const fixedUrls = [
    "",
    "pricing/",
    "privacy_policy/",
    "term-condition/",
    "google-ads-expert/",
    "performance-marketer/",
    "meta-ads-expert/",
    "digital-marketing-services/"
  ];

  const generatedUrls = pages.map((page) => `${page.slug}/`);
  const uniqueUrls = [...new Set([...fixedUrls, ...generatedUrls])];

  const sitemapUrls = uniqueUrls
    .map(
      (url) => `  <url>
    <loc>${baseUrl}/${url}</loc>
  </url>`
    )
    .join("\n\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${sitemapUrls}

</urlset>
`;

  fs.writeFileSync(sitemapPath, sitemap, "utf8");
  console.log("Updated: /sitemap.xml");
}

function updateHomepageLinks(pages) {
  if (!fs.existsSync(homepagePath)) {
    console.log("Skipped homepage links: index.html not found");
    return;
  }

  let homepage = fs.readFileSync(homepagePath, "utf8");

  const startMarker = "<!-- AUTO_INTERNAL_LINKS_START -->";
  const endMarker = "<!-- AUTO_INTERNAL_LINKS_END -->";

  const links = pages
    .map(
      (page) =>
        `<a href="/${escapeHtml(page.slug)}/">${escapeHtml(page.keyword)}</a>`
    )
    .join("\n");

  const linksBlock = `${startMarker}
<div class="auto-seo-links">
  <h4>More Services</h4>

  <div class="auto-seo-links-grid">
    ${links}
  </div>
</div>
${endMarker}`;

  const markerPattern = new RegExp(
    `${startMarker}[\\s\\S]*?${endMarker}`,
    "m"
  );

  if (homepage.includes(startMarker) && homepage.includes(endMarker)) {
    homepage = homepage.replace(markerPattern, linksBlock);
  } else {
    homepage = homepage.replace(
      "</footer>",
      `${linksBlock}\n</footer>`
    );
  }

  fs.writeFileSync(homepagePath, homepage, "utf8");
  console.log("Updated: homepage internal links");
}

const pages = JSON.parse(fs.readFileSync(pagesPath, "utf8"));
const template = fs.readFileSync(templatePath, "utf8");

for (const page of pages) {
  if (!page.keyword || !page.slug) {
    console.log("Skipped invalid page:", page);
    continue;
  }

  const outputFolder = path.join(projectRoot, page.slug);
  const outputFile = path.join(outputFolder, "index.html");

  const location = page.location || "India";
  const service = page.service || page.keyword;
  const category = page.category || "Digital Marketing";

  const h1 = `${page.keyword} in ${location}`;
  const title = `${h1} | ScaleWithManish`;

  const description =
    `Looking for ${page.keyword} in ${location}? ` +
    `ScaleWithManish helps businesses improve campaign performance, ` +
    `generate qualified leads and scale through data-driven advertising.`;

  const html = template
  .replaceAll("{{TITLE}}", escapeHtml(title))
  .replaceAll("{{H1}}", escapeHtml(h1))
  .replaceAll("{{DESCRIPTION}}", escapeHtml(description))
  .replaceAll("{{KEYWORD}}", escapeHtml(page.keyword))
  .replaceAll("{{SLUG}}", escapeHtml(page.slug))
  .replaceAll("{{SERVICE}}", escapeHtml(service))
  .replaceAll("{{LOCATION}}", escapeHtml(location))
  .replaceAll("{{CATEGORY}}", escapeHtml(category))
  .replaceAll("{{SERVICE_LIST}}", createServiceList(page.keyword))
  .replaceAll("{{CATEGORY_CONTENT}}", createCategoryContent(page))
  .replaceAll("{{FAQ_ITEMS}}", createFaqHtml(page.keyword))
  .replaceAll("{{FAQ_SCHEMA}}", createFaqSchema(page.keyword))
  .replaceAll("{{CATEGORY_CONTENT}}", createCategoryContent(page))
  .replaceAll(
    "{{RELATED_LINKS}}",
    createRelatedLinks(page.slug, pages)
  );

  fs.mkdirSync(outputFolder, { recursive: true });
  fs.writeFileSync(outputFile, html, "utf8");

  console.log(`Created: /${page.slug}/index.html`);
}

updateSitemap(pages);
updateHomepageLinks(pages);

console.log(`\nDone. ${pages.length} SEO pages processed.`);