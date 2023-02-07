import React, {useState} from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from "@inertiajs/inertia-react";
import RecipientCard from "@/Components/RecipientCard";
import BottomNavbar from "@/Components/BottomNavbar";
import NeedCard from "@/Components/NeedCard";
import DeleteConrifmation from "@/Components/DeleteConrifmation";

export default function RecipientsShow(props) {
    const formatter = new Intl.NumberFormat('de-DE');
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    const [showModal,setShowModal] = useState(false);
    const [modalData,setModalData] = useState({});

    const today = new Date();
    const birthDate = new Date(props.recipient.birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    function handleDelete(id) {
        Inertia.delete(route("recipients.destroy", id));
        setShowModal(false);
    }

    function confirmDelete(id, message) {
        setModalData({id: id, message: message});
        setShowModal(true);
    }

    if (props.auth.user.role_id == 1) {
        return (
            <Authenticated
                auth={props.auth}
                errors={props.errors}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Informasi Anak</h2>}
            >
                <div className="w-full sm:px-6 xl:px-0">
                    <div className='pb-20'>
                        <div className='w-full md:hidden'>
                            <div>
                                {props.recipient.photos.map((photo, i) => {
                                    if (photo.type.type === 'primary') {
                                        return (
                                            <img className='h-52 w-full object-cover' src={photo.photo_url ? '/img/recipients/photos/' + photo.photo_url : '/img/anak.png'} alt=""/>
                                        )
                                    }
                                })}
                                <div className='flex gap-2 mt-2 mx-2'>
                                    {props.recipient.photos.map((photo, i) => {
                                        if (photo.type.type === 'secondary') {
                                            return (
                                                <img className='h-20 w-auto object-cover rounded-lg' src={photo.photo_url ? '/img/recipients/photos/' + photo.photo_url : '/img/anak.png'} alt=""/>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className='w-full px-4'>
                            <div className='max-w-6xl mx-auto mt-4'>
                                <div className='md:flex md:flex-row md:gap-5'>
                                    <div className='hidden md:block'>
                                        {props.recipient.photos.map((photo, i) => {
                                            if (photo.type.type === 'primary') {
                                                return (
                                                    <img className='h-96 w-full object-cover rounded-lg' src={photo.photo_url ? '/img/recipients/photos/' + photo.photo_url : '/img/anak.png'} alt=""/>
                                                )
                                            }
                                        })}
                                        <div className='flex gap-2 mt-2'>
                                            {props.recipient.photos.map((photo, i) => {
                                                if (photo.type.type === 'secondary') {
                                                    return (
                                                        <img className='h-32 w-auto object-cover rounded-lg' src={photo.photo_url ? '/img/recipients/photos/' + photo.photo_url : '/img/anak.png'} alt=""/>
                                                    )
                                                }
                                            })}
                                        </div>
                                    </div>
                                    <div className='grow md:pt-4'>
                                        <div className='flex flex-row justify-between'>
                                            <h2 className='text-red text-2xl font-bold'>{props.recipient.name}</h2>
                                            <h3 className='text-red text-2xl'>{age} tahun</h3>
                                        </div>
                                        {props.auth.user.role_id == 1 &&
                                            <>
                                                <div className='flex gap-4 mt-2 w-full'>
                                                    <Link href={route("recipients.edit", props.recipient.id)} className="flex items-center justify-center text-center w-full">
                                                        <button
                                                            className="w-full h-full text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-50 focus:outline-none transition flex justify-center items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                 fill="currentColor" className="bi bi-pencil-fill"
                                                                 viewBox="0 0 16 16">
                                                                <path
                                                                    d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                            </svg>
                                                        </button>
                                                    </Link>
                                                    <Link href={route("recipients.disabilities.add", props.recipient.id)} className="flex items-center justify-center text-center w-full">
                                                        <button className="w-full h-full text-sm leading-none font-bold text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-50 focus:outline-none transition flex justify-center items-center">
                                                            Atur Disabilitas
                                                        </button>
                                                    </Link>
                                                    <Link href={route("recipients.parents.add", props.recipient.id)} className="flex items-center justify-center text-center w-full">
                                                        <button className="w-full h-full text-sm leading-none font-bold text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-50 focus:outline-none transition flex justify-center items-center">
                                                            Atur Wali
                                                        </button>
                                                    </Link>
                                                    <div className="flex items-center justify-center text-center w-full">
                                                        <button onClick={(e) => confirmDelete(props.recipient.id, props.recipient.name)}
                                                                className="w-full h-full text-sm leading-none text-white py-3 px-5 bg-red rounded transition hover:bg-red_hover focus:outline-none flex justify-center items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                 fill="currentColor" className="bi bi-trash3-fill"
                                                                 viewBox="0 0 16 16">
                                                                <path
                                                                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className='mt-2 w-full'>
                                                    <Link href={route("recipients.needs.add", props.recipient.id)} className="flex items-center justify-center text-center w-full">
                                                        <button className="w-full h-full font-bold text-sm leading-none text-white py-3 px-5 bg-red rounded transition hover:bg-red_hover focus:outline-none flex justify-center items-center">
                                                            Atur Kebutuhan
                                                        </button>
                                                    </Link>
                                                </div>
                                            </>
                                        }
                                        <div className="py-2">
                                            {props.recipient.disabilities.map((disability, i) =>
                                                <span
                                                    className="inline-block rounded-full px-2 py-0.5 text-xs font-semibold border border-black mr-2 mb-2">{disability.disability}</span>
                                            )}
                                        </div>
                                        <div>
                                            <div className="grid grid-cols-1 divide-y gap-3 border border-black rounded-lg p-4">
                                                <div className='grid grid-cols-1 gap-1'>
                                                    <h4 className='text-red text-lg font-bold'>Informasi Pribadi</h4>
                                                    <p className='text-xs'>NIK: {props.recipient.nik}</p>
                                                    <p className='text-xs'>Jenis Kelamin: {props.recipient.gender}</p>
                                                    <p className='text-xs'>Tempat Lahir: {props.recipient.birthplace}</p>
                                                    <p className='text-xs'>Tanggal
                                                        Lahir: {new Date(props.recipient.birthdate).toLocaleDateString("id-ID", options)}</p>
                                                    <p className='text-xs'>Alamat: {props.recipient.address}</p>
                                                    <p className='text-xs'>Kota: {props.recipient.city}</p>
                                                    <p className='text-xs'>Nomor Telepon: {props.recipient.phone}</p>
                                                    <p className='text-xs'>Birth
                                                        Certificate: {props.recipient.birth_certificate}</p>
                                                    <p className='text-xs'>Kartu Keluarga: {props.recipient.kartu_keluarga}</p>
                                                    <p className='text-xs'>Catatan: {props.recipient.note}</p>
                                                </div>
                                                <div className='grid grid-cols-1 gap-1'>
                                                    <h4 className='text-red text-lg font-bold'>Informasi Keluarga</h4>
                                                    <p className='text-xs'>Jumlah Saudara: {props.recipient.siblings}</p>
                                                    <p className='text-xs'>Anak ke: {props.recipient.child_no}</p>
                                                </div>
                                                <div className='grid grid-cols-1 gap-1'>
                                                    <h4 className='text-red text-lg font-bold'>Informasi Pendidikan</h4>
                                                    <p className='text-xs'>Nama Sekolah: {props.recipient.school}</p>
                                                    <p className='text-xs'>Kelas: {props.recipient.class}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/*<Link href={route('recipients.needs.add', props.recipient.id)}*/}
                                        {/*      className='block text-center mt-4 w-full bg-red text-white text-sm px-5 py-3 rounded-2xl font-bold shadow-lg hover:bg-red_hover transition'>*/}
                                        {/*    Tambah Kebutuhan*/}
                                        {/*</Link>*/}
                                    </div>
                                </div>
                                <div className='max-w-6xl mx-auto mt-4'>
                                    <h4 className='text-red text-lg font-bold'>Pilihan Donasi</h4>
                                    {props.recipient.needs.map((need, i) =>
                                        <NeedCard need={need} recipientID={props.recipient.id} button={true}/>
                                    )}
                                </div>
                                <div className='max-w-6xl mx-auto mt-4'>
                                    <h4 className='text-red text-lg font-bold'>Wali atau Orang Tua</h4>
                                    <div className="grid grid-cols-1 divide-y gap-3 border border-black rounded-lg px-4 pb-4">
                                        {props.recipient.parents.map((parent, i) =>
                                            <div className='grid grid-cols-1 gap-1'>
                                                <h4 className='text-red text-base font-bold mt-2'>{parent.name}</h4>
                                                <p className='text-xs'>{parent.relationship} dari {props.recipient.name}</p>
                                                <p className='text-xs'>Disabilitas:&nbsp;
                                                    {parent.disabilities.map((disability, i) =>
                                                        i === parent.disabilities.length - 1 ? (
                                                            disability.disability
                                                        ) : (
                                                            disability.disability + ', '
                                                        )
                                                    )}
                                                </p>
                                                <p className='text-xs'>Tempat Lahir: {parent.birthplace}</p>
                                                <p className='text-xs'>Tanggal
                                                    Lahir: {new Date(parent.birthdate).toLocaleDateString("id-ID", options)}</p>
                                                <p className='text-xs'>Profesi: {parent.occupation}</p>
                                                <p className='text-xs'>Alamat Tinggal: {parent.address}</p>
                                                <p className='text-xs'>Nomor Telepon: {parent.phone}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='max-w-6xl mx-auto mt-4'>
                                    <div className='flex justify-between items-center'>
                                        <h4 className='text-red text-lg font-bold'>Riwayat Donasi</h4>
                                        <h5 className='text-red text-md'>{props.donations.length} Donasi</h5>
                                    </div>
                                    <div>
                                        {props.donations.length > 0 ? (
                                            props.donations.map((donation, i) =>
                                                <>
                                                    {props.auth.user.role_id === 1 ? (
                                                        <div className='shadow-lg rounded-lg p-4 flex gap-4'>
                                                            <div className="w-10 h-10">
                                                                <img className="w-full h-full rounded object-cover"
                                                                     src={donation.donor.photo ? '/img/donors/photo/' + donation.donor.photo : '/img/avatar-default.png'}/>
                                                            </div>
                                                            <div>
                                                                <h4 className='text-red text-base font-bold'>{donation.donor.name_alias ? donation.donor.name_alias : donation.donor.name}</h4>
                                                                <p className='text-xs'>Mendonasikan
                                                                    Sebesar <b>{'Rp' + formatter.format(donation.amount)}</b></p>
                                                                <p className='text-[0.65rem]'>{new Date(donation.transfer_date).toLocaleDateString("id-ID", options)}</p>
                                                                {donation.accepted_date ? (
                                                                    <p className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-center text-[0.65rem] whitespace-nowrap w-fit">{donation.accepted_date}</p>
                                                                ) : (
                                                                    <p className="bg-red_dark text-white px-3 py-1.5 rounded-lg text-center text-[0.65rem] whitespace-nowrap w-fit">Belum Dikonfirmasi</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className='shadow-lg rounded-lg p-4 flex gap-4'>
                                                            <div className="w-10 h-10">
                                                                <img className="w-full h-full rounded object-cover"
                                                                     src={donation.donor.photo ? '/img/donors/photo/' + donation.donor.photo : '/img/avatar-default.png'}/>
                                                            </div>
                                                            <div>
                                                                <h4 className='text-red text-base font-bold'>{donation.donor.name_alias ? donation.donor.name_alias : donation.donor.name}</h4>
                                                                <p className='text-xs'>Mendonasikan
                                                                    Sebesar <b>{'Rp' + formatter.format(donation.amount)}</b></p>
                                                                <p className='text-[0.65rem]'>{new Date(donation.transfer_date).toLocaleDateString("id-ID", options)}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            )
                                        ) : (
                                            <div className='p-4 py-8 text-center text-gray-500'>
                                                <h4>Belum ada Donasi!</h4>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DeleteConrifmation showModal={showModal} setShowModal={setShowModal} modalData={modalData} handleDelete={handleDelete}></DeleteConrifmation>
            </Authenticated>
        )
    } else {
        return (
            <div className='pb-20'>
                <div className='w-full md:hidden'>
                    <div>
                        {props.recipient.photos.map((photo, i) => {
                            if (photo.type.type === 'primary') {
                                return (
                                    <img className='h-52 w-full object-cover' src={photo.photo_url ? '/img/recipients/photos/' + photo.photo_url : '/img/anak.png'} alt=""/>
                                )
                            }
                        })}
                        <div className='flex gap-2 mt-2 mx-2'>
                            {props.recipient.photos.map((photo, i) => {
                                if (photo.type.type === 'secondary') {
                                    return (
                                        <img className='h-20 w-auto object-cover rounded-lg' src={photo.photo_url ? '/img/recipients/photos/' + photo.photo_url : '/img/anak.png'} alt=""/>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
                <div className='w-full px-4'>
                    <div className='max-w-6xl mx-auto mt-4'>
                        <div className='md:flex md:flex-row md:gap-5'>
                            <div className='hidden md:block'>
                                {props.recipient.photos.map((photo, i) => {
                                    if (photo.type.type === 'primary') {
                                        return (
                                            <img className='h-96 w-full object-cover rounded-lg' src={photo.photo_url ? '/img/recipients/photos/' + photo.photo_url : '/img/anak.png'} alt=""/>
                                        )
                                    }
                                })}
                                <div className='flex gap-2 mt-2'>
                                    {props.recipient.photos.map((photo, i) => {
                                        if (photo.type.type === 'secondary') {
                                            return (
                                                <img className='h-32 w-auto object-cover rounded-lg' src={photo.photo_url ? '/img/recipients/photos/' + photo.photo_url : '/img/anak.png'} alt=""/>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                            <div className='grow md:pt-4'>
                                <div className='flex flex-row justify-between'>
                                    <h2 className='text-red text-2xl font-bold'>{props.recipient.name}</h2>
                                    <h3 className='text-red text-2xl'>{age} tahun</h3>
                                </div>
                                {props.auth.user.role_id == 1 &&
                                    <>
                                        <div className='flex gap-4 mt-2 w-full'>
                                            <Link href={route("recipients.edit", props.recipient.id)} className="flex items-center justify-center text-center w-full">
                                                <button
                                                    className="w-full h-full text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-50 focus:outline-none transition flex justify-center items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                         fill="currentColor" className="bi bi-pencil-fill"
                                                         viewBox="0 0 16 16">
                                                        <path
                                                            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                    </svg>
                                                </button>
                                            </Link>
                                            <Link href={route("recipients.disabilities.add", props.recipient.id)} className="flex items-center justify-center text-center w-full">
                                                <button className="w-full h-full text-sm leading-none font-bold text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-50 focus:outline-none transition flex justify-center items-center">
                                                    Atur Disabilitas
                                                </button>
                                            </Link>
                                            <Link href={route("recipients.parents.add", props.recipient.id)} className="flex items-center justify-center text-center w-full">
                                                <button className="w-full h-full text-sm leading-none font-bold text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-50 focus:outline-none transition flex justify-center items-center">
                                                    Atur Wali
                                                </button>
                                            </Link>
                                            <div className="flex items-center justify-center text-center w-full">
                                                <button onClick={(e) => confirmDelete(props.recipient.id, props.recipient.name)}
                                                        className="w-full h-full text-sm leading-none text-white py-3 px-5 bg-red rounded transition hover:bg-red_hover focus:outline-none flex justify-center items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                         fill="currentColor" className="bi bi-trash3-fill"
                                                         viewBox="0 0 16 16">
                                                        <path
                                                            d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className='mt-2 w-full'>
                                            <Link href={route("recipients.needs.add", props.recipient.id)} className="flex items-center justify-center text-center w-full">
                                                <button className="w-full h-full font-bold text-sm leading-none text-white py-3 px-5 bg-red rounded transition hover:bg-red_hover focus:outline-none flex justify-center items-center">
                                                    Atur Kebutuhan
                                                </button>
                                            </Link>
                                        </div>
                                    </>
                                }
                                <div className="py-2">
                                    {props.recipient.disabilities.map((disability, i) =>
                                        <span
                                            className="inline-block rounded-full px-2 py-0.5 text-xs font-semibold border border-black mr-2 mb-2">{disability.disability}</span>
                                    )}
                                </div>
                                <div>
                                    <div className="grid grid-cols-1 divide-y gap-3 border border-black rounded-lg p-4">
                                        <div className='grid grid-cols-1 gap-1'>
                                            <h4 className='text-red text-lg font-bold'>Informasi Pribadi</h4>
                                            <p className='text-xs'>NIK: {props.recipient.nik}</p>
                                            <p className='text-xs'>Jenis Kelamin: {props.recipient.gender}</p>
                                            <p className='text-xs'>Tempat Lahir: {props.recipient.birthplace}</p>
                                            <p className='text-xs'>Tanggal
                                                Lahir: {new Date(props.recipient.birthdate).toLocaleDateString("id-ID", options)}</p>
                                            <p className='text-xs'>Alamat: {props.recipient.address}</p>
                                            <p className='text-xs'>Kota: {props.recipient.city}</p>
                                            <p className='text-xs'>Nomor Telepon: {props.recipient.phone}</p>
                                            <p className='text-xs'>Birth
                                                Certificate: {props.recipient.birth_certificate}</p>
                                            <p className='text-xs'>Kartu Keluarga: {props.recipient.kartu_keluarga}</p>
                                            <p className='text-xs'>Catatan: {props.recipient.note}</p>
                                        </div>
                                        <div className='grid grid-cols-1 gap-1'>
                                            <h4 className='text-red text-lg font-bold'>Informasi Keluarga</h4>
                                            <p className='text-xs'>Jumlah Saudara: {props.recipient.siblings}</p>
                                            <p className='text-xs'>Anak ke: {props.recipient.child_no}</p>
                                        </div>
                                        <div className='grid grid-cols-1 gap-1'>
                                            <h4 className='text-red text-lg font-bold'>Informasi Pendidikan</h4>
                                            <p className='text-xs'>Nama Sekolah: {props.recipient.school}</p>
                                            <p className='text-xs'>Kelas: {props.recipient.class}</p>
                                        </div>
                                    </div>
                                </div>
                                {/*<Link href={route('recipients.needs.add', props.recipient.id)}*/}
                                {/*      className='block text-center mt-4 w-full bg-red text-white text-sm px-5 py-3 rounded-2xl font-bold shadow-lg hover:bg-red_hover transition'>*/}
                                {/*    Tambah Kebutuhan*/}
                                {/*</Link>*/}
                            </div>
                        </div>
                        <div className='max-w-6xl mx-auto mt-4'>
                            <h4 className='text-red text-lg font-bold'>Pilihan Donasi</h4>
                            {props.recipient.needs.map((need, i) =>
                                <NeedCard need={need} recipientID={props.recipient.id} button={true}/>
                            )}
                        </div>
                        <div className='max-w-6xl mx-auto mt-4'>
                            <h4 className='text-red text-lg font-bold'>Wali atau Orang Tua</h4>
                            <div className="grid grid-cols-1 divide-y gap-3 border border-black rounded-lg px-4 pb-4">
                                {props.recipient.parents.map((parent, i) =>
                                    <div className='grid grid-cols-1 gap-1'>
                                        <h4 className='text-red text-base font-bold mt-2'>{parent.name}</h4>
                                        <p className='text-xs'>{parent.relationship} dari {props.recipient.name}</p>
                                        <p className='text-xs'>Disabilitas:&nbsp;
                                            {parent.disabilities.map((disability, i) =>
                                                i === parent.disabilities.length - 1 ? (
                                                    disability.disability
                                                ) : (
                                                    disability.disability + ', '
                                                )
                                            )}
                                        </p>
                                        <p className='text-xs'>Tempat Lahir: {parent.birthplace}</p>
                                        <p className='text-xs'>Tanggal
                                            Lahir: {new Date(parent.birthdate).toLocaleDateString("id-ID", options)}</p>
                                        <p className='text-xs'>Profesi: {parent.occupation}</p>
                                        <p className='text-xs'>Alamat Tinggal: {parent.address}</p>
                                        <p className='text-xs'>Nomor Telepon: {parent.phone}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='max-w-6xl mx-auto mt-4'>
                            <div className='flex justify-between items-center'>
                                <h4 className='text-red text-lg font-bold'>Riwayat Donasi</h4>
                                <h5 className='text-red text-md'>{props.donations.length} Donasi</h5>
                            </div>
                            <div>
                                {props.donations.length > 0 ? (
                                    props.donations.map((donation, i) =>
                                        <>
                                            {props.auth.user.role_id === 1 ? (
                                                <div className='shadow-lg rounded-lg p-4 flex gap-4'>
                                                    <div className="w-10 h-10">
                                                        <img className="w-full h-full rounded object-cover"
                                                             src={donation.donor.photo ? '/img/donors/photo/' + donation.donor.photo : '/img/avatar-default.png'}/>
                                                    </div>
                                                    <div>
                                                        <h4 className='text-red text-base font-bold'>{donation.donor.name_alias ? donation.donor.name_alias : donation.donor.name}</h4>
                                                        <p className='text-xs'>Mendonasikan
                                                            Sebesar <b>{'Rp' + formatter.format(donation.amount)}</b></p>
                                                        <p className='text-[0.65rem]'>{new Date(donation.transfer_date).toLocaleDateString("id-ID", options)}</p>
                                                        {donation.accepted_date ? (
                                                            <p className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-center text-[0.65rem] whitespace-nowrap w-fit">{donation.accepted_date}</p>
                                                        ) : (
                                                            <p className="bg-red_dark text-white px-3 py-1.5 rounded-lg text-center text-[0.65rem] whitespace-nowrap w-fit">Belum Dikonfirmasi</p>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className='shadow-lg rounded-lg p-4 flex gap-4'>
                                                    <div className="w-10 h-10">
                                                        <img className="w-full h-full rounded object-cover"
                                                             src={donation.donor.photo ? '/img/donors/photo/' + donation.donor.photo : '/img/avatar-default.png'}/>
                                                    </div>
                                                    <div>
                                                        <h4 className='text-red text-base font-bold'>{donation.donor.name_alias ? donation.donor.name_alias : donation.donor.name}</h4>
                                                        <p className='text-xs'>Mendonasikan
                                                            Sebesar <b>{'Rp' + formatter.format(donation.amount)}</b></p>
                                                        <p className='text-[0.65rem]'>{new Date(donation.transfer_date).toLocaleDateString("id-ID", options)}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )
                                ) : (
                                    <div className='p-4 py-8 text-center text-gray-500'>
                                        <h4>Belum ada Donasi!</h4>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <BottomNavbar></BottomNavbar>
            </div>
        )
    }
}
