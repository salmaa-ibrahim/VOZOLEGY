// import React, { useEffect, useMemo, useState } from "react";

// import { useAuth } from "../../contexts/AuthContext";
// import { supabase } from "../../lib/supabase";

// import "./AdminDashboard.css";

// const money = (value) =>
//   new Intl.NumberFormat("en-EG", {
//     style: "currency",
//     currency: "EGP",
//     maximumFractionDigits: 0,
//   }).format(Number(value || 0));

// const date = (value) =>
//   value
//     ? new Intl.DateTimeFormat("en-EG", {
//         dateStyle: "medium",
//         timeStyle: "short",
//       }).format(new Date(value))
//     : "—";

// const statusLabel = (value) =>
//   String(value || "pending")
//     .replaceAll("_", " ")
//     .replace(/\b\w/g, (letter) => letter.toUpperCase());

// const salesStatuses = ["confirmed", "delivered", "completed"];

// const orderStatuses = [
//   "pending",
//   "confirmed",
//   "processing",
//   "shipped",
//   "delivered",
//   "completed",
//   "rejected",
//   "cancelled",
// ];

// const slugify = (value) =>
//   String(value || "")
//     .trim()
//     .toLowerCase()
//     .replace(/[^a-z0-9\u0600-\u06ff]+/g, "-")
//     .replace(/^-+|-+$/g, "");

// const AdminDashboardPage = () => {
//   const { profile, signOut } = useAuth();

//   const [section, setSection] = useState("overview");

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const [orders, setOrders] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);

//   /* =====================================
//      PRODUCT FORM
//   ===================================== */

//   const [productForm, setProductForm] = useState({
//     id: null,
//     name: "",
//     flavor: "",
//     price: "",
//     mode: "MTL",
//     available: true,
//     category_id: "",
//     image_url: "",
//     stock_quantity: 0,
//   });

//   const [productImageFile, setProductImageFile] = useState(null);
//   const [productImagePreview, setProductImagePreview] = useState("");

//   /* =====================================
//      CATEGORY FORM
//   ===================================== */

//   const [categoryForm, setCategoryForm] = useState({
//     id: null,
//     name: "",
//     slug: "",
//     description: "",
//     image_url: "",
//     mobile_image_url: "",
//     alt_text: "",
//     promo_label: "",
//     display_order: 0,
//     featured_on_home: false,
//     active: true,
//     seo_title: "",
//     seo_description: "",
//     battery: "",
//     capacity: "",
//     nicotine_strength: "",
//     puff_counts: "",
//     charging: "",
//     special_feature: "",
//     banner_image: "",
//   });

//   const [categoryImageFile, setCategoryImageFile] = useState(null);
//   const [categoryImagePreview, setCategoryImagePreview] = useState("");

//   const [categoryMobileImageFile, setCategoryMobileImageFile] = useState(null);
//   const [categoryMobileImagePreview, setCategoryMobileImagePreview] =
//     useState("");

//   const [categoryBannerImageFile, setCategoryBannerImageFile] = useState(null);
//   const [categoryBannerImagePreview, setCategoryBannerImagePreview] =
//     useState("");

//   /* ================================
//    LOAD ADMIN DATA
// ================================ */

//   const loadData = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const [ordersResult, customersResult, productsResult, categoriesResult] =
//         await Promise.all([
//           /* ================================
//          ORDERS
//       ================================= */

//           supabase
//             .from("orders")
//             .select(
//               `
//           id,
//           user_id,
//           customer_name,
//           customer_email,
//           customer_phone,
//           customer_whatsapp,
//           order_number,
//           order_status,
//           payment_method,
//           payment_status,
//           delivery_method,
//           shipping_cost,
//           governorate,
//           city,
//           street,
//           building_number,
//           apartment_number,
//           address_details,
//           subtotal,
//           total_amount,
//           currency,
//           customer_notes,
//           admin_notes,
//           created_at,
//           updated_at,
//           confirmed_at,
//           shipped_at,
//           delivered_at,
//           cancelled_at,
//           notes,

//           order_items (
//             id,
//             product_id,
//             product_name,
//             flavor,
//             quantity,
//             unit_price,
//             created_at
//           )
//         `,
//             )
//             .order("created_at", {
//               ascending: false,
//             }),

//           /* ================================
//          CUSTOMERS
//       ================================= */

//           supabase
//             .from("profiles")
//             .select(
//               `
//           id,
//           email,
//           full_name,
//           phone,
//           role,
//           created_at
//         `,
//             )
//             .order("created_at", {
//               ascending: false,
//             }),

//           /* ================================
//          PRODUCTS
//       ================================= */

//           supabase
//             .from("products")
//             .select(
//               `
//           id,
//           name,
//           flavor,
//           price,
//           mode,
//           available,
//           category_id,
//           image_url,
//           stock_quantity
//         `,
//             )
//             .order("name"),

//           /* ================================
//          CATEGORIES
//       ================================= */

//           supabase
//             .from("categories")
//             .select(
//               `
//           id,
//           name,
//           slug,
//           description,
//           image_url,
//           mobile_image_url,
//           alt_text,
//           promo_label,
//           display_order,
//           featured_on_home,
//           active,
//           seo_title,
//           seo_description,
//           battery,
//           capacity,
//           nicotine_strength,
//           puff_counts,
//           charging,
//           special_feature,
//           banner_image
//         `,
//             )
//             .order("display_order"),
//         ]);

//       if (ordersResult.error) {
//         throw ordersResult.error;
//       }

//       if (customersResult.error) {
//         throw customersResult.error;
//       }

//       if (productsResult.error) {
//         throw productsResult.error;
//       }

//       if (categoriesResult.error) {
//         throw categoriesResult.error;
//       }

//       setOrders(ordersResult.data || []);
//       setCustomers(customersResult.data || []);
//       setProducts(productsResult.data || []);
//       setCategories(categoriesResult.data || []);
//     } catch (error) {
//       console.error("ADMIN LOAD ERROR:", error);

//       setError(error?.message || "Unable to load admin data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   /* =====================================
//    IMAGE UPLOAD
// ===================================== */

//   const uploadImage = async (file, bucket, folder) => {
//     if (!file) return null;

//     if (!file.type.startsWith("image/")) {
//       throw new Error("Please select a valid image file.");
//     }

//     const maxSize = 10 * 1024 * 1024;

//     if (file.size > maxSize) {
//       throw new Error("Image size must be less than 10MB.");
//     }

//     const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";

//     const safeName =
//       file.name
//         .replace(/\.[^/.]+$/, "")
//         .toLowerCase()
//         .replace(/[^a-z0-9-_]+/g, "-")
//         .replace(/^-+|-+$/g, "") || "image";

//     const fileName = `${safeName}-${Date.now()}.${extension}`;

//     const filePath = `${folder}/${fileName}`;

//     const { error: uploadError } = await supabase.storage
//       .from(bucket)
//       .upload(filePath, file, {
//         cacheControl: "3600",
//         upsert: false,
//         contentType: file.type,
//       });

//     if (uploadError) {
//       throw uploadError;
//     }

//     const {
//       data: { publicUrl },
//     } = supabase.storage.from(bucket).getPublicUrl(filePath);

//     return publicUrl;
//   };

//   /* =====================================
//    STATS
// ===================================== */

//   const stats = useMemo(() => {
//     const pending = orders.filter(
//       (order) => String(order.order_status).toLowerCase() === "pending",
//     ).length;

//     const rejected = orders.filter((order) =>
//       ["rejected", "cancelled"].includes(
//         String(order.order_status).toLowerCase(),
//       ),
//     ).length;

//     const delivered = orders.filter((order) =>
//       ["confirmed", "delivered", "completed"].includes(
//         String(order.order_status).toLowerCase(),
//       ),
//     ).length;

//     const sales = orders
//       .filter((order) =>
//         salesStatuses.includes(String(order.order_status).toLowerCase()),
//       )
//       .reduce((total, order) => total + Number(order.total_amount || 0), 0);

//     return {
//       totalOrders: orders.length,
//       pending,
//       rejected,
//       delivered,
//       sales,
//     };
//   }, [orders]);

//   /* =====================================
//    CUSTOMER MAP
// ===================================== */

//   const customerMap = useMemo(() => {
//     return customers.reduce((map, customer) => {
//       map[customer.id] = customer;
//       return map;
//     }, {});
//   }, [customers]);

//   /* =====================================
//    ORDER CUSTOMER HELPER
// ===================================== */

//   const getOrderCustomer = (order) => {
//     const profileCustomer = order.user_id ? customerMap[order.user_id] : null;

//     return {
//       name: order.customer_name || profileCustomer?.full_name || "Guest",

//       email: order.customer_email || profileCustomer?.email || "",

//       phone: order.customer_phone || profileCustomer?.phone || "",

//       whatsapp: order.customer_whatsapp || "",

//       governorate: order.governorate || "",

//       city: order.city || "",

//       address: [
//         order.street,
//         order.building_number ? `Building ${order.building_number}` : "",
//         order.apartment_number ? `Apartment ${order.apartment_number}` : "",
//         order.address_details,
//       ]
//         .filter(Boolean)
//         .join(", "),
//     };
//   };

//   /* =====================================
//    GET PRODUCT CATEGORY
// ===================================== */

//   const getProductCategory = (productId) => {
//     if (!productId) {
//       return "—";
//     }

//     const product = products.find(
//       (item) => String(item.id) === String(productId),
//     );

//     if (!product) {
//       return "—";
//     }

//     const category = categories.find(
//       (item) => String(item.id) === String(product.category_id),
//     );

//     return category?.name || "—";
//   };

//   /* =====================================
//    RESET PRODUCT FORM
// ===================================== */

//   const resetProductForm = () => {
//     setProductForm({
//       id: null,
//       name: "",
//       flavor: "",
//       price: "",
//       mode: "MTL",
//       available: true,
//       category_id: "",
//       image_url: "",
//       stock_quantity: 0,
//     });

//     setProductImageFile(null);
//     setProductImagePreview("");
//   };

//   /* =====================================
//    RESET CATEGORY FORM
// ===================================== */

//   const resetCategoryForm = () => {
//     setCategoryForm({
//       id: null,
//       name: "",
//       slug: "",
//       description: "",
//       image_url: "",
//       mobile_image_url: "",
//       alt_text: "",
//       promo_label: "",
//       display_order: 0,
//       featured_on_home: false,
//       active: true,
//       seo_title: "",
//       seo_description: "",
//       battery: "",
//       capacity: "",
//       nicotine_strength: "",
//       puff_counts: "",
//       charging: "",
//       special_feature: "",
//       banner_image: "",
//     });

//     setCategoryImageFile(null);
//     setCategoryImagePreview("");

//     setCategoryMobileImageFile(null);
//     setCategoryMobileImagePreview("");

//     setCategoryBannerImageFile(null);
//     setCategoryBannerImagePreview("");
//   };

