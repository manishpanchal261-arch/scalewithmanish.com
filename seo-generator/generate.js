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
  const keyword = escapeHtml(page.keyword);
  const location = escapeHtml(page.location || "India");
  const category = String(page.category || "Digital Marketing").toLowerCase();

  let intro = "";
  let focusTitle = "";
  let focusItems = [];
  let approachTitle = "";
  let approachText = "";

  if (category.includes("google ads")) {
    intro = `
      A successful ${keyword} strategy requires more than launching campaigns.
      Account structure, search intent, conversion tracking, landing-page quality
      and bidding decisions must work together to generate profitable growth.
    `;

    focusTitle = "Google Ads Areas We Optimise";

    focusItems = [
      "Search campaign structure and keyword targeting",
      "Performance Max and Shopping campaign optimisation",
      "Quality Score and search-term analysis",
      "Smart bidding and budget allocation",
      "Google Merchant Center and product-feed reviews",
      "Conversion tracking and enhanced conversions"
    ];

    approachTitle = "Our Google Ads Approach";

    approachText = `
      We review campaign data, search terms, conversion quality and business
      profitability before making scaling decisions. The goal is to reduce wasted
      spend while increasing qualified leads, purchases and return on ad spend.
    `;
  } else if (category.includes("meta")) {
    intro = `
      ${keyword} combines creative strategy, audience testing, conversion tracking
      and structured campaign optimisation across Facebook and Instagram.
      Strong performance depends on both the advertisement and the offer behind it.
    `;

    focusTitle = "Meta Ads Areas We Optimise";

    focusItems = [
      "Facebook and Instagram campaign structure",
      "Creative testing and performance analysis",
      "Prospecting and retargeting audiences",
      "Meta Pixel and Conversion API tracking",
      "Lead-generation and ecommerce campaigns",
      "Budget scaling and creative fatigue monitoring"
    ];

    approachTitle = "Our Meta Ads Approach";

    approachText = `
      We test multiple creative angles, audiences and campaign structures while
      monitoring CPA, ROAS, lead quality and conversion rate. Budgets are scaled
      only when performance remains stable.
    `;
  } else if (category.includes("analytics")) {
    intro = `
      Reliable analytics gives businesses a clear view of which campaigns,
      channels and customer actions are producing meaningful results.
      ${keyword} helps improve measurement and decision-making.
    `;

    focusTitle = "Analytics and Tracking Services";

    focusItems = [
      "GA4 setup and property configuration",
      "Google Tag Manager implementation",
      "Ecommerce event and purchase tracking",
      "Conversion and funnel measurement",
      "Attribution and channel reporting",
      "Debugging missing or duplicated events"
    ];

    approachTitle = "Our Measurement Approach";

    approachText = `
      We audit the complete tracking journey from advertisement click to final
      conversion. Events, values, transaction IDs and attribution signals are
      reviewed so campaign decisions are based on reliable data.
    `;
  } else if (category.includes("ppc")) {
    intro = `
      ${keyword} requires continuous management of keywords, advertisements,
      bids, budgets and landing pages. Small inefficiencies can quickly increase
      acquisition costs and reduce campaign profitability.
    `;

    focusTitle = "PPC Optimisation Areas";

    focusItems = [
      "Keyword and competitor research",
      "Search-term and negative-keyword reviews",
      "Advertisement copy and asset optimisation",
      "Bid strategy and budget management",
      "Landing-page and conversion-rate analysis",
      "CPA, CPC and ROAS performance monitoring"
    ];

    approachTitle = "Our PPC Approach";

    approachText = `
      Campaigns are managed around commercial intent and measurable conversions.
      We continuously identify wasted spend, improve relevance and allocate budget
      toward the strongest-performing campaigns.
    `;
  } else if (category.includes("sem")) {
    intro = `
      ${keyword} helps businesses reach potential customers while they are
      actively searching for relevant products or services. Campaign structure
      and search intent are critical to generating qualified traffic.
    `;

    focusTitle = "Search Engine Marketing Services";

    focusItems = [
      "Paid-search strategy and account planning",
      "Commercial keyword research",
      "Search advertisement development",
      "Landing-page alignment",
      "Conversion tracking and attribution",
      "Campaign reporting and optimisation"
    ];

    approachTitle = "Our SEM Approach";

    approachText = `
      We connect keyword intent, advertisement messaging and landing-page content
      to create a more relevant customer journey and improve conversion efficiency.
    `;
  } else if (category.includes("cro")) {
    intro = `
      ${keyword} focuses on improving the percentage of visitors who complete
      valuable actions such as purchases, enquiries, registrations or booked calls.
    `;

    focusTitle = "Conversion Optimisation Areas";

    focusItems = [
      "Landing-page and funnel audits",
      "Offer and CTA analysis",
      "Form and checkout optimisation",
      "Mobile user-experience review",
      "Analytics and behaviour analysis",
      "Testing recommendations and prioritisation"
    ];

    approachTitle = "Our CRO Approach";

    approachText = `
      We identify friction across the customer journey and prioritise changes
      based on expected impact, implementation effort and available performance data.
    `;
  } else if (category.includes("performance")) {
    intro = `
      ${keyword} combines media buying, analytics, creative testing and conversion
      optimisation to improve customer acquisition and scalable revenue growth.
    `;

    focusTitle = "Performance Marketing Capabilities";

    focusItems = [
      "Full-funnel acquisition strategy",
      "Google Ads and Meta Ads management",
      "Creative and audience testing",
      "Conversion tracking and attribution",
      "CPA and ROAS optimisation",
      "Controlled budget scaling"
    ];

    approachTitle = "Our Performance Approach";

    approachText = `
      Decisions are based on business KPIs including acquisition cost, revenue,
      conversion rate and profitability—not impressions or clicks alone.
    `;
  } else {
    intro = `
      ${keyword} helps businesses build a structured digital acquisition system
      using paid advertising, analytics and ongoing optimisation.
    `;

    focusTitle = "Digital Marketing Services";

    focusItems = [
      "Digital growth strategy",
      "Google Ads and Meta Ads management",
      "Lead-generation campaigns",
      "Analytics and conversion tracking",
      "Landing-page optimisation",
      "Performance reporting"
    ];

    approachTitle = "Our Growth Approach";

    approachText = `
      We focus on measurable outcomes and continuously improve campaign quality,
      tracking accuracy and conversion performance.
    `;
  }

  const focusList = focusItems
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("\n");

  return `
    <h2>Professional ${keyword} Services in ${location}</h2>

    <p>
      ${intro.trim()}
    </p>

    <h2>${escapeHtml(focusTitle)}</h2>

    <ul class="service-grid">
      ${focusList}
    </ul>

    <h2>${escapeHtml(approachTitle)}</h2>

    <p>
      ${approachText.trim()}
    </p>
  `;
}
function createEeatSection() {
  const linkedinUrl =
    "https://www.linkedin.com/in/manish-747057117/";

  return `
    <div class="eeat-heading">
      <span class="eeat-eyebrow">
        Experience • Certifications • Performance
      </span>

      <h2>Why Businesses Trust ScaleWithManish</h2>

      <p>
        Campaign decisions are based on reliable tracking, measurable
        business outcomes and continuous performance optimisation—not
        vanity metrics.
      </p>
    </div>

    <div class="eeat-grid">

      <article class="eeat-card">
        <div class="eeat-badge">5+</div>

        <h3>Years of Experience</h3>

        <p>
          Hands-on performance marketing experience across ecommerce,
          D2C, startups, lead generation and service businesses.
        </p>
      </article>

      <article class="eeat-card">
        <div class="eeat-badge">GAds</div>

        <h3>Google Ads Certified</h3>

        <p>
          Google Ads Search certified with experience in campaign
          strategy, account optimisation and scalable acquisition.
        </p>
      </article>

      <article class="eeat-card">
        <div class="eeat-badge">GA4</div>

        <h3>Google Analytics Certified</h3>

        <p>
          Experienced in GA4, conversion measurement, ecommerce
          tracking and data-backed advertising decisions.
        </p>
      </article>

      <article class="eeat-card">
        <div class="eeat-badge">AI</div>

        <h3>AI-Powered Ads Certified</h3>

        <p>
          Certified in AI-powered performance advertising and modern
          campaign automation and optimisation practices.
        </p>
      </article>

      <article class="eeat-card">
        <div class="eeat-badge">360°</div>

        <h3>Multi-Platform Expertise</h3>

        <p>
          Google Ads, Meta Ads, GA4, Google Merchant Center, Shopify
          and Klaviyo expertise within one growth-focused system.
        </p>
      </article>

      <article class="eeat-card">
        <div class="eeat-badge">ROAS</div>

        <h3>Performance-First Approach</h3>

        <p>
          Campaigns are managed around CPA, ROAS, conversion rate,
          lead quality and sustainable revenue growth.
        </p>
      </article>

    </div>

    <div class="eeat-profile">
      <div>
        <h3>Work With a Certified Performance Marketer</h3>

        <p>
          Review professional experience, certifications and marketing
          expertise on LinkedIn.
        </p>
      </div>

      <a
        href="${linkedinUrl}"
        target="_blank"
        rel="noopener noreferrer"
        class="eeat-profile-button"
      >
        View LinkedIn Profile
      </a>
    </div>
  `;
}
function createCTA(page) {
  const category = String(page.category || "").toLowerCase();

  if (category.includes("google ads")) {
    return {
      title: "Get a Free Google Ads Audit",
      subtitle:
        "Receive an account-specific review of campaign structure, tracking, wasted spend and scaling opportunities.",
      button: "Book Google Ads Audit"
    };
  }

  if (category.includes("analytics")) {
    return {
      title: "Need Better GA4 Tracking?",
      subtitle:
        "Get your GA4, conversion events, ecommerce tracking and reporting setup reviewed.",
      button: "Book Tracking Audit"
    };
  }

  if (category.includes("meta")) {
    return {
      title: "Improve Your Meta Ads Performance",
      subtitle:
        "Get a professional review of your campaign structure, creative testing, tracking and scaling strategy.",
      button: "Book Meta Ads Audit"
    };
  }

  if (category.includes("ppc") || category.includes("sem")) {
    return {
      title: "Improve Your PPC Campaigns",
      subtitle:
        "Review keywords, search terms, bids, advertisements, landing pages and conversion performance.",
      button: "Book PPC Strategy Call"
    };
  }

  if (category.includes("cro")) {
    return {
      title: "Improve Your Conversion Rate",
      subtitle:
        "Get your landing pages, forms, checkout flow and customer journey reviewed for conversion opportunities.",
      button: "Book CRO Audit"
    };
  }

  if (category.includes("performance")) {
    return {
      title: "Build a More Profitable Growth Strategy",
      subtitle:
        "Review your acquisition channels, tracking, creative performance and scaling opportunities.",
      button: "Book Strategy Call"
    };
  }

  return {
    title: "Ready to Improve Your Advertising Performance?",
    subtitle:
      "Get an account-specific review of your campaigns, tracking, landing pages and potential wasted advertising spend.",
    button: "Apply for a Free Audit"
  };
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

function createContextualLinks(page, pages) {
  const related = pages
    .filter((relatedPage) => relatedPage.slug !== page.slug)
    .slice(0, 4);

  if (related.length === 0) {
    return "";
  }

  const links = related
    .map(
      (relatedPage) => `
        <li>
          <a href="/${escapeHtml(relatedPage.slug)}/">
            ${escapeHtml(relatedPage.keyword)}
          </a>
        </li>
      `
    )
    .join("\n");

  return `
    <section class="section contextual-links-section">
      <div class="container">
        <h2>Related Marketing Services</h2>

        <p>
          Businesses investing in
          <strong>${escapeHtml(page.keyword)}</strong>
          often improve other areas of their marketing stack as well.
        </p>

        <ul class="contextual-links-list">
          ${links}
        </ul>
      </div>
    </section>
  `;
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
const cta = createCTA(page);
  const html = template
  .replaceAll("{{TITLE}}", escapeHtml(title))
  .replaceAll("{{H1}}", escapeHtml(h1))
  .replaceAll("{{DESCRIPTION}}", escapeHtml(description))
  .replaceAll("{{KEYWORD}}", escapeHtml(page.keyword))
  .replaceAll("{{SLUG}}", escapeHtml(page.slug))
  .replaceAll("{{SERVICE}}", escapeHtml(service))
  .replaceAll("{{LOCATION}}", escapeHtml(location))
  .replaceAll("{{CATEGORY}}", escapeHtml(category))
  .replaceAll("{{CTA_TITLE}}", escapeHtml(cta.title))
.replaceAll("{{CTA_SUBTITLE}}", escapeHtml(cta.subtitle))
.replaceAll("{{CTA_BUTTON}}", escapeHtml(cta.button))
  .replaceAll("{{SERVICE_LIST}}", createServiceList(page.keyword))
  .replaceAll("{{CATEGORY_CONTENT}}", createCategoryContent(page))
  .replaceAll("{{EEAT_SECTION}}", createEeatSection())
  .replaceAll("{{FAQ_ITEMS}}", createFaqHtml(page.keyword))
  .replaceAll("{{FAQ_SCHEMA}}", createFaqSchema(page.keyword))
  
  .replaceAll(
  "{{RELATED_LINKS}}",
  createRelatedLinks(page.slug, pages)
)
.replaceAll(
  "{{CONTEXTUAL_LINKS}}",
  createContextualLinks(page, pages)
);
  fs.mkdirSync(outputFolder, { recursive: true });
  fs.writeFileSync(outputFile, html, "utf8");

  console.log(`Created: /${page.slug}/index.html`);
}

updateSitemap(pages);
updateHomepageLinks(pages);

console.log(`\nDone. ${pages.length} SEO pages processed.`);