import React from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from "@inertiajs/inertia-react";

export default function Donations(props) {
    const formatter = new Intl.NumberFormat('de-DE');

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
                        <input type="text" id="username" name="username"
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Cari wali anak" />
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
                            <th className="font-bold text-left pl-12">Keperluan</th>
                            <th className="font-bold text-left pl-12">Jumlah</th>
                            <th className="font-bold text-left pl-12">Tanggal Verifikasi</th>
                        </tr>
                        </thead>
                        <tbody className="w-full">
                        {props.donations.map((donation, i) =>
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
                                            <p className="font-medium">{donation.accepted_date ? donation.accepted_date : 'Belum Diverifikasi'}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-12 pr-4">
                                    <div className='flex gap-4 justify-end'>
                                        <div onClick={(e) => handleAccept(donation.id)} className="flex items-center justify-center text-center">
                                            <button
                                                className="text-sm leading-none text-white py-3 px-5 bg-green-600 rounded hover:bg-green-700 focus:outline-none transition">
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
