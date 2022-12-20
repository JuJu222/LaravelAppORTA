import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/inertia-react';
import {Inertia} from "@inertiajs/inertia";

export default function RecipientCard({recipient}) {

    function handleDelete(e, id) {
        e.stopPropagation()
        e.preventDefault()
        Inertia.delete(route("recipients.destroy", id));
    }

    return (
        <Link className='flex justify-center' href={route('recipients.show', recipient.id)}>
            <div className="max-w-sm rounded-lg overflow-hidden shadow-lg hover:scale-[102%] transition bg-white">
                <img className="w-full" src="/img/anak.png" alt="Sunset in the mountains" />
                <div className="px-3 pt-1">
                    <div className="font-bold text-base text-red">{recipient.name}</div>
                    <p className="text-gray-700 text-xs text-red">6 tahun</p>
                </div>
                <div className="px-3 pt-1">
                    {recipient.disabilities.map((disability, i) =>
                        <span
                            className="inline-block bg-pink rounded-full px-2 py-1 text-xs font-semibold text-white mr-2 mb-2">{disability.disability}</span>
                    )}
                </div>
                <div className='px-3 pb-2 flex gap-2'>
                    <Link href={route("recipients.edit", recipient.id)} className="w-1/2 bg-white transition duration-150 ease-in-out focus:outline-none hover:bg-gray-100 rounded text-black px-6 py-2 text-xs border flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path
                                d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </Link>
                    <button onClick={(e) => handleDelete(e, recipient.id)} className="w-1/2 bg-white transition duration-150 ease-in-out focus:outline-none hover:bg-gray-100 rounded text-red px-6 py-2 text-xs border flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path
                                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </Link>
    );
}
