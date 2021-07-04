import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductStart, setProduct} from './../../redux/Products/products.actions';
import Button from './../Forms/Button'
import { addProduct } from '../../redux/Cart/cart.actions';
import './styles.scss'
import { handleAddToCart } from '../../redux/Cart/cart.utils';

const mapState = state =>({
    product: state.productsData.product
})

const ProductCard = () => {
    
    const dispatch = useDispatch();
    const {productID} = useParams();
    const {product} = useSelector(mapState);
    const { productName,productDesc, productThumbnail, productPrice } = product;

    useEffect(()=>{
        dispatch(
            fetchProductStart(productID)
        )

        return ()=>{
            dispatch(
                setProduct({})
            )
        }
    },[])

    const configAddToCartBtn ={
        type:'button'
    }

    const handleAddToCart = (producct) =>{
        if(!product) return

        dispatch(
            addProduct(product)
        )
    }

    return (
        <div className="productCard">
        <div className="hero">
          <img src={productThumbnail}/>
        </div>
            <div className="productDetails">
            <ul>
              <li>
              <h1>{productName}</h1>
              </li>

              <li>
              <span>
              Rs.{productPrice}
              </span>
              </li>
              <li>
              <span dangerouslySetInnerHTML={{__html: productDesc}}>
              
              </span>
              </li>
              <li>
              <div className="addToCart">
              <Button {...configAddToCartBtn} onClick ={()=> handleAddToCart(product)} >
              Add To Cart
              </Button>
              </div>
              </li>
            </ul>
            
            </div>
        </div>
    )
}

export default ProductCard
