import React from 'react';
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from "@inertiajs/inertia-react";

export default function RecipientsShow(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Recipients</h2>}
        >
            <h2>Name: {props.recipient.name}</h2>
            <h2>NIK: {props.recipient.nik}</h2>
            <h2>Gender: {props.recipient.gender}</h2>
            <h2>Birthplace: {props.recipient.birthplace}</h2>
            <h2>Birthdate: {props.recipient.birthdate}</h2>
            <h2>School: {props.recipient.school}</h2>
            <h2>Class: {props.recipient.class}</h2>
            <h2>Siblings: {props.recipient.siblings}</h2>
            <h2>Child No: {props.recipient.child_no}</h2>
            <h2>Address: {props.recipient.address}</h2>
            <h2>City: {props.recipient.city}</h2>
            <h2>Phone: {props.recipient.phone}</h2>
            <h2>Parent ID: {props.recipient.parent_id}</h2>
            <h2>Birth Certificate: {props.recipient.birth_certificate}</h2>
            <h2>Kartu Keluarga: {props.recipient.kartu_keluarga}</h2>
            <h2>Note: {props.recipient.note}</h2>
            <h2>Is Active: {props.recipient.is_active}</h2>
        </Authenticated>
    );
}
