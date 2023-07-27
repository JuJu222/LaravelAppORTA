import React, {useState} from 'react';
import {Link} from '@inertiajs/inertia-react';
import RecipientCard from "@/Components/RecipientCard";
import BottomNavbar from "@/Components/BottomNavbar";
import ApplicationLogo from "@/Components/ApplicationLogo";
import RecipientNeedCard from "@/Components/RecipientNeedCard";

export default function Home(props) {
    if (props.admin) {
        const [filteredItems, setFilteredItems] = useState(props.recipients);
        const [filteredItems2, setFilteredItems2] = useState(props.recipientsInactive);
        const [filter, setFilter] = useState({name: ''})

        React.useEffect(() => {
            setFilteredItems(props.recipients);
        }, [props.recipients])

        React.useEffect(() => {
            setFilteredItems2(props.recipientsInactive);
        }, [props.recipientsInactive])

        React.useEffect(() => {
            const results = props.recipients.filter(item => {
                return item.name.toLowerCase().includes(filter.name.toLowerCase());
            })
            setFilteredItems(results);

            const results2 = props.recipientsInactive.filter(item => {
                return item.name.toLowerCase().includes(filter.name.toLowerCase());
            })
            setFilteredItems2(results2);
        }, [filter])

        return (
            <div className='pb-20'>
                <div className='bg-red w-full px-4 py-4 sticky top-0 z-10'>
                    <div className='flex items-center gap-5 max-w-6xl mx-auto'>
                        <ApplicationLogo white={true} className="block h-9 w-auto"></ApplicationLogo>
                        <div className="w-full">
                            <div className="relative">
                                <svg
                                    className="absolute z-20 cursor-pointer top-[14px] left-4"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14.2716 13.1684L11.3313 10.2281C12.0391 9.28574 12.4213 8.13865 12.42 6.96C12.42 3.94938 9.97063 1.5 6.96 1.5C3.94938 1.5 1.5 3.94938 1.5 6.96C1.5 9.97063 3.94938 12.42 6.96 12.42C8.13865 12.4213 9.28574 12.0391 10.2281 11.3313L13.1684 14.2716C13.3173 14.4046 13.5114 14.4756 13.711 14.47C13.9105 14.4645 14.1004 14.3827 14.2415 14.2415C14.3827 14.1004 14.4645 13.9105 14.47 13.711C14.4756 13.5114 14.4046 13.3173 14.2716 13.1684ZM3.06 6.96C3.06 6.18865 3.28873 5.43463 3.71727 4.79328C4.14581 4.15192 4.7549 3.65205 5.46754 3.35687C6.18017 3.06169 6.96433 2.98446 7.72085 3.13494C8.47738 3.28542 9.17229 3.65686 9.71772 4.20228C10.2631 4.74771 10.6346 5.44262 10.7851 6.19915C10.9355 6.95567 10.8583 7.73983 10.5631 8.45247C10.268 9.1651 9.76808 9.77419 9.12673 10.2027C8.48537 10.6313 7.73135 10.86 6.96 10.86C5.92604 10.8588 4.93478 10.4475 4.20365 9.71635C3.47253 8.98522 3.06124 7.99396 3.06 6.96Z"
                                        fill="#4B5563"
                                    />
                                </svg>
                                <input
                                    className="relative text-sm leading-none text-gray-600 bg-white rounded-full w-full px-10 py-3 border-none outline-none ring-none focus:ring-red focus:border-red"
                                    type="text"
                                    name
                                    id
                                    placeholder="Cari nama anak"
                                    onChange={(e) => setFilter(filter => ({...filter, name: e.target.value}))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-red w-full px-4 pt-4'>
                    <div className='max-w-6xl mx-auto'>
                        <Link href={route('donations.index')} as="button"
                              className="text-red w-full transition bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-3 text-center">Dasbor
                            Admin</Link>
                        <div className='flex justify-between items-end mt-5 md:px-32'>
                            <div className='h-fit my-auto pb-5'>
                                <h2 className='text-2xl text-white font-bold'>Halo, {props.admin.name}</h2>
                                <p className='text-white text-sm mt-2'>Anda sedang login sebagai Admin</p>
                            </div>
                            <div>
                                <img src="/img/home_element1.png" alt="" className='max-h-[12rem]'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full h-1/3 px-4'>
                    <div className='max-w-6xl mx-auto'>
                        <div>
                            <h2 className='text-red font-bold mt-2'>Yuk, mari kita bantu anak-anak!</h2>
                            <p className='text-xs mt-1'>Klik salah satu anak untuk membantu</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-4">
                                {filteredItems.map((recipient, i) =>
                                    <RecipientCard recipient={recipient}></RecipientCard>
                                )}
                            </div>
                        </div>
                        <div>
                            <h2 className='text-red font-bold mt-4'>Anak-anak yang sudah terbantu</h2>
                            <p className='text-xs mt-1'>Anak-anak dengan donasi yang telah terpenuhi</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-4">
                                {filteredItems2.map((recipient, i) =>
                                    <RecipientCard recipient={recipient}></RecipientCard>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <nav id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-red shadow">
                    <div id="tabs" className="flex justify-between">
                        <Link href="/beranda"
                              className="w-full focus:text-gray-200 hover:text-gray-200 transition text-white justify-center inline-block text-center pt-2 pb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                 className="bi bi-house-door-fill inline-block mb-1" viewBox="0 0 16 16">
                                <path
                                    d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/>
                            </svg>
                            <span className="tab tab-home block text-xs">Beranda</span>
                        </Link>
                        <Link href='/profil'
                              className="w-full focus:text-gray-200 hover:text-gray-200 transition text-white justify-center inline-block text-center pt-2 pb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                 className="bi bi-person-circle inline-block mb-1" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fill-rule="evenodd"
                                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg>
                            <span className="tab tab-account block text-xs">Profil</span>
                        </Link>
                    </div>
                </nav>
            </div>
        );
    } else if (props.donor) {
        const [filteredItems, setFilteredItems] = useState(props.recipients);
        const [filteredItems2, setFilteredItems2] = useState(props.recipientsInactive);
        const [filter, setFilter] = useState({name: ''})

        React.useEffect(() => {
            setFilteredItems(props.recipients);
        }, [props.recipients])

        React.useEffect(() => {
            setFilteredItems2(props.recipientsInactive);
        }, [props.recipientsInactive])

        React.useEffect(() => {
            const results = props.recipients.filter(item => {
                return item.name.toLowerCase().includes(filter.name.toLowerCase());
            })
            setFilteredItems(results);

            const results2 = props.recipientsInactive.filter(item => {
                return item.name.toLowerCase().includes(filter.name.toLowerCase());
            })
            setFilteredItems2(results2);
        }, [filter])

        return (
            <div className='pb-20'>
                <div className='bg-red w-full px-4 py-4 sticky top-0 z-10'>
                    <div className='flex items-center gap-5 max-w-6xl mx-auto'>
                        <ApplicationLogo white={true} className="block h-9 w-auto"></ApplicationLogo>
                        <div className="w-full">
                            <div className="relative">
                                <svg
                                    className="absolute z-20 cursor-pointer top-[14px] left-4"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14.2716 13.1684L11.3313 10.2281C12.0391 9.28574 12.4213 8.13865 12.42 6.96C12.42 3.94938 9.97063 1.5 6.96 1.5C3.94938 1.5 1.5 3.94938 1.5 6.96C1.5 9.97063 3.94938 12.42 6.96 12.42C8.13865 12.4213 9.28574 12.0391 10.2281 11.3313L13.1684 14.2716C13.3173 14.4046 13.5114 14.4756 13.711 14.47C13.9105 14.4645 14.1004 14.3827 14.2415 14.2415C14.3827 14.1004 14.4645 13.9105 14.47 13.711C14.4756 13.5114 14.4046 13.3173 14.2716 13.1684ZM3.06 6.96C3.06 6.18865 3.28873 5.43463 3.71727 4.79328C4.14581 4.15192 4.7549 3.65205 5.46754 3.35687C6.18017 3.06169 6.96433 2.98446 7.72085 3.13494C8.47738 3.28542 9.17229 3.65686 9.71772 4.20228C10.2631 4.74771 10.6346 5.44262 10.7851 6.19915C10.9355 6.95567 10.8583 7.73983 10.5631 8.45247C10.268 9.1651 9.76808 9.77419 9.12673 10.2027C8.48537 10.6313 7.73135 10.86 6.96 10.86C5.92604 10.8588 4.93478 10.4475 4.20365 9.71635C3.47253 8.98522 3.06124 7.99396 3.06 6.96Z"
                                        fill="#4B5563"
                                    />
                                </svg>
                                <input
                                    className="relative text-sm leading-none text-gray-600 bg-white rounded-full w-full px-10 py-3 border-none outline-none ring-none focus:ring-red focus:border-red"
                                    type="text"
                                    name
                                    id
                                    placeholder="Cari nama anak"
                                    onChange={(e) => setFilter(filter => ({...filter, name: e.target.value}))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-red w-full px-4 pt-4'>
                    <div className='max-w-6xl mx-auto'>
                        <div className='flex justify-between items-end mt-5 md:px-32'>
                            <div className='h-fit my-auto pb-4'>
                                <h2 className='text-2xl text-white font-bold'>Halo, {props.donor.name}</h2>
                                {props.donor.donation_count > 0 ? (
                                    <p className='text-white text-sm mt-2'>Anda telah berhasil membantu anak-anak
                                        sebanyak <h6>{props.donor.donation_count} Kali</h6></p>
                                ) : (
                                    <p className='text-white text-sm mt-2'>Ayo bantu anak-anak kami dengan donasi
                                        anda!</p>
                                )}
                            </div>
                            <div>
                                <img src="/img/home_element1.png" alt="" className='max-h-[12rem]'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full h-1/3 px-4'>
                    <div className='max-w-6xl mx-auto'>
                        <div>
                            <h2 className='text-red font-bold mt-2'>Yuk, mari kita bantu anak-anak!</h2>
                            <p className='text-xs mt-1'>Klik salah satu anak untuk membantu</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-4">
                                {filteredItems.map((recipient, i) =>
                                    <RecipientCard recipient={recipient}></RecipientCard>
                                )}
                            </div>
                        </div>
                        <div>
                            <h2 className='text-red font-bold mt-4'>Anak-anak yang sudah terbantu</h2>
                            <p className='text-xs mt-1'>Anak-anak dengan donasi yang telah terpenuhi</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-4">
                                {filteredItems2.map((recipient, i) =>
                                    <RecipientCard recipient={recipient}></RecipientCard>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <BottomNavbar auth={props.auth}></BottomNavbar>
            </div>
        );
    } else {
        const [filteredItems, setFilteredItems] = useState(props.recipient.needs);
        const [filter, setFilter] = useState({category: ''})

        React.useEffect(() => {
            setFilteredItems(props.recipient.needs);
        }, [props.recipient.needs])

        React.useEffect(() => {
            const results = props.recipient.needs.filter(item => {
                return item.category.toLowerCase().includes(filter.category.toLowerCase());
            })
            setFilteredItems(results);
        }, [filter])

        return (
            <div className='pb-20'>
                <div className='bg-red w-full px-4 py-4 sticky top-0 z-10'>
                    <div className='flex items-center gap-5 max-w-6xl mx-auto'>
                        <ApplicationLogo white={true} className="block h-9 w-auto"></ApplicationLogo>
                        <div className="w-full">
                            <div className="relative">
                                <svg
                                    className="absolute z-20 cursor-pointer top-[14px] left-4"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14.2716 13.1684L11.3313 10.2281C12.0391 9.28574 12.4213 8.13865 12.42 6.96C12.42 3.94938 9.97063 1.5 6.96 1.5C3.94938 1.5 1.5 3.94938 1.5 6.96C1.5 9.97063 3.94938 12.42 6.96 12.42C8.13865 12.4213 9.28574 12.0391 10.2281 11.3313L13.1684 14.2716C13.3173 14.4046 13.5114 14.4756 13.711 14.47C13.9105 14.4645 14.1004 14.3827 14.2415 14.2415C14.3827 14.1004 14.4645 13.9105 14.47 13.711C14.4756 13.5114 14.4046 13.3173 14.2716 13.1684ZM3.06 6.96C3.06 6.18865 3.28873 5.43463 3.71727 4.79328C4.14581 4.15192 4.7549 3.65205 5.46754 3.35687C6.18017 3.06169 6.96433 2.98446 7.72085 3.13494C8.47738 3.28542 9.17229 3.65686 9.71772 4.20228C10.2631 4.74771 10.6346 5.44262 10.7851 6.19915C10.9355 6.95567 10.8583 7.73983 10.5631 8.45247C10.268 9.1651 9.76808 9.77419 9.12673 10.2027C8.48537 10.6313 7.73135 10.86 6.96 10.86C5.92604 10.8588 4.93478 10.4475 4.20365 9.71635C3.47253 8.98522 3.06124 7.99396 3.06 6.96Z"
                                        fill="#4B5563"
                                    />
                                </svg>
                                <input
                                    className="relative text-sm leading-none text-gray-600 bg-white rounded-full w-full px-10 py-3 border-none outline-none ring-none focus:ring-red focus:border-red"
                                    type="text"
                                    name
                                    id
                                    placeholder="Cari kebutuhan"
                                    onChange={(e) => setFilter(filter => ({...filter, category: e.target.value}))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-red w-full px-4 pt-4'>
                    <div className='max-w-6xl mx-auto'>
                        <div className='flex justify-between items-end mt-5 md:px-32'>
                            <div className='h-fit my-auto pb-4'>
                                <h2 className='text-2xl text-white font-bold'>Halo, {props.recipient.name}</h2>
                                {/*{props.donor.donation_count > 0 ? (*/}
                                {/*    <p className='text-white text-sm mt-2'>Anda telah berhasil membantu anak-anak sebanyak <h6>{props.donor.donation_count} Kali</h6></p>*/}
                                {/*) : (*/}
                                {/*    <p className='text-white text-sm mt-2'>Ayo bantu anak-anak kami dengan donasi anda!</p>*/}
                                {/*)}*/}
                            </div>
                            <div>
                                <img src="/img/home_element1.png" alt="" className='max-h-[12rem]'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full h-1/3 px-4'>
                    <div className='max-w-6xl mx-auto'>
                        <div>
                            <h2 className='text-red font-bold mt-2'>Cek kebutuhan donasi anda di sini!</h2>
                            <p className='text-xs mt-1'>Jangan lupa untuk mengkonfirmasi penyaluran dana donasi</p>
                            <div className="grid grid-cols-1 gap-3">
                                {filteredItems.map((need, i) =>
                                    <RecipientNeedCard need={need} recipientID={props.recipient.id} button={true}/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <BottomNavbar auth={props.auth}></BottomNavbar>
            </div>
        );
    }
}
