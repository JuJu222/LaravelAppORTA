import React from 'react';
import {Link} from '@inertiajs/inertia-react';

export default function NeedCard({need, recipientID, button}) {
    const formatter = new Intl.NumberFormat('de-DE');

    return (
        <div className='mt-2 shadow-lg bg-white rounded-lg p-4 md:block'>
            <div className='flex gap-4 items-center'>
                <div className='flex flex-col flex-grow'>
                    <div className='mt-1'>
                        <p className='text-red font-bold text-lg'>{need.category}</p>
                        <p className='text-xs mt-1'>Sampai <b>13 Februari 2023</b></p>
                        <p className='text-xs mt-1'>Donasi Tersisa: <b>
                            {need.pivot.amount - need.collected <= 0 ? (
                                'Dana Terpenuhi'
                            ) : (
                                'Rp' + formatter.format(need.pivot.amount - need.collected)
                            )}
                            </b>
                        </p>
                    </div>
                </div>
            </div>
            <div className='flex w-full'>
                <div className='w-full'>
                    <div className="w-full h-6 bg-white rounded-full mt-2 overflow-clip border border-red">
                        <div className='h-6 bg-red' style={{"width": (need.collected / need.pivot.amount * 100) + '%'}}></div>
                    </div>
                    <div className='flex justify-between text-red text-xs font-bold mt-1'>
                        <span>Rp. 0</span>
                        <span>Rp{formatter.format(need.pivot.amount)}</span>
                    </div>
                </div>
                <div>
                    {button ? (
                        <Link href={route('recipients.donate.add', [recipientID, need.pivot.id])}
                              className='flex items-center mt-1 ml-3'>
                            <button
                                className='bg-red text-white text-xs px-5 py-3 rounded-2xl font-bold shadow-lg hover:bg-red_hover transition'>
                                Bantu Sekarang
                            </button>
                        </Link>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
}
