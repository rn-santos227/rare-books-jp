export type SupportedLanguage = "en" | "ja";

type ConditionKey = "new" | "like_new" | "used" | "damaged";

type Translations = {
  common: {
    siteName: string;
    metaTitle: string;
    metaDescription: string;
    searchPlaceholder: string;
    favorites: string;
    startSelling: string;
    languageEnglish: string;
    languageJapanese: string;
    loading: string;
    viewDetails: string;
    askPrice: string;
    coverFallback: string;
    unknownAuthor: string;
    liveLabel: string;
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
    addToCart: string;
    descriptionFallback: string;
    category: string;
    genre: string;
    condition: string;
    inventory: string;
    inventoryUnknown: string;
    featured: string;
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
    sections: Array<{ heading: string; links: string[] }>;
    privacy: string;
    terms: string;
    cookies: string;
    rights: string;
  };
};

export const translations: Record<SupportedLanguage, Translations> = {
  en: {
    common: {
      siteName: "The Rare Books JP",
      metaTitle: "The Rare Books JP | Rare book marketplace",
      metaDescription:
        "Marketplace UI kit for rare books and collectibles inspired by Mercari.",
      searchPlaceholder: "Looking for something?",
      favorites: "Favorites",
      startSelling: "Start selling",
      languageEnglish: "English",
      languageJapanese: "日本語",
      loading: "Loading",
      viewDetails: "View details",
      askPrice: "Ask",
      coverFallback: "Cover coming soon",
      unknownAuthor: "Unknown author",
      liveLabel: "Live",
    },
    home: {
      bannerTitle: "Our international purchase and shipping parallel is live",
      categoriesLabel: "categories",
      genresLabel: "genres",
      promotionLabel: "Promotion",
      explorePromotion: "Explore promotion",
      studioDashboard: "Visit Studio dashboard",
      addHeroImage: "Add hero image",
      promotionHeading: "Promotions",
      promotionLead: "Showcase a feature banner",
      promotionEmptyTitle: "No active promotions",
      promotionEmptyBody:
        "Publish at least one promotion to populate this carousel with hero cards.",
      popularGenres: "Popular genres",
      browseShelf: "Browse the shelf",
      seeAll: "See all",
      popularCategories: "Popular categories",
      liveFromStudio: "Live from Studio",
      latestArrivals: "Latest arrivals",
      latestArrivalsSubtitle: "Freshly added books from our shelves.",
      newCount: "new",
      browseCatalog: "Browse catalog",
    },
    catalog: {
      breadcrumbHome: "Home",
      breadcrumbBooks: "Books",
      browseCatalog: "Browse the Catalog",
      fullCatalog: "Full catalog",
      browseTitle: "Browse Rare Books",
      totalTitles: "total titles",
      bookCatalog: "Book catalog",
      exploreEveryTitle: "Explore every title",
      exploreHelper:
        "Use the filters to refine your shelf. New items load automatically as you browse.",
      matches: "matches",
      showFilters: "Show filters",
      hideFilters: "Hide filters",
      activeLabel: "Active",
      noBooksTitle: "No books found",
      noBooksBody: "Try clearing the filters or expanding your price range.",
      loadMore: "Load more books",
    },
    filters: {
      title: "Filters",
      subtitle: "Craft the perfect shelf",
      reset: "Reset",
      searchPlaceholder: "Search by title or author",
      selectionHint: "Tap once to include, again to exclude",
      matchAny: "Match any",
      matchAll: "Match all",
      includeLabel: "Include",
      excludeLabel: "Exclude",
      categories: "Categories",
      genres: "Genres",
      condition: "Condition",
      price: "Price",
      min: "Min",
      max: "Max",
      priceHelper: (min, max) => `¥${min.toLocaleString()} - ¥${max.toLocaleString()}`,
      conditionLabels: {
        new: "New",
        like_new: "Like New",
        used: "Used",
        damaged: "Damaged",
      },
    },
    book: {
      backToCatalog: "Back to Catalog",
      breadcrumbHome: "Home",
      breadcrumbBooks: "Books",
      contactForPrice: "Contact for price",
      inventoryInStock: (count) => `${count} in stock`,
      inventoryOutOfStock: "Out of stock",
      price: "Price",
      addToCart: "Add to cart",
      descriptionFallback: "A detailed description from the curator will be added soon.",
      category: "Category",
      genre: "Genre",
      condition: "Condition",
      inventory: "Inventory",
      inventoryUnknown: "N/A",
      featured: "Featured pick from our collection",
    },
    reviews: {
      heading: "Reviews",
      singleReview: "1 review",
      multipleReviews: (count) => `${count} reviews`,
      editorial: "Editorial",
      reader: "Reader review",
      anonymous: "Anonymous reader",
      noBody: "No written feedback.",
      nameLabel: "Your name",
      namePlaceholder: "How should we credit you?",
      reviewLabel: "Your review",
      reviewPlaceholder:
        "What did you enjoy, notice, or wish was different about this book?",
      moderationNote: "Reviews are published after a quick moderation check.",
      submit: "Submit review",
      submitting: "Sending...",
      emptyState: "No reviews yet. Be the first to share your thoughts.",
      toastSuccessTitle: "Review submitted",
      toastSuccessBody: "Thanks! New reviews appear after they are approved.",
      toastErrorTitle: "Could not submit review",
      toastErrorBody: "Please try again in a moment.",
    },
    footer: {
      description:
        "Curating rare titles, first editions, and treasured finds from Japan and around the world.",
      sections: [
        {
          heading: "Browse",
          links: ["All books", "Genres", "Collections"],
        },
        {
          heading: "Company",
          links: ["About", "Careers", "Contact"],
        },
        {
          heading: "Support",
          links: ["Help center", "Shipping", "Returns"],
        },
      ],
      privacy: "Privacy",
      terms: "Terms",
      cookies: "Cookies",
      rights: "All rights reserved.",
    },
  },
  ja: {
    common: {
      siteName: "ザ・レアブックスJP",
      metaTitle: "ザ・レアブックスJP | 希少本のマーケットプレイス",
      metaDescription: "Mercari から着想を得た希少本とコレクティブルのマーケット UI キット。",
      searchPlaceholder: "お探しのものはありますか？",
      favorites: "お気に入り",
      startSelling: "出品する",
      languageEnglish: "English",
      languageJapanese: "日本語",
      loading: "読み込み中",
      viewDetails: "詳細を見る",
      askPrice: "要問い合わせ",
      coverFallback: "カバー画像は準備中です",
      unknownAuthor: "著者情報なし",
      liveLabel: "公開中",
    },
    home: {
      bannerTitle: "越境購入と発送サポートを開始しました",
      categoriesLabel: "カテゴリ",
      genresLabel: "ジャンル",
      promotionLabel: "プロモーション",
      explorePromotion: "プロモーションを見る",
      studioDashboard: "Studio ダッシュボードへ",
      addHeroImage: "ヒーロー画像を追加",
      promotionHeading: "プロモーション",
      promotionLead: "特集バナーを掲出",
      promotionEmptyTitle: "公開中のプロモーションはありません",
      promotionEmptyBody: "カルーセルに表示するには、少なくとも1件のプロモーションを公開してください。",
      popularGenres: "人気のジャンル",
      browseShelf: "棚を眺める",
      seeAll: "すべて見る",
      popularCategories: "人気のカテゴリ",
      liveFromStudio: "Studio から配信中",
      latestArrivals: "新着商品",
      latestArrivalsSubtitle: "棚に加わったばかりの書籍です。",
      newCount: "件の新着",
      browseCatalog: "カタログを見る",
    },
    catalog: {
      breadcrumbHome: "ホーム",
      breadcrumbBooks: "書籍",
      browseCatalog: "カタログを閲覧",
      fullCatalog: "全カタログ",
      browseTitle: "希少本を探す",
      totalTitles: "件のタイトル",
      bookCatalog: "書籍カタログ",
      exploreEveryTitle: "すべてのタイトルをチェック",
      exploreHelper:
        "フィルターで棚を絞り込めます。閲覧中に自動で新しいアイテムが読み込まれます。",
      matches: "件ヒット",
      showFilters: "フィルターを表示",
      hideFilters: "フィルターを隠す",
      activeLabel: "適用中",
      noBooksTitle: "該当する書籍がありません",
      noBooksBody: "フィルターを解除するか、価格帯を広げてみてください。",
      loadMore: "さらに読み込む",
    },
    filters: {
      title: "フィルター",
      subtitle: "理想の棚を作る",
      reset: "リセット",
      searchPlaceholder: "タイトルまたは著者で検索",
      selectionHint: "タップで含め、もう一度で除外します",
      matchAny: "いずれかに一致",
      matchAll: "すべてに一致",
      includeLabel: "含める",
      excludeLabel: "除外",
      categories: "カテゴリ",
      genres: "ジャンル",
      condition: "コンディション",
      price: "価格",
      min: "最小",
      max: "最大",
      priceHelper: (min, max) => `¥${min.toLocaleString()} 〜 ¥${max.toLocaleString()}`,
      conditionLabels: {
        new: "新品",
        like_new: "新品同様",
        used: "中古",
        damaged: "ダメージあり",
      },
    },
    book: {
      backToCatalog: "カタログに戻る",
      breadcrumbHome: "ホーム",
      breadcrumbBooks: "書籍",
      contactForPrice: "価格はお問い合わせください",
      inventoryInStock: (count) => `${count} 点在庫あり`,
      inventoryOutOfStock: "在庫切れ",
      price: "価格",
      addToCart: "カートに追加",
      descriptionFallback: "キュレーターからの詳細な説明は後日追加されます。",
      category: "カテゴリ",
      genre: "ジャンル",
      condition: "コンディション",
      inventory: "在庫",
      inventoryUnknown: "不明",
      featured: "コレクションのおすすめ",
    },
    reviews: {
      heading: "レビュー",
      singleReview: "1件のレビュー",
      multipleReviews: (count) => `${count}件のレビュー`,
      editorial: "編集部レビュー",
      reader: "読者レビュー",
      anonymous: "匿名の読者",
      noBody: "文章でのフィードバックはありません。",
      nameLabel: "お名前",
      namePlaceholder: "クレジット名をご記入ください",
      reviewLabel: "レビュー本文",
      reviewPlaceholder: "感想や気づいた点、もっとこうしてほしい点をお聞かせください。",
      moderationNote: "レビューは確認後に公開されます。",
      submit: "レビューを送信",
      submitting: "送信中...",
      emptyState: "まだレビューがありません。最初の感想を共有してください。",
      toastSuccessTitle: "レビューを受け付けました",
      toastSuccessBody: "ありがとうございます！ 承認後に掲載されます。",
      toastErrorTitle: "レビューを送信できませんでした",
      toastErrorBody: "しばらくしてからもう一度お試しください。",
    },
    footer: {
      description:
        "日本と世界から集めた希少本や初版本をキュレーションしています。",
      sections: [
        {
          heading: "探す",
          links: ["すべての書籍", "ジャンル", "コレクション"],
        },
        {
          heading: "私たちについて",
          links: ["会社情報", "採用", "お問い合わせ"],
        },
        {
          heading: "サポート",
          links: ["ヘルプセンター", "配送", "返品"],
        },
      ],
      privacy: "プライバシー",
      terms: "利用規約",
      cookies: "クッキー",
      rights: "無断転載を禁じます。",
    },
  },
};
