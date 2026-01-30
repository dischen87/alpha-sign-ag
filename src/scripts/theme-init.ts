/**
 * Theme initialization script
 * This script runs immediately to prevent flash of incorrect theme.
 * Should be included as an inline script in the <head> of the document.
 */

export const themeInitScript = `
(function() {
  const theme = localStorage.getItem('theme') || 'system';
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const resolved = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;
  document.documentElement.classList.add(resolved);
})();
`;
