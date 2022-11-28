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
        Inertia.post(route('disabilities.store'), values)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <label htmlFor="disability" className="block mb-2 text-sm font-medium text-gray-900 ">Disability</label>
                <input type="text" id="disability" name="disability" onChange={handleChange}
                       className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                       placeholder="Disability" required />
            </div>
            <div className="mb-6">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                <input type="text" id="description" name="description" onChange={handleChange}
                       className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                       placeholder="Description" required />
            </div>
            <button type="submit"
                    className="text-white w-full transition bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center">Submit
            </button>
        </form>
    );
}
