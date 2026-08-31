# 🚀 EC2 Frontend Deployment Instructions

## Current Status: ✅ Frontend Build Complete!

Your Next.js frontend has been successfully built and is ready for deployment to your existing EC2 instance.

**Current EC2 Setup:**
- **Backend**: `/var/www/scholarship-portal/Scholar-Scanner-backend` (Django)
- **Frontend**: `/var/www/scholarship-portal/scholarship-scanner-frontend` (Next.js)
- **IP**: `13.61.181.192`

## Option 1: Deploy from Existing GitHub Repository (Recommended)

### Step 1: Update System and Install Requirements
```bash
# SSH into your EC2 instance
ssh -i "your-ec2-key.pem" ubuntu@ec2-13-61-181-192.eu-north-1.compute.amazonaws.com

# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Git (if not already installed)
sudo apt install git -y

# Install Node.js 18 (LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Verify installations
node --version
npm --version
git --version
```

### Step 2: Navigate to Existing Frontend Directory
```bash
# Navigate to your existing frontend directory
cd /var/www/scholarship-portal/scholarship-scanner-frontend

# Check what's in the directory
ls -la

# Set proper ownership
sudo chown -R ubuntu:ubuntu /var/www/scholarship-portal/scholarship-scanner-frontend

# Pull latest changes from GitHub (make sure you're on the right branch)
git pull origin main

# Install dependencies
npm install

# Create production environment file
cat > .env.production << EOF
NEXT_PUBLIC_API_URL=http://13.61.181.192/api
NEXT_PUBLIC_BASE_URL=http://13.61.181.192
NODE_ENV=production
EOF

# Build the application
npm run build

# Start the frontend with PM2
pm2 start node --name "scholarship-frontend" -- .next/standalone/server.js

# Set PM2 to start on boot
pm2 startup
# Copy and run the command that PM2 outputs
pm2 save
```

### Step 3: Check Status
```bash
# Check if frontend is running
pm2 status
pm2 logs scholarship-frontend

# Check if Next.js is listening on port 3000
sudo netstat -tlnp | grep :3000
```

### Step 4: Configure Nginx
```bash
# Install Nginx
sudo apt install nginx -y

# Create Nginx configuration for both frontend and backend
sudo tee /etc/nginx/sites-available/scholarship-portal > /dev/null << 'EOF'
server {
    listen 80 default_server;
    server_name _;

    # Frontend static files (CSS, JS, images)
    location /_next/static/ {
        alias /var/www/scholarship-portal/scholarship-scanner-frontend/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Django static files
    location /static/ {
        alias /var/www/scholarship-portal/Scholar-Scanner-backend/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Backend API (Django)
    location /api/ {
        proxy_pass http://localhost:8000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Django Admin
    location /admin/ {
        proxy_pass http://localhost:8000/admin/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Frontend (Next.js) - catch all other routes
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable the site and restart Nginx
sudo ln -sf /etc/nginx/sites-available/scholarship-portal /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test and start Nginx
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl restart nginx
```

### Step 5: Verify Deployment
```bash
# Check all services are running
pm2 status
sudo systemctl status nginx

# Check ports are listening
sudo netstat -tlnp | grep -E ':80|:3000'

# Check logs if needed
pm2 logs scholarship-frontend
sudo tail -f /var/log/nginx/error.log
```

## Future Updates

To update your frontend from GitHub:

```bash
cd /var/www/scholarship-portal/scholarship-scanner-frontend
git pull origin main
npm install
npm run build
pm2 restart scholarship-frontend
```

## Current Directory Structure

Your EC2 instance should have:

```
/var/www/scholarship-portal/
├── scholarship-scanner-frontend/    # Next.js Frontend
└── Scholar-Scanner-backend/         # Django Backend
```

## Option 2: Static Deployment (Alternative)

If you prefer static deployment, modify `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true }
};

module.exports = nextConfig;
```

Then rebuild and deploy to `/var/www/html/`.

## Testing Your Deployment

After deployment, test these URLs:

- **Frontend**: http://13.61.181.192 ✅
- **API**: http://13.61.181.192/api/ ✅
- **Admin**: http://13.61.181.192/admin/ ✅

## Final Architecture

```
Internet → EC2 (13.61.181.192) → Nginx → {
    / → Next.js Frontend (Port 3000)
    /api/ → Django Backend (Port 8000)
    /admin/ → Django Admin (Port 8000)
}
```

## Next Steps After Deployment

1. **Test the full application flow**
2. **Set up SSL certificate** (Let's Encrypt)
3. **Configure domain name** (optional)
4. **Set up monitoring and logging**

---

---

## 🚀 **Quick Commands for Your Current Setup**

Since you already have the directories, here are the exact commands to run in your SSH session:

```bash
# 1. Navigate to frontend directory
cd /var/www/scholarship-portal/scholarship-scanner-frontend

# 2. Set ownership and update code
sudo chown -R ubuntu:ubuntu /var/www/scholarship-portal/scholarship-scanner-frontend
git pull origin main

# 3. Install dependencies and setup environment
npm install
cat > .env.production << EOF
NEXT_PUBLIC_API_URL=http://13.61.181.192/api
NEXT_PUBLIC_BASE_URL=http://13.61.181.192
NODE_ENV=production
EOF

# 4. Build and start
npm run build
pm2 start node --name "scholarship-frontend" -- .next/standalone/server.js

# 5. Configure auto-start
pm2 startup
pm2 save

# 6. Setup Nginx (if not done already)
sudo apt install nginx -y
# [Run the Nginx configuration from Step 4 above]

# 7. Check status
pm2 status
sudo systemctl status nginx
```

**🎯 Your frontend will be live at: http://13.61.181.192**

---

**🎯 Your frontend is ready to deploy! Choose Option 1 for full Next.js features or Option 2 for static deployment.**
