/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts";
import { Activity, ArrowDown, ArrowUp, Zap, HelpCircle } from "lucide-react";
import { ConnectionState, NetworkStats, VpnNode } from "../types";

interface NetworkPerformanceProps {
  connectionState: ConnectionState;
  selectedNode: VpnNode;
}

interface ChartDataItem {
  time: string;
  speed: number;
  latency: number;
}

export default function NetworkPerformance({
  connectionState,
  selectedNode
}: NetworkPerformanceProps) {
  const [stats, setStats] = useState<NetworkStats>({
    ping: selectedNode.ping,
    downloadSpeed: 0,
    uploadSpeed: 0,
    trafficDownloadedMB: 124.5,
    trafficUploadedMB: 28.2
  });

  const [chartData, setChartData] = useState<ChartDataItem[]>(() => {
    // Populate baseline initial data
    return Array.from({ length: 8 }, (_, i) => ({
      time: `${i * 2}ث`,
      speed: 0,
      latency: selectedNode.ping
    }));
  });

  // Handle dynamic stats updates if connected
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (connectionState === "connected") {
      // Simulate real-time data flow with small fluctuations
      const baseSpeed = selectedNode.type === "gaming" ? 45 : 32; // base mega-bytes per second
      const baseLatency = selectedNode.ping;

      interval = setInterval(() => {
        const randDown = (baseSpeed + (Math.random() * 12 - 6));
        const randUp = ((baseSpeed * 0.3) + (Math.random() * 4 - 2));
        const randPing = Math.max(2, baseLatency + Math.floor(Math.random() * 10 - 5));

        setStats((prev) => ({
          ping: randPing,
          downloadSpeed: parseFloat(randDown.toFixed(1)),
          uploadSpeed: parseFloat(randUp.toFixed(1)),
          trafficDownloadedMB: parseFloat((prev.trafficDownloadedMB + randDown / 10).toFixed(1)),
          trafficUploadedMB: parseFloat((prev.trafficUploadedMB + randUp / 10).toFixed(1))
        }));

        setChartData((prev) => {
          const newData = [...prev.slice(1)];
          const nextTime = `${prev.length * 2}ث`;
          newData.push({
            time: nextTime,
            speed: parseFloat(randDown.toFixed(1)),
            latency: randPing
          });
          return newData;
        });

      }, 1500);
    } else {
      // Offline mode
      setStats((prev) => ({
        ping: selectedNode.ping,
        downloadSpeed: 0,
        uploadSpeed: 0,
        trafficDownloadedMB: prev.trafficDownloadedMB,
        trafficUploadedMB: prev.trafficUploadedMB
      }));

      setChartData(() => {
        return Array.from({ length: 8 }, (_, i) => ({
          time: `${i * 2}ث`,
          speed: 0,
          latency: selectedNode.ping
        }));
      });
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [connectionState, selectedNode]);

  // If a server is changed while connected, reset base latency
  useEffect(() => {
    if (connectionState === "connected") {
      setStats((prev) => ({ ...prev, ping: selectedNode.ping }));
    }
  }, [selectedNode]);

  const statsCards = [
    {
      title: "سرعة التنزيل النشطة (Download)",
      value: connectionState === "connected" ? `${stats.downloadSpeed} MB/s` : "0.0 MB/s",
      meta: connectionState === "connected" ? `إجمالي البيانات: ${stats.trafficDownloadedMB} MB` : "الشبكة خاملة",
      icon: <ArrowDown className="w-4 h-4 text-brand-gold" />,
      colorClass: "text-brand-gold"
    },
    {
      title: "سرعة الرفع النشطة (Upload)",
      value: connectionState === "connected" ? `${stats.uploadSpeed} MB/s` : "0.0 MB/s",
      meta: connectionState === "connected" ? `إجمالي البيانات: ${stats.trafficUploadedMB} MB` : "الشبكة خاملة",
      icon: <ArrowUp className="w-4 h-4 text-brand-gold-light" />,
      colorClass: "text-brand-gold-light"
    }
  ];

  return (
    <div className="flex flex-col bg-brand-panel border border-brand-border rounded-3xl p-6 backdrop-blur-xl shadow-[0_15px_50px_rgba(0,0,0,0.8)]">
      {/* Header telemetry section */}
      <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-6">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-gold" />
          <h2 className="text-base font-bold text-white">مراقبة الأداء ومعدل البث الهندي</h2>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-xs font-mono font-bold text-brand-gold animate-pulse">
          <Zap className="w-3 h-3 text-brand-gold-light" />
          {connectionState === "connected" ? "نشط - 256-bit AES" : "انتظار التوصيل"}
        </div>
      </div>

      {/* Grid numbers */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {statsCards.map((card, i) => (
          <div key={i} className="p-4 bg-brand-card border border-brand-border rounded-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between pointer-events-none z-10 mb-2">
              <span className="text-[11px] font-bold text-[#8E9FBC]">{card.title}</span>
              <div className="p-1.5 rounded-lg bg-brand-border/40">{card.icon}</div>
            </div>
            <p className={`text-xl font-mono font-black ${card.colorClass} tracking-wide transition-colors duration-500`}>
              {card.value}
            </p>
            <div className="mt-1 font-mono text-[10px] text-[#586C88] font-semibold leading-relaxed">
              {card.meta}
            </div>
          </div>
        ))}
      </div>

      {/* Recharts Live Chart Visualization area */}
      <div className="flex-1 space-y-4">
        {/* Chart 1: Speed */}
        <div className="p-4 bg-brand-card/30 border border-brand-border rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#8292AD]">مخطط تدفق البيانات الفوري (MB/s)</span>
            <span className="text-[10px] bg-brand-gold/10 border border-brand-gold/20 text-brand-gold px-20 py-0.5 rounded font-mono font-bold">
              تنزيل البيانات المباشر
            </span>
          </div>
          <div className="h-40 w-full" style={{ direction: 'ltr' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="speedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#4a5568" fontSize={10} tickLine={false} />
                <YAxis stroke="#4a5568" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0A1224", borderColor: "#1E2A45", borderRadius: "12px" }}
                  labelStyle={{ color: "#9CA3AF" }}
                  itemStyle={{ color: "#D4AF37" }}
                />
                <Area type="monotone" dataKey="speed" stroke="#D4AF37" strokeWidth={2.5} fillOpacity={1} fill="url(#speedGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Latency (Ping) */}
        <div className="p-4 bg-brand-card/30 border border-brand-border rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#8292AD]">زمن الاستجابة ومعدل الاستقرار (Roblox Ping)</span>
            <span className="text-[10px] bg-brand-gold-light/10 border border-brand-gold-light/20 text-[#F9E29C] px-20 py-0.5 rounded font-mono font-bold">
              مستوى التأخير الحالي: {connectionState === "connected" ? stats.ping : selectedNode.ping}ms
            </span>
          </div>
          <div className="h-28 w-full" style={{ direction: 'ltr' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <XAxis dataKey="time" stroke="#4a5568" fontSize={9} tickLine={false} />
                <YAxis stroke="#4a5568" fontSize={9} tickLine={false} domain={['dataMin - 10', 'dataMax + 10']} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0A1224", borderColor: "#1E2A45", borderRadius: "12px" }}
                  labelStyle={{ color: "#9CA3AF" }}
                  itemStyle={{ color: "#F9E29C" }}
                />
                <Line type="monotone" dataKey="latency" stroke="#D4AF37" strokeWidth={2} dot={false} strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
