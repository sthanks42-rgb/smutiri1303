import { Question, Category, Difficulty } from './types';

export const CATEGORY_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  islamic: { label: 'إسلاميات وتاريخ', icon: '🕌', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
  science: { label: 'علوم وتكنولوجيا', icon: '🧪', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
  general: { label: 'معلومات عامة', icon: '💡', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
  geography: { label: 'جغرافيا ودول', icon: '🌍', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' },
  sports: { label: 'رياضة وألعاب', icon: '⚽', color: 'bg-rose-500/10 text-rose-400 border-rose-500/30' },
  literature: { label: 'أدب وفنون', icon: '📚', color: 'bg-violet-500/10 text-violet-400 border-violet-500/30' },
};

export const DIFFICULTY_LABELS: Record<string, { label: string; color: string }> = {
  easy: { label: 'سهل', color: 'text-green-400 bg-green-500/10 border-green-500/20' },
  medium: { label: 'متوسط', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
  hard: { label: 'صعب', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
};

export const QUESTIONS_BANK: Question[] = [
  // === ISLAMIC & HISTORY ===
  {
    id: 'is1',
    category: 'islamic',
    difficulty: 'easy',
    questionText: 'من هو أول الخلفاء الراشدين رضي الله عنهم؟',
    options: ['عمر بن الخطاب', 'أبو بكر الصديق', 'عثمان بن عفان', 'علي بن أبي طالب'],
    correctAnswerIndex: 1,
    explanation: 'أبو بكر الصديق رضي الله عنه هو أول الخلفاء الراشدين وتولى الخلافة بعد وفاة النبي محمد ﷺ.',
    points: 10
  },
  {
    id: 'is2',
    category: 'islamic',
    difficulty: 'easy',
    questionText: 'كم عدد سور القرآن الكريم؟',
    options: ['110 سورة', '114 سورة', '120 سورة', '108 سور'],
    correctAnswerIndex: 1,
    explanation: 'القرآن الكريم يحتوي على 114 سورة، تبدأ بسورة الفاتحة وتنتهي بسورة الناس.',
    points: 10
  },
  {
    id: 'is3',
    category: 'islamic',
    difficulty: 'medium',
    questionText: 'في أي مدينة ولد الإمام البخاري صاحب كتاب الصحيح؟',
    options: ['بخارى بأوزبكستان', 'بغداد بالعراق', 'دمشق بسوريا', 'نيسابور بإيران'],
    correctAnswerIndex: 0,
    explanation: 'ولد الإمام محمد بن إسماعيل البخاري في مدينة بخارى في أوزبكستان حالياً عام 194 هـ.',
    points: 20
  },
  {
    id: 'is4',
    category: 'islamic',
    difficulty: 'medium',
    questionText: 'ما هي أطول سورة في القرآن الكريم؟',
    options: ['سورة آل عمران', 'سورة البقرة', 'سورة النساء', 'سورة المائدة'],
    correctAnswerIndex: 1,
    explanation: 'سورة البقرة هي أطول سورة في القرآن الكريم بعدد آيات يبلغ 286 آية.',
    points: 20
  },
  {
    id: 'is5',
    category: 'islamic',
    difficulty: 'hard',
    questionText: 'في أي سنة هجرية وقعت غزوة الخندق (الأحزاب)؟',
    options: ['السنة الثالثة للهجرة', 'السنة الخامسة للهجرة', 'السنة السابعة للهجرة', 'السنة الثانية للهجرة'],
    correctAnswerIndex: 1,
    explanation: 'وقعت غزوة الخندق في شوال من السنة الخامسة للهجرة النبوية.',
    points: 30
  },
  {
    id: 'is6',
    category: 'islamic',
    difficulty: 'hard',
    questionText: 'من هو قائد جيش المسلمين في معركة القادسية؟',
    options: ['خالد بن الوليد', 'سعد بن أبي وقاص', 'عمرو بن العاص', 'أبو عبيدة بن الجراح'],
    correctAnswerIndex: 1,
    explanation: 'سعد بن أبي وقاص رضي الله عنه هو قائد جيش المسلمين الذي انتصر على الفرس في معركة القادسية التاريخية.',
    points: 30
  },
  {
    id: 'is7',
    category: 'islamic',
    difficulty: 'medium',
    questionText: 'من هو الصحابي الملقب بـ "أمين هذه الأمة"؟',
    options: ['أبو عبيدة بن الجراح', 'عبد الرحمن بن عوف', 'سعد بن معاذ', 'الزبير بن العوام'],
    correctAnswerIndex: 0,
    explanation: 'أبو عبيدة عامر بن الجراح رضي الله عنه هو من لقبه النبي ﷺ بأمين هذه الأمة.',
    points: 20
  },

  // === SCIENCE & TECH ===
  {
    id: 'sc1',
    category: 'science',
    difficulty: 'easy',
    questionText: 'ما هو الكوكب الأقرب إلى الشمس في نظامنا الشمسي؟',
    options: ['الزهرة', 'المشتري', 'عطارد', 'المريخ'],
    correctAnswerIndex: 2,
    explanation: 'عطارد هو الكوكب الأقرب للشمس ويتميز بدرجات حرارته المرتفعة جداً في النهار والباردة جداً في الليل.',
    points: 10
  },
  {
    id: 'sc2',
    category: 'science',
    difficulty: 'easy',
    questionText: 'ما هو العضو الأساسي المسؤول عن ضخ الدم في جسم الإنسان؟',
    options: ['الرئتان', 'الدماغ', 'الكبد', 'القلب'],
    correctAnswerIndex: 3,
    explanation: 'القلب هو مضخة عضلية تقوم بضخ الدم المحمل بالأكسجين والغذاء لكافة أجزاء الجسم.',
    points: 10
  },
  {
    id: 'sc3',
    category: 'science',
    difficulty: 'medium',
    questionText: 'ما هو الغاز الأكثر وفرة في الغلاف الجوي للأرض؟',
    options: ['الأكسجين', 'النيتروجين', 'ثاني أكسيد الكربون', 'الهيدروجين'],
    correctAnswerIndex: 1,
    explanation: 'النيتروجين يشكل حوالي 78% من الغلاف الجوي للأرض، بينما يمثل الأكسجين حوالي 21%.',
    points: 20
  },
  {
    id: 'sc4',
    category: 'science',
    difficulty: 'medium',
    questionText: 'ما هو المعدن السائل الوحيد في درجات الحرارة العادية؟',
    options: ['البروم', 'الزئبق', 'القصدير', 'الرصاص'],
    correctAnswerIndex: 1,
    explanation: 'الزئبق هو العنصر المعدني الوحيد الذي يظل في الحالة السائلة في درجة حرارة الغرفة القياسية.',
    points: 20
  },
  {
    id: 'sc5',
    category: 'science',
    difficulty: 'hard',
    questionText: 'كم عدد النيوترونات الموجودة في ذرة الهيدروجين العادية (البروتيوم)؟',
    options: ['نيوترون واحد', 'صفر نيوترون', 'نيوترونان', 'ثلاثة نيوترونات'],
    correctAnswerIndex: 1,
    explanation: 'الهيدروجين العادي (البروتيوم) هو العنصر الوحيد الذي لا تحتوي نواته على أي نيوترونات، بل تحتوي على بروتون واحد فقط.',
    points: 30
  },
  {
    id: 'sc6',
    category: 'science',
    difficulty: 'hard',
    questionText: 'ما هي الوحدة الأساسية لقياس شدة التيار الكهربائي؟',
    options: ['الفولت', 'الأوم', 'الواط', 'الأمبير'],
    correctAnswerIndex: 3,
    explanation: 'الأمبير (Ampere) هي الوحدة الأساسية لقياس شدة التيار الكهربائي في النظام الدولي للوحدات.',
    points: 30
  },
  {
    id: 'sc7',
    category: 'science',
    difficulty: 'medium',
    questionText: 'من هو العالم الذي اكتشف الجاذبية الأرضية وقوانين الحركة؟',
    options: ['ألبيرت أينشتاين', 'إسحاق نيوتن', 'غاليلو غاليلي', 'نيكولا تسلا'],
    correctAnswerIndex: 1,
    explanation: 'العالم الإنجليزي إسحاق نيوتن هو من صاغ قوانين الحركة والجاذبية العامة بعد تفكره في سقوط التفاحة.',
    points: 20
  },

  // === GENERAL KNOWLEDGE ===
  {
    id: 'gk1',
    category: 'general',
    difficulty: 'easy',
    questionText: 'ما هي عاصمة جمهورية مصر العربية؟',
    options: ['الإسكندرية', 'القاهرة', 'الجيزة', 'المنصورة'],
    correctAnswerIndex: 1,
    explanation: 'القاهرة هي عاصمة مصر وأكبر مدنها وأكثرها سكاناً.',
    points: 10
  },
  {
    id: 'gk2',
    category: 'general',
    difficulty: 'easy',
    questionText: 'ما هو أكبر الثدييات على وجه الأرض؟',
    options: ['الفيل الأفريقي', 'الحوت الأزرق', 'القرش الأبيض الكبير', 'الزرافة'],
    correctAnswerIndex: 1,
    explanation: 'الحوت الأزرق هو أضخم كائن حي عاش ويعيش على كوكب الأرض، حيث يصل وزنه لأكثر من 170 طناً.',
    points: 10
  },
  {
    id: 'gk3',
    category: 'general',
    difficulty: 'medium',
    questionText: 'ما هي أسرع الحشرات الطائرة في العالم؟',
    options: ['اليعسوب', 'النحلة', 'الصرصور الطائر', 'الجرادة'],
    correctAnswerIndex: 0,
    explanation: 'اليعسوب (Dragonfly) هو أسرع الحشرات الطائرة وتصل سرعته لقرابة 50-60 كم في الساعة.',
    points: 20
  },
  {
    id: 'gk4',
    category: 'general',
    difficulty: 'medium',
    questionText: 'من هو مخترع الهاتف؟',
    options: ['توماس أديسون', 'ألكسندر غراهام بيل', 'نيكولا تسلا', 'بنيامين فرانكلين'],
    correctAnswerIndex: 1,
    explanation: 'اخترع ألكسندر غراهام بيل الهاتف وحصل على براءة اختراع عام 1876.',
    points: 20
  },
  {
    id: 'gk5',
    category: 'general',
    difficulty: 'hard',
    questionText: 'ما هو المعدن الأساسي في صناعة الفولاذ (الصلب)؟',
    options: ['النحاس', 'الألومنيوم', 'الحديد', 'الزنك'],
    correctAnswerIndex: 2,
    explanation: 'الحديد هو المكون الأساسي لجميع أنواع الفولاذ، مع إضافة نسب صغيرة جداً من الكربون وعناصر أخرى.',
    points: 30
  },
  {
    id: 'gk6',
    category: 'general',
    difficulty: 'hard',
    questionText: 'ما هو الكائن الحي الذي يستطيع الرؤية بـ 360 درجة ولديه لسان أطول من جسمه؟',
    options: ['الحرباء', 'الأخطبوط', 'البومة', 'العقاب'],
    correctAnswerIndex: 0,
    explanation: 'تستطيع الحرباء تحريك عينيها بشكل مستقل بالكامل مما يعطيها رؤية كاملة بـ 360 درجة، ولسانها الطويل يساعدها في صيد الحشرات بسرعة فائقة.',
    points: 30
  },

  // === GEOGRAPHY ===
  {
    id: 'ge1',
    category: 'geography',
    difficulty: 'easy',
    questionText: 'ما هي أكبر قارة في العالم من حيث المساحة؟',
    options: ['أفريقيا', 'أمريكا الشمالية', 'أوروبا', 'آسيا'],
    correctAnswerIndex: 3,
    explanation: 'آسيا هي أكبر قارات العالم مساحة وتعداداً للسكان، وتمثل حوالي ثلث مساحة اليابسة.',
    points: 10
  },
  {
    id: 'ge2',
    category: 'geography',
    difficulty: 'easy',
    questionText: 'ما هو أطول نهر في العالم؟',
    options: ['نهر الأمازون', 'نهر النيل', 'نهر المسيسيبي', 'نهر اليانغتسي'],
    correctAnswerIndex: 1,
    explanation: 'نهر النيل في أفريقيا هو أطول نهر في العالم، بينما نهر الأمازون هو الأكبر حجماً وتدفقاً للمياه.',
    points: 10
  },
  {
    id: 'ge3',
    category: 'geography',
    difficulty: 'medium',
    questionText: 'ما هي عاصمة اليابان؟',
    options: ['بكين', 'سيئول', 'طوكيو', 'كيوتو'],
    correctAnswerIndex: 2,
    explanation: 'طوكيو هي عاصمة اليابان الحالية والمركز السياسي والاقتصادي والثقافي الرئيسي للبلاد اليابانية.',
    points: 20
  },
  {
    id: 'ge4',
    category: 'geography',
    difficulty: 'medium',
    questionText: 'أي دولة تسمى "بلد المليون شهيد"؟',
    options: ['فلسطين', 'الجزائر', 'تونس', 'العراق'],
    correctAnswerIndex: 1,
    explanation: 'الجزائر تلقب ببلد المليون شهيد بسبب التضحيات الهائلة لشعبها لنيل الاستقلال والاستعمار الفرنسي الذي دام 132 سنة.',
    points: 20
  },
  {
    id: 'ge5',
    category: 'geography',
    difficulty: 'hard',
    questionText: 'ما هي الدولة الأوروبية التي تضم أكبر عدد من البراكين النشطة؟',
    options: ['إيطاليا', 'اليونان', 'آيسلندا', 'إسبانيا'],
    correctAnswerIndex: 2,
    explanation: 'آيسلندا هي الجزيرة البركانية الأنشط في أوروبا نظراً لوقوعها على الصدع الأطلسي الأوسط وتضم نحو 30 نظاماً بركانياً نشطاً.',
    points: 30
  },
  {
    id: 'ge6',
    category: 'geography',
    difficulty: 'hard',
    questionText: 'ما هو أعمق منخفض مائي سطحي على وجه الأرض؟',
    options: ['خندق ماريانا', 'بحر القزوين', 'البحر الميت', 'بحيرة بايكال'],
    correctAnswerIndex: 2,
    explanation: 'البحر الميت الواقع بين الأردن وفلسطين هو أخفض نقطة على يابسة الأرض، حيث يقع شاطئه على عمق 430 متراً تحت مستوى سطح البحر.',
    points: 30
  },
  {
    id: 'ge7',
    category: 'geography',
    difficulty: 'medium',
    questionText: 'ما هي عاصمة المملكة العربية السعودية؟',
    options: ['مكة المكرمة', 'المدينة المنورة', 'جدة', 'الرياض'],
    correctAnswerIndex: 3,
    explanation: 'الرياض هي عاصمة المملكة العربية السعودية وأكبر مدنها.',
    points: 20
  },

  // === SPORTS ===
  {
    id: 'sp1',
    category: 'sports',
    difficulty: 'easy',
    questionText: 'كم عدد لاعبي كرة القدم الأساسيين لفريق واحد داخل الملعب؟',
    options: ['9 لاعبين', '11 لاعباً', '10 لاعبين', '12 لاعباً'],
    correctAnswerIndex: 1,
    explanation: 'يلعب فريق كرة القدم بـ 11 لاعباً أساسياً في الملعب بما فيهم حارس المرمى.',
    points: 10
  },
  {
    id: 'sp2',
    category: 'sports',
    difficulty: 'easy',
    questionText: 'كل كم سنة تقام بطولة كأس العالم لكرة القدم؟',
    options: ['كل سنتين', 'كل 4 سنوات', 'كل 3 سنوات', 'كل 5 سنوات'],
    correctAnswerIndex: 1,
    explanation: 'بطولة كأس العالم لكرة القدم تقام بصورة دورية كل 4 سنوات منذ انطلاقها عام 1930 باستثناء فترات الحرب العالمية.',
    points: 10
  },
  {
    id: 'sp3',
    category: 'sports',
    difficulty: 'medium',
    questionText: 'أي تخصص رياضي ينسب إليه عداء المسافات القصيرة الجامايكي "يوسين بولت"؟',
    options: ['سباق الماراثون', 'ألعاب القوى (الجري السريع)', 'السباحة الحرة', 'القفز العالي'],
    correctAnswerIndex: 1,
    explanation: 'يوسين بولت هو أسرع إنسان بالتاريخ في سباقات 100م و200م وهو مسجل للأرقام القياسية العالمية في ألعاب القوى.',
    points: 20
  },
  {
    id: 'sp4',
    category: 'sports',
    difficulty: 'medium',
    questionText: 'ما هي الدولة الأكثر فوزاً ببطولة كأس العالم لكرة القدم بالرجال بالتاريخ؟',
    options: ['ألمانيا', 'إيطاليا', 'الأرجنتين', 'البرازيل'],
    correctAnswerIndex: 3,
    explanation: 'البرازيل هي الدولة الأكثر تتويجاً بكأس العالم بخمسة ألقاب (1958، 1962، 1970، 1994، 2002).',
    points: 20
  },
  {
    id: 'sp5',
    category: 'sports',
    difficulty: 'hard',
    questionText: 'في أي دولة أقيمت أول دورة ألعاب أولمبية في العصر الحديث عام 1896؟',
    options: ['فرنسا', 'اليونان', 'الولايات المتحدة', 'بريطانيا'],
    correctAnswerIndex: 1,
    explanation: 'أقيمت أول دورة ألعاب أولمبية حديثة في أثينا، اليونان، تكريماً لأصل الألعاب اليونانية القديمة.',
    points: 30
  },
  {
    id: 'sp6',
    category: 'sports',
    difficulty: 'hard',
    questionText: 'كم يبلغ الطول القياسي لمضمار حوض السباحة الأولمبي؟',
    options: ['25 متراً', '50 متراً', '100 متر', '75 متراً'],
    correctAnswerIndex: 1,
    explanation: 'مضمار الحوض الأولمبي للسباحة يبلغ طوله 50 متراً وعرضه 25 متراً ويقسم عادة إلى 10 حارات.',
    points: 30
  },

  // === LITERATURE & ARTS ===
  {
    id: 'li1',
    category: 'literature',
    difficulty: 'easy',
    questionText: 'من هو مؤلف الرواية الشهيرة "دون كيشوت" (دون كيخوته)؟',
    options: ['ويليام شكسبير', 'ميغيل دي ثيربانتس', 'فيكتور هوجو', 'تشارلز ديكنز'],
    correctAnswerIndex: 1,
    explanation: 'الروائي الإسباني ميغيل دي ثيربانتس هو من ألف رواية دون كيشوت الشهيرة في القرن السابع عشر.',
    points: 10
  },
  {
    id: 'li2',
    category: 'literature',
    difficulty: 'easy',
    questionText: 'من هو الشاعر الملقب بـ "أمير الشعراء" في العصر الحديث؟',
    options: ['حافظ إبراهيم', 'أحمد شوقي', 'المتنبي', 'محمود درويش'],
    correctAnswerIndex: 1,
    explanation: 'أحمد شوقي هو الشاعر المصري الذي بايعه الشعراء العرب بلقب أمير الشعراء عام 1927 لجهوده الكبيرة وتأثيره البالغ في الشعر العربي.',
    points: 10
  },
  {
    id: 'li3',
    category: 'literature',
    difficulty: 'medium',
    questionText: 'من رسم اللوحة الفنية الذائعة الصيت "الموناليزا"؟',
    options: ['ميكيلانجيلو', 'بابلو بيكاسو', 'فنسنت فان غوخ', 'ليوناردو دا فينشي'],
    correctAnswerIndex: 3,
    explanation: 'ليوناردو دا فينشي هو مخترع وفنان عصر النهضة الإيطالي الشهير الذي رسم الموناليزا في القرن السادس عشر.',
    points: 20
  },
  {
    id: 'li4',
    category: 'literature',
    difficulty: 'medium',
    questionText: 'من هو الكاتب والروائي المصري الحائز على جائزة نوبل في الأدب لعام 1988؟',
    options: ['طه حسين', 'نجيب محفوظ', 'عباس العقاد', 'توفيق الحكيم'],
    correctAnswerIndex: 1,
    explanation: 'نجيب محفوظ هو أول روائي عربي ينال جائزة نوبل في الأدب، واشتهر بالثلاثية ومجموعة رواياته التاريخية والاجتماعية بالبلاد العربية.',
    points: 20
  },
  {
    id: 'li5',
    category: 'literature',
    difficulty: 'hard',
    questionText: 'من هو الأديـب العربي صاحب "رسالة الغفران" التي قيل إنها ألهمت دانتي في كتابه الكوميديا الإلهية؟',
    options: ['أبو العلاء المعري', 'الجاحظ', 'ابن طفيل', 'بديع الزمان الهمذاني'],
    correctAnswerIndex: 0,
    explanation: 'أبو العلاء المعري هو الشاعر والفيلسوف العباسي صاحب كتاب رسالة الغفران المتميز بالخيال البديع وفن النقد.',
    points: 30
  },
  {
    id: 'li6',
    category: 'literature',
    difficulty: 'hard',
    questionText: 'أي من المسرحيات التالية ليست من تأليف الكاتب المسرحي الإنكليزي الشهير شيكسبير؟',
    options: ['هاملت', 'عطيل', 'دون كارلوس', 'الملك لير'],
    correctAnswerIndex: 2,
    explanation: 'مسرحية "دون كارلوس" هي من تأليف الكاتب والشاعر الألماني الشهير فريدريش شيلر، بينما هاملت وعطيل والملك لير مسرحيات شهيرة لشيكسبير.',
    points: 30
  },
  
  // === ADDITIONAL MIXED QUESTIONS EXCEEDING 50+ ===
  {
    id: 'is8',
    category: 'islamic',
    difficulty: 'easy',
    questionText: 'ما هو أول مسجد بني في الإسلام؟',
    options: ['المسجد النبوي', 'المسجد الحرام', 'مسجد قباء', 'المسجد الأقصى'],
    correctAnswerIndex: 2,
    explanation: 'مسجد قباء هو أول مسجد أسسه النبي محمد ﷺ بالمدينة المنورة عند هجرته.',
    points: 10
  },
  {
    id: 'is9',
    category: 'islamic',
    difficulty: 'medium',
    questionText: 'من هو الصحابي الجليل الذي جهز جيش العسرة في غزوة تبوك؟',
    options: ['عمر بن الخطاب', 'عثمان بن عفان', 'علي بن أبي طالب', 'أبو بكر الصديق'],
    correctAnswerIndex: 1,
    explanation: 'عثمان بن عفان رضي الله عنه جهز معظم جيش العسرة من ماله تلبيةً لطلب الرسول ﷺ.',
    points: 20
  },
  {
    id: 'is10',
    category: 'islamic',
    difficulty: 'hard',
    questionText: 'ما هو معجم لسان العرب الشهير ومن هو مؤلفه؟',
    options: ['الفيروز آبادي', 'ابن منظور', 'سيبويه', 'الكيلاني'],
    correctAnswerIndex: 1,
    explanation: 'كتاب "لسان العرب" هو أشمل وأعظم المعاجم اللغوية العربية وصاحبه ومؤلفه هو الإمام ابن منظور.',
    points: 30
  },
  {
    id: 'sc8',
    category: 'science',
    difficulty: 'easy',
    questionText: 'ما هي المادة التي تعطي أوراق النباتات لونها الأخضر؟',
    options: ['الهيموغلوبين', 'الكلوروفيل', 'البيليروبين', 'الكاروتين'],
    correctAnswerIndex: 1,
    explanation: 'مادة الكلوروفيل هي الصبغة الخضراء التي تمتص الطاقة الضوئية للقيام بالتمثيل الضوئي النباتي.',
    points: 10
  },
  {
    id: 'sc9',
    category: 'science',
    difficulty: 'medium',
    questionText: 'أي جزء من أجزاء الدماغ يتحكم في التوازن والتنسيق الحركي العضلي؟',
    options: ['المخيخ', 'المخ', 'الجذع الدماغي', 'النخاع الشوكي'],
    correctAnswerIndex: 0,
    explanation: 'المخيخ (Cerebellum) مسؤول عن تعديل الحركة وتنسيقها وتنظيم التوازن البدني والجسدي.',
    points: 20
  },
  {
    id: 'sc10',
    category: 'science',
    difficulty: 'hard',
    questionText: 'ما هي سرعة الضوء التقريبية في الفراغ الكوني؟',
    options: ['150 ألف كم/ثانية', '300 ألف كم/ثانية', '100 ألف كم/ثانية', '500 ألف كم/ثانية'],
    correctAnswerIndex: 1,
    explanation: 'تبلغ سرعة الضوء في الفراغ حوالي 299,792 كيلومتراً في الثانية، أي تقريباً 300 ألف كلم/ثانية.',
    points: 30
  },
  {
    id: 'gk7',
    category: 'general',
    difficulty: 'easy',
    questionText: 'ما هو العنصر الكيميائي الذي يمثل الرمز الرمزي Au في الجدول الدوري؟',
    options: ['الفضة', 'الذهب', 'النحاس', 'الألومنيوم'],
    correctAnswerIndex: 1,
    explanation: 'يرمز الحرفان "Au" لعنصر الذهب، ومأخوذ من الكلمة اللاتينية "Aurum" التي تعني الفجر المشرق.',
    points: 10
  },
  {
    id: 'gk8',
    category: 'general',
    difficulty: 'medium',
    questionText: 'ما هي أعلى قمة جبلية في العالم بأجمعه؟',
    options: ['جبل كيليمانجارو', 'جبل كي تو', 'جبل إيفرست', 'جبل مون بلان'],
    correctAnswerIndex: 2,
    explanation: 'جبل إيفرست الواقع في سلسلة جبال الهيمالايا بالتبت ونيبال هو أعلى قمة جبل فوق مستوى سطح البحر بارتفاع 8848 متراً.',
    points: 20
  },
  {
    id: 'gk9',
    category: 'general',
    difficulty: 'hard',
    questionText: 'في أي معركة بحرية تم تدمير الأسطول الفرنسي والسباني بقيادة نابليون من طرف بريطانيا عام 1805؟',
    options: ['معركة واترلو', 'معركة طرف الغار (ترافالغار)', 'معركة لبانت', 'معركة ميسولونغي'],
    correctAnswerIndex: 1,
    explanation: 'معركة طرف الغار (Trafalgar) هي المعركة البحرية الشهيرة التي انتصر فيها الأسطول البريطاني بقيادة نيلسون.',
    points: 30
  },
  {
    id: 'ge8',
    category: 'geography',
    difficulty: 'easy',
    questionText: 'ما هو أضخم خليج مائي في العالم مساحة وأبعاداً؟',
    options: ['خليج السويس', 'خليج المكسيك', 'خليج العقبة', 'خليج العرب'],
    correctAnswerIndex: 1,
    explanation: 'خليج المكسيك هو أكبر خليج بالكرة الأرضية بمساحة تقارب مليون ونصف كيلومتر مربع ويحده المكسيك والولايات المتحدة وكوبا.',
    points: 10
  },
  {
    id: 'ge9',
    category: 'geography',
    difficulty: 'medium',
    questionText: 'أي نهر يمر في مدينة عاصمة الضباب لندن؟',
    options: ['نهر الدانوب', 'نهر التايمز', 'نهر السين', 'نهر النيل'],
    correctAnswerIndex: 1,
    explanation: 'نهر التايمز (River Thames) هو النهر التاريخي العريق الذي يشق العاصمة البريطانية لندن ويمتد لمسافة 346 كم.',
    points: 20
  },
  {
    id: 'ge10',
    category: 'geography',
    difficulty: 'hard',
    questionText: 'أي دولة تملك أكبر عدد من الجزر الطبيعية في العالم (أكثر من 200,000 جزيرة)؟',
    options: ['إندونيسيا', 'السويد', 'الفلبين', 'كندا'],
    correctAnswerIndex: 1,
    explanation: 'بشكل مفاجئ، السويد بها أكبر عدد من الجزر بالعالم بما يقدر بأكثر من 267,000 جزيرة، أغلبها غير مسكون.',
    points: 30
  },
  {
    id: 'sp7',
    category: 'sports',
    difficulty: 'easy',
    questionText: 'ما هي اللعبة التي تسمى بـ "ملوك المبتدئين والأبطال" وتلعب بـ 64 مربعاً باللونين الأبيض والأسود؟',
    options: ['الضامة', 'الشطرنج', 'السلم والثعبان', 'الطاولة'],
    correctAnswerIndex: 1,
    explanation: 'لعبة الشطرنج هي اللعبة الذهنية العريقة والشهيرة التي تلعب على رقعة مقسمة إلى 64 مربعاً بين لاعبين.',
    points: 10
  },
  {
    id: 'sp8',
    category: 'sports',
    difficulty: 'medium',
    questionText: 'كم عدد حلقات الشعار الأولمبي الشهير؟',
    options: ['4 حلقات', '5 حلقات', '6 حلقات', '3 حلقات'],
    correctAnswerIndex: 1,
    explanation: 'يتكون العلم أو الشعار الأولمبي من 5 حلقات ملونة متداخلة ترمز لقارات العالم الخمس المأهولة بالسكان والتي تتنافس في الألعاب.',
    points: 20
  },
  {
    id: 'sp9',
    category: 'sports',
    difficulty: 'hard',
    questionText: 'ما هي الدولة الفائزة بأول نسخة لكأس أمم أوروبا لكرة القدم عام 1960؟',
    options: ['ألمانيا', 'فرنسا', 'الاتحاد السوفيتي', 'إسبانيا'],
    correctAnswerIndex: 2,
    explanation: 'توج منتخب الاتحاد السوفيتي بأول بطولة على الإطلاق لكأس أمم أوروبا عام 1960 بعد تغلبه في النهائي على يوغوسلافيا بنتيجة 2-1.',
    points: 30
  },
  {
    id: 'li7',
    category: 'literature',
    difficulty: 'easy',
    questionText: 'ما هو اللفظ اللوجيستيكي الذي يوصف تجمعات المسرح الجنائزي أو السرد التاريخي لشخص مسلط الأضواء وحده؟',
    options: ['المونولوج', 'السيناريو', 'المكياج', 'الحوار'],
    correctAnswerIndex: 0,
    explanation: 'المونولوج هو حديث المسرح الفردي أو السرد الفردي الذي يلقيه الممثل منفرداً للتعبير عن هواجسه ومشاعره.',
    points: 10
  },
  {
    id: 'li8',
    category: 'literature',
    difficulty: 'medium',
    questionText: 'من هو الكاتب الروسي مؤلف الروايتين التاريخيتين "الجريمة والعقاب" و"الإخوة كارامازوف"؟',
    options: ['ليو تولستوي', 'فيودور دوستويفسكي', 'أنطون تشيخوف', 'ألكسندر بوشكين'],
    correctAnswerIndex: 1,
    explanation: 'فيودور دوستويفسكي هو كاتب وفيلسوف روسي بارز تعد رواياته تحليلاً عميقاً للنفس وسلوك الإنسان الديني والاجتماعي والنفسي.',
    points: 20
  },
  {
    id: 'li9',
    category: 'literature',
    difficulty: 'hard',
    questionText: 'ما هو الاسم الحقيقي للشاعر العربي الكبير الملقب بـ "المتنبي"؟',
    options: ['أحمد بن الحسين الهمذاني', 'أحمد بن الحسين الجعفي الكندي', 'الحسن بن هانئ الحكمي', 'أبو تمام الطائي'],
    correctAnswerIndex: 1,
    explanation: 'الاسم الحقيقي لأبي الطيب المتنبي هو أحمد بن الحسين بن الحسن بن عبد الصمد الجعفي الكندي الكوفي ولد عام 303 هـ.',
    points: 30
  },
  {
    id: 'is11',
    category: 'islamic',
    difficulty: 'easy',
    questionText: 'من هو أول مؤذن في الإسلام؟',
    options: ['سلمان الفارسي', 'عمار بن ياسر', 'بلال بن رباح', 'عبد الله بن مسعود'],
    correctAnswerIndex: 2,
    explanation: 'بلال بن رباح رضي الله عنه هو مؤذن الرسول ﷺ والملقب بمؤذن الإسلام الأول.',
    points: 10
  },
  {
    id: 'sc11',
    category: 'science',
    difficulty: 'medium',
    questionText: 'ما هي الغدة الأساسية في جسم الإنسان التي تلقب بـ "سيدة الغدد الصماء"؟',
    options: ['الغدة الدرقية', 'الغدة النخامية', 'الغدة الصنوبرية', 'الغدة الكظرية'],
    correctAnswerIndex: 1,
    explanation: 'الغدة النخامية تفرز هرمونات حيوية للنمو وتنظم عمل معظم الغدد الهرمونية الأخرى بالجسم.',
    points: 20
  },
  {
    id: 'gk10',
    category: 'general',
    difficulty: 'medium',
    questionText: 'أي من الكائنات التالية ليس له مخ نهائياً؟',
    options: ['قنديل البحر', 'الأخطبوط', 'سرطان البحر', 'السلحفاة المائية'],
    correctAnswerIndex: 0,
    explanation: 'قنديل البحر ليس له مخ ولا قلب بل شبكة عصبية بسيطة تساعده على الشعور ببيئته المحيطة والتحرك الكهربائي.',
    points: 20
  },
  {
    id: 'ge11',
    category: 'geography',
    difficulty: 'easy',
    questionText: 'ما هي الدولة التي تشكل شبه جزيرة وتحيط بها المياه من ثلاث جهات وتشهد وجود معالم تاريخية عريقة كالبندقية وروما؟',
    options: ['اليونان', 'إسبانيا', 'إيطاليا', 'فرنسا'],
    correctAnswerIndex: 2,
    explanation: 'إيطاليا دولة تقع في قلب البحر الأبيض المتوسط متميزة بشكلها الشهير كالتمثيل بالحذاء الطويل وتضم البندقية وروما والفلورنس والتورين.',
    points: 10
  },
  {
    id: 'sp10',
    category: 'sports',
    difficulty: 'medium',
    questionText: 'في أي لعبة رياضية تشتهر فيها حركة "الضربة القاضية" وتسجل في حلبات حبالها مربعة الشكل؟',
    options: ['المصارعة الحرة', 'الملاكمة', 'الكاراتيه', 'التايكوندو'],
    correctAnswerIndex: 1,
    explanation: 'لعبة الملاكمة (الفن النبيل) هي التي تعتمد على لكم الخصوم فوق حلبة مربعة حتى إما الفوز بالنقاط أو الضربة القاضية.',
    points: 20
  }
];

export function getRandomQuestions(
  categories: Category[],
  difficulties: Difficulty[],
  count: number = 30
): Question[] {
  let filtered = QUESTIONS_BANK.filter(
    (q) => categories.includes(q.category) && difficulties.includes(q.difficulty)
  );

  if (filtered.length === 0) {
    filtered = QUESTIONS_BANK; // Fallback to all if selection yields nothing
  }

  // Shuffle
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
