import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  CartPage,
  Category,
  Home,
  Profile,
  ViewBook,
  Error,
  Signup,
  Signin,
  SuccessCheckout,
  ForgotPassword,
  ResetPassword,
  SearchPage
} from "./pages";
import { Navbar, Sidebar, Footer, Feedback, Checkout, SendToken, PrivateRoute } from "./components";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthWrapper from "./components/AuthWrapper";
import { useActionContext } from "./context/action_context";
import DashProtectedRoute from "./protected/DashProtectedRoute";
import {
  BookPage,
  CategoryPage,
  DashboardLayout,
  DashboardPage,
  OrderPage,
  ProfilePage,
  UserPage,
  SlidePage
} from './dashboard/pages';
import { ActionProvider } from "./dashboard/contexts/action_context";
import {DashboardContextProvider} from './dashboard/contexts/dashboard_context';
import { DashCategoryContextProvider } from "./dashboard/contexts/dash_category_context";
import {DashBookContextProvider} from './dashboard/contexts/dash_book_context';
import {DashSlideContextProvider} from './dashboard/contexts/dash_slide_context';
import {DashOrderContextProvider} from './dashboard/contexts/dash_order_context';
import { DashUserContextProvider } from "./dashboard/contexts/dash_user_context";


function App() {
  const {isFeedbackOpen} = useActionContext();
  return (
    <AuthWrapper>
      <Router>
        <ToastContainer position="top-center" />
        <Navbar />
        <Sidebar />
        {
          isFeedbackOpen && <Feedback />
        }
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:id" element={<Category />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/cart" element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          } />
          <Route path="/checkout" element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          } />
          <Route path="/success-checkout" element={
            <PrivateRoute>
              <SuccessCheckout />
            </PrivateRoute>
          } />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />


          {/* start dashboard */}

          <Route path="/dashboard" element={
            <DashProtectedRoute>
              <ActionProvider>
                <DashboardContextProvider>
                  <DashCategoryContextProvider>
                    <DashBookContextProvider>
                      <DashSlideContextProvider>
                        <DashOrderContextProvider>
                          <DashUserContextProvider>
                            <DashboardLayout />
                          </DashUserContextProvider>
                        </DashOrderContextProvider>
                      </DashSlideContextProvider>
                    </DashBookContextProvider>
                  </DashCategoryContextProvider>
                </DashboardContextProvider>
              </ActionProvider>
            </DashProtectedRoute>
          }>
            <Route index element={<DashboardPage />} />
            <Route path="category" element={<CategoryPage />} />
            <Route path="book" element={<BookPage />} />
            <Route path="slide" element={<SlidePage />} />
            <Route path="order" element={<OrderPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="user" element={<UserPage />} />
          </Route>

          {/* end dashboard */}



          <Route path="/viewbook/:id" element={<ViewBook />} />
          <Route path="/send-token" element={<SendToken />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
