import { useParams, useNavigate } from 'react-router';
import { ClockIcon, CalendarIcon, ShareIcon, ArrowLeftIcon, UserIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogPanel, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import PrimaryButton from '../components/ui/PrimaryButton';
import PostContent from '../components/ui/PostContent';
import PostList from '../components/shared/PostList';
import { usePosts } from '../context/PostContext';
import { useAdmin } from '../context/AdminContext';
import { formatDate } from '../utils/dateUtils';
import { 
  FadeInUp, 
  StaggerContainer, 
  StaggerItem, 
  TextReveal, 
  HoverScale,
  AnimatedButton 
} from '../components/animations';

export default function PostDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [showImageModal, setShowImageModal] = useState(false);
  const { currentPost, posts, loading, error, fetchPostBySlug } = usePosts();
  const { isAdminMode } = useAdmin();

  useEffect(() => {
    if (slug) {
      fetchPostBySlug(slug);
    }
  }, [slug, fetchPostBySlug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      </div>
    );
  }

  if (error || !currentPost) {
    return (
      <div className="container mx-auto px-4 py-8">
        <SectionHeading icon="🚫">Post Not Found</SectionHeading>
        <p>Sorry, we couldn't find the post you're looking for.</p>
        <PrimaryButton variant="outline" onClick={() => navigate('/')}>Go Back</PrimaryButton>
      </div>
    );
  }

  const post = currentPost;

  // Get similar posts (same category, excluding current post)
  const similarPosts = posts?.filter(p => 
    p.id !== post?.id && 
    p.category?.toLowerCase() === post?.category?.toLowerCase()
  ).slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-base-200/30">
      {/* Back Button */}
      <FadeInUp>
        <div className="container mx-auto px-4 py-6">
          <AnimatedButton 
            onClick={() => navigate('/')}
            className="btn btn-ghost btn-sm gap-2 text-base-content/70 hover:text-base-content"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Posts
          </AnimatedButton>
        </div>
      </FadeInUp>

      {/* Main Article */}
      <article className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Cover Image */}
          {post.coverImage && (
            <FadeInUp delay={200}>
              <HoverScale className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
                <div 
                  className="aspect-video cursor-pointer group" 
                  onClick={() => setShowImageModal(true)}
                >
                  <img 
                    src={post.coverImage.url} 
                    alt={post.title}
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
              </HoverScale>
              <Transition appear show={showImageModal} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setShowImageModal(false)}>
                  <div className="fixed inset-0 bg-black bg-opacity-75" />
                  <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="bg-base-100 rounded-2xl shadow-2xl p-4 max-w-4xl w-full">
                      <img src={post.coverImage.url} alt={post.title} className="w-full h-auto rounded-xl" />
                    </DialogPanel>
                  </div>
                </Dialog>
              </Transition>
            </FadeInUp>
          )}

          {/* Article Header */}
          <FadeInUp delay={300}>
            <header className="mb-8">
              {/* Category and Meta */}
              <StaggerContainer className="flex flex-wrap items-center gap-4 mb-6">
                <StaggerItem>
                  <span className="badge badge-primary badge-lg px-4 py-2 text-sm font-semibold">
                    {post.category}
                  </span>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-center gap-4 text-sm text-base-content/60">
                    <span className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      {formatDate(post.publishedAt || post.createdAt)}
                    </span>
                    <span className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4" />
                      {post.readTime || 5} min read
                    </span>
                  </div>
                </StaggerItem>
              </StaggerContainer>

              {/* Title */}
              <TextReveal>
                <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-6 leading-tight">
                  {post.title}
                </h1>
              </TextReveal>

              {/* Excerpt */}
              {post.excerpt && (
                <TextReveal delay={200}>
                  <div className="text-xl text-base-content/80 leading-relaxed mb-8">
                    <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                  </div>
                </TextReveal>
              )}

              {/* Author Info */}
              {post.author && (
                <FadeInUp delay={400}>
                  <div className="flex items-center gap-4 p-4 bg-base-100 rounded-xl border border-base-300">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        {post.author.avatar ? (
                          <img src={post.author.avatar} alt={post.author.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <UserIcon className="w-6 h-6 text-primary" />
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-base-content">{post.author.name}</p>
                      {post.author.bio && (
                        <p className="text-sm text-base-content/60">{post.author.bio}</p>
                      )}
                    </div>
                  </div>
                </FadeInUp>
              )}
            </header>
          </FadeInUp>

          {/* Article Content */}
          <FadeInUp delay={500}>
            <div className="mb-12">
              <PostContent content={post.content} />
            </div>
          </FadeInUp>

          {/* Article Footer */}
          <FadeInUp delay={600}>
            <footer className="border-t border-base-300 pt-8">
              <StaggerContainer className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <StaggerItem>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-base-content/60">
                      Published on {formatDate(post.publishedAt || post.createdAt)}
                    </span>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-center gap-3">
                    <AnimatedButton className="btn btn-outline btn-sm gap-2">
                      <ShareIcon className="w-4 h-4" />
                      Share
                    </AnimatedButton>
                    <AnimatedButton 
                      onClick={() => navigate('/')}
                      className="btn btn-primary btn-sm"
                    >
                      Back to Posts
                    </AnimatedButton>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </footer>
          </FadeInUp>
        </div>
      </article>

      {/* Similar Posts Section */}
      {similarPosts.length > 0 && (
        <FadeInUp delay={700}>
          <section className="container mx-auto px-4 pb-16">
            <div className="max-w-6xl mx-auto">
              <TextReveal>
                <h2 className="text-3xl font-bold text-base-content mb-8">SIMILAR POSTS</h2>
              </TextReveal>
              <StaggerContainer>
                <PostList posts={similarPosts} showAdminControls={isAdminMode} />
              </StaggerContainer>
            </div>
          </section>
        </FadeInUp>
      )}
    </div>
  );
}