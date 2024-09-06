import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import resendVerificationEmail from '../../../helpers/apiRequests/resendVerificationEmail';
import Loading from '../../components/Loading';
import displayErrors from '../../../helpers/common/displayErrors';
import getUser from '../../../helpers/apiRequests/getUser';
import InfoText from '../../components/InfoText';

export default function Verification({ user, setUser }) {
    let { action } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        switch (action) {
            case 'verified':
                if (user) {
                    getUser()
                        .then((response) => {
                            const updatedUser = response.data;

                            const localStorageUserData = JSON.parse(localStorage.getItem('user'));
                            localStorageUserData.user = updatedUser;
                            localStorage.setItem('user', JSON.stringify(localStorageUserData));

                            setUser(updatedUser);
                        })

                }
                setMessage('Thanks! The email has been verified!');
                break;

            case 'resend':
                if (user) {
                    setIsLoading(true);
                    resendVerificationEmail()
                        .then((response) => {
                            setMessage(response.data.message);
                        })
                        .catch((error) => {
                            displayErrors(error.response.data);
                        })
                        .finally(() => {
                            setIsLoading(false);
                        });
                }
                break;

            case 'already-verified':
                setMessage('The email is already verified');
                break;
            case 'invalid':
                setMessage('Invalid verification link');
                break;
            default:
                setMessage('Error 404 : Not Found');
                break;
        }
    }, [action]);

    return (
        <>
            <InfoText>{message}</InfoText>
            {isLoading && <Loading />}
        </>
    )
}