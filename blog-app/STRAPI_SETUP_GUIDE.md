# Strapi Backend Setup Guide

## 🎉 Great Progress! Your Strapi backend is almost ready.

### What's Been Set Up:
✅ Strapi CMS installed and configured  
✅ Post content type with all required fields  
✅ CORS configured for React frontend  
✅ API routes and controllers created  
✅ Cloudinary provider installed  
✅ React frontend integrated with API service  
✅ Context + useReducer state management implemented  

### Next Steps to Complete Setup:

## 1. Start Strapi Admin Panel
```bash
cd ../blog-cms
npm run develop
```
- Open http://localhost:1338/admin
- Create your admin account
- Go to Content Manager → Post
- Create some sample posts

## 2. Configure Cloudinary (Optional but Recommended)
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get your credentials from the dashboard
3. Add to your `.env` file in the blog-cms directory:
```env
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
```

## 3. Test the Integration
1. Start your React app: `npm run dev`
2. Start Strapi: `npm run develop` (in blog-cms directory)
3. Create some posts in Strapi admin
4. Check if they appear in your React app

## 4. API Endpoints Available:
- `GET /api/posts` - Get all published posts
- `GET /api/posts/slug/:slug` - Get post by slug
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

## 5. Content Type Structure:
```json
{
  "title": "string (required)",
  "slug": "uid (auto-generated from title)",
  "excerpt": "text (optional)",
  "content": "richtext (required)",
  "category": "string (required)",
  "readTime": "integer (default: 5)",
  "coverImage": "media (optional)",
  "author": {
    "name": "string",
    "avatar": "media",
    "bio": "text"
  }
}
```

## 6. Troubleshooting:
- **CORS errors**: Check middlewares.ts configuration
- **404 errors**: Ensure Strapi is running on port 1338
- **Image upload issues**: Configure Cloudinary credentials
- **Authentication errors**: Posts are set to public access

## 7. Next Development Steps:
1. Add authentication (optional for this project)
2. Implement rich text editor
3. Add image upload functionality
4. Migrate to Chakra UI (as per requirements)
5. Add draft/published status handling

Your blog app is now fully functional with a real backend! 🚀
