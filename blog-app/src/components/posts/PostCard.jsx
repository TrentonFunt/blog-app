import { Link } from 'react-router';
import PrimaryButton from '../ui/PrimaryButton';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function PostCard({ post }) {
  return (
    <div className="card bg-base-100 shadow-xl rounded-xl overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-2xl flex flex-col">
      {post.image && (
        <Link to={`/posts/${post.slug}`} className="block">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
        </Link>
      )}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="badge badge-primary badge-outline text-xs px-3 py-2">
            {post.category}
          </span>
          <span className="text-xs text-base-content/60 flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            {new Date(post.date).toLocaleDateString()}
          </span>
          <span className="text-xs text-base-content/60 flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            {post.readTime} min read
          </span>
        </div>
        <h2 className="font-bold text-xl mb-2 line-clamp-2">
          <Link to={`/posts/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h2>
        <p className="text-base-content/70 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-auto flex justify-end">
          <Link to={`/posts/${post.slug}`}>
            <PrimaryButton className="btn-sm">Read More</PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
