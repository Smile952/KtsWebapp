import { useNavigate } from 'react-router-dom';
import './Buttons.css';

interface ButtonsProps {
    type: [string, string]; // [resource, id]
}

export function Buttons({ type }: ButtonsProps) {
    const navigate = useNavigate();

    const deleteClick = async () => {
        try {
            await fetch(`http://localhost:8080/api/${type[0]}/${type[1]}`, { method: 'DELETE' });
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="button">
            <div className="delete-button" onClick={deleteClick}>Delete</div>
            <div className="update-block">
                <form
                    id="form"
                    className="update-block-form"
                    method="post"
                    action={`http://localhost:8080/api/${type[0]}/${type[1]}`}
                >
                    <div>
                        <input className="update-button" type="submit" value="Update" />
                    </div>
                    <div>
                        <span className="update-block-title">Обновляемые данные</span>
                    </div>
                    <div className="mb-3">
                        <input
                            className="update-block-data form-control"
                            type="text"
                            name="Name"
                            placeholder="Имя"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            className="update-block-data form-control"
                            type="text"
                            name="Post"
                            placeholder="Должность"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
