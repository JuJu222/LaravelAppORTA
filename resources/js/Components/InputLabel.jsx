import React from 'react';

export default function InputLabel({ forInput, value, className, children }) {
    return (
        <label htmlFor={forInput} className={`block text-sm font-medium text-gray-900 mb-2 ` + className}>
            {value ? value : children}
        </label>
    );
}
