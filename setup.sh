#!/bin/bash

echo "🚀 HostelHub Setup Script"
echo "========================="
echo ""

# Check if PostgreSQL is running
echo "📊 Checking PostgreSQL status..."
if ! systemctl is-active --quiet postgresql; then
    echo "⚠️  PostgreSQL is not running. Starting it..."
    sudo systemctl start postgresql
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env with your database credentials!"
    exit 1
fi

# Generate Prisma Client
echo "🔨 Generating Prisma client..."
npm run db:generate

# Push schema to database
echo "📤 Pushing database schema..."
npm run db:push

# Seed database
echo "🌱 Seeding database with sample data..."
npm run db:seed

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Open 3 terminal windows"
echo "2. Terminal 1: npm run dev          (Frontend on :9002)"
echo "3. Terminal 2: npm run server:watch (Backend on :3001)"
echo "4. Terminal 3: npm run genkit:dev   (AI features)"
echo ""
echo "🔑 Test credentials:"
echo "Admin:   admin@hostelhub.com / admin123"
echo "Owner:   owner1@example.com / owner123"
echo "Student: student1@example.com / student123"
echo ""
echo "🌐 Visit: http://localhost:9002"
echo ""
