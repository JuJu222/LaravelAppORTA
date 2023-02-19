import React, {useState} from 'react';
import {Link} from '@inertiajs/inertia-react';
import BottomNavbar from "@/Components/BottomNavbar";
import ApplicationLogo from "@/Components/ApplicationLogo";
import {Inertia} from "@inertiajs/inertia";

export default function Profile(props) {
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
                            {/*<div className="mb-6">*/}
                            {/*    <label htmlFor="transfer_receipt"*/}
                            {/*           className="block mb-2 text-sm font-medium text-gray-900 ">Foto Bukti Transfer *</label>*/}
                            {/*    {values.transfer_receipt &&  <img className='p-2 w-full h-40 object-contain border border-gray-300 rounded-lg mb-2' src={URL.createObjectURL(values.transfer_receipt)} /> }*/}
                            {/*    <input type="file" id="transfer_receipt" name="transfer_receipt" onChange={handleChange}*/}
                            {/*           className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"*/}
                            {/*           required={true} />*/}
                            {/*</div>*/}
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
        const [values, setValues] = useState({});
        let initials = props.donor.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()

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
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>KTP</h5>
                                <img className='w-full h-40 object-contain'
                                     src={'/img/donors/ktp/' + props.donor.ktp}/>
                            </div>
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
                        <Link href={route('profile.edit')} method="post" as="button"
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
        const [values, setValues] = useState({});
        let initials = props.recipient.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()

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
                                <p className='text-center text-sm'>{props.recipient.nik ? props.recipient.nik : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Tempat Lahir</h5>
                                <p className='text-center text-sm'>{props.recipient.nik ? props.recipient.nik : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Tanggal Lahir</h5>
                                <p className='text-center text-sm'>{props.recipient.nik ? props.recipient.nik : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Alamat</h5>
                                <p className='text-center text-sm'>{props.recipient.nik ? props.recipient.nik : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Kota</h5>
                                <p className='text-center text-sm'>{props.recipient.nik ? props.recipient.nik : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Nomor Telepon</h5>
                                <p className='text-center text-sm'>{props.recipient.nik ? props.recipient.nik : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Akta Kelahiran</h5>
                                <p className='text-center text-sm'>{props.recipient.nik ? props.recipient.nik : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Kartu Keluarga</h5>
                                <p className='text-center text-sm'>{props.recipient.nik ? props.recipient.nik : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Catatan</h5>
                                <p className='text-center text-sm'>{props.recipient.nik ? props.recipient.nik : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Nomor Telepon</h5>
                                <p className='text-center text-sm'>{props.recipient.nik ? props.recipient.nik : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Nomor Telepon</h5>
                                <p className='text-center text-sm'>{props.recipient.nik ? props.recipient.nik : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Nomor Telepon</h5>
                                <p className='text-center text-sm'>{props.recipient.nik ? props.recipient.nik : '-'}</p>
                            </div>
                            <div className='py-5'>
                                <h5 className='font-bold text-xs'>Nomor Telepon</h5>
                                <p className='text-center text-sm'>{props.recipient.nik ? props.recipient.nik : '-'}</p>
                            </div>
                        </div>
                        <Link href={route('profile.edit')} method="post" as="button"
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
