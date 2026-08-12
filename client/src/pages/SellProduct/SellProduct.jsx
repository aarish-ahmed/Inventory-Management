import { useState } from "react"
import { useParams } from "react-router-dom"
import ProductCard from "../../components/ProductCard/ProductCard"
import { useEffect } from "react"
import { getOneProductApi } from "../../api/productApi"
import { sellProductApi } from "../../api/productApi"
const SellProduct = () => {
  const[products,setProducts]=useState([])
  const[message,setMessage]=useState()
    const {id}=useParams()
    useEffect(() => {
        const getProduct = async () => {
          const {data}=await getOneProductApi(id)
          setProducts(data);
          console.log(data)
        };
        getProduct();
      }, []);
    const handleSellProduct = async(e) => {
      console.log('handle sell called')
      e.preventDefault()
      const quantity=e.target.quantity.value
      console.log(quantity)
        const {res,data}=await sellProductApi(id,quantity)
        if(res.ok){
          setMessage(data.message)
          
        }
    }
  return (
    <>
    <ProductCard showActions={false} products={products}/>
    <form onSubmit={handleSellProduct}>
      <input
      placeholder="enter quantity"
      name='quantity'
      type='number'
      />
      <button type='submit'>Confirm Sell</button>
    </form>
    <p>{message}</p>
    </>
  )
}

export default SellProduct