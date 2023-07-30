import React from 'react';
import {Link} from '@inertiajs/inertia-react';
import BottomNavbar from "@/Components/BottomNavbar";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Profile(props) {
    let initials;

    if (props.admin) {
        initials = props.admin.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()

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
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Nama</h5>
                                <p className='text-center text-sm'>{props.admin.name ? props.admin.name : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Email</h5>
                                <p className='text-center text-sm'>{props.admin.email ? props.admin.email : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Nomor Telepon</h5>
                                <p className='text-center text-sm'>{props.admin.phone ? props.admin.phone : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Jabatan</h5>
                                <p className='text-center text-sm'>{props.admin.jabatan ? props.admin.jabatan : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Catatan</h5>
                                <p className='text-center text-sm'>{props.admin.note ? props.admin.note : '-'}</p>
                            </div>
                            {/*<div className='py-5'>*/}
                            {/*    <h5 className='font-bold text-xs'>KTP</h5>*/}
                            {/*    <p className='text-center text-sm'>{props.donor.ktp ? props.donor.ktp : '-'}</p>*/}
                            {/*</div>*/}
                            {/*<div className='py-5'>*/}
                            {/*    <h5 className='font-bold text-xs'>Nomor Telepon</h5>*/}
                            {/*    <p className='text-center text-sm'>{props.donor.phone ? props.donor.phone : '-'}</p>*/}
                            {/*</div>*/}
                            {/*<div className='py-5'>*/}
                            {/*    <h5 className='font-bold text-xs'>Email</h5>*/}
                            {/*    <p className='text-center text-sm'>{props.donor.email ? props.donor.email : '-'}</p>*/}
                            {/*</div>*/}
                            {/*<div className='py-5'>*/}
                            {/*    <h5 className='font-bold text-xs'>Kota</h5>*/}
                            {/*    <p className='text-center text-sm'>{props.donor.city ? props.donor.city : '-'}</p>*/}
                            {/*</div>*/}
                            {/*<div className='py-5'>*/}
                            {/*    <h5 className='font-bold text-xs'>Alamat</h5>*/}
                            {/*    <p className='text-center text-sm'>{props.donor.address ? props.donor.address : '-'}</p>*/}
                            {/*</div>*/}
                            {/*<div className='py-5'>*/}
                            {/*    <h5 className='font-bold text-xs'>Catatan</h5>*/}
                            {/*    <p className='text-center text-sm'>{props.donor.note ? props.donor.note : '-'}</p>*/}
                            {/*</div>*/}
                        </div>
                        <Link href={route('profile.edit')} as="button"
                              className="mt-3 text-red hover:text-white w-full transition hover:bg-red_hover border border-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-4 text-center">Ubah Profil
                        </Link>
                        <Link href={route('logout')} method="post" as="button"
                              className="mt-3 text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-4 text-center">Keluar
                        </Link>
                    </div>
                </div>
                <BottomNavbar auth={props.auth}></BottomNavbar>
            </div>
        );
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
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Nama</h5>
                                <p className='text-center text-sm'>{props.donor.name ? props.donor.name : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Nama Alias</h5>
                                <p className='text-center text-sm'>{props.donor.name_alias ? props.donor.name_alias : '-'}</p>
                            </div>
                            {props.donor.ktp && (
                                <div className='py-5'>
                                    <h5 className='font-bold text-xs'>KTP</h5>
                                    <img className='w-full h-40 object-contain' src={'/img/donors/ktp/' + props.donor.ktp}/>
                                </div>
                            )}
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Nomor Telepon</h5>
                                <p className='text-center text-sm'>{props.donor.phone ? props.donor.phone : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Email</h5>
                                <p className='text-center text-sm'>{props.donor.email ? props.donor.email : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Kota</h5>
                                <p className='text-center text-sm'>{props.donor.city ? props.donor.city : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Alamat</h5>
                                <p className='text-center text-sm'>{props.donor.address ? props.donor.address : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Catatan</h5>
                                <p className='text-center text-sm'>{props.donor.note ? props.donor.note : '-'}</p>
                            </div>
                        </div>
                        <Link href={route('profile.edit')} as="button"
                              className="mt-3 text-red hover:text-white w-full transition hover:bg-red_hover border border-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-4 text-center">Ubah Profil
                        </Link>
                        <Link href={route('logout')} method="post" as="button"
                              className="mt-3 text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-4 text-center">Keluar
                        </Link>
                    </div>
                </div>
                <BottomNavbar auth={props.auth}></BottomNavbar>
            </div>
        );
    } else {
        initials = props.recipient.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()

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
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Nama</h5>
                                <p className='text-center text-sm'>{props.recipient.name ? props.recipient.name : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>NIK</h5>
                                <p className='text-center text-sm'>{props.recipient.nik ? props.recipient.nik : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Jenis Kelamin</h5>
                                <p className='text-center text-sm'>{props.recipient.gender ? props.recipient.gender : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Tempat Lahir</h5>
                                <p className='text-center text-sm'>{props.recipient.birthplace ? props.recipient.birthplace : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Tanggal Lahir</h5>
                                <p className='text-center text-sm'>{props.recipient.birthdate ? props.recipient.birthdate : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Alamat</h5>
                                <p className='text-center text-sm'>{props.recipient.address ? props.recipient.address : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Kota</h5>
                                <p className='text-center text-sm'>{props.recipient.city ? props.recipient.city : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Nomor Telepon</h5>
                                <p className='text-center text-sm'>{props.recipient.phone ? props.recipient.phone : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Akta Kelahiran</h5>
                                <img className='w-full h-40 object-contain' src={'/img/recipients/birth_certificate/' + props.recipient.birth_certificate}/>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Kartu Keluarga</h5>
                                <img className='w-full h-40 object-contain' src={'/img/recipients/kartu_keluarga/' + props.recipient.kartu_keluarga}/>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Catatan</h5>
                                <p className='text-center text-sm'>{props.recipient.note ? props.recipient.note : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Jumlah Saudara</h5>
                                <p className='text-center text-sm'>{props.recipient.siblings ? props.recipient.siblings : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Anak ke</h5>
                                <p className='text-center text-sm'>{props.recipient.child_no ? props.recipient.child_no : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Nama Sekolah</h5>
                                <p className='text-center text-sm'>{props.recipient.school ? props.recipient.school : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Kelas</h5>
                                <p className='text-center text-sm'>{props.recipient.class ? props.recipient.class : '-'}</p>
                            </div>
                            {/*<div className='py-5'>*/}
                            {/*    <h5 className='font-bold text-xs'>Nama Alias</h5>*/}
                            {/*    <p className='text-center text-sm'>{props.donor.name_alias ? props.donor.name_alias : '-'}</p>*/}
                            {/*</div>*/}
                            {/*<div className='py-5'>*/}
                            {/*    <h5 className='font-bold text-xs'>KTP</h5>*/}
                            {/*    <p className='text-center text-sm'>{props.donor.ktp ? props.donor.ktp : '-'}</p>*/}
                            {/*</div>*/}
                            {/*<div className='py-5'>*/}
                            {/*    <h5 className='font-bold text-xs'>Nomor Telepon</h5>*/}
                            {/*    <p className='text-center text-sm'>{props.donor.phone ? props.donor.phone : '-'}</p>*/}
                            {/*</div>*/}
                            {/*<div className='py-5'>*/}
                            {/*    <h5 className='font-bold text-xs'>Email</h5>*/}
                            {/*    <p className='text-center text-sm'>{props.donor.email ? props.donor.email : '-'}</p>*/}
                            {/*</div>*/}
                            {/*<div className='py-5'>*/}
                            {/*    <h5 className='font-bold text-xs'>Kota</h5>*/}
                            {/*    <p className='text-center text-sm'>{props.donor.city ? props.donor.city : '-'}</p>*/}
                            {/*</div>*/}
                            {/*<div className='py-5'>*/}
                            {/*    <h5 className='font-bold text-xs'>Alamat</h5>*/}
                            {/*    <p className='text-center text-sm'>{props.donor.address ? props.donor.address : '-'}</p>*/}
                            {/*</div>*/}
                            {/*<div className='py-5'>*/}
                            {/*    <h5 className='font-bold text-xs'>Catatan</h5>*/}
                            {/*    <p className='text-center text-sm'>{props.donor.note ? props.donor.note : '-'}</p>*/}
                            {/*</div>*/}
                        </div>
                        <Link href={route('profile.edit')} as="button"
                              className="mt-3 text-red hover:text-white w-full transition hover:bg-red_hover border border-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-4 text-center">Ubah Profil
                        </Link>
                        <Link href={route('logout')} method="post" as="button"
                              className="mt-3 text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-ne focus:ring-pink font-bold rounded-lg text-sm px-5 py-4 text-center">Keluar
                        </Link>
                    </div>
                </div>
                <BottomNavbar auth={props.auth}></BottomNavbar>
            </div>
        );
    }
}
