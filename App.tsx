import React, { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react';
import { MobileBottomNav } from './components/Layout/MobileBottomNav';
import { PRODUCTS, SLIDER_CATEGORIES, MENU_DATA } from './constants';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Layout/Header';
import { MegaMenu } from './components/Layout/MegaMenu';
import { Hero } from './components/Home/Hero';
import { CategorySlider } from './components/Home/CategorySlider';
import { Assistant } from './components/AI/Assistant';
import { Footer } from './components/Layout/Footer';
import { LoginPage } from './components/Auth/LoginPage';
import { CustomerPanel } from './components/Dashboard/CustomerPanel';
import { AdminPanel } from './components/Dashboard/AdminPanel';
import { SupportPanel } from './components/Dashboard/SupportPanel';
import { MaintenancePage } from './components/Layout/MaintenancePage';
import { CartDrawer } from './components/Cart/CartDrawer';
import { CartPage } from './components/Cart/CartPage';
import { CheckoutPage } from './components/Cart/CheckoutPage';
import { ProductDetail } from './components/Product/ProductDetail';
import { ComparisonPage } from './components/Product/ComparisonPage';
import { ComparisonFloatingBar } from './components/Product/ComparisonFloatingBar';
import { PriceListPage } from './components/PriceList/PriceListPage';
import { BlogPage } from './components/Blog/BlogPage';
import toast, { Toaster } from 'react-hot-toast';
import { requestService } from './services/requestService';
import { FavoritesPage } from './components/Favorites/FavoritesPage';
import { VisualCategoryGrid } from './components/Home/VisualCategoryGrid';
import { ContactPage } from './components/Contact/ContactPage';
import { ProductGrid } from './components/Home/ProductGrid';
import { CartProvider, useCart } from './context/CartContext';
import { ProductProvider, useProducts } from './context/ProductContext';
import { AdminProvider } from './context/AdminContext';
import { BlogProvider, useBlog } from './context/BlogContext';
import { User, UserRole, Product, AuthorizedDealer, SystemSettings } from './types';
import { smsService, NotificationType } from './services/smsService';
import BrandMarquee from "./components/Home/BrandMarquee";
import { 
  ArrowLeft, 
  ArrowRight,
  ChevronLeft, 
  ChevronRight,
  ShieldCheck, 
  Truck, 
  ArrowUpRight,
  Clock,
  Plus,
  Zap,
  Heart,
  Layers,
  CheckCircle2,
  Sparkles,
  PackageCheck,
  PhoneCall,
  User as UserIcon,
  Orbit,
  ArrowRightLeft,
  LayoutGrid,
  Droplets,
  Activity,
  Phone,
  BookOpen,
  Calendar,
  Eye,
  ArrowLeftCircle,
  Cpu,
  Tag,
  BarChart3,
  Bookmark,
  Factory,
  Globe,
  Settings,
  Waves,
  Microchip,
  Shield,
  Binary,
  Compass,
  ArrowUpLeft,
  MoveUpRight,
  History,
  Terminal,
  Radiation,
  Fingerprint,
  Headset
} from 'lucide-react';

const ViewContainer = ({ children }: { children: React.ReactNode, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="flex-1 flex flex-col h-full"
  >
    {children}
  </motion.div>
);

const REPRESENTED_BRANDS = [
  { id: 'r1', name: 'ویسپار', abbr: 'V' },
  { id: 'r2', name: 'آسایش آذربایجان', abbr: 'A' },
  { id: 'r3', name: 'مهر اتصال صفاهان', abbr: 'M' },
];

const LatestArticlesSection = ({ onBlogClick }: { onBlogClick: () => void }) => {
  const { posts } = useBlog();
  const publishedPosts = posts.filter(p => p.status === 'published');
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const next = useCallback(() => {
    if (publishedPosts.length === 0) return;
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % publishedPosts.length);
  }, [publishedPosts.length]);

  const prev = useCallback(() => {
    if (publishedPosts.length === 0) return;
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + publishedPosts.length) % publishedPosts.length);
  }, [publishedPosts.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5500);
    return () => clearInterval(interval);
  }, [next]);

  if (publishedPosts.length === 0) return null;

  return (
    <section className="relative py-8 md:py-16 px-[5%] bg-transparent overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        
        <div className="text-center mb-8 md:mb-12">
           <h3 className="text-[20px] md:text-4xl font-black text-slate-900">جدیدترین وبلاگ‌ها</h3>
        </div>

        <div className="relative h-[420px] md:h-[520px] flex items-center justify-center perspective-[2000px] preserve-3d">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            {publishedPosts.map((article, index) => {
              const offset = (index - activeIndex + publishedPosts.length) % publishedPosts.length;
              
              // Calculate relative position (-2, -1, 0, 1, 2)
              let relPos = offset;
              if (relPos > Math.floor(publishedPosts.length / 2)) relPos -= publishedPosts.length;
              
              const isActive = relPos === 0;
              const absPos = Math.abs(relPos);
              
              // Only show nearby articles
              if (absPos > 2) return null;

              return (
                <motion.div 
                   key={article.id}
                   initial={{ opacity: 0, scale: 0.8, x: direction * 50 }}
                   animate={{
                     opacity: 1 - absPos * 0.4,
                     scale: 1 - absPos * (isMobile ? 0.1 : 0.15),
                     x: isMobile ? relPos * 140 : relPos * 340,
                     z: isMobile ? -absPos * 100 : -absPos * 300,
                     rotateY: isMobile ? relPos * -15 : relPos * -30,
                     zIndex: 10 - absPos
                   }}
                   transition={{
                     type: "spring",
                     stiffness: 180,
                     damping: 20,
                     mass: 0.8
                   }}
                   onClick={() => isActive ? onBlogClick() : setActiveIndex(index)}
                   className="absolute cursor-pointer preserve-3d will-change-transform"
                   style={{
                     transformStyle: 'preserve-3d'
                   }}
                >
                   <div className={`w-[260px] md:w-[450px] bg-white rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] border border-slate-100 transition-all duration-300 ${isActive ? 'ring-[8px] md:ring-[14px] ring-primary/5 shadow-primary/10' : 'opacity-60'}`}>
                     <div className="h-[160px] md:h-[320px] w-full overflow-hidden relative group">
                       <img 
                         src={article.image} 
                         alt={article.title} 
                         className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                       />
                       <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/95  px-3 py-1 md:px-5 md:py-2 rounded-xl md:rounded-2xl text-[11px] md:text-[13px] font-black text-primary border border-primary/10 shadow-sm z-10">
                         {article.category}
                       </div>
                     </div>
                     
                     <div className="p-6 md:p-12 text-right bg-white">
                       <div className="flex items-center justify-end gap-2 md:gap-4 mb-3 md:mb-5 text-[10px] md:text-[13px] font-bold text-slate-400">
                         <span className="flex items-center gap-1.5"><Calendar className="w-[11px] h-[11px] md:w-3.5 md:h-3.5" /> {article.date}</span>
                         <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                         <span className="flex items-center gap-1.5"><Clock className="w-[11px] h-[11px] md:w-3.5 md:h-3.5" /> {article.readTime}</span>
                       </div>
                       <h4 className="text-sm md:text-2xl font-black text-slate-800 leading-tight mb-3 md:mb-5 hover:text-primary transition-colors line-clamp-2">
                         {article.title}
                       </h4>
                       <p className="text-[10px] md:text-sm text-slate-500 font-bold leading-relaxed line-clamp-2 opacity-70">
                         {article.excerpt || 'بررسی رفتارهای سیال در لوله‌های پلی‌اتیلن و تاثیر پارامترهای محیطی بر عمر مفید تجهیزات آبرسانی...'}
                       </p>
                     </div>
                   </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-6 md:gap-10 mt-10 md:mt-20">
          <button 
            onClick={prev} 
            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary text-white flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all shadow-xl shadow-primary/20 active:scale-90 group"
          >
            <ArrowRight className="w-[22px] h-[22px] md:w-7 md:h-7 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex gap-2.5 md:gap-4">
            {publishedPosts.map((_, i) => (
              <button 
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 md:h-2.5 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-8 md:w-12 bg-primary shadow-[0_0_10px_rgba(29,122,252,0.4)]' : 'w-2 md:w-2.5 bg-primary/20 hover:bg-primary/40'}`}
              />
            ))}
          </div>

          <button 
            onClick={next} 
            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary text-white flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all shadow-xl shadow-primary/20 active:scale-90 group"
          >
            <ArrowLeft className="w-[22px] h-[22px] md:w-7 md:h-7 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

const ProConsultationSection = () => {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await requestService.submitConsultation(formData.name, formData.phone);
      if (success) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({ name: '', phone: '' });
        }, 4000);
      }
    } catch (error) {
      console.error("Consultation request failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative py-12 px-4 md:px-6 font-vazir">
      <div className="max-w-[1800px] mx-auto relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-slate-200/40 via-white/20 to-slate-200/40 rounded-[2.5rem] blur-2xl opacity-50"></div>
        
        <div className="relative w-full bg-white/30  border border-white/60 rounded-[3rem] p-6 md:p-10 lg:p-12 shadow-[0_45px_100px_-30px_rgba(0,0,0,0.08),inset_0_0_120px_rgba(255,255,255,0.1)] overflow-hidden min-h-[480px] flex items-center">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-white/20 via-transparent to-transparent opacity-60"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-slate-200/10 rounded-full blur-[100px]"></div>
          </div>

          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.04
                }
              }
            }}
            
            
            className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10 w-full"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: 15 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="w-full lg:flex-1 text-right space-y-10 relative z-10"
            >
              {/* نشان (Badge) و تایتل اصلی */}
              <div 
                className="inline-flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 bg-white/40  px-8 md:px-12 py-8 md:py-10 rounded-[3rem] border border-white/60 shadow-2xl shadow-slate-200/20"
              >
                <div className="shrink-0 cursor-pointer" onClick={() => window.location.href = 'tel:09178006941'}>
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-[3rem] bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center shadow-2xl shadow-primary/40 border-4 border-white relative group/call overflow-hidden">
                    <motion.div
                      animate={{ 
                        rotate: [0, -10, 10, -10, 10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                      className="relative z-10"
                    >
                      <PhoneCall className="w-9 h-9 md:w-10 md:h-10" strokeWidth={2.5} />
                    </motion.div>
                    <motion.div 
                      animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                      className="absolute inset-0 bg-white/30 rounded-full animate-pulse-slow"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover/call:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                
                <div className="hidden md:block h-16 w-0.5 bg-slate-200 mx-2"></div>
                
                <div className="flex flex-col text-right">
                  <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tighter leading-tight">
                    دریافت مشاوره تخصصی
                  </h2>
                </div>
              </div>
              
              {/* متن جایگزین */}
              <div className="space-y-6">
                <p className="text-slate-500 font-medium text-lg md:text-2xl leading-relaxed pt-2 opacity-80 text-right">
                  دریافت مشاوره تخصصی در کمتر از ۲۴ ساعت؛ اطلاعات خود را ثبت کنید.
                </p>
              </div>
            </motion.div>
 
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="w-full lg:w-auto lg:min-w-[560px]"
            >
               {!isSuccess ? (
                  <div 
                    className="bg-white p-6 md:p-10 rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.04)] border border-slate-100"
                  >
                    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <label className="text-[11px] font-black text-slate-400 text-right pr-4 block">نام کامل شما</label>
                          <div className="relative group/input">
                             <input 
                              required
                              type="text" 
                              placeholder="مثلاً: علی محمدی" 
                              className="w-full h-16 bg-slate-50 border-none rounded-2xl outline-none text-right px-14 text-sm font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-400"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                            <div className="absolute top-1/2 -translate-y-1/2 right-5 text-slate-300 group-focus-within/input:text-primary transition-colors">
                              <UserIcon size={22} strokeWidth={1.5} />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <label className="text-[11px] font-black text-slate-400 text-right pr-4 block">شماره موبایل جهت تماس</label>
                          <div className="relative group/input">
                            <input 
                              required
                              type="tel" 
                              maxLength={11}
                              placeholder="۰۹۱۲۰۰۰۰۰۰۰" 
                              className="w-full h-16 bg-slate-50 border-none rounded-2xl outline-none text-right px-14 text-sm font-black text-slate-900 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-400"
                              value={formData.phone}
                              onChange={(e) => {
                                const val = e.target.value.replace(/[^0-9]/g, '');
                                if (val.length <= 11) {
                                  setFormData({...formData, phone: val});
                                }
                              }}
                            />
                            <div className="absolute top-1/2 -translate-y-1/2 right-5 text-slate-300 group-focus-within/input:text-primary transition-colors">
                              <Phone size={22} strokeWidth={1.5} />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <motion.button 
                          type="submit" 
                          disabled={isLoading}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className={`h-20 rounded-3xl font-black text-base shadow-[0_20px_40px_-10px_rgba(30,122,252,0.3)] transition-all flex items-center justify-center gap-2 whitespace-nowrap w-full relative overflow-hidden ${isLoading ? 'bg-slate-100 text-slate-400' : 'bg-[#1D7AFC] text-white'}`}
                        >
                          <span className="z-10">{isLoading ? 'در حال ارسال...' : 'ثبت رایگان درخواست مشاوره'}</span>
                          {!isLoading && (
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center  shadow-inner">
                              <ArrowLeft size={24} />
                            </div>
                          )}
                        </motion.button>
                      </div>
                    </form>
                  </div>
               ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.90 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-[3rem]  w-full"
                  >
                    <div className="text-right">
                      <h4 className="text-emerald-500 text-xl font-black italic">با موفقیت ثبت شد</h4>
                      <p className="text-emerald-500/70 text-sm font-bold mt-1">منتظر تماس کارشناسان ما باشید.</p>
                    </div>
                    <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-500/20">
                      <CheckCircle2 size={36} />
                    </div>
                  </motion.div>
               )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


const DynamicFontStyle = () => {
  const [settings, setSettings] = useState<SystemSettings | null>(() => {
    const saved = localStorage.getItem('abresan_settings');
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch (e) {
      return null;
    }
  });

  const loadSettings = useCallback(() => {
    const saved = localStorage.getItem('abresan_settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('settingsUpdated', loadSettings);
    return () => window.removeEventListener('settingsUpdated', loadSettings);
  }, [loadSettings]);
  
  if (!settings?.fonts) return null;

  return (
    <style dangerouslySetInnerHTML={{ __html: `
      ${settings.fonts.customCssImport ? `@import url('${settings.fonts.customCssImport}');` : ''}
      
      :root {
        --font-primary-dynamic: "${settings.fonts.primaryFont || 'Vazirmatn'}", sans-serif;
        --font-heading-dynamic: "${settings.fonts.headingFont || 'Vazirmatn'}", sans-serif;
        --font-ui-dynamic: "${settings.fonts.uiFont || 'Vazirmatn'}", sans-serif;
        --font-number-dynamic: "${settings.fonts.numberFont || 'Vazirmatn'}", system-ui;
      }

      body { font-family: var(--font-primary-dynamic) !important; }
      h1, h2, h3, h4, h5, h6, .font-black, .font-bold { font-family: var(--font-heading-dynamic) !important; }
      button, nav, .ui-text, a { font-family: var(--font-ui-dynamic) !important; }
      .price-tag, .technical-value, .font-mono, [data-technical="true"] { font-family: var(--font-number-dynamic) !important; }
    `}} />
  );
};

function App() {
  const { products } = useProducts();
  const { setIsCartOpen } = useCart();
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'dashboard' | 'price-list' | 'blog' | 'favorites' | 'checkout' | 'cart' | 'contact' | 'shop' | 'compare' | 'not-found'>('home');
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('abresan_active_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [maintenanceModeActive, setMaintenanceModeActive] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('abresan_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        return !!parsed.enableMaintenanceMode;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  });

  const checkMaintenanceState = useCallback(() => {
    try {
      const saved = localStorage.getItem('abresan_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        setMaintenanceModeActive(!!parsed.enableMaintenanceMode);
      } else {
        setMaintenanceModeActive(false);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    checkMaintenanceState();
    window.addEventListener('settingsUpdated', checkMaintenanceState);
    return () => window.removeEventListener('settingsUpdated', checkMaintenanceState);
  }, [checkMaintenanceState]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('abresan_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        const oldDescList = [
          'بزرگترین مرجع تخصصی لوله و اتصالات پلیمری و کشاورزی در غرب کشور.',
          'بزرگترین مرجع تخصصی لوله و اتصالات پلیمری، آبیاری تحت فشار و تجهیزات آبرسانی کشاورزی در ایران با فیلترینگ هوشمند و بهینه روز.',
          'تخصص ما مدیریت هوشمند منابع آبی است. با تکیه بر دانش فنی و مهندسی، راه‌کارهای مدرن برای صنعت کشاورزی و انتقال آب ارائه می‌دهیم.',
          'مرکز تخصصی تولید و تامین لوله، اتصالات و تجهیزات پایپینگ صنعتی و کشاورزی.'
        ];
        
        if (oldDescList.includes(parsed.siteDescription)) {
          parsed.siteDescription = 'آبرسان؛ مرکز تخصصی فروش و پخش لوله، اتصالات کشاورزی و سیستمهای آبیاری (قطرهای، بارانی و نواری). نماینده رسمی برترین برندهای ایران.';
          localStorage.setItem('abresan_settings', JSON.stringify(parsed));
          window.dispatchEvent(new Event('settingsUpdated'));
        }
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('abresan_reset_sequences_v3')) {
      localStorage.removeItem('abresan_orders');
      localStorage.removeItem('abresan_proformas');
      localStorage.setItem('abresan_reset_sequences_v3', 'true');
      // Trigger update events
      window.dispatchEvent(new Event('ordersUpdated'));
      window.dispatchEvent(new Event('proformasUpdated'));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('abresan_active_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('abresan_active_user');
    }
  }, [user]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('abresan_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('abresan_favorites', JSON.stringify(favoriteIds));
  }, [favoriteIds]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const [productIdFilter, setProductIdFilter] = useState<string[]>([]);
  const [sortFilter, setSortFilter] = useState<'newest' | 'cheapest' | 'expensive' | 'bestseller' | 'popular' | 'discount'>('newest');
  const homeContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [currentView]);

  // Integrated URL Sync, 301 Redirect Check & Router Management on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // --- 301 / 302 Redirect Manager Engine ---
    const rawRedirects = localStorage.getItem('abresan_seo_redirects');
    let redirects: any[] = [];
    if (rawRedirects) {
      try {
        redirects = JSON.parse(rawRedirects);
      } catch (e) {
        console.error("Error reading redirects", e);
      }
    } else {
      // Standard demo redirects for seo integrity checklist
      redirects = [
        { id: 'red_1', source: '/old-drip-tape', target: '?view=shop&category=نوارتیپ', type: '301', hits: 14 },
        { id: 'red_2', source: '/polyethylene-tubing-price', target: '?view=price-list', type: '301', hits: 45 },
        { id: 'red_3', source: '/contact-us-legacy', target: '?view=contact', type: '301', hits: 8 }
      ];
      localStorage.setItem('abresan_seo_redirects', JSON.stringify(redirects));
    }

    const currentFullPath = window.location.pathname + window.location.search;
    const currentQuery = window.location.search;

    const matchedRedirect = redirects.find(r => {
      const src = r.source.toLowerCase().trim();
      return (
        currentFullPath.toLowerCase().includes(src) || 
        currentQuery.toLowerCase().includes(src) ||
        (src !== '/' && window.location.pathname.toLowerCase() === src)
      );
    });

    if (matchedRedirect) {
      // Increment hit stats
      matchedRedirect.hits = (matchedRedirect.hits || 0) + 1;
      localStorage.setItem('abresan_seo_redirects', JSON.stringify(redirects));
      
      const target = matchedRedirect.target;
      const targetParams = new URL(target, window.location.origin).searchParams;
      const targetView = targetParams.get('view') || 'home';
      const targetProduct = targetParams.get('product');

      setTimeout(() => {
        toast.success(`انتقال ۳۰۱ سئو: هدایت شدید از "${matchedRedirect.source}"`, {
          icon: '🔗',
          duration: 5000
        });
      }, 500);

      if (targetView) {
        setCurrentView(targetView as any);
      }
      if (targetProduct && products.length > 0) {
        const product = products.find(p => p.id === targetProduct);
        if (product) setSelectedProduct(product);
      }

      const newUrl = new URL(window.location.origin + window.location.pathname);
      targetParams.forEach((val, key) => {
        newUrl.searchParams.set(key, val);
      });
      window.history.replaceState({}, '', newUrl.toString());
    } else {
      // Normal Direct SPA Linking
      const urlView = params.get('view');
      const allowedViews = ['home', 'login', 'dashboard', 'price-list', 'blog', 'favorites', 'checkout', 'cart', 'contact', 'shop', 'compare'];
      if (urlView) {
        if (allowedViews.includes(urlView)) {
          setCurrentView(urlView as any);
        } else {
          setCurrentView('not-found');
        }
      }

      // Deep link to a specific product
      const productId = params.get('product');
      if (productId && products.length > 0) {
        const product = products.find(p => p.id === productId);
        if (product) {
          setSelectedProduct(product);
        } else {
          // Trigger the 404 view for broken product links
          setCurrentView('not-found');
        }
      }
    }
  }, [products]);

  // Synchronize state changes back to URLs for deep-links
  useEffect(() => {
    const url = new URL(window.location.href);
    if (currentView !== 'home') {
      url.searchParams.set('view', currentView);
    } else {
      url.searchParams.delete('view');
    }
    window.history.replaceState({}, '', url.toString());
  }, [currentView]);

  // Update URL search params when product is selected
  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedProduct) {
      url.searchParams.set('product', selectedProduct.id);
    } else {
      url.searchParams.delete('product');
    }
    window.history.replaceState({}, '', url.toString());
  }, [selectedProduct]);

  // Dynamic SEO Header Canonicals, dynamic Head titles and descriptions updates
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Remove any historical canonical links
    const oldLink = document.querySelector('link[rel="canonical"]');
    if (oldLink) oldLink.remove();

    // Fabricate clean dynamic canonical link based on exact state context
    const canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');

    const baseUrl = window.location.origin + window.location.pathname;
    const sParams = new URLSearchParams(window.location.search);
    
    let sanitizedSearch = '';
    if (selectedProduct) {
      sanitizedSearch = `?product=${selectedProduct.id}`;
    } else if (currentView !== 'home') {
      const keepKeys = ['view', 'category', 'tag', 'post'];
      const finalParams = new URLSearchParams();
      sParams.forEach((val, key) => {
        if (keepKeys.includes(key)) finalParams.set(key, val);
      });
      const paramStr = finalParams.toString();
      if (paramStr) sanitizedSearch = `?${paramStr}`;
    }

    canonicalLink.setAttribute('href', baseUrl + sanitizedSearch);
    document.head.appendChild(canonicalLink);

    // Optimize page title & metadata tags for Google crawling
    const headTitle = document.querySelector('title');
    const headMetaDesc = document.querySelector('meta[name="description"]');
    
    let pageTitle = 'گروه صنعتی آبرسان | لوله و اتصالات کشاورزی، صنعتی و پلیمری';
    let pageDesc = 'آبرسان؛ مرکز تخصصی فروش و پخش لوله، اتصالات کشاورزی و سیستمهای آبیاری (قطرهای، بارانی و نواری). نماینده رسمی برترین برندهای ایران.';

    if (selectedProduct) {
      pageTitle = selectedProduct.seoTitle || `${selectedProduct.name} - قیمت، مشخصات فنی و کاتالوگ | بازرگانی آبرسان`;
      pageDesc = selectedProduct.seoDescription || selectedProduct.description || `${selectedProduct.name} با تکنولوژی برتر ساخت و اتصالات ویژه، مناسب پروژه‌های آبرسانی تحت فشار و سنتی کشاورزی.`;
    } else if (currentView === 'not-found') {
      pageTitle = 'خطای ۴۰۴ - صفحه یافت نشد | گروه آبرسان';
      pageDesc = 'متاسفانه صفحه یا کالای درخواستی در سامانه آبرسان موجود نیست. از پیوندهای راهنما یا نوار جستجو استفاده نمایید.';
    } else {
      switch (currentView) {
        case 'shop':
          pageTitle = 'خرید آنلاین لوله و اتصالات کشاورزی و پلیمر | گروه آبرسان';
          pageDesc = 'تجهیزات آبرسانی و آبیاری هوشمند کشاورزی شامل لوله‌های پلی اتیلن، اتصالات پروانه‌ای، لوله‌های نخدار و بارانی و قطره چکان‌ها.';
          break;
        case 'price-list':
          pageTitle = 'لیست قیمت روز لوله و اتصالات پلیمری | گروه آبرسان';
          pageDesc = 'معتبرترین تراز قیمت روز با قابلیت دانلود رایگان کاتالوگ پی دی اف لوله‌های اتیلن، اتصالات دنده‌ای و قطره‌های هوشمند.';
          break;
        case 'blog':
          pageTitle = 'وبلاگ علمی و اخبار صنعت آب و پلیمر | آبرسان';
          pageDesc = 'جدیدترین دانستنی‌ها و مقالات مهندسی آب، راهنمای غرقابی و قطره‌ای سنتی، و تحلیل نوسانات مواد اولیه بازار پلی‌اتیلن.';
          break;
        case 'contact':
          pageTitle = 'تماس و مشاوره رایگان با واحد فروش آبرسان | کارگروه آبرسان';
          pageDesc = 'ارتباط مستقیم با کارمندان، واحد ثبت سفارش پیش‌فاکتور رسمی و آدرس کارخانه تولیدی صنایع پلیمری غرب کشور.';
          break;
        case 'dashboard':
          pageTitle = 'میز کار کاربری و سفارشات من | آبرسان';
          break;
        case 'favorites':
          pageTitle = 'محصولات نشان‌شده سئو | آبرسان';
          break;
        case 'cart':
          pageTitle = 'سبد فاکتور و بررسی پیش‌فاکتور خرید | آبرسان';
          break;
        case 'checkout':
          pageTitle = 'صدور فاکتور و پرداخت نهایی محصول | آبرسان';
          break;
        case 'compare':
          pageTitle = 'مقایسه ویژگی‌ها و آبدهی تجهیزات آبیاری | آبرسان';
          break;
      }
    }

    if (headTitle) headTitle.innerText = pageTitle;
    if (headMetaDesc) {
      headMetaDesc.setAttribute('content', pageDesc);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = pageDesc;
      document.head.appendChild(meta);
    }
  }, [currentView, selectedProduct]);

  // Guard for compare view on mobile
  useEffect(() => {
    if (currentView === 'compare' && typeof window !== 'undefined' && window.innerWidth < 1024) {
      setCurrentView('home');
    }
  }, [currentView]);

  const specialProducts = useMemo(() => products.filter(p => p.isSpecial), [products]);
  const bestSellingProducts = useMemo(() => products.filter(p => p.isBestSeller), [products]);

  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (!homeContainerRef.current) return;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!homeContainerRef.current) return;
        const rect = homeContainerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        homeContainerRef.current.style.setProperty('--mouse-x', `${x}px`);
        homeContainerRef.current.style.setProperty('--mouse-y', `${y}px`);
      });
    };
    const el = homeContainerRef.current;
    if (el) el.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      if (el) el.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [currentView]);

  const handleLoginSuccess = (user: User) => { 
    setUser(user); 
    setCurrentView('dashboard'); 

    // Handle first-time login welcome SMS
    if (user && user.role === UserRole.CUSTOMER) {
      const welcomeKey = `abresan_welcomed_${user.id}`;
      const alreadyWelcomed = localStorage.getItem(welcomeKey);
      if (!alreadyWelcomed) {
        localStorage.setItem(welcomeKey, 'true');
        try {
          smsService.sendSMS(
            user.phone,
            `همکار گرامی ${user.fullName}، به پرتال تخصصی صنایع پلیمری آبرسان خوش آمدید. حساب عمومی تجاری شما با موفقیت فعال گردید.`,
            NotificationType.AUTH_CODE,
            { name: user.fullName }
          );
        } catch (e) {
          console.error('Failed to send welcome SMS:', e);
        }
      }
    }
  };
  const handleLogout = () => { setUser(null); setCurrentView('home'); };
  const toggleFavorite = (productId: string) => { 
    setFavoriteIds(prev => {
      const newIds = prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId];
      // Dispatch event after state is updated (in the next tick or just after this)
      setTimeout(() => {
        window.dispatchEvent(new Event('favoritesUpdated'));
      }, 0);
      return newIds;
    });
  };

  const handleCategoryClick = useCallback((categoryName: string) => {
    const normalizedName = categoryName.trim();
    
    // 1. Check for parent category first
    const parent = MENU_DATA.find(p => p.title.trim() === normalizedName);
    if (parent) {
      const subCats: string[] = [];
      parent.items?.forEach(i => subCats.push(i.category));
      parent.subGroups?.forEach(g => g.items.forEach(i => subCats.push(i.category)));
      setCategoryFilter(Array.from(new Set(subCats)));
    } else {
      // 2. Exact or near-exact matching for sub-categories
      const categories: string[] = [];
      
      const mapping: Record<string, string[]> = {
        'شیر پروانه': ['شیر پروانه پلیمری', 'شیر پروانه چدنی', 'شیر پروانه ای'],
        'لوله بارانی': ['لوله بارانی بارانی', 'لوله بارانی آبرسانی'],
        'شیرتوپی': ['شیرتوپی پلیمری'], 
        'شیر خودکار': ['شیر خودکار پلیمری'],
        'رایزر': ['رایزر بارانی', 'رایزر'],
        'کمربند': ['کمربند'],
        'لوله پلی اتیلن': ['لوله پلی اتیلن کشاورزی'],
        'نوارتیپ': ['نوارتیپ'],
        'لوله نخدار': ['لوله نخدار'],
        'اتصالات نخدار': ['اتصالات نوارتیپ'],
        'سرپرسی': ['سرپرسی'],
        'اتصالات پلی اتیلن': ['اتصالات جوشی پلی اتیلن', 'اتصالات پیچی پلی اتیلن', 'اتصالات الکتروفیوژن']
      };

      if (mapping[normalizedName]) {
        categories.push(...mapping[normalizedName]);
      } else {
        MENU_DATA.forEach(p => {
          p.items?.forEach(i => {
            if (i.category === normalizedName || i.label === normalizedName) {
              categories.push(i.category);
            }
          });
          p.subGroups?.forEach(sg => {
            sg.items.forEach(i => {
              const itemName = (i as any).name || (i as any).label || '';
              if (i.category === normalizedName || itemName === normalizedName) {
                categories.push(i.category);
              }
            });
          });
        });

        if (categories.length === 0) {
          categories.push(normalizedName);
        }
      }

      setCategoryFilter(Array.from(new Set(categories)));
    }
    
    setCurrentView('shop');
    setIsMegaMenuOpen(false);
  }, []);

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  const commonProps = useMemo(() => ({
    user: user,
    onLoginClick: () => setCurrentView(user ? 'dashboard' : 'login'),
    onPriceListClick: () => setCurrentView('price-list'),
    onBlogClick: () => setCurrentView('blog'),
    onFavoritesClick: () => setCurrentView('favorites'),
    onCompareClick: () => setCurrentView('compare'),
    onContactClick: () => setCurrentView('contact'),
    onShopClick: () => setCurrentView('shop'),
    onProductClick: handleProductClick,
    onBack: () => setCurrentView('home'),
    isMobileMenuOpen: isMobileMenuOpen,
    setIsMobileMenuOpen: setIsMobileMenuOpen,
    isMegaMenuOpen: isMegaMenuOpen,
    setIsMegaMenuOpen: setIsMegaMenuOpen,
  }), [user, isMobileMenuOpen, isMegaMenuOpen, handleProductClick]);

  return (
    <>
      <DynamicFontStyle />
      <AnimatePresence mode="wait">
        {(() => {
          if (currentView === 'login') return (
            <ViewContainer key="login">
              <LoginPage onBack={() => setCurrentView('home')} onLoginSuccess={handleLoginSuccess} />
            </ViewContainer>
          );

          if (maintenanceModeActive && user?.role !== UserRole.ADMIN) {
            return (
              <ViewContainer key="maintenance">
                <MaintenancePage onAdminLoginClick={() => setCurrentView('login')} />
              </ViewContainer>
            );
          }
          
          if (currentView === 'dashboard' && user) {
            return (
              <ViewContainer key="dashboard">
                {(() => {
                  switch (user.role) {
                    case UserRole.ADMIN: return <AdminPanel user={user} onLogout={handleLogout} onBack={() => setCurrentView('home')} />;
                    case UserRole.SUPPORT: return <SupportPanel user={user} onLogout={handleLogout} onBack={() => setCurrentView('home')} />;
                    default: return <CustomerPanel user={user} onLogout={handleLogout} onBack={() => setCurrentView('home')} onViewCart={() => setCurrentView('cart')} onCompareClick={() => setCurrentView('compare')} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} onNavigateToShop={() => setCurrentView('shop')} onNavigateToContact={() => setCurrentView('contact')} onUpdateUser={setUser} />;
                  }
                })()}
              </ViewContainer>
            );
          }

          if (currentView === 'price-list') return (
             <ViewContainer key="price-list">
                <div className="min-h-screen bg-[#f4f7fa] flex flex-col font-vazir" dir="rtl">
                   <Header currentView={currentView} {...commonProps} />
                   <PriceListPage onBack={() => setCurrentView('home')} onProductClick={handleProductClick} />
                   <Footer />
                </div>
             </ViewContainer>
          );
          
          if (currentView === 'blog') return (
            <ViewContainer key="blog">
              <div className="min-h-screen bg-white flex flex-col font-vazir" dir="rtl">
                 <Header currentView={currentView} {...commonProps} />
                 <BlogPage onBack={() => setCurrentView('home')} onContactClick={() => setCurrentView('contact')} />
                 <Footer />
              </div>
            </ViewContainer>
          );

          if (currentView === 'contact') return (
            <ViewContainer key="contact">
              <div className="min-h-screen bg-[#E4E3E0] flex flex-col font-vazir" dir="rtl">
                 <Header currentView={currentView} {...commonProps} />
                 <ContactPage onBack={() => setCurrentView('home')} />
                 <Footer />
              </div>
            </ViewContainer>
          );

          if (currentView === 'shop') return (
            <ViewContainer key="shop">
              <div className="min-h-screen bg-[#f8fafc] flex flex-col font-vazir" dir="rtl">
                <Header currentView={currentView} {...commonProps} />
                <ProductGrid 
                  onProductClick={handleProductClick} 
                  onBack={() => {
                    setCurrentView('home');
                    setCategoryFilter([]);
                    setTagFilter([]);
                    setProductIdFilter([]);
                    setSortFilter('newest');
                  }}
                  favoriteIds={favoriteIds} 
                  onToggleFavorite={toggleFavorite} 
                  initialCategories={categoryFilter}
                  initialTags={tagFilter}
                  initialProductIds={productIdFilter}
                  initialSortBy={sortFilter}
                />
                <Footer />
                <Assistant user={user} />
                <CartDrawer onCheckout={() => setCurrentView('checkout')} onViewCart={() => setCurrentView('cart')} />
              </div>
            </ViewContainer>
          );

          if (currentView === 'favorites') return (
            <ViewContainer key="favorites">
              <div className="min-h-screen bg-[#f8fafc] flex flex-col font-vazir" dir="rtl">
                <Header currentView={currentView} {...commonProps} />
                <FavoritesPage 
                  onBack={() => setCurrentView('home')} 
                  favoriteIds={favoriteIds} 
                  onToggleFavorite={toggleFavorite} 
                  onProductClick={handleProductClick} 
                  onViewCart={() => setCurrentView('cart')}
                />
                <Footer />
                <Assistant user={user} />
              </div>
            </ViewContainer>
          );

          if (currentView === 'cart') return (
            <ViewContainer key="cart">
              <div className="min-h-screen bg-[#f8fafc] flex flex-col font-vazir" dir="rtl">
                <CartPage 
                  user={user}
                  onBack={() => setCurrentView('home')} 
                  onCheckout={() => setCurrentView('checkout')} 
                  onProductClick={handleProductClick} 
                />
                <Footer />
              </div>
            </ViewContainer>
          );

          if (currentView === 'checkout') return (
            <ViewContainer key="checkout">
              <div className="min-h-screen bg-[#f8fafc] flex flex-col font-vazir" dir="rtl">
                <CheckoutPage 
                  user={user}
                  onBack={() => setCurrentView('cart')} 
                  onSuccess={() => setCurrentView('dashboard')} 
                  onLoginSuccess={(u) => setUser(u)}
                />
                <Footer />
              </div>
            </ViewContainer>
          );

          if (currentView === 'compare') return (
            <ViewContainer key="compare">
              <div className="min-h-screen bg-[#f8fafc] flex flex-col font-vazir" dir="rtl">
                <Header currentView={currentView} {...commonProps} />
                <ComparisonPage 
                   onBack={() => setCurrentView('shop')}
                   onHomeClick={() => setCurrentView('home')}
                   onProductClick={handleProductClick}
                />
                <Footer />
                <Assistant user={user} />
              </div>
            </ViewContainer>
          );

          if (currentView === 'not-found') return (
            <ViewContainer key="not-found">
              <div className="min-h-screen bg-[#f8fafc] flex flex-col font-vazir" dir="rtl">
                <Header currentView={currentView} {...commonProps} />
                
                <div className="flex-1 flex items-center justify-center p-6 md:p-12">
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="max-w-xl w-full bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-2xl shadow-slate-200/50 text-center space-y-8 relative overflow-hidden"
                   >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-50/50 rounded-tr-full pointer-events-none" />

                      <div className="relative">
                         <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                            <span className="text-2xl font-black">۴۰۴</span>
                         </div>
                         <h2 className="text-xl font-black text-slate-800">صفحه یا کالا یافت نشد!</h2>
                         <p className="text-slate-400 text-xs font-bold mt-2 leading-relaxed">آدرس یا لینک کالایی که به دنبال آن بوده‌اید در سیستم آبرسان یافت نشد. ممکن است جابه‌جا یا نامک آن تغییر یافته باشد.</p>
                      </div>

                      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-3">
                         <div className="text-xs font-black text-slate-400 text-right pr-2">جستجوی مستقیم و سریع کالاها:</div>
                         <form onSubmit={(e) => {
                             e.preventDefault();
                             const q = (e.currentTarget.elements.namedItem('search_404') as HTMLInputElement).value;
                             if (q && q.trim()) {
                               localStorage.setItem('abresan_shop_search', q);
                             }
                             setTagFilter([]);
                             setProductIdFilter([]);
                             setCurrentView('shop');
                         }} className="flex gap-2">
                             <input 
                               name="search_404"
                               type="text"
                               placeholder="مثلاً: لوله پلی اتیلن، اتصالات پیچی..."
                               className="flex-1 h-12 bg-white border border-slate-200 rounded-xl px-4 text-xs font-bold text-slate-700 focus:outline-none focus:border-primary transition-colors"
                             />
                             <button type="submit" className="px-5 bg-primary hover:bg-slate-900 text-white rounded-xl text-xs font-black transition-colors flex items-center gap-1">
                               <span>جستجو</span>
                             </button>
                         </form>

                         <div className="flex flex-wrap gap-1.5 justify-start pt-2" dir="rtl">
                           <span className="text-[10px] text-slate-400 font-extrabold self-center ml-1">پیشنهادهای پربازدید:</span>
                           <button 
                             onClick={() => { localStorage.setItem('abresan_shop_search', 'لوله پلی اتیلن'); setTagFilter([]); setProductIdFilter([]); setCurrentView('shop'); }}
                             className="text-[10px] bg-white border border-slate-200 hover:border-indigo-500 text-slate-600 px-2.5 py-1 rounded-xl transition-all font-bold cursor-pointer hover:text-indigo-600 hover:shadow-sm"
                           >
                             لوله پلی اتیلن
                           </button>
                           <button 
                             onClick={() => { localStorage.setItem('abresan_shop_search', 'اتصال پیچی ویسپار'); setTagFilter([]); setProductIdFilter([]); setCurrentView('shop'); }}
                             className="text-[10px] bg-white border border-slate-200 hover:border-indigo-500 text-slate-600 px-2.5 py-1 rounded-xl transition-all font-bold cursor-pointer hover:text-indigo-600 hover:shadow-sm"
                           >
                             اتصال ویسپار
                           </button>
                           <button 
                             onClick={() => { localStorage.setItem('abresan_shop_search', 'نوار تیپ'); setTagFilter([]); setProductIdFilter([]); setCurrentView('shop'); }}
                             className="text-[10px] bg-white border border-slate-200 hover:border-indigo-500 text-slate-600 px-2.5 py-1 rounded-xl transition-all font-bold cursor-pointer hover:text-indigo-600 hover:shadow-sm"
                           >
                             نوار تیپ آبرسان
                           </button>
                           <button 
                             onClick={() => setCurrentView('price-list')}
                             className="text-[10px] bg-[#EEF2FF] border border-indigo-100 hover:border-indigo-300 text-indigo-600 px-2.5 py-1 rounded-xl font-black transition-all cursor-pointer hover:shadow-sm"
                           >
                             لیست قیمت‌ها
                           </button>
                        </div>
                     </div>

                     <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                         <button 
                           onClick={() => setCurrentView('home')}
                           className="h-12 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2"
                         >
                           <span>بازگشت به صفحه اصلی</span>
                           <ArrowLeft size={16} />
                         </button>
                         <button 
                           onClick={() => setCurrentView('shop')}
                           className="h-12 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black transition-all flex items-center justify-center"
                         >
                           <span>رویت فروشگاه تخصصی</span>
                         </button>
                     </div>

                     <div className="pt-4 border-t border-slate-50 text-[10px] text-slate-400 font-bold">
                         گروه صنعتی آبرسان - مجهز به سیستم ناوبری هوشمند سئو (Dynamic Canonical Routing)
                     </div>
                  </motion.div>
               </div>

                <Footer />
              </div>
            </ViewContainer>
          );

          return (
            <ViewContainer key="home">
              <div className="min-h-screen bg-[#f8fafc] flex flex-col font-vazir" dir="rtl">
                <Header currentView={currentView} {...commonProps} />
                <main className="flex-1">
                  <Hero onPriceListClick={() => setCurrentView('price-list')} onContactClick={() => setCurrentView('contact')} />
                  <CategorySlider onCategoryClick={handleCategoryClick} />
                  
                  <div className="py-2">
                    <ProductShowcaseTray 
                      title="پیشنهادات ویژه" 
                      products={specialProducts}
                      onProductClick={setSelectedProduct} 
                      favoriteIds={favoriteIds}
                      onToggleFavorite={toggleFavorite}
                      onShowAll={() => {
                        setTagFilter(['ویژه']);
                        setProductIdFilter([]);
                        setSortFilter('popular');
                        setCurrentView('shop');
                      }} 
                    />
                  </div>
                  
                  <BrandRepresentation onPriceListClick={() => setCurrentView('price-list')} />

                  <VisualCategoryGrid onCategoryClick={handleCategoryClick} />
                  
                  <div className="py-2">
                    <ProductShowcaseTray 
                      title="پر فروش ترین محصولات" 
                      products={bestSellingProducts}
                      onProductClick={setSelectedProduct} 
                      favoriteIds={favoriteIds}
                      onToggleFavorite={toggleFavorite}
                      onShowAll={() => {
                        setTagFilter(['پرفروش']);
                        setProductIdFilter([]);
                        setSortFilter('bestseller');
                        setCurrentView('shop');
                      }} 
                    />
                  </div>

                  {/* Seamless Combined Background Wrapper for Consultation, Blog, and Features */}
                  <div ref={homeContainerRef} className="relative bg-[#f0f4f8] overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-[#f8fafc] to-blue-100/30"></div>
                     <div 
                        className="absolute inset-0 transition-opacity duration-75 pointer-events-none"
                        style={{
                          background: `radial-gradient(1000px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(29, 122, 252, 0.15), transparent 60%)`
                        }}
                     />
                     <div 
                        className="absolute inset-0 opacity-[0.25] pointer-events-none"
                        style={{
                          backgroundImage: 'radial-gradient(#1D7AFC) 1px, transparent 1px)',
                          backgroundSize: '40px 40px',
                          maskImage: `radial-gradient(900px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black, transparent 70%)`,
                          WebkitMaskImage: `radial-gradient(900px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black, transparent 70%)`
                        }}
                     />

                     <ProConsultationSection />

                     <LatestArticlesSection onBlogClick={() => setCurrentView('blog')} />
                  </div>
                </main>
                <BrandMarquee />
                <Footer />
                <Assistant user={user} />
                {currentView === 'home' && (
                  <MobileBottomNav 
                    currentView={currentView} 
                    onViewChange={setCurrentView} 
                    onCartClick={() => setIsCartOpen(true)} 
                    onMenuClick={() => setIsMegaMenuOpen(true)}
                    isOpen={isMegaMenuOpen}
                  />
                )}
                <CartDrawer onCheckout={() => setCurrentView('checkout')} onViewCart={() => setCurrentView('cart')} />
              </div>
            </ViewContainer>
          );
        })()}
      </AnimatePresence>

      {/* Global Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            user={user}
            isFavorite={favoriteIds.includes(selectedProduct.id)}
            toggleFavorite={toggleFavorite}
            onBack={() => {
               setSelectedProduct(null);
            }} 
            onConsultationClick={() => {
              setSelectedProduct(null);
              setCurrentView('contact');
            }}
            onShowAll={(productIds) => {
              setSelectedProduct(null);
              setCategoryFilter([]);
              setTagFilter([]);
              setProductIdFilter(productIds);
              setCurrentView('shop');
            }}
          />
        )}
      </AnimatePresence>

      <MegaMenu 
        isOpen={isMegaMenuOpen} 
        onClose={() => setIsMegaMenuOpen(false)} 
        onCategoryClick={handleCategoryClick}
      />
      <ComparisonFloatingBar onCompareClick={() => setCurrentView('compare')} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

const BrandRepresentation = ({ onPriceListClick }: { onPriceListClick: () => void }) => {
  const [dealers, setDealers] = useState<AuthorizedDealer[]>([]);
  
  const loadDealers = useCallback(() => {
    const saved = localStorage.getItem('abresan_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.homeContent?.authorizedDealers) {
          setDealers(parsed.homeContent.authorizedDealers);
          return;
        }
      } catch (e) { console.error(e); }
    }
    setDealers(REPRESENTED_BRANDS.map(b => ({ ...b, image: '', pdfUrl: '', link: '' })));
  }, []);

  useEffect(() => {
    loadDealers();
    window.addEventListener('settingsUpdated', loadDealers);
    return () => window.removeEventListener('settingsUpdated', loadDealers);
  }, [loadDealers]);

  const handlePriceListClick = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); onPriceListClick(); };
  
  const handleBrandClick = (dealer: AuthorizedDealer) => {
    if (dealer.link) {
      // If link is an ID like "vispar", we can scroll to its section in price list
      if (dealer.link.startsWith('http') || dealer.link.startsWith('/')) {
        window.open(dealer.link, '_blank');
      } else {
        // Assume it's a category/brand ID to navigate to in price list
        localStorage.setItem('selected_dealer_id', dealer.link);
        handlePriceListClick();
      }
    } else if (dealer.pdfUrl) {
      window.open(dealer.pdfUrl, '_blank');
    }
  };

  return (
    <section className="w-full bg-white/40  border-y border-white/40 py-6 md:py-10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] relative z-40 overflow-hidden">
      <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row justify-between items-center px-6 md:px-16 gap-10 lg:gap-0">
        <div className="shrink-0 text-right">
          <h2 className="text-2xl md:text-4xl font-black text-[#1D7AFC] whitespace-nowrap leading-none tracking-tighter">ما نماینده بهترین‌ها هستیم</h2>
        </div>
        <div className="flex-1 flex flex-wrap items-center justify-center gap-6 md:gap-20 lg:gap-32">
          {dealers.map((brand) => (
            <div 
              key={brand.id} 
              className="flex flex-col items-center group cursor-pointer"
              onClick={() => handleBrandClick(brand)}
            >
              <div className="w-16 h-16 md:w-32 md:h-32 bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl md:shadow-2xl flex items-center justify-center transition-all duration-500 hover:-translate-y-2 hover:shadow-blue-500/20 overflow-hidden border border-white relative">
                 <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 {brand.image ? (
                    <img src={brand.image} alt={brand.name} className="w-full h-full object-contain p-3 md:p-5 relative z-10 transition-transform group-hover:scale-110" />
                 ) : (
                    <span className="text-2xl md:text-5xl font-black text-[#1D7AFC] relative z-10">{brand.name[0]}</span>
                 )}
              </div>
              <span className="text-[9px] md:text-xs font-black text-[#1D7AFC] mt-3 md:mt-5 opacity-60 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-widest uppercase">{brand.name}</span>
            </div>
          ))}
        </div>
        <div className="shrink-0 w-full lg:w-auto">
          <button onClick={handlePriceListClick} className="w-full lg:w-auto h-14 md:h-16 px-8 md:px-12 bg-[#1D7AFC] text-white rounded-2xl md:rounded-full font-black text-sm shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-3 transition-all hover:bg-slate-900 active:scale-95 whitespace-nowrap group">
            <span>مشاهده لیست قیمت شرکت‌ها</span>
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

const ShowcaseCard = memo(({ product, onProductClick, isFavorite, onToggleFavorite }: { product: any, onProductClick: (p: any) => void, isFavorite?: boolean, onToggleFavorite?: (id: string) => void }) => {
  const { addToCart } = useCart();
  const hasVariations = (product.variations && product.variations.length > 0);
  
  // Calculate price range if variations exist
  const getPriceDisplay = () => {
    if (hasVariations && product.variations) {
      const prices = product.variations.map((v: any) => v.price);
      const minPrice = Math.min(...prices);
      return (
        <div className="flex flex-col items-end group-hover:-translate-x-1 transition-transform duration-500">
          <span className="text-[9px] md:text-[10px] font-black text-slate-400 mb-0.5 opacity-80 uppercase tracking-tight">قیمت از</span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg md:text-2xl font-black text-primary tracking-tight leading-none">{minPrice.toLocaleString('fa-IR')}</span>
            <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase">ریال</span>
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-end gap-1 group-hover:-translate-x-1 transition-transform duration-500">
        {product.oldPrice && <span className="text-[10px] md:text-[11px] text-slate-300 line-through font-bold leading-none decoration-red-400/20 tracking-tight">{product.oldPrice.toLocaleString('fa-IR')}</span>}
        <div className="flex items-baseline gap-1">
          <span className="text-lg md:text-2xl font-black text-[#1D7AFC] tracking-tight leading-none">{product.price.toLocaleString('fa-IR')}</span>
          <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase">ریال</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-w-[150px] sm:min-w-[240px] lg:min-w-[280px] bg-white border border-slate-50 hover:border-[#1D7AFC]/40 rounded-[1.4rem] md:rounded-[2.5rem] p-3 md:p-4 flex flex-col group transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 will-change-transform snap-start relative">
      <div className="relative aspect-square bg-slate-50 rounded-xl md:rounded-3xl mb-2.5 md:mb-4 flex items-center justify-center cursor-pointer overflow-hidden border border-transparent group-hover:bg-white transition-colors" onClick={() => onProductClick(product)}>
        <img src={product.image} alt={product.seoTitle || product.focusKeyphrase || `${product.name} - لوله و اتصالات آبرسان`} className="w-full h-full object-contain p-2 md:p-5 mix-blend-multiply group-hover:scale-110 transition-transform duration-300 ease-out" />
        {product.off && <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-[#DBEAFE] text-[#1D7AFC] px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-md md:rounded-xl text-[9px] md:text-[10px] font-black border border-[#1D7AFC]/10 shadow-sm z-10">{product.off}-</div>}
        {hasVariations && (
          <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-white/90  text-primary px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-md md:rounded-xl text-[9px] md:text-[9px] font-black border border-primary/10 shadow-sm z-10 flex items-center gap-0.5">
            <Layers size={9} />
            سایزبندی
          </div>
        )}
        
        {/* Heart icon for showcase cards */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(product.id);
          }}
          className={`absolute bottom-3 left-3 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all shadow-sm border border-slate-100/50  ${
            isFavorite ? 'bg-red-50 text-red-500 opacity-100' : 'bg-white/80 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100'
          }`}
        >
          <Heart size={window.innerWidth < 768 ? 14 : 18} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="flex flex-col text-right px-0.5">
        <h4 className="text-[10px] md:text-[13px] font-black text-slate-700 leading-tight mb-2.5 md:mb-5 h-8 md:h-auto line-clamp-2 md:truncate hover:text-[#1D7AFC] cursor-pointer transition-colors" onClick={() => onProductClick(product)}>{product.name}</h4>
        <div className="flex items-end justify-between mt-auto gap-1">
           {hasVariations ? (
             <button 
               onClick={(e) => { e.stopPropagation(); onProductClick(product); }} 
               className="h-8 md:h-10 px-2.5 md:px-4 bg-[#1D7AFC] text-white rounded-lg md:rounded-2xl flex items-center justify-center gap-1.5 md:gap-2 shadow-lg shadow-blue-500/10 hover:bg-slate-900 transition-all active:scale-90"
             >
               <span className="text-[8px] md:text-[10px] font-black">انتخاب</span>
               <ArrowLeft className="w-3 h-3 md:w-3.5 md:h-3.5" />
             </button>
           ) : (
             <button 
               onClick={(e) => { e.stopPropagation(); addToCart({ ...product, category: product.category || 'تجهیزات', description: '', id: product.id } as Product); }} 
               className="w-8 h-8 md:w-10 md:h-10 bg-[#1D7AFC] text-white rounded-lg md:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/10 hover:bg-slate-900 transition-all active:scale-90"
             >
               <Plus className="w-4 h-4 md:w-[18px] md:h-[18px]" strokeWidth={3} />
             </button>
           )}
           <div className="scale-[0.8] md:scale-100 origin-bottom-left">
             {getPriceDisplay()}
           </div>
        </div>
      </div>
    </div>
  );
});
ShowcaseCard.displayName = 'ShowcaseCard';

