import React from 'react';
import './Request.css';
import './RadioButtons.css';
import { Button } from '../Button/Button';
import { rout } from 'common/addr';

function sendData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData((event.currentTarget));
    const token = localStorage.getItem('token');

    fetch(rout + '/orders', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({
            devType: formData.get('devType'),
            text: formData.get('text'),
        }),
    })
        .then(response => {
            if (response.status === 401) {
                window.location.href = '/unauthorized';
                return Promise.reject('Unauthorized');
            }
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
export function Request() {
    return (
        <div className="request">
            <div className="title-request mb-3">
                <h1 className="title-request-text">Оставьте заявку</h1>
            </div>
            <form id="form" className="mb-3" onSubmit={sendData}>
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
                            <label className="form-check-label" htmlFor="radioWebSites">
                                Web sites
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="devType"
                                value="2"
                                id="AI"
                            />
                            <label className="form-check-label" htmlFor="AI">
                                Android/iOS
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="devType"
                                value="3"
                                id="DevOps"
                            />
                            <label className="form-check-label" htmlFor="DevOps">
                                DevOps
                            </label>
                        </div>
                    </fieldset>
                </div>
                <div className="back-block-request">
                    <div className="text-field-request">
                        <input
                            type="text"
                            className="text-field-request-text"
                            name="text"
                            required
                        />
                    </div>
                    <Button />
                </div>
            </form>
        </div>
    );
}
