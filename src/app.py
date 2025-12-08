import streamlit as st
from .translator import translate_text, text_to_speech

def run_app():
    st.title("🌐 Language Translator App")
    st.write("Enter text, select languages, and translate instantly.")

    if "translated_text" not in st.session_state:
        st.session_state.translated_text = None

    if "audio_bytes" not in st.session_state:
        st.session_state.audio_bytes = None

    if "play_audio" not in st.session_state:
        st.session_state.play_audio = False

    # Language options
    languages = {
        "English": "en",
        "Urdu": "ur",
        "Arabic": "ar",
        "French": "fr",
        "German": "de",
        "Spanish": "es",
        "Chinese (Simplified)": "zh-CN",
        "Chinese (Traditional)": "zh-TW",
        "Hindi": "hi",
        "Portuguese": "pt",
        "Russian": "ru",
        "Japanese": "ja",
        "Korean": "ko",
        "Bengali": "bn",
        "Dutch": "nl",
        "Turkish": "tr",
        "Persian": "fa",
        "Swedish": "sv",
        "Polish": "pl",
        "Italian": "it",
        "Vietnamese": "vi",
        "Punjabi": "pa"
    }

    col1, col2 = st.columns(2)

    with col1:
        source_lang = st.selectbox("Source Language", languages.keys())

    with col2:
        target_lang = st.selectbox("Target Language", languages.keys())

    text_input = st.text_area("Enter text to translate:", height="content")

    if st.button("Translate"):
        if text_input.strip() == "":
            st.warning("Please enter some text...")
        else:
            translated = translate_text(
                text_input,
                languages[source_lang],
                languages[target_lang],
            )

            st.session_state.translated_text = translated
            st.session_state.audio_bytes = None
            st.session_state.play_audio = False

            st.success("Translation completed!")

    if st.session_state.translated_text:
        st.code(st.session_state.translated_text, language="text", wrap_lines=True)

        play_audio = st.checkbox(
            "Play Translated Audio",
            key="play_audio"
        )
        
        if play_audio:
            if st.session_state.audio_bytes is None:
                st.session_state.audio_bytes = text_to_speech(
                    st.session_state.translated_text,
                    languages[target_lang]
                )

            st.audio(st.session_state.audio_bytes, format="audio/mp3")
