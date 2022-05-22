import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useProductContext} from '../context/product_context';
import {Error} from '../pages';
import {
    ViewBookDetail,
    ViewBookSectionTitle,
    ViewBookSlide,
    CustomerRate
} from '../components';
import {
    getAllProduct as getAllProductUrl
} from '../UrlEndPoint';

function ViewBook() {
    const {id: productId} = useParams();
    const {
        fetchSingleProduct,
        single_product: {
            product,
            loading,
            error
        },
        suggestion_product,
        people_looking_product
    } = useProductContext();
    useEffect(()=>{
        window.scroll({
            top: 0
          });
        fetchSingleProduct(`${getAllProductUrl}/${productId}`);
    }, [productId]);
    
    if(loading){
        return (
            <section className="full-screen-wrapper wrapper-global">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </section>
        )
    }
    if(error){
        return <Error />
    }
    return (
        <>
            <ViewBookDetail />
            <ViewBookSectionTitle title="Suggestion" />
            <ViewBookSlide {...suggestion_product} />
            <ViewBookSectionTitle title="People also looking for" />
            <ViewBookSlide {...people_looking_product} />
            <CustomerRate productId={productId} />
        </>
    )
}

export default ViewBook
