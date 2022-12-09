import React from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from "@inertiajs/inertia-react";
import RecipientCard from "@/Components/RecipientCard";
import BottomNavbar from "@/Components/BottomNavbar";

export default function RecipientsShow(props) {
    return (
        // <Authenticated
        //     auth={props.auth}
        //     errors={props.errors}
        //     header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Recipients</h2>}
        // >
        //     <h2>Name: {props.recipient.name}</h2>
        //     <h2>NIK: {props.recipient.nik}</h2>
        //     <h2>Gender: {props.recipient.gender}</h2>
        //     <h2>Birthplace: {props.recipient.birthplace}</h2>
        //     <h2>Birthdate: {props.recipient.birthdate}</h2>
        //     <h2>School: {props.recipient.school}</h2>
        //     <h2>Class: {props.recipient.class}</h2>
        //     <h2>Siblings: {props.recipient.siblings}</h2>
        //     <h2>Child No: {props.recipient.child_no}</h2>
        //     <h2>Address: {props.recipient.address}</h2>
        //     <h2>City: {props.recipient.city}</h2>
        //     <h2>Phone: {props.recipient.phone}</h2>
        //     <h2>Parent ID: {props.recipient.parent_id}</h2>
        //     <h2>Birth Certificate: {props.recipient.birth_certificate}</h2>
        //     <h2>Kartu Keluarga: {props.recipient.kartu_keluarga}</h2>
        //     <h2>Note: {props.recipient.note}</h2>
        //     <h2>Is Active: {props.recipient.is_active}</h2>
        // </Authenticated>
        <div className='pb-20'>
            <div className='w-full md:hidden'>
                <div>
                    <img className='h-52 w-full object-cover' src="/img/anak.png" alt=""/>
                </div>
            </div>
            <div className='w-full px-6'>
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
                        <span
                            className="inline-block bg-pink rounded-full px-2 py-1 text-xs font-semibold text-white mr-2 mb-2">Autisme</span>
                                <span
                                    className="inline-block bg-pink rounded-full px-2 py-1 text-xs font-semibold text-white mr-2 mb-2">Dyslexia</span>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <div>
                                    <p className='text-sm'>Donasi Tersedia</p>
                                    <h3 className='text-red text-2xl font-bold'>Rp160.000.000</h3>
                                </div>
                                <div>
                                    <Link>
                                        <button
                                            className='bg-red text-white px-5 py-3 rounded-2xl font-bold shadow-lg hover:bg-red_hover transition'>
                                            Bantu Sekarang
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className='mt-2 shadow-lg bg-pink rounded-lg p-5 md:block'>
                                <div className='flex flex-col'>
                                    <h4 className='text-white text-xl font-bold'>Rp160.000.000</h4>
                                    <p className='text-white text-xs'>Terkumpul dari <b>Rp500.000.000</b></p>
                                    <div className="w-full h-6 bg-white rounded-full mt-2">
                                        <div className="h-6 bg-red rounded-full w-[45%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-2 shadow-lg bg-pink rounded-lg p-5 hidden'>
                        <div className='flex flex-col'>
                            <h4 className='text-white text-xl font-bold'>Rp160.000.000</h4>
                            <p className='text-white text-xs'>Terkumpul dari <b>Rp500.000.000</b></p>
                            <div className="w-full h-6 bg-white rounded-full mt-2">
                                <div className="h-6 bg-red rounded-full w-[45%]"></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className='text-red text-lg font-bold'>Wali atau Orang Tua</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                            <RecipientCard></RecipientCard>
                            <RecipientCard></RecipientCard>
                            <RecipientCard></RecipientCard>
                        </div>
                    </div>
                    <div>
                        <h4 className='text-red text-lg font-bold'>Riwayat Donasi</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                            <RecipientCard></RecipientCard>
                            <RecipientCard></RecipientCard>
                            <RecipientCard></RecipientCard>
                        </div>
                    </div>
                </div>
            </div>
            <BottomNavbar></BottomNavbar>
        </div>
    );
}
