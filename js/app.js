/**
 * Gender Selection Methods Web Application
 * Main Application JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

/**
 * Initialize the application
 */
function initApp() {
    // Set up wizard navigation
    setupWizardNavigation();
    
    // Set up gender selection
    setupGenderSelection();
    
    // Set up method selection
    setupMethodSelection();
    
    // Set up form submissions with validation
    setupFormSubmissions();
    
    // Set up tabs in educational section
    setupTabs();
    
    // Set up accordions in FAQ
    setupAccordions();
    
    // Initialize date pickers
    setupDatePickers();
    
    // Set up number spinners
    setupNumberSpinners();
    
    // Populate year dropdown for Chinese method
    populateYearDropdown();
}

/**
 * Set up wizard navigation
 */
function setupWizardNavigation() {
    const prevButton = document.getElementById('prev-step');
    const nextButton = document.getElementById('next-step');
    const steps = document.querySelectorAll('.wizard-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    let currentStep = 1;

    function updateNavigation() {
        // Update progress steps
        progressSteps.forEach((step, index) => {
            const stepNum = index + 1;
            if (stepNum < currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (stepNum === currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });

        // Update wizard steps
        steps.forEach((step, index) => {
            if (index + 1 === currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update navigation buttons
        prevButton.disabled = currentStep === 1;
        
        // Set next button text based on current step
        nextButton.textContent = currentStep === steps.length ? 'Start Over' : 'Next';
        
        // Set next button style based on current step
        if (currentStep === steps.length) {
            nextButton.classList.remove('primary');
            nextButton.classList.add('outline-secondary');
        } else {
            nextButton.classList.add('primary');
            nextButton.classList.remove('outline-secondary');
        }
    }

    prevButton.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateNavigation();
        }
    });

    // Store the original click handler for the next button
    const originalNextHandler = (event) => {
        if (currentStep < steps.length) {
            // Validate current step before proceeding
            if (validateCurrentStep(currentStep)) {
                currentStep++;
                updateNavigation();
                
                // If we're now on the last step, update the next button to reset functionality
                if (currentStep === steps.length) {
                    nextButton.onclick = function(e) {
                        e.preventDefault();
                        resetWizard();
                        currentStep = 1;
                        updateNavigation();
                    };
                }
            }
        } else {
            // We're already on the last step, so reset
            resetWizard();
            currentStep = 1;
            updateNavigation();
        }
    };
    
    // Set initial click handler
    nextButton.addEventListener('click', originalNextHandler);

    // Initialize navigation state
    updateNavigation();
}

/**
 * Validate the current step before proceeding
 */
function validateCurrentStep(step) {
    switch (step) {
        case 1:
            // Check if gender is selected
            const selectedGender = document.querySelector('.gender-card.active');
            if (!selectedGender) {
                alert('Please select a gender before proceeding.');
                return false;
            }
            break;
        case 2:
            // Check if method is selected
            const selectedMethod = document.querySelector('.method-card.active');
            if (!selectedMethod) {
                alert('Please select a method before proceeding.');
                return false;
            }
            break;
        case 3:
            // Validate form based on selected method
            const shettlesForm = document.getElementById('shettles-form');
            const chineseForm = document.getElementById('chinese-form');
            const shettlesContainer = document.getElementById('shettles-form-container');
            const chineseContainer = document.getElementById('chinese-form-container');

            if (shettlesContainer.classList.contains('active')) {
                if (!shettlesForm.checkValidity()) {
                    shettlesForm.reportValidity();
                    return false;
                }
            } else if (chineseContainer.classList.contains('active')) {
                if (!chineseForm.checkValidity()) {
                    chineseForm.reportValidity();
                    return false;
                }
            }
            break;
    }
    return true;
}

/**
 * Set up gender selection
 */
function setupGenderSelection() {
    const genderCards = document.querySelectorAll('.gender-card');
    
    genderCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            genderCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to selected card
            this.classList.add('active');
            
            // Store selected gender
            const selectedGender = this.getAttribute('data-gender');
            
            // Update hidden inputs in forms
            const shettlesGenderInput = document.querySelector('input[name="desired-gender-shettles"]');
            const chineseGenderInput = document.querySelector('input[name="desired-gender-chinese"]');
            
            if (shettlesGenderInput) shettlesGenderInput.value = selectedGender;
            if (chineseGenderInput) chineseGenderInput.value = selectedGender;
        });
    });
}

