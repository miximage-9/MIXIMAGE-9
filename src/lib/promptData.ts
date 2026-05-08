/* Auto-ported from index-with-link-6.html — keep verbatim */
/* eslint-disable */
// @ts-nocheck

export const PROMPT_DATA = {
    faceLock: "CRITICAL INSTRUCTION: Preserve 100% identity of the original person. Maintain exact facial structure, proportions, eyes, eyebrows, nose shape, lips, jawline, skin tone, age impression, and natural expression. No beautification drift, no stylization, no face redesign, no distortion. The output must remain fully recognizable as the same real person.",

    editIntent: "Create an image of a realistic professional portrait edit using the provided reference photo.",
    editGuard: "Use the provided reference image as the identity source. Apply only the requested changes below. Keep face identity, hairstyle structure, pose, body proportions, lighting continuity, and overall realism consistent unless explicitly instructed otherwise.",
    aspectGuard: "Editing guard: preserve the original aspect ratio, centered portrait crop, and front-facing composition unless a different framing is explicitly requested.",

    framing: "[FRAMING: Vertical 2:3 composition, medium shot from the belt up, subject centered, straight posture, level shoulders, balanced symmetry, eye-level camera angle, and slight headroom above the head for later cropping. Keep full shoulders visible and not cut off.]",

    actions: {
        restore: "Restore this old or damaged photograph with high realism. Remove dust, scratches, stains, tears, fading, and noise. Rebuild lost details carefully, recover natural tonal range, improve clarity, and restore color or black-and-white balance while preserving original identity, authentic texture, and photographic character.",
        passport: "Create an official ID or passport-style portrait. Subject centered in frame with straight posture, level shoulders, neutral expression, balanced composition, and a clean studio-photo presentation suitable for formal identification use.",
        wedding: "Transform this portrait into a refined cinematic wedding-style image with soft romantic studio lighting, elegant tonal contrast, gentle highlight roll-off, clean skin rendering, premium atmosphere, and emotional depth while preserving the original identity.",
        graduation: "Create a professional graduation studio portrait with clean academic presentation, bright controlled lighting, refined detail, polished yet realistic retouching, and a formal premium photography look.",
        retouch: "Perform high-end professional retouching. Clean blemishes, refine uneven skin tone, improve facial clarity, and polish presentation while preserving pores, natural texture, realistic anatomy, and true identity."
    },

    expressions: {
        neutral: "Expression: calm neutral face, relaxed facial muscles, mouth naturally closed, composed and formal.",
        smirk: "Expression: subtle smirk with closed lips, no teeth visible, controlled confidence, natural and understated.",
        smile_closed: "Expression: gentle pleasant smile, lips closed, soft warmth, natural and professional.",
        smile_teeth: "Expression: natural genuine smile with visible teeth, relaxed cheeks, friendly and believable."
    },

    makeup: {
        clear_skin: "Skin/Makeup: natural clean skin, healthy tone, subtle brightening only, minimal or invisible makeup, realistic pores and texture preserved.",
        light: "Skin/Makeup: light natural makeup, softly enhanced eyes and lips, balanced skin tone, polished but realistic finish.",
        full: "Skin/Makeup: full professional studio makeup with refined contour, controlled highlights, defined eyes and lips, premium camera-ready finish.",
        ceremonial: "Skin/Makeup: formal ceremonial makeup, flawless polished skin, elegant definition, refined high-end finish suitable for important occasions."
    },

    enhancers: {
        none: "",
        studio_retouch: "Professional studio lighting with soft key light, balanced fill, gentle shadow separation, and realistic skin rendering. Clean minor blemishes, refine texture carefully, and keep pores and natural detail intact.",
        color_correct: "Perform color correction, accurate white balance, remove color cast, refine tonal balance, enhance micro-contrast, and improve clarity while keeping the image natural, sharp, and realistic.",
        vintage_restore: "Restore old vintage photograph by removing dust, scratches, tears, stains, fading, and mold. Recover missing detail carefully, preserve original identity, and optionally colorize naturally without making it look artificial.",
        face_recover: "Enhance an extremely blurred or low-quality face using realistic AI restoration. Recover detail in the eyes, nose, lips, and hairline while preserving identity, natural proportions, and believable texture."
    },

    clothing: {
        none: "",
        u_knd_m: "Change clothing to a Thai kindergarten boy uniform: clean white short-sleeved open-collar shirt and neat navy shorts, properly fitted, pressed, child-appropriate, with realistic school-uniform fabric texture and natural folds.",
        u_knd_f: "Change clothing to a Thai kindergarten girl uniform: white blouse with rounded Peter Pan collar and neat navy skirt, clean silhouette, child-appropriate fit, realistic fabric texture, tidy school-portrait presentation.",
        u_prm_m: "Change clothing to a Thai primary school boy uniform: white short-sleeved shirt with open collar and left chest pocket, neatly pressed, properly fitted, realistic fabric folds, formal school portrait look.",
        u_prm_f: "Change clothing to a Thai primary school girl uniform: white blouse with rounded collar and short sleeves with vertical pleats, neat structure, realistic drape, clean school-portrait presentation.",
        u_jh_m: "Change clothing to a Thai junior high school boy uniform: white short-sleeved shirt with standard collar, neatly tucked in, crisp and structured, realistic school-uniform texture.",
        u_jh_f: "Change clothing to a Thai junior high school girl uniform: white sailor-style blouse with V-neck, large collar, and navy butterfly ribbon bow, arranged neatly, realistic fabric drape, authentic school-portrait styling.",
        u_sh_m: "Change clothing to a Thai senior high school boy uniform: white short-sleeved shirt with visible belt area, crisp fabric, clean fit, realistic uniform details, formal school portrait presentation.",
        u_sh_f: "Change clothing to a Thai senior high school girl uniform: white short-sleeved shirt with standard collar, slightly open top collar, neat alignment, realistic fabric structure, clean student portrait look.",
        u_nfe: "Change clothing to a Thai NFE student uniform: formal white shirt, clean and professional appearance, proper fit, realistic fabric texture, suitable for official education portrait use.",
        u_uni_m: "Change clothing to a Thai university male student uniform: crisp white shirt with rolled-up sleeves and dark necktie, sharp fit, neat academic styling, realistic shirt texture and drape.",
        u_uni_f: "Change clothing to a Thai university female student uniform: white short-sleeved shirt with silver university buttons and silver chest pin, structured fit, authentic academic detail, clean professional presentation.",
        u_off_m: "Change clothing to a Thai official white male uniform in formal Ratchapataen style: high-collar jacket, gold buttons, crisp white fabric, dignified structure, realistic ceremonial presentation.",
        u_off_f: "Change clothing to a Thai official white female uniform: white blazer over white shirt with black necktie, elegant tailored fit, formal government-portrait styling, realistic fabric texture.",
        suit_black: "Change clothing to a formal black business suit with crisp white shirt and neat dark tie, perfectly tailored, premium executive appearance, realistic fabric texture and natural folds.",
        suit_black_notie: "Change clothing to a professional black suit with crisp white shirt and open collar, no tie, clean modern smart-business styling, realistic tailoring and structure.",
        suit_gray: "Change clothing to a tailored light gray suit jacket over a white shirt, no tie, open collar, modern minimalist business styling, clean structure, realistic drape and texture.",
        suit_navy: "Change clothing to a professional navy blue suit over a crisp white shirt with dark necktie, well-fitted, polished, and formally presentable with realistic business-wear texture.",
        suit_navy_3piece: "Change clothing to a premium dark navy three-piece suit with vest, crisp white shirt, and silver-gray silk necktie, perfectly tailored, luxury executive styling, sophisticated and commanding with realistic premium fabric.",
        uniform_white: "Clothing: clean formal white button-up shirt, minimal, neat, and properly fitted.",
        thai_formal: "Change clothing to an elegant traditional Thai formal outfit with refined silk fabric, graceful tailoring, tasteful gold details, realistic drape, and dignified ceremonial presence.",
        women_charcoal_pink: "Change clothing to a dark charcoal women's blazer over a light pink button-up shirt, modern corporate business styling, clean tailoring, elegant fit, realistic office-fashion texture and drape.",
        women_black_round: "Change clothing to a professional black women's blazer over a white round-neck blouse, formal business styling, refined silhouette, sophisticated and elegant professional look with realistic fabric texture.",
        women_gray_white: "Change clothing to a tailored gray women's blazer over a crisp white shirt, clean neutral corporate styling, polished fit, realistic fabric folds, and professional portrait presentation.",
        military: "Change clothing to a Thai military or military police short-sleeved uniform with epaulettes, rank insignia on the shoulders, name tag, unit patch, and official gold emblems. Keep the uniform sharply structured, authoritative, realistic, and professionally fitted.",
        military_formal: "Change clothing to a formal Thai military uniform with structured black tactical shirt, shoulder epaulettes, rank insignia, chest patches, belt, and official emblems. Keep the appearance authoritative, neat, realistic, and clearly ceremonial-professional.",
        gown: "Clothing: academic graduation gown with realistic fabric weight, formal academic styling, clean and dignified presentation."
    },

    backgrounds: {
        none: "",
        blue: "Background: clean gradient blue studio backdrop, transitioning smoothly from deeper sky blue to lighter blue, formal official portrait look, smooth and evenly lit.",
        white: "Background: pure white seamless studio backdrop, bright and clean with clear subject separation and natural edge detail.",
        studio_gray: "Background: professional dark gray to silver-gray gradient backdrop, smooth tonal transition, modern portrait-studio aesthetic, dramatic but clean.",
        brown_vintage: "Background: warm vintage brown textured studio backdrop with soft vignette, classic portrait-photography mood, earthy tones, refined and elegant retro atmosphere.",
        teal_art: "Background: muted teal-gray textured studio backdrop with subtle vignette, artistic cool-toned portrait atmosphere, soft and refined photographic depth.",
        outdoor_blur: "Background: natural outdoor scene softly blurred into elegant bokeh, realistic depth of field, pleasing separation, non-distracting photographic look."
    }
};

