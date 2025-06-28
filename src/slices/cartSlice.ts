import type {CartItem} from "../model/CartItem.ts";
import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";
import type {ProductData} from "../model/ProductData.ts";



interface CartState {
    items: CartItem[];

}

const initialState: CartState = {
    items: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addItemToCart(state: CartState,
                      action: PayloadAction<ProductData>) {
            const existingItem = state.items.find((item: CartItem) =>
                item.product.id === action.payload.id);
            if (!existingItem){
                state.items.push({
                    product: action.payload,
                    itemCount: 1
                });
            }
        },
        increaseQuantity(state:CartState,action:PayloadAction<number>){
            const item = state.items
                .find((existingItem:CartItem)=>existingItem.product.id === action.payload);
            if (item){
                item.itemCount+=1;
            }
        },
        decreaseQuantity(state:CartState, action:PayloadAction<number>){
            const item  = state.items.find((existingItem:CartItem)=> existingItem.product.id === action.payload)
            if (item && item.itemCount > 1){
                item.itemCount-=1;
            }else {
                alert("Item count can't be less than 1");
            }
        }
    },
});

export const {addItemToCart} = cartSlice.actions;
export default cartSlice.reducer;