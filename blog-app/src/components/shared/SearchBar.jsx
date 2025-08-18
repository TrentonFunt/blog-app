import { useState, useEffect, Fragment } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Dialog, DialogTitle, DialogPanel, Transition } from '@headlessui/react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim() !== '') {
        onSearch(query);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [query, onSearch]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiSearch className="h-5 w-5 text-base-content/60" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
        className="input input-bordered w-full pl-10 pr-3 py-2 rounded-md focus:ring-2 focus:ring-primary"
      />
      <button
        type="button"
        className="btn btn-outline btn-sm absolute right-2 top-1"
        onClick={() => setShowModal(true)}
      >
        Help
      </button>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowModal(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-40" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="card bg-base-100 shadow-xl p-6 max-w-sm w-full">
              <DialogTitle className="card-title text-lg font-bold mb-2">Search Help</DialogTitle>
              <div className="mb-4">
                <p className="text-base-content/70">Type keywords to search posts. Results update automatically as you type.</p>
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
    </div>
  );
}
