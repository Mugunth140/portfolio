# SSL Setup Guide: Let's Encrypt with Certbot on Azure VM

This guide walks you through setting up SSL/HTTPS for your portfolio on an Azure B1s VM using Let's Encrypt and Certbot.

---

## Prerequisites

- [ ] Azure VM running (Ubuntu 22.04 recommended)
- [ ] SSH access to your VM
- [ ] Domain pointing to your VM's IP address
- [ ] Ports 80 and 443 open in Azure Network Security Group

---

## Step 1: Open Ports in Azure

### Via Azure Portal

1. Go to **Azure Portal** → Your VM → **Networking**
2. Click **Add inbound port rule**
3. Add two rules:

**Rule 1 - HTTP:**
| Setting | Value |
|---------|-------|
| Destination port | 80 |
| Protocol | TCP |
| Name | Allow-HTTP |
| Priority | 300 |

**Rule 2 - HTTPS:**
| Setting | Value |
|---------|-------|
| Destination port | 443 |
| Protocol | TCP |
| Name | Allow-HTTPS |
| Priority | 310 |

### Via Azure CLI

```bash
# Allow HTTP
az vm open-port --port 80 --resource-group YOUR_RG --name YOUR_VM --priority 300

# Allow HTTPS
az vm open-port --port 443 --resource-group YOUR_RG --name YOUR_VM --priority 310
```

---

## Step 2: Install Certbot on the VM

SSH into your Azure VM:

```bash
ssh azureuser@YOUR_VM_IP
```

Install Certbot:

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Certbot
sudo apt install certbot -y

# Create webroot directory for challenges
sudo mkdir -p /var/www/certbot
```

---

## Step 3: Stop Nginx Temporarily

If Nginx container is running, stop it to free port 80:

```bash
docker compose down nginx
# or
docker stop portfolio-nginx
```

---

## Step 4: Obtain SSL Certificate

Run Certbot in standalone mode:

```bash
sudo certbot certonly --standalone \
  -d mugunth.live \
  -d www.mugunth.live \
  --email your@email.com \
  --agree-tos \
  --no-eff-email
```

**What happens:**

1. Certbot starts a temporary web server on port 80
2. Let's Encrypt verifies you control the domain
3. Certificates are saved to `/etc/letsencrypt/live/mugunth.live/`

### Certificate Files Location

```
/etc/letsencrypt/live/mugunth.live/
├── fullchain.pem   # Certificate + intermediate
├── privkey.pem     # Private key
├── cert.pem        # Certificate only
└── chain.pem       # Intermediate certificate
```

---

## Step 5: Set Permissions

Ensure the certificates are readable:

```bash
# Make sure the directory is accessible
sudo chmod 755 /etc/letsencrypt/live
sudo chmod 755 /etc/letsencrypt/archive
```

---

## Step 6: Start Services

Start your containers with SSL:

```bash
cd ~/portfolio
docker compose up -d
```

---

## Step 7: Verify HTTPS Works

Test your site:

```bash
# Check certificate
curl -vI https://mugunth.live 2>&1 | grep -A 5 "Server certificate"

# Or visit in browser
open https://mugunth.live
```

---

## Step 8: Auto-Renewal Setup

Certificates expire every 90 days. Set up automatic renewal:

### Create Renewal Script

```bash
sudo nano /etc/cron.d/certbot-renew
```

Add this content:

```cron
# Renew certificates twice daily (recommended by Let's Encrypt)
0 0,12 * * * root certbot renew --quiet --deploy-hook "docker restart portfolio-nginx"
```

### Alternative: Systemd Timer (Ubuntu 22.04+)

```bash
# Check if timer is already set up
sudo systemctl status certbot.timer

# Enable if not running
sudo systemctl enable --now certbot.timer
```

### Manual Renewal Test

```bash
# Test renewal (dry-run)
sudo certbot renew --dry-run

# Force renewal
sudo certbot renew --force-renewal
```

---

## Troubleshooting

### "Connection refused" on port 80

```bash
# Check if port 80 is open
sudo netstat -tlnp | grep :80

# Check Azure NSG rules
az network nsg rule list --resource-group YOUR_RG --nsg-name YOUR_NSG
```

### "DNS problem: NXDOMAIN"

```bash
# Verify DNS is pointing to your VM
dig mugunth.live +short
# Should return your VM's IP
```

### Certificate not found by Nginx

```bash
# Check certificate exists
sudo ls -la /etc/letsencrypt/live/mugunth.live/

# Check Nginx can read it
docker exec portfolio-nginx cat /etc/letsencrypt/live/mugunth.live/fullchain.pem | head -5
```

### Permission denied for certificates

```bash
# Fix permissions
sudo chmod -R 755 /etc/letsencrypt/live
sudo chmod -R 755 /etc/letsencrypt/archive
```

---

## Alternative: Using Webroot Mode

If you want to renew without stopping Nginx:

### 1. Update Nginx Config

Already configured in `nginx.conf`:

```nginx
location /.well-known/acme-challenge/ {
    root /var/www/certbot;
}
```

### 2. Renew Using Webroot

```bash
sudo certbot certonly --webroot \
  -w /var/www/certbot \
  -d mugunth.live \
  -d www.mugunth.live
```

---

## Quick Reference

### Certificate Locations

| File        | Path                                               |
| ----------- | -------------------------------------------------- |
| Full Chain  | `/etc/letsencrypt/live/mugunth.live/fullchain.pem` |
| Private Key | `/etc/letsencrypt/live/mugunth.live/privkey.pem`   |
| Certificate | `/etc/letsencrypt/live/mugunth.live/cert.pem`      |

### Common Commands

```bash
# View certificate details
sudo openssl x509 -in /etc/letsencrypt/live/mugunth.live/cert.pem -noout -text

# Check expiry date
sudo openssl x509 -in /etc/letsencrypt/live/mugunth.live/cert.pem -noout -dates

# List all certificates
sudo certbot certificates

# Revoke certificate (if needed)
sudo certbot revoke --cert-path /etc/letsencrypt/live/mugunth.live/cert.pem
```

---

## Initial Server Setup Checklist

Before SSL, ensure your server is ready:

```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Docker
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER

# 3. Install Docker Compose
sudo apt install docker-compose-plugin -y

# 4. Create project directory
mkdir -p ~/portfolio/nginx
cd ~/portfolio

# 5. Copy nginx.conf to server
# (scp from your local machine)
scp nginx/nginx.conf azureuser@YOUR_VM_IP:~/portfolio/nginx/

# 6. Create certbot directory
sudo mkdir -p /var/www/certbot

# 7. Get SSL certificate (Step 4 above)

# 8. Start services
docker compose up -d
```

---

## Useful Links

- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Certbot Instructions](https://certbot.eff.org/)
- [Azure VM Networking](https://docs.microsoft.com/azure/virtual-network/network-security-groups-overview)
- [SSL Labs Test](https://www.ssllabs.com/ssltest/) - Test your SSL configuration
