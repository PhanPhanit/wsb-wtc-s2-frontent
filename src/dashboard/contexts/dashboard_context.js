import React, {useState, useContext, createContext} from 'react';
import {
    getTotalPrice as getTotalPriceUrl,
    getTotalOrder as getTotalOrderUrl,
    countAllUser as countAllUserUrl,
    getAllProduct as getAllProductUrl
} from '../../UrlEndPoint';
import axios from 'axios';
import { sortName } from '../../utils/Tools';



const DashboardContext = createContext();

const DashboardContextProvider = ({children}) => {
    const [totalOrder, setTotalOrder] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalUser, setTotalUser] = useState(0);
    const [mostSold, setMostSold] = useState([]);
    const [mostView, setMostView] = useState([]);
    
    const DashboardfetchAll = async () => {
        try {
            const allUrlEndPoint = [
                `${getTotalOrderUrl}?status=success`,
                `${getTotalPriceUrl}?status=success`,
                `${countAllUserUrl}?role=user&isActive=true`,
                `${getAllProductUrl}?sort=-sold&limit=8`,
                `${getAllProductUrl}?sort=-views&limit=8`
            ];
            const responses = await axios.all(allUrlEndPoint.map(singleUrl => axios.get(singleUrl)));
            setTotalOrder(responses[0].data.totalOrder);
            setTotalPrice(responses[1].data.totalPrice);
            setTotalUser(responses[2].data.totalUser);
            const mostSold = responses[3].data.product.map(item=>{
                return {
                    label: sortName(item.name, 30),
                    value: item.sold.toString()
                }
            });
            const mostView = responses[4].data.product.map(item=>{
                return {
                    label: sortName(item.name, 30),
                    value: item.views.toString()
                }
            });
            setMostSold(mostSold);
            setMostView(mostView);
        } catch (error) {
            console.log(error);
        }
    }


    return <DashboardContext.Provider value={{ 
        DashboardfetchAll,
        totalOrder,
        totalPrice,
        totalUser,
        mostSold,
        mostView,
     }}>{children}</DashboardContext.Provider>
}

const useDashboardContext = () => {
    return useContext(DashboardContext);
}

export {
    DashboardContextProvider,
    useDashboardContext
}