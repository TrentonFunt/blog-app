import { Link } from 'react-router';
import DarkModeToggle from '../ui/DarkModeToggle';
import PrimaryButton from '../ui/PrimaryButton';
import { HomeIcon, NewspaperIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function NavBar() {
  return (
    <nav className="navbar bg-base-100 shadow-md px-4 py-2 flex items-center justify-between rounded-b-xl">
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <HomeIcon className="w-6 h-6" /> Tiwa's Blog
        </Link>
        <Link to="/posts" className="flex items-center gap-2 text-base font-medium hover:text-secondary transition-colors">
          <NewspaperIcon className="w-5 h-5" /> Posts
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/create">
          <PrimaryButton className="btn-sm flex items-center gap-2">
            <PlusIcon className="w-4 h-4" /> New Post
          </PrimaryButton>
        </Link>
        <DarkModeToggle />
        {/* Add user avatar/profile here if needed */}
      </div>
    </nav>
  );
}
