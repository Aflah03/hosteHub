# HostelHub - Comprehensive Hostel Management Platform

A full-stack hostel management system with Next.js, Express, PostgreSQL, and AI-powered features.

## 🏗️ Project Structure

```
hostelhub/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed data script
├── src/
│   ├── app/                   # Next.js app directory
│   │   ├── (dashboard)/       # Dashboard routes
│   │   │   ├── admin/         # Admin portal
│   │   │   ├── owner/         # Owner portal
│   │   │   └── student/       # Student portal
│   │   └── page.tsx           # Landing page
│   ├── server/                # Express backend
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Auth middleware
│   │   └── routes/            # API routes
│   ├── components/            # React components
│   ├── ai/                    # Genkit AI flows
│   └── lib/                   # Utilities
├── .env                       # Environment variables
└── package.json
```

## 🚀 Features

### For Students
- Browse and subscribe to messes
- Apply for mess cuts with automatic refunds
- Submit custom diet requests (Veg Only, High Protein, Gym Diet)
- Give feedback with AI sentiment analysis
- Track dues and payments
- Browse laundry and cleaning services

### For Owners
- Manage multiple messes
- View dashboard with analytics
- Handle custom diet requests
- View AI-analyzed feedback
- Track subscriptions and revenue

### For Admins
- Manage all hostels and messes
- User management across roles
- Platform-wide analytics
- Approve/reject messes

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **React Hook Form** + **Zod** for forms

### Backend
- **Express.js** REST API
- **Prisma ORM** for database
- **PostgreSQL** database
- **JWT** authentication
- **bcryptjs** for password hashing

### AI
- **Firebase Genkit** with Google Gemini 2.5 Flash
- Sentiment analysis for feedback

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Git

## 🔧 Installation & Setup

### 1. Clone and Install Dependencies

```bash
cd /home/aflah/Downloads/HOstleHub/hostelhub
npm install
```

### 2. Setup PostgreSQL Database

Create a new PostgreSQL database:

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE hostelhub;

# Exit
\q
```

### 3. Configure Environment Variables

Update `.env` with your database credentials:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/hostelhub?schema=public"
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-change-this
GEMINI_API_KEY=your-gemini-api-key
```

### 4. Setup Database Schema

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with sample data
npm run db:seed
```

### 5. Start Development Servers

You need to run **three** separate terminals:

**Terminal 1: Next.js Frontend**
```bash
npm run dev
# Runs on http://localhost:9002
```

**Terminal 2: Express Backend**
```bash
npm run server:watch
# Runs on http://localhost:3001
```

**Terminal 3: Genkit AI (Optional)**
```bash
npm run genkit:dev
# For AI features
```

## 🔑 Test Credentials

After seeding the database, use these credentials:

### Admin
- **Email:** admin@hostelhub.com
- **Password:** admin123

### Owner
- **Email:** owner1@example.com
- **Password:** owner123

### Student
- **Email:** student1@example.com
- **Password:** student123

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Hostels
- `GET /api/hostels` - Get all hostels
- `GET /api/hostels/:id` - Get hostel by ID
- `POST /api/hostels` - Create hostel (Admin only)
- `PUT /api/hostels/:id` - Update hostel (Admin only)
- `DELETE /api/hostels/:id` - Delete hostel (Admin only)

### Messes
- `GET /api/messes` - Get all messes
- `GET /api/messes/:id` - Get mess by ID
- `GET /api/messes/:id/menu` - Get mess menu
- `POST /api/messes` - Create mess (Owner/Admin)
- `PUT /api/messes/:id` - Update mess (Owner/Admin)
- `DELETE /api/messes/:id` - Delete mess (Owner/Admin)

### Students
- `GET /api/students/profile` - Get student profile
- `PUT /api/students/profile` - Update profile
- `GET /api/students/subscriptions` - Get subscriptions
- `POST /api/students/subscriptions` - Subscribe to mess
- `GET /api/students/mess-cuts` - Get mess cuts
- `POST /api/students/mess-cuts` - Apply for mess cut
- `GET /api/students/custom-requests` - Get custom requests
- `POST /api/students/custom-requests` - Submit custom request
- `GET /api/students/dues` - Get dues

### Owners
- `GET /api/owners/dashboard` - Get dashboard stats
- `GET /api/owners/messes` - Get owner's messes
- `GET /api/owners/custom-requests` - Get custom requests
- `PUT /api/owners/custom-requests/:id` - Update request
- `GET /api/owners/messes/:id/feedback` - Get mess feedback

### Admin
- `GET /api/admin/dashboard` - Get admin dashboard
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/messes` - Get all messes
- `PUT /api/admin/messes/:id/status` - Update mess status

