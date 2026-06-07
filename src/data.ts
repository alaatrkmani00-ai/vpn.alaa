/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VpnNode, VpnProtocol } from "./types";

export const GLOBAL_SERVERS: VpnNode[] = [
  {
    id: "de-fra",
    name: "خادم ألمانيا - فرانكفورت (مُحسّن للعبة روبلوكس ⚡)",
    country: "DE",
    countryName: "ألمانيا",
    type: "gaming",
    ping: 42,
    load: 38,
    ip: "185.12.112.44"
  },
  {
    id: "nl-ams",
    name: "خادم هولندا - أمستردام (ألعاب وزمن استجابة فائق)",
    country: "NL",
    countryName: "هولندا",
    type: "gaming",
    ping: 48,
    load: 21,
    ip: "82.197.200.12"
  },
  {
    id: "tr-ist",
    name: "بوابة تركيا - إسطنبول (بروكسي محلي بالكامل)",
    country: "TR",
    countryName: "تركيا",
    type: "local",
    ping: 8,
    load: 74,
    ip: "176.240.92.100"
  },
  {
    id: "us-nyc",
    name: "خادم الولايات المتحدة - نيويورك (نطاق عالي التشفير)",
    country: "US",
    countryName: "الولايات المتحدة",
    type: "secure",
    ping: 125,
    load: 45,
    ip: "104.244.75.12"
  },
  {
    id: "gb-lon",
    name: "خادم المملكة المتحدة - لندن (اتصال سحابي غير مرئي)",
    country: "GB",
    countryName: "المملكة المتحدة",
    type: "secure",
    ping: 54,
    load: 32,
    ip: "195.154.122.91"
  },
  {
    id: "jp-nrt",
    name: "خادم كوانتو - اليابان (مسار ألعاب شرق آسيا الرديف)",
    country: "JP",
    countryName: "اليابان",
    type: "gaming",
    ping: 212,
    load: 18,
    ip: "210.140.10.8"
  }
];

export const VPN_PROTOCOLS: VpnProtocol[] = [
  {
    id: "wireguard",
    name: "WireGuard® Custom Pro (موصى به لروبلوكس 🚀)",
    desc: "بروتوكول فائق السرعة يعتمد على تشفير متطور ومبني خصيصاً عبر بروتوكول UDP متجاوزاً بوابات الحظر والجدران النارية بسرعة اتصال غير منقوصة."
  },
  {
    id: "shadowsocks",
    name: "Shadowsocks-DPI Obfuscator (مضاد فحص البيانات 🛡️)",
    desc: "يقوم بتعمية وتظليل حركة مرور البيانات لتظهر كأنها تصفح إنترنت عادي وآمن بالكامل، مما يخدع برامج كشف الـ VPN وفحص حزم الألعاب الحية."
  },
  {
    id: "openvpn-udp",
    name: "OpenVPN Ultimate (UDP / منفذ مخصص للروبلوكس)",
    desc: "أقوى حماية وتوليف عسكري للبيانات الرقمية، مهيأ خصيصاً لتفادي اختناقات حزم الشبكات لدى شركات الإنترنت التركية."
  },
  {
    id: "hydra-games",
    name: "Hydra Gaming Stealth (بروتوكول هيدرا للألعاب السريعة)",
    desc: "توصيل خفيف الوزن بأعلى معدلات الضغط مع توجيه ذكي للمسالك لضمان تحقيق أقل بينغ ممكن لألعاب الأونلاين التنافسية."
  }
];

export const TURKISH_ISPS = [
  { id: "turktelekom", name: "Turk Telekom (Türk Telekom)" },
  { id: "turkcell", name: "Turkcell Superonline" },
  { id: "vodafone", name: "Vodafone Net" },
  { id: "kablonet", name: "Türksat Kablonet" },
  { id: "milnicom", name: "Millenicom / D-Smart" },
  { id: "other", name: "شبكة مزود آخر / شبكة جامعية أو عامة" }
];

export const TURKISH_CITIES = [
  { id: "istanbul", name: "إسطنبول (Istanbul)" },
  { id: "ankara", name: "أنقرة (Ankara)" },
  { id: "izmir", name: "إزمير (Izmir)" },
  { id: "bursa", name: "بورصة (Bursa)" },
  { id: "antalya", name: "أنطاليا (Antalya)" },
  { id: "gaziantep", name: "غازي عنتاب (Gaziantep)" },
  { id: "adana", name: "أضنة (Adana)" },
  { id: "trabzon", name: "طرابزون (Trabzon)" },
  { id: "other", name: "أخرى / مدينة تركية أخرى" }
];
