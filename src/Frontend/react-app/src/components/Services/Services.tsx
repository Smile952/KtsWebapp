import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from'./Services.module.css';
import { apiControllers } from 'common/addr';
import { useEffect } from 'react';
import { OrderServiceBlock } from 'common/Entityes/OrderEntity/OrderServiceBlock';



interface ImagesDataItem {
    ImageURL: string;
}

interface ImagesResponse {
    ImagesData: ImagesDataItem[];
}

export function Services() {
    const [blocks, setBlocks] = useState<OrderServiceBlock[]>([
        { id: 1, title: 'Web Разработка', description: 'Создание и разработка современных сайтов и приложений', photo: '/Images/WebDev/web-development.jpg' },
        { id: 2, title: 'Android/iOS', description: 'Разработка приложений для iOS и Android', photo: '/Images/Mobile/android.jpg' },
        { id: 3, title: 'DevOps и облако', description: 'Настройка инфраструктуры и автоматизация процессов', photo: 'Images/DevOps/devops.jpg' }
    ]);

    const nav = useNavigate();

    useEffect(() => {
        getImagesNames()
            .then(result => {
                const updated = [...blocks];
                if (result?.ImagesData?.length >= 3) {
                    updated[1].photo = result.ImagesData[0].ImageURL;
                    updated[2].photo = result.ImagesData[1].ImageURL;
                    updated[0].photo = result.ImagesData[2].ImageURL;
                }
            })
            .catch(error => console.log('Ошибка при получении изображений: ', error));
    }, [blocks]);

    const handler = (id: number, block: OrderServiceBlock) => {
        nav(`/about/${id}`, { state: block });
    };

    return (
        <div className={styles.blocks}>
            <div className={styles.blocks_group}>
                {blocks.map(block => (
                    <div key={block.id} onClick={() => handler(block.id, block)} className={styles.back_blocks}>
                        <div className={styles.front_blocks}>
                            <div className={styles.block_text}>
                                <div className={styles.blocks_title}>{block.title}</div>
                                <div className={styles.blocks_description}>{block.description}</div>
                                <div className={styles.blocks_description}>
                                    <img className={styles.blocks_image_source} src={block.photo} alt={block.title} />
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
    const res = await fetch(apiControllers.MinioController + '/images', {
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
