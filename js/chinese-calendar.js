/**
 * Gender Selection Methods Web Application
 * Chinese Birth Calendar Calculations
 */

/**
 * Calculate Chinese Birth Calendar results
 * @param {Date} motherBirthDate - Mother's date of birth
 * @param {number} conceptionYear - Year of planned conception
 * @param {string} desiredGender - "boy" or "girl"
 * @returns {Object} Chinese Calendar results object
 */
function calculateChineseResults(motherBirthDate, conceptionYear, desiredGender) {
    // Calculate lunar age (current lunar year - birth lunar year + 1)
    // Note: This is a simplified calculation for demonstration purposes
    const motherAge = conceptionYear - motherBirthDate.getFullYear();
    const lunarAge = motherAge + 1; // Lunar age is typically 1-2 years more than Western age
    
    // Get monthly predictions based on the Chinese birth chart
    const monthlyPredictions = getChineseChartPredictions(lunarAge);
    
    // Find favorable months for desired gender
    const favorableMonths = [];
    for (let month = 1; month <= 12; month++) {
        if (monthlyPredictions[month - 1] === desiredGender) {
            favorableMonths.push(month);
        }
    }
    
    // Generate conception date ranges for favorable months
    const favorableDateRanges = favorableMonths.map(month => {
        const startDate = new Date(conceptionYear, month - 1, 1);
        const endDate = new Date(conceptionYear, month, 0);
        return { month, startDate, endDate };
    });
    
    return {
        lunarAge,
        monthlyPredictions,
        favorableMonths,
        favorableDateRanges,
        desiredGender,
        conceptionYear
    };
}

/**
 * Get gender predictions from the Chinese birth chart
 * @param {number} lunarAge - Mother's lunar age
 * @returns {Array} Array of gender predictions for each month (1-12)
 */
function getChineseChartPredictions(lunarAge) {
    // Chinese birth chart (simplified version)
    // This is a representation of the traditional chart
    // Rows: Lunar ages 18-45
    // Columns: Lunar conception months 1-12
    // Values: 'boy' or 'girl'
    const chineseChart = {
        18: ['boy', 'boy', 'boy', 'boy', 'boy', 'girl', 'girl', 'girl', 'girl', 'girl', 'boy', 'boy'],
        19: ['girl', 'girl', 'girl', 'girl', 'boy', 'boy', 'boy', 'boy', 'boy', 'boy', 'girl', 'girl'],
        20: ['girl', 'girl', 'girl', 'girl', 'boy', 'boy', 'boy', 'boy', 'boy', 'girl', 'girl', 'girl'],
        21: ['boy', 'boy', 'boy', 'boy', 'girl', 'girl', 'girl', 'girl', 'girl', 'boy', 'boy', 'boy'],
        22: ['boy', 'boy', 'boy', 'boy', 'girl', 'girl', 'girl', 'girl', 'girl', 'boy', 'boy', 'boy'],
        23: ['boy', 'boy', 'boy', 'girl', 'girl', 'girl', 'girl', 'girl', 'boy', 'boy', 'boy', 'boy'],
        24: ['girl', 'girl', 'girl', 'girl', 'boy', 'boy', 'boy', 'boy', 'boy', 'girl', 'girl', 'girl'],
        25: ['girl', 'girl', 'girl', 'boy', 'boy', 'boy', 'boy', 'boy', 'girl', 'girl', 'girl', 'girl'],
        26: ['boy', 'boy', 'boy', 'girl', 'girl', 'girl', 'girl', 'girl', 'boy', 'boy', 'boy', 'boy'],
        27: ['boy', 'boy', 'girl', 'girl', 'girl', 'girl', 'girl', 'boy', 'boy', 'boy', 'boy', 'boy'],
        28: ['girl', 'girl', 'boy', 'boy', 'boy', 'boy', 'boy', 'girl', 'girl', 'girl', 'girl', 'girl'],
        29: ['girl', 'boy', 'boy', 'boy', 'boy', 'boy', 'girl', 'girl', 'girl', 'girl', 'girl', 'boy'],
        30: ['boy', 'girl', 'girl', 'girl', 'girl', 'girl', 'boy', 'boy', 'boy', 'boy', 'boy', 'girl'],
        31: ['girl', 'boy', 'boy', 'boy', 'boy', 'boy', 'girl', 'girl', 'girl', 'girl', 'girl', 'boy'],
        32: ['boy', 'girl', 'girl', 'girl', 'girl', 'girl', 'boy', 'boy', 'boy', 'boy', 'boy', 'girl'],
        33: ['boy', 'girl', 'girl', 'girl', 'girl', 'boy', 'boy', 'boy', 'boy', 'boy', 'girl', 'girl'],
        34: ['girl', 'boy', 'boy', 'boy', 'boy', 'girl', 'girl', 'girl', 'girl', 'girl', 'boy', 'boy'],
        35: ['boy', 'girl', 'girl', 'girl', 'girl', 'boy', 'boy', 'boy', 'boy', 'boy', 'girl', 'girl'],
        36: ['girl', 'boy', 'boy', 'boy', 'boy', 'girl', 'girl', 'girl', 'girl', 'girl', 'boy', 'boy'],
        37: ['girl', 'boy', 'boy', 'boy', 'girl', 'girl', 'girl', 'girl', 'girl', 'boy', 'boy', 'boy'],
        38: ['boy', 'girl', 'girl', 'girl', 'boy', 'boy', 'boy', 'boy', 'boy', 'girl', 'girl', 'girl'],
        39: ['boy', 'girl', 'girl', 'boy', 'boy', 'boy', 'boy', 'boy', 'girl', 'girl', 'girl', 'girl'],
        40: ['girl', 'boy', 'boy', 'girl', 'girl', 'girl', 'girl', 'girl', 'boy', 'boy', 'boy', 'boy'],
        41: ['girl', 'boy', 'girl', 'girl', 'girl', 'girl', 'girl', 'boy', 'boy', 'boy', 'boy', 'girl'],
        42: ['boy', 'girl', 'boy', 'boy', 'boy', 'boy', 'boy', 'girl', 'girl', 'girl', 'girl', 'boy'],
        43: ['boy', 'girl', 'boy', 'boy', 'boy', 'boy', 'girl', 'girl', 'girl', 'girl', 'boy', 'boy'],
        44: ['girl', 'boy', 'girl', 'girl', 'girl', 'girl', 'boy', 'boy', 'boy', 'boy', 'girl', 'girl'],
        45: ['girl', 'boy', 'girl', 'girl', 'girl', 'boy', 'boy', 'boy', 'boy', 'girl', 'girl', 'girl']
    };
    
    // Handle ages outside the chart range
    let ageToUse = lunarAge;
    if (lunarAge < 18) ageToUse = 18;
    if (lunarAge > 45) ageToUse = 45;
    
    return chineseChart[ageToUse] || Array(12).fill('unknown');
}

