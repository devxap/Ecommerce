import React from 'react';
import { CgMouse } from 'react-icons/cg';
import './Home.css';
import Product from './Product.js';
import MetaData from '../layout/MetaData.js';
import {getProduct} from '../../actions/productAction.js'
import Loader from '../layout/Loader/Loader.js';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';


// const product = {
//     name:"Blue Shirt",
//     images: [{ url : "https://i.ibb.co/DRST11n/1.webp" } ],
//     price:"Rs. 3000",
//     _id:"Abhishek",
// };

const Home = () => {
    const alert = useAlert();

    const dispatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector(state=> state.products);
    useEffect(()=>{
        if(error){
            return alert.error(error);
        }
        dispatch(getProduct());
    },[dispatch,error]);

    useEffect(()=>{
        dispatch(getProduct());
    },[dispatch]);

    return (
        <>
     {loading ? (<Loader />) : (
        <>
        <MetaData title="Ecommerce" />


        <div className='banner'>
            <p>Welcome to Ecommerce</p>
            <h1>Find Amazing Products below</h1>
            <a href="#container">
                <button>
                    Scroll <CgMouse/>
                </button>
            </a>
        </div>

        <h2 className='homeHeading'>Featured Products</h2>
        <div className='container' id='container'>
        {products && products.map(product=>(
            <Product product={product} />
        ))}
        </div>
        </>
     )}
        </>
    );
}
 
 
export default Home;