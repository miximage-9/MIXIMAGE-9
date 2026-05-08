// Extra data: document photos, professions, negative chips, output sizes, yearbook

export type DocPhoto = {
  id: string;
  label: string;
  size: string;
  bg: string;
  notes: string;
  prompt: string;
};

export const DOCUMENT_PHOTOS: { category: string; icon: string; items: DocPhoto[] }[] = [
  {
    category: "🇹🇭 เอกสารราชการไทย",
    icon: "🇹🇭",
    items: [
      {
        id: "doc-th-id",
        label: "บัตรประชาชนไทย",
        size: "1.5 × 2 นิ้ว (3.8×5 cm)",
        bg: "ฟ้าอ่อน",
        notes: "เห็นหน้าชัด ไม่ใส่หมวก ไม่ใส่แว่น (ยกเว้นกรณีจำเป็น) แต่งกายสุภาพ",
        prompt: "Create an official Thai national ID card portrait. Subject centered, straight posture, level shoulders, neutral expression with closed mouth, ears visible, no hat, no glasses, no heavy makeup. Background: solid light blue (#7BAEDC), evenly lit, no shadow. Clothing: formal collared shirt, no patterned background. Realistic studio photography, sharp focus, true skin tone, suitable for Thai government ID at 1.5×2 inch (3.8×5 cm) print size, 300 DPI.",
      },
      {
        id: "doc-th-pp",
        label: "พาสปอร์ตไทย",
        size: "2 × 2 นิ้ว (5×5 cm)",
        bg: "ขาวล้วน",
        notes: "หน้าเต็ม 70-80% ของรูป ห้ามยิ้มเห็นฟัน ห้ามใส่แว่น",
        prompt: "Create an official Thai passport photo. Front-facing portrait, head and top of shoulders visible, head occupies 70-80% of frame height, neutral expression with mouth closed, both eyes open and clearly visible, no glasses, no hat, no head covering (unless religious). Background: pure white seamless, no shadow on face or background. Even diffused lighting, realistic skin tone, sharp focus. Output 2×2 inch (5×5 cm), 300 DPI, ICAO compliant.",
      },
      {
        id: "doc-th-dl",
        label: "ใบขับขี่",
        size: "1 × 1.25 นิ้ว",
        bg: "ขาว",
        notes: "หน้าตรง ไม่ใส่หมวก",
        prompt: "Create a Thai driver's license portrait. Centered front-facing head and shoulders, neutral closed-mouth expression, no hat, no glasses, both ears visible. Plain white background, even lighting, realistic skin tone, professional studio photography. Output 1×1.25 inch, 300 DPI.",
      },
      {
        id: "doc-th-job",
        label: "รูปสมัครงาน",
        size: "1, 1.5, 2 นิ้ว",
        bg: "ฟ้า / ขาว",
        notes: "ยิ้มน้อยได้ แต่งหน้าเรียบร้อย สูทหรือเชิ้ตขาว",
        prompt: "Create a professional Thai job-application portrait. Subject centered, straight posture, gentle confident closed-lip smile, formal business attire (white shirt or suit with tie). Background: clean gradient blue or pure white studio backdrop. Soft studio lighting, polished retouching, sharp focus, premium professional finish. Available print sizes: 1, 1.5, 2 inch at 300 DPI.",
      },
    ],
  },
  {
    category: "🌏 วีซ่าต่างประเทศ",
    icon: "🌏",
    items: [
      {
        id: "doc-us",
        label: "วีซ่าอเมริกา (US Visa / DV Lottery)",
        size: "2 × 2 นิ้ว (51×51 mm)",
        bg: "ขาวล้วน",
        notes: "ห้ามยิ้มเห็นฟัน ห้ามใส่แว่น หน้า 50-69% ของรูป",
        prompt: "Create a US visa / DV lottery portrait per US Department of State requirements. Square 2×2 inch (51×51 mm), head height 1 to 1-3/8 inch (50-69% of image), front-facing, neutral expression with mouth closed, no smile showing teeth, both eyes open, no glasses, no hat or head covering (unless religious). Background: pure white or off-white, no shadows. Natural even lighting, realistic skin tone, sharp focus, recent (within 6 months) appearance. 300 DPI.",
      },
      {
        id: "doc-schengen",
        label: "วีซ่าเชงเก้น (Schengen)",
        size: "35 × 45 mm",
        bg: "เทาอ่อน / ขาว",
        notes: "หน้า 70-80% ของรูป มองตรง ปากปิด",
        prompt: "Create a Schengen visa portrait per ICAO standard. Size 35×45 mm, head height 32-36 mm (70-80% of image), front-facing, neutral expression with closed mouth, both eyes clearly visible looking straight at camera, no glasses, no hat. Background: light gray or off-white, no shadow. Even diffused lighting, realistic skin tone, sharp focus. 300 DPI.",
      },
      {
        id: "doc-japan",
        label: "วีซ่าญี่ปุ่น (Japan Visa)",
        size: "45 × 45 mm",
        bg: "ขาว / ฟ้าอ่อน",
        notes: "ภายใน 6 เดือน หน้าตรง ปากปิด",
        prompt: "Create a Japan visa portrait. Size 45×45 mm, front-facing, head and top of shoulders, head height 27-32 mm, neutral closed-mouth expression, both eyes open, no glasses preferred, no hat. Background: pure white or very light blue, no shadow. Soft even lighting, realistic skin tone, sharp focus. 300 DPI.",
      },
      {
        id: "doc-china",
        label: "วีซ่าจีน (China Visa)",
        size: "33 × 48 mm",
        bg: "ขาวล้วน",
        notes: "ห้ามใส่แว่น ห้ามมีเงา ห้ามใส่ชุดขาว",
        prompt: "Create a China visa portrait per Chinese Embassy requirements. Size 33×48 mm, front-facing, full face and ears visible, head height 28-33 mm, neutral closed-mouth expression, no glasses, no hat. Background: pure white seamless, no shadow on background or face. Subject must wear dark or colored clothing (not white). Even lighting, realistic skin tone, sharp focus. 300 DPI.",
      },
      {
        id: "doc-uk",
        label: "วีซ่าอังกฤษ (UK Visa)",
        size: "45 × 35 mm",
        bg: "เทาอ่อน / ครีม",
        notes: "หน้าตรง ไม่ยิ้ม",
        prompt: "Create a UK visa portrait per UKVI requirements. Size 45×35 mm, front-facing, head and shoulders, neutral closed-mouth expression, no glasses, no hat (unless religious), no other people or objects in frame. Background: light gray or cream, plain and uniform with no shadow. Even diffused lighting, realistic skin tone, sharp focus, taken within last month appearance. 300 DPI.",
      },
    ],
  },
];

