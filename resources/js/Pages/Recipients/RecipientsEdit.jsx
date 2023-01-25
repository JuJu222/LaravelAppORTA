import React, {useState} from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import RecipientCardAdmin from "@/Components/RecipientCardAdmin";
import {Link} from "@inertiajs/inertia-react";

export default function DisabilitiesCreate(props) {
    const [values, setValues] = useState({
        username: props.user.username,
        password: '',
        name: props.recipient.name,
        nik: props.recipient.nik,
        gender: props.recipient.gender,
        birthplace: props.recipient.birthplace,
        birthdate: props.recipient.birthdate,
        school: props.recipient.school,
        class: props.recipient.class,
        siblings: props.recipient.siblings,
        child_no: props.recipient.child_no,
        address: props.recipient.address,
        city: props.recipient.city,
        phone: props.recipient.phone,
        note: props.recipient.note,
        is_active: props.recipient.is_active,
    })
    let secondaryExists = false;

    for (const photo of props.recipient.photos) {
        if (photo.type.type === 'secondary') {
            secondaryExists = true;
        }
    }

    function handleChange(e) {
        const key = e.target.name;

        if (e.target.type === 'file') {
            if (e.target.files.length === 1) {
                const file = e.target.files[0]

                setValues(values => ({
                    ...values,
                    [key]: file
                }))
            } else {
                const file = e.target.files

                setValues(values => ({
                    ...values,
                    [key]: file
                }))
            }
        } else {
            const value = e.target.value
            setValues(values => ({
                ...values,
                [key]: value,
            }))
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route('recipients.update', props.recipient.id), values)
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Ubah Anak</h2>}
        >
            <form onSubmit={handleSubmit}>
                <h2 className='font-semibold text-lg mb-2'>Data Anak</h2>
                <div className="grid gap-x-6 md:grid-cols-2">
                    <div className="mb-6">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Username
                            *</label>
                        <input type="text" id="username" name="username" onChange={handleChange}
                               defaultValue={props.user.username}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               required={true}/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <input type="text" id="password" name="password" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Nama *</label>
                        <input type="text" id="name" name="name" onChange={handleChange}
                               defaultValue={props.recipient.name}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               required={true}/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="nik" className="block mb-2 text-sm font-medium text-gray-900 ">NIK *</label>
                        <input type="text" id="nik" name="nik" onChange={handleChange}
                               defaultValue={props.recipient.nik}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               required={true}/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 ">Gender
                            *</label>
                        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-300 sm:flex">
                            <li className="w-full border-b border-gray-300 sm:border-b-0 sm:border-r">
                                <div className="flex items-center pl-3">
                                    <input id="gender_laki_laki" type="radio" value="laki-laki" name="gender"
                                           onChange={handleChange} checked={props.recipient.gender === 'laki-laki'}
                                           required={true}
                                           className="w-4 h-4 text-red bg-gray-100 border-gray-300 focus:ring-red focus:ring-2"/>
                                    <label htmlFor="gender_laki_laki"
                                           className="py-2.5 ml-2 w-full text-sm font-medium text-gray-900">Laki-Laki</label>
                                </div>
                            </li>
                            <li className="w-full">
                                <div className="flex items-center pl-3">
                                    <input id="gender_perempuan" type="radio" value="perempuan" name="gender"
                                           onChange={handleChange} checked={props.recipient.gender === 'perempuan'}
                                           required={true}
                                           className="w-4 h-4 text-red bg-gray-100 border-gray-300 focus:ring-red focus:ring-2"/>
                                    <label htmlFor="gender_perempuan"
                                           className="py-2.5 ml-2 w-full text-sm font-medium text-gray-900">Perempuan</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="birthplace" className="block mb-2 text-sm font-medium text-gray-900 ">Tempat
                            Lahir *</label>
                        <input type="text" id="birthplace" name="birthplace" onChange={handleChange}
                               defaultValue={props.recipient.birthplace}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               required={true}/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900 ">Tanggal
                            Lahir *</label>
                        <input type="date" id="birthdate" name="birthdate" onChange={handleChange}
                               defaultValue={props.recipient.birthdate}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               required={true}/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="school" className="block mb-2 text-sm font-medium text-gray-900 ">Nama Sekolah
                            *</label>
                        <input type="text" id="school" name="school" onChange={handleChange}
                               defaultValue={props.recipient.school}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               required={true}/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="class" className="block mb-2 text-sm font-medium text-gray-900 ">Kelas *</label>
                        <input type="text" id="class" name="class" onChange={handleChange}
                               defaultValue={props.recipient.class}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               required={true}/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="siblings" className="block mb-2 text-sm font-medium text-gray-900 ">Jumlah
                            Saudara *</label>
                        <input type="text" id="siblings" name="siblings" onChange={handleChange}
                               defaultValue={props.recipient.siblings}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               required={true}/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="child_no" className="block mb-2 text-sm font-medium text-gray-900 ">Anak ke-
                            *</label>
                        <input type="text" id="child_no" name="child_no" onChange={handleChange}
                               defaultValue={props.recipient.child_no}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               required={true}/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 ">Alamat
                            *</label>
                        <input type="text" id="address" name="address" onChange={handleChange}
                               defaultValue={props.recipient.address}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               required={true}/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 ">Kota *</label>
                        <input type="text" id="city" name="city" onChange={handleChange}
                               defaultValue={props.recipient.city}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               required={true}/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Nomor Telepon
                            *</label>
                        <input type="text" id="phone" name="phone" onChange={handleChange}
                               defaultValue={props.recipient.phone}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               required={true}/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="birth_certificate" className="block mb-2 text-sm font-medium text-gray-900">Akta
                            Kelahiran *</label>
                        {values.birth_certificate ? (
                            <img className='p-2 w-full h-40 object-contain border border-gray-300 rounded-lg mb-2'
                                 src={URL.createObjectURL(values.birth_certificate)}/>
                        ) : (
                            props.recipient.birth_certificate && (
                                <img className='p-2 w-full h-40 object-contain border border-gray-300 rounded-lg mb-2'
                                     src={'/img/recipients/birth_certificate/' + props.recipient.birth_certificate}/>
                            )
                        )}
                        <input type="file" id="birth_certificate" name="birth_certificate" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="kartu_keluarga" className="block mb-2 text-sm font-medium text-gray-900 ">Kartu
                            Keluarga *</label>
                        {values.kartu_keluarga ? (
                            <img className='p-2 w-full h-40 object-contain border border-gray-300 rounded-lg mb-2'
                                 src={URL.createObjectURL(values.kartu_keluarga)}/>
                        ) : (
                            props.recipient.kartu_keluarga && (
                                <img className='p-2 w-full h-40 object-contain border border-gray-300 rounded-lg mb-2'
                                     src={'/img/recipients/kartu_keluarga/' + props.recipient.kartu_keluarga}/>
                            )
                        )}
                        <input type="file" id="kartu_keluarga" name="kartu_keluarga" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-900 ">Note</label>
                        <input type="text" id="note" name="note" onChange={handleChange}
                               defaultValue={props.recipient.note}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="is_active" className="block mb-2 text-sm font-medium text-gray-900 ">Status
                            *</label>
                        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-300 sm:flex">
                            <li className="w-full border-b border-gray-300 sm:border-b-0 sm:border-r">
                                <div className="flex items-center pl-3">
                                    <input id="is_active_aktif" type="radio" value="1" name="is_active"
                                           onChange={handleChange} checked={props.recipient.is_active === 1}
                                           required={true}
                                           className="w-4 h-4 text-red bg-gray-100 border-gray-300 focus:ring-red focus:ring-2"/>
                                    <label htmlFor="is_active_aktif"
                                           className="py-2.5 ml-2 w-full text-sm font-medium text-gray-900">Aktif</label>
                                </div>
                            </li>
                            <li className="w-full">
                                <div className="flex items-center pl-3">
                                    <input id="is_active_tidak_aktif" type="radio" value="0" name="is_active"
                                           onChange={handleChange} checked={props.recipient.is_active === 0}
                                           required={true}
                                           className="w-4 h-4 text-red bg-gray-100 border-gray-300 focus:ring-red focus:ring-2"/>
                                    <label htmlFor="is_active_tidak_aktif"
                                           className="py-2.5 ml-2 w-full text-sm font-medium text-gray-900">Tidak
                                        Aktif</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="primary_photo" className="block mb-2 text-sm font-medium text-gray-900 ">Foto
                            Utama *</label>
                        {values.primary_photo ? (
                            <img className='p-2 w-full h-40 object-contain border border-gray-300 rounded-lg mb-2'
                                 src={URL.createObjectURL(values.primary_photo)}/>
                        ) : (
                            props.recipient.photos.map((photo, i) => {
                                if (photo.type.type === 'primary') {
                                    return (
                                        <img
                                            className='p-2 w-full h-40 object-contain border border-gray-300 rounded-lg mb-2'
                                            src={'/img/recipients/photos/' + photo.photo_url}/>
                                    )
                                }
                            })
                        )}
                        <input type="file" id="primary_photo" name="primary_photo" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="photos" className="block mb-2 text-sm font-medium text-gray-900 ">Foto
                            Pendamping</label>
                        {values.photos ? (
                            <div className='p-2 w-full h-40 border border-gray-300 rounded-lg mb-2 flex'>
                                {values.photos.length === undefined ? (
                                    <img className='object-contain w-full h-full'
                                         src={URL.createObjectURL(values.photos)}/>
                                ) : (
                                    Array.from(values.photos).map(img =>
                                        <img className='object-contain w-full h-full' src={URL.createObjectURL(img)}/>
                                    )
                                )}
                            </div>
                        ) : (
                            secondaryExists && (
                                <div className='p-2 w-full h-40 border border-gray-300 rounded-lg mb-2 flex'>
                                    {props.recipient.photos.map((photo, i) => {
                                        if (photo.type.type === 'secondary') {
                                            return (
                                                <img className='object-contain w-full h-full'
                                                     src={'/img/recipients/photos/' + photo.photo_url}/>
                                            )
                                        }
                                    })}
                                </div>
                            )
                        )}
                        <input type="file" id="photos" name="photos" onChange={handleChange} multiple
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               required={false}/>
                    </div>
                </div>
                <button type="submit"
                        className="text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-3 text-center">Submit
                </button>
            </form>
        </Authenticated>
    );
}
