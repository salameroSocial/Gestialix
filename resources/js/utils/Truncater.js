// utils/truncate.js
export const truncateText = (text, maxLength, append = '...') => {
    if (!text) return ''; // Maneja casos donde el texto es undefined o null
    if (text.length > maxLength) {
        return `${text.slice(0, maxLength)}${append}`;
    }
    return text;
};
