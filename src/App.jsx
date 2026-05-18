import { AnimatePresence, motion } from "framer-motion";
import "@google/model-viewer";
import {
  ArrowRight,
  Box,
  ChevronRight,
  Filter,
  Image as ImageIcon,
  Layers3,
  Mail,
  Menu,
  MousePointer2,
  Phone,
  X
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
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

const PROMO_END_DATE = new Date("2026-06-30T23:59:59+09:30").getTime();

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
    description: "Awarded to the reseller with the highest Microsoft Business Premium growth or the most Acronis M365 Backup deployments.",
    footnote: "Must Activate before 30 June 2026.",
    image: entryLeaderCloudImage,
    logo: leaderCloudLogo,
    href: "#leader-cloud"
  }
];

const teamContacts = [
  {
    team: "Leader Sales",
    phone: "1300 453 233",
    phoneHref: "tel:1300453233",
    email: "sales@leadersystems.com.au",
    emailHref: "mailto:sales@leadersystems.com.au"
  },
  {
    team: "Breeze Connect",
    phone: "1300 127 339",
    phoneHref: "tel:1300127339",
    email: "help@breezeconnect.com.au",
    emailHref: "mailto:help@breezeconnect.com.au"
  },
  {
    team: "Leader Cloud",
    phone: "1300 537 277",
    phoneHref: "tel:1300537277",
    email: "help@leadercloud.com.au",
    emailHref: "mailto:help@leadercloud.com.au"
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

function useDragScroll() {
  const railRef = useRef(null);
  const dragState = useRef({ active: false, moved: false, startX: 0, scrollLeft: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const stopDrag = (event) => {
    const rail = railRef.current;
    if (rail?.hasPointerCapture?.(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }
    dragState.current.active = false;
    setIsDragging(false);
  };

  return {
    dragClassName: `draggable-rail${isDragging ? " is-dragging" : ""}`,
    railProps: {
      ref: railRef,
      onPointerDown: (event) => {
        if (event.button !== undefined && event.button !== 0) return;
        const rail = railRef.current;
        if (!rail || rail.scrollWidth <= rail.clientWidth) return;

        dragState.current = {
          active: true,
          moved: false,
          startX: event.clientX,
          scrollLeft: rail.scrollLeft
        };
        setIsDragging(true);
        rail.setPointerCapture?.(event.pointerId);
      },
      onPointerMove: (event) => {
        const rail = railRef.current;
        const state = dragState.current;
        if (!rail || !state.active) return;

        const deltaX = event.clientX - state.startX;
        if (Math.abs(deltaX) > 4) {
          state.moved = true;
        }
        rail.scrollLeft = state.scrollLeft - deltaX;
      },
      onPointerUp: stopDrag,
      onPointerCancel: stopDrag,
      onPointerLeave: stopDrag,
      onClickCapture: (event) => {
        if (!dragState.current.moved) return;
        event.preventDefault();
        event.stopPropagation();
        dragState.current.moved = false;
      }
    }
  };
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
      aria-label="Countdown to promo close on 30 June 2026"
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
      {children && <p>{children}</p>}
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const entryRail = useDragScroll();
  const categoryRail = useDragScroll();
  const serviceRail = useDragScroll();

  const visibleProducts = useMemo(() => {
    return activeCategory === "All" ? promoProducts : promoProducts.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  const setMode = (sku, mode) => {
    setViewerModes((current) => ({ ...current, [sku]: mode }));
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className={`site-header ${isMenuOpen ? "menu-open" : ""}`}>
        <a className="brand" href="#top" aria-label="LEADER promo home" onClick={closeMenu}>
          <img src={epicAdventureLogo} alt="Epic Adventure Promo" />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav>
          <a href="#ways" onClick={closeMenu}>How to Enter</a>
          <a href="#ubiquiti" onClick={closeMenu}>Ubiquiti</a>
          <a href="#breeze" onClick={closeMenu}>Breeze Connect</a>
          <a href="#leader-cloud" onClick={closeMenu}>Leader Cloud</a>
        </nav>
        <a className="header-cta" href="#enquiry" onClick={closeMenu}>Enquire Now</a>
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
          <motion.div className={`entry-grid ${entryRail.dragClassName}`} variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} {...entryRail.railProps}>
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
            <div className={`category-tabs ${categoryRail.dragClassName}`} role="tablist" aria-label="Ubiquiti product categories" {...categoryRail.railProps}>
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
          <motion.div className={`service-grid ${serviceRail.dragClassName}`} variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} {...serviceRail.railProps}>
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
          <SectionIntro kicker="ACTIVATE & WIN" title="LEADER CLOUD" />
          <div className="cloud-split">
            <motion.article className="cloud-card" whileHover={{ y: -8 }}>
              <div className="cloud-image">
                <img src={leaderCloudMicrosoftImage} alt="Microsoft cloud visual" />
              </div>
              <div className="cloud-copy">
                <h3>Microsoft</h3>
                <p>Awarded to the reseller with the highest Business Premium growth.</p>
                <a className="buy-button" href="https://leadercloud.com.au/microsoft/" target="_blank" rel="noopener">Learn more <ChevronRight size={15} /></a>
              </div>
            </motion.article>
            <motion.article className="cloud-card accent" whileHover={{ y: -8 }}>
              <div className="cloud-image">
                <img src={leaderCloudAcronisImage} alt="Acronis cyber protection visual" />
              </div>
              <div className="cloud-copy">
                <h3>Acronis</h3>
                <p>Awarded to the reseller with the most M365 Backup deployments.</p>
                <a className="buy-button" href="https://leadercloud.com.au/acronis/" target="_blank" rel="noopener">Learn More <ChevronRight size={15} /></a>
              </div>
            </motion.article>
          </div>
        </section>

        <section className="enquiry-section" id="enquiry">
          <div>
            <p className="kicker">Talk to the team</p>
            <h2>NEED ASSISTANCE?</h2>
            <p>Speak to your account manager to know more about how you can grab a seat to our epic jetski adventure promo, or contact the right team directly.</p>
          </div>
          <div className="contact-panel" aria-label="Promo contact details">
            {teamContacts.map((contact) => (
              <section className="contact-group" key={contact.team}>
                <h3>{contact.team}</h3>
                <a href={contact.phoneHref}>
                  <Phone size={18} />
                  {contact.phone}
                </a>
                <a href={contact.emailHref}>
                  <Mail size={18} />
                  {contact.email}
                </a>
              </section>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <span>Copyright 2026 LEADER Computers</span>
        <span>Promotion runs 1 May 2026 - 30 June 2026. Terms and conditions apply.</span>
      </footer>

      <CountdownTimer />

    </>
  );
}

export default App;
