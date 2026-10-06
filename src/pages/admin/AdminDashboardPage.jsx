import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useAuth,
} from "../../contexts/AuthContext";

import {
  supabase,
} from "../../lib/supabase";

import "./AdminDashboard.css";

const money = (value) =>
  new Intl.NumberFormat(
    "en-EG",
    {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 0,
    }
  ).format(Number(value || 0));

const date = (value) =>
  value
    ? new Intl.DateTimeFormat(
        "en-EG",
        {
          dateStyle: "medium",
          timeStyle: "short",
        }
      ).format(new Date(value))
    : "—";

const statusLabel = (value) =>
  String(value || "pending")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );

const salesStatuses = [
  "confirmed",
  "delivered",
  "completed",
];

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
  const {
    profile,
    signOut,
  } = useAuth();

  const [section, setSection] =
    useState("overview");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [orders, setOrders] =
    useState([]);

  const [customers, setCustomers] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [productForm, setProductForm] =
    useState({
      id: null,
      name: "",
      flavor: "",
      price: "",
      mode: "MTL",
      available: true,
      category_id: "",
      image_url: "",
    });

  const [categoryForm, setCategoryForm] =
    useState({
      id: null,
      name: "",
      slug: "",
      description: "",
      active: true,
      display_order: 0,
    });

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [
        ordersResult,
        customersResult,
        productsResult,
        categoriesResult,
      ] = await Promise.all([
        supabase
          .from("orders")
          .select(`
            id,
            user_id,
            order_number,
            status,
            total_amount,
            currency,
            shipping_address,
            created_at,
            updated_at,
            order_items (
              id,
              product_name,
              flavor,
              quantity,
              unit_price
            )
          `)
          .order("created_at", {
            ascending: false,
          }),

        supabase
          .from("profiles")
          .select(`
            id,
            email,
            full_name,
            phone,
            whatsapp,
            governorate,
            city,
            full_address,
            role,
            created_at
          `)
          .order("created_at", {
            ascending: false,
          }),

        supabase
          .from("products")
          .select(`
            id,
            name,
            flavor,
            price,
            mode,
            available,
            category_id,
            image_url
          `)
          .order("name"),

        supabase
          .from("categories")
          .select(`
            id,
            name,
            slug,
            description,
            active,
            display_order
          `)
          .order("display_order"),
      ]);

      if (ordersResult.error)
        throw ordersResult.error;

      if (customersResult.error)
        throw customersResult.error;

      if (productsResult.error)
        throw productsResult.error;

      if (categoriesResult.error)
        throw categoriesResult.error;

      setOrders(
        ordersResult.data || []
      );

      setCustomers(
        customersResult.data || []
      );

      setProducts(
        productsResult.data || []
      );

      setCategories(
        categoriesResult.data || []
      );
    } catch (error) {
      console.error(
        "ADMIN LOAD ERROR:",
        error
      );

      setError(
        error.message ||
          "Unable to load admin data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const stats = useMemo(() => {
    const pending =
      orders.filter(
        (order) =>
          String(
            order.status
          ).toLowerCase() ===
          "pending"
      ).length;

    const rejected =
      orders.filter((order) =>
        [
          "rejected",
          "cancelled",
        ].includes(
          String(
            order.status
          ).toLowerCase()
        )
      ).length;

    const delivered =
      orders.filter((order) =>
        [
          "confirmed",
          "delivered",
          "completed",
        ].includes(
          String(
            order.status
          ).toLowerCase()
        )
      ).length;

    const sales =
      orders
        .filter((order) =>
          salesStatuses.includes(
            String(
              order.status
            ).toLowerCase()
          )
        )
        .reduce(
          (total, order) =>
            total +
            Number(
              order.total_amount || 0
            ),
          0
        );

    return {
      totalOrders:
        orders.length,
      pending,
      rejected,
      delivered,
      sales,
    };
  }, [orders]);

  const customerMap = useMemo(() => {
    return customers.reduce(
      (map, customer) => {
        map[customer.id] =
          customer;

        return map;
      },
      {}
    );
  }, [customers]);

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
    });
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      id: null,
      name: "",
      slug: "",
      description: "",
      active: true,
      display_order: 0,
    });
  };

  const saveProduct = async (
    event
  ) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        name:
          productForm.name.trim(),
        flavor:
          productForm.flavor.trim() ||
          null,
        price:
          Number(
            productForm.price
          ),
        mode:
          productForm.mode || null,
        available:
          Boolean(
            productForm.available
          ),
        category_id:
          productForm.category_id ||
          null,
        image_url:
          productForm.image_url.trim() ||
          null,
      };

      let result;

      if (productForm.id) {
        result =
          await supabase
            .from("products")
            .update(payload)
            .eq(
              "id",
              productForm.id
            );
      } else {
        result =
          await supabase
            .from("products")
            .insert(payload);
      }

      if (result.error)
        throw result.error;

      setSuccess(
        productForm.id
          ? "Product updated successfully."
          : "Product added successfully."
      );

      resetProductForm();

      await loadData();
    } catch (error) {
      setError(
        error.message
      );
    } finally {
      setSaving(false);
    }
  };

  const editProduct = (
    product
  ) => {
    setProductForm({
      id: product.id,
      name:
        product.name || "",
      flavor:
        product.flavor || "",
      price:
        product.price ?? "",
      mode:
        product.mode || "MTL",
      available:
        product.available !== false,
      category_id:
        product.category_id || "",
      image_url:
        product.image_url || "",
    });

    setSection("products");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteProduct = async (
    product
  ) => {
    const confirmed =
      window.confirm(
        `Delete "${product.name}${product.flavor ? ` - ${product.flavor}` : ""}"?`
      );

    if (!confirmed)
      return;

    setSaving(true);
    setError("");

    const {
      error,
    } =
      await supabase
        .from("products")
        .delete()
        .eq(
          "id",
          product.id
        );

    if (error) {
      setError(
        error.message
      );
    } else {
      setSuccess(
        "Product deleted successfully."
      );

      await loadData();
    }

    setSaving(false);
  };

  const saveCategory = async (
    event
  ) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        name:
          categoryForm.name.trim(),
        slug:
          categoryForm.slug.trim() ||
          slugify(
            categoryForm.name
          ),
        description:
          categoryForm.description.trim() ||
          null,
        active:
          Boolean(
            categoryForm.active
          ),
        display_order:
          Number(
            categoryForm.display_order || 0
          ),
      };

      let result;

      if (categoryForm.id) {
        result =
          await supabase
            .from("categories")
            .update(payload)
            .eq(
              "id",
              categoryForm.id
            );
      } else {
        result =
          await supabase
            .from("categories")
            .insert(payload);
      }

      if (result.error)
        throw result.error;

      setSuccess(
        categoryForm.id
          ? "Category updated successfully."
          : "Category added successfully."
      );

      resetCategoryForm();

      await loadData();
    } catch (error) {
      setError(
        error.message
      );
    } finally {
      setSaving(false);
    }
  };

  const editCategory = (
    category
  ) => {
    setCategoryForm({
      id: category.id,
      name:
        category.name || "",
      slug:
        category.slug || "",
      description:
        category.description ||
        "",
      active:
        category.active !== false,
      display_order:
        category.display_order ||
        0,
    });

    setSection(
      "categories"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteCategory = async (
    category
  ) => {
    const confirmed =
      window.confirm(
        `Delete "${category.name}"?`
      );

    if (!confirmed)
      return;

    setSaving(true);
    setError("");

    const {
      error,
    } =
      await supabase
        .from("categories")
        .delete()
        .eq(
          "id",
          category.id
        );

    if (error) {
      setError(
        error.message
      );
    } else {
      setSuccess(
        "Category deleted successfully."
      );

      await loadData();
    }

    setSaving(false);
  };

  const updateOrderStatus = async (
    order,
    status
  ) => {
    setSaving(true);
    setError("");
    setSuccess("");

    const {
      error,
    } =
      await supabase
        .from("orders")
        .update({
          status,
          updated_at:
            new Date().toISOString(),
        })
        .eq(
          "id",
          order.id
        );

    if (error) {
      setError(
        error.message
      );
    } else {
      setSuccess(
        `Order #${
          order.order_number ||
          String(
            order.id
          ).slice(0, 8)
        } updated.`
      );

      await loadData();
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <main className="admin-page">
        <div className="admin-container">
          Loading admin dashboard...
        </div>
      </main>
    );
  }

  return (
    <main className="admin-page">

      <div className="admin-container">

        <header className="admin-header">

          <div>
            <span>
              VOZOL EGY
            </span>

            <h1>
              Admin Dashboard
            </h1>

            <p>
              Welcome,{" "}
              {profile?.full_name ||
                "Administrator"}
            </p>
          </div>

          <button
            className="admin-logout"
            onClick={signOut}
          >
            Sign Out
          </button>

        </header>

        {error && (
          <div className="admin-message admin-message-error">
            {error}
          </div>
        )}

        {success && (
          <div className="admin-message admin-message-success">
            {success}
          </div>
        )}

        <nav className="admin-tabs">

          {[
            ["overview", "Overview"],
            ["orders", "Orders"],
            ["customers", "Customers"],
            ["products", "Products"],
            ["categories", "Categories"],
          ].map(
            ([key, label]) => (
              <button
                key={key}
                className={
                  section === key
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSection(key)
                }
              >
                {label}
              </button>
            )
          )}

        </nav>

        {/* =====================================
            OVERVIEW
        ===================================== */}

        {section === "overview" && (
          <>

            <section className="admin-stats">

              <div className="admin-stat">
                <span>
                  TOTAL ORDERS
                </span>

                <strong>
                  {stats.totalOrders}
                </strong>
              </div>

              <div className="admin-stat">
                <span>
                  PENDING
                </span>

                <strong>
                  {stats.pending}
                </strong>
              </div>

              <div className="admin-stat">
                <span>
                  REJECTED
                </span>

                <strong>
                  {stats.rejected}
                </strong>
              </div>

              <div className="admin-stat">
                <span>
                  CONFIRMED / DELIVERED
                </span>

                <strong>
                  {stats.delivered}
                </strong>
              </div>

              <div className="admin-stat admin-stat-sales">
                <span>
                  TOTAL SALES
                </span>

                <strong>
                  {money(
                    stats.sales
                  )}
                </strong>

                <small>
                  Confirmed / Delivered / Completed orders only
                </small>
              </div>

            </section>

            <section className="admin-card">

              <div className="admin-card-header">
                <h2>
                  Recent Orders
                </h2>

                <button
                  onClick={() =>
                    setSection(
                      "orders"
                    )
                  }
                >
                  View All
                </button>
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

                    {orders
                      .slice(0, 8)
                      .map(
                        (order) => {
                          const customer =
                            customerMap[
                              order.user_id
                            ];

                          return (
                            <tr
                              key={
                                order.id
                              }
                            >
                              <td>
                                #
                                {order.order_number ||
                                  String(
                                    order.id
                                  ).slice(
                                    0,
                                    8
                                  )}
                              </td>

                              <td>
                                {customer?.full_name ||
                                  customer?.email ||
                                  "Guest"}
                              </td>

                              <td>
                                {date(
                                  order.created_at
                                )}
                              </td>

                              <td>
                                <span className="admin-status">
                                  {statusLabel(
                                    order.status
                                  )}
                                </span>
                              </td>

                              <td>
                                {money(
                                  order.total_amount
                                )}
                              </td>
                            </tr>
                          );
                        }
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
              <h2>
                Manage Orders
              </h2>
            </div>

            <div className="admin-table-wrapper">

              <table className="admin-table">

                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {orders.map(
                    (order) => {
                      const customer =
                        customerMap[
                          order.user_id
                        ];

                      return (
                        <tr
                          key={
                            order.id
                          }
                        >

                          <td>
                            #
                            {order.order_number ||
                              String(
                                order.id
                              ).slice(
                                0,
                                8
                              )}
                          </td>

                          <td>
                            <strong>
                              {customer?.full_name ||
                                "Guest"}
                            </strong>

                            <small>
                              {customer?.phone ||
                                customer?.email ||
                                ""}
                            </small>
                          </td>

                          <td>
                            {date(
                              order.created_at
                            )}
                          </td>

                          <td>
                            {money(
                              order.total_amount
                            )}
                          </td>

                          <td>
                            <select
                              value={
                                order.status ||
                                "pending"
                              }
                              disabled={
                                saving
                              }
                              onChange={(
                                event
                              ) =>
                                updateOrderStatus(
                                  order,
                                  event
                                    .target
                                    .value
                                )
                              }
                            >

                              {orderStatuses.map(
                                (
                                  status
                                ) => (
                                  <option
                                    key={
                                      status
                                    }
                                    value={
                                      status
                                    }
                                  >
                                    {statusLabel(
                                      status
                                    )}
                                  </option>
                                )
                              )}

                            </select>
                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          </section>
        )}

        {/* =====================================
            CUSTOMERS
        ===================================== */}

        {section ===
          "customers" && (
          <section className="admin-card">

            <div className="admin-card-header">
              <h2>
                Customers
              </h2>

              <span>
                {customers.length}
              </span>
            </div>

            <div className="admin-table-wrapper">

              <table className="admin-table">

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>WhatsApp</th>
                    <th>Location</th>
                    <th>Address</th>
                  </tr>
                </thead>

                <tbody>

                  {customers
                    .filter(
                      (customer) =>
                        customer.role !==
                        "admin"
                    )
                    .map(
                      (customer) => (
                        <tr
                          key={
                            customer.id
                          }
                        >

                          <td>
                            {customer.full_name ||
                              "—"}
                          </td>

                          <td>
                            {customer.email ||
                              "—"}
                          </td>

                          <td>
                            {customer.phone ||
                              "—"}
                          </td>

                          <td>
                            {customer.whatsapp ||
                              "—"}
                          </td>

                          <td>
                            {customer.governorate ||
                              "—"}
                            {customer.city
                              ? ` / ${customer.city}`
                              : ""}
                          </td>

                          <td className="admin-address-cell">
                            {customer.full_address ||
                              "—"}
                          </td>

                        </tr>
                      )
                    )}

                </tbody>

              </table>

            </div>

          </section>
        )}

        {/* =====================================
            PRODUCTS
        ===================================== */}

        {section ===
          "products" && (
          <>

            <section className="admin-card">

              <div className="admin-card-header">
                <h2>
                  {productForm.id
                    ? "Edit Product"
                    : "Add Product"}
                </h2>

                {productForm.id && (
                  <button
                    className="admin-secondary-button"
                    onClick={
                      resetProductForm
                    }
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form
                className="admin-form"
                onSubmit={
                  saveProduct
                }
              >

                <label>
                  Product Name

                  <input
                    value={
                      productForm.name
                    }
                    onChange={(
                      event
                    ) =>
                      setProductForm(
                        {
                          ...productForm,
                          name: event
                            .target
                            .value,
                        }
                      )
                    }
                    required
                  />
                </label>

                <label>
                  Flavor

                  <input
                    value={
                      productForm.flavor
                    }
                    onChange={(
                      event
                    ) =>
                      setProductForm(
                        {
                          ...productForm,
                          flavor:
                            event
                              .target
                              .value,
                        }
                      )
                    }
                  />
                </label>

                <label>
                  Price

                  <input
                    type="number"
                    min="0"
                    value={
                      productForm.price
                    }
                    onChange={(
                      event
                    ) =>
                      setProductForm(
                        {
                          ...productForm,
                          price:
                            event
                              .target
                              .value,
                        }
                      )
                    }
                    required
                  />
                </label>

                <label>
                  Mode

                  <select
                    value={
                      productForm.mode
                    }
                    onChange={(
                      event
                    ) =>
                      setProductForm(
                        {
                          ...productForm,
                          mode:
                            event
                              .target
                              .value,
                        }
                      )
                    }
                  >
                    <option value="MTL">
                      MTL
                    </option>

                    <option value="DL">
                      DL
                    </option>
                  </select>
                </label>

                <label>
                  Category

                  <select
                    value={
                      productForm.category_id
                    }
                    onChange={(
                      event
                    ) =>
                      setProductForm(
                        {
                          ...productForm,
                          category_id:
                            event
                              .target
                              .value,
                        }
                      )
                    }
                  >

                    <option value="">
                      No Category
                    </option>

                    {categories.map(
                      (category) => (
                        <option
                          key={
                            category.id
                          }
                          value={
                            category.id
                          }
                        >
                          {
                            category.name
                          }
                        </option>
                      )
                    )}

                  </select>
                </label>

                <label>
                  Image URL

                  <input
                    value={
                      productForm.image_url
                    }
                    onChange={(
                      event
                    ) =>
                      setProductForm(
                        {
                          ...productForm,
                          image_url:
                            event
                              .target
                              .value,
                        }
                      )
                    }
                    placeholder="https://..."
                  />
                </label>

                <label className="admin-checkbox">
                  <input
                    type="checkbox"
                    checked={
                      productForm.available
                    }
                    onChange={(
                      event
                    ) =>
                      setProductForm(
                        {
                          ...productForm,
                          available:
                            event
                              .target
                              .checked,
                        }
                      )
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
                <h2>
                  Products
                </h2>

                <span>
                  {products.length}
                </span>
              </div>

              <div className="admin-table-wrapper">

                <table className="admin-table">

                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Flavor</th>
                      <th>Price</th>
                      <th>Mode</th>
                      <th>Available</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>

                    {products.map(
                      (product) => (
                        <tr
                          key={
                            product.id
                          }
                        >

                          <td>
                            {product.name}
                          </td>

                          <td>
                            {product.flavor ||
                              "—"}
                          </td>

                          <td>
                            {money(
                              product.price
                            )}
                          </td>

                          <td>
                            {product.mode ||
                              "—"}
                          </td>

                          <td>
                            {product.available
                              ? "Yes"
                              : "No"}
                          </td>

                          <td>
                            <div className="admin-actions">

                              <button
                                onClick={() =>
                                  editProduct(
                                    product
                                  )
                                }
                              >
                                Edit
                              </button>

                              <button
                                className="danger"
                                onClick={() =>
                                  deleteProduct(
                                    product
                                  )
                                }
                              >
                                Delete
                              </button>

                            </div>
                          </td>

                        </tr>
                      )
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

        {section ===
          "categories" && (
          <>

            <section className="admin-card">

              <div className="admin-card-header">

                <h2>
                  {categoryForm.id
                    ? "Edit Category"
                    : "Add Category"}
                </h2>

                {categoryForm.id && (
                  <button
                    className="admin-secondary-button"
                    onClick={
                      resetCategoryForm
                    }
                  >
                    Cancel Edit
                  </button>
                )}

              </div>

              <form
                className="admin-form"
                onSubmit={
                  saveCategory
                }
              >

                <label>
                  Category Name

                  <input
                    value={
                      categoryForm.name
                    }
                    onChange={(
                      event
                    ) =>
                      setCategoryForm(
                        {
                          ...categoryForm,
                          name:
                            event
                              .target
                              .value,
                        }
                      )
                    }
                    required
                  />
                </label>

                <label>
                  Slug

                  <input
                    value={
                      categoryForm.slug
                    }
                    onChange={(
                      event
                    ) =>
                      setCategoryForm(
                        {
                          ...categoryForm,
                          slug:
                            event
                              .target
                              .value,
                        }
                      )
                    }
                    placeholder="vozol-star-40k"
                    required
                  />
                </label>

                <label>
                  Display Order

                  <input
                    type="number"
                    value={
                      categoryForm.display_order
                    }
                    onChange={(
                      event
                    ) =>
                      setCategoryForm(
                        {
                          ...categoryForm,
                          display_order:
                            event
                              .target
                              .value,
                        }
                      )
                    }
                  />
                </label>

                <label className="admin-checkbox">
                  <input
                    type="checkbox"
                    checked={
                      categoryForm.active
                    }
                    onChange={(
                      event
                    ) =>
                      setCategoryForm(
                        {
                          ...categoryForm,
                          active:
                            event
                              .target
                              .checked,
                        }
                      )
                    }
                  />

                  Active
                </label>

                <label className="admin-field-full">
                  Description

                  <textarea
                    rows="4"
                    value={
                      categoryForm.description
                    }
                    onChange={(
                      event
                    ) =>
                      setCategoryForm(
                        {
                          ...categoryForm,
                          description:
                            event
                              .target
                              .value,
                        }
                      )
                    }
                  />
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
                <h2>
                  Categories
                </h2>

                <span>
                  {categories.length}
                </span>
              </div>

              <div className="admin-table-wrapper">

                <table className="admin-table">

                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Slug</th>
                      <th>Order</th>
                      <th>Active</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>

                    {categories.map(
                      (category) => (
                        <tr
                          key={
                            category.id
                          }
                        >

                          <td>
                            {category.name}
                          </td>

                          <td>
                            {category.slug}
                          </td>

                          <td>
                            {
                              category.display_order
                            }
                          </td>

                          <td>
                            {category.active
                              ? "Yes"
                              : "No"}
                          </td>

                          <td>
                            <div className="admin-actions">

                              <button
                                onClick={() =>
                                  editCategory(
                                    category
                                  )
                                }
                              >
                                Edit
                              </button>

                              <button
                                className="danger"
                                onClick={() =>
                                  deleteCategory(
                                    category
                                  )
                                }
                              >
                                Delete
                              </button>

                            </div>
                          </td>

                        </tr>
                      )
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