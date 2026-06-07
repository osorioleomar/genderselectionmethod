/**
 * Gender Selection Methods Web Application
 * Shettles Method Calculations
 */

/**
 * Calculate Shettles method results
 * @param {Date} lastPeriodDate - First day of last menstrual period
 * @param {number} cycleLength - Average menstrual cycle length in days
 * @param {string} desiredGender - "boy" or "girl"
 * @returns {Object} Shettles results object
 */
function calculateShettlesResults(lastPeriodDate, cycleLength, desiredGender) {
    // Calculate ovulation date (cycle length - 14 days from LMP)
    const ovulationDate = new Date(lastPeriodDate);
    ovulationDate.setDate(lastPeriodDate.getDate() + (cycleLength - 14));
    
    // Calculate fertile window (5 days before to 1 day after ovulation)
    const fertileWindow = [];
    for (let i = -5; i <= 1; i++) {
        const date = new Date(ovulationDate);
        date.setDate(ovulationDate.getDate() + i);
        fertileWindow.push(date);
    }
    
    // Determine recommended dates based on desired gender
    let recommendedDates = [];
    let additionalTips = [];
    
    if (desiredGender === 'boy') {
        // For boy: Recommend intercourse on ovulation day and day before
        recommendedDates = [
            new Date(ovulationDate),
            new Date(new Date(ovulationDate).setDate(ovulationDate.getDate() - 1))
        ];
        
        additionalTips = [
            "Try to time intercourse as close to ovulation as possible.",
            "Male sperm are faster but less resilient, so timing close to ovulation gives them an advantage.",
            "Consider positions that allow for deeper penetration.",
            "The male partner should avoid tight underwear and hot baths to maintain optimal sperm health.",
            "Alkaline environment may favor male sperm, so the female partner might want to avoid acidic foods."
        ];
    } else {
        // For girl: Recommend intercourse 2-4 days before ovulation
        recommendedDates = [
            new Date(new Date(ovulationDate).setDate(ovulationDate.getDate() - 2)),
            new Date(new Date(ovulationDate).setDate(ovulationDate.getDate() - 3)),
            new Date(new Date(ovulationDate).setDate(ovulationDate.getDate() - 4))
        ];
        
        additionalTips = [
            "Plan intercourse 2-4 days before expected ovulation.",
            "Female sperm are slower but more resilient, so they can survive longer waiting for the egg.",
            "Consider positions with shallower penetration.",
            "More frequent intercourse may reduce sperm count, which some believe may favor female sperm.",
            "Acidic environment may favor female sperm, so the female partner might consider including more acidic foods in her diet."
        ];
    }
    
    return {
        ovulationDate,
        fertileWindow,
        recommendedDates,
        additionalTips,
        desiredGender
    };
}

/**
 * Display Shettles method results
 * @param {Object} results - Shettles results object
 */
function displayShettlesResults(results) {
    console.log("Displaying Shettles results:", results);
    
    const resultsContainer = document.getElementById('shettles-results');
    
    if (!resultsContainer) {
        console.error("Results container not found!");
        return;
    }
    
    // Format dates for display
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };
    
    // Format recommended dates
    const recommendedDatesHtml = results.recommendedDates.map(date => 
        `<li>${formatDate(date)}</li>`
    ).join('');
    
    // Format additional tips
    const tipsHtml = results.additionalTips.map(tip => 
        `<li>${tip}</li>`
    ).join('');
    
    // Create basic results HTML without calendar
    let html = `
        <h3 class="results-title">Shettles Method Results</h3>
        <p class="results-message">Based on the information you provided, here are your personalized recommendations for conceiving a ${results.desiredGender}:</p>
        
        <div class="results-details">
            <p><strong>Estimated Ovulation Date:</strong> ${formatDate(results.ovulationDate)}</p>
            <p><strong>Fertile Window:</strong> ${formatDate(results.fertileWindow[0])} to ${formatDate(results.fertileWindow[results.fertileWindow.length - 1])}</p>
        </div>
        
        <div class="recommendations">
            <h4>Recommendations for Conceiving a ${results.desiredGender.charAt(0).toUpperCase() + results.desiredGender.slice(1)}</h4>
            <p><strong>Recommended Intercourse Dates:</strong></p>
            <ul>
                ${recommendedDatesHtml}
            </ul>
            
            <p><strong>Additional Tips:</strong></p>
            <ul>
                ${tipsHtml}
            </ul>
        </div>
        
        <div class="disclaimer" style="margin-top: 2rem;">
            <p><strong>Remember:</strong> The Shettles Method is not scientifically proven and has approximately a 50% success rate.</p>
        </div>
        
        <button class="btn outline" style="margin-top: 1rem;" onclick="document.getElementById('shettles-form').reset(); document.getElementById('shettles-results').classList.add('hidden');">Start Over</button>
    `;
    
    // Update results container
    console.log("Setting HTML for results container");
    resultsContainer.innerHTML = html;
    resultsContainer.classList.remove('hidden');
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
    console.log("Results displayed successfully");
} 