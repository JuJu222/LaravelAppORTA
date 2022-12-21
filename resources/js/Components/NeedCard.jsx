import React from 'react';
import {Link} from '@inertiajs/inertia-react';

export default function NeedCard({need, recipientID, button}) {
    const formatter = new Intl.NumberFormat('de-DE');
    console.log(need)

    return (
        <div className='mt-2 shadow-lg bg-white rounded-lg p-5 md:block'>
            <div className='flex gap-4 items-center'>
                <div className='flex flex-col flex-grow'>
                    <p className='text-red text-sm'>Sampai <b>13 Februari 2023</b></p>
                    <div className='border border-red rounded-lg p-4 mt-1'>
                        <p className='text-red text-sm'>Donasi tersedia</p>
                        <h4 className='text-red text-xl font-bold'>{need.pivot.amount - need.collected <= 0 ? (
                                'Dana Terpenuhi'
                            ) : (
                                'Rp' + formatter.format(need.pivot.amount - need.collected)
                            )}
                        </h4>
                        <h4 className='text-red text-xs'><b>{'Rp' +
                            formatter.format(need.collected)}</b> terkumpul dari <b>Rp{
                            formatter.format(need.pivot.amount)}</b></h4>
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <p className='text-red'>Kebutuhan Donasi</p>
                    <h3 className='font-bold text-2xl text-red text-center w-40'>{need.category}</h3>
                    {button ? (
                        <Link href={route('recipients.donate.add', [recipientID, need.pivot.id])}
                              className='flex items-center mt-1'>
                            <button
                                className='bg-red text-white text-sm px-5 py-3 rounded-2xl font-bold shadow-lg hover:bg-red_hover transition'>
                                Bantu Sekarang
                            </button>
                        </Link>
                    ) : (
                        ''
                    )}
                </div>
            </div>
            <div className="w-full h-6 bg-white rounded-full mt-2 overflow-clip border border-red">
                <div className='h-6 bg-red' style={{"width": (need.collected / need.pivot.amount * 100) + '%'}}></div>
            </div>
            <div className='flex justify-between text-red text-xs font-bold mt-1'>
                <span>Rp. 0</span>
                <span>Rp{formatter.format(need.pivot.amount)}</span>
            </div>
        </div>
    );
}
