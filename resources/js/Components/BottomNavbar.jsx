import React from 'react';
import {Link} from '@inertiajs/inertia-react';

export default function BottomNavbar({ auth }) {
    if (auth.user.role_id !== 1) {
        return (
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
                    <Link href="/donasi"
                          className="w-full focus:text-gray-200 hover:text-gray-200 transition text-white justify-center inline-block text-center pt-2 pb-1">
                        <svg className="bi bi-list-ul inline-block mb-1" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.6667 0.083313C12.7917 0.083313 10.4584 2.41665 10.4584 5.29165C10.4584 8.16665 12.7917 10.5 15.6667 10.5C18.5417 10.5 20.8751 8.16665 20.8751 5.29165C20.8751 2.41665 18.5417 0.083313 15.6667 0.083313ZM15.6667 8.41665C13.9376 8.41665 12.5417 7.02081 12.5417 5.29165C12.5417 3.56248 13.9376 2.16665 15.6667 2.16665C17.3959 2.16665 18.7917 3.56248 18.7917 5.29165C18.7917 7.02081 17.3959 8.41665 15.6667 8.41665ZM18.7917 14.6666H16.7084C16.7084 13.4166 15.9272 12.2916 14.7605 11.8541L8.34383 9.45831H0.041748V20.9166H6.29175V19.4166L13.5834 21.4375L21.9167 18.8333V17.7916C21.9167 16.0625 20.5209 14.6666 18.7917 14.6666ZM4.20841 18.8333H2.12508V11.5416H4.20841V18.8333ZM13.5522 19.2604L6.29175 17.2708V11.5416H7.96883L14.0313 13.8021C14.3855 13.9375 14.6251 14.2812 14.6251 14.6666C14.6251 14.6666 12.5417 14.6146 12.2292 14.5104L9.75008 13.6875L9.09383 15.6666L11.573 16.4896C12.1042 16.6666 12.6563 16.75 13.2188 16.75H18.7917C19.198 16.75 19.5626 17 19.7292 17.3437L13.5522 19.2604Z" fill="white"/>
                        </svg>

                        <span className="tab tab-whishlist block text-xs">Donasi</span>
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
        );
    } else {
        return (
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
        );
    }
}
