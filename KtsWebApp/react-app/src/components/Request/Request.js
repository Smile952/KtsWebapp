import './Request.css'
import './RadioButtons.css'
import { Button } from '../Button/Button.js'
import { synchronizeToken } from "../../common/synchronizeToken.js";
function sendData(formData) {
    const token = localStorage.getItem('token')
    fetch('https://localhost:8080/api/orders', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            devType: formData.get('devType'),
            text: formData.get('text')
        })
    })
        .then(response => {
            if (response.status === 401) {
                // Перенаправляем на страницу Unauthorized
                window.location.href = '/unauthorized'; // или ваш путь к UnauthorizedPage.jsx
                return Promise.reject('Unauthorized');
            }
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Обработка успешного ответа
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
            // Дополнительная обработка других ошибок
        });
}

const token = localStorage.getItem('token')
synchronizeToken(token)
export function Request() {
    return (
        <div className="request">
            <div className="title-request mb-3">
                <h1 className="title-request-text">Оставьте заявку</h1>
            </div>
            <form id="form" className='mb-3' action={sendData}>
                <div className="radio-buttons">
                    <fieldset>
                        <div className="form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="devType"
                                value="1"
                                id="radioWebSites"
                            />
                            <label className="form-check-label" htmlFor="radioWebSites" value="1">Web sites</label>
                        </div>
                        <div className="form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="devType"
                                value="2"
                                id="AI"
                            />
                            <label className="form-check-label" htmlFor="AI" >Android/iOS</label>
                        </div>
                        <div className="form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="devType"
                                value="3"
                                id="DevOps"
                            />
                            <label className="form-check-label" htmlFor="DevOps">DevOps</label>
                        </div>
                    </fieldset>
                </div>
                <div className="back-block-request">
                    <div className="text-field-request">
                        <input
                            type='text'
                            className='text-field-request-text'
                            name="text"
                        />
                    </div>
                    <Button />
                </div>
            </form>
        </div>
    )
}