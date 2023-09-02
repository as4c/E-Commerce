import React from 'react'

const ImageHelper=({product}) => {
    const imageUrl=product?product.image:`https://www.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg`
  return (
    <div className='rounded border border-success p-2'>
      <img src={imageUrl} alt="" 
      style={{maxHeight:"300px",maxWidth:"100%"}}
      className="mb-3 rounded"/>
    </div>
  )
}
export default ImageHelper;