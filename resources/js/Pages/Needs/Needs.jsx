import React, {useState} from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from "@inertiajs/inertia-react";
import Select from "react-select";
import DeleteConrifmation from "@/Components/DeleteConrifmation";

export default function NeedCategories(props) {
    const [filteredItems, setFilteredItems] = useState(props.needs);
    const [showModal,setShowModal] = useState(false)
    const [modalData,setModalData] = useState({})
    const formatter = new Intl.NumberFormat('de-DE');
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    const [filter, setFilter] = useState({recipient: '', need: '', status: ''})
    const [sort, setSort] = useState({amount: null, collected: null})

    React.useEffect(() => {
        setFilteredItems(props.needs);
    }, [props.needs])

    React.useEffect(() => {
        const results = props.needs.filter(item => {
            return item.recipient.name.toLowerCase().includes(filter.recipient.toLowerCase())
                && item.need_category.category.toLowerCase().includes(filter.need.toLowerCase())
                && (item.delivered_date ? 'true' : 'false').includes(filter.status.toString().toLowerCase());
        })
        setFilteredItems(results);
    }, [filter])

    React.useEffect(() => {
        if (sort.amount === true) {
            const results = [...filteredItems].sort(function(a, b) { return b.amount - a.amount })
            setSort(sort => ({...sort, collected: null}))
            setFilteredItems(results);
        } else if (sort.amount === false) {
            const results = [...filteredItems].sort(function(a, b) { return a.amount - b.amount })
            setSort(sort => ({...sort, collected: null}))
            setFilteredItems(results);
        }
    }, [sort.amount])

    React.useEffect(() => {
        if (sort.collected === true) {
            const results = [...filteredItems].sort(function(a, b) { return b.collected - a.collected })
            setSort(sort => ({...sort, amount: null}))
            setFilteredItems(results);
        } else if (sort.collected === false) {
            const results = [...filteredItems].sort(function(a, b) { return a.collected - b.collected })
            setSort(sort => ({...sort, amount: null}))
            setFilteredItems(results);
        }
    }, [sort.collected])

    function handleCreate() {
        Inertia.get(route("needs.create"));
    }

    function handleDelete(id) {
        Inertia.delete(route("needs.destroy", id));
        setShowModal(false);
    }

    function confirmDelete(id, message) {
        setModalData({id: id, message: message});
        setShowModal(true);
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kebutuhan Anak</h2>}
        >
            <div className="w-full sm:px-6 xl:px-0">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="flex items-center justify-between">
                        <div className='flex items-center justify-between w-full gap-2'>
                            <input type="text" onChange={(e) => setFilter(filter => ({...filter, recipient: e.target.value}))}
                                   className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                   placeholder="Cari nama anak"/>
                            <input type="text" onChange={(e) => setFilter(filter => ({...filter, need: e.target.value}))}
                                   className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                   placeholder="Cari kebutuhan anak"/>
                            <Select options={[{value: true, label: 'Sudah Dikonfirmasi'}, {value: false, label: 'Belum Dikonfirmasi'}]} isClearable={true}
                                    className='text-sm w-full' name='name' required={true} placeholder='Cari status penerimaan dana' onChange={(e) => setFilter(filter => ({...filter, status: e ? e.value : ''}))}
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
                            />
                        </div>
                        <Link href={route("needs.create")}>
                            <button
                                className="inline-flex ml-4 sm:mt-0 items-start justify-start px-5 py-2.5 bg-red hover:bg-red_hover transition focus:outline-none rounded">
                                <p className="text-xl font-medium leading-none text-white">+</p>
                            </button>
                        </Link>
                    </div>
                    <div className='mt-2 w-full'>
                        <Link href={route('need_categories.index')}
                              className="flex items-center justify-center text-center w-full">
                            <button
                                className="w-full h-full text-sm leading-none font-bold text-white py-3 px-5 bg-red rounded hover:bg-red_hover focus:outline-none transition flex justify-center items-center">
                                Atur Kategori Kebutuhan
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="h-16 w-full text-sm leading-none text-gray-800">
                            <th className="font-bold text-left pl-4">No.</th>
                            <th className="font-bold text-left pl-12">Nama Anak</th>
                            <th className="font-bold text-left pl-12">Kebutuhan</th>
                            <th className="font-bold text-left pl-12 cursor-pointer" onClick={(e) => setSort(sort => ({...sort, amount: !sort.amount}))}>
                                <div className='flex gap-0.5'>
                                    <span>Target Donasi</span>
                                    <span>
                                    {sort.amount != null ? (
                                        sort.amount === true ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                            </svg>
                                        )) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-caret-down" viewBox="0 0 16 16">
                                            <path
                                                d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
                                        </svg>
                                    )}
                                </span>
                                </div>
                            </th>
                            <th className="font-bold text-left pl-12 cursor-pointer" onClick={(e) => setSort(sort => ({...sort, collected: !sort.collected}))}>
                                <div className='flex gap-0.5'>
                                    <span>Donasi Terkumpul</span>
                                    <span>
                                    {sort.collected != null ? (
                                        sort.collected === true ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                            </svg>
                                        )) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-caret-down" viewBox="0 0 16 16">
                                            <path
                                                d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
                                        </svg>
                                    )}
                                </span>
                                </div>
                            </th>
                            <th className="font-bold text-left pl-12">Batas Waktu</th>
                            <th className="font-bold text-left pl-12">Status Penerimaan Dana</th>
                        </tr>
                        </thead>
                        <tbody className="w-full">
                        {filteredItems.map((need, i) =>
                            <tr className="h-20 text-sm leading-none text-gray-800 bg-white border-b border-t border-gray-100">
                                <td className="pl-4">
                                    <p className="text-sm font-medium leading-none text-gray-800">{i + 1}</p>
                                </td>
                                <td className="pl-12">
                                    <div className="flex items-center">
                                        <div>
                                            <p className="font-medium">{need.recipient.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-12">
                                    <div className="flex items-center">
                                        <div>
                                            <p className="font-medium">{need.need_category.category}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-12">
                                    <div className="flex items-center">
                                        <div>
                                            <p className="font-medium">{'Rp' + formatter.format(need.amount)}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-12">
                                    <div className="flex items-center">
                                        <div>
                                            <p className="font-medium">{'Rp' + formatter.format(need.collected)}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-12">
                                    <div className="flex items-center">
                                        <div>
                                            <p className="font-medium">{new Date(need.due_date).toLocaleDateString("id-ID", options)}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-12">
                                    <div className="flex items-center">
                                        <div>
                                            {need.delivered_date ? (
                                                <p className="bg-green-600 text-white px-4 py-2 rounded-lg text-center text-xs whitespace-nowrap">Sudah Dikonfirmasi</p>
                                            ) : (
                                                <p className="bg-red_dark text-white px-4 py-2 rounded-lg text-center text-xs whitespace-nowrap">Belum Dikonfirmasi</p>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-12 pr-4">
                                    <div className='flex gap-2 justify-end'>
                                        <Link href={route("needs.show", need.id)} className="flex items-center justify-center text-center">
                                            <button
                                                className="text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-50 focus:outline-none transition">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                    <path
                                                        d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                                </svg>
                                            </button>
                                        </Link>
                                        <Link href={route("needs.edit", need.id)}
                                              className="flex items-center justify-center text-center">
                                            <button
                                                className="text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-50 focus:outline-none transition">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-pencil-fill"
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                </svg>
                                            </button>
                                        </Link>
                                        <div className="flex items-center justify-center text-center">
                                            <button onClick={(e) => confirmDelete(need.id, need.recipient.name + ' - ' + need.need_category.category)}
                                                    className="text-sm leading-none text-white py-3 px-5 bg-red rounded transition hover:bg-red_hover focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-trash3-fill"
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            <DeleteConrifmation showModal={showModal} setShowModal={setShowModal} modalData={modalData} handleDelete={handleDelete}></DeleteConrifmation>
        </Authenticated>
    );
}
