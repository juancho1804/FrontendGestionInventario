import React from "react";
import { deleteProduct } from "../services/productService";
import Swal from 'sweetalert2';

export default function ProductCard({product, onDelete}){
    const handleDelete = () => {
        Swal.fire({
        title: "¿Estás seguro?",
        text: `Eliminarás el producto "${product.name}"`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        }).then(async(result) => {
        if (result.isConfirmed) {
            try{
                await deleteProduct(product.id);
            }catch(err){
                console.error(err);
                console.log("Error al eliminar el producto")
            }
            onDelete(product.id);
            Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
        }
        });
    };



    return(
        <div className="col">
            <div className="card">
                <img src={"http://localhost:8001"+product.urlImage} className="img-fluid" alt={product.name} />
                <div className="card-body">
                    <p className="card-text">{product.name}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-warning">
                                <i className="bi bi-pencil-square pe-1"></i>Editar
                            </button>
                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={handleDelete}>
                                <i className="bi bi-trash3 pe-1"></i>Eliminar
                            </button>
                        </div>
                        <small className="text-body-secondary">Stock: {product.quantity}</small>

                    </div>
                </div>
            </div>
        </div>
    );
}