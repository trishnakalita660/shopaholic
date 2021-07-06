import React from "react";
import { useDispatch } from "react-redux";
import { addProduct, removeCartItem, reduceCartItem } from "../../../redux/Cart/cart.actions";

const Item = (product) => {

    const dispatch = useDispatch();
  const { productName, productThumbnail, productPrice, quantity, documentID } =
    product;

    const handleRemoveCartItem = (documentID) =>{
        dispatch(
            removeCartItem({
                documentID
            })
        );
    }

    const handleAddProduct = (product) =>{
        dispatch(
            addProduct(product)
        )
    }

    const reduceCartProduct = (product)=>{
        dispatch(
            reduceCartItem(product)
        )
    }

  return (
    <table className="cartItem" border="0" cellPadding="10" cellSpacing="0">
      <tbody>
        <tr>
          <td>
            <img src={productThumbnail} alt={product} />
          </td>

          <td>
            {productName}
          </td>
          <td>
          <span className="cartBtn" onClick={()=>reduceCartProduct(product)}> - </span>
           <span>{quantity}</span>  
          <span className="cartBtnq" onClick={()=>handleAddProduct(product)} > + </span>
          </td>

          <td>
          RS.{productPrice} x {quantity} 
          <br/> = Rs. {productPrice* quantity}
          </td>
          
          <td align="center"><span className="cartBtn" onClick={()=> handleRemoveCartItem(documentID)}> Remove </span></td>
          
        </tr>
      </tbody>
    </table>
  );
};

export default Item;
