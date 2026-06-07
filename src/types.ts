/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VpnNode {
  id: string;
  name: string;
  country: string;
  countryName: string;
  type: 'gaming' | 'secure' | 'local';
  ping: number;
  load: number;
  ip: string;
}

export interface VpnProtocol {
  id: string;
  name: string;
  desc: string;
}

export type ConnectionState = 'disconnected' | 'connecting' | 'connected';

export interface NetworkStats {
  ping: number;
  downloadSpeed: number; // in MB/s
  uploadSpeed: number; // in MB/s
  trafficDownloadedMB: number;
  trafficUploadedMB: number;
}

export interface DiagnosticInput {
  city: string;
  isp: string;
  selectedNodeId: string;
  protocol: string;
  customIssue: string;
}
