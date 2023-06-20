import React, {useState} from "react";
import {Link} from "@inertiajs/inertia-react";
import ApplicationLogo from "@/Components/ApplicationLogo";

function Welcome() {
    const [menu, setMenu] = useState(false);
    return (
        <>
            <div className="relative w-full h-full pb-10">
                <nav className="lg:hidden relative z-50">
                    <div className="flex py-2 justify-between items-center px-4">
                        <div>
                            <ApplicationLogo white={false} className="w-12 h-12" />
                        </div>
                        <div className="visible flex items-center">
                            <Link href={route('login')} className="px-6 py-3 bg-red hover:bg-red_hover text-white text-base font-medium rounded-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red">
                                Masuk
                                <img className="ml-4" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/large_typography_with_gradient_and_glass_effect_Svg5.svg" alt="arrow" />
                            </Link>
                        </div>
                    </div>
                </nav>
                <nav className="f-f-l relative z-10">
                    <div className="relative z-10 mx-auto hidden w-full px-4 xl:px-0 lg:flex justify-between items-center py-11 max-w-5xl">
                        <div>
                            <ApplicationLogo white={false} className="w-14 h-14" />
                        </div>
                        <div className="flex items-center text-white text-base font-medium">
                            <Link href={route('login')} className="px-6 py-3 bg-red hover:bg-red_hover text-white text-base font-medium rounded-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red">
                                Masuk
                                <img className="ml-4" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/large_typography_with_gradient_and_glass_effect_Svg5.svg" alt="arrow" />
                            </Link>
                        </div>
                    </div>
                </nav>
                <div className="relative px-4 xl:px-0 container mx-auto md:flex items-center justify-center gap-8">
                    <div className="text-color w-full md:w-1/2 xl:w-1/3 pt-16 lg:pt-32 xl:pt-12">
                        <div className='bg-red p-5 py-10 rounded-lg shadow-lg'>
                            <h1 className="text-4xl md:text-4xl lg:text-6xl w-11/12 lg:w-11/12 xl:w-full xl:text-6xl text-white font-extrabold f-f-l">Yuk, mulailah segala sesuatu dengan cinta</h1>
                        </div>
                        <div className="f-f-r text-base lg:text-base pb-4 sm:pb-0 pt-10 xl:pt-6">
                            <h2>ORTA Indonesia adalah layanan terbaik untuk membantu anak-anak Indonesia.</h2>
                        </div>
                        <div className="lg:flex">
                            <Link href={route('register')} className="hidden text-center md:block hover:opacity-90 text-base w-full xl:text-base xl:w-6/12 mt-4 xl:mt-8 f-f-r py-4 bg-red text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red rounded-lg">Daftar Sekarang</Link>
                            <Link href={route('login')} className="hidden text-center md:block hover:opacity-90 text-base w-full xl:text-base xl:w-4/12 lg:ml-2 xl:ml-2 mt-4 xl:mt-8 f-f-r py-4 bg-light_pink text-red font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red rounded-lg">Masuk</Link>
                        </div>
                    </div>
                    <img className="rounded-lg w-full mt-4 md:mt-0 object-fill md:w-1/2 xl:w-1/3 md:-ml-4 lg:-ml-4 xl:ml-0" src="/img/landing.png" alt="sample page" role="img" />
                    <Link href={route('register')} className="md:hidden block text-center hover:opacity-90 text-base w-full xl:text-base xl:w-6/12 mt-4 xl:mt-8 f-f-r py-4 bg-red text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red rounded-lg">Daftar Sekarang</Link>
                    <Link href={route('login')} className="md:hidden block text-center hover:opacity-90 text-base w-full xl:text-base xl:w-4/12 xl:ml-2 mt-4 xl:mt-8 f-f-r py-4 bg-light_pink text-red font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red rounded-lg">Masuk</Link>
                </div>
            </div>


            <style>{`
        .top-100 {
            animation: slideDown .5s ease-in-out;
        }

        @keyframes slideDown {
            0% {
                top: -50%;
            }

            100% {
                top: 0;
            }
        }

        * {
            outline: none !important;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            -webkit-tap-highlight-color: transparent;
        } `}</style>
        </>
    );
}

export default Welcome;
