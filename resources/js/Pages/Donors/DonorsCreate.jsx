import React, {useState} from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function DonorsCreate(props) {
    const [values, setValues] = useState({
        username: '',
        password: '',
        name: '',
        name_alias: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        note: '',
    })

    function handleChange(e) {
        const key = e.target.name;

        if (e.target.type == 'file') {
            const file = e.target.files[0]
            setValues(values => ({
                ...values,
                [key]: file
            }))
        } else {
            const value = e.target.value
            setValues(values => ({
                ...values,
                [key]: value,
            }))
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route('donors.store'), values)
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Donatur</h2>}
        >
            <form onSubmit={handleSubmit}>
                <h2 className='font-semibold text-lg mb-2'>Data Donatur</h2>
                <div className="grid gap-x-6 md:grid-cols-2">
                    <div className="mb-6">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Username *</label>
                        <input type="text" id="username" name="username" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               required={true} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password *</label>
                        <input type="text" id="password" name="password" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               required={true} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Nama/Lembaga *</label>
                        <input type="text" id="name" name="name" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               required={true} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="name_alias" className="block mb-2 text-sm font-medium text-gray-900 ">Nama Alias</label>
                        <input type="text" id="name_alias" name="name_alias" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Nomor Telepon *</label>
                        <input type="text" id="phone" name="phone" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               required={true} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email *</label>
                        <input type="email" id="email" name="email" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               required={true} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 ">Kota *</label>
                        <input type="text" id="city" name="city" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               required={true} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 ">Alamat</label>
                        <input type="text" id="address" name="address" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               required={false} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="ktp" className="block mb-2 text-sm font-medium text-gray-900 ">Foto KTP</label>
                        {values.ktp &&  <img className='p-2 w-full h-40 object-contain border border-gray-300 rounded-lg mb-2' src={URL.createObjectURL(values.ktp)} /> }
                        <input type="file" id="ktp" name="ktp" onChange={handleChange} required={false}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900 ">Foto Profil</label>
                        {values.photo &&  <img className='p-2 w-full h-40 object-contain border border-gray-300 rounded-lg mb-2' src={URL.createObjectURL(values.photo)} /> }
                        <input type="file" id="photo" name="photo" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="note"
                               className="block mb-2 text-sm font-medium text-gray-900 ">Catatan</label>
                        <textarea name="note" onChange={handleChange} className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400'
                        />
                    </div>
                </div>
                <button type="submit"
                        className="text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-3 text-center">Submit
                </button>
            </form>
        </Authenticated>
    );
}
