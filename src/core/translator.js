const BASE_URL = "https://translate.googleapis.com/translate_a/";

class Translator {
  sourceLang = "en";
  targetLang = "ru";

  getUrl(sourceText) {
    return `${BASE_URL}single?client=gtx&sl=${this.sourceLang}&tl=${
      this.targetLang
    }&dt=t&q=${encodeURI(sourceText)}`;
  }

  async translate(sourceText) {
    const url = this.getUrl(sourceText);
    console.log(url);
    const res = await fetch(this.getUrl(sourceText));
    const data = await res.json();
    console.log(data);
    return data[0][0][0];
  }
}

export default new Translator();
