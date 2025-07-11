import './Contact.css';
import {saveContact} from "../../../slices/contactSlice.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../../store/store.ts";
import {useForm} from "react-hook-form";

type FormData = {
    name: string;
    email: string;
    message: string;
    error: string | null | undefined;
};

export function Contact() {
    const dispatch = useDispatch<AppDispatch>();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        dispatch(saveContact(data))
    };

    return (
        <div className="w-[600px] mx-auto my-[40px] p-[30px] bg-white rounded-[10px] shadow-md shadow-black/50">
            <h2 className="text-2xl font-bold text-center text-[#195d94]">Contact Us</h2>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mb-[20px]">
                    <label className="font-bold mb-[5px]">Name: </label>
                    <input
                        className="p-[10px] mb-[20px] border border-gray-300 rounded-[5px]"
                        type="text"
                        {...register("name", {
                            required: "Name is required",
                            pattern: {
                                value: /^[A-Za-z\s]+$/,
                                message: "Name must only contain letters and spaces"
                            }
                        })}
                    />
                    {errors.name ? <span className="error">{errors.name.message}</span>:""}
                </div>

                <div className="flex flex-col mb-[20px]">
                    <label className="font-bold mb-[5px] ">Email: </label>
                    <input
                        className="p-[10px] mb-[20px] border border-gray-300 rounded-[5px]"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                    />
                    {errors.email ? <span className="error">{errors.email.message}</span>:""}
                </div>

                <div className="flex flex-col mb-[20px]">
                    <label className="font-bold mb-[5px] text-gray-700">Message: </label>
                    <textarea
                        className="p-[10px] mb-[20px] border border-gray-300 rounded-[5px]"
                        rows={5}
                        {...register("message", {
                            required: true
                        })}
                    ></textarea>
                    {errors.message ? <span className="text-red-600 mb-[5px]">Message is required</span>:""}
                </div>

                <button type="submit" className="px-[20px] py-[10px] bg-[#199494] text-white rounded-[5px] cursor-pointer">Send</button>
            </form>
        </div>
    );
}