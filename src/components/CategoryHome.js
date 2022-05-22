import React, {useEffect} from 'react'
import {Link} from 'react-router-dom';
import '../styles/categorySection.css';
import {useCategoryContext} from '../context/category_context';


const CategoryHome = () => {
    const {category, fetchCategory} = useCategoryContext();

    useEffect(()=>{
        fetchCategory();
    }, []);

    return (
        <section className="wrapper-global section-cate-wrap font-poppin">
            {
                category.map((item)=>{
                    const {_id: categoryId, name, image} = item;
                    return (
                        <Link to={`/categories/${categoryId}`} key={categoryId}>
                            <div className="cate-box">
                                <img src={image} alt={name} />
                                <h3>{name}</h3>
                            </div>
                        </Link>
                    );
                })
            }
        </section>
    )
}

export default CategoryHome
