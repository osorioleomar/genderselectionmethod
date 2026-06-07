# Natural Gender Selection Methods Web Application

A Next.js web application that helps couples explore traditional gender selection methods for family planning: the Shettles Method and the Chinese Birth Calendar.

## Overview

This application provides users with a simple, informative tool to explore traditional gender selection methods while being transparent about their scientific limitations. It includes:

- Interactive calculators for both the Shettles Method and Chinese Birth Calendar
- Visual calendar representations of fertile periods and recommended conception dates
- In-depth educational content about each method and their scientific context
- Mobile-responsive design optimized for all devices

## Features

### Shettles Method Calculator
- Input your last menstrual period date and cycle length
- Select your desired gender (boy or girl)
- Get personalized recommendations based on Dr. Shettles' research
- View a detailed calendar visualization of your fertile window and recommended dates

### Chinese Birth Calendar
- Input mother's date of birth and planned conception year
- Select your desired gender (boy or girl)
- View favorable months for conception based on the ancient Chinese Birth Calendar
- See a complete chart of gender predictions for all months of the year

### Educational Resources
- Learn about the biological foundation of each method
- Understand the scientific context and success rates
- Access comprehensive FAQ section addressing common questions
- Find detailed tracking methods for identifying ovulation accurately

## Tech Stack

- **Next.js 15** (App Router) with static export
- **React 19** + **TypeScript**
- **Tailwind CSS** for styling
- **react-datepicker** for date inputs
- **lucide-react** for icons

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
```

Static files are exported to the `out/` directory and can be deployed to any static hosting provider (Vercel, Netlify, GitHub Pages, etc.).

## Project Structure

```
app/              # Next.js App Router pages and layout
components/       # React components (wizard, calendar, education)
lib/              # Pure calculation logic (Shettles, Chinese calendar)
public/           # Static assets (favicon, robots.txt)
```

## Disclaimer

The methods presented in this application are based on traditional beliefs and theories that have not been scientifically proven to significantly influence baby gender. The Shettles Method and Chinese Birth Calendar are not guaranteed to produce the desired results. This application is for informational and entertainment purposes only. For medical advice about conception, please consult with a healthcare professional.

## License

This project is open source and available under the [MIT License](LICENSE).
