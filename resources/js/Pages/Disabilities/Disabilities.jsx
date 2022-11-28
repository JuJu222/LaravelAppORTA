import React from 'react';
import {Inertia} from "@inertiajs/inertia";

export default function Disabilities(props) {

    function handleCreate() {
        Inertia.get(route("disabilities.create"));
    }

    function handleDelete(id) {
        Inertia.delete(route("disabilities.destroy", id));
    }

    function handleEdit(id) {
        Inertia.get(route("disabilities.edit", id));
    }

    return (
        <>
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
                                <p className="text-base font-bold leading-none text-gray-700">Disability</p>
                            </div>
                        </td>
                        <td>
                            <div className="flex items-center justify-center text-center">
                                <p className="text-base font-bold leading-none text-gray-700">Description</p>
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
                    {props.disabilities.map((disability, i) =>
                        <>
                            <tr className="h-16 border border-gray-100 rounded">
                                <td>
                                    <div className="ml-5">
                                        <p className="text-sm leading-none text-gray-600 ml-2">{i + 1}.</p>
                                    </div>
                                </td>
                                <td colSpan={2}>
                                    <div className="flex items-center pl-5">
                                        <p className="text-base font-medium leading-none text-gray-700">{disability.disability}</p>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center justify-center text-center">
                                        <p className="text-base font-medium leading-none text-gray-700">{disability.description}</p>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center justify-center text-center">
                                        <button onClick={(e) => handleEdit(disability.id)}
                                                className="text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none transition">Ubah
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center justify-center text-center">
                                        <button onClick={(e) => handleDelete(disability.id)}
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
                <button className="mx-2 my-2 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-xs" onClick={handleCreate}>Create</button>
            </div>
        </>
    );
}
