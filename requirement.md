# Gender Selection Methods Web Application
## Development Documentation

## 1. Overview

This document outlines the specifications for a web application that helps users plan conception based on traditional gender selection methods. The application will focus on two methods:
1. The Shettles Method
2. The Chinese Birth Calendar

**Project Purpose**: To provide users with a simple, informative tool to explore traditional gender selection methods while being transparent about their scientific limitations.

**Target Audience**: Couples planning to conceive who are interested in exploring traditional methods for gender selection.

## 2. Technical Requirements

### Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (no frameworks)
- **Responsiveness**: Mobile-first approach, responsive on all device sizes
- **Browser Compatibility**: Support for modern browsers (Chrome, Firefox, Safari, Edge)
- **Accessibility**: WCAG 2.1 AA compliance

### Development Environment
- Version Control: Git
- Code Style: ESLint configuration
- Documentation: JSDoc for JavaScript functions

## 3. Feature Specifications

### 3.1 Core Features

#### Method Selection Interface
- Toggle switch or tab interface to select between methods
- Brief method descriptions with scientific disclaimers
- Visual indicators for selected method

#### Shettles Method Calculator
- **Inputs**:
  - Last menstrual period date (date picker)
  - Average menstrual cycle length (numeric input, 21-35 days)
  - Desired gender (radio buttons: boy/girl)
- **Calculations**:
  - Estimated ovulation date (cycle length - 14 days from LMP)
  - Fertile window (5 days before to 1 day after ovulation)
  - Gender-specific recommendations based on timing
- **Outputs**:
  - Calendar visualization with color-coded fertile days
  - Specific intercourse timing recommendations
  - Additional tips based on method (positions, etc.)

#### Chinese Birth Calendar
- **Inputs**:
  - Mother's date of birth (date picker)
  - Current date or planned conception timeframe (month/year)
  - Desired gender (radio buttons: boy/girl)
- **Calculations**:
  - Conversion of Gregorian dates to lunar calendar
  - Mother's lunar age calculation
  - Gender prediction based on lunar month and age
- **Outputs**:
  - 12-month calendar showing favorable/unfavorable months
  - Highlight of best months for desired gender
  - Conversion of lunar dates to Gregorian calendar

#### Educational Content
- Method explanation sections
- Scientific background and success rate information
- FAQ accordion for common questions
- References and further reading

#### Results Display
- Print-friendly version of results
- Clear visual presentation of recommendations
- Option to reset and try different inputs

### 3.2 User Flow

```
Home Page
│
├── Method Selection
│   ├── Shettles Method
│   │   ├── Input Form
│   │   ├── Results Page
│   │   └── Recommendations
│   │
│   └── Chinese Birth Calendar
│       ├── Input Form
│       ├── Calendar View
│       └── Recommendations
│
├── Educational Content
│   ├── Method Details
│   ├── Scientific Information
│   └── FAQ
│
└── About/Disclaimer
```

## 4. UI/UX Specifications

### 4.1 Design Guidelines

- **Color Scheme**:
  - Primary: #4A90E2 (blue) - general interface elements
  - Secondary: #50E3C2 (teal) - highlights and accents
  - Boy indicators: #4A90E2 (blue)
  - Girl indicators: #E15B64 (pink)
  - Neutral elements: #F5F7FA (light gray)
  - Text: #333333 (dark gray)

- **Typography**:
  - Headings: 'Montserrat', sans-serif
  - Body: 'Open Sans', sans-serif
  - Base font size: 16px
  - Line height: 1.5

- **Components**:
  - Rounded corners (8px radius)
  - Subtle shadows for elevated elements
  - Minimal use of borders
  - Icon usage for enhanced visual communication

### 4.2 Page Layouts

#### Home Page
- Hero section with application title and brief description
- Method selection cards (Shettles and Chinese Calendar)
- Brief overview of each method
- Prominent disclaimer about scientific limitations

#### Method Input Forms
- Step-by-step form progression
- Clear input labels and helper text
- Real-time validation
- Back/Next navigation
- Progress indicator

#### Results Pages
- Clear visual presentation of recommended dates
- Calendar visualization
- Written explanation of recommendations
- Actionable tips
- Option to try other method or adjust inputs

#### Educational Section
- Tabbed interface for different topics
- Visual aids explaining the methods
- Scientific context in accessible language
- References to research

## 5. Data Models and Calculations

### 5.1 Shettles Method

```javascript
/**
 * Shettles calculation model
 * @typedef {Object} ShettlesModel
 * @property {Date} lastPeriodDate - First day of last menstrual period
 * @property {number} cycleLength - Average menstrual cycle length in days
 * @property {string} desiredGender - "boy" or "girl"
 */

/**
 * Shettles results
 * @typedef {Object} ShettlesResult
 * @property {Date} ovulationDate - Estimated ovulation date
 * @property {Date[]} fertileWindow - Array of dates in fertile window
 * @property {Date[]} recommendedDates - Dates recommended for desired gender
 * @property {string[]} additionalTips - Array of additional method tips
 */
```

