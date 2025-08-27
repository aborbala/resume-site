// /src/i18n.js

import { translations } from './languages.js';

let currentLanguage = 'en'; // Default language

// This function finds all elements with a data-i18n-key and updates their text
function setLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.lang = lang; // Update the lang attribute on the <html> tag

  const elements = document.querySelectorAll('[data-i18n-key]');
elements.forEach(element => {
    const key = element.getAttribute('data-i18n-key');
    const translation = translations[lang]?.[key];

    if (translation) {
      // --- NEW LOGIC HERE ---
      // If the translation is an array, build a list
      if (Array.isArray(translation)) {
        const listHtml = `<ul>${translation.map(item => `<li>${item}</li>`).join('')}</ul>`;
        element.innerHTML = listHtml;
      } else {
        // Otherwise, just set the text like before
        element.innerHTML = translation;
      }
    }
  });

  // Update active button style
  document.getElementById('lang-en').classList.toggle('active', lang === 'en');
  document.getElementById('lang-de').classList.toggle('active', lang === 'de');
}

// This function sets up the buttons and initializes the default language
export function initLanguageSwitcher() {
  const enButton = document.getElementById('lang-en');
  const deButton = document.getElementById('lang-de');

  enButton.addEventListener('click', () => setLanguage('en'));
  deButton.addEventListener('click', () => setLanguage('de'));

  // Set the initial language on page load
  setLanguage(currentLanguage);
}

// This function lets other files (like download.js) know the current language
export function getCurrentLanguage() {
    return currentLanguage;
}

// This function gets the appropriate filename
export function getResumeFilename() {
    return translations[currentLanguage].resumeFilename || 'Resume';
}