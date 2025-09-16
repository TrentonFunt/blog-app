import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import DeleteModal from '../components/ui/DeleteModal';
import { toast } from 'react-hot-toast';
import { usePosts } from '../context/PostContext';
import apiService from '../services/api';

export default function PostEditorPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { currentPost, loading, createPost, updatePost, deletePost, fetchPostBySlug } = usePosts();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [readTime, setReadTime] = useState(5);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const isEditing = !!slug;

  // Load post data if editing
  useEffect(() => {
    if (isEditing && slug) {
      fetchPostBySlug(slug);
    }
  }, [isEditing, slug, fetchPostBySlug]);

  // Populate form when post data is loaded
  useEffect(() => {
    if (currentPost && isEditing) {
      setTitle(currentPost.title || '');
      setContent(currentPost.content || '');
      setExcerpt(currentPost.excerpt || '');
      setCategory(currentPost.category || '');
      setReadTime(currentPost.readTime || 5);
      if (currentPost.coverImage?.url) {
        setCoverImagePreview(currentPost.coverImage.url);
      }
    }
  }, [currentPost, isEditing]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setCoverImage(null);
    setCoverImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let postData = {
        title,
        content,
        excerpt,
        category,
        readTime: parseInt(readTime),
        publishedAt: new Date().toISOString(), // Publish immediately
      };

      // Handle image upload if a new image is selected
      if (coverImage) {
        setIsUploading(true);
        try {
          const uploadResult = await apiService.uploadImage(coverImage);
          if (uploadResult && uploadResult.length > 0) {
            postData.coverImage = uploadResult[0].id;
          }
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
          toast.error('Failed to upload image. Post will be saved without image.');
        } finally {
          setIsUploading(false);
        }
      }

      if (isEditing) {
        // Use documentId for Strapi v5 updates
        const postId = currentPost.documentId || currentPost.id;
        await updatePost(postId, postData);
      } else {
        await createPost(postData);
      }
      
      navigate('/');
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSubmitting(true);
    
    try {
      let postData = {
        title,
        content,
        excerpt,
        category,
        readTime: parseInt(readTime),
        // Don't set publishedAt for drafts
      };

      // Handle image upload if a new image is selected
      if (coverImage) {
        setIsUploading(true);
        try {
          const uploadResult = await apiService.uploadImage(coverImage);
          if (uploadResult && uploadResult.length > 0) {
            postData.coverImage = uploadResult[0].id;
          }
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
          toast.error('Failed to upload image. Draft will be saved without image.');
        } finally {
          setIsUploading(false);
        }
      }

      if (isEditing) {
        // Use documentId for Strapi v5 updates
        const postId = currentPost.documentId || currentPost.id;
        await updatePost(postId, postData);
      } else {
        await createPost(postData);
      }
      
      toast.success('Draft saved!');
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (isEditing && currentPost) {
      try {
        // Use documentId for Strapi v5 deletes
        const postId = currentPost.documentId || currentPost.id;
        await deletePost(postId);
        navigate('/');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
    setIsDeleteModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="card max-w-4xl mx-auto bg-base-100 shadow-lg p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-base-content">
          {isEditing ? 'Edit Post' : 'Create New Post'}
        </h1>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-bold text-base-content mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter post title..."
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="excerpt" className="block text-sm font-bold text-base-content mb-1">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="textarea textarea-bordered w-full"
            placeholder="Brief description of your post..."
          />
        </div>

        <div className="mb-6">
          <label htmlFor="coverImage" className="block text-sm font-bold text-base-content mb-1">
            Cover Image
          </label>
          <div className="space-y-4">
            <input
              type="file"
              id="coverImage"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full"
            />
            
            {coverImagePreview && (
              <div className="relative">
                <img
                  src={coverImagePreview}
                  alt="Cover preview"
                  className="w-full max-w-md h-48 object-cover rounded-lg border border-base-300"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="btn btn-sm btn-error absolute top-2 right-2"
                >
                  ✕
                </button>
              </div>
            )}
            
            {isUploading && (
              <div className="flex items-center gap-2 text-sm text-base-content/60">
                <span className="loading loading-spinner loading-sm"></span>
                Uploading image...
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="category" className="block text-sm font-bold text-base-content mb-1">
              Category *
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input input-bordered w-full"
              placeholder="e.g., Web Development"
              required
            />
          </div>
          
          <div>
            <label htmlFor="readTime" className="block text-sm font-bold text-base-content mb-1">
              Read Time (minutes)
            </label>
            <input
              type="number"
              id="readTime"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              className="input input-bordered w-full"
              min="1"
              max="60"
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-bold text-base-content mb-1">
            Content *
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="textarea textarea-bordered w-full"
            placeholder="Write your post content here..."
            required
          />
        </div>

        <div className="flex justify-between">
          <div>
            {isEditing && (
              <button
                type="button"
                className="btn btn-outline btn-error"
                onClick={() => setIsDeleteModalOpen(true)}
                disabled={isSubmitting}
              >
                Delete Post
              </button>
            )}
          </div>

          <div className="space-x-3">
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleSaveDraft}
              disabled={isSubmitting || isUploading}
            >
              {isSubmitting || isUploading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  {isUploading ? 'Uploading...' : 'Saving...'}
                </>
              ) : (
                'Save Draft'
              )}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || isUploading}
            >
              {isSubmitting || isUploading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  {isUploading ? 'Uploading...' : 'Publishing...'}
                </>
              ) : (
                isEditing ? 'Update Post' : 'Publish Post'
              )}
            </button>
          </div>
        </div>
      </form>

      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title={title || "this post"}
      />
    </div>
  );
}