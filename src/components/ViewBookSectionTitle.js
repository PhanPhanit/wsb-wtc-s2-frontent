import React from 'react'
import '../styles/viewBookTitle.css';
import Translate from '../Translate';
import { useLanguageContext } from '../context/language_context';
const ViewBookSectionTitle = ({title}) => {
    const {language} = useLanguageContext();
    return (
        <section className="wrapper-global view-book-title">
            <h2 className={language==='kh'?"font-khmer":"font-poppin"}><Translate>{title}</Translate></h2>
            <hr />
        </section>
    )
}

export default ViewBookSectionTitle