export type Profession = { id: string; label: string; prompt: string };

export const PROFESSIONS: { category: string; icon: string; items: Profession[] }[] = [
  {
    category: "🏥 สายการแพทย์",
    icon: "🏥",
    items: [
      { id: "pro-doctor", label: "หมอ / แพทย์", prompt: "Change clothing to a professional Thai doctor's outfit: long white medical lab coat over a light blue button-up shirt with stethoscope around the neck, hospital ID badge clipped to coat. Clean, authoritative, modern medical professional appearance, realistic fabric, sharp focus." },
      { id: "pro-nurse-f", label: "พยาบาลหญิง (ชุดขาว+หมวก)", prompt: "Change clothing to a traditional Thai female nurse uniform: crisp white short-sleeved nurse dress with white nurse cap (with single black band), name pin, white. Realistic fabric texture, formal hospital setting, dignified and professional." },
      { id: "pro-nurse-m", label: "พยาบาลชาย", prompt: "Change clothing to a Thai male nurse scrub uniform: clean white or light blue medical scrub top and pants, hospital ID badge, neat professional appearance, realistic fabric." },
      { id: "pro-dentist", label: "ทันตแพทย์", prompt: "Change clothing to a dental professional outfit: white medical coat over light scrubs, surgical loupes around neck, professional and clean clinical look." },
    ],
  },
  {
    category: "👮 สายราชการ-ความมั่นคง",
    icon: "👮",
    items: [
      { id: "pro-police", label: "ตำรวจไทย (เครื่องแบบสีกากี)", prompt: "Change clothing to a Thai Royal Police uniform: khaki short-sleeved shirt with shoulder epaulettes, rank insignia, name tag, badge on chest, neat collar, realistic fabric texture, authoritative and professional." },
      { id: "pro-police-formal", label: "ตำรวจเครื่องแบบเต็มยศ", prompt: "Change clothing to a formal Thai police ceremonial uniform: dark navy/black with gold trim, full rank insignia, medals, gold buttons, white belt, dignified ceremonial appearance." },
      { id: "pro-soldier-bdu", label: "ทหาร (ชุดสนาม BDU)", prompt: "Change clothing to a Thai army field combat uniform (BDU): digital camouflage pattern shirt with name tape, rank patch, unit patch, structured collar, realistic combat fabric texture." },
      { id: "pro-soldier-formal", label: "ทหารเต็มยศ", prompt: "Change clothing to a formal Thai military full dress uniform: dark olive or white ceremonial jacket with gold buttons, full rank insignia on shoulders, medals on chest, white gloves, dignified parade appearance." },
      { id: "pro-civil", label: "ข้าราชการพลเรือน (ปกติขาว)", prompt: "Change clothing to a Thai civil servant white formal uniform (Ratchapataen style): high-collar white jacket with five gold buttons, gold rank insignia, dignified formal government portrait look, crisp realistic fabric." },
    ],
  },
  {
    category: "✈️ สายบริการ",
    icon: "✈️",
    items: [
      { id: "pro-flight-f", label: "แอร์โฮสเตส", prompt: "Change clothing to a Thai flight attendant uniform: traditional purple/magenta Thai silk blazer dress with gold trim and signature scarf, sleek hairstyle bun, professional airline crew appearance, polished and elegant." },
      { id: "pro-flight-m", label: "พนักงานต้อนรับชาย / นักบิน", prompt: "Change clothing to an airline pilot uniform: dark navy double-breasted jacket with gold stripes on cuffs, white shirt, black tie, gold wings pin on chest, captain's hat optional, authoritative professional aviation look." },
      { id: "pro-bank", label: "พนักงานธนาคาร", prompt: "Change clothing to a Thai bank employee uniform: tailored corporate blazer (navy or burgundy depending on bank) over crisp white shirt, branded scarf or tie, professional banking attire, polished customer-service appearance." },
      { id: "pro-chef", label: "เชฟ / ผู้บริหารครัว", prompt: "Change clothing to a professional executive chef uniform: double-breasted white chef coat with cloth buttons, tall white toque hat, neckerchief, clean and authoritative culinary appearance, realistic fabric." },
      { id: "pro-barista", label: "บาริสต้า", prompt: "Change clothing to a modern barista outfit: black or denim apron over a fitted t-shirt or button-up, casual-cool café professional look, realistic fabric." },
    ],
  },
  {
    category: "🎓 สายการศึกษา-ศาสนา",
    icon: "🎓",
    items: [
      { id: "pro-teacher-f", label: "ครูหญิง (ชุดข้าราชการ)", prompt: "Change clothing to a Thai female government teacher uniform: tan/khaki ceremonial uniform with black tie, formal blazer, dignified teacher appearance." },
      { id: "pro-teacher-polo", label: "ครูเสื้อโปโลโรงเรียน", prompt: "Change clothing to a Thai school teacher polo shirt: collared school-color polo with embroidered school crest on chest, neat casual-professional teaching attire." },
      { id: "pro-monk", label: "พระสงฆ์ (จีวร)", prompt: "Change clothing to traditional Thai Buddhist monk robes (saffron orange ochre), shoulder-draped style, dignified and serene religious appearance, realistic fabric drape." },
      { id: "pro-novice-naak", label: "นาค (ชุดบวช)", prompt: "Change clothing to a traditional Thai naak ordination outfit: pure white silk shirt and white silk wrap, calm and pure pre-ordination ceremonial appearance, realistic silk fabric." },
    ],
  },
];

