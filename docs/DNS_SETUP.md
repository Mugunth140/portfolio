# DNS Setup Guide: Name.com + Resend Domain Verification

This guide walks you through configuring your custom domain with Resend for sending emails from `hello@mugunth.live`.

---

## Prerequisites

- [ ] A domain registered with name.com (or any DNS provider)
- [ ] A Resend account (free tier is fine)
- [ ] Access to your domain's DNS settings

---

## Step 1: Add Domain to Resend

1. **Go to Resend Dashboard**
   - Visit [resend.com/domains](https://resend.com/domains)
   - Click **"Add Domain"**

2. **Enter Your Domain**
   - Enter: `mugunth.live` (your domain without `www`)
   - Click **"Add"**

3. **Resend Will Show DNS Records**
   - You'll see a list of DNS records to add
   - Keep this page open - you'll need to copy these records

---

## Step 2: Add DNS Records in Name.com

### Navigate to DNS Settings

1. Log into [name.com](https://name.com)
2. Go to **My Domains** → Select your domain
3. Click **DNS Records** or **Manage DNS**

### Add SPF Record (TXT)

| Field        | Value                                 |
| ------------ | ------------------------------------- |
| Type         | TXT                                   |
| Host         | `@` or leave blank                    |
| Answer/Value | `v=spf1 include:_spf.resend.com ~all` |
| TTL          | 3600 (or default)                     |

> **Note:** If you already have an SPF record, add `include:_spf.resend.com` before `~all`

### Add DKIM Records (CNAME)

Resend will provide 3 DKIM records. Add each one:

**Record 1:**
| Field | Value |
|-------|-------|
| Type | CNAME |
| Host | `resend._domainkey` |
| Answer | (copy from Resend dashboard) |
| TTL | 3600 |

**Record 2:**
| Field | Value |
|-------|-------|
| Type | CNAME |
| Host | `resend2._domainkey` |
| Answer | (copy from Resend dashboard) |
| TTL | 3600 |

**Record 3:**
| Field | Value |
|-------|-------|
| Type | CNAME |
| Host | `resend3._domainkey` |
| Answer | (copy from Resend dashboard) |
| TTL | 3600 |

### Add DMARC Record (TXT) - Optional but Recommended

| Field  | Value                                             |
| ------ | ------------------------------------------------- |
| Type   | TXT                                               |
| Host   | `_dmarc`                                          |
| Answer | `v=DMARC1; p=none; rua=mailto:dmarc@mugunth.live` |
| TTL    | 3600                                              |

---

## Step 3: Verify Domain in Resend

1. **Go Back to Resend**
   - Return to [resend.com/domains](https://resend.com/domains)
   - Click on your domain

2. **Click "Verify DNS Records"**
   - Resend will check if your records are configured correctly
   - DNS propagation can take 5 minutes to 48 hours

3. **Check Verification Status**
   - ✅ Green checkmarks = Records verified
   - ⏳ Pending = Still propagating, wait and try again
   - ❌ Red = Check for typos in your DNS records

---

## Step 4: Get Your API Key

1. Go to [resend.com/api-keys](https://resend.com/api-keys)
2. Click **"Create API Key"**
3. Name it (e.g., "Portfolio Contact Form")
4. Select permission: **"Sending access"**
5. Choose domain: Your verified domain
6. Copy the API key (starts with `re_`)
7. **Save it securely** - you won't see it again!

---

## Step 5: Configure Your Application

### Local Development

Create `.env.local` in your project root:

```env
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL_FROM=hello@mugunth.live
CONTACT_EMAIL_TO=your@personalemail.com
```

### GitHub Actions Secrets

Add these secrets in GitHub (Settings → Secrets → Actions):

- `RESEND_API_KEY` - Your Resend API key
- `CONTACT_EMAIL_FROM` - `hello@mugunth.live`
- `CONTACT_EMAIL_TO` - Your personal email

---

## DNS Records Summary

Here's a complete example of what your DNS should look like:

| Type  | Host                 | Value                                 |
| ----- | -------------------- | ------------------------------------- |
| A     | `@`                  | `YOUR_AZURE_VM_IP`                    |
| A     | `www`                | `YOUR_AZURE_VM_IP`                    |
| TXT   | `@`                  | `v=spf1 include:_spf.resend.com ~all` |
| CNAME | `resend._domainkey`  | (from Resend)                         |
| CNAME | `resend2._domainkey` | (from Resend)                         |
| CNAME | `resend3._domainkey` | (from Resend)                         |
| TXT   | `_dmarc`             | `v=DMARC1; p=none;`                   |

---

## Troubleshooting

### DNS Not Propagating

```bash
# Check DNS propagation
dig TXT mugunth.live +short
dig CNAME resend._domainkey.mugunth.live +short
```

### Emails Going to Spam

1. Ensure DKIM records are verified ✅
2. Add DMARC record
3. Warm up your domain by sending gradually

### "Domain not verified" Error

1. Wait 24-48 hours for propagation
2. Double-check record values (no trailing dots)
3. Try verifying again in Resend dashboard

---

## Useful Links

- [Resend Documentation](https://resend.com/docs)
- [Name.com DNS Help](https://www.name.com/support/articles/115004972547-Adding-a-DNS-record)
- [DNS Propagation Checker](https://dnschecker.org)
- [MX Toolbox SPF Check](https://mxtoolbox.com/spf.aspx)
