import React, {useState} from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import RecipientCardAdmin from "@/Components/RecipientCardAdmin";

export default function DisabilitiesCreate(props) {
    const [values, setValues] = useState({})
    const [filteredParents, setFilteredParents] = useState(props.parents)
    const [selectedParents, setSelectedParents] = useState([])

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleFilterParents(e) {
        setFilteredParents(props.parents.filter(parent => parent.name.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route('recipients.store'), values)
    }

    function handleSelectParent(parent) {
        let parentExists = false;

        for (const selectedParent of selectedParents) {
            if (selectedParent.id === parent.id) {
                parentExists = true;
            }
        }

        if (!parentExists) {
            setSelectedParents(prevState => [...prevState, parent])
        }
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Penerima Dana</h2>}
        >
            <form onSubmit={handleSubmit}>
                <div>
                    <h2 className='font-semibold text-lg mb-2'>Pilih Orang Tua</h2>
                    <div className="mb-6">
                        <input type="text" id="username" name="username" onChange={handleFilterParents}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Cari orang tua" />
                        <div className='mt-2 max-h-40 overflow-auto px-1'>
                            {filteredParents.map((parent, i) =>
                                <div className='hover:bg-gray-100 transition px-3 py-3 mb-1 text-xs cursor-pointer shadow' onClick={(e) => handleSelectParent(parent)}>{parent.name}</div>
                            )}
                        </div>
                    </div>
                    <h3 className='font-semibold text-md mb-2'>Orang Tua yang Telah Dipilih</h3>
                    <div className="grid gap-x-6 md:grid-cols-2">
                        {selectedParents.map((parent, i) =>
                            <>
                                <div className="mb-6">
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Orang Tua 1</label>
                                    <input type="text" id="username" name="username" onChange={handleChange}
                                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                           placeholder="Disability" />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                    <input type="text" id="password" name="password" onChange={handleChange}
                                           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                           placeholder="Description" />
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <h2 className='font-semibold text-lg mb-2'>Isi Data Penerima Dana</h2>
                <div className="grid gap-x-6 md:grid-cols-2">
                    <div className="mb-6">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                        <input type="text" id="username" name="username" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Disability" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <input type="text" id="password" name="password" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Description" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                        <input type="text" id="name" name="name" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Description" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="nik" className="block mb-2 text-sm font-medium text-gray-900 ">NIK</label>
                        <input type="text" id="nik" name="nik" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Description" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 ">Gender</label>
                        <input type="text" id="gender" name="gender" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Description" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="birthplace" className="block mb-2 text-sm font-medium text-gray-900 ">Birthplace</label>
                        <input type="text" id="birthplace" name="birthplace" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Description" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900 ">Birthdate</label>
                        <input type="date" id="birthdate" name="birthdate" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Description" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="school" className="block mb-2 text-sm font-medium text-gray-900 ">School</label>
                        <input type="text" id="school" name="school" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Description" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="class" className="block mb-2 text-sm font-medium text-gray-900 ">Class</label>
                        <input type="text" id="class" name="class" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Description" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="siblings" className="block mb-2 text-sm font-medium text-gray-900 ">Siblings</label>
                        <input type="text" id="siblings" name="siblings" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Description" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="child_no" className="block mb-2 text-sm font-medium text-gray-900 ">Child No</label>
                        <input type="text" id="child_no" name="child_no" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Description" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 ">Address</label>
                        <input type="text" id="address" name="address" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Description" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 ">City</label>
                        <input type="text" id="city" name="city" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Description" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone</label>
                        <input type="text" id="phone" name="phone" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Description" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="parent_id" className="block mb-2 text-sm font-medium text-gray-900 ">Parent ID</label>
                        <input type="text" id="parent_id" name="parent_id" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Description" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="birth_certificate" className="block mb-2 text-sm font-medium text-gray-900 ">Birth Certificate</label>
                        <input type="text" id="birth_certificate" name="birth_certificate" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Description" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="kartu_keluarga" className="block mb-2 text-sm font-medium text-gray-900 ">Kartu Keluarga</label>
                        <input type="text" id="kartu_keluarga" name="kartu_keluarga" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Description" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-900 ">Note</label>
                        <input type="text" id="note" name="note" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Description" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="is_active" className="block mb-2 text-sm font-medium text-gray-900 ">Is Active</label>
                        <input type="text" id="is_active" name="is_active" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Description" />
                    </div>
                </div>
                <button type="submit"
                        className="text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-medium rounded-lg text-sm px-5 py-3 text-center">Submit
                </button>
            </form>
        </Authenticated>
    );
}
