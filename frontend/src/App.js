
import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from './homepage/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Profile from './user/Profile';
import VerificationComponent from './user/VerifyAccount';
import ChangePassword from './user/ResetPassword';
import ResetPasswordForm from './user/ForgetPasswordForm';
import ForgotPasswordForm from './user/ForgetPasswordEmailSend';
import CreateSellerAccountComp from './seller/CreateSellerAccount';
import UpdateSellerAccount from './seller/UpdateSellerAccount';
import ProtectedRoutes from './core/ProtectedRoutes';
import ProtectDashboard from './seller/ProtectDashboard';
import SellerDashboard from './seller/SellerDashboard';
import SellerAccountLogin from './seller/SellerAccountLogin';
import AddCategory from './category/AddCategory';
import AddProduct from './product/AddProduct';
import GetProduct from './product/GetProduct';
import SellerProductLists from './seller/SellerProductLists';
import UpdatePage from './product/UpdatePage';
import UserCart from './useraction/cart/UserCart';
import Wishlist from './useraction/wishlist/Wishlist';
import AddAddress from './useraction/address/AddAddress';
import UpdateAddress from './useraction/address/UpdateAddress';
import SelectAddress from './useraction/order/SelectAddress';
import OrderDetail from './useraction/order/OrderDetail';
import OrderList from './useraction/order/OrderList';
import OrderFromCart from './useraction/order/OrderFromCart';
import OrderDashboard from './seller/OrderDashboard';
import ProcessOrder from './seller/ProcessOrder';
import CreateDeliveryBoy from './deliveryBoy/CreateDeliveryBoy';
import DeliveryBoyLoginPage from './deliveryBoy/DeliveryBoyLogin';
import DeliveryBoyDashboard from './deliveryBoy/DeliveryBoyDashboard';
import ParcelsList from './deliveryBoy/ParcelsList';
import OrderSummary from './useraction/order/OrderSummary';
import ConfirmDelete from './user/ConfirmDelete';
import Settings from './user/Settings';
import UpdateAccount from './user/UpdateAccount';
import SearchResult from './product/SearchResult';
import SocialAuth from './user/SocialAuth';
import ErrorPage from './homepage/Component/Error';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route path="/google" element={<SocialAuth />} />
        <Route path="/accounts/verify/:uid/:token" element={<VerificationComponent />} />
        <Route path='/forget-password' element={<ForgotPasswordForm />} />
        <Route path='/reset-password' element={<ResetPasswordForm />} />
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/user/profile" element={<Profile />} />
          <Route path="/user/change-password" element={<ChangePassword />} />
          <Route path="/user/settings" element={<Settings />} />
          <Route path="/user/delete-account" element={<ConfirmDelete />} />
          <Route path="/user/update-profile" element={<UpdateAccount />} />
          <Route path="/user/cart" element={<UserCart />} />
          <Route path="/user/wishlist" element={<Wishlist />} />
          

          <Route path="/user/create-address" element={<AddAddress />} />
          <Route path="/user/update-address/:uid" element={<UpdateAddress />} />

          <Route path='/user/create-seller-account' element={<CreateSellerAccountComp />} />
          <Route path='/user/update-seller-account' element={<UpdateSellerAccount />} />

          <Route path='/user/seller/login' element={<SellerAccountLogin />} />
          <Route path="/user/seller" element={<ProtectDashboard />}>
            <Route path='dashboard' element={<SellerDashboard />} />
            <Route path="add-category" element={<AddCategory />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="update-product/:uid" element={<UpdatePage />} />
            <Route path="your-product" element={<SellerProductLists />} />
            <Route path="sells" element={<OrderDashboard />} />
            <Route path="order-info/:uid" element={<ProcessOrder />} />
          </Route>

          <Route path='/user/create-deliveryboy-account' element={<CreateDeliveryBoy />} />
          <Route path='/user/deliveryboy/login' element={<DeliveryBoyLoginPage />} />
          <Route path='/user/deliveryboy/dashboard' element={<DeliveryBoyDashboard />} />
          <Route path='/user/deliveryboy/parcel-list' element={<ParcelsList />} />

          <Route path="/product/buy/:uid" element={<OrderSummary />} />
          <Route path="/product/search/:query" element={<SearchResult />} />
          <Route path="/user/orders/:uid" element={<OrderDetail />} />
          <Route path="/user/orders" element={<OrderList />} />
          <Route path="/order/buy-all/" element={<OrderFromCart />} />
          <Route path="/product/buy/select-address" element={<SelectAddress />} />
        </Route>

        <Route path='/product/:uid' element={<GetProduct />} />
        <Route path='/account/settings' element={<Settings />} />


        <Route path="*" element={<Navigate to="/error" />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter >
  )
}