//   /* =====================================
//    PRODUCT IMAGE SELECT
// ===================================== */

//   const handleProductImageChange = (event) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       setError("Please select a valid image file.");
//       return;
//     }

//     if (file.size > 10 * 1024 * 1024) {
//       setError("Image size must be less than 10MB.");
//       return;
//     }

//     setError("");

//     setProductImageFile(file);

//     const previewUrl = URL.createObjectURL(file);

//     setProductImagePreview(previewUrl);
//   };

//   /* =====================================
//    CATEGORY MAIN IMAGE SELECT
// ===================================== */

//   const handleCategoryImageChange = (event) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       setError("Please select a valid image file.");
//       return;
//     }

//     if (file.size > 10 * 1024 * 1024) {
//       setError("Image size must be less than 10MB.");
//       return;
//     }

//     setError("");

//     setCategoryImageFile(file);

//     const previewUrl = URL.createObjectURL(file);

//     setCategoryImagePreview(previewUrl);
//   };

//   /* =====================================
//    CATEGORY MOBILE IMAGE SELECT
// ===================================== */

//   const handleCategoryMobileImageChange = (event) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       setError("Please select a valid image file.");
//       return;
//     }

//     if (file.size > 10 * 1024 * 1024) {
//       setError("Image size must be less than 10MB.");
//       return;
//     }

//     setError("");

//     setCategoryMobileImageFile(file);

//     const previewUrl = URL.createObjectURL(file);

//     setCategoryMobileImagePreview(previewUrl);
//   };

//   /* =====================================
//    CATEGORY BANNER IMAGE SELECT
// ===================================== */

//   const handleCategoryBannerImageChange = (event) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       setError("Please select a valid image file.");
//       return;
//     }

//     if (file.size > 10 * 1024 * 1024) {
//       setError("Image size must be less than 10MB.");
//       return;
//     }

//     setError("");

//     setCategoryBannerImageFile(file);

//     const previewUrl = URL.createObjectURL(file);

//     setCategoryBannerImagePreview(previewUrl);
//   };

//   /* =====================================
//    SAVE PRODUCT
// ===================================== */

//   const saveProduct = async (event) => {
//     event.preventDefault();

//     setSaving(true);
//     setError("");
//     setSuccess("");

//     try {
//       let imageUrl = productForm.image_url || null;

//       if (productImageFile) {
//         imageUrl = await uploadImage(
//           productImageFile,
//           "product-images",
//           "products",
//         );
//       }

//       const payload = {
//         name: productForm.name.trim(),

//         flavor: productForm.flavor.trim() || null,

//         price: Number(productForm.price),

//         mode: productForm.mode || null,

//         available: Boolean(productForm.available),

//         category_id: productForm.category_id
//           ? Number(productForm.category_id)
//           : null,

//         image_url: imageUrl,

//         stock_quantity: Number(productForm.stock_quantity || 0),
//       };

//       let result;

//       if (productForm.id) {
//         result = await supabase
//           .from("products")
//           .update(payload)
//           .eq("id", productForm.id);
//       } else {
//         result = await supabase.from("products").insert(payload);
//       }

//       if (result.error) {
//         throw result.error;
//       }

//       setSuccess(
//         productForm.id
//           ? "Product updated successfully."
//           : "Product added successfully.",
//       );

//       resetProductForm();

//       await loadData();
//     } catch (error) {
//       console.error("SAVE PRODUCT ERROR:", error);

//       setError(error?.message || "Unable to save product.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* =====================================
//    EDIT PRODUCT
// ===================================== */

//   const editProduct = (product) => {
//     setProductForm({
//       id: product.id,
//       name: product.name || "",
//       flavor: product.flavor || "",
//       price: product.price ?? "",
//       mode: product.mode || "MTL",
//       available: product.available !== false,
//       category_id: product.category_id || "",
//       image_url: product.image_url || "",
//       stock_quantity: product.stock_quantity ?? 0,
//     });

//     setProductImageFile(null);

//     setProductImagePreview(product.image_url || "");

//     setSection("products");

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   /* =====================================
//    DELETE PRODUCT
// ===================================== */

//   const deleteProduct = async (product) => {
//     const confirmed = window.confirm(
//       `Delete "${product.name}${
//         product.flavor ? ` - ${product.flavor}` : ""
//       }"?`,
//     );

//     if (!confirmed) return;

//     setSaving(true);
//     setError("");
//     setSuccess("");

//     const { error } = await supabase
//       .from("products")
//       .delete()
//       .eq("id", product.id);

//     if (error) {
//       setError(error.message);
//     } else {
//       setSuccess("Product deleted successfully.");

//       await loadData();
//     }

//     setSaving(false);
//   };

//   /* =====================================
//    SAVE CATEGORY
// ===================================== */

//   const saveCategory = async (event) => {
//     event.preventDefault();

//     setSaving(true);
//     setError("");
//     setSuccess("");

//     try {
//       let imageUrl = categoryForm.image_url || null;

//       let mobileImageUrl = categoryForm.mobile_image_url || null;

//       let bannerImageUrl = categoryForm.banner_image || null;

//       if (categoryImageFile) {
//         imageUrl = await uploadImage(
//           categoryImageFile,
//           "category-images",
//           "categories",
//         );
//       }

//       if (categoryMobileImageFile) {
//         mobileImageUrl = await uploadImage(
//           categoryMobileImageFile,
//           "category-images",
//           "categories/mobile",
//         );
//       }

//       if (categoryBannerImageFile) {
//         bannerImageUrl = await uploadImage(
//           categoryBannerImageFile,
//           "category-images",
//           "categories/banners",
//         );
//       }

//       const payload = {
//         name: categoryForm.name.trim(),

//         slug: categoryForm.slug.trim() || slugify(categoryForm.name),

//         description: categoryForm.description.trim() || null,

//         image_url: imageUrl,

//         mobile_image_url: mobileImageUrl,

//         alt_text: categoryForm.alt_text.trim() || null,

//         promo_label: categoryForm.promo_label.trim() || null,

//         display_order: Number(categoryForm.display_order || 0),

//         featured_on_home: Boolean(categoryForm.featured_on_home),

//         active: Boolean(categoryForm.active),

//         seo_title: categoryForm.seo_title.trim() || null,

//         seo_description: categoryForm.seo_description.trim() || null,

//         battery: categoryForm.battery.trim() || null,

//         capacity: categoryForm.capacity.trim() || null,

//         nicotine_strength: categoryForm.nicotine_strength.trim() || null,

//         puff_counts: categoryForm.puff_counts.trim() || null,

//         charging: categoryForm.charging.trim() || null,

//         special_feature: categoryForm.special_feature.trim() || null,

//         banner_image: bannerImageUrl,
//       };

//       let result;

//       if (categoryForm.id) {
//         result = await supabase
//           .from("categories")
//           .update(payload)
//           .eq("id", categoryForm.id);
//       } else {
//         result = await supabase.from("categories").insert(payload);
//       }

//       if (result.error) {
//         throw result.error;
//       }

//       setSuccess(
//         categoryForm.id
//           ? "Category updated successfully."
//           : "Category added successfully.",
//       );

//       resetCategoryForm();

//       await loadData();
//     } catch (error) {
//       console.error("SAVE CATEGORY ERROR:", error);

//       setError(error?.message || "Unable to save category.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* =====================================
//    EDIT CATEGORY
// ===================================== */

//   const editCategory = (category) => {
//     setCategoryForm({
//       id: category.id,

//       name: category.name || "",

//       slug: category.slug || "",

//       description: category.description || "",

//       image_url: category.image_url || "",

//       mobile_image_url: category.mobile_image_url || "",

//       alt_text: category.alt_text || "",

//       promo_label: category.promo_label || "",

//       display_order: category.display_order ?? 0,

//       featured_on_home: category.featured_on_home === true,

//       active: category.active !== false,

//       seo_title: category.seo_title || "",

//       seo_description: category.seo_description || "",

//       battery: category.battery || "",

//       capacity: category.capacity || "",

//       nicotine_strength: category.nicotine_strength || "",

//       puff_counts: category.puff_counts || "",

//       charging: category.charging || "",

//       special_feature: category.special_feature || "",

//       banner_image: category.banner_image || "",
//     });

//     setCategoryImageFile(null);

//     setCategoryImagePreview(category.image_url || "");

//     setCategoryMobileImageFile(null);

//     setCategoryMobileImagePreview(category.mobile_image_url || "");

//     setCategoryBannerImageFile(null);

//     setCategoryBannerImagePreview(category.banner_image || "");

//     setSection("categories");

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   /* =====================================
//    DELETE CATEGORY
// ===================================== */

//   const deleteCategory = async (category) => {
//     const confirmed = window.confirm(`Delete "${category.name}"?`);

//     if (!confirmed) return;

//     setSaving(true);
//     setError("");
//     setSuccess("");

//     const { error } = await supabase
//       .from("categories")
//       .delete()
//       .eq("id", category.id);

//     if (error) {
//       setError(error.message);
//     } else {
//       setSuccess("Category deleted successfully.");

//       await loadData();
//     }

//     setSaving(false);
//   };

//   /* =====================================
//    UPDATE ORDER STATUS
// ===================================== */

//   const updateOrderStatus = async (order, status) => {
//     setSaving(true);
//     setError("");
//     setSuccess("");

//     const now = new Date().toISOString();

//     const updatePayload = {
//       order_status: status,
//       updated_at: now,
//     };

//     if (status === "confirmed") {
//       updatePayload.confirmed_at = now;
//     }

//     if (status === "shipped") {
//       updatePayload.shipped_at = now;
//     }

//     if (status === "delivered") {
//       updatePayload.delivered_at = now;
//     }

//     if (status === "cancelled" || status === "rejected") {
//       updatePayload.cancelled_at = now;
//     }

//     const { error } = await supabase
//       .from("orders")
//       .update(updatePayload)
//       .eq("id", order.id);

//     if (error) {
//       console.error("UPDATE ORDER STATUS ERROR:", error);

//       setError(error.message);
//     } else {
//       setSuccess(
//         `Order #${order.order_number || String(order.id).slice(0, 8)} updated.`,
//       );

//       await loadData();
//     }

//     setSaving(false);
//   };

//   /* =====================================
//    LOADING
// ===================================== */

//   if (loading) {
//     return (
//       <main className="admin-page">
//         <div className="admin-container">Loading admin dashboard...</div>
//       </main>
//     );
//   }

//   return (
//     <main className="admin-page">
//       <div className="admin-container">
//         {/* =====================================
//           HEADER
//       ===================================== */}

//         <header className="admin-header">
//           <div>
//             <span>VOZOL EGY</span>

//             <h1>Admin Dashboard</h1>

//             <p>Welcome, {profile?.full_name || "Administrator"}</p>
//           </div>

//           <button className="admin-logout" onClick={signOut}>
//             Sign Out
//           </button>
//         </header>

//         {/* =====================================
//           MESSAGES
//       ===================================== */}

