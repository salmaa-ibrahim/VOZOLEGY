import React, { createContext, useContext, useEffect, useState } from "react";

import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId) => {
    if (!userId) {
      setProfile(null);
      return null;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error("FETCH PROFILE ERROR:", error);
      setProfile(null);
      return null;
    }

    setProfile(data || null);
    return data || null;
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) return;

        const currentUser = session?.user || null;

        setUser(currentUser);

        if (currentUser) {
          await fetchProfile(currentUser.id);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("AUTH INITIALIZATION ERROR:", error);
        setUser(null);
        setProfile(null);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user || null;

      setUser(currentUser);

      if (!currentUser) {
        setProfile(null);
        setLoading(false);
        return;
      }

      /*
       * Delay profile query slightly so Supabase can
       * finish updating the auth state first.
       */
      setTimeout(() => {
        fetchProfile(currentUser.id).finally(() => {
          if (mounted) {
            setLoading(false);
          }
        });
      }, 0);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    const cleanEmail = String(email || "").trim();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (data?.user) {
      const userProfile = await fetchProfile(data.user.id);

      return {
        user: data.user,
        profile: userProfile,
      };
    }

    return data;
  };

  const signUp = async ({
    email,
    password,
    fullName,
    phone,
    whatsapp,
    governorate,
    city,
    fullAddress,
  }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,

        options: {
          data: {
            full_name: fullName?.trim() || "",
            phone: phone?.trim() || "",
            whatsapp: whatsapp?.trim() || "",
            governorate: governorate?.trim() || "",
            city: city?.trim() || "",
            full_address: fullAddress?.trim() || "",
          },
        },
      });

      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      return {
        success: true,
        user: data.user,
        session: data.session,
      };
    } catch (error) {
      console.error("Sign up error:", error);

      return {
        success: false,
        error: error.message || "Could not create account.",
      };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("SIGN OUT ERROR:", error);
    }

    setUser(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    if (!user?.id) return null;
    return fetchProfile(user.id);
  };

  const isAdmin = String(profile?.role || "").toLowerCase() === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isAdmin,
        signIn,
        signUp,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
