"use client";

// Interactive parts of a pre-rendered scholarship page: Apply / Save / Share buttons and the
// logged-in user's saved and applied state. Everything search engines need is already in the HTML.

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon, BookmarkIcon, CheckCircleIcon, ShareIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { useAuth } from '@/app/Authentication/context/AuthContext';
import { loginHref } from '@/app/Authentication/utils/authUtils';

const API = process.env.NEXT_PUBLIC_API_URL;

const authHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  return token ? { Authorization: `Bearer ${token}` } : null;
};

interface Props {
  scholarshipId: number;
  title: string;
  applicationUrl: string;
  closed: boolean;
  variant: 'sidebar' | 'mobile';
}

const useScholarshipState = (scholarshipId: number) => {
  const { isAuthenticated } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const headers = authHeaders();
    if (!isAuthenticated || !headers) return;
    const ids = (data: any) => (data.results || data).map((item: any) => item.scholarship);
    fetch(`${API}/user/saved-scholarships/`, { headers })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setIsSaved(ids(d).includes(scholarshipId)))
      .catch(() => {});
    fetch(`${API}/user/applications/`, { headers })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setHasApplied(ids(d).includes(scholarshipId)))
      .catch(() => {});
  }, [isAuthenticated, scholarshipId]);

  const toggleSave = async () => {
    const headers = authHeaders();
    if (!isAuthenticated || !headers) {
      window.location.href = loginHref();
      return;
    }
    setSaving(true);
    try {
      if (isSaved) {
        const list = await fetch(`${API}/user/saved-scholarships/`, { headers }).then((r) => r.json());
        const item = (list.results || list).find((i: any) => i.scholarship === scholarshipId);
        if (item) {
          const res = await fetch(`${API}/user/saved-scholarships/${item.id}/`, { method: 'DELETE', headers });
          if (res.ok) setIsSaved(false);
        }
      } else {
        const res = await fetch(`${API}/user/saved-scholarships/`, {
          method: 'POST',
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ scholarship: scholarshipId }),
        });
        if (res.ok) setIsSaved(true);
      }
    } catch (err) {
      console.error('Error saving scholarship:', err);
    } finally {
      setSaving(false);
    }
  };

  return { isAuthenticated, isSaved, saving, hasApplied, toggleSave };
};

export default function ScholarshipActions({ scholarshipId, title, applicationUrl, closed, variant }: Props) {
  const { isAuthenticated, isSaved, saving, hasApplied, toggleSave } = useScholarshipState(scholarshipId);
  const [shareNote, setShareNote] = useState<string | null>(null);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareNote('Link copied');
      setTimeout(() => setShareNote(null), 2000);
    } catch {
      /* user cancelled the share sheet */
    }
  };

  const applyButton = hasApplied ? (
    <span className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white">
      <CheckCircleIcon className="h-5 w-5" /> Applied
    </span>
  ) : (
    <a
      href={applicationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
    >
      <span className="lg:hidden">{closed ? 'Official site' : 'Apply now'}</span>
      <span className="hidden lg:inline">{closed ? 'Visit official site' : 'Apply on official site'}</span>
      <ArrowTopRightOnSquareIcon className="h-4 w-4" />
    </a>
  );

  const saveButton = (
    <button
      onClick={toggleSave}
      disabled={saving}
      aria-pressed={isSaved}
      className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-semibold transition-colors disabled:opacity-60 ${
        isSaved ? 'border-amber-300 bg-amber-50 text-amber-700' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
      }`}
    >
      {isSaved ? <BookmarkSolidIcon className="h-5 w-5" /> : <BookmarkIcon className="h-5 w-5" />}
      <span>{saving ? 'Saving…' : isSaved ? 'Saved' : 'Save'}</span>
    </button>
  );

  if (variant === 'mobile') {
    return (
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-3">
          <div className="flex-1">{applyButton}</div>
          {saveButton}
          <button
            onClick={handleShare}
            aria-label="Share"
            className="rounded-xl border border-gray-300 bg-white p-3 text-gray-700 hover:bg-gray-50"
          >
            <ShareIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-5 space-y-3">
        {applyButton}
        <div className="grid grid-cols-2 gap-3">
          {saveButton}
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 hover:bg-gray-50"
          >
            <ShareIcon className="h-5 w-5" /> {shareNote || 'Share'}
          </button>
        </div>
      </div>
      {!isAuthenticated && (
        <p className="mt-4 text-xs text-gray-500">
          <Link href={loginHref()} className="font-medium text-blue-600 hover:underline">
            Log in
          </Link>{' '}
          to save scholarships and track your applications.
        </p>
      )}
    </>
  );
}
