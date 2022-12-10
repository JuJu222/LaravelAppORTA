import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/inertia-react';
import RecipientCard from "@/Components/RecipientCard";
import BottomNavbar from "@/Components/BottomNavbar";

export default function Profile(props) {
    return (
        <div className='pb-20'>
            <div className='w-full px-6'>
                <div className='max-w-6xl mx-auto'>
                    <Link href={route('logout')} method="post" as="button"
                            className="text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-3 text-center">Logout
                    </Link>
                </div>
            </div>
            <BottomNavbar></BottomNavbar>
        </div>
    );
}
