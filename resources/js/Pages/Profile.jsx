import React from 'react';
import {Head, Link} from '@inertiajs/inertia-react';
import RecipientCard from "@/Components/RecipientCard";
import BottomNavbar from "@/Components/BottomNavbar";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Profile(props) {
    let initials;

    if (props.admin) {
        return (
            <Link href={route('logout')} method="post" as="button"
                  className="mt-3 text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-3 text-center">Keluar
            </Link>
        )
    } else if (props.donor) {
        initials = props.donor.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()

        return (
            <div className='pb-20'>
                <div className='bg-red w-full px-4 pt-4'>
                    <div className='max-w-6xl mx-auto'>
                        <div className='flex items-center gap-5'>
                            <ApplicationLogo white={true} className="block h-9 w-auto"></ApplicationLogo>
                        </div>
                        <div className='flex justify-center w-full py-5'>
                            <div className='flex items-center justify-center bg-white text-gray-500 text-center rounded-full text-4xl font-bold w-32 h-32'>
                                {initials}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full h-1/3 px-4 pt-4'>
                    <div className='max-w-6xl mx-auto'>
                        <div className="grid grid-cols-1 divide-y">
                            <div className='py-3'>
                                <h5 className='font-bold text-xs'>Nama</h5>
                                <p className='text-center text-sm'>{props.donor.name ? props.donor.name : '-'}</p>
                            </div>
                            <div className='py-3'>
                                <h5 className='font-bold text-xs'>Nama Alias</h5>
                                <p className='text-center text-sm'>{props.donor.name_alias ? props.donor.name_alias : '-'}</p>
                            </div>
                            <div className='py-3'>
                                <h5 className='font-bold text-xs'>KTP</h5>
                                <p className='text-center text-sm'>{props.donor.ktp ? props.donor.ktp : '-'}</p>
                            </div>
                            <div className='py-3'>
                                <h5 className='font-bold text-xs'>Nomor Telepon</h5>
                                <p className='text-center text-sm'>{props.donor.phone ? props.donor.phone : '-'}</p>
                            </div>
                            <div className='py-3'>
                                <h5 className='font-bold text-xs'>Email</h5>
                                <p className='text-center text-sm'>{props.donor.email ? props.donor.email : '-'}</p>
                            </div>
                            <div className='py-3'>
                                <h5 className='font-bold text-xs'>Kota</h5>
                                <p className='text-center text-sm'>{props.donor.city ? props.donor.city : '-'}</p>
                            </div>
                            <div className='py-3'>
                                <h5 className='font-bold text-xs'>Alamat</h5>
                                <p className='text-center text-sm'>{props.donor.address ? props.donor.address : '-'}</p>
                            </div>
                            <div className='py-3'>
                                <h5 className='font-bold text-xs'>Catatan</h5>
                                <p className='text-center text-sm'>{props.donor.note ? props.donor.note : '-'}</p>
                            </div>
                        </div>
                        <Link href={route('logout')} method="post" as="button"
                              className="mt-3 text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-3 text-center">Keluar
                        </Link>
                    </div>
                </div>
                <BottomNavbar></BottomNavbar>
            </div>
        );
    } else {
        initials = props.recipient.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()
    }
}
