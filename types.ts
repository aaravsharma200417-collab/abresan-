
export enum UserRole {
  ADMIN = 'ADMIN',
  SUPPORT = 'SUPPORT',
  CUSTOMER = 'CUSTOMER'
}

export interface BrandDiscount {
  brand: string;
  percentage: number;
}

export interface User {
  id: string;
  fullName: string;
  email?: string;
  phone: string;
  password?: string;
  role: UserRole;
  passwordHash?: string;
  avatar?: string;
  permissions?: string[];
  brandDiscounts?: BrandDiscount[];
  nationalId?: string;
  company?: string;
  city?: string;
  province?: string;
  address?: string;
}

export type LogLevel = 'info' | 'warning' | 'danger' | 'success';

export interface Log {
  id: string;
  userId: string;
  userFullName: string;
  action: string;
  details?: string;
  timestamp: string;
  level: LogLevel;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductVariation {
  size: string;
  price: number;
  off?: string;
  stock?: number;
  inStock?: boolean;
  sku?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  categories?: string[];
  price: number;
  oldPrice?: number;
  image: string;
  gallery?: string[];
  description: string;
  longDescription?: string;
  specs?: ProductSpec[];
  stockStatus?: 'available' | 'low' | 'unavailable' | 'callForInquiry';
  sku?: string;
  brand?: string;
  size?: string;
  connectionSizes?: string[];
  date?: string;
  off?: string;
  stock?: number;
  tags?: string[];
  inStock?: boolean;
  isNew?: boolean;
  isSpecial?: boolean;
  isBestSeller?: boolean;
  hasWarranty?: boolean;
  warrantyYears?: number;
  warrantyDuration?: string;
  isVariation?: boolean;
  variations?: ProductVariation[];
  faqs?: { q: string, a: string }[];
  origin?: string;
  approved?: boolean;
  standardCode?: string;
  unit?: string;
  focusKeyphrase?: string;
  seoTitle?: string;
  seoDescription?: string;
  slug?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image?: string;
}

export interface PriceListDoc {
  id: string;
  title: string;
  brand?: string;
  date?: string;
  fileSize?: string;
  url?: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  groundingSources?: GroundingSource[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  category: string;
  date: string;
  updatedAt?: string;
  readTime: string;
  image: string;
  author: string;
  views: number;
  tags: string[];
  difficulty: 'ساده' | 'متوسط' | 'تخصصی';
  content?: string;
  featured?: boolean;
  status: 'draft' | 'published';
  focusKeyphrase?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  department: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied';
}

export interface ContactBranch {
  id: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  type: string;
  mapEmbedUrl?: string; // Add field for map
  lat?: string;
  lng?: string;
}

export interface HeroSlide {
  id: string;
  subtitle: string;
  title: string;
  description: string;
  image: string;
  cta: string;
  color: string;
  linkType: 'products' | 'pricelists' | 'contact' | 'external';
  titleSize?: string;
  subtitleSize?: string;
  descriptionSize?: string;
  linkUrl?: string;
}

export interface FeaturedCategory {
  id: string;
  name: string;
  image: string;
}

export interface AuthorizedDealer {
  id: string;
  name: string;
  image?: string;
  pdfUrl?: string;
  link?: string;
}

export interface HomeContent {
  brands: string[];
  featuredCategories: FeaturedCategory[];
  systemFeaturedCategories?: FeaturedCategory[];
  authorizedDealers?: AuthorizedDealer[];
  sliderCategories: Category[];
  aboutImage?: string;
}

export interface AdminProductFilters {
  brands: string[];
  sizes: string[];
  tags: string[];
}

export interface PaymentSettings {
  gatewayName: 'zarinpal' | 'behpardakht' | 'sadad' | 'nextpay';
  merchantId: string;
  terminalId?: string;
  isActive: boolean;
  callbackUrl: string;
  mode: 'sandbox' | 'live';
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  updatedAt?: string;
}

export interface FontSettings {
  primaryFont: string;
  headingFont: string;
  uiFont: string;
  numberFont: string;
  customCssImport?: string;
}

export interface BrandCatalog {
  id: string;
  brand: string;
  pdfUrl: string;
  fileName?: string;
  fileSize?: string;
  updatedAt?: string;
}

export interface SystemSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  secondaryPhone?: string;
  secondaryAddress?: string;
  technicalTicketUrl?: string;
  logo?: string;
  socialLinks: {
    instagram?: string;
    whatsapp?: string;
    telegram?: string;
    linkedin?: string;
    youtube?: string;
    aparat?: string;
    rubika?: string;
  };
  workingHours?: {
    weekdays: string;
    thursday: string;
    friday: string;
    sunday?: string;
  };
  branches?: ContactBranch[]; // Added branches
  heroSlides?: HeroSlide[]; // Added hero slides
  homeContent?: HomeContent; // Added home page content
  productFilters?: AdminProductFilters;
  brandCatalogs?: BrandCatalog[];
  trustBadges?: {
    enamad?: {
      link: string;
      code?: string;
      isActive: boolean;
    };
    samandehi?: {
      link: string;
      code?: string;
      isActive: boolean;
    };
    ecunion?: {
      link: string;
      code?: string;
      isActive: boolean;
    };
  };
  fonts?: FontSettings;
  enableMaintenanceMode: boolean;
  maintenanceMessage?: string;
  minOrderAmount: number;
  paymentSettings?: PaymentSettings;
  faqs?: FAQ[];
  smsConfig?: {
    provider: 'simulated' | 'ippanel' | 'kavenegar' | 'melipayamak' | 'custom';
    apiKey: string;
    senderNumber: string;
    otpPattern: string;         // Pattern ID for OTP
    orderPlacedPattern: string; // Pattern ID for order confirmation to customer
    orderAdminPattern: string;  // Pattern ID for notifying admin of a new order
    orderShippedPattern: string;// Pattern ID for order shipment confirmation
    templates?: {
      otp?: string;
      signup?: string;
      welcome?: string;
      passwordChanged?: string;
      orderPlaced?: string;
      orderShipped?: string;
      orderCompleted?: string;
      orderCancelled?: string;
      paymentVerified?: string;
      paymentRejected?: string;
      ticketRegistered?: string;
      ticketReplied?: string;
      consultation?: string;
      contactUs?: string;
    };
  };
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minPurchase?: number;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  status: 'active' | 'expired' | 'disabled';
  brand?: string;
  targetTags?: string[];
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  reply?: string;
  isVerifiedPurchase?: boolean;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: { [key: number]: number };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Proforma {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  discount: number;
  tax: number;
  finalPrice: number;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
    company?: string;
    nationalId?: string;
  };
  createdAt: string;
  expiryDate: string;
  status: 'pending' | 'converted' | 'expired';
}

export interface SupportMessage {
  id: string;
  senderId: string;
  senderName: string;
  role: 'user' | 'support';
  text: string;
  timestamp: string;
  file?: {
    url: string;
    name: string;
    type: string;
  };
  fileUrl?: string;
  fileName?: string;
  fileType?: string;
}

export interface SupportTicket {
  id: string;
  userId?: string;
  userName: string;
  userPhone: string;
  status: 'open' | 'active' | 'closed';
  lastMessage?: string;
  lastUpdate: string;
  createdAt: string;
  messages: SupportMessage[];
}

export interface FormalInvoiceRequest {
  id: string;
  orderId: string;
  userId: string;
  userName: string;
  userPhone: string;
  type: 'individual' | 'legal';
  name: string;
  nationalId: string;
  economicCode?: string;
  registrationNumber?: string;
  address: string;
  postalCode: string;
  phoneNumber: string;
  status: 'pending' | 'processed' | 'rejected';
  requestedAt: string;
  totalAmount: number;
  fileUrl?: string;
  fileName?: string;
  uploadedAt?: string;
}
