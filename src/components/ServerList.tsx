/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Search, Zap, Shield, Server, ArrowDownUp } from "lucide-react";
import { VpnNode } from "../types";
import { GLOBAL_SERVERS } from "../data";

interface ServerListProps {
  selectedNode: VpnNode;
  onSelectNode: (node: VpnNode) => void;
  connectionState: string;
}

export default function ServerList({
  selectedNode,
  onSelectNode,
  connectionState
}: ServerListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<'all' | 'gaming' | 'secure'>('all');

  // Filter servers
  const filteredServers = GLOBAL_SERVERS.filter((server) => {
    const matchesSearch =
      server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.countryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterType === 'all' || server.type === filterType;

    return matchesSearch && matchesFilter;
  });

  const getLoadColor = (load: number) => {
    if (load > 70) return "bg-red-500";
    if (load > 40) return "bg-brand-gold";
    return "bg-[#F9E29C]";
  };

  const getPingColor = (ping: number) => {
    if (ping > 150) return "text-red-400";
    if (ping > 80) return "text-amber-400";
    return "text-brand-gold";
  };

  return (
    <div className="flex flex-col h-full bg-brand-panel border border-brand-border rounded-3xl p-6 backdrop-blur-xl shadow-[0_15px_50px_rgba(0,0,0,0.8)]">
      {/* Header section */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-brand-border">
        <div className="flex items-center gap-2">
          <Server className="w-5 h-5 text-brand-gold" />
          <h2 className="text-base font-bold text-white">الخوادم والمسارات العالمية</h2>
        </div>
        <span className="text-xs text-[#7E8B9B] font-medium font-mono">
          تم تحديث البينغ الحركي تلقائياً
        </span>
      </div>

      {/* Custom Tabs */}
      <div className="flex bg-brand-card/70 p-1.5 rounded-xl border border-brand-border mb-4 gap-1">
        <button
          onClick={() => setFilterType('all')}
          className={`flex-1 text-center py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-300 ${
            filterType === 'all'
              ? "bg-brand-panel text-brand-gold shadow-md border-b-2 border-brand-gold"
              : "text-[#8E9FBC] hover:text-white"
          }`}
        >
          الكل ({GLOBAL_SERVERS.length})
        </button>
        <button
          onClick={() => setFilterType('gaming')}
          className={`flex-1 text-center py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 ${
            filterType === 'gaming'
              ? "bg-brand-panel text-brand-gold shadow-md border-b-2 border-brand-gold"
              : "text-[#8E9FBC] hover:text-white"
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-brand-gold-light" />
          مُحسّنة للألعاب
        </button>
        <button
          onClick={() => setFilterType('secure')}
          className={`flex-1 text-center py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 ${
            filterType === 'secure'
              ? "bg-brand-panel text-brand-gold shadow-md border-b-2 border-brand-gold"
              : "text-[#8E9FBC] hover:text-white"
          }`}
        >
          <Shield className="w-3.5 h-3.5 text-[#F9E29C]" />
          تشفير أقصى
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث عن خادم، بلد، أو رقم آي بي..."
          className="w-full pl-4 pr-10 py-2.5 bg-brand-card border border-brand-border text-[#E0E0E0] placeholder-[#576987] rounded-xl text-xs focus:ring-1 focus:ring-brand-gold focus:outline-none transition-all duration-300 text-right"
        />
        <Search className="absolute right-3.5 top-3 w-4 h-4 text-[#576987]" />
      </div>

      {/* Scrollable Server List */}
      <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[380px] pr-1.5 custom-scrollbar">
        {filteredServers.length > 0 ? (
          filteredServers.map((server) => {
            const isSelected = selectedNode.id === server.id;
            return (
              <div
                key={server.id}
                onClick={() => {
                  if (connectionState !== "connecting") {
                    onSelectNode(server);
                  }
                }}
                className={`p-3.5 rounded-2xl border transition-all duration-300 flex flex-row items-center justify-between cursor-pointer select-none group relative ${
                  isSelected
                    ? "bg-brand-card/80 border-brand-gold shadow-[0_4px_20px_rgba(212,175,55,0.15)]"
                    : "bg-brand-card/40 border-brand-border hover:bg-brand-card hover:border-brand-gold/20"
                } ${connectionState === "connecting" ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {/* Visual marker decoration for selected node */}
                {isSelected && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 bg-brand-gold rounded-r-md" />
                )}

                {/* Right side: Country code, Name & Meta badges */}
                <div className="flex items-center gap-3">
                  {/* Styled Flag Representation Box */}
                  <div className="w-10 h-10 rounded-xl bg-brand-panel border border-brand-border flex items-center justify-center font-bold font-mono text-sm tracking-wider text-brand-gold">
                    {server.country}
                  </div>

                  {/* Server text metadata */}
                  <div className="text-right">
                    <p className="text-xs font-bold text-white group-hover:text-brand-gold-light transition-colors">
                      {server.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {/* IP details */}
                      <span className="text-[10px] font-mono text-[#586C88] tracking-wider font-semibold">
                        IP: {server.ip}
                      </span>
                      {server.type === "gaming" && (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[9px] font-bold text-amber-400">
                          <Zap className="w-2.5 h-2.5" />
                          عالي الاستجابة للروبلوكس
                        </span>
                      )}
                      {server.id === "de-fra" && (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-brand-gold/10 border border-brand-gold/20 text-[9px] font-bold text-brand-gold animate-pulse">
                          موصى به لتركيا 🇹🇷
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Left side: Latency ping + Server load */}
                <div className="flex flex-col items-end gap-1.5 pl-2">
                  {/* Ping latency display */}
                  <div className="flex items-center gap-1">
                    <ArrowDownUp className="w-3 h-3 text-[#586C88]" />
                    <span className={`text-xs font-bold font-mono ${getPingColor(server.ping)}`}>
                      {server.ping} ms
                    </span>
                  </div>

                  {/* Load bar */}
                  <div className="w-20">
                    <div className="flex items-center justify-between text-[9px] text-[#7A8EA8] mb-0.5">
                      <span>التحميل:</span>
                      <span className="font-mono font-semibold">{server.load}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-brand-panel rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${getLoadColor(server.load)}`}
                        style={{ width: `${server.load}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center">
            <p className="text-sm text-[#576479]">عذراً، لم نعثر على أي خادم يطابق بحثك.</p>
          </div>
        )}
      </div>

      {/* Bottom informational card */}
      <div className="mt-4 p-3 bg-brand-gold/5 border border-brand-gold/10 rounded-2xl flex items-start gap-2.5">
        <Zap className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed text-[#788EA8] text-right">
          <strong className="text-brand-gold font-bold">لماذا فرانكفورت لتركيا؟</strong> خادم فرانكفورت الألماني مهيأ بمسار جير فلكس عبر شبكة البحر الأبيض المتوسط المتكافئة مباشرة إلى مراكز أكتيف روبلوكس الأوروبية لتخفيض زمن الاستجابة إلى حده الأدنى.
        </p>
      </div>
    </div>
  );
}