//         {error && (
//           <div className="admin-message admin-message-error">{error}</div>
//         )}

//         {success && (
//           <div className="admin-message admin-message-success">{success}</div>
//         )}

//         {/* =====================================
//           TABS
//       ===================================== */}

//         <nav className="admin-tabs">
//           {[
//             ["overview", "Overview"],
//             ["orders", "Orders"],
//             ["customers", "Customers"],
//             ["products", "Products"],
//             ["categories", "Categories"],
//           ].map(([key, label]) => (
//             <button
//               key={key}
//               className={section === key ? "active" : ""}
//               onClick={() => setSection(key)}
//             >
//               {label}
//             </button>
//           ))}
//         </nav>

//         {/* =====================================
//           OVERVIEW
//       ===================================== */}

//         {section === "overview" && (
//           <>
//             <section className="admin-stats">
//               <div className="admin-stat">
//                 <span>TOTAL ORDERS</span>
//                 <strong>{stats.totalOrders}</strong>
//               </div>

//               <div className="admin-stat">
//                 <span>PENDING</span>
//                 <strong>{stats.pending}</strong>
//               </div>

//               <div className="admin-stat">
//                 <span>REJECTED</span>
//                 <strong>{stats.rejected}</strong>
//               </div>

//               <div className="admin-stat">
//                 <span>CONFIRMED / DELIVERED</span>

//                 <strong>{stats.delivered}</strong>
//               </div>

//               <div className="admin-stat admin-stat-sales">
//                 <span>TOTAL SALES</span>

//                 <strong>{money(stats.sales)}</strong>

//                 <small>Confirmed / Delivered / Completed orders only</small>
//               </div>
//             </section>

//             {/* RECENT ORDERS */}

//             <section className="admin-card">
//               <div className="admin-card-header">
//                 <h2>Recent Orders</h2>

//                 <button onClick={() => setSection("orders")}>View All</button>
//               </div>

//               <div className="admin-table-wrapper">
//                 <table className="admin-table">
//                   <thead>
//                     <tr>
//                       <th>Order</th>
//                       <th>Customer</th>
//                       <th>Date</th>
//                       <th>Status</th>
//                       <th>Total</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {orders.slice(0, 8).map((order) => {
//                       const customer = getOrderCustomer(order);

//                       return (
//                         <tr key={order.id}>
//                           <td>
//                             #
//                             {order.order_number || String(order.id).slice(0, 8)}
//                           </td>

//                           <td>{customer.name}</td>

//                           <td>{date(order.created_at)}</td>

//                           <td>
//                             <span className="admin-status">
//                               {statusLabel(order.order_status)}
//                             </span>
//                           </td>

//                           <td>{money(order.total_amount)}</td>
//                         </tr>
//                       );
//                     })}

//                     {orders.length === 0 && (
//                       <tr>
//                         <td
//                           colSpan="5"
//                           style={{
//                             textAlign: "center",
//                           }}
//                         >
//                           No orders found.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </section>
//           </>
//         )}

//         {/* =====================================
//           ORDERS
//       ===================================== */}

//         {section === "orders" && (
//           <section className="admin-card">
//             <div className="admin-card-header">
//               <h2>Manage Orders</h2>
//             </div>

//             <div className="admin-table-wrapper">
//               <table className="admin-table">
                
//                   <thead>
//                     <tr>
//                       <th>Order</th>
//                       <th>Customer</th>
//                       <th>Phone</th>
//                       <th>WhatsApp</th>
//                       <th>Address</th>
//                       <th>Products</th>
//                       <th>Subtotal</th>
//                       <th>Shipping Cost</th>
//                       <th>Delivery</th>
//                       <th>Total</th>
//                       <th>Status</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {orders.length > 0 ? (
//                       orders.map((order) => {
//                         const customer = getOrderCustomer(order);

//                         return (
//                           <tr key={order.id}>
//                             {/* ORDER */}
//                             <td>
//                               <strong>
//                                 #
//                                 {order.order_number ||
//                                   String(order.id).slice(0, 8)}
//                               </strong>
//                             </td>

//                             {/* CUSTOMER */}
//                             <td>
//                               <strong>{customer.name || "Guest"}</strong>

//                               {customer.email && (
//                                 <div className="admin-order-customer-email">
//                                   {customer.email}
//                                 </div>
//                               )}
//                             </td>

//                             {/* PHONE */}
//                             <td>{customer.phone || "—"}</td>

//                             {/* WHATSAPP */}
//                             <td>{customer.whatsapp || "—"}</td>

//                             {/* ADDRESS */}
//                             <td>
//                               <div className="admin-order-address">
//                                 {customer.governorate && (
//                                   <div>
//                                     <strong>Governorate:</strong>{" "}
//                                     {customer.governorate}
//                                   </div>
//                                 )}

//                                 {customer.city && (
//                                   <div>
//                                     <strong>City:</strong> {customer.city}
//                                   </div>
//                                 )}

//                                 {customer.address && (
//                                   <div>
//                                     <strong>Address:</strong> {customer.address}
//                                   </div>
//                                 )}

//                                 {!customer.governorate &&
//                                   !customer.city &&
//                                   !customer.address && <span>—</span>}
//                               </div>
//                             </td>

//                             {/* PRODUCTS */}
//                             <td>
//                               <div className="admin-order-products">
//                                 {order.order_items &&
//                                 order.order_items.length > 0 ? (
//                                   order.order_items.map((item) => {
//                                     const categoryName = getProductCategory(
//                                       item.product_id,
//                                     );

//                                     return (
//                                       <div
//                                         key={item.id}
//                                         className="admin-order-product"
//                                       >
//                                         <div className="admin-order-product-name">
//                                           {item.product_name || "Product"}
//                                         </div>

//                                         {item.flavor && (
//                                           <div className="admin-order-product-flavor">
//                                             {item.flavor}
//                                           </div>
//                                         )}

//                                         <div className="admin-order-product-category">
//                                           Category: {categoryName}
//                                         </div>

//                                         <div className="admin-order-product-details">
//                                           {Number(
//                                             item.unit_price || 0,
//                                           ).toLocaleString("en-US")}{" "}
//                                           {order.currency || "EGP"} ×{" "}
//                                           {item.quantity || 0}
//                                         </div>
//                                       </div>
//                                     );
//                                   })
//                                 ) : (
//                                   <span>No products</span>
//                                 )}
//                               </div>
//                             </td>

//                             {/* SUBTOTAL */}
//                             <td>
//                               <strong>
//                                 {Number(order.subtotal || 0).toLocaleString(
//                                   "en-US",
//                                 )}{" "}
//                                 {order.currency || "EGP"}
//                               </strong>
//                             </td>

//                             {/* SHIPPING COST */}
//                             <td>
//                               <strong>
//                                 {Number(
//                                   order.shipping_cost || 0,
//                                 ).toLocaleString("en-US")}{" "}
//                                 {order.currency || "EGP"}
//                               </strong>
//                             </td>

//                             {/* DELIVERY */}
//                             <td>{order.delivery_method || "—"}</td>

//                             {/* TOTAL */}
//                             <td>
//                               <strong>
//                                 {Number(order.total_amount || 0).toLocaleString(
//                                   "en-US",
//                                 )}{" "}
//                                 {order.currency || "EGP"}
//                               </strong>
//                             </td>

//                             {/* STATUS */}
//                             <td>
//                               <select
//                                 value={order.order_status || "pending"}
//                                 disabled={saving}
//                                 onChange={(event) =>
//                                   updateOrderStatus(order, event.target.value)
//                                 }
//                               >
//                                 {orderStatuses.map((status) => (
//                                   <option key={status} value={status}>
//                                     {statusLabel(status)}
//                                   </option>
//                                 ))}
//                               </select>
//                             </td>
//                           </tr>
//                         );
//                       })
//                     ) : (
//                       <tr>
//                         <td colSpan="11" style={{ textAlign: "center" }}>
//                           No orders found.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>

//                 <tbody>
//                   {orders.map((order) => {
//                     const customer = getOrderCustomer(order);

//                     return (
//                       <tr key={order.id}>
//                         {/* ORDER */}

//                         <td>
//                           <strong>
//                             #
//                             {order.order_number || String(order.id).slice(0, 8)}
//                           </strong>
//                         </td>

//                         {/* CUSTOMER */}

//                         <td>
//                           <div className="admin-order-customer">
//                             <strong>{customer.name}</strong>

//                             {customer.email && <small>{customer.email}</small>}
//                           </div>
//                         </td>

//                         {/* PHONE */}

//                         <td>{customer.phone || "—"}</td>

//                         {/* WHATSAPP */}

//                         <td>{customer.whatsapp || "—"}</td>

//                         {/* ADDRESS */}

//                         <td>
//                           <div className="admin-order-address">
//                             {[
//                               order.governorate,
//                               order.city,
//                               order.street,

//                               order.building_number &&
//                                 `Building: ${order.building_number}`,

//                               order.apartment_number &&
//                                 `Apartment: ${order.apartment_number}`,

//                               order.address_details,
//                             ]
//                               .filter(Boolean)
//                               .map((item, index) => (
//                                 <div key={index}>{item}</div>
//                               ))}

//                             {![
//                               order.governorate,
//                               order.city,
//                               order.street,
//                               order.building_number,
//                               order.apartment_number,
//                               order.address_details,
//                             ].some(Boolean) && <span>—</span>}
//                           </div>
//                         </td>

//                         {/* PRODUCTS */}

//                         <td>
//                           <div className="admin-order-products">
//                             {order.order_items &&
//                             order.order_items.length > 0 ? (
//                               order.order_items.map((item) => {
//                                 const categoryName = getProductCategory(
//                                   item.product_id,
//                                 );

//                                 return (
//                                   <div
//                                     key={item.id}
//                                     className="admin-order-product"
//                                   >
//                                     <div className="admin-order-product-name">
//                                       {item.product_name || "Product"}
//                                     </div>

//                                     {item.flavor && (
//                                       <div className="admin-order-product-flavor">
//                                         {item.flavor}
//                                       </div>
//                                     )}

//                                     <div className="admin-order-product-details">
//                                       {Number(
//                                         item.unit_price || 0,
//                                       ).toLocaleString("en-US")}{" "}
//                                       {order.currency || "EGP"} ×{" "}
//                                       {item.quantity || 0}
//                                     </div>
//                                   </div>
//                                 );
//                               })
//                             ) : (
//                               <span>No products</span>
//                             )}
//                           </div>
//                         </td>

//                         {/* DELIVERY */}

//                         <td>{order.delivery_method || "—"}</td>

//                         {/* TOTAL */}

//                         <td>
//                           <strong>{money(order.total_amount)}</strong>
//                         </td>

//                         {/* STATUS */}

