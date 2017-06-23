import React from 'react';
import marked from 'marked';
import Prism from 'prismjs';
import './prism-tomorrow-custom.css';

const LANGUAGES = [
  {
    name: 'javascript',
    aliases: ['js', 'es', 'es6'],
  },
];

const getPrismLanguage = (name = '') => {
  const lowerCasedName = name.toLowerCase();
  if (Prism.languages[lowerCasedName]) {
    return Prism.languages[lowerCasedName];
  } else {
    const lang = LANGUAGES.find(({ aliases }) => aliases.includes(lowerCasedName));

    if (lang) {
      return Prism.languages[lang.name];
    }

    return null;
  }
  
};

marked.setOptions({
  highlight: (code, lang) => {
    const prismLanguage = getPrismLanguage(lang);
    if (prismLanguage) {
      return Prism.highlight(code, prismLanguage);
    }
    return code;
  },
});

const Markdown = ({ children }) => <div dangerouslySetInnerHTML={{ __html: marked(children) }} />;

export default Markdown;
