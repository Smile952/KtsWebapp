"""
Обработчик документов: парсинг, чанкирование и загрузка в Milvus.
"""

from typing import List, Callable, Optional
from milvus_client import MilvusClient
from text_parser import TextParser


class DocumentProcessor:
    """Обработчик документов для загрузки в векторную БД."""
    
    def __init__(
        self,
        milvus_client: MilvusClient,
        chunk_size: int = 256,
        chunk_overlap: int = 64,
        embedding_function: Optional[Callable[[List[str]], List[List[float]]]] = None
    ):
        """
        Инициализация обработчика документов.
        
        Args:
            milvus_client: Клиент Milvus
            chunk_size: Размер чанка в символах
            chunk_overlap: Размер перекрытия между чанками
            embedding_function: Функция для генерации embeddings
                                Принимает список текстов, возвращает список векторов
        """
        self.milvus_client = milvus_client
        self.parser = TextParser(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
        self.embedding_function = embedding_function
    
    def process_file(
        self,
        file_path: str,
        collection_name: str,
        encoding: str = "utf-8"
    ) -> dict:
        """
        Обработка файла: парсинг, чанкирование и загрузка в Milvus.
        
        Args:
            file_path: Путь к файлу
            collection_name: Имя коллекции в Milvus
            encoding: Кодировка файла
        
        Returns:
            Словарь с результатами обработки
        """
        print(f"Парсинг файла: {file_path}")
        try:
            chunks = self.parser.parse_file(file_path, encoding)
        except (FileNotFoundError, ValueError) as e:
            return {
                "success": False,
                "error": str(e),
                "chunks_count": 0
            }
        
        if not chunks:
            return {
                "success": False,
                "error": "Не удалось извлечь чанки из файла",
                "chunks_count": 0
            }
        
        print(f"Извлечено {len(chunks)} чанков")
        
        # Генерируем embeddings
        if self.embedding_function is None:
            return {
                "success": False,
                "error": "Не указана функция для генерации embeddings",
                "chunks_count": len(chunks)
            }
        
        print("Генерация embeddings...")
        embeddings = self.embedding_function(chunks)
        
        if len(embeddings) != len(chunks):
            return {
                "success": False,
                "error": f"Количество embeddings ({len(embeddings)}) не совпадает с количеством чанков ({len(chunks)})",
                "chunks_count": len(chunks)
            }
        
        try:
            import os
            file_name = os.path.basename(file_path)
            file_path_full = os.path.abspath(file_path)
            
            file_names = [file_name] * len(chunks)
            file_paths = [file_path_full] * len(chunks)
            chunk_indices = list(range(len(chunks)))
            
            ids = self.milvus_client.insert_data(
                collection_name=collection_name,
                texts=chunks,
                embeddings=embeddings,
                file_names=file_names,
                file_paths=file_paths,
                chunk_indices=chunk_indices
            )
            
            stats = self.parser.get_chunk_stats(chunks)
            
            return {
                "success": True,
                "chunks_count": len(chunks),
                "inserted_ids": ids,
                "stats": stats
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "chunks_count": len(chunks)
            }
    
    def process_text(
        self,
        text: str,
        collection_name: str
    ) -> dict:
        """
        Обработка текста напрямую (без файла).
        
        Args:
            text: Исходный текст
            collection_name: Имя коллекции в Milvus
        
        Returns:
            Словарь с результатами обработки
        """
        if not text or not text.strip():
            return {
                "success": False,
                "error": "Текст не может быть пустым",
                "chunks_count": 0
            }
        
        chunks = self.parser.chunk_text(text)
        
        if not chunks:
            return {
                "success": False,
                "error": "Не удалось извлечь чанки из текста",
                "chunks_count": 0
            }
        
        if self.embedding_function is None:
            return {
                "success": False,
                "error": "Не указана функция для генерации embeddings",
                "chunks_count": len(chunks)
            }
        
        embeddings = self.embedding_function(chunks)
        
        if len(embeddings) != len(chunks):
            return {
                "success": False,
                "error": f"Количество embeddings не совпадает с количеством чанков",
                "chunks_count": len(chunks)
            }
        
        try:
            file_names = [""] * len(chunks)
            file_paths = [""] * len(chunks)
            chunk_indices = list(range(len(chunks)))
            
            ids = self.milvus_client.insert_data(
                collection_name=collection_name,
                texts=chunks,
                embeddings=embeddings,
                file_names=file_names,
                file_paths=file_paths,
                chunk_indices=chunk_indices
            )
            
            return {
                "success": True,
                "chunks_count": len(chunks),
                "inserted_ids": ids
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "chunks_count": len(chunks)
            }


if __name__ == "__main__":
    from embedder import create_embedding_function
    
    milvus = MilvusClient(host="standalone", port=19530)
    
    embedding_func = create_embedding_function(
        model_name="intfloat/multilingual-e5-base",
        batch_size=32
    )
    
    processor = DocumentProcessor(
        milvus_client=milvus,
        chunk_size=256,
        chunk_overlap=64,
        embedding_function=embedding_func
    )
    
    collection_name = "documents"
    try:
        milvus.create_collection(
            collection_name=collection_name,
            dimension=768,  # multilingual-e5-base
            description="Коллекция документов"
        )
    except:
        pass 