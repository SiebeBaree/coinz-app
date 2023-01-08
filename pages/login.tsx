import { useEffect } from 'react';

export default function Login() {
    useEffect(() => {
        fetch('http://localhost:3001/api/discord/login', {
            method: 'GET',
            mode: 'no-cors',
        })
            .then((res) => {
                console.log(res);
            });
    });

    return (<></>);
}