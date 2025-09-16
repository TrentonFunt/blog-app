const posts = [
  {
    id: 1,
    title: "Getting Started with Tailwind CSS",
    excerpt: "Learn how to set up Tailwind CSS in your React project and create beautiful UIs with utility-first CSS.",
    content: `<p>Tailwind CSS is a utility-first CSS framework that makes styling your React apps fast and flexible. In this guide, we'll walk through installation, configuration, and best practices for building beautiful interfaces. <br><br>First, install Tailwind via npm and configure your <code>tailwind.config.js</code>. Then, start using utility classes to style your components. <br><br>You'll discover how to customize your theme, use plugins, and optimize for production. By the end, you'll have a fully styled React app and the confidence to build anything!</p>`,
    slug: "getting-started-with-tailwind",
    category: "Web Development",
    date: "2023-06-15",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Jane Doe",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  },
  {
    id: 2,
    title: "React Hooks Explained",
    excerpt: "A deep dive into React hooks and how to use them effectively in your applications.",
    content: `<p>React hooks revolutionized how we write components. This article covers <code>useState</code>, <code>useEffect</code>, <code>useReducer</code>, and custom hooks. <br><br>You'll learn when to use each hook, common patterns, and how hooks simplify state management and side effects. <br><br>We'll also discuss best practices, performance tips, and how to avoid common pitfalls. By mastering hooks, you can write cleaner, more maintainable React code.</p>`,
    slug: "react-hooks-explained",
    category: "React",
    date: "2023-06-10",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    author: {
      name: "John Smith",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  },
  {
    id: 3,
    title: "Understanding CSS Grid",
    excerpt: "Master CSS Grid layout and build complex responsive designs easily.",
    content: `<p>CSS Grid is a powerful layout system for building responsive designs. This guide explains grid containers, tracks, areas, and alignment. <br><br>You'll see real-world examples, from simple two-column layouts to complex magazine-style grids. <br><br>Learn how to combine Grid with Flexbox, use media queries, and create layouts that adapt to any screen size.</p>`,
    slug: "understanding-css-grid",
    category: "CSS",
    date: "2023-05-20",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Alice Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  },
  {
    id: 4,
    title: "JavaScript ES2022 Features",
    excerpt: "Explore the latest features in JavaScript ES2022 and how to use them.",
    content: `<p>JavaScript ES2022 introduces exciting new features like <code>class fields</code>, <code>top-level await</code>, and <code>Object.hasOwn</code>. <br><br>This article explains each feature with code samples and practical use cases. <br><br>You'll learn how these updates improve code readability, performance, and developer experience.</p>`,
    slug: "javascript-es2022-features",
    category: "JavaScript",
    date: "2023-04-18",
    readTime: 7,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Bob Lee",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg"
    }
  },
  {
    id: 5,
    title: "Building Accessible Web Apps",
    excerpt: "Learn best practices for building accessible web applications.",
    content: `<p>Accessibility is essential for reaching all users. This post covers semantic HTML, ARIA roles, keyboard navigation, and color contrast. <br><br>You'll find checklists, tools, and real-world examples to help you build apps everyone can use. <br><br>Accessibility isn't just a requirement—it's good design.</p>`,
    slug: "building-accessible-web-apps",
    category: "Accessibility",
    date: "2023-03-12",
    readTime: 9,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Sara Kim",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  },
  {
    id: 6,
    title: "Exploring the World: My Solo Travel Adventures",
    excerpt: "Join me as I share stories, tips, and breathtaking photos from my solo travels across five continents.",
    content: `<h2>Why Solo Travel?</h2><p>Solo travel is empowering, challenging, and incredibly rewarding. It teaches you self-reliance and opens your mind to new cultures and experiences.</p><h3>Highlights</h3><ul><li>Hiking Machu Picchu</li><li>Street food in Bangkok</li><li>Safari in Kenya</li></ul><p>Every journey brought new friends and unforgettable memories.</p>`,
    slug: "solo-travel-adventures",
    category: "Travel",
    date: "2025-07-22",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Emily Carter",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg"
    }
  },
  {
    id: 7,
    title: "The Science of Happiness: What Really Works?",
    excerpt: "Discover evidence-based strategies for boosting your happiness and well-being, backed by psychology research.",
    content: `<h2>What is Happiness?</h2><p>Happiness is more than a fleeting emotion. It's a state of well-being and contentment.</p><h3>Proven Strategies</h3><ul><li>Gratitude journaling</li><li>Mindfulness meditation</li><li>Acts of kindness</li></ul><p>Try these techniques and notice the difference in your daily life.</p>`,
    slug: "science-of-happiness",
    category: "Lifestyle",
    date: "2025-06-30",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Dr. Alex Nguyen",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg"
    }
  },
  {
    id: 8,
    title: "Mastering the Art of French Cooking",
    excerpt: "From classic baguettes to coq au vin, learn the secrets of French cuisine with step-by-step recipes and tips.",
    content: `<h2>French Cooking Basics</h2><p>French cuisine is all about technique and fresh ingredients. Start with a good baguette and build your skills from there.</p><h3>Recipes</h3><ul><li>Baguette</li><li>Coq au Vin</li><li>Crème Brûlée</li></ul><p>Bon appétit!</p>`,
    slug: "french-cooking-art",
    date: "2025-05-18",
    readTime: 12,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Pierre Dubois",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    }
  },
  {
    id: 9,
    title: "Fitness for Busy People: Quick Routines That Work",
    excerpt: "No time for the gym? Try these efficient workouts and tips to stay fit and healthy with a packed schedule.",
    content: `<h2>Why Quick Workouts?</h2><p>Short, intense routines can be just as effective as longer sessions. The key is consistency and variety.</p><h3>Sample Routines</h3><ul><li>HIIT in 20 minutes</li><li>Desk stretches</li><li>Weekend hikes</li></ul><p>Stay active, even on your busiest days!</p>`,
    category: "Health & Fitness",
    date: "2025-04-10",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Maya Patel",
      avatar: "https://randomuser.me/api/portraits/women/23.jpg"
    }
  },
  {
    id: 10,
    title: "The Future of Space Exploration",
    excerpt: "From Mars missions to private space travel, explore the latest breakthroughs and what’s next for humanity in space.",
    content: `<h2>Space: The Final Frontier</h2><p>Space exploration is advancing rapidly, with new missions and technologies emerging every year.</p><h3>What's Next?</h3><ul><li>Mars colonization</li><li>Reusable rockets</li><li>Space tourism</li></ul><p>The future is closer than you think!</p>`,
    slug: "future-of-space-exploration",
    category: "Science & Tech",
    date: "2025-03-01",
    readTime: 11,
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3c5a?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Chris Evans",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg"
    }
  }
];

export default posts;
