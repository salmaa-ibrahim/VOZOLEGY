export const siteConfig = {
  // BRAND
  brand: {
    name: 'VOZOL EGY',
    logoText: 'VOZOL EGY',
    tagline: 'Make Joy Happen',
    description:
      "Vozol is an international vape brand devoted to accelerating the world's transition to a smoking-free place.",
    establishedYear: 2024,
  },

  // ========================================
  // CONTACT
  contact: {
    phone: {
      number: '+201234567890',
      display: '+20 123 456 7890',
      icon: '/icons/call.jpg',
    },

    whatsapp: {
      number: '201234567890',
      display: '+20 123 456 7890',
      icon: '/icons/whatsapp.jpg',
    },

    email: {
      address: 'info@vozolegy.com',
      icon: '/icons/email.svg',
    },

    address: {
      street: '123 Main Street',
      city: 'Cairo',
      country: 'Egypt',
      full: '123 Main Street, Cairo, Egypt',
    },
  },

  // ========================================
  // SOCIAL MEDIA
  social: {
    instagram: {
      url: 'https://instagram.com/vozolegy',
      icon: '/icons/instagram.jpg',
    },

    facebook: {
      url: 'https://facebook.com/vozolegy',
      icon: '/icons/facebook.jpg',
    },

    // tiktok: {
    //   url: 'https://tiktok.com/@vozolegy',
    //   icon: '/icons/tiktok.svg',
    // },

    // youtube: {
    //   url: 'https://youtube.com/@vozolegy',
    //   icon: '/icons/youtube.svg',
    // },
  },

  // ========================================
  // STORE
  store: {
    currency: 'LE',
    currencySymbol: 'LE',

    defaultShippingCost: 100,

    freeShippingThreshold: 1500,

    freeShippingForAll: true,
  },

  // ========================================
  // MESSAGES
  messages: {
    announcementBar:
      'FREE DELIVERY FOR ALL ORDERS - شحن مجاني على جميع الطلبات',

    ageVerificationTitle: 'AGE VERIFICATION',

    ageVerificationText:
      'To use the VOZOL EGY website you must be aged 21 years old or over. Please verify your age before entering the site.',

    underAgeMessage:
      'Sorry, you must be 21 years old or over to enter this website.',

    cookieTitle: 'Our page uses Cookies',

    cookieText:
      'We use cookies to personalize and enhance your browsing experience on our website. By clicking "Accept All", you agree to use cookies. You can read our Cookie Policy for more information.',

    copyright: `Copyright © ${new Date().getFullYear()} VOZOL EGY`,
  },

  // ========================================
  // LEGAL
  legal: {
    cookiePolicy: '/cookie-policy',
    privacyPolicy: '/privacy-policy',
    termsOfService: '/terms-of-service',
    shippingPolicy: '/shipping-policy',
    refundPolicy: '/refund-policy',
  },

  // ========================================
  // NAVIGATION
  navigation: {
    main: [
      {
        label: 'HOME',
        path: '/',
      },
      {
        label: 'How to choose your vape?',
        path: '/how-to-choose',
      },
      // {
      //   label: 'Shipping & Policy',
      //   path: '/shipping-policy',
      // },
    ],
  },

  // ========================================
  // SOCIAL & CONTACT LINKS
  getSocialLinks: function () {
    return [
      {
        id: 'whatsapp',
        title: 'WhatsApp',
        description:
          'Chat with us directly on WhatsApp for quick support and orders.',
        url: `https://wa.me/${this.contact.whatsapp.number}`,
        action: 'CHAT NOW',
        icon: this.contact.whatsapp.icon,
      },

      {
        id: 'phone',
        title: 'Phone Call',
        description:
          "Give us a call and we'll be happy to help you.",
        url: `tel:${this.contact.phone.number}`,
        action: 'CALL NOW',
        icon: this.contact.phone.icon,
      },

      {
        id: 'instagram',
        title: 'Instagram',
        description:
          'Follow us on Instagram for the latest updates, offers and new flavors.',
        url: this.social.instagram.url,
        action: 'VISIT PAGE',
        icon: this.social.instagram.icon,
      },

      {
        id: 'facebook',
        title: 'Facebook',
        description:
          'Like our page to stay connected and never miss out.',
        url: this.social.facebook.url,
        action: 'VISIT PAGE',
        icon: this.social.facebook.icon,
      },

    //   {
    //     id: 'tiktok',
    //     title: 'TikTok',
    //     description:
    //       'Follow us on TikTok for the latest videos, trends and updates.',
    //     url: this.social.tiktok.url,
    //     action: 'VISIT PAGE',
    //     icon: this.social.tiktok.icon,
    //   },

    //   {
    //     id: 'youtube',
    //     title: 'YouTube',
    //     description:
    //       'Subscribe to our YouTube channel for videos, updates and more.',
    //     url: this.social.youtube.url,
    //     action: 'WATCH NOW',
    //     icon: this.social.youtube.icon,
    //   },
    ];
  },
};