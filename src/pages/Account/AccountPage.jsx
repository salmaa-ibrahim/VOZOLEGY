import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  useAuth,
} from "../../contexts/AuthContext";

import {
  supabase,
} from "../../lib/supabase";

import "./AccountPage.css";

const money = (value) =>
  new Intl.NumberFormat(
    "en-EG",
    {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 0,
    }
  ).format(Number(value || 0));

const formatDate = (value) => {
  if (!value) return "—";

  return new Intl.DateTimeFormat(
    "en-EG",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  ).format(new Date(value));
};

const statusLabel = (status) => {
  return String(status || "pending")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
};

const statusClass = (status) => {
  return String(status || "pending")
    .toLowerCase()
    .replaceAll("_", "-");
};

const AccountPage = () => {
  const {
    user,
    profile,
    signOut,
    refreshProfile,
  } = useAuth();

  const [orders, setOrders] =
    useState([]);

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [formData, setFormData] =
    useState({
      full_name: "",
      phone: "",
      whatsapp: "",
      governorate: "",
      city: "",
      full_address: "",
    });

  useEffect(() => {
    if (!profile) return;

    setFormData({
      full_name:
        profile.full_name || "",
      phone:
        profile.phone || "",
      whatsapp:
        profile.whatsapp || "",
      governorate:
        profile.governorate || "",
      city:
        profile.city || "",
      full_address:
        profile.full_address || "",
    });
  }, [profile]);

  useEffect(() => {
    const loadOrders = async () => {
      if (!user?.id) return;

      setLoading(true);
      setError("");

      const {
        data,
        error,
      } = await supabase
        .from("orders")
        .select(`
          id,
          order_number,
          status,
          total_amount,
          currency,
          shipping_address,
          notes,
          created_at,
          updated_at,
          order_items (
            id,
            product_id,
            product_name,
            flavor,
            quantity,
            unit_price
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(
          "ACCOUNT ORDERS ERROR:",
          error
        );

        setError(
          error.message
        );
      } else {
        setOrders(data || []);
      }

      setLoading(false);
    };

    loadOrders();
  }, [user?.id]);

  const totalOrders =
    orders.length;

  const completedOrders =
    orders.filter((order) =>
      [
        "confirmed",
        "delivered",
        "completed",
      ].includes(
        String(order.status)
          .toLowerCase()
      )
    );

  const totalSpent = useMemo(() => {
    return completedOrders.reduce(
      (total, order) =>
        total +
        Number(
          order.total_amount || 0
        ),
      0
    );
  }, [completedOrders]);

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSaveProfile = async (
    event
  ) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    const {
      error,
    } = await supabase
      .from("profiles")
      .update({
        full_name:
          formData.full_name,
        phone:
          formData.phone,
        whatsapp:
          formData.whatsapp,
        governorate:
          formData.governorate,
        city:
          formData.city,
        full_address:
          formData.full_address,
        updated_at:
          new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      setError(
        error.message
      );
    } else {
      await refreshProfile();

      setSuccess(
        "Your profile has been updated successfully."
      );
    }

    setSaving(false);
  };

  const parseShippingAddress = (
    shippingAddress
  ) => {
    if (!shippingAddress) {
      return null;
    }

    try {
      return JSON.parse(
        shippingAddress
      );
    } catch {
      return {
        fullAddress:
          shippingAddress,
      };
    }
  };

  return (
    <main className="account-page">
      <div className="account-container">

        <div className="account-top">

          <div>
            <span className="account-eyebrow">
              VOZOL EGY
            </span>

            <h1>
              My Account
            </h1>

            <p>
              Welcome back,{" "}
              {profile?.full_name ||
                "Customer"}
              .
            </p>
          </div>

          <button
            className="account-signout"
            onClick={signOut}
          >
            Sign Out
          </button>

        </div>

        {error && (
          <div className="account-message account-message-error">
            {error}
          </div>
        )}

        {success && (
          <div className="account-message account-message-success">
            {success}
          </div>
        )}

        {/* =====================================
            SUMMARY
        ===================================== */}

        <section className="account-stats">

          <div className="account-stat">
            <span>ORDERS</span>
            <strong>
              {totalOrders}
            </strong>
          </div>

          <div className="account-stat">
            <span>COMPLETED</span>
            <strong>
              {completedOrders.length}
            </strong>
          </div>

          <div className="account-stat">
            <span>TOTAL SPENT</span>
            <strong>
              {money(totalSpent)}
            </strong>
          </div>

        </section>

        {/* =====================================
            PROFILE
        ===================================== */}

        <section className="account-card">

          <div className="account-card-header">
            <div>
              <span>
                PERSONAL INFORMATION
              </span>

              <h2>
                My Details
              </h2>
            </div>
          </div>

          <form
            className="account-form"
            onSubmit={
              handleSaveProfile
            }
          >

            <label>
              Full Name

              <input
                name="full_name"
                value={
                  formData.full_name
                }
                onChange={
                  handleChange
                }
                required
              />
            </label>

            <label>
              Email

              <input
                value={
                  user?.email || ""
                }
                disabled
              />
            </label>

            <label>
              Phone

              <input
                name="phone"
                value={
                  formData.phone
                }
                onChange={
                  handleChange
                }
                required
              />
            </label>

            <label>
              WhatsApp

              <input
                name="whatsapp"
                value={
                  formData.whatsapp
                }
                onChange={
                  handleChange
                }
                required
              />
            </label>

            <label>
              Governorate

              <input
                name="governorate"
                value={
                  formData.governorate
                }
                onChange={
                  handleChange
                }
                required
              />
            </label>

            <label>
              City

              <input
                name="city"
                value={
                  formData.city
                }
                onChange={
                  handleChange
                }
                required
              />
            </label>

            <label className="account-field-full">
              Full Address

              <textarea
                name="full_address"
                value={
                  formData.full_address
                }
                onChange={
                  handleChange
                }
                rows="4"
                required
              />
            </label>

            <button
              type="submit"
              className="account-primary-button"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </form>

        </section>

        {/* =====================================
            ORDERS
        ===================================== */}

        <section className="account-card">

          <div className="account-card-header">
            <div>
              <span>
                ORDER HISTORY
              </span>

              <h2>
                My Orders
              </h2>
            </div>
          </div>

          {loading ? (
            <div className="account-empty">
              Loading orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="account-empty">
              <p>
                You don't have any orders yet.
              </p>

              <Link
                to="/"
                className="account-primary-button account-shop-button"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="account-orders">

              {orders.map((order) => (
                <button
                  key={order.id}
                  className="account-order"
                  onClick={() =>
                    setSelectedOrder(
                      order
                    )
                  }
                >

                  <div>
                    <strong>
                      #
                      {order.order_number ||
                        String(
                          order.id
                        ).slice(0, 8)}
                    </strong>

                    <span>
                      {formatDate(
                        order.created_at
                      )}
                    </span>
                  </div>

                  <span
                    className={`account-status account-status-${statusClass(
                      order.status
                    )}`}
                  >
                    {statusLabel(
                      order.status
                    )}
                  </span>

                  <strong>
                    {money(
                      order.total_amount
                    )}
                  </strong>

                </button>
              ))}

            </div>
          )}

        </section>

        {/* =====================================
            ORDER DETAILS
        ===================================== */}

        {selectedOrder && (
          <section className="account-card">

            <div className="account-card-header">

              <div>
                <span>
                  ORDER DETAILS
                </span>

                <h2>
                  #
                  {selectedOrder.order_number ||
                    String(
                      selectedOrder.id
                    ).slice(0, 8)}
                </h2>
              </div>

              <button
                className="account-close-button"
                onClick={() =>
                  setSelectedOrder(
                    null
                  )
                }
              >
                Close
              </button>

            </div>

            <div className="account-order-details">

              <div className="account-order-meta">

                <div>
                  <span>Status</span>

                  <strong>
                    {statusLabel(
                      selectedOrder.status
                    )}
                  </strong>
                </div>

                <div>
                  <span>Date</span>

                  <strong>
                    {formatDate(
                      selectedOrder.created_at
                    )}
                  </strong>
                </div>

                <div>
                  <span>Total</span>

                  <strong>
                    {money(
                      selectedOrder.total_amount
                    )}
                  </strong>
                </div>

              </div>

              <h3>
                Products
              </h3>

              <div className="account-order-items">

                {(
                  selectedOrder.order_items ||
                  []
                ).map((item) => (
                  <div
                    key={item.id}
                    className="account-order-item"
                  >

                    <div>
                      <strong>
                        {item.product_name}
                      </strong>

                      {item.flavor && (
                        <span>
                          {item.flavor}
                        </span>
                      )}
                    </div>

                    <span>
                      × {item.quantity}
                    </span>

                    <strong>
                      {money(
                        Number(
                          item.unit_price
                        ) *
                          Number(
                            item.quantity
                          )
                      )}
                    </strong>

                  </div>
                ))}

              </div>

              {(() => {
                const shipping =
                  parseShippingAddress(
                    selectedOrder.shipping_address
                  );

                if (!shipping) {
                  return null;
                }

                return (
                  <div className="account-shipping">

                    <h3>
                      Delivery Information
                    </h3>

                    <p>
                      <strong>
                        Name:
                      </strong>{" "}
                      {shipping.fullName ||
                        "—"}
                    </p>

                    <p>
                      <strong>
                        Phone:
                      </strong>{" "}
                      {shipping.phone ||
                        "—"}
                    </p>

                    <p>
                      <strong>
                        WhatsApp:
                      </strong>{" "}
                      {shipping.whatsapp ||
                        "—"}
                    </p>

                    <p>
                      <strong>
                        Governorate:
                      </strong>{" "}
                      {shipping.governorate ||
                        "—"}
                    </p>

                    <p>
                      <strong>
                        City:
                      </strong>{" "}
                      {shipping.city ||
                        "—"}
                    </p>

                    <p>
                      <strong>
                        Address:
                      </strong>{" "}
                      {shipping.fullAddress ||
                        "—"}
                    </p>

                  </div>
                );
              })()}

            </div>

          </section>
        )}

      </div>
    </main>
  );
};

export default AccountPage;