/**
 * Set up method selection
 */
function setupMethodSelection() {
    const methodCards = document.querySelectorAll('.method-card');
    const shettlesContainer = document.getElementById('shettles-form-container');
    const chineseContainer = document.getElementById('chinese-form-container');
    
    methodCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            methodCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to selected card
            this.classList.add('active');
            
            // Show corresponding form container
            const method = this.getAttribute('data-method');
            if (method === 'shettles') {
                shettlesContainer.classList.remove('hidden');
                shettlesContainer.classList.add('active');
                chineseContainer.classList.add('hidden');
                chineseContainer.classList.remove('active');
            } else {
                chineseContainer.classList.remove('hidden');
                chineseContainer.classList.add('active');
                shettlesContainer.classList.add('hidden');
                shettlesContainer.classList.remove('active');
            }
        });
    });
}

/**
 * Set up form submissions with Bootstrap validation
 */
function setupFormSubmissions() {
    // Get references to both forms
    const shettlesForm = document.getElementById('shettles-form');
    const chineseForm = document.getElementById('chinese-form');
    
    // Set up auto-calculation for Shettles method
    if (shettlesForm) {
        // Get form inputs
        const lastPeriodInput = document.getElementById('last-period');
        const cycleLengthInput = document.getElementById('cycle-length');
        
        // Function to calculate and display results
        function calculateShettlesAndDisplay() {
            if (!shettlesForm.checkValidity()) {
                return;
            }
            
            // Get form values
            const lastPeriodDate = new Date(lastPeriodInput.value);
            const cycleLength = parseInt(cycleLengthInput.value);
            const desiredGender = document.querySelector('input[name="desired-gender-shettles"]').value;
            
            if (isNaN(lastPeriodDate.getTime()) || isNaN(cycleLength)) {
                return; // Don't calculate if we don't have valid values
            }
            
            // Calculate results
            const shettlesResults = calculateShettlesResults(lastPeriodDate, cycleLength, desiredGender);
            
            // Get results container
            const resultsContainer = document.getElementById('shettles-results');
            
            // Show result
            if (resultsContainer) {
                // Create results HTML with calendar view
                let html = `
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; border: 1px solid #dee2e6;">
                        <h3 style="color: #007bff;">Shettles Method Results</h3>
                        <p>Based on your input, here are your personalized recommendations for conceiving a ${desiredGender}:</p>
                        
                        <div class="results-details">
                            <p><strong>Estimated Ovulation Date:</strong> ${shettlesResults.ovulationDate.toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}</p>
                            <p><strong>Fertile Window:</strong> ${shettlesResults.fertileWindow[0].toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })} to ${shettlesResults.fertileWindow[shettlesResults.fertileWindow.length - 1].toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}</p>
                        </div>
                        
                        <div class="calendar-container mt-4">
                            <h4>Calendar View</h4>
                            <div id="shettles-calendar" style="min-height: 500px;"></div>
                        </div>
                        
                        <div class="recommendations ${desiredGender}-recommendation mt-4">
                            <h4>Recommendations for Conceiving a ${desiredGender.charAt(0).toUpperCase() + desiredGender.slice(1)}</h4>
                            <p><strong>Recommended Intercourse Dates:</strong></p>
                            <ul>
                                ${shettlesResults.recommendedDates.map(date => `<li>${date.toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}</li>`).join('')}
                            </ul>
                            
                            <p><strong>Additional Tips:</strong></p>
                            <ul>
                                ${shettlesResults.additionalTips.map(tip => `<li>${tip}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="disclaimer mt-4">
                            <p><strong>Remember:</strong> The Shettles Method is not scientifically proven and has approximately a 50% success rate. These recommendations are based on traditional beliefs and theories.</p>
                        </div>
                    </div>
                `;
                
                // Update results container with inline styling to ensure visibility
                resultsContainer.innerHTML = html;
                resultsContainer.classList.remove('hidden');
                resultsContainer.style.display = 'block';
                
                // Create calendar visualization
                try {
                    // Wait for DOM to update before creating calendar
                    setTimeout(() => {
                        const calendarContainer = document.getElementById('shettles-calendar');
                        
                        if (calendarContainer) {
                            createCalendarVisualization(
                                'shettles-calendar',
                                shettlesResults.ovulationDate,
                                shettlesResults.fertileWindow,
                                shettlesResults.recommendedDates,
                                desiredGender
                            );
                        } else {
                            console.error("Calendar container not found!");
                        }
                    }, 200);
                } catch (error) {
                    console.error("Error creating calendar visualization:", error);
                }
                
                // Move to results step
                moveToResultsStep();
            }
        }
        
        // Set up event listeners to calculate on input change
        lastPeriodInput.addEventListener('change', calculateShettlesAndDisplay);
        cycleLengthInput.addEventListener('change', calculateShettlesAndDisplay);
        
        // Also keep the form submission handler for completeness
        shettlesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (!this.checkValidity()) {
                this.classList.add('was-validated');
                return;
            }
            
            calculateShettlesAndDisplay();
        });
    }
    
    // Chinese form submission  
    if (chineseForm) {
        chineseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (!this.checkValidity()) {
                this.classList.add('was-validated');
                return;
            }
            
            // Get form values
            const motherBirthDate = new Date(document.getElementById('mother-birth-date').value);
            const conceptionYear = parseInt(document.getElementById('conception-year').value);
            const desiredGender = document.querySelector('input[name="desired-gender-chinese"]').value;
            
            // Calculate results
            const chineseResults = calculateChineseResults(motherBirthDate, conceptionYear, desiredGender);
            
            // Get results container
            const resultsContainer = document.getElementById('chinese-results');
            
            // Show Chinese calendar results with chart
            if (resultsContainer) {
                // Get month names
                const monthNames = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ];
                
                // Format date function
                const formatDate = (date) => {
                    return date.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    });
                };
                
                // Create comprehensive results HTML with chart
                let html = `
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; border: 1px solid #dee2e6;">
                        <h3 style="color: #007bff;">Chinese Birth Calendar Results</h3>
                        <p class="results-message">Based on the mother's lunar age of ${chineseResults.lunarAge}, here are the favorable months for conceiving a ${chineseResults.desiredGender} in ${chineseResults.conceptionYear}:</p>
                        
                        <div class="results-details">
                            <p><strong>Mother's Birth Date:</strong> ${formatDate(motherBirthDate)}</p>
                            <p><strong>Mother's Lunar Age:</strong> ${chineseResults.lunarAge}</p>
                            <p><strong>Desired Gender:</strong> ${chineseResults.desiredGender.charAt(0).toUpperCase() + chineseResults.desiredGender.slice(1)}</p>
                        </div>
                        
                        <div class="calendar-container mt-4">
                            <h4>Chinese Birth Chart</h4>
                            <div id="chinese-calendar" style="min-height: 100px;"></div>
                            <table class="chinese-chart table table-bordered">
                                <thead class="table-light">
                                    <tr>
                                        <th>Month</th>
                                        <th>Prediction</th>
                                        <th>Date Range</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${chineseResults.monthlyPredictions.map((prediction, index) => {
                                        const month = index + 1;
                                        const isFavorable = chineseResults.favorableMonths.includes(month);
                                        const startDate = new Date(chineseResults.conceptionYear, month - 1, 1);
                                        const endDate = new Date(chineseResults.conceptionYear, month, 0);
                                        
                                        return `
                                            <tr class="${isFavorable ? 'table-success' : ''} ${prediction === chineseResults.desiredGender ? `${prediction}-highlight` : ''}">
                                                <td>${monthNames[index]}</td>
                                                <td><strong>${prediction.charAt(0).toUpperCase() + prediction.slice(1)}</strong></td>
                                                <td>${formatDate(startDate)} - ${formatDate(endDate)}</td>
                                            </tr>
                                        `;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="recommendations ${chineseResults.desiredGender}-recommendation mt-4">
                            <h4>Recommendations for Conceiving a ${chineseResults.desiredGender.charAt(0).toUpperCase() + chineseResults.desiredGender.slice(1)}</h4>
                            
                            ${chineseResults.favorableMonths.length > 0 ? `
                                <p>According to the Chinese Birth Calendar, the following months in ${chineseResults.conceptionYear} are favorable for conceiving a ${chineseResults.desiredGender}:</p>
                                <ul>
                                    ${chineseResults.favorableDateRanges.map(range => `
                                        <li><strong>${monthNames[range.month - 1]}:</strong> ${formatDate(range.startDate)} - ${formatDate(range.endDate)}</li>
                                    `).join('')}
                                </ul>
                            ` : `
                                <p>According to the Chinese Birth Calendar, there are no favorable months in ${chineseResults.conceptionYear} for conceiving a ${chineseResults.desiredGender} at the mother's lunar age of ${chineseResults.lunarAge}.</p>
                                <p>You may want to try a different year or consider the Shettles Method instead.</p>
                            `}
                        </div>
                        
                        <div class="disclaimer mt-4">
                            <p><strong>Remember:</strong> The Chinese Birth Calendar is a traditional method with no scientific basis. These predictions are based on ancient beliefs and cultural traditions.</p>
                        </div>
                    </div>
                `;
                
                // Update results container with inline styling to ensure visibility
                resultsContainer.innerHTML = html;
                resultsContainer.classList.remove('hidden');
                resultsContainer.style.display = 'block';
                
                // Create a visual calendar representation of the Chinese method results
                try {
                    // Wait for DOM to update before creating calendar
                    setTimeout(() => {
                        const calendarContainer = document.getElementById('chinese-calendar');
                        
                        if (calendarContainer) {
                            // Create calendar visualization for the Chinese method
                            createChineseCalendarVisualization(
                                'chinese-calendar',
                                chineseResults.conceptionYear,
                                chineseResults.favorableMonths,
                                chineseResults.desiredGender
                            );
                        } else {
                            console.error("Chinese calendar container not found!");
                        }
                    }, 200);
                } catch (error) {
                    console.error("Error creating Chinese calendar visualization:", error);
                }
                
                // Move to results step
                moveToResultsStep();
            } else {
                console.error("Could not find Chinese results container");
            }
        });
    }
}

/**
 * Move to the results step in the wizard
 */
function moveToResultsStep() {
    const steps = document.querySelectorAll('.wizard-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    
    // Hide all steps except the results step
    steps.forEach((step, index) => {
        if (index === 3) { // Index 3 is the 4th step (results)
            step.classList.add('active');
            step.style.display = 'block';
        } else {
            step.classList.remove('active');
        }
    });
    
    // Ensure results containers are accessible within the results step
    const resultsStep = document.getElementById('step-4');
    if (resultsStep) {
        const shettlesResults = document.getElementById('shettles-results');
        const chineseResults = document.getElementById('chinese-results');
        
        if (shettlesResults) {
            if (getComputedStyle(shettlesResults).display === 'none') {
                shettlesResults.style.display = 'block';
            }
            
            // Make sure calendar container is visible if it exists
            const shettlesCalendar = document.getElementById('shettles-calendar');
            if (shettlesCalendar) {
                shettlesCalendar.style.display = 'block';
            }
        }
        
        if (chineseResults && getComputedStyle(chineseResults).display !== 'none') {
            // Make sure Chinese calendar container is visible if it exists
            const chineseCalendar = document.getElementById('chinese-calendar');
            if (chineseCalendar) {
                chineseCalendar.style.display = 'block';
            }
        }
        
        // Scroll to results step
        resultsStep.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Update progress steps
    progressSteps.forEach((step, index) => {
        if (index < 3) { // First 3 steps are completed
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (index === 3) { // 4th step is active
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
    
    // Update navigation buttons
    const prevButton = document.getElementById('prev-step');
    const nextButton = document.getElementById('next-step');
    
    if (prevButton) prevButton.disabled = false;
    if (nextButton) {
        nextButton.textContent = 'Start Over';
        nextButton.classList.remove('primary');
        nextButton.classList.add('outline-secondary');
        
        // Update the click handler for the next button
        nextButton.onclick = function() {
            resetWizard();
        };
    }
}

/**
 * Reset the wizard back to the first step
 */
function resetWizard() {
    // Reset all steps
    const steps = document.querySelectorAll('.wizard-step');
    steps.forEach((step, index) => {
        if (index === 0) { // First step
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Reset progress indicators
    const progressSteps = document.querySelectorAll('.progress-step');
    progressSteps.forEach((step, index) => {
        if (index === 0) { // First step
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
    
    // Reset forms
    document.getElementById('shettles-form').reset();
    document.getElementById('chinese-form').reset();
    
    // Hide form containers
    document.getElementById('shettles-form-container').classList.add('hidden');
    document.getElementById('shettles-form-container').classList.remove('active');
    document.getElementById('chinese-form-container').classList.add('hidden');
    document.getElementById('chinese-form-container').classList.remove('active');
    
    // Hide results containers
    document.getElementById('shettles-results').classList.add('hidden');
    document.getElementById('chinese-results').classList.add('hidden');
    
    // Reset navigation buttons
    const prevButton = document.getElementById('prev-step');
    const nextButton = document.getElementById('next-step');
    
    if (prevButton) prevButton.disabled = true;
    if (nextButton) {
        nextButton.textContent = 'Next';
        nextButton.classList.add('primary');
        nextButton.classList.remove('outline-secondary');
        
        // Restore original click handler
        nextButton.onclick = null;
    }
    
    // Reset method and gender selections
    document.querySelectorAll('.gender-card').forEach(card => {
        card.classList.remove('active');
    });
    
    document.querySelectorAll('.method-card').forEach(card => {
        card.classList.remove('active');
    });
}

/**
 * Set up tabs in educational section
 */
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

/**
 * Set up accordions in FAQ
 */
function setupAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class on header
            this.classList.toggle('active');
            
            // Toggle display of content
            const content = this.nextElementSibling;
            content.classList.toggle('active');
            
            // Close other accordion items
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.classList.remove('active');
                }
            });
        });
    });
}

/**
 * Populate year dropdown for Chinese method
 */
function populateYearDropdown() {
    const yearSelect = document.getElementById('conception-year');
    if (yearSelect) {
        const currentYear = new Date().getFullYear();
        
        // Add options for current year and next 5 years
        for (let year = currentYear; year <= currentYear + 5; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        }
    }
}

/**
 * Set up date pickers using Flatpickr
 */
function setupDatePickers() {
    const datePickers = document.querySelectorAll('.date-picker');
    
    datePickers.forEach(picker => {
        flatpickr(picker, {
            dateFormat: "Y-m-d",
            theme: "light",
            maxDate: "today",
            animate: true,
            showMonths: 1,
            altInput: true,
            altFormat: "F j, Y",
            onChange: function(selectedDates, dateStr) {
                // Trigger form validation
                picker.form.classList.add('was-validated');
                
                // If this is the last-period input, trigger Shettles calculation
                if (picker.id === 'last-period') {
                    // Create and dispatch a change event
                    const event = new Event('change');
                    picker.dispatchEvent(event);
                }
            }
        });
    });
}

/**
 * Set up number spinners
 */
function setupNumberSpinners() {
    const spinners = document.querySelectorAll('.number-spinner');
    
    spinners.forEach(spinner => {
        const container = spinner.closest('.input-group');
        const decreaseBtn = container.querySelector('[data-action="decrease"]');
        const increaseBtn = container.querySelector('[data-action="increase"]');
        
        function updateValue(change) {
            const currentValue = parseInt(spinner.value) || 0;
            const newValue = currentValue + change;
            const min = parseInt(spinner.min);
            const max = parseInt(spinner.max);
            
            if (newValue >= min && newValue <= max) {
                spinner.value = newValue;
                // Trigger form validation
                spinner.form.classList.add('was-validated');
                
                // If this is the cycle-length input, trigger calculation
                if (spinner.id === 'cycle-length') {
                    // Create and dispatch a change event
                    const event = new Event('change');
                    spinner.dispatchEvent(event);
                }
            }
        }
        
        decreaseBtn.addEventListener('click', () => updateValue(-1));
        increaseBtn.addEventListener('click', () => updateValue(1));
        
        // Prevent manual input outside min/max range
        spinner.addEventListener('change', function() {
            const value = parseInt(this.value);
            const min = parseInt(this.min);
            const max = parseInt(this.max);
            
            if (value < min) this.value = min;
            if (value > max) this.value = max;
        });
    });
} 