export const NEGATIVE_CHIPS = [
  { id: "neg-teeth", label: "ฟันเหลือง/ฟันไม่เรียง", text: "yellow teeth, crooked teeth, bad dental alignment" },
  { id: "neg-eyebag", label: "เงาใต้ตา", text: "dark under-eye circles, eye bags, tired look" },
  { id: "neg-glasses-glare", label: "แว่นสะท้อนแสง", text: "glasses lens glare, reflection on glasses, blocked eyes" },
  { id: "neg-blurry", label: "ขอบภาพเบลอ", text: "blurry edges, soft focus, motion blur, out of focus" },
  { id: "neg-distort", label: "หน้าผิดเพี้ยน", text: "facial distortion, deformed face, asymmetric features, warped anatomy" },
  { id: "neg-oily", label: "ผิวมันเงา", text: "oily shiny skin, plastic skin, over-smoothed skin, wax doll skin" },
  { id: "neg-frizz", label: "ผมหยิกฟู", text: "frizzy hair, flyaway hairs, messy hairline" },
  { id: "neg-bg", label: "พื้นหลังรก", text: "cluttered background, distracting background, busy background, people in background" },
  { id: "neg-text", label: "ข้อความ/ลายน้ำ", text: "text, watermark, logo, signature, captions" },
  { id: "neg-extra", label: "นิ้ว/แขนเกิน", text: "extra fingers, extra limbs, malformed hands, deformed fingers" },
];

