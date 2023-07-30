import React from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from "@inertiajs/inertia-react";

export default function NeedsShow(props) {
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
                                <div className='grow md:pt-4 md:w-1/2'>
                                    <div className='flex flex-row justify-between'>
                                        <h2 className='text-red text-2xl font-bold'>{props.need.recipient.name} - {props.need.need_category.category}</h2>
                                    </div>
                                    {props.auth.user.role_id == 1 &&
                                        <>
                                            <div className='flex gap-4 mt-2 w-full'>
                                                <Link href={route("needs.edit", props.need.id)} className="flex items-center justify-center text-center w-full">
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
                                                    <button onClick={(e) => handleDelete(props.need.id)}
                                                            className="w-full h-full text-sm leading-none text-white py-3 px-5 bg-red rounded transition hover:bg-red_hover focus:outline-none flex justify-center items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                             fill="currentColor" className="bi bi-trash3-fill"
                                                             viewBox="0 0 16 16">
                                                            <path
                                                                d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    }
                                    <div>
                                        <div className="grid grid-cols-1 divide-y gap-3 border border-black rounded-lg p-4 mt-4">
                                            <div className='grid grid-cols-1 gap-1'>
                                                <h4 className='text-red text-lg font-bold'>Informasi Kebutuhan Anak</h4>
                                                <p className='text-xs'>Nama Anak: <b>{props.need.recipient.name ? props.need.recipient.name : '-'}</b></p>
                                                <p className='text-xs'>Kebutuhan: <b>{props.need.recipient.name ? props.need.recipient.name : '-'}</b></p>
                                                <p className='text-xs'>Target Donasi: <b>{props.need.recipient.name ? props.need.recipient.name : '-'}</b></p>
                                                <p className='text-xs'>Batas Waktu: <b>{props.need.due_date ? new Date(props.need.due_date).toLocaleDateString("id-ID", options) : '-'}</b></p>
                                            </div>
                                            {props.need.delivered_date ? (
                                                <>
                                                    <div className='grid grid-cols-1 gap-1'>
                                                        <h4 className='text-red text-lg font-bold'>Informasi Konfirmasi Dana</h4>
                                                        <p className="bg-green-600 text-white px-4 py-2 rounded-lg text-center text-xs whitespace-nowrap w-fit">Sudah Dikonfirmasi</p>
                                                        <p className='text-xs'>Tanggal Penyaluran Dana: <b>{props.need.delivered_date ? new Date(props.need.delivered_date).toLocaleDateString("id-ID", options) : '-'}</b></p>
                                                        <p className='text-xs'>Ucapan Terima Kasih: <b>{props.need.delivered_message ? props.need.delivered_message : '-'}</b></p>
                                                    </div>
                                                    {props.need.delivered_photo &&
                                                        <div className='grid grid-cols-1 gap-1'>
                                                            <h4 className='text-red text-lg font-bold'>Foto Bukti Penyaluran Dana</h4>
                                                            <img className='w-full h-40 object-contain'
                                                                 src={'/img/recipients/delivered_photo/' + props.need.delivered_photo}/>
                                                        </div>
                                                    }
                                                </>
                                            ) : (
                                                <div className='grid grid-cols-1 gap-1'>
                                                    <h4 className='text-red text-lg font-bold'>Informasi Konfirmasi Dana</h4>
                                                    <p className="bg-red_dark text-white px-4 py-2 rounded-lg text-center text-xs whitespace-nowrap w-fit">Belum Dikonfirmasi</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/*<Link href={route('needs.needs.add', props.need.id)}*/}
                                    {/*      className='block text-center mt-4 w-full bg-red text-white text-sm px-5 py-3 rounded-2xl font-bold shadow-lg hover:bg-red_hover transition'>*/}
                                    {/*    Tambah Kebutuhan*/}
                                    {/*</Link>*/}
                                </div>
                            </div>
                        </div>
                        <div className='max-w-6xl mx-auto mt-4'>
                            <div className='flex justify-between items-center'>
                                <h4 className='text-red text-lg font-bold'>Riwayat Donasi</h4>
                                <h5 className='text-red text-md'>{props.need.donations.length} Donasi</h5>
                            </div>
                            <div>
                                {props.need.donations.length > 0 ? (
                                    props.need.donations.map((donation, i) =>
                                        <div className='shadow-lg rounded-lg p-4 flex gap-4'>
                                            <div className="w-10 h-10">
                                                <img className="w-full h-full rounded object-cover"
                                                     src={donation.donor.photo ? '/img/donors/photo/' + donation.donor.photo : '/img/avatar-default.png'}/>
                                            </div>
                                            <div>
                                                <h4 className='text-red text-base font-bold'>{donation.donor.name_alias ? donation.donor.name_alias : donation.donor.name}</h4>
                                                <p className='text-xs'>Mendonasikan
                                                    Sebesar <b>{'Rp' + formatter.format(donation.amount)}</b></p>
                                                <p className='text-[0.65rem]'>{new Date(donation.transfer_date).toLocaleDateString("id-ID", options)}</p>
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    <div className='p-4 py-8 text-center text-gray-500'>
                                        <h4>Belum ada Donasi!</h4>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
