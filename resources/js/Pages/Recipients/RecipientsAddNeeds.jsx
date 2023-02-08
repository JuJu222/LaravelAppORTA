import React, {useState} from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from "@inertiajs/inertia-react";

export default function NeedsCreate(props) {
    const [filteredNeeds, setFilteredNeeds] = useState(props.needs)
    const [selectedNeeds, setSelectedNeeds] = useState(props.selectedNeeds)

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route('recipients.needs.store', props.recipient.id), {needs: selectedNeeds})
    }

    function handleFilterNeeds(e) {
        setFilteredNeeds(props.needs.filter(need => need.category.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    function handleSelectNeed(need) {
        let needExists = false;

        for (const selectedNeed of selectedNeeds) {
            if (selectedNeed.id === need.id) {
                needExists = true;
            }
        }

        if (!needExists) {
            need['pivot'] = {}
            setSelectedNeeds(prevState => [...prevState, need]);
        }
    }

    function handleRemoveNeed(id) {
        setSelectedNeeds(selectedNeeds.filter(need => need.id !== id));
    }

    function handleInputAmount(e, i) {
        let arr = selectedNeeds
        selectedNeeds[i]['pivot']['amount'] = e.target.value
        setSelectedNeeds(arr);
    }

    function handleInputDueDate(e, i) {
        let arr = selectedNeeds
        selectedNeeds[i]['pivot']['due_date'] = e.target.value
        setSelectedNeeds(arr);
    }


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kebutuhan {props.recipient.name}</h2>}
        >
            <form onSubmit={handleSubmit}>
                <div>
                    <h2 className='font-semibold text-lg mb-2'>Pilih Kebutuhan Anak</h2>
                    <div className="mb-6">
                        <input type="text" id="username" name="username" onChange={handleFilterNeeds}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Cari wali anak" />
                        <div className='mt-2 max-h-[20rem] overflow-auto px-1'>
                            {filteredNeeds.map((need, i) =>
                                <div className='hover:bg-gray-100 transition rounded-lg px-3 py-3 mb-1 text-xs cursor-pointer shadow flex justify-between' onClick={(e) => handleSelectNeed(need)}>
                                    <div>
                                        {need.category}
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
                        <Link href={route('needs.create')} as="button"
                              className="mt-4 text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-3 text-center">Kebutuhan Belum Terdaftar? Daftar di Sini!
                        </Link>
                    </div>
                    <h3 className='font-semibold text-md mb-2'>Kebutuhan yang Telah Dipilih</h3>
                    <div className='mt-2 max-h-[20rem] overflow-auto px-1'>
                        {selectedNeeds.length === 0 ? (
                            <p className="font-medium text-gray-500 text-center leading-none my-12">Belum Ada Kebutuhan yang Dipilih!</p>
                        ) : (
                            selectedNeeds.map((need, i) =>
                                <>
                                    <div className='px-3 py-3 mb-1 rounded-lg text-sm shadow flex items-center'>
                                        <div className='w-1/3'>
                                            {need.category}
                                        </div>
                                        <div className='flex items-center'>
                                            <div className='mx-auto flex items-center gap-3'>
                                                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 ">Amount</label>
                                                <input type="number" id="amount" name="amount" onChange={(e) => handleInputAmount(e, i)}
                                                       className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                                       placeholder="Amount" defaultValue={need.pivot.amount} />
                                            </div>
                                        </div>
                                        <div className='flex items-center'>
                                            <div className='mx-auto flex items-center gap-3'>
                                                <label htmlFor="due_date" className="block mb-2 text-sm font-medium text-gray-900 ">Batas Waktu</label>
                                                <input type="date" id="due_date" name="due_date" onChange={(e) => handleInputDueDate(e, i)}
                                                       className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                                       placeholder="Due Date" defaultValue={need.pivot.date} />
                                            </div>
                                        </div>
                                        <div className='w-1/3 flex justify-end'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                                 className="bi bi-x cursor-pointer" viewBox="0 0 16 16" onClick={(e) => handleRemoveNeed(need.id)}>
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
