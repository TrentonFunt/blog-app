import { useState, useEffect } from 'react';
import PostList from '../components/shared/PostList';
import SearchBar from '../components/shared/SearchBar';
import PrimaryButton from '../components/ui/PrimaryButton';
import { usePosts } from '../context/PostContext';
import { useAdmin } from '../hooks/useAdmin';
import { 
  FadeInUp, 
  StaggerContainer, 
  StaggerItem, 
  TextReveal, 
  AnimatedButton 
} from '../components/animations';

export default function PostsPage() {
  const { posts, searchResults, isSearching, searchPosts, clearSearch, fetchPosts } = usePosts();
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

  const handleResetSearch = () => {
    setLocalSearchQuery('');
    clearSearch();
  };

  // Show search results if searching, otherwise show all posts
  const postsToShow = localSearchQuery.trim() ? searchResults : posts;

  return (
    <div className="min-h-screen bg-base-200/30">
      {/* Header Section */}
      <FadeInUp>
        <div className="bg-base-100 shadow-sm border-b border-base-300">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <TextReveal>
                <h1 className="text-4xl font-bold text-base-content mb-4">All Blog Posts</h1>
              </TextReveal>
              <TextReveal delay={200}>
                <p className="text-base-content/70 text-lg mb-6">
                  Explore our collection of articles, tutorials, and insights
                </p>
              </TextReveal>
              
              {/* Search and Filter Section */}
              <StaggerContainer className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <StaggerItem>
                  <div className="flex-1 max-w-md">
                    <SearchBar onSearch={handleSearch} />
                  </div>
                </StaggerItem>
                {localSearchQuery.trim() && (
                  <StaggerItem>
                    <AnimatedButton 
                      className="btn btn-outline btn-sm" 
                      onClick={handleResetSearch}
                    >
                      Clear Search
                    </AnimatedButton>
                  </StaggerItem>
                )}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </FadeInUp>

      {/* Posts Content */}
      <FadeInUp delay={200}>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {isSearching ? (
              <div className="flex justify-center items-center py-16">
                <div className="text-center">
                  <div className="loading loading-spinner loading-lg mb-4"></div>
                  <p className="text-base-content/60">Searching posts...</p>
                </div>
              </div>
            ) : (
              <>
                {/* Results Count */}
                {postsToShow && postsToShow.length > 0 && (
                  <FadeInUp delay={300}>
                    <div className="mb-6">
                      <p className="text-base-content/60">
                        {localSearchQuery.trim() 
                          ? `Found ${postsToShow.length} result${postsToShow.length !== 1 ? 's' : ''} for "${localSearchQuery}"`
                          : `Showing ${postsToShow.length} post${postsToShow.length !== 1 ? 's' : ''}`
                        }
                      </p>
                    </div>
                  </FadeInUp>
                )}
                
                {/* Posts Grid */}
                <StaggerContainer>
                  <PostList posts={postsToShow} showAdminControls={isAdminMode} />
                </StaggerContainer>
                
                {/* No Results */}
                {(!postsToShow || postsToShow.length === 0) && !isSearching && (
                  <FadeInUp delay={400}>
                    <div className="text-center py-16">
                      <div className="text-6xl mb-4">📭</div>
                      <TextReveal>
                        <h3 className="text-xl font-semibold text-base-content mb-2">
                          {localSearchQuery.trim() ? 'No posts found' : 'No posts available'}
                        </h3>
                      </TextReveal>
                      <TextReveal delay={200}>
                        <p className="text-base-content/60 mb-6">
                          {localSearchQuery.trim() 
                            ? `No posts match your search for "${localSearchQuery}". Try different keywords.`
                            : 'Check back later for new content!'
                          }
                        </p>
                      </TextReveal>
                      {localSearchQuery.trim() && (
                        <AnimatedButton 
                          className="btn btn-primary"
                          onClick={handleResetSearch}
                        >
                          View All Posts
                        </AnimatedButton>
                      )}
                    </div>
                  </FadeInUp>
                )}
              </>
            )}
          </div>
        </div>
      </FadeInUp>
    </div>
  );
}
