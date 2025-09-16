// Browser Console Script to Create Posts
// Copy and paste this into your browser console while on your blog app (http://localhost:5173)

const API_BASE = 'http://localhost:1338/api';
const API_TOKEN = 'YOUR_STRAPI_API_TOKEN'; // Replace with your actual API token

// Sample posts data
const samplePosts = [
  {
    title: "Mastering CSS Grid: A Complete Guide for Modern Layouts",
    excerpt: "Learn how to create complex, responsive layouts with CSS Grid. This comprehensive guide covers everything from basic concepts to advanced techniques.",
    content: `<h2>Introduction to CSS Grid</h2>
<p>CSS Grid is a powerful layout system that allows you to create complex, two-dimensional layouts with ease. Unlike Flexbox, which is primarily for one-dimensional layouts, Grid excels at creating both rows and columns simultaneously.</p>

<h3>Basic Grid Concepts</h3>
<p>To get started with CSS Grid, you need to understand a few key concepts:</p>
<ul>
<li><strong>Grid Container:</strong> The parent element that has <code>display: grid</code></li>
<li><strong>Grid Items:</strong> The direct children of the grid container</li>
<li><strong>Grid Lines:</strong> The horizontal and vertical lines that divide the grid</li>
<li><strong>Grid Tracks:</strong> The space between two adjacent grid lines</li>
</ul>

<h3>Creating Your First Grid</h3>
<pre><code>.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
}</code></pre>

<p>This creates a three-column grid where the middle column is twice as wide as the side columns, with three rows and a 20px gap between all items.</p>

<h3>Advanced Grid Techniques</h3>
<p>Once you're comfortable with the basics, you can explore more advanced features like:</p>
<ul>
<li>Named grid lines</li>
<li>Grid areas</li>
<li>Auto-fit and auto-fill</li>
<li>Subgrid (when browser support improves)</li>
</ul>

<p>CSS Grid is now supported in all modern browsers, making it the go-to choice for complex layouts.</p>`,
    category: "CSS",
    readTime: 8
  },
  {
    title: "Building Scalable Node.js Applications: Architecture Patterns",
    excerpt: "Discover the best practices and architectural patterns for building scalable Node.js applications that can handle millions of users.",
    content: `<h2>Why Scalability Matters</h2>
<p>As your Node.js application grows, you'll need to consider scalability from the ground up. Poor architecture decisions early on can lead to significant refactoring later.</p>

<h3>Microservices Architecture</h3>
<p>One of the most effective patterns for scalable applications is the microservices architecture:</p>
<pre><code>// Example service structure
const express = require('express');
const app = express();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Service-specific routes
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);</code></pre>

<h3>Database Optimization</h3>
<p>Database performance is crucial for scalability:</p>
<ul>
<li>Use connection pooling</li>
<li>Implement proper indexing</li>
<li>Consider read replicas for read-heavy workloads</li>
<li>Use caching strategies (Redis, Memcached)</li>
</ul>

<h3>Load Balancing</h3>
<p>Distribute traffic across multiple instances:</p>
<pre><code>// Using PM2 for process management
pm2 start app.js -i max --name "api-server"</code></pre>

<p>This approach ensures your application can handle increased load while maintaining performance.</p>`,
    category: "Node.js",
    readTime: 12
  },
  {
    title: "React Performance Optimization: 10 Essential Techniques",
    excerpt: "Learn the most effective techniques to optimize your React applications for better performance and user experience.",
    content: `<h2>Understanding React Performance</h2>
<p>React is fast by default, but as applications grow in complexity, performance issues can arise. Here are the essential techniques to keep your React apps running smoothly.</p>

<h3>1. Use React.memo()</h3>
<p>Prevent unnecessary re-renders of functional components:</p>
<pre><code>const ExpensiveComponent = React.memo(({ data }) => {
  return (
    <div>
      {data.map(item => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
});</code></pre>

<h3>2. Optimize with useMemo() and useCallback()</h3>
<p>Memoize expensive calculations and functions:</p>
<pre><code>const ExpensiveComponent = ({ items, filter }) => {
  const filteredItems = useMemo(() => {
    return items.filter(item => item.category === filter);
  }, [items, filter]);

  const handleClick = useCallback((id) => {
    // Handle click logic
  }, []);

  return (
    <div>
      {filteredItems.map(item => (
        <Item key={item.id} onClick={handleClick} {...item} />
      ))}
    </div>
  );
};</code></pre>

<h3>3. Code Splitting with React.lazy()</h3>
<p>Load components only when needed:</p>
<pre><code>const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}</code></pre>

<h3>4. Virtual Scrolling for Large Lists</h3>
<p>For lists with thousands of items, implement virtual scrolling to only render visible items.</p>

<h3>5. Bundle Analysis</h3>
<p>Regularly analyze your bundle size and identify opportunities for optimization.</p>`,
    category: "React",
    readTime: 10
  },
  {
    title: "JavaScript ES2024 Features: What's New and Exciting",
    excerpt: "Explore the latest JavaScript features introduced in ES2024 and learn how to use them in your projects.",
    content: `<h2>Welcome to ES2024</h2>
<p>JavaScript continues to evolve, and ES2024 brings several exciting new features that make development more efficient and enjoyable.</p>

<h3>1. Array.prototype.groupBy()</h3>
<p>Group array elements by a key:</p>
<pre><code>const users = [
  { name: 'John', age: 25, city: 'New York' },
  { name: 'Jane', age: 30, city: 'London' },
  { name: 'Bob', age: 25, city: 'New York' }
];

const groupedByAge = users.groupBy(user => user.age);
// Result: { 25: [...], 30: [...] }</code></pre>

<h3>2. Promise.withResolvers()</h3>
<p>Create a promise with external resolve/reject control:</p>
<pre><code>const { promise, resolve, reject } = Promise.withResolvers();

// Use resolve and reject externally
setTimeout(() => resolve('Success!'), 1000);

promise.then(result => console.log(result));</code></pre>

<h3>3. Temporal API (Stage 3)</h3>
<p>Better date and time handling:</p>
<pre><code>import { Temporal } from '@js-temporal/polyfill';

const now = Temporal.Now.plainDateTimeISO();
const tomorrow = now.add({ days: 1 });

console.log(tomorrow.toString());</code></pre>

<h3>4. Decorators (Stage 3)</h3>
<p>Add metadata and behavior to classes and methods:</p>
<pre><code>@observable
class UserStore {
  @action
  updateUser(user) {
    this.user = user;
  }
}</code></pre>

<h3>Browser Support</h3>
<p>Check the current browser support for these features and use polyfills when necessary for production applications.</p>`,
    category: "JavaScript",
    readTime: 7
  },
  {
    title: "Web Accessibility: Building Inclusive User Experiences",
    excerpt: "Learn how to create web applications that are accessible to all users, including those with disabilities.",
    content: `<h2>Why Accessibility Matters</h2>
<p>Web accessibility ensures that your applications can be used by everyone, regardless of their abilities or the devices they use. It's not just the right thing to do—it's often legally required.</p>

<h3>WCAG Guidelines</h3>
<p>The Web Content Accessibility Guidelines (WCAG) provide a framework for accessible design:</p>
<ul>
<li><strong>Perceivable:</strong> Information must be presentable in ways users can perceive</li>
<li><strong>Operable:</strong> Interface components must be operable</li>
<li><strong>Understandable:</strong> Information and UI operation must be understandable</li>
<li><strong>Robust:</strong> Content must be robust enough for various assistive technologies</li>
</ul>

<h3>Semantic HTML</h3>
<p>Use proper HTML elements to convey meaning:</p>
<pre><code><!-- Good: Semantic structure -->
<main>
  <header>
    <h1>Page Title</h1>
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>
  <section>
    <h2>Content Section</h2>
    <p>Your content here...</p>
  </section>
</main></code></pre>

<h3>ARIA Labels and Roles</h3>
<p>Enhance accessibility with ARIA attributes:</p>
<pre><code><button 
  aria-label="Close dialog"
  aria-expanded="false"
  aria-controls="dialog-content"
>
  ×
</button></code></pre>

<h3>Keyboard Navigation</h3>
<p>Ensure all interactive elements are keyboard accessible:</p>
<ul>
<li>Use proper tab order</li>
<li>Provide visible focus indicators</li>
<li>Implement keyboard shortcuts</li>
<li>Handle focus management in modals</li>
</ul>

<h3>Testing Accessibility</h3>
<p>Use tools like axe-core, Lighthouse, and screen readers to test your applications.</p>`,
    category: "Web Development",
    readTime: 9
  },
  {
    title: "Getting Started with TypeScript: A Beginner's Guide",
    excerpt: "Learn TypeScript from the ground up and discover how it can improve your JavaScript development workflow.",
    content: `<h2>What is TypeScript?</h2>
<p>TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. It adds static type definitions to JavaScript, making your code more robust and maintainable.</p>

<h3>Why Use TypeScript?</h3>
<p>TypeScript offers several benefits:</p>
<ul>
<li><strong>Type Safety:</strong> Catch errors at compile time</li>
<li><strong>Better IDE Support:</strong> Enhanced autocomplete and refactoring</li>
<li><strong>Documentation:</strong> Types serve as living documentation</li>
<li><strong>Scalability:</strong> Easier to maintain large codebases</li>
</ul>

<h3>Basic Types</h3>
<p>TypeScript provides several built-in types:</p>
<pre><code>// Primitive types
let name: string = "John";
let age: number = 25;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3, 4, 5];
let names: Array<string> = ["Alice", "Bob", "Charlie"];

// Objects
interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean; // Optional property
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};</code></pre>

<h3>Functions and Classes</h3>
<p>TypeScript enhances functions and classes with type annotations:</p>
<pre><code>// Function with typed parameters and return type
function calculateTotal(price: number, tax: number): number {
  return price + (price * tax);
}

// Class with typed properties and methods
class Calculator {
  private result: number = 0;

  add(value: number): this {
    this.result += value;
    return this;
  }

  getResult(): number {
    return this.result;
  }
}</code></pre>

<h3>Getting Started</h3>
<p>To start using TypeScript:</p>
<ol>
<li>Install TypeScript globally: <code>npm install -g typescript</code></li>
<li>Initialize a project: <code>tsc --init</code></li>
<li>Create your first <code>.ts</code> file</li>
<li>Compile to JavaScript: <code>tsc filename.ts</code></li>
</ol>

<p>TypeScript is an excellent choice for both small projects and large-scale applications.</p>`,
    category: "Tutorials",
    readTime: 11
  }
];

