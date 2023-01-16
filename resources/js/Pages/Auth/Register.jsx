import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        password_confirmation: '',
        name: '',
        name_alias: '',
        ktp: null,
        phone: '',
        email: '',
        address: '',
        city: '',
        note: '',
        photo: null,
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div className="grid gap-x-6 md:grid-cols-2">
                    <div className="mt-4">
                        <InputLabel forInput="username" value="Username" />

                        <TextInput
                            type="text"
                            name="username"
                            value={data.username}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            handleChange={onHandleChange}
                            required
                        />

                        <InputError message={errors.username} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel forInput="password" value="Password" />

                        <TextInput
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            handleChange={onHandleChange}
                            required
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel forInput="password_confirmation" value="Confirm Password" />

                        <TextInput
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />

                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel forInput="name" value="Nama" />

                        <TextInput
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel forInput="name_alias" value="Nama Alias" />

                        <TextInput
                            type="text"
                            name="name_alias"
                            value={data.name_alias}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel forInput="phone" value="Nomor Telepon" />

                        <TextInput
                            type="tel"
                            name="phone"
                            value={data.phone}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel forInput="name_alias" value="Email" />

                        <TextInput
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel forInput="city" value="Kota" />

                        <TextInput
                            type="text"
                            name="city"
                            value={data.city}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <InputLabel forInput="address" value="Alamat" />

                    <TextInput
                        type="text"
                        name="address"
                        value={data.address}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="ktp" value="Foto KTP" />

                    <TextInput
                        type="file"
                        name="ktp"
                        value={data.ktp}
                        className="mt-1 block w-full px-4 py-4"
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="photo" value="Foto Profil" />

                    <TextInput
                        type="file"
                        name="photo"
                        value={data.photo}
                        className="mt-1 block w-full px-4 py-4"
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="note" value="Catatan" />

                    <textarea name="note" className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400'>
                        </textarea>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
                        Already registered?
                    </Link>

                    <PrimaryButton className="ml-4" processing={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
