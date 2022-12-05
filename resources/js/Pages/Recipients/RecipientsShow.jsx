import React from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from "@inertiajs/inertia-react";
import RecipientCard from "@/Components/RecipientCard";

export default function RecipientsShow(props) {
    return (
        // <Authenticated
        //     auth={props.auth}
        //     errors={props.errors}
        //     header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Recipients</h2>}
        // >
        //     <h2>Name: {props.recipient.name}</h2>
        //     <h2>NIK: {props.recipient.nik}</h2>
        //     <h2>Gender: {props.recipient.gender}</h2>
        //     <h2>Birthplace: {props.recipient.birthplace}</h2>
        //     <h2>Birthdate: {props.recipient.birthdate}</h2>
        //     <h2>School: {props.recipient.school}</h2>
        //     <h2>Class: {props.recipient.class}</h2>
        //     <h2>Siblings: {props.recipient.siblings}</h2>
        //     <h2>Child No: {props.recipient.child_no}</h2>
        //     <h2>Address: {props.recipient.address}</h2>
        //     <h2>City: {props.recipient.city}</h2>
        //     <h2>Phone: {props.recipient.phone}</h2>
        //     <h2>Parent ID: {props.recipient.parent_id}</h2>
        //     <h2>Birth Certificate: {props.recipient.birth_certificate}</h2>
        //     <h2>Kartu Keluarga: {props.recipient.kartu_keluarga}</h2>
        //     <h2>Note: {props.recipient.note}</h2>
        //     <h2>Is Active: {props.recipient.is_active}</h2>
        // </Authenticated>
        <div className='bg-pink'>
            <div className='container max-w-lg mx-auto bg-white overflow-clip'>
                <div className='bg-red w-full h-1/3 px-6'>
                    <div>
                        <div className="lg:max-w-[548px] w-full mx-auto">
                            <div className="relative">
                                <svg
                                    className="absolute z-20 cursor-pointer top-[18px] left-4"
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
                                    className="relative text-sm leading-none text-gray-600 bg-white  rounded  w-full px-10 py-4 outline-none"
                                    type="text"
                                    name
                                    id
                                    placeholder="Search"
                                />
                            </div>
                        </div>
                        <div>
                            <h2>Halo, Justin Jap</h2>
                            <p>Anda telah berhasil membantu anak-anak sebanyak <h6>6 Kali</h6></p>
                            <p>Anda telah berhasil membantu anak-anak sebanyak <h6>6 Kali</h6></p>
                        </div>
                    </div>
                </div>
                <div className='px-6'>
                    <h2>Yuk, mari kita bantu anak-anak! Klik salah satu anak untuk membantu</h2>
                    <div className="grid grid-cols-2 gap-5">
                        <RecipientCard></RecipientCard>
                        <RecipientCard></RecipientCard>
                        <RecipientCard></RecipientCard>
                        <RecipientCard></RecipientCard>
                    </div>
                </div>
                <section id="bottom-navigation" className="block sticky inset-x-0 bottom-0 z-10 bg-white shadow">
                    <div id="tabs" className="flex justify-between">
                        <a href="#"
                           className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
                            <svg width="25" height="25" viewBox="0 0 42 42" className="inline-block mb-1">
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <path
                                        d="M21.0847458,3.38674884 C17.8305085,7.08474576 17.8305085,10.7827427 21.0847458,14.4807396 C24.3389831,18.1787365 24.3389831,22.5701079 21.0847458,27.6548536 L21.0847458,42 L8.06779661,41.3066256 L6,38.5331279 L6,26.2681048 L6,17.2542373 L8.88135593,12.4006163 L21.0847458,2 L21.0847458,3.38674884 Z"
                                        fill="currentColor" fill-opacity="0.1"></path>
                                    <path
                                        d="M11,8 L33,8 L11,8 Z M39,17 L39,36 C39,39.3137085 36.3137085,42 33,42 L11,42 C7.6862915,42 5,39.3137085 5,36 L5,17 L7,17 L7,36 C7,38.209139 8.790861,40 11,40 L33,40 C35.209139,40 37,38.209139 37,36 L37,17 L39,17 Z"
                                        fill="currentColor"></path>
                                    <path
                                        d="M22,27 C25.3137085,27 28,29.6862915 28,33 L28,41 L16,41 L16,33 C16,29.6862915 18.6862915,27 22,27 Z"
                                        stroke="currentColor" stroke-width="2" fill="currentColor"
                                        fill-opacity="0.1"></path>
                                    <rect fill="currentColor"
                                          transform="translate(32.000000, 11.313708) scale(-1, 1) rotate(-45.000000) translate(-32.000000, -11.313708) "
                                          x="17" y="10.3137085" width="30" height="2" rx="1"></rect>
                                    <rect fill="currentColor"
                                          transform="translate(12.000000, 11.313708) rotate(-45.000000) translate(-12.000000, -11.313708) "
                                          x="-3" y="10.3137085" width="30" height="2" rx="1"></rect>
                                </g>
                            </svg>
                            <span className="tab tab-home block text-xs">Home</span>
                        </a>
                        <a href="#"
                           className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
                            <svg width="25" height="25" viewBox="0 0 42 42" className="inline-block mb-1">
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <path
                                        d="M14.7118754,20.0876892 L8.03575361,20.0876892 C5.82661462,20.0876892 4.03575361,18.2968282 4.03575361,16.0876892 L4.03575361,12.031922 C4.03575361,8.1480343 6.79157254,4.90780265 10.4544842,4.15995321 C8.87553278,8.5612583 8.1226025,14.3600511 10.9452499,15.5413938 C13.710306,16.6986332 14.5947501,18.3118357 14.7118754,20.0876892 Z M14.2420017,23.8186831 C13.515543,27.1052019 12.7414284,30.2811559 18.0438552,31.7330419 L18.0438552,33.4450645 C18.0438552,35.6542035 16.2529942,37.4450645 14.0438552,37.4450645 L9.90612103,37.4450645 C6.14196811,37.4450645 3.09051926,34.3936157 3.09051926,30.6294627 L3.09051926,27.813861 C3.09051926,25.604722 4.88138026,23.813861 7.09051926,23.813861 L14.0438552,23.813861 C14.1102948,23.813861 14.1763561,23.8154808 14.2420017,23.8186831 Z M20.7553776,32.160536 C23.9336213,32.1190063 23.9061943,29.4103976 33.8698747,31.1666916 C34.7935223,31.3295026 35.9925894,31.0627305 37.3154077,30.4407183 C37.09778,34.8980343 33.4149547,38.4450645 28.9036761,38.4450645 C24.9909035,38.4450645 21.701346,35.7767637 20.7553776,32.160536 Z"
                                        fill="currentColor" opacity="0.1"></path>
                                    <g transform="translate(2.000000, 3.000000)">
                                        <path
                                            d="M8.5,1 C4.35786438,1 1,4.35786438 1,8.5 L1,13 C1,14.6568542 2.34314575,16 4,16 L13,16 C14.6568542,16 16,14.6568542 16,13 L16,4 C16,2.34314575 14.6568542,1 13,1 L8.5,1 Z"
                                            stroke="currentColor" stroke-width="2"></path>
                                        <path
                                            d="M4,20 C2.34314575,20 1,21.3431458 1,23 L1,27.5 C1,31.6421356 4.35786438,35 8.5,35 L13,35 C14.6568542,35 16,33.6568542 16,32 L16,23 C16,21.3431458 14.6568542,20 13,20 L4,20 Z"
                                            stroke="currentColor" stroke-width="2"></path>
                                        <path
                                            d="M23,1 C21.3431458,1 20,2.34314575 20,4 L20,13 C20,14.6568542 21.3431458,16 23,16 L32,16 C33.6568542,16 35,14.6568542 35,13 L35,8.5 C35,4.35786438 31.6421356,1 27.5,1 L23,1 Z"
                                            stroke="currentColor" stroke-width="2"></path>
                                        <path
                                            d="M34.5825451,33.4769886 L38.3146092,33.4322291 C38.8602707,33.4256848 39.3079219,33.8627257 39.3144662,34.4083873 C39.3145136,34.4123369 39.3145372,34.4162868 39.3145372,34.4202367 L39.3145372,34.432158 C39.3145372,34.9797651 38.8740974,35.425519 38.3265296,35.4320861 L34.5944655,35.4768456 C34.048804,35.4833899 33.6011528,35.046349 33.5946085,34.5006874 C33.5945611,34.4967378 33.5945375,34.4927879 33.5945375,34.488838 L33.5945375,34.4769167 C33.5945375,33.9293096 34.0349773,33.4835557 34.5825451,33.4769886 Z"
                                            fill="currentColor"
                                            transform="translate(36.454537, 34.454537) rotate(-315.000000) translate(-36.454537, -34.454537) "></path>
                                        <circle stroke="currentColor" stroke-width="2" cx="27.5" cy="27.5"
                                                r="7.5"></circle>
                                    </g>
                                </g>
                            </svg>
                            <span className="tab tab-whishlist block text-xs">Whishlist</span>
                        </a>
                        <a href='#'
                           className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
                            <svg width="25" height="25" viewBox="0 0 42 42" className="inline-block mb-1">
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <path
                                        d="M14.7118754,20.0876892 L8.03575361,20.0876892 C5.82661462,20.0876892 4.03575361,18.2968282 4.03575361,16.0876892 L4.03575361,12.031922 C4.03575361,8.1480343 6.79157254,4.90780265 10.4544842,4.15995321 C8.87553278,8.5612583 8.1226025,14.3600511 10.9452499,15.5413938 C13.710306,16.6986332 14.5947501,18.3118357 14.7118754,20.0876892 Z M14.2420017,23.8186831 C13.515543,27.1052019 12.7414284,30.2811559 18.0438552,31.7330419 L18.0438552,33.4450645 C18.0438552,35.6542035 16.2529942,37.4450645 14.0438552,37.4450645 L9.90612103,37.4450645 C6.14196811,37.4450645 3.09051926,34.3936157 3.09051926,30.6294627 L3.09051926,27.813861 C3.09051926,25.604722 4.88138026,23.813861 7.09051926,23.813861 L14.0438552,23.813861 C14.1102948,23.813861 14.1763561,23.8154808 14.2420017,23.8186831 Z M20.7553776,32.160536 C23.9336213,32.1190063 23.9061943,29.4103976 33.8698747,31.1666916 C34.7935223,31.3295026 35.9925894,31.0627305 37.3154077,30.4407183 C37.09778,34.8980343 33.4149547,38.4450645 28.9036761,38.4450645 C24.9909035,38.4450645 21.701346,35.7767637 20.7553776,32.160536 Z"
                                        fill="currentColor" opacity="0.1"></path>
                                    <g transform="translate(2.000000, 3.000000)">
                                        <path
                                            d="M8.5,1 C4.35786438,1 1,4.35786438 1,8.5 L1,13 C1,14.6568542 2.34314575,16 4,16 L13,16 C14.6568542,16 16,14.6568542 16,13 L16,4 C16,2.34314575 14.6568542,1 13,1 L8.5,1 Z"
                                            stroke="currentColor" stroke-width="2"></path>
                                        <path
                                            d="M4,20 C2.34314575,20 1,21.3431458 1,23 L1,27.5 C1,31.6421356 4.35786438,35 8.5,35 L13,35 C14.6568542,35 16,33.6568542 16,32 L16,23 C16,21.3431458 14.6568542,20 13,20 L4,20 Z"
                                            stroke="currentColor" stroke-width="2"></path>
                                        <path
                                            d="M23,1 C21.3431458,1 20,2.34314575 20,4 L20,13 C20,14.6568542 21.3431458,16 23,16 L32,16 C33.6568542,16 35,14.6568542 35,13 L35,8.5 C35,4.35786438 31.6421356,1 27.5,1 L23,1 Z"
                                            stroke="currentColor" stroke-width="2"></path>
                                        <path
                                            d="M34.5825451,33.4769886 L38.3146092,33.4322291 C38.8602707,33.4256848 39.3079219,33.8627257 39.3144662,34.4083873 C39.3145136,34.4123369 39.3145372,34.4162868 39.3145372,34.4202367 L39.3145372,34.432158 C39.3145372,34.9797651 38.8740974,35.425519 38.3265296,35.4320861 L34.5944655,35.4768456 C34.048804,35.4833899 33.6011528,35.046349 33.5946085,34.5006874 C33.5945611,34.4967378 33.5945375,34.4927879 33.5945375,34.488838 L33.5945375,34.4769167 C33.5945375,33.9293096 34.0349773,33.4835557 34.5825451,33.4769886 Z"
                                            fill="currentColor"
                                            transform="translate(36.454537, 34.454537) rotate(-315.000000) translate(-36.454537, -34.454537) "></path>
                                        <circle stroke="currentColor" stroke-width="2" cx="27.5" cy="27.5"
                                                r="7.5"></circle>
                                    </g>
                                </g>
                            </svg>
                            <span className="tab tab-account block text-xs">Account</span>
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
