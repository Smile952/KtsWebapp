"""
Модуль для работы с эмбеддинг-моделью multilingual-e5-base.
"""

from typing import List
from sentence_transformers import SentenceTransformer
import torch


class Embedder:
    """Класс для генерации embeddings с использованием multilingual-e5-base."""
    
    def __init__(
        self,
        model_name: str = "intfloat/multilingual-e5-base",
        device: str = None,
        batch_size: int = 32
    ):
        """
        Инициализация эмбеддера.
        
        Args:
            model_name: Название модели (по умолчанию multilingual-e5-base)
            device: Устройство для вычислений ('cuda', 'cpu' или None для автоопределения)
            batch_size: Размер батча для обработки текстов
        """
        self.model_name = model_name
        self.batch_size = batch_size
        
        if device is None:
            self.device = "cuda" if torch.cuda.is_available() else "cpu"
        else:
            self.device = device
        
        print(f"Загрузка модели {model_name}...")
        print(f"Устройство: {self.device}")
        
        self.model = SentenceTransformer(model_name, device=self.device)
        
        self.dimension = self.model.get_sentence_embedding_dimension()
        
        print(f"Модель загружена. Размерность embeddings: {self.dimension}")
    
    def encode(
        self,
        texts: List[str],
        normalize: bool = True,
        show_progress: bool = True
    ) -> List[List[float]]:
        """
        Генерация embeddings для списка текстов.
        
        Args:
            texts: Список текстов для обработки
            normalize: Нормализовать ли векторы (рекомендуется True для cosine similarity)
            show_progress: Показывать ли прогресс обработки
        
        Returns:
            Список векторов (embeddings)
        """
        if not texts:
            return []
        
        prefixed_texts = [f"passage: {text}" for text in texts]
        
        embeddings = self.model.encode(
            prefixed_texts,
            batch_size=self.batch_size,
            normalize_embeddings=normalize,
            show_progress_bar=show_progress,
            convert_to_numpy=True
        )
        
        return embeddings.tolist()
    
    def encode_query(
        self,
        query: str,
        normalize: bool = True
    ) -> List[float]:
        """
        Генерация embedding для поискового запроса.
        
        Args:
            query: Текст запроса
            normalize: Нормализовать ли вектор
        
        Returns:
            Вектор запроса
        """
        prefixed_query = f"query: {query}"
        
        embedding = self.model.encode(
            prefixed_query,
            normalize_embeddings=normalize,
            convert_to_numpy=True
        )
        
        return embedding.tolist()
    
    def encode_queries(
        self,
        queries: List[str],
        normalize: bool = True,
        show_progress: bool = True
    ) -> List[List[float]]:
        """
        Генерация embeddings для списка запросов.
        
        Args:
            queries: Список текстов запросов
            normalize: Нормализовать ли векторы
            show_progress: Показывать ли прогресс
        
        Returns:
            Список векторов запросов
        """
        if not queries:
            return []
        
        prefixed_queries = [f"query: {q}" for q in queries]
        
        embeddings = self.model.encode(
            prefixed_queries,
            batch_size=self.batch_size,
            normalize_embeddings=normalize,
            show_progress_bar=show_progress,
            convert_to_numpy=True
        )
        
        return embeddings.tolist()
    
    def get_dimension(self) -> int:
        """Получение размерности embeddings."""
        return self.dimension


def create_embedding_function(
    model_name: str = "intfloat/multilingual-e5-base",
    device: str = None,
    batch_size: int = 32
) -> callable:
    """
    Создание функции для генерации embeddings (для использования с DocumentProcessor).
    
    Args:
        model_name: Название модели
        device: Устройство для вычислений
        batch_size: Размер батча
    
    Returns:
        Функция, принимающая список текстов и возвращающая список векторов
    """
    embedder = Embedder(model_name=model_name, device=device, batch_size=batch_size)
    
    def embedding_function(texts: List[str]) -> List[List[float]]:
        return embedder.encode(texts)
    
    return embedding_function