/**
 * Display Chinese Calendar results
 * @param {Object} results - Chinese Calendar results object
 */
function displayChineseResults(results) {
    console.log("Displaying Chinese Calendar results:", results);
    
    const resultsContainer = document.getElementById('chinese-results');
    
    if (!resultsContainer) {
        console.error("Chinese results container not found!");
        return;
    }
    
    // Format dates for display
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };
    
    // Get month names
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Format favorable months
    let favorableMonthsHtml = '';
    if (results.favorableMonths.length > 0) {
        favorableMonthsHtml = results.favorableDateRanges.map(range => 
            `<li><strong>${monthNames[range.month - 1]}:</strong> ${formatDate(range.startDate)} - ${formatDate(range.endDate)}</li>`
        ).join('');
    }
    
    // Create a simple results display without the table
    let html = `
        <h3 class="results-title">Chinese Birth Calendar Results</h3>
        <p class="results-message">Based on the mother's lunar age of ${results.lunarAge}, here are the favorable months for conceiving a ${results.desiredGender} in ${results.conceptionYear}:</p>
        
        <div class="results-details">
            <p><strong>Mother's Lunar Age:</strong> ${results.lunarAge}</p>
            <p><strong>Desired Gender:</strong> ${results.desiredGender.charAt(0).toUpperCase() + results.desiredGender.slice(1)}</p>
        </div>
        
        <div class="recommendations">
            <h4>Recommendations for Conceiving a ${results.desiredGender.charAt(0).toUpperCase() + results.desiredGender.slice(1)}</h4>
            
            ${results.favorableMonths.length > 0 ? `
                <p>According to the Chinese Birth Calendar, the following months in ${results.conceptionYear} are favorable for conceiving a ${results.desiredGender}:</p>
                <ul>
                    ${favorableMonthsHtml}
                </ul>
            ` : `
                <p>According to the Chinese Birth Calendar, there are no favorable months in ${results.conceptionYear} for conceiving a ${results.desiredGender} at the mother's lunar age of ${results.lunarAge}.</p>
                <p>You may want to try a different year or consider the Shettles Method instead.</p>
            `}
        </div>
        
        <div class="disclaimer" style="margin-top: 2rem;">
            <p><strong>Remember:</strong> The Chinese Birth Calendar is a traditional method with no scientific basis.</p>
        </div>
        
        <button class="btn outline" style="margin-top: 1rem;" onclick="document.getElementById('chinese-form').reset(); document.getElementById('chinese-results').classList.add('hidden');">Start Over</button>
    `;
    
    // Update results container
    console.log("Setting Chinese HTML for results container");
    resultsContainer.innerHTML = html;
    resultsContainer.classList.remove('hidden');
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
    console.log("Chinese results displayed successfully");
} 