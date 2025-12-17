// API service for communicating with Strapi backend
import mockPosts from '../data/posts.js';

const API_BASE_URL = import.meta.env.VITE_STRAPI_URL 
  ? `${import.meta.env.VITE_STRAPI_URL}/api` 
  : 'http://localhost:1338/api';
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.mockPosts = mockPosts;
    this.useMockData = USE_MOCK_DATA;
  }

  async request(endpoint, options = {}) {
    // If using mock data, skip the actual request
    if (this.useMockData) {
      console.log('Using mock data for:', endpoint);
      return null; // Will be handled in specific methods
    }

    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // Add API token if available
        ...(import.meta.env.VITE_STRAPI_API_TOKEN && {
          'Authorization': `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`
        }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API request failed: ${response.status} - ${errorText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      // Always throw - let the caller handle fallback
      throw error;
    }
  }

  // Helper method to filter mock posts
  filterMockPosts(predicate) {
    return this.mockPosts.filter(predicate);
  }

  // Helper method to search mock posts
  searchMockPosts(query) {
    const lowerQuery = query.toLowerCase();
    return this.mockPosts.filter(post =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      (post.category && post.category.toLowerCase().includes(lowerQuery))
    );
  }

  // Posts API
  async getPosts(params = {}) {
    // Use mock data if enabled
    if (this.useMockData) {
      let filteredPosts = [...this.mockPosts];

      // Handle sorting
      const sortBy = params.sort || 'date:desc';
      if (sortBy.includes('date:desc')) {
        filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (sortBy.includes('date:asc')) {
        filteredPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
      }

      // Return just the array (same as mock posts from data/posts.js)
      console.log('Mock posts returned:', filteredPosts);
      return filteredPosts;
    }

    try {
      const queryParams = new URLSearchParams();
      
      // Strapi v5: Use status=published to get only published posts
      queryParams.append('status', 'published');
      
      // Populate all related fields (coverImage, author, etc.)
      queryParams.append('populate', '*');
      
      // Add search filter if provided
      if (params.search) {
        queryParams.append('filters[$or][0][title][$containsi]', params.search);
        queryParams.append('filters[$or][1][excerpt][$containsi]', params.search);
        queryParams.append('filters[$or][2][category][$containsi]', params.search);
      }
      
      // Add pagination
      if (params.page) {
        queryParams.append('pagination[page]', params.page);
      }
      if (params.pageSize) {
        queryParams.append('pagination[pageSize]', params.pageSize);
      }
      
      // Add sorting
      if (params.sort) {
        queryParams.append('sort', params.sort);
      } else {
        queryParams.append('sort', 'publishedAt:desc'); // Default sort by newest
      }

      const queryString = queryParams.toString();
      return this.request(`/posts?${queryString}`);
    } catch (error) {
      // Fallback to mock data if API fails
      console.warn('API failed, using mock data as fallback:', error.message);
      this.useMockData = true; // Enable mock mode
      // Return mock data directly
      let filteredPosts = [...this.mockPosts];
      filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
      console.log('Mock posts returned (fallback):', filteredPosts);
      return filteredPosts;
    }
  }

  async getPostBySlug(slug) {
    if (this.useMockData) {
      const post = this.mockPosts.find(p => p.slug === slug);
      return post ? [post] : [];
    }

    try {
      return this.request(`/posts?filters[slug][$eq]=${slug}&status=published&populate=*`);
    } catch (error) {
      console.warn('API failed, using mock data as fallback');
      this.useMockData = true;
      const post = this.mockPosts.find(p => p.slug === slug);
      return post ? [post] : [];
    }
  }

  async getPostById(id) {
    if (this.useMockData) {
      return this.mockPosts.find(p => p.id === parseInt(id)) || null;
    }

    try {
      return this.request(`/posts/${id}`);
    } catch (error) {
      console.warn('API failed, using mock data as fallback');
      this.useMockData = true;
      return this.mockPosts.find(p => p.id === parseInt(id)) || null;
    }
  }

  async createPost(postData) {
    return this.request('/posts', {
      method: 'POST',
      body: JSON.stringify({ data: postData }),
    });
  }

  async updatePost(id, postData) {
    return this.request(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data: postData }),
    });
  }

  async deletePost(id) {
    return this.request(`/posts/${id}`, {
      method: 'DELETE',
    });
  }

  // Search posts
  async searchPosts(query) {
    if (this.useMockData) {
      return this.searchMockPosts(query);
    }

    try {
      return this.getPosts({ search: query });
    } catch (error) {
      console.warn('API failed, using mock data as fallback');
      return this.searchMockPosts(query);
    }
  }

  // Upload image to Strapi (which will upload to Cloudinary)
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('files', file);
    // Remove ref and refId for standalone upload
    // formData.append('ref', 'api::post.post');
    // formData.append('refId', '1');
    // formData.append('field', 'coverImage');

    const headers = {};
    // Add API token if available
    if (import.meta.env.VITE_STRAPI_API_TOKEN) {
      headers['Authorization'] = `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`;
    }

    return this.request('/upload', {
      method: 'POST',
      headers, // Remove Content-Type to let browser set it with boundary
      body: formData,
    });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
