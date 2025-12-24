import { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import './Buttons.css'
import { apiControllers } from 'common/Constants/addr'

interface ButtonsProps {
    type: [string, string | number]
}

export function Buttons({ type }: ButtonsProps) {
    const navigate = useNavigate()

    const deleteClick = async () => {
        try {
            await fetch(`${apiControllers.UsersController}/${type[0]}/${type[1]}`, { method: 'DELETE' })
            navigate('/')
        } catch (Exception) {
            console.log(Exception)
        }
    }

    const updateClick = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const form = event.currentTarget
        const formData = new FormData(form)

        const formDataObject: Record<string, string> = {}
        formData.forEach((value, key) => {
            formDataObject[key] = value.toString()
        })

        if (formDataObject['RegistrationDate']) {
            formDataObject['RegistrationDate'] = new Date(formDataObject['RegistrationDate']).toISOString()
        }

        try {
            const response = await fetch(form.action, {
                method: form.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataObject),
            })
            const data = await response.json()
            console.log('Success:', data)
            navigate('/')
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <div className="button">
            <div className="delete-button" onClick={deleteClick}>
                Delete
            </div>
            <div className="update-block">
                <form
                    id="form"
                    className="update-block-form"
                    onSubmit={updateClick}
                    method="post"
                    action={`${apiControllers.UsersController}/${type[0]}/${type[1]}`}
                    encType="application/json"
                >
                    <div>
                        <input className="update-button" type="submit" value="Update" />
                    </div>
                    <div>
                        <span className="update-block-title">Обновляемые данные</span>
                    </div>
                    <div className="mb-3">
                        <input className="update-block-data form-control" type="text" name="Name" placeholder="Имя" />
                    </div>
                    <div className="mb-3">
                        <input className="update-block-data form-control" type="text" name="Email" placeholder="Email" />
                    </div>
                    <div className="mb-3">
                        <input
                            className="update-block-data form-control"
                            type="number"
                            name="Age"
                            step={1}
                            min={1}
                            max={100}
                            defaultValue={10}
                            id="age"
                        />
                    </div>
                    <div className="mb-3">
                        <input className="update-block-data form-control" type="date" name="RegistrationDate" />
                    </div>
                </form>
            </div>
        </div>
    )
}
