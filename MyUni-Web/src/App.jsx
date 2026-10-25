import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity, ArrowDownLeft, ArrowLeft, ArrowRight, ArrowUpLeft, Award, Bell, BookOpen,
  BriefcaseBusiness, Bus, CalendarDays, Check, CheckCheck, ChevronDown, ChevronLeft,
  ChevronRight, CircleHelp, ClipboardCheck, Code2, Compass, FileText, Filter, GraduationCap,
  Heart, Home, Laptop, Layers3, Lightbulb, MapPin, Megaphone, Menu, MessageCircle,
  MessageSquareText, Monitor, Palette, Search, Send, Settings, ShieldCheck, Sparkles,
  Star, Target, Users, Utensils, X, Clock3, ExternalLink, Bookmark, BookMarked,
  ChartNoAxesCombined, CircleUserRound, Plus, Trash2, Globe, Building2, ArrowUpRight,
  Briefcase, PartyPopper, Ticket, BadgeCheck, LaptopMinimal, CalendarCheck, CheckCircle2
} from 'lucide-react';
import { defaultPrograms, defaultEvents, defaultOffers, defaultServices, journeyTasks } from './data.js';

const KEY = 'myuni-demo-v1';
const readStore = (key, fallback) => {
  try {
    const value = localStorage.getItem(`${KEY}:${key}`);
    return value ? JSON.parse(value) : fallback;
  } catch { return fallback; }
};
const saveStore = (key, value) => {
  try { localStorage.setItem(`${KEY}:${key}`, JSON.stringify(value)); } catch { /* local storage may be unavailable */ }
};

const iconMap = {
  home: Home, programs: GraduationCap, choose: Sparkles, journey: ClipboardCheck, campus: CalendarDays,
  services: Building2, ai: MessageCircle, admin: Settings, profile: CircleUserRound, briefcase: BriefcaseBusiness,
  code: Code2, megaphone: Megaphone, palette: Palette, chart: ChartNoAxesCombined, layers: Layers3,
  users: Users, laptop: LaptopMinimal, book: BookOpen, map: MapPin, bus: Bus, message: MessageSquareText,
  food: Utensils, events: CalendarDays, offers: Ticket, bell: Bell, compass: Compass, shield: ShieldCheck,
  target: Target, star: Star, award: Award, external: ExternalLink, check: CheckCircle2, light: Lightbulb
};
const getIcon = (name, size = 20) => {
  const Icon = iconMap[name] || Sparkles;
  return <Icon size={size} strokeWidth={1.8} aria-hidden="true" />;
};

const categories = [
  { id: 'all', ar: 'الكل', en: 'All' },
  { id: 'Business', ar: 'إدارة وأعمال', en: 'Business' },
  { id: 'Technology', ar: 'تكنولوجيا', en: 'Technology' },
  { id: 'Design', ar: 'تصميم', en: 'Design' },
  { id: 'Engineering', ar: 'هندسة', en: 'Engineering' }
];
const interests = [
  { id: 'Technology', ar: 'التكنولوجيا والكمبيوتر', en: 'Technology & computers', icon: 'code' },
  { id: 'Business', ar: 'الأعمال والإدارة', en: 'Business & management', icon: 'briefcase' },
  { id: 'Creativity', ar: 'التصميم والإبداع', en: 'Design & creativity', icon: 'palette' },
  { id: 'Data', ar: 'البيانات والتحليل', en: 'Data & analytics', icon: 'chart' },
  { id: 'Engineering', ar: 'الهندسة والعلوم', en: 'Engineering & science', icon: 'layers' },
  { id: 'Marketing', ar: 'التسويق والإعلام', en: 'Marketing & media', icon: 'megaphone' }
];

