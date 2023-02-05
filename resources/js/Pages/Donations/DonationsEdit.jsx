import React, {useState} from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from "@inertiajs/inertia-react";
import Select from "react-select";

export default function DonationsEdit(props) {
    const [values, setValues] = useState({
        donor_id: props.donation.donor_id,
        need_id: props.donation.need_id,
        amount: props.donation.amount,
        bank_account: props.donation.bank_account,
        transfer_date: props.donation.transfer_date,
        accepted_date: props.donation.accepted_date ? props.donation.accepted_date : '',
        accepted_by_admin_id: props.donation.accepted_by_admin_id ? props.donation.accepted_by_admin_id : '',
    })
    let donorOptions = [];
    let needOptions = [];
    let adminOptions = [];

    for (const donor of props.donors) {
        donorOptions.push({value: donor.id, label: donor.name})
    }
    for (const need of props.needs) {
        needOptions.push({value: need.id, label: need.recipient.name + ' - ' + need.need_category.category})
    }
    for (const admin of props.admins) {
        adminOptions.push({value: admin.id, label: admin.name})
    }

    function handleChange(e) {
        const key = e.target.name;

        if (e.target.type === 'file') {
            const file = e.target.files[0]
            setValues(values => ({
                ...values,
                [key]: file
            }))
        } else {
            const value = e.target.value
            setValues(values => ({
                ...values,
                [key]: value,
            }))
        }
    }

    function handleSelectDonorChange(e) {
        setValues(values => ({
            ...values,
            ['donor_id']: e.value,
        }))
    }

    function handleSelectNeedChange(e) {
        setValues(values => ({
            ...values,
            ['need_id']: e.value,
        }))
    }

    function handleSelectAdminChange(e) {
        setValues(values => ({
            ...values,
            ['accepted_by_admin_id']: e.value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route('donations.update', props.donation.id), values)
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Kebutuhan Anak</h2>}
        >
            <form onSubmit={handleSubmit}>
                <div className="grid gap-x-6 md:grid-cols-2">
                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Nama Donor *</label>
                        <Select options={donorOptions} className='text-sm' name='name' onChange={handleSelectDonorChange} required={true}
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderRadius: 8,
                                        paddingTop: 2,
                                        paddingBottom: 2
                                    }),
                                }}
                                theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 5,
                                    colors: {
                                        ...theme.colors,
                                        primary25: '#efefef',
                                        primary: 'red',
                                    },
                                })}
                                defaultValue={() => {
                                    for (const [i, donor] of props.donors.entries()) {
                                        if (donor.id === props.donation.donor_id) {
                                            return donorOptions[i]
                                        }
                                    }
                                }}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="need" className="block mb-2 text-sm font-medium text-gray-900 ">Kebutuhan *</label>
                        <Select options={needOptions} className='text-sm' name='need' onChange={handleSelectNeedChange} required={true}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: 8,
                                    paddingTop: 2,
                                    paddingBottom: 2
                                }),
                            }}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 5,
                                colors: {
                                    ...theme.colors,
                                    primary25: '#efefef',
                                    primary: 'red',
                                },
                            })}
                            defaultValue={() => {
                                for (const [i, need] of props.needs.entries()) {
                                    if (need.id === props.donation.need_id) {
                                        return needOptions[i]
                                    }
                                }
                            }}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="bank_account" className="block mb-2 text-sm font-medium text-gray-900 ">Nama Pemilik Rekening *</label>
                        <input type="text" id="bank_account" name="bank_account" onChange={handleChange} required={true} defaultValue={props.donation.bank_account}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 ">Jumlah Donasi *</label>
                        <input type="number" id="amount" name="amount" onChange={handleChange} required={true} defaultValue={props.donation.amount}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="transfer_date" className="block mb-2 text-sm font-medium text-gray-900 ">Tanggal Transfer *</label>
                        <input type="date" id="transfer_date" name="transfer_date" onChange={handleChange} required={true} defaultValue={props.donation.transfer_date}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="transfer_receipt" className="block mb-2 text-sm font-medium text-gray-900 ">Foto Bukti Transfer *</label>
                        {values.transfer_receipt ? (
                            <img className='p-2 w-full h-40 object-contain border border-gray-300 rounded-lg mb-2'
                                 src={URL.createObjectURL(values.transfer_receipt)}/>
                        ) : (
                            props.donation.transfer_receipt && (
                                <img className='p-2 w-full h-40 object-contain border border-gray-300 rounded-lg mb-2'
                                     src={'/img/donations/transfer_receipt/' + props.donation.transfer_receipt}/>
                            )
                        )}
                        <input type="file" id="transfer_receipt" name="transfer_receipt" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="accepted_date" className="block mb-2 text-sm font-medium text-gray-900 ">Tanggal Konfirmasi</label>
                        <input type="date" id="accepted_date" name="accepted_date" onChange={handleChange} defaultValue={props.donation.accepted_date}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="accepted_by_admin" className="block mb-2 text-sm font-medium text-gray-900 ">Dikonfirmasi Oleh</label>
                        <Select options={adminOptions} className='text-sm' name='accepted_by_admin' onChange={handleSelectAdminChange}
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderRadius: 8,
                                        paddingTop: 2,
                                        paddingBottom: 2
                                    }),
                                }}
                                theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 5,
                                    colors: {
                                        ...theme.colors,
                                        primary25: '#efefef',
                                        primary: 'red',
                                    },
                                })}
                                defaultValue={() => {
                                    for (const [i, admin] of props.admins.entries()) {
                                        if (admin.id === props.donation.accepted_by_admin_id) {
                                            return adminOptions[i]
                                        }
                                    }
                                }}
                        />
                    </div>
                </div>
                <button type="submit"
                        className="text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-3 text-center">Submit
                </button>
            </form>
        </Authenticated>
    );
}