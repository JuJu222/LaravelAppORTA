import React, {useState} from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import RecipientCardAdmin from "@/Components/RecipientCardAdmin";
import {Link} from "@inertiajs/inertia-react";

export default function DisabilitiesCreate(props) {
    const [values, setValues] = useState({
        gender: 'laki-laki',
        is_active: 1
    })

    const [filteredParents, setFilteredParents] = useState(props.parents)
    const [selectedParents, setSelectedParents] = useState([])

    const [filteredDisabilities, setFilteredDisabilities] = useState(props.disabilities)
    const [selectedDisabilities, setSelectedDisabilities] = useState([])

    function handleChange(e) {
        const key = e.target.name;

        if (e.target.files !== null) {
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

    function handleFilterParents(e) {
        setFilteredParents(props.parents.filter(parent => parent.name.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    function handleSubmit(e) {
        e.preventDefault()
        let data = values
        data['parents'] = selectedParents
        data['disabilities'] = selectedDisabilities
        Inertia.post(route('recipients.store'), data)
    }

    function handleSelectParent(parent) {
        let parentExists = false;

        for (const selectedParent of selectedParents) {
            if (selectedParent.id === parent.id) {
                parentExists = true;
            }
        }

        if (!parentExists) {
            parent['relationship_id'] = 1;
            setSelectedParents(prevState => [...prevState, parent]);
        }
    }

    function handleRemoveParent(id) {
        setSelectedParents(selectedParents.filter(parent => parent.id !== id));
    }

    function handleSelectRelationship(e, i) {
        let arr = selectedParents
        selectedParents[i]['relationship_id'] = e.target.value
        setSelectedParents(arr);
    }

    function handleFilterDisabilities(e) {
        setFilteredDisabilities(props.disabilities.filter(disability => disability.disability.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    function handleSelectDisability(disability) {
        let disabilityExists = false;

        for (const selectedDisability of selectedDisabilities) {
            if (selectedDisability.id === disability.id) {
                disabilityExists = true;
            }
        }

        if (!disabilityExists) {
            setSelectedDisabilities(prevState => [...prevState, disability]);
        }
    }

    function handleRemoveDisability(id) {
        setSelectedDisabilities(selectedDisabilities.filter(disability => disability.id !== id));
    }

    function handleInputAmount(e, i) {
        let arr = selectedDisabilities
        selectedDisabilities[i]['amount'] = e.target.value
        setSelectedDisabilities(arr);
    }

    function handleInputDueDate(e, i) {
        let arr = selectedDisabilities
        selectedDisabilities[i]['due_date'] = e.target.value
        setSelectedDisabilities(arr);
    }


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Penerima Dana</h2>}
        >
            <form onSubmit={handleSubmit}>
                <div className="grid gap-x-6 md:grid-cols-2">
                    <div>
                        <h2 className='font-semibold text-lg mb-2'>Pilih Disabilitas Anak</h2>
                        <div className="mb-6">
                            <input type="text" id="username" name="username" onChange={handleFilterDisabilities}
                                   className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                   placeholder="Cari wali anak" />
                            <div className='mt-2 h-40 overflow-auto px-1'>
                                {filteredDisabilities.map((disability, i) =>
                                    <div className='hover:bg-gray-100 transition rounded-lg px-3 py-3 mb-1 text-xs cursor-pointer shadow flex justify-between' onClick={(e) => handleSelectDisability(disability)}>
                                        <div>
                                            {disability.disability}
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd"
                                                      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Link href={route('disabilities.create')} as="button"
                                  className="mt-4 text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-3 text-center">Disabilitas Belum Terdaftar? Daftar di Sini!
                            </Link>
                        </div>
                        <h3 className='font-semibold text-md mb-2'>Disabilitas yang Telah Dipilih</h3>
                        <div className='mt-2 h-40 overflow-auto px-1'>
                            {selectedDisabilities.length === 0 ? (
                                <p className="font-medium text-gray-500 text-center leading-none my-12">Belum Ada Disabilitas yang Dipilih!</p>
                            ) : (
                                selectedDisabilities.map((disability, i) =>
                                    <>
                                        <div className='px-3 py-3 mb-1 rounded-lg text-sm shadow flex items-center'>
                                            <div className='w-1/3'>
                                                {disability.disability}
                                            </div>
                                            <div>
                                                <div className='flex items-center mb-2'>
                                                    <div className='mx-auto flex items-center gap-3'>
                                                        <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 ">Amount</label>
                                                        <input type="number" id="amount" name="amount" onChange={(e) => handleInputAmount(e, i)}
                                                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                                               placeholder="Amount" />
                                                    </div>
                                                </div>
                                                <div className='flex items-center'>
                                                    <div className='mx-auto flex items-center gap-3'>
                                                        <label htmlFor="due_date" className="block mb-2 text-sm font-medium text-gray-900 ">Batas Waktu</label>
                                                        <input type="date" id="due_date" name="due_date" onChange={(e) => handleInputDueDate(e, i)}
                                                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                                               placeholder="Due Date" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='w-1/3 flex justify-end'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                                     className="bi bi-x cursor-pointer" viewBox="0 0 16 16" onClick={(e) => handleRemoveDisability(disability.id)}>
                                                    <path
                                                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </>
                                )
                            )}
                        </div>
                    </div>
                    <div>
                        <h2 className='font-semibold text-lg mb-2'>Pilih Wali Anak</h2>
                        <div className="mb-6">
                            <input type="text" id="username" name="username" onChange={handleFilterParents}
                                   className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                   placeholder="Cari wali anak" />
                            <div className='mt-2 h-40 overflow-auto px-1'>
                                {filteredParents.map((parent, i) =>
                                    <div className='hover:bg-gray-100 transition rounded-lg px-3 py-3 mb-1 text-xs cursor-pointer shadow flex justify-between' onClick={(e) => handleSelectParent(parent)}>
                                        <div>
                                            {parent.name}
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd"
                                                      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Link href={route('parents.create')} as="button"
                                  className="mt-4 text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-3 text-center">Wali Anak Belum Terdaftar? Daftar di Sini!
                            </Link>
                        </div>
                        <h3 className='font-semibold text-md mb-2'>Wali Anak yang Telah Dipilih</h3>
                        <div className='mt-2 h-40 overflow-auto px-1'>
                            {selectedParents.length === 0 ? (
                                <p className="font-medium text-gray-500 text-center leading-none my-12">Belum Ada Wali Anak yang Dipilih!</p>
                            ) : (
                                selectedParents.map((parent, i) =>
                                    <>
                                        <div className='px-3 py-3 mb-1 rounded-lg text-sm shadow flex items-center'>
                                            <div className='w-1/3'>
                                                {parent.name}
                                            </div>
                                            <div className='flex items-center w-1/3'>
                                                <div className='mx-auto flex items-center'>
                                                    <label htmlFor="username" className="block text-sm font-medium text-gray-900 mr-2">Hubungan:</label>
                                                    <select id="role" name="role" onChange={(e) => handleSelectRelationship(e, i)} className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block p-2.5 pr-10 placeholder-gray-400"
                                                            required>
                                                        {props.relationships.map((item, i) =>
                                                            <option value={item.id}>{item.relationship}</option>
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='w-1/3 flex justify-end'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                                     className="bi bi-x cursor-pointer" viewBox="0 0 16 16" onClick={(e) => handleRemoveParent(parent.id)}>
                                                    <path
                                                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </>
                                )
                            )}
                        </div>
                    </div>
                </div>
                <h2 className='font-semibold text-lg mb-2 mt-6'>Isi Data Penerima Dana</h2>
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
                        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-300 sm:flex">
                            <li className="w-full border-b border-gray-300 sm:border-b-0 sm:border-r">
                                <div className="flex items-center pl-3">
                                    <input id="gender_laki_laki" type="radio" value="laki-laki" name="gender" onChange={handleChange} checked
                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                    <label htmlFor="gender_laki_laki"
                                           className="py-2.5 ml-2 w-full text-sm font-medium text-gray-900">Laki-Laki</label>
                                </div>
                            </li>
                            <li className="w-full">
                                <div className="flex items-center pl-3">
                                    <input id="gender_perempuan" type="radio" value="perempuan" name="gender" onChange={handleChange}
                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                    <label htmlFor="gender_perempuan"
                                           className="py-2.5 ml-2 w-full text-sm font-medium text-gray-900">Perempuan</label>
                                </div>
                            </li>
                        </ul>
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
                        <label htmlFor="birth_certificate" className="block mb-2 text-sm font-medium text-gray-900 ">Birth Certificate</label>
                        <input type="text" id="birth_certificate" name="birth_certificate" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Description" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="kartu_keluarga" className="block mb-2 text-sm font-medium text-gray-900 ">Kartu Keluarga</label>
                        <input type="file" id="kartu_keluarga" name="kartu_keluarga" onChange={handleChange}
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
                        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-300 sm:flex">
                            <li className="w-full border-b border-gray-300 sm:border-b-0 sm:border-r">
                                <div className="flex items-center pl-3">
                                    <input id="is_active_aktif" type="radio" value="1" name="is_active" onChange={handleChange} checked
                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                    <label htmlFor="is_active_aktif"
                                           className="py-2.5 ml-2 w-full text-sm font-medium text-gray-900">Aktif</label>
                                </div>
                            </li>
                            <li className="w-full">
                                <div className="flex items-center pl-3">
                                    <input id="is_active_tidak_aktif" type="radio" value="0" name="is_active" onChange={handleChange}
                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                    <label htmlFor="is_active_tidak_aktif"
                                           className="py-2.5 ml-2 w-full text-sm font-medium text-gray-900">Tidak Aktif</label>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
                <button type="submit"
                        className="text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-3 text-center">Submit
                </button>
            </form>
        </Authenticated>
    );
}
