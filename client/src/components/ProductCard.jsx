import React from "react";
import Swal from 'sweetalert2';

export default function ProductCard({product}){
    const TALLAS = ["S", "M", "L", "XL", "XXL", "XXXL"];

    return(
        <div className="col">
            <div className="card">
                <img src={`${import.meta.env.VITE_API_URL}${product.urlImage}`} className="img-fluid image-card" alt={product.name} />
                <div className="card-body">
                    <p className="card-text">{product.name}</p>


                    {product.variantes && (
                        <div className="mb-2">
                            <div className="d-flex flex-wrap gap-2">
                                {TALLAS.map((talla) => (
                                    <span key={talla} className="badge bg-secondary">
                                        {talla}: {product.variantes?.[talla] ?? 0}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}