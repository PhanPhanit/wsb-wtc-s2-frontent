import React, {useEffect, useState} from 'react';
import {GrCart} from 'react-icons/gr';
import {RiMoneyDollarCircleLine} from 'react-icons/ri';
import {FaRegUser} from 'react-icons/fa';
import '../styles/dashboardPage.css';
import ChartComponent from '../charts/Column2d';
import { useDashboardContext } from '../contexts/dashboard_context';
import { numberWithCommas, formatMoney } from '../../utils/Tools';
import Translate, { translateText } from '../../Translate';
import { useLanguageContext } from '../../context/language_context';

const DashboardPage = () => {
  const {language} = useLanguageContext();
  const [dashboardPageLoading, setDashboardPageLoading] = useState(true);
  const {
    DashboardfetchAll,
    totalOrder,
    totalPrice,
    totalUser,
    mostSold,
    mostView,
  } = useDashboardContext();

  useEffect(()=>{
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setDashboardPageLoading(true);
    await DashboardfetchAll();
    setDashboardPageLoading(false);
  }



  if(dashboardPageLoading){
    return (
      <div className="dash-loading">
        <div className="dash-lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    );
  }
  return (
    <div className="dashboard-page-wrapper">
      <div className="view-total-number">
        <div className="single-box">
          <h3>{numberWithCommas(totalOrder)}</h3>
          <div>
            <span className={language==='kh'?"font-khmer":""}><Translate>dash_total_order</Translate></span>
            <GrCart className="icon" />
          </div>
        </div>
        <div className="single-box">
          <h3>{formatMoney(totalPrice)}</h3>
          <div>
            <span className={language==='kh'?"font-khmer":""}><Translate>dash_total_price</Translate></span>
            <RiMoneyDollarCircleLine className="icon" />
          </div>
        </div>
        <div className="single-box">
          <h3>{numberWithCommas(totalUser)}</h3>
          <div>
            <span className={language==='kh'?"font-khmer":""}><Translate>dash_total_user</Translate></span>
            <FaRegUser className="icon" />
          </div>
        </div>
      </div>
      <div className="chart-wrapper">
        <div className="single-chart">
          <ChartComponent data={mostSold} caption={translateText(language, "dash_most_sold")} xAxisName={translateText(language, "dash_product")} yAxisName={translateText(language, "dash_sold")} />
        </div>
        <div className="single-chart">
          <ChartComponent data={mostView} caption={translateText(language, "dash_most_view")} xAxisName={translateText(language, "dash_product")} yAxisName={translateText(language, "dash_view")} />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage