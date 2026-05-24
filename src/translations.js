// All user-facing text in all 4 supported languages.
// Natural phrasing — not direct translations. Uzbek uses everyday speech, not formal transliterations.

const t = {

  // ─── UZBEK ───────────────────────────────────────────────────────────────────
  uz: {
    // Pre-language-selection (shown in all langs at once)
    chooseLanguage: '🌐 Tilni tanlang | Выберите язык | Choose your language | Elige tu idioma:',
    invalidLanguage: '⚠️ Iltimos, quyidagi tugmalar orqali tilni tanlang.',

    // Welcome (shown after language is chosen)
    welcome: '👋 Assalomu alaykum! Ishga joylashish uchun arizangizni to\'ldiring.\nBoshlash uchun quyidagi tugmani bosing.',
    btnStart: '🚀 Boshlash',

    // Branch
    chooseBranch: '📍 Qaysi filialga ariza topshirmoqchisiz?',
    invalidBranch: '⚠️ Noto\'g\'ri tanlov. Iltimos, quyidagi tugmalardan birini bosing.',

    // Name
    askName: '👤 To\'liq ismingizni kiriting (Familiya Ism):',
    invalidName: '⚠️ Noto\'g\'ri format. Iltimos, qaytadan kiriting.',

    // Age
    askAge: 'Yoshingizni kiriting:',
    invalidAge: '⚠️ Noto\'g\'ri format. Iltimos, qaytadan kiriting.',

    // Gender (only Male/Female per client script)
    askGender: 'Jinsingizni tanlang:',
    genderMale: 'Erkak',
    genderFemale: 'Ayol',

    // City / State
    askCity: '🏙 Hozir qaysi shahar/shtatda yashayapsiz?',
    invalidCity: '⚠️ Noto\'g\'ri format. Iltimos, qaytadan kiriting.',

    // Location / Distance
    askDistance: '📍 Joylashuvingizni yuboring yoki manzilingizni yozing.\n(Filialdan masofani aniqlash uchun ishlatiladi)',
    btnShareLocation: '📍 Joylashuvni yuborish',
    btnTypeManually: '✍️ Qo\'lda kiritish',
    askDistanceManual: 'Manzilingizni kiriting:',
    invalidDistance: '⚠️ Noto\'g\'ri format. Iltimos, qaytadan kiriting.',

    // US Status — natural Uzbek: no "yashil karta", no "AQSH fuqarosi"
    askUsStatus: '🇺🇸 AQSHdagi statusingizni tanlang:',
    usStatusGreenCard: '🪪 Green Card',
    usStatusCitizen: '🟢 Fuqaro',
    usStatusVisa: '📋 Viza',
    usStatusOther: '🔄 Boshqa',

    // Work Auth (only asked for Visa / Other)
    askWorkAuth: '✅ Ishlash huquqingiz bormi?',
    yes: 'Ha',
    no: 'Yo\'q',

    // Experience
    askExperienceYn: '💼 Ish tajribangiz bormi?',
    askExperienceDetail: '💼 Qaysi sohalarda ishlagansiz? Qisqacha yozing:',
    invalidExperience: '⚠️ Noto\'g\'ri format. Iltimos, qaytadan kiriting.',
    noneText: 'Yo\'q',

    // Languages (multi-select)
    askLanguages: '🌐 Qaysi tillarda gaplasha olasiz? (Bir nechtasini tanlashingiz mumkin)',
    langOptions: ['O\'zbek', 'Rus', 'Ingliz', 'Ispan', 'Boshqa'],
    btnDone: '✅ Tayyor',
    selectAtLeastOne: 'Kamida bitta variant tanlang.',

    // Transportation
    askTransportation: '🚗 O\'z transportingiz bormi?',

    // Hours
    askHours: '⏱ Haftada necha soat ishlay olasiz?',
    invalidHours: '⚠️ Noto\'g\'ri format. Iltimos, qaytadan kiriting.',

    // Availability (multi-select)
    askAvailability: 'Quyidagi vaqtlarda ishlayolasizmi? (Bir nechtasini tanlashingiz mumkin)',
    availabilityOptions: ['☀️ Kunduzi', '🌙 Kechasi', '📅 Hafta kunlari', '🏖 Dam olish kunlari'],

    // Start Date
    askStartDate: '📅 Qachondan boshlab ishlashingiz mumkin?',
    btnImmediately: '🟢 Darhol',
    btnEnterDate: '📅 Sanani kiriting',
    askStartDateInput: 'Boshlash sanasini kiriting (KK.OO.YYYY):',
    invalidStartDate: '⚠️ Noto\'g\'ri format. Iltimos, qaytadan kiriting.',
    immediatelyText: 'Darhol',

    // Phone
    askPhone: '📞 Telefon raqamingizni kiriting:',
    invalidPhone: '⚠️ Noto\'g\'ri format. Iltimos, qaytadan kiriting.',

    // Comments
    askComments: '📝 Qo\'shimcha izoh yoki eslatmalaringiz bormi?',
    btnSkip: '⏭ O\'tkazib yuborish',
    skippedText: 'Yo\'q',

    // Review
    reviewTitle: '📋 Ariza xulosasi\n\nYuborishdan oldin ma\'lumotlaringizni tekshiring:',
    reviewBranch: '📍 Filial',
    reviewName: '👤 To\'liq ism',
    reviewAge: '🎂 Yosh',
    reviewGender: '⚧ Jinsi',
    reviewCity: '🏙 Hozirgi shahri',
    reviewDistance: '📍 Lokatsiya',
    reviewUsStatus: '🇺🇸 AQSHdagi statusi',
    reviewWorkAuth: '✅ Ishlash huquqi',
    reviewExperience: '💼 Ish tajribasi',
    reviewLanguages: '🌐 Tillar',
    reviewTransportation: '🚗 Transport',
    reviewHours: '⏱ Soat / Hafta',
    reviewAvailability: '⏱ Ish vaqti',
    reviewStartDate: '📅 Boshlanish sanasi',
    reviewPhone: '📞 Telefon',
    reviewComments: '📝 Qo\'shimcha izoh',
    workAuthAuto: '✅ Ruxsat bor',

    // Review buttons
    reviewActions: '\nNima qilmoqchisiz?',
    btnSubmit: '✅ Yuborish',
    btnEditAnswers: '✏️ Tahrirlash',
    btnCancel: 'Bekor qilish',

    // Edit menu
    editTitle: '✏️ Qaysi ma\'lumotni o\'zgartirmoqchisiz?',
    editBack: '← Xulosaga qaytish',

    // Cancel confirm
    cancelConfirm: 'Haqiqatan ham bekor qilmoqchimisiz? Barcha javoblaringiz o\'chib ketadi.',
    btnYesCancel: 'Ha, bekor qilish',
    btnNoGoBack: '← Yo\'q, qaytish',
    cancelDone: '❌ Ariza bekor qilindi.\nQaytadan boshlash uchun /start ni bosing.',

    // Success
    successMessage: '✅ Arizangiz muvaffaqiyatli yuborildi!\nTez orada siz bilan bog\'lanamiz. Rahmat! 🙏',

    // Errors
    errorSending: '⚠️ Xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko\'ring.',
    errorAdminMissing: '⚠️ Filial admini bilan bog\'lanib bo\'lmadi. Iltimos, keyinroq qayta urinib ko\'ring.',
    unknownCommand: '⚠️ Noto\'g\'ri format. Iltimos, qaytadan kiriting.',
    noSession: '/start bosib arizangizni boshlang.',
  },

  // ─── RUSSIAN ─────────────────────────────────────────────────────────────────
  ru: {
    chooseLanguage: '🌐 Tilni tanlang | Выберите язык | Choose your language | Elige tu idioma:',
    invalidLanguage: '⚠️ Пожалуйста, выберите язык с помощью кнопок ниже.',

    welcome: '👋 Здравствуйте! Пожалуйста, заполните анкету для трудоустройства.\nНажмите кнопку ниже, чтобы начать.',
    btnStart: '🚀 Начать',

    chooseBranch: '📍 В какой филиал вы подаёте заявку?',
    invalidBranch: '⚠️ Неверный выбор. Пожалуйста, нажмите одну из кнопок.',

    askName: '👤 Введите ваше полное имя (Фамилия Имя):',
    invalidName: '⚠️ Неверный формат. Пожалуйста, попробуйте снова.',

    askAge: 'Введите ваш возраст:',
    invalidAge: '⚠️ Неверный формат. Пожалуйста, попробуйте снова.',

    askGender: 'Выберите ваш пол:',
    genderMale: 'Мужской',
    genderFemale: 'Женский',

    askCity: '🏙 В каком городе/штате вы сейчас живёте?',
    invalidCity: '⚠️ Неверный формат. Пожалуйста, попробуйте снова.',

    askDistance: '📍 Поделитесь своим местоположением или введите адрес вручную.\n(Используется для расчёта расстояния до филиала)',
    btnShareLocation: '📍 Отправить геолокацию',
    btnTypeManually: '✍️ Ввести вручную',
    askDistanceManual: 'Введите ваш адрес:',
    invalidDistance: '⚠️ Неверный формат. Пожалуйста, попробуйте снова.',

    askUsStatus: '🇺🇸 Выберите ваш статус в США:',
    usStatusGreenCard: '🪪 Грин-карта',
    usStatusCitizen: '🟢 Гражданин',
    usStatusVisa: '📋 Виза',
    usStatusOther: '🔄 Другое',

    askWorkAuth: '✅ Есть ли у вас разрешение на работу?',
    yes: 'Да',
    no: 'Нет',

    askExperienceYn: '💼 Есть ли у вас опыт работы?',
    askExperienceDetail: '💼 В каких сферах вы работали? Кратко опишите:',
    invalidExperience: '⚠️ Неверный формат. Пожалуйста, попробуйте снова.',
    noneText: 'Нет',

    askLanguages: '🌐 На каких языках вы говорите? (Можно выбрать несколько)',
    langOptions: ['Узбекский', 'Русский', 'Английский', 'Испанский', 'Другой'],
    btnDone: '✅ Готово',
    selectAtLeastOne: 'Выберите хотя бы один вариант.',

    askTransportation: '🚗 Есть ли у вас личный транспорт?',

    askHours: '⏱ Сколько часов в неделю вы можете работать?',
    invalidHours: '⚠️ Неверный формат. Пожалуйста, попробуйте снова.',

    askAvailability: 'В какое время вы готовы работать? (Можно выбрать несколько)',
    availabilityOptions: ['☀️ Днём', '🌙 Ночью', '📅 В будни', '🏖 В выходные'],

    askStartDate: '📅 Когда вы сможете приступить к работе?',
    btnImmediately: '🟢 Немедленно',
    btnEnterDate: '📅 Ввести дату',
    askStartDateInput: 'Введите дату начала работы (ДД.ММ.ГГГГ):',
    invalidStartDate: '⚠️ Неверный формат. Пожалуйста, попробуйте снова.',
    immediatelyText: 'Немедленно',

    askPhone: '📞 Введите ваш номер телефона:',
    invalidPhone: '⚠️ Неверный формат. Пожалуйста, попробуйте снова.',

    askComments: '📝 Есть ли у вас дополнительные комментарии?',
    btnSkip: '⏭ Пропустить',
    skippedText: 'Нет',

    reviewTitle: '📋 Резюме заявки\n\nПожалуйста, проверьте данные перед отправкой:',
    reviewBranch: '📍 Филиал',
    reviewName: '👤 Полное имя',
    reviewAge: '🎂 Возраст',
    reviewGender: '⚧ Пол',
    reviewCity: '🏙 Текущий город',
    reviewDistance: '📍 Местоположение',
    reviewUsStatus: '🇺🇸 Статус в США',
    reviewWorkAuth: '✅ Разрешение на работу',
    reviewExperience: '💼 Опыт работы',
    reviewLanguages: '🌐 Языки',
    reviewTransportation: '🚗 Транспорт',
    reviewHours: '⏱ Часов / Неделю',
    reviewAvailability: '⏱ Время работы',
    reviewStartDate: '📅 Дата начала',
    reviewPhone: '📞 Телефон',
    reviewComments: '📝 Доп. заметки',
    workAuthAuto: '✅ Авторизован',

    reviewActions: '\nЧто вы хотите сделать?',
    btnSubmit: '✅ Отправить',
    btnEditAnswers: '✏️ Редактировать',
    btnCancel: 'Отмена',

    editTitle: '✏️ Выберите поле для редактирования:',
    editBack: '← Вернуться к резюме',

    cancelConfirm: 'Вы уверены, что хотите отменить? Все ваши ответы будут удалены.',
    btnYesCancel: 'Да, отменить',
    btnNoGoBack: '← Нет, вернуться',
    cancelDone: '❌ Заявка отменена.\nНажмите /start, чтобы начать заново.',

    successMessage: '✅ Ваша заявка успешно отправлена!\nМы свяжемся с вами в ближайшее время. Спасибо! 🙏',

    errorSending: '⚠️ Произошла ошибка. Пожалуйста, попробуйте позже.',
    errorAdminMissing: '⚠️ Не удалось связаться с администратором филиала. Попробуйте позже.',
    unknownCommand: '⚠️ Неверный формат. Пожалуйста, попробуйте снова.',
    noSession: 'Отправьте /start, чтобы начать заявку.',
  },

  // ─── ENGLISH ─────────────────────────────────────────────────────────────────
  en: {
    chooseLanguage: '🌐 Tilni tanlang | Выберите язык | Choose your language | Elige tu idioma:',
    invalidLanguage: '⚠️ Please choose a language using the buttons below.',

    welcome: '👋 Hello! Please fill out your job application.\nPress the button below to get started.',
    btnStart: '🚀 Start',

    chooseBranch: '📍 Which branch are you applying to?',
    invalidBranch: '⚠️ Invalid choice. Please press one of the buttons below.',

    askName: '👤 Enter your full name (Last Name First Name):',
    invalidName: '⚠️ Invalid input. Please try again.',

    askAge: 'Enter your age:',
    invalidAge: '⚠️ Invalid input. Please try again.',

    askGender: 'Select your gender:',
    genderMale: 'Male',
    genderFemale: 'Female',

    askCity: '🏙 What city/state do you currently live in?',
    invalidCity: '⚠️ Invalid input. Please try again.',

    askDistance: '📍 Share your location or type your address.\n(Used to calculate distance from the branch)',
    btnShareLocation: '📍 Share Location',
    btnTypeManually: '✍️ Type Manually',
    askDistanceManual: 'Please type your address:',
    invalidDistance: '⚠️ Invalid input. Please try again.',

    askUsStatus: '🇺🇸 Select your US status:',
    usStatusGreenCard: '🪪 Green Card',
    usStatusCitizen: '🟢 Citizen',
    usStatusVisa: '📋 Visa',
    usStatusOther: '🔄 Other',

    askWorkAuth: '✅ Do you have work authorization?',
    yes: 'Yes',
    no: 'No',

    askExperienceYn: '💼 Do you have any work experience?',
    askExperienceDetail: '💼 What fields have you worked in? Briefly describe:',
    invalidExperience: '⚠️ Invalid input. Please try again.',
    noneText: 'None',

    askLanguages: '🌐 Which languages do you speak? (You can select multiple)',
    langOptions: ['Uzbek', 'Russian', 'English', 'Spanish', 'Other'],
    btnDone: '✅ Done',
    selectAtLeastOne: 'Please select at least one option.',

    askTransportation: '🚗 Do you have your own transportation?',

    askHours: '⏱ How many hours per week can you work?',
    invalidHours: '⚠️ Invalid input. Please try again.',

    askAvailability: 'When are you available to work? (You can select multiple)',
    availabilityOptions: ['☀️ Day shift', '🌙 Night shift', '📅 Weekdays', '🏖 Weekends'],

    askStartDate: '📅 When can you start working?',
    btnImmediately: '🟢 Immediately',
    btnEnterDate: '📅 Enter a date',
    askStartDateInput: 'Please enter your start date (DD.MM.YYYY):',
    invalidStartDate: '⚠️ Invalid input. Please try again.',
    immediatelyText: 'Immediately',

    askPhone: '📞 Enter your phone number:',
    invalidPhone: '⚠️ Invalid input. Please try again.',

    askComments: '📝 Any additional comments or notes?',
    btnSkip: '⏭ Skip',
    skippedText: 'None',

    reviewTitle: '📋 Application Summary\n\nPlease review your information before submitting:',
    reviewBranch: '📍 Branch',
    reviewName: '👤 Full Name',
    reviewAge: '🎂 Age',
    reviewGender: '⚧ Gender',
    reviewCity: '🏙 Current City',
    reviewDistance: '📍 Location',
    reviewUsStatus: '🇺🇸 US Status',
    reviewWorkAuth: '✅ Work Authorization',
    reviewExperience: '💼 Work Experience',
    reviewLanguages: '🌐 Languages',
    reviewTransportation: '🚗 Transportation',
    reviewHours: '⏱ Hours / Week',
    reviewAvailability: '⏱ Availability',
    reviewStartDate: '📅 Start Date',
    reviewPhone: '📞 Phone',
    reviewComments: '📝 Additional Notes',
    workAuthAuto: '✅ Authorized',

    reviewActions: '\nWhat would you like to do?',
    btnSubmit: '✅ Submit',
    btnEditAnswers: '✏️ Edit',
    btnCancel: 'Cancel',

    editTitle: '✏️ Select the field you would like to edit:',
    editBack: '← Back to Summary',

    cancelConfirm: 'Are you sure you want to cancel? All your answers will be deleted.',
    btnYesCancel: 'Yes, Cancel',
    btnNoGoBack: '← No, Go Back',
    cancelDone: '❌ Application cancelled.\nPress /start to begin again.',

    successMessage: '✅ Your application has been submitted successfully!\nWe will be in touch soon. Thank you! 🙏',

    errorSending: '⚠️ Something went wrong. Please try again later.',
    errorAdminMissing: '⚠️ Could not reach the branch administrator. Please try again later.',
    unknownCommand: '⚠️ Invalid input. Please try again.',
    noSession: 'Send /start to begin your application.',
  },

  // ─── SPANISH ─────────────────────────────────────────────────────────────────
  es: {
    chooseLanguage: '🌐 Tilni tanlang | Выберите язык | Choose your language | Elige tu idioma:',
    invalidLanguage: '⚠️ Por favor elige un idioma usando los botones de abajo.',

    welcome: '👋 ¡Hola! Por favor, completa tu solicitud de empleo.\nPresiona el botón de abajo para comenzar.',
    btnStart: '🚀 Comenzar',

    chooseBranch: '📍 ¿A qué sucursal estás aplicando?',
    invalidBranch: '⚠️ Selección no válida. Por favor presiona uno de los botones.',

    askName: '👤 Ingresa tu nombre completo (Apellido Nombre):',
    invalidName: '⚠️ Entrada no válida. Por favor, inténtalo de nuevo.',

    askAge: 'Ingresa tu edad:',
    invalidAge: '⚠️ Entrada no válida. Por favor, inténtalo de nuevo.',

    askGender: 'Selecciona tu género:',
    genderMale: 'Masculino',
    genderFemale: 'Femenino',

    askCity: '🏙 ¿En qué ciudad/estado vives actualmente?',
    invalidCity: '⚠️ Entrada no válida. Por favor, inténtalo de nuevo.',

    askDistance: '📍 Comparte tu ubicación o escribe tu dirección.\n(Se usa para calcular la distancia a la sucursal)',
    btnShareLocation: '📍 Compartir ubicación',
    btnTypeManually: '✍️ Escribir manualmente',
    askDistanceManual: 'Por favor escribe tu dirección:',
    invalidDistance: '⚠️ Entrada no válida. Por favor, inténtalo de nuevo.',

    askUsStatus: '🇺🇸 Selecciona tu estatus en EE.UU.:',
    usStatusGreenCard: '🪪 Tarjeta verde',
    usStatusCitizen: '🟢 Ciudadano/a',
    usStatusVisa: '📋 Visa',
    usStatusOther: '🔄 Otro',

    askWorkAuth: '✅ ¿Tienes autorización para trabajar?',
    yes: 'Sí',
    no: 'No',

    askExperienceYn: '💼 ¿Tienes experiencia laboral?',
    askExperienceDetail: '💼 ¿En qué áreas has trabajado? Describe brevemente:',
    invalidExperience: '⚠️ Entrada no válida. Por favor, inténtalo de nuevo.',
    noneText: 'Ninguna',

    askLanguages: '🌐 ¿Qué idiomas hablas? (Puedes seleccionar varios)',
    langOptions: ['Uzbeko', 'Ruso', 'Inglés', 'Español', 'Otro'],
    btnDone: '✅ Listo',
    selectAtLeastOne: 'Por favor selecciona al menos una opción.',

    askTransportation: '🚗 ¿Tienes transporte propio?',

    askHours: '⏱ ¿Cuántas horas por semana puedes trabajar?',
    invalidHours: '⚠️ Entrada no válida. Por favor, inténtalo de nuevo.',

    askAvailability: '¿Cuándo estás disponible para trabajar? (Puedes seleccionar varios)',
    availabilityOptions: ['☀️ Turno diurno', '🌙 Turno nocturno', '📅 Entre semana', '🏖 Fines de semana'],

    askStartDate: '📅 ¿Cuándo puedes empezar a trabajar?',
    btnImmediately: '🟢 Inmediatamente',
    btnEnterDate: '📅 Ingresar una fecha',
    askStartDateInput: 'Por favor ingresa tu fecha de inicio (DD.MM.AAAA):',
    invalidStartDate: '⚠️ Entrada no válida. Por favor, inténtalo de nuevo.',
    immediatelyText: 'Inmediatamente',

    askPhone: '📞 Ingresa tu número de teléfono:',
    invalidPhone: '⚠️ Entrada no válida. Por favor, inténtalo de nuevo.',

    askComments: '📝 ¿Algún comentario o nota adicional?',
    btnSkip: '⏭ Omitir',
    skippedText: 'Ninguna',

    reviewTitle: '📋 Resumen de la solicitud\n\nPor favor revisa tu información antes de enviar:',
    reviewBranch: '📍 Sucursal',
    reviewName: '👤 Nombre completo',
    reviewAge: '🎂 Edad',
    reviewGender: '⚧ Género',
    reviewCity: '🏙 Ciudad actual',
    reviewDistance: '📍 Ubicación',
    reviewUsStatus: '🇺🇸 Estatus en EE.UU.',
    reviewWorkAuth: '✅ Autorización de trabajo',
    reviewExperience: '💼 Experiencia laboral',
    reviewLanguages: '🌐 Idiomas',
    reviewTransportation: '🚗 Transporte',
    reviewHours: '⏱ Horas / Semana',
    reviewAvailability: '⏱ Disponibilidad',
    reviewStartDate: '📅 Fecha de inicio',
    reviewPhone: '📞 Teléfono',
    reviewComments: '📝 Notas adicionales',
    workAuthAuto: '✅ Autorizado/a',

    reviewActions: '\n¿Qué deseas hacer?',
    btnSubmit: '✅ Enviar',
    btnEditAnswers: '✏️ Editar',
    btnCancel: 'Cancelar',

    editTitle: '✏️ Selecciona el campo que deseas editar:',
    editBack: '← Volver al resumen',

    cancelConfirm: '¿Estás seguro/a de que quieres cancelar? Se eliminarán todas tus respuestas.',
    btnYesCancel: 'Sí, cancelar',
    btnNoGoBack: '← No, volver',
    cancelDone: '❌ Solicitud cancelada.\nPresiona /start para comenzar de nuevo.',

    successMessage: '✅ ¡Tu solicitud fue enviada con éxito!\nNos pondremos en contacto pronto. ¡Gracias! 🙏',

    errorSending: '⚠️ Algo salió mal. Por favor, inténtalo más tarde.',
    errorAdminMissing: '⚠️ No pudimos contactar al administrador de la sucursal. Inténtalo más tarde.',
    unknownCommand: '⚠️ Entrada no válida. Por favor, inténtalo de nuevo.',
    noSession: 'Envía /start para comenzar tu solicitud.',
  },
};

module.exports = t;
