import React, {useState} from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from "@inertiajs/inertia-react";

export default function DisabilitiesCreate(props) {
    const [filteredDisabilities, setFilteredDisabilities] = useState(props.disabilities)
    const [selectedDisabilities, setSelectedDisabilities] = useState(props.selectedDisabilities)

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route('recipients.disabilities.store', props.recipient.id), {disabilities: selectedDisabilities})
    }

    function handleFilterDisabilities(e) {
        setFilteredDisabilities(props.disabilities.filter(disability => disability.disability.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    function handleSelectDisability(disability) {
        let disabilityExists = false;

        for (const selectedDisability of selectedDisabilities) {
            if (selectedDisability.id == disability.id) {
                disabilityExists = true;
            }
        }

        if (!disabilityExists) {
            disability['pivot'] = {}
            setSelectedDisabilities(prevState => [...prevState, disability]);
        }
    }

    function handleRemoveDisability(id) {
        setSelectedDisabilities(selectedDisabilities.filter(disability => disability.id !== id));
    }


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Anak</h2>}
        >
            <form onSubmit={handleSubmit}>
                <div>
                    <h2 className='font-semibold text-lg mb-2'>Pilih Disabilitas Anak</h2>
                    <div className="mb-6">
                        <input type="text" id="username" name="username" onChange={handleFilterDisabilities}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Cari wali anak" />
                        <div className='mt-2 max-h-[20rem] overflow-auto px-1'>
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
                    <div className='mt-2 max-h-[20rem] overflow-auto px-1'>
                        {selectedDisabilities.length == 0 ? (
                            <p className="font-medium text-gray-500 text-center leading-none my-12">Belum Ada Disabilitas yang Dipilih!</p>
                        ) : (
                            selectedDisabilities.map((disability, i) =>
                                <>
                                    <div className='px-3 py-3 mb-1 rounded-lg text-sm shadow flex items-center justify-between'>
                                        <div>
                                            {disability.disability}
                                        </div>
                                        <div>
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
                <button type="submit"
                        className="text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-3 text-center">Submit
                </button>
            </form>
        </Authenticated>
    );
}
