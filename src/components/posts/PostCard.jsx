import { Link } from 'react-router';
import PrimaryButton from '../ui/PrimaryButton';
import { CalendarIcon, ClockIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { formatDate } from '../../utils/dateUtils';
import { useState } from 'react';
import DeleteModal from '../ui/DeleteModal';
import { usePosts } from '../../context/PostContext';
import { toast } from 'react-hot-toast';
import { HoverScale, AnimatedButton } from '../animations';

export default function PostCard({ post, showAdminControls = false }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { deletePost } = usePosts();

      const handleDelete = async () => {
        setIsDeleting(true);
        try {
          // Use documentId for Strapi v5 deletes
          const postId = post.documentId || post.id;
          await deletePost(postId);
          setIsDeleteModalOpen(false);
          toast.success('Post deleted successfully!');
        } catch {
          toast.error('Failed to delete post');
        } finally {
          setIsDeleting(false);
        }
      };

  return (
    <HoverScale className="h-full">
      <article className="group bg-base-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
        {post.coverImage && (
          <Link to={`/posts/${post.slug}`} className="block relative overflow-hidden">
            <img
              src={post.coverImage.url}
              alt={post.title}
              className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        )}
      
      <div className="p-6 flex-1 flex flex-col">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-bold text-xl mb-3 line-clamp-2 leading-tight">
          <Link to={`/posts/${post.slug}`} className="text-base-content hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="text-base-content/70 mb-4 line-clamp-3 leading-relaxed flex-1">
          {post.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-base-content/60 mb-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              {formatDate(post.publishedAt || post.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              {post.readTime || 5} min read
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <Link to={`/posts/${post.slug}`}>
            <AnimatedButton className="text-primary hover:text-primary/80 font-medium text-sm transition-colors bg-transparent border-none p-0">
              Read More →
            </AnimatedButton>
          </Link>
          
          {showAdminControls && (
            <div className="flex gap-2">
              <Link to={`/edit/${post.slug}`}>
                <AnimatedButton className="btn btn-sm btn-outline btn-primary">
                  <PencilIcon className="w-4 h-4" />
                </AnimatedButton>
              </Link>
              <AnimatedButton 
                className="btn btn-sm btn-outline btn-error"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <TrashIcon className="w-4 h-4" />
              </AnimatedButton>
            </div>
          )}
        </div>
      </div>
      
        <DeleteModal
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          title="Delete Post"
          message={`Are you sure you want to delete "${post.title}"? This action cannot be undone.`}
          loading={isDeleting}
        />
      </article>
    </HoverScale>
  );
}
