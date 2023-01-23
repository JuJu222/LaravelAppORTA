import React, {useState} from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from "@inertiajs/inertia-react";

export default function NeedCategories(props) {
    const [show, setShow] = useState(null)

    function handleCreate() {
        Inertia.get(route("need_categories.create"));
    }

    function handleDelete(id) {
        Inertia.delete(route("need_categories.destroy", id));
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kebutuhan</h2>}
        >
            {/*<div className="w-full sm:px-6">*/}
            {/*    <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">*/}
            {/*        <div className="flex items-center justify-between">*/}
            {/*            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Projects</p>*/}
            {/*            <div>*/}
            {/*                <button className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">*/}
            {/*                    <p className="text-sm font-medium leading-none text-white">New Project</p>*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">*/}
            {/*        <table className="w-full">*/}
            {/*            <thead>*/}
            {/*            <tr className="h-16 w-full text-sm leading-none text-gray-800">*/}
            {/*                <th className="font-bold text-left pl-4">No.</th>*/}
            {/*                <th className="font-bold text-left pl-4">Project</th>*/}
            {/*                <th className="font-bold text-left pl-12">Progress</th>*/}
            {/*                <th className="font-bold text-left pl-12">Tasks</th>*/}
            {/*                <th className="font-bold text-left pl-20">Budget</th>*/}
            {/*                <th className="font-bold text-left pl-20">Deadline</th>*/}
            {/*            </tr>*/}
            {/*            </thead>*/}
            {/*            <tbody className="w-full">*/}
            {/*            {props.needCategories.map((needCategory, i) =>*/}
            {/*                <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">*/}
            {/*                    <td className="pl-4">*/}
            {/*                        <p className="text-sm font-medium leading-none text-gray-800">{i + 1}</p>*/}
            {/*                    </td>*/}
            {/*                    <td className="pl-4 cursor-pointer">*/}
            {/*                        <div className="flex items-center">*/}
            {/*                            <div>*/}
            {/*                                <p className="font-medium">{needCategory.category}</p>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </td>*/}
            {/*                    <td className="pl-12">*/}
            {/*                        <p className="text-sm font-medium leading-none text-gray-800">72%</p>*/}
            {/*                        <div className="w-24 h-3 bg-gray-100 rounded-full mt-2">*/}
            {/*                            <div className="w-20 h-3 bg-green-progress rounded-full" />*/}
            {/*                        </div>*/}
            {/*                    </td>*/}
            {/*                    <td className="pl-12">*/}
            {/*                        <p className="font-medium">32/47</p>*/}
            {/*                        <p className="text-xs leading-3 text-gray-600 mt-2">5 tasks pending</p>*/}
            {/*                    </td>*/}
            {/*                    <td className="pl-20">*/}
            {/*                        <p className="font-medium">$13,000</p>*/}
            {/*                        <p className="text-xs leading-3 text-gray-600 mt-2">$4,200 left</p>*/}
            {/*                    </td>*/}
            {/*                    <td className="pl-20">*/}
            {/*                        <p className="font-medium">22.12.21</p>*/}
            {/*                        <p className="text-xs leading-3 text-gray-600 mt-2">34 days</p>*/}
            {/*                    </td>*/}
            {/*                    <td className="px-7 2xl:px-0">*/}
            {/*                        {*/}
            {/*                            show===i ? <button onClick={()=>setShow(null)} className="focus:outline-none pl-7">*/}
            {/*                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">*/}
            {/*                                    <path d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />*/}
            {/*                                    <path d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />*/}
            {/*                                    <path d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />*/}
            {/*                                </svg>*/}
            {/*                            </button>:<button onClick={()=>setShow(i)} className="focus:outline-none pl-7">*/}
            {/*                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">*/}
            {/*                                    <path d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />*/}
            {/*                                    <path d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />*/}
            {/*                                    <path d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />*/}
            {/*                                </svg>*/}
            {/*                            </button>*/}
            {/*                        }*/}
            {/*                        {show===i &&  <div className="dropdown-content bg-white shadow w-24 absolute z-30 mr-6 ">*/}
            {/*                            <div className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">*/}
            {/*                                <p>Edit</p>*/}
            {/*                            </div>*/}
            {/*                            <div className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">*/}
            {/*                                <p>Delete</p>*/}
            {/*                            </div>*/}
            {/*                        </div>}*/}
            {/*                    </td>*/}
            {/*                </tr>*/}
            {/*            )}*/}
            {/*            </tbody>*/}
            {/*        </table>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="w-full sm:px-6 xl:px-0">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="flex items-center justify-between">
                        <input type="text" id="username" name="username"
                               className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                               placeholder="Cari wali anak" />
                        <Link href={route("need_categories.create")}>
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
                            <th className="font-bold text-left pl-4">No.</th>
                            <th className="font-bold text-left pl-12">Kebutuhan</th>
                        </tr>
                        </thead>
                        <tbody className="w-full">
                        {props.needCategories.map((needCategory, i) =>
                            <tr className="h-20 text-sm leading-none text-gray-800 bg-white border-b border-t border-gray-100">
                                <td className="pl-4">
                                    <p className="text-sm font-medium leading-none text-gray-800">{i + 1}</p>
                                </td>
                                <td className="pl-12 w-full">
                                    <div className="flex items-center">
                                        <div>
                                            <p className="font-medium">{needCategory.category}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-12 pr-4">
                                    <div className='flex gap-4 justify-end'>
                                        <Link href={route("need_categories.edit", needCategory.id)} className="flex items-center justify-center text-center">
                                            <button
                                                    className="text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none transition">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-pencil-fill"
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                </svg>
                                            </button>
                                        </Link>
                                        <div className="flex items-center justify-center text-center">
                                            <button onClick={(e) => handleDelete(needCategory.id)}
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
        </Authenticated>
    );
}
