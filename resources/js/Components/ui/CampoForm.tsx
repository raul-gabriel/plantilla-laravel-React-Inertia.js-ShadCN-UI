import React from 'react';

interface InputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    required?: boolean;
    disabled?: boolean;
    autoComplete?: string;
    className?: string;
}

export function Input({
    label,
    name,
    value,
    onChange,
    error,
    placeholder = '',
    type = 'text',
    required = false,
    disabled = false,
    autoComplete,
    className = '',
}: InputProps) {
    return (
        <div className={className}>
            <label htmlFor={name} className="block text-sm font-medium text-texto-500 mb-1">
                {label}
                {required && <span className="text-colorError"> *</span>}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                autoComplete={autoComplete}
                aria-invalid={!!error}
                aria-describedby={error ? `${name}-error` : undefined}
                className={`w-full border rounded-md px-3 py-2 text-sm text-texto-500 outline-none transition-colors focus:ring-1 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed ${
                    error ? 'border-colorError' : 'border-gray-300'
                }`}
            />
            {error && (
                <div id={`${name}-error`} className="text-colorError text-sm mt-1">
                    {error}
                </div>
            )}
        </div>
    );
}

interface CheckboxOption {
    value: string;
    label: string;
}

interface CheckboxGroupProps {
    label: string;
    name: string;
    values: string[];
    onChange: (values: string[]) => void;
    options: CheckboxOption[];
    error?: string;
    disabled?: boolean;
    className?: string;
}

export function CheckboxGroup({
    label,
    name,
    values,
    onChange,
    options,
    error,
    disabled = false,
    className = '',
}: CheckboxGroupProps) {
    const handleCheckboxChange = (value: string) => {
        if (values.includes(value)) {
            onChange(values.filter((v) => v !== value));
        } else {
            onChange([...values, value]);
        }
    };

    return (
        <fieldset className={className}>
            <legend className="block text-sm font-medium text-texto-500 mb-2">{label}</legend>
            <div className="flex flex-col gap-2">
                {options.map((opt) => (
                    <label key={opt.value} className="inline-flex items-center gap-2 text-sm text-texto-500 cursor-pointer">
                        <input
                            type="checkbox"
                            name={name}
                            value={opt.value}
                            checked={values.includes(opt.value)}
                            onChange={() => handleCheckboxChange(opt.value)}
                            disabled={disabled}
                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        {opt.label}
                    </label>
                ))}
            </div>
            {error && <div className="text-colorError text-sm mt-1">{error}</div>}
        </fieldset>
    );
}

interface RadioOption {
    value: string;
    label: string;
}

interface RadioGroupProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    options: RadioOption[];
    error?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

export function RadioGroup({
    label,
    name,
    value,
    onChange,
    options,
    error,
    required = false,
    disabled = false,
    className = '',
}: RadioGroupProps) {
    return (
        <fieldset className={className}>
            <legend className="block text-sm font-medium text-texto-500 mb-2">
                {label}
                {required && <span className="text-colorError"> *</span>}
            </legend>
            <div className="flex gap-4">
                {options.map((opt) => (
                    <label key={opt.value} className="inline-flex items-center gap-2 text-sm text-texto-500 cursor-pointer">
                        <input
                            type="radio"
                            name={name}
                            value={opt.value}
                            checked={value === opt.value}
                            onChange={onChange}
                            disabled={disabled}
                            required={required}
                            className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        {opt.label}
                    </label>
                ))}
            </div>
            {error && <div className="text-colorError text-sm mt-1">{error}</div>}
        </fieldset>
    );
}

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: SelectOption[];
    error?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

export function Select({
    label,
    name,
    value,
    onChange,
    options,
    error,
    required = false,
    disabled = false,
    className = '',
}: SelectProps) {
    return (
        <div className={className}>
            <label htmlFor={name} className="block text-sm font-medium text-texto-500 mb-1">
                {label}
                {required && <span className="text-colorError"> *</span>}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                aria-invalid={!!error}
                className={`w-full border rounded-md px-3 py-2 text-sm text-texto-500 bg-white outline-none transition-colors focus:ring-1 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed ${
                    error ? 'border-colorError' : 'border-gray-300'
                }`}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <div className="text-colorError text-sm mt-1">{error}</div>}
        </div>
    );
}