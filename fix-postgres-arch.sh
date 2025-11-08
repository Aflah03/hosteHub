#!/bin/bash

echo "🔧 PostgreSQL Fix for Arch Linux"
echo "================================="
echo ""

# Check PostgreSQL version
echo "📌 Checking PostgreSQL version..."
psql --version

echo ""
echo "⚠️  PostgreSQL database format issue detected!"
echo ""
echo "This happens when PostgreSQL is upgraded on Arch Linux."
echo "We need to upgrade the database cluster."
echo ""
echo "🔧 Solution Steps:"
echo "1. Backup old data (if needed)"
echo "2. Initialize new database cluster"
echo "3. Restore data (if you had important data)"
echo ""
echo "Since this is a fresh project, we'll create a new database cluster."
echo ""

read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

echo ""
echo "🗑️  Removing old PostgreSQL data directory..."
sudo rm -rf /var/lib/postgres/data

echo "📦 Initializing new PostgreSQL database cluster..."
sudo -u postgres initdb -D /var/lib/postgres/data

echo "🚀 Starting PostgreSQL service..."
sudo systemctl start postgresql

echo "✅ Enabling PostgreSQL to start on boot..."
sudo systemctl enable postgresql

echo ""
echo "📊 PostgreSQL status:"
sudo systemctl status postgresql --no-pager

echo ""
echo "🔐 Creating database and user..."
sudo -u postgres psql << EOF
CREATE DATABASE hostelhub;
CREATE USER aflah WITH ENCRYPTED PASSWORD 'password123';
GRANT ALL PRIVILEGES ON DATABASE hostelhub TO aflah;
ALTER DATABASE hostelhub OWNER TO aflah;
\q
EOF

echo ""
echo "✅ PostgreSQL setup complete!"
echo ""
echo "📝 Update your .env file with:"
echo 'DATABASE_URL="postgresql://aflah:password123@localhost:5432/hostelhub?schema=public"'
echo ""
echo "🚀 Next steps:"
echo "1. Update .env file"
echo "2. Run: npm run db:push"
echo "3. Run: npm run db:seed"
echo ""
