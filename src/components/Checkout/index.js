import React from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "./../../redux/Cart/cart.selectors";
import "./styles.scss";
import Item from './Item'
import { createStructuredSelector } from "reselect";
import Button from './../Forms/Button'

const mapState = createStructuredSelector({
  cartIems: selectCartItems,
  total: selectCartTotal
});
const Checkout = ({}) => {
  const { cartIems, total } = useSelector(mapState);
  const history = useHistory();
  return (
    <div className="checkout">
      <h1> Checkout</h1>
      <div className="cart">

      {cartIems.length >0?(
        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <table className="checkoutHeader" border="0" cellPadding="10" cellSpacing="0">
                <tbody>
                  <tr>
                    <th> Product</th>
                    <th> Description</th>
                    <th> Quantity</th>
                    <th>Price</th>
                    <th>Remove</th>

                  </tr>
                </tbody>
              </table>
            </tr>

            <tr>
              <table border="0" cellPadding="0" cellSpacing="0">
                <tbody>
                  {cartIems.map((item,pos)=>{
                      return (
                        <tr key={pos}>
                          <td>
                            <Item {...item}/>
                          </td>
                        </tr>
                      )
                  })}
                </tbody>
              </table>
            </tr>

            <tr>
              <table align="right" border="0" cellPadding="10" cellSpacing="0">
                <tr align="right">
                  <td> <h3>Total: Rs.{total} </h3></td>
                </tr>
              </table>
            </tr>

            <tr>
            <table  border="0" cellPadding="10" cellSpacing="0">
              <tbody>
                <tr>
                  <td>
                    <Button  onClick ={()=>history.goBack()} >
                      Continue Shopping
                    </Button>

                  </td>

                  <td>
                    <Button> Checkout</Button>
                  </td>
                </tr>
              </tbody>
            </table> 
            </tr>
          </tbody>
        </table>
        ):<p>No Items In Cart</p>}
     </div>
    </div>
  );
};

export default Checkout;
