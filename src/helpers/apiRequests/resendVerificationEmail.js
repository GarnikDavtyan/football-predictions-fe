import createAxiosInstance from '../api';

const resendVerificationEmail = () => {
    return createAxiosInstance().post(`email/resend-verification`);
}

export default resendVerificationEmail;