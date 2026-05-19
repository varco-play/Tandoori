const t = {
  en: {
    chooseLanguage: '🌐 Please choose your language:\nПожалуйста, выберите язык:\nIltimos, tilni tanlang:',
    invalidLanguage: '⚠️ Please choose a language from the buttons below.',

    welcome: `👋 Welcome to the Tandoori Market Job Application Bot!

You will be asked a series of questions to complete your application.
Your application will be reviewed by our team.
If you are a good fit, we will contact you within 24 hours.
If you do not hear from us within 24 hours, unfortunately it means you were not selected at this time.

Let's get started! 👇`,

    chooseBranch: '🏪 Which branch are you applying to?',
    invalidBranch: '⚠️ Please choose a branch from the buttons below.',

    askName: '👤 What is your full name?',
    invalidName: '⚠️ Please enter your full name (cannot be empty).',

    askAge: '🎂 How old are you?',
    invalidAge: '⚠️ Please enter a valid age (must be a number between 16 and 80).',

    askGender: '⚧ What is your sex / gender?',
    genderMale: 'Male',
    genderFemale: 'Female',
    genderOther: 'Other',

    askMaritalStatus: '💍 What is your marital status?',
    maritalSingle: 'Single',
    maritalMarried: 'Married',
    maritalDivorced: 'Divorced',
    maritalWidowed: 'Widowed',

    askCity: '🏙 What city do you currently live in?',
    invalidCity: '⚠️ Please enter your current city (cannot be empty).',

    askDistance: `📍 How far do you live from the selected branch?

Please share one of the following:
• Your Google Maps location (tap 📎 → Location)
• A Google Maps link
• Or simply type your address`,
    invalidDistance: '⚠️ Please provide your location, a map link, or your address.',

    askUsStatus: '🇺🇸 What is your current status in the United States?',
    usStatusOptions: ['US Citizen', 'Green Card / LPR', 'Work Visa', 'DACA', 'Other / Prefer not to say'],

    askWorkAuth: '✅ Are you authorized to work in the United States?',
    yes: 'Yes',
    no: 'No',

    askExperience: '💼 Please describe your previous work experience (or type "None" if you have no experience).',
    invalidExperience: '⚠️ Please provide an answer (cannot be empty).',

    askLanguages: '🗣 Which languages do you speak?',
    invalidLanguages: '⚠️ Please list the languages you speak (cannot be empty).',

    askHours: '⏰ How many hours per week can you work?',
    invalidHours: '⚠️ Please enter a valid number of hours (e.g. 20, 40).',

    askDayShift: '☀️ Can you work day shifts?',
    askNightShift: '🌙 Can you work night shifts?',
    askWeekends: '📅 Can you work on weekends?',

    askStartDate: '🗓 When can you start working? (e.g. "Immediately", "June 1", "2 weeks")',
    invalidStartDate: '⚠️ Please enter when you can start (cannot be empty).',

    askTransportation: '🚗 Do you have reliable transportation to get to work?',

    askPhone: '📞 What is your US phone number?',
    invalidPhone: '⚠️ Please enter a phone number (cannot be empty).',

    askTelegram: '💬 What is your Telegram username? (Type "None" if you don\'t have one)',
    invalidTelegram: '⚠️ Please enter your Telegram username or "None".',

    askComments: '📝 Any additional comments or information you\'d like to share? (Type "None" if not)',
    invalidComments: '⚠️ Please enter a comment or "None".',

    reviewTitle: '📋 *Application Review*\n\nPlease review your answers below:',
    reviewBranch: '🏪 Branch',
    reviewName: '👤 Full Name',
    reviewAge: '🎂 Age',
    reviewGender: '⚧ Gender',
    reviewMarital: '💍 Marital Status',
    reviewCity: '🏙 Current City',
    reviewDistance: '📍 Distance / Location',
    reviewUsStatus: '🇺🇸 US Status',
    reviewWorkAuth: '✅ Work Authorization',
    reviewExperience: '💼 Work Experience',
    reviewLanguages: '🗣 Languages',
    reviewHours: '⏰ Hours/Week',
    reviewDayShift: '☀️ Day Shifts',
    reviewNightShift: '🌙 Night Shifts',
    reviewWeekends: '📅 Weekends',
    reviewStartDate: '🗓 Start Date',
    reviewTransportation: '🚗 Transportation',
    reviewPhone: '📞 Phone',
    reviewTelegram: '💬 Telegram',
    reviewComments: '📝 Comments',

    reviewActions: '\n\nWhat would you like to do?',
    btnConfirm: '✅ Confirm & Send',
    btnEdit: '✏️ Edit Information',
    btnCancel: '❌ Cancel Application',

    editTitle: '✏️ *Which field would you like to edit?*',
    editBack: '⬅️ Back to Review',

    cancelConfirm: '⚠️ Are you sure you want to cancel this application? All your answers will be lost.',
    btnYesCancel: '✅ Yes, Cancel',
    btnNoGoBack: '⬅️ No, Go Back',
    cancelDone: '❌ Your application has been cancelled. Send /start to begin a new application.',

    successMessage: `✅ *Application Sent Successfully!*

Thank you for applying to Tandoori Market.

Our team will review your application and contact you within *24 hours* if you are selected.

If you do not hear from us within 24 hours, unfortunately it means you were not selected at this time.

We wish you the best of luck! 🙏`,

    errorSending: '⚠️ Something went wrong while sending your application. Please try again later or contact us directly.',
    errorAdminMissing: '⚠️ The admin for your selected branch could not be reached. Please try again later.',

    btnBack: '⬅️ Back',
    unknownCommand: '⚠️ I didn\'t understand that. Please use the buttons or send /start to restart.',
  },

  ru: {
    chooseLanguage: '🌐 Please choose your language:\nПожалуйста, выберите язык:\nIltimos, tilni tanlang:',
    invalidLanguage: '⚠️ Пожалуйста, выберите язык из кнопок ниже.',

    welcome: `👋 Добро пожаловать в бот подачи заявок на работу Tandoori Market!

Вам будет задан ряд вопросов для заполнения заявки.
Ваша заявка будет рассмотрена нашей командой.
Если вы подходите, мы свяжемся с вами в течение 24 часов.
Если вы не получите ответа в течение 24 часов, к сожалению, это означает, что вы не были выбраны.

Начнём! 👇`,

    chooseBranch: '🏪 В какой филиал вы подаёте заявку?',
    invalidBranch: '⚠️ Пожалуйста, выберите филиал из кнопок ниже.',

    askName: '👤 Как вас зовут? (Полное имя)',
    invalidName: '⚠️ Пожалуйста, введите ваше полное имя (не может быть пустым).',

    askAge: '🎂 Сколько вам лет?',
    invalidAge: '⚠️ Пожалуйста, введите корректный возраст (число от 16 до 80).',

    askGender: '⚧ Укажите ваш пол:',
    genderMale: 'Мужской',
    genderFemale: 'Женский',
    genderOther: 'Другой',

    askMaritalStatus: '💍 Ваше семейное положение:',
    maritalSingle: 'Холост/Не замужем',
    maritalMarried: 'Женат/Замужем',
    maritalDivorced: 'Разведён/Разведена',
    maritalWidowed: 'Вдовец/Вдова',

    askCity: '🏙 В каком городе вы сейчас живёте?',
    invalidCity: '⚠️ Пожалуйста, введите ваш текущий город.',

    askDistance: `📍 Как далеко вы живёте от выбранного филиала?

Пожалуйста, отправьте одно из следующего:
• Геолокацию Google Maps (нажмите 📎 → Местоположение)
• Ссылку на Google Maps
• Или просто напишите ваш адрес`,
    invalidDistance: '⚠️ Пожалуйста, укажите вашу локацию, ссылку или адрес.',

    askUsStatus: '🇺🇸 Какой у вас статус в США?',
    usStatusOptions: ['Гражданин США', 'Грин-карта / ПМЖ', 'Рабочая виза', 'DACA', 'Другое / Не хочу указывать'],

    askWorkAuth: '✅ У вас есть разрешение на работу в США?',
    yes: 'Да',
    no: 'Нет',

    askExperience: '💼 Опишите ваш предыдущий опыт работы (или напишите "Нет", если опыта нет).',
    invalidExperience: '⚠️ Пожалуйста, введите ответ.',

    askLanguages: '🗣 Какими языками вы владеете?',
    invalidLanguages: '⚠️ Пожалуйста, перечислите языки, которыми вы владеете.',

    askHours: '⏰ Сколько часов в неделю вы можете работать?',
    invalidHours: '⚠️ Пожалуйста, введите число (например, 20 или 40).',

    askDayShift: '☀️ Вы можете работать в дневную смену?',
    askNightShift: '🌙 Вы можете работать в ночную смену?',
    askWeekends: '📅 Вы можете работать по выходным?',

    askStartDate: '🗓 Когда вы можете приступить к работе? (например: "Немедленно", "1 июня", "Через 2 недели")',
    invalidStartDate: '⚠️ Пожалуйста, укажите, когда вы можете начать.',

    askTransportation: '🚗 У вас есть надёжный транспорт для поездок на работу?',

    askPhone: '📞 Ваш американский номер телефона:',
    invalidPhone: '⚠️ Пожалуйста, введите номер телефона.',

    askTelegram: '💬 Ваш Telegram-ник? (Введите "Нет", если у вас нет)',
    invalidTelegram: '⚠️ Пожалуйста, введите ваш Telegram-ник или "Нет".',

    askComments: '📝 Есть ли дополнительные комментарии? (Введите "Нет", если нет)',
    invalidComments: '⚠️ Пожалуйста, введите комментарий или "Нет".',

    reviewTitle: '📋 *Проверка заявки*\n\nПожалуйста, проверьте ваши ответы:',
    reviewBranch: '🏪 Филиал',
    reviewName: '👤 Полное имя',
    reviewAge: '🎂 Возраст',
    reviewGender: '⚧ Пол',
    reviewMarital: '💍 Семейное положение',
    reviewCity: '🏙 Текущий город',
    reviewDistance: '📍 Расстояние / Локация',
    reviewUsStatus: '🇺🇸 Статус в США',
    reviewWorkAuth: '✅ Разрешение на работу',
    reviewExperience: '💼 Опыт работы',
    reviewLanguages: '🗣 Языки',
    reviewHours: '⏰ Часов/Неделя',
    reviewDayShift: '☀️ Дневная смена',
    reviewNightShift: '🌙 Ночная смена',
    reviewWeekends: '📅 Выходные',
    reviewStartDate: '🗓 Дата начала',
    reviewTransportation: '🚗 Транспорт',
    reviewPhone: '📞 Телефон',
    reviewTelegram: '💬 Telegram',
    reviewComments: '📝 Комментарии',

    reviewActions: '\n\nЧто вы хотите сделать?',
    btnConfirm: '✅ Подтвердить и отправить',
    btnEdit: '✏️ Редактировать информацию',
    btnCancel: '❌ Отменить заявку',

    editTitle: '✏️ *Какое поле вы хотите изменить?*',
    editBack: '⬅️ Вернуться к проверке',

    cancelConfirm: '⚠️ Вы уверены, что хотите отменить заявку? Все ваши ответы будут удалены.',
    btnYesCancel: '✅ Да, отменить',
    btnNoGoBack: '⬅️ Нет, вернуться',
    cancelDone: '❌ Ваша заявка отменена. Отправьте /start, чтобы начать новую заявку.',

    successMessage: `✅ *Заявка успешно отправлена!*

Спасибо за обращение в Tandoori Market.

Наша команда рассмотрит вашу заявку и свяжется с вами в течение *24 часов*, если вы будете выбраны.

Если вы не получите ответа в течение 24 часов, к сожалению, это означает, что вы не были выбраны.

Желаем вам удачи! 🙏`,

    errorSending: '⚠️ Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.',
    errorAdminMissing: '⚠️ Не удалось связаться с администратором выбранного филиала. Попробуйте позже.',

    btnBack: '⬅️ Назад',
    unknownCommand: '⚠️ Я не понял это сообщение. Используйте кнопки или отправьте /start, чтобы начать заново.',
  },

  uz: {
    chooseLanguage: '🌐 Please choose your language:\nПожалуйста, выберите язык:\nIltimos, tilni tanlang:',
    invalidLanguage: '⚠️ Iltimos, quyidagi tugmalardan tilni tanlang.',

    welcome: `👋 Tandoori Market Ish Ariza Botiga xush kelibsiz!

Sizga bir nechta savol beriladi. Javoblaringiz asosida ariza to'ldiriladi.
Ariza jamoamiz tomonidan ko'rib chiqiladi.
Agar siz mos kelib qolsangiz, 24 soat ichida siz bilan bog'lanamiz.
Agar 24 soat ichida javob olmasangiz, afsuski bu siz tanlanmaganingizni bildiradi.

Boshlaymiz! 👇`,

    chooseBranch: '🏪 Qaysi filialga ariza topshirmoqchisiz?',
    invalidBranch: '⚠️ Iltimos, quyidagi tugmalardan filialni tanlang.',

    askName: '👤 To\'liq ismingiz nima?',
    invalidName: '⚠️ Iltimos, to\'liq ismingizni kiriting (bo\'sh bo\'lmasligi kerak).',

    askAge: '🎂 Yoshingiz nechada?',
    invalidAge: '⚠️ Iltimos, to\'g\'ri yosh kiriting (16 dan 80 gacha raqam bo\'lishi kerak).',

    askGender: '⚧ Jinsingiz:',
    genderMale: 'Erkak',
    genderFemale: 'Ayol',
    genderOther: 'Boshqa',

    askMaritalStatus: '💍 Oilaviy holatingiz:',
    maritalSingle: 'Turmush qurmagan',
    maritalMarried: 'Turmush qurgan',
    maritalDivorced: 'Ajrashgan',
    maritalWidowed: 'Beva',

    askCity: '🏙 Hozir qaysi shaharda yashaysiz?',
    invalidCity: '⚠️ Iltimos, hozir yashayotgan shahringizni kiriting.',

    askDistance: `📍 Tanlangan filialdan qancha uzoqda yashaysiz?

Iltimos, quyidagilardan birini yuboring:
• Google Maps lokatsiyangizni (📎 → Joylashuv tugmasini bosing)
• Google Maps havolasi
• Yoki manzilингizni yozing`,
    invalidDistance: '⚠️ Iltimos, joylashuv, havola yoki manzil kiriting.',

    askUsStatus: '🇺🇸 AQSHdagi hozirgi statusingiz:',
    usStatusOptions: ['AQSH fuqarosi', 'Yashil karta / Doimiy rezident', 'Ish vizasi', 'DACA', 'Boshqa / Aytmaslikni afzal ko\'raman'],

    askWorkAuth: '✅ AQSHda rasman ishlashga huquqingiz bormi?',
    yes: 'Ha',
    no: 'Yo\'q',

    askExperience: '💼 Oldingi ish tajribangizni tasvirlab bering (tajriba bo\'lmasa "Yo\'q" deb yozing).',
    invalidExperience: '⚠️ Iltimos, javob kiriting.',

    askLanguages: '🗣 Qaysi tillarni bilasiz?',
    invalidLanguages: '⚠️ Iltimos, biladigan tillaringizni kiriting.',

    askHours: '⏰ Haftasiga necha soat ishlashingiz mumkin?',
    invalidHours: '⚠️ Iltimos, soat sonini kiriting (masalan: 20, 40).',

    askDayShift: '☀️ Kunduzgi smenada ishlashingiz mumkinmi?',
    askNightShift: '🌙 Tungi smenada ishlashingiz mumkinmi?',
    askWeekends: '📅 Dam olish kunlari ishlashingiz mumkinmi?',

    askStartDate: '🗓 Qachon ish boshlay olasiz? (masalan: "Darhol", "1-iyun", "2 haftadan keyin")',
    invalidStartDate: '⚠️ Iltimos, qachon boshlay olishingizni kiriting.',

    askTransportation: '🚗 Ishga kelish-ketish uchun transport vositangiz bormi?',

    askPhone: '📞 AQSH telefon raqamingiz:',
    invalidPhone: '⚠️ Iltimos, telefon raqamingizni kiriting.',

    askTelegram: '💬 Telegram usernamingiz? (Yo\'q bo\'lsa "Yo\'q" deb yozing)',
    invalidTelegram: '⚠️ Iltimos, Telegram usernamingizni yoki "Yo\'q" deb kiriting.',

    askComments: '📝 Qo\'shimcha izohlar yoki ma\'lumotlar? (Yo\'q bo\'lsa "Yo\'q" deb yozing)',
    invalidComments: '⚠️ Iltimos, izoh kiriting yoki "Yo\'q" deb yozing.',

    reviewTitle: '📋 *Ariza ko\'rib chiqish*\n\nIltimos, javoblaringizni tekshiring:',
    reviewBranch: '🏪 Filial',
    reviewName: '👤 To\'liq ism',
    reviewAge: '🎂 Yosh',
    reviewGender: '⚧ Jinsi',
    reviewMarital: '💍 Oilaviy holati',
    reviewCity: '🏙 Hozirgi shahri',
    reviewDistance: '📍 Masofa / Lokatsiya',
    reviewUsStatus: '🇺🇸 AQSHdagi statusi',
    reviewWorkAuth: '✅ Ish ruxsati',
    reviewExperience: '💼 Ish tajribasi',
    reviewLanguages: '🗣 Tillar',
    reviewHours: '⏰ Soat/Hafta',
    reviewDayShift: '☀️ Kunduzgi smena',
    reviewNightShift: '🌙 Tungi smena',
    reviewWeekends: '📅 Dam olish kunlari',
    reviewStartDate: '🗓 Boshlanish sanasi',
    reviewTransportation: '🚗 Transport',
    reviewPhone: '📞 Telefon',
    reviewTelegram: '💬 Telegram',
    reviewComments: '📝 Izohlar',

    reviewActions: '\n\nNima qilmoqchisiz?',
    btnConfirm: '✅ Tasdiqlash va yuborish',
    btnEdit: '✏️ Ma\'lumotlarni tahrirlash',
    btnCancel: '❌ Arizani bekor qilish',

    editTitle: '✏️ *Qaysi maydonni tahrirlashni xohlaysiz?*',
    editBack: '⬅️ Ko\'rib chiqishga qaytish',

    cancelConfirm: '⚠️ Haqiqatan ham arizangizni bekor qilmoqchimisiz? Barcha javoblaringiz o\'chiriladi.',
    btnYesCancel: '✅ Ha, bekor qilish',
    btnNoGoBack: '⬅️ Yo\'q, qaytish',
    cancelDone: '❌ Arizangiz bekor qilindi. Yangi ariza boshlash uchun /start yuboring.',

    successMessage: `✅ *Ariza muvaffaqiyatli yuborildi!*

Tandoori Marketga ariza topshirganingiz uchun rahmat.

Jamoamiz arizangizni ko'rib chiqadi va agar siz tanlansangiz *24 soat* ichida siz bilan bog'lanadi.

Agar 24 soat ichida javob olmasangiz, afsuski bu siz tanlanmaganingizni bildiradi.

Omad tilaymiz! 🙏`,

    errorSending: '⚠️ Ariza yuborishda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko\'ring.',
    errorAdminMissing: '⚠️ Tanlangan filial admini bilan bog\'lanib bo\'lmadi. Iltimos, keyinroq qayta urinib ko\'ring.',

    btnBack: '⬅️ Orqaga',
    unknownCommand: '⚠️ Bu xabarni tushunmadim. Tugmalardan foydalaning yoki /start yuboring.',
  },
};

module.exports = t;
