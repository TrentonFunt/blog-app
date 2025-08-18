import PostCard from '../posts/PostCard';
import EmptyState from '../ui/EmptyState';

export default function PostList({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <EmptyState message="No posts available." icon="📭" />
      </div>
    );
  }

  return (
    <div className="w-full px-4 xl:px-0">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
        {posts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
