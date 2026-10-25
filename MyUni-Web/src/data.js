export const defaultPrograms = [
  { id: 1, name: 'Business Information Systems', short: 'BIS', college: 'Faculty of Business', category: 'Business & Technology', duration: '4 years', hours: '132 credit hours', icon: 'briefcase', color: 'blue', description: 'يجمع بين معرفة الأعمال وتكنولوجيا المعلومات وتحليل البيانات وتصميم الأنظمة.', descriptionEn: 'Combines business knowledge with information technology, data analysis, and systems design.', tags: ['Business', 'Technology', 'Data'] },
  { id: 2, name: 'Computer Science', short: 'CS', college: 'Faculty of Computing', category: 'Technology', duration: '4 years', hours: '136 credit hours', icon: 'code', color: 'violet', description: 'يركز على البرمجة والخوارزميات وبناء حلول برمجية لمشكلات واقعية.', descriptionEn: 'Focuses on programming, algorithms, and building software solutions to real problems.', tags: ['Programming', 'AI', 'Technology'] },
  { id: 3, name: 'Digital Marketing', short: 'DM', college: 'Faculty of Business', category: 'Business & Creativity', duration: '4 years', hours: '128 credit hours', icon: 'megaphone', color: 'orange', description: 'يهتم بالتسويق الرقمي وصناعة المحتوى وتحليل سلوك العملاء.', descriptionEn: 'Explores digital marketing, content creation, and customer behavior analytics.', tags: ['Marketing', 'Creativity', 'Business'] },
  { id: 4, name: 'Graphic Design', short: 'GD', college: 'Faculty of Applied Arts', category: 'Design & Creativity', duration: '4 years', hours: '128 credit hours', icon: 'palette', color: 'pink', description: 'يجمع بين التفكير الإبداعي والهوية البصرية وتجربة المستخدم.', descriptionEn: 'Combines creative thinking, visual identity, and user experience.', tags: ['Design', 'Creativity', 'Media'] },
  { id: 5, name: 'Data Science', short: 'DS', college: 'Faculty of Computing', category: 'Technology', duration: '4 years', hours: '136 credit hours', icon: 'chart', color: 'teal', description: 'يستخدم البيانات والإحصاء والبرمجة لاستخراج رؤى تساعد في اتخاذ القرار.', descriptionEn: 'Uses data, statistics, and programming to create insights for better decisions.', tags: ['Data', 'AI', 'Technology'] },
  { id: 6, name: 'Engineering', short: 'ENG', college: 'Faculty of Engineering', category: 'Engineering', duration: '5 years', hours: '160 credit hours', icon: 'layers', color: 'indigo', description: 'يعتمد على الرياضيات والعلوم والتصميم لحل تحديات تقنية وعملية.', descriptionEn: 'Applies mathematics, science, and design to solve technical and practical challenges.', tags: ['Engineering', 'Technology', 'Science'] }
];

export const defaultEvents = [
  { id: 1, title: 'Tech & Innovation Day', category: 'Workshop', date: '2026-11-12', time: '11:00 AM', location: 'Innovation Hub', description: 'يوم للتعرّف على مشاريع الطلاب وأفكار التكنولوجيا وريادة الأعمال.', accent: 'blue' },
  { id: 2, title: 'Career Launch Workshop', category: 'Career', date: '2026-11-18', time: '1:00 PM', location: 'Main Hall', description: 'ورشة عملية عن السيرة الذاتية والاستعداد للمقابلات وبناء المسار المهني.', accent: 'violet' },
  { id: 3, title: 'Student Clubs Meetup', category: 'Community', date: '2026-11-24', time: '12:30 PM', location: 'Student Center', description: 'قابل أعضاء الأندية وتعرّف على الأنشطة المتاحة خلال الفصل الدراسي.', accent: 'green' }
];

export const defaultOffers = [
  { id: 1, title: 'Student Coffee Deal', provider: 'Campus Café', detail: 'خصم تجريبي 15% على المشروبات', category: 'Food', color: 'orange', expires: 'Demo offer' },
  { id: 2, title: 'Creative Cloud Workshop', provider: 'Design Club', detail: 'جلسة تعريفية مجانية للطلاب', category: 'Learning', color: 'violet', expires: 'Demo offer' },
  { id: 3, title: 'Career Photo Day', provider: 'Career Center', detail: 'جلسة تصوير للسيرة الذاتية وحساب LinkedIn', category: 'Career', color: 'blue', expires: 'Demo offer' }
];

