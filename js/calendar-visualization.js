/**
 * Gender Selection Methods Web Application
 * Calendar Visualization
 */

/**
 * Create a calendar visualization
 * @param {string} containerId - ID of the container element
 * @param {Date} ovulationDate - Ovulation date
 * @param {Date[]} fertileWindow - Array of dates in fertile window
 * @param {Date[]} recommendedDates - Array of recommended dates
 * @param {string} desiredGender - "boy" or "girl"
 */
function createCalendarVisualization(containerId, ovulationDate, fertileWindow, recommendedDates, desiredGender) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }
    
    // Get the month and year to display - center on ovulation date
    const calendarDate = new Date(ovulationDate);
    
    // Render the calendar
    try {
        renderCalendar(container, calendarDate, ovulationDate, fertileWindow, recommendedDates, desiredGender);
    } catch (error) {
        console.error("Error rendering calendar:", error);
    }
}

/**
 * Render a calendar for a specific month
 * @param {HTMLElement} container - Container element
 * @param {Date} calendarDate - Date object for the month to display
 * @param {Date} ovulationDate - Ovulation date
 * @param {Date[]} fertileWindow - Array of dates in fertile window
 * @param {Date[]} recommendedDates - Array of recommended dates
 * @param {string} desiredGender - "boy" or "girl"
 */
function renderCalendar(container, calendarDate, ovulationDate, fertileWindow, recommendedDates, desiredGender) {
    // Clear container
    container.innerHTML = '';
    
    // Get month and year
    const month = calendarDate.getMonth();
    const year = calendarDate.getFullYear();
    
    // Get month name
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Create calendar header
    const calendarHeader = document.createElement('div');
    calendarHeader.className = 'calendar-header';
    calendarHeader.innerHTML = `
        <div class="calendar-nav">
            <button class="calendar-nav-btn prev-month">&lt;</button>
        </div>
        <div class="calendar-title">${monthNames[month]} ${year}</div>
        <div class="calendar-nav">
            <button class="calendar-nav-btn next-month">&gt;</button>
        </div>
    `;
    container.appendChild(calendarHeader);
    
    // Add event listeners for navigation
    calendarHeader.querySelector('.prev-month').addEventListener('click', () => {
        const prevMonth = new Date(year, month - 1, 1);
        renderCalendar(container, prevMonth, ovulationDate, fertileWindow, recommendedDates, desiredGender);
    });
    
    calendarHeader.querySelector('.next-month').addEventListener('click', () => {
        const nextMonth = new Date(year, month + 1, 1);
        renderCalendar(container, nextMonth, ovulationDate, fertileWindow, recommendedDates, desiredGender);
    });
    
    // Create weekday headers
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekdaysDiv = document.createElement('div');
    weekdaysDiv.className = 'calendar-weekdays';
    
    weekdays.forEach(weekday => {
        const weekdayDiv = document.createElement('div');
        weekdayDiv.className = 'calendar-weekday';
        weekdayDiv.textContent = weekday;
        weekdaysDiv.appendChild(weekdayDiv);
    });
    
    container.appendChild(weekdaysDiv);
    
    // Create days grid
    const daysDiv = document.createElement('div');
    daysDiv.className = 'calendar-days';
    
    // Get first day of month
    const firstDay = new Date(year, month, 1);
    const startingDay = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Get number of days in month
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();
    
    // Get number of days in previous month
    const prevMonthLastDay = new Date(year, month, 0);
    const prevMonthTotalDays = prevMonthLastDay.getDate();
    
    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Helper function to check if two dates are the same day
    const isSameDay = (date1, date2) => {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    };
    
    // Helper function to check if a date is in an array of dates
    const isDateInArray = (date, dateArray) => {
        return dateArray.some(d => isSameDay(date, d));
    };
    
    // Create days from previous month
    for (let i = startingDay - 1; i >= 0; i--) {
        const day = prevMonthTotalDays - i;
        const date = new Date(year, month - 1, day);
        
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day other-month';
        dayDiv.innerHTML = `<div class="calendar-day-number">${day}</div>`;
        
        // Apply classes in priority order (most important visual indicator last)
        if (isDateInArray(date, fertileWindow)) {
            dayDiv.classList.add('fertile');
        }
        
        if (isSameDay(date, ovulationDate)) {
            dayDiv.classList.add('ovulation');
            dayDiv.classList.remove('fertile'); // Remove fertile class to avoid conflicting styles
        }
        
        if (isDateInArray(date, recommendedDates)) {
            dayDiv.classList.add(`${desiredGender}-recommended`);
            // Keep ovulation class if it's both ovulation and recommended
        }
        
        daysDiv.appendChild(dayDiv);
    }
    
    // Create days for current month
    for (let day = 1; day <= totalDays; day++) {
        const date = new Date(year, month, day);
        
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        dayDiv.innerHTML = `<div class="calendar-day-number">${day}</div>`;
        
        // Add today class
        if (isSameDay(date, today)) {
            dayDiv.classList.add('today');
        }
        
        // Apply classes in priority order (most important visual indicator last)
        if (isDateInArray(date, fertileWindow)) {
            dayDiv.classList.add('fertile');
        }
        
        if (isSameDay(date, ovulationDate)) {
            dayDiv.classList.add('ovulation');
            dayDiv.classList.remove('fertile'); // Remove fertile class to avoid conflicting styles
        }
        
        if (isDateInArray(date, recommendedDates)) {
            dayDiv.classList.add(`${desiredGender}-recommended`);
            // Keep ovulation class if it's both ovulation and recommended
        }
        
        daysDiv.appendChild(dayDiv);
    }
    
    // Fill in remaining days from next month
    const totalCells = 42; // 6 rows of 7 days
    const remainingCells = totalCells - (startingDay + totalDays);
    
    for (let day = 1; day <= remainingCells; day++) {
        const date = new Date(year, month + 1, day);
        
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day other-month';
        dayDiv.innerHTML = `<div class="calendar-day-number">${day}</div>`;
        
        // Apply classes in priority order (most important visual indicator last)
        if (isDateInArray(date, fertileWindow)) {
            dayDiv.classList.add('fertile');
        }
        
        if (isSameDay(date, ovulationDate)) {
            dayDiv.classList.add('ovulation');
            dayDiv.classList.remove('fertile'); // Remove fertile class to avoid conflicting styles
        }
        
        if (isDateInArray(date, recommendedDates)) {
            dayDiv.classList.add(`${desiredGender}-recommended`);
            // Keep ovulation class if it's both ovulation and recommended
        }
        
        daysDiv.appendChild(dayDiv);
    }
    
    container.appendChild(daysDiv);
    
    // Add enhanced legend with clearer labels
    const legendDiv = document.createElement('div');
    legendDiv.className = 'calendar-legend';
    legendDiv.style.display = 'flex';
    legendDiv.style.flexWrap = 'wrap';
    legendDiv.style.justifyContent = 'center';
    legendDiv.style.margin = '10px 0';
    legendDiv.style.gap = '20px';
    
    legendDiv.innerHTML = `
        <div class="legend-item">
            <div class="legend-color legend-fertile"></div>
            <span><strong>Fertile Window</strong>: Days when conception is possible</span>
        </div>
        <div class="legend-item">
            <div class="legend-color legend-ovulation"></div>
            <span><strong>Ovulation Day</strong>: When egg is released</span>
        </div>
        <div class="legend-item">
            <div class="legend-color legend-${desiredGender}"></div>
            <span><strong>Recommended for ${desiredGender.charAt(0).toUpperCase() + desiredGender.slice(1)}</strong>: Optimal timing</span>
        </div>
    `;
    
    container.appendChild(legendDiv);
}