// Student Uniform Data (from kmzremix.html)
export const UNIFORM_DATA = [
    {
        category: "1. อนุบาล",
        color: "pink",
        items: [
            { id: "knd-m", label: "ผู้ชาย (เชิ้ตคอเปิด+กางเกงกรมท่า)", prompt: "Change clothing to a Thai kindergarten boy uniform: clean white short-sleeved open-collar shirt and neat navy shorts, properly fitted, pressed, child-appropriate, with realistic school-uniform fabric texture and natural folds." },
            { id: "knd-f", label: "ผู้หญิง (ปกบัวมน+กระโปรงกรมท่า)", prompt: "Change clothing to a Thai kindergarten girl uniform: white blouse with rounded Peter Pan collar and neat navy skirt, clean silhouette, child-appropriate fit, realistic fabric texture, tidy school-portrait presentation." }
        ]
    },
    {
        category: "2. ประถม",
        color: "yellow",
        items: [
            { id: "prm-m", label: "ผู้ชาย (เชิ้ตคอเปิด+มีกระเป๋า)", prompt: "Change clothing to a Thai primary school boy uniform: white short-sleeved shirt with open collar and left chest pocket, neatly pressed, properly fitted, realistic fabric folds, formal school portrait look." },
            { id: "prm-f", label: "ผู้หญิง (ปกบัว+แขนมีจีบ)", prompt: "Change clothing to a Thai primary school girl uniform: white blouse with rounded collar and short sleeves with vertical pleats, neat structure, realistic drape, clean school-portrait presentation." }
        ]
    },
    {
        category: "3. ม.ต้น",
        color: "orange",
        items: [
            { id: "jh-m", label: "ผู้ชาย (เชิ้ตคอตั้งมาตรฐาน)", prompt: "Change clothing to a Thai junior high school boy uniform: white short-sleeved shirt with standard collar, neatly tucked in, crisp and structured, realistic school-uniform texture." },
            { id: "jh-f", label: "ผู้หญิง (ปกกะลาสี+คอซองผีเสื้อ)", prompt: "Change clothing to a Thai junior high school girl uniform: white sailor-style blouse with V-neck, large collar, and navy butterfly ribbon bow, arranged neatly, realistic fabric drape, authentic school-portrait styling." }
        ]
    },
    {
        category: "4. ม.ปลาย / กศน.",
        color: "red",
        items: [
            { id: "sh-m", label: "ผู้ชาย (เชิ้ตมาตรฐาน+เข็มขัด)", prompt: "Change clothing to a Thai senior high school boy uniform: white short-sleeved shirt with visible belt area, crisp fabric, clean fit, realistic uniform details, formal school portrait presentation." },
            { id: "sh-f", label: "ผู้หญิง (เชิ้ตมาตรฐาน ไม่ผูกโบว์)", prompt: "Change clothing to a Thai senior high school girl uniform: white short-sleeved shirt with standard collar, slightly open top collar, neat alignment, realistic fabric structure, clean student portrait look." },
            { id: "nfe", label: "กศน. (เชิ้ตขาวทางการ)", prompt: "Change clothing to a Thai NFE student uniform: formal white shirt, clean and professional appearance, proper fit, realistic fabric texture, suitable for official education portrait use." }
        ]
    },
    {
        category: "5. นักศึกษา (มหาวิทยาลัย)",
        color: "green",
        items: [
            { id: "uni-m", label: "ผู้ชาย (เชิ้ตพับแขน+เนคไท)", prompt: "Change clothing to a Thai university male student uniform: crisp white shirt with rolled-up sleeves and dark necktie, sharp fit, neat academic styling, realistic shirt texture and drape." },
            { id: "uni-f", label: "ผู้หญิง (กระดุมเงิน+เข็มติดอก)", prompt: "Change clothing to a Thai university female student uniform: white short-sleeved shirt with silver university buttons and silver chest pin, structured fit, authentic academic detail, clean professional presentation." }
        ]
    },
    {
        category: "6. ชุดปกติขาว (ข้าราชการ)",
        color: "blue",
        items: [
            { id: "off-m", label: "ผู้ชาย (คอปิด/ราชปะแตน)", prompt: "Change clothing to a Thai official white male uniform in formal Ratchapataen style: high-collar jacket, gold buttons, crisp white fabric, dignified structure, realistic ceremonial presentation." },
            { id: "off-f", label: "ผู้หญิง (สูทขาว+ไทดำ)", prompt: "Change clothing to a Thai official white female uniform: white blazer over white shirt with black necktie, elegant tailored fit, formal government-portrait styling, realistic fabric texture." }
        ]
    },
    {
        category: "7. ชุดสูทสากล",
        color: "gray",
        items: [
            { id: "suit-tie", label: "สูทดำ + เนคไท", prompt: "Change clothing to a formal black business suit with crisp white shirt and neat dark tie, perfectly tailored, premium executive appearance, realistic fabric texture and natural folds." },
            { id: "suit-no", label: "สูทดำ (ไม่ใส่เนคไท)", prompt: "Change clothing to a professional black suit with crisp white shirt and open collar, no tie, clean modern smart-business styling, realistic tailoring and structure." }
        ]
    }
];

