import React from 'react';
import {useState} from "react";

export default function DeleteConrifmation({showModal, setShowModal, modalData, handleDelete}) {
    return (
        <div>
            <div>
                {showModal &&  <div className="py-12 bg-gray-700 bg-opacity-50 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                    <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                        <div className="relative py-8 px-8 md:px-16 bg-white shadow-md rounded border border-gray-400">
                            <div className="w-full flex justify-center text-red mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor"
                                     className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                                    <path
                                        d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                                    <path
                                        d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
                                </svg>
                            </div>
                            <h1 className="text-center text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Konfirmasi Penghapusan Data</h1>
                            <p className="mb-5 text-sm text-gray-600 text-center font-normal">Apakah anda yakin mau menghapus data {modalData.message}?</p>
                            <div className="flex items-center justify-center w-full">
                                <button className="focus:outline-none transition duration-150 ease-in-out hover:bg-red_hover bg-red rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm" onClick={()=>handleDelete(modalData.id)}>Hapus</button>
                                <button className="ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:bg-gray-50 rounded px-8 py-2 text-sm" onClick={()=>setShowModal(!showModal)} >
                                    Cancel
                                </button>
                            </div>
                            <div className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out" onClick={()=>setShowModal(!showModal)} >
                                <svg xmlns="http://www.w3.org/2000/svg" aria-label="Close" className="icon icon-tabler icon-tabler-x" width={20} height={20} viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1={18} y1={6} x2={6} y2={18} />
                                    <line x1={6} y1={6} x2={18} y2={18} />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
}
