import React, { useEffect, useState } from 'react'
import Base from './Base'
import Card from './Card'
import PaymentB from './PaymentB'
import { loadCart } from './Helper/carthelper'


const Cart = () => {

    const [products,setProducts]=useState([]);
    const [reload,setReload]=useState(false)
    useEffect(()=>{
        setProducts(loadCart())
    },[reload])

    const loadAllProducts=(products)=>{
        return (
            <div>
                {products.map((product,index) =>(
                    <Card 
                        key={index}
                        product={product}
                        removeFromCart={true}
                        addtoCart={false}
                        reload={reload}
                        setReload={setReload}
                    />
                ))}
            </div>
        )
    }
    const loadCheckout=()=>{
        return (
            <div>
                <h2>Checkout</h2>
            </div>
        )
    }


  return (
    <Base title='Cart Section' description='Welcome to checkout Sections'>
        <div className="row text-center">
            <div className="col-6">
            {
            products.length >0?(loadAllProducts(products)):(
                <h4>Your Cart is Empty! </h4>
            )
            
            } 
            </div>
            <div className="col-6">
            {
                products.length>0 ? (
                    <PaymentB products={products} setReload={setReload} />
                ) :
                (
                    <h3>
                        Please login or add something in Cart
                    </h3>
                )
            }

            </div>
        </div>
        
        
    </Base>
  )
}

export default Cart
