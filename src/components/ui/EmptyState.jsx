import PropTypes from 'prop-types';
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

export default function EmptyState({ title = 'No Results', message = 'Try adjusting your search or create a new post.', showInfo = false }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12">
      <span className="text-5xl mb-2">📭</span>
      <p className="text-lg text-base-content/70 font-medium">{message}</p>
      {showInfo && (
        <button className="btn btn-primary mt-6" onClick={() => setShowModal(true)}>
          Show Info
        </button>
      )}
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowModal(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-40" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="card bg-base-100 shadow-xl p-6 max-w-sm w-full">
              <DialogTitle className="card-title text-lg font-bold mb-2">{title}</DialogTitle>
              <div className="mb-4">
                <p className="text-base-content/70">{message}</p>
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

EmptyState.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  showInfo: PropTypes.bool,
};
