import { Button } from '../Button/Button'
import './Auth.css'

export function Auth() {
    return (
        <div className='autorization'>
            <div className="autorization-back">
                <div className="autorization-form-block">
                    <form className='autorization-form'>
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