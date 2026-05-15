# Deployment Guide — Guess Who Online

## Prerequisites

- Ubuntu VPS (e.g., Hetzner)
- Docker & Docker Compose installed
- Domain pointing to your VPS IP (optional but recommended)

## Quick Deploy

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USER/guess-who.git
cd guess-who

# 2. Configure environment
cp .env.example .env
nano .env
# Set NEXT_PUBLIC_SITE_URL to your domain (e.g., https://guess-who.yourdomain.com)

# 3. Build and run
docker compose up -d --build

# 4. Check logs
docker compose logs -f
```

The app will be running on port 3000.

## Nginx Reverse Proxy

Create `/etc/nginx/sites-available/guess-who`:

```nginx
server {
    listen 80;
    server_name guess-who.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;

        # WebSocket support (critical for Socket.IO)
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeout settings for WebSocket
        proxy_read_timeout 86400s;
        proxy_send_timeout 86400s;
    }
}
```

Enable the site:

```bash
ln -s /etc/nginx/sites-available/guess-who /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

## SSL (Let's Encrypt)

```bash
apt install certbot python3-certbot-nginx
certbot --nginx -d guess-who.yourdomain.com
```

## Updates

```bash
cd guess-who
git pull
docker compose up -d --build
```

## Monitoring

```bash
# View logs
docker compose logs -f

# Check container status
docker compose ps

# Restart
docker compose restart
```

## Notes

- **Room state is in-memory.** If the container restarts, all active rooms are lost. This is acceptable for MVP.
- **Single container** runs both the Next.js app and Socket.IO server.
- To scale horizontally later, you'll need Redis for Socket.IO adapter + sticky sessions on your load balancer.
- No database, no auth, no external dependencies. Just Docker.
