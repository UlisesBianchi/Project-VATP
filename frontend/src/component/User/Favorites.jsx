import { useEffect, useState } from "react";
import CardProduct from "../product/CardProducts";



const Favorites = () => {
  // Obtener los datos del localStorage
  const [favorites, setFavorites] = useState([])

  useEffect(()=>{
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(favorites)

  },[] )

  return (
    <div className="container-fav">
      <h1>Favoritos</h1>
      <ul>
        {favorites.map(({id, nombre, precio, descripcion}) => (
          <CardProduct key={id} product = {{ id, nombre, precio, descripcion}} />
          
        ))}
      </ul>
    </div>
  );
};

export default Favorites;