import React from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from "@inertiajs/inertia-react";

export default function Donors(props) {

    function handleCreate() {
        Inertia.get(route("donors.create"));
    }

    function handleDelete(id) {
        Inertia.delete(route("donors.destroy", id));
    }

    function handleEdit(id) {
        Inertia.get(route("donors.edit", id));
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Donors</h2>}
        >
            <div className='overflow-auto'>
                <table className="w-full whitespace-nowrap">
                    <tbody>
                    <tr className="h-16 border border-gray-100 rounded">
                        <td>
                            <div className="ml-5">
                                <p className="text-sm font-bold leading-none text-gray-600 ml-2">No.</p>
                            </div>
                        </td>
                        <td colSpan={2}>
                            <div className="flex items-center pl-5">
                                <p className="text-base font-bold leading-none text-gray-700">Name</p>
                            </div>
                        </td>
                        <td>
                            <div className="flex items-center justify-center text-center">
                                <p className="text-base font-bold leading-none text-gray-700"></p>
                            </div>
                        </td>
                        <td>
                            <div className="flex items-center justify-center text-center">
                                <p className="text-base font-bold leading-none text-gray-700"></p>
                            </div>
                        </td>
                    </tr>
                    {props.donors.map((recipient, i) =>
                        <>
                            <tr className="h-16 border border-gray-100 rounded">
                                <td>
                                    <div className="ml-5">
                                        <p className="text-sm leading-none text-gray-600 ml-2">{i + 1}.</p>
                                    </div>
                                </td>
                                <td colSpan={2}>
                                    <div className="flex items-center pl-5">
                                        <p className="text-base font-medium leading-none text-gray-700">{recipient.name}</p>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center justify-center text-center">
                                        <Link href={route('donors.show', recipient.id)}
                                                className="text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none transition">Lihat
                                        </Link>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center justify-center text-center">
                                        <button onClick={(e) => handleEdit(recipient.id)}
                                                className="text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none transition">Ubah
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center justify-center text-center">
                                        <button onClick={(e) => handleDelete(recipient.id)}
                                                className="text-sm leading-none text-white py-3 px-5 bg-red-700 rounded transition hover:bg-red-800 focus:outline-none">Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="h-6"/>
                        </>
                    )}
                    </tbody>
                </table>
                <button
                    className="mx-2 my-2 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-xs"
                    onClick={handleCreate}>Create
                </button>
            </div>
        </Authenticated>
    );
}
