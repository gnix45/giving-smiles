import React from 'react';
import { motion } from 'motion/react';
import { 
  Truck, 
  Plane, 
  Navigation, 
  Clock, 
  MapPin, 
  Activity, 
  AlertTriangle,
  ChevronRight,
  MoreVertical,
  Zap,
  Shield
} from 'lucide-react';
import { Sidebar } from '@/src/components/Sidebar';
import { TopNav } from '@/src/components/TopNav';
import { cn } from '@/src/lib/utils';

export const FleetLogistics = () => {
  const fleet = [
    { id: 'UNIT-TX-442', type: 'Ground', status: 'In Transit', eta: '14m', destination: 'St. Jude’s', load: 'Kidney (RC-88219)', temp: '3.8°C' },
    { id: 'DRONE-V3-12', type: 'Aerial', status: 'En Route', eta: '8m', destination: 'City General', load: 'Blood Samples', temp: '4.2°C' },
    { id: 'UNIT-TX-109', type: 'Ground', status: 'Standby', eta: '-', destination: 'Regional Hub', load: 'Empty', temp: 'N/A' },
  ];

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar role="clinical" />
      <main className="flex-1 md:ml-64">
        <TopNav title="Fleet Logistics" />
        
        <div className="p-6 md:p-12 pt-24 max-w-7xl mx-auto w-full space-y-8">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="text-primary font-bold tracking-widest text-xs uppercase">Operational Capacity: 92%</span>
              <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mt-2">Fleet Logistics</h2>
              <p className="text-on-surface-variant max-w-lg mt-3 text-sm">Real-time tracking of specialized transport units and cold-chain integrity.</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white text-on-surface px-6 py-3 rounded-full font-bold text-sm border border-surface-container shadow-sm hover:bg-surface-container-low transition-all">
                Fleet Status
              </button>
              <button className="bg-primary text-white px-8 py-3 rounded-full font-bold text-sm shadow-xl shadow-primary/10 hover:opacity-90 transition-all">
                Deploy Unit
              </button>
            </div>
          </header>

          <div className="grid grid-cols-12 gap-8">
            {/* Fleet List */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-surface-container overflow-hidden">
                <div className="p-6 md:p-8 border-b border-surface-container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h3 className="font-headline font-bold text-xl">Active Fleet</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase">12 Online</span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-[10px] font-bold uppercase">2 Maintenance</span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[600px]">
                    <thead>
                      <tr className="bg-surface-container-low text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                        <th className="px-4 md:px-8 py-4">Unit ID</th>
                        <th className="px-4 md:px-8 py-4">Status</th>
                        <th className="px-4 md:px-8 py-4">Destination</th>
                        <th className="px-4 md:px-8 py-4">Cold Chain</th>
                        <th className="px-4 md:px-8 py-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container">
                      {fleet.map((unit, i) => (
                        <tr key={unit.id} className="group hover:bg-surface-container-low transition-colors">
                          <td className="px-4 md:px-8 py-4 md:py-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                                {unit.type === 'Ground' ? <Truck className="w-5 h-5" /> : <Plane className="w-5 h-5" />}
                              </div>
                              <div>
                                <p className="font-bold text-sm">{unit.id}</p>
                                <p className="text-[10px] text-on-surface-variant uppercase">{unit.type} Fleet</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 md:px-8 py-4 md:py-6">
                            <div className="flex items-center gap-2">
                              <div className={cn(
                                "w-2 h-2 rounded-full shrink-0",
                                unit.status === 'In Transit' ? "bg-green-500 animate-pulse" : 
                                unit.status === 'En Route' ? "bg-primary" : "bg-slate-300"
                              )} />
                              <span className="text-sm font-medium whitespace-nowrap">{unit.status}</span>
                            </div>
                            {unit.eta !== '-' && <p className="text-[10px] text-primary font-bold mt-1">ETA: {unit.eta}</p>}
                          </td>
                          <td className="px-4 md:px-8 py-4 md:py-6">
                            <p className="text-sm font-bold whitespace-nowrap">{unit.destination}</p>
                            <p className="text-[10px] text-on-surface-variant truncate max-w-[120px]">{unit.load}</p>
                          </td>
                          <td className="px-4 md:px-8 py-4 md:py-6">
                            <div className="flex items-center gap-2">
                              <Activity className="w-4 h-4 text-primary shrink-0" />
                              <span className="text-sm font-bold">{unit.temp}</span>
                            </div>
                            <p className="text-[10px] text-green-600 font-bold mt-1 whitespace-nowrap">Optimal Range</p>
                          </td>
                          <td className="px-4 md:px-8 py-4 md:py-6 text-right">
                            <button className="p-2 hover:bg-white rounded-lg transition-colors">
                              <MoreVertical className="w-5 h-5 text-slate-400" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Logistics Timeline */}
              <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-surface-container">
                <h3 className="font-headline font-bold text-xl mb-6 md:mb-8">Logistics Timeline</h3>
                <div className="space-y-8">
                  {[
                    { time: '09:12 AM', event: 'Organ Harvest Complete', location: 'City General', status: 'Completed' },
                    { time: '09:24 AM', event: 'Unit TX-442 Dispatched', location: 'Logistics Hub', status: 'Completed' },
                    { time: '09:45 AM', event: 'In Transit: Regional Highway 4', location: 'En Route', status: 'Active' },
                    { time: '10:15 AM', event: 'Estimated Arrival', location: 'St. Jude’s Hospital', status: 'Pending' },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-6 relative">
                      {i < 3 && <div className="absolute left-3 top-8 bottom-[-1.5rem] w-0.5 bg-surface-container" />}
                      <div className={cn(
                        "w-6 h-6 rounded-full border-4 flex items-center justify-center z-10",
                        step.status === 'Completed' ? "bg-primary border-primary/20" : 
                        step.status === 'Active' ? "bg-white border-primary" : "bg-white border-surface-container"
                      )}>
                        {step.status === 'Completed' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        {step.status === 'Active' && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />}
                      </div>
                      <div className="flex-1 flex justify-between items-start">
                        <div>
                          <p className="text-sm font-bold text-on-surface">{step.event}</p>
                          <p className="text-xs text-on-surface-variant">{step.location}</p>
                        </div>
                        <p className="text-xs font-bold text-on-surface-variant">{step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <div className="bg-surface-container-low p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-surface-container">
                <h3 className="font-headline font-bold text-on-surface mb-6 md:mb-8">Network Health</h3>
                <div className="space-y-6">
                  <div className="p-6 bg-white rounded-2xl shadow-sm border border-surface-container">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-primary" />
                        <span className="text-sm font-bold">System Latency</span>
                      </div>
                      <span className="text-xs font-bold text-green-600">14ms</span>
                    </div>
                    <div className="w-full bg-surface-container rounded-full h-1.5">
                      <div className="bg-primary h-full rounded-full w-[15%]" />
                    </div>
                  </div>
                  <div className="p-6 bg-white rounded-2xl shadow-sm border border-surface-container">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-primary" />
                        <span className="text-sm font-bold">Security Status</span>
                      </div>
                      <span className="text-xs font-bold text-primary">Encrypted</span>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="flex-1 h-4 bg-primary/20 rounded-sm" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-tertiary/10 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-tertiary/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-tertiary text-white rounded-2xl shrink-0">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="font-headline font-bold text-tertiary">Logistics Alert</h3>
                </div>
                <p className="text-sm text-tertiary/80 leading-relaxed mb-8">
                  High traffic detected on I-95 North. Rerouting Unit TX-102 to alternate route via Highway 12. ETA increased by 4 minutes.
                </p>
                <button className="w-full py-4 bg-tertiary text-white rounded-full font-bold text-sm shadow-lg shadow-tertiary/10 hover:opacity-90 transition-all">
                  Acknowledge & Reroute
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
