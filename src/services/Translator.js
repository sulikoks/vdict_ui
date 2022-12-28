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
    if (!sourceText) return "";
    const url = this.getUrl(sourceText);
    console.log(url);
    const res = await fetch(this.getUrl(sourceText));
    const data = await res.json();
    console.log(data);
    return { translation: data[0][0][0], source: data[2] };
  }
}

export default new Translator();

// import { generateRequestUrl, setCORS } from "google-translate-api-browser";
// // setting up cors-anywhere server address
// const translate = setCORS("http://cors-anywhere.herokuapp.com/");
/*
// or
import translate, { setCORS } from "google-translate-api-browser";
setCORS("http://cors-anywhere.herokuapp.com/");
*/
// async translate(sourceText) {
//   const res = await translate(sourceText, { to: "ja" });
//   // const res = await fetch(url);
//   //   const data = await res.json();
//   console.log(res);
//   return res.text;
// }
