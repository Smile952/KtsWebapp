import './Request.css'
import './RadioButtons.css'
import { Button } from '../Button/Button.js'

function sendData(formData) {
    fetch('https://localhost:8080/api/main/request', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            devType: formData.get('devType'),
            text: formData.get('text')
        })
    })

}


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