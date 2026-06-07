/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Settings, Check, HelpCircle, ShieldCheck, ToggleLeft, ToggleRight, Radio } from "lucide-react";
import { VpnProtocol } from "../types";
import { VPN_PROTOCOLS } from "../data";

interface OptimizeSettingsProps {
  selectedProtocol: VpnProtocol;
  onSelectProtocol: (protocol: VpnProtocol) => void;
  dnsProtection: boolean;
  onToggleDns: () => void;
  dpiBypass: boolean;
  onToggleDpi: () => void;
  udpTurbo: boolean;
  onToggleUdpTurbo: () => void;
  killSwitch: boolean;
  onToggleKill: () => void;
}

export default function OptimizeSettings({
  selectedProtocol,
  onSelectProtocol,
  dnsProtection,
  onToggleDns,
  dpiBypass,
  onToggleDpi,
  udpTurbo,
  onToggleUdpTurbo,
  killSwitch,
  onToggleKill
}: OptimizeSettingsProps) {
  return (
    <div className="flex flex-col bg-brand-panel border border-brand-border rounded-3xl p-6 backdrop-blur-xl shadow-[0_15px_50px_rgba(0,0,0,0.8)]">
      {/* Header section */}
      <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-6">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-brand-gold" />
          <h2 className="text-base font-bold text-white">إعدادات النفق ومثاق الألعاب</h2>
        </div>
        <span className="text-xs bg-brand-card border border-brand-border rounded-lg px-2.5 py-1 text-brand-gold font-bold">
          وضع المطور الفخم
        </span>
      </div>

      {/* Protocol Selection */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-[#8E9FBC] mb-3 text-right">
          بروتوكول تشفير النفق (Protocol):
        </label>
        <div className="space-y-2.5">
          {VPN_PROTOCOLS.map((protocol) => {
            const isSelected = selectedProtocol.id === protocol.id;
            return (
              <div
                key={protocol.id}
                onClick={() => onSelectProtocol(protocol)}
                className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer text-right group relative ${
                  isSelected
                    ? "bg-brand-card border-brand-gold shadow-md"
                    : "bg-brand-card/40 border-brand-border hover:bg-brand-card/85"
                }`}
              >
                <div className="flex items-center justify-between">
                  {/* Selected indicator bullet */}
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isSelected ? "border-brand-gold bg-brand-gold/20" : "border-brand-border"
                  }`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-brand-gold" />}
                  </div>

                  <p className="text-xs font-bold text-white group-hover:text-brand-gold-light transition-colors">
                    {protocol.name}
                  </p>
                </div>
                <p className="text-[10px] leading-relaxed text-[#6E7F9D] mt-1.5 font-medium">
                  {protocol.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Booster Switches */}
      <div className="space-y-4 pt-4 border-t border-brand-border">
        <label className="block text-xs font-bold text-[#8E9FBC] mb-2 text-right">
          تقنيات دعم وتجاوز القيود (Roblox Engine):
        </label>

        {/* DNS protection toggle */}
        <div className="flex items-center justify-between p-3.5 bg-brand-card/50 border border-brand-border rounded-xl">
          <button
            onClick={onToggleDns}
            className="focus:outline-none transition-transform active:scale-95 cursor-pointer"
          >
            {dnsProtection ? (
              <ToggleRight className="w-10 h-10 text-brand-gold" />
            ) : (
              <ToggleLeft className="w-10 h-10 text-slate-600" />
            )}
          </button>
          <div className="text-right">
            <h4 className="text-xs font-bold text-white">حارس تسريب الـ DNS الرقمي</h4>
            <p className="text-[10px] leading-relaxed text-[#607391] mt-0.5">
              توجيه طلبات الويب عبر سرفرات Cloudflare المشفرة لمنع اختناق وحظر Roblox المحلي بتركيا.
            </p>
          </div>
        </div>

        {/* DPI Obfuscator toggle */}
        <div className="flex items-center justify-between p-3.5 bg-brand-card/50 border border-brand-border rounded-xl">
          <button
            onClick={onToggleDpi}
            className="focus:outline-none transition-transform active:scale-95 cursor-pointer"
          >
            {dpiBypass ? (
              <ToggleRight className="w-10 h-10 text-brand-gold" />
            ) : (
              <ToggleLeft className="w-10 h-10 text-slate-600" />
            )}
          </button>
          <div className="text-right">
            <h4 className="text-xs font-bold text-white">مضاد فحص الحزم العميقة (DPI-Bypass)</h4>
            <p className="text-[10px] leading-relaxed text-[#607391] mt-0.5">
              تفكيك ترويسة اتصال نفق الـ VPN لتظهر كحركة تصفح HTTPS قياسية لمنع كشفها من مزود الإنترنت.
            </p>
          </div>
        </div>

        {/* UDP Multi-routing Turbo toggle */}
        <div className="flex items-center justify-between p-3.5 bg-brand-card/50 border border-brand-border rounded-xl">
          <button
            onClick={onToggleUdpTurbo}
            className="focus:outline-none transition-transform active:scale-95 cursor-pointer"
          >
            {udpTurbo ? (
              <ToggleRight className="w-10 h-10 text-brand-gold" />
            ) : (
              <ToggleLeft className="w-10 h-10 text-slate-600" />
            )}
          </button>
          <div className="text-right">
            <h4 className="text-xs font-bold text-white">مسرِّع بروتوكول UDP لألعاب Roblox</h4>
            <p className="text-[10px] leading-relaxed text-[#607391] mt-0.5">
              يرسل حزم اللعبة في قنوات متوازية لتعويض الفقد الحاصل في الاتصال وتقليل البينغ بـ 15ms إضافية.
            </p>
          </div>
        </div>

        {/* Kill Switch toggle */}
        <div className="flex items-center justify-between p-3.5 bg-brand-card/50 border border-brand-border rounded-xl">
          <button
            onClick={onToggleKill}
            className="focus:outline-none transition-transform active:scale-95 cursor-pointer"
          >
            {killSwitch ? (
              <ToggleRight className="w-10 h-10 text-brand-gold" />
            ) : (
              <ToggleLeft className="w-10 h-10 text-slate-600" />
            )}
          </button>
          <div className="text-right">
            <h4 className="text-xs font-bold text-white">مفتاح قطع الاتصال الطارئ (Kill Switch)</h4>
            <p className="text-[10px] leading-relaxed text-[#607391] mt-0.5">
              يقطع اتصال الكمبيوتر بالإنترنت بالكامل فوراً عند حدوث خلل بالنفق لمنع تسريب الـ IP الحقيقي لتركيا.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
