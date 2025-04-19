import React from "react";
import { FieldError } from "react-hook-form";

type InputProps = {
    label: string;
    name: string;
    type?: string;
    register: (name: string) => any;
    error?: FieldError;
    required?: boolean;
    placeholder?: string;
    autoComplete?: string;
};

const Input: React.FC<InputProps> = ({
    label,
    name,
    type = "text",
    register,
    error,
    required = false,
    placeholder = "",
    autoComplete,
}) => {
    const id = `input-${name}`;
    const errorId = `${id}-error`;

    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium mb-1">
                {label} {required && <span className="text-red-500" aria-hidden="true">*</span>}
            </label>
            <input
                id={id}
                type={type}
                {...register(name)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${error ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-black focus:ring-gray-200"
                    }`}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? errorId : undefined}
                placeholder={placeholder}
                autoComplete={autoComplete}
                required={required}
                aria-required={required ? "true" : "false"}
            />
            {error && (
                <p id={errorId} className="text-red-500 text-sm mt-1" role="alert">
                    {error.message}
                </p>
            )}
        </div>
    );
};

export default Input;
