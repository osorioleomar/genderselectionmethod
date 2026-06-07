/**
 * Gender Selection Methods Web Application
 * Lunar Calendar Conversion Utilities
 * 
 * Note: This is a simplified implementation for demonstration purposes.
 * A complete lunar calendar conversion would require more complex algorithms
 * and possibly an API for accurate conversions.
 */

/**
 * Convert Gregorian date to lunar date
 * @param {Date} date - Gregorian date to convert
 * @returns {Object} Lunar date object with year, month, day properties
 */
function gregorianToLunar(date) {
    // This is a simplified placeholder implementation
    // In a real application, this would use a proper lunar calendar conversion algorithm
    // or an API service for accurate conversions
    
    // For demonstration purposes, we'll just offset the date slightly
    // to simulate a lunar date conversion
    const lunarDate = new Date(date);
    lunarDate.setDate(date.getDate() - 20); // Arbitrary offset
    
    return {
        year: lunarDate.getFullYear(),
        month: lunarDate.getMonth() + 1,
        day: lunarDate.getDate()
    };
}

/**
 * Convert lunar date to Gregorian date
 * @param {Object} lunarDate - Lunar date object with year, month, day properties
 * @returns {Date} Gregorian date
 */
function lunarToGregorian(lunarDate) {
    // This is a simplified placeholder implementation
    // In a real application, this would use a proper lunar calendar conversion algorithm
    // or an API service for accurate conversions
    
    // For demonstration purposes, we'll just offset the date slightly
    // to simulate a lunar date conversion
    const gregorianDate = new Date(lunarDate.year, lunarDate.month - 1, lunarDate.day);
    gregorianDate.setDate(gregorianDate.getDate() + 20); // Arbitrary offset
    
    return gregorianDate;
}

/**
 * Calculate lunar age based on birth date and current date
 * @param {Date} birthDate - Gregorian birth date
 * @param {Date} currentDate - Gregorian current date
 * @returns {number} Lunar age
 */
function calculateLunarAge(birthDate, currentDate) {
    // Convert to lunar dates
    const lunarBirthDate = gregorianToLunar(birthDate);
    const lunarCurrentDate = gregorianToLunar(currentDate);
    
    // Calculate lunar age
    // In lunar age calculation, a person is considered 1 year old at birth
    // and gains a year on each Lunar New Year
    let lunarAge = lunarCurrentDate.year - lunarBirthDate.year + 1;
    
    // Adjust if current lunar date is before birth lunar date in the year
    if (lunarCurrentDate.month < lunarBirthDate.month || 
        (lunarCurrentDate.month === lunarBirthDate.month && lunarCurrentDate.day < lunarBirthDate.day)) {
        lunarAge--;
    }
    
    return lunarAge;
}

/**
 * Get lunar month name
 * @param {number} month - Lunar month (1-12)
 * @returns {string} Lunar month name
 */
function getLunarMonthName(month) {
    const lunarMonthNames = [
        'First Moon', 'Second Moon', 'Third Moon', 'Fourth Moon', 
        'Fifth Moon', 'Sixth Moon', 'Seventh Moon', 'Eighth Moon',
        'Ninth Moon', 'Tenth Moon', 'Eleventh Moon', 'Twelfth Moon'
    ];
    
    return lunarMonthNames[month - 1] || '';
} 