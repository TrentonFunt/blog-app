import { Fragment } from 'react';
import { Dialog, DialogPanel, Transition } from '@headlessui/react';
import PrimaryButton from './PrimaryButton';

export default function DeleteModal({ open, onClose, onConfirm, title = 'Delete Post', message = 'Are you sure you want to delete this post?', loading }) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-60" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-base-100 rounded-xl shadow-xl p-8 max-w-md w-full flex flex-col items-center">
            <h3 className="font-bold text-xl mb-2 text-error">{title}</h3>
            <p className="mb-6 text-base-content/80 text-center">{message}</p>
            <div className="flex gap-4 mt-4">
              <PrimaryButton className="btn-error" onClick={onConfirm} disabled={loading}>
                {loading ? 'Deleting...' : 'Delete'}
              </PrimaryButton>
              <PrimaryButton variant="outline" onClick={onClose} disabled={loading}>
                Cancel
              </PrimaryButton>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
}
