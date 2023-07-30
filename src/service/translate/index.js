async function translateText(text, targetLanguage) {
  const apiKey = 'AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw'; // DONE : get api from google translate
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  const options = {
    method: 'POST',
    body: JSON.stringify({
      q: text,
      target: targetLanguage,
    }),
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.data.translations[0].translatedText;
  }
  catch(e) {
    console.log(e)
  }
}

export default translateText;
