# Web Home - Minecraft Home Teleportation Web Interface

A web-based interface that allows players to teleport to their Minecraft homes using RCON protocol. This works with vanilla servers and provides a secure authentication system.

## Features

- 🔐 Secure authentication system
- 🏠 Manage multiple homes per user (up to 3 by default)
- 🌐 Web interface for easy home teleportation
- 🔧 Works with all Minecraft server versions via RCON, includes vanilla and forks
- 📱 Responsive design
- 🚀 Built with Next.js 15 and TypeScript

## Prerequisites

Before setting up on your VPS, ensure you have:

- A VPS with Ubuntu 20.04+ or similar Linux distribution
- A Minecraft 1.16+ server with RCON enabled
- A domain name (optional but recommended)
- Basic knowledge of Linux command line

## VPS Setup Guide

### 1. Initial Server Setup

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install essential tools
sudo apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release

# Install Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm (package manager)
curl -fsSL https://get.pnpm.io/install.sh | sh -
source ~/.bashrc

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Start and enable PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. Database Setup

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE webhome;
CREATE USER webhome_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE webhome TO webhome_user;
\q
```

### 3. Application Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd web-home

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
```

### 4. Environment Configuration

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://webhome_user:your_secure_password@localhost:5432/webhome"

# Authentication
AUTH_SECRET="your-super-secret-auth-key-here"
NEXTAUTH_URL="https://your-domain.com"

# RCON Configuration
RCON_HOST="localhost"
RCON_PORT="25575"
RCON_PASSWORD="your-rcon-password"

# Email Configuration (for authentication)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
```

### 5. Database Migration

```bash
# Generate Prisma client
pnpm prisma generate

# Run database migrations
pnpm prisma db push

# (Optional) View database in Prisma Studio
pnpm prisma studio
```

### 6. Build and Test

```bash
# Build the application
pnpm build

# Test the build
pnpm start
```

### 7. Production Deployment with PM2

```bash
# Install PM2 globally
sudo npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'web-home',
    script: 'pnpm',
    args: 'start',
    cwd: '/path/to/your/web-home',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOF

# Start the application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save
pm2 startup
```

### 8. Nginx Reverse Proxy Setup

```bash
# Install Nginx
sudo apt install -y nginx

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/web-home
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

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
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/web-home /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 9. SSL Certificate (Optional but Recommended)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Set up auto-renewal
sudo crontab -e
# Add this line: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Minecraft Server Configuration

### Required server.properties Settings

You need to modify your `server.properties` file to enable RCON:

```properties
# Enable RCON
enable-rcon=true

# RCON port (default: 25575)
rcon.port=25575

# RCON password (use a strong password)
rcon.password=your-secure-rcon-password

# RCON password (for older versions)
rcon.password=your-secure-rcon-password

# Optional: Restrict RCON to specific IP (recommended for security)
rcon.password=your-secure-rcon-password
```

### Additional Security Recommendations

```properties
# Disable online mode if using a proxy (BungeeCord/Waterfall)
online-mode=false

# Set a strong server password
server-ip=
server-port=25565

# Enable whitelist for additional security
white-list=true

# Set maximum players
max-players=20
```

### RCON Security Best Practices

1. **Use a strong RCON password** - At least 16 characters with mixed case, numbers, and symbols
2. **Restrict RCON access** - Only allow connections from your web server's IP
3. **Use a non-standard RCON port** - Change from default 25575 to something else
4. **Firewall configuration** - Only allow RCON port access from your web server

Example firewall rules:
```bash
# Allow RCON only from web server IP
sudo ufw allow from YOUR_WEB_SERVER_IP to any port 25575
```

## Usage

1. **Player Registration**: Players visit your website and register with their email
2. **In gmae chat Verification**: A verification link is sent to their in game chat.
3. **Home Management**: Players can set up to 3 homes using the web interface
4. **Web Teleportation**: Players can teleport to their homes via the web interface

## Troubleshooting

### Common Issues

1. **RCON Connection Failed**
   - Verify RCON is enabled in server.properties
   - Check RCON password matches environment variable
   - Ensure firewall allows RCON port access

2. **Database Connection Issues**
   - Verify PostgreSQL is running: `sudo systemctl status postgresql`
   - Check DATABASE_URL format and credentials
   - Ensure database exists and user has proper permissions

3. **Authentication Not Working**
   - Verify AUTH_SECRET is set and unique
   - Check NEXTAUTH_URL matches your domain
   - Ensure email configuration is correct

4. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules pnpm-lock.yaml && pnpm install`
   - Check Node.js version: `node --version` (should be 18+)

### Logs and Debugging

```bash
# View PM2 logs
pm2 logs web-home

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# View PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-*.log
```

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run database migrations
pnpm prisma db push

# Generate Prisma client
pnpm prisma generate
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Author

Created by y4 - [https://y4.gg](https://y4.gg)
