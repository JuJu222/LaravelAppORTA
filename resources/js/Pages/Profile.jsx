import React from 'react';
import {Head, Link} from '@inertiajs/inertia-react';
import RecipientCard from "@/Components/RecipientCard";
import BottomNavbar from "@/Components/BottomNavbar";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Profile(props) {
    const name = props.donor ? props.donor.name : props.recipient.name
    const initials = props.donor ? props.donor.name : props.recipient.name

    return (
        <div className='pb-20'>
            <div className='bg-red w-full px-4 pt-4'>
                <div className='max-w-6xl mx-auto'>
                    <div className='flex items-center gap-5'>
                        <ApplicationLogo white={true} className="block h-9 w-auto"></ApplicationLogo>
                    </div>
                    <div className='flex justify-center w-full py-5'>
                        <div className='flex items-center justify-center bg-white text-center rounded-full w-32 h-32'>
                            {initials}
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-1/3 px-4 pt-4'>
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