const ProductShowcaseTray = ({ title, products, onProductClick, onShowAll, favoriteIds, onToggleFavorite }: { title: string, products: any[], onProductClick: (p: any) => void, onShowAll: () => void, favoriteIds: string[], onToggleFavorite: (id: string) => void }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);
  const isHovered = useRef(false);
  
  const scroll = useCallback((direction: 'left' | 'right') => {
    if (sliderRef.current) {
      // In RTL, scrollLeft is usually negative or 0 to negative
      const dir = document.dir === 'rtl' ? -1 : 1;
      const { scrollLeft, clientWidth, scrollWidth } = sliderRef.current;
      const cardWidth = sliderRef.current.querySelector('div')?.clientWidth || 280;
      const moveDistance = cardWidth + 16;
      
      if (direction === 'left') {
        const isAtEnd = Math.abs(scrollLeft) + clientWidth >= scrollWidth - 20;
        if (isAtEnd) sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        else sliderRef.current.scrollTo({ left: scrollLeft - moveDistance, behavior: 'smooth' });
      } else sliderRef.current.scrollTo({ left: scrollLeft + moveDistance, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const startAutoplay = () => {
      scrollInterval.current = setInterval(() => {
        if (!isHovered.current) {
          scroll('left');
        }
      }, 1500); // 1.5 seconds as requested
    };

    startAutoplay();

    return () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
      }
    };
  }, [scroll]);

  return (
    <section 
      className="pt-0 pb-0 bg-[#F8FAFC] w-full overflow-hidden"
      onMouseEnter={() => isHovered.current = true}
      onMouseLeave={() => isHovered.current = false}
    >
      <div className="w-full bg-white/60  border-t border-white/60 py-6 md:py-10 shadow-[0_25px_60px_-15px_rgba(29,122,252,0.1)] relative">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-10 px-4 md:px-16 lg:px-24 gap-4 md:gap-12">
            <h2 className="text-xl md:text-3xl font-black text-slate-800 border-r-4 md:border-r-8 border-[#1D7AFC] pr-3 md:pr-5 leading-none shrink-0 tracking-tighter">{title}</h2>
            <div className="flex-1 h-[2px] bg-gradient-to-l from-[#1D7AFC]/40 via-[#1D7AFC]/10 to-transparent relative hidden md:block">
               <div className="absolute top-1/2 left-0 -translate-y-1/2 w-3.5 h-3.5 bg-[#1D7AFC]/50 rounded-full shadow-[0_0_15px_rgba(29,122,252,0.6)]"></div>
            </div>
            <button onClick={onShowAll} className="bg-[#1D7AFC] text-white text-[10px] md:text-xs font-black hover:bg-blue-600 transition-all flex items-center gap-1.5 md:gap-2 group shrink-0 px-4 py-2.5 md:px-7 md:py-3.5 rounded-xl md:rounded-2xl shadow-lg shadow-blue-500/20 cursor-pointer">
              <span>نمایش همه</span>
              <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="relative group/slider">
            <button onClick={() => scroll('right')} className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-white/90  border border-blue-50 text-[#1D7AFC] rounded-full items-center justify-center shadow-2xl opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-[#1D7AFC] hover:text-white active:scale-90 cursor-pointer"><ChevronRight size={32} /></button>
            <button onClick={() => scroll('left')} className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-white/90  border border-blue-50 text-[#1D7AFC] rounded-full items-center justify-center shadow-2xl opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-[#1D7AFC] hover:text-white active:scale-90 cursor-pointer"><ChevronLeft size={32} /></button>
            <div ref={sliderRef} className="flex gap-2 md:gap-4 overflow-x-auto no-scrollbar pb-6 scroll-smooth px-3 md:px-16 lg:px-24 snap-x snap-mandatory" style={{ WebkitOverflowScrolling: 'touch' }}>
              {products.map((p) => (
                <ShowcaseCard 
                  key={p.id} 
                  product={p} 
                  onProductClick={onProductClick} 
                  isFavorite={favoriteIds.includes(p.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
