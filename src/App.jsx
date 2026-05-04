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
import jetskiHero from "./assets/jetski-hero2.png";
import acronisLogo from "./assets/logos/Acronis_logo.png";
import breezeLogo from "./assets/logos/breeze_connect_logo.png";
import epicJetskiLogo from "./assets/logos/epic jetski_logo.png";
import leaderCloudLogo from "./assets/logos/leader_cloud_logo.png";
import microsoftLogo from "./assets/logos/microsoft_logo.png";
import ubiquitiLogo from "./assets/logos/ubiquiti_logo.png";
import cameraSecurityIcon from "./assets/icons/camera_security_icon.svg";
import doorAccessIcon from "./assets/icons/door_access_icon.svg";
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
  Gateways: enterpriseGatewayIcon,
  "Enterprise WiFi": enterpriseWifiIcon,
  "Enterprise Switches": enterpriseSwitchingIcon,
  "Camera Security": cameraSecurityIcon,
  "Door Access": doorAccessIcon
};

const PROMO_END_DATE = new Date("2026-05-31T23:59:59+09:30").getTime();

const categories = [
  "All",
  "Gateways",
  "Enterprise WiFi",
  "Enterprise Switches",
  "Camera Security",
  "Door Access"
];

const products = [
  {
    name: "Enterprise Fortress Gateway",
    sku: "NHU-EFG",
    category: "Gateways",
    image: "https://cdn.ecomm.ui.com/products/65adb8bd-c318-45f9-8b9f-9c15fb025ec2/7321698a-e18b-4038-8ac1-f23d8d124c50.png",
    storeUrl: "https://store.ui.com/us/en/products/efg",
    href: "https://partner.leadersystems.com.au/products.html?tYHWOfesO6A=80ALiU3/EWP+sXvznNJILg==JCInKqvq4B3zVLkesx7v",
    description: "25G Cloud Gateway with 500+ UniFi device / 5,000+ client support, 12.5 Gbps IPS routing, and complete high availability.",
    features: ["25G gateway", "12.5 Gbps IPS", "High availability"]
  },
  {
    name: "E7 Access Point",
    sku: "NHU-E7",
    category: "Enterprise WiFi",
    image: "https://cdn.ecomm.ui.com/products/93ae773e-8969-4889-8591-2c227a31ac3f/09ff1a3a-0ce6-43ad-8188-607086944059.png",
    storeUrl: "https://store.ui.com/us/en/category/wifi-flagship/products/e7",
    modelUrl: "https://cdn.ecomm.ui.com/products/93ae773e-8969-4889-8591-2c227a31ac3f/c4c22b11-5831-4b5a-ba10-1cf33860c49a.glb",
    href: "https://partner.leadersystems.com.au/products.html?8YqPO3Td9Y4=2+6ajxBPDLBFx+Td/Nns9Q==YnEGSyl/fvXb7eUsLos=",
    description: "Enterprise-grade indoor access point with 10-stream WiFi 7 performance, a 10 GbE uplink, and a redundant GbE port.",
    features: ["WiFi 7", "10 GbE uplink", "Redundant GbE"]
  },
  {
    name: "E7 Campus Access Point",
    sku: "NHU-E7-CAMPUS",
    category: "Enterprise WiFi",
    image: "https://cdn.ecomm.ui.com/products/67bc019d-eb07-4427-8989-b15bfd43cb5f/cbf37b3b-14d3-46f9-9017-0bbf83ec9444.png",
    storeUrl: "https://store.ui.com/us/en/products/e7-campus-us",
    modelUrl: "https://cdn.ecomm.ui.com/products/67bc019d-eb07-4427-8989-b15bfd43cb5f/5ec9167a-3b86-4195-b5ec-7e86bb806b57.glb",
    href: "https://partner.leadersystems.com.au/products.html?oZK+OJ6MS8s=4dIiXR5mFEnxP6vPIHaA1A==RL32aaU+0FpgJhkKS6Bm4aIT2rVL",
    description: "Indoor/outdoor tri-band WiFi 7 access point with PRISM active RF filtering, directional antennas, and high availability ports.",
    features: ["Tri-band WiFi 7", "PRISM filtering", "Directional antennas"]
  },
  {
    name: "E7 Audience Access Point",
    sku: "NHU-E7-AUDIENCE",
    category: "Enterprise WiFi",
    image: "https://cdn.ecomm.ui.com/products/993e484e-4058-49eb-9cdb-4b5e89aec544/3a623234-838e-4663-81d5-0504347980eb.png",
    storeUrl: "https://store.ui.com/us/en/products/e7-audience-us",
    modelUrl: "https://cdn.ecomm.ui.com/products/993e484e-4058-49eb-9cdb-4b5e89aec544/4ec0fd78-d94b-4cbe-a95b-1237af64bcd0.glb",
    href: "https://partner.leadersystems.com.au/products.html?zH4YyBj1kbA=r0qaf0QnASS6hC4afVNtfw==j/+nos3iFXqnHhFJy5RRiRHKdNSNUbw=",
    description: "High-density indoor/outdoor access point with 12-stream 5 GHz and 6 GHz WiFi 7 performance and a 10 GbE uplink.",
    features: ["High density", "12-stream radio", "10 GbE uplink"]
  },
  {
    name: "Enterprise Campus Aggregation",
    sku: "NHU-ECS-AGGREGATION",
    category: "Enterprise Switches",
    image: "https://cdn.ecomm.ui.com/products/82c1c564-0e08-4b27-a7b9-95729cca00bd/273218d0-162e-4389-8143-686302547137.png",
    storeUrl: "https://store.ui.com/us/en/category/switching-enterprise/products/ecs-aggregation",
    href: "https://partner.leadersystems.com.au/products.html?H5CKjLrNrjg=uuJxW+B9uOqFF3xp5Zb7kw==esc6BU6zUoR27cNnllwjWh8XvQD/+jQTyYkL",
    description: "1.8 Tbps high-density 100G/25G Layer 3 Etherlighting aggregation switch with MC-LAG support.",
    features: ["1.8 Tbps switching", "100G / 25G", "MC-LAG support"]
  },
  {
    name: "Enterprise Campus 24 PoE",
    sku: "NHU-ECS-24-POE",
    category: "Enterprise Switches",
    image: "https://cdn.ecomm.ui.com/products/f83443e3-38b7-415b-85cd-e3da1d0c044c/6cae8c8d-f8ab-4207-b0f9-111898f30f66.png",
    storeUrl: "https://store.ui.com/us/en/category/switching-enterprise/products/ecs-24-poe",
    href: "https://partner.leadersystems.com.au/products.html?ezvv9KviA2s=XrO6CY8P2N8n2QuqmxB9MA==usmH5doyuTbc1ZkiTqRxr3QThfynhQ==",
    description: "24-port Layer 3 Etherlighting PoE+++ switch with high-capacity 10 GbE RJ45 and 25G SFP28 connections.",
    features: ["24 PoE+++ ports", "Layer 3", "25G SFP28"]
  },
  {
    name: "Enterprise Campus 48 PoE",
    sku: "NHU-ECS-48-POE",
    category: "Enterprise Switches",
    image: "https://cdn.ecomm.ui.com/products/c0e18508-feb3-4d93-93d7-2a022815cfac/feb987d6-1eb6-497a-83fd-af24f4116192.png",
    storeUrl: "https://store.ui.com/us/en/category/switching-enterprise/products/ecs-48-poe",
    href: "https://partner.leadersystems.com.au/products.html?rKR7vHBdZe0=if/RtIV9eDTrXNWUovljZw==zGe5KKeAk+ehuRVbOpUMCh2P9MTK7A==",
    description: "48-port Layer 3 Etherlighting PoE+++ switch with high-capacity 10 GbE RJ45 and 25G SFP28 connections.",
    features: ["48 PoE+++ ports", "10 GbE RJ45", "25G uplinks"]
  },
  {
    name: "Gateway Enterprise",
    sku: "NHU-UXG-ENTERPRISE",
    category: "Gateways",
    image: "https://cdn.ecomm.ui.com/products/3dbb7c83-aa76-4110-9ddf-7bfd7d8511cc/53b4a089-6728-4971-9668-3d76513637f9.png",
    storeUrl: "https://store.ui.com/us/en/category/all-cloud-gateways/products/uxg-enterprise",
    href: "https://partner.leadersystems.com.au/products.html?Jwa9uNNlmEg=hSE6BqE7fzbJlgzlM0w0bw==3vZnGLn8vtm7SODCl4zIPu42j4OCI8U3Dts=",
    description: "25G independent gateway with multi-WAN load balancing, 12.5 Gbps IPS routing, and redundant hot-swap PSUs.",
    features: ["Multi-WAN", "12.5 Gbps IPS", "Hot-swap PSUs"]
  },
  {
    name: "Enterprise NVR",
    sku: "NHU-ENVR",
    category: "Camera Security",
    image: "https://cdn.ecomm.ui.com/products/69d591b5-0c1b-4b75-9361-0f3237df94a7/80b3e786-8416-4a75-a98a-1b3297a1a6b6.png",
    storeUrl: "https://store.ui.com/us/en/category/door-access-nvrs/products/envr",
    modelUrl: "https://cdn.ecomm.ui.com/products/69d591b5-0c1b-4b75-9361-0f3237df94a7/6e9d4743-cf96-44d7-9e9c-bf2aada3c2cc.glb",
    href: "https://partner.leadersystems.com.au/products.html?cLCb++FxN8Y=dpur/qk9ibdjqYm16HmryA==E5p23JuqJjjP3AB8OJcR1g==",
    description: "3U NVR with 16 drive bays, supporting up to 70 4K cameras or 210 Full HD cameras.",
    features: ["16 drive bays", "70 4K cameras", "3U rackmount"]
  },
  {
    name: "Enterprise NVR Core",
    sku: "NHU-ENVR-CORE",
    category: "Camera Security",
    image: "https://cdn.ecomm.ui.com/products/694c1676-ffe5-4c8f-9ccc-c73eb86309c3/3f8ef500-8a33-4d43-96d6-e4526693999e.png",
    storeUrl: "https://store.ui.com/us/en/category/door-access-nvrs/products/envr-core",
    modelUrl: "https://cdn.ecomm.ui.com/products/694c1676-ffe5-4c8f-9ccc-c73eb86309c3/f2d5add7-50f3-4e00-90c6-ea3c6a698b57.glb",
    href: "https://partner.leadersystems.com.au/products.html?h8hGXWe3lL0=V4Vej8xv9XOj1GwRnGV5zQ==vLcOuaVMFjLU4KyYbQbKK/3779tK",
    description: "3U UniFi Protect NVR with 16-bay support, up to 300 4K or 500 Full HD cameras, hot-swappable power supplies, and expansion support.",
    features: ["16-bay storage", "300 4K cameras", "Expandable"]
  },
  {
    name: "G6 Pro Dome",
    sku: "NHU-UVC-G6-PRO-DOME",
    category: "Camera Security",
    image: "https://cdn.ecomm.ui.com/products/ed2301d1-7bc1-4569-b257-0ed1df0ed4d5/a695c111-28c9-4b90-a73c-8352dc104bfd.png",
    storeUrl: "https://store.ui.com/us/en/category/cameras-dome/products/uvc-g6-pro-dome",
    modelUrl: "https://cdn.ecomm.ui.com/products/ed2301d1-7bc1-4569-b257-0ed1df0ed4d5/cfeb3534-1649-4850-b2a3-10615d0e4b6d.glb",
    href: "https://partner.leadersystems.com.au/categories.html?JkEFOkF/byk=1AZFzqVqp9IBxlioYvbVyQ==XL8bb+1hw7V/JxCGiHprdM9tk3sZijaJxwVZH9/oNJijAeM+PVo7eAevF++3M9q86JSbtPLt7/fU8K8tR40ifXNLe/XA1ZQWiRbYONN9Arnagp+jIq8UlMAjXJk8tnR+C3MqHVxyKQ==",
    description: "All-weather vandal-proof 4K PoE+ camera with a Multi-TOPS AI engine, 2.36x optical zoom, large sensor, and long-range IR night vision.",
    features: ["4K PoE+", "AI engine", "Optical zoom"]
  },
  {
    name: "G6 Dome",
    sku: "NHU-UVC-G6-DOME",
    category: "Camera Security",
    image: "https://cdn.ecomm.ui.com/products/2f241968-e3be-42c2-98fc-7d879b360d25/1e661d71-79eb-4f79-9f17-2199b3655bb4.png",
    storeUrl: "https://store.ui.com/us/en/category/cameras-dome/products/uvc-g6-dome",
    modelUrl: "https://cdn.ecomm.ui.com/products/2f241968-e3be-42c2-98fc-7d879b360d25/7d307414-6469-43b6-bc40-c1a8604de274.glb",
    href: "https://partner.leadersystems.com.au/categories.html?kSQ8LB32yCk=8MAu1sonyuj0NoMLbVh78g==bOyXbxREWMoT88bfi543gdAuDo+zu4sFULmYT4sFU9ohdYoMPb+lijrQ2nutB65+n9z9kmJfHzThkSPnbWC+RYeD9QybiY/K8a8zeqphUFDHiAe8T+13FRpe9e6vv4bSIQUt",
    description: "All-weather vandal-proof 4K PoE camera with an 8MP image sensor, Multi-TOPS AI Engine, and long-range IR night vision.",
    features: ["4K PoE", "8MP sensor", "IR night vision"]
  },
  {
    name: "AI PTZ Precision Camera",
    sku: "NHU-UVC-AI-PTZ-PRECISION",
    category: "Camera Security",
    image: "https://cdn.ecomm.ui.com/products/188dd3fc-5988-4878-81c5-473f9dcdf017/d56c85a3-ff72-496f-a3fc-785ebad7a5b5.png",
    storeUrl: "https://store.ui.com/us/en/category/cameras-ptz/products/uvc-ai-ptz-precision",
    modelUrl: "https://cdn.ecomm.ui.com/products/188dd3fc-5988-4878-81c5-473f9dcdf017/a18dcb1e-0a27-4e33-8b62-949d13362883.glb",
    href: "https://partner.leadersystems.com.au/categories.html?R+a4WaWgF2s=EBbUOl5+r8EWGQyUH7Ij4A==5RTK+DCyWKEen5Sh9oj86wbsmAdiQGmNHEgA6W6fP94H43ekjJ5fxOC+0jzuohvK8f5AXj1ONTPoy09cQY7MbpGjV5v7RVICeIDT3TuoNV/u3pfkzP9lMRune/zLwsbTckTX5w==",
    description: "Industrial-grade 4K PTZ camera with enhanced AI capabilities, 31x optical zoom, adaptive IR night vision, and LiDAR autofocus.",
    features: ["31x optical zoom", "LiDAR autofocus", "Adaptive IR"]
  },
  {
    name: "Retrofit Hub",
    sku: "NHU-UA-RETROFIT-HUB-2",
    category: "Door Access",
    image: "https://cdn.ecomm.ui.com/products/f84db3e4-fd4e-466e-970e-018ee7c3db08/b42a534d-81a9-48bb-813d-3cac00ffc9ce.png",
    storeUrl: "https://store.ui.com/us/en/products/ua-retrofit-hub-2",
    modelUrl: "https://cdn.ecomm.ui.com/products/f84db3e4-fd4e-466e-970e-018ee7c3db08/ea261f82-f9f6-4e63-8604-1cb8e266452d.glb",
    href: "https://partner.leadersystems.com.au/products.html?2hXfME0HbvM=+EzWIsTxPx2n/V4/IpLkmQ==flWufESnqgoiMoGWxqRpsmIK3b7IACPrCcGSvS0=",
    description: "DC-powered hub that supports Wiegand and OSDP readers and provides entry and exit control for up to two doors.",
    features: ["Two-door control", "Wiegand / OSDP", "DC powered"]
  },
  {
    name: "Retrofit Reader",
    sku: "NHU-UA-RETROFIT-READER",
    category: "Door Access",
    image: "https://cdn.ecomm.ui.com/products/bad51249-9b36-4d54-8673-90fa926fd410/2fafa9d0-af61-455a-977e-cf12454506d4.png",
    storeUrl: "https://store.ui.com/us/en/category/door-access-reader/products/ua-retrofit-reader",
    modelUrl: "https://cdn.ecomm.ui.com/products/bad51249-9b36-4d54-8673-90fa926fd410/60259ce9-ad20-4288-a921-de86a6c83464.glb",
    href: "https://partner.leadersystems.com.au/categories.html?h13ECVghvKA=S/bHNSRO5qAd7lrel0qzpw==kjbfb8WHfutrJwIJ9K6Q7Tgub5aYMibeu1ncEtJofpEb+G63bBi5ljp7fyHsUOMiCFb08IH3GkbopE3nSTU8MiVWL86JEkO7tYoOlhCo2kMnVGmXBukf3ybL1QGOdM5s8iCmLhvYpl6mIg==",
    description: "Indoor/outdoor OSDP reader with NFC Card and Touch Pass support, compatible with the UniFi Retrofit Hub using existing cabling.",
    features: ["OSDP reader", "NFC Card", "Touch Pass"]
  },
  {
    name: "Retrofit PSU 12V",
    sku: "NHU-UACC-RETROFIT-PSU-12V",
    category: "Door Access",
    image: "https://cdn.ecomm.ui.com/products/6278fb7c-a460-448f-afc8-02ed1d14f718/82f2fa1c-1d7f-4b8e-83b6-9c939f76e8f8.png",
    storeUrl: "https://store.ui.com/us/en/category/door-access-reader/products/uacc-retrofit-psu-12v",
    href: "https://partner.leadersystems.com.au/products.html?9zB5Co/NXUM=54brDODz0hZa4CdxV3EXFA==Gks08Jk8Ur3df6RicHuKCFmbZT8seJhMLeHHVW5XaULS",
    description: "12V power supply with optional SLA backup battery support, compatible with the UniFi Retrofit Hub.",
    features: ["12V power", "Battery backup", "Hub compatible"]
  }
];

