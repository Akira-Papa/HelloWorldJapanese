'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  IconButton,
  Grid,
  AppBar,
  Toolbar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
    <Box>
      <AppBar position="static" elevation={0} sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            日本語メモ帳
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Box component="form" onSubmit={createMemo} sx={{ mb: 4 }}>
          <TextField
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={3}
            fullWidth
            placeholder="新しいメモを入力してください..."
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            保存
          </Button>
        </Box>

        <Grid container spacing={2}>
          {memos.map((memo) => (
            <Grid item xs={12} key={memo._id}>
              <Paper sx={{ p: 2 }}>
                {editingMemo === memo._id ? (
                  <Box>
                    <TextField
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      multiline
                      rows={3}
                      fullWidth
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <Button
                        onClick={() => updateMemo(memo._id)}
                        variant="contained"
                        color="success"
                      >
                        更新
                      </Button>
                      <Button
                        onClick={() => setEditingMemo(null)}
                        variant="contained"
                        color="inherit"
                      >
                        キャンセル
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Typography sx={{ mb: 2, whiteSpace: 'pre-wrap' }}>
                      {memo.content}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(memo.createdAt).toLocaleString('ja-JP')}
                      </Typography>
                      <Box>
                        <IconButton
                          onClick={() => {
                            setEditingMemo(memo._id);
                            setEditContent(memo.content);
                          }}
                          color="primary"
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteMemo(memo._id)}
                          color="error"
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
