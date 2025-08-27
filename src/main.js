// src/main.js

import './style.css';
import { setupPdfDownloader } from './download.js';
import { initLanguageSwitcher } from './i18n.js';

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  setupPdfDownloader();
});