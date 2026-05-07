import assert from "node:assert/strict";
import { categories, products } from "./productData.js";

const csvSkus = [
  "NHU-USW-PRO-XG-48-POE",
  "NHU-PRO-XG-AGGREGATION",
  "NHU-USW-PRO-XG-24-POE",
  "NHU-USW-PRO-M-48-POE",
  "NHU-USW-PRO-XG-10-POE",
  "NHU-USW-PRO-HD-24-POE",
  "NHU-USW-PRO-HD-24",
  "NHU-UNAS-PRO-8",
  "NHU-UNVR-INSTANT-KIT",
  "NHU-UNVR-INSTANT",
  "NHU-UCG-MAX",
  "NHU-UCG-FIBER",
  "NHU-UFP-VIEWPORT",
  "NHU-U7-PRO-WALL",
  "NHU-U6-MESH",
  "NHU-UP-FLOODLIGHT"
];

const verifiedModelUrls = {
  "NHU-UNVR-INSTANT-KIT": "https://cdn.ecomm.ui.com/products/5473e4c5-8ba8-4d05-8942-5b902b047c3f/41bd3798-c61f-477e-830c-d3b505840bd7.glb",
  "NHU-UNVR-INSTANT": "https://cdn.ecomm.ui.com/products/2dbe9adc-63b6-4382-af03-2328529b9b66/3375fb6c-1cde-44da-8c27-a1e3d5a6fb2d.glb",
  "NHU-UCG-MAX": "https://cdn.ecomm.ui.com/products/8cca3680-14a6-496a-af7d-beba49cea3f2/c1cb7030-31ff-4e87-a892-7a95653c661a.glb",
  "NHU-UCG-FIBER": "https://cdn.ecomm.ui.com/products/48cf74fa-0456-4c5f-bbcc-c1a1ffdc11f9/83cf6058-d7b4-4920-910c-96bd3de76842.glb",
  "NHU-UFP-VIEWPORT": "https://cdn.ecomm.ui.com/products/8166e57f-3ab1-4683-8e89-d88d7e4ae171/b536c556-f567-4dd2-8687-e0fa2810f3df.glb",
  "NHU-U7-PRO-WALL": "https://cdn.ecomm.ui.com/products/7dacb4f6-b703-4154-9264-784f2eb0dbda/8aaae87f-f931-4bdb-9fe7-4c2e95629a89.glb",
  "NHU-U6-MESH": "https://cdn.ecomm.ui.com/products/7b8f8da5-d684-4170-be1f-71b53af8d7f9/aba045f7-f147-4f7c-8151-2018739f2dde.glb",
  "NHU-UP-FLOODLIGHT": "https://cdn.ecomm.ui.com/products/a31e92ef-7df5-43db-be16-e3e1de609787/aa9c9e6d-07c7-4758-b638-da1e7f50c490.glb"
};

assert.deepEqual(products.map((product) => product.sku), csvSkus);
assert.ok(categories.includes("Access Points"));
assert.ok(!categories.includes("Enterprise WiFi"));

for (const product of products) {
  assert.match(product.href, /^https:\/\/partner\.leadersystems\.com\.au\//);
  assert.match(product.image, /^https:\/\/cdn\.ecomm\.ui\.com\/products\/.+\.png$/);
  assert.equal("dbpExGst" in product, false);
  assert.equal("rrpIncGst" in product, false);
  assert.ok(product.features.length >= 1);
}

const modelProducts = Object.fromEntries(
  products.filter((product) => product.modelUrl).map((product) => [product.sku, product.modelUrl])
);

assert.deepEqual(modelProducts, verifiedModelUrls);
