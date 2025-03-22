import './Request.css'
import './RadioButtons.css'
import { Button } from '../Button/Button.js'

export function Request() {
    return (
        <div className="request">
            <div className="title-request mb-3">
                <h1 className="title-request-text">Оставьте заявку</h1>
            </div>
            <form className='mb-3'>
                <div className="radio-buttons">
                    <fieldset>
                        <div className="form-check-inline">
                            <input className="form-check-input" type="radio" name="DevType" value="1" id="radioWebSites" />
                            <label className="form-check-label" htmlFor="radioWebSites">Web sites</label>
                        </div>
                        <div className="form-check-inline">
                            <input className="form-check-input" type="radio" name="DevType" value="2" id="AI" />
                            <label className="form-check-label" htmlFor="AI">Android/iOS</label>
                        </div>
                        <div className="form-check-inline">
                            <input className="form-check-input" type="radio" name="DevType" value="3" id="DevOps" />
                            <label className="form-check-label" htmlFor="DevOps">DevOps</label>
                        </div>
                    </fieldset>
                </div>
                <div className="back-block-request">
                    <div className="text-field-request">
                        <input type='text' className='text-field-request-text'></input>
                    </div>
                    <Button />
                </div>
            </form>
        </div>
    )
}