// Special Outfits (extracted from PDF analysis)
export const SPECIAL_DATA = [
    {
        category: "🎖️ ชุดทหาร / ตำรวจ",
        color: "amber",
        icon: "🎖️",
        items: [
            { id: "mil-1", label: "ทหาร / สห. แขนสั้น", prompt: "Change clothing to a Thai military or military police short-sleeved uniform with epaulettes, rank insignia on the shoulders, name tag, unit patch, and official gold emblems. Keep the uniform sharply structured, authoritative, realistic, and professionally fitted." },
            { id: "mil-2", label: "ทหารทางการ / ลุคเข้ม", prompt: "Change clothing to a formal Thai military uniform with structured black tactical shirt, shoulder epaulettes, rank insignia, chest patches, belt, and official emblems. Keep the appearance authoritative, neat, realistic, and clearly ceremonial-professional." }
        ]
    },
    {
        category: "👔 ชุดทางการพื้นฐาน",
        color: "emerald",
        icon: "👔",
        items: [
            { id: "formal-white-shirt", label: "เชิ้ตขาวทางการ", prompt: "Clothing: clean formal white button-up shirt, minimal, neat, and properly fitted." },
            { id: "formal-thai", label: "ชุดไทยทางการ", prompt: "Change clothing to an elegant traditional Thai formal outfit with refined silk fabric, graceful tailoring, tasteful gold details, realistic drape, and dignified ceremonial presence." }
        ]
    },
    {
        category: "👩‍💼 สูทผู้หญิง (Canonical)",
        color: "rose",
        icon: "👩‍💼",
        items: [
            { id: "wsuit-1", label: "สูทผู้หญิงชาร์โคล + เชิ้ตชมพู", prompt: "Change clothing to a dark charcoal women's blazer over a light pink button-up shirt, modern corporate business styling, clean tailoring, elegant fit, realistic office-fashion texture and drape." },
            { id: "wsuit-2", label: "สูทผู้หญิงดำ + เสื้อขาวคอกลม", prompt: "Change clothing to a professional black women's blazer over a white round-neck blouse, formal business styling, refined silhouette, sophisticated and elegant professional look with realistic fabric texture." },
            { id: "wsuit-3", label: "สูทผู้หญิงเทา + เชิ้ตขาว", prompt: "Change clothing to a tailored gray women's blazer over a crisp white shirt, clean neutral corporate styling, polished fit, realistic fabric folds, and professional portrait presentation." }
        ]
    },
    {
        category: "👨‍💼 สูทผู้ชาย (Canonical)",
        color: "slate",
        icon: "👨‍💼",
        items: [
            { id: "msuit-1", label: "สูทดำ + เนคไท", prompt: "Change clothing to a formal black business suit with crisp white shirt and neat dark tie, perfectly tailored, premium executive appearance, realistic fabric texture and natural folds." },
            { id: "msuit-2", label: "สูทดำ (ไม่ใส่เนคไท)", prompt: "Change clothing to a professional black suit with crisp white shirt and open collar, no tie, clean modern smart-business styling, realistic tailoring and structure." },
            { id: "msuit-3", label: "สูทเทาอ่อน + เชิ้ตขาว (ไม่ไท)", prompt: "Change clothing to a tailored light gray suit jacket over a white shirt, no tie, open collar, modern minimalist business styling, clean structure, realistic drape and texture." },
            { id: "msuit-4", label: "สูทกรมท่า 3 ชิ้น + เนคไทเงิน", prompt: "Change clothing to a premium dark navy three-piece suit with vest, crisp white shirt, and silver-gray silk necktie, perfectly tailored, luxury executive styling, sophisticated and commanding with realistic premium fabric." },
            { id: "msuit-5", label: "สูทกรมท่า + เชิ้ตขาว + เนคไท", prompt: "Change clothing to a professional navy blue suit over a crisp white shirt with dark necktie, well-fitted, polished, and formally presentable with realistic business-wear texture." }
        ]
    },
    {
        category: "🖼️ แบ็คกราวด์สตูดิโอ (Canonical)",
        color: "cyan",
        icon: "🖼️",
        items: [
            { id: "bg-blue-grad", label: "ฟ้าไล่สีมาตรฐาน", prompt: "Background: clean gradient blue studio backdrop, transitioning smoothly from deeper sky blue to lighter blue, formal official portrait look, smooth and evenly lit." },
            { id: "bg-white-clean", label: "ขาวล้วนแบบสตูดิโอ", prompt: "Background: pure white seamless studio backdrop, bright and clean with clear subject separation and natural edge detail." },
            { id: "bg-gray-dark", label: "เทาเข้มไล่สี", prompt: "Background: professional dark gray to silver-gray gradient backdrop, smooth tonal transition, modern portrait-studio aesthetic, dramatic but clean." },
            { id: "bg-brown-vintage", label: "น้ำตาลวินเทจ", prompt: "Background: warm vintage brown textured studio backdrop with soft vignette, classic portrait-photography mood, earthy tones, refined and elegant retro atmosphere." },
            { id: "bg-teal", label: "เขียวเทา / ฟ้าเทาแบบอาร์ต", prompt: "Background: muted teal-gray textured studio backdrop with subtle vignette, artistic cool-toned portrait atmosphere, soft and refined photographic depth." },
            { id: "bg-outdoor-bokeh", label: "ฉากนอกสถานที่เบลอธรรมชาติ", prompt: "Background: natural outdoor scene softly blurred into elegant bokeh, realistic depth of field, pleasing separation, non-distracting photographic look." }
        ]
    }
];

// Library Data (from oc.html)
export const LIBRARY_DATA = [
    {
        title: "🔒 Base Prompts / พรอมต์ฐาน",
        color: "red",
        items: [
            { en: "Create a clean professional portrait while strictly preserving 100% facial identity, facial structure, hairstyle structure, skin texture, and original outfit design. Center the subject in frame with straight posture, level shoulders, and calm balanced presentation. Tidy hair, reduce flyaways, refine the hairline naturally, straighten clothing, fix collar alignment, smooth wrinkles, and improve garment structure while keeping everything realistic. Maintain natural skin detail, believable lighting, and a polished commercial-grade finish with no over-retouching, no plastic skin, and no distortion.", th: "พรอมต์รีทัชหลัก ใช้เป็นฐานก่อนเติมคำสั่งเฉพาะงาน" },
            { en: "CRITICAL INSTRUCTION: Preserve 100% identity of the original person. Maintain exact facial structure, proportions, eyes, eyebrows, nose shape, lips, jawline, skin tone, age impression, and natural expression. No beautification drift, no stylization, no face redesign, no distortion. The output must remain fully recognizable as the same real person.", th: "พรอมต์ล็อคใบหน้าแบบเข้ม" }
        ]
    },
    {
        title: "🎯 Actions / หมวดงานหลัก",
        color: "blue",
        items: [
            { en: "Create an official ID or passport-style portrait. Subject centered in frame with straight posture, level shoulders, neutral expression, balanced composition, and a clean studio-photo presentation suitable for formal identification use.", th: "รูปติดบัตร / สมัครงาน" },
            { en: "Restore this old or damaged photograph with high realism. Remove dust, scratches, stains, tears, fading, and noise. Rebuild lost details carefully, recover natural tonal range, improve clarity, and restore color or black-and-white balance while preserving original identity, authentic texture, and photographic character.", th: "ซ่อมแซมรูปเก่า" },
            { en: "Transform this portrait into a refined cinematic wedding-style image with soft romantic studio lighting, elegant tonal contrast, gentle highlight roll-off, clean skin rendering, premium atmosphere, and emotional depth while preserving the original identity.", th: "พรีเวดดิ้ง / เวดดิ้งพอร์ตเทรต" },
            { en: "Create a professional graduation studio portrait with clean academic presentation, bright controlled lighting, refined detail, polished yet realistic retouching, and a formal premium photography look.", th: "รูปรับปริญญา" },
            { en: "Perform high-end professional retouching. Clean blemishes, refine uneven skin tone, improve facial clarity, and polish presentation while preserving pores, natural texture, realistic anatomy, and true identity.", th: "รีทัชผิว" }
        ]
    },
    {
        title: "🙂 Expressions / สีหน้า",
        color: "cyan",
        items: [
            { en: "Expression: calm neutral face, relaxed facial muscles, mouth naturally closed, composed and formal.", th: "สีหน้าเรียบสุภาพ" },
            { en: "Expression: subtle smirk with closed lips, no teeth visible, controlled confidence, natural and understated.", th: "ยิ้มมุมปาก (ไม่เห็นฟัน)" },
            { en: "Expression: gentle pleasant smile, lips closed, soft warmth, natural and professional.", th: "ยิ้มอ่อนแบบปิดปาก" },
            { en: "Expression: natural genuine smile with visible teeth, relaxed cheeks, friendly and believable.", th: "ยิ้มเห็นฟันอย่างเป็นธรรมชาติ" }
        ]
    },
    {
        title: "💄 Makeup / เมคอัป",
        color: "rose",
        items: [
            { en: "Skin/Makeup: natural clean skin, healthy tone, subtle brightening only, minimal or invisible makeup, realistic pores and texture preserved.", th: "หน้าใสธรรมชาติ" },
            { en: "Skin/Makeup: light natural makeup, softly enhanced eyes and lips, balanced skin tone, polished but realistic finish.", th: "แต่งเบาแบบธรรมชาติ" },
            { en: "Skin/Makeup: full professional studio makeup with refined contour, controlled highlights, defined eyes and lips, premium camera-ready finish.", th: "แต่งเต็มสำหรับงานสตูดิโอ" },
            { en: "Skin/Makeup: formal ceremonial makeup, flawless polished skin, elegant definition, refined high-end finish suitable for important occasions.", th: "เมคอัปงานพิธี" }
        ]
    },
    {
        title: "👀 มักถูกมองข้าม แต่ช่วยภาพนิ่งมาก",
        color: "emerald",
        items: [
            { en: "Change clothing to a tailored light gray suit jacket over a white shirt, no tie, open collar, modern minimalist business styling, clean structure, realistic drape and texture.", th: "สูทเทาอ่อน (ไม่ใส่ไท)" },
            { en: "Change clothing to a premium dark navy three-piece suit with vest, crisp white shirt, and silver-gray silk necktie, perfectly tailored, luxury executive styling, sophisticated and commanding with realistic premium fabric.", th: "สูทกรมท่า 3 ชิ้น + เนคไทเงิน" },
            { en: "Clothing: clean formal white button-up shirt, minimal, neat, and properly fitted.", th: "เชิ้ตขาวทางการ" },
            { en: "Change clothing to an elegant traditional Thai formal outfit with refined silk fabric, graceful tailoring, tasteful gold details, realistic drape, and dignified ceremonial presence.", th: "ชุดไทยทางการ" },
            { en: "Change clothing to a formal Thai military uniform with structured black tactical shirt, shoulder epaulettes, rank insignia, chest patches, belt, and official emblems. Keep the appearance authoritative, neat, realistic, and clearly ceremonial-professional.", th: "ทหารทางการ / ลุคเข้ม" },
            { en: "Background: warm vintage brown textured studio backdrop with soft vignette, classic portrait-photography mood, earthy tones, refined and elegant retro atmosphere.", th: "ฉากน้ำตาลวินเทจ" },
            { en: "Background: muted teal-gray textured studio backdrop with subtle vignette, artistic cool-toned portrait atmosphere, soft and refined photographic depth.", th: "ฉากเขียวเทา / ฟ้าเทาแบบอาร์ต" }
        ]
    },
    {
        title: "👩‍💼 สูทผู้หญิง / Corporate",
        color: "indigo",
        items: [
            { en: "Change clothing to a dark charcoal women's blazer over a light pink button-up shirt, modern corporate business styling, clean tailoring, elegant fit, realistic office-fashion texture and drape.", th: "สูทผู้หญิงสีเข้ม + เสื้อชมพู" },
            { en: "Change clothing to a professional black women's blazer over a white round-neck blouse, formal business styling, refined silhouette, sophisticated and elegant professional look with realistic fabric texture.", th: "สูทผู้หญิงสีดำ + เสื้อขาวคอกลม" },
            { en: "Change clothing to a tailored gray women's blazer over a crisp white shirt, clean neutral corporate styling, polished fit, realistic fabric folds, and professional portrait presentation.", th: "สูทผู้หญิงสีเทา + เสื้อขาว" }
        ]
    },
    {
        title: "🖼️ Backgrounds / ฉากหลังครบชุด",
        color: "purple",
        items: [
            { en: "Background: clean gradient blue studio backdrop, transitioning smoothly from deeper sky blue to lighter blue, formal official portrait look, smooth and evenly lit.", th: "ฉากฟ้าไล่สีมาตรฐาน" },
            { en: "Background: pure white seamless studio backdrop, bright and clean with clear subject separation and natural edge detail.", th: "ฉากขาวล้วนแบบสตูดิโอ" },
            { en: "Background: professional dark gray to silver-gray gradient backdrop, smooth tonal transition, modern portrait-studio aesthetic, dramatic but clean.", th: "ฉากเทาเข้มไล่สี" },
            { en: "Background: warm vintage brown textured studio backdrop with soft vignette, classic portrait-photography mood, earthy tones, refined and elegant retro atmosphere.", th: "ฉากน้ำตาลวินเทจ" },
            { en: "Background: muted teal-gray textured studio backdrop with subtle vignette, artistic cool-toned portrait atmosphere, soft and refined photographic depth.", th: "ฉากเขียวเทา / ฟ้าเทาแบบอาร์ต" },
            { en: "Background: natural outdoor scene softly blurred into elegant bokeh, realistic depth of field, pleasing separation, non-distracting photographic look.", th: "ฉากนอกสถานที่เบลอธรรมชาติ" }
        ]
    },
    {
        title: "🛠️ Retouch / Restoration / Framing",
        color: "amber",
        items: [
            { en: "Professional studio lighting with soft key light, balanced fill, gentle shadow separation, and realistic skin rendering. Clean minor blemishes, refine texture carefully, and keep pores and natural detail intact.", th: "แสงสตูดิโอ + รีทัชสมจริง" },
            { en: "Perform color correction, accurate white balance, remove color cast, refine tonal balance, enhance micro-contrast, and improve clarity while keeping the image natural, sharp, and realistic.", th: "แก้สีและเพิ่มความคม" },
            { en: "Restore old vintage photograph by removing dust, scratches, tears, stains, fading, and mold. Recover missing detail carefully, preserve original identity, and optionally colorize naturally without making it look artificial.", th: "ซ่อมรูปเก่าวินเทจ" },
            { en: "Enhance an extremely blurred or low-quality face using realistic AI restoration. Recover detail in the eyes, nose, lips, and hairline while preserving identity, natural proportions, and believable texture.", th: "กู้ภาพหน้าเบลอให้ชัด" },
            { en: "[FRAMING: Vertical 2:3 composition, medium shot from the belt up, subject centered, straight posture, level shoulders, balanced symmetry, eye-level camera angle, and slight headroom above the head for later cropping. Keep full shoulders visible and not cut off.]", th: "เฟรมมาตรฐานแนวตั้ง 2:3" }
        ]
    }
];

// ==================== ZIP PROMPT EXTENSIONS ====================

export function humanizeToken(value) {
    return String(value || '')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
}

export function buildMakeupPresetPrompt(preset) {
    return `Apply a ${preset.en} makeup look (${preset.th}). ${preset.description}. Skin finish: ${humanizeToken(preset.finish)}; eye tone: ${humanizeToken(preset.eyes)}; blush tone: ${humanizeToken(preset.blush)}; lip tone: ${humanizeToken(preset.lips)}. Recommended for: ${preset.useCases.map(humanizeToken).join(', ')}. ${preset.note} Keep the result realistic, polished, and photo-safe.`;
}

