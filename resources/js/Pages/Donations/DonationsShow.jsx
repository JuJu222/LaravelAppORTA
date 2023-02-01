import React from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from "@inertiajs/inertia-react";
import BottomNavbar from "@/Components/BottomNavbar";
import NeedCard from "@/Components/NeedCard";

export default function DonationsShow(props) {
    const formatter = new Intl.NumberFormat('de-DE');
    const options = {year: 'numeric', month: 'long', day: 'numeric'}

    function handleDelete(id) {
        Inertia.delete(route("needs.destroy", id));
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Informasi Kebutuhan Anak</h2>}
        >
            <div className="w-full sm:px-6 xl:px-0">
                <div className='pb-20'>
                    <div className='w-full px-4'>
                        <div className='max-w-6xl mx-auto mt-4'>
                            <div className='md:flex md:flex-row md:gap-5'>
                                <div className='grow md:pt-4'>
                                    <div className='flex flex-row justify-between'>
                                        <h2 className='text-red text-2xl font-bold'>{new Date(props.donation.transfer_date).toLocaleDateString("id-ID", options)} | {props.donation.donor.name} -> {props.donation.need.recipient.name} ({props.donation.need.need_category.category})</h2>
                                    </div>
                                    {props.auth.user.role_id == 1 &&
                                        <>
                                            <div className='flex gap-4 mt-2 w-full'>
                                                <Link href={route("donations.edit", props.donation.id)} className="flex items-center justify-center text-center w-full">
                                                    <button
                                                        className="w-full h-full text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-50 focus:outline-none transition flex justify-center items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                             fill="currentColor" className="bi bi-pencil-fill"
                                                             viewBox="0 0 16 16">
                                                            <path
                                                                d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                        </svg>
                                                    </button>
                                                </Link>
                                                <div className="flex items-center justify-center text-center w-full">
                                                    <button onClick={(e) => handleDelete(props.donation.id)}
                                                            className="w-full h-full text-sm leading-none text-white py-3 px-5 bg-red rounded transition hover:bg-red_hover focus:outline-none flex justify-center items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                             fill="currentColor" className="bi bi-trash3-fill"
                                                             viewBox="0 0 16 16">
                                                            <path
                                                                d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div onClick={(e) => handleAccept(donation.id)} className="flex items-center justify-center text-center w-full">
                                                    <button
                                                        className="w-full h-full text-sm leading-none text-white py-3 px-5 bg-green-600 rounded hover:bg-green-500 focus:outline-none transition flex items-center justify-center text-center   ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                             fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                                                            <path
                                                                d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="flex items-center justify-center text-center w-full">
                                                    <button onClick={(e) => handleReject(donation.id)}
                                                            className="w-full h-full text-sm leading-none text-white py-3 px-5 bg-red rounded transition hover:bg-red_hover focus:outline-none flex items-center justify-center text-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                             fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                            <path
                                                                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    }
                                    <div>
                                        <div className="grid grid-cols-1 divide-y gap-3 border border-black rounded-lg p-4 mt-4">
                                            <div className='grid grid-cols-1 gap-1'>
                                                <h4 className='text-red text-lg font-bold'>Informasi Donasi</h4>
                                                <p className='text-xs'>Kebutuhan: <b>{props.donation.need.need_category.category ? props.donation.need.need_category.category : '-'}</b></p>
                                                <p className='text-xs'>Nama Anak: <b>{props.donation.need.recipient.name ? props.donation.need.recipient.name : '-'}</b></p>
                                                <p className='text-xs'>Tanggal Transfer: <b>{props.donation.transfer_date ? new Date(props.donation.transfer_date).toLocaleDateString("id-ID", options) : '-'}</b></p>
                                                <p className='text-xs'>Nama Pemilik Rekening: <b>{props.donation.bank_account ? props.donation.bank_account : '-'}</b></p>
                                                <p className='text-xs'>Jumlah Donasi: <b>Rp{props.donation.amount ? formatter.format(props.donation.amount) : '-'}</b></p>
                                            </div>
                                            <div className='grid grid-cols-1 gap-1'>
                                                <h4 className='text-red text-lg font-bold'>Foto Bukti Transfer</h4>
                                                <img className='w-full h-40 object-contain'
                                                     src={'/img/donations/transfer_receipt/' + props.donation.transfer_receipt}/>
                                            </div>
                                            {props.donation.accepted_date ? (
                                                <>
                                                    <div className='grid grid-cols-1 gap-1'>
                                                        <h4 className='text-red text-lg font-bold'>Informasi Konfirmasi Donasi</h4>
                                                        <p className="bg-green-600 text-white px-4 py-2 rounded-lg text-center text-xs whitespace-nowrap w-fit">Sudah Dikonfirmasi</p>
                                                        <p className='text-xs'>Dikonfirmasi Tanggal: <b>{props.donation.accepted_date ? new Date(props.donation.accepted_date).toLocaleDateString("id-ID", options) : '-'}</b></p>
                                                        <p className='text-xs'>Oleh: <b>{props.donation.admin.name ? props.donation.admin.name : '-'}</b></p>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className='grid grid-cols-1 gap-1'>
                                                    <h4 className='text-red text-lg font-bold'>Informasi Konfirmasi Dana</h4>
                                                    <p className="bg-red_dark text-white px-4 py-2 rounded-lg text-center text-xs whitespace-nowrap w-fit">Belum Dikonfirmasi</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
