import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import { getProductById, getRelatedProducts } from "../../lib/catalog";

export default function ProductDetailPage({ params }) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, product.mood);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
