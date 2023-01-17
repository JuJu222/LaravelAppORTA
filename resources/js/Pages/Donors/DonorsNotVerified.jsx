import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/inertia-react';
import RecipientCard from "@/Components/RecipientCard";
import BottomNavbar from "@/Components/BottomNavbar";
import ApplicationLogo from "@/Components/ApplicationLogo";
import RecipientCardAdmin from "@/Components/RecipientCardAdmin";

export default function DonorsNotVerified(props) {
    return (
        <div className='pb-20'>
            <div className='bg-red w-full px-4 pt-4 pb-4'>
                <div className='max-w-6xl mx-auto'>
                    <div className='flex items-center gap-5'>
                        <ApplicationLogo white={true} className="block h-9 w-auto"></ApplicationLogo>
                    </div>
                </div>
            </div>
            <div className='md:flex md:justify-center mt-5 gap-10 px-4 pt-4 pb-4'>
                <div>
                    <img src="/img/home_element1.png" alt="" className='max-h-[20rem]'/>
                </div>
                <div className='h-fit pb-4 mt-4 md:my-auto'>
                    <h2 className='text-2xl text-red font-bold'>Halo, {props.donor.name}</h2>
                    <p className='text-black text-sm mt-2'>Akun anda masih dalam proses verifikasi. Harap coba lagi nanti.</p>
                    <Link href={route('logout')} method="post" as="button"
                          className="mt-3 text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-3 text-center">Keluar dari Akun
                    </Link>
                </div>
            </div>
            <BottomNavbar></BottomNavbar>
        </div>
    );
}
