import os
from dotenv import load_dotenv
import requests


load_dotenv()
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")

def get_medical_advice(diagnosis):

    url = "https://api.groq.com/openai/v1/chat/completions"

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {GROQ_API_KEY}"
    }

    # Same request body as your cURL example
    payload = {
        "model": "llama-3.3-70b-versatile",
        "messages": [
        {
            "role": "system",
            "content": "You are a helpful medical assistant that provides medical advice. You are not a doctor. You will provide general information regarding the diagnosis given to you, provide at home steps for treatment, guidance for clinical treatment options, and a severity rating for how strongly you feel they should seek clinical medical attention. The format of your response should be a json where the first index is 'Info', with corresponding information about the condition, the second index should be 'At-Home Treatment' the third should be 'Clinical Treatment' and the last should be 'Severity', so how strongly you feel they should seek medical attention with a rational as to why. Always remind the user to consult a healthcare professional for personalized medical advice. Do not respond with any I statements or personal opinions. Always use third person language."
        },
        {
            "role": "user",
            "content": "I have been diagnosed with " + diagnosis + ". Can you provide me with some medical advice?"
        }
        ]
    }

    response = requests.post(url, headers=headers, json=payload)
    print("Status Code:", response.status_code)
    print("Response:", response.json())
    response = response.json().get("choices", [{}])[0].get("message", {}).get("content", "No response received.").strip()
    print(response)
    return response if response else "No medical advice available. Please consult a healthcare professional."

print(get_medical_advice("skin cancer"))  # Example usage, replace with actual diagnosis