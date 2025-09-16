# Tiwa's Blog - Full-Stack Blog Application

A modern, responsive blog application built with React, Strapi CMS, and enhanced with beautiful animations and micro-interactions.

## 🚀 Features

### Frontend Features
- **Modern UI/UX**: Built with DaisyUI and Tailwind CSS for a clean, professional design
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Smooth Animations**: Comprehensive animation system using Framer Motion and React Spring
- **Dark/Light Mode**: Theme switching with persistent preferences
- **Search Functionality**: Real-time search across all blog posts
- **Syntax Highlighting**: Code blocks with Prism.js and copy-to-clipboard functionality
- **Admin Controls**: Content management interface for authenticated users

### Backend Features
- **Strapi CMS**: Headless CMS for content management
- **Multiple Content Types**: Posts, Authors, Categories, Tags, and Comments
- **Media Management**: Cloudinary integration for image hosting
- **API Authentication**: Secure API endpoints with token-based authentication
- **Draft System**: Save drafts and publish posts
- **Rich Text Editor**: WYSIWYG content creation

### Animation System
- **FadeInUp**: Smooth entrance animations for page elements
- **TextReveal**: Animated text reveals for headings and important content
- **StaggerContainer**: Sequential animations for lists and grids
- **HoverScale**: Interactive hover effects for cards and buttons
- **PageTransition**: Smooth transitions between pages
- **ParallaxScroll**: Subtle parallax effects for visual depth
- **AnimatedButton**: Enhanced button interactions

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS v4** - CSS-first configuration with zero setup
- **DaisyUI** - Component library for Tailwind CSS
- **Framer Motion** - Animation library
- **React Spring** - Physics-based animations
- **React Intersection Observer** - Scroll-triggered animations
- **Prism.js** - Syntax highlighting
- **React Hot Toast** - Notification system
- **Axios** - HTTP client for API calls

### Backend
- **Strapi v5.23.4** - Headless CMS
- **Node.js** - Runtime environment
- **SQLite** - Database (development)
- **Cloudinary** - Media asset management

## 📁 Project Structure

```
blog-app/
├── src/
│   ├── components/
│   │   ├── animations/          # Animation components
│   │   │   ├── FadeInUp.jsx
│   │   │   ├── TextReveal.jsx
│   │   │   ├── StaggerContainer.jsx
│   │   │   ├── HoverScale.jsx
│   │   │   ├── PageTransition.jsx
│   │   │   ├── ParallaxScroll.jsx
│   │   │   ├── AnimatedButton.jsx
│   │   │   └── index.js
│   │   ├── layout/              # Layout components
│   │   │   ├── Layout.jsx
│   │   │   ├── NavBar.jsx
│   │   │   └── Footer.jsx
│   │   ├── posts/               # Post-related components
│   │   │   └── PostCard.jsx
│   │   ├── shared/              # Shared components
│   │   │   ├── PostList.jsx
│   │   │   └── SearchBar.jsx
│   │   └── ui/                  # UI components
│   │       ├── PrimaryButton.jsx
│   │       ├── SectionHeading.jsx
│   │       ├── EmptyState.jsx
│   │       ├── DeleteModal.jsx
│   │       ├── DarkModeToggle.jsx
│   │       ├── IconButtonWithTooltip.jsx
│   │       └── PostContent.jsx
│   ├── context/                 # React Context providers
│   │   ├── PostContext.jsx
│   │   ├── AdminContext.jsx
│   │   └── ThemeProvider.jsx
│   ├── pages/                   # Page components
│   │   ├── HomePage.jsx
│   │   ├── PostsPage.jsx
│   │   ├── PostDetailPage.jsx
│   │   ├── PostEditorPage.jsx
│   │   └── SearchResultsPage.jsx
│   ├── routes/                  # Routing configuration
│   │   └── index.jsx
│   ├── services/                # API services
│   │   └── api.js
│   ├── utils/                   # Utility functions
│   │   └── dateUtils.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_STRAPI_URL=http://localhost:1338
   VITE_STRAPI_API_TOKEN=your_api_token_here
   VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   VITE_CLOUDINARY_API_KEY=your_cloudinary_key
   VITE_CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

### Backend Setup (Strapi CMS)

1. **Navigate to the CMS directory**
   ```bash
   cd ../blog-cms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start Strapi**
   ```bash
   npm run develop
   ```