export const HAIRSTYLE_GROUPS = {
    boy: [
        { id: "keep-original", labelTh: "คงทรงเดิม", prompt: "Keep the exact hairstyle from the original image", descTh: "ใช้ทรงผมจากภาพต้นฉบับ" },
        { id: "low-fade", labelTh: "รองทรงต่ำ", prompt: "Low fade haircut, clean and professional", descTh: "ทรงเรียบร้อย ใช้กับภาพเด็กผู้ชายทางการได้ง่าย" },
        { id: "side-part", labelTh: "แสกข้างคลาสสิก", prompt: "Classic side part hairstyle, well-groomed professional", descTh: "แสกข้างสุภาพ เหมาะกับภาพนักเรียนและรูปติดบัตร" },
        { id: "two-block", labelTh: "ทูบล็อคสุภาพ", prompt: "Korean two-block hairstyle, modern K-pop style", descTh: "ลุคสดใสแต่ยังคุมความสุภาพได้" }
    ],
    girl: [
        { id: "keep-original", labelTh: "คงทรงเดิม", prompt: "Keep the exact hairstyle from the original image", descTh: "ใช้ทรงผมจากภาพต้นฉบับ" },
        { id: "short-bob", labelTh: "ผมบ๊อบสั้น", prompt: "Short bob haircut, modern professional style", descTh: "ผมสั้นเรียบร้อย เหมาะกับงานทางการ" },
        { id: "long-straight", labelTh: "ผมยาวตรง", prompt: "Long straight hair, sleek and elegant", descTh: "ผมยาวตรงแบบสะอาดเรียบง่าย" },
        { id: "updo", labelTh: "รวบผม", prompt: "Professional updo hairstyle, ponytail or bun", descTh: "รวบผมให้ภาพดูเรียบร้อยและเป็นระเบียบ" },
        { id: "bangs", labelTh: "ทรงผมมีหน้าม้า", prompt: "Hairstyle with bangs, youthful and cute", descTh: "ลุคเด็กผู้หญิงสดใสแต่ยังคงความสุภาพ" }
    ],
    male: [
        { id: "keep-original", labelTh: "คงทรงเดิม", prompt: "Keep the exact hairstyle from the original image", descTh: "ใช้ทรงผมจากภาพต้นฉบับ" },
        { id: "low-fade", labelTh: "รองทรงต่ำ", prompt: "Low fade haircut, clean and professional", descTh: "ทรงเรียบร้อยใช้งานได้กว้าง" },
        { id: "high-fade", labelTh: "รองทรงสูง", prompt: "High fade haircut, modern and sharp", descTh: "ลุคคมชัด ทันสมัย" },
        { id: "undercut", labelTh: "เปิดข้าง", prompt: "Undercut hairstyle, trendy and stylish", descTh: "ลุคโมเดิร์นชัดเจน" },
        { id: "side-part", labelTh: "แสกข้างคลาสสิก", prompt: "Classic side part hairstyle, well-groomed professional", descTh: "ทรงสุภาพสำหรับงานสมัครงานและภาพทางการ" },
        { id: "two-block", labelTh: "ทูบล็อคเกาหลี", prompt: "Korean two-block hairstyle, modern K-pop style", descTh: "ลุคเกาหลีร่วมสมัย" }
    ],
    female: [
        { id: "keep-original", labelTh: "คงทรงเดิม", prompt: "Keep the exact hairstyle from the original image", descTh: "ใช้ทรงผมจากภาพต้นฉบับ" },
        { id: "long-straight", labelTh: "ผมยาวตรง", prompt: "Long straight hair, sleek and elegant", descTh: "ผมยาวเรียบตรง ดูสง่างาม" },
        { id: "wavy", labelTh: "ผมลอน", prompt: "Soft wavy hair, elegant and feminine", descTh: "ลอนนุ่ม เหมาะกับลุคสวยหวาน" },
        { id: "short-bob", labelTh: "ผมบ๊อบสั้น", prompt: "Short bob haircut, modern professional style", descTh: "ผมบ๊อบคมสะอาด ดูมืออาชีพ" },
        { id: "updo", labelTh: "รวบผม", prompt: "Professional updo hairstyle, ponytail or bun", descTh: "รวบผมให้ดูเรียบร้อยและเป็นทางการ" },
        { id: "bangs", labelTh: "ทรงผมมีหน้าม้า", prompt: "Hairstyle with bangs, youthful and cute", descTh: "หน้าม้าแบบสุภาพ ลุคสดใส" }
    ]
};

export const LIGHTING_LIBRARY_SOURCE = [
    { id: "flat", labelTh: "แสงแบน", value: "Flat lighting, even illumination across face, minimizes shadows and wrinkles", descTh: "แสงกระจายสม่ำเสมอ ลดเงาและริ้วรอย" },
    { id: "butterfly", labelTh: "บัตเตอร์ฟลาย", value: "Butterfly lighting (Paramount), light directly above camera creates butterfly-shaped shadow under nose, glamorous Hollywood style", descTh: "แสงจากด้านบน สร้างเงาใต้จมูกแบบฮอลลีวูด" },
    { id: "loop", labelTh: "ลูปไลท์", value: "Loop lighting, small shadow on opposite side of nose, most common portrait lighting", descTh: "แสงพอร์ตเทรตยอดนิยม ใช้งานง่าย" },
    { id: "rembrandt", labelTh: "เรมบรันท์", value: "Rembrandt lighting, triangle of light on cheek opposite to light source, dramatic and artistic", descTh: "แสงสามเหลี่ยมบนแก้ม ดูมีมิติแบบงานศิลป์" },
    { id: "split", labelTh: "สปลิทไลท์", value: "Split lighting, half face illuminated half in shadow, dramatic moody effect", descTh: "หน้าครึ่งสว่างครึ่งมืด ดราม่าชัด" },
    { id: "rim", labelTh: "ริมไลท์", value: "Rim lighting (edge light), light from behind creates glowing outline around subject", descTh: "แสงขอบช่วยแยกตัวแบบจากฉากหลัง" },
    { id: "studio-softbox", labelTh: "ซอฟท์บ็อกซ์", value: "Professional softbox lighting, soft diffused light, clean studio look", descTh: "แสงนุ่มกระจาย สไตล์สตูดิโอสะอาด" },
    { id: "studio-beauty", labelTh: "บิวตี้ดิช", value: "Beauty dish lighting, slightly harder than softbox, creates contrasty glamour look", descTh: "ลุค beauty/fashion คมขึ้นกว่าซอฟท์บ็อกซ์" },
    { id: "high-key", labelTh: "ไฮคีย์", value: "High key lighting, bright and airy with minimal shadows, clean professional portraits", descTh: "สว่างโปร่ง เหมาะกับภาพทางการ" },
    { id: "low-key", labelTh: "โลว์คีย์", value: "Low key lighting, dark background with dramatic shadows, artistic moody portraits", descTh: "คุมอารมณ์เข้มและลึก" },
    { id: "natural-window", labelTh: "แสงหน้าต่าง", value: "Natural window light, soft directional daylight, organic and flattering", descTh: "แสงธรรมชาตินุ่ม ดูจริง" },
    { id: "golden-hour", labelTh: "โกลเด้นฮาวร์", value: "Golden hour lighting, warm orange sunset or sunrise light, romantic and dreamy", descTh: "โทนอุ่นโรแมนติกแบบช่วงเย็น" },
    { id: "overcast", labelTh: "แสงวันครึ้ม", value: "Overcast daylight, giant softbox effect, even soft lighting with no harsh shadows", descTh: "นุ่มและสม่ำเสมอ ไม่มีเงาแข็ง" },
    { id: "neon", labelTh: "นีออน", value: "Colorful neon lighting, vibrant pink, blue, and purple gels, trendy modern aesthetic", descTh: "แสงสีจัด เหมาะงานครีเอทีฟ" },
    { id: "cinematic", labelTh: "ซีนีมาติก", value: "Cinematic lighting, motivated practical lights, film-like dramatic atmosphere", descTh: "แสงสไตล์หนัง มีอารมณ์ชัด" },
    { id: "clamshell", labelTh: "แคลมเชลล์", value: "Clamshell lighting, two lights above and below face, beauty and fashion standard", descTh: "มาตรฐานงานบิวตี้และแฟชั่น" }
];

