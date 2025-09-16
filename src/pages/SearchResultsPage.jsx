import { useState, useEffect, Fragment } from 'react';
import { useLocation } from 'react-router';
import PostList from '../components/shared/PostList';
import SectionHeading from '../components/ui/SectionHeading';
import EmptyState from '../components/ui/EmptyState';
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { usePosts } from '../context/PostContext';

export default function SearchResultsPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';
  const [showModal, setShowModal] = useState(false);
  const { searchResults, isSearching, searchPosts, clearSearch } = usePosts();

  useEffect(() => {
    if (searchQuery.trim()) {
      searchPosts(searchQuery);
    } else {
      clearSearch();
    }
  }, [searchQuery, searchPosts, clearSearch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeading icon="🔍">
        Search Results {searchQuery && `for "${searchQuery}"`}
      </SectionHeading>
      <button
        className="btn btn-outline btn-sm mb-6"
        onClick={() => setShowModal(true)}
      >
        Search Tips
      </button>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowModal(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-40" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="card bg-base-100 shadow-xl p-6 max-w-sm w-full">
              <DialogTitle className="card-title text-lg font-bold mb-2">Search Tips</DialogTitle>
              <div className="mb-4">
                <p className="text-base-content/70">Try searching by keywords, categories, or author names for better results.</p>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-outline" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
      
      {isSearching ? (
        <div className="flex justify-center items-center py-16">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : searchResults.length > 0 ? (
        <PostList posts={searchResults} />
      ) : (
        <EmptyState 
          message={searchQuery ? `No posts found matching "${searchQuery}"` : "No search query provided"} 
          icon="😕" 
        />
      )}
    </div>
  );
}