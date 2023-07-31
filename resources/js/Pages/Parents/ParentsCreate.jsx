import React, {useState} from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function ParentsCreate(props) {
    const [values, setValues] = useState({
        name: '',
        nik: '',
        birthplace: '',
        birthdate: '',
        occupation: '',
        address: '',
        phone: '',
    })

    function handleChange(e) {
        const key = e.target.name;

        if (e.target.type == 'file') {
            if (e.target.files.length == 1) {
                const file = e.target.files[0]

                setValues(values => ({
                    ...values,
                    [key]: file
                }))
            } else {
                const file = e.target.files

                setValues(values => ({
                    ...values,
                    [key]: file
                }))
            }
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
        Inertia.post(route('parents.store'), values)
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Orang Tua/Wali</h2>}
        >
            <form onSubmit={handleSubmit}>
                <div className="grid gap-x-6 md:grid-cols-2">
                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Nama *</label>
                        <input type="text" id="name" name="name" onChange={handleChange} required={true}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="nik" className="block mb-2 text-sm font-medium text-gray-900 ">NIK *</label>
                        <input type="text" id="nik" name="nik" onChange={handleChange} required={true}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="birthplace" className="block mb-2 text-sm font-medium text-gray-900 ">Tempat Lahir *</label>
                        <input type="text" id="birthplace" name="birthplace" onChange={handleChange} required={true}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900 ">Tanggal Lahir *</label>
                        <input type="date" id="birthdate" name="birthdate" onChange={handleChange} required={true}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="occupation" className="block mb-2 text-sm font-medium text-gray-900 ">Profesi *</label>
                        <input type="text" id="occupation" name="occupation" onChange={handleChange} required={true}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 ">Alamat *</label>
                        <input type="text" id="address" name="address" onChange={handleChange} required={true}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Nomor Telepon *</label>
                        <input type="text" id="phone" name="phone" onChange={handleChange} required={true}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="ktp" className="block mb-2 text-sm font-medium text-gray-900 ">Foto KTP *</label>
                        {values.ktp &&  <img className='p-2 w-full h-40 object-contain border border-gray-300 rounded-lg mb-2' src={URL.createObjectURL(values.ktp)} /> }
                        <input type="file" id="ktp" name="ktp" onChange={handleChange} required={true}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="primary_photo" className="block mb-2 text-sm font-medium text-gray-900 ">Foto Utama *</label>
                        {values.primary_photo &&  <img className='p-2 w-full h-40 object-contain border border-gray-300 rounded-lg mb-2' src={URL.createObjectURL(values.primary_photo)} /> }
                        <input type="file" id="primary_photo" name="primary_photo" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               required={true} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="photos" className="block mb-2 text-sm font-medium text-gray-900 ">Foto Pendamping</label>
                        {values.photos &&
                            <div className='p-2 w-full h-40 border border-gray-300 rounded-lg mb-2 flex'>
                                {values.photos.length == undefined ? (
                                    <img className='object-contain w-full h-full' src={URL.createObjectURL(values.photos)} />
                                ) : (
                                    Array.from(values.photos).map(img =>
                                        <img className='object-contain w-full h-full' src={URL.createObjectURL(img)} />
                                    )
                                )}
                            </div>
                        }
                        <input type="file" id="photos" name="photos" onChange={handleChange} multiple
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               required={false} />
                    </div>
                </div>
                <button type="submit"
                        className="text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-3 text-center">Submit
                </button>
            </form>
        </Authenticated>
    );
}
