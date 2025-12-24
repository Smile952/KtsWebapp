import { useNavigate } from 'react-router-dom';
import styles from'./Services.module.css';
import { OrderServiceBlock } from 'common/Entityes/OrderEntity/OrderServiceBlock';

export function Services() {
    const blocks: OrderServiceBlock[] = [
        { id: 1, title: 'Web Разработка', description: 'Создание и разработка современных сайтов и приложений', photo: '/Images/WebDev/web-development.jpg' },
        { id: 2, title: 'Android/iOS', description: 'Разработка приложений для iOS и Android', photo: '/Images/Mobile/android.jpg' },
        { id: 3, title: 'DevOps и облако', description: 'Настройка инфраструктуры и автоматизация процессов', photo: 'Images/DevOps/devops.jpg' }
    ]

    const nav = useNavigate();

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