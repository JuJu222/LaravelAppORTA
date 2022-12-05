import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/inertia-react';

export default function RecipientCard({meal}) {
    return (
        <Link className='flex justify-center' href={route('recipients.show', 1)}>
            <div className="max-w-sm rounded-lg overflow-hidden shadow-lg hover:scale-[102%] transition bg-red">
                <img className="w-full" src="/img/anak.png" alt="Sunset in the mountains" />
                <div className="px-3 pt-1">
                    <div className="font-bold text-base text-white">Justina Wadana</div>
                    <p className="text-gray-700 text-xs text-white">6 tahun</p>
                </div>
                <div className="px-3 pt-1 pb-2">
                    <span
                        className="inline-block bg-pink rounded-full px-2 py-1 text-xs font-semibold text-white mr-2 mb-2">Autisme</span>
                    <span
                        className="inline-block bg-pink rounded-full px-2 py-1 text-xs font-semibold text-white mr-2 mb-2">Dyslexia</span>
                </div>
            </div>
        </Link>
    );
}
