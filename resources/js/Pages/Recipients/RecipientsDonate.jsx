import React, {useState} from 'react';
import {Inertia} from "@inertiajs/inertia";
import BottomNavbar from "@/Components/BottomNavbar";
import NeedCard from "@/Components/NeedCard";

export default function RecipientsDonate(props) {
    const [values, setValues] = useState({
    })

    const today = new Date();
    const birthDate = new Date(props.recipient.birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m == 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    function handleChange(e) {
        const key = e.target.name;

        if (e.target.type == 'file') {
            const file = e.target.files[0]
            setValues(values => ({
                ...values,
                [key]: file
            }))
        } else {
            const value = e.target.value
            setValues(values => ({
                ...values,
                [key]: value,
            }))
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route('recipients.donate.store', [props.recipient.id, props.need.pivot.id]), values)
    }

    return (
        <div className='pb-20'>
            <div className='w-full md:hidden'>
                <div>
                    {props.recipient.photos.map((photo, i) => {
                        if (photo.type.type == 'primary') {
                            return (
                                <img className="h-52 w-full object-cover" src={photo.photo_url ? '/img/recipients/photos/' + photo.photo_url : '/img/avatar-default.png'}  />
                            )
                        }
                    })}
                </div>
            </div>
            <div className='w-full px-4'>
                <div className='max-w-6xl mx-auto mt-4'>
                    <div className='md:flex md:flex-row md:gap-5'>
                        <div className='hidden md:block'>
                            {props.recipient.photos.map((photo, i) => {
                                if (photo.type.type == 'primary') {
                                    return (
                                        <img className="h-96 w-auto object-cover rounded-lg" src={photo.photo_url ? '/img/recipients/photos/' + photo.photo_url : '/img/avatar-default.png'}  />
                                    )
                                }
                            })}
                        </div>
                        <div className='grow md:pt-4'>
                            <div className='flex flex-row justify-between'>
                                <h2 className='text-red text-2xl font-bold'>{props.recipient.name}</h2>
                                <h3 className='text-red text-2xl'>{age} tahun</h3>
                            </div>
                            <div className="py-2">
                                {props.recipient.disabilities.map((disability, i) =>
                                    <span
                                        className="inline-block rounded-full px-2 py-0.5 text-xs font-semibold border border-black mr-2 mb-2">{disability.disability}</span>
                                )}
                            </div>
                            <NeedCard need={props.need} recipientID={props.recipient.id} button={false}/>
                            <div className='mt-8'>
                                <h4 className='text-red font-bold text-lg'>Informasi Rekening ORTA Indonesia:</h4>
                                <div className='flex gap-4 mt-2'>
                                    <img className='w-auto h-12' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png" alt="BCA"/>
                                    <div>
                                        <p>5120356978</p>
                                        <p>Aurelia Agatha Sylvie</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className='mt-6'>
                        <div className="mb-6">
                            <label htmlFor="bank_account"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">Nama Pemilik Rekening *</label>
                            <input type="text" id="bank_account" name="bank_account" onChange={handleChange}
                                   className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                   required={true}/>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="amount"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">Jumlah Donasi *</label>
                            <input type="text" id="amount" name="amount" onChange={handleChange}
                                   className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                   required={true} />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="transfer_date"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">Tanggal Transfer *</label>
                            <input type="date" id="transfer_date" name="transfer_date" onChange={handleChange}
                                   className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                   required={true} />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="transfer_receipt"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">Foto Bukti Transfer *</label>
                            {values.transfer_receipt &&  <img className='p-2 w-full h-40 object-contain border border-gray-300 rounded-lg mb-2' src={URL.createObjectURL(values.transfer_receipt)} /> }
                            <input type="file" id="transfer_receipt" name="transfer_receipt" onChange={handleChange}
                                   className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 placeholder-gray-400"
                                   required={true} />
                        </div>
                        <div className="mb-6 flex gap-2">
                            <input type="checkbox" id="agreement" name="agreement"
                                   className="border border-gray-300 text-red text-sm rounded-lg focus:ring-red focus:border-red block p-2.5 placeholder-gray-400"
                                   required={true} />
                            <label htmlFor="agreement"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">* Dengan ini saya mengetahui dan menerima bahwa terdapat biaya management fee sebesar 10% yang akan dipotong dari sumbangan saya.</label>
                        </div>
                        <button type="submit"
                                className="text-white w-full transition bg-red hover:bg-red_hover focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-3 text-center">Submit
                        </button>
                    </form>
                </div>
            </div>
            <BottomNavbar auth={props.auth}></BottomNavbar>
        </div>
    );
}
