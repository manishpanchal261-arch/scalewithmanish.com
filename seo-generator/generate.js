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
  const category = (page.category || "").toLowerCase();

  let content = "";

  if (category.includes("google")) {

    content = `
<h2>Why ${keyword} Matters</h2>

<p>
Google Ads is one of the fastest ways to generate qualified leads and sales.
A properly structured account improves Quality Score, lowers CPC and increases ROI.
</p>

<h2>What We Optimise</h2>

<ul>
<li>Search Campaigns</li>
<li>Performance Max</li>
<li>Shopping Campaigns</li>
<li>Demand Gen</li>
<li>YouTube Ads</li>
<li>Conversion Tracking</li>
</ul>

`;

  }

  else if (category.includes("analytics")) {

    content = `
<h2>${keyword} Services</h2>

<p>
Accurate analytics ensures every marketing decision is backed by data.
We configure GA4, ecommerce events and attribution reporting.
</p>

<h2>Services Include</h2>

<ul>
<li>GA4 Setup</li>
<li>Enhanced Ecommerce</li>
<li>Events</li>
<li>Conversions</li>
<li>Attribution</li>
<li>Reporting</li>
</ul>

`;

  }

  else if (category.includes("ppc")) {

    content = `
<h2>${keyword}</h2>

<p>
PPC campaigns require continuous optimisation.
Our focus is reducing CPC while improving conversion rate and ROAS.
</p>

<h2>Optimisation Areas</h2>

<ul>
<li>Keyword Research</li>
<li>Ad Copy</li>
<li>Landing Pages</li>
<li>Bid Strategies</li>
<li>Audience Targeting</li>
<li>Competitor Analysis</li>
</ul>

`;

  }

  else {

    content = `
<h2>${keyword}</h2>

<p>
ScaleWithManish provides professional digital marketing services designed around measurable business growth.
</p>
`;

  }

  return `
<section class="section">
<div class="container">

<h2>Professional ${keyword} Services in ${location}</h2>

<p>
ScaleWithManish helps businesses generate qualified leads, improve campaign performance and scale profitably.
</p>

${content}

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

let description = "";

switch ((page.category || "").toLowerCase()) {

  case "google ads":
    description =
      `Looking for a ${page.keyword} in ${location}? ScaleWithManish helps businesses improve Google Ads performance, reduce CPC, increase conversions and maximise ROAS.`;
    break;

  case "analytics":
    description =
      `Professional ${page.keyword} services in ${location}. Set up GA4, conversion tracking, ecommerce reporting and analytics for better business decisions.`;
    break;

  case "ppc":
    description =
      `Hire a ${page.keyword} in ${location}. Improve campaign performance, optimise CPC, increase conversions and scale profitably.`;
    break;

  case "sem":
    description =
      `${page.keyword} services in ${location}. Build high-performing paid search campaigns that generate qualified leads and measurable ROI.`;
    break;

  default:
    description =
      `Looking for ${page.keyword} in ${location}? ScaleWithManish helps businesses improve campaign performance and generate qualified leads.`;
}

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