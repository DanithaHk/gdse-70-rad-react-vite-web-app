import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store/store";
import { decreaseQuantity, increaseQuantity } from "../../../slices/cartSlice";

interface ModifyCartProps {
    data: any;
}

export function ModifyCart({ data }: ModifyCartProps) {
    const dispatch = useDispatch<AppDispatch>();

    const item = useSelector((state: RootState) =>
        state.cart.items.find(cartItem => cartItem.product.id === data.id)
    );

    const decreaseItemCount = () => {
        if (item && item.itemCount > 1) {
            dispatch(decreaseQuantity(data.id));
        } else {
            alert("Item count can't be less than 1");
        }
    };

    const increaseItemCount = () => {
        dispatch(increaseQuantity(data.id));
    };

    return (
        <div className="w-full mt-4 p-[2.4px] text-[8px] text-center">
            <button
                className="float-left text-[1.2rem] bg-yellow-300 rounded-lg h-[2.2rem] w-[2.2rem]"
                onClick={decreaseItemCount}
            >-</button>
            <small className="text-[1.3rem]">{item?.itemCount || 1}</small>
            <button
                className="float-right text-[1.2rem] bg-yellow-300 rounded-lg h-[2.2rem] w-[2.2rem]"
                onClick={increaseItemCount}
            >+</button>
        </div>
    );
}
