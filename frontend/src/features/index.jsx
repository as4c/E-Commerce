import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import sellerSlice from "./slices/sellerSlice";
import categorySlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
import wishlistSlice from "./slices/wishlistSlice";
import addressSlice from "./slices/addressSlice";
import orderSlice from "./slices/orderSlice";
import paymentSlice from "./slices/paymentSlice";
import deliveryBoySlice from "./slices/deliveryBoySlice";

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    auth : authSlice,
    address : addressSlice,
    seller : sellerSlice,
    category : categorySlice,
    product : productSlice,
    cart : cartSlice,
    wishlist : wishlistSlice,
    order : orderSlice,
    payment : paymentSlice,
    deliveryBoy : deliveryBoySlice,
    
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)