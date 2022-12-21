import React, {useState} from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from "@inertiajs/inertia-react";
import RecipientCard from "@/Components/RecipientCard";
import BottomNavbar from "@/Components/BottomNavbar";
import NeedCard from "@/Components/NeedCard";

export default function RecipientsDonate(props) {
    const [values, setValues] = useState({
    })

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

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route('recipients.donate.store', [props.recipient.id, props.need.pivot.id]), values)
    }

    return (
        <div className='pb-20'>
            <div className='w-full md:hidden'>
                <div>
                    <img className='h-52 w-full object-cover' src="/img/anak.png" alt=""/>
                </div>
            </div>
            <div className='w-full px-4'>
                <div className='max-w-6xl mx-auto mt-4'>
                    <div className='md:flex md:flex-row md:gap-5'>
                        <div className='hidden md:block'>
                            <img className='h-96 w-auto object-cover rounded-lg' src="/img/anak.png" alt=""/>
                        </div>
                        <div className='grow md:pt-4'>
                            <div className='flex flex-row justify-between'>
                                <h2 className='text-red text-2xl font-bold'>Justinna Wadana</h2>
                                <h3 className='text-red text-2xl'>8 tahun</h3>
                            </div>
                            <div className="py-2">
                                {props.recipient.disabilities.map((disability, i) =>
                                    <span
                                        className="inline-block bg-pink rounded-full px-2 py-1 text-xs font-semibold text-white mr-2 mb-2">{disability.disability}</span>
                                )}
                            </div>
                            <NeedCard need={props.need} recipientID={props.recipient.id} button={false}/>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className='mt-6'>
                        <div className="mb-6">
                            <label htmlFor="username"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">Nama Lengkap</label>
                            <input type="text" id="username" name="username" onChange={handleChange}
                                   className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                   placeholder="Disability"/>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="amount"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">Jumlah Donasi</label>
                            <input type="text" id="amount" name="amount" onChange={handleChange}
                                   className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                   placeholder="Amount"/>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="username"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">Bukti Transfer</label>
                            <input type="file" id="username" name="username" onChange={handleChange}
                                   className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                   placeholder="Disability"/>
                        </div>
                        <button type="submit"
                                className="text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-3 text-center">Submit
                        </button>
                    </form>
                </div>
            </div>
            <BottomNavbar></BottomNavbar>
        </div>
    );
}
