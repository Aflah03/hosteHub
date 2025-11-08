# HostelHub - Quick Start Guide

## 🚀 One-Time Setup

```bash
cd /home/aflah/Downloads/HOstleHub/hostelhub

# 1. Install dependencies
npm install

# 2. Update .env file with your PostgreSQL credentials
# DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/hostelhub?schema=public"

# 3. Setup database
npm run db:generate  # Generate Prisma client
npm run db:push      # Create database schema
npm run db:seed      # Insert sample data
```

## 🎯 Running the Application

**You need 3 terminal windows:**

### Terminal 1: Frontend (Next.js)
```bash
npm run dev
# Runs on http://localhost:9002
```

### Terminal 2: Backend (Express API)
```bash
npm run server:watch
# Runs on http://localhost:3001
```

### Terminal 3: AI Server (Optional)
```bash
npm run genkit:dev
# For sentiment analysis features
```

## 🔑 Test Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@hostelhub.com | admin123 |
| **Owner** | owner1@example.com | owner123 |
| **Student** | student1@example.com | student123 |

## 📍 Important URLs

- **Frontend**: http://localhost:9002
- **Backend API**: http://localhost:3001
- **API Health**: http://localhost:3001/health
- **Prisma Studio**: Run `npm run db:studio` (port 5555)

## 🎭 Demo Flow for Presentation

1. **Login as Admin** → `/admin/messes`
   - Show all messes table
   - Toggle mess status (active/inactive)

2. **Login as Student** → `/student/browse-mess`
   - Browse messes
   - View mess details and menu
   - Submit feedback

3. **Login as Owner** → `/owner/dashboard`
   - Show analytics
   - View custom requests
   - Check AI-analyzed feedback

## 📊 Key Features to Highlight

### Technical
- ✅ Full-stack TypeScript (Next.js + Express)
- ✅ PostgreSQL with Prisma ORM
- ✅ JWT authentication with role-based access
- ✅ RESTful API with 40+ endpoints
- ✅ AI-powered sentiment analysis (Gemini 2.5)
- ✅ 15+ normalized database tables
- ✅ Type-safe development

### Non-Technical
- ✅ Multi-role platform (Student/Owner/Admin)
- ✅ Mess subscription management
- ✅ Automated mess cut refunds
- ✅ Custom diet requests
- ✅ AI feedback insights
- ✅ Dues tracking
- ✅ Service marketplace (laundry/cleaning)

## 🗄️ Database Commands

```bash
# View database in GUI
npm run db:studio

# Reset database
npx prisma migrate reset

# Re-seed with fresh data
npm run db:seed

# Generate Prisma client after schema changes
npm run db:generate
```

## 🐛 Troubleshooting

### PostgreSQL not running
```bash
sudo systemctl start postgresql
sudo systemctl status postgresql
```

### Port already in use
```bash
# Find process using port
lsof -ti:3001
# Kill it
kill -9 <PID>
```

### Database connection error
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Ensure database exists: `psql -U postgres -l`

### Prisma Client error
```bash
rm -rf node_modules/.prisma
npm run db:generate
```

## 📁 Project Structure

```
hostelhub/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Sample data
├── src/
│   ├── app/               # Next.js pages
│   │   └── (dashboard)/   # Protected routes
│   ├── server/            # Express backend
│   │   ├── controllers/   # Business logic
│   │   ├── routes/        # API routes
│   │   └── middleware/    # Auth, etc.
│   ├── components/        # React components
│   └── lib/               # Utilities
├── .env                   # Environment variables
└── package.json           # Dependencies & scripts
```

## 🎯 API Endpoints Overview

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login` | POST | Login |
| `/api/auth/register` | POST | Register |
| `/api/hostels` | GET | Get all hostels |
| `/api/messes` | GET | Get all messes |
| `/api/admin/messes` | GET | Admin: Get all messes |
| `/api/students/subscriptions` | GET | Get student subscriptions |
| `/api/students/mess-cuts` | POST | Apply for mess cut |
| `/api/feedback` | POST | Submit feedback |

## 📝 Seeded Data Summary

- **3 Hostels** (Mumbai, Pune, Bangalore)
- **4 Messes** (Veg, Non-Veg, High-Protein)
- **5 Students** with complete profiles
- **2 Owners** managing messes
- **1 Admin** user
- **5 Feedback** entries with AI sentiment
- **2 Mess Cuts** (approved/pending)
- **4 Dues** records
- **2 Laundry Services**
- **2 Cleaning Services**
- **Weekly Menu** items

## 🎤 Presentation Talking Points

### Problem (30 sec)
"Students struggle to find quality mess services, apply for leave, and track payments. Owners lack insights into satisfaction. HostelHub solves this."

### Solution (30 sec)
"A full-stack platform with 3 user roles, automated mess management, AI-powered feedback analysis, and seamless leave processing."

### Tech Stack (30 sec)
"Next.js 15 frontend, Express.js backend, PostgreSQL database, Prisma ORM, JWT auth, and Google Gemini AI for sentiment analysis."

### Demo (2-3 min)
1. Admin panel → Show mess list
2. Student portal → Browse and subscribe
3. Owner dashboard → View AI feedback

### Impact (30 sec)
"Reduces admin overhead, improves student satisfaction, helps owners optimize service, scalable to multiple hostels."

## ✅ Pre-Presentation Checklist

- [ ] PostgreSQL running
- [ ] Database seeded
- [ ] All 3 servers running (frontend/backend/AI)
- [ ] Test login with all 3 roles
- [ ] Open demo tabs in browser
- [ ] Backup screenshots ready
- [ ] Know your tech stack cold
- [ ] Practice demo 2-3 times

## 📚 Documentation Files

- `SETUP_GUIDE.md` - Detailed setup instructions
- `PRESENTATION_GUIDE.md` - Full presentation script
- `README.md` - Project overview
- `.env.example` - Environment template

---

**Good luck! 🚀 You've got this!**
