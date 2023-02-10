import React, {useState} from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from "@inertiajs/inertia-react";

export default function Donations(props) {
    const formatter = new Intl.NumberFormat('de-DE');
    const [filteredItems, setFilteredItems] = useState(props.donations);
    const [filter, setFilter] = useState({donor: '', recipient: '', amount: ''})
    const [sort, setSort] = useState({amount: null})

    React.useEffect(() => {
        setFilteredItems(props.donations);
    }, [props.donations])

    React.useEffect(() => {
        const results = props.donations.filter(item => {
            return item.donor.name.toLowerCase().includes(filter.donor.toLowerCase()) &&
                item.need.recipient.name.toLowerCase().includes(filter.recipient.toLowerCase()) &&
                item.amount.toString().toLowerCase().includes(filter.amount.toLowerCase());
        })
        setFilteredItems(results);
    }, [filter])

    React.useEffect(() => {
        if (sort.amount === true) {
            const results = [...filteredItems].sort(function(a, b) { return b.amount - a.amount })
            setFilteredItems(results);
        } else if (sort.amount === false) {
            const results = [...filteredItems].sort(function(a, b) { return a.amount - b.amount })
            setFilteredItems(results);
        }
    }, [sort])

    function handleAccept(id) {
        Inertia.post(route("donations.accept", id));
    }

    function handleReject(id) {
        Inertia.post(route("donations.reject", id));
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Donasi</h2>}
        >
            <div className="w-full sm:px-6 xl:px-0">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="flex items-center justify-between">
                        <div className='flex items-center justify-between w-full gap-2'>
                            <input type="text" onChange={(e) => setFilter(filter => ({...filter, recipient: e.target.value}))}
                                   className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                   placeholder="Cari nama anak"/>
                            <input type="text" onChange={(e) => setFilter(filter => ({...filter, donor: e.target.value}))}
                                   className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                   placeholder="Cari nama donor"/>
                            <input type="number" onChange={(e) => setFilter(filter => ({...filter, amount: e.target.value}))}
                                   className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                   placeholder="Cari jumlah donasi"/>
                        </div>
                        <Link href={route("donations.create")}>
                            <button
                                className="inline-flex ml-4 sm:mt-0 items-start justify-start px-5 py-2.5 bg-red hover:bg-red_hover transition focus:outline-none rounded">
                                <p className="text-xl font-medium leading-none text-white">+</p>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="h-16 w-full text-sm leading-none text-gray-800">
                            <th className="font-bold text-left pl-4">No.</th>
                            <th className="font-bold text-left pl-12">Tanggal Transfer</th>
                            <th className="font-bold text-left pl-12">Donor</th>
                            <th className="font-bold text-left pl-12">Penerima</th>
                            <th className="font-bold text-left pl-12">Kebutuhan</th>
                            <th className="font-bold text-left pl-12 cursor-pointer" onClick={(e) => setSort(sort => ({...sort, amount: !sort.amount}))}>
                                <div className='flex gap-0.5'>
                                    <span>Jumlah</span>
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
                            <th className="font-bold text-left pl-12">Tanggal Konfirmasi</th>
                        </tr>
                        </thead>
                        <tbody className="w-full">
                        {filteredItems.map((donation, i) =>
                            <tr className="h-20 text-sm leading-none text-gray-800 bg-white border-b border-t border-gray-100">
                                <td className="pl-4">
                                    <p className="text-sm font-medium leading-none text-gray-800">{i + 1}</p>
                                </td>
                                <td className="pl-12">
                                    <div className="flex items-center">
                                        <div>
                                            <p className="font-medium">{donation.transfer_date}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-12">
                                    <div className="flex items-center">
                                        <p className="font-medium">{donation.donor.name}</p>
                                    </div>
                                </td>
                                <td className="pl-12">
                                    <div className="flex items-center">
                                        <div>
                                            <p className="font-medium">{donation.need.recipient.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-12">
                                    <div className="flex items-center">
                                        <div>
                                            <p className="font-medium">{donation.need.need_category.category}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-12">
                                    <div className="flex items-center">
                                        <div>
                                            <p className="font-medium">{'Rp' + formatter.format(donation.amount)}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-12">
                                    <div className="flex items-center">
                                        <div>
                                            {donation.accepted_date ? (
                                                <p className="bg-green-600 text-white px-4 py-2 rounded-lg text-center text-xs whitespace-nowrap">{donation.accepted_date}</p>
                                            ) : (
                                                <p className="bg-red_dark text-white px-4 py-2 rounded-lg text-center text-xs whitespace-nowrap">Belum
                                                    Dikonfirmasi</p>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-12 pr-4">
                                    <div className='flex gap-2 justify-end'>
                                        <Link href={route("donations.show", donation.id)}
                                              className="flex items-center justify-center text-center">
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
                                        <Link href={route("donations.edit", donation.id)}
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
                                        <div onClick={(e) => handleAccept(donation.id)}
                                             className="flex items-center justify-center text-center">
                                            <button
                                                className="text-sm leading-none text-white py-3 px-5 bg-green-600 rounded hover:bg-green-500 focus:outline-none transition">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                                                    <path
                                                        d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-center text-center">
                                            <button onClick={(e) => handleReject(donation.id)}
                                                    className="text-sm leading-none text-white py-3 px-5 bg-red rounded transition hover:bg-red_hover focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                    <path
                                                        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
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
        </Authenticated>
    );
}