4. **Access Strapi Admin**
   - Open `http://localhost:1338/admin`
   - Create your admin account
   - Configure content types and permissions

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones for main actions and branding
- **Secondary**: Complementary colors for accents
- **Neutral**: Grayscale for text and backgrounds
- **Success/Error**: Green and red for feedback states

### Typography
- **Headings**: Bold, clear hierarchy
- **Body Text**: Readable font sizes with proper line spacing
- **Code**: Monospace font for code blocks

### Spacing
- Consistent spacing scale using Tailwind's spacing system
- Proper margins and padding for visual hierarchy

## 🔧 Configuration

### Strapi Content Types

#### Post
- Title, slug, excerpt, content
- Cover image, category, read time
- Author relationship, tags, comments
- Draft/publish status

#### Author
- Name, email, bio, avatar
- Website, social links
- Posts relationship

#### Category
- Name, slug
- Posts relationship

#### Tag
- Name, slug, color
- Many-to-many relationship with posts

#### Comment
- Content, author name/email
- Approval status, parent/child relationships
- Post relationship

### API Configuration
- CORS enabled for frontend domains
- API token authentication
- Proper error handling and validation

## 🚀 Deployment

### Vercel Deployment (Frontend)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy automatically on push to main branch

3. **Environment Variables for Production**
   ```env
   VITE_STRAPI_URL=https://your-strapi-domain.com
   VITE_STRAPI_API_TOKEN=your_production_api_token
   VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   VITE_CLOUDINARY_API_KEY=your_cloudinary_key
   VITE_CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

### Strapi Deployment

1. **Prepare for production**
   ```bash
   npm run build
   npm start
   ```

2. **Database Configuration**
   - Configure production database (PostgreSQL recommended)
   - Set up proper environment variables

3. **Media Storage**
   - Configure Cloudinary for production
   - Set up proper CORS for production domain

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile-First Approach
- All components designed mobile-first
- Progressive enhancement for larger screens
- Touch-friendly interactions

## 🎭 Animation System

### Animation Components
- **FadeInUp**: Elements fade in and slide up
- **TextReveal**: Text animates from bottom to top
- **StaggerContainer**: Children animate sequentially
- **HoverScale**: Subtle scale on hover
- **PageTransition**: Smooth page transitions
- **ParallaxScroll**: Parallax scrolling effects
- **AnimatedButton**: Enhanced button interactions

### Performance Considerations
- Animations use `transform` and `opacity` for optimal performance
- Intersection Observer for scroll-triggered animations
- Reduced motion support for accessibility

## 🔒 Security

### Frontend Security
- **Tailwind CSS v4**: CSS-first configuration with `@import "tailwindcss"` and `@plugin "daisyui"`
- **Zero Configuration**: No `tailwind.config.js` or `postcss.config.js` needed
- **Automatic Content Detection**: Framework automatically detects template files
- Environment variables for sensitive data
- Input validation and sanitization
- XSS protection with proper HTML escaping

### Backend Security
- API token authentication
- CORS configuration
- Input validation and sanitization
- Secure file upload handling

## 🧪 Testing

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Responsive design works on all devices
- [ ] Animations perform smoothly
- [ ] Search functionality works
- [ ] Admin controls function properly
- [ ] Image uploads work
- [ ] Dark/light mode switching
- [ ] Navigation between pages

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure Strapi CORS configuration includes your frontend domain
   - Check that both servers are running

2. **API Connection Issues**
   - Verify environment variables are set correctly
   - Check that Strapi is running on the correct port

3. **Image Upload Issues**
   - Verify Cloudinary credentials
   - Check file size limits
   - Ensure proper file types

4. **Animation Performance**
   - Check for reduced motion preferences
   - Verify animations are using GPU-accelerated properties

## 📈 Performance Optimization

### Frontend Optimizations
- Code splitting with React.lazy
- Image optimization
- Bundle size optimization
- Lazy loading for images
- Memoization for expensive operations

### Backend Optimizations
- Database indexing
- API response caching
- Image optimization with Cloudinary
- Proper pagination for large datasets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Strapi team for the excellent CMS
- DaisyUI for the beautiful component library
- Framer Motion for smooth animations
- Cloudinary for media management
- Vercel for hosting platform

---

**Built with ❤️ by Tiwa**