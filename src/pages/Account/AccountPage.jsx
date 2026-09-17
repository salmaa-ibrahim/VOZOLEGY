import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import './AccountPage.css';

const AccountPage = () => {
  const { user, profile, signOut } = useAuth();

  if (!user) return <div className="loader">Redirecting...</div>;

  return (
    <div className="account-page">
      <h1>My Account</h1>
      <div className="account-info">
        <p><strong>Name:</strong> {profile?.full_name || 'Customer'}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div className="account-actions">
        <Link to="/account/orders" className="btn-secondary">My Orders</Link>
        <button onClick={signOut} className="btn-logout">Logout</button>
      </div>
    </div>
  );
};

export default AccountPage;