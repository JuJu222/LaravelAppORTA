import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/inertia-react';

export default function RecipientCard({recipient}) {
    return (
        <Link className='flex justify-center' href={route('recipients.show', recipient.id)}>
            <div className="max-w-sm rounded-lg overflow-hidden shadow-lg hover:scale-[102%] transition bg-white">
                <img className="w-full" src="/img/anak.png" alt="Sunset in the mountains" />
                <div className="px-3 pt-1">
                    <div className="font-bold text-base text-red">{recipient.name}</div>
                    <p className="text-gray-700 text-xs">6 tahun</p>
                </div>
                <div className="px-3 pt-1 pb-2">
                    {recipient.disabilities.map((disability, i) =>
                        <span
                            className="inline-block rounded-full px-2 py-0.5 text-xs font-semibold border border-black mr-2 mb-2">{disability.disability}</span>
                    )}
                </div>
            </div>
        </Link>
    );
}
