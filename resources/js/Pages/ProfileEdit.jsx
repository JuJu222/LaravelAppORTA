import React, {useState} from 'react';
import {Link} from '@inertiajs/inertia-react';
import BottomNavbar from "@/Components/BottomNavbar";
import ApplicationLogo from "@/Components/ApplicationLogo";
import {Inertia} from "@inertiajs/inertia";

export default function Profile(props) {
    if (props.admin) {
        const [values, setValues] = useState({
            username: props.admin.user.username,
            password: '',
            name: props.admin.name,
            email: props.admin.email,
            phone: props.admin.phone,
            jabatan: props.admin.jabatan,
            note: props.admin.note ? props.admin.note : '',
        });
        let initials = props.admin.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()

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
            Inertia.post(route('profile.update'), values)
        }

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
                        <form onSubmit={handleSubmit} className='mt-6'>
                            <div className="mb-6">
                                <label htmlFor="username"
                                       className="block mb-2 text-sm font-medium text-gray-900 ">Username *</label>
                                <input type="text" id="username" name="username" onChange={handleChange} defaultValue={props.admin.user.username} required={true}
                                       className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 ">Password (kosongkan bila tidak ingin mengubah password lama)</label>
                                <input type="text" id="password" name="password" onChange={handleChange}
                                       className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Nama *</label>
                                <input type="text" id="name" name="name" onChange={handleChange} defaultValue={props.admin.name} required={true}
                                       className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email *</label>
                                <input type="email" id="email" name="email" onChange={handleChange} defaultValue={props.admin.email} required={true}
                                       className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Nomor Telepon *</label>
                                <input type="text" id="phone" name="phone" onChange={handleChange} defaultValue={props.admin.phone} required={true}
                                       className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="jabatan"
                                       className="block mb-2 text-sm font-medium text-gray-900 ">Jabatan *</label>
                                <input type="text" id="jabatan" name="jabatan" onChange={handleChange} defaultValue={props.admin.jabatan} required={true}
                                       className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="jabatan"
                                       className="block mb-2 text-sm font-medium text-gray-900 ">Catatan</label>
                                <textarea name="note" onChange={handleChange} defaultValue={props.admin.note} className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400'
                                />
                            </div>
                            <button type="submit"
                                    className="text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-3 text-center">Submit
                            </button>
                        </form>
                    </div>
                </div>
                <BottomNavbar auth={props.auth}></BottomNavbar>
            </div>
        );
    } else if (props.donor) {
        const [values, setValues] = useState({
            username: props.donor.user.username,
            password: '',
            name: props.donor.name,
            name_alias: props.donor.name_alias ? props.donor.name_alias : '',
            phone: props.donor.phone,
            email: props.donor.email,
            address: props.donor.address,
            city: props.donor.city,
            note: props.donor.note ? props.donor.note : '',
        });
        let initials = props.donor.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()

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
            Inertia.post(route('profile.update'), values)
        }

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
                        <form onSubmit={handleSubmit} className='mt-6'>
                            <div className="mb-6">
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Username *</label>
                                <input type="text" id="username" name="username" onChange={handleChange} defaultValue={props.donor.user.username}
                                       className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                       required={true} />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password (kosongkan bila tidak ingin mengubah password lama)</label>
                                <input type="text" id="password" name="password" onChange={handleChange}
                                       className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Nama *</label>
                                <input type="text" id="name" name="name" onChange={handleChange} defaultValue={props.donor.name}
                                       className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                       required={true} />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="name_alias" className="block mb-2 text-sm font-medium text-gray-900 ">Nama Alias</label>
                                <input type="text" id="name_alias" name="name_alias" onChange={handleChange} defaultValue={props.donor.name_alias}
                                       className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Nomor Telepon *</label>
                                <input type="text" id="phone" name="phone" onChange={handleChange} defaultValue={props.donor.phone}
                                       className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                       required={true} />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email *</label>
                                <input type="email" id="email" name="email" onChange={handleChange} defaultValue={props.donor.email}
                                       className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                       required={true} />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 ">Alamat *</label>
                                <input type="text" id="address" name="address" onChange={handleChange} defaultValue={props.donor.address}
                                       className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                       required={true} />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 ">Kota *</label>
                                <input type="text" id="city" name="city" onChange={handleChange} defaultValue={props.donor.city}
                                       className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                       required={true} />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="ktp" className="block mb-2 text-sm font-medium text-gray-900 ">Foto KTP *</label>
                                {values.ktp ? (
                                    <img className='p-2 w-full h-40 object-contain border border-gray-300 rounded-lg mb-2'
                                         src={URL.createObjectURL(values.ktp)}/>
                                ) : (
                                    props.donor.ktp && (
                                        <img className='p-2 w-full h-40 object-contain border border-gray-300 rounded-lg mb-2'
                                             src={'/img/donors/ktp/' + props.donor.ktp}/>
                                    )
                                )}
                                <input type="file" id="ktp" name="ktp" onChange={handleChange}
                                       className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900 ">Foto Profil</label>
                                {values.photo ? (
                                    <img className='p-2 w-full h-40 object-contain border border-gray-300 rounded-lg mb-2'
                                         src={URL.createObjectURL(values.photo)}/>
                                ) : (
                                    props.donor.photo && (
                                        <img className='p-2 w-full h-40 object-contain border border-gray-300 rounded-lg mb-2'
                                             src={'/img/donors/photo/' + props.donor.photo}/>
                                    )
                                )}
                                <input type="file" id="photo" name="photo" onChange={handleChange}
                                       className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="note"
                                       className="block mb-2 text-sm font-medium text-gray-900 ">Catatan</label>
                                <textarea name="note" onChange={handleChange} defaultValue={props.donor.note} className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400'
                                />
                            </div>
                            <button type="submit"
                                    className="text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-3 text-center">Submit
                            </button>
                        </form>
                    </div>
                </div>
                <BottomNavbar auth={props.auth}></BottomNavbar>
            </div>
        );
    } else {
        const [values, setValues] = useState({
            username: props.recipient.user.username,
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
            note: props.recipient.note ? props.recipient.note : '',
            is_active: props.recipient.is_active,
        });
        let initials = props.recipient.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()
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
            Inertia.post(route('profile.update'), values)
        }

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
                        <form onSubmit={handleSubmit} className='mt-6'>
                            <div className="mb-6">
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Username
                                    *</label>
                                <input type="text" id="username" name="username" onChange={handleChange}
                                       defaultValue={props.recipient.user.username}
                                       className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                       required={true}/>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password (kosongkan bila tidak ingin mengubah password lama)</label>
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
                            <button type="submit"
                                    className="text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-3 text-center">Submit
                            </button>
                        </form>
                    </div>
                </div>
                <BottomNavbar auth={props.auth}></BottomNavbar>
            </div>
        );
    }
}
