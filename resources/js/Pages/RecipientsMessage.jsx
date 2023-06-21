import React from 'react';
import {Link} from "@inertiajs/inertia-react";
import BottomNavbar from "@/Components/BottomNavbar";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function RecipientsMessage(props) {
    const formatter = new Intl.NumberFormat('de-DE');

    if (!props.need.delivered_date) {
        return (
            <div className='pb-20'>
                <div className='w-full md:hidden'>
                    <div>
                        {props.recipient.photos.map((photo, i) => {
                            if (photo.type.type == 'primary') {
                                return (
                                    <img className='h-52 w-full object-cover' src={photo.photo_url ? '/img/recipients/photos/' + photo.photo_url : '/img/anak.png'} alt=""/>
                                )
                            }
                        })}
                    </div>
                </div>
                <div className='w-full px-4'>
                    <div className='max-w-6xl mx-auto mt-4'>
                        <div className='md:flex md:flex-row md:gap-5'>
                            <div className='hidden md:block'>
                                {props.recipient.photos.map((photo, i) => {
                                    if (photo.type.type == 'primary') {
                                        return (
                                            <img className='h-96 w-auto object-cover rounded-lg' src={photo.photo_url ? '/img/recipients/photos/' + photo.photo_url : '/img/anak.png'} alt=""/>
                                        )
                                    }
                                })}
                            </div>
                            <div className='grow md:pt-4'>
                                <h2 className='text-base'>Terima Kasih,</h2>
                                <h2 className='text-red text-2xl font-bold'>{props.donor.name}</h2>
                            </div>
                        </div>
                        <div className='max-w-6xl mx-auto mt-4'>
                            <p className='text-sm leading-relaxed'>Donasi anda adalah bentuk <b>kemanusiaan</b> serta <b>cinta anda</b>, dan akan dialokasikan dengan sesuai.</p>
                        </div>
                        <div className='max-w-6xl mx-auto mt-4'>
                            <p className='text-sm text-center leading-relaxed'><b className='text-lg'>Anda</b> telah membantu <b className='text-red text-lg'>{props.recipient.name}</b> sebesar</p>
                        </div>
                        <div className='max-w-6xl mx-auto mt-4'>
                            <div className='rounded-xl shadow-md w-2/3 mx-auto py-8'>
                                <h4 className='text-red font-bold text-2xl text-center'>{'Rp' + formatter.format(props.donation.amount)}</h4>
                                <div className='w-fit p-2 bg-red shadow-md rounded-full mx-auto mt-5'>
                                    <div className='w-fit p-5 bg-white shadow-lg rounded-full'>
                                        <ApplicationLogo white={false} className="w-20 h-20" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='max-w-6xl mx-auto mt-4'>
                            <p className='text-sm leading-relaxed'>Donasi anda akan masuk ke dalam <b>tahap verifikasi</b> dan anda dapat melihat status donasi anda dalam <b>riwayat</b>.</p>
                        </div>
                        <div className='max-w-6xl mx-auto mt-4'>
                            <p className='text-sm leading-relaxed'>Penerima donasi juga dapat mengucapkan terima kasih yang dapat dilihat di halaman donasi.</p>
                        </div>
                        <Link href={route('home')}
                              className="mt-5 block text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-4 text-center">Kembali ke Beranda
                        </Link>
                    </div>
                </div>
                <BottomNavbar auth={props.auth}></BottomNavbar>
            </div>
        );
    } else {
        return (
            <div className='pb-20'>
                <div className='w-full md:hidden'>
                    <div>
                        {props.recipient.photos.map((photo, i) => {
                            if (photo.type.type == 'primary') {
                                return (
                                    <img className='h-52 w-full object-cover' src={photo.photo_url ? '/img/recipients/photos/' + photo.photo_url : '/img/anak.png'} alt=""/>
                                )
                            }
                        })}
                    </div>
                </div>
                <div className='w-full px-4'>
                    <div className='max-w-6xl mx-auto mt-4'>
                        <div className='md:flex md:flex-row md:gap-5'>
                            <div className='hidden md:block'>
                                {props.recipient.photos.map((photo, i) => {
                                    if (photo.type.type == 'primary') {
                                        return (
                                            <img className='h-96 w-auto object-cover rounded-lg' src={photo.photo_url ? '/img/recipients/photos/' + photo.photo_url : '/img/anak.png'} alt=""/>
                                        )
                                    }
                                })}
                            </div>
                            <div className='grow md:pt-4'>
                                <h2 className='text-base'>Terima Kasih,</h2>
                                <h2 className='text-red text-2xl font-bold'>{props.donor.name}</h2>
                            </div>
                        </div>
                        <div className='max-w-6xl mx-auto mt-4'>
                            <p className='text-sm leading-relaxed'>Karena <b>anda</b>, donasi untuk <b>{props.need.need_category.category}</b> kepada <b>{props.recipient.name}</b> terkumpul <b className='text-red'>{'Rp' + formatter.format(props.need.collected)}</b></p>
                        </div>
                        <div className='max-w-6xl mx-auto mt-4'>
                            <img className='rounded-xl shadow-md mx-auto object-cover' src={'/img/recipients/delivered_photo/' + props.need.delivered_photo} alt=""/>
                        </div>
                        <div className='max-w-6xl mx-auto mt-4'>
                            <h4 className='text-red font-bold text-lg'>{props.recipient.name}</h4>
                        </div>
                        <div className='max-w-6xl mx-auto mt-2'>
                            <p className='text-sm leading-relaxed'>"{props.need.delivered_message}"</p>
                        </div>
                        <Link href={route('home')}
                              className="mt-5 block text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-4 text-center">Kembali ke Donasi
                        </Link>
                    </div>
                </div>
                <BottomNavbar auth={props.auth}></BottomNavbar>
            </div>
        );
    }
}
