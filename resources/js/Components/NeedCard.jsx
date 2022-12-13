import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function NeedCard() {
    return (
        <nav id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-red shadow">
            <div id="tabs" className="flex justify-between">
                <Link href="/home"
                   className="w-full focus:text-gray-200 hover:text-gray-200 transition text-white justify-center inline-block text-center pt-2 pb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                         className="bi bi-house-door-fill inline-block mb-1" viewBox="0 0 16 16">
                        <path
                            d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/>
                    </svg>
                    <span className="tab tab-home block text-xs font-bold">Home</span>
                </Link>
                <Link href="#"
                   className="w-full focus:text-gray-200 hover:text-gray-200 transition text-white justify-center inline-block text-center pt-2 pb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                         className="bi bi-list-ul inline-block mb-1" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                              d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                    </svg>
                    <span className="tab tab-whishlist block text-xs font-bold">Whishlist</span>
                </Link>
                <Link href='/profile'
                   className="w-full focus:text-gray-200 hover:text-gray-200 transition text-white justify-center inline-block text-center pt-2 pb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                         className="bi bi-person-circle inline-block mb-1" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path fill-rule="evenodd"
                              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                    <span className="tab tab-account block text-xs font-bold">Account</span>
                </Link>
            </div>
        </nav>
    );
}
