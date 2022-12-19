import React, {useState} from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import RecipientCardAdmin from "@/Components/RecipientCardAdmin";
import {Link} from "@inertiajs/inertia-react";

export default function RecipientsAddParents(props) {
    const [filteredParents, setFilteredParents] = useState(props.parents)
    const [selectedParents, setSelectedParents] = useState(props.selectedParents)

    function handleFilterParents(e) {
        setFilteredParents(props.parents.filter(parent => parent.name.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route('recipients.parents.store', props.recipient.id), {parents: selectedParents})
    }

    function handleSelectParent(parent) {
        let parentExists = false;

        for (const selectedParent of selectedParents) {
            if (selectedParent.id === parent.id) {
                parentExists = true;
            }
        }

        if (!parentExists) {
            parent['pivot'] = {};
            parent['pivot']['relationship_id'] = 1;
            setSelectedParents(prevState => [...prevState, parent]);
        }
    }

    function handleRemoveParent(id) {
        setSelectedParents(selectedParents.filter(parent => parent.id !== id));
    }

    function handleSelectRelationship(e, i) {
        let arr = selectedParents
        selectedParents[i]['pivot']['relationship_id'] = e.target.value
        setSelectedParents(arr);
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Penerima Dana</h2>}
        >
            <form onSubmit={handleSubmit}>
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
                                                        <option selected={parent.pivot.relationship_id === item.id} value={item.id}>{item.relationship}</option>
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
                <button type="submit"
                        className="text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-3 text-center">Submit
                </button>
            </form>
        </Authenticated>
    );
}
