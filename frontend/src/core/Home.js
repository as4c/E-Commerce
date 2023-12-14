import React ,{useState,useEffect} from 'react'
import {getProducts} from "./Helper/coreapicalls";
import Base from './Base';
import Card from './Card';
import "../style.css";

export default function Home() {

  const [Products,setProducts] = useState([]);
  const [error,setError]=useState(false);
  
  const loadAllProducts = () =>{
    getProducts()
    .then(data => {
      if (data.error){
        setError(data.error);
        console.log(error);
      }
      else{
        setProducts(data);
      }
    });   
  };
  useEffect(() =>{
    loadAllProducts();
  },[]);
    
  return (
    <Base title="Home Page" description="welcome to Our Ecom store">
      <h1>Home Component</h1>
     
      <div className="row">
        {Products.map((product,index)=>{
          return(
            <div key={index} className="col-4 mb-4">
              <Card product={product}/>
            </div>
          )
        })}
      </div>
    </Base>
  );
}
