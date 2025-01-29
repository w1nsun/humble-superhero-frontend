import React from 'react';

interface FormInputProps {
    label: string;
    id: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: 'text' | 'number';
    error?: string;
    min?: number;
    max?: number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
}

export function FormInput({
    label,
    id,
    value,
    onChange,
    type = 'text',
    error,
    ...props
}: FormInputProps) {
    return (
        <div className="space-y-2">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...props}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}