export const POSE_LIBRARY_SOURCE = [
    { id: "straight", labelTh: "หน้าตรง", value: "Straight professional posture, facing camera directly, neutral expression", descTh: "ท่าหน้าตรงมาตรฐาน" },
    { id: "slight-angle", labelTh: "หันข้าง 45 องศา", value: "Slight 45 degree angle to the body, natural professional look", descTh: "หันข้างเล็กน้อย ดูธรรมชาติ" },
    { id: "arms-crossed", labelTh: "กอดอก", value: "Arms crossed pose, confident professional appearance", descTh: "เสริมลุคมั่นใจเป็นผู้ใหญ่" }
];

export const MALE_GROOMING_SOURCE = [
    { id: "natural-skin", labelTh: "ผิวธรรมชาติ", value: "Natural clear skin with visible pores, healthy and authentic appearance", descTh: "ผิวใสธรรมชาติ เห็นรูขุมขน ดูสุขภาพดี" },
    { id: "smooth-skin", labelTh: "ผิวเนียนเรียบ", value: "Smooth clear skin, reduced blemishes and imperfections", descTh: "ลดรอยตำหนิแต่ยังดูจริง" },
    { id: "matte-finish", labelTh: "ผิวแมตต์", value: "Matte skin finish, no shine or oiliness, professional appearance", descTh: "ลดความมัน เหมาะภาพสมัครงาน" },
    { id: "defined-jaw", labelTh: "กรามชัด", value: "Defined jawline, masculine chiseled look", descTh: "เพิ่มความคมของกรอบหน้า" },
    { id: "slim-face", labelTh: "หน้าเรียว", value: "Slimmer face shape, refined facial contours", descTh: "คุมหน้าให้ดูได้รูปขึ้น" },
    { id: "cheekbones", labelTh: "โหนกแก้มชัด", value: "Enhanced cheekbone definition, structured face", descTh: "เพิ่มมิติใบหน้า" },
    { id: "no-eyebags", labelTh: "ลดถุงใต้ตา", value: "Reduced under-eye bags and dark circles, fresh rested appearance", descTh: "ช่วยให้หน้าดูสดขึ้น" },
    { id: "bright-eyes-m", labelTh: "ตาสดใส", value: "Bright clear eyes, alert and energetic look", descTh: "เปิดดวงตาให้ดูมีพลัง" },
    { id: "clean-shaven", labelTh: "โกนหนวดเกลี้ยง", value: "Clean shaven face, neat professional look", descTh: "ลุคสุภาพเรียบร้อย" },
    { id: "stubble", labelTh: "เคราครึ่งวัน", value: "Light stubble beard, rugged masculine appearance", descTh: "ลุคผู้ชายเข้มแบบพอดี" },
    { id: "groomed-brows", labelTh: "คิ้วเป็นทรง", value: "Well-groomed eyebrows, clean and shaped", descTh: "เก็บคิ้วให้ภาพดูสะอาด" }
];

export const FEMALE_MAKEUP_SOURCE = [
    { id: "natural-polish", labelTh: "ธรรมชาติเนียน", value: "Natural polished skin, minimal enhancement, clean modern look for corporate brands", descTh: "ผิวเนียนธรรมชาติ แต่งน้อย" },
    { id: "dewy-glow", labelTh: "ผิวฉ่ำโกลว์", value: "Dewy glowing skin, healthy luminous finish, fresh youthful appearance", descTh: "ผิวฉ่ำสดใส ดูสุขภาพดี" },
    { id: "matte-flawless", labelTh: "แมตต์ไร้ที่ติ", value: "Matte flawless base, smooth poreless finish, classic beauty look", descTh: "ผิวแมตต์สวยเรียบ" },
    { id: "glass-skin", labelTh: "ผิวกระจก K-beauty", value: "Korean glass skin effect, ultra-luminous translucent appearance", descTh: "ลุคผิวใสแบบเกาหลี" },
    { id: "v-shape", labelTh: "หน้าเรียว V-shape", value: "V-shape face contour, slim elegant jawline, Korean beauty standard", descTh: "คอนทัวร์หน้าเรียวชัด" },
    { id: "sculpted-cheeks", labelTh: "โหนกแก้มมีมิติ", value: "Sculpted cheekbones, defined facial structure, model-like contour", descTh: "เพิ่มมิติแบบนางแบบ" },
    { id: "soft-contour", labelTh: "คอนทัวร์อ่อนโยน", value: "Soft natural contour, subtle dimension without harsh lines", descTh: "คอนทัวร์นุ่ม ไม่หนักหน้า" },
    { id: "bright-eyes", labelTh: "ตาโตสดใส", value: "Bright enlarged eyes, youthful doll-like appearance", descTh: "เปิดตาให้สดใส" },
    { id: "smoky-eyes", labelTh: "สโมกี้อาย", value: "Smoky eye makeup, sultry dramatic look with blended shadows", descTh: "ลุคตาเข้มดราม่า" },
    { id: "cat-eye", labelTh: "อายไลเนอร์ปีกนก", value: "Cat eye liner, winged eyeliner look, elegant and classic", descTh: "ลุคคมแบบคลาสสิก" },
    { id: "natural-lashes", labelTh: "ขนตาธรรมชาติ", value: "Natural enhanced lashes, subtle mascara look", descTh: "ขนตางอนเบาๆ" },
    { id: "glam-lashes", labelTh: "ขนตาหนาฟู", value: "Glamorous full lashes, dramatic false lash effect", descTh: "ลุคหรูขึ้นชัดเจน" },
    { id: "nude-lips", labelTh: "ปากสีนู้ด", value: "Nude natural lip color, subtle and professional", descTh: "สีปากสุภาพ ใช้งานกว้าง" },
    { id: "pink-lips", labelTh: "ปากชมพูสดใส", value: "Fresh pink lips, youthful sweet appearance", descTh: "ชมพูสดใส ดูเด็กลง" },
    { id: "red-lips", labelTh: "ปากแดงคลาสสิก", value: "Classic red lips, bold confident glamorous look", descTh: "ปากแดงเด่นชัด" },
    { id: "berry-lips", labelTh: "ปากสีเบอร์รี่", value: "Berry mauve lips, sophisticated and trendy", descTh: "โทนเบอร์รี่ดูทันสมัย" },
    { id: "glossy-lips", labelTh: "ปากวาวกลอสซี่", value: "Glossy plump lips, shiny juicy appearance", descTh: "ลุคปากฉ่ำสะท้อนแสง" }
];

