import { useParams, useNavigate } from "react-router-dom";
import PocketBase from "pocketbase";
import React from "react";
import "./k2d.css"
import "./a.css"
import { Flex, background } from "@chakra-ui/react";
import ContainedButtons from "./button.jsx";
import SimpleSnackbar from "./button.jsx";

const DetailedPage = () => {
  const productId = useParams();
  const [loading, setLoading] = React.useState(true);
  const [product, setProducts] = React.useState();
  const pb = new PocketBase("https://tazalyk.fly.dev");

  const getProducts = async () => {
    const record = await pb.collection("eshop_products").getOne(productId.id, {
      //   expand: "relField1,relField2.subRelField",
      $autoCancel: false,
    });
    console.log(record);
    setProducts(record);
  };

  React.useEffect(() => {
    getProducts();
  }, []);
  return (
    <div> 
      <img style={{
        minWidth: 330,
        borderRadius: 15,
        marginTop: 90
      }}
      
      
         
        src={`https://tazalyk.fly.dev/api/files/eshop_products/${productId.id}/${product?.photo}`}
        alt=""
      />
      
      
      
      <div style={{fontFamily: "K2D", textAlign: "left", fontWeight: 400, color: "black"}}>
      
      <h1 style={{fontSize:40, margin:0}}>{product?.title}</h1>
      
      <div style={{display: "flex", margin: 0,minWidth: 330}}>
        <h1 style={{fontSize:30,color: "#fffff"}}>Price</h1>
        <h1  style={{fontSize:30}}>:{product?.price}$</h1>
        </div>
        <SimpleSnackbar/>
        
        <h1  style={{fontSize:15,color:"white"}}>Where you can buy it:{}</h1>


      <div  className="as" dangerouslySetInnerHTML={{__html: product?.title}}></div>

      </div>
     
     
    </div>
  );
};

export default DetailedPage;

     
         
