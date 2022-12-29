import React from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from "@inertiajs/inertia-react";
import RecipientCardAdmin from "@/Components/RecipientCardAdmin";

export default function Recipients(props) {

    function handleDelete(id) {
        Inertia.delete(route("recipients.destroy", id));
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Atur Penerima Dana</h2>}
        >
            <div className="w-full sm:px-6 xl:px-0">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="flex items-center justify-between">
                        <input type="text" id="username" name="username"
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Cari wali anak" />
                        <Link href={route("disabilities.create")}>
                            <button className="inline-flex ml-4 sm:mt-0 items-start justify-start px-5 py-2.5 bg-red hover:bg-red_hover transition focus:outline-none rounded">
                                <p className="text-xl font-medium leading-none text-white">+</p>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="h-16 w-full text-sm leading-none text-gray-800">
                            <th className="font-normal text-left pl-4">No.</th>
                            <th className="font-normal text-left pl-12">Penerima</th>
                            <th className="font-normal text-left pl-12">Usia</th>
                            <th className="font-normal text-left pl-12">Disabilitas</th>
                            <th className="font-normal text-left pl-12">Status</th>
                        </tr>
                        </thead>
                        <tbody className="w-full">
                        {props.recipients.map((recipient, i) =>
                            <tr className="h-20 text-sm leading-none text-gray-800 bg-white border-b border-t border-gray-100">
                                <td className="pl-4">
                                    <p className="text-sm font-medium leading-none text-gray-800">{i + 1}</p>
                                </td>
                                <td className="pl-12">
                                    <div className="flex items-center">
                                        <div className='flex items-center'>
                                            <div className="w-10 h-10">
                                                <img className="w-full h-full rounded object-cover" src="/img/anak.png" />
                                            </div>
                                            <p className="font-medium ml-4">{recipient.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-12">
                                    <div className="flex items-center">
                                        <div>
                                            <p className="font-medium">{recipient.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-12">
                                    <div className="flex items-center">
                                        <div>
                                            <p className="font-medium">
                                                {recipient.disabilities.map((disability, i) =>
                                                    disability.disability + (i !== recipient.disabilities.length - 1 ? ', ' : '')
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-12">
                                    <div className="flex items-center">
                                        <div>
                                            <p className="font-medium">{recipient.is_active === 1 ? 'Aktif' : 'Tidak Aktif'}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-12 pr-4">
                                    <div className='flex gap-4 justify-end'>
                                        <Link href={route("disabilities.edit", recipient.id)} className="flex items-center justify-center text-center">
                                            <button
                                                className="text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none transition">Ubah
                                            </button>
                                        </Link>
                                        <div className="flex items-center justify-center text-center">
                                            <button onClick={(e) => handleDelete(recipient.id)}
                                                    className="text-sm leading-none text-white py-3 px-5 bg-red rounded transition hover:bg-red_hover focus:outline-none">Hapus
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
