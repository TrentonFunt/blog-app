# Deployment Guide for Tiwa's Blog

This guide will help you deploy your blog application to Vercel and set up the Strapi CMS backend.

## 🚀 Frontend Deployment (Vercel)

### Prerequisites
- GitHub account
- Vercel account
- Strapi CMS deployed and running

### Step 1: Prepare Your Repository

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Verify your build works locally**
   ```bash
   npm run build
   npm run preview
   ```

### Step 2: Deploy to Vercel

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your repository

2. **Configure Environment Variables**
   In the Vercel dashboard, add these environment variables:
   ```
   VITE_STRAPI_URL=https://your-strapi-domain.com
   VITE_STRAPI_API_TOKEN=your_production_api_token
   VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   VITE_CLOUDINARY_API_KEY=your_cloudinary_key
   VITE_CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app
   - You'll get a URL like `https://your-app.vercel.app`

### Step 3: Configure Custom Domain (Optional)

1. **Add Domain in Vercel**
   - Go to your project settings
   - Add your custom domain
   - Update DNS records as instructed

## 🗄️ Backend Deployment (Strapi CMS)

### Option 1: Deploy to Railway

1. **Prepare Strapi for Production**
   ```bash
   cd blog-cms
   npm run build
   ```

2. **Deploy to Railway**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub account
   - Create a new project from your `blog-cms` repository
   - Add environment variables:
     ```
     NODE_ENV=production
     DATABASE_URL=your_production_database_url
     CLOUDINARY_CLOUD_NAME=your_cloudinary_name
     CLOUDINARY_API_KEY=your_cloudinary_key
     CLOUDINARY_API_SECRET=your_cloudinary_secret
     ```

### Option 2: Deploy to Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku App**
   ```bash
   cd blog-cms
   heroku create your-strapi-app-name
   ```

3. **Add Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set DATABASE_URL=your_production_database_url
   heroku config:set CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   heroku config:set CLOUDINARY_API_KEY=your_cloudinary_key
   heroku config:set CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### Option 3: Deploy to DigitalOcean App Platform

1. **Create App in DigitalOcean**
   - Go to DigitalOcean App Platform
   - Create new app from GitHub
   - Select your `blog-cms` repository

2. **Configure Environment**
   - Set build command: `npm run build`
   - Set run command: `npm start`
   - Add environment variables

## ☁️ Cloudinary Setup

1. **Create Cloudinary Account**
   - Go to [cloudinary.com](https://cloudinary.com)
   - Sign up for a free account

2. **Get Credentials**
   - Go to Dashboard
   - Copy your Cloud Name, API Key, and API Secret

3. **Configure in Strapi**
   - Install Cloudinary plugin in Strapi
   - Add credentials to environment variables

## 🔧 Post-Deployment Configuration

### 1. Update CORS Settings

In your deployed Strapi admin panel:
1. Go to Settings → Middlewares
2. Update CORS origin to include your Vercel domain:
   ```
   https://your-app.vercel.app
   https://your-custom-domain.com
   ```

### 2. Create API Token

1. Go to Strapi Admin → Settings → API Tokens
2. Create a new token with "Full access" permissions
3. Copy the token and add it to your Vercel environment variables

### 3. Test Your Deployment

1. **Frontend Tests**
   - Visit your Vercel URL
   - Check if posts load correctly
   - Test search functionality
   - Verify animations work
   - Test responsive design

2. **Backend Tests**
   - Access Strapi admin panel
   - Create a test post
   - Verify image uploads work
   - Check API endpoints

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure Strapi CORS includes your Vercel domain
   - Check that environment variables are set correctly

2. **API Connection Issues**
   - Verify `VITE_STRAPI_URL` points to your deployed Strapi
   - Check that API token has correct permissions

3. **Image Upload Issues**
   - Verify Cloudinary credentials are correct
   - Check file size limits in Strapi

4. **Build Failures**
   - Check for TypeScript errors
   - Verify all dependencies are installed
   - Check Vercel build logs

### Performance Optimization

1. **Enable Vercel Analytics**
   - Add Vercel Analytics to your app
   - Monitor performance metrics

2. **Optimize Images**
   - Use WebP format when possible
   - Implement lazy loading
   - Use Cloudinary transformations

3. **Enable Caching**
   - Configure proper cache headers
   - Use Vercel's edge caching

## 📊 Monitoring

### Vercel Analytics
- Monitor page views and performance
- Track Core Web Vitals
- Analyze user behavior

### Strapi Monitoring
- Monitor API response times
- Track database performance
- Set up error logging

## 🔄 Continuous Deployment

Your app is now set up for continuous deployment:
- Push to `main` branch → Automatic deployment
- Environment variables are securely stored
- Build logs are available in Vercel dashboard

## 🎉 You're Live!

Your blog is now deployed and accessible to the world! 

- **Frontend**: `https://your-app.vercel.app`
- **Strapi Admin**: `https://your-strapi-domain.com/admin`

Remember to:
- Regularly backup your Strapi database
- Monitor your Cloudinary usage
- Keep dependencies updated
- Monitor performance metrics
