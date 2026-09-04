import React, { createContext, useContext, useEffect, useState } from 'react';
import { ContactSubmission } from '../types';

interface OfflineSyncContextType {
  isOnline: boolean;
  submissions: ContactSubmission[];
  pendingCount: number;
  lastSyncedAt: Date | null;
  addSubmission: (
    data: Omit<ContactSubmission, 'id' | 'createdAt' | 'synced'>
  ) => Promise<{ success: boolean; queued: boolean; submission: ContactSubmission }>;
  syncPendingSubmissions: () => Promise<void>;
  bookmarkedBlogs: string[];
  toggleBookmarkBlog: (id: string) => void;
  isBlogBookmarked: (id: string) => boolean;
  clearAllLocalData: () => void;
  exportLocalData: () => string;
}

const OfflineSyncContext = createContext<OfflineSyncContextType | undefined>(undefined);

export function OfflineSyncProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });

  const [submissions, setSubmissions] = useState<ContactSubmission[]>(() => {
    try {
      const stored = localStorage.getItem('yonas_contact_submissions');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [bookmarkedBlogs, setBookmarkedBlogs] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('yonas_bookmarked_blogs');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(() => new Date());

  // Listen to network status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Automatically attempt to sync any pending submissions
      triggerSync();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const triggerSync = async () => {
    setSubmissions((prev) => {
      const updated = prev.map((s) => ({ ...s, synced: true }));
      localStorage.setItem('yonas_contact_submissions', JSON.stringify(updated));
      return updated;
    });
    setLastSyncedAt(new Date());
  };

  const addSubmission = async (
    data: Omit<ContactSubmission, 'id' | 'createdAt' | 'synced'>
  ): Promise<{ success: boolean; queued: boolean; submission: ContactSubmission }> => {
    const isCurrentlyOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    const newSubmission: ContactSubmission = {
      ...data,
      id: 'sub-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
      synced: isCurrentlyOnline,
    };

    const updated = [newSubmission, ...submissions];
    setSubmissions(updated);
    try {
      localStorage.setItem('yonas_contact_submissions', JSON.stringify(updated));
    } catch (e) {
      console.warn('Unable to persist to localStorage', e);
    }

    if (isCurrentlyOnline) {
      setLastSyncedAt(new Date());
      return { success: true, queued: false, submission: newSubmission };
    } else {
      return { success: true, queued: true, submission: newSubmission };
    }
  };

  const syncPendingSubmissions = async () => {
    await triggerSync();
  };

  const toggleBookmarkBlog = (id: string) => {
    setBookmarkedBlogs((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((b) => b !== id) : [...prev, id];
      localStorage.setItem('yonas_bookmarked_blogs', JSON.stringify(updated));
      return updated;
    });
  };

  const isBlogBookmarked = (id: string) => bookmarkedBlogs.includes(id);

  const clearAllLocalData = () => {
    localStorage.removeItem('yonas_contact_submissions');
    localStorage.removeItem('yonas_bookmarked_blogs');
    setSubmissions([]);
    setBookmarkedBlogs([]);
  };

  const exportLocalData = () => {
    const exportObject = {
      appName: 'yonas portfolio',
      exportTimestamp: new Date().toISOString(),
      contactInquiries: submissions,
      bookmarkedBlogIds: bookmarkedBlogs,
      settings: {
        theme: localStorage.getItem('yonas_portfolio_theme'),
        offlineModeSupport: true,
      },
    };
    return JSON.stringify(exportObject, null, 2);
  };

  const pendingCount = submissions.filter((s) => !s.synced).length;

  return (
    <OfflineSyncContext.Provider
      value={{
        isOnline,
        submissions,
        pendingCount,
        lastSyncedAt,
        addSubmission,
        syncPendingSubmissions,
        bookmarkedBlogs,
        toggleBookmarkBlog,
        isBlogBookmarked,
        clearAllLocalData,
        exportLocalData,
      }}
    >
      {children}
    </OfflineSyncContext.Provider>
  );
}

export function useOfflineSync() {
  const context = useContext(OfflineSyncContext);
  if (!context) {
    throw new Error('useOfflineSync must be used within an OfflineSyncProvider');
  }
  return context;
}
