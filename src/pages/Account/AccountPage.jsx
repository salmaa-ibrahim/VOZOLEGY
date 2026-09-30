import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import './AccountPage.css';

const money = (value) => new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(Number(value || 0));
const date = (value) => value ? new Intl.DateTimeFormat('en-EG', { dateStyle: 'medium' }).format(new Date(value)) : '—';
const statusLabel = (value = 'pending') => String(value).replaceAll('_', ' ');

const sections = [
  ['overview', 'Overview', '◫'], ['orders', 'Orders', '▤'], ['transactions', 'Transactions', '↔'],
  ['addresses', 'Addresses', '⌖'], ['profile', 'Personal details', '◎'], ['security', 'Security', '◇'],
];
const adminSections = [['products', 'Products'], ['categories', 'Categories'], ['inventory', 'Inventory'], ['customers', 'Customers'], ['admin-orders', 'Manage orders'], ['admin-transactions', 'Payments']];

function Notice({ message, error }) { return message ? <div className={`ap-notice ${error ? 'is-error' : ''}`} role="status">{message}</div> : null; }
function Empty({ children }) { return <div className="ap-empty">{children}</div>; }

export default function AccountPage() {
  const { user, profile, signOut } = useAuth();
  const [section, setSection] = useState('overview');
  const [busy, setBusy] = useState(true);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [data, setData] = useState({ orders: [], transactions: [], addresses: [], products: [], categories: [], customers: [] });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [addressForm, setAddressForm] = useState({ label: '', recipient_name: '', phone: '', address_line: '', city: '', is_default: false });
  const [productForm, setProductForm] = useState({ name: '', flavor: '', price: '', stock_quantity: '', available: true });
  const isAdmin = ['admin', 'owner'].includes(String(profile?.role || '').toLowerCase());

  const refresh = useCallback(async () => {
    if (!user?.id) return;
    setBusy(true); setError('');
    const read = async (table, query) => {
      const result = await query;
      if (result.error) throw new Error(`${table}: ${result.error.message}`);
      return result.data || [];
    };
    try {
      const [orders, transactions, addresses, products, categories, customers] = await Promise.all([
        read('orders', supabase.from('orders').select('id, order_number, status, total_amount, created_at, currency, order_items(id, product_name, quantity, unit_price)').order('created_at', { ascending: false })),
        read('transactions', supabase.from('transactions').select('id, order_id, amount, currency, status, payment_method, created_at, reference').order('created_at', { ascending: false })),
        read('addresses', supabase.from('addresses').select('*').order('is_default', { ascending: false }).order('created_at', { ascending: false })),
        isAdmin ? read('products', supabase.from('products').select('id, name, flavor, price, stock_quantity, available, category_id').order('name')) : Promise.resolve([]),
        isAdmin ? read('categories', supabase.from('categories').select('id, name, slug').order('name')) : Promise.resolve([]),
        isAdmin ? read('profiles', supabase.from('profiles').select('id, full_name, email, phone, created_at, role').order('created_at', { ascending: false }).limit(100)) : Promise.resolve([]),
      ]);
      setData({ orders, transactions, addresses, products, categories, customers });
    } catch (e) { setError(e.message || 'Could not load account information.'); }
    finally { setBusy(false); }
  }, [user?.id, isAdmin]);

  useEffect(() => { refresh(); }, [refresh]);
  useEffect(() => { if (!notice) return; const timer = setTimeout(() => setNotice(''), 3500); return () => clearTimeout(timer); }, [notice]);

  const totalSpend = useMemo(() => data.orders.filter(o => ['paid', 'completed', 'delivered'].includes(o.status)).reduce((n, o) => n + Number(o.total_amount || 0), 0), [data.orders]);
  const update = async (operation, successText) => {
    setWorking(true); setError(''); setNotice('');
    try { const result = await operation(); if (result?.error) throw result.error; setNotice(successText); await refresh(); }
    catch (e) { setError(e.message || 'That change could not be saved.'); }
    finally { setWorking(false); }
  };
  const saveAddress = (e) => { e.preventDefault(); update(() => supabase.from('addresses').insert({ ...addressForm, user_id: user.id }), 'Address saved.').then(() => setAddressForm({ label: '', recipient_name: '', phone: '', address_line: '', city: '', is_default: false })); };
  const saveProduct = (e) => { e.preventDefault(); update(() => supabase.from('products').insert({ ...productForm, price: Number(productForm.price), stock_quantity: Number(productForm.stock_quantity) }), 'Product added.').then(() => setProductForm({ name: '', flavor: '', price: '', stock_quantity: '', available: true })); };
  const toggleAvailability = (product) => update(() => supabase.from('products').update({ available: !product.available }).eq('id', product.id), 'Availability updated.');
  const updateOrder = (order, status) => update(() => supabase.from('orders').update({ status }).eq('id', order.id), 'Order status updated.');

  if (!user) return <main className="ap-page"><div className="ap-login"><span className="ap-eyebrow">VOZOL EGY · ACCOUNT</span><h1>Your account,<br />all in one place.</h1><p>Sign in to see your orders, personal details and account activity.</p><Link className="ap-button ap-button-primary" to="/login">Sign in</Link></div></main>;

  const title = [...sections, ...adminSections].find(([key]) => key === section)?.[1] || 'Overview';
  return <main className="ap-page"><div className="ap-shell">
    <header className="ap-header"><div><span className="ap-eyebrow">VOZOL EGY · YOUR SPACE</span><h1>My account</h1><p>Good to see you, {profile?.full_name?.split(' ')[0] || 'there'}.</p></div><button className="ap-button ap-button-quiet" onClick={signOut}>Sign out <span aria-hidden="true">↗</span></button></header>
    <Notice message={error || notice} error={!!error} />
    <div className="ap-layout"><aside className="ap-sidebar"><div className="ap-user"><div className="ap-avatar">{(profile?.full_name || user.email || 'V').slice(0, 1).toUpperCase()}</div><div className="ap-user-copy"><strong>{profile?.full_name || 'VOZOL customer'}</strong><span>{user.email}</span></div></div>
      <nav aria-label="Account sections"><span className="ap-nav-label">ACCOUNT</span>{sections.map(([key, label, icon]) => <button key={key} className={`ap-nav-item ${section === key ? 'active' : ''}`} onClick={() => { setSection(key); setSelectedOrder(null); }}><span className="ap-nav-icon">{icon}</span>{label}{key === 'orders' && data.orders.length > 0 && <small>{data.orders.length}</small>}</button>)}
      {isAdmin && <><span className="ap-nav-label ap-admin-label">STORE MANAGEMENT</span>{adminSections.map(([key, label]) => <button key={key} className={`ap-nav-item ${section === key ? 'active' : ''}`} onClick={() => setSection(key)}><span className="ap-nav-icon">⌘</span>{label}</button>)}</>}
      </nav><div className="ap-sidebar-foot"><span className="ap-status-dot" />{isAdmin ? 'Administrator access' : 'Customer account'}<small>VOZOL EGY</small></div></aside>
      <section className="ap-content" aria-live="polite"><div className="ap-section-heading"><div><span className="ap-eyebrow">{isAdmin && adminSections.some(([k]) => k === section) ? 'ADMIN WORKSPACE' : 'ACCOUNT'}</span><h2>{title}</h2></div>{busy && <span className="ap-loading">Updating…</span>}</div>
        {section === 'overview' && <><div className="ap-welcome"><div><span className="ap-eyebrow">YOUR VOZOL EGY ACCOUNT</span><h3>A smoother way to<br />keep everything close.</h3><p>Track your latest orders and manage your account details here.</p><button className="ap-button ap-button-light" onClick={() => setSection('orders')}>View orders <span>→</span></button></div><div className="ap-welcome-orb" aria-hidden="true">V</div></div><div className="ap-stat-grid"><article className="ap-stat"><span>Total orders</span><strong>{data.orders.length}</strong><small>Across your account</small></article><article className="ap-stat"><span>Completed spend</span><strong>{money(totalSpend)}</strong><small>Paid and fulfilled orders</small></article><article className="ap-stat"><span>Saved addresses</span><strong>{data.addresses.length}</strong><small>Ready for checkout</small></article></div><div className="ap-card"><div className="ap-card-head"><div><span className="ap-eyebrow">RECENT ACTIVITY</span><h3>Latest orders</h3></div><button className="ap-text-button" onClick={() => setSection('orders')}>All orders →</button></div>{data.orders.slice(0, 3).map(o => <OrderRow key={o.id} order={o} onClick={() => { setSelectedOrder(o); setSection('orders'); }} />)}{!busy && !data.orders.length && <Empty>Your orders will appear here when you place one.</Empty>}</div></>}
        {section === 'orders' && <div className="ap-card">{selectedOrder ? <><button className="ap-back" onClick={() => setSelectedOrder(null)}>← All orders</button><h3>Order #{selectedOrder.order_number || String(selectedOrder.id).slice(0, 8)}</h3><p className="ap-muted">Placed {date(selectedOrder.created_at)} · <span className="ap-pill">{statusLabel(selectedOrder.status)}</span></p><div className="ap-table-wrap"><table><thead><tr><th>Item</th><th>Qty</th><th>Unit price</th></tr></thead><tbody>{(selectedOrder.order_items || []).map(item => <tr key={item.id}><td>{item.product_name}</td><td>{item.quantity}</td><td>{money(item.unit_price)}</td></tr>)}</tbody></table></div><div className="ap-order-total"><span>Order total</span><strong>{money(selectedOrder.total_amount)}</strong></div></> : <><div className="ap-card-head"><div><span className="ap-eyebrow">ORDER HISTORY</span><h3>Your orders</h3></div></div>{data.orders.map(o => <OrderRow key={o.id} order={o} onClick={() => setSelectedOrder(o)} />)}{!busy && !data.orders.length && <Empty>No orders yet. Your next favorite is waiting.</Empty>}</>}</div>}
        {section === 'transactions' && <div className="ap-card"><div className="ap-card-head"><div><span className="ap-eyebrow">PAYMENT HISTORY</span><h3>Transactions</h3></div></div><div className="ap-table-wrap"><table><thead><tr><th>Reference</th><th>Date</th><th>Method</th><th>Status</th><th>Amount</th></tr></thead><tbody>{data.transactions.map(t => <tr key={t.id}><td>{t.reference || `#${String(t.id).slice(0, 8)}`}</td><td>{date(t.created_at)}</td><td>{t.payment_method || '—'}</td><td><span className="ap-pill">{statusLabel(t.status)}</span></td><td>{money(t.amount)}</td></tr>)}</tbody></table></div>{!busy && !data.transactions.length && <Empty>Completed and pending payment records will appear here.</Empty>}</div>}
        {section === 'addresses' && <div className="ap-card"><div className="ap-card-head"><div><span className="ap-eyebrow">DELIVERY DETAILS</span><h3>Saved addresses</h3></div></div><div className="ap-address-grid">{data.addresses.map(a => <article className="ap-address" key={a.id}><span className="ap-address-icon">⌖</span><div><strong>{a.label || 'Address'} {a.is_default && <em>DEFAULT</em>}</strong><p>{a.recipient_name}<br />{a.address_line}<br />{a.city} · {a.phone}</p></div><button className="ap-delete" disabled={working} onClick={() => update(() => supabase.from('addresses').delete().eq('id', a.id), 'Address removed.')}>Remove</button></article>)}</div><form className="ap-form" onSubmit={saveAddress}><h4>Add an address</h4><div className="ap-form-grid">{[['label','Label (Home, Work…)'],['recipient_name','Recipient name'],['phone','Phone'],['city','City']].map(([key,label]) => <label key={key}>{label}<input required value={addressForm[key]} onChange={e => setAddressForm({ ...addressForm, [key]: e.target.value })} /></label>)}<label className="ap-span-2">Address details<input required value={addressForm.address_line} onChange={e => setAddressForm({ ...addressForm, address_line: e.target.value })} /></label></div><label className="ap-check"><input type="checkbox" checked={addressForm.is_default} onChange={e => setAddressForm({ ...addressForm, is_default: e.target.checked })} /> Make this my default address</label><button className="ap-button ap-button-primary" disabled={working}>Save address</button></form></div>}
        {section === 'profile' && <div className="ap-card"><div className="ap-card-head"><div><span className="ap-eyebrow">PERSONAL INFORMATION</span><h3>Your details</h3></div></div><div className="ap-profile-grid"><ProfileField label="Full name" value={profile?.full_name} /><ProfileField label="Email address" value={user.email} /><ProfileField label="Phone" value={profile?.phone} /><ProfileField label="Member since" value={date(user.created_at)} /></div><p className="ap-hint">To change your name or phone number, use the secure profile editor in your account settings.</p><Link className="ap-button ap-button-outline" to="/account/settings">Edit personal details</Link></div>}
        {section === 'security' && <div className="ap-card"><div className="ap-card-head"><div><span className="ap-eyebrow">ACCOUNT SECURITY</span><h3>Keep your account secure</h3></div></div><div className="ap-security-row"><span className="ap-security-icon">✳</span><div><strong>Password</strong><p>Change your password using a secure email link.</p></div><button className="ap-button ap-button-outline" onClick={() => update(() => supabase.auth.resetPasswordForEmail(user.email, { redirectTo: `${window.location.origin}/reset-password` }), 'Password reset link sent to your email.')}>Send reset link</button></div><div className="ap-security-row"><span className="ap-security-icon">↗</span><div><strong>Sign out</strong><p>End this session on the current device.</p></div><button className="ap-button ap-button-danger" onClick={signOut}>Sign out</button></div></div>}
        {section === 'products' && isAdmin && <><div className="ap-card"><div className="ap-card-head"><div><span className="ap-eyebrow">CATALOG</span><h3>Products</h3></div><span className="ap-pill">{data.products.length} items</span></div><div className="ap-table-wrap"><table><thead><tr><th>Product</th><th>Flavor</th><th>Price</th><th>Stock</th><th>Availability</th></tr></thead><tbody>{data.products.map(p => <tr key={p.id}><td><strong>{p.name}</strong></td><td>{p.flavor || '—'}</td><td>{money(p.price)}</td><td>{p.stock_quantity ?? 0}</td><td><button className={`ap-switch ${p.available ? 'on' : ''}`} onClick={() => toggleAvailability(p)} disabled={working}>{p.available ? 'Available' : 'Hidden'}</button></td></tr>)}</tbody></table></div></div><div className="ap-card ap-form"><h4>Add product</h4><form onSubmit={saveProduct}><div className="ap-form-grid"><label>Name<input required value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} /></label><label>Flavor<input value={productForm.flavor} onChange={e => setProductForm({ ...productForm, flavor: e.target.value })} /></label><label>Price (EGP)<input type="number" min="0" step="0.01" required value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} /></label><label>Stock quantity<input type="number" min="0" required value={productForm.stock_quantity} onChange={e => setProductForm({ ...productForm, stock_quantity: e.target.value })} /></label></div><button className="ap-button ap-button-primary" disabled={working}>Add product</button></form></div></>}
        {section === 'categories' && isAdmin && <div className="ap-card"><div className="ap-card-head"><div><span className="ap-eyebrow">CATALOG STRUCTURE</span><h3>Categories</h3></div></div>{data.categories.map(c => <div className="ap-list-row" key={c.id}><strong>{c.name}</strong><span>{c.slug}</span></div>)}{!data.categories.length && <Empty>No categories found.</Empty>}<p className="ap-hint">Create and edit categories in the store catalog manager. Keep category writes restricted to administrators.</p></div>}
        {section === 'inventory' && isAdmin && <div className="ap-card"><div className="ap-card-head"><div><span className="ap-eyebrow">STOCK CONTROL</span><h3>Inventory</h3></div><span className="ap-pill">{data.products.filter(p => Number(p.stock_quantity) <= 5).length} low stock</span></div><div className="ap-table-wrap"><table><thead><tr><th>Product</th><th>Flavor</th><th>On hand</th><th>Availability</th></tr></thead><tbody>{data.products.map(p => <tr key={p.id}><td>{p.name}</td><td>{p.flavor || '—'}</td><td><span className={Number(p.stock_quantity) <= 5 ? 'ap-stock-low' : ''}>{p.stock_quantity ?? 0}</span></td><td><span className="ap-pill">{p.available ? 'Available' : 'Hidden'}</span></td></tr>)}</tbody></table></div></div>}
        {section === 'customers' && isAdmin && <div className="ap-card"><div className="ap-card-head"><div><span className="ap-eyebrow">CUSTOMER DIRECTORY</span><h3>Customers</h3></div><span className="ap-pill">Latest 100</span></div><div className="ap-table-wrap"><table><thead><tr><th>Customer</th><th>Email</th><th>Phone</th><th>Joined</th><th>Role</th></tr></thead><tbody>{data.customers.map(c => <tr key={c.id}><td>{c.full_name || '—'}</td><td>{c.email || '—'}</td><td>{c.phone || '—'}</td><td>{date(c.created_at)}</td><td>{c.role || 'customer'}</td></tr>)}</tbody></table></div></div>}
        {section === 'admin-orders' && isAdmin && <div className="ap-card"><div className="ap-card-head"><div><span className="ap-eyebrow">FULFILMENT</span><h3>Manage orders</h3></div></div><div className="ap-table-wrap"><table><thead><tr><th>Order</th><th>Placed</th><th>Amount</th><th>Status</th><th>Update</th></tr></thead><tbody>{data.orders.map(o => <tr key={o.id}><td>#{o.order_number || String(o.id).slice(0, 8)}</td><td>{date(o.created_at)}</td><td>{money(o.total_amount)}</td><td><span className="ap-pill">{statusLabel(o.status)}</span></td><td><select aria-label={`Update order ${o.order_number || o.id}`} value={o.status} disabled={working} onChange={e => updateOrder(o, e.target.value)}>{['pending','confirmed','processing','shipped','delivered','completed','cancelled','refunded'].map(s => <option key={s} value={s}>{statusLabel(s)}</option>)}</select></td></tr>)}</tbody></table></div></div>}
        {section === 'admin-transactions' && isAdmin && <div className="ap-card"><div className="ap-card-head"><div><span className="ap-eyebrow">PAYMENT OPERATIONS</span><h3>Transactions</h3></div></div><div className="ap-table-wrap"><table><thead><tr><th>Reference</th><th>Order</th><th>Date</th><th>Method</th><th>Status</th><th>Amount</th></tr></thead><tbody>{data.transactions.map(t => <tr key={t.id}><td>{t.reference || `#${String(t.id).slice(0,8)}`}</td><td>{String(t.order_id || '—').slice(0,8)}</td><td>{date(t.created_at)}</td><td>{t.payment_method || '—'}</td><td><span className="ap-pill">{statusLabel(t.status)}</span></td><td>{money(t.amount)}</td></tr>)}</tbody></table></div><p className="ap-hint">Payment status should be confirmed by a trusted payment provider webhook; do not let browser clients mark transactions as paid.</p></div>}
        {isAdmin && !adminSections.some(([k]) => k === section) && null}
      </section>
    </div>
  </div></main>;
}

function OrderRow({ order, onClick }) { return <button className="ap-order-row" onClick={onClick}><span className="ap-order-mark">↗</span><span className="ap-order-main"><strong>Order #{order.order_number || String(order.id).slice(0,8)}</strong><small>{date(order.created_at)} · {(order.order_items || []).length} items</small></span><span className="ap-pill">{statusLabel(order.status)}</span><strong className="ap-order-amount">{money(order.total_amount)}</strong><span className="ap-chevron">→</span></button>; }
function ProfileField({ label, value }) { return <div className="ap-profile-field"><span>{label}</span><strong>{value || 'Not added'}</strong></div>; }

