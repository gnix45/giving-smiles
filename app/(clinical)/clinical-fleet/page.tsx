"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Truck, Plane, Timer, Thermometer, MapPin, Package } from 'lucide-react';

type FleetUnit = {
  id: string;
  unit_id: string;
  type: string | null;
  status: string;
  destination: string | null;
  cargo: string | null;
  temperature: string | null;
  eta: string | null;
  updated_at: string;
};

const statusColors: Record<string, string> = {
  'Available': 'bg-emerald-100 text-emerald-700',
  'In Transit': 'bg-blue-100 text-blue-700',
  'Maintenance': 'bg-gray-100 text-gray-500',
  'Deployed': 'bg-primary/10 text-primary',
};

const typeIcons: Record<string, React.ReactNode> = {
  helicopter: <Plane className="w-6 h-6" />,
  ambulance: <Truck className="w-6 h-6" />,
  drone: <Package className="w-6 h-6" />,
};

export default function FleetPage() {
  const [units, setUnits] = useState<FleetUnit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => { fetchFleet(); }, []);

  async function fetchFleet() {
    setIsLoading(true);
    const { data, error } = await supabase.from('fleet_units').select('*').order('unit_id');
    if (data) setUnits(data as FleetUnit[]);
    if (error) console.error('Error fetching fleet:', error);
    setIsLoading(false);
  }

  function getTimeRemaining(eta: string | null) {
    if (!eta) return null;
    const diff = new Date(eta).getTime() - Date.now();
    if (diff <= 0) return 'Arrived';
    const hrs = Math.floor(diff / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  }

  const availableCount = units.filter(u => u.status === 'Available').length;
  const inTransitCount = units.filter(u => u.status === 'In Transit').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-headline font-bold text-on-surface">Fleet Logistics</h1>
        <p className="text-sm text-on-surface-variant mt-1">Monitor organ transport units and cold-chain status.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-surface-container p-4 shadow-sm">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Total Units</p>
          <p className="text-2xl font-bold text-on-surface">{units.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-surface-container p-4 shadow-sm">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Available</p>
          <p className="text-2xl font-bold text-emerald-600">{availableCount}</p>
        </div>
        <div className="bg-white rounded-2xl border border-surface-container p-4 shadow-sm">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">In Transit</p>
          <p className="text-2xl font-bold text-blue-600">{inTransitCount}</p>
        </div>
      </div>

      {/* Fleet Grid */}
      {isLoading ? (
        <div className="bg-white rounded-[2rem] border border-surface-container p-12 text-center text-on-surface-variant font-bold shadow-sm">Loading fleet data...</div>
      ) : units.length === 0 ? (
        <div className="bg-white rounded-[2rem] border border-surface-container p-12 text-center shadow-sm">
          <Truck className="w-12 h-12 text-on-surface-variant/30 mx-auto mb-3" />
          <p className="text-on-surface-variant font-bold">No fleet units configured yet.</p>
          <p className="text-xs text-on-surface-variant mt-1">Add transport units via the Supabase dashboard.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {units.map(unit => {
            const eta = getTimeRemaining(unit.eta);
            return (
              <div key={unit.id} className="bg-white rounded-2xl border border-surface-container p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      {typeIcons[unit.type || ''] || <Truck className="w-6 h-6" />}
                    </div>
                    <div>
                      <p className="font-bold text-on-surface font-mono">{unit.unit_id}</p>
                      <p className="text-xs text-on-surface-variant capitalize">{unit.type || 'Ground'}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[unit.status] || statusColors.Available}`}>{unit.status}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-on-surface-variant" />
                    <span className="text-on-surface-variant text-xs">{unit.destination || 'No destination'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-3.5 h-3.5 text-on-surface-variant" />
                    <span className="text-on-surface-variant text-xs">{unit.cargo || 'Empty'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-3.5 h-3.5 text-on-surface-variant" />
                    <span className="text-on-surface-variant text-xs">{unit.temperature || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer className="w-3.5 h-3.5 text-on-surface-variant" />
                    <span className={`text-xs font-bold ${eta === 'Arrived' ? 'text-emerald-600' : 'text-primary'}`}>{eta || 'N/A'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