//                         <td>
//                           <select
//                             value={order.order_status || "pending"}
//                             disabled={saving}
//                             onChange={(event) =>
//                               updateOrderStatus(order, event.target.value)
//                             }
//                           >
//                             {orderStatuses.map((status) => (
//                               <option key={status} value={status}>
//                                 {statusLabel(status)}
//                               </option>
//                             ))}
//                           </select>
//                         </td>
//                       </tr>
//                     );
//                   })}

//                   {orders.length === 0 && (
//                     <tr>
//                       <td
//                         colSpan="9"
//                         style={{
//                           textAlign: "center",
//                         }}
//                       >
//                         No orders found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </section>
//         )}

//         {/* =====================================
//           CUSTOMERS
//       ===================================== */}

//         {section === "customers" && (
//           <section className="admin-card">
//             <div className="admin-card-header">
//               <h2>Customers</h2>

//               <span>
//                 {
//                   customers.filter((customer) => customer.role !== "admin")
//                     .length
//                 }
//               </span>
//             </div>

//             <div className="admin-table-wrapper">
//               <table className="admin-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Phone</th>
//                     <th>Role</th>
//                     <th>Created</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {customers
//                     .filter((customer) => customer.role !== "admin")
//                     .map((customer) => (
//                       <tr key={customer.id}>
//                         <td>{customer.full_name || "—"}</td>

//                         <td>{customer.email || "—"}</td>

//                         <td>{customer.phone || "—"}</td>

//                         <td>{customer.role || "customer"}</td>

//                         <td>{date(customer.created_at)}</td>
//                       </tr>
//                     ))}

//                   {customers.filter((customer) => customer.role !== "admin")
//                     .length === 0 && (
//                     <tr>
//                       <td
//                         colSpan="5"
//                         style={{
//                           textAlign: "center",
//                         }}
//                       >
//                         No customers found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </section>
//         )}

//         {/* =====================================
//           PRODUCTS
//       ===================================== */}

//         {section === "products" && (
//           <>
//             <section className="admin-card">
//               <div className="admin-card-header">
//                 <h2>{productForm.id ? "Edit Product" : "Add Product"}</h2>

//                 {productForm.id && (
//                   <button
//                     type="button"
//                     className="admin-secondary-button"
//                     onClick={resetProductForm}
//                   >
//                     Cancel Edit
//                   </button>
//                 )}
//               </div>

//               <form className="admin-form" onSubmit={saveProduct}>
//                 <label>
//                   Product Name
//                   <input
//                     value={productForm.name}
//                     onChange={(event) =>
//                       setProductForm({
//                         ...productForm,
//                         name: event.target.value,
//                       })
//                     }
//                     required
//                   />
//                 </label>

//                 <label>
//                   Flavor
//                   <input
//                     value={productForm.flavor}
//                     onChange={(event) =>
//                       setProductForm({
//                         ...productForm,
//                         flavor: event.target.value,
//                       })
//                     }
//                   />
//                 </label>

//                 <label>
//                   Price
//                   <input
//                     type="number"
//                     min="0"
//                     value={productForm.price}
//                     onChange={(event) =>
//                       setProductForm({
//                         ...productForm,
//                         price: event.target.value,
//                       })
//                     }
//                     required
//                   />
//                 </label>

//                 <label>
//                   Stock Quantity
//                   <input
//                     type="number"
//                     min="0"
//                     step="1"
//                     value={productForm.stock_quantity}
//                     onChange={(event) =>
//                       setProductForm({
//                         ...productForm,
//                         stock_quantity: event.target.value,
//                       })
//                     }
//                   />
//                 </label>

//                 <label>
//                   Mode
//                   <select
//                     value={productForm.mode}
//                     onChange={(event) =>
//                       setProductForm({
//                         ...productForm,
//                         mode: event.target.value,
//                       })
//                     }
//                   >
//                     <option value="MTL">MTL</option>

//                     <option value="DL">DL</option>
//                   </select>
//                 </label>

//                 <label>
//                   Category
//                   <select
//                     value={productForm.category_id}
//                     onChange={(event) =>
//                       setProductForm({
//                         ...productForm,
//                         category_id: event.target.value,
//                       })
//                     }
//                   >
//                     <option value="">No Category</option>

//                     {categories.map((category) => (
//                       <option key={category.id} value={category.id}>
//                         {category.name}
//                       </option>
//                     ))}
//                   </select>
//                 </label>

//                 {/* PRODUCT IMAGE */}

//                 <label className="admin-field-full">
//                   Product Image
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleProductImageChange}
//                   />
//                   {productImagePreview && (
//                     <div className="admin-image-preview">
//                       <img src={productImagePreview} alt="Product preview" />
//                     </div>
//                   )}
//                 </label>

//                 <label className="admin-checkbox">
//                   <input
//                     type="checkbox"
//                     checked={productForm.available}
//                     onChange={(event) =>
//                       setProductForm({
//                         ...productForm,
//                         available: event.target.checked,
//                       })
//                     }
//                   />
//                   Available
//                 </label>

//                 <button
//                   type="submit"
//                   className="admin-primary-button"
//                   disabled={saving}
//                 >
//                   {saving
//                     ? "Saving..."
//                     : productForm.id
//                       ? "Update Product"
//                       : "Add Product"}
//                 </button>
//               </form>
//             </section>

//             <section className="admin-card">
//               <div className="admin-card-header">
//                 <h2>Products</h2>

//                 <span>{products.length}</span>
//               </div>

//               <div className="admin-table-wrapper">
//                 <table className="admin-table">
//                   <thead>
//                     <tr>
//                       <th>Image</th>
//                       <th>Name</th>
//                       <th>Flavor</th>
//                       <th>Price</th>
//                       <th>Stock Quantity</th>
//                       <th>Mode</th>
//                       <th>Available</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {products.map((product) => (
//                       <tr key={product.id}>
//                         <td>
//                           {product.image_url ? (
//                             <img
//                               src={product.image_url}
//                               alt={product.name || "Product"}
//                               className="admin-product-table-image"
//                             />
//                           ) : (
//                             "—"
//                           )}
//                         </td>
//                         {/* SUBTOTAL */}

//                         <td>
//                           <strong>
//                             {Number(order.subtotal || 0).toLocaleString(
//                               "en-US",
//                             )}{" "}
//                             {order.currency || "EGP"}
//                           </strong>
//                         </td>

//                         {/* SHIPPING COST */}

//                         <td>
//                           <strong>
//                             {Number(order.shipping_cost || 0).toLocaleString(
//                               "en-US",
//                             )}{" "}
//                             {order.currency || "EGP"}
//                           </strong>
//                         </td>

//                         <td>{product.name}</td>

//                         <td>{product.flavor || "—"}</td>

//                         <td>{money(product.price)}</td>

//                         <td>
//                           <strong>{Number(product.stock_quantity || 0)}</strong>
//                         </td>

//                         <td>{product.mode || "—"}</td>

//                         <td>{product.available ? "Yes" : "No"}</td>

//                         <td>
//                           <div className="admin-actions">
//                             <button
//                               type="button"
//                               onClick={() => editProduct(product)}
//                             >
//                               Edit
//                             </button>

//                             <button
//                               type="button"
//                               className="danger"
//                               onClick={() => deleteProduct(product)}
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}

//                     {products.length === 0 && (
//                       <tr>
//                         <td
//                           colSpan="8"
//                           style={{
//                             textAlign: "center",
//                           }}
//                         >
//                           No products found.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </section>
//           </>
//         )}

//         {/* =====================================
//           CATEGORIES
//       ===================================== */}

//         {section === "categories" && (
//           <>
//             <section className="admin-card">
//               <div className="admin-card-header">
//                 <h2>{categoryForm.id ? "Edit Category" : "Add Category"}</h2>

//                 {categoryForm.id && (
//                   <button
//                     type="button"
//                     className="admin-secondary-button"
//                     onClick={resetCategoryForm}
//                   >
//                     Cancel Edit
//                   </button>
//                 )}
//               </div>

//               <form className="admin-form" onSubmit={saveCategory}>
//                 <label>
//                   Name
//                   <input
//                     value={categoryForm.name}
//                     onChange={(event) =>
//                       setCategoryForm({
//                         ...categoryForm,
//                         name: event.target.value,
//                       })
//                     }
//                     required
//                   />
//                 </label>

//                 <label>
//                   Slug
//                   <input
//                     value={categoryForm.slug}
//                     onChange={(event) =>
//                       setCategoryForm({
//                         ...categoryForm,
//                         slug: event.target.value,
//                       })
//                     }
//                     placeholder="vozol-star-40k"
//                     required
//                   />
//                 </label>

//                 <label className="admin-field-full">
//                   Description
//                   <textarea
//                     rows="4"
//                     value={categoryForm.description}
//                     onChange={(event) =>
//                       setCategoryForm({
//                         ...categoryForm,
//                         description: event.target.value,
//                       })
//                     }
//                   />
//                 </label>

//                 {/* MAIN CATEGORY IMAGE */}

//                 <label>
//                   Main Category Image
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleCategoryImageChange}
//                   />
//                   {categoryImagePreview && (
//                     <div className="admin-image-preview">
//                       <img src={categoryImagePreview} alt="Category preview" />
//                     </div>
//                   )}
//                 </label>

//                 {/* MOBILE CATEGORY IMAGE */}

//                 <label>
//                   Mobile Category Image
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleCategoryMobileImageChange}
//                   />
//                   {categoryMobileImagePreview && (
//                     <div className="admin-image-preview">
//                       <img
//                         src={categoryMobileImagePreview}
//                         alt="Mobile category preview"
//                       />
//                     </div>
//                   )}
//                 </label>

//                 <label>
//                   Alt Text
//                   <input
//                     value={categoryForm.alt_text}
//                     onChange={(event) =>
//                       setCategoryForm({
//                         ...categoryForm,
//                         alt_text: event.target.value,
//                       })
//                     }
//                   />
//                 </label>

//                 <label>
//                   Promo Label
//                   <input
//                     value={categoryForm.promo_label}
//                     onChange={(event) =>
//                       setCategoryForm({
//                         ...categoryForm,
//                         promo_label: event.target.value,
//                       })
//                     }
//                     placeholder="NEW"
//                   />
//                 </label>

//                 <label>
//                   Display Order
//                   <input
//                     type="number"
//                     value={categoryForm.display_order}
//                     onChange={(event) =>
//                       setCategoryForm({
//                         ...categoryForm,
//                         display_order: event.target.value,
//                       })
//                     }
//                   />
//                 </label>

//                 <label className="admin-checkbox">
//                   <input
//                     type="checkbox"
//                     checked={categoryForm.featured_on_home}
//                     onChange={(event) =>
//                       setCategoryForm({
//                         ...categoryForm,
//                         featured_on_home: event.target.checked,
//                       })
//                     }
//                   />
//                   Featured on Home
//                 </label>

//                 <label className="admin-checkbox">
//                   <input
//                     type="checkbox"
//                     checked={categoryForm.active}
//                     onChange={(event) =>
//                       setCategoryForm({
//                         ...categoryForm,
//                         active: event.target.checked,
//                       })
//                     }
//                   />
//                   Active
//                 </label>

