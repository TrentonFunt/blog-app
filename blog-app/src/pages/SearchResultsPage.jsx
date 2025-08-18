import { useState, useEffect, Fragment } from 'react';
import { useLocation } from 'react-router';
import postsData from '../data/posts';
import PostList from '../components/shared/PostList';
import SectionHeading from '../components/ui/SectionHeading';
import EmptyState from '../components/ui/EmptyState';
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';

export default function SearchResultsPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';
  const [results, setResults] = useState(postsData);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      setResults(postsData);
    } else {
      setResults(
        postsData.filter(post =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeading icon="🔍">Search Results</SectionHeading>
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
      {results.length > 0 ? (
        <PostList posts={results} />
      ) : (
        <EmptyState message="No posts found matching your search." icon="😕" />
      )}
    </div>
  );
}