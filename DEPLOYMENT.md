# Deployment Guide

## 🚀 Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Docker Deployment
```bash
# Build Docker image
docker build -t new-tab-page .

# Run container
docker run -d -p 3000:80 new-tab-page

# Using Docker Compose
docker-compose up -d
```

## 📦 Deployment Options

### 1. Static Hosting

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### GitHub Pages
```bash
# Build project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### 2. Cloud Platforms

#### AWS S3 + CloudFront
```bash
# Build project
npm run build

# Sync to S3
aws s3 sync dist/ s3://your-bucket-name

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

#### Google Cloud Storage
```bash
# Build project
npm run build

# Upload to GCS
gsutil -m rsync -r dist/ gs://your-bucket-name

# Make public
gsutil iam ch allUsers:objectViewer gs://your-bucket-name
```

#### Azure Blob Storage
```bash
# Build project
npm run build

# Upload to Azure
az storage blob upload-batch --account-name your-account --auth-mode key --source dist --destination '$web'
```

### 3. Container Platforms

#### Docker Hub
```bash
# Build image
docker build -t yourusername/new-tab-page .

# Push to Docker Hub
docker push yourusername/new-tab-page

# Run from Docker Hub
docker run -d -p 3000:80 yourusername/new-tab-page
```

#### Kubernetes
```bash
# Apply Kubernetes manifests
kubectl apply -f k8s/

# Check deployment
kubectl get pods
kubectl get services
```

#### AWS ECS
```bash
# Build and push to ECR
aws ecr get-login-password --region region | docker login --username AWS --password-stdin account.dkr.ecr.region.amazonaws.com
docker build -t new-tab-page .
docker tag new-tab-page:latest account.dkr.ecr.region.amazonaws.com/new-tab-page:latest
docker push account.dkr.ecr.region.amazonaws.com/new-tab-page:latest

# Deploy to ECS
aws ecs update-service --cluster your-cluster --service your-service --force-new-deployment
```

### 4. Server Deployment

#### Nginx
```bash
# Build project
npm run build

# Copy to server
scp -r dist/* user@server:/var/www/html/

# Configure Nginx
sudo nano /etc/nginx/sites-available/new-tab-page
```

Nginx configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Apache
```bash
# Build project
npm run build

# Copy to server
scp -r dist/* user@server:/var/www/html/

# Configure Apache
sudo nano /etc/apache2/sites-available/new-tab-page.conf
```

Apache configuration:
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /var/www/html

    <Directory /var/www/html>
        AllowOverride All
        Require all granted
    </Directory>

    <FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg)$">
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
        Header set Cache-Control "public, immutable"
    </FilesMatch>
</VirtualHost>
```

## 🔧 Configuration

### Environment Variables
```bash
# Development
VITE_API_URL=http://localhost:3000
VITE_WEATHER_API_KEY=your_api_key

# Production
VITE_API_URL=https://api.yourdomain.com
VITE_WEATHER_API_KEY=your_production_api_key
```

### Build Configuration
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          icons: ['lucide-react', 'react-icons'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 4173,
  },
})
```

### Docker Configuration
```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔒 Security

### HTTPS Configuration
```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;">
```

## 📊 Monitoring

### Health Check
```bash
# Check if application is running
curl -f http://localhost:3000/health

# Check response time
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:3000/
```

### Logging
```javascript
// Add logging to your application
console.log('Application started');
console.error('Error occurred:', error);
console.warn('Warning:', warning);
```

### Performance Monitoring
```bash
# Lighthouse audit
npx lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html

# Bundle analyzer
npm run analyze
```

## 🔄 CI/CD

### GitHub Actions
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        working-directory: ./
```

### GitLab CI
```yaml
stages:
  - build
  - deploy

build:
  stage: build
  image: node:18
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

deploy:
  stage: deploy
  image: alpine:latest
  script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
    - ssh-keyscan $SERVER_IP >> ~/.ssh/known_hosts
    - scp -r dist/* $SERVER_USER@$SERVER_IP:/var/www/html/
  only:
    - main
```

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache
npm run clean
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version
npm --version
```

#### Deployment Issues
```bash
# Check logs
docker logs container-name
kubectl logs pod-name
nginx -t

# Check permissions
ls -la /var/www/html/
chown -R www-data:www-data /var/www/html/
```

#### Performance Issues
```bash
# Analyze bundle
npm run analyze

# Check network
curl -I https://your-domain.com

# Monitor resources
htop
df -h
free -h
```

## 📈 Optimization

### Bundle Optimization
```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          icons: ['lucide-react', 'react-icons'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
```

### Caching Strategy
```nginx
# Cache static assets
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Cache HTML files
location ~* \.html$ {
    expires 1h;
    add_header Cache-Control "public";
}
```

### Compression
```nginx
# Enable gzip compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_proxied any;
gzip_comp_level 6;
gzip_types
    text/plain
    text/css
    text/xml
    text/javascript
    application/json
    application/javascript
    application/xml+rss
    application/atom+xml
    image/svg+xml;
```

## 🎯 Best Practices

### Performance
- Use CDN for static assets
- Implement lazy loading
- Optimize images
- Minimize HTTP requests
- Use caching strategies

### Security
- Enable HTTPS
- Set security headers
- Implement CSP
- Regular security updates
- Vulnerability scanning

### Monitoring
- Set up health checks
- Monitor performance
- Track errors
- Analyze user behavior
- Regular backups

---

**Happy Deploying! 🚀** 