//                 <label>
//                   SEO Title
//                   <input
//                     value={categoryForm.seo_title}
//                     onChange={(event) =>
//                       setCategoryForm({
//                         ...categoryForm,
//                         seo_title: event.target.value,
//                       })
//                     }
//                   />
//                 </label>

//                 <label className="admin-field-full">
//                   SEO Description
//                   <textarea
//                     rows="4"
//                     value={categoryForm.seo_description}
//                     onChange={(event) =>
//                       setCategoryForm({
//                         ...categoryForm,
//                         seo_description: event.target.value,
//                       })
//                     }
//                   />
//                 </label>

//                 <label>
//                   Battery
//                   <input
//                     value={categoryForm.battery}
//                     onChange={(event) =>
//                       setCategoryForm({
//                         ...categoryForm,
//                         battery: event.target.value,
//                       })
//                     }
//                     placeholder="650mAh"
//                   />
//                 </label>

//                 <label>
//                   Capacity
//                   <input
//                     value={categoryForm.capacity}
//                     onChange={(event) =>
//                       setCategoryForm({
//                         ...categoryForm,
//                         capacity: event.target.value,
//                       })
//                     }
//                     placeholder="20ml"
//                   />
//                 </label>

//                 <label>
//                   Nicotine Strength
//                   <input
//                     value={categoryForm.nicotine_strength}
//                     onChange={(event) =>
//                       setCategoryForm({
//                         ...categoryForm,
//                         nicotine_strength: event.target.value,
//                       })
//                     }
//                     placeholder="5%"
//                   />
//                 </label>

//                 <label>
//                   Puff Counts
//                   <input
//                     value={categoryForm.puff_counts}
//                     onChange={(event) =>
//                       setCategoryForm({
//                         ...categoryForm,
//                         puff_counts: event.target.value,
//                       })
//                     }
//                     placeholder="40000"
//                   />
//                 </label>

//                 <label>
//                   Charging
//                   <input
//                     value={categoryForm.charging}
//                     onChange={(event) =>
//                       setCategoryForm({
//                         ...categoryForm,
//                         charging: event.target.value,
//                       })
//                     }
//                     placeholder="Type-C"
//                   />
//                 </label>

//                 <label>
//                   Special Feature
//                   <input
//                     value={categoryForm.special_feature}
//                     onChange={(event) =>
//                       setCategoryForm({
//                         ...categoryForm,
//                         special_feature: event.target.value,
//                       })
//                     }
//                   />
//                 </label>

//                 {/* BANNER IMAGE */}

//                 <label className="admin-field-full">
//                   Banner Image
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleCategoryBannerImageChange}
//                   />
//                   {categoryBannerImagePreview && (
//                     <div className="admin-image-preview">
//                       <img
//                         src={categoryBannerImagePreview}
//                         alt="Banner preview"
//                       />
//                     </div>
//                   )}
//                 </label>

//                 <button
//                   type="submit"
//                   className="admin-primary-button"
//                   disabled={saving}
//                 >
//                   {saving
//                     ? "Saving..."
//                     : categoryForm.id
//                       ? "Update Category"
//                       : "Add Category"}
//                 </button>
//               </form>
//             </section>

//             <section className="admin-card">
//               <div className="admin-card-header">
//                 <h2>Categories</h2>

//                 <span>{categories.length}</span>
//               </div>

//               <div className="admin-table-wrapper">
//                 <table className="admin-table">
//                   <thead>
//                     <tr>
//                       <th>Main Image</th>
//                       <th>Mobile Image</th>
//                       <th>Name</th>
//                       <th>Slug</th>
//                       <th>Description</th>
//                       <th>Alt Text</th>
//                       <th>Promo Label</th>
//                       <th>Display Order</th>
//                       <th>Featured on Home</th>
//                       <th>Active</th>
//                       <th>SEO Title</th>
//                       <th>SEO Description</th>
//                       <th>Battery</th>
//                       <th>Capacity</th>
//                       <th>Nicotine Strength</th>
//                       <th>Puff Counts</th>
//                       <th>Charging</th>
//                       <th>Special Feature</th>
//                       <th>Banner Image</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {categories.map((category) => (
//                       <tr key={category.id}>
//                         <td>
//                           {category.image_url ? (
//                             <img
//                               src={category.image_url}
//                               alt={
//                                 category.alt_text || category.name || "Category"
//                               }
//                               className="admin-category-table-image"
//                             />
//                           ) : (
//                             "—"
//                           )}
//                         </td>

//                         <td>
//                           {category.mobile_image_url ? (
//                             <img
//                               src={category.mobile_image_url}
//                               alt={
//                                 category.alt_text || category.name || "Category"
//                               }
//                               className="admin-category-table-image"
//                             />
//                           ) : (
//                             "—"
//                           )}
//                         </td>

//                         <td>{category.name || "—"}</td>

//                         <td>{category.slug || "—"}</td>

//                         <td>
//                           <div className="admin-description-box">
//                             {category.description || "—"}
//                           </div>
//                         </td>

//                         <td>{category.alt_text || "—"}</td>

//                         <td>{category.promo_label || "—"}</td>

//                         <td>{category.display_order ?? 0}</td>

//                         <td>{category.featured_on_home ? "Yes" : "No"}</td>

//                         <td>{category.active ? "Yes" : "No"}</td>

//                         <td>{category.seo_title || "—"}</td>

//                         <td>{category.seo_description || "—"}</td>

//                         <td>{category.battery || "—"}</td>

//                         <td>{category.capacity || "—"}</td>

//                         <td>{category.nicotine_strength || "—"}</td>

//                         <td>{category.puff_counts || "—"}</td>

//                         <td>{category.charging || "—"}</td>

//                         <td>{category.special_feature || "—"}</td>

//                         <td>
//                           {category.banner_image ? (
//                             <img
//                               src={category.banner_image}
//                               alt={category.name || "Banner"}
//                               className="admin-category-banner-image"
//                             />
//                           ) : (
//                             "—"
//                           )}
//                         </td>

//                         <td>
//                           <div className="admin-actions">
//                             <button
//                               type="button"
//                               onClick={() => editCategory(category)}
//                             >
//                               Edit
//                             </button>

//                             <button
//                               type="button"
//                               className="danger"
//                               onClick={() => deleteCategory(category)}
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}

//                     {categories.length === 0 && (
//                       <tr>
//                         <td
//                           colSpan="20"
//                           style={{
//                             textAlign: "center",
//                           }}
//                         >
//                           No categories found.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </section>
//           </>
//         )}
//       </div>
//     </main>
//   );
// };

// export default AdminDashboardPage;


import React, { useEffect, useMemo, useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";

import "./AdminDashboard.css";

const money = (value) =>
  new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const date = (value) =>
  value
    ? new Intl.DateTimeFormat("en-EG", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(value))
    : "—";

const statusLabel = (value) =>
  String(value || "pending")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const salesStatuses = ["confirmed", "delivered", "completed"];

const orderStatuses = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "completed",
  "rejected",
  "cancelled",
];

const slugify = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff]+/g, "-")
    .replace(/^-+|-+$/g, "");

