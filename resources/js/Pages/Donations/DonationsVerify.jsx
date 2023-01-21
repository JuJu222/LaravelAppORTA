import React, {useState} from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from "@inertiajs/inertia-react";
import RecipientCard from "@/Components/RecipientCard";
import BottomNavbar from "@/Components/BottomNavbar";
import NeedCard from "@/Components/NeedCard";

export default function RecipientsDonate(props) {
    const formatter = new Intl.NumberFormat('de-DE');

    function handleSubmit(e) {
        e.preventDefault()
        // Inertia.post(route('recipients.donate.store', [props.recipient.id, props.need.pivot.id]), values)
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
                            <NeedCard need={props.need} recipientID={props.donation.need.recipient.id} button={false}/>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 divide-y">
                        <div className='py-5'>
                            <h5 className='font-bold text-xs'>Nama di Rekening</h5>
                            <p className='text-center text-sm'>{props.donation.bank_account ? props.donation.bank_account : '-'}</p>
                        </div>
                        <div className='py-5'>
                            <h5 className='font-bold text-xs'>Nominal</h5>
                            <p className='text-center text-sm'>{props.donation.amount ? 'Rp' + formatter.format(props.donation.amount) + ',-' : '-'}</p>
                        </div>
                        <div className='py-5'>
                            <h5 className='font-bold text-xs'>Bukti</h5>
                            {props.donation.transfer_receipt}
                            <img src="" alt=""/>
                        </div>
                    </div>
                    <Link href={route('logout')} method="post" as="button"
                          className="mt-3 text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-4 text-center">Keluar
                    </Link>
                </div>
            </div>
            <BottomNavbar></BottomNavbar>
        </div>
    );
}