### Feedback
- `POST /api/feedback` - Submit feedback (Student)
- `GET /api/feedback` - Get all feedback
- `GET /api/feedback/mess/:messId` - Get feedback by mess

### Services
- `GET /api/services/laundry` - Get laundry services
- `GET /api/services/cleaning` - Get cleaning services

## 🗄️ Database Schema

### Key Tables
- **users** - All users (students, owners, admins)
- **hostels** - Hostel information
- **messes** - Mess details
- **students** - Student profiles
- **owners** - Owner profiles
- **mess_subscriptions** - Student mess subscriptions
- **mess_cuts** - Mess leave applications
- **custom_requests** - Custom diet requests
- **feedback** - Student feedback with AI sentiment
- **dues** - Payment tracking
- **laundry_services** - Laundry providers
- **cleaning_services** - Cleaning providers
- **menu_items** - Weekly mess menus
- **attendances** - Student attendance tracking

## 🎨 Frontend Routes

### Public
- `/` - Landing page with login

### Student Dashboard
- `/student/dashboard` - Overview
- `/student/browse-mess` - Browse messes
- `/student/custom-plan` - Request custom diet
- `/student/mess-cut` - Apply for leave
- `/student/dues` - Payment tracking
- `/student/feedback` - Submit feedback
- `/student/laundry` - Laundry services
- `/student/cleaning` - Cleaning services

### Owner Dashboard
- `/owner/dashboard` - Analytics
- `/owner/manage-mess` - Manage messes
- `/owner/custom-requests` - Handle requests
- `/owner/feedback` - View feedback

### Admin Dashboard
- `/admin/dashboard` - Platform stats
- `/admin/messes` - Manage all messes
- `/admin/users` - User management

## 🧪 Database Management

```bash
# View database in Prisma Studio
npm run db:studio

# Create new migration
npm run db:migrate

# Reset database
npx prisma migrate reset

# Re-seed database
npm run db:seed
```

## 📝 Scripts

```bash
# Development
npm run dev              # Start Next.js frontend
npm run server           # Start Express backend (once)
npm run server:watch     # Start Express backend (watch mode)
npm run genkit:dev       # Start Genkit AI server

# Database
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run migrations
npm run db:push          # Push schema to DB
npm run db:seed          # Seed database
npm run db:studio        # Open Prisma Studio

# Build & Production
npm run build            # Build Next.js app
npm start                # Start production server
npm run lint             # Run ESLint
npm run typecheck        # TypeScript check
```

## 🔒 Authentication Flow

1. User registers/logs in via `/api/auth/login`
2. Backend returns JWT token
3. Frontend stores token in localStorage
4. All protected API calls include: `Authorization: Bearer <token>`
5. Backend middleware validates token and extracts user info

## 🤖 AI Features

The system uses Google's Gemini 2.5 Flash via Firebase Genkit for:

1. **Sentiment Analysis**: Analyzes student feedback text
   - Determines sentiment (positive/negative/neutral)
   - Provides confidence scores
   - Generates summaries

## 🎯 Next Steps

1. **Install dependencies**: `npm install`
2. **Setup PostgreSQL** and update `.env`
3. **Run migrations**: `npm run db:push`
4. **Seed data**: `npm run db:seed`
5. **Start servers**: Run frontend, backend, and Genkit
6. **Login** with test credentials
7. **Explore** the admin panel at `http://localhost:9002/admin/messes`

## 🐛 Troubleshooting

### Database Connection Error
- Check PostgreSQL is running: `sudo systemctl status postgresql`
- Verify credentials in `.env`
- Ensure database exists: `psql -U postgres -l`

### Port Already in Use
- Frontend (9002): Change in `package.json` dev script
- Backend (3001): Change `PORT` in `.env`

### Prisma Client Error
- Regenerate client: `npm run db:generate`
- Delete `node_modules/.prisma` and regenerate

## 📄 License

MIT

## 👥 Contributors

- Aflah (aflah03)

---

**Happy Coding! 🚀**
