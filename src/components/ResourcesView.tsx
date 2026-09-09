import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Plus,
  Tag,
  GraduationCap,
} from 'lucide-react';
import { ResourceItem, ResourceCategory } from '../types';

interface ResourcesViewProps {
  resources: ResourceItem[];
  onToggleBookmark: (id: string) => void;
  onAddResource: (res: Omit<ResourceItem, 'id' | 'bookmarked'>) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({
  resources,
  onToggleBookmark,
  onAddResource,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ResourceCategory>('Programming');
  const [type, setType] = useState<'Documentation' | 'Course' | 'Interactive' | 'Article' | 'Book'>('Documentation');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const categories: (ResourceCategory | 'All')[] = [
    'All',
    'Programming',
    'Mathematics',
    'Physics',
    'Database Systems',
    'Computer Networks',
    'Algorithms & DSA',
    'Technical English',
    'Career Development',
    'Interview Preparation',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    onAddResource({
      title,
      category,
      type,
      url,
      description,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
    });

    setTitle('');
    setUrl('');
    setDescription('');
    setTagsInput('');
    setShowAddModal(false);
  };

  const filteredResources = resources.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesBookmark = !bookmarkedOnly || item.bookmarked;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesBookmark && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Curated Learning Resources Hub</h1>
          <p className="mt-1 text-sm text-slate-600">
            Hand-picked CS, STEM, interview prep, and technical career repositories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setBookmarkedOnly(!bookmarkedOnly)}
            className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
              bookmarkedOnly
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Bookmark className="h-4 w-4" />
            <span>Saved Bookmarks</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            <span>Submit Resource</span>
          </button>
        </div>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by topic, keyword, or language (e.g. Dijkstra, SQL, NeetCode, Big-O)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-xs hover:border-indigo-300 transition-all group"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="rounded-lg bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-700">
                  {item.category}
                </span>
                <button
                  onClick={() => onToggleBookmark(item.id)}
                  className="text-slate-400 hover:text-indigo-600"
                  title="Bookmark"
                >
                  {item.bookmarked ? (
                    <BookmarkCheck className="h-5 w-5 text-indigo-600 fill-indigo-100" />
                  ) : (
                    <Bookmark className="h-5 w-5" />
                  )}
                </button>
              </div>

              <h3 className="mt-3 font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                {item.title}
              </h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed line-clamp-2">
                {item.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-3 flex items-center justify-between">
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                {item.type}
              </span>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline"
              >
                <span>Visit Link</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Add Resource Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl animate-in fade-in">
            <h2 className="text-lg font-bold text-slate-900">Add Learning Resource</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Visualgo: Algorithm Animation"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
                  >
                    <option value="Programming">Programming</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Database Systems">Database Systems</option>
                    <option value="Computer Networks">Computer Networks</option>
                    <option value="Algorithms & DSA">Algorithms & DSA</option>
                    <option value="Technical English">Technical English</option>
                    <option value="Career Development">Career Development</option>
                    <option value="Interview Preparation">Interview Preparation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Resource Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
                  >
                    <option value="Documentation">Documentation</option>
                    <option value="Course">Course</option>
                    <option value="Interactive">Interactive</option>
                    <option value="Article">Article</option>
                    <option value="Book">Book</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Resource URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://visualgo.net"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Why is this resource useful for university students?"
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Tags (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="trees, graphs, sorting, visualization"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700"
                >
                  Save Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
