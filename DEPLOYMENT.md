# Deployment Guide for OffRoute Chronicles

## Quick Start Deployment

### Option 1: Vercel (Recommended)

1. **Sign up for Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

2. **Deploy from GitHub:**
   - Click "Import Project"
   - Select your `offRoute-Chronicles` repository
   - Vercel will auto-detect it's a React app
   - Add environment variables if needed (REACT_APP_API_URL)
   - Click Deploy

3. **Auto-deployment:**
   - Every push to `main` branch will auto-deploy
   - Get a live URL instantly

### Option 2: Deploy Locally with Build

```bash
# Install dependencies
npm install

# Build for production
npm run build

# The build folder is ready to be deployed
```

### Environment Variables

Create a `.env.local` file in the root directory:
```
REACT_APP_API_URL=https://your-api-domain.com
```

## What's Been Set Up

✅ **package.json** - All dependencies configured
✅ **Tailwind CSS** - Styling configured
✅ **PostCSS** - CSS processing configured
✅ **Vercel Config** - Optimized for Vercel deployment
✅ **.gitignore** - Proper git configuration
✅ **Build Scripts** - Production-ready build command

## Post-Deployment

After deployment:
1. Verify all routes work (Home, Stories, Destinations, About)
2. Check API connectivity
3. Test responsive design on mobile
4. Monitor Vercel dashboard for any issues

## Support

- Vercel Docs: https://vercel.com/docs
- React Docs: https://react.dev
- Tailwind Docs: https://tailwindcss.com/docs