export const MAKEUP_PRESET_SOURCE = [
    { id: "th_makeup_01", level: "NATURAL", th: "ใสสะอาด", en: "Clean Fresh", description: "แต่งเบาบางที่สุด เน้นผิวสะอาดใส เหมาะกับรูปติดบัตรนักเรียน/นักศึกษา", useCases: ["photo_id", "student_id", "passport"], finish: "natural", eyes: "none", blush: "none", lips: "nude_peach", note: "เหมาะกับผู้ที่ต้องการลุคธรรมชาติที่สุด ไม่แต่งหน้าเป็นประจำ" },
    { id: "th_makeup_02", level: "NATURAL", th: "หน้าสด", en: "No-Makeup Makeup", description: "ดูเหมือนไม่แต่ง แต่ผิวดูดีขึ้น คิ้วเรียบร้อย ปากมีสีอมชมพู", useCases: ["photo_id", "job_application", "visa"], finish: "natural", eyes: "none", blush: "peach", lips: "nude_pink", note: "ระวังอย่าให้ผิวขาวเกินจริง ให้ดูเป็นธรรมชาติ" },
    { id: "th_makeup_03", level: "SOFT", th: "นุ่มนวลหวาน", en: "Soft Sweet", description: "แต่งหน้าโทนหวานอ่อนหวาน เน้นความเรียบร้อยสุภาพ", useCases: ["photo_id", "job_application", "graduation"], finish: "semi_matte", eyes: "soft_peach", blush: "soft_pink", lips: "nude_pink", note: "เหมาะกับผู้หญิงวัยทำงาน ดูสุภาพเรียบร้อย" },
    { id: "th_makeup_04", level: "SOFT", th: "เกาหลีอ่อนหวาน", en: "Korean Soft", description: "สไตล์เกาหลีโทนนุ่ม ผิวฉ่ำน้ำ ปากแดงระเรื่อ", useCases: ["photo_id", "job_application", "social_media"], finish: "dewy", eyes: "soft_pink", blush: "peach", lips: "rose", note: "ระวังอย่าให้ผิววาวเกิน ลดความฉ่ำลงสำหรับรูปทางการ" },
    { id: "th_makeup_05", level: "OFFICE", th: "ทำงานมืออาชีพ", en: "Professional Office", description: "แต่งหน้าทำงานเต็มรูปแบบ เน้นความน่าเชื่อถือ ดูเป็นมืออาชีพ", useCases: ["job_application", "corporate_id", "linkedin"], finish: "semi_matte", eyes: "warm_brown", blush: "rose", lips: "rose", note: "เหมาะกับสมัครงานธนาคาร บริษัทใหญ่ หรือตำแหน่งที่ต้องพบลูกค้า" },
    { id: "th_makeup_06", level: "OFFICE", th: "สุภาพทางการ", en: "Formal Elegance", description: "แต่งหน้าสุภาพทางการ เน้นความสะอาดเรียบร้อย โทนสีสุขุม", useCases: ["job_application", "government_id", "interview"], finish: "matte", eyes: "taupe", blush: "soft_pink", lips: "brick", note: "เหมาะกับสมัครงานราชการหรือองค์กรทางการ" },
    { id: "th_makeup_07", level: "GLAM", th: "จัดเต็มสวย", en: "Full Glam", description: "แต่งหน้าจัดเต็มแต่ยังเหมาะกับรูปทางการ เน้นตาสวย ปากชัด", useCases: ["graduation", "executive_portrait", "formal_event"], finish: "semi_matte", eyes: "warm_brown", blush: "rose", lips: "red", note: "ระวังอย่าให้คอนทัวร์หนักเกิน และ face slim ไม่ควรเกินจริง" },
    { id: "th_makeup_08", level: "GLAM", th: "หรูหรามั่นใจ", en: "Confident Luxe", description: "แต่งหน้าหรูดูแพง สำหรับรูปติดบัตรผู้บริหาร หรือโปรไฟล์ทางการ", useCases: ["executive_portrait", "linkedin", "professional_headshot"], finish: "matte", eyes: "taupe", blush: "coral", lips: "brick", note: "เน้นความมั่นใจ ดูเป็นผู้นำ แต่ยังคงความเป็นธรรมชาติ" },
    { id: "th_makeup_09", level: "NATURAL", th: "ผู้ชายเรียบร้อย", en: "Men's Groomed", description: "สำหรับผู้ชาย เน้นผิวสะอาด ลดรอยสิว คิ้วเรียบร้อย", useCases: ["photo_id", "job_application", "passport", "visa"], finish: "natural", eyes: "none", blush: "none", lips: "nude_peach", note: "สำหรับผู้ชาย อย่าให้ผิวเนียนเกินไป ให้ดูเป็นธรรมชาติ" },
    { id: "th_makeup_10", level: "SOFT", th: "นักศึกษาสดใส", en: "Fresh Graduate", description: "เหมาะกับนักศึกษาจบใหม่ ดูสดใสกระตือรือร้น แต่ยังสุภาพ", useCases: ["graduation", "job_application", "student_id"], finish: "semi_matte", eyes: "soft_peach", blush: "coral", lips: "nude_pink", note: "เน้นความสดใสตามวัย อย่าให้ดูแก่เกินไป" }
];

