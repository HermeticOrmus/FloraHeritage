import GlassNavigation from '../GlassNavigation'

export default function GlassNavigationExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-accent">
      <GlassNavigation />
      
      {/* Mock content sections for demonstration */}
      <div className="pt-20 space-y-16">
        <section id="home" className="h-96 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-serif text-4xl font-bold mb-4">Casa Del Puente</h1>
            <p className="text-white/80">Heritage Property in Boquete, Panama</p>
          </div>
        </section>
        
        <section id="heritage" className="h-96 flex items-center justify-center bg-black/10">
          <div className="text-center text-white">
            <h2 className="font-serif text-3xl font-semibold mb-4">Our Heritage</h2>
            <p className="text-white/80">Four generations of family stewardship</p>
          </div>
        </section>
        
        <section id="property" className="h-96 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="font-serif text-3xl font-semibold mb-4">The Property</h2>
            <p className="text-white/80">Colonial architecture meets modern comfort</p>
          </div>
        </section>
        
        <section id="experiences" className="h-96 flex items-center justify-center bg-black/10">
          <div className="text-center text-white">
            <h2 className="font-serif text-3xl font-semibold mb-4">Experiences</h2>
            <p className="text-white/80">Coffee tours, hiking, and cultural immersion</p>
          </div>
        </section>
        
        <section id="booking" className="h-96 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="font-serif text-3xl font-semibold mb-4">Book Your Stay</h2>
            <p className="text-white/80">Reserve your heritage experience</p>
          </div>
        </section>
      </div>
    </div>
  );
}