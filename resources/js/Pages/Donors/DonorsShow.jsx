import React from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from "@inertiajs/inertia-react";
import NeedCard from "@/Components/NeedCard";

export default function DonorsShow(props) {
    const formatter = new Intl.NumberFormat('de-DE');

    function handleDelete(id) {
        Inertia.delete(route("donors.destroy", id));
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Donor</h2>}
        >
            <div className="w-full sm:px-6 xl:px-0">
                <div className='pb-20'>
                    <div className='w-full md:hidden'>
                        <div>
                            <img className='h-52 w-full object-cover' src={'/img/avatar-default.png'} alt=""/>
                        </div>
                    </div>
                    <div className='w-full px-4'>
                        <div className='max-w-6xl mx-auto mt-4'>
                            <div className='md:flex md:flex-row md:gap-5'>
                                <div className='hidden md:block'>
                                    <img className='h-96 w-full object-cover' src={'/img/avatar-default.png'} alt=""/>
                                </div>
                                <div className='grow md:pt-4'>
                                    <div className='flex flex-row justify-between'>
                                        <h2 className='text-red text-2xl font-bold'>{props.donor.name}</h2>
                                    </div>
                                    {props.auth.user.role_id == 1 &&
                                        <>
                                            <div className='flex gap-4 mt-2 w-full'>
                                                <Link href={route("admins.edit", props.donor.id)} className="flex items-center justify-center text-center w-full">
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
                                                    <button onClick={(e) => handleDelete(donor.id)}
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
                                                <h4 className='text-red text-lg font-bold'>Informasi Donor</h4>
                                                {props.auth.user.role_id == 1 &&
                                                    <p className='text-xs'>Username: {props.donor.user.username}</p>
                                                }
                                                <p className='text-xs'>Nama: {props.donor.name ? props.donor.name : '-'}</p>
                                                <p className='text-xs'>Nama Alias: {props.donor.name_alias ? props.donor.name_alias : '-'}</p>
                                                <p className='text-xs'>Nomor Telepon: {props.donor.phone ? props.donor.phone : '-'}</p>
                                                <p className='text-xs'>Email: {props.donor.email ? props.donor.email : '-'}</p>
                                                <p className='text-xs'>Kota: {props.donor.city ? props.donor.city : '-'}</p>
                                                <p className='text-xs'>Alamat: {props.donor.address ? props.donor.address : '-'}</p>
                                                <p className='text-xs'>Catatan: {props.donor.note ? props.donor.note : '-'}</p>
                                            </div>
                                            <div className='grid grid-cols-1 gap-1'>
                                                <h4 className='text-red text-lg font-bold'>Foto KTP</h4>
                                                <img className='w-full h-40 object-contain'
                                                     src={'/img/donors/ktp/' + props.donor.ktp}/>
                                            </div>
                                        </div>
                                    </div>
                                    {/*<Link href={route('admins.needs.add', props.donor.id)}*/}
                                    {/*      className='block text-center mt-4 w-full bg-red text-white text-sm px-5 py-3 rounded-2xl font-bold shadow-lg hover:bg-red_hover transition'>*/}
                                    {/*    Tambah Kebutuhan*/}
                                    {/*</Link>*/}
                                </div>
                            </div>
                            <div className='max-w-6xl mx-auto mt-4'>
                                <h4 className='text-red text-lg font-bold'>Riwayat Donasi</h4>
                                {props.donations.map((donation, i) =>
                                    <Link href={route('needs.message.show', donation.id)} className='flex justify-center'>
                                        <div className="w-full flex rounded-lg overflow-hidden shadow-lg hover:scale-[102%] transition bg-white">
                                            <img className="w-20 object-cover" src="/img/anak.png" alt="Sunset in the mountains" />
                                            <div className='w-full'>
                                                <div className="px-3 py-3">
                                                    <p className="text-gray-700 text-xs">{donation.donor.name} telah membantu {donation.need.recipient.name} sebanyak</p>
                                                    <div className='flex gap-1 items-center pt-2 pb-3'>
                                                        <h4 className="font-bold text-red">{'Rp' + formatter.format(donation.amount)},-</h4>
                                                        <p className='text-xs text-black'>untuk {donation.need.need_category.category}</p>
                                                    </div>
                                                    <div className='flex gap-1 items-center'>
                                                        <p className="text-gray-700 text-xs">Status: </p>
                                                        <p className='text-xs text-red font-bold'>{donation.accepted_date ? 'Terverifikasi (' + donation.accepted_date + ')' : 'Belum Diverifikasi'}</p>
                                                    </div>
                                                </div>
                                                {donation.need.delivered_date ? (
                                                    <div className='bg-red w-full px-3 py-1'>
                                                        <p className='text-white text-sm text-center font-bold'>Lihat Ucapan Terima Kasih</p>
                                                    </div>
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
