'use client';

import React from 'react';

export default function Home() {
  return (
    <main 
      style={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: 'inherit'
      }}
    >
      <h1 
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          margin: 0
        }}
      >
        こんにちは
      </h1>
    </main>
  );
}
