export type SupportedLanguage = "en" | "ja";

export type ConditionKey = "new" | "like_new" | "used" | "damaged";
export type OrderStatusKey = "new" | "contacted" | "discussion" | "completed" | "cancelled";
export type SupportTopicKey = "order" | "catalog" | "tracking" | "account" | "other";

export type FooterLink = {
  label: string;
  href: string;
};

export type InfoSection = {
  title: string;
  body: string;
};

export type PolicySection = {
  title: string;
  body: string;
};

export type JobOpening = {
  title: string;
  location: string;
  type: string;
  description: string;
};

export type ContactChannel = {
  title: string;
  detail: string;
  helper: string;
};

export type Translations = {
  common: {
    siteName: string;
    metaTitle: string;
    metaDescription: string;
    searchPlaceholder: string;
    favorites: string;
    trackOrder: string;
    startSelling: string;
    languageEnglish: string;
    languageJapanese: string;
    loading: string;
    viewDetails: string;
    askPrice: string;
    coverFallback: string;
    unknownAuthor: string;
    liveLabel: string;
    close: string;
  };
  home: {
    bannerTitle: string;
    categoriesLabel: string;
    genresLabel: string;
    promotionLabel: string;
    explorePromotion: string;
    studioDashboard: string;
    addHeroImage: string;
    promotionHeading: string;
    promotionLead: string;
    promotionEmptyTitle: string;
    promotionEmptyBody: string;
    popularGenres: string;
    browseShelf: string;
    seeAll: string;
    popularCategories: string;
    liveFromStudio: string;
    latestArrivals: string;
    latestArrivalsSubtitle: string;
    newCount: string;
    browseCatalog: string;
  };
  catalog: {
    breadcrumbHome: string;
    breadcrumbBooks: string;
    browseCatalog: string;
    fullCatalog: string;
    browseTitle: string;
    totalTitles: string;
    bookCatalog: string;
    exploreEveryTitle: string;
    exploreHelper: string;
    matches: string;
    showFilters: string;
    hideFilters: string;
    advancedHelper: string;
    gridView: string;
    listView: string;
    splitView: string;
    activeLabel: string;
    noBooksTitle: string;
    noBooksBody: string;
    loadMore: string;
  };
  filters: {
    title: string;
    subtitle: string;
    reset: string;
    searchPlaceholder: string;
    selectionHint: string;
    matchAny: string;
    matchAll: string;
    includeLabel: string;
    excludeLabel: string;
    categories: string;
    genres: string;
    condition: string;
    price: string;
    min: string;
    max: string;
    dropdownHelper: string;
    categoriesPlaceholder: string;
    genresPlaceholder: string;
    clearSelection: string;

    priceHelper: (min: number, max: number) => string;
    conditionLabels: Record<ConditionKey, string>;
  };
  book: {
    backToCatalog: string;
    breadcrumbHome: string;
    breadcrumbBooks: string;
    contactForPrice: string;
    inventoryInStock: (count: number) => string;
    inventoryOutOfStock: string;
    price: string;
    descriptionFallback: string;
    category: string;
    genre: string;
    condition: string;
    inventory: string;
    inventoryUnknown: string;
    featured: string;
    openImage: string;
    imagePreviewTitle: string;
    imageHelper: string;
    zoomLabel: string;
    zoomIn: string;
    zoomOut: string;
    resetZoom: string;
  };
  order: {
    heading: string;
    intro: string;
    openFormLabel: string;
    buyerNameLabel: string;
    buyerEmailLabel: string;
    contactNumberLabel: string;
    contactNumberPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    successTrackingCode: (code: string) => string;
    errorTitle: string;
    errorBody: string;
    marketplaceCta: string;
    marketplaceHelper: string;
    trackerHeading: string;
    trackerIntro: string;
    trackingCodeLabel: string;
    trackingCodeHelper: string;
    trackerSubmit: string;
    trackerResultTitle: string;
    trackerStatusLabel: string;
    trackerSubmittedLabel: string;
    trackerHasMessage: string;
    trackerNoMessage: string;
    trackerMissingTitle: string;
    trackerMissingBody: string;
    trackerProtectNote: string;
    statusLabels: Record<OrderStatusKey, string>;
  };
  support: {
    badge: string;
    heading: string;
    intro: string;
    responseTimeTitle: string;
    responseTimeBody: string;
    commitments: string[];
    secondaryTitle: string;
    secondaryBody: string;
    nameLabel: string;
    emailLabel: string;
    topicLabel: string;
    topicHelper: string;
    topicOptions: Record<SupportTopicKey, string>;
    trackingLabel: string;
    trackingHelper: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    errorTitle: string;
    errorBody: string;
  };
  favoritesMenu: {
    title: string;
    empty: string;
    goToBook: string;
    remove: string;
  };
  reviews: {
    heading: string;
    singleReview: string;
    multipleReviews: (count: number) => string;
    editorial: string;
    reader: string;
    anonymous: string;
    noBody: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    titleLabel: string;
    titlePlaceholder: string;
    reviewLabel: string;
    reviewPlaceholder: string;
    moderationNote: string;
    submit: string;
    submitting: string;
    emptyState: string;
    toastSuccessTitle: string;
    toastSuccessBody: string;
    toastErrorTitle: string;
    toastErrorBody: string;
  };
  footer: {
    description: string;
    sections: Array<{ heading: string; links: FooterLink[] }>;
    privacy: FooterLink;
    terms: FooterLink;
    cookies: FooterLink;
    rights: string;
  };
  pages: {
    about: {
      eyebrow: string;
      title: string;
      description: string;
      sections: InfoSection[];
      highlightTitle: string;
      highlightBody: string;
    };
    careers: {
      eyebrow: string;
      title: string;
      description: string;
      openingsTitle: string;
      openings: JobOpening[];
      emptyState: string;
      valuesTitle: string;
      values: InfoSection[];
    };
    contact: {
      eyebrow: string;
      title: string;
      description: string;
      channels: ContactChannel[];
      responseTime: string;
      supportCta: string;
      supportHelper: string;
    };
    genres: {
      eyebrow: string;
      title: string;
      description: string;
      helper: string;
      callout: string;
      emptyState: string;
    };
    collections: {
      eyebrow: string;
      title: string;
      description: string;
      helper: string;
      spotlightTitle: string;
      spotlightBody: string;
      emptyState: string;
    };
    returns: {
      eyebrow: string;
      title: string;
      description: string;
      policyPoints: string[];
      helper: string;
      trackCta: string;
    };
    privacy: {
      eyebrow: string;
      title: string;
      updated: string;
      sections: PolicySection[];
      contact: string;
    };
    terms: {
      eyebrow: string;
      title: string;
      updated: string;
      sections: PolicySection[];
      contact: string;
    };
    cookies: {
      eyebrow: string;
      title: string;
      updated: string;
      sections: PolicySection[];
      preferences: string;
      contact: string;
    };
  };
};
