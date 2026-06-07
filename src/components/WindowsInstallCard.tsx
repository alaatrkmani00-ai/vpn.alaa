/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Monitor, ArrowDown, HelpCircle, Shield, Sparkles, Laptop, CheckCircle2 } from "lucide-react";

interface WindowsInstallCardProps {
  onShowToast: (msg: string) => void;
}

export default function WindowsInstallCard({ onShowToast }: WindowsInstallCardProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [activeTab, setActiveTab] = useState<"standard" | "manual">("standard");

  useEffect(() => {
    const handlePrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handlePrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handlePrompt);
    };
  }, []);

  const triggerNativeInstall = async () => {
    if (!deferredPrompt) {
      onShowToast("💡 للتثبيت الآن: اضغط على الزر (⊕) المتواجد في شريط العنوان أعلى المتصفح Chrome أو Edge!");
      return;
    }
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstallable(false);
      setDeferredPrompt(null);
      onShowToast("🎉 رائع! تم تثبيت أطلس VPN كبرنامج مستقل على نظام Windows.");
    }
  };

  return (
    <div className="flex flex-col bg-brand-panel border border-brand-border rounded-3xl p-6 backdrop-blur-xl shadow-[0_15px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
      {/* Background visual detail */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-[50px] -z-10" />
      
      {/* Title Segment */}
      <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-5">
        <div className="flex items-center gap-2">
          <Monitor className="w-5 h-5 text-brand-gold" />
          <h2 className="text-base font-bold text-white">تثبيت التطبيق على نظام ويندوز (Windows App)</h2>
        </div>
        <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
          مجاني بالكامل 100%
        </span>
      </div>

      <p className="text-[11px] leading-relaxed text-[#94A3B8] mb-5 text-right">
        بما أن التطبيق سحابي ومستضاف على Google Cloud، يمكنك تثبيته كبرنامج ديسكتوب أصلي (Windows PWA App) يعمل بضغطة زر من سطح المكتب وشريط المهام وبدون أي تكاليف أو اشتراكات شهرية!
      </p>

      {/* Toggles for installation mode */}
      <div className="grid grid-cols-2 bg-brand-card/70 p-1 rounded-xl border border-brand-border mb-4">
        <button
          onClick={() => setActiveTab("standard")}
          className={`py-1.5 text-center text-xs font-bold rounded-lg transition-all duration-300 ${
            activeTab === "standard"
              ? "bg-brand-panel text-brand-gold shadow"
              : "text-[#8E9FBC] hover:text-white"
          }`}
        >
          تثبيت فوري آلي
        </button>
        <button
          onClick={() => setActiveTab("manual")}
          className={`py-1.5 text-center text-xs font-bold rounded-lg transition-all duration-300 ${
            activeTab === "manual"
              ? "bg-brand-panel text-brand-gold shadow"
              : "text-[#8E9FBC] hover:text-white"
          }`}
        >
          دليل التنزيل اليدوي
        </button>
      </div>

      {activeTab === "standard" ? (
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-3 mb-5 text-right">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center text-[10px] font-mono font-bold text-brand-gold shrink-0 mt-0.5">
                ١
              </span>
              <p className="text-[11px] text-[#94A3B8] leading-normal font-medium">
                افتح الرابط في متصفح حديث على حاسوبك (مثل Google Chrome أو Microsoft Edge).
              </p>
            </div>
            
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center text-[10px] font-mono font-bold text-brand-gold shrink-0 mt-0.5">
                ٢
              </span>
              <p className="text-[11px] text-[#94A3B8] leading-normal font-medium">
                انقر على الزر الذهبي بالأسفل لبدء التثبيت التلقائي الفوري كبرنامج ويندوز.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center text-[10px] font-mono font-bold text-brand-gold shrink-0 mt-0.5">
                ٣
              </span>
              <p className="text-[11px] text-[#94A3B8] leading-normal font-medium">
                سيظهر لك أيقونة اختصار على سطح المكتب تفتح لك نافذة نظيفة ومستقلة تماماً كبرامج سطح المكتب العادية.
              </p>
            </div>
          </div>

          <button
            onClick={triggerNativeInstall}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-bg font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-[0_4px_25px_rgba(212,175,55,0.25)] hover:brightness-110 active:scale-[0.98]"
          >
            <Laptop className="w-4 h-4 shrink-0 stroke-[2.5]" />
            {isInstallable ? "تثبيت كبرنامج ويندوز الآن ⚡" : "تزامن وتثبيت PWA على سطح المكتب"}
          </button>
        </div>
      ) : (
        <div className="space-y-3.5 text-right text-xs">
          <div className="p-3 bg-brand-card rounded-xl border border-brand-border">
            <h4 className="font-bold text-white mb-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" />
              لأجهزة كروم (Chrome):
            </h4>
            <p className="text-[10px] text-[#94A3B8] leading-relaxed">
              انظر إلى الجانب الأيمن لشريط البحث بالأعلى، ستجد أيقونة دائرية بها سهم للأسفل أو علامة <strong>(+) والتثبيت</strong>. انقر عليها لتنزيل التطبيق في ثوانٍ.
            </p>
          </div>

          <div className="p-3 bg-brand-card rounded-xl border border-brand-border">
            <h4 className="font-bold text-white mb-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" />
              لأجهزة مايكروسوفت إيدج (Edge):
            </h4>
            <p className="text-[10px] text-[#94A3B8] leading-relaxed">
              اضغط على زاوية المتصفح العليا ثم اختر <strong>Apps (التطبيقات)</strong> ← ثم انقر على <strong>Install this site as an app (تثبيت هذا الموقع كتطبيق)</strong>.
            </p>
          </div>

          <p className="text-[10px] text-center text-brand-gold font-semibold leading-relaxed">
            🛡️ خوادم متصلة آمنة، تعمل مجاناً بدون الحاجة لـ كراك أو تفعيل خارجي ضار بالويندوز!
          </p>
        </div>
      )}
    </div>
  );
}
