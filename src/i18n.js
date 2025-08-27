import { translations } from './languages.js';
import { renderContent } from './renderer.js'; // Import the new renderer

let currentLanguage = 'en'; // Default language

// This function finds all elements with a data-i18n-key and updates their text
function setLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.lang = lang; // Update the lang attribute on the <html> tag

  const langData = translations[lang];
  if (!langData) {
    console.error(`Translations for language "${lang}" not found.`);
    return;
  }

  // 1. Handle simple text elements that are not part of the renderer
  const elements = document.querySelectorAll('[data-i18n-key]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n-key');
    // Check if the translation exists and it's a simple string (not an array/object)
    if (langData[key] && typeof langData[key] === 'string') {
      element.innerHTML = langData[key];
    }
  });

  // 2. Render the complex, repetitive sections using the dedicated renderer
  renderContent(langData);

  // 3. Update active button style
  document.getElementById('lang-en').classList.toggle('active', lang === 'en');
  document.getElementById('lang-de').classList.toggle('active', lang === 'de');
}

// This function sets up the buttons and initializes the default language
export function initLanguageSwitcher() {
  const enButton = document.getElementById('lang-en');
  const deButton = document.getElementById('lang-de');

  if (enButton && deButton) {
    enButton.addEventListener('click', () => setLanguage('en'));
    deButton.addEventListener('click', () => setLanguage('de'));
  }

  // Set the initial language on page load
  setLanguage(currentLanguage);
}

// This function lets other files (like download.js) know the current language
export function getCurrentLanguage() {
    return currentLanguage;
}

// This function gets the appropriate filename for the PDF
export function getResumeFilename() {
    return translations[currentLanguage]?.resumeFilename || 'Resume';
}
