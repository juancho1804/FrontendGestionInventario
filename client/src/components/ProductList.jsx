import React from "react";
import ProductCard from "./ProductCard.jsx";

export default function ProductList({ products = [] }) {
  return (
    <div className="py-4">
      <div className="container">
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
