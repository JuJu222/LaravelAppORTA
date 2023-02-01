import React, {useState} from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import RecipientCardAdmin from "@/Components/RecipientCardAdmin";
import {Link} from "@inertiajs/inertia-react";
import Select from "react-select";

export default function AdminsCreate(props) {
    const [values, setValues] = useState({
        need_category_id: props.need.need_category_id,
        recipient_id: props.need.recipient_id,
        amount: props.need.amount,
        due_date: props.need.due_date,
        delivered_date: props.need.delivered_date ? props.need.delivered_date : '',
        delivered_message: props.need.delivered_message ? props.need.delivered_message : '',
    })
    let recipientOptions = [];
    let needCategoryOptions = [];

    for (const recipient of props.recipients) {
        recipientOptions.push({value: recipient.id, label: recipient.name})
    }
    for (const needCategory of props.needCategories) {
        needCategoryOptions.push({value: needCategory.id, label: needCategory.category})
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

    function handleSelectRecipientChange(e) {
        setValues(values => ({
            ...values,
            ['recipient_id']: e.value,
        }))
    }

    function handleSelectNeedCategoryChange(e) {
        setValues(values => ({
            ...values,
            ['need_category_id']: e.value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route('needs.store'), values)
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
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Nama Anak *</label>
                        <Select options={recipientOptions} className='text-sm' name='name' onChange={handleSelectRecipientChange} required={true}
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
                                    for (const [i, recipient] of props.recipients.entries()) {
                                        if (recipient.id === props.need.recipient_id) {
                                            return recipientOptions[i]
                                        }
                                    }
                                }}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Kategori Kebutuhan *</label>
                        <Select options={needCategoryOptions} className='text-sm' name='name' onChange={handleSelectNeedCategoryChange} required={true}
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
                                for (const [i, needCategory] of props.needCategories.entries()) {
                                    if (needCategory.id === props.need.need_category_id) {
                                        return needCategoryOptions[i]
                                    }
                                }
                            }}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 ">Jumlah Dana *</label>
                        <input type="number" id="amount" name="amount" onChange={handleChange} required={true} defaultValue={props.need.amount}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="due_date" className="block mb-2 text-sm font-medium text-gray-900 ">Batas Waktu *</label>
                        <input type="date" id="due_date" name="due_date" onChange={handleChange} required={true} defaultValue={props.need.due_date}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="delivered_date" className="block mb-2 text-sm font-medium text-gray-900 ">Tanggal Penerimaan Dana</label>
                        <input type="date" id="delivered_date" name="delivered_date" onChange={handleChange} defaultValue={props.need.delivered_date}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="delivered_message"
                               className="block mb-2 text-sm font-medium text-gray-900 ">Ucapan Terima Kasih</label>
                        <textarea name="delivered_message" onChange={handleChange} defaultValue={props.need.delivered_message} className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400'
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="delivered_photo" className="block mb-2 text-sm font-medium text-gray-900 ">Foto Bukti Penerimaan Dana</label>
                        {values.delivered_photo ? (
                            <img className='p-2 w-full h-40 object-contain border border-gray-300 rounded-lg mb-2' src={URL.createObjectURL(values.delivered_photo)} />
                        ) : (
                            props.need.delivered_photo && (
                                <img className='p-2 w-full h-40 object-contain border border-gray-300 rounded-lg mb-2'
                                     src={'/img/recipients/delivered_photo/' + props.need.delivered_photo}/>
                            )
                        )}
                        <input type="file" id="delivered_photo" name="delivered_photo" onChange={handleChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
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