// Function to create a single post
async function createPost(postData) {
  try {
    const response = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({
        data: {
          ...postData,
          publishedAt: new Date().toISOString()
        }
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Post created:', result.data.title);
      return result.data;
    } else {
      console.error('❌ Failed to create post:', await response.text());
    }
  } catch (error) {
    console.error('❌ Error creating post:', error);
  }
}

// Function to create all posts
async function createAllPosts() {
  console.log('🚀 Starting to create posts...');
  
  for (let i = 0; i < samplePosts.length; i++) {
    const post = samplePosts[i];
    console.log(`Creating post ${i + 1}/${samplePosts.length}: ${post.title}`);
    await createPost(post);
    
    // Add a small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('🎉 All posts created successfully!');
}

// Instructions for use
console.log(`
📝 POST CREATION SCRIPT
======================

To use this script:

1. Replace 'YOUR_STRAPI_API_TOKEN' with your actual Strapi API token
2. Run: createAllPosts()

Or create individual posts:
- createPost(samplePosts[0]) // Creates the first post
- createPost(samplePosts[1]) // Creates the second post
- etc.

The script will create 6 diverse blog posts covering:
- CSS Grid
- Node.js Architecture
- React Performance
- JavaScript ES2024
- Web Accessibility
- TypeScript Basics
`);

// Uncomment the line below to automatically create all posts
// createAllPosts();
