import { createAuthAxiosInstance } from '../api';

const resendVerificationEmail = () => {
    return createAuthAxiosInstance().post(`email/resend-verification`);
}

export default resendVerificationEmail;