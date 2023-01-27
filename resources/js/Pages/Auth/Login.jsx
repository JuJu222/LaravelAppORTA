import React, { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div>
                <img src="/img/login_element1.png" alt="" className='w-80 mx-auto'/>
                <h1 className='text-3xl font-bold text-red mt-6'>Masuk</h1>
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600 mt-6">{status}</div>}

            <form onSubmit={submit} className='mt-6'>
                <div>
                    <InputLabel forInput="username" value="Username" />

                    <TextInput
                        type="text"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="password" value="Password" />

                    <TextInput
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />

                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {/*{canResetPassword && (*/}
                    {/*    <Link*/}
                    {/*        href={route('password.request')}*/}
                    {/*        className="underline text-sm text-gray-600 hover:text-gray-900"*/}
                    {/*    >*/}
                    {/*        Forgot your password?*/}
                    {/*    </Link>*/}
                    {/*)}*/}
                    <Link
                        href={route('register')}
                        className="underline text-sm text-gray-600 hover:text-gray-900"
                    >
                        Belum mempunyai akun? Daftar di sini!
                    </Link>

                    <PrimaryButton className="ml-4" processing={processing}>
                        Masuk
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
