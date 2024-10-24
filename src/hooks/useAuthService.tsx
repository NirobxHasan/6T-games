import CryptoJS from 'crypto-js';
import { useEffect, useState } from 'react';
import { loginApi, signupApi } from '../services/httpRequest';
const useAuthService = () => {
    const [user, setUser] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [duplicate, setDuplicate] = useState<string>('');
    const [successSignup, setSuccessSignup] = useState<string>('');
    const [forgetMsg, setForgetMsg] = useState<string>('');
    const [loginError, setLoginError] = useState<string>('');

    //Singup
    // 8801837098850
    // "status": "signup",
    // "message": "Thank you for signing up for Gamehub service. Please check your SMS inbox for Password",
    // "user_msg": "Thank+you+for+signing+up+for+Gamehub+service.+Your+Password+is+076005",
    // "sms_send_status": "INVALID PARAMETER"

    const signup = (phoneNumber: string) => {
        setDuplicate('');
        setSuccessSignup('');
        setLoginError('');
        if (phoneNumber.length !== 11) {
            setLoginError('Size of mobile number should be 11');
            return;
        }
        const formdata = {
            msisdn: `88${phoneNumber}`,
            retrieve: 0
        };

        signupApi(formdata)
            .then((res) => {
                // console.log(res);
                if (res?.data.data?.status === 'signup') {
                    setSuccessSignup(res?.data?.data.message);
                } else if (res.data.data.status === 'duplicate') {
                    setDuplicate(res.data.data.message);
                }
            })
            .then(function (error) {
                if (error !== undefined) {
                    setLoginError('Something went wrong');
                }
            });
    };
    const forgate = (phoneNumber: string) => {
        setDuplicate('');
        setSuccessSignup('');
        setLoginError('');
        if (phoneNumber.length !== 11) {
            setLoginError('Size of mobile number should be 11');
            return;
        }
        const formdata = {
            msisdn: `88${phoneNumber}`,
            retrieve: 1
        };

        signupApi(formdata)
            .then((res) => {
                // console.log(res);
                if (res?.data?.data?.status === 'forget') {
                    setSuccessSignup(res?.data.data?.message);
                } else {
                    setLoginError('Something went wrong');
                }
            })
            .then(function (error) {
                if (error !== undefined) {
                    setLoginError('Something went wrong');
                }
            });
    };

    //Login
    const login = (
        phoneNumber: string,
        password: string,
        navigate: any,
        location: any
    ) => {
        setLoginError('');

        if (phoneNumber.length !== 11) {
            setLoginError('Size of mobile number should be 11');
            return;
        }
        const bodyFormData = {
            msisdn: `88${phoneNumber}`,
            password: password,
            haspin: 'no'
        };

        setIsLoading(true);

        loginApi(bodyFormData)
            .then((res) => {
                console.log(res);
                if (res.data.data.result === 'success') {
                    const ciphertext = CryptoJS.AES.encrypt(
                        JSON.stringify(res.data.data),
                        'secret key 123'
                    ).toString();

                    localStorage.setItem('user', ciphertext);
                    setUser(res.data.data);

                    navigate(-1);
                } else if (res.data.data.result === 'fail') {
                    setLoginError('Your number or password is incorrect!!!');
                }
                setIsLoading(false);
                return;
            })
            .then(function (error) {
                if (error !== undefined) {
                    setLoginError('Something went wrong');
                }
            });
    };

    const logout = () => {
        setIsLoading(true);
        setUser({});
        localStorage.removeItem('user');
        setIsLoading(false);
    };
    const getCurrentUser = () => {
        const ciphertext = localStorage.getItem('user');
        if (ciphertext) {
            const bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return decryptedData;
        }
    };

    const userSubscriptionChange = (packcode: string) => {
        const user = getCurrentUser();
        user.packcode = packcode;

        const ciphertext = CryptoJS.AES.encrypt(
            JSON.stringify(user),
            'secret key 123'
        ).toString();
        localStorage.removeItem('user');
        localStorage.setItem('user', ciphertext);
    };

    const loginAgain = () => {
        const user = getCurrentUser();
        if (user?.msisdn) {
            const bodyFormData = {
                msisdn: user?.msisdn,
                haspin: 'yes'
            };

            loginApi(bodyFormData).then((res) => {
                if (res?.data?.data?.result === 'success') {
                    // console.log(res.data);
                    localStorage.removeItem('user');
                    const ciphertext = CryptoJS.AES.encrypt(
                        JSON.stringify(res?.data.data),
                        'secret key 123'
                    ).toString();
                    // setUser(res.data);
                    localStorage.setItem('user', ciphertext);
                    // setUser(res.data);
                }

                return;
            });
        }
    };

    useEffect(() => {
        setIsLoading(true);
        const userval = getCurrentUser();
        if (userval) {
            setUser(userval);
        }
        setIsLoading(false);
    }, [user?.packcode]);

    const allMsgStateClear = () => {
        setLoginError('');
        setDuplicate('');
        setSuccessSignup('');
    };

    return {
        user,
        isLoading,
        loginError,
        successSignup,
        duplicate,
        signup,
        forgate,
        login,
        logout,
        allMsgStateClear,
        userSubscriptionChange,
        loginAgain
    };
};
export default useAuthService;
