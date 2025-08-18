import { useParams } from 'react-router';
import postsData from '../data/posts';
import { ClockIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogPanel, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import PrimaryButton from '../components/ui/PrimaryButton';

export default function PostDetailPage() {
  const { slug } = useParams();
  const [showImageModal, setShowImageModal] = useState(false);

  const post = postsData.find(p => p.slug === slug);
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <SectionHeading icon="🚫">Post Not Found</SectionHeading>
        <p>Sorry, we couldn't find the post you're looking for.</p>
        <PrimaryButton variant="outline">Go Back</PrimaryButton>
      </div>
    );
  }

  return (
    <article className="card w-full max-w-4xl mx-auto bg-base-100 shadow-lg p-8 rounded-xl xl:px-16 xl:py-12">
      {post.image && (
        <>
          <div className="aspect-video mb-8 rounded-xl overflow-hidden cursor-pointer" onClick={() => setShowImageModal(true)}>
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-96 object-cover transition duration-200 hover:scale-105"
            />
          </div>
          <Transition appear show={showImageModal} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => setShowImageModal(false)}>
              <div className="fixed inset-0 bg-black bg-opacity-60" />
              <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="bg-base-100 rounded-xl shadow-xl p-4 max-w-2xl w-full">
                  <img src={post.image} alt={post.title} className="w-full h-auto rounded" />
                </DialogPanel>
              </div>
            </Dialog>
          </Transition>
        </>
      )}
      <div className="mb-6 flex items-center gap-2">
        <span className="badge badge-primary badge-outline px-3 py-1 text-sm font-medium">
          {post.category}
        </span>
        <span className="text-xs text-base-content/60 flex items-center gap-1">
          <CalendarIcon className="w-4 h-4" />
          {new Date(post.date).toLocaleDateString()}
        </span>
        <span className="text-xs text-base-content/60 flex items-center gap-1">
          <ClockIcon className="w-4 h-4" />
          {post.readTime} min read
        </span>
      </div>
      <SectionHeading icon="📖">{post.title}</SectionHeading>
      <div className="prose prose-lg max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
      <div className="prose prose-lg max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="flex justify-end">
        <PrimaryButton variant="outline">Share</PrimaryButton>
      </div>
    </article>
  );
}