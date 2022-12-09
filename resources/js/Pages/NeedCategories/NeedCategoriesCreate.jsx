import React, {useState} from 'react';
import {Inertia} from "@inertiajs/inertia";

export default function DisabilitiesCreate(props) {
    const [values, setValues] = useState({
    })

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route('need_categories.store'), values)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
                <input type="text" id="category" name="category" onChange={handleChange}
                       className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                       placeholder="Category" required />
            </div>
            <button type="submit"
                    className="text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-medium rounded-lg text-sm px-5 py-3 text-center">Submit
            </button>
        </form>
    );
}