export const defaultServices = [
  { id: 1, title: 'Student Affairs', titleAr: 'شؤون الطلاب', description: 'معلومات وإرشادات وخدمات الطلاب.', descriptionEn: 'Student information, guidance, and support.', icon: 'users', color: 'blue' },
  { id: 2, title: 'IT Support', titleAr: 'الدعم التقني', description: 'المساعدة في الأنظمة والحسابات الجامعية.', descriptionEn: 'Help with university systems and accounts.', icon: 'laptop', color: 'violet' },
  { id: 3, title: 'Library', titleAr: 'المكتبة', description: 'معلومات عن خدمات المكتبة ومواعيدها.', descriptionEn: 'Library services, information, and hours.', icon: 'book', color: 'green' },
  { id: 4, title: 'Campus Facilities', titleAr: 'مرافق الحرم الجامعي', description: 'استكشف المرافق والخدمات المتاحة.', descriptionEn: 'Explore campus facilities and available services.', icon: 'map', color: 'orange' },
  { id: 5, title: 'Transportation', titleAr: 'المواصلات', description: 'اعثر على معلومات المواصلات المعتمدة.', descriptionEn: 'Find approved transportation information.', icon: 'bus', color: 'pink' },
  { id: 6, title: 'General Inquiry', titleAr: 'استفسار عام', description: 'أرسل استفسارًا لفريق الدعم.', descriptionEn: 'Send a question to the support team.', icon: 'message', color: 'teal' }
];

export const journeyTasks = {
  new: [
    { id: 'n1', title: 'استكشف البرامج والتخصصات', titleEn: 'Explore programs and majors', detail: 'تعرّف على الخيارات المتاحة.', detailEn: 'Discover the available options.' },
    { id: 'n2', title: 'راجع شروط القبول', titleEn: 'Review admission requirements', detail: 'استخدم المعلومات الرسمية عند توفرها.', detailEn: 'Use official information when available.' },
    { id: 'n3', title: 'جهّز قائمة المستندات', titleEn: 'Prepare your document checklist', detail: 'دوّن المستندات التي تحتاج لمراجعتها.', detailEn: 'List documents you need to review.' },
    { id: 'n4', title: 'اتبع تعليمات التقديم الرسمية', titleEn: 'Follow official application instructions', detail: 'انتقل إلى قناة التقديم المعتمدة.', detailEn: 'Continue through the official application channel.' },
    { id: 'n5', title: 'تعرّف على الحياة الجامعية', titleEn: 'Discover campus life', detail: 'استكشف الأنشطة والخدمات المتاحة.', detailEn: 'Explore available activities and services.' }
  ],
  transfer: [
    { id: 't1', title: 'راجع شروط التحويل', titleEn: 'Review transfer requirements', detail: 'تحقق من الشروط المعتمدة لبرنامجك.', detailEn: 'Check approved requirements for your program.' },
    { id: 't2', title: 'جهّز بيانات جامعتك السابقة', titleEn: 'Prepare previous university details', detail: 'سجّل بياناتك للمراجعة الشخصية.', detailEn: 'Record your details for personal reference.' },
    { id: 't3', title: 'اجمع المستندات المطلوبة', titleEn: 'Collect required documents', detail: 'استخدم القائمة لتنظيم المستندات.', detailEn: 'Use the checklist to organize documents.' },
    { id: 't4', title: 'راجع معادلة المقررات', titleEn: 'Review course equivalency guidance', detail: 'المعادلة النهائية تحتاج تأكيد الجامعة.', detailEn: 'Final equivalency must be confirmed by the university.' },
    { id: 't5', title: 'تابع قناة التقديم الرسمية', titleEn: 'Follow the official transfer process', detail: 'لا تعتبر القائمة طلب تحويل رسميًا.', detailEn: 'This checklist is not an official transfer application.' }
  ],
  current: [
    { id: 'c1', title: 'استكشف الفعاليات القادمة', titleEn: 'Explore upcoming events', detail: 'احفظ الأنشطة التي تهمك.', detailEn: 'Save activities that interest you.' },
    { id: 'c2', title: 'تعرّف على الأندية الطلابية', titleEn: 'Discover student clubs', detail: 'ابحث عن فرص المشاركة.', detailEn: 'Find opportunities to participate.' },
    { id: 'c3', title: 'راجع العروض الطلابية', titleEn: 'Review student offers', detail: 'تحقق من صلاحية العروض وشروطها.', detailEn: 'Check offer validity and terms.' },
    { id: 'c4', title: 'استكشف الخدمات الجامعية', titleEn: 'Explore campus services', detail: 'اعرف أين تجد المساعدة المناسبة.', detailEn: 'Find the appropriate support.' },
    { id: 'c5', title: 'احفظ روابط الأنظمة الجامعية', titleEn: 'Save university system links', detail: 'استخدم الروابط الرسمية عند إضافتها.', detailEn: 'Use official links once configured.' }
  ]
};
