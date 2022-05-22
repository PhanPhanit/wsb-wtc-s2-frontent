import React from 'react'
import {Link, useParams} from 'react-router-dom';
import '../styles/categorySection.css';
import {useCategoryContext} from '../context/category_context';


const CategorySection = () => {
    const param = useParams();
    const {category, fetchCategory} = useCategoryContext();
    React.useEffect(()=>{
        fetchCategory();
    }, []);
    return (
        <section className="wrapper-global section-cate-wrap font-poppin">
            {
                category.map((item)=>{
                    const {_id: categoryId, name, image} = item;
                    return (
                        <Link to={`/categories/${categoryId}`} key={categoryId}>
                            <div className={param.id===item._id? "cate-box active":"cate-box"}>
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

export default CategorySection
