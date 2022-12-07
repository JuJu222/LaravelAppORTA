import React from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from "@inertiajs/inertia-react";
import RecipientCardAdmin from "@/Components/RecipientCardAdmin";

export default function Recipients(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Atur Penerima Dana</h2>}
        >
            <Link href={route("recipients.create")}>
                <button className="w-full mb-2 bg-red transition duration-150 ease-in-out focus:outline-none
                hover:bg-red_hover rounded text-white px-6 py-4 text-sm font-bold">Tambah Penerima Dana</button>
            </Link>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                {props.recipients.map((recipient, i) =>
                    <RecipientCardAdmin key={i} recipient={recipient}/>
                )}
            </div>
        </Authenticated>
    );
}
