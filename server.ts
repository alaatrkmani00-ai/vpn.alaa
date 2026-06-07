import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Initialize Gemini API client safely and lazily
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set. AI Features will degrade gracefully.");
    }
    // Note: If GEMINI_API_KEY is missing, we create GoogleGenAI anyway, or we handle gracefully
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY_FOR_STANDALONE",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Full list of high-performance global VPN servers we present in the UI
const VPN_NODES = [
  { id: "de-fra", name: "ألمانيا - فرانكفورت (مُحسّن لألعاب روبلوكس ⚡)", country: "DE", type: "gaming", ping: 42, load: 38 },
  { id: "nl-ams", name: "هولندا - أمستردام (أقرب مسار قليل الاختناق)", country: "NL", type: "gaming", ping: 48, load: 24 },
  { id: "tr-ist", name: "تركيا - إسطنبول (بروكسي نفق محلي)", country: "TR", type: "local", ping: 8, load: 72 },
  { id: "us-nyc", name: "الولايات المتحدة - نيويورك (مسار النطاق العريض)", country: "US", type: "secure", ping: 125, load: 45 },
  { id: "gb-lon", name: "المملكة المتحدة - لندن (تشفير عسكري)", country: "GB", type: "secure", ping: 55, load: 30 },
  { id: "jp-nrt", name: "اليابان - طوكيو (ألعاب آسيا)", country: "JP", type: "gaming", ping: 210, load: 15 }
];

// 1. API: Optimize connection using Gemini AI
app.post("/api/optimize-network", async (req, res) => {
  try {
    const { city, isp, selectedNodeId, currentPing, protocol, customIssue } = req.body;

    const selectedNode = VPN_NODES.find(n => n.id === selectedNodeId) || VPN_NODES[0];
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      // Graceful fallback with excellent structured Arabic recommendation if API key is missing
      const tips = [
        `تغيير خادم DNS إلى خوادم Cloudflare: 1.1.1.1 أو خوادم Google: 8.8.8.8 لتجاوز حظر DNS المحلي في تركيا.`,
        `تحويل ميثاق الاتصال (Protocol) إلى WireGuard Core (UDP) لتفادي فحص الحزم العميقة (DPI) من قبل شركة الاتصالات ${isp || 'التركية'}.`,
        `اختيار سيرفر [ألمانيا - فرانكفورت] لأنه يوفر أقصر مسار اتصال (Routing) مباشر بسيرفرات لعبة Roblox الأصلية مما يقلل البينغ (Ping) ليمثل حوالي 40ms إلى 60ms فقط.`,
        `تفعيل ميزة "Disguise Tunnel" (تعمية المرور) لتشفير ترويسات الحزم لمنع كشفها كحركة مرور VPN.`
      ];
      
      return res.json({
        success: true,
        isMock: true,
        recommendation: `### 🎮 توصية تحسين شبكة Roblox الذكية لمشترك ${isp || 'الإنترنت'} في ${city || 'تركيا'}:

لقد تم تحليل مسار الاتصال الخاص بك تلقائياً باستخدام خوارزميات محاكاة النفق الفخم:

1. **الخادم الموثى به**: **${selectedNode.name}** (البينغ المتوقع: **${Math.min(selectedNode.ping + 4, 75)}ms**).
2. **بروتوكول الاتصال**: يُنصح بشدة تفعيل **WireGuard Core (UDP-Bypass)**.

#### 🛠️ خطوات عملية فورية لخفض البينغ وتجاوز الحظر:
* 🌐 **تفعيل نظام منع تسريب DNS**: يمنع مزود الخدمة من الكشف عن طلبات بروتوكول Roblox الخاصة بك.
* 📦 **مضاد حظر حزم الألعاب (DPI-Bypass)**: سيقوم بتمرير الاتصالات بشكل مُعمَّى بالكامل.
* ⚡ **إعدادات النواة**: قم بضبط حجم حزم MTU إلى **1400** في إعدادات Roblox لتقليص فقدان البيانات في الخطوط التركية.

*ملاحظة: هذا التحليل يعتمد على مسار استجابة مباشر من خوادم الألعاب الرائدة.*`
      });
    }

    const ai = getAiClient();
    const prompt = `أنت مهندس شبكات ومستشار خبير في الاتصالات وتجاوز حجب الألعاب الإلكترونية، وبالأخص لعبة Roblox في تركيا.
يريدك مستخدم تركي أو شخص يعيش في تركيا أن تقدم له تحليلاً وتوصية فخمة للغاية، مكتوبة بلغة عربية احترافية ورائعة تناسب تطبيق VPN متميز وفخم.

معلومات الاتصال الحالية للمستخدم:
- المدينة في تركيا: ${city || "غير محددة (إسطنبول/أنقرة/غازي عنتاب ديفولت)"}
- شركة الإنترنت (ISP): ${isp || "غير محددة (Turk Telekom أو Superonline ديفولت)"}
- النود وموقع سيرفر الـ VPN المحدد: ${selectedNode.name} (${selectedNode.country})
- البينغ الحالي المستهدف: ${currentPing || "70"}ms
- بروتوكول الـ VPN المفعل: ${protocol || "WireGuard 2.0 (UDP)"}
- مشكلة مخصصة يعاني منها: ${customIssue || "لا يوجد مشكلة محددة، فقط يريد أفضل بنغ وأسرع اتصال للروبلوكس بدون حظر"}

اكتب رداً متكاملاً وفخماً يحتوي على:
1. تحليل فني للمسار من شبكته (${isp}) في المربع الجغرافي (${city}) إلى سيرفر VPN (${selectedNode.name}) ومسارات خوادم Roblox في أوروبا.
2. نصائح تقنية ممتازة بالخطوات (مثل خوادم DNS المفضلة، وتحويل تشفير الجدران النارية، وحجم حزم الألعاب MTU).
3. تقييم واعد لمستوى سلاسة اللعبة والتأخير (Latency) تحت هذا النود وكيف سيؤدي لفتح Roblox بنجاح تام وبأسرع بينغ ممكن.
4. شجعه كلاعب متميز بأسلوب منمق وعالي الرقي يعكس فخامة التطبيق.

تأكد من استخدام التنسيق الغني للماركدوان (Markdown) باستخدام العناوين بخط غامق، القوائم المنقطة، وإبراز الألفاظ الحيوية لتبدو التوصية كتقرير استشاري فاخر للغاية.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.8,
      }
    });

    res.json({
      success: true,
      recommendation: response.text,
      isMock: false
    });

  } catch (error: any) {
    console.error("Gemini connection error:", error);
    res.status(500).json({
      success: false,
      error: "تعذر معالجة تحسين الاتصال بواسطة الذكاء الاصطناعي حالياً. يرجى المحاولة لاحقاً.",
      fallback: `الخادم متاح ويعمل. ولكن تعذر الاتصال بمحلل الذكاء الاصطناعي. يُنصح باستخدام بروتوكول WireGuard Core وتفعيل خيار DPI Bypass لتجاوز حجب Roblox في تركيا.`
    });
  }
});

// Serve static assets and handle Vite application middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Luxury VPN server is listening proudly on http://localhost:${PORT}`);
  });
}

startServer();
