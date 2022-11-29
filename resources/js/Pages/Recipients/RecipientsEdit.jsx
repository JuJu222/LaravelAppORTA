import React, {useState} from 'react';
import {Inertia} from "@inertiajs/inertia";

export default function RecipientsEdit(props) {
    const [values, setValues] = useState({
        username: props.user.username,
        password: '',
        name: props.recipient.name,
        nik: props.recipient.nik,
        gender: props.recipient.gender,
        birthplace: props.recipient.birthplace,
        birthdate: props.recipient.birthdate,
        school: props.recipient.school,
        class: props.recipient.class,
        siblings: props.recipient.siblings,
        child_no: props.recipient.child_no,
        address: props.recipient.address,
        city: props.recipient.city,
        phone: props.recipient.phone,
        parent_id: props.recipient.parent_id,
        birth_certificate: props.recipient.birth_certificate,
        kartu_keluarga: props.recipient.kartu_keluarga,
        note: props.recipient.note,
        is_active: props.recipient.is_active,
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
        Inertia.put(route('recipients.update', props.recipient.id), values)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-x-6 md:grid-cols-2">
                <div className="mb-6">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                    <input type="text" id="username" name="username" onChange={handleChange} defaultValue={props.user.username}
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                           placeholder="Disability" />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                    <input type="text" id="password" name="password" onChange={handleChange} defaultValue=""
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                           placeholder="Description" />
                </div>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                    <input type="text" id="name" name="name" onChange={handleChange} defaultValue={props.recipient.name}
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                           placeholder="Description" />
                </div>
                <div className="mb-6">
                    <label htmlFor="nik" className="block mb-2 text-sm font-medium text-gray-900 ">NIK</label>
                    <input type="text" id="nik" name="nik" onChange={handleChange} defaultValue={props.recipient.nik}
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                           placeholder="Description" />
                </div>
                <div className="mb-6">
                    <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 ">Gender</label>
                    <input type="text" id="gender" name="gender" onChange={handleChange} defaultValue={props.recipient.gender}
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                           placeholder="Description" />
                </div>
                <div className="mb-6">
                    <label htmlFor="birthplace" className="block mb-2 text-sm font-medium text-gray-900 ">Birthplace</label>
                    <input type="text" id="birthplace" name="birthplace" onChange={handleChange} defaultValue={props.recipient.birthplace}
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                           placeholder="Description" />
                </div>
                <div className="mb-6">
                    <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900 ">Birthdate</label>
                    <input type="date" id="birthdate" name="birthdate" onChange={handleChange} defaultValue={props.recipient.birthdate}
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                           placeholder="Description" />
                </div>
                <div className="mb-6">
                    <label htmlFor="school" className="block mb-2 text-sm font-medium text-gray-900 ">School</label>
                    <input type="text" id="school" name="school" onChange={handleChange} defaultValue={props.recipient.school}
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                           placeholder="Description" />
                </div>
                <div className="mb-6">
                    <label htmlFor="class" className="block mb-2 text-sm font-medium text-gray-900 ">Class</label>
                    <input type="text" id="class" name="class" onChange={handleChange} defaultValue={props.recipient.class}
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                           placeholder="Description" />
                </div>
                <div className="mb-6">
                    <label htmlFor="siblings" className="block mb-2 text-sm font-medium text-gray-900 ">Siblings</label>
                    <input type="text" id="siblings" name="siblings" onChange={handleChange} defaultValue={props.recipient.siblings}
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                           placeholder="Description" />
                </div>
                <div className="mb-6">
                    <label htmlFor="child_no" className="block mb-2 text-sm font-medium text-gray-900 ">Child No</label>
                    <input type="text" id="child_no" name="child_no" onChange={handleChange} defaultValue={props.recipient.child_no}
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                           placeholder="Description" />
                </div>
                <div className="mb-6">
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 ">Address</label>
                    <input type="text" id="address" name="address" onChange={handleChange} defaultValue={props.recipient.address}
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                           placeholder="Description" />
                </div>
                <div className="mb-6">
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 ">City</label>
                    <input type="text" id="city" name="city" onChange={handleChange} defaultValue={props.recipient.city}
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                           placeholder="Description" />
                </div>
                <div className="mb-6">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone</label>
                    <input type="text" id="phone" name="phone" onChange={handleChange} defaultValue={props.recipient.phone}
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                           placeholder="Description" />
                </div>
                <div className="mb-6">
                    <label htmlFor="parent_id" className="block mb-2 text-sm font-medium text-gray-900 ">Parent ID</label>
                    <input type="text" id="parent_id" name="parent_id" onChange={handleChange} defaultValue={props.recipient.parent_id}
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                           placeholder="Description" />
                </div>
                <div className="mb-6">
                    <label htmlFor="birth_certificate" className="block mb-2 text-sm font-medium text-gray-900 ">Birth Certificate</label>
                    <input type="text" id="birth_certificate" name="birth_certificate" onChange={handleChange} defaultValue={props.recipient.birth_certificate}
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                           placeholder="Description" />
                </div>
                <div className="mb-6">
                    <label htmlFor="kartu_keluarga" className="block mb-2 text-sm font-medium text-gray-900 ">Kartu Keluarga</label>
                    <input type="text" id="kartu_keluarga" name="kartu_keluarga" onChange={handleChange} defaultValue={props.recipient.kartu_keluarga}
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                           placeholder="Description" />
                </div>
                <div className="mb-6">
                    <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-900 ">Note</label>
                    <input type="text" id="note" name="note" onChange={handleChange} defaultValue={props.recipient.note}
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                           placeholder="Description" />
                </div>
                <div className="mb-6">
                    <label htmlFor="is_active" className="block mb-2 text-sm font-medium text-gray-900 ">Is Active</label>
                    <input type="text" id="is_active" name="is_active" onChange={handleChange} defaultValue={props.recipient.is_active}
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                           placeholder="Description" />
                </div>
            </div>
            <button type="submit"
                    className="text-white w-full transition bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center">Submit
            </button>
        </form>
    );
}