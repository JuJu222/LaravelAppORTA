import React from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from "@inertiajs/inertia-react";

export default function DonorsShow(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Donors</h2>}
        >
            <h2>Name: {props.donor.name}</h2>
            <h2>Name Alias: {props.donor.name_alias}</h2>
            <h2>KTP: {props.donor.ktp}</h2>
            <h2>Phone: {props.donor.phone}</h2>
            <h2>Email: {props.donor.email}</h2>
            <h2>Address: {props.donor.address}</h2>
            <h2>City: {props.donor.city}</h2>
            <h2>Note: {props.donor.note}</h2>
            <h2>Photo: {props.donor.photo}</h2>
        </Authenticated>
    );
}
