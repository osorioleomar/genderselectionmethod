/**
 * Gender Selection Methods Web Application
 * Utility Functions
 */

/**
 * Add days to a date
 * @param {Date} date - The starting date
 * @param {number} days - Number of days to add
 * @returns {Date} New date
 */
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
}

/**
 * Format a date as a string
 * @param {Date} date - The date to format
 * @param {string} format - Format string (optional)
 * @returns {string} Formatted date string
 */
function formatDate(date, format = 'long') {
    if (!date) return '';
    
    if (format === 'long') {
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    } else if (format === 'short') {
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    } else if (format === 'month-year') {
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long'
        });
    }
    
    return date.toLocaleDateString();
}

/**
 * Get the difference in days between two dates
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {number} Number of days difference
 */
function daysBetween(date1, date2) {
    // Convert both dates to milliseconds
    const date1_ms = date1.getTime();
    const date2_ms = date2.getTime();
    
    // Calculate the difference in milliseconds
    let difference_ms = Math.abs(date1_ms - date2_ms);
    
    // Convert back to days and return
    return Math.floor(difference_ms / (1000 * 60 * 60 * 24));
}

/**
 * Check if a date is between two other dates
 * @param {Date} date - Date to check
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {boolean} True if date is between start and end dates
 */
function isDateBetween(date, startDate, endDate) {
    return date >= startDate && date <= endDate;
}

/**
 * Get a random item from an array
 * @param {Array} array - The array to pick from
 * @returns {*} Random item from the array
 */
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Capitalize the first letter of a string
 * @param {string} string - The string to capitalize
 * @returns {string} Capitalized string
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - The function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
} 