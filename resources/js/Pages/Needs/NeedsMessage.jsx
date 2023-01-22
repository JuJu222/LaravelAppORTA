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
                        <div className="w-full">
                            <div className="relative">
                                <svg
                                    className="absolute z-20 cursor-pointer top-[18px] left-4"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14.2716 13.1684L11.3313 10.2281C12.0391 9.28574 12.4213 8.13865 12.42 6.96C12.42 3.94938 9.97063 1.5 6.96 1.5C3.94938 1.5 1.5 3.94938 1.5 6.96C1.5 9.97063 3.94938 12.42 6.96 12.42C8.13865 12.4213 9.28574 12.0391 10.2281 11.3313L13.1684 14.2716C13.3173 14.4046 13.5114 14.4756 13.711 14.47C13.9105 14.4645 14.1004 14.3827 14.2415 14.2415C14.3827 14.1004 14.4645 13.9105 14.47 13.711C14.4756 13.5114 14.4046 13.3173 14.2716 13.1684ZM3.06 6.96C3.06 6.18865 3.28873 5.43463 3.71727 4.79328C4.14581 4.15192 4.7549 3.65205 5.46754 3.35687C6.18017 3.06169 6.96433 2.98446 7.72085 3.13494C8.47738 3.28542 9.17229 3.65686 9.71772 4.20228C10.2631 4.74771 10.6346 5.44262 10.7851 6.19915C10.9355 6.95567 10.8583 7.73983 10.5631 8.45247C10.268 9.1651 9.76808 9.77419 9.12673 10.2027C8.48537 10.6313 7.73135 10.86 6.96 10.86C5.92604 10.8588 4.93478 10.4475 4.20365 9.71635C3.47253 8.98522 3.06124 7.99396 3.06 6.96Z"
                                        fill="#4B5563"
                                    />
                                </svg>
                                <input
                                    className="relative text-sm leading-none text-gray-600 bg-white  rounded  w-full px-10 py-4 outline-none"
                                    type="text"
                                    name
                                    id
                                    placeholder="Search"
                                />
                            </div>
                        </div>
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
                                {props.need.pivot.delivered_message ? (
                                    <>
                                        <h5 className='block mt-6 mb-2 text-sm font-medium text-gray-900 '>Ucapan Anda yang Tersimpan:</h5>
                                        <p className='text-sm leading-relaxed'>{props.need.pivot.delivered_message}</p>
                                    </>
                                ) : (
                                    ''
                                )}
                                <form onSubmit={handleSubmit} className='mt-6'>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomNavbar></BottomNavbar>
        </div>
    );
}