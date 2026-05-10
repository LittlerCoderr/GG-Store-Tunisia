import { v4 as uuidv4 } from 'uuid';

export const mockProducts = [
  // --- FREE FIRE (Diamonds) ---
  { id: uuidv4(), title: "Free Fire 100 Diamonds", gameCategory: "Battle Royale", category: "currency", originalPriceTND: 6.0, discountedPriceTND: 5.0, imagePath: "images/freefire.avif", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Free Fire 210 Diamonds", gameCategory: "Battle Royale", category: "currency", originalPriceTND: 12.5, discountedPriceTND: 10.0, imagePath: "images/freefire.avif", isTrending: true, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Free Fire 530 Diamonds", gameCategory: "Battle Royale", category: "currency", originalPriceTND: 28.0, discountedPriceTND: 25.0, imagePath: "images/freefire.avif", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Free Fire 1080 Diamonds", gameCategory: "Battle Royale", category: "currency", originalPriceTND: 55.0, discountedPriceTND: 50.0, imagePath: "images/freefire.avif", isTrending: true, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Free Fire 2200 Diamonds", gameCategory: "Battle Royale", category: "currency", originalPriceTND: 110.0, discountedPriceTND: 100.0, imagePath: "images/freefire.avif", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },

  // --- VALORANT (VP) ---
  { id: uuidv4(), title: "Valorant 475 VP", gameCategory: "Tactical Shooter", category: "currency", originalPriceTND: 18.0, discountedPriceTND: 16.0, imagePath: "images/valorant.webp", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Valorant 1000 VP", gameCategory: "Tactical Shooter", category: "currency", originalPriceTND: 35.0, discountedPriceTND: 31.5, imagePath: "images/valorant.webp", isTrending: true, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Valorant 2050 VP", gameCategory: "Tactical Shooter", category: "currency", originalPriceTND: 70.0, discountedPriceTND: 65.0, imagePath: "images/valorant.webp", isTrending: true, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Valorant 3650 VP", gameCategory: "Tactical Shooter", category: "currency", originalPriceTND: 120.0, discountedPriceTND: 110.0, imagePath: "images/valorant.webp", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Valorant 5350 VP", gameCategory: "Tactical Shooter", category: "currency", originalPriceTND: 175.0, discountedPriceTND: 160.0, imagePath: "images/valorant.webp", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Valorant 10500 VP", gameCategory: "Tactical Shooter", category: "currency", originalPriceTND: 340.0, discountedPriceTND: 315.0, imagePath: "images/valorant.webp", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },

  // --- PUBG MOBILE (UC) ---
  { id: uuidv4(), title: "PUBG Mobile 60 UC", gameCategory: "Battle Royale", category: "currency", originalPriceTND: 4.5, discountedPriceTND: 4.0, imagePath: "images/pubg.webp", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "PUBG Mobile 325 UC", gameCategory: "Battle Royale", category: "currency", originalPriceTND: 18.0, discountedPriceTND: 15.5, imagePath: "images/pubg.webp", isTrending: true, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "PUBG Mobile 660 UC", gameCategory: "Battle Royale", category: "currency", originalPriceTND: 35.0, discountedPriceTND: 31.0, imagePath: "images/pubg.webp", isTrending: true, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "PUBG Mobile 1800 UC", gameCategory: "Battle Royale", category: "currency", originalPriceTND: 95.0, discountedPriceTND: 85.0, imagePath: "images/pubg.webp", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "PUBG Mobile 3850 UC", gameCategory: "Battle Royale", category: "currency", originalPriceTND: 195.0, discountedPriceTND: 180.0, imagePath: "images/pubg.webp", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "PUBG Mobile 8100 UC", gameCategory: "Battle Royale", category: "currency", originalPriceTND: 390.0, discountedPriceTND: 360.0, imagePath: "images/pubg.webp", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },

  // --- CS2 ---
  { id: uuidv4(), title: "CS2 Prime Status Upgrade", gameCategory: "Tactical Shooter", category: "game", originalPriceTND: 50.0, discountedPriceTND: 46.5, imagePath: "images/cs2.webp", isTrending: true, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "CS2 5x Case Keys", gameCategory: "Tactical Shooter", category: "currency", originalPriceTND: 45.0, discountedPriceTND: 42.0, imagePath: "images/cs2.webp", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "CS2 10x Case Keys", gameCategory: "Tactical Shooter", category: "currency", originalPriceTND: 90.0, discountedPriceTND: 84.0, imagePath: "images/cs2.webp", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "CS2 20x Case Keys", gameCategory: "Tactical Shooter", category: "currency", originalPriceTND: 180.0, discountedPriceTND: 165.0, imagePath: "images/cs2.webp", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },

  // --- APEX LEGENDS (Coins) ---
  { id: uuidv4(), title: "Apex Legends 1000 Coins", gameCategory: "Battle Royale", category: "currency", originalPriceTND: 32.0, discountedPriceTND: 29.5, imagePath: "images/apex.webp", isTrending: true, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Apex Legends 2150 Coins", gameCategory: "Battle Royale", category: "currency", originalPriceTND: 64.0, discountedPriceTND: 59.0, imagePath: "images/apex.webp", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Apex Legends 4350 Coins", gameCategory: "Battle Royale", category: "currency", originalPriceTND: 128.0, discountedPriceTND: 118.0, imagePath: "images/apex.webp", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Apex Legends 6700 Coins", gameCategory: "Battle Royale", category: "currency", originalPriceTND: 195.0, discountedPriceTND: 180.0, imagePath: "images/apex.webp", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Apex Legends 11500 Coins", gameCategory: "Battle Royale", category: "currency", originalPriceTND: 320.0, discountedPriceTND: 295.0, imagePath: "images/apex.webp", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },

  // --- LEAGUE OF LEGENDS (RP) ---
  { id: uuidv4(), title: "League of Legends 575 RP", gameCategory: "MOBA", category: "currency", originalPriceTND: 15.0, discountedPriceTND: 14.0, imagePath: "images/leagueofleagends.avif", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "League of Legends 1380 RP", gameCategory: "MOBA", category: "currency", originalPriceTND: 35.0, discountedPriceTND: 31.0, imagePath: "images/leagueofleagends.avif", isTrending: true, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "League of Legends 2800 RP", gameCategory: "MOBA", category: "currency", originalPriceTND: 70.0, discountedPriceTND: 65.0, imagePath: "images/leagueofleagends.avif", isTrending: true, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "League of Legends 5000 RP", gameCategory: "MOBA", category: "currency", originalPriceTND: 120.0, discountedPriceTND: 110.0, imagePath: "images/leagueofleagends.avif", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "League of Legends 7200 RP", gameCategory: "MOBA", category: "currency", originalPriceTND: 175.0, discountedPriceTND: 160.0, imagePath: "images/leagueofleagends.avif", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "League of Legends 13500 RP", gameCategory: "MOBA", category: "currency", originalPriceTND: 330.0, discountedPriceTND: 310.0, imagePath: "images/leagueofleagends.avif", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },

  // --- FORTNITE (V-Bucks) ---
  { id: uuidv4(), title: "Fortnite 1000 V-Bucks", gameCategory: "Battle Royale", category: "currency", originalPriceTND: 25.0, discountedPriceTND: 23.5, imagePath: "images/fortnite.avif", isTrending: true, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Fortnite 2800 V-Bucks", gameCategory: "Battle Royale", category: "currency", originalPriceTND: 65.0, discountedPriceTND: 60.0, imagePath: "images/fortnite.avif", isTrending: true, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Fortnite 5000 V-Bucks", gameCategory: "Battle Royale", category: "currency", originalPriceTND: 105.0, discountedPriceTND: 95.0, imagePath: "images/fortnite.avif", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Fortnite 13500 V-Bucks", gameCategory: "Battle Royale", category: "currency", originalPriceTND: 250.0, discountedPriceTND: 230.0, imagePath: "images/fortnite.avif", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },

  // --- ROBLOX (Robux) ---
  { id: uuidv4(), title: "Roblox 400 Robux", gameCategory: "Sandbox", category: "currency", originalPriceTND: 15.0, discountedPriceTND: 14.0, imagePath: "images/roblox coins.webp", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Roblox 800 Robux", gameCategory: "Sandbox", category: "currency", originalPriceTND: 25.0, discountedPriceTND: 22.0, imagePath: "images/roblox coins.webp", isTrending: true, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Roblox 1700 Robux", gameCategory: "Sandbox", category: "currency", originalPriceTND: 65.0, discountedPriceTND: 60.0, imagePath: "images/roblox coins.webp", isTrending: true, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Roblox 4500 Robux", gameCategory: "Sandbox", category: "currency", originalPriceTND: 160.0, discountedPriceTND: 150.0, imagePath: "images/roblox coins.webp", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Roblox 10000 Robux", gameCategory: "Sandbox", category: "currency", originalPriceTND: 320.0, discountedPriceTND: 300.0, imagePath: "images/roblox coins.webp", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },

  // --- OTHER ---
  { id: uuidv4(), title: "Genshin Impact Genesis Crystals", gameCategory: "RPG", category: "currency", originalPriceTND: 16.0, discountedPriceTND: 14.5, imagePath: "images/genshin-impact.jpg", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "EA Sports FC 24 1050 Points", gameCategory: "Sports", category: "currency", originalPriceTND: 35.0, discountedPriceTND: 32.5, imagePath: "images/EAsportsFC2026.jpg", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },

  // --- GIFTCARDS - STEAM ---
  { id: uuidv4(), title: "Steam Wallet $10", gameCategory: "Platform", category: "giftcard", originalPriceTND: 33.0, discountedPriceTND: 32.0, imagePath: "images/media/steam.jpg", isTrending: true, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Steam Wallet $20", gameCategory: "Platform", category: "giftcard", originalPriceTND: 66.0, discountedPriceTND: 64.0, imagePath: "images/media/steam.jpg", isTrending: true, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Steam Wallet $50", gameCategory: "Platform", category: "giftcard", originalPriceTND: 165.0, discountedPriceTND: 160.0, imagePath: "images/media/steam.jpg", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Steam Wallet $100", gameCategory: "Platform", category: "giftcard", originalPriceTND: 330.0, discountedPriceTND: 315.0, imagePath: "images/media/steam.jpg", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },

  // --- GIFTCARDS - EPIC GAMES ---
  { id: uuidv4(), title: "Epic Games $10", gameCategory: "Platform", category: "giftcard", originalPriceTND: 33.0, discountedPriceTND: 32.0, imagePath: "images/media/epicgames.png", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Epic Games $20", gameCategory: "Platform", category: "giftcard", originalPriceTND: 66.0, discountedPriceTND: 64.0, imagePath: "images/media/epicgames.png", isTrending: true, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Epic Games $50", gameCategory: "Platform", category: "giftcard", originalPriceTND: 165.0, discountedPriceTND: 160.0, imagePath: "images/media/epicgames.png", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Epic Games $100", gameCategory: "Platform", category: "giftcard", originalPriceTND: 330.0, discountedPriceTND: 315.0, imagePath: "images/media/epicgames.png", isTrending: false, stockStatus: "LOW_STOCK", deliveryTime: "Instant" },

  // --- GAMES ---
  { id: uuidv4(), title: "Minecraft Java & Bedrock", gameCategory: "Sandbox", category: "game", originalPriceTND: 85.0, discountedPriceTND: 79.0, imagePath: "https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Minecraft_cover.png/220px-Minecraft_cover.png", isTrending: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },

  // --- SUBSCRIPTIONS (AI) ---
  { id: uuidv4(), title: "ChatGPT Plus (1 Month)", gameCategory: "AI Tools", category: "subscription", planType: "Monthly", originalPriceTND: 70.0, discountedPriceTND: 65.0, imagePath: "images/media/chatgpt.avif", brandColor: "rgba(16, 163, 127, 0.6)", isTrending: false, isPopular: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "ChatGPT Plus (1 Year)", gameCategory: "AI Tools", category: "subscription", planType: "Yearly", originalPriceTND: 840.0, discountedPriceTND: 750.0, imagePath: "images/media/chatgpt.avif", brandColor: "rgba(16, 163, 127, 0.6)", isTrending: false, isPopular: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },

  { id: uuidv4(), title: "Google Gemini Advanced (1 Month)", gameCategory: "AI Tools", category: "subscription", planType: "Monthly", originalPriceTND: 65.0, discountedPriceTND: 60.0, imagePath: "images/media/gemini.avif", brandColor: "rgba(142, 36, 170, 0.6)", isTrending: false, isPopular: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Google Gemini Advanced (1 Year)", gameCategory: "AI Tools", category: "subscription", planType: "Yearly", originalPriceTND: 780.0, discountedPriceTND: 700.0, imagePath: "images/media/gemini.avif", brandColor: "rgba(142, 36, 170, 0.6)", isTrending: false, isPopular: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },

  { id: uuidv4(), title: "Perplexity Pro (1 Month)", gameCategory: "AI Tools", category: "subscription", planType: "Monthly", originalPriceTND: 65.0, discountedPriceTND: 60.0, imagePath: "images/media/Perplexity.avif", brandColor: "rgba(0, 210, 255, 0.6)", isTrending: false, isPopular: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Perplexity Pro (1 Year)", gameCategory: "AI Tools", category: "subscription", planType: "Yearly", originalPriceTND: 780.0, discountedPriceTND: 700.0, imagePath: "images/media/Perplexity.avif", brandColor: "rgba(0, 210, 255, 0.6)", isTrending: false, isPopular: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },

  // --- SUBSCRIPTIONS (GAMING) ---
  { id: uuidv4(), title: "Xbox Game Pass Ultimate (1 Month)", gameCategory: "Gaming", category: "subscription", planType: "Monthly", originalPriceTND: 45.0, discountedPriceTND: 41.5, imagePath: "images/media/xbox.jpg", brandColor: "rgba(16, 124, 16, 0.6)", isTrending: false, isPopular: true, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Xbox Game Pass Ultimate (1 Year)", gameCategory: "Gaming", category: "subscription", planType: "Yearly", originalPriceTND: 540.0, discountedPriceTND: 480.0, imagePath: "images/media/xbox.jpg", brandColor: "rgba(16, 124, 16, 0.6)", isTrending: false, isPopular: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },

  { id: uuidv4(), title: "PlayStation Plus Premium (1 Month)", gameCategory: "Gaming", category: "subscription", planType: "Monthly", originalPriceTND: 55.0, discountedPriceTND: 50.0, imagePath: "images/media/playstation.webp", brandColor: "rgba(0, 55, 145, 0.8)", isTrending: false, isPopular: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "PlayStation Plus Premium (1 Year)", gameCategory: "Gaming", category: "subscription", planType: "Yearly", originalPriceTND: 660.0, discountedPriceTND: 590.0, imagePath: "images/media/playstation.webp", brandColor: "rgba(0, 55, 145, 0.8)", isTrending: false, isPopular: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },

  // --- SUBSCRIPTIONS (MEDIA) ---
  { id: uuidv4(), title: "Netflix Premium (1 Month)", gameCategory: "Media", category: "subscription", planType: "Monthly", originalPriceTND: 40.0, discountedPriceTND: 36.0, imagePath: "images/media/netflix.png", brandColor: "rgba(229, 9, 20, 0.6)", isTrending: false, isPopular: true, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Netflix Premium (1 Year)", gameCategory: "Media", category: "subscription", planType: "Yearly", originalPriceTND: 480.0, discountedPriceTND: 410.0, imagePath: "images/media/netflix.png", brandColor: "rgba(229, 9, 20, 0.6)", isTrending: false, isPopular: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },

  { id: uuidv4(), title: "Spotify Premium (1 Month)", gameCategory: "Media", category: "subscription", planType: "Monthly", originalPriceTND: 15.0, discountedPriceTND: 12.0, imagePath: "images/media/spotify.avif", brandColor: "rgba(29, 185, 84, 0.6)", isTrending: false, isPopular: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" },
  { id: uuidv4(), title: "Spotify Premium (1 Year)", gameCategory: "Media", category: "subscription", planType: "Yearly", originalPriceTND: 180.0, discountedPriceTND: 130.0, imagePath: "images/media/spotify.avif", brandColor: "rgba(29, 185, 84, 0.6)", isTrending: false, isPopular: false, stockStatus: "IN_STOCK", deliveryTime: "Instant" }
];
