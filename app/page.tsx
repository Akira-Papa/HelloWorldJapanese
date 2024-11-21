'use client';

import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Memo {
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [content, setContent] = useState('');
  const [editingMemo, setEditingMemo] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    fetchMemos();
  }, []);

  const fetchMemos = async () => {
    try {
      const response = await fetch('/api/memos');
      const data = await response.json();
      setMemos(data);
    } catch (error) {
      console.error('Failed to fetch memos:', error);
    }
  };

  const createMemo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/memos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      if (response.ok) {
        setContent('');
        fetchMemos();
      }
    } catch (error) {
      console.error('Failed to create memo:', error);
    }
  };

  const updateMemo = async (id: string) => {
    try {
      const response = await fetch(`/api/memos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editContent }),
      });
      if (response.ok) {
        setEditingMemo(null);
        fetchMemos();
      }
    } catch (error) {
      console.error('Failed to update memo:', error);
    }
  };

  const deleteMemo = async (id: string) => {
    try {
      const response = await fetch(`/api/memos/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchMemos();
      }
    } catch (error) {
      console.error('Failed to delete memo:', error);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">日本語メモ帳</h1>
        
        <form onSubmit={createMemo} className="mb-8">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="memo-input w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            placeholder="新しいメモを入力してください..."
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            保存
          </button>
        </form>

        <div className="space-y-4">
          {memos.map((memo) => (
            <div key={memo._id} className="bg-white p-4 rounded-lg shadow">
              {editingMemo === memo._id ? (
                <div>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="memo-input w-full p-2 border rounded mb-2"
                    rows={3}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => updateMemo(memo._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      更新
                    </button>
                    <button
                      onClick={() => setEditingMemo(null)}
                      className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="memo-input text-lg mb-2 whitespace-pre-wrap">{memo.content}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{new Date(memo.createdAt).toLocaleString('ja-JP')}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingMemo(memo._id);
                          setEditContent(memo.content);
                        }}
                        className="p-1 hover:text-blue-600"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteMemo(memo._id)}
                        className="p-1 hover:text-red-600"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