**Calculation Logic**:
1. Ovulation Date = Last Period Date + (Cycle Length - 14 days)
2. Fertile Window = 5 days before to 1 day after ovulation
3. For boy: Recommend intercourse on ovulation day and day before
4. For girl: Recommend intercourse 2-4 days before ovulation

### 5.2 Chinese Birth Calendar

```javascript
/**
 * Chinese Calendar model
 * @typedef {Object} ChineseCalendarModel
 * @property {Date} motherBirthDate - Mother's date of birth
 * @property {number} currentYear - Year of planned conception
 * @property {string} desiredGender - "boy" or "girl"
 */

/**
 * Chinese Calendar results
 * @typedef {Object} ChineseCalendarResult
 * @property {number} lunarAge - Mother's lunar age
 * @property {Object[]} monthlyPredictions - Array of monthly gender predictions
 * @property {number[]} favorableMonths - Array of months favorable for desired gender
 */
```

**Calculation Logic**:
1. Convert mother's Gregorian birth date to lunar calendar
2. Calculate lunar age (current lunar year - birth lunar year + 1)
3. For each month, look up gender in the Chinese birth chart based on lunar age and lunar conception month
4. Identify months matching desired gender
5. Convert lunar dates back to Gregorian calendar

## 6. Component Implementation Details

### 6.1 Date Picker Component

Custom date picker with:
- Month/year navigation
- Highlighted current date
- Validation for past/future dates as appropriate
- Mobile-friendly touch interface

### 6.2 Calendar Visualization

Interactive calendar with:
- Month view layout
- Color-coded days based on fertility and recommendations
- Tooltips for additional information
- Legend explaining color coding

### 6.3 Lunar Calendar Conversion

Utility functions for:
- Converting between Gregorian and lunar calendar dates
- Calculating lunar age
- Mapping lunar dates to the gender prediction chart

### 6.4 Form Validation

Client-side validation for:
- Required fields
- Date ranges
- Numeric inputs within acceptable ranges
- Helpful error messages

## 7. Testing Guidelines

### 7.1 Functional Testing
- Validate calculation accuracy for both methods
- Test edge cases (leap years, unusual cycle lengths)
- Verify all user flows and navigation paths
- Test form validation and error handling
- Verify calendar visualization accuracy

### 7.2 Cross-Browser Testing
- Test on Chrome, Firefox, Safari, and Edge
- Verify responsive layouts on different screen sizes
- Test touch interactions on mobile devices

### 7.3 Accessibility Testing
- Screen reader compatibility
- Keyboard navigation
- Color contrast compliance
- Focus management

## 8. Performance Considerations

- Minimize DOM manipulations
- Optimize calendar rendering
- Lazy load educational content
- Compress images and assets
- Cache calculation results in memory during session (no persistence)

## 9. Deployment

### 9.1 Build Process
- HTML minification
- CSS minification
- JavaScript minification and bundling
- Image optimization

### 9.2 Hosting Requirements
- Static file hosting (no server-side processing required)
- HTTPS support
- Appropriate caching headers

## 10. Future Enhancements

### Phase 2 Features
- User accounts and saved results functionality
- Additional methods (Whelan, Billings, etc.)
- Integration with period tracking data
- Multilingual support
- Dark mode theme
- Email or calendar integration for exporting dates

## 11. Disclaimer Content

The application must prominently display the following disclaimer:

```
DISCLAIMER: The methods presented in this application are based on traditional beliefs and theories that have not been scientifically proven to significantly influence baby gender. The Shettles Method and Chinese Birth Calendar are not guaranteed to produce the desired results. This application is for informational and entertainment purposes only. For medical advice about conception, please consult with a healthcare professional.
```

## 12. File Structure

```
gender-selection-app/
├── index.html
├── css/
│   ├── styles.css
│   ├── calendar.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── shettles.js
│   ├── chinese-calendar.js
│   ├── lunar-conversion.js
│   ├── calendar-visualization.js
│   └── utils.js
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
└── docs/
    └── documentation.md
```

## 13. Development Timeline

1. **Week 1**: Project setup, HTML structure, basic styling
2. **Week 2**: Core JavaScript functionality, calculation logic
3. **Week 3**: Calendar visualization, form validation
4. **Week 4**: Educational content, testing, and refinement
5. **Week 5**: Final polish, cross-browser testing, deployment

This documentation serves as the comprehensive guide for developing the Gender Selection Methods web application. All development should adhere to these specifications to ensure a consistent, user-friendly experience.
