import React from 'react';
import {Head, Link} from '@inertiajs/inertia-react';
import RecipientCard from "@/Components/RecipientCard";
import BottomNavbar from "@/Components/BottomNavbar";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Donations(props) {
    return (
        <div className='pb-20'>
            <div className='bg-red w-full px-4 pt-4'>
                <div className='max-w-6xl mx-auto'>
                    <div className='flex items-center gap-5'>
                        <ApplicationLogo white={true} className="block h-9 w-auto"></ApplicationLogo>
                    </div>
                    <div className='flex justify-between items-end mt-5'>
                        <div className='h-fit my-auto pb-5'>
                            <p className='text-white text-sm mt-2'>Anda telah berhasil membantu anak-anak sebanyak <h6>6 Kali</h6></p>
                        </div>
                        <div>
                            <img src="/img/home_element1.png" alt="" className='max-h-[20rem]'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-1/3 px-4 pt-4'>
                <div className='max-w-6xl mx-auto'>
                    <div className="flex flex-col gap-5">
                        {props.recipients.map((recipient, i) =>
                            <Link className='flex justify-center' href={route('recipients.show', recipient.id)}>
                                <div className="max-w-sm flex rounded-lg overflow-hidden shadow-lg hover:scale-[102%] transition bg-white">
                                    <img className="w-1/4 object-cover" src="/img/anak.png" alt="Sunset in the mountains" />
                                    <div className="px-3 py-3">
                                        <p className="text-gray-700 text-xs">Anda telah membantu {recipient.name} sebanyak</p>
                                        <div className='flex gap-2 items-center py-2'>
                                            <h4 className="font-bold text-base text-red">Rp4/000/000,-</h4>
                                            <p className='text-xs text-black'>untuk Sekolah</p>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <p className="text-gray-700 text-xs">Status: </p>
                                            <p className='text-xs text-red'>Belum Terverifikasi</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <BottomNavbar></BottomNavbar>
        </div>
    );
}
