import { useState, useEffect } from 'react';
import PostList from '../components/shared/PostList';
import SearchBar from '../components/shared/SearchBar';
import { Link } from 'react-router';
import SectionHeading from '../components/ui/SectionHeading';
import PrimaryButton from '../components/ui/PrimaryButton';
import { usePosts } from '../context/PostContext';
import { useAdmin } from '../hooks/useAdmin';
import { 
  FadeInUp, 
  StaggerContainer, 
  StaggerItem, 
  TextReveal, 
  ParallaxScroll,
  AnimatedButton 
} from '../components/animations';

function HeroSection() {
  return (
    <section className="hero min-h-[400px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl mb-12 flex items-center justify-center px-8 py-16 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <ParallaxScroll speed={0.3} className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-400 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-400 rounded-full blur-xl"></div>
      </ParallaxScroll>
      
      <div className="text-center relative z-10 max-w-4xl px-4">
        <TextReveal delay={200}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl">
            Welcome to Tiwa's Blog
          </h1>
        </TextReveal>
        
        <TextReveal delay={400}>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover insightful articles, tutorials, and resources to help you grow as a Professional. Stay updated with the latest trends and tips!
          </p>
        </TextReveal>
        
        <StaggerContainer className="flex flex-col sm:flex-row gap-4 justify-center">
          <StaggerItem>
            <Link to="/posts">
              <AnimatedButton className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-lg bg-blue-600 hover:bg-blue-700 border-0 w-full sm:w-auto text-white rounded-lg font-medium">
                Browse All Posts
              </AnimatedButton>
            </Link>
          </StaggerItem>
          <StaggerItem>
            <Link to="/create">
              <AnimatedButton className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-lg bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 w-full sm:w-auto rounded-lg font-medium">
                Write Post
              </AnimatedButton>
            </Link>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { posts, searchResults, loading, error, searchPosts, clearSearch, fetchPosts } = usePosts();
  const { isAdminMode } = useAdmin();
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  // Load posts when component mounts
  useEffect(() => {
    if (!posts || posts.length === 0) {
      fetchPosts();
    }
  }, [fetchPosts, posts]);

  const handleSearch = async (query) => {
    setLocalSearchQuery(query);
    if (query.trim()) {
      await searchPosts(query);
    } else {
      clearSearch();
    }
  };

  // Show search results if searching, otherwise show latest posts
  const postsToShow = localSearchQuery.trim() 
    ? (searchResults || []).slice(0, 4) 
    : (posts || []).slice(0, 4);

  // Show loading state
  if (loading && !posts?.length) {
    return (
      <div className="w-full xl:w-full px-0 mx-auto">
        <HeroSection />
        <div className="flex justify-center items-center py-16">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="w-full xl:w-full px-0 mx-auto">
        <HeroSection />
        <div className="alert alert-error">
          <span>Error loading posts: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full xl:w-full px-0 mx-auto">
      <HeroSection />
      
      {/* LATEST Section */}
      <FadeInUp>
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <TextReveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-base-content">LATEST</h2>
            </TextReveal>
            <TextReveal delay={200}>
              <Link to="/posts" className="text-primary hover:text-primary/80 font-medium text-sm sm:text-base transition-colors">
                View All →
              </Link>
            </TextReveal>
          </div>
          
          {localSearchQuery.trim() ? (
            <FadeInUp delay={300}>
              <div className="mb-6">
                <SearchBar onSearch={handleSearch} />
              </div>
            </FadeInUp>
          ) : null}
          
          <StaggerContainer>
            <PostList posts={postsToShow} showAdminControls={isAdminMode} />
          </StaggerContainer>
        </section>
      </FadeInUp>

      {/* JAVASCRIPT Section */}
      <FadeInUp delay={200}>
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <TextReveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-base-content">JAVASCRIPT</h2>
            </TextReveal>
            <TextReveal delay={200}>
              <Link to="/posts?category=javascript" className="text-primary hover:text-primary/80 font-medium text-sm sm:text-base transition-colors">
                View All →
              </Link>
            </TextReveal>
          </div>
          
          {/* Filter posts by JavaScript category for this section */}
          {(() => {
            const jsPosts = (posts || []).filter(post => 
              post.category?.toLowerCase().includes('javascript') || 
              post.title?.toLowerCase().includes('javascript') ||
              post.content?.toLowerCase().includes('javascript')
            ).slice(0, 3);
            
            return jsPosts.length > 0 ? (
              <StaggerContainer>
                <PostList posts={jsPosts} showAdminControls={isAdminMode} />
              </StaggerContainer>
            ) : (
              <FadeInUp delay={300}>
                <div className="text-center py-12 text-base-content/60">
                  <p>No JavaScript posts found. Create some content to see them here!</p>
                </div>
              </FadeInUp>
            );
          })()}
        </section>
      </FadeInUp>

      {/* Newsletter Section */}
      <FadeInUp delay={400}>
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 mb-16">
          <div className="max-w-2xl mx-auto text-center">
            <TextReveal>
              <h2 className="text-3xl font-bold text-base-content mb-4">NEWSLETTER</h2>
            </TextReveal>
            <TextReveal delay={200}>
              <p className="text-base-content/80 mb-6 leading-relaxed">
                Subscribe to our newsletter to get the latest programming articles, tutorials, and resources delivered straight to your inbox. Join our community of developers and stay ahead of the curve!
              </p>
            </TextReveal>
            <StaggerContainer className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <StaggerItem>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="input input-bordered flex-1"
                />
              </StaggerItem>
              <StaggerItem>
                <AnimatedButton className="btn btn-primary">
                  Subscribe
                </AnimatedButton>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>
      </FadeInUp>
    </div>
  );
}
