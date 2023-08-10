import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const ProductDetail = () => {

    let productos = [

        {
            id:"1",
            name:"producto 1",
            imgUrl:"https://i.imgur.com/mCha6F0.jpeg",
            descripcion:""
        },
        {
          id:"2",
          name:"producto 2",
          imgUrl:"https://i.imgur.com/mCha6F0.jpeg",
          descripcion:""
        },
        {
          id:"3",
          name:"producto 3",
          imgUrl:"https://i.imgur.com/mCha6F0.jpeg",
          descripcion:""
        },
        {
          id:"4",
          name:"producto 4",
          imgUrl:"https://i.imgur.com/mCha6F0.jpeg",
          descripcion:""
        },
        {
          id:"5",
          name:"producto 5",
          imgUrl:"https://i.imgur.com/mCha6F0.jpeg",
          descripcion:""
        },
        {
          id:"6",
          name:"producto 6",
          imgUrl:"https://i.imgur.com/mCha6F0.jpeg",
          descripcion:""
        },
        {
          id:"7",
          name:"producto 7",
          imgUrl:"https://i.imgur.com/mCha6F0.jpeg",
          descripcion:""
        },
        {
          id:"8",
          name:"producto 8",
          imgUrl:"https://i.imgur.com/mCha6F0.jpeg",
          descripcion:""
        },
        {
          id:"9",
          name:"producto 9",
          imgUrl:"https://i.imgur.com/mCha6F0.jpeg",
          descripcion:""
        },
        {
          id:"10",
          name:"producto 10",
          imgUrl:"https://i.imgur.com/mCha6F0.jpeg",
          descripcion:""
        },
    ]

    const { id } = useParams();
    const product = productos.find(item => item.id === id);

    return (
        <div>
            {product ? (
                <div>
                    <h2>{product.name}</h2>
                    <img src={product.imgUrl} alt={product.name} />
                    <p>{product.descripcion}</p>
                </div>
            ) : (
                <p>Producto no encontrado</p>
            )}
        </div>
    );
}

export default ProductDetail;