const entryWays = [
  {
    number: "01",
    brand: "Ubiquiti",
    title: "Stack Product Tickets",
    description: "Buy qualifying Enterprise or Enterprise Campus products. Every SKU purchased equals one ticket into the spin-to-win draw.",
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
    title: "Scale Cloud MRR",
    description: "Activate $30k MRR on Microsoft or Acronis before the promo window closes.",
    footnote: "New partners only. Must not churn before 30 May.",
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
    return activeCategory === "All" ? products : products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  const setMode = (sku, mode) => {
    setViewerModes((current) => ({ ...current, [sku]: mode }));
  };

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="LEADER promo home">
          <img src={epicJetskiLogo} alt="Epic Jetski Adventure Promo" />
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
            <h1>Win a seat on an epic Jetski Adventure Tour.</h1>
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
            Each pathway gets a high-impact card with a vendor visual now, and can swap to official creative later.
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
            Buy any qualifying Enterprise or Enterprise Campus product. Every SKU purchased equals one ticket into the spin-to-win draw.
          </SectionIntro>

          <div className="tabs-wrap">
            <Filter size={18} />
            <div className="category-tabs" role="tablist" aria-label="Ubiquiti product categories">
              {categories.map((category) => {
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
          <SectionIntro kicker="$30k MRR pathway" title="LEADER CLOUD CHURN">
            Activate $30k MRR on Microsoft or Acronis before the promo window closes. New partners only. Must not churn before 30 May.
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
                <p>Build new Acronis recurring revenue through Leader Cloud and contribute toward the $30k MRR target.</p>
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
