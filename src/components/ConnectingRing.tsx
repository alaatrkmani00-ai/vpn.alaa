/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Shield, ShieldAlert, ShieldCheck, Power, Wifi, Clock, Server } from "lucide-react";
import { ConnectionState, VpnNode } from "../types";

interface ConnectingRingProps {
  connectionState: ConnectionState;
  selectedNode: VpnNode;
  onToggleConnect: () => void;
  virtualIp: string;
}

export default function ConnectingRing({
  connectionState,
  selectedNode,
  onToggleConnect,
  virtualIp
}: ConnectingRingProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Connection timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (connectionState === "connected") {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setElapsedSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [connectionState]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [
      hours > 0 ? String(hours).padStart(2, '0') : null,
      String(minutes).padStart(2, '0'),
      String(seconds).padStart(2, '0')
    ].filter(Boolean).join(':');
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-brand-panel border border-brand-border rounded-3xl backdrop-blur-xl shadow-[0_15px_50px_rgba(0,0,0,0.8)] relative overflow-hidden group">
      {/* Absolute ambient lights behind - Geometric Balance Balance */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-[60px]" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-gold-light/5 rounded-full blur-[60px]" />

      {/* Flag / Details chip */}
      <div className="mb-6 flex items-center gap-2 px-4 py-1.5 bg-brand-card border border-brand-border rounded-full shadow-inner">
        <span className="relative flex h-2 w-2">
          {connectionState === "connected" && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${
            connectionState === "connected" ? "bg-brand-gold" :
            connectionState === "connecting" ? "bg-amber-500 animate-pulse" : "bg-red-500"
          }`}></span>
        </span>
        <span className="text-xs font-mono text-brand-gold font-bold uppercase tracking-wider">
          {connectionState === "connected" ? "الوضع الذهبي الآمن مفعل" : 
           connectionState === "connecting" ? "جاري تشفير مسار النفق" : "تأمين الشبكة معطل"}
        </span>
      </div>

      {/* High-luxury Radial Power Dial Container */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-6">
        {/* Outer glowing pulsing orbit blocks (always visual luxury) */}
        <div className={`absolute inset-0 rounded-full border-2 border-dashed transition-all duration-1000 ${
          connectionState === "connected" ? "border-brand-gold/30 animate-[spin_50s_linear_infinite]" :
          connectionState === "connecting" ? "border-amber-500/30 animate-[spin_10s_linear_infinite]" : "border-brand-border"
        }`} />

        {/* Outer halo background circles */}
        <motion.div
          animate={connectionState === "connected" ? { scale: [1, 1.08, 1] } : { scale: 1 }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className={`absolute w-56 h-56 rounded-full blur-xl opacity-20 transition-colors duration-1000 ${
            connectionState === "connected" ? "bg-gradient-to-r from-brand-gold to-brand-gold-light" :
            connectionState === "connecting" ? "bg-gradient-to-r from-amber-500 to-amber-300" : "bg-red-950/10"
          }`}
        />

        {/* Animated Spin Border on Active Connection */}
        {connectionState === "connected" && (
          <div className="absolute w-[210px] h-[210px] rounded-full border-t-2 border-r-2 border-brand-gold animate-[spin_3s_linear_infinite]" />
        )}

        {/* Interactive connection center */}
        <button
          id="vpn-dial-trigger"
          onClick={onToggleConnect}
          disabled={connectionState === "connecting"}
          className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-500 focus:outline-none select-none z-10 ${
            connectionState === "connected" 
              ? "bg-gradient-to-br from-brand-card to-brand-panel border-4 border-brand-gold shadow-[0_0_40px_rgba(212,175,55,0.25)] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] active:scale-95" 
              : connectionState === "connecting"
              ? "bg-[#18130B] border-4 border-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.25)]"
              : "bg-gradient-to-br from-[#1C2030] to-brand-panel border-4 border-brand-border shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:border-brand-gold/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.08)] active:scale-95"
          }`}
        >
          {/* Internal rotating light rings on loading */}
          {connectionState === "connecting" && (
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="transparent"
                strokeWidth="4"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="4"
                strokeDasharray="283"
                strokeDashoffset="75"
                className="animate-[spin_2s_linear_infinite]"
                style={{ transformOrigin: '50px 50px' }}
              />
            </svg>
          )}

          {/* Central Shield or Power State Icon */}
          <div className="relative mb-2">
            {connectionState === "connected" ? (
              <ShieldCheck className="w-16 h-16 text-brand-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
            ) : connectionState === "connecting" ? (
              <Server className="w-14 h-14 text-amber-400 animate-bounce" />
            ) : (
              <Shield className="w-16 h-16 text-slate-500 transition-colors group-hover:text-brand-gold" />
            )}

            {/* Micro shield dot indicator */}
            <span className={`absolute -bottom-1 -right-1 flex h-4 w-4 rounded-full border-2 border-brand-bg ${
              connectionState === "connected" ? "bg-brand-gold" :
              connectionState === "connecting" ? "bg-amber-400" : "bg-red-500"
            }`} />
          </div>

          {/* Power toggle typography label */}
          <span className="text-xs font-bold leading-5 text-slate-400 uppercase tracking-widest">
            {connectionState === "connected" ? "انقر للإلغاء" : "انقر للاتصال الآمن"}
          </span>

          {/* Power Icon on bottom */}
          <div className={`mt-2 flex items-center justify-center w-7 h-7 rounded-full ${
            connectionState === "connected" ? "bg-brand-gold/10 text-brand-gold" :
            connectionState === "connecting" ? "bg-amber-500/10 text-amber-400" : "bg-brand-border text-[#6F7F9D] group-hover:text-white"
          }`}>
            <Power className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>

      {/* Target Server Display */}
      <div className="w-full text-center mb-4">
        <p className="text-sm font-medium text-[#7A8EA8] mb-1">الخادم والموقع المختار:</p>
        <div className="flex items-center justify-center gap-2">
          {/* Mini Country Identifier */}
          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-brand-border border border-brand-gold/20 text-[10px] font-mono text-brand-gold font-bold">
            {selectedNode.country}
          </span>
          <span className="text-sm font-bold text-white tracking-wide">
            {selectedNode.name}
          </span>
        </div>
      </div>

      {/* Connected telemetry cards */}
      <div className={`w-full grid grid-cols-2 gap-3 transition-all duration-700 ${
        connectionState === "connected" ? "opacity-100 max-h-40 mt-2" : "opacity-40 pointer-events-none"
      }`}>
        {/* Virtual IP Display Card */}
        <div className="p-3 bg-brand-card rounded-xl border border-brand-border/60 shadow-sm flex flex-col justify-center items-center">
          <div className="flex items-center gap-1.5 mb-1">
            <Wifi className="w-3.5 h-3.5 text-brand-gold" />
            <span className="text-[10px] font-medium text-[#7E8B9B]">الـ IP الافتراضي الآمن</span>
          </div>
          <p className="text-xs font-mono font-bold text-brand-gold tracking-wider">
            {connectionState === "connected" ? virtualIp : "---.---.---.---"}
          </p>
        </div>

        {/* Session Timer Card */}
        <div className="p-3 bg-brand-card rounded-xl border border-brand-border/60 shadow-sm flex flex-col justify-center items-center">
          <div className="flex items-center gap-1.5 mb-1">
            <Clock className="w-3.5 h-3.5 text-brand-gold" />
            <span className="text-[10px] font-medium text-[#7E8B9B]">مدة الاتصال المشفر</span>
          </div>
          <p className="text-xs font-mono font-bold text-white">
            {connectionState === "connected" ? formatTime(elapsedSeconds) : "00:00:00"}
          </p>
        </div>
      </div>
      
      {/* Footer Roblox Alert */}
      {selectedNode.id === "de-fra" && connectionState === "connected" && (
        <div className="mt-4 w-full p-2.5 bg-brand-gold/10 border border-brand-gold/20 rounded-lg text-center text-xs text-brand-gold font-bold tracking-wide">
          🎮 تم تحسين الاتصال التلقائي وتفعيل النفق السريع لألعاب Roblox في تركيا!
        </div>
      )}
    </div>
  );
}
