import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '80px 16px' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '16px' }}>404</h1>
      <h2 style={{ marginBottom: '24px' }}>Page Not Found</h2>
      <p style={{ marginBottom: '32px', color: '#666' }}>The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" style={{ padding: '12px 32px', background: '#000', color: '#fff', borderRadius: '50px', fontWeight: 600 }}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;