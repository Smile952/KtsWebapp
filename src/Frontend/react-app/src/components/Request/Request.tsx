import React from 'react';
import radioButtonsStyle from './RadioButtons.module.css'
import requestStyle from './Request.module.css'
import { apiControllers } from 'common/Constants/addr';
import { UserEntity } from 'common/Entityes/UserEntity/UserEntity';

async function sendData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData((event.currentTarget));
    const token = localStorage.getItem('token');

    const user = localStorage.getItem('user')
    const userData = JSON.parse(user as string) as UserEntity

    console.log(formData.get('text') as string)

    const payload = {
        UserId: userData.id,
        OrderTypeId: Number(formData.get('devType')),
        OrderContent: formData.get('text') as string,
        EmployeeId: 1
    };
    if(formData && token){
        try{
            const response = await fetch(`${apiControllers.OrdersController}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error.message || `Ошибка ${response.status}`);
            }

            const data = await response.json();
            console.log('Успешно!', data);
            alert('Заявка отправлена!');
        }
        catch(err){
            console.error(err);
        }
    }
}
export function Request() {
    return (
        <div className={requestStyle.request}>
            <div className={`${requestStyle.title_request} mb-3`}>
                <h1 className={requestStyle.title_request_text}>Оставьте заявку</h1>
            </div>
            <form id="form" className="mb-3" onSubmit={sendData}>
                <div className={requestStyle.radio_buttons}>
                    <fieldset>
                        <div className={radioButtonsStyle.form_check_inline}>
                            <input
                                className={radioButtonsStyle.form_check_input}
                                type="radio"
                                name="devType"
                                value="1"
                                id="radioWebSites"
                            />
                            <label className={radioButtonsStyle.form_check_label} htmlFor="radioWebSites">
                                Web sites
                            </label>
                        </div>
                        <div className={radioButtonsStyle.form_check_inline}>
                            <input
                                className={radioButtonsStyle.form_check_input}
                                type="radio"
                                name="devType"
                                value="2"
                                id="AI"
                            />
                            <label className={radioButtonsStyle.form_check_label} htmlFor="AI">
                                Android/iOS
                            </label>
                        </div>
                        <div className={radioButtonsStyle.form_check_inline}>
                            <input
                                className={radioButtonsStyle.form_check_input}
                                type="radio"
                                name="devType"
                                value="3"
                                id="DevOps"
                            />
                            <label className={radioButtonsStyle.form_check_label} htmlFor="DevOps">
                                DevOps
                            </label>
                        </div>
                    </fieldset>
                </div>
                <div className={requestStyle.back_block_request}>
                    <div className={requestStyle.text_field_request}>
                        <input
                            type="text"
                            className={requestStyle.text_field_request_text}
                            name="text"
                            required
                        />
                    </div>
                    <div className={requestStyle.button_request}>
                        <input type="submit" className={`${requestStyle.btn} btn btn-outline-success`} />
                    </div>
                </div>
            </form>
        </div>
    );
}
