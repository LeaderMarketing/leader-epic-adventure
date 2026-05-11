(function () {
  "use strict";

  // -------------------------------------------------------------------------
  // Data (edit product list here)
  // -------------------------------------------------------------------------

  const PROMO_END_DATE = new Date("2026-06-30T23:59:59+09:30").getTime();

  const categories = [
    "All",
    "Switching",
    "Cloud Gateways",
    "Camera Security",
    "Access Points",
    "Network Storage"
  ];

  const categoryIcons = {
    "Cloud Gateways": "assets/icons/enterprise_gateway_icon.svg",
    "Access Points": "assets/icons/enterprise_wifi_icon.svg",
    "Switching": "assets/icons/enterprise_switching_icon.svg",
    "Camera Security": "assets/icons/camera_security_icon.svg"
  };

  const products = [
    {
      name: "Switch Pro XG 48 PoE",
      sku: "NHU-USW-PRO-XG-48-POE",
      category: "Switching",
      image: "https://cdn.ecomm.ui.com/products/b4f97072-47c3-4ea1-96aa-616b94c1ca05/ffad1ad8-f360-420b-9a67-39f12065c33e.png",
      href: "https://partner.leadersystems.com.au/products.html?qo2wif60WHM=10DT48BHHqnTehsU7y39lQ==/OLQnSUwvWyW/c0uq/ekJCIDQGADMtNEQH7LRLQ=",
      description: "Professional-grade, 48-port Layer 3 Etherlighting™ PoE+++ switch with (32) 10 GbE, (16) 2.5 GbE PoE, and (4) 25G SFP28 ports.",
      features: ["48 ports", "32 x 10 GbE", "25G SFP28"]
    },
    {
      name: "Switch Pro XG Aggregation",
      sku: "NHU-PRO-XG-AGGREGATION",
      category: "Switching",
      image: "https://cdn.ecomm.ui.com/products/2f42897e-4b8e-4851-af6a-5106211f979e/e541f8bf-a009-427f-815f-7966afbfd1ac.png",
      href: "https://partner.leadersystems.com.au/products.html?xY9sNEIZN/k=XY49fgcJiApEy0eDak+bVA==egJImMjHzXR9Gwjp+YwC0Zf9vkzVG2m9kKgnfZ7E",
      description: "Professional-grade 32-port, Layer 3 Etherlighting™ switch for high-capacity 25G SFP28 connections.",
      features: ["32 ports", "Layer 3", "25G SFP28"]
    },
    {
      name: "Switch Pro XG 24 PoE",
      sku: "NHU-USW-PRO-XG-24-POE",
      category: "Switching",
      image: "https://cdn.ecomm.ui.com/products/b6f03374-2a31-428c-86fb-62b49739c924/89656ee3-c3f8-424e-b3b1-e493508deffa.png",
      href: "https://partner.leadersystems.com.au/products.html?Kg/kcxt25Ac=RjLrEYmc1sGbW+4pPKnqUQ==/Pr9ICNkv6uIQdsucmr4NRTWPYjylWwdJqxTtzg=",
      description: "Professional-grade, 24-port Layer 3 Etherlighting™ PoE+++ switch with (16) 10 GbE, (8) 2.5 GbE, and (2) 25G SFP28 ports.",
      features: ["24 ports", "16 x 10 GbE", "PoE+++"]
    },
    {
      name: "Switch Pro Max 48 PoE",
      sku: "NHU-USW-PRO-M-48-POE",
      category: "Switching",
      image: "https://cdn.ecomm.ui.com/products/51e22689-9b81-4717-beed-fe2c65c57362/18b790aa-f0b3-4e6b-9aca-63948c65535d.png",
      href: "https://partner.leadersystems.com.au/products.html?F4gP58YdWuM=q8efcwQ8YKm5HgTaRN/W0g==dGQRLQE1r8O6TuOL354IjWvqtmDFz+W76dfY1g==",
      description: "A 48-port, Layer 3 Etherlighting™ switch with 2.5 GbE and PoE++ output.",
      features: ["48 ports", "2.5 GbE", "PoE++"]
    },
    {
      name: "Switch Pro XG 10 PoE",
      sku: "NHU-USW-PRO-XG-10-POE",
      category: "Switching",
      image: "https://cdn.ecomm.ui.com/products/2617380d-b3a8-47c3-802f-fcc22d24e931/0af98290-e7a4-4d4f-b4e5-bd781f3d2132.png",
      href: "https://partner.leadersystems.com.au/products.html?yMWkXPUP1J4=kKurn+cRjejX2WnvvFpLow==vNBtcF/cjw+oZS8GXC6vysSLziPybvnsOAfP+ho=",
      description: "1U, professional-grade 10-port, Layer 3 Etherlighting™ PoE+++ switch with (10) 10 GbE and (2) 10G SFP+ ports.",
      features: ["10 ports", "10 GbE", "10G SFP+"]
    },
    {
      name: "Switch Pro HD 24 PoE",
      sku: "NHU-USW-PRO-HD-24-POE",
      category: "Switching",
      image: "https://cdn.ecomm.ui.com/products/17d901a5-c99b-4b02-8d3b-8cb7a5da0512/2ce20101-767d-4e15-b0dc-80449d2807a1.png",
      href: "https://partner.leadersystems.com.au/products.html?2D1oCgUDANU=ddHtIH1QtZKaUavUE07szw==EcWnu2Ka4CuZ85QVzjccyZv+FtSyNk7EX7tmFYU=",
      description: "Professional-grade, Layer 3 Etherlighting™ switch with (2) 10 GbE PoE++, (22) 2.5 GbE PoE++, and (4) 10G SFP+ ports.",
      features: ["24 ports", "2.5 GbE PoE++", "10G SFP+"]
    },
    {
      name: "Switch Pro HD 24",
      sku: "NHU-USW-PRO-HD-24",
      category: "Switching",
      image: "https://cdn.ecomm.ui.com/products/66804bfc-9afd-453c-adbb-7327d8cebe25/387ab337-f5c8-4f8f-94e1-cffc8888ad1d.png",
      href: "https://partner.leadersystems.com.au/products.html?XVY1WF79CfY=UF+GB16GciLsZHxKxMtAAA==HFsQqHDxGbyRf/frIO3G7Kg1kILXZRe2Yg==",
      description: "Professional-grade, Layer 3 Etherlighting™ switch with (2) 10 GbE, (22) 2.5 GbE, and (4) 10G SFP+ ports.",
      features: ["24 ports", "2.5 GbE", "Layer 3"]
    },
    {
      name: "UNAS Pro 8",
      sku: "NHU-UNAS-PRO-8",
      category: "Network Storage",
      image: "https://cdn.ecomm.ui.com/products/c834c44a-84e4-426f-975b-48f0842396bd/6e6eeaf6-aee7-4694-9858-d4f04c148dd6.png",
      href: "https://partner.leadersystems.com.au/products.html?ppEpJNsMmdE=2dW0eEZBgpr+xRLrbwbcig==ywgyIYA7aR8AHRbnXnpGRFCZzNQwxA==",
      description: "2U rack-mount NAS with (8) 2.5/3.5\" HDD bays and (2) M.2 NVMe SSD cache slots, delivering faster access, lower latency, and high-availability 10 Gbps networking for large-scale file storage and sharing.",
      features: ["8 HDD bays", "M.2 NVMe cache", "10 Gbps"]
    },
    {
      name: "Network Video Recorder Instant Kit",
      sku: "NHU-UNVR-INSTANT-KIT",
      category: "Camera Security",
      image: "https://cdn.ecomm.ui.com/products/5473e4c5-8ba8-4d05-8942-5b902b047c3f/48a68b51-05b9-460c-bb26-a474c00104ba.png",
      modelUrl: "https://cdn.ecomm.ui.com/products/5473e4c5-8ba8-4d05-8942-5b902b047c3f/41bd3798-c61f-477e-830c-d3b505840bd7.glb",
      href: "https://partner.leadersystems.com.au/products.html?twtDfpi3wtw=Yh+jLaSW8/ysaT69J5VQqA==mg7K7PaMbkqRM7NLOebPK+rkeoTzU4uu+a19XA==",
      description: "Compact UniFi Protect NVR Kit, includes (1) UniFi Protect NVR Instant with (4) G5 Turret Ultra cameras and (1) 1TB HDD, delivering an all-in-one solution for fast and effortless setup.",
      features: ["All-in-one kit", "4 G5 cameras", "1TB HDD"]
    },
    {
      name: "Network Video Recorder Instant",
      sku: "NHU-UNVR-INSTANT",
      category: "Camera Security",
      image: "https://cdn.ecomm.ui.com/products/2dbe9adc-63b6-4382-af03-2328529b9b66/b47cc172-1fa1-42ef-9ab2-f716a31ffb2d.png",
      modelUrl: "https://cdn.ecomm.ui.com/products/2dbe9adc-63b6-4382-af03-2328529b9b66/3375fb6c-1cde-44da-8c27-a1e3d5a6fb2d.glb",
      href: "https://partner.leadersystems.com.au/products.html?hOzvRuh0yyw=xhUHQQ2UakJex6EIi5QMaw==nIXxPr3l5IA4GC4drAFx2Ngy5HqeP+I4",
      description: "Compact UniFi Protect NVR with 3.5\" HDD support, featuring an integrated 6-port PoE switch, integrated HDMI View Port, and a capacity for (6) 4K camera or (15) Full HD cameras.",
      features: ["6-port PoE", "HDMI View Port", "3.5\" HDD"]
    },
    {
      name: "Cloud Gateway Max",
      sku: "NHU-UCG-MAX",
      category: "Cloud Gateways",
      image: "https://cdn.ecomm.ui.com/products/8cca3680-14a6-496a-af7d-beba49cea3f2/7c6f4e54-1f20-485a-a0f0-22e968b66a66.png",
      modelUrl: "https://cdn.ecomm.ui.com/products/8cca3680-14a6-496a-af7d-beba49cea3f2/c1cb7030-31ff-4e87-a892-7a95653c661a.glb",
      href: "https://partner.leadersystems.com.au/products.html?eweLwUOBfXc=WhU7xRGHpoDickcQEg+hkw==LYAIs+vFG8nLE2GZRHyVqT1L8g==",
      description: "Compact 2.5G Cloud Gateway with 30+ UniFi device / 300+ client support, 2.3 Gbps IPS routing, and selectable NVR storage.",
      features: ["2.5G gateway", "2.3 Gbps IPS", "NVR storage"]
    },
    {
      name: "Cloud Gateway Fiber",
      sku: "NHU-UCG-FIBER",
      category: "Cloud Gateways",
      image: "https://cdn.ecomm.ui.com/products/48cf74fa-0456-4c5f-bbcc-c1a1ffdc11f9/465257f3-0acc-4a11-bb15-762e7f6c0e9c.png",
      modelUrl: "https://cdn.ecomm.ui.com/products/48cf74fa-0456-4c5f-bbcc-c1a1ffdc11f9/83cf6058-d7b4-4920-910c-96bd3de76842.glb",
      href: "https://partner.leadersystems.com.au/products.html?aN3jsy0J7hU=P4XfY16mdmyhvFcGOwT7kg==D2OUXWKw6/Ve6YsRgSv5A1vrdsya",
      description: "Desktop 10G Cloud Gateway with integrated 4-port 2.5 GbE switch, selectable NVR storage, and full UniFi application support.",
      features: ["10G gateway", "4-port switch", "UniFi apps"]
    },
    {
      name: "Protect Viewport",
      sku: "NHU-UFP-VIEWPORT",
      category: "Camera Security",
      image: "https://cdn.ecomm.ui.com/products/8166e57f-3ab1-4683-8e89-d88d7e4ae171/e519b029-32c7-4227-bf89-fb891a813575.png",
      modelUrl: "https://cdn.ecomm.ui.com/products/8166e57f-3ab1-4683-8e89-d88d7e4ae171/b536c556-f567-4dd2-8687-e0fa2810f3df.glb",
      href: "https://partner.leadersystems.com.au/products.html?nX9UYGUfZAU=ry1rIQ+Pax/542CWERdNOA==R3Ks5uNSa6B0eYuuTEB/opD6oW+jmXN+",
      description: "Easy-to-use hub for viewing Protect camera feeds on an HDMI display.",
      features: ["HDMI display", "Camera feeds", "Protect hub"]
    },
    {
      name: "Access Point U7 Pro Wall",
      sku: "NHU-U7-PRO-WALL",
      category: "Access Points",
      image: "https://cdn.ecomm.ui.com/products/7dacb4f6-b703-4154-9264-784f2eb0dbda/f1cb65a5-c557-4e02-bcbb-090502a95b84.png",
      modelUrl: "https://cdn.ecomm.ui.com/products/7dacb4f6-b703-4154-9264-784f2eb0dbda/8aaae87f-f931-4bdb-9fe7-4c2e95629a89.glb",
      href: "https://partner.leadersystems.com.au/products.html?znEzSgT3z74=I2P91HhpEXErKB5csTV67Q==RRibqhUZUoXrDskLjVX09fHBuN06oEA=",
      description: "Wall-mounted WiFi 7 AP with 6 spatial streams and 6 GHz support tailored for home builders with seamless installation options.",
      features: ["WiFi 7", "6 GHz", "Wall mount"]
    },
    {
      name: "Access Point U6 Mesh",
      sku: "NHU-U6-MESH",
      category: "Access Points",
      image: "https://cdn.ecomm.ui.com/products/7b8f8da5-d684-4170-be1f-71b53af8d7f9/fdce5345-80e9-4edd-bf5b-93cf9141649e.png",
      modelUrl: "https://cdn.ecomm.ui.com/products/7b8f8da5-d684-4170-be1f-71b53af8d7f9/aba045f7-f147-4f7c-8151-2018739f2dde.glb",
      href: "https://partner.leadersystems.com.au/products.html?Cn3NMrAR4Sw=dUDoSjP+lguajE1bqOpIqw==coYW3c3yJRo2xykPU7N1DiK6ug==",
      description: "Sleek, indoor/outdoor WiFi 6 AP with 6 spatial streams designed for mesh applications.",
      features: ["WiFi 6", "Outdoor-ready", "Mesh AP"]
    },
    {
      name: "Protect Floodlight",
      sku: "NHU-UP-FLOODLIGHT",
      category: "Camera Security",
      image: "https://cdn.ecomm.ui.com/products/a31e92ef-7df5-43db-be16-e3e1de609787/ab82988b-d135-4a47-b3e1-03ce66106e82.png",
      modelUrl: "https://cdn.ecomm.ui.com/products/a31e92ef-7df5-43db-be16-e3e1de609787/aa9c9e6d-07c7-4758-b638-da1e7f50c490.glb",
      href: "https://partner.leadersystems.com.au/products.html?ag8F+I71Hik=gL0ap3z+//7P+3KNVI8n+Q==yC4gW40AbpYWAIcCcCDky9qnzEG1kBrtqA==",
      description: "Bright motion-triggered light.",
      features: ["Motion trigger", "Bright light", "Protect ready"]
    }
  ];

  // -------------------------------------------------------------------------
  // Icon SVG strings
  // -------------------------------------------------------------------------

  const ICON_LAYERS = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.91a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>';
  const ICON_IMAGE = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>';
  const ICON_POINTER = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/></svg>';
  const ICON_BOX = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>';
  const ICON_CHEVRON = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';

  // -------------------------------------------------------------------------
  // Utilities
  // -------------------------------------------------------------------------

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttr(str) {
    return escapeHtml(str);
  }

  // -------------------------------------------------------------------------
  // Countdown
  // -------------------------------------------------------------------------

  function initCountdown() {
    const root = document.getElementById("countdown");
    if (!root) return;
    const cells = {
      days: root.querySelector('[data-unit="days"]'),
      hours: root.querySelector('[data-unit="hours"]'),
      mins: root.querySelector('[data-unit="mins"]'),
      secs: root.querySelector('[data-unit="secs"]')
    };
    const closeBtn = document.getElementById("countdown-close");

    function pad(n) { return String(n).padStart(2, "0"); }

    function tick() {
      const distance = Math.max(0, PROMO_END_DATE - Date.now());
      const days = Math.floor(distance / 86400000);
      const hours = Math.floor((distance % 86400000) / 3600000);
      const mins = Math.floor((distance % 3600000) / 60000);
      const secs = Math.floor((distance % 60000) / 1000);
      cells.days.textContent = pad(days);
      cells.hours.textContent = pad(hours);
      cells.mins.textContent = pad(mins);
      cells.secs.textContent = pad(secs);
    }

    tick();
    setInterval(tick, 1000);

    // Small delay so the entrance transition runs.
    requestAnimationFrame(() => root.classList.add("is-visible"));

    closeBtn.addEventListener("click", () => {
      root.classList.add("is-dismissed");
    });
  }

  // -------------------------------------------------------------------------
  // Mobile menu
  // -------------------------------------------------------------------------

  function initMobileMenu() {
    const header = document.getElementById("site-header");
    const toggle = document.getElementById("menu-toggle");
    if (!header || !toggle) return;

    toggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    document.querySelectorAll("[data-close-menu]").forEach((el) => {
      el.addEventListener("click", () => {
        header.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // -------------------------------------------------------------------------
  // Reveal on scroll
  // -------------------------------------------------------------------------

  function initReveal() {
    const targets = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "-80px" });
    targets.forEach((el) => io.observe(el));
  }

  // -------------------------------------------------------------------------
  // Category tabs + product grid
  // -------------------------------------------------------------------------

  let activeCategory = "All";
  const viewerModes = {}; // sku -> "image" | "features" | "3d"

  function renderCategoryTabs() {
    const host = document.getElementById("category-tabs");
    host.innerHTML = categories.map((cat) => {
      const icon = categoryIcons[cat];
      const iconHtml = icon
        ? `<img src="${escapeAttr(icon)}" alt="" />`
        : ICON_LAYERS;
      return `<button type="button" role="tab" data-category="${escapeAttr(cat)}" aria-selected="${cat === activeCategory}" class="${cat === activeCategory ? "active" : ""}">${iconHtml}${escapeHtml(cat)}</button>`;
    }).join("");

    host.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeCategory = btn.getAttribute("data-category");
        host.querySelectorAll("button").forEach((b) => {
          const isActive = b.getAttribute("data-category") === activeCategory;
          b.classList.toggle("active", isActive);
          b.setAttribute("aria-selected", isActive ? "true" : "false");
        });
        applyProductFilter();
      });
    });
  }

  function productCardHtml(product) {
    const mode = viewerModes[product.sku] || "image";
    const has3d = !!product.modelUrl;
    const activeMode = mode === "3d" && !has3d ? "image" : mode;

    const featurePins = product.features.map((f, i) =>
      `<span class="feature-pin pin-${i + 1}"><i></i>${escapeHtml(f)}</span>`
    ).join("");

    const modelTag = has3d
      ? `<model-viewer
            src="${escapeAttr(product.modelUrl)}"
            poster="${escapeAttr(product.image)}"
            alt="${escapeAttr(product.name)} 3D model"
            camera-controls
            auto-rotate
            interaction-prompt="auto"
            shadow-intensity="0.28"
            exposure="0.95"
            environment-image="neutral"
            camera-orbit="45deg 66deg auto"
            field-of-view="30deg"></model-viewer>`
      : "";

    const button3d = has3d
      ? `<button type="button" data-mode="3d" class="${activeMode === "3d" ? "active" : ""}" title="3D view">${ICON_BOX}<span>3D</span></button>`
      : "";

    return `
      <article class="product-card in" data-sku="${escapeAttr(product.sku)}" data-category="${escapeAttr(product.category)}">
        <div class="product-viewer">
          <div class="product-stage image-stage ${activeMode === "image" ? "active" : ""}" data-stage="image">
            <img src="${escapeAttr(product.image)}" alt="${escapeAttr(product.name)}" />
          </div>
          <div class="product-stage feature-stage ${activeMode === "features" ? "active" : ""}" data-stage="features">
            <img src="${escapeAttr(product.image)}" alt="" />
            ${featurePins}
          </div>
          ${has3d ? `<div class="product-stage model-stage ${activeMode === "3d" ? "active" : ""}" data-stage="3d">${modelTag}</div>` : ""}
          <div class="view-toggle" aria-label="Viewer mode for ${escapeAttr(product.name)}">
            <button type="button" data-mode="image" class="${activeMode === "image" ? "active" : ""}" title="Image view">${ICON_IMAGE}</button>
            <button type="button" data-mode="features" class="${activeMode === "features" ? "active" : ""}" title="Feature view">${ICON_POINTER}</button>
            ${button3d}
          </div>
        </div>
        <div class="product-copy">
          <h3>${escapeHtml(product.name)}</h3>
          <code>${escapeHtml(product.sku)}</code>
          <p>${escapeHtml(product.description)}</p>
          <a class="buy-button" href="${escapeAttr(product.href)}" target="_blank" rel="noopener">Buy Now ${ICON_CHEVRON}</a>
        </div>
      </article>
    `;
  }

  function renderProducts() {
    const grid = document.getElementById("product-grid");
    grid.innerHTML = products.map(productCardHtml).join("");

    grid.querySelectorAll(".product-card").forEach((card) => {
      const sku = card.getAttribute("data-sku");
      card.querySelectorAll(".view-toggle button").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const nextMode = btn.getAttribute("data-mode");
          viewerModes[sku] = nextMode;
          // Update stage visibility within this card only.
          card.querySelectorAll(".product-stage").forEach((stage) => {
            stage.classList.toggle("active", stage.getAttribute("data-stage") === nextMode);
          });
          card.querySelectorAll(".view-toggle button").forEach((b) => {
            b.classList.toggle("active", b.getAttribute("data-mode") === nextMode);
          });
        });
      });
    });
  }

  function applyProductFilter() {
    const grid = document.getElementById("product-grid");
    grid.querySelectorAll(".product-card").forEach((card) => {
      const cat = card.getAttribute("data-category");
      const match = activeCategory === "All" || cat === activeCategory;
      card.style.display = match ? "" : "none";
      // Re-trigger entry transition.
      if (match) {
        card.classList.remove("in");
        // force reflow
        void card.offsetWidth;
        card.classList.add("in");
      }
    });
  }

  // -------------------------------------------------------------------------
  // Drag-to-scroll rails (MOUSE ONLY).
  //
  // Why mouse-only: on touch devices the mobile CSS already makes the rails
  // native horizontal scrollers (`overflow-x: auto` + `touch-action: pan-x`),
  // so swiping just works and tapping a card fires a normal click that
  // navigates to the section. The earlier implementation hooked pointer
  // events for both mouse and touch and called setPointerCapture, which
  // diverted the touch sequence away from child anchors — that's what was
  // breaking taps on the entry / breeze cards.
  // -------------------------------------------------------------------------

  function initDragRails() {
    document.querySelectorAll("[data-rail]").forEach((rail) => {
      let active = false;
      let moved = false;
      let startX = 0;
      let startScroll = 0;

      function updateOverflowFlag() {
        rail.classList.toggle("is-overflowing", rail.scrollWidth > rail.clientWidth + 1);
      }
      updateOverflowFlag();
      window.addEventListener("resize", updateOverflowFlag);

      rail.addEventListener("mousedown", (e) => {
        if (e.button !== 0) return;
        if (rail.scrollWidth <= rail.clientWidth) return;
        active = true;
        moved = false;
        startX = e.clientX;
        startScroll = rail.scrollLeft;
      });

      window.addEventListener("mousemove", (e) => {
        if (!active) return;
        const delta = e.clientX - startX;
        if (Math.abs(delta) > 4) {
          moved = true;
          rail.classList.add("is-dragging");
        }
        rail.scrollLeft = startScroll - delta;
      });

      window.addEventListener("mouseup", () => {
        if (!active) return;
        active = false;
        // Defer removal so the suppression click sees is-dragging.
        setTimeout(() => rail.classList.remove("is-dragging"), 0);
      });

      // Block the synthetic click that fires after a real drag on desktop.
      rail.addEventListener(
        "click",
        (e) => {
          if (moved) {
            e.preventDefault();
            e.stopPropagation();
            moved = false;
          }
        },
        true
      );
    });
  }

  // -------------------------------------------------------------------------
  // Init
  // -------------------------------------------------------------------------

  document.addEventListener("DOMContentLoaded", () => {
    initCountdown();
    initMobileMenu();
    renderCategoryTabs();
    renderProducts();
    initDragRails();
    initReveal();
  });
})();
