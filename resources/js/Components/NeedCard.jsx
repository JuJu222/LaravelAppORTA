import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function NeedCard({disability}) {
    const formatter = new Intl.NumberFormat('de-DE');

    return (
        <div className='mt-2 shadow-lg bg-pink rounded-lg p-5 md:block'>
            <div className='flex gap-4'>
                <div className='flex flex-col flex-grow'>
                    <h4 className='text-white text-xl font-bold'>{'Rp' + disability.collected}</h4>
                    <p className='text-white text-xs'>Terkumpul dari <b>{'Rp' + formatter.format(disability.pivot.amount)}</b></p>
                </div>
                <Link className='flex items-center'>
                    <button
                        className='bg-red text-white text-sm px-5 py-3 rounded-2xl font-bold shadow-lg hover:bg-red_hover transition'>
                        Bantu Sekarang
                    </button>
                </Link>
            </div>
            <div className="w-full h-6 bg-white rounded-full mt-2 overflow-clip">
                <div className='h-6 bg-red' style={{"width": (disability.collected / disability.pivot.amount * 100) + '%'}}></div>
            </div>
        </div>
    );
}
