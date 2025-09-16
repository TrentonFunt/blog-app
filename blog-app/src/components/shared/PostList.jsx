import PostCard from '../posts/PostCard';
import EmptyState from '../ui/EmptyState';

export default function PostList({ posts, showAdminControls = false }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <EmptyState message="No posts available." icon="📭" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {posts.map(post => (
        <PostCard key={post.slug} post={post} showAdminControls={showAdminControls} />
      ))}
    </div>
  );
}
