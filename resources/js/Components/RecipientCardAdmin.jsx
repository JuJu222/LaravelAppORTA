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
        <Link className='flex justify-center' href={route('recipients.show', 1)}>
            <div className="max-w-sm rounded-lg overflow-hidden shadow-lg hover:scale-[102%] transition bg-red">
                <img className="w-full" src="/img/anak.png" alt="Sunset in the mountains" />
                <div className="px-3 pt-1">
                    <div className="font-bold text-base text-white">{recipient.name}</div>
                    <p className="text-gray-700 text-xs text-white">6 tahun</p>
                </div>
                <div className="px-3 pt-1">
                    <span
                        className="inline-block bg-pink rounded-full px-2 py-1 text-xs font-semibold text-white mr-2 mb-2">Autisme</span>
                    <span
                        className="inline-block bg-pink rounded-full px-2 py-1 text-xs font-semibold text-white mr-2 mb-2">Dyslexia</span>
                </div>
                <div className='px-3 pb-2'>
                    <Link href={route("recipients.edit", recipient.id)}>
                        <button className="w-full mb-2 bg-white transition duration-150 ease-in-out focus:outline-none hover:bg-gray-100 rounded text-indigo-700 px-6 py-2 text-xs">Ubah</button>
                    </Link>
                    <button onClick={(e) => handleDelete(e, recipient.id)} className="w-full bg-white transition duration-150 ease-in-out focus:outline-none hover:bg-gray-100 rounded text-red px-6 py-2 text-xs">Hapus</button>
                </div>
            </div>
        </Link>
    );
}
