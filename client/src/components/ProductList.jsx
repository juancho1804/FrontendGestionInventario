import React from "react";
import ProductCard from "./ProductCard.jsx";

export default function ProductList({ products = [] }) {
  return (
    <div className="album py-5">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