export default function App() {
  const [lang, setLang] = useState(() => readStore('lang', 'ar'));
  const [role, setRole] = useState(() => readStore('role', 'new'));
  const [page, setPage] = useState('home');
  const [query, setQuery] = useState('');
  const [programs, setPrograms] = useState(() => readStore('programs', defaultPrograms));
  const [events, setEvents] = useState(() => readStore('events', defaultEvents));
  const [savedPrograms, setSavedPrograms] = useState(() => readStore('savedPrograms', []));
  const [registeredEvents, setRegisteredEvents] = useState(() => readStore('registeredEvents', []));
  const [checkedTasks, setCheckedTasks] = useState(() => readStore('checkedTasks', {}));
  const [requests, setRequests] = useState(() => readStore('requests', []));
  const [chatMessages, setChatMessages] = useState(() => readStore('chatMessages', [{ id: 1, from: 'bot', text: 'أهلًا بيك في MyUni! أنا المساعد التجريبي. اسألني عن البرامج أو إرشادات القبول أو التحويل أو الخدمات الموجودة في النسخة التجريبية.' }]));
  const [message, setMessage] = useState('');
  const [programSearch, setProgramSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [interestSelection, setInterestSelection] = useState(() => readStore('interestSelection', []));
  const [chooseResult, setChooseResult] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [requestService, setRequestService] = useState('');
  const [requestText, setRequestText] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [profileName, setProfileName] = useState(() => readStore('profileName', 'Ayoub'));
  const [adminEventTitle, setAdminEventTitle] = useState('');
  const [adminEventDate, setAdminEventDate] = useState('2026-12-01');
  const [adminEventLocation, setAdminEventLocation] = useState('Main Campus');
  const [notice, setNotice] = useState('');
  const isAr = lang === 'ar';
  const tr = (ar, en) => isAr ? ar : en;

  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = isAr ? 'rtl' : 'ltr'; saveStore('lang', lang); }, [lang, isAr]);
  useEffect(() => saveStore('role', role), [role]);
  useEffect(() => saveStore('programs', programs), [programs]);
  useEffect(() => saveStore('events', events), [events]);
  useEffect(() => saveStore('savedPrograms', savedPrograms), [savedPrograms]);
  useEffect(() => saveStore('registeredEvents', registeredEvents), [registeredEvents]);
  useEffect(() => saveStore('checkedTasks', checkedTasks), [checkedTasks]);
  useEffect(() => saveStore('requests', requests), [requests]);
  useEffect(() => saveStore('chatMessages', chatMessages), [chatMessages]);
  useEffect(() => saveStore('interestSelection', interestSelection), [interestSelection]);
  useEffect(() => saveStore('profileName', profileName), [profileName]);
  useEffect(() => { if (!notice) return; const timer = setTimeout(() => setNotice(''), 3200); return () => clearTimeout(timer); }, [notice]);

  const roleName = role === 'new' ? tr('طالب جديد', 'New student') : role === 'transfer' ? tr('طالب تحويل', 'Transfer student') : tr('طالب حالي', 'Current student');
  const navItems = [
    { id: 'home', label: tr('الرئيسية', 'Overview'), icon: 'home' },
    { id: 'programs', label: tr('استكشف البرامج', 'Explore programs'), icon: 'programs' },
    { id: 'choose', label: tr('ساعدني أختار', 'Help me choose'), icon: 'choose' },
    { id: 'journey', label: tr('رحلتي الجامعية', 'My journey'), icon: 'journey' },
    { id: 'campus', label: tr('الحياة الجامعية', 'Campus life'), icon: 'campus' },
    { id: 'services', label: tr('الخدمات', 'Services'), icon: 'services' },
    { id: 'ai', label: tr('مساعد MyUni AI', 'MyUni AI assistant'), icon: 'ai' },
    { id: 'admin', label: tr('لوحة الإدارة التجريبية', 'Demo admin'), icon: 'admin' }
  ];
  const openPage = (id) => { setPage(id); setShowProfile(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const totalTasks = journeyTasks[role].length;
  const completedTasks = journeyTasks[role].filter((item) => checkedTasks[`${role}:${item.id}`]).length;
  const journeyProgress = Math.round((completedTasks / totalTasks) * 100);

  const filteredPrograms = useMemo(() => {
    const term = programSearch.trim().toLowerCase();
    return programs.filter(p => {
      const matchCategory = categoryFilter === 'all' || p.tags?.some(t => t.toLowerCase().includes(categoryFilter.toLowerCase())) || p.category?.toLowerCase().includes(categoryFilter.toLowerCase());
      const matchTerm = !term || `${p.name} ${p.college} ${p.category} ${p.description} ${(p.tags || []).join(' ')}`.toLowerCase().includes(term);
      return matchCategory && matchTerm;
    });
  }, [programs, programSearch, categoryFilter]);

  const toggleSaveProgram = (id) => setSavedPrograms(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleTask = (id) => setCheckedTasks(prev => ({ ...prev, [`${role}:${id}`]: !prev[`${role}:${id}`] }));
  const toggleInterest = (id) => setInterestSelection(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleRegisterEvent = (id) => {
    setRegisteredEvents(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    setNotice(registeredEvents.includes(id) ? tr('تم إلغاء تسجيلك التجريبي.', 'Demo registration removed.') : tr('تم تسجيل اهتمامك بالفعالية في هذه النسخة التجريبية.', 'Your demo event registration has been saved.'));
  };

  const sendChat = (textOverride) => {
    const content = (textOverride ?? message).trim();
    if (!content) return;
    const userMsg = { id: Date.now(), from: 'user', text: content };
    const lower = content.toLowerCase();
    let reply = tr(
      'أقدر أساعدك بالمعلومات المتاحة في نموذج MyUni التجريبي. لو بتسأل عن شرط رسمي أو موعد أو رسوم مش موجودين في البيانات، لازم تتأكد من الجامعة مباشرة؛ المعلومات هنا للتجربة وليست مصدرًا رسميًا.',
      'I can help using the information included in this MyUni demo. For official requirements, dates, or fees that are not in the demo data, please confirm directly with the university. This is not an official source.'
    );
    if (/(تحويل|transfer|معادلة|equivalen)/i.test(lower)) reply = tr('رحلة التحويل في النسخة التجريبية: راجع شروط التحويل المعتمدة، سجّل بيانات جامعتك السابقة، جهّز المستندات، ثم تابع قناة التقديم الرسمية. معادلة المواد وأهلية التحويل النهائية لا يقررها التطبيق، ولازم الجامعة تؤكدها.', 'Demo transfer journey: review approved transfer requirements, record previous university details, prepare documents, and follow the official application channel. The app cannot make final transfer or course-equivalency decisions; the university must confirm them.');
    else if (/(قبول|تقديم|مستند|admission|apply|document|requirement)/i.test(lower)) reply = tr('ابدأ بمراجعة صفحة «استكشف البرامج» ثم افتح البرنامج المطلوب وراجع شروط القبول والمستندات المتاحة. قائمة MyUni تنظّم خطواتك فقط، ولا تعتبر تقديمًا رسميًا. أي شرط أو موعد ناقص لازم تتأكد منه من الجامعة.', 'Start in Explore Programs, open the relevant program, and review the available admission requirements and documents. MyUni organizes your steps; it does not submit an official application. Confirm any missing requirements or dates with the university.');
    else if (/(برنامج|تخصص|اختار|choose|program|major|study)/i.test(lower)) reply = tr('تقدر تستخدم «ساعدني أختار» وتحدد اهتماماتك، وبعدها MyUni يعرض برامج تجريبية متوافقة مع الكلمات اللي اخترتها. الترشيحات استرشادية وليست قرارًا أكاديميًا، وبيانات البرامج الحالية للتجربة وتحتاج مراجعة بيانات الجامعة الحقيقية.', 'Use Help Me Choose to select your interests. MyUni will show demo programs that match those interests. Suggestions are informational, not academic decisions, and the current program data is sample content that must be replaced with verified university data.');
    else if (/(فعالي|حدث|نادي|event|club|activity)/i.test(lower)) reply = tr('افتح «الحياة الجامعية» لاستكشاف الفعاليات التجريبية. تقدر تحفظ تسجيل اهتمامك داخل المتصفح. أسماء الفعاليات ومواعيدها الحالية بيانات تجريبية وليست إعلانًا رسميًا من الجامعة.', 'Open Campus Life to explore demo events. You can save your interest in this browser. Current event names and dates are sample data, not official university announcements.');
    else if (/(خدم|دعم|مكتبة|مواصل|service|support|library|transport)/i.test(lower)) reply = tr('افتح صفحة «الخدمات» واختر الخدمة المناسبة وأرسل طلبًا تجريبيًا. الطلب يُحفظ داخل المتصفح فقط في النسخة الحالية، ولا يصل لموظفي الجامعة حتى يتم ربط الموقع بنظام خلفي رسمي.', 'Open Services, choose a service, and submit a demo request. The request is stored only in this browser; it will not reach university staff until an official backend is connected.');
    setChatMessages(prev => [...prev, userMsg, { id: Date.now() + 1, from: 'bot', text: reply }]);
    setMessage('');
  };

  const submitRequest = (e) => {
    e.preventDefault();
    if (!requestService || requestText.trim().length < 5) { setNotice(tr('اختار الخدمة واكتب تفاصيل أوضح شوية.', 'Choose a service and enter a little more detail.')); return; }
    const next = { id: Date.now(), service: requestService, details: requestText.trim(), status: tr('مُسجّل تجريبيًا', 'Saved in demo'), date: new Date().toLocaleDateString(isAr ? 'ar-EG' : 'en-US') };
    setRequests(prev => [next, ...prev]);
    setShowRequest(false); setRequestService(''); setRequestText('');
    setNotice(tr('اتحفظ طلبك في النسخة التجريبية على الجهاز ده فقط.', 'Your request was saved in this demo on this device only.'));
  };

  const submitAdminEvent = (e) => {
    e.preventDefault();
    if (!adminEventTitle.trim() || !adminEventDate) { setNotice(tr('اكتب اسم الفعالية وحدد تاريخها.', 'Enter an event name and date.')); return; }
    setEvents(prev => [{ id: Date.now(), title: adminEventTitle.trim(), category: 'University', date: adminEventDate, time: '12:00 PM', location: adminEventLocation || 'Campus', description: tr('فعالية أُضيفت من لوحة الإدارة التجريبية.', 'Event added from the demo admin panel.'), accent: 'blue' }, ...prev]);
    setAdminEventTitle('');
    setNotice(tr('تمت إضافة الفعالية التجريبية، وستظهر في صفحة الحياة الجامعية.', 'Demo event added and will appear on the Campus Life page.'));
  };

  const pageTitle = navItems.find(item => item.id === page)?.label || tr('الرئيسية', 'Overview');

  return (
    <div className={`app-shell ${isAr ? 'rtl' : 'ltr'}`}>
      <aside className="sidebar">
        <button className="brand" onClick={() => openPage('home')} aria-label="MyUni home">
          <img src="/myuni-logo.svg" alt="MyUni" />
        </button>
        <div className="workspace-label">{tr('مساحة الطالب', 'STUDENT SPACE')}</div>
        <nav className="main-nav" aria-label={tr('التنقل الرئيسي', 'Main navigation')}>
          {navItems.map(item => {
            const active = page === item.id;
            return <button key={item.id} className={`nav-item ${active ? 'active' : ''}`} onClick={() => openPage(item.id)}>
              {getIcon(item.icon, 19)}<span>{item.label}</span>{item.id === 'ai' && <span className="nav-ai-dot" />}
            </button>;
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="support-box">
            <div className="support-icon"><CircleHelp size={20} /></div>
            <strong>{tr('محتاج مساعدة؟', 'Need a hand?')}</strong>
            <p>{tr('اسأل مساعد MyUni عن خدمات وخصائص النسخة التجريبية.', 'Ask MyUni about features in this demo.')}</p>
            <button className="support-link" onClick={() => openPage('ai')}>{tr('اسأل المساعد', 'Ask assistant')} <ArrowLeft size={14} /></button>
          </div>
          <button className="profile-mini" onClick={() => setShowProfile(!showProfile)}>
            <div className="avatar">{(profileName || 'A').slice(0, 1).toUpperCase()}</div>
            <div className="profile-mini-text"><strong>{profileName || 'Ayoub'}</strong><span>{roleName}</span></div>
            <ChevronDown size={16} />
          </button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="mobile-brand"><img src="/myuni-logo.svg" alt="MyUni" /></div>
          <div className="topbar-title"><span>{tr('مساحة MyUni الخاصة بي', 'MYUNI STUDENT SPACE')}</span><h1>{pageTitle}</h1></div>
          <div className="topbar-actions">
            <label className="global-search"><Search size={17} /><input value={query} onChange={e => { setQuery(e.target.value); if (e.target.value.trim()) { setProgramSearch(e.target.value); setPage('programs'); } }} placeholder={tr('ابحث عن البرامج والخدمات...', 'Search programs and services...')} /></label>
            <button className="icon-button language-button" onClick={() => setLang(isAr ? 'en' : 'ar')} aria-label="Switch language"><Globe size={18} /><span>{isAr ? 'EN' : 'عربي'}</span></button>
            <button className="icon-button notification-button" onClick={() => setNotice(tr('مفيش إشعارات جديدة في النسخة التجريبية.', 'No new notifications in the demo.'))} aria-label={tr('الإشعارات', 'Notifications')}><Bell size={18} /><i /></button>
            <button className="avatar top-avatar" onClick={() => setShowProfile(!showProfile)} aria-label={tr('الملف الشخصي', 'Profile')}>{(profileName || 'A').slice(0, 1).toUpperCase()}</button>
          </div>
        </header>

        <div className="content-area">
          {showProfile && <div className="profile-popover">
            <div className="popover-head"><div className="avatar">{(profileName || 'A').slice(0, 1).toUpperCase()}</div><div><b>{profileName || 'Ayoub'}</b><small>{roleName}</small></div><button className="plain-icon" onClick={() => setShowProfile(false)}><X size={16} /></button></div>
            <label className="field-label">{tr('الاسم المعروض', 'Display name')}<input value={profileName} onChange={e => setProfileName(e.target.value)} /></label>
            <label className="field-label">{tr('نوع المستخدم', 'User type')}<select value={role} onChange={e => { setRole(e.target.value); setShowProfile(false); setNotice(tr('تم تغيير دور العرض التجريبي.', 'Demo role changed.')); }}><option value="new">{tr('طالب جديد', 'New student')}</option><option value="transfer">{tr('طالب تحويل', 'Transfer student')}</option><option value="current">{tr('طالب حالي', 'Current student')}</option></select></label>
            <p className="tiny-note">{tr('الملف الشخصي محلي وتجريبي، وليس مرتبطًا بحساب فعلي.', 'Profile is local demo data, not a real account.')}</p>
          </div>}

          {page === 'home' && <HomePage {...{isAr, tr, role, roleName, profileName, programs, savedPrograms, events, registeredEvents, completedTasks, totalTasks, journeyProgress, openPage, toggleSaveProgram, toggleRegisterEvent, checkedTasks, toggleTask}} />}
          {page === 'programs' && <ProgramsPage {...{isAr, tr, filteredPrograms, programSearch, setProgramSearch, categoryFilter, setCategoryFilter, savedPrograms, toggleSaveProgram, setPage, query, setQuery}} />}
          {page === 'choose' && <ChoosePage {...{isAr, tr, interestSelection, toggleInterest, chooseResult, setChooseResult, programs, savedPrograms, toggleSaveProgram, openPage}} />}
          {page === 'journey' && <JourneyPage {...{isAr, tr, role, roleName, journeyTasks, checkedTasks, toggleTask, journeyProgress, completedTasks, totalTasks, openPage}} />}
          {page === 'campus' && <CampusPage {...{isAr, tr, events, registeredEvents, toggleRegisterEvent, setNotice}} />}
          {page === 'services' && <ServicesPage {...{isAr, tr, requests, setShowRequest, setRequestService, openPage}} />}
          {page === 'ai' && <AIPage {...{isAr, tr, chatMessages, message, setMessage, sendChat}} />}
          {page === 'admin' && <AdminPage {...{isAr, tr, events, programs, adminEventTitle, setAdminEventTitle, adminEventDate, setAdminEventDate, adminEventLocation, setAdminEventLocation, submitAdminEvent, requests}} />}
          {showRequest && <RequestModal {...{isAr, tr, requestService, setRequestService, requestText, setRequestText, submitRequest, setShowRequest}} />}
          {notice && <div className="toast" role="status"><CheckCircle2 size={18} /><span>{notice}</span><button className="plain-icon" onClick={() => setNotice('')}><X size={15} /></button></div>}
          <footer className="site-footer"><span>© 2026 MyUni · {tr('نسخة أولية لمشروع تخرج', 'Graduation project prototype')}</span><span className="demo-pill"><i /> {tr('بيانات تجريبية', 'DEMO DATA')}</span><span>{tr('One platform. Three journeys.', 'One platform. Three journeys.')}</span></footer>
        </div>
      </main>
    </div>
  );
}

function HomePage({ isAr, tr, role, roleName, profileName, programs, savedPrograms, events, registeredEvents, completedTasks, totalTasks, journeyProgress, openPage, toggleSaveProgram, toggleRegisterEvent, checkedTasks, toggleTask }) {
  const roleHeadline = role === 'new' ? tr('ابدأ رحلتك الجامعية بثقة', 'Start your university journey with confidence') : role === 'transfer' ? tr('خلّي رحلة التحويل أوضح وأسهل', 'Make your transfer journey clearer') : tr('استمتع بتجربة جامعية متكاملة', 'Make the most of campus life');
  const roleCopy = role === 'new' ? tr('اكتشف البرامج، افهم متطلبات القبول، واختار الخطوة الجاية المناسبة ليك.', 'Explore programs, understand admission guidance, and find your next step.') : role === 'transfer' ? tr('نظّم متطلبات التحويل والمستندات وتابع خطواتك في مكان واحد.', 'Organize transfer requirements and documents in one place.') : tr('اكتشف الفعاليات والأندية والخدمات اللي تساعدك تعيش تجربة جامعية أفضل.', 'Discover events, clubs, and services for a better campus experience.');
  const tasks = journeyTasks[role];
  return <>
    <section className="welcome-grid">
      <div className="welcome-card">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={14} /> {tr('رحلتك الجامعية، في مكان واحد', 'YOUR UNIVERSITY JOURNEY, IN ONE PLACE')}</div>
          <h2>{tr(`أهلًا ${profileName || 'أيوب'} 👋`, `Welcome, ${profileName || 'Ayoub'} 👋`)}<br /><span>{roleHeadline}</span></h2>
          <p>{roleCopy}</p>
          <div className="hero-actions"><button className="btn-primary" onClick={() => openPage(role === 'current' ? 'campus' : role === 'transfer' ? 'journey' : 'programs')}>{role === 'current' ? tr('اكتشف الحياة الجامعية', 'Explore campus life') : role === 'transfer' ? tr('تابع رحلة التحويل', 'Continue transfer journey') : tr('استكشف البرامج', 'Explore programs')} <ArrowLeft size={17} /></button><button className="btn-soft" onClick={() => openPage('ai')}>{getIcon('ai', 17)} {tr('اسأل MyUni AI', 'Ask MyUni AI')}</button></div>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-cap"><GraduationCap size={82} strokeWidth={1.2}/></div><div className="hero-spark spark-one"><Sparkles size={26}/></div><div className="hero-spark spark-two"><Star size={17}/></div><div className="mini-float float-card"><span className="float-emoji">✦</span><div><b>{tr('رحلتك بتتقدم', 'Journey progress')}</b><small>{journeyProgress}% {tr('مكتمل', 'completed')}</small></div></div></div>
        <div className="hero-bottom"><div><span className="small-dot blue-dot"/>{tr('اكتشف', 'Discover')}</div><div><span className="small-dot purple-dot"/>{tr('انضم', 'Join')}</div><div><span className="small-dot teal-dot"/>{tr('عِش التجربة', 'Experience')}</div></div>
      </div>
      <div className="side-progress-card">
        <div className="section-heading"><div><span className="section-kicker">{tr('خطوتك الجاية', 'YOUR NEXT STEP')}</span><h3>{tr('رحلتي الجامعية', 'My journey')}</h3></div><button className="round-arrow" onClick={() => openPage('journey')}><ArrowLeft size={17}/></button></div>
        <div className="progress-circle" style={{'--progress': `${journeyProgress * 3.6}deg`}}><div><b>{journeyProgress}%</b><span>{tr('مكتمل', 'Complete')}</span></div></div>
        <p className="muted center-text">{tr(`أنجزت ${completedTasks} من ${totalTasks} خطوات في رحلتك.`, `${completedTasks} of ${totalTasks} steps completed.`)}</p>
        <div className="mini-task-list">{tasks.slice(0, 3).map(task => <button className={`mini-task ${checkedTasks[`${role}:${task.id}`] ? 'done' : ''}`} key={task.id} onClick={() => checkedTasks[`${role}:${task.id}`] ? null : toggleTask(task.id)}><span className="task-check">{checkedTasks[`${role}:${task.id}`] ? <Check size={13}/> : <span/>}</span><span>{isAr ? task.title : task.titleEn}</span>{checkedTasks[`${role}:${task.id}`] && <CheckCheck size={15} className="task-done-icon"/>}</button>)}</div>
        <button className="text-link full-link" onClick={() => openPage('journey')}>{tr('عرض كل الخطوات', 'View all steps')} <ArrowLeft size={15}/></button>
      </div>
    </section>

    <section className="stat-grid">
      <StatCard icon="programs" tone="blue" label={tr('برامج تستكشفها', 'Programs to explore')} value={String(programs.length).padStart(2, '0')} note={tr('بيانات نموذجية', 'Sample data')} />
      <StatCard icon="journey" tone="violet" label={tr('تقدم الرحلة', 'Journey progress')} value={`${journeyProgress}%`} note={tr('حدّث قائمتك', 'Update your checklist')} />
      <StatCard icon="book" tone="teal" label={tr('تخصصات محفوظة', 'Saved programs')} value={String(savedPrograms.length).padStart(2, '0')} note={tr('تقدر ترجع لها', 'Ready when you are')} />
      <StatCard icon="events" tone="orange" label={tr('فعاليات قادمة', 'Upcoming events')} value={String(events.length).padStart(2, '0')} note={tr('راجع المواعيد الرسمية', 'Verify official dates')} />
    </section>

    <section className="section-block">
      <div className="section-heading"><div><span className="section-kicker">{tr('ابدأ من هنا', 'GET STARTED')}</span><h3>{tr('كل اللي تحتاجه في مكان واحد', 'Everything you need, in one place')}</h3><p>{tr('اختصارات سريعة لأهم خدمات MyUni.', 'Quick shortcuts to essential MyUni features.')}</p></div><button className="text-link" onClick={() => openPage('services')}>{tr('كل الخدمات', 'All services')} <ArrowLeft size={15}/></button></div>
      <div className="shortcut-grid">
        <ShortcutCard icon="programs" tone="blue" title={tr('استكشف البرامج', 'Explore programs')} description={tr('شوف التخصصات ومعلوماتها.', 'Browse programs and details.')} onClick={() => openPage('programs')} />
        <ShortcutCard icon="choose" tone="violet" title={tr('ساعدني أختار', 'Help me choose')} description={tr('اكتشف الخيارات الأقرب لاهتماماتك.', 'Find options matching your interests.')} onClick={() => openPage('choose')} />
        <ShortcutCard icon="ai" tone="teal" title={tr('اسأل المساعد الذكي', 'Ask the AI assistant')} description={tr('إرشادات جامعية من بيانات العرض.', 'Guidance using demo information.')} onClick={() => openPage('ai')} />
        <ShortcutCard icon="campus" tone="orange" title={tr('الحياة الجامعية', 'Campus life')} description={tr('فعاليات وعروض وفرص طلابية.', 'Events, offers, and student opportunities.')} onClick={() => openPage('campus')} />
      </div>
    </section>

    <section className="section-block">
      <div className="section-heading"><div><span className="section-kicker">{tr('اختيارات مميزة', 'FEATURED')}</span><h3>{tr('برامج ممكن تهمك', 'Programs you may like')}</h3><p>{tr('الأسماء والمعلومات هنا للتجربة، ويجب استبدالها ببيانات جامعية معتمدة.', 'Names and details are demo content and must be replaced with verified university data.')}</p></div><button className="text-link" onClick={() => openPage('programs')}>{tr('استكشف الكل', 'Explore all')} <ArrowLeft size={15}/></button></div>
      <div className="program-card-grid">{programs.slice(0, 3).map(program => <ProgramCard key={program.id} program={program} isAr={isAr} tr={tr} saved={savedPrograms.includes(program.id)} onSave={() => toggleSaveProgram(program.id)} onClick={() => openPage('programs')} />)}</div>
    </section>

    <section className="section-block campus-teaser">
      <div className="section-heading"><div><span className="section-kicker">{tr('على الأجندة', 'ON THE CALENDAR')}</span><h3>{tr('فعاليات تستحق تعرفها', 'Events worth knowing')}</h3></div><button className="text-link" onClick={() => openPage('campus')}>{tr('كل الفعاليات', 'All events')} <ArrowLeft size={15}/></button></div>
      <div className="event-row-grid">{events.slice(0, 2).map(event => <EventCard key={event.id} event={event} isAr={isAr} tr={tr} registered={registeredEvents.includes(event.id)} onRegister={() => toggleRegisterEvent(event.id)} compact />)}</div>
    </section>
  </>;
}

function StatCard({ icon, tone, label, value, note }) {
  return <div className="stat-card"><div className={`icon-tile ${tone}`}>{getIcon(icon, 20)}</div><div className="stat-main"><span>{label}</span><strong>{value}</strong><small>{note}</small></div><div className="stat-trend"><Activity size={15}/></div></div>;
}
function ShortcutCard({ icon, tone, title, description, onClick }) {
  return <button className="shortcut-card" onClick={onClick}><div className={`icon-tile ${tone}`}>{getIcon(icon, 22)}</div><div className="shortcut-content"><strong>{title}</strong><p>{description}</p></div><span className="shortcut-arrow"><ArrowLeft size={16}/></span></button>;
}
function ProgramCard({ program, isAr, tr, saved, onSave, onClick }) {
  const tone = program.color || 'blue';
  return <article className="program-card">
    <div className={`program-art ${tone}`}><div className="program-art-pattern"/><div className="program-monogram">{program.short || 'UNI'}</div><span className="program-art-icon">{getIcon(program.icon, 28)}</span><button className={`save-button ${saved ? 'saved' : ''}`} onClick={onSave} aria-label={saved ? tr('إزالة من المحفوظات', 'Remove saved program') : tr('حفظ البرنامج', 'Save program')}>{saved ? <Heart size={17} fill="currentColor"/> : <Heart size={17}/>}</button></div>
    <div className="program-card-body"><div className="program-eyebrow">{program.college}</div><h4>{program.name}</h4><p>{isAr ? program.description : (program.descriptionEn || program.description)}</p><div className="tag-row">{(program.tags || []).slice(0, 2).map(tag => <span className="tag" key={tag}>{tag}</span>)}</div><div className="program-meta"><span><Clock3 size={14}/>{program.duration}</span><span><BookOpen size={14}/>{program.hours}</span></div><button className="btn-outline full-width" onClick={onClick || (() => window.dispatchEvent(new CustomEvent('myuni-open-program', { detail: program.id })))}>{tr('عرض التفاصيل', 'View details')} <ArrowLeft size={15}/></button></div>
  </article>;
}

function ProgramsPage({ isAr, tr, filteredPrograms, programSearch, setProgramSearch, categoryFilter, setCategoryFilter, savedPrograms, toggleSaveProgram, setPage, query, setQuery }) {
  const [selected, setSelected] = useState(null);
  useEffect(() => { if (query) setProgramSearch(query); }, [query, setProgramSearch]);
  useEffect(() => { const handler = (e) => setSelected(e.detail); window.addEventListener('myuni-open-program', handler); return () => window.removeEventListener('myuni-open-program', handler); }, []);
  const selectedProgram = filteredPrograms.find(p => p.id === selected) || null;
  return <>
    <PageIntro kicker={tr('اكتشف فرصك', 'DISCOVER YOUR OPTIONS')} title={tr('استكشف البرامج والتخصصات', 'Explore programs and majors')} description={tr('قارن بين البرامج، اعرف المجالات اللي بتهمك، واحفظ اختياراتك للرجوع لها. بيانات هذه الصفحة تجريبية.', 'Explore and compare programs, discover fields that interest you, and save options. This page uses demo data.')} />
    <div className="notice-banner"><div className="notice-icon"><CircleHelp size={18}/></div><div><b>{tr('ملاحظة قبل الاختيار', 'Before you decide')}</b><p>{tr('البرامج والساعات والمعلومات المعروضة أمثلة توضيحية وليست شروطًا رسمية لجامعة بعينها.', 'Program names, credit hours, and details are illustrative examples, not official requirements for a particular university.')}</p></div></div>
    <div className="filter-toolbar"><label className="search-field"><Search size={18}/><input value={programSearch} onChange={e => setProgramSearch(e.target.value)} placeholder={tr('ابحث باسم البرنامج أو الكلية...', 'Search by program or college...')}/>{programSearch && <button className="plain-icon" onClick={() => setProgramSearch('')}><X size={15}/></button>}</label><div className="filter-select"><Filter size={17}/><select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>{categories.map(c => <option key={c.id} value={c.id}>{isAr ? c.ar : c.en}</option>)}</select></div></div>
    <div className="results-count">{tr(`تم العثور على ${filteredPrograms.length} برامج`, `${filteredPrograms.length} programs found`)} <span>{tr('ترشيحات استرشادية', 'Informational suggestions')}</span></div>
    {filteredPrograms.length ? <div className="program-card-grid">{filteredPrograms.map(program => <ProgramCard key={program.id} program={program} isAr={isAr} tr={tr} saved={savedPrograms.includes(program.id)} onSave={() => toggleSaveProgram(program.id)} onClick={() => setSelected(program.id)} />)}</div> : <EmptyState icon="programs" title={tr('مفيش نتائج مطابقة', 'No matching results')} text={tr('جرّب كلمة بحث مختلفة أو اختار تصنيف تاني.', 'Try a different search term or category.')} action={tr('مسح البحث', 'Clear search')} onAction={() => { setProgramSearch(''); setQuery(''); setCategoryFilter('all'); }} />}
    {selectedProgram && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setSelected(null); }}><div className="modal-card program-detail-modal"><button className="modal-close" onClick={() => setSelected(null)}><X size={18}/></button><div className={`detail-banner ${selectedProgram.color || 'blue'}`}><span>{getIcon(selectedProgram.icon, 34)}</span><div><small>{selectedProgram.college}</small><h2>{selectedProgram.name}</h2></div></div><div className="detail-content"><h3>{tr('نبذة عن البرنامج', 'Program overview')}</h3><p>{isAr ? selectedProgram.description : selectedProgram.descriptionEn}</p><div className="detail-facts"><div><small>{tr('المدة النموذجية', 'Sample duration')}</small><b>{selectedProgram.duration}</b></div><div><small>{tr('الساعات المعتمدة', 'Credit hours')}</small><b>{selectedProgram.hours}</b></div></div><h3>{tr('مجالات مرتبطة', 'Related areas')}</h3><div className="tag-row">{(selectedProgram.tags || []).map(tag => <span key={tag} className="tag">{tag}</span>)}</div><div className="notice-inline"><CircleHelp size={17}/>{tr('تأكد من تفاصيل البرنامج الفعلية من المصدر الجامعي الرسمي.', 'Confirm actual program details through the official university source.')}</div><button className="btn-primary full-width" onClick={() => { setSelected(null); setPage('choose'); }}>{tr('جرّب مساعد اختيار التخصص', 'Try Help Me Choose')} <ArrowLeft size={16}/></button></div></div></div>}
  </>;
}

function ChoosePage({ isAr, tr, interestSelection, toggleInterest, chooseResult, setChooseResult, programs, savedPrograms, toggleSaveProgram, openPage }) {
  const results = useMemo(() => {
    const selected = new Set(interestSelection);
    return programs.map(program => ({ ...program, score: (program.tags || []).reduce((sum, tag) => sum + (selected.has(tag) ? 2 : 0), 0) + (selected.has(program.category) ? 1 : 0) })).sort((a, b) => b.score - a.score).filter(p => p.score > 0).slice(0, 3);
  }, [interestSelection, programs]);
  return <>
    <PageIntro kicker={tr('تعرّف على ميولك', 'DISCOVER YOUR INTERESTS')} title={tr('خلّينا نساعدك تختار', 'Let’s help you explore')} description={tr('اختار المجالات اللي بتحبها، وشوف برامج تجريبية قد تكون قريبة من اهتماماتك. القرار النهائي ليك.', 'Choose fields you enjoy and explore sample programs that may fit. The final decision is yours.')} />
    <div className="wizard-card"><div className="wizard-header"><div className="wizard-step"><span>01</span><div><b>{tr('إيه المجالات اللي بتشدك؟', 'Which fields interest you?')}</b><small>{tr('اختار أكتر من اختيار لو حابب.', 'Select as many as you like.')}</small></div></div><div className="wizard-progress"><span style={{width: `${Math.min(100, (interestSelection.length / interests.length) * 100)}%`}}/></div></div>
      <div className="interest-grid">{interests.map(item => <button key={item.id} className={`interest-card ${interestSelection.includes(item.id) ? 'selected' : ''}`} onClick={() => { toggleInterest(item.id); setChooseResult(false); }}><span className={`interest-icon ${item.id.toLowerCase()}`}>{getIcon(item.icon, 23)}</span><b>{isAr ? item.ar : item.en}</b><span className="interest-check">{interestSelection.includes(item.id) ? <Check size={15}/> : <Plus size={15}/>}</span></button>)}</div>
      <div className="wizard-actions"><span className="muted">{tr(`اخترت ${interestSelection.length} من ${interests.length}`, `${interestSelection.length} of ${interests.length} selected`)}</span><div><button className="btn-outline" onClick={() => { interestSelection.forEach(i => toggleInterest(i)); setChooseResult(false); }}>{tr('إعادة تعيين', 'Reset')}</button><button className="btn-primary" disabled={!interestSelection.length} onClick={() => setChooseResult(true)}>{tr('اعرض الترشيحات', 'Show suggestions')} <ArrowLeft size={16}/></button></div></div>
    </div>
    {chooseResult && <section className="section-block results-block"><div className="section-heading"><div><span className="section-kicker">{tr('نتائج استرشادية', 'INFORMATIONAL RESULTS')}</span><h3>{tr('برامج ممكن تبدأ تستكشفها', 'Programs to start exploring')}</h3><p>{tr('الترتيب مبني على الكلمات اللي اخترتها فقط، ولا يمثل تقييمًا رسميًا لمدى ملاءمتك للتخصص.', 'Ranking is based only on selected tags and is not an official assessment of suitability.')}</p></div><div className="result-badge"><Sparkles size={16}/>{tr('مطابقة اهتمامات', 'Interest match')}</div></div>
      {results.length ? <div className="program-card-grid">{results.map(p => <ProgramCard key={p.id} program={p} isAr={isAr} tr={tr} saved={savedPrograms.includes(p.id)} onSave={() => toggleSaveProgram(p.id)} />)}</div> : <EmptyState icon="choose" title={tr('اختار مجالًا واحدًا على الأقل', 'Choose at least one field')} text={tr('هنعرض الترشيحات بعد تحديد الاهتمامات.', 'Suggestions will appear after you select interests.')} />}
    </section>}
    <div className="guidance-strip"><div className="guidance-art"><Lightbulb size={30}/></div><div><b>{tr('اختيار التخصص قرار شخصي', 'Choosing a major is personal')}</b><p>{tr('استخدم النتائج كنقطة بداية. اقرأ المحتوى الرسمي، اسأل المرشد الأكاديمي، وقارن بين المواد وفرص التعلم.', 'Use results as a starting point. Read official information, speak with an academic advisor, and compare courses and learning opportunities.')}</p></div></div>
  </>;
}

function JourneyPage({ isAr, tr, role, roleName, journeyTasks: tasksByRole, checkedTasks, toggleTask, journeyProgress, completedTasks, totalTasks, openPage }) {
  const tasks = tasksByRole[role];
  return <>
    <PageIntro kicker={tr('خطوة بخطوة', 'ONE STEP AT A TIME')} title={tr('رحلتي الجامعية', 'My university journey')} description={tr('قائمة منظمة تساعدك تتابع الخطوات المهمة. تقدر تحدّثها في أي وقت.', 'An organized checklist to help track important steps. Update it whenever you like.')} />
    <div className="journey-hero"><div className="journey-hero-copy"><span className="role-chip"><span className="role-chip-dot"/>{roleName}</span><h2>{role === 'new' ? tr('كل بداية كبيرة بتبدأ بخطوة.', 'Every big beginning starts with a step.') : role === 'transfer' ? tr('خلّي انتقالك للخطوة الجاية منظم.', 'Make your next transition organized.') : tr('اصنع تجربتك الجامعية بطريقتك.', 'Make your campus experience your own.')}</h2><p>{tr('علّم على الخطوات اللي خلصتها، وشوف تقدمك بيتحدث تلقائيًا.', 'Check off completed steps and watch your progress update automatically.')}</p></div><div className="journey-big-progress"><div className="progress-circle large" style={{'--progress': `${journeyProgress * 3.6}deg`}}><div><b>{journeyProgress}%</b><span>{tr('مكتمل', 'Complete')}</span></div></div><small>{completedTasks} / {totalTasks} {tr('خطوات', 'steps')}</small></div></div>
    <section className="section-block journey-list-block"><div className="section-heading"><div><span className="section-kicker">{tr('قائمة المتابعة', 'YOUR CHECKLIST')}</span><h3>{tr('خطواتك الحالية', 'Your current steps')}</h3></div><span className="neutral-pill">{tr('قابلة للتعديل', 'Editable demo')}</span></div><div className="journey-list">{tasks.map((task, index) => { const done = !!checkedTasks[`${role}:${task.id}`]; return <div key={task.id} className={`journey-task-row ${done ? 'completed' : ''}`}><div className="journey-timeline"><span className="journey-number">{done ? <Check size={16}/> : String(index + 1).padStart(2, '0')}</span>{index < tasks.length - 1 && <i/>}</div><div className="journey-task-copy"><b>{isAr ? task.title : task.titleEn}</b><p>{isAr ? task.detail : task.detailEn}</p></div><button className={`task-toggle ${done ? 'done' : ''}`} onClick={() => toggleTask(task.id)}>{done ? <><Check size={15}/>{tr('تمت', 'Done')}</> : <>{tr('علّم كمكتملة', 'Mark complete')}</>}</button></div>; })}</div><div className="journey-footer-note"><ShieldCheck size={18}/><span>{tr('القائمة تنظيمية فقط؛ إكمالها لا يقدّم طلب قبول أو تحويل رسميًا.', 'This is an organizer only; completing it does not submit an official admission or transfer application.')}</span></div></section>
    <div className="two-col-actions"><button className="action-banner blue-banner" onClick={() => openPage('programs')}><div className="banner-icon"><GraduationCap size={22}/></div><div><b>{tr('لسه بتستكشف تخصصك؟', 'Still exploring programs?')}</b><span>{tr('ارجع لدليل البرامج وقارن اختياراتك.', 'Return to the program guide and compare options.')}</span></div><ArrowLeft size={18}/></button><button className="action-banner purple-banner" onClick={() => openPage('ai')}><div className="banner-icon"><Sparkles size={22}/></div><div><b>{tr('عندك استفسار؟', 'Have a question?')}</b><span>{tr('اسأل مساعد MyUni التجريبي.', 'Ask the MyUni demo assistant.')}</span></div><ArrowLeft size={18}/></button></div>
  </>;
}

function CampusPage({ isAr, tr, events, registeredEvents, toggleRegisterEvent, setNotice }) {
  const [tab, setTab] = useState('events');
  const [filter, setFilter] = useState('all');
  const offers = defaultOffers;
  const filteredEvents = filter === 'all' ? events : events.filter(e => e.category.toLowerCase() === filter.toLowerCase());
  return <>
    <PageIntro kicker={tr('استمتع بالحياة الجامعية', 'CAMPUS LIFE')} title={tr('الجامعة مش محاضرات وبس', 'University is more than classes')} description={tr('اكتشف فعاليات وأندية وفرص وعروض تجريبية تساعدك تتواصل وتشارك.', 'Explore sample events, clubs, opportunities, and offers to help you connect and participate.')} />
    <div className="campus-hero"><div><span className="eyebrow light-eyebrow"><PartyPopper size={14}/>{tr('اكتشف. شارك. انتمي.', 'DISCOVER. PARTICIPATE. BELONG.')}</span><h2>{tr('فيه دايمًا حاجة جديدة تستكشفها.', 'There is always something new to explore.')}</h2><p>{tr('خلي تجربتك الجامعية مليانة فرص، تعلّم، وناس شبه اهتماماتك.', 'Make your campus experience full of opportunities, learning, and people who share your interests.')}</p></div><div className="campus-hero-art"><div className="campus-building b1"/><div className="campus-building b2"/><div className="campus-tree t1"/><div className="campus-tree t2"/><div className="campus-sun"/></div></div>
    <div className="tab-switcher"><button className={tab === 'events' ? 'active' : ''} onClick={() => setTab('events')}><CalendarDays size={17}/>{tr('الفعاليات', 'Events')}<span>{events.length}</span></button><button className={tab === 'offers' ? 'active' : ''} onClick={() => setTab('offers')}><Ticket size={17}/>{tr('العروض الطلابية', 'Student offers')}<span>{offers.length}</span></button><button className={tab === 'clubs' ? 'active' : ''} onClick={() => setTab('clubs')}><Users size={17}/>{tr('الأندية', 'Clubs')}<span>3</span></button></div>
    {tab === 'events' && <><div className="filter-pills">{[{id:'all', ar:'كل الفعاليات',en:'All events'}, {id:'Workshop',ar:'ورش عمل',en:'Workshops'}, {id:'Career',ar:'المسار المهني',en:'Career'}, {id:'Community',ar:'مجتمع الطلاب',en:'Community'}].map(x => <button key={x.id} className={filter === x.id ? 'active' : ''} onClick={() => setFilter(x.id)}>{isAr ? x.ar : x.en}</button>)}</div><div className="event-grid">{filteredEvents.map(event => <EventCard key={event.id} event={event} isAr={isAr} tr={tr} registered={registeredEvents.includes(event.id)} onRegister={() => toggleRegisterEvent(event.id)} />)}</div>{!filteredEvents.length && <EmptyState icon="events" title={tr('مفيش فعاليات في التصنيف ده', 'No events in this category')} text={tr('اختار تصنيفًا آخر.', 'Choose a different category.')} />}</>}
    {tab === 'offers' && <div className="offer-grid">{offers.map(offer => <div className="offer-card" key={offer.id}><div className={`offer-art ${offer.color}`}><Ticket size={28}/><span>{tr('ميزة طلابية', 'STUDENT PERK')}</span></div><div className="offer-body"><span className="offer-provider">{offer.provider}</span><h3>{offer.title}</h3><p>{offer.detail}</p><div className="offer-footer"><span><Clock3 size={14}/>{offer.expires}</span><button className="text-link" onClick={() => setNotice(tr('العرض تجريبي ويحتاج تأكيد الجهة قبل الاستخدام.', 'This demo offer must be confirmed by the provider before use.'))}>{tr('التفاصيل', 'Details')} <ArrowLeft size={14}/></button></div></div></div>)}</div>}
    {tab === 'clubs' && <div className="club-grid">{[{name:'Tech Society',ar:'نادي التكنولوجيا',desc:'مساحة لمشاريع البرمجة والابتكار.',descEn:'A space for coding projects and innovation.',icon:'code',color:'blue'},{name:'Creative Circle',ar:'مجتمع الإبداع',desc:'للمهتمين بالتصميم والإعلام وصناعة المحتوى.',descEn:'For design, media, and content enthusiasts.',icon:'palette',color:'violet'},{name:'Business Network',ar:'شبكة الأعمال',desc:'أنشطة عن ريادة الأعمال والتسويق والقيادة.',descEn:'Activities about entrepreneurship, marketing, and leadership.',icon:'briefcase',color:'orange'}].map(club => <div className="club-card" key={club.name}><div className={`icon-tile ${club.color}`}>{getIcon(club.icon, 22)}</div><h3>{isAr ? club.ar : club.name}</h3><p>{isAr ? club.desc : club.descEn}</p><button className="btn-outline full-width" onClick={() => setNotice(tr('تم حفظ اهتمامك التجريبي بالنادي. ده مش تسجيل رسمي للعضوية.', 'Your demo interest in this club was saved. This is not an official membership.'))}>{tr('مهتم أعرف أكتر', 'I’m interested')} <ArrowLeft size={15}/></button></div>)}</div>}
    <div className="data-disclaimer"><CircleHelp size={17}/>{tr('كل الفعاليات والعروض والأندية المعروضة أمثلة توضيحية. يجب ربطها بمصادر الجامعة الرسمية قبل النشر.', 'All events, offers, and clubs are illustrative examples and must be connected to official university sources before launch.')}</div>
  </>;
}

function EventCard({ event, isAr, tr, registered, onRegister, compact = false }) {
  const date = new Date(`${event.date}T12:00:00`);
  const day = Number.isNaN(date.valueOf()) ? '--' : date.toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { day: '2-digit' });
  const month = Number.isNaN(date.valueOf()) ? '---' : date.toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { month: 'short' });
  return <article className={`event-card ${compact ? 'compact' : ''}`}><div className={`event-visual ${event.accent || 'blue'}`}><div className="event-date"><b>{day}</b><span>{month}</span></div><div className="event-art-icon">{event.category === 'Career' ? <Target size={34}/> : event.category === 'Community' ? <Users size={34}/> : <Sparkles size={34}/>}</div><span className="event-category">{event.category}</span></div><div className="event-content"><div className="event-kicker">{tr('فعالية جامعية', 'CAMPUS EVENT')}</div><h3>{event.title}</h3><p>{event.description}</p><div className="event-meta"><span><Clock3 size={14}/>{event.time}</span><span><MapPin size={14}/>{event.location}</span></div><button className={`btn-register ${registered ? 'registered' : ''}`} onClick={onRegister}>{registered ? <><Check size={15}/>{tr('تم حفظ الاهتمام', 'Interest saved')}</> : <>{tr('سجّل اهتمامك', 'Register interest')} <ArrowLeft size={15}/></>}</button></div></article>;
}

function ServicesPage({ isAr, tr, requests, setShowRequest, setRequestService, openPage }) {
  const [filter, setFilter] = useState('');
  const filtered = defaultServices.filter(s => `${s.title} ${s.titleAr} ${s.description}`.toLowerCase().includes(filter.toLowerCase()));
  return <>
    <PageIntro kicker={tr('المساعدة في مكانها', 'SUPPORT IN ONE PLACE')} title={tr('خدمات الجامعة', 'University services')} description={tr('دليل للخدمات اللي ممكن تحتاجها خلال رحلتك. الطلبات هنا تجريبية لحد ربط نظام الجامعة.', 'A directory of services you may need. Requests are demo-only until a university backend is connected.')} />
    <div className="service-top-card"><div className="service-top-icon"><LifeRingSafe /></div><div><b>{tr('مش عارف تبدأ منين؟', 'Not sure where to start?')}</b><p>{tr('ابعت استفسارًا تجريبيًا أو استخدم مساعد MyUni للوصول للخطوة المناسبة.', 'Send a demo inquiry or use the MyUni assistant to find the right next step.')}</p></div><button className="btn-primary" onClick={() => openPage('ai')}>{tr('اسأل المساعد', 'Ask assistant')} <ArrowLeft size={16}/></button></div>
    <label className="search-field service-search"><Search size={18}/><input value={filter} onChange={e => setFilter(e.target.value)} placeholder={tr('ابحث عن خدمة...', 'Search services...')}/></label>
    <div className="service-grid">{filtered.map(service => <div className="service-card" key={service.id}><div className={`icon-tile ${service.color}`}>{getIcon(service.icon, 22)}</div><div className="service-card-text"><h3>{isAr ? service.titleAr : service.title}</h3><p>{isAr ? service.description : service.descriptionEn}</p></div><div className="service-card-actions"><span className="availability"><i/>{tr('دليل معلومات', 'Info directory')}</span><button className="btn-outline" onClick={() => { setRequestService(isAr ? service.titleAr : service.title); setShowRequest(true); }}>{tr('طلب مساعدة', 'Request help')} <ArrowLeft size={14}/></button></div></div>)}</div>
    <section className="section-block requests-section"><div className="section-heading"><div><span className="section-kicker">{tr('متابعتك', 'YOUR ACTIVITY')}</span><h3>{tr('طلبات الخدمة على الجهاز ده', 'Service requests on this device')}</h3><p>{tr('الطلبات محفوظة محليًا للتجربة فقط.', 'Requests are stored locally for demo purposes only.')}</p></div><button className="btn-outline" onClick={() => { setRequestService(''); setShowRequest(true); }}><Plus size={16}/>{tr('طلب جديد', 'New request')}</button></div>{requests.length ? <div className="request-list">{requests.map(req => <div className="request-row" key={req.id}><div className="request-row-icon">{getIcon('message', 18)}</div><div><b>{req.service}</b><p>{req.details}</p><small>{req.date}</small></div><span className="status-pill">{req.status}</span></div>)}</div> : <div className="empty-inline"><MessageSquareText size={22}/><span>{tr('لسه مفيش طلبات. أي طلب جديد هتضيفه هيظهر هنا.', 'No requests yet. New requests will appear here.')}</span></div>}</section>
    <div className="university-links"><div><div className="icon-tile navy"><ExternalLink size={20}/></div><div><b>{tr('الأنظمة الجامعية الرسمية', 'Official university systems')}</b><p>{tr('يمكن إضافة روابط LMS والبوابة الطلابية والموقع الرسمي هنا بعد استلام الروابط الصحيحة.', 'LMS, student portal, and official website links can be configured here once supplied.')}</p></div></div><span className="coming-soon">{tr('تحتاج إعداد', 'Needs setup')}</span></div>
  </>;
}
function LifeRingSafe() { return <ShieldCheck size={25} strokeWidth={1.7}/>; }

function RequestModal({ isAr, tr, requestService, setRequestService, requestText, setRequestText, submitRequest, setShowRequest }) {
  return <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setShowRequest(false); }}><div className="modal-card request-modal"><div className="modal-header"><div><span className="section-kicker">{tr('مركز المساعدة', 'HELP CENTER')}</span><h2>{tr('طلب خدمة جديد', 'New service request')}</h2></div><button className="modal-close" onClick={() => setShowRequest(false)}><X size={18}/></button></div><p className="muted">{tr('ده نموذج تجريبي، والطلب مش هيوصل للجامعة قبل ربط Backend معتمد.', 'This is a demo form. The request will not reach the university until an approved backend is connected.')}</p><form onSubmit={submitRequest}><label className="field-label">{tr('الخدمة المطلوبة', 'Requested service')}<select value={requestService} onChange={e => setRequestService(e.target.value)} required><option value="">{tr('اختار الخدمة', 'Choose a service')}</option>{defaultServices.map(s => <option key={s.id} value={isAr ? s.titleAr : s.title}>{isAr ? s.titleAr : s.title}</option>)}</select></label><label className="field-label">{tr('التفاصيل', 'Details')}<textarea value={requestText} onChange={e => setRequestText(e.target.value)} required minLength={5} rows={4} placeholder={tr('اكتب تفاصيل طلبك هنا...', 'Describe your request...')}/></label><div className="modal-actions"><button type="button" className="btn-outline" onClick={() => setShowRequest(false)}>{tr('إلغاء', 'Cancel')}</button><button className="btn-primary" type="submit"><Send size={16}/>{tr('حفظ الطلب التجريبي', 'Save demo request')}</button></div></form></div></div>;
}

function AIPage({ isAr, tr, chatMessages, message, setMessage, sendChat }) {
  const quickPrompts = [{ ar: 'إزاي أختار تخصص؟', en: 'How do I choose a program?' }, { ar: 'إيه خطوات التحويل؟', en: 'What are transfer steps?' }, { ar: 'إزاي أعرف شروط القبول؟', en: 'How do I check admission requirements?' }, { ar: 'إيه الخدمات المتاحة؟', en: 'What services are available?' }];
  return <>
    <PageIntro kicker={tr('مساعدك الجامعي', 'YOUR UNIVERSITY GUIDE')} title={tr('اسأل MyUni AI', 'Ask MyUni AI')} description={tr('مساعد تجريبي يساعدك تتنقل داخل نموذج المشروع ويفسّر لك الرحلات والخدمات المتاحة.', 'A demo assistant that helps you navigate the prototype and understand available journeys and services.')} />
    <div className="ai-warning"><ShieldCheck size={19}/><div><b>{tr('شفافية ودقة المعلومات', 'Accuracy and transparency')}</b><p>{tr('النسخة الحالية تستخدم إجابات إرشادية محلية وليست نموذج AI متصلًا بقاعدة بيانات جامعة. لا تعتمد عليها في شروط أو مواعيد أو رسوم رسمية.', 'This version uses local guidance responses; it is not connected to an AI model or university database. Do not rely on it for official requirements, dates, or fees.')}</p></div></div>
    <div className="assistant-layout"><aside className="assistant-side"><div className="assistant-avatar"><Sparkles size={31}/><span/></div><h3>MyUni AI</h3><p>{tr('المساعد الجامعي التجريبي', 'University demo assistant')}</p><div className="assistant-status"><i/>{tr('متاح للتجربة', 'Available in demo')}</div><div className="assistant-side-divider"/><b>{tr('تقدر تسأل عن', 'You can ask about')}</b><ul><li>{tr('البرامج والتخصصات', 'Programs and majors')}</li><li>{tr('إرشادات القبول', 'Admission guidance')}</li><li>{tr('خطوات التحويل', 'Transfer steps')}</li><li>{tr('الخدمات والفعاليات', 'Services and events')}</li></ul><div className="assistant-side-bottom"><ShieldCheck size={15}/>{tr('من غير قرارات أكاديمية رسمية', 'No official academic decisions')}</div></aside>
      <section className="chat-panel"><div className="chat-header"><div className="chat-avatar"><Sparkles size={18}/></div><div><b>MyUni AI</b><span>{tr('الإرشاد الجامعي · نسخة تجريبية', 'University guidance · demo version')}</span></div><span className="secure-label"><ShieldCheck size={14}/>{tr('تجريبي', 'Demo')}</span></div><div className="chat-messages">{chatMessages.map(msg => <div className={`chat-message ${msg.from === 'user' ? 'user-message' : 'bot-message'}`} key={msg.id}><div className="chat-message-avatar">{msg.from === 'user' ? <CircleUserRound size={16}/> : <Sparkles size={16}/>}</div><div className="chat-bubble"><p>{msg.text}</p>{msg.from === 'bot' && <div className="source-label"><FileText size={12}/>{tr('إرشاد من بيانات العرض', 'Demo guidance')}</div>}</div></div>)}</div><div className="quick-prompts"><span>{tr('أسئلة مقترحة', 'SUGGESTED QUESTIONS')}</span>{quickPrompts.map(p => <button key={p.en} onClick={() => sendChat(isAr ? p.ar : p.en)}>{isAr ? p.ar : p.en}</button>)}</div><form className="chat-compose" onSubmit={e => { e.preventDefault(); sendChat(); }}><input value={message} onChange={e => setMessage(e.target.value)} placeholder={tr('اكتب سؤالك هنا...', 'Type your question...')} aria-label={tr('رسالتك', 'Your message')}/><button className="send-button" type="submit" aria-label={tr('إرسال', 'Send')}><Send size={18}/></button></form><div className="chat-disclaimer">{tr('قد تكون الإجابات غير مكتملة. راجع المصادر الرسمية للجامعة.', 'Answers may be incomplete. Confirm with official university sources.')}</div></section></div>
  </>;
}

function AdminPage({ isAr, tr, events, programs, adminEventTitle, setAdminEventTitle, adminEventDate, setAdminEventDate, adminEventLocation, setAdminEventLocation, submitAdminEvent, requests }) {
  return <>
    <PageIntro kicker={tr('إدارة المحتوى', 'CONTENT MANAGEMENT')} title={tr('لوحة الإدارة التجريبية', 'Demo admin dashboard')} description={tr('استخدم الصفحة دي في العرض لتوضيح إزاي المسؤول ممكن يدير المحتوى. الحماية الإدارية الفعلية تحتاج Backend وصلاحيات آمنة.', 'Use this screen in the presentation to demonstrate content management. Real admin security requires a backend and proper authorization.')} />
    <div className="admin-warning"><ShieldCheck size={18}/><span>{tr('تنبيه: لوحة الإدارة دي محاكاة محلية. أي زائر يفتح النسخة الحالية يقدر يشوفها، لذلك لا تنشرها كإدارة فعلية قبل إضافة تسجيل دخول وصلاحيات Backend.', 'Warning: this is a local mock admin panel. Anyone using the current demo can access it. Do not deploy it as a real admin panel without backend authentication and authorization.')}</span></div>
    <div className="admin-stats"><StatCard icon="programs" tone="blue" label={tr('البرامج', 'Programs')} value={programs.length} note={tr('محتوى العرض', 'Demo content')} /><StatCard icon="events" tone="violet" label={tr('الفعاليات', 'Events')} value={events.length} note={tr('قابلة للإضافة', 'Can be added')} /><StatCard icon="services" tone="teal" label={tr('طلبات محلية', 'Local requests')} value={requests.length} note={tr('على هذا الجهاز', 'On this device')} /></div>
    <div className="admin-grid"><section className="admin-card"><div className="admin-card-title"><div className="icon-tile blue"><CalendarDays size={20}/></div><div><h3>{tr('إضافة فعالية تجريبية', 'Add a demo event')}</h3><p>{tr('ستظهر الفعالية في صفحة الحياة الجامعية.', 'The event will appear on Campus Life.')}</p></div></div><form onSubmit={submitAdminEvent} className="admin-form"><label className="field-label">{tr('اسم الفعالية', 'Event name')}<input value={adminEventTitle} onChange={e => setAdminEventTitle(e.target.value)} required placeholder={tr('مثال: يوم الابتكار', 'Example: Innovation Day')}/></label><div className="form-row"><label className="field-label">{tr('التاريخ', 'Date')}<input type="date" value={adminEventDate} onChange={e => setAdminEventDate(e.target.value)} required/></label><label className="field-label">{tr('المكان', 'Location')}<input value={adminEventLocation} onChange={e => setAdminEventLocation(e.target.value)} placeholder="Main Campus"/></label></div><button className="btn-primary" type="submit"><Plus size={16}/>{tr('إضافة فعالية', 'Add event')}</button></form></section>
      <section className="admin-card"><div className="admin-card-title"><div className="icon-tile violet"><DatabaseIcon/></div><div><h3>{tr('محتوى النظام', 'System content')}</h3><p>{tr('حالة البيانات التي يعرضها النموذج.', 'Current demo content status.')}</p></div></div><div className="admin-check-list"><div><CheckCircle2 size={17}/><span>{tr('قائمة برامج نموذجية', 'Sample programs list')}</span><b>{programs.length}</b></div><div><CheckCircle2 size={17}/><span>{tr('فعاليات يمكن تعديلها محليًا', 'Events editable locally')}</span><b>{events.length}</b></div><div><Clock3 size={17}/><span>{tr('قاعدة بيانات جامعة', 'University database')}</span><em>{tr('غير متصلة', 'Not connected')}</em></div><div><Clock3 size={17}/><span>{tr('مساعد AI فعلي', 'Live AI assistant')}</span><em>{tr('غير متصل', 'Not connected')}</em></div></div></section></div>
    <section className="section-block"><div className="section-heading"><div><span className="section-kicker">{tr('معلومات العرض', 'DEMO INFORMATION')}</span><h3>{tr('آخر الفعاليات', 'Recent events')}</h3></div></div><div className="admin-event-table">{events.slice(0, 5).map(event => <div className="admin-event-row" key={event.id}><div className="event-table-icon">{getIcon('events', 17)}</div><div><b>{event.title}</b><small>{event.location}</small></div><span>{event.date}</span><em className="status-pill">{tr('تجريبي', 'Demo')}</em></div>)}</div></section>
  </>;
}
function DatabaseIcon() { return <Layers3 size={20}/>; }

function PageIntro({ kicker, title, description }) {
  return <div className="page-intro"><span className="section-kicker">{kicker}</span><h2>{title}</h2><p>{description}</p></div>;
}
function EmptyState({ icon, title, text, action, onAction }) {
  return <div className="empty-state"><div className="empty-icon">{getIcon(icon, 27)}</div><h3>{title}</h3><p>{text}</p>{action && <button className="btn-outline" onClick={onAction}>{action}</button>}</div>;
}
