import { useContext } from "react";
import Search from "../component/Search";
import Category from "../component/category/Category";
import Recomendation from "../component/product/Recomendation";
import { ContextGlobal } from "../component/utils/globalContext";

const Home = () => {
 
  const {obj} = useContext(ContextGlobal)
  return (
    <>
      <Search />
      
      <Category />
      <Recomendation />
      
    </>
  );
};

export default Home;
