import { PRODUCTS, amazonUrl, type ProductKey } from "@/lib/affiliate";

interface AffiliateBoxProps {
  title: string;
  intro?: string;
  products: ProductKey[];
  /** Page slug for the Umami click event */
  page: string;
}

/** A small list of Amazon affiliate product links with the required disclosure. */
export default function AffiliateBox({ title, intro, products, page }: AffiliateBoxProps) {
  return (
    <aside className="affiliate-box" aria-label={title}>
      <h2>{title}</h2>
      <p className="affiliate-disclosure">
        Affiliate links: as an Amazon Associate we earn from qualifying
        purchases.
      </p>
      {intro && <p>{intro}</p>}
      <ul>
        {products.map((key) => {
          const product = PRODUCTS[key];
          return (
            <li key={key}>
              <a
                href={amazonUrl(product.asin)}
                target="_blank"
                rel="sponsored nofollow noopener"
                data-umami-event="affiliate-click"
                data-umami-event-product={key}
                data-umami-event-page={page}
              >
                {product.name} →
              </a>
              <span>{product.blurb}</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
