import { useContext, useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import CardProduct from "./CardProducts";
import { ContextGlobal } from "../utils/globalContext";
import Filter from "../category/Filter";

const Recomendation = () => {
  const { obj } = useContext(ContextGlobal);

  const [showCount, setShowCount] = useState(10);
  const productsPerPage = 10;
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const shuffled = [...obj.product];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledProducts(shuffled);
  }, [obj.product]);

  useEffect(() => {
    const filtered = shuffledProducts.filter(
      (data) =>
        selectedCategoryIds.length === 0 ||
        (data.categoria && selectedCategoryIds.includes(data.categoria.id)) // no rompe por mas que sea null
    );
    
      
    setFilteredProducts(filtered);
    setShowCount(productsPerPage);
  }, [shuffledProducts, selectedCategoryIds]);

  const handleShowMore = () => {
    setShowCount(showCount + productsPerPage);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(categoryId)) {
        return prevSelectedIds.filter((id) => id !== categoryId);
      } else {
        return [...prevSelectedIds, categoryId];
      }
    });
  };

  const displayedProducts = filteredProducts.slice(0, showCount);

  return (
    <Box
      sx={{ marginTop: "3vh", background: "#EDD8D8", paddingBottom: "10vh" }}
    >
      <Typography
        color="primary"
        variant="h5"
        sx={{ marginLeft: "2vw", paddingTop: "5vh" }}
      >
        Productos recomendados
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Filter
          category={obj.category}
          onSelectCategory={handleCategorySelect}
          selectedCategories={selectedCategoryIds}
        />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xl: "repeat(2 ,1fr)", xs: "repeat(1 ,1fr)" },
            gap: "3rem",
            marginTop: "2rem",
            columnGap: "3rem",
          }}
        >
          {displayedProducts.map((product) => (
            <CardProduct
              product={product}
              imageMap={obj.imageMap}
              key={product.id}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "2rem",
          }}
        >
          <Button
            onClick={handleShowMore}
            disabled={showCount >= filteredProducts.length}
          >
            Mostrar más
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Recomendation;
// import { useContext, useState, useEffect } from "react";
// import { Box, Typography, Button } from "@mui/material";
// import CardProduct from "./CardProducts";
// import { ContextGlobal } from "../utils/globalContext";
// import Filter from "../category/Filter";

// const Recommendation = () => {
//   const { obj } = useContext(ContextGlobal);

//   const [showCount, setShowCount] = useState(10);
//   const productsPerPage = 10;
//   const [shuffledProducts, setShuffledProducts] = useState([]);
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);

//   const shuffleArray = (array) => {
//     const shuffled = [...array];
//     for (let i = shuffled.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
//     return shuffled;
//   };

//   useEffect(() => {
//     const shuffled = shuffleArray(obj.product || []);
//     setShuffledProducts(shuffled);
//   }, [obj.product, obj.category]);

//   const handleShowMore = () => {
//     setShowCount(showCount + productsPerPage);
//   };

//   const displayedProducts = shuffledProducts
//     .filter(data => selectedCategoryId === null || data.categoryId === selectedCategoryId)
//     .slice(0, showCount);

//   return (
//     <Box sx={{ marginTop: "3vh", background: "#EDD8D8", paddingBottom: "10vh" }}>
//       <Typography color="primary" variant="h5" sx={{ marginLeft: "2vw", paddingTop: "5vh" }}>
//         Productos recomendados
//       </Typography>
//       <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignItems: "center" }}>
//         <Filter category={obj.category || []} onSelectCategory={setSelectedCategoryId} />
//         <Box sx={{ display: "grid", gridTemplateColumns: { xl: "repeat(2 ,1fr)", xs: "repeat(1 ,1fr)" }, gap: '3rem', marginTop: '2rem', columnGap: "3rem" }}>
//         {displayedProducts.map((product) => (
//   <CardProduct product={product} imageMap={obj.imageMap} key={product.id} />
// ))}
//         </Box>
//         <Box sx={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "2rem" }}>
//           <Button onClick={handleShowMore} disabled={showCount >= shuffledProducts.length}>
//             Mostrar mÃ¡s
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Recommendation;
