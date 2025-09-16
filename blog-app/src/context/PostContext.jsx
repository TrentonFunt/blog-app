import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import apiService from '../services/api';
import { toast } from 'react-hot-toast';

// Initial state
const initialState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  searchQuery: '',
  searchResults: [],
  isSearching: false,
};

// Action types
const POST_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_POSTS: 'SET_POSTS',
  SET_CURRENT_POST: 'SET_CURRENT_POST',
  ADD_POST: 'ADD_POST',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
  SET_IS_SEARCHING: 'SET_IS_SEARCHING',
  CLEAR_SEARCH: 'CLEAR_SEARCH',
};

// Reducer
const postReducer = (state, action) => {
  switch (action.type) {
    case POST_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case POST_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case POST_ACTIONS.SET_POSTS:
      return { ...state, posts: action.payload, loading: false, error: null };
    
    case POST_ACTIONS.SET_CURRENT_POST:
      return { ...state, currentPost: action.payload, loading: false, error: null };
    
    case POST_ACTIONS.ADD_POST:
      return { ...state, posts: [action.payload, ...state.posts], loading: false, error: null };
    
    case POST_ACTIONS.UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post => 
          post.id === action.payload.id ? action.payload : post
        ),
        currentPost: state.currentPost?.id === action.payload.id ? action.payload : state.currentPost,
        loading: false,
        error: null
      };
    
    case POST_ACTIONS.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
        currentPost: state.currentPost?.id === action.payload ? null : state.currentPost,
        loading: false,
        error: null
      };
    
    case POST_ACTIONS.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    
    case POST_ACTIONS.SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload, isSearching: false, error: null };
    
    case POST_ACTIONS.SET_IS_SEARCHING:
      return { ...state, isSearching: action.payload };
    
    case POST_ACTIONS.CLEAR_SEARCH:
      return { ...state, searchQuery: '', searchResults: [], isSearching: false };
    
    default:
      return state;
  }
};

// Create context
const PostContext = createContext();

// Provider component
export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  // Action creators
  const actions = useMemo(() => ({
    // Fetch all posts
    fetchPosts: async (params = {}) => {
      dispatch({ type: POST_ACTIONS.SET_LOADING, payload: true });
      try {
        const posts = await apiService.getPosts(params);
        dispatch({ type: POST_ACTIONS.SET_POSTS, payload: posts });
        return posts;
      } catch (error) {
        dispatch({ type: POST_ACTIONS.SET_ERROR, payload: error.message });
        toast.error('Failed to fetch posts');
        throw error;
      }
    },

    // Fetch single post by slug
    fetchPostBySlug: async (slug) => {
      dispatch({ type: POST_ACTIONS.SET_LOADING, payload: true });
      try {
        const posts = await apiService.getPostBySlug(slug);
        const post = posts[0] || null; // Get first post from array
        dispatch({ type: POST_ACTIONS.SET_CURRENT_POST, payload: post });
        return post;
      } catch (error) {
        dispatch({ type: POST_ACTIONS.SET_ERROR, payload: error.message });
        toast.error('Failed to fetch post');
        throw error;
      }
    },

    // Fetch single post by ID
    fetchPostById: async (id) => {
      dispatch({ type: POST_ACTIONS.SET_LOADING, payload: true });
      try {
        const post = await apiService.getPostById(id);
        dispatch({ type: POST_ACTIONS.SET_CURRENT_POST, payload: post });
        return post;
      } catch (error) {
        dispatch({ type: POST_ACTIONS.SET_ERROR, payload: error.message });
        toast.error('Failed to fetch post');
        throw error;
      }
    },

    // Create new post
    createPost: async (postData) => {
      dispatch({ type: POST_ACTIONS.SET_LOADING, payload: true });
      try {
        const newPost = await apiService.createPost(postData);
        dispatch({ type: POST_ACTIONS.ADD_POST, payload: newPost });
        toast.success('Post created successfully!');
        return newPost;
      } catch (error) {
        dispatch({ type: POST_ACTIONS.SET_ERROR, payload: error.message });
        toast.error('Failed to create post');
        throw error;
      }
    },

    // Update existing post
    updatePost: async (id, postData) => {
      dispatch({ type: POST_ACTIONS.SET_LOADING, payload: true });
      try {
        const updatedPost = await apiService.updatePost(id, postData);
        dispatch({ type: POST_ACTIONS.UPDATE_POST, payload: updatedPost });
        toast.success('Post updated successfully!');
        return updatedPost;
      } catch (error) {
        dispatch({ type: POST_ACTIONS.SET_ERROR, payload: error.message });
        toast.error('Failed to update post');
        throw error;
      }
    },

    // Delete post
    deletePost: async (id) => {
      dispatch({ type: POST_ACTIONS.SET_LOADING, payload: true });
      try {
        await apiService.deletePost(id);
        dispatch({ type: POST_ACTIONS.DELETE_POST, payload: id });
        toast.success('Post deleted successfully!');
      } catch (error) {
        dispatch({ type: POST_ACTIONS.SET_ERROR, payload: error.message });
        toast.error('Failed to delete post');
        throw error;
      }
    },

    // Search posts
    searchPosts: async (query) => {
      if (!query.trim()) {
        dispatch({ type: POST_ACTIONS.CLEAR_SEARCH });
        return [];
      }

      dispatch({ type: POST_ACTIONS.SET_SEARCH_QUERY, payload: query });
      dispatch({ type: POST_ACTIONS.SET_IS_SEARCHING, payload: true });
      
      try {
        const results = await apiService.searchPosts(query);
        dispatch({ type: POST_ACTIONS.SET_SEARCH_RESULTS, payload: results });
        return results;
      } catch (error) {
        dispatch({ type: POST_ACTIONS.SET_ERROR, payload: error.message });
        dispatch({ type: POST_ACTIONS.SET_IS_SEARCHING, payload: false });
        toast.error('Search failed');
        throw error;
      }
    },

    // Clear search
    clearSearch: () => {
      dispatch({ type: POST_ACTIONS.CLEAR_SEARCH });
    },

    // Clear current post
    clearCurrentPost: () => {
      dispatch({ type: POST_ACTIONS.SET_CURRENT_POST, payload: null });
    },

    // Clear error
    clearError: () => {
      dispatch({ type: POST_ACTIONS.SET_ERROR, payload: null });
    },
  }), [dispatch]);

  // Load posts on mount
  useEffect(() => {
    actions.fetchPosts();
  }, [actions]);

  const value = {
    ...state,
    ...actions,
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
};

// Custom hook to use the context
// eslint-disable-next-line react-refresh/only-export-components
export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};

// PostContext is only used internally, no need to export it
