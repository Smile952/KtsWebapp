import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Services.css';
import { rout } from 'common/addr';

interface Block {
    id: number;
    title: string;
    description: string;
    photo: string;
}

interface ImagesDataItem {
    ImageURL: string;
}

interface ImagesResponse {
    ImagesData: ImagesDataItem[];
}

export function Services() {
    const [blocks, setBlocks] = useState<Block[]>([
        { id: 1, title: 'Web Разработка', description: 'Создание и разработка современных сайтов и приложений', photo: '/Images/WebDev/web-development.jpg' },
        { id: 2, title: 'Android/iOS', description: 'Разработка приложений для iOS и Android', photo: '/Images/Mobile/android.jpg' },
        { id: 3, title: 'DevOps и облако', description: 'Настройка инфраструктуры и автоматизация процессов', photo: 'Images/DevOps/devops.jpg' }
    ]);

    const nav = useNavigate();

    // useEffect(() => {
    //     getImagesNames()
    //         .then(result => {
    //             const updated = [...blocks];
    //             if (result?.ImagesData?.length >= 3) {
    //                 updated[1].photo = result.ImagesData[0].ImageURL;
    //                 updated[2].photo = result.ImagesData[1].ImageURL;
    //                 updated[0].photo = result.ImagesData[2].ImageURL;
    //                 // setBlocks(updated);
    //             }
    //         })
    //         .catch(error => console.log('Ошибка при получении изображений: ', error));
    // }, []);

    const handler = (id: number, block: Block) => {
        nav(`/about/${id}`, { state: block });
    };

    return (
        <div className='blocks'>
            <div className='blocks-group'>
                {blocks.map(block => (
                    <div key={block.id} onClick={() => handler(block.id, block)} className='back-blocks'>
                        <div className="front-blocks">
                            <div className='blocks-text'>
                                <div className="blocks-title">{block.title}</div>
                                <div className="blocks-description">{block.description}</div>
                                <div className="blocks-image">
                                    <img className="blocks-image-source" src={block.photo} alt={block.title} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

async function getImagesNames(): Promise<ImagesResponse> {
    const token = localStorage.getItem('token');
    const res = await fetch(rout + "/minio/images", {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch images');
    }

    const ans = await res.json();
    return ans;
}
