# 🗄️ EC2 Backend Deployment with PostgreSQL

## Current Status: ✅ Backend Code Updated on GitHub!

Your Django backend is ready for deployment to EC2 with PostgreSQL database.

**Backend Repository**: https://github.com/nabin216/Scholar-Scanner-backend

## **Step 1: Deploy Backend from GitHub**

```bash
# SSH into your EC2 instance
ssh -i "scholarscanner.pem" ubuntu@ec2-13-61-181-192.eu-north-1.compute.amazonaws.com

# Navigate to backend directory
cd /var/www/scholarship-portal/Scholar-Scanner-backend

# Set ownership and pull latest changes
sudo chown -R ubuntu:ubuntu /var/www/scholarship-portal/Scholar-Scanner-backend
git pull origin master

# Check what we have
ls -la
```

## **Step 2: Set Up Python Environment**

```bash
# Install Python and PostgreSQL client
sudo apt update
sudo apt install python3 python3-pip python3-venv postgresql-client libpq-dev -y

# Create/activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Upgrade pip and install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Install additional production dependencies
pip install gunicorn psycopg2-binary
```

## **Step 3: Configure PostgreSQL Database**

```bash
# Create PostgreSQL database and user
sudo -u postgres psql << EOF
CREATE DATABASE scholarship_db;
CREATE USER scholarship_user WITH PASSWORD 'your_secure_password_here';
GRANT ALL PRIVILEGES ON DATABASE scholarship_db TO scholarship_user;
ALTER USER scholarship_user CREATEDB;
\q
EOF

# Test database connection
psql -h localhost -U scholarship_user -d scholarship_db -c "SELECT version();"
```

## **Step 4: Configure Environment Variables**

```bash
# Create production environment file with PostgreSQL
cat > .env << EOF
DEBUG=False
SECRET_KEY=your-super-secret-production-key-change-this-immediately
ALLOWED_HOSTS=13.61.181.192,localhost,127.0.0.1
DATABASE_URL=postgresql://scholarship_user:your_secure_password_here@localhost:5432/scholarship_db
CORS_ALLOWED_ORIGINS=http://13.61.181.192
CORS_ALLOW_ALL_ORIGINS=False

# Email Configuration (if needed)
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend

# Security Settings
SECURE_SSL_REDIRECT=False
SECURE_BROWSER_XSS_FILTER=True
SECURE_CONTENT_TYPE_NOSNIFF=True
X_FRAME_OPTIONS=DENY
EOF
```

## **Step 5: Run Django Setup with PostgreSQL**

```bash
# Activate virtual environment
source venv/bin/activate

# Test database connection
python manage.py check --database default

# Run migrations to create tables
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Create superuser
python manage.py shell -c "
from django.contrib.auth.models import User
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
    print('✅ Admin user created: admin/admin123')
else:
    print('ℹ️ Admin user already exists')
"

# Create sample scholarship data (optional)
python create_sample_scholarships.py || echo "Sample data script not found, skipping..."
```

## **Step 6: Start Backend with PM2**

```bash
# Start Django with Gunicorn via PM2
pm2 start gunicorn --name "scholarship-backend" -- --bind 0.0.0.0:8000 scholarships_api.wsgi:application

# Check status
pm2 status

# View logs
pm2 logs scholarship-backend

# Save PM2 configuration
pm2 save
```

## **Step 7: Test Backend Endpoints**

```bash
# Test API endpoints
echo "Testing API root:"
curl http://localhost:8000/api/

echo "Testing scholarships endpoint:"
curl http://localhost:8000/api/scholarships/

echo "Testing admin endpoint:"
curl http://localhost:8000/admin/

# Check database tables
python manage.py shell -c "
from scholarships.models import Scholarship
print(f'Total scholarships: {Scholarship.objects.count()}')
"
```

## **Step 8: Verify Full Stack**

Test these URLs in your browser:

- **Frontend**: http://13.61.181.192 ✅
- **API Root**: http://13.61.181.192/api/ (should show DRF browsable API)
- **Scholarships**: http://13.61.181.192/api/scholarships/ (should show scholarship data)
- **Admin**: http://13.61.181.192/admin/ (login: admin/admin123)

## **Troubleshooting Commands**

### Database Issues:
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Connect to database manually
psql -h localhost -U scholarship_user -d scholarship_db

# Check Django database configuration
python manage.py dbshell
```

### Application Issues:
```bash
# Check Django logs
pm2 logs scholarship-backend

# Test Django directly
python manage.py runserver 0.0.0.0:8000

# Check database migrations
python manage.py showmigrations

# Run Django checks
python manage.py check
```

### Service Status:
```bash
# Check all PM2 processes
pm2 status

# Check listening ports
sudo netstat -tlnp | grep -E ':80|:3000|:8000|:5432'

# Restart services
pm2 restart scholarship-backend
pm2 restart scholarship-frontend
```

## **Database Management Commands**

```bash
# Backup database
pg_dump -h localhost -U scholarship_user scholarship_db > backup.sql

# Restore database
psql -h localhost -U scholarship_user scholarship_db < backup.sql

# Reset database (if needed)
python manage.py flush
python manage.py migrate
```

## **Security Checklist**

- ✅ DEBUG=False in production
- ✅ Strong SECRET_KEY set
- ✅ ALLOWED_HOSTS configured
- ✅ PostgreSQL user with limited privileges
- ✅ CORS properly configured
- ✅ Static files served efficiently

---

## **🎯 Final Architecture**

```
Internet → EC2 (13.61.181.192) → Nginx → {
    / → Next.js Frontend (Port 3000)
    /api/ → Django Backend (Port 8000) → PostgreSQL (Port 5432)
    /admin/ → Django Admin (Port 8000)
}
```

**🚀 Start with Step 1 and let me know how each step goes!**