export const OUTPUT_SIZES = [
  { id: "size-none", label: "ไม่ระบุ (ค่าเริ่มต้น)", text: "" },
  { id: "size-1", label: "1 นิ้ว (2.5×3 cm)", text: "Output for print at 1 inch (2.5×3 cm), 300 DPI, vertical 5:6 portrait crop." },
  { id: "size-1-5", label: "1.5 นิ้ว (3.5×4.5 cm)", text: "Output for print at 1.5 inch (3.5×4.5 cm), 300 DPI, vertical 7:9 portrait crop." },
  { id: "size-2", label: "2 นิ้ว (5×6 cm)", text: "Output for print at 2 inch (5×6 cm), 300 DPI, vertical 5:6 portrait crop." },
  { id: "size-2sq", label: "2×2 นิ้ว (พาสปอร์ต)", text: "Output for print at 2×2 inch (5×5 cm) square, 300 DPI, ICAO passport composition." },
  { id: "size-4x6", label: "4×6 นิ้ว (โพสการ์ด)", text: "Output for print at 4×6 inch (10×15 cm), 300 DPI, vertical 2:3 portrait." },
  { id: "size-a4", label: "A4 (เต็มแผ่น)", text: "Output for print at A4 (21×29.7 cm), 300 DPI, vertical 2:3 portrait composition." },
];

export const YEARBOOK_DATA = [
  {
    category: "📼 AI Yearbook 90s",
    icon: "📼",
    color: "pink",
    items: [
      { id: "yb-90s-1", label: "Yearbook 90s - แจ็คเก็ตหนัง", prompt: "Transform into a 1990s American high school yearbook portrait. Subject wearing a black leather varsity jacket over a white tee, slightly teased big hair (90s style), bold eyeliner, soft studio lighting with laser-beam blue/purple background, slight film grain and faded color palette. Vintage 90s photo aesthetic." },
      { id: "yb-90s-2", label: "Yearbook 90s - เสื้อสเวตเตอร์", prompt: "Transform into a 1990s yearbook portrait wearing a chunky pastel cable-knit sweater over a white collared shirt. Soft pastel cloud background (pink/blue), feathered 90s hairstyle, soft glamour-shot lighting, gentle film grain, vintage saturated 90s color." },
      { id: "yb-y2k", label: "Y2K 2000s aesthetic", prompt: "Transform into an early 2000s Y2K portrait: shiny metallic top, frosted lipstick, butterfly clips in straight glossy hair, holographic chrome silver background, futuristic Y2K studio lighting, slight motion-blur effect, nostalgic Y2K aesthetic." },
      { id: "yb-thai-80s", label: "รูปรุ่นไทย ยุค 80s", prompt: "Transform into a vintage 1980s Thai school portrait. Subject wearing classic Thai school uniform with subtly puffed sleeves, soft warm tungsten studio lighting, faded warm color palette with slight magenta cast, vintage Thai studio backdrop (light blue or beige), grainy film texture, nostalgic vintage Thai photo aesthetic." },
      { id: "yb-thai-2000s", label: "รูปรุ่นไทย ยุค 2000s", prompt: "Transform into an early 2000s Thai school graduation portrait. Subject in formal student attire, classic blue gradient studio backdrop, slightly soft lens, warm color tones, mild film grain, nostalgic Thai studio photography from the early 2000s era." },
    ],
  },
];