import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import Product from "./Product";
import FormSelect from './../Forms/FormSelect'
import "./styles.scss";
import LoadMore from './../LoadMore'

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const ProductResults = ({}) => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(
      fetchProductsStart({filterType})
      )
  }, [filterType]);
 
  if (!Array.isArray(data)) return null;
  if (data.length < 1)
    return (
      <div className="products">
        <p> Product Not Found. </p>
         
      </div>
    );

   

    const handleFilter = (e) =>{

      const nextFilter = e.target.value;
      history.push(`/search/${nextFilter}`);
    }

    const configFilters = {
      defaultValue: filterType,
      options: [{
        name:'Show all',
        value:''
      },
      {
        name:'mens',
        value:'mens'
      },{
        name:'womens',
        value:'womens'
      }],
      handleChange: handleFilter
    };

    const handleLoadMore = () =>{
      dispatch(
        fetchProductsStart({filterType, startAfterDoc: queryDoc, persistProducts:data})
      )
    };
  
    const configLoadMore = {
      onLoadMoreEvt: handleLoadMore
    };
  

  return (
    <div className="products">
      <h1>Browse Products</h1>
      <FormSelect {...configFilters}/>
      
      <div className="productResults">
        {data.map((product, position) => {
          const { productThumbnail, productName, productPrice } = product;
          if (
            !productThumbnail ||
            !productName ||
            typeof productPrice === "undefined"
          )
            return null;

          const configProduct = {
            productThumbnail,
            productName,
            productPrice,
          };
          return <Product key={position} {...configProduct} />;
        })}
      </div>
      {!isLastPage && (
        <LoadMore {...configLoadMore}/>
      )}
      
    </div>
  );
};

export default ProductResults;
