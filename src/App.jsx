import { AnimatePresence, motion } from "framer-motion";
import "@google/model-viewer";
import {
  ArrowRight,
  Box,
  ChevronRight,
  Filter,
  Image as ImageIcon,
  Layers3,
  MousePointer2
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import "./styles.css";
import { categories as productCategories, products as promoProducts } from "./productData.js";
import jetskiHero from "./assets/jetski-hero2.png";
import acronisLogo from "./assets/logos/Acronis_logo.png";
import breezeLogo from "./assets/logos/breeze_connect_logo.png";
import epicAdventureLogo from "./assets/logos/epic-ADVENTURE_logo.png";
import leaderCloudLogo from "./assets/logos/leader_cloud_logo.png";
import microsoftLogo from "./assets/logos/microsoft_logo.png";
import ubiquitiLogo from "./assets/logos/ubiquiti_logo.png";
import cameraSecurityIcon from "./assets/icons/camera_security_icon.svg";
import enterpriseGatewayIcon from "./assets/icons/enterprise_gateway_icon.svg";
import enterpriseSwitchingIcon from "./assets/icons/enterprise_switching_icon.svg";
import enterpriseWifiIcon from "./assets/icons/enterprise_wifi_icon.svg";
import breezeSipImage from "./assets/cards/breeze-sip.png";
import breezeTeamsImage from "./assets/cards/breeze-teams-voice.png";
import breezeWholesaleImage from "./assets/cards/breeze-wholesale.png";
import entryBreezeImage from "./assets/cards/entry-breeze-connect.png";
import entryLeaderCloudImage from "./assets/cards/entry-leader-cloud.png";
import entryUbiquitiImage from "./assets/cards/entry-ubiquiti.png";
import leaderCloudAcronisImage from "./assets/cards/leader-cloud-acronis.png";
import leaderCloudMicrosoftImage from "./assets/cards/leader-cloud-microsoft.png";

const categoryIcons = {
  "Cloud Gateways": enterpriseGatewayIcon,
  "Access Points": enterpriseWifiIcon,
  Switching: enterpriseSwitchingIcon,
  "Camera Security": cameraSecurityIcon
};

const PROMO_END_DATE = new Date("2026-05-31T23:59:59+09:30").getTime();

const entryWays = [
  {
    number: "01",
    brand: "Ubiquiti",
    title: "Stack Product Tickets",
    description: "Buy any qualifying UniFi product. Spend minimum $2.5k from list of sku to get 1 ticket into draw.",
    footnote: "Each SKU = +1 ticket.",
    image: entryUbiquitiImage,
    logo: ubiquitiLogo,
    href: "#ubiquiti"
  },
  {
    number: "02",
    brand: "Breeze Connect",
    title: "Activate Voice MRR",
    description: "Activate $5,000 monthly recurring revenue on SIP, Wholesale, or Microsoft Teams Operator Connect during the promo window.",
    footnote: "NBN services are not included.",
    image: entryBreezeImage,
    logo: breezeLogo,
    href: "#breeze"
  },
  {
    number: "03",
    brand: "Leader Cloud",
    title: "ACTIVATE LEADER CLOUD",
    description: "Activate $30k on Microsoft or Acronis before the promo window closes.",
    footnote: "Must activate before 30 May.",
    image: entryLeaderCloudImage,
    logo: leaderCloudLogo,
    href: "#leader-cloud"
  }
];

const sponsors = [
  { name: "Leader Cloud", logo: leaderCloudLogo },
  { name: "Breeze Connect", logo: breezeLogo },
  { name: "Microsoft", logo: microsoftLogo },
  { name: "Ubiquiti", logo: ubiquitiLogo },
  { name: "Acronis", logo: acronisLogo }
];

const breezeServices = [
  {
    title: "Microsoft Teams Voice",
    url: "https://breezeconnect.com.au/teams-voice/",
    description: "Expand your Microsoft Teams capabilities with a complete hosted PBX system and collaboration tool in one.",
    image: breezeTeamsImage
  },
  {
    title: "BREEZE SIP Plans",
    url: "https://breezeconnect.com.au/sip-plans/",
    description: "We offer the best value VoIP services in Australia! Choose the perfect SIP solution for your business with pay-as-you-go and unlimited call options.",
    cta: "View Sip Plans",
    image: breezeSipImage
  },
  {
    title: "Breeze Wholesale VoIP",
    url: "https://breezeconnect.com.au/wholesale/",
    description: "Join our league of wholesale VoIP providers and offer your own unified communication solutions based on your client's needs.",
    image: breezeWholesaleImage
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
};

function getCountdownParts() {
  const distance = Math.max(0, PROMO_END_DATE - Date.now());
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  return { days, hours, minutes, seconds };
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getCountdownParts);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getCountdownParts()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (!visible) return null;

  const units = [
    ["days", timeLeft.days],
    ["hours", timeLeft.hours],
    ["mins", timeLeft.minutes],
    ["secs", timeLeft.seconds]
  ];

  return (
    <motion.div
      className="countdown"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      aria-label="Countdown to promo close on 31 May 2026"
    >
      <span className="countdown-label">Promo closes in</span>
      <div className="countdown-units">
        {units.map(([label, value]) => (
          <span className="countdown-unit" key={label}>
            <strong>{String(value).padStart(2, "0")}</strong>
            <small>{label}</small>
          </span>
        ))}
      </div>
      <button className="countdown-close" onClick={() => setVisible(false)} aria-label="Dismiss countdown">×</button>
    </motion.div>
  );
}

function SectionIntro({ kicker, title, children }) {
  return (
    <motion.div
      className="section-intro"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
    >
      <div>
        <p className="kicker">{kicker}</p>
        <h2>{title}</h2>
      </div>
      <p>{children}</p>
    </motion.div>
  );
}

function EntryVisual({ image, brand, number }) {
  return (
    <div className="entry-visual">
      <img src={image} alt={`${brand} promo visual`} />
      <span className="entry-number">{number}</span>
    </div>
  );
}

function ProductViewer({ product, mode, onModeChange }) {
  const activeMode = mode === "3d" && !product.modelUrl ? "image" : mode;

  return (
    <div className="product-viewer">
      <AnimatePresence mode="wait">
        {activeMode === "image" && (
          <motion.div
            key="image"
            className="product-stage image-stage"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
          >
            <img src={product.image} alt={product.name} />
          </motion.div>
        )}
        {activeMode === "features" && (
          <motion.div
            key="features"
            className="product-stage feature-stage"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
          >
            <img src={product.image} alt="" />
            {product.features.map((feature, index) => (
              <motion.span
                className={`feature-pin pin-${index + 1}`}
                key={feature}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08 }}
              >
                <i />
                {feature}
              </motion.span>
            ))}
          </motion.div>
        )}
        {activeMode === "3d" && (
          <motion.div
            key="3d"
            className="product-stage model-stage"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
          >
            <model-viewer
              src={product.modelUrl}
              poster={product.image}
              alt={`${product.name} 3D model`}
              camera-controls
              auto-rotate
              interaction-prompt="auto"
              shadow-intensity="0.28"
              exposure="0.95"
              environment-image="neutral"
              camera-orbit="45deg 66deg auto"
              field-of-view="30deg"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="view-toggle" aria-label={`Viewer mode for ${product.name}`}>
        <button type="button" className={activeMode === "image" ? "active" : ""} onClick={() => onModeChange("image")} title="Image view">
          <ImageIcon size={15} />
        </button>
        <button type="button" className={activeMode === "features" ? "active" : ""} onClick={() => onModeChange("features")} title="Feature view">
          <MousePointer2 size={15} />
        </button>
        {product.modelUrl && (
          <button type="button" className={activeMode === "3d" ? "active" : ""} onClick={() => onModeChange("3d")} title="3D view">
            <Box size={15} />
            <span>3D</span>
          </button>
        )}
      </div>
    </div>
  );
}

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewerModes, setViewerModes] = useState({});

  const visibleProducts = useMemo(() => {
    return activeCategory === "All" ? promoProducts : promoProducts.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  const setMode = (sku, mode) => {
    setViewerModes((current) => ({ ...current, [sku]: mode }));
  };

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="LEADER promo home">
          <img src={epicAdventureLogo} alt="Epic Adventure Promo" />
        </a>
        <nav>
          <a href="#ways">How to Enter</a>
          <a href="#ubiquiti">Ubiquiti</a>
          <a href="#breeze">Breeze Connect</a>
          <a href="#leader-cloud">Leader Cloud</a>
        </nav>
        <a className="header-cta" href="#enquiry">Enquire Now</a>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-video" style={{ "--hero-image": `url(${jetskiHero})` }}>
          </div>
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Win a seat on an epic Jetski Adventure.</h1>
            <p className="hero-copy">A 3-hour adrenaline hit off Adelaide's coastline with partners and customers, followed by lunch, drinks, and a BBQ after docking.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#ways">
                HOW TO ENTER <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        </section>

        <section className="sponsors-section">
          {sponsors.map((sponsor) => (
            <motion.div
              className="sponsor-logo"
              key={sponsor.name}
              whileHover={{ y: -4, opacity: 1 }}
            >
              <img src={sponsor.logo} alt={`${sponsor.name} logo`} />
            </motion.div>
          ))}
        </section>

        <section className="page-section" id="ways">
          <SectionIntro kicker="Promo mechanics" title="Three ways to grab a seat">
            Hit the target during the promo window and you're in the draw.
          </SectionIntro>
          <motion.div className="entry-grid" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            {entryWays.map((way) => (
              <motion.a className="entry-card" variants={cardVariants} key={way.brand} href={way.href} aria-label={`Go to ${way.brand} section`}>
                <EntryVisual image={way.image} brand={way.brand} number={way.number} />
                <div className="entry-body">
                  <p className="kicker">{way.brand}</p>
                  <h3>{way.title}</h3>
                  <p>{way.description}</p>
                  <small>{way.footnote}</small>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </section>

        <section className="page-section" id="ubiquiti">
          <SectionIntro kicker="Ubiquiti spin-to-win" title="QUALIFYING UBIQUITI PRODUCTS">
            Buy any qualifying UniFi product. Spend minimum $2.5k from list of sku to get 1 ticket into draw.
          </SectionIntro>

          <div className="tabs-wrap">
            <Filter size={18} />
            <div className="category-tabs" role="tablist" aria-label="Ubiquiti product categories">
              {productCategories.map((category) => {
                const icon = categoryIcons[category];
                return (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === category}
                    className={activeCategory === category ? "active" : ""}
                    key={category}
                    onClick={() => setActiveCategory(category)}
                  >
                    {icon ? <img src={icon} alt="" /> : <Layers3 size={16} />}
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div className="product-grid" layout>
            <AnimatePresence mode="popLayout">
              {visibleProducts.map((product) => {
                const mode = viewerModes[product.sku] || "image";
                return (
                  <motion.article
                    className="product-card"
                    key={product.sku}
                    layout
                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 20 }}
                    transition={{ duration: 0.28 }}
                  >
                    <ProductViewer
                      product={product}
                      mode={mode}
                      onModeChange={(nextMode) => setMode(product.sku, nextMode)}
                    />
                    <div className="product-copy">
                      <h3>{product.name}</h3>
                      <code>{product.sku}</code>
                      <p>{product.description}</p>
                      <a className="buy-button" href={product.href} target="_blank" rel="noopener">
                        Buy Now <ChevronRight size={15} />
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </section>

        <section className="page-section" id="breeze">
          <SectionIntro kicker="$5,000 MRR pathway" title="BREEZE CONNECT">
            Activate $5,000 monthly recurring revenue on SIP, Wholesale, or Microsoft Teams Operator Connect during the promo window.
          </SectionIntro>
          <motion.div className="service-grid" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            {breezeServices.map((service) => {
              return (
                <motion.a className="service-card" variants={cardVariants} href={service.url} target="_blank" rel="noopener" key={service.title}>
                  <div className="service-image">
                    <img src={service.image} alt={`${service.title} visual`} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="buy-button">{service.cta || "Learn more"} <ChevronRight size={15} /></span>
                </motion.a>
              );
            })}
          </motion.div>
        </section>

        <section className="page-section cloud-section" id="leader-cloud">
          <SectionIntro kicker="ACTIVATE $30K" title="LEADER CLOUD">
            Must activate before 30 May.
          </SectionIntro>
          <div className="cloud-split">
            <motion.article className="cloud-card" whileHover={{ y: -8 }}>
              <div className="cloud-image">
                <img src={leaderCloudMicrosoftImage} alt="Microsoft cloud visual" />
              </div>
              <div className="cloud-copy">
                <h3>Microsoft</h3>
                <p>Activate qualifying Microsoft cloud monthly recurring revenue through Leader Cloud before the promo window closes.</p>
                <a className="buy-button" href="https://leadercloud.com.au/microsoft/" target="_blank" rel="noopener">Learn more <ChevronRight size={15} /></a>
              </div>
            </motion.article>
            <motion.article className="cloud-card accent" whileHover={{ y: -8 }}>
              <div className="cloud-image">
                <img src={leaderCloudAcronisImage} alt="Acronis cyber protection visual" />
              </div>
              <div className="cloud-copy">
                <h3>Acronis</h3>
                <p>Build new Acronis recurring revenue through Leader Cloud and contribute toward the $30k target.</p>
                <a className="buy-button" href="https://leadercloud.com.au/acronis/" target="_blank" rel="noopener">Learn More <ChevronRight size={15} /></a>
              </div>
            </motion.article>
          </div>
        </section>

        <section className="enquiry-section" id="enquiry">
          <div>
            <p className="kicker">Talk to the team</p>
            <h2>NEED ASSISTANCE?</h2>
            <p>Speak to your account manager to know more about how you can grab a seat to our epic jetski adventure promo or send us an enquiry!</p>
          </div>
          <form>
            <label>Name<input type="text" placeholder="Your name" /></label>
            <label>Company<input type="text" placeholder="Company name" /></label>
            <label>Email<input type="email" placeholder="you@example.com" /></label>
            <label>Phone<input type="tel" placeholder="Optional" /></label>
            <label className="full">Interested pathway<select><option>Ubiquiti qualifying SKUs</option><option>Breeze Connect</option><option>Leader Cloud</option><option>General question</option></select></label>
            <label className="full">Message<textarea placeholder="Tell us what you are planning to activate or purchase." /></label>
            <button className="primary-button full" type="button">SUBMIT ENQUIRY <ArrowRight size={18} /></button>
          </form>
        </section>
      </main>

      <footer>
        <span>Copyright 2026 LEADER Computers</span>
        <span>Promotion runs 1 April 2026 - 31 May 2026. Terms and conditions apply.</span>
      </footer>

      <CountdownTimer />

    </>
  );
}

export default App;
