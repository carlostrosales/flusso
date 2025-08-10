from openai import OpenAI
from typing import Optional
import os
from dotenv import load_dotenv, find_dotenv


class AskService:
    
    def __init__(self, client: Optional[OpenAI] = None):
        load_dotenv(find_dotenv())
        api_key = os.getenv("OPENAI_SECRET_KEY")
        self.client = client or OpenAI(api_key=api_key)

    
    def askQuestion(self, question: str) -> tuple[str, str]:
        response = self.client.responses.create(
            model="gpt-4.1",
            input=question
        )
        return response.id, response.output[0].content[0].text
    