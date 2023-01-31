import React from 'react';
import {Head, Link} from '@inertiajs/inertia-react';
import RecipientCard from "@/Components/RecipientCard";
import BottomNavbar from "@/Components/BottomNavbar";
import ApplicationLogo from "@/Components/ApplicationLogo";
import RecipientNeedCard from "@/Components/RecipientNeedCard";

export default function Donations(props) {
    const formatter = new Intl.NumberFormat('de-DE');
    if (props.auth.user.role_id == 1) {

    } else if (props.auth.user.role_id == 2) {
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
                            {props.donations.map((donation, i) =>
                                <Link href={route('needs.message.show', donation.id)} className='flex justify-center'>
                                    <div className="w-full flex rounded-lg overflow-hidden shadow-lg hover:scale-[102%] transition bg-white">
                                        <img className="w-20 object-cover" src="/img/anak.png" alt="Sunset in the mountains" />
                                        <div className='w-full'>
                                            <div className="px-3 py-3">
                                                <p className="text-gray-700 text-xs">Anda telah membantu {donation.need.recipient.name} sebanyak</p>
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
                <BottomNavbar></BottomNavbar>
            </div>
        );
    } else {
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
                            {props.donations.map((donation, i) =>
                                <div className="w-full flex rounded-lg overflow-hidden shadow-lg transition bg-white">
                                    <img className="w-20 object-cover" src={donation.donor.photo ? '/img/donors/photo/' + donation.donor.photo : '/img/avatar-default.png'} />
                                    <div className='w-full'>
                                        <div className="px-3 py-3">
                                            <p className="text-gray-700 text-xs">{donation.donor.name} telah mendonasikan sebanyak</p>
                                            <div className='flex gap-1 items-center pt-2 pb-3'>
                                                <h4 className="font-bold text-red">{'Rp' + formatter.format(donation.amount)},-</h4>
                                                <p className='text-xs text-black'>untuk {donation.need.need_category.category}</p>
                                            </div>
                                            <div className='flex gap-1 items-center'>
                                                <p className="text-gray-700 text-xs">Status: </p>
                                                <p className='text-xs text-red font-bold'>{donation.accepted_date ? 'Terverifikasi (' + donation.accepted_date + ')' : 'Belum Diverifikasi'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <BottomNavbar></BottomNavbar>
            </div>
        );
    }
}
