
import React from 'react';
import { 
  Droplets, 
  Settings, 
  Wrench, 
  Waves, 
  Layers, 
  Cpu, 
  Zap, 
  Gauge, 
  Anchor, 
  Activity,
  ArrowLeftRight,
  Disc,
  Combine,
  FileText,
  Target,
  Box,
  Binary,
  HardDrive,
  Sparkles,
  CircleDot,
  Filter,
  Microchip,
  Hammer,
  Bolt,
  Workflow,
  Component,
  List,
  Wind,
  Layout,
  Link as LinkIcon,
  ShowerHead
} from 'lucide-react';
import { Category, FeaturedCategory, Product, PriceListDoc } from './types';

export const MENU_DATA = [
  {
    id: 'agri-pipes',
    title: 'لوله‌های کشاورزی',
    icon: <List size={18} />,
    tag: 'سیستم‌های انتقال آب',
    items: [
      { label: 'لوله پلی‌اتیلن آبرسانی', detail: 'توزیع و انتقال آب', icon: <Waves size={16} />, status: 'درجه ۱', spec: 'PN4 - PN10', category: 'لوله پلی اتیلن کشاورزی' },
      { label: 'لوله پلی‌اتیلن فشار قوی', detail: 'استاندارد ملی (گرید ۱۰۰)', icon: <Target size={16} />, status: 'استاندارد', spec: 'PN6 - PN25', category: 'لوله پلی اتیلن کشاورزی' },
      { label: 'لوله لی‌فلت', detail: 'لوله منعطف تاشو', icon: <ArrowLeftRight size={16} />, status: 'صنعتی', spec: 'آبی و قرمز', category: 'لوله لی فلت' },
      { label: 'لوله نخ‌دار', detail: 'تقویت شده با الیاف', icon: <Layers size={16} />, status: 'مقاوم', spec: '۴ تا ۶ بار', category: 'لوله نخدار' },
      { label: 'لوله بارانی', detail: 'آبیاری بارانی منعطف', icon: <Droplets size={16} />, status: 'پلیمری', spec: 'درجه ۱', category: 'لوله بارانی آبرسانی' },
      { label: 'لوله یک بار مصرف', detail: 'اقتصادی و تاشو', icon: <Box size={16} />, status: 'ارزان', spec: 'پلی‌اتیلن', category: 'لوله یکبار مصرف' }
    ]
  },
  {
    id: 'polymer-valves',
    title: 'شیرآلات پلیمری',
    icon: <Settings size={18} />,
    tag: 'کنترل جریان سیال',
    items: [
      { label: 'شیر توپی', detail: 'تک‌ضرب و دسته‌ای', icon: <CircleDot size={16} />, status: 'UPVC', spec: '۱/۲" تا ۴"', category: 'شیرتوپی پلیمری' },
      { label: 'شیر خودکار', detail: 'یک‌طرفه پلیمری', icon: <Zap size={16} />, status: 'مقاوم', spec: 'فنر استیل', category: 'شیر خودکار پلیمری' },
      { label: 'شیر پروانه', detail: 'کنترل دبی بالا', icon: <Disc size={16} />, status: 'ویفری', spec: '۲ تا ۸ اینچ', category: 'شیر پروانه پلیمری' },
      { label: 'شیر تخلیه هوا', detail: 'تخلیه حباب‌های سیستم', icon: <Wind size={16} />, status: 'اتوماتیک', spec: '۱ و ۲ اینچ', category: 'تجهیزات تخلیه هوا' },
      { label: 'شیر کشویی', detail: 'قطع و وصل جریان', icon: <Settings size={16} />, status: 'پلیمری', spec: 'صنعتی', category: 'شیرآلات صنعتی پلیمری' }
    ]
  },
  {
    id: 'flanged-valves',
    title: 'شیرآلات فلنجدار',
    icon: <Gauge size={18} />,
    tag: 'شیرآلات صنعتی چدنی',
    items: [
      { label: 'شیر فلکه کشویی', detail: 'زبانه لاستیکی و فلزی', icon: <Settings size={16} />, status: 'استاندارد', spec: 'PN10 - PN16', category: 'شیر فلکه چدنی' },
      { label: 'شیر یکطرفه', detail: 'خودکار چدنی لولایی', icon: <Zap size={16} />, status: 'مقاوم', spec: '۲ تا ۱۰ اینچ', category: 'شیر یکطرفه چدنی' },
      { label: 'شیر حوضچه', detail: 'تخیله و آبگیری', icon: <Waves size={16} />, status: 'کشاورزی', spec: 'چدنی و آلومینیوم', category: 'شیر حوضچه' },
      { label: 'شیر صافی', detail: 'فیلتراسیون توری استیل', icon: <Filter size={16} />, status: 'چدنی', spec: 'Y-Type', category: 'شیر صافی چدنی' },
      { label: 'شیر پروانه ای', detail: 'ویفری و فلنجدار', icon: <Disc size={16} />, status: 'گیربکسی', spec: 'لاستیک EPDM', category: 'شیر پروانه چدنی' },
      { label: 'شیر هندلی', detail: 'تک ضرب دستی', icon: <Bolt size={16} />, status: 'اهرمی', spec: 'صنعتی', category: 'شیر هندلی' }
    ]
  },
  {
    id: 'drip-irrigation',
    title: 'آبیاری قطره‌ای',
    icon: <Droplets size={18} />,
    tag: 'مدیریت بهینه آب',
    subGroups: [
      {
        label: 'لوله و نوار',
        items: [
          { name: 'نوار تیپ', icon: <Activity size={14} />, meta: 'آبیاری ردیفی', val: 'درزدار / پلاک‌دار', category: 'نوارتیپ' },
          { name: 'لوله ۱۶ میلی‌متری', icon: <Disc size={14} />, meta: 'توزیع قطره‌ای', val: 'کلاف ۲۰۰ و ۴۰۰ متری', category: 'لوله ۱۶ قطره ای' },
          { name: 'لوله ۱۶ دریپردار', icon: <Zap size={14} />, meta: 'دریپر داخلی', val: 'فواصل ۲۰ تا ۵۰ سانتی', category: 'لوله ۱۶ دریپردار' }
        ]
      },
      {
        label: 'اتصالات قطره‌ای',
        items: [
          { name: 'اتصالات نوار تیپ', icon: <Combine size={14} />, meta: 'رابط و شیر', val: 'آب‌بندی کامل', category: 'اتصالات نوارتیپ' },
          { name: 'اتصالات ۱۶ میلی‌متری', icon: <Settings size={14} />, meta: 'زوایای ۱۶', val: 'پلیمری', category: 'اتصالات ۱۶ قطره ای' }
        ]
      },
      {
        label: 'تجهیزات',
        items: [
          { name: 'قطره‌چکان', icon: <Droplets size={14} />, meta: 'دریپر تنظیم‌شونده', val: 'آنتی‌سیفون', category: 'قطره چکان' },
          { name: 'شیرآلات قطره‌ای', icon: <Gauge size={14} />, meta: 'کنترل دبی', val: 'مینی‌والو', category: 'شیرآلات قطره ای' },
          { name: 'پانچ و ابزار نصب', icon: <Hammer size={14} />, meta: 'نصب سریع', val: 'فولادی', category: 'ابزار پانج قطره ای' }
        ]
      }
    ]
  },
  {
    id: 'sprinkler-irrigation',
    title: 'آبیاری بارانی',
    icon: <Zap size={18} />,
    tag: 'آبیاری فضای باز',
    items: [
      { label: 'آبپاش‌ها', detail: 'ضربه‌ای و مخفی‌شونده', icon: <Zap size={16} />, status: 'برنجی/پلیمری', spec: 'استهلاک کم', category: 'آبپاش بارانی' },
      { label: 'رایزر و شیر خودکار', detail: 'تجهیزات پایه', icon: <Anchor size={16} />, status: 'مقاوم', spec: 'تک مرحله‌ای', category: 'رایزر بارانی' },
      { label: 'لوله بارانی', detail: 'انتقال آب فشار متوسط', icon: <Waves size={16} />, status: 'آلومینیومی/پلیمری', spec: 'PN6', category: 'لوله بارانی بارانی' },
      { label: 'اتصالات بارانی', detail: 'کوپلر و زانو', icon: <Settings size={16} />, status: 'نصب سریع', spec: '۲ تا ۴ اینچ', category: 'اتصالات بارانی' },
      { label: 'نوار تیپ', detail: 'نوار بارانی و لوله‌های سوراخ‌دار', icon: <Activity size={16} />, status: 'منعطف', spec: 'PN2', category: 'نوار بارانی' }
    ]
  },
  {
    id: 'poly-fittings',
    title: 'اتصالات پلی اتیلن',
    icon: <Wrench size={18} />,
    tag: 'اتصالات مهندسی',
    items: [
      { label: 'اتصالات پیچی', detail: 'سیستم کوپلر رزوه ای', icon: <Combine size={16} />, status: 'نصب آسان', spec: '۲۰ تا ۱۱۰ میلی‌متر', category: 'اتصالات پیچی پلی اتیلن' },
      { label: 'اتصالات جوشی', detail: 'جوش لب به لب (Butt-fusion)', icon: <Zap size={16} />, status: 'صنعتی', spec: '۶۳ تا ۴۰۰ میلی‌متر', category: 'اتصالات جوشی پلی اتیلن' },
      { label: 'اتصالات الکتروفیوژن', detail: 'جوش با مقاومت الکتریکی', icon: <Cpu size={16} />, status: 'دقت بالا', spec: 'استاندارد گاز', category: 'اتصالات الکتروفیوژن' }
    ]
  },
  {
    id: 'threaded-fittings',
    title: 'اتصالات دنده‌ای',
    icon: <Bolt size={18} />,
    tag: 'اتصالات رزوه ای',
    subGroups: [
      {
        label: 'پلیمری',
        items: [
          { name: 'شیرآلات پلیمری', icon: <Gauge size={14} />, meta: 'شیرهای توپی', val: 'ضد زنگ', category: 'شیرتوپی پلیمری دنده ای' },
          { name: 'اتصالات رزوه‌ای', icon: <Settings size={14} />, meta: 'تبدیل و بوشن', val: 'پلیمری', category: 'اتصالات دنده ای پلیمری' },
          { name: 'سرشلنگی', icon: <Anchor size={14} />, meta: 'اتصال شلنگ', val: 'سایزهای مختلف', category: 'سرشلنگی پلیمری' }
        ]
      },
      {
        label: 'فلزی',
        items: [
          { name: 'اتصالات گالوانیزه', icon: <HardDrive size={14} />, meta: 'چدن گالوانیزه', val: 'طول عمر بالا', category: 'اتصالات گالوانیزه' },
          { name: 'اتصالات برنجی', icon: <Sparkles size={14} />, meta: 'برنج فورج شده', val: 'ضد نشت', category: 'اتصالات برنجی' },
          { name: 'سرپرسی', icon: <Target size={14} />, meta: 'اتصالات پرسی', val: 'فلزی', category: 'سرپرسی' }
        ]
      }
    ]
  },
  {
    id: 'flanged-fittings',
    title: 'اتصالات فلنجدار و چدنی',
    icon: <Layers size={18} />,
    tag: 'سیستم‌های فلنجی و چدنی',
    items: [
      { label: 'رینگ', detail: 'رینگ فولادی پشت فلنج', icon: <Disc size={16} />, status: 'درجه ۱', spec: 'ST37 / گالوانیزه', category: 'رینگ فولادی' },
      { label: 'فلنج', detail: 'انواع فلنج جوشی و کور', icon: <Combine size={16} />, status: 'استاندارد', spec: 'PN10 - PN16', category: 'فلنج فولادی' },
      { label: 'سه راه و چهارراه فلنجدار', detail: 'انشعابات چدنی و فولادی', icon: <Layers size={16} />, status: 'صنعتی', spec: 'تمام فلنج', category: 'اتصالات فلنجدار چدنی' },
      { label: 'کلکتور', detail: 'توزیع و جمع‌آوری جریان', icon: <Waves size={16} />, status: 'سفارشی', spec: 'فولادی ضخیم', category: 'کلکتور فولادی' }
    ]
  },
  {
    id: 'filtration',
    title: 'فیلتراسیون و کنترل',
    icon: <Filter size={18} />,
    tag: 'پاکسازی آب',
    items: [
      { label: 'فیلتر دیسکی', detail: 'تصفیه فیزیکی دقیق', icon: <Disc size={16} />, status: 'صنعتی', spec: '۲ تا ۴ اینچ', category: 'فیلتر دیسکی' },
      { label: 'فیلتر توری', detail: 'پاکسازی لایه‌ای', icon: <Layers size={16} />, status: 'اقتصادی', spec: 'توری استیل', category: 'فیلتر توری' },
      { label: 'فیلتر شنی', detail: 'تصفیه بیولوژیک و فیزیکی', icon: <Activity size={16} />, status: 'دبی بالا', spec: 'مخزنی', category: 'فیلتر شنی' },
      { label: 'هیدروسیکلون', detail: 'جداسازی شن و ماسه', icon: <Waves size={16} />, status: 'گریز از مرکز', spec: 'فولادی', category: 'هیدروسیکلون' },
      { label: 'تانک کود', detail: 'ونتوری / مخزنی تزریق کود', icon: <Droplets size={16} />, status: 'بهینه', spec: 'پلیمری', category: 'تجهیزات تزریق کود' },
      { label: 'لوازم جانبی فیلتراسیون', detail: 'مانومتر و اتصالات', icon: <Settings size={16} />, status: 'کنترلی', spec: 'گیج فشار', category: 'لوازم فیلتراسیون' }
    ]
  },
  {
    id: 'installation-tools',
    title: 'تجهیزات نصب و جانبی',
    icon: <Hammer size={18} />,
    tag: 'ابزار مکمل ارتقا',
    subGroups: [
      {
        label: 'ابزار و نصب',
        items: [
          { name: 'ابزار نصب', icon: <Wrench size={14} />, meta: 'آچار شلاقی و...', val: 'فارسان', category: 'ابزار نصب عمومی' },
          { name: 'پانچ', icon: <Target size={14} />, meta: 'سوراخ‌کن لوله', val: 'دستی', category: 'ابزار پانچ عمومی' },
          { name: 'آچار اتصالات', icon: <Wrench size={14} />, meta: 'آچار پیچی', val: 'پلیمری', category: 'آچار اتصالات' }
        ]
      },
      {
        label: 'ملزومات',
        items: [
          { name: 'بست و نگهدارنده', icon: <Anchor size={14} />, meta: 'دیواری و زمینی', val: 'پلیمری', category: 'بست و نگهدارنده' },
          { name: 'نوار تفلون', icon: <Activity size={14} />, meta: 'آب‌بندی رزوه', val: 'جامبو', category: 'نوار تفلون' },
          { name: 'چسب و آب‌بندی', icon: <Droplets size={14} />, meta: 'چسب فشار قوی', val: 'تارگت', category: 'چسب و آب بندی' },
          { name: 'پیچ و مهره', icon: <Settings size={14} />, meta: 'گالوانیزه', val: 'DIN', category: 'پیچ و مهره' }
        ]
      }
    ]
  },
  {
    id: 'iot-irrigation',
    title: 'آبیاری هوشمند IoT',
    icon: <Microchip size={18} />,
    tag: 'کشاورزی مدرن',
    items: [
      { label: 'کنترلر هوشمند', detail: 'مدیریت با موبایل', icon: <Cpu size={16} />, status: 'هوشمند', spec: 'Wi-Fi / GSM', category: 'آبیاری هوشمند' },
      { label: 'سنسور رطوبت', detail: 'پایش آنلاین خاک', icon: <Activity size={16} />, status: 'دقیق', spec: 'آنالوگ/دیجیتال', category: 'آبیاری هوشمند' }
    ]
  },
  {
    id: 'misc-products',
    title: 'محصولات متفرقه',
    icon: <Sparkles size={18} />,
    tag: 'سایر ملزومات',
    items: [
      { label: 'شلنگ باغبانی', detail: 'آبیاری عمومی', icon: <Waves size={16} />, status: 'منعطف', spec: 'چند لایه', category: 'شلنگ باغبانی' },
      { label: 'لوازم یدکی', detail: 'واشر و اورینگ', icon: <Disc size={16} />, status: 'یدکی', spec: 'لاستیکی', category: 'لوازم یدکی عمومی' }
    ]
  }
];

