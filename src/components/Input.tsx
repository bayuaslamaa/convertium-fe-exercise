import React from "react";
import { FieldError } from "react-hook-form";

type InputProps = {
    label: string;
    name: string;
    type?: string;
    register: (name: string) => any; // <- accept a function!
    error?: FieldError;
    required?: boolean;
};

const Input: React.FC<InputProps> = ({
    label,
    name,
    type = "text",
    register,
    error,
    required = false,
}) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                id={name}
                type={type}
                {...register(name)} // <- register must be called as a function
                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${error ? "border-red-500" : "border-gray-300"
                    }`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
};

export default Input;
