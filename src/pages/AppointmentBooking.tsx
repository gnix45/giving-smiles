import React from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Activity, 
  ShieldCheck, 
  ArrowRight, 
  Info,
  ChevronRight,
  ClipboardList,
  AlertCircle,
  Video,
  Phone
} from 'lucide-react';
import { Sidebar } from '@/src/components/Sidebar';
import { TopNav } from '@/src/components/TopNav';
import { cn } from '@/src/lib/utils';

export const AppointmentBooking = () => {
  const [selectedType, setSelectedType] = React.useState<'in-person' | 'virtual' | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);

  const timeSlots = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'];
  const dates = [
    { day: 'Mon', date: '24', month: 'Oct' },
    { day: 'Tue', date: '25', month: 'Oct' },
    { day: 'Wed', date: '26', month: 'Oct' },
    { day: 'Thu', date: '27', month: 'Oct' },
    { day: 'Fri', date: '28', month: 'Oct' },
  ];

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar role="patient" />
      <main className="flex-1 md:ml-64">
        <TopNav title="Book Appointment" />
        
        <div className="p-4 md:p-8 lg:p-12 pt-24 max-w-5xl mx-auto w-full space-y-8 md:space-y-12">
          <header className="space-y-3 md:space-y-4">
            <span className="text-primary font-bold tracking-widest uppercase text-[10px] md:text-xs">Patient Care</span>
            <h1 className="text-3xl md:text-4xl font-headline font-extrabold text-on-surface tracking-tight">Schedule Your Next Visit</h1>
            <p className="text-on-surface-variant max-w-2xl text-sm leading-relaxed">
              Book a consultation with your care coordinator or a specialist. Choose between in-person visits or virtual consultations.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8 md:space-y-12">
              {/* Appointment Type */}
              <section className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-headline font-bold text-on-surface flex items-center gap-2">
                  <Activity className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  Select Appointment Type
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <button 
                    onClick={() => setSelectedType('in-person')}
                    className={cn(
                      "p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-2 text-left transition-all group",
                      selectedType === 'in-person' ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" : "border-surface-container hover:border-primary/50"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors",
                      selectedType === 'in-person' ? "bg-primary text-white" : "bg-surface-container-low text-primary group-hover:bg-primary/10"
                    )}>
                      <MapPin className="w-6 h-6" />
                    </div>
                    <p className="font-bold text-on-surface text-lg">In-Person Visit</p>
                    <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">Meet with your care team at St. Jude’s Medical Center.</p>
                  </button>

                  <button 
                    onClick={() => setSelectedType('virtual')}
                    className={cn(
                      "p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-2 text-left transition-all group",
                      selectedType === 'virtual' ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" : "border-surface-container hover:border-primary/50"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors",
                      selectedType === 'virtual' ? "bg-primary text-white" : "bg-surface-container-low text-primary group-hover:bg-primary/10"
                    )}>
                      <Video className="w-6 h-6" />
                    </div>
                    <p className="font-bold text-on-surface text-lg">Virtual Consultation</p>
                    <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">Secure video call from the comfort of your home.</p>
                  </button>
                </div>
              </section>

              {/* Date Selection */}
              <section className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-headline font-bold text-on-surface flex items-center gap-2">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  Select Date
                </h3>
                <div className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0">
                  {dates.map((d, i) => (
                    <button 
                      key={i}
                      onClick={() => setSelectedDate(d.date)}
                      className={cn(
                        "flex-shrink-0 w-20 h-28 md:w-24 md:h-32 rounded-[1.5rem] md:rounded-[2rem] border-2 flex flex-col items-center justify-center transition-all",
                        selectedDate === d.date ? "border-primary bg-primary text-white shadow-lg shadow-primary/20" : "border-surface-container hover:border-primary/50 bg-white"
                      )}
                    >
                      <span className="text-[10px] uppercase font-bold tracking-widest mb-1 md:mb-2 opacity-70">{d.day}</span>
                      <span className="text-xl md:text-2xl font-headline font-extrabold">{d.date}</span>
                      <span className="text-[10px] uppercase font-bold tracking-widest mt-1 md:mt-2 opacity-70">{d.month}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Time Selection */}
              <section className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-headline font-bold text-on-surface flex items-center gap-2">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  Select Time
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
                  {timeSlots.map((time, i) => (
                    <button 
                      key={i}
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        "py-3 md:py-4 rounded-xl md:rounded-2xl border-2 font-bold text-xs transition-all",
                        selectedTime === time ? "border-primary bg-primary text-white shadow-lg shadow-primary/20" : "border-surface-container hover:border-primary/50 bg-white text-on-surface"
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </section>

              <div className="flex flex-col sm:flex-row justify-end gap-3 md:gap-4 pt-4 md:pt-8">
                <button className="px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm text-on-surface-variant hover:bg-surface-container-low transition-all text-center">
                  Cancel
                </button>
                <button 
                  disabled={!selectedType || !selectedDate || !selectedTime}
                  className={cn(
                    "px-8 md:px-12 py-3 md:py-4 rounded-full font-bold shadow-xl transition-all flex items-center justify-center gap-2 text-sm md:text-base",
                    selectedType && selectedDate && selectedTime 
                      ? "bg-primary text-white shadow-primary/20 hover:opacity-90" 
                      : "bg-surface-container-highest text-on-surface-variant cursor-not-allowed"
                  )}
                >
                  Confirm Appointment <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>

            <aside className="lg:col-span-4 space-y-6 md:space-y-8">
              <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-surface-container shadow-sm space-y-6 md:space-y-8">
                <h4 className="font-headline font-bold text-on-surface">Appointment Summary</h4>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">Dr. Sarah Chen</p>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Care Coordinator</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">General Evaluation</p>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Appointment Type</p>
                    </div>
                  </div>
                  {selectedDate && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold">Oct {selectedDate}, 2024</p>
                        <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Selected Date</p>
                      </div>
                    </div>
                  )}
                  {selectedTime && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold">{selectedTime}</p>
                        <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Selected Time</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-surface-container-low p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-surface-container">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-tertiary" />
                  <h4 className="font-headline font-bold text-on-surface">Preparation</h4>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Please ensure you have your latest medical records uploaded at least 24 hours before your appointment. For virtual visits, test your camera and microphone in advance.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};
