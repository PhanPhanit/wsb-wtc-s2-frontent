import React from 'react'
import {
    Slider,
    CategoryTitle,
    CategoryHome,
    NewArrivalBox,
    AllFavorBook,
    PaginationReact,
    EasyPay,
    MapSection
} from '../components'

function Home() {
    return (
        <>
            <Slider />
            <CategoryTitle title="Categories"/>
            <CategoryHome />
            <NewArrivalBox />
            <CategoryTitle title="All Favorite Books"/>
            <AllFavorBook />
            <PaginationReact />
            <CategoryTitle title="Easy to Pay"/>
            <EasyPay />
            <CategoryTitle title="Our Location"/>
            <MapSection />
        </>
    )
}

export default Home
