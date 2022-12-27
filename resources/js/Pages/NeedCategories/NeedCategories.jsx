import React, {useState} from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function NeedCategories(props) {
    const [show, setShow] = useState(null)

    function handleCreate() {
        Inertia.get(route("need_categories.create"));
    }

    function handleDelete(id) {
        Inertia.delete(route("need_categories.destroy", id));
    }

    function handleEdit(id) {
        Inertia.get(route("need_categories.edit", id));
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Need Categories</h2>}
        >
            <div className="w-full sm:px-6">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Projects</p>
                        <div>
                            <button className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                                <p className="text-sm font-medium leading-none text-white">New Project</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead>
                        <tr className="h-16 w-full text-sm leading-none text-gray-800">
                            <th className="font-normal text-left pl-4">No.</th>
                            <th className="font-normal text-left pl-4">Project</th>
                            <th className="font-normal text-left pl-12">Progress</th>
                            <th className="font-normal text-left pl-12">Tasks</th>
                            <th className="font-normal text-left pl-20">Budget</th>
                            <th className="font-normal text-left pl-20">Deadline</th>
                        </tr>
                        </thead>
                        <tbody className="w-full">
                        {props.needCategories.map((needCategory, i) =>
                            <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                                <td className="pl-4">
                                    <p className="text-sm font-medium leading-none text-gray-800">{i + 1}</p>
                                </td>
                                <td className="pl-4 cursor-pointer">
                                    <div className="flex items-center">
                                        <div>
                                            <p className="font-medium">{needCategory.category}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">72%</p>
                                    <div className="w-24 h-3 bg-gray-100 rounded-full mt-2">
                                        <div className="w-20 h-3 bg-green-progress rounded-full" />
                                    </div>
                                </td>
                                <td className="pl-12">
                                    <p className="font-medium">32/47</p>
                                    <p className="text-xs leading-3 text-gray-600 mt-2">5 tasks pending</p>
                                </td>
                                <td className="pl-20">
                                    <p className="font-medium">$13,000</p>
                                    <p className="text-xs leading-3 text-gray-600 mt-2">$4,200 left</p>
                                </td>
                                <td className="pl-20">
                                    <p className="font-medium">22.12.21</p>
                                    <p className="text-xs leading-3 text-gray-600 mt-2">34 days</p>
                                </td>
                                <td className="px-7 2xl:px-0">
                                    {
                                        show===i ? <button onClick={()=>setShow(null)} className="focus:outline-none pl-7">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                <path d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>:<button onClick={()=>setShow(i)} className="focus:outline-none pl-7">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                <path d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    }
                                    {show===i &&  <div className="dropdown-content bg-white shadow w-24 absolute z-30 mr-6 ">
                                        <div className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                                            <p>Edit</p>
                                        </div>
                                        <div className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                                            <p>Delete</p>
                                        </div>
                                    </div>}
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='overflow-auto'>
                <table className="w-full whitespace-nowrap">
                    <tbody>
                    <tr className="h-16 border border-gray-100 rounded">
                        <td>
                            <div className="ml-5">
                                <p className="text-sm font-bold leading-none text-gray-600 ml-2">No.</p>
                            </div>
                        </td>
                        <td>
                            <div className="flex items-center justify-center text-center">
                                <p className="text-base font-bold leading-none text-gray-700">Category</p>
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
                    {props.needCategories.map((needCategory, i) =>
                        <>
                            <tr className="h-16 border border-gray-100 rounded">
                                <td>
                                    <div className="ml-5">
                                        <p className="text-sm leading-none text-gray-600 ml-2">{i + 1}.</p>
                                    </div>
                                </td>
                                <td colSpan={2}>
                                    <div className="flex items-center pl-5">
                                        <p className="text-base font-medium leading-none text-gray-700">{needCategory.category}</p>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center justify-center text-center">
                                        <button onClick={(e) => handleEdit(needCategory.id)}
                                                className="text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none transition">Ubah
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center justify-center text-center">
                                        <button onClick={(e) => handleDelete(needCategory.id)}
                                                className="text-sm leading-none text-white py-3 px-5 bg-red-700 rounded transition hover:bg-red-800 focus:outline-none">Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="h-6"/>
                        </>
                    )}
                    </tbody>
                    <button className="mx-2 my-2 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-xs" onClick={handleCreate}>Create</button>
                </table>
            </div>
        </Authenticated>
    );
}
