// frontend/src/data/products.js
export const PRODUCTS = [
  // ELECTRONICS
  {
    _id: '1', slug: 'airpods-pro', name: 'AirPods Pro', brand: 'Apple',
    price: 249, discountPrice: 199,
    images: ['https://images.unsplash.com/photo-1606841838395-a0f77d6c4d87?w=500', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500'],
    category: 'electronics', rating: 4.8, numReviews: 328,
    stock: 45, featured: true, trending: true,
    description: 'Premium wireless earbuds with active noise cancellation',
    specifications: { connectivity: 'Bluetooth 5.3', battery: '6hrs', charging: 'Wireless' },
    tags: ['wireless', 'noise-cancelling', 'premium'],
    reviews: [
      { author: 'Sarah M.', rating: 5, comment: 'Best earbuds I\'ve ever owned!', date: '2024-05-10', verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
      { author: 'John D.', rating: 4, comment: 'Great sound quality', date: '2024-05-05', verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' }
    ]
  },
  {
    _id: '2', slug: 'samsung-monitor', name: '34" Ultra Wide Monitor', brand: 'Samsung',
    price: 499, discountPrice: 399,
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500'],
    category: 'electronics', rating: 4.7, numReviews: 156,
    stock: 12, featured: true, trending: false,
    description: '3440x1440 resolution, 144Hz refresh rate',
    specifications: { resolution: '3440x1440', refreshRate: '144Hz', panel: 'VA' },
    tags: ['gaming', 'ultrawide', 'professional'],
    reviews: [
      { author: 'Alex T.', rating: 5, comment: 'Perfect for gaming and work', date: '2024-05-08', verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' }
    ]
  },
  {
    _id: '3', slug: 'macbook-pro-16', name: 'MacBook Pro 16"', brand: 'Apple',
    price: 2499, discountPrice: 2299,
    images: ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500'],
    category: 'electronics', rating: 4.9, numReviews: 412,
    stock: 8, featured: true, trending: true,
    description: 'M3 Max chip, 36GB unified memory',
    specifications: { cpu: 'M3 Max', ram: '36GB', storage: '512GB' },
    tags: ['laptop', 'professional', 'apple'],
    reviews: [
      { author: 'Dev Pro', rating: 5, comment: 'Best laptop for development', date: '2024-05-02', verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DevPro' }
    ]
  },
  {
    _id: '4', slug: 'sony-headphones', name: 'Sony WH-1000XM5', brand: 'Sony',
    price: 399, discountPrice: 349,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
    category: 'electronics', rating: 4.8, numReviews: 287,
    stock: 23, featured: false, trending: true,
    description: 'Industry-leading noise cancelling',
    specifications: { connectivity: 'Bluetooth 5.2', battery: '30hrs', noiseCancel: 'Yes' },
    tags: ['headphones', 'wireless', 'audio'],
    reviews: [
      { author: 'Music Lover', rating: 5, comment: 'Crystal clear sound', date: '2024-04-28', verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Music' }
    ]
  },
  {
    _id: '5', slug: 'ipad-air', name: 'iPad Air', brand: 'Apple',
    price: 599, discountPrice: 549,
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'],
    category: 'electronics', rating: 4.7, numReviews: 201,
    stock: 34, featured: true, trending: false,
    description: '11-inch display, M1 chip',
    specifications: { screen: '11-inch', chip: 'M1', storage: '256GB' },
    tags: ['tablet', 'apple', 'portable'],
    reviews: []
  },
  {
    _id: '6', slug: 'rtx-4090', name: 'NVIDIA RTX 4090', brand: 'NVIDIA',
    price: 1599, discountPrice: 1449,
    images: ['https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500'],
    category: 'gaming', rating: 4.9, numReviews: 156,
    stock: 5, featured: true, trending: true,
    description: 'Flagship gaming GPU, 24GB VRAM',
    specifications: { vram: '24GB', memory: 'GDDR6X', power: '450W' },
    tags: ['gpu', 'gaming', 'professional'],
    reviews: [
      { author: 'Gamer Pro', rating: 5, comment: '4K gaming at 144fps', date: '2024-05-01', verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gamer' }
    ]
  },
  {
    _id: '7', slug: 'gaming-mouse', name: 'Logitech G Pro X2', brand: 'Logitech',
    price: 169, discountPrice: 139,
    images: ['https://images.unsplash.com/photo-1527814050087-3793815479db?w=500'],
    category: 'gaming', rating: 4.8, numReviews: 342,
    stock: 89, featured: false, trending: true,
    description: 'Lightweight gaming mouse with 32k DPI',
    specifications: { dpi: '32000', weight: '63g', polling: '8000Hz' },
    tags: ['mouse', 'gaming', 'esports'],
    reviews: [
      { author: 'Esports Player', rating: 5, comment: 'Perfect for competitive gaming', date: '2024-04-25', verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Esports' }
    ]
  },
  {
    _id: '8', slug: 'mechanical-keyboard', name: 'Keychron K8 Pro', brand: 'Keychron',
    price: 159, discountPrice: 129,
    images: ['https://images.unsplash.com/photo-1587829191301-11ec59a44f38?w=500'],
    category: 'gaming', rating: 4.6, numReviews: 278,
    stock: 56, featured: false, trending: false,
    description: 'Aluminum mechanical keyboard with RGB',
    specifications: { switch: 'Gateron', layout: '96-key', connectivity: 'BT + USB' },
    tags: ['keyboard', 'mechanical', 'gaming'],
    reviews: []
  },
  {
    _id: '9', slug: 'gaming-chair', name: 'Herman Miller x Logitech', brand: 'Herman Miller',
    price: 1395, discountPrice: 1295,
    images: ['https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500'],
    category: 'gaming', rating: 4.9, numReviews: 89,
    stock: 12, featured: true, trending: true,
    description: 'Premium gaming chair with lumbar support',
    specifications: { material: 'Mesh', tilt: '12°', height: 'Adjustable' },
    tags: ['chair', 'gaming', 'ergonomic'],
    reviews: [
      { author: 'Streamer', rating: 5, comment: '12-hour sessions no problem', date: '2024-05-03', verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Stream' }
    ]
  },
  {
    _id: '10', slug: 'ps5-console', name: 'PlayStation 5', brand: 'Sony',
    price: 499, discountPrice: 449,
    images: ['https://images.unsplash.com/photo-1605559424843-9e4c3ca3361f?w=500'],
    category: 'gaming', rating: 4.7, numReviews: 523,
    stock: 21, featured: true, trending: false,
    description: '4K gaming console with SSD',
    specifications: { cpu: 'AMD Zen 2', gpu: 'RDNA 2', storage: '825GB' },
    tags: ['console', 'gaming', 'sony'],
    reviews: [
      { author: 'Console Gamer', rating: 5, comment: 'Next-gen gaming at its finest', date: '2024-04-20', verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Console' }
    ]
  },
  // FASHION
  {
    _id: '11', slug: 'cashmere-hoodie', name: 'Premium Cashmere Hoodie', brand: 'Loro Piana',
    price: 895, discountPrice: 795,
    images: ['https://images.unsplash.com/photo-1556821552-28fcb33ba3f0?w=500'],
    category: 'fashion', rating: 4.8, numReviews: 124,
    stock: 34, featured: true, trending: true,
    description: '100% pure cashmere, luxury comfort',
    specifications: { material: 'Cashmere 100%', fit: 'Relaxed', care: 'Dry clean' },
    tags: ['hoodie', 'luxury', 'cashmere'],
    reviews: [
      { author: 'Fashion Guru', rating: 5, comment: 'Unbelievably soft', date: '2024-05-09', verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fashion' }
    ]
  },
  {
    _id: '12', slug: 'designer-jeans', name: 'Denim Masterpiece', brand: 'Levi\'s Vintage',
    price: 298, discountPrice: 248,
    images: ['https://images.unsplash.com/photo-1582418702059-53c19a60605e?w=500'],
    category: 'fashion', rating: 4.6, numReviews: 267,
    stock: 78, featured: false, trending: true,
    description: 'Japanese selvedge denim, limited edition',
    specifications: { material: 'Denim', fit: 'Slim', wash: 'Indigo' },
    tags: ['jeans', 'vintage', 'luxury'],
    reviews: []
  },
  {
    _id: '13', slug: 'silk-shirt', name: 'Silk Button-Up', brand: 'Hermès',
    price: 1250, discountPrice: 1050,
    images: ['https://images.unsplash.com/photo-1548126032-ead4600d5fd5?w=500'],
    category: 'fashion', rating: 4.9, numReviews: 87,
    stock: 16, featured: true, trending: false,
    description: 'Pure silk, hand-stitched details',
    specifications: { material: 'Silk 100%', closure: 'Buttons', fit: 'Regular' },
    tags: ['shirt', 'silk', 'luxury'],
    reviews: [
      { author: 'Luxury Shopper', rating: 5, comment: 'Absolutely divine', date: '2024-05-06', verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luxury' }
    ]
  },
  {
    _id: '14', slug: 'wool-coat', name: 'Wool Overcoat', brand: 'Burberry',
    price: 1895, discountPrice: 1695,
    images: ['https://images.unsplash.com/photo-1539533857671-cbe660dbde2d?w=500'],
    category: 'fashion', rating: 4.7, numReviews: 156,
    stock: 24, featured: true, trending: true,
    description: 'Classic wool blend, timeless design',
    specifications: { material: 'Wool blend', length: 'Long', lining: 'Silk' },
    tags: ['coat', 'wool', 'classic'],
    reviews: []
  },
  {
    _id: '15', slug: 'leather-jacket', name: 'Leather Perfecto', brand: 'Schott NYC',
    price: 595, discountPrice: 495,
    images: ['https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500'],
    category: 'fashion', rating: 4.8, numReviews: 289,
    stock: 42, featured: false, trending: true,
    description: 'Iconic motorcycle jacket, made in USA',
    specifications: { material: 'Leather', fit: 'Classic', pockets: '4' },
    tags: ['jacket', 'leather', 'iconic'],
    reviews: [
      { author: 'Biker', rating: 5, comment: 'Perfect fit and quality', date: '2024-04-30', verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Biker' }
    ]
  },
  // SNEAKERS & SHOES
  {
    _id: '16', slug: 'jordan-1-retro', name: 'Air Jordan 1 Retro High OG', brand: 'Jordan',
    price: 170, discountPrice: 140,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
    category: 'shoes', rating: 4.9, numReviews: 1203,
    stock: 156, featured: true, trending: true,
    description: 'Classic sneaker, collectible design',
    specifications: { size: 'US 7-14', material: 'Leather', color: 'Black/Red' },
    tags: ['sneaker', 'jordan', 'collectible'],
    reviews: [
      { author: 'Sneakerhead', rating: 5, comment: 'Iconic shoe', date: '2024-05-07', verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneaker' }
    ]
  },
  {
    _id: '17', slug: 'yeezy-foam-runner', name: 'Yeezy Foam Runner', brand: 'Adidas x Kanye',
    price: 200, discountPrice: 160,
    images: ['https://images.unsplash.com/photo-1460353581641-694a41cdc56e?w=500'],
    category: 'shoes', rating: 4.6, numReviews: 432,
    stock: 89, featured: true, trending: true,
    description: 'Futuristic design, comfort-focused',
    specifications: { size: 'US 5-14', material: 'EVA foam', color: 'Tan' },
    tags: ['sneaker', 'yeezy', 'design'],
    reviews: []
  },
  {
    _id: '18', slug: 'common-projects', name: 'Common Projects Achilles', brand: 'Common Projects',
    price: 425, discountPrice: 375,
    images: ['https://images.unsplash.com/photo-1520675539914-3f3ee5e92d3e?w=500'],
    category: 'shoes', rating: 4.7, numReviews: 267,
    stock: 45, featured: true, trending: false,
    description: 'Minimalist luxury sneaker',
    specifications: { size: 'EU 38-46', material: 'Leather', color: 'White' },
    tags: ['luxury', 'minimalist', 'white'],
    reviews: [
      { author: 'Minimalist', rating: 5, comment: 'Perfect minimalist shoe', date: '2024-05-04', verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Min' }
    ]
  },
  {
    _id: '19', slug: 'louboutin-heels', name: 'Louboutin Pumps', brand: 'Christian Louboutin',
    price: 795, discountPrice: 695,
    images: ['https://images.unsplash.com/photo-1543163521-9145f2c742f5?w=500'],
    category: 'shoes', rating: 4.8, numReviews: 178,
    stock: 23, featured: true, trending: true,
    description: 'Iconic red sole luxury heels',
    specifications: { size: 'US 5-11', material: 'Leather', heel: '4.5"' },
    tags: ['heels', 'luxury', 'iconic'],
    reviews: []
  },
  {
    _id: '20', slug: 'timberland-boots', name: 'Timberland 6-Inch Premium', brand: 'Timberland',
    price: 189, discountPrice: 149,
    images: ['https://images.unsplash.com/photo-1542618827-84e039b8cde9?w=500'],
    category: 'shoes', rating: 4.7, numReviews: 523,
    stock: 134, featured: false, trending: true,
    description: 'Waterproof leather boots, durable',
    specifications: { size: 'US 6-15', material: 'Leather', waterproof: 'Yes' },
    tags: ['boots', 'durable', 'classic'],
    reviews: [
      { author: 'Adventure Seeker', rating: 5, comment: 'Built to last', date: '2024-04-29', verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Adventure' }
    ]
  },
  // WATCHES
  {
    _id: '21', slug: 'rolex-submariner', name: 'Rolex Submariner', brand: 'Rolex',
    price: 9850, discountPrice: 9000,
    images: ['https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500'],
    category: 'watches', rating: 4.9, numReviews: 234,
    stock: 3, featured: true, trending: true,
    description: 'Luxury diving watch, status symbol',
    specifications: { movement: 'Automatic', waterproof: '300m', case: 'Stainless Steel' },
    tags: ['luxury', 'dive', 'investment'],
    reviews: [
      { author: 'Watch Collector', rating: 5, comment: 'Timeless masterpiece', date: '2024-05-10', verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Watch' }
    ]
  },
  {
    _id: '22', slug: 'omega-seamaster', name: 'Omega Seamaster Planet Ocean', brand: 'Omega',
    price: 5295, discountPrice: 4795,
    images: ['https://images.unsplash.com/photo-1548690312-e37b50d50d5e?w=500'],
    category: 'watches', rating: 4.8, numReviews: 167,
    stock: 5, featured: true, trending: false,
    description: 'Professional dive watch',
    specifications: { movement: 'Co-Axial', waterproof: '600m', case: 'Titanium' },
    tags: ['luxury', 'professional', 'dive'],
    reviews: []
  },
  {
    _id: '23', slug: 'ap-royal-oak', name: 'Audemars Piguet Royal Oak', brand: 'Audemars Piguet',
    price: 32500, discountPrice: 30000,
    images: ['https://images.unsplash.com/photo-1507652313519-d4dc5ebe6a10?w=500'],
    category: 'watches', rating: 4.9, numReviews: 89,
    stock: 1, featured: true, trending: true,
    description: 'Iconic integrated bracelet design',
    specifications: { movement: 'Automatic', waterproof: '50m', case: 'White Gold' },
    tags: ['luxury', 'investment', 'iconic'],
    reviews: [
      { author: 'Luxury Collector', rating: 5, comment: 'The most beautiful watch ever made', date: '2024-05-01', verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Collector' }
    ]
  },
  // ACCESSORIES
  {
    _id: '24', slug: 'louis-vuitton-neverfull', name: 'Louis Vuitton Neverfull MM', brand: 'Louis Vuitton',
    price: 1320, discountPrice: 1200,
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500'],
    category: 'accessories', rating: 4.8, numReviews: 456,
    stock: 12, featured: true, trending: true,
    description: 'Classic monogram canvas tote',
    specifications: { material: 'Canvas', size: 'MM', handles: 'Leather' },
    tags: ['bag', 'luxury', 'iconic'],
    reviews: []
  },
  {
    _id: '25', slug: 'hermes-birkin', name: 'Hermès Birkin 30', brand: 'Hermès',
    price: 12500, discountPrice: 11000,
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500'],
    category: 'accessories', rating: 4.9, numReviews: 234,
    stock: 2, featured: true, trending: true,
    description: 'The ultimate luxury bag, investment piece',
    specifications: { material: 'Togo Leather', size: '30cm', hardware: 'Gold' },
    tags: ['bag', 'luxury', 'investment'],
    reviews: [
      { author: 'Luxury Bag Lover', rating: 5, comment: 'Worth every penny', date: '2024-04-15', verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Birkin' }
    ]
  },
  {
    _id: '26', slug: 'cartier-love-bracelet', name: 'Cartier Love Bracelet', brand: 'Cartier',
    price: 8550, discountPrice: 7950,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500'],
    category: 'accessories', rating: 4.8, numReviews: 312,
    stock: 8, featured: true, trending: false,
    description: 'Iconic love bracelet, yellow gold',
    specifications: { material: 'Yellow Gold', size: 'Medium', weight: '28g' },
    tags: ['bracelet', 'luxury', 'iconic'],
    reviews: []
  },
  {
    _id: '27', slug: 'gucci-sunglasses', name: 'Gucci GG Sunglasses', brand: 'Gucci',
    price: 385, discountPrice: 320,
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500'],
    category: 'accessories', rating: 4.6, numReviews: 178,
    stock: 34, featured: false, trending: true,
    description: 'Classic GG frame design',
    specifications: { material: 'Acetate', lens: 'Dark', uv: '100%' },
    tags: ['sunglasses', 'designer', 'luxury'],
    reviews: [
      { author: 'Style Icon', rating: 5, comment: 'Perfect for summer', date: '2024-05-05', verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Style' }
    ]
  },
  {
    _id: '28', slug: 'mont-blanc-pen', name: 'Montblanc Meisterstück', brand: 'Montblanc',
    price: 645, discountPrice: 595,
    images: ['https://images.unsplash.com/photo-1578778356167-f1a91c472b37?w=500'],
    category: 'accessories', rating: 4.7, numReviews: 145,
    stock: 28, featured: true, trending: false,
    description: 'Premium fountain pen, collector\'s item',
    specifications: { type: 'Fountain pen', material: 'Resin', nib: 'Gold' },
    tags: ['pen', 'luxury', 'writing'],
    reviews: []
  },
  // Add more products to reach 50+...
  {
    _id: '29', slug: 'sony-a7r-iv', name: 'Sony a7R IV', brand: 'Sony',
    price: 3198, discountPrice: 2999,
    images: ['https://images.unsplash.com/photo-1610198188545-cb8465cb1d0e?w=500'],
    category: 'electronics', rating: 4.9, numReviews: 289,
    stock: 6, featured: true, trending: true,
    description: '61MP mirrorless camera, professional grade',
    specifications: { megapixels: '61MP', sensor: 'Full Frame', video: '4K' },
    tags: ['camera', 'photography', 'professional'],
    reviews: []
  },
  {
    _id: '30', slug: 'canon-eos-r5', name: 'Canon EOS R5', brand: 'Canon',
    price: 3899, discountPrice: 3599,
    images: ['https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500'],
    category: 'electronics', rating: 4.8, numReviews: 234,
    stock: 8, featured: true, trending: false,
    description: '45MP full-frame mirrorless camera',
    specifications: { megapixels: '45MP', sensor: 'Full Frame', video: '8K' },
    tags: ['camera', 'professional', '8K'],
    reviews: [
      { author: 'Photographer', rating: 5, comment: 'Best camera for 8K', date: '2024-05-08', verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Photographer' }
    ]
  },
  {
    _id: '31', slug: 'nimbus-smart-lamp', name: 'Nimbus Smart Lamp', brand: 'Nimbus',
    price: 149, discountPrice: 119,
    images: ['https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=500'],
    category: 'home-decor', rating: 4.6, numReviews: 88,
    stock: 32, featured: true, trending: false,
    description: 'Voice-controlled ambient lamp with adaptive lighting',
    specifications: { lighting: 'RGB + Warm', control: 'Voice + App', power: '18W' },
    tags: ['smart-home', 'lighting', 'ambient'],
    reviews: [
      { author: 'Lina K.', rating: 5, comment: 'Perfect mood lighting for evenings', date: '2024-04-22', verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lina' }
    ]
  },
  {
    _id: '32', slug: 'luxe-marble-table', name: 'Luxe Marble Side Table', brand: 'Nordic Studio',
    price: 329, discountPrice: 289,
    images: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500'],
    category: 'home-decor', rating: 4.7, numReviews: 54,
    stock: 14, featured: false, trending: true,
    description: 'Hand-finished marble top with brushed brass legs',
    specifications: { material: 'Marble + Brass', height: '22in', weight: '12kg' },
    tags: ['furniture', 'luxury', 'home'],
    reviews: []
  },
  {
    _id: '33', slug: 'nordic-shelf', name: 'Nordic Minimalist Shelf', brand: 'Haven',
    price: 189, discountPrice: 159,
    images: ['https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=500'],
    category: 'home-decor', rating: 4.5, numReviews: 62,
    stock: 26, featured: false, trending: true,
    description: 'Floating shelf set with matte oak finish',
    specifications: { material: 'Oak', size: '36in', finish: 'Matte' },
    tags: ['storage', 'minimal', 'decor'],
    reviews: []
  },
  {
    _id: '34', slug: 'aroma-glass-diffuser', name: 'Aroma Glass Diffuser', brand: 'ZenMood',
    price: 79, discountPrice: 59,
    images: ['https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=500'],
    category: 'home-decor', rating: 4.8, numReviews: 118,
    stock: 60, featured: true, trending: true,
    description: 'Ultrasonic diffuser with soft glass design',
    specifications: { capacity: '300ml', runtime: '8hrs', lighting: 'Soft Glow' },
    tags: ['aroma', 'relax', 'home'],
    reviews: [
      { author: 'Maya', rating: 5, comment: 'My room smells amazing now', date: '2024-05-06', verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya' }
    ]
  },
  {
    _id: '35', slug: 'velvet-throw', name: 'Velvet Throw Blanket', brand: 'CozyCloud',
    price: 89, discountPrice: 69,
    images: ['https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500'],
    category: 'home-decor', rating: 4.4, numReviews: 44,
    stock: 72, featured: false, trending: false,
    description: 'Ultra-soft velvet blanket with premium stitching',
    specifications: { size: '60x80', material: 'Velvet', weight: '1.2kg' },
    tags: ['blanket', 'cozy', 'textile'],
    reviews: []
  },
  {
    _id: '36', slug: 'studio-headphone-stand', name: 'Studio Headphone Stand', brand: 'Orbit',
    price: 49, discountPrice: 39,
    images: ['https://images.unsplash.com/photo-1511376777868-611b54f68947?w=500'],
    category: 'accessories', rating: 4.3, numReviews: 33,
    stock: 90, featured: false, trending: false,
    description: 'Minimal aluminum stand for premium headphones',
    specifications: { material: 'Aluminum', height: '10in', base: 'Non-slip' },
    tags: ['desk', 'audio', 'accessory'],
    reviews: []
  },
  {
    _id: '37', slug: 'titan-watch', name: 'Titan Stainless Watch', brand: 'Titan',
    price: 599, discountPrice: 529,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
    category: 'watches', rating: 4.7, numReviews: 96,
    stock: 18, featured: true, trending: true,
    description: 'Stainless steel watch with sapphire glass',
    specifications: { movement: 'Automatic', waterResist: '50m', glass: 'Sapphire' },
    tags: ['watch', 'luxury', 'steel'],
    reviews: [
      { author: 'Jordan', rating: 5, comment: 'Feels premium and looks sharp', date: '2024-05-01', verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan' }
    ]
  },
  {
    _id: '38', slug: 'apex-chronograph', name: 'Apex Chronograph', brand: 'Apex',
    price: 749, discountPrice: 699,
    images: ['https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=500'],
    category: 'watches', rating: 4.6, numReviews: 73,
    stock: 10, featured: false, trending: true,
    description: 'Chronograph watch with premium leather strap',
    specifications: { movement: 'Quartz', strap: 'Leather', waterResist: '30m' },
    tags: ['chronograph', 'leather', 'classic'],
    reviews: []
  },
  {
    _id: '39', slug: 'classic-leather-wallet', name: 'Classic Leather Wallet', brand: 'Atlas',
    price: 69, discountPrice: 49,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'],
    category: 'accessories', rating: 4.5, numReviews: 58,
    stock: 110, featured: false, trending: false,
    description: 'Full-grain leather wallet with RFID protection',
    specifications: { material: 'Leather', slots: '8', rfid: 'Yes' },
    tags: ['wallet', 'leather', 'accessory'],
    reviews: []
  },
  {
    _id: '40', slug: 'minimal-travel-backpack', name: 'Minimal Travel Backpack', brand: 'Voyage',
    price: 189, discountPrice: 159,
    images: ['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500'],
    category: 'accessories', rating: 4.7, numReviews: 145,
    stock: 40, featured: true, trending: false,
    description: 'Water-resistant backpack with tech compartments',
    specifications: { capacity: '24L', material: 'Nylon', pockets: '12' },
    tags: ['backpack', 'travel', 'tech'],
    reviews: []
  },
  {
    _id: '41', slug: 'runner-pro-sneakers', name: 'Runner Pro Sneakers', brand: 'Nimbus',
    price: 139, discountPrice: 119,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
    category: 'sneakers', rating: 4.8, numReviews: 204,
    stock: 74, featured: true, trending: true,
    description: 'Ultra-light running shoes with cloud foam',
    specifications: { material: 'Knit', weight: '230g', sole: 'Cloud Foam' },
    tags: ['running', 'sneakers', 'sport'],
    reviews: []
  },
  {
    _id: '42', slug: 'urban-high-top', name: 'Urban Street High-Top', brand: 'Studio',
    price: 159, discountPrice: 129,
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500'],
    category: 'sneakers', rating: 4.6, numReviews: 91,
    stock: 55, featured: false, trending: true,
    description: 'High-top sneakers with premium suede finish',
    specifications: { material: 'Suede', sole: 'Rubber', fit: 'True to size' },
    tags: ['streetwear', 'sneakers', 'fashion'],
    reviews: []
  },
  {
    _id: '43', slug: 'cloudflex-knit', name: 'CloudFlex Knit Sneakers', brand: 'CloudFlex',
    price: 129, discountPrice: 109,
    images: ['https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=500'],
    category: 'sneakers', rating: 4.5, numReviews: 67,
    stock: 86, featured: false, trending: false,
    description: 'Breathable knit sneakers for all-day comfort',
    specifications: { material: 'Knit', weight: '240g', sole: 'Memory Foam' },
    tags: ['comfort', 'sneakers', 'casual'],
    reviews: []
  },
  {
    _id: '44', slug: 'esports-guide', name: 'The Esports Strategy Guide', brand: 'Pulse Press',
    price: 29, discountPrice: 24,
    images: ['https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500'],
    category: 'books', rating: 4.6, numReviews: 43,
    stock: 120, featured: false, trending: false,
    description: 'Master competitive gaming with data-driven strategies',
    specifications: { pages: '320', format: 'Hardcover', publisher: 'Pulse Press' },
    tags: ['book', 'gaming', 'strategy'],
    reviews: []
  },
  {
    _id: '45', slug: 'design-systems-handbook', name: 'Design Systems Handbook', brand: 'Studio Editions',
    price: 39, discountPrice: 32,
    images: ['https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500'],
    category: 'books', rating: 4.8, numReviews: 98,
    stock: 90, featured: true, trending: true,
    description: 'Build scalable design systems like the pros',
    specifications: { pages: '280', format: 'Paperback', publisher: 'Studio Editions' },
    tags: ['book', 'design', 'product'],
    reviews: []
  },
  {
    _id: '46', slug: 'mindful-productivity', name: 'Mindful Productivity', brand: 'Aurora',
    price: 24, discountPrice: 19,
    images: ['https://images.unsplash.com/photo-1496104679561-38b3b4d15b24?w=500'],
    category: 'books', rating: 4.4, numReviews: 52,
    stock: 140, featured: false, trending: false,
    description: 'A calm approach to focus, balance, and creativity',
    specifications: { pages: '240', format: 'Paperback', publisher: 'Aurora' },
    tags: ['book', 'wellness', 'focus'],
    reviews: []
  },
  {
    _id: '47', slug: 'saas-growth-playbook', name: 'SaaS Growth Playbook', brand: 'Scale Press',
    price: 34, discountPrice: 28,
    images: ['https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=500'],
    category: 'books', rating: 4.7, numReviews: 61,
    stock: 70, featured: false, trending: true,
    description: 'Growth frameworks from top SaaS leaders',
    specifications: { pages: '310', format: 'Hardcover', publisher: 'Scale Press' },
    tags: ['book', 'business', 'saas'],
    reviews: []
  },
  {
    _id: '48', slug: 'smart-home-hub-mini', name: 'Smart Home Hub Mini', brand: 'Luma',
    price: 129, discountPrice: 99,
    images: ['https://images.unsplash.com/photo-1512446733611-9099a758e63c?w=500'],
    category: 'electronics', rating: 4.5, numReviews: 88,
    stock: 45, featured: false, trending: true,
    description: 'Control all your smart devices with a single hub',
    specifications: { connectivity: 'WiFi + Zigbee', voice: 'Alexa/Google', size: 'Compact' },
    tags: ['smart-home', 'hub', 'automation'],
    reviews: []
  },
  {
    _id: '49', slug: 'studio-4k-webcam', name: 'Studio 4K Webcam', brand: 'Focus',
    price: 199, discountPrice: 179,
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'],
    category: 'electronics', rating: 4.6, numReviews: 102,
    stock: 36, featured: true, trending: false,
    description: '4K webcam with AI framing and studio mic',
    specifications: { resolution: '4K', mic: 'Dual', autofocus: 'Yes' },
    tags: ['webcam', 'streaming', 'remote-work'],
    reviews: []
  },
  {
    _id: '50', slug: 'vr-quest-elite', name: 'VR Quest Elite', brand: 'VisionX',
    price: 699, discountPrice: 649,
    images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=500'],
    category: 'gaming', rating: 4.7, numReviews: 132,
    stock: 20, featured: true, trending: true,
    description: 'Next-gen VR headset with 4K per eye',
    specifications: { resolution: '4K', refreshRate: '120Hz', storage: '256GB' },
    tags: ['vr', 'gaming', 'immersive'],
    reviews: []
  }
];

export const CATEGORIES = [
  { id: 1, title: 'Electronics', value: 'electronics', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600', count: 12 },
  { id: 2, title: 'Gaming', value: 'gaming', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600', count: 9 },
  { id: 3, title: 'Fashion', value: 'fashion', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600', count: 7 },
  { id: 4, title: 'Sneakers', value: 'sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', count: 6 },
  { id: 5, title: 'Watches', value: 'watches', image: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=600', count: 4 },
  { id: 6, title: 'Accessories', value: 'accessories', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600', count: 6 },
  { id: 7, title: 'Home Decor', value: 'home-decor', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600', count: 8 },
  { id: 8, title: 'Books', value: 'books', image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600', count: 6 },
];

export const TESTIMONIALS = [
  { author: 'Sarah Anderson', role: 'Product Designer', quote: 'ShopSphere Pro is my favorite place to shop. The UI is incredible!', rating: 5, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { author: 'Mike Chen', role: 'Software Engineer', quote: 'Best online shopping experience I\'ve had. Highly recommend!', rating: 5, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
  { author: 'Emma Johnson', role: 'Fashion Blogger', quote: 'The product quality and variety is unmatched. Love it!', rating: 5, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' },
  { author: 'Alex Rodriguez', role: 'CEO', quote: 'Outstanding service and premium selection. 5 stars!', rating: 5, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
];
