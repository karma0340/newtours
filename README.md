
# NewTours - Travel Booking Application

A complete full-stack travel booking application built with Next.js 14, MongoDB, and Tailwind CSS.

## Features

- **Public Website**: Hero section, featured tours, search functionality.
- **Tours Management**: Detailed tour pages with itineraries, pricing, and galleries.
- **User Authentication**: Secure login/signup using NextAuth.js (Email/Password + Google).
- **Booking System**: Real-time checking (simulated), booking creation, and payment integration (Razorpay ready).
- **User Profiles**: View booking history and status.
- **Reviews**: User reviews and ratings.
- **Admin Dashboard**: Overview of bookings and stats.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: MongoDB + Mongoose
- **Styling**: Tailwind CSS + Lucide Icons
- **Auth**: NextAuth.js v4
- **Forms**: React Hook Form
- **Animations**: Framer Motion

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Rename `.env.local` (or create it) and add your credentials:

```bash
MONGODB_URI=mongodb+srv://...
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

### 3. Seed Data

To populate the database with initial tours and users, visit:

`http://localhost:3000/api/seed`

This will create:
- Admin User: `admin@example.com` / `admin123`
- Regular User: `john@example.com` / `admin123`
- Several sample Tour packages

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app`: App Router pages and API routes
- `/components`: Reusable UI components
- `/lib`: Utility functions (DB connection, Auth options)
- `/models`: Mongoose database models
- `/public`: Static assets

## Admin Access

Login with the admin credentials creates in the seed step to access `/admin`.
