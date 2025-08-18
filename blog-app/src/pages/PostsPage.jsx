import { useState } from 'react';
import postsData from '../data/posts';
import PostList from '../components/shared/PostList';
import SearchBar from '../components/shared/SearchBar';
import SectionHeading from '../components/ui/SectionHeading';
import PrimaryButton from '../components/ui/PrimaryButton';

export default function PostsPage() {
  const [searchResults, setSearchResults] = useState(postsData);

  const handleSearch = (query) => {
    const filtered = postsData.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.category.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  return (
    <div className="w-full xl:w-full px-0 mx-auto">
      <SectionHeading icon="🗂️">All Blog Posts</SectionHeading>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <SearchBar onSearch={handleSearch} />
        <PrimaryButton className="btn-outline btn-sm" onClick={() => setSearchResults(postsData)}>
          Reset Search
        </PrimaryButton>
      </div>
      <PostList posts={searchResults} />
    </div>
  );
}