/**
 * Create a calendar visualization for the Chinese Birth Calendar method
 * @param {string} containerId - ID of the container element
 * @param {number} year - Year of planned conception
 * @param {number[]} favorableMonths - Array of months favorable for desired gender
 * @param {string} desiredGender - "boy" or "girl"
 */
function createChineseCalendarVisualization(containerId, year, favorableMonths, desiredGender) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }
    
    // Clear container
    container.innerHTML = '';
    
    // Create year calendar representation (simplified, not a full calendar)
    const calendarOverview = document.createElement('div');
    calendarOverview.className = 'chinese-year-overview';
    calendarOverview.style.display = 'grid';
    calendarOverview.style.gridTemplateColumns = 'repeat(auto-fit, minmax(100px, 1fr))';
    calendarOverview.style.gridGap = '10px';
    calendarOverview.style.margin = '20px 0';
    
    // Get month names
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Create month blocks
    for (let month = 1; month <= 12; month++) {
        const isFavorable = favorableMonths.includes(month);
        
        const monthBlock = document.createElement('div');
        monthBlock.className = `month-block ${isFavorable ? `${desiredGender}-favorable` : ''}`;
        monthBlock.style.borderRadius = '5px';
        monthBlock.style.padding = '10px';
        monthBlock.style.textAlign = 'center';
        monthBlock.style.fontWeight = 'bold';
        monthBlock.style.color = isFavorable ? '#fff' : '#333';
        monthBlock.style.backgroundColor = isFavorable 
            ? (desiredGender === 'boy' ? '#5A9AD0' : '#D48EAD') 
            : '#f0f0f0';
        monthBlock.style.border = isFavorable 
            ? `2px solid ${desiredGender === 'boy' ? '#3A7AB0' : '#B46E8D'}` 
            : '1px solid #ddd';
        
        monthBlock.innerHTML = `
            <div>${monthNames[month - 1]}</div>
            <div style="font-size: 12px; margin-top: 5px;">${isFavorable ? `Favorable for ${desiredGender}` : 'Not favorable'}</div>
        `;
        
        calendarOverview.appendChild(monthBlock);
    }
    
    container.appendChild(calendarOverview);
    
    // Add legend
    const legendDiv = document.createElement('div');
    legendDiv.className = 'calendar-legend';
    legendDiv.style.display = 'flex';
    legendDiv.style.flexWrap = 'wrap';
    legendDiv.style.justifyContent = 'center';
    legendDiv.style.margin = '10px 0';
    legendDiv.style.gap = '20px';
    
    legendDiv.innerHTML = `
        <div class="legend-item" style="display: flex; align-items: center;">
            <div style="width: 20px; height: 20px; background-color: ${desiredGender === 'boy' ? '#5A9AD0' : '#D48EAD'}; border-radius: 4px; margin-right: 8px;"></div>
            <span>Favorable for ${desiredGender}</span>
        </div>
        <div class="legend-item" style="display: flex; align-items: center;">
            <div style="width: 20px; height: 20px; background-color: #f0f0f0; border-radius: 4px; margin-right: 8px; border: 1px solid #ddd;"></div>
            <span>Not favorable</span>
        </div>
    `;
    
    container.appendChild(legendDiv);
} 