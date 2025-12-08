import requests
from gtts import gTTS
from io import BytesIO

API_URL = "https://translate.googleapis.com/translate_a/single"

def translate_text(text, source, target):
    try:
        params = {
            "client": "gtx",
            "sl": source,
            "tl": target,
            "dt": "t",
            "q": text,
        }

        response = requests.get(API_URL, params=params, timeout=20)

        data = response.json()
        translated_parts = [sentence[0] for sentence in data[0]]
        translated_text = "".join(translated_parts)

        return translated_text

    except Exception as e:
        return f"Translation Error: {str(e)}"
    

def text_to_speech(text, lang):
    tts = gTTS(text=text, lang=lang)
    audio_buffer = BytesIO()

    tts.write_to_fp(audio_buffer)
    audio_buffer.seek(0)
    
    return audio_buffer.read()