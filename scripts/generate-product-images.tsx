/**
 * Regenerates the static product thumbnails in public/products from the same
 * SVG components used by the live workspace preview.
 *
 * Usage: npm run generate:images
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { ProductIllustration } from "../src/components/workspace/illustrations/ProductIllustration";
import { PRODUCTS } from "../src/data/products";

const outputDir = join(process.cwd(), "public", "products");
mkdirSync(outputDir, { recursive: true });

for (const product of PRODUCTS) {
  const markup = renderToStaticMarkup(
    <ProductIllustration productId={product.id} xmlns="http://www.w3.org/2000/svg" width={480} height={360} />,
  );
  const file = join(outputDir, `${product.id}.svg`);
  writeFileSync(file, `${markup}\n`);
  console.log(`Wrote ${file}`);
}
