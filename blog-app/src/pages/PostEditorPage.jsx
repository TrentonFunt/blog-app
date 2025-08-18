import { useState } from 'react';
import { useNavigate } from 'react-router';
import DeleteModal from '../components/ui/DeleteModal';
import { toast } from 'react-hot-toast';

export default function PostEditorPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Post published!');
    console.log('Post saved:', { title, content });
    navigate('/');
  };

  const handleDelete = () => {
    toast.error('Post deleted!');
    console.log('Post deleted');
    setIsDeleteModalOpen(false);
    navigate('/');
  };

  return (
    <div className="card max-w-4xl mx-auto bg-base-100 shadow-lg p-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-bold text-base-content mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-bold text-base-content mb-1">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>

        <div className="flex justify-between">
          <div>
            <button
              type="button"
              className="btn btn-outline btn-error"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete
            </button>
          </div>

          <div className="space-x-3">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => toast('Draft saved!')}
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Publish
            </button>
          </div>
        </div>
      </form>

      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title={title || "this post"}
      />
    </div>
  );
}