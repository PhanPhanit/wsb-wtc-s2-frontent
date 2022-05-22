import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ActionProvider} from './context/action_context';
import {UserProvider} from './context/user_context';
import {CategoryProvider} from './context/category_context';
import {ProductProvider} from './context/product_context';
import {SlideBannerProvider} from './context/slide_banner_context';
import {CartProvider} from './context/cart_context';
import {OrderProvider} from './context/order_context';
import { ReviewProvider } from './context/review_context';
import {LanguageContextProvider} from './context/language_context';


ReactDOM.render(
  <React.StrictMode>
    <LanguageContextProvider>
      <UserProvider>
        <ActionProvider>
          <SlideBannerProvider>
            <CategoryProvider>
              <ProductProvider>
                <CartProvider>
                  <OrderProvider>
                    <ReviewProvider>
                      <App />
                    </ReviewProvider>
                  </OrderProvider>
                </CartProvider>
              </ProductProvider>
            </CategoryProvider>
          </SlideBannerProvider>
        </ActionProvider>
      </UserProvider>
    </LanguageContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
