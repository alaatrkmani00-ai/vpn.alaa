/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  ShieldAlert, ShieldCheck, Cpu, Bell, Power, 
  HelpCircle, Monitor, Globe, Info, Flame, AlertCircle, Gamepad2
} from "lucide-react";

import { ConnectionState, VpnNode, VpnProtocol } from "./types";
import { GLOBAL_SERVERS, VPN_PROTOCOLS } from "./data";

import ConnectingRing from "./components/ConnectingRing";
import ServerList from "./components/ServerList";
import NetworkPerformance from "./components/NetworkPerformance";
import OptimizeSettings from "./components/OptimizeSettings";
import AIOptimizer from "./components/AIOptimizer";
import WindowsInstallCard from "./components/WindowsInstallCard";

export default function App() {
  const [connectionState, setConnectionState] = useState<ConnectionState>("disconnected");
  
  // Default to Germany Frankfurt (Roblox Optimized) server for Turkey Roblox gamers!
  const [selectedNode, setSelectedNode] = useState<VpnNode>(GLOBAL_SERVERS[0]);
  
  // Default to WireGuard Custom Pro
  const [selectedProtocol, setSelectedProtocol] = useState<VpnProtocol>(VPN_PROTOCOLS[0]);

  // Booster Toggles
  const [dnsProtection, setDnsProtection] = useState(true);
  const [dpiBypass, setDpiBypass] = useState(true);
  const [udpTurbo, setUdpTurbo] = useState(true);
  const [killSwitch, setKillSwitch] = useState(false);

  const [virtualIp, setVirtualIp] = useState("---.---.---.---");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentUtcTime, setCurrentUtcTime] = useState("");

  // Update clock/time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentUtcTime(now.toLocaleString("ar-SA", { timeZone: "UTC", hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " (تنصيف UTC)");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Show a gorgeous temporary toast banner on important setting changes
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Connection Handler
  const handleToggleConnect = () => {
    if (connectionState === "disconnected") {
      setConnectionState("connecting");
      
      // Simulate highly realistic handshake processes
      setTimeout(() => {
        setConnectionState("connected");
        setVirtualIp(selectedNode.ip);
        showToast(`🔒 تم إنشاء نفق مشفر فائق عبر البروتوكول ${selectedProtocol.name} بنجاح!`);
      }, 2400);

    } else if (connectionState === "connected") {
      setConnectionState("disconnected");
      setVirtualIp("---.---.---.---");
      showToast("⚠️ تم فك ارتباط الاتصال الآمن بالخادم.");
    }
  };

  // On server node pick
  const handleSelectNode = (node: VpnNode) => {
    setSelectedNode(node);
    if (connectionState === "connected") {
      // Re-establish
      setConnectionState("connecting");
      setTimeout(() => {
        setConnectionState("connected");
        setVirtualIp(node.ip);
        showToast(`⚡ تم التوجيه والتحويل الفوري إلى خادم ${node.name}`);
      }, 1500);
    } else {
      showToast(`📍 تم اختيار الخادم: ${node.name}`);
    }
  };

  // On protocol pick
  const handleSelectProtocol = (proto: VpnProtocol) => {
    setSelectedProtocol(proto);
    showToast(`⚙️ تم تكوين البروتوكول المشفر: ${proto.name}`);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-brand-bg text-[#E0E0E0] flex flex-col selection:bg-brand-gold/30 selection:text-brand-gold font-sans p-3 sm:p-6 transition-all relative overflow-hidden">
      
      {/* Geometric Balance luxury radial background gradients */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-[400px] h-[400px] bg-brand-gold-light/5 rounded-full blur-[145px] pointer-events-none" />
      <div className="absolute bottom-5 right-5 w-[300px] h-[300px] bg-brand-border/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Interactive Toast notifications */}
      {toastMessage && (
        <div className="fixed top-6 left-6 right-6 sm:left-auto sm:right-6 bg-brand-panel/95 border-r-4 border-brand-gold shadow-[0_10px_35px_rgba(212,175,55,0.25)] px-5 py-4 rounded-xl z-50 flex items-center gap-3 animate-[slideIn_0.3s_ease] backdrop-blur-md max-w-md">
          <ShieldCheck className="w-5 h-5 text-brand-gold animate-pulse shrink-0" />
          <p className="text-xs font-bold leading-relaxed text-slate-200 text-right">{toastMessage}</p>
        </div>
      )}

      {/* Primary Container Layout */}
      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col gap-6 relative z-10">
        
        {/* Top Navbar / Title Segment */}
        <header className="flex flex-col lg:flex-row items-center justify-between gap-4 p-5 bg-brand-panel border border-brand-border rounded-2xl backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-3.5">
            {/* Elegant animated icon box - Geometric Balance Logo gold */}
            <div className="p-3 bg-gradient-to-tr from-brand-gold to-brand-gold-light rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.35)]">
              <Gamepad2 className="w-6 h-6 text-brand-bg stroke-[2.5]" />
            </div>
            
            {/* Title / Description */}
            <div className="text-right">
              <h1 className="text-xl font-black text-white tracking-wide flex items-center gap-2">
                أطلس VPN الرقمي | <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-gold-light">Roblox VIP Premium</span>
              </h1>
              <p className="text-xs text-[#94A3B8] font-semibold mt-0.5">
                تجاوز فوري لجدران الحظر في تركيا ولعب روبلوكس ببينغ منخفض واستجابة هندسية متوازنة
              </p>
            </div>
          </div>

          {/* Network Block status in Turkey */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Clock */}
            <div className="px-3.5 py-1.5 bg-brand-card/75 border border-brand-border rounded-xl text-[11px] font-mono font-bold text-[#E0E0E0]">
              {currentUtcTime}
            </div>

            {/* Locked / Unlocked badge with gold border */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border bg-brand-gold/10 border-brand-gold/25 text-brand-gold text-xs font-black">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
              </span>
              حالة تجاوز Roblox: نشط ومحمي بتركيا ✅
            </div>
            
            {/* Turkey ISP block warning */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/20 border border-red-500/20 text-red-400 rounded-xl text-xs font-bold leading-none">
              <AlertCircle className="w-3.5 h-3.5 animate-pulse" />
              حظر محلي نشط بتركيا 🇹🇷
            </div>
          </div>
        </header>

        {/* Global Roblox Access Notice Banner */}
        <div className="p-4 bg-gradient-to-r from-brand-panel via-brand-card to-brand-panel border border-brand-border rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-right">
            <span className="p-2 rounded-xl bg-brand-gold/10 text-brand-gold shrink-0">
              <Flame className="w-5 h-5 text-brand-gold" />
            </span>
            <div>
              <h3 className="text-xs font-black text-white">منصة روبلوكس بتركيا (توجيه النفق المتسارع)</h3>
              <p className="text-[11px] text-[#94A3B8] mt-0.5 leading-relaxed font-semibold">
                يقوم التطبيق بتحويل اتصال لعبة Roblox بالكامل إلى خوادم ألعاب <strong className="text-brand-gold font-bold">ألمانيا - فرانكفورت</strong> مع بروتوكول UDP الموصى به لخفض البينغ وتفادي التقطيع في مزودي الخدمة الأتراك (تيرك تيليكوم، سوبر أونلاين).
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-brand-border/40 border border-[#2A3B5D] rounded-lg text-[10px] font-mono text-brand-gold font-bold leading-none select-none">
              مسار الألعاب الذهبي مفعل 🎮
            </div>
          </div>
        </div>

        {/* Dynamic Bento-Grid Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Controls - 5 Grid columns out of 12 */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* VPN central Toggle dial */}
            <ConnectingRing
              connectionState={connectionState}
              selectedNode={selectedNode}
              onToggleConnect={handleToggleConnect}
              virtualIp={virtualIp}
            />

            {/* Gemini Powered Smart Route optimization */}
            <AIOptimizer
              selectedNode={selectedNode}
              selectedProtocol={selectedProtocol}
            />

            {/* Windows App Installation Card & Guides */}
            <WindowsInstallCard onShowToast={showToast} />

          </div>

          {/* Settings & Statistics - 7 Grid columns out of 12 */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Chart Statistics */}
            <NetworkPerformance
              connectionState={connectionState}
              selectedNode={selectedNode}
            />

            {/* Worldwide servers selector */}
            <ServerList
              selectedNode={selectedNode}
              onSelectNode={handleSelectNode}
              connectionState={connectionState}
            />

            {/* Protocol Settings configuration */}
            <OptimizeSettings
              selectedProtocol={selectedProtocol}
              onSelectProtocol={handleSelectProtocol}
              dnsProtection={dnsProtection}
              onToggleDns={() => {
                setDnsProtection(!dnsProtection);
                showToast(dnsProtection ? "❌ تم تعطيل جدار تسريب DNS (لا يُنصح به لتركيا)" : "✅ تم تفعيل حارس تسريب DNS الرقمي بنجاح!");
              }}
              dpiBypass={dpiBypass}
              onToggleDpi={() => {
                setDpiBypass(!dpiBypass);
                showToast(dpiBypass ? "❌ تم إيقاف تعمية حركة المرور (تسهل كشف الـ VPN)" : "✅ تم تشغيل تعمية حركة المرور لتجاوز أنظمة فحص الحزم بنجاح!");
              }}
              udpTurbo={udpTurbo}
              onToggleUdpTurbo={() => {
                setUdpTurbo(!udpTurbo);
                showToast(udpTurbo ? "❌ تم إيقاف مسرّع UDP للألعاب" : "🚀 تم تشغيل مسرّع UDP للروبلوكس لحجم بينغ أقل!");
              }}
              killSwitch={killSwitch}
              onToggleKill={() => {
                setKillSwitch(!killSwitch);
                showToast(killSwitch ? "🔐 تم إيقاف تشغيل Kill Switch" : "🔐 تم تسليح مفتاح القطع الطارئ لمنع التسريبات!");
              }}
            />

          </div>

        </div>

        {/* Global Footer Credits */}
        <footer className="mt-8 mb-4 border-t border-brand-border pt-6 flex flex-col md:flex-row items-center justify-between text-[#64748B] text-[11px] gap-4">
          <div className="text-right">
            <p className="font-bold text-slate-400">نظام أطلس برو لألعاب روبلوكس 🇹🇷 (Roblox VPN Premium Dashboard)</p>
            <p className="mt-0.5">اتصال سحابي ببروتوكولات فحص الحزم العميقة وتعمية النفق (DPI Blockers Bypass).</p>
          </div>
          <div className="flex items-center gap-1.5 font-mono">
            <span>حقوق النسخ 2026 © جميع الصلاحيات مشفرة للأفضل.</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
