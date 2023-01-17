export default function InputError({ message, className = '' }) {
    return message ? <p className={'text-sm text-red ' + className}>{message}</p> : null;
}