export const SLIDER_CATEGORIES: Category[] = [
  { id: '1', name: 'لوله نخدار', icon: 'Droplets' },
  { id: '2', name: 'شیر پروانه', icon: 'Settings' },
  { id: '3', name: 'نوارتیپ', icon: 'Activity' },
  { id: '4', name: 'لوله بارانی', icon: 'Waves' },
  { id: '5', name: 'شیرتوپی', icon: 'Disc' },
  { id: '6', name: 'شیر خودکار', icon: 'Layout' },
  { id: '7', name: 'اتصالات نخدار', icon: 'Wrench' },
  { id: '8', name: 'رایزر', icon: 'Layers' },
  { id: '9', name: 'کمربند', icon: 'Box' },
  { id: '10', name: 'لوله پلی اتیلن', icon: 'Wind' },
  { id: '11', name: 'اتصالات پلی اتیلن', icon: 'LinkIcon' },
  { id: '12', name: 'سرپرسی', icon: 'ShowerHead' },
];

export const FEATURED_CATEGORIES: FeaturedCategory[] = [
  { id: 'fc1', name: 'لوله‌های کشاورزی', image: 'https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=400' },
  { id: 'fc2', name: 'شیرآلات پلیمری', image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=400' },
  { id: 'fc3', name: 'آبیاری قطره‌ای', image: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?q=80&w=400' },
  { id: 'fc4', name: 'آبیاری بارانی', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=400' },
  { id: 'fc5', name: 'اتصالات پلی اتیلن', image: 'https://images.unsplash.com/photo-1505778276668-26b3ff7af103?q=80&w=400' },
  { id: 'fc6', name: 'اتصالات دنده‌ای', image: 'https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=400' },
  { id: 'fc7', name: 'اتصالات فلنجدار و چدنی', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=400' },
  { id: 'fc8', name: 'فیلتراسیون و کنترل', image: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?q=80&w=400' },
  { id: 'fc9', name: 'تجهیزات نصب و جانبی', image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=400' },
  { id: 'fc10', name: 'آبیاری هوشمند IoT', image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=400' },
  { id: 'fc11', name: 'اتصالات پیچی پلی اتیلن', image: 'https://images.unsplash.com/photo-1505778276668-26b3ff7af103?q=80&w=400' },
  { id: 'fc12', name: 'اتصالات الکتروفیوژن', image: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?q=80&w=400' },
  { id: 'fc13', name: 'شیرآلات فلنجدار', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=400' },
  { id: 'fc14', name: 'محصولات متفرقه', image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=400' },
];

export const PRICE_LIST_DOCS: PriceListDoc[] = [
  { id: 'dl1', title: 'لیست قیمت محصولات ویسپار', brand: 'Vispar', fileSize: '۴.۸ MB', date: '۱۴۰۳/۱۰/۱۵' },
  { id: 'dl2', title: 'لیست قیمت محصولات آسایش آذربایجان', brand: 'Asayesh', fileSize: '۳.۲ MB', date: '۱۴۰۳/۱۱/۰۱' },
  { id: 'dl3', title: 'لیست قیمت اتصالات قطره ای', brand: 'Drip System', fileSize: '۱.۵ MB' },
  { id: 'dl4', title: 'لیست قیمت اتصالات فلنجدار', brand: 'Industrial', fileSize: '۲.۱ MB' },
  { id: 'dl5', title: 'لیست قیمت محصولات پارس خاور', brand: 'Pars Khavar', fileSize: '۲.۹ MB' },
  { id: 'dl6', title: 'لیست قیمت محصولات پلی پارس', brand: 'Poly Pars', fileSize: '۳.۵ MB' },
  { id: 'dl7', title: 'لیست قیمت محصولات شیرالات شیرود', brand: 'Shirood', fileSize: '۱.۸ MB' },
  { id: 'dl8', title: 'لیست قیمت محصولات لیداب', brand: 'Lidab', fileSize: '۲.۴ MB' },
  { id: 'dl9', title: 'لیست قیمت اتصالات پیچی پلیران', brand: 'Poliran', fileSize: '۵.۱ MB' },
  { id: 'dl10', title: 'لیست قیمت اتصالات پیچی و کمربند پلی رود اتصال', brand: 'PolyRood', fileSize: '۴.۲ MB' },
  { id: 'dl11', title: 'لیست قیمت اتصالات قطره ای ، دنده ای پلی رود اتصال', brand: 'PolyRood', fileSize: '۳.۷ MB' },
  { id: 'dl12', title: 'لیست قیمت محصولات پیچی ایران دریپ', brand: 'Iran Drip', fileSize: '۲.۸ MB' },
  { id: 'dl13', title: 'لیست قیمت محصولات آبیاری ایران دریپ', brand: 'Iran Drip', fileSize: '۳.۱ MB' },
  { id: 'dl14', title: 'لیست قیمت اتصالات جوشی کاوه گستر', brand: 'Kaveh Gostar', fileSize: '۱.۹ MB' },
  { id: 'dl15', title: 'لیست قیمت اتصالات جوشی آبسان', brand: 'Absan', fileSize: '۲.۲ MB' },
  { id: 'dl16', title: 'لیست قیمت اتصالات پیچی نگین گلپایگان', brand: 'Negin', fileSize: '۳.۶ MB' },
  { id: 'dl17', title: 'لیست قیمت آبپاش ترک', brand: 'Turkey', fileSize: '۱.۴ MB' },
  { id: 'dl18', title: 'لیست قیمت محصولات جی سان', brand: 'G-Sun', fileSize: '۲.۰ MB' },
  { id: 'dl19', title: 'لیست قیمت محصولات فیتاب', brand: 'Fitab', fileSize: '۱.۷ MB' },
  { id: 'dl20', title: 'لیست قیمت محصولات چسبی ویسپار', brand: 'Vispar', fileSize: '۲.۵ MB' },
  { id: 'dl21', title: 'لیست قیمت محصولات مهراتصال صفاهان', brand: 'Mehr Ettesal', fileSize: '۳.۳ MB' },
  { id: 'dl22', title: 'لیست قیمت اتصالات سرپرسی', brand: 'Press Fittings', fileSize: '۱.۲ MB' },
  { id: 'dl23', title: 'لیست قیمت اتصالات گالوانیزه', brand: 'Galvanized', fileSize: '۴.۱ MB' },
  { id: 'dl24', title: 'لیست قیمت محصولات بهاران قطره', brand: 'Baharan', fileSize: '۲.۷ MB' },
  { id: 'dl25', title: 'لیست قیمت محصولات زلال رود', brand: 'Zolal', fileSize: '۱.۹ MB' },
  { id: 'dl26', title: 'لیست قیمت محصولات شیرآلات مهرآب', brand: 'Mehrab', fileSize: '۲.۳ MB' },
  { id: 'dl27', title: 'لیست قیمت محصولات آبافرین', brand: 'Abafarin', fileSize: '۱.۸ MB' },
  { id: 'dl28', title: 'لیست قیمت اتصالات جوشی پلیران', brand: 'Poliran', fileSize: '۴.۵ MB' },
  { id: 'dl29', title: 'لیست قیمت اتصالات جوشی و فاضلابی پلی رود اتصال', brand: 'PolyRood', fileSize: '۵.۰ MB' },
  { id: 'dl30', title: 'لیست قیمت محصولات آب لوله', brand: 'Ab Looleh', fileSize: '۲.۱ MB' },
  { id: 'dl31', title: 'لیست قیمت محصولات فاضلابی ایران دریپ', brand: 'Iran Drip', fileSize: '۳.۴ MB' },
  { id: 'dl32', title: 'لیست قیمت اتصالات پیچی کاوه گستر', brand: 'Kaveh Gostar', fileSize: '۲.۵ MB' },
  { id: 'dl33', title: 'لیست قیمت لوله های پلی اتیلن', brand: 'PE Pipes', fileSize: '۶.۲ MB' },
  { id: 'dl34', title: 'لیست قیمت اتصالات پیچی آبسان', brand: 'Absan', fileSize: '۲.۳ MB' },
  { id: 'dl35', title: 'لیست قیمت لوله های پلی اتیلن توسن', brand: 'Toosan', fileSize: '۳.۸ MB' },
  { id: 'dl36', title: 'لیست قیمت محصولات پویا پلاست', brand: 'Pouya Plast', fileSize: '۱.۹ MB' },
  { id: 'dl37', title: 'لیست قیمت محصولات اصفهان پلاست', brand: 'Isfahan Plast', fileSize: '۴.۲ MB' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'لوله پلی‌اتیلن فشار قوی PE100',
    category: 'لوله پلی اتیلن کشاورزی',
    price: 1250000,
    sku: 'AB-PE-100-63',
    unit: 'متر',
    image: 'https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=600&auto=format&fit=crop',
    description: 'لوله پلی‌اتیلن با چگالی بالا (HDPE) گرید PE100، مناسب برای خطوط انتقال آب فشار قوی.',
    isSpecial: true,
    stockStatus: 'available',
    variations: [
      { size: '۶۳ میلیمتر', price: 1250000 },
      { size: '۷۵ میلیمتر', price: 1580000 },
      { size: '۹۰ میلیمتر', price: 2150000 },
      { size: '۱۱۰ میلیمتر', price: 2950000 },
    ],
    specs: [
      { label: 'متریال', value: 'PE100' },
      { label: 'فشار کاری', value: '۱۰ بار (PN10)' }
    ]
  },
  {
    id: 'p2',
    name: 'شیر توپی دسته پلیمری ممتاز',
    category: 'شیرتوپی پلیمری',
    price: 450000,
    sku: 'AB-VALVE-PV-2',
    unit: 'عدد',
    image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=600&auto=format&fit=crop',
    description: 'مقاوم در برابر اشعه UV و خوردگی با آب‌بندی ۱۰۰ درصد.',
    isBestSeller: true,
    stockStatus: 'available',
    variations: [
      { size: '۱/۲ اینچ', price: 320000 },
      { size: '۳/۴ اینچ', price: 380000 },
      { size: '۱ اینچ', price: 450000 },
      { size: '۱ ۱/۲ اینچ', price: 720000 },
      { size: '۲ اینچ', price: 950000 },
    ],
    specs: [
      { label: 'جنس بدنه', value: 'Polypropylene' },
      { label: 'استاندارد', value: 'ISO 9001' }
    ]
  },
  {
    id: 'p3',
    name: 'نوار تیپ آبیاری قطره‌ای (درزدار)',
    category: 'نوارتیپ',
    price: 890000,
    sku: 'AB-TAPE-20-10',
    unit: 'حلقه',
    image: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?q=80&w=600&auto=format&fit=crop',
    description: 'نوار تیپ با آبدهی یکنواخت برای کشت‌های ردیفی و صیفی‌جات.',
    isSpecial: true,
    stockStatus: 'low',
    specs: [
      { label: 'فاصله روزنه', value: '۲۰ سانتی‌متر' },
      { label: 'ضخامت دیوار', value: '۱۷۵ میکرون' }
    ]
  },
  {
    id: 'p4',
    name: 'آبپاش صنعتی تنظیم‌شونده آبرسان',
    category: 'آبپاش بارانی',
    price: 1850000,
    sku: 'AB-SPR-HD-X1',
    unit: 'عدد',
    image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=600&auto=format&fit=crop', 
    description: 'آبپاش قدرتمند با بدنه آلیاژی مقاوم در برابر ضربه و خوردگی.',
    isBestSeller: true,
    stockStatus: 'available',
    specs: [
      { label: 'شعاع پاشش', value: '۱۵ الی ۲۵ متر' },
      { label: 'جنس بدنه', value: 'آلومینیوم و برنج' }
    ]
  },
  {
    id: 'p5',
    name: 'لوله پلی‌اتیلن نیمه‌قوی PE80',
    category: 'لوله پلی اتیلن کشاورزی',
    price: 950000,
    sku: 'AB-PE-80-50',
    unit: 'متر',
    image: 'https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=600&auto=format&fit=crop',
    description: 'لوله پلی‌اتیلن گرید PE80 مناسب برای فشار ۶ بار.',
    stockStatus: 'available',
    specs: [
      { label: 'سایز', value: '۵۰ میلی‌متر' },
      { label: 'فشار کاری', value: '۶ بار' }
    ]
  },
  {
    id: 'p6',
    name: 'شیر پروانه چدنی گیربکسی',
    category: 'شیر پروانه چدنی',
    price: 4200000,
    sku: 'AB-VLV-BF-100',
    unit: 'عدد',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=600&auto=format&fit=crop',
    description: 'شیر پروانه‌ای با بدنه چدنی و زبانه استیل برای کنترل دقیق جریان.',
    stockStatus: 'available',
    specs: [
      { label: 'سایز فلنج', value: '۱۰۰ میلی‌متر' },
      { label: 'نوع عملکرد', value: 'گیربکس دستی' }
    ]
  },
  {
    id: 'p7',
    name: 'نوار تیپ پلاک‌دار (Emitter)',
    category: 'نوارتیپ',
    price: 1100000,
    sku: 'AB-TAPE-P-30',
    image: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?q=80&w=600&auto=format&fit=crop',
    description: 'نوار تیپ با قطره‌چکان‌های داخلی (پلاک‌دار) برای پایداری بیشتر.',
    stockStatus: 'available',
    specs: [
      { label: 'فاصله پلاک', value: '۳۰ سانتی‌متر' },
      { label: 'طول کلاف', value: '۱۰۰۰ متر' }
    ]
  },
  {
    id: 'p8',
    name: 'زانو ۹۰ درجه پلی‌اتیلن پیچی',
    category: 'اتصالات پیچی پلی اتیلن',
    price: 45000,
    sku: 'AB-FIT-ELB-63',
    image: 'https://images.unsplash.com/photo-1505778276668-26b3ff7af103?q=80&w=600&auto=format&fit=crop',
    description: 'اتصال زانویی برای تغییر مسیر لوله‌های پلی‌اتیلن نمره ۶۳.',
    stockStatus: 'available',
    specs: [
      { label: 'زاویه', value: '۹۰ درجه' },
      { label: 'نوع اتصال', value: 'پیچی' }
    ]
  },
  {
    id: 'p9',
    name: 'سه راهی مساوی پلی‌اتیلن',
    category: 'اتصالات پیچی پلی اتیلن',
    price: 68000,
    sku: 'AB-FIT-TEE-63',
    image: 'https://images.unsplash.com/photo-1505778276668-26b3ff7af103?q=80&w=600&auto=format&fit=crop',
    description: 'سه راهی برای انشعاب‌گیری از لوله‌های هم‌سایز.',
    stockStatus: 'available',
    specs: [
      { label: 'سایز', value: '۶۳ میلی‌متر' },
      { label: 'تحمل فشار', value: '۱۰ بار' }
    ]
  },
  {
    id: 'p10',
    name: 'شیر خودکار آلومینیومی ۱ اینچ',
    category: 'شیر خودکار پلیمری',
    price: 320000,
    sku: 'AB-VLV-AUTO-1',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=600&auto=format&fit=crop',
    description: 'شیر خودکار مخصوص سیستم‌های بارانی برای اتصال سریع رایزر.',
    stockStatus: 'available',
    specs: [
      { label: 'جنس', value: 'آلومینیوم' },
      { label: 'سایز', value: '۱ اینچ' }
    ]
  },
  {
    id: 'p11',
    name: 'رایزر پلیمری ۱ اینچ - طول ۶۰',
    category: 'رایزر',
    price: 85000,
    sku: 'AB-RISER-PL-60',
    image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=600&auto=format&fit=crop',
    description: 'رایزر پلیمری مقاوم در برابر نور خورشید برای نصب آبپاش.',
    stockStatus: 'available',
    specs: [
      { label: 'طول', value: '۶۰ سانتی‌متر' },
      { label: 'جنس', value: 'پلیمر فشرده' }
    ]
  },
  {
    id: 'p12',
    name: 'کمربند پلی‌اتیلن ۱۲۵ به ۲ اینچ',
    category: 'کمربند',
    price: 110000,
    sku: 'AB-SADDLE-125-2',
    image: 'https://images.unsplash.com/photo-1505778276668-26b3ff7af103?q=80&w=600&auto=format&fit=crop',
    description: 'کمربند انشعاب برای لوله‌های پلی‌اتیلن سایز بزرگ.',
    stockStatus: 'available',
    specs: [
      { label: 'سایز بدنه', value: '۱۲۵ میلی‌متر' },
      { label: 'خروجی', value: '۲ اینچ رزوه' }
    ]
  },
  {
    id: 'p13',
    name: 'فیلتر دیسکی سری هلیکس ۲ اینچ',
    category: 'فیلتر دیسکی',
    price: 2850000,
    sku: 'AB-FILT-DSK-2',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=600&auto=format&fit=crop',
    description: 'سیستم فیلتراسیون دیسکی برای حذف ذرات معلق در آب.',
    stockStatus: 'low',
    specs: [
      { label: 'ظرفیت', value: '۳۰ مترمکعب/ساعت' },
      { label: 'مش فیلتر', value: '۱۳۰ میکرون' }
    ]
  },
  {
    id: 'p14',
    name: 'شیر توپی دسته بلند ویسپار',
    category: 'شیرتوپی پلیمری',
    price: 520000,
    sku: 'AB-VLV-BALL-VIS',
    image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=600&auto=format&fit=crop',
    description: 'شیر توپی با طراحی ارگونومیک و دسته بلند پلیمری.',
    stockStatus: 'available',
    specs: [
      { label: 'برند', value: 'Vispar' },
      { label: 'سایز', value: '۳ اینچ' }
    ]
  },
  {
    id: 'p15',
    name: 'رابط ۱۶ به ۱۶ قطره‌ای',
    category: 'اتصالات ۱۶ قطره ای',
    price: 4500,
    sku: 'AB-FIT-CON-16',
    image: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?q=80&w=600&auto=format&fit=crop',
    description: 'رابط کشویی برای اتصال لوله‌های ۱۶ میلی‌متر قطره‌ای.',
    stockStatus: 'available',
    specs: [
      { label: 'بسته‌بندی', value: '۱۰۰ عددی' },
      { label: 'جنس', value: 'پلی‌اتیلن درجه ۱' }
    ]
  },
  {
    id: 'p16',
    name: 'بست ابتدایی ۱۶ میلی‌متری',
    category: 'اتصالات ۱۶ قطره ای',
    price: 3200,
    sku: 'AB-FIT-GRM-16',
    image: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?q=80&w=600&auto=format&fit=crop',
    description: 'بست و واشر برای شروع انشعاب از لوله اصلی به ۱۶ میلی‌متر.',
    stockStatus: 'available',
    specs: [
      { label: 'نوع واشر', value: 'تخت پلیمری' },
      { label: 'سایز سوراخ', value: '۱۶ میلی‌متر' }
    ]
  },
  {
    id: 'p17',
    name: 'دریپر (قطره‌چکان) خودتنظیم نتافیم',
    category: 'قطره چکان',
    price: 12500,
    sku: 'AB-DRP-PC-4L',
    image: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?q=80&w=600&auto=format&fit=crop',
    description: 'قطره‌چکان PC با آبدهی ثابت در فشارهای مختلف.',
    stockStatus: 'available',
    specs: [
      { label: 'دبی خروجی', value: '۴ لیتر در ساعت' },
      { label: 'مدل', value: 'Netafim PC' }
    ]
  },
  {
    id: 'p18',
    name: 'لوله لی‌فلت (لوله منعطف) ۳ اینچ',
    category: 'لوله لی فلت',
    price: 185000,
    sku: 'AB-PIPE-LF-3',
    image: 'https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=600&auto=format&fit=crop',
    description: 'لوله تاشو و سبک برای انتقال موقت آب در مزارع.',
    stockStatus: 'available',
    specs: [
      { label: 'سایز', value: '۳ اینچ (۷۵ میلی‌متر)' },
      { label: 'فشار ترکیدگی', value: '۱۲ بار' }
    ]
  },
  {
    id: 'p19',
    name: 'شیر فلکه کشویی زبانه لاستیکی',
    category: 'شیر فلکه چدنی',
    price: 3800000,
    sku: 'AB-VLV-GATE-80',
    image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=600&auto=format&fit=crop',
    description: 'شیر فلکه کشویی با آب‌بندی لاستیکی برای سیستم‌های آبرسانی شهری و روستایی.',
    stockStatus: 'available',
    specs: [
      { label: 'سایز', value: '۸۰ میلی‌متر' },
      { label: 'جنس بدنه', value: 'GJS400 (چدن داکتیل)' }
    ]
  },
  {
    id: 'p20',
    name: 'آبپاش ضربه‌ای برنجی ۳/۴ اینچ',
    category: 'آبپاش بارانی',
    price: 650000,
    sku: 'AB-SPR-BR-34',
    image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=600&auto=format&fit=crop',
    description: 'آبپاش تمام برنجی با شعاع پاشش متوسط مناسب برای یونجه و غلات.',
    stockStatus: 'available',
    specs: [
      { label: 'جنس نازل', value: 'برنج فورج شده' },
      { label: 'شعاع پاشش', value: '۱۲ الی ۱۸ متر' }
    ]
  }
];

export const BRANDS = [
  'ویسپار',
  'آسایش آذربایجان',
  'مهر اتصال صفاهان',
  'دنا پلاست',
  'لیداب',
  'مهراب',
  'آبافرین',
  'پارس خاور',
  'بهاران قطره',
  'آب لوله',
  'اصفهان پلاست',
  'توسن',
  'جی سان',
  'پلی رود',
  'پویا پلاست',
  'فیتاب',
  'کاوه گستر',
  'نگین گلپایگان',
  'زلال رود'
];

export const ICON_MAP: Record<string, React.ReactNode> = {
  Droplets: <Droplets size={32} />,
  Settings: <Settings size={32} />,
  Activity: <Activity size={32} />,
  Waves: <Waves size={32} />,
  Disc: <Disc size={32} />,
  Layout: <Layout size={32} />,
  Wrench: <Wrench size={32} />,
  Layers: <Layers size={32} />,
  Box: <Box size={32} />,
  Wind: <Wind size={32} />,
  LinkIcon: <LinkIcon size={32} />,
  ShowerHead: <ShowerHead size={32} />,
  Zap: <Zap size={32} />,
  Filter: <Filter size={32} />,
  Hammer: <Hammer size={32} />,
  Sparkles: <Sparkles size={32} />,
};
