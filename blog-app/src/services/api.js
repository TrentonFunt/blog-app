// API service for communicating with Strapi backend
const API_BASE_URL = 'http://localhost:1338/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
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
      throw error;
    }
  }

  // Posts API
  async getPosts(params = {}) {
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
  }

  async getPostBySlug(slug) {
    return this.request(`/posts?filters[slug][$eq]=${slug}&status=published&populate=*`);
  }

  async getPostById(id) {
    return this.request(`/posts/${id}`);
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
    return this.getPosts({ search: query });
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