export const EXTRA_SPECIAL_DATA = [
    {
        category: "👔 ชุดทางการชายจาก ZIP",
        color: "slate",
        icon: "👔",
        items: [
            { id: "zip-male-classic", label: "สูทคลาสสิก", prompt: "Clothing: Classic business suit with tie, professional appearance." },
            { id: "zip-male-blazer", label: "เบลเซอร์ผู้ชาย", prompt: "Clothing: Smart casual blazer with shirt." },
            { id: "zip-male-dress-shirt", label: "เชิ้ตทำงานผู้ชาย", prompt: "Clothing: Crisp dress shirt, professional look." },
            { id: "zip-male-oxford", label: "เชิ้ตออกซ์ฟอร์ด", prompt: "Clothing: Oxford button-down shirt, smart casual." },
            { id: "zip-male-turtleneck", label: "เสื้อคอเต่าผู้ชาย", prompt: "Clothing: Elegant turtleneck sweater, sophisticated look." },
            { id: "zip-male-sweater", label: "สเวตเตอร์ผู้ชาย", prompt: "Clothing: Clean sweater, smart casual appearance." }
        ]
    },
    {
        category: "👩‍💼 ชุดทางการหญิงจาก ZIP",
        color: "rose",
        icon: "👩‍💼",
        items: [
            { id: "zip-female-shirt", label: "เชิ้ตทำงานผู้หญิง", prompt: "Clothing: Crisp white dress shirt for women, professional and clean look." },
            { id: "zip-female-biz-suit", label: "สูททำงานผู้หญิง", prompt: "Clothing: Professional women's business suit, elegant and formal." },
            { id: "zip-female-blazer", label: "เบลเซอร์ผู้หญิง", prompt: "Clothing: Elegant blazer with professional blouse." },
            { id: "zip-female-blouse", label: "เบลาส์ทำงาน", prompt: "Clothing: Professional work blouse, clean and formal." },
            { id: "zip-female-dress", label: "เดรสสุภาพ", prompt: "Clothing: Modest formal dress, professional and elegant." },
            { id: "zip-female-turtleneck", label: "เสื้อคอเต่าผู้หญิง", prompt: "Clothing: Elegant turtleneck, sophisticated professional look." }
        ]
    },
    {
        category: "🏛️ เครื่องแบบชายจาก ZIP",
        color: "amber",
        icon: "🏛️",
        items: [
            { id: "zip-male-govt", label: "ข้าราชการพลเรือนชาย", prompt: "Clothing: Thai government official uniform, khaki color, formal with badges." },
            { id: "zip-male-white-formal", label: "ปกติขาวชาย", prompt: "Clothing: Thai formal white uniform, official ceremony attire." },
            { id: "zip-male-safari", label: "ชุดซาฟารีชาย", prompt: "Clothing: Safari suit uniform, official casual." },
            { id: "zip-male-police", label: "ตำรวจชาย", prompt: "Clothing: Thai police officer uniform, formal with insignia." },
            { id: "zip-male-rotc", label: "นักศึกษาวิชาทหาร", prompt: "Clothing: Thai ROTC student military training uniform." },
            { id: "zip-male-vhv", label: "เสื้อ อสม. ชาย", prompt: "Clothing: Thai Village Health Volunteer uniform shirt with official circular badge patch on chest pocket, short sleeve button-up shirt with collar." }
        ]
    },
    {
        category: "🏛️ เครื่องแบบหญิงจาก ZIP",
        color: "emerald",
        icon: "🏛️",
        items: [
            { id: "zip-female-govt", label: "ข้าราชการพลเรือนหญิง", prompt: "Clothing: Thai government official uniform for women, formal with badges." },
            { id: "zip-female-white-formal", label: "ปกติขาวหญิง", prompt: "Clothing: Thai formal white uniform for women, ceremony attire." },
            { id: "zip-female-police", label: "ตำรวจหญิง", prompt: "Clothing: Thai police officer uniform for women, formal." },
            { id: "zip-female-nurse", label: "พยาบาล", prompt: "Clothing: Professional nurse uniform, clean and white." },
            { id: "zip-female-vhv", label: "เสื้อ อสม. หญิง", prompt: "Clothing: Thai Village Health Volunteer uniform shirt with official circular badge patch on chest pocket, short sleeve button-up shirt with collar." }
        ]
    },
    {
        category: "🇹🇭 ชุดไทย / ไว้อาลัยจาก ZIP",
        color: "rose",
        icon: "🇹🇭",
        items: [
            { id: "zip-royal-thai", label: "เสื้อพระราชทาน", prompt: "Clothing: Thai royal grant shirt (Suea Phra Ratchathan), formal Thai style." },
            { id: "zip-mandarin", label: "เสื้อคอจีน", prompt: "Clothing: Mandarin collar shirt, elegant Asian style." },
            { id: "zip-chitlada", label: "ชุดไทยจิตรลดา", prompt: "Clothing: Thai Chitlada traditional dress, elegant formal Thai attire." },
            { id: "zip-memorial-m-black", label: "สูทดำไว้ทุกข์ชาย", prompt: "Clothing: Formal black mourning suit for men, solemn appearance." },
            { id: "zip-memorial-m-white", label: "เชิ้ตขาวไว้ทุกข์ชาย", prompt: "Clothing: Formal white dress shirt for mourning ceremony." },
            { id: "zip-memorial-f-thai", label: "ชุดไทยดำไว้ทุกข์หญิง", prompt: "Clothing: Black Thai traditional mourning dress for women." },
            { id: "zip-memorial-f-suit", label: "สูทดำไว้ทุกข์หญิง", prompt: "Clothing: Formal black mourning suit for women." },
            { id: "zip-memorial-f-lace", label: "เสื้อลูกไม้ดำ", prompt: "Clothing: Elegant black lace blouse for mourning ceremony." }
        ]
    },
    {
        category: "🌆 ฉากเสริมจาก ZIP",
        color: "cyan",
        icon: "🌆",
        items: [
            { id: "zip-bg-sky-1", label: "ฟ้าไล่สี 1", prompt: "Background: Bright clean sky blue to light cyan gradient background, smooth transition from vivid blue at top to pale sky blue at bottom, professional studio quality." },
            { id: "zip-bg-blue", label: "น้ำเงินสตูดิโอ", prompt: "Background: Professional studio dark blue gradient background." },
            { id: "zip-bg-sea", label: "ฟ้าน้ำทะเล", prompt: "Background: Studio sea blue gradient background, clean." },
            { id: "zip-bg-light-blue", label: "ฟ้าอ่อนไล่สี", prompt: "Background: Light blue studio gradient background, clean." },
            { id: "zip-bg-office", label: "ออฟฟิศสมัยใหม่", prompt: "Background: Modern office background with blurred depth of field." },
            { id: "zip-bg-library", label: "ห้องสมุด", prompt: "Background: Professional library background with bookshelves, academic feel." },
            { id: "zip-bg-cyberpunk", label: "เมืองโลกอนาคต", prompt: "Background: Futuristic cyberpunk city background with neon lights." },
            { id: "zip-bg-fantasy", label: "ป่าแฟนตาซี", prompt: "Background: Magical fantasy forest background with ethereal lighting." }
        ]
    },
    {
        category: "🕊️ ฉากงานพิธี / เมมโมเรียล",
        color: "emerald",
        icon: "🕊️",
        items: [
            { id: "zip-bg-mem-sky", label: "ฟ้าขาวไล่สี", prompt: "Background: Soft sky to white gradient, peaceful memorial background." },
            { id: "zip-bg-mem-white", label: "ขาวล้วนงานพิธี", prompt: "Background: Pure white background, clean and solemn." },
            { id: "zip-bg-mem-thep", label: "ลายเทพพนม", prompt: "Background: Thai Thep Panom angel pattern background, spiritual." },
            { id: "zip-bg-mem-mountain", label: "วิวภูเขาและหมอก", prompt: "Background: Misty mountain view background, peaceful and serene." },
            { id: "zip-bg-mem-flowers", label: "ประดับดอกไม้ขาว", prompt: "Background: White flowers decoration background, memorial ceremony." }
        ]
    }
];

export const EXTRA_LIBRARY_DATA = [
    {
        title: "💡 Lighting / แสง",
        color: "amber",
        items: LIGHTING_LIBRARY_SOURCE.map(item => ({
            en: `Lighting: ${item.value}.`,
            th: `${item.labelTh} — ${item.descTh}`
        }))
    },
    {
        title: "🧍 Pose / ท่าทาง",
        color: "blue",
        items: POSE_LIBRARY_SOURCE.map(item => ({
            en: `Pose: ${item.value}.`,
            th: `${item.labelTh} — ${item.descTh}`
        }))
    },
    ...Object.entries(HAIRSTYLE_GROUPS).map(([groupKey, items]) => ({
        title: {
            boy: "✂️ Hair / เด็กชาย",
            girl: "✂️ Hair / เด็กหญิง",
            male: "✂️ Hair / ผู้ชาย",
            female: "✂️ Hair / ผู้หญิง"
        }[groupKey],
        color: {
            boy: "blue",
            girl: "rose",
            male: "indigo",
            female: "purple"
        }[groupKey],
        items: items
            .filter(item => item.id !== "keep-original")
            .map(item => ({
                en: `Hair/Hairstyle: ${item.prompt}.`,
                th: `${item.labelTh} — ${item.descTh}`
            }))
    })),
    {
        title: "🧔 Grooming / ผู้ชาย",
        color: "indigo",
        items: MALE_GROOMING_SOURCE.map(item => ({
            en: `Makeup/Grooming: ${item.value}.`,
            th: `${item.labelTh} — ${item.descTh}`
        }))
    },
    {
        title: "💄 Makeup / ผู้หญิง",
        color: "rose",
        items: FEMALE_MAKEUP_SOURCE.map(item => ({
            en: `Makeup/Retouch: ${item.value}.`,
            th: `${item.labelTh} — ${item.descTh}`
        }))
    },
    {
        title: "💋 Makeup Presets / Preset สำเร็จรูป",
        color: "purple",
        items: MAKEUP_PRESET_SOURCE.map(preset => ({
            en: buildMakeupPresetPrompt(preset),
            th: `${preset.level} • ${preset.th} — ${preset.description}`
        }))
    }
];

export const SPECIAL_DATA_ALL = [...SPECIAL_DATA, ...EXTRA_SPECIAL_DATA];
export const LIBRARY_DATA_ALL = [...LIBRARY_DATA, ...EXTRA_LIBRARY_DATA];

// Yearbook injected as additional special category
import { YEARBOOK_DATA } from "./extraData";
export const SPECIAL_DATA_FULL = [...SPECIAL_DATA_ALL, ...(YEARBOOK_DATA as any)];
