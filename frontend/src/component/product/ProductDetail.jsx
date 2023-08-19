import { useContext } from "react";
import { useParams } from "react-router-dom"
import { ContextGlobal } from "../utils/globalContext";

const ProductDetail = () => {

   const {product}= useContext(ContextGlobal)

    const { id } = useParams();
    const products = product.find(item => item.id === id);

    return (
        <div>
            {product ? (
                <div>
                    <h2>{products.name}</h2>
                    <img src={products.imgUrl} alt={products.name} />
                    <p>{products.descripcion}</p>
                </div>
            ) : (
                <p>Producto no encontrado</p>
            )}
        </div>
    );
}

export default ProductDetail;