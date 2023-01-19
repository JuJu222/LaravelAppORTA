import React from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from "@inertiajs/inertia-react";
import RecipientCard from "@/Components/RecipientCard";
import BottomNavbar from "@/Components/BottomNavbar";
import NeedCard from "@/Components/NeedCard";

export default function RecipientsShow(props) {
    const formatter = new Intl.NumberFormat('de-DE');
    const options = { year: 'numeric', month: 'long', day: 'numeric' }

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
                                <h2 className='text-red text-2xl font-bold'>{props.recipient.name}</h2>
                                <h3 className='text-red text-2xl'>8 tahun</h3>
                            </div>
                            <div className="py-2">
                                {props.recipient.disabilities.map((disability, i) =>
                                    <span
                                        className="inline-block rounded-full px-2 py-0.5 text-xs font-semibold border border-black mr-2 mb-2">{disability.disability}</span>
                                )}
                            </div>
                            <div>
                                <div className="grid grid-cols-1 divide-y gap-3 border border-black rounded-lg p-4">
                                    <div className='grid grid-cols-1 gap-1'>
                                        <h4 className='text-red text-lg font-bold'>Informasi Pribadi</h4>
                                        <p className='text-xs'>Name: {props.recipient.name}</p>
                                        <p className='text-xs'>NIK: {props.recipient.nik}</p>
                                        <p className='text-xs'>Gender: {props.recipient.gender}</p>
                                        <p className='text-xs'>Birthplace: {props.recipient.birthplace}</p>
                                        <p className='text-xs'>Birthdate: {props.recipient.birthdate}</p>
                                        <p className='text-xs'>Address: {props.recipient.address}</p>
                                        <p className='text-xs'>City: {props.recipient.city}</p>
                                        <p className='text-xs'>Phone: {props.recipient.phone}</p>
                                        <p className='text-xs'>Birth Certificate: {props.recipient.birth_certificate}</p>
                                        <p className='text-xs'>Kartu Keluarga: {props.recipient.kartu_keluarga}</p>
                                        <p className='text-xs'>Catatan: {props.recipient.note}</p>
                                    </div>
                                    <div className='grid grid-cols-1 gap-1'>
                                        <h4 className='text-red text-lg font-bold'>Informasi Keluarga</h4>
                                        <p className='text-xs'>Siblings: {props.recipient.siblings}</p>
                                        <p className='text-xs'>Child No: {props.recipient.child_no}</p>
                                    </div>
                                    <div className='grid grid-cols-1 gap-1'>
                                        <h4 className='text-red text-lg font-bold'>Informasi Pendidikan</h4>
                                        <p className='text-xs'>School: {props.recipient.school}</p>
                                        <p className='text-xs'>Class: {props.recipient.class}</p>
                                    </div>
                                </div>
                            </div>
                            {/*<Link href={route('recipients.needs.add', props.recipient.id)}*/}
                            {/*      className='block text-center mt-4 w-full bg-red text-white text-sm px-5 py-3 rounded-2xl font-bold shadow-lg hover:bg-red_hover transition'>*/}
                            {/*    Tambah Keperluan*/}
                            {/*</Link>*/}
                        </div>
                    </div>
                    <div className='max-w-6xl mx-auto mt-4'>
                        <h4 className='text-red text-lg font-bold'>Pilihan Donasi</h4>
                        {props.recipient.needs.map((need, i) =>
                            <NeedCard need={need} recipientID={props.recipient.id} button={true}/>
                        )}
                    </div>
                    <div className='max-w-6xl mx-auto mt-4'>
                        <h4 className='text-red text-lg font-bold'>Wali atau Orang Tua</h4>
                        <div className="grid grid-cols-1 divide-y gap-3 border border-black rounded-lg p-4">
                            {props.recipient.parents.map((parent, i) =>
                                <div className='grid grid-cols-1 gap-1'>
                                    <h4 className='text-red text-base font-bold'>Informasi Keluarga</h4>
                                    <p className='text-xs'>Ibu dari Justina</p>
                                    <p className='text-xs'>Disabilitas: Pincang Glaukoma Diabetes</p>
                                    <p className='text-xs'>Tempat Lahir: Surabaya Jawa Timur</p>
                                    <p className='text-xs'>Tanggal Lahir: Surabaya Jawa Timur</p>
                                    <p className='text-xs'>Pekerjaan: Surabaya Jawa Timur</p>
                                    <p className='text-xs'>Alamat Tinggal: {parent.name}</p>
                                    <p className='text-xs'>Nomor Telepon: {parent.name}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='max-w-6xl mx-auto mt-4'>
                        <div className='flex justify-between items-center'>
                            <h4 className='text-red text-lg font-bold'>Riwayat Donasi</h4>
                            <h5 className='text-red text-md'>1902 Donasi</h5>
                        </div>
                        <div>
                            {props.donations.map((donation, i) =>
                                <div className='shadow-lg rounded-lg p-4 flex gap-4'>
                                    <div className="w-10 h-10">
                                        <img className="w-full h-full rounded object-cover" src={donation.donor.photo ? '/img/donors/photo/' + donation.donor.photo : '/img/avatar-default.png'} />
                                    </div>
                                    <div>
                                        <h4 className='text-red text-base font-bold'>{donation.donor.name}</h4>
                                        <p className='text-xs'>Berdonasi Sebesar <b>{'Rp' + formatter.format(donation.amount)}</b></p>
                                        <p className='text-[0.65rem]'>{new Date(donation.transfer_date).toLocaleDateString("id-ID", options)}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <BottomNavbar></BottomNavbar>
        </div>
    );
}
