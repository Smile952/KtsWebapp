
import { Button } from '../Button/Button'
import './Auth.css'
import { getToken } from './login'

export function Auth() {

    const updateClick = async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        getToken(formDataObject)
            .then(tokenData => {
                localStorage.setItem('token', tokenData['token'])
                localStorage.setItem('role', tokenData['role'])
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div className='autorization'>
            <div className="autorization-back">
                <div className="autorization-form-block">
                    <form className='autorization-form' action='https://localhost:8080/api/users/token' method='post' onSubmit={updateClick}>
                        <div className='autorization-input-block'>
                            <input className="autorization-input " type="email" name="email" id="email" required placeholder="Email" />
                        </div>
                        <div className='autorization-input-block'>
                            <input className="autorization-input" type="password" name="password" id="password" required placeholder="Пароль" />
                        </div>
                        <Button />
                    </form>
                </div>
            </div>
        </div>
    )
}

// async function getToken(data) {
//     const result = await fetch("https://localhost:8080/api/users/token", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: data
//     })

//     if (!result.ok) return null
//     const res = await result.json()
//     return res
// }