const AdminDashboardPage = () => {
  const { profile, signOut } = useAuth();

  const [section, setSection] = useState("overview");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  /* =====================================
     PRODUCT FORM
  ===================================== */

  const [productForm, setProductForm] = useState({
    id: null,
    name: "",
    flavor: "",
    price: "",
    mode: "MTL",
    available: true,
    category_id: "",
    image_url: "",
    stock_quantity: 0,
  });

  const [productImageFile, setProductImageFile] = useState(null);
  const [productImagePreview, setProductImagePreview] = useState("");

  /* =====================================
     CATEGORY FORM
  ===================================== */

  const [categoryForm, setCategoryForm] = useState({
    id: null,
    name: "",
    slug: "",
    description: "",
    image_url: "",
    mobile_image_url: "",
    alt_text: "",
    promo_label: "",
    display_order: 0,
    featured_on_home: false,
    active: true,
    seo_title: "",
    seo_description: "",
    battery: "",
    capacity: "",
    nicotine_strength: "",
    puff_counts: "",
    charging: "",
    special_feature: "",
    banner_image: "",
  });

  const [categoryImageFile, setCategoryImageFile] = useState(null);
  const [categoryImagePreview, setCategoryImagePreview] = useState("");

  const [categoryMobileImageFile, setCategoryMobileImageFile] = useState(null);
  const [categoryMobileImagePreview, setCategoryMobileImagePreview] =
    useState("");

  const [categoryBannerImageFile, setCategoryBannerImageFile] = useState(null);
  const [categoryBannerImagePreview, setCategoryBannerImagePreview] =
    useState("");

  /* ================================
   LOAD ADMIN DATA
================================ */

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [ordersResult, customersResult, productsResult, categoriesResult] =
        await Promise.all([
          /* ================================
         ORDERS
      ================================= */

          supabase
            .from("orders")
            .select(
              `
          id,
          user_id,
          customer_name,
          customer_email,
          customer_phone,
          customer_whatsapp,
          order_number,
          order_status,
          payment_method,
          payment_status,
          delivery_method,
          shipping_cost,
          governorate,
          city,
          street,
          building_number,
          apartment_number,
          address_details,
          subtotal,
          total_amount,
          currency,
          customer_notes,
          admin_notes,
          created_at,
          updated_at,
          confirmed_at,
          shipped_at,
          delivered_at,
          cancelled_at,
          notes,

          order_items (
            id,
            product_id,
            product_name,
            flavor,
            quantity,
            unit_price,
            created_at
          )
        `,
            )
            .order("created_at", {
              ascending: false,
            }),

          /* ================================
         CUSTOMERS
      ================================= */

          supabase
            .from("profiles")
            .select(
              `
          id,
          email,
          full_name,
          phone,
          role,
          created_at
        `,
            )
            .order("created_at", {
              ascending: false,
            }),

          /* ================================
         PRODUCTS
      ================================= */

          supabase
            .from("products")
            .select(
              `
          id,
          name,
          flavor,
          price,
          mode,
          available,
          category_id,
          image_url,
          stock_quantity
        `,
            )
            .order("name"),

          /* ================================
         CATEGORIES
      ================================= */

          supabase
            .from("categories")
            .select(
              `
          id,
          name,
          slug,
          description,
          image_url,
          mobile_image_url,
          alt_text,
          promo_label,
          display_order,
          featured_on_home,
          active,
          seo_title,
          seo_description,
          battery,
          capacity,
          nicotine_strength,
          puff_counts,
          charging,
          special_feature,
          banner_image
        `,
            )
            .order("display_order"),
        ]);

      if (ordersResult.error) {
        throw ordersResult.error;
      }

      if (customersResult.error) {
        throw customersResult.error;
      }

      if (productsResult.error) {
        throw productsResult.error;
      }

      if (categoriesResult.error) {
        throw categoriesResult.error;
      }

      setOrders(ordersResult.data || []);
      setCustomers(customersResult.data || []);
      setProducts(productsResult.data || []);
      setCategories(categoriesResult.data || []);
    } catch (error) {
      console.error("ADMIN LOAD ERROR:", error);

      setError(error?.message || "Unable to load admin data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* =====================================
   IMAGE UPLOAD
===================================== */

  const uploadImage = async (file, bucket, folder) => {
    if (!file) return null;

    if (!file.type.startsWith("image/")) {
      throw new Error("Please select a valid image file.");
    }

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      throw new Error("Image size must be less than 10MB.");
    }

    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";

    const safeName =
      file.name
        .replace(/\.[^/.]+$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9-_]+/g, "-")
        .replace(/^-+|-+$/g, "") || "image";

    const fileName = `${safeName}-${Date.now()}.${extension}`;

    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      throw uploadError;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return publicUrl;
  };

  /* =====================================
   STATS
===================================== */

  const stats = useMemo(() => {
    const pending = orders.filter(
      (order) => String(order.order_status).toLowerCase() === "pending",
    ).length;

    const rejected = orders.filter((order) =>
      ["rejected", "cancelled"].includes(
        String(order.order_status).toLowerCase(),
      ),
    ).length;

    const delivered = orders.filter((order) =>
      ["confirmed", "delivered", "completed"].includes(
        String(order.order_status).toLowerCase(),
      ),
    ).length;

    const sales = orders
      .filter((order) =>
        salesStatuses.includes(String(order.order_status).toLowerCase()),
      )
      .reduce((total, order) => total + Number(order.total_amount || 0), 0);

    return {
      totalOrders: orders.length,
      pending,
      rejected,
      delivered,
      sales,
    };
  }, [orders]);

  /* =====================================
   CUSTOMER MAP
===================================== */

  const customerMap = useMemo(() => {
    return customers.reduce((map, customer) => {
      map[customer.id] = customer;
      return map;
    }, {});
  }, [customers]);

  /* =====================================
   ORDER CUSTOMER HELPER
===================================== */

  const getOrderCustomer = (order) => {
    const profileCustomer = order.user_id ? customerMap[order.user_id] : null;

    return {
      name: order.customer_name || profileCustomer?.full_name || "Guest",

      email: order.customer_email || profileCustomer?.email || "",

      phone: order.customer_phone || profileCustomer?.phone || "",

      whatsapp: order.customer_whatsapp || "",

      governorate: order.governorate || "",

      city: order.city || "",

      address: [
        order.street,
        order.building_number ? `Building ${order.building_number}` : "",
        order.apartment_number ? `Apartment ${order.apartment_number}` : "",
        order.address_details,
      ]
        .filter(Boolean)
        .join(", "),
    };
  };

  /* =====================================
   GET PRODUCT CATEGORY
===================================== */

  const getProductCategory = (productId) => {
    if (!productId) {
      return "—";
    }

    const product = products.find(
      (item) => String(item.id) === String(productId),
    );

    if (!product) {
      return "—";
    }

    const category = categories.find(
      (item) => String(item.id) === String(product.category_id),
    );

    return category?.name || "—";
  };

  /* =====================================
   RESET PRODUCT FORM
===================================== */

  const resetProductForm = () => {
    setProductForm({
      id: null,
      name: "",
      flavor: "",
      price: "",
      mode: "MTL",
      available: true,
      category_id: "",
      image_url: "",
      stock_quantity: 0,
    });

    setProductImageFile(null);
    setProductImagePreview("");
  };

  /* =====================================
   RESET CATEGORY FORM
===================================== */

  const resetCategoryForm = () => {
    setCategoryForm({
      id: null,
      name: "",
      slug: "",
      description: "",
      image_url: "",
      mobile_image_url: "",
      alt_text: "",
      promo_label: "",
      display_order: 0,
      featured_on_home: false,
      active: true,
      seo_title: "",
      seo_description: "",
      battery: "",
      capacity: "",
      nicotine_strength: "",
      puff_counts: "",
      charging: "",
      special_feature: "",
      banner_image: "",
    });

    setCategoryImageFile(null);
    setCategoryImagePreview("");

    setCategoryMobileImageFile(null);
    setCategoryMobileImagePreview("");

    setCategoryBannerImageFile(null);
    setCategoryBannerImagePreview("");
  };

  /* =====================================
   PRODUCT IMAGE SELECT
===================================== */

  const handleProductImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10MB.");
      return;
    }

    setError("");

    setProductImageFile(file);

    const previewUrl = URL.createObjectURL(file);

    setProductImagePreview(previewUrl);
  };

  /* =====================================
   CATEGORY MAIN IMAGE SELECT
===================================== */

  const handleCategoryImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10MB.");
      return;
    }

    setError("");

    setCategoryImageFile(file);

    const previewUrl = URL.createObjectURL(file);

    setCategoryImagePreview(previewUrl);
  };

  /* =====================================
   CATEGORY MOBILE IMAGE SELECT
===================================== */

  const handleCategoryMobileImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10MB.");
      return;
    }

    setError("");

    setCategoryMobileImageFile(file);

    const previewUrl = URL.createObjectURL(file);

    setCategoryMobileImagePreview(previewUrl);
  };

  /* =====================================
   CATEGORY BANNER IMAGE SELECT
===================================== */

  const handleCategoryBannerImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10MB.");
      return;
    }

    setError("");

    setCategoryBannerImageFile(file);

    const previewUrl = URL.createObjectURL(file);

    setCategoryBannerImagePreview(previewUrl);
  };

  /* =====================================
   SAVE PRODUCT
===================================== */

  const saveProduct = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      let imageUrl = productForm.image_url || null;

      if (productImageFile) {
        imageUrl = await uploadImage(
          productImageFile,
          "product-images",
          "products",
        );
      }

      const payload = {
        name: productForm.name.trim(),

        flavor: productForm.flavor.trim() || null,

        price: Number(productForm.price),

        mode: productForm.mode || null,

        available: Boolean(productForm.available),

        category_id: productForm.category_id
          ? Number(productForm.category_id)
          : null,

        image_url: imageUrl,

        stock_quantity: Number(productForm.stock_quantity || 0),
      };

      let result;

      if (productForm.id) {
        result = await supabase
          .from("products")
          .update(payload)
          .eq("id", productForm.id);
      } else {
        result = await supabase.from("products").insert(payload);
      }

      if (result.error) {
        throw result.error;
      }

      setSuccess(
        productForm.id
          ? "Product updated successfully."
          : "Product added successfully.",
      );

      resetProductForm();

      await loadData();
    } catch (error) {
      console.error("SAVE PRODUCT ERROR:", error);

      setError(error?.message || "Unable to save product.");
    } finally {
      setSaving(false);
    }
  };

  /* =====================================
   EDIT PRODUCT
===================================== */

  const editProduct = (product) => {
    setProductForm({
      id: product.id,
      name: product.name || "",
      flavor: product.flavor || "",
      price: product.price ?? "",
      mode: product.mode || "MTL",
      available: product.available !== false,
      category_id: product.category_id || "",
      image_url: product.image_url || "",
      stock_quantity: product.stock_quantity ?? 0,
    });

    setProductImageFile(null);

    setProductImagePreview(product.image_url || "");

    setSection("products");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================
   DELETE PRODUCT
===================================== */

  const deleteProduct = async (product) => {
    const confirmed = window.confirm(
      `Delete "${product.name}${
        product.flavor ? ` - ${product.flavor}` : ""
      }"?`,
    );

    if (!confirmed) return;

    setSaving(true);
    setError("");
    setSuccess("");

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id);

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Product deleted successfully.");

      await loadData();
    }

    setSaving(false);
  };

  /* =====================================
   SAVE CATEGORY
===================================== */

  const saveCategory = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      let imageUrl = categoryForm.image_url || null;

      let mobileImageUrl = categoryForm.mobile_image_url || null;

      let bannerImageUrl = categoryForm.banner_image || null;

      if (categoryImageFile) {
        imageUrl = await uploadImage(
          categoryImageFile,
          "category-images",
          "categories",
        );
      }

      if (categoryMobileImageFile) {
        mobileImageUrl = await uploadImage(
          categoryMobileImageFile,
          "category-images",
          "categories/mobile",
        );
      }

      if (categoryBannerImageFile) {
        bannerImageUrl = await uploadImage(
          categoryBannerImageFile,
          "category-images",
          "categories/banners",
        );
      }

      const payload = {
        name: categoryForm.name.trim(),

        slug: categoryForm.slug.trim() || slugify(categoryForm.name),

        description: categoryForm.description.trim() || null,

        image_url: imageUrl,

        mobile_image_url: mobileImageUrl,

        alt_text: categoryForm.alt_text.trim() || null,

        promo_label: categoryForm.promo_label.trim() || null,

        display_order: Number(categoryForm.display_order || 0),

        featured_on_home: Boolean(categoryForm.featured_on_home),

        active: Boolean(categoryForm.active),

        seo_title: categoryForm.seo_title.trim() || null,

        seo_description: categoryForm.seo_description.trim() || null,

        battery: categoryForm.battery.trim() || null,

        capacity: categoryForm.capacity.trim() || null,

        nicotine_strength: categoryForm.nicotine_strength.trim() || null,

        puff_counts: categoryForm.puff_counts.trim() || null,

        charging: categoryForm.charging.trim() || null,

        special_feature: categoryForm.special_feature.trim() || null,

        banner_image: bannerImageUrl,
      };

      let result;

      if (categoryForm.id) {
        result = await supabase
          .from("categories")
          .update(payload)
          .eq("id", categoryForm.id);
      } else {
        result = await supabase.from("categories").insert(payload);
      }

      if (result.error) {
        throw result.error;
      }

      setSuccess(
        categoryForm.id
          ? "Category updated successfully."
          : "Category added successfully.",
      );

      resetCategoryForm();

      await loadData();
    } catch (error) {
      console.error("SAVE CATEGORY ERROR:", error);

      setError(error?.message || "Unable to save category.");
    } finally {
      setSaving(false);
    }
  };

  /* =====================================
   EDIT CATEGORY
===================================== */

  const editCategory = (category) => {
    setCategoryForm({
      id: category.id,

      name: category.name || "",

      slug: category.slug || "",

      description: category.description || "",

      image_url: category.image_url || "",

      mobile_image_url: category.mobile_image_url || "",

      alt_text: category.alt_text || "",

      promo_label: category.promo_label || "",

      display_order: category.display_order ?? 0,

      featured_on_home: category.featured_on_home === true,

      active: category.active !== false,

      seo_title: category.seo_title || "",

      seo_description: category.seo_description || "",

      battery: category.battery || "",

      capacity: category.capacity || "",

      nicotine_strength: category.nicotine_strength || "",

      puff_counts: category.puff_counts || "",

      charging: category.charging || "",

      special_feature: category.special_feature || "",

      banner_image: category.banner_image || "",
    });

    setCategoryImageFile(null);

    setCategoryImagePreview(category.image_url || "");

    setCategoryMobileImageFile(null);

    setCategoryMobileImagePreview(category.mobile_image_url || "");

    setCategoryBannerImageFile(null);

    setCategoryBannerImagePreview(category.banner_image || "");

    setSection("categories");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================
   DELETE CATEGORY
===================================== */

  const deleteCategory = async (category) => {
    const confirmed = window.confirm(`Delete "${category.name}"?`);

    if (!confirmed) return;

    setSaving(true);
    setError("");
    setSuccess("");

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", category.id);

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Category deleted successfully.");

      await loadData();
    }

    setSaving(false);
  };

  /* =====================================
   UPDATE ORDER STATUS
===================================== */

  const updateOrderStatus = async (order, status) => {
    setSaving(true);
    setError("");
    setSuccess("");

    const now = new Date().toISOString();

    const updatePayload = {
      order_status: status,
      updated_at: now,
    };

    if (status === "confirmed") {
      updatePayload.confirmed_at = now;
    }

    if (status === "shipped") {
      updatePayload.shipped_at = now;
    }

    if (status === "delivered") {
      updatePayload.delivered_at = now;
    }

    if (status === "cancelled" || status === "rejected") {
      updatePayload.cancelled_at = now;
    }

    const { error } = await supabase
      .from("orders")
      .update(updatePayload)
      .eq("id", order.id);

    if (error) {
      console.error("UPDATE ORDER STATUS ERROR:", error);

      setError(error.message);
    } else {
      setSuccess(
        `Order #${order.order_number || String(order.id).slice(0, 8)} updated.`,
      );

      await loadData();
    }

    setSaving(false);
  };

  /* =====================================
   LOADING
===================================== */

  if (loading) {
    return (
      <main className="admin-page">
        <div className="admin-container">Loading admin dashboard...</div>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-container">
        {/* =====================================
          HEADER
      ===================================== */}

        <header className="admin-header">
          <div>
            <span>VOZOL EGY</span>

            <h1>Admin Dashboard</h1>

            <p>Welcome, {profile?.full_name || "Administrator"}</p>
          </div>

          <button className="admin-logout" onClick={signOut}>
            Sign Out
          </button>
        </header>

        {/* =====================================
          MESSAGES
      ===================================== */}

        {error && (
          <div className="admin-message admin-message-error">{error}</div>
        )}

        {success && (
          <div className="admin-message admin-message-success">{success}</div>
        )}

        {/* =====================================
          TABS
      ===================================== */}

        <nav className="admin-tabs">
          {[
            ["overview", "Overview"],
            ["orders", "Orders"],
            ["customers", "Customers"],
            ["products", "Products"],
            ["categories", "Categories"],
          ].map(([key, label]) => (
            <button
              key={key}
              className={section === key ? "active" : ""}
              onClick={() => setSection(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* =====================================
          OVERVIEW
      ===================================== */}

        {section === "overview" && (
          <>
            <section className="admin-stats">
              <div className="admin-stat">
                <span>TOTAL ORDERS</span>
                <strong>{stats.totalOrders}</strong>
              </div>

              <div className="admin-stat">
                <span>PENDING</span>
                <strong>{stats.pending}</strong>
              </div>

              <div className="admin-stat">
                <span>REJECTED</span>
                <strong>{stats.rejected}</strong>
              </div>

              <div className="admin-stat">
                <span>CONFIRMED / DELIVERED</span>

                <strong>{stats.delivered}</strong>
              </div>

              <div className="admin-stat admin-stat-sales">
                <span>TOTAL SALES</span>

                <strong>{money(stats.sales)}</strong>

                <small>Confirmed / Delivered / Completed orders only</small>
              </div>
            </section>

            {/* RECENT ORDERS */}

            <section className="admin-card">
              <div className="admin-card-header">
                <h2>Recent Orders</h2>

                <button onClick={() => setSection("orders")}>View All</button>
              </div>

              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.slice(0, 8).map((order) => {
                      const customer = getOrderCustomer(order);

                      return (
                        <tr key={order.id}>
                          <td>
                            #
                            {order.order_number || String(order.id).slice(0, 8)}
                          </td>

                          <td>{customer.name}</td>

                          <td>{date(order.created_at)}</td>

                          <td>
                            <span className="admin-status">
                              {statusLabel(order.order_status)}
                            </span>
                          </td>

                          <td>{money(order.total_amount)}</td>
                        </tr>
                      );
                    })}

                    {orders.length === 0 && (
                      <tr>
                        <td
                          colSpan="5"
                          style={{
                            textAlign: "center",
                          }}
                        >
                          No orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {/* =====================================
          ORDERS
      ===================================== */}

        {section === "orders" && (
          <section className="admin-card">
            <div className="admin-card-header">
              <h2>Manage Orders</h2>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Customer</th>
                      <th>Phone</th>
                      <th>WhatsApp</th>
                      <th>Address</th>
                      <th>Products</th>
                      <th>Subtotal</th>
                      <th>Shipping Cost</th>
                      <th>Delivery</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((order) => {
                        const customer = getOrderCustomer(order);

                        return (
                          <tr key={order.id}>
                            {/* ORDER */}
                            <td>
                              <strong>
                                #
                                {order.order_number ||
                                  String(order.id).slice(0, 8)}
                              </strong>
                            </td>

                            {/* CUSTOMER */}
                            <td>
                              <strong>{customer.name || "Guest"}</strong>

                              {customer.email && (
                                <div className="admin-order-customer-email">
                                  {customer.email}
                                </div>
                              )}
                            </td>

                            {/* PHONE */}
                            <td>{customer.phone || "—"}</td>

                            {/* WHATSAPP */}
                            <td>{customer.whatsapp || "—"}</td>

                            {/* ADDRESS */}
                            <td>
                              <div className="admin-order-address">
                                {customer.governorate && (
                                  <div>
                                    <strong>Governorate:</strong>{" "}
                                    {customer.governorate}
                                  </div>
                                )}

                                {customer.city && (
                                  <div>
                                    <strong>City:</strong> {customer.city}
                                  </div>
                                )}

                                {customer.address && (
                                  <div>
                                    <strong>Address:</strong> {customer.address}
                                  </div>
                                )}

                                {!customer.governorate &&
                                  !customer.city &&
                                  !customer.address && <span>—</span>}
                              </div>
                            </td>

                            {/* PRODUCTS */}
                            <td>
                              <div className="admin-order-products">
                                {order.order_items &&
                                order.order_items.length > 0 ? (
                                  order.order_items.map((item) => {
                                    const categoryName = getProductCategory(
                                      item.product_id,
                                    );

                                    return (
                                      <div
                                        key={item.id}
                                        className="admin-order-product"
                                      >
                                        <div className="admin-order-product-name">
                                          {item.product_name || "Product"}
                                        </div>

                                        {item.flavor && (
                                          <div className="admin-order-product-flavor">
                                            {item.flavor}
                                          </div>
                                        )}

                                        <div className="admin-order-product-category">
                                          Category: {categoryName}
                                        </div>

                                        <div className="admin-order-product-details">
                                          {Number(
                                            item.unit_price || 0,
                                          ).toLocaleString("en-US")}{" "}
                                          {order.currency || "EGP"} ×{" "}
                                          {item.quantity || 0}
                                        </div>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <span>No products</span>
                                )}
                              </div>
                            </td>

                            {/* SUBTOTAL */}
                            <td>
                              <strong>
                                {Number(order.subtotal || 0).toLocaleString(
                                  "en-US",
                                )}{" "}
                                {order.currency || "EGP"}
                              </strong>
                            </td>

                            {/* SHIPPING COST */}
                            <td>
                              <strong>
                                {Number(
                                  order.shipping_cost || 0,
                                ).toLocaleString("en-US")}{" "}
                                {order.currency || "EGP"}
                              </strong>
                            </td>

                            {/* DELIVERY */}
                            <td>{order.delivery_method || "—"}</td>

                            {/* TOTAL */}
                            <td>
                              <strong>
                                {Number(order.total_amount || 0).toLocaleString(
                                  "en-US",
                                )}{" "}
                                {order.currency || "EGP"}
                              </strong>
                            </td>

                            {/* STATUS */}
                            <td>
                              <select
                                value={order.order_status || "pending"}
                                disabled={saving}
                                onChange={(event) =>
                                  updateOrderStatus(order, event.target.value)
                                }
                              >
                                {orderStatuses.map((status) => (
                                  <option key={status} value={status}>
                                    {statusLabel(status)}
                                  </option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="11" style={{ textAlign: "center" }}>
                          No orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>

              </table>
            </div>
          </section>
        )}

        {/* =====================================
          CUSTOMERS
      ===================================== */}

        {section === "customers" && (
          <section className="admin-card">
            <div className="admin-card-header">
              <h2>Customers</h2>

              <span>
                {
                  customers.filter((customer) => customer.role !== "admin")
                    .length
                }
              </span>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Created</th>
                  </tr>
                </thead>

                <tbody>
                  {customers
                    .filter((customer) => customer.role !== "admin")
                    .map((customer) => (
                      <tr key={customer.id}>
                        <td>{customer.full_name || "—"}</td>

                        <td>{customer.email || "—"}</td>

                        <td>{customer.phone || "—"}</td>

                        <td>{customer.role || "customer"}</td>

                        <td>{date(customer.created_at)}</td>
                      </tr>
                    ))}

                  {customers.filter((customer) => customer.role !== "admin")
                    .length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        style={{
                          textAlign: "center",
                        }}
                      >
                        No customers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* =====================================
          PRODUCTS
      ===================================== */}

        {section === "products" && (
          <>
            <section className="admin-card">
              <div className="admin-card-header">
                <h2>{productForm.id ? "Edit Product" : "Add Product"}</h2>

                {productForm.id && (
                  <button
                    type="button"
                    className="admin-secondary-button"
                    onClick={resetProductForm}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form className="admin-form" onSubmit={saveProduct}>
                <label>
                  Product Name
                  <input
                    value={productForm.name}
                    onChange={(event) =>
                      setProductForm({
                        ...productForm,
                        name: event.target.value,
                      })
                    }
                    required
                  />
                </label>

                <label>
                  Flavor
                  <input
                    value={productForm.flavor}
                    onChange={(event) =>
                      setProductForm({
                        ...productForm,
                        flavor: event.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Price
                  <input
                    type="number"
                    min="0"
                    value={productForm.price}
                    onChange={(event) =>
                      setProductForm({
                        ...productForm,
                        price: event.target.value,
                      })
                    }
                    required
                  />
                </label>

                <label>
                  Stock Quantity
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={productForm.stock_quantity}
                    onChange={(event) =>
                      setProductForm({
                        ...productForm,
                        stock_quantity: event.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Mode
                  <select
                    value={productForm.mode}
                    onChange={(event) =>
                      setProductForm({
                        ...productForm,
                        mode: event.target.value,
                      })
                    }
                  >
                    <option value="MTL">MTL</option>

                    <option value="DL">DL</option>
                  </select>
                </label>

                <label>
                  Category
                  <select
                    value={productForm.category_id}
                    onChange={(event) =>
                      setProductForm({
                        ...productForm,
                        category_id: event.target.value,
                      })
                    }
                  >
                    <option value="">No Category</option>

                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>

                {/* PRODUCT IMAGE */}

                <label className="admin-field-full">
                  Product Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProductImageChange}
                  />
                  {productImagePreview && (
                    <div className="admin-image-preview">
                      <img src={productImagePreview} alt="Product preview" />
                    </div>
                  )}
                </label>

                <label className="admin-checkbox">
                  <input
                    type="checkbox"
                    checked={productForm.available}
                    onChange={(event) =>
                      setProductForm({
                        ...productForm,
                        available: event.target.checked,
                      })
                    }
                  />
                  Available
                </label>

                <button
                  type="submit"
                  className="admin-primary-button"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : productForm.id
                      ? "Update Product"
                      : "Add Product"}
                </button>
              </form>
            </section>

            <section className="admin-card">
              <div className="admin-card-header">
                <h2>Products</h2>

                <span>{products.length}</span>
              </div>

              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Flavor</th>
                      <th>Price</th>
                      <th>Stock Quantity</th>
                      <th>Mode</th>
                      <th>Available</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.name || "Product"}
                              className="admin-product-table-image"
                            />
                          ) : (
                            "—"
                          )}
                        </td>
                        <td>{product.name}</td>

                        <td>{product.flavor || "—"}</td>

                        <td>{money(product.price)}</td>

                        <td>
                          <strong>{Number(product.stock_quantity || 0)}</strong>
                        </td>

                        <td>{product.mode || "—"}</td>

                        <td>{product.available ? "Yes" : "No"}</td>

                        <td>
                          <div className="admin-actions">
                            <button
                              type="button"
                              onClick={() => editProduct(product)}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="danger"
                              onClick={() => deleteProduct(product)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {products.length === 0 && (
                      <tr>
                        <td
                          colSpan="8"
                          style={{
                            textAlign: "center",
                          }}
                        >
                          No products found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {/* =====================================
          CATEGORIES
      ===================================== */}

        {section === "categories" && (
          <>
            <section className="admin-card">
              <div className="admin-card-header">
                <h2>{categoryForm.id ? "Edit Category" : "Add Category"}</h2>

                {categoryForm.id && (
                  <button
                    type="button"
                    className="admin-secondary-button"
                    onClick={resetCategoryForm}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form className="admin-form" onSubmit={saveCategory}>
                <label>
                  Name
                  <input
                    value={categoryForm.name}
                    onChange={(event) =>
                      setCategoryForm({
                        ...categoryForm,
                        name: event.target.value,
                      })
                    }
                    required
                  />
                </label>

                <label>
                  Slug
                  <input
                    value={categoryForm.slug}
                    onChange={(event) =>
                      setCategoryForm({
                        ...categoryForm,
                        slug: event.target.value,
                      })
                    }
                    placeholder="vozol-star-40k"
                    required
                  />
                </label>

                <label className="admin-field-full">
                  Description
                  <textarea
                    rows="4"
                    value={categoryForm.description}
                    onChange={(event) =>
                      setCategoryForm({
                        ...categoryForm,
                        description: event.target.value,
                      })
                    }
                  />
                </label>

                {/* MAIN CATEGORY IMAGE */}

                <label>
                  Main Category Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCategoryImageChange}
                  />
                  {categoryImagePreview && (
                    <div className="admin-image-preview">
                      <img src={categoryImagePreview} alt="Category preview" />
                    </div>
                  )}
                </label>

                {/* MOBILE CATEGORY IMAGE */}

                <label>
                  Mobile Category Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCategoryMobileImageChange}
                  />
                  {categoryMobileImagePreview && (
                    <div className="admin-image-preview">
                      <img
                        src={categoryMobileImagePreview}
                        alt="Mobile category preview"
                      />
                    </div>
                  )}
                </label>

                <label>
                  Alt Text
                  <input
                    value={categoryForm.alt_text}
                    onChange={(event) =>
                      setCategoryForm({
                        ...categoryForm,
                        alt_text: event.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Promo Label
                  <input
                    value={categoryForm.promo_label}
                    onChange={(event) =>
                      setCategoryForm({
                        ...categoryForm,
                        promo_label: event.target.value,
                      })
                    }
                    placeholder="NEW"
                  />
                </label>

                <label>
                  Display Order
                  <input
                    type="number"
                    value={categoryForm.display_order}
                    onChange={(event) =>
                      setCategoryForm({
                        ...categoryForm,
                        display_order: event.target.value,
                      })
                    }
                  />
                </label>

                <label className="admin-checkbox">
                  <input
                    type="checkbox"
                    checked={categoryForm.featured_on_home}
                    onChange={(event) =>
                      setCategoryForm({
                        ...categoryForm,
                        featured_on_home: event.target.checked,
                      })
                    }
                  />
                  Featured on Home
                </label>

                <label className="admin-checkbox">
                  <input
                    type="checkbox"
                    checked={categoryForm.active}
                    onChange={(event) =>
                      setCategoryForm({
                        ...categoryForm,
                        active: event.target.checked,
                      })
                    }
                  />
                  Active
                </label>

                <label>
                  SEO Title
                  <input
                    value={categoryForm.seo_title}
                    onChange={(event) =>
                      setCategoryForm({
                        ...categoryForm,
                        seo_title: event.target.value,
                      })
                    }
                  />
                </label>

                <label className="admin-field-full">
                  SEO Description
                  <textarea
                    rows="4"
                    value={categoryForm.seo_description}
                    onChange={(event) =>
                      setCategoryForm({
                        ...categoryForm,
                        seo_description: event.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Battery
                  <input
                    value={categoryForm.battery}
                    onChange={(event) =>
                      setCategoryForm({
                        ...categoryForm,
                        battery: event.target.value,
                      })
                    }
                    placeholder="650mAh"
                  />
                </label>

                <label>
                  Capacity
                  <input
                    value={categoryForm.capacity}
                    onChange={(event) =>
                      setCategoryForm({
                        ...categoryForm,
                        capacity: event.target.value,
                      })
                    }
                    placeholder="20ml"
                  />
                </label>

                <label>
                  Nicotine Strength
                  <input
                    value={categoryForm.nicotine_strength}
                    onChange={(event) =>
                      setCategoryForm({
                        ...categoryForm,
                        nicotine_strength: event.target.value,
                      })
                    }
                    placeholder="5%"
                  />
                </label>

                <label>
                  Puff Counts
                  <input
                    value={categoryForm.puff_counts}
                    onChange={(event) =>
                      setCategoryForm({
                        ...categoryForm,
                        puff_counts: event.target.value,
                      })
                    }
                    placeholder="40000"
                  />
                </label>

                <label>
                  Charging
                  <input
                    value={categoryForm.charging}
                    onChange={(event) =>
                      setCategoryForm({
                        ...categoryForm,
                        charging: event.target.value,
                      })
                    }
                    placeholder="Type-C"
                  />
                </label>

                <label>
                  Special Feature
                  <input
                    value={categoryForm.special_feature}
                    onChange={(event) =>
                      setCategoryForm({
                        ...categoryForm,
                        special_feature: event.target.value,
                      })
                    }
                  />
                </label>

                {/* BANNER IMAGE */}

                <label className="admin-field-full">
                  Banner Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCategoryBannerImageChange}
                  />
                  {categoryBannerImagePreview && (
                    <div className="admin-image-preview">
                      <img
                        src={categoryBannerImagePreview}
                        alt="Banner preview"
                      />
                    </div>
                  )}
                </label>

                <button
                  type="submit"
                  className="admin-primary-button"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : categoryForm.id
                      ? "Update Category"
                      : "Add Category"}
                </button>
              </form>
            </section>

            <section className="admin-card">
              <div className="admin-card-header">
                <h2>Categories</h2>

                <span>{categories.length}</span>
              </div>

              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Main Image</th>
                      <th>Mobile Image</th>
                      <th>Name</th>
                      <th>Slug</th>
                      <th>Description</th>
                      <th>Alt Text</th>
                      <th>Promo Label</th>
                      <th>Display Order</th>
                      <th>Featured on Home</th>
                      <th>Active</th>
                      <th>SEO Title</th>
                      <th>SEO Description</th>
                      <th>Battery</th>
                      <th>Capacity</th>
                      <th>Nicotine Strength</th>
                      <th>Puff Counts</th>
                      <th>Charging</th>
                      <th>Special Feature</th>
                      <th>Banner Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {categories.map((category) => (
                      <tr key={category.id}>
                        <td>
                          {category.image_url ? (
                            <img
                              src={category.image_url}
                              alt={
                                category.alt_text || category.name || "Category"
                              }
                              className="admin-category-table-image"
                            />
                          ) : (
                            "—"
                          )}
                        </td>

                        <td>
                          {category.mobile_image_url ? (
                            <img
                              src={category.mobile_image_url}
                              alt={
                                category.alt_text || category.name || "Category"
                              }
                              className="admin-category-table-image"
                            />
                          ) : (
                            "—"
                          )}
                        </td>

                        <td>{category.name || "—"}</td>

                        <td>{category.slug || "—"}</td>

                        <td>
                          <div className="admin-description-box">
                            {category.description || "—"}
                          </div>
                        </td>

                        <td>{category.alt_text || "—"}</td>

                        <td>{category.promo_label || "—"}</td>

                        <td>{category.display_order ?? 0}</td>

                        <td>{category.featured_on_home ? "Yes" : "No"}</td>

                        <td>{category.active ? "Yes" : "No"}</td>

                        <td>{category.seo_title || "—"}</td>

                        <td>{category.seo_description || "—"}</td>

                        <td>{category.battery || "—"}</td>

                        <td>{category.capacity || "—"}</td>

                        <td>{category.nicotine_strength || "—"}</td>

                        <td>{category.puff_counts || "—"}</td>

                        <td>{category.charging || "—"}</td>

                        <td>{category.special_feature || "—"}</td>

                        <td>
                          {category.banner_image ? (
                            <img
                              src={category.banner_image}
                              alt={category.name || "Banner"}
                              className="admin-category-banner-image"
                            />
                          ) : (
                            "—"
                          )}
                        </td>

                        <td>
                          <div className="admin-actions">
                            <button
                              type="button"
                              onClick={() => editCategory(category)}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="danger"
                              onClick={() => deleteCategory(category)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {categories.length === 0 && (
                      <tr>
                        <td
                          colSpan="20"
                          style={{
                            textAlign: "center",
                          }}
                        >
                          No categories found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default AdminDashboardPage;
