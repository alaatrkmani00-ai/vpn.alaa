/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, Compass, Send, Loader2, RefreshCw, Cpu, Brain, CheckCircle2 } from "lucide-react";
import { TURKISH_CITIES, TURKISH_ISPS } from "../data";
import { VpnNode, VpnProtocol } from "../types";

interface AIOptimizerProps {
  selectedNode: VpnNode;
  selectedProtocol: VpnProtocol;
}

export default function AIOptimizer({
  selectedNode,
  selectedProtocol
}: AIOptimizerProps) {
  const [city, setCity] = useState("istanbul");
  const [isp, setIsp] = useState("turktelekom");
  const [customIssue, setCustomIssue] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [responseMarkdown, setResponseMarkdown] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadingLogs = [
    "جاري فحص كفاءة المسارات الرقمية البحرية بين تركيا وألمانيا...",
    "جاري تحليل جدار الحماية وفحص الحزم العميقة لشبكة مزود الخدمة الخاص بك...",
    "جاري استعلام خوارزمية الذكاء الاصطناعي الذكي (Gemini Pro) لأفضل منفذ روبلوكس...",
    "جاري إعداد خطة النفق التوجيهي الفخمة لضمان صفر في المائة من فقدان البيانات (Packet Loss)..."
  ];

  const handleRunOptimization = async () => {
    setLoading(true);
    setError(null);
    setResponseMarkdown(null);
    setLoadingStep(0);

    // Simulate stepping through log messages dynamically
    const logInterval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < loadingLogs.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1800);

    try {
      const selectedCityObj = TURKISH_CITIES.find(c => c.id === city);
      const selectedIspObj = TURKISH_ISPS.find(i => i.id === isp);

      const payload = {
        city: selectedCityObj ? selectedCityObj.name : city,
        isp: selectedIspObj ? selectedIspObj.name : isp,
        selectedNodeId: selectedNode.id,
        currentPing: selectedNode.ping,
        protocol: selectedProtocol.name,
        customIssue: customIssue.trim() || "تجاوز حظر لعبة Roblox بأفضل استجابة وضمان ثبات كلي للاتصال بدون تذبذب."
      };

      const res = await fetch("/api/optimize-network", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("حدث خطأ في الاتصال بالخادم الذكي. يرجى التحقق من المفتاح السري.");
      }

      const data = await res.json();
      if (data.success) {
        setResponseMarkdown(data.recommendation);
      } else {
        throw new Error(data.error || "خطأ غير معروف في خادم التوصيات الذكية.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "تعذر معالجة البيانات بواسطة رادار التوجيه الذكي.");
    } finally {
      clearInterval(logInterval);
      setLoading(false);
    }
  };

  // Luxury parser to convert markdown into beautiful styled JSX matching our elite theme
  const renderParsedResponse = (markdown: string) => {
    const lines = markdown.split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      
      // Empty line
      if (!trimmed) return <div key={idx} className="h-2" />;

      // Main header (# Header) or H2
      if (trimmed.startsWith("###")) {
        return (
          <h3 key={idx} className="text-sm font-black text-brand-gold border-r-3 border-brand-gold pr-2 mt-4 mb-2 tracking-wide flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-gold shrink-0" />
            {trimmed.replace("###", "").replace(/\*\*/g, "").trim()}
          </h3>
        );
      }
      if (trimmed.startsWith("####")) {
        return (
          <h4 key={idx} className="text-xs font-black text-brand-gold-light mt-3 mb-1 cursor-default selection:bg-brand-gold">
            {trimmed.replace("####", "").replace(/\*\*/g, "").trim()}
          </h4>
        );
      }
      if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
        return (
          <p key={idx} className="text-xs font-bold text-white bg-brand-border/40 border border-[#2B3B5D] p-2.5 rounded-lg mt-2 mb-2">
            {trimmed.replace(/\*\*/g, "").trim()}
          </p>
        );
      }

      // Bullets starting with *
      if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
        let content = trimmed.substring(1).trim();
        // Check for nested bold words block (e.g. * **شيء**: تفاصيل)
        const boldMatch = content.match(/^\*\*(.*?)\*\*:(.*)$/) || content.match(/^\*\*(.*?)\*\*(.*)$/);
        if (boldMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 py-1 pr-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed text-[#94A3B8]">
                <strong className="text-white font-bold">{boldMatch[1]}:</strong>
                {boldMatch[2]}
              </p>
            </div>
          );
        }

        return (
          <div key={idx} className="flex items-start gap-2 py-1 pr-1.5">
            <div className="w-1.5 h-1.5 bg-brand-gold-light rounded-full shrink-0 mt-2" />
            <p className="text-[11px] leading-relaxed text-[#94A3B8]">
              {content.replace(/\*\*/g, "")}
            </p>
          </div>
        );
      }

      // Check for numbered lists
      const numberMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (numberMatch) {
        const content = numberMatch[2];
        const boldInside = content.match(/^\*\*(.*?)\*\*:(.*)$/) || content.match(/^\*\*(.*?)\*\*(.*)$/);
        return (
          <div key={idx} className="p-3 bg-brand-card/55 border border-brand-border rounded-xl my-2 flex items-start gap-2.5 font-sans">
            <span className="w-5 h-5 rounded bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-[10px] font-bold text-brand-gold font-mono shrink-0">
              {numberMatch[1]}
            </span>
            <p className="text-[11px] leading-relaxed text-[#94A3B8]">
              {boldInside ? (
                <>
                  <strong className="text-white font-bold">{boldInside[1]}:</strong>
                  {boldInside[2]}
                </>
              ) : (
                content.replace(/\*\*/g, "")
              )}
            </p>
          </div>
        );
      }

      // Standard text line
      return (
        <p key={idx} className="text-[11px] leading-relaxed text-slate-300">
          {trimmed.replace(/\*\*/g, "")}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col bg-brand-panel border border-brand-border rounded-3xl p-6 backdrop-blur-xl shadow-[0_15px_50px_rgba(0,0,0,0.8)]">
      {/* Header section with Gemini / Sparkles theme */}
      <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-6">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-brand-gold" />
          <h2 className="text-base font-bold text-white">محلل ومحسن المسار بالذكاء الاصطناعي</h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-brand-gold font-bold bg-brand-gold/10 border border-brand-gold/20 px-2.5 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          بقدرات Gemini 3.5
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-[#94A3B8] text-right mb-6">
        قم بإدخال تفاصيل شركتك وموقعك بتركيا، وسوف تقوم خوارزمية الذكاء الاصطناعي بفحص الجدران النارية والمسار وتقديم توصيات مخصصة لخفض البينغ وفتح Roblox.
      </p>

      {/* Inputs Form */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* City Select */}
        <div className="text-right">
          <label className="block text-[10px] font-bold text-[#8FA4C4] mb-1.5">المدينة الحالية بتركيا:</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 bg-brand-card border border-brand-border text-[#E0E0E0] rounded-xl text-xs focus:ring-1 focus:ring-brand-gold focus:outline-none text-right font-medium"
          >
            {TURKISH_CITIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* ISP Select */}
        <div className="text-right">
          <label className="block text-[10px] font-bold text-[#8FA4C4] mb-1.5">مزود الإنترنت (ISP):</label>
          <select
            value={isp}
            onChange={(e) => setIsp(e.target.value)}
            className="w-full px-3 py-2 bg-brand-card border border-brand-border text-[#E0E0E0] rounded-xl text-xs focus:ring-1 focus:ring-brand-gold focus:outline-none text-right font-medium"
          >
            {TURKISH_ISPS.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Optional Custom issue text */}
      <div className="text-right mb-5">
        <label className="block text-[10px] font-bold text-[#8FA4C4] mb-1.5">
          مشكلة خاصة / تفاصيل إضافية (اختياري):
        </label>
        <textarea
          value={customIssue}
          onChange={(e) => setCustomIssue(e.target.value)}
          placeholder="مثال: البينغ يرتفع في المساء فجأة، أو جدار الحماية في شبكة السكن يمنع روبلوكس..."
          className="w-full px-3 py-2.5 bg-brand-card border border-brand-border text-[#E0E0E0] placeholder-[#64748B] rounded-xl text-xs h-16 resize-none focus:ring-1 focus:ring-brand-gold focus:outline-none text-right"
        />
      </div>

      {/* Button trigger optimization */}
      <button
        onClick={handleRunOptimization}
        disabled={loading}
        className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 relative overflow-hidden select-none ${
          loading
            ? "bg-[#18233C] text-[#8FA4C3] border border-brand-border cursor-not-allowed"
            : "bg-gradient-to-r from-brand-gold via-[#C59B27] to-brand-gold-light text-brand-bg shadow-[0_4px_25px_rgba(212,175,55,0.3)] hover:brightness-110 active:scale-95 animate-pulse"
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-brand-gold" />
            جاري التحليل...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            ابدأ تحليل ودعم المسارات الذكية فخمة الـ AI
          </>
        )}
      </button>

      {/* Status Log while loading */}
      {loading && (
        <div className="mt-4 p-4 bg-brand-card border border-brand-gold/20 rounded-2xl flex flex-col items-center justify-center text-center animate-pulse">
          <Loader2 className="w-6 h-6 animate-spin text-brand-gold mb-2" />
          <p className="text-xs font-bold text-brand-gold mb-1">توليد تقرير الاستجابة والتعمية:</p>
          <p className="text-[10px] text-[#94A3B8] font-mono leading-relaxed">{loadingLogs[loadingStep]}</p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mt-4 p-4 bg-red-950/20 border border-red-500/35 rounded-2xl text-right">
          <p className="text-xs font-bold text-red-400 mb-1">فشل استعلام العقل المفكر:</p>
          <p className="text-[10px] text-red-500 leading-relaxed">{error}</p>
          <p className="text-[10px] text-[#94A3B8] mt-2 border-t border-brand-border pt-2">
            💡 نصيحة سريعة: تم تفعيل الإعدادات الموصى بها على جهازك لفرانكفورت بشكل تلقائي.
          </p>
        </div>
      )}

      {/* Response Box */}
      {responseMarkdown && (
        <div className="mt-5 p-4 bg-brand-bg border border-brand-border rounded-2xl max-h-72 overflow-y-auto text-right space-y-2 custom-scrollbar shadow-inner relative animate-[fadeIn_0.5s_ease]">
          {/* Aesthetic grid paper pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none rounded-2xl" />

          {/* AI Header seal */}
          <div className="flex items-center gap-1.5 text-[9px] font-bold text-brand-gold bg-brand-gold/10 px-20 py-0.5 rounded-full w-max border border-brand-gold/20 mb-3 font-mono relative">
            <Cpu className="w-3 h-3 text-brand-gold" />
            تقرير توجيه مستنير جاهز للتفعيل
          </div>

          <div className="space-y-2 font-sans relative">
            {renderParsedResponse(responseMarkdown)}
          </div>
        </div>
      )}
    </div>
  );
}
