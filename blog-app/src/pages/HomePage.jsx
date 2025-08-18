import { useState } from 'react';
import PostList from '../components/shared/PostList';
import SearchBar from '../components/shared/SearchBar';
import postsData from '../data/posts';
import { Link } from 'react-router';
import SectionHeading from '../components/ui/SectionHeading';
import PrimaryButton from '../components/ui/PrimaryButton';

function HeroSection() {
  return (
    <section className="hero min-h-[320px] bg-gradient-to-r from-primary to-secondary rounded-xl shadow-lg mb-10 flex items-center justify-between px-8 py-12">
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-base-100 mb-4 drop-shadow-lg">
          Welcome to Tiwa's Blog
        </h1>
        <p className="text-lg md:text-xl text-base-100/80 mb-6 max-w-xl">
          Discover insightful articles, tutorials, and resources to help you grow as a Professional. Stay updated with the latest trends and tips!
        </p>
        <Link to="/posts">
          <PrimaryButton className="text-lg px-6 py-3 shadow-md">Browse All Posts</PrimaryButton>
        </Link>
      </div>
      <div className="hidden md:block">
        <img src="/vite.svg" alt="Rise Academy" className="w-40 h-40 drop-shadow-xl" />
      </div>
    </section>
  );
}

export default function HomePage() {
  const [searchResults, setSearchResults] = useState(postsData);

  const handleSearch = (query) => {
    const filtered = postsData.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.category.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const postsToShow = searchResults.slice(0, 4);

  return (
    <div className="w-full xl:w-full px-0 mx-auto">
      <HeroSection />
      <SectionHeading icon="🔥">Latest Posts</SectionHeading>
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>
      <PostList posts={postsToShow} />
      {searchResults.length > 4 && (
        <div className="flex justify-center mt-8">
          <Link to="/posts">
            <PrimaryButton>View All Posts</PrimaryButton>
          </Link>
        </div>
      )}
    </div>
  );
}
