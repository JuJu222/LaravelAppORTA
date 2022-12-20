import React from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from "@inertiajs/inertia-react";
import RecipientCard from "@/Components/RecipientCard";
import BottomNavbar from "@/Components/BottomNavbar";
import NeedCard from "@/Components/NeedCard";

export default function RecipientsShow(props) {
    return (
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
                                {props.recipient.disabilities.map((disability, i) =>
                                    <span
                                        className="inline-block bg-pink rounded-full px-2 py-1 text-xs font-semibold text-white mr-2 mb-2">{disability.disability}</span>
                                )}
                            </div>
                            <div className='flex flex-row justify-between'>
                                <div>
                                    <p className='text-sm'>Donasi Tersedia</p>
                                    <h3 className='text-red text-2xl font-bold'>{'Rp' + 0}</h3>
                                </div>
                            </div>
                            {props.recipient.disabilities.map((disability, i) =>
                                <NeedCard disability={disability} />
                            )}
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
                            {props.recipients.map((recipient, i) =>
                                <RecipientCard recipient={recipient}></RecipientCard>
                            )}
                        </div>
                    </div>
                    <div>
                        <h4 className='text-red text-lg font-bold'>Riwayat Donasi</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                            {props.recipients.map((recipient, i) =>
                                <RecipientCard recipient={recipient}></RecipientCard>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <BottomNavbar></BottomNavbar>
        </div>
    );
}
