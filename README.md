# Frontend - E-commerce Application

This is the frontend of the E-commerce application built with Next.js. It provides a responsive user interface for browsing products, viewing product details, and managing a shopping cart.

## Features

- Product listing with search functionality
- Product details page with quantity selection
- Cart management with add, update, and remove functionalities
- Responsive design for mobile and desktop views

## Technologies Used

- Next.js
- React
- Tailwind CSS (for styling)
- Context API (for state management)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

### Environment Variables

You may need to set up environment variables for API endpoints. Create a `.env.local` file in the root of the frontend directory and add the following:
NEXT_PUBLIC_API_URL=http://localhost:5000/api
