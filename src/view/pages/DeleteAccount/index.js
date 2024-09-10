import React from 'react';
import InfoText from '../../components/InfoText';
import { useParams } from 'react-router-dom';

export default function DeleteAccount({ setUser }) {
    const { result } = useParams();
    let message = '';

    switch (result) {
        case 'successful':
            localStorage.removeItem('user');
            setUser(null);
            message = 'Your account has been successfully deleted';
            break;
        case 'invalid':
            message = 'Invalid or expired token';
            break;
        case 'error':
            message = 'Something went wrong';
            break;
        default:
            message = 'Error 404 : Not Found';
            break;
    }

    return <InfoText>{message}</InfoText>;
}