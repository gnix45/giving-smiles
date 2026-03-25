export default function CommunityPage() {
  return (
    <div className="p-8 animate-in fade-in duration-500">
      <h1 className="text-2xl font-headline font-bold text-on-surface">Support & Community</h1>
      <p className="text-on-surface-variant mt-2">Connect with other patients, share experiences, and access vital transplant resources.</p>
      
      <div className="mt-8 p-8 bg-surface-container-low rounded-[2rem] border border-surface-container text-center max-w-2xl mx-auto shadow-sm">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        </div>
        <h2 className="text-xl font-headline font-bold text-on-surface mb-2">Community Forums Upcoming</h2>
        <p className="text-sm text-on-surface-variant font-bold">This feature is scheduled for Phase 2 development. You will soon be able to join support groups and discussions.</p>
      </div>
    </div>
  );
}
