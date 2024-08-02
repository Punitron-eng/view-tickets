import config from '@/util/config';
export const getUser = async (email: string, password: string) => {
    // if (localStorage.getItem('accessToken') === '' || localStorage.getItem('accessToken') == 'undefined' || localStorage.getItem('accessToken') == null)
    // {
    //     const md5 = require('md5')
    //     const EncryptPassword = md5(password)
    //     const LoginForm = new FormData()
    //     LoginForm.append('email', email)
    //     LoginForm.append('password', EncryptPassword)
    //     fetch('http://localhost/itl-outbound/itl-outbound-app/user/login', {
    //         method: 'POST',
    //         body: LoginForm
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //       localStorage.setItem('accessToken', data.request_token)
    //     })
    //     .catch(err => console.log(err.message))
    // }

    try {
        const LoginForm = new FormData();
        LoginForm.append('email', email);
        LoginForm.append('password', password);
        const response = await fetch(config.baseUrlApi + 'user/login', {
            method: 'POST',
            body: LoginForm,
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};
