import { useNavigate } from 'react-router-dom'
import './Buttons.css'

export function Buttons({ type }) {
    const navigate = useNavigate()

    const deleteClick = () => {
        try {
            fetch(`https://localhost:8080/api/${type[0]}/${type[1]}`, { method: 'DELETE' })
            navigate("/")
        }
        catch (Exception) {
            console.log(Exception)
        }
    }

    const updateClick = (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        formDataObject['RegistrationDate'] = new Date(formDataObject['RegistrationDate'])
        console.log(formDataObject['RegistrationDate'])
        fetch(form.action, {
            method: form.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataObject),
        })
            .then(response => response.json())
            .then(data => {
                navigate('/')
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="button">
            <div className="delete-button" onClick={deleteClick}>Delete</div>
            <div className='update-block'>
                <form
                    id="form"
                    className='update-block-form'
                    onSubmit={updateClick}
                    method='post'
                    action={`https://localhost:8080/api/${type[0]}/${type[1]}`}
                    enctype="application/json">
                    <div>
                        <input className='update-button' type='submit' value="Update"></input>
                    </div>
                    <div>
                        <span className='update-block-title'>Обновляемые данные</span>
                    </div>
                    <div className='mb-3'>
                        <input className='update-block-data form-control' type="text" name='Name' placeholder='Имя'></input>
                    </div>
                    <div className='mb-3'>
                        <input className='update-block-data form-control' type='text' name='Email' placeholder='Email'></input>
                    </div>
                    <div className='mb-3'>
                        <input className='update-block-data form-control' type='number' name='Age' step="1" min="1" max="100" value="10" id="age"></input>
                    </div>
                    <div className='mb-3'>
                        <input
                            className='update-block-data form-control'
                            type='date'
                            name='RegistrationDate'
                        />
                    </div>

                </form>
            </div>
        </div>
    )
}