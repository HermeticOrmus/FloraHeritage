import GlassCard from '../GlassCard'

export default function GlassCardExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-green-400 p-8">
      <div className="grid gap-6">
        <GlassCard className="p-6">
          <h3 className="font-serif text-xl font-semibold text-white mb-3">Default Glass Card</h3>
          <p className="text-white/90">This is a glassmorphism card with the default backdrop blur effect.</p>
        </GlassCard>
        
        <GlassCard variant="nav" className="p-4">
          <h3 className="font-serif text-lg font-semibold text-white mb-2">Navigation Glass</h3>
          <p className="text-white/90 text-sm">Enhanced blur for navigation elements.</p>
        </GlassCard>
        
        <GlassCard variant="modal" className="p-8 max-w-md">
          <h3 className="font-serif text-xl font-semibold text-white mb-4">Modal Glass</h3>
          <p className="text-white/90">Maximum blur for modal overlays and important content.</p>
        </GlassCard>
      </div>
    </div>
  );
}