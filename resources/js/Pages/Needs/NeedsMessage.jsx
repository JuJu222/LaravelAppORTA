import React, {useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/inertia-react';
import RecipientCard from "@/Components/RecipientCard";
import BottomNavbar from "@/Components/BottomNavbar";
import ApplicationLogo from "@/Components/ApplicationLogo";
import RecipientCardAdmin from "@/Components/RecipientCardAdmin";
import NeedCard from "@/Components/NeedCard";
import RecipientNeedCard from "@/Components/RecipientNeedCard";
import {Inertia} from "@inertiajs/inertia";

export default function Home(props) {
    const [values, setValues] = useState({
        delivered_date: '',
        delivered_message: ''
    })

    function handleChange(e) {
        const key = e.target.name;

        if (e.target.type === 'file') {
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
        Inertia.post(route('needs.message.post', props.need.id), values)
    }

    return (
        <div className='pb-20'>
            <div className='bg-red w-full px-4 pt-4'>
                <div className='max-w-6xl mx-auto'>
                    <div className='flex items-center gap-5'>
                        <ApplicationLogo white={true} className="block h-9 w-auto"></ApplicationLogo>
                    </div>
                    <div className='flex justify-between items-end mt-5'>
                        <div className='h-fit my-auto pb-4'>
                            <h2 className='text-md text-white font-bold'>Ucapkan Rasa Terima Kasih Anda</h2>
                            {/*{props.donor.donation_count > 0 ? (*/}
                            {/*    <p className='text-white text-sm mt-2'>Anda telah berhasil membantu anak-anak sebanyak <h6>{props.donor.donation_count} Kali</h6></p>*/}
                            {/*) : (*/}
                            {/*    <p className='text-white text-sm mt-2'>Ayo bantu anak-anak kami dengan donasi anda!</p>*/}
                            {/*)}*/}
                        </div>
                        <div>
                            <img src="/img/home_element1.png" alt="" className='max-h-[20rem]'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-1/3 px-4'>
                <div className='max-w-6xl mx-auto'>
                    <div>
                        <div className="grid grid-cols-1 gap-5">
                            <div className='grow md:pt-4'>
                                <NeedCard need={props.need} recipientID={props.recipient.id} button={false}/>
                                {props.need.pivot.delivered_date ? (
                                    <>
                                        <div className='mb-6'>
                                            <h5 className='block mt-6 mb-2 text-sm font-medium text-gray-900 '>Tanggal Penerimaan Dana:</h5>
                                            <p className='text-sm leading-relaxed font-bold'>{props.need.pivot.delivered_date}</p>
                                        </div>
                                        <div className='mb-6'>
                                            <h5 className='block mt-6 mb-2 text-sm font-medium text-gray-900 '>Foto Bukti Penerimaan Dana:</h5>
                                            <img className='p-2 w-full h-60 object-contain border border-gray-300 rounded-lg mb-2' src={'/img/recipients/delivered_photo/' + props.need.pivot.delivered_photo} />
                                        </div>
                                        <div className='mb-6'>
                                            <h5 className='block mt-6 mb-2 text-sm font-medium text-gray-900 '>Ucapan Terima Kasih Anda:</h5>
                                            <p className='text-sm leading-relaxed font-bold'>{props.need.pivot.delivered_message}</p>
                                        </div>
                                    </>
                                ) : (
                                    <form onSubmit={handleSubmit} className='mt-6'>
                                        <div className="mb-6">
                                            <label htmlFor="delivered_date" className="block mb-2 text-sm font-medium text-gray-900 ">Tanggal Penerimaan Dana *</label>
                                            <input type="date" id="delivered_date" name="delivered_date" onChange={handleChange}
                                                   className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                                   required={true} />
                                        </div>
                                        <div className="mb-6">
                                            <label htmlFor="delivered_photo" className="block mb-2 text-sm font-medium text-gray-900 ">Foto Bukti Penerimaan Dana *</label>
                                            {values.delivered_photo &&  <img className='p-2 w-full h-40 object-contain border border-gray-300 rounded-lg mb-2' src={URL.createObjectURL(values.delivered_photo)} /> }
                                            <input type="file" id="delivered_photo" name="delivered_photo" onChange={handleChange}
                                                   className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                                   required={true} />
                                        </div>
                                        <div className="mb-6">
                                            <label htmlFor="delivered_message"
                                                   className="block mb-2 text-sm font-medium text-gray-900 ">Ucapan Terima Kasih *</label>
                                            <textarea id="delivered_message" name="delivered_message" onChange={handleChange}
                                                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                                      required={true}/>
                                        </div>
                                        <button type="submit"
                                                className="text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-3 text-center">Submit
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomNavbar></BottomNavbar>
        </div>
    );
}
