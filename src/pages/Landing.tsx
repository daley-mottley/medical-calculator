import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Zap, Settings, Users, LayoutDashboard, Activity, Star, ChevronRight } from 'lucide-react';

// Helper component for feature cards
const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 animate-fade-in">
    <div className="p-4 bg-medical-primary/10 rounded-full mb-4">
      <Icon className="w-10 h-10 text-medical-primary" />
    </div>
    <h3 className="text-xl font-semibold text-medical-tertiary mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

// Helper component for "How it Works" steps
const HowItWorksStep = ({ icon: Icon, title, description, stepNumber }: { icon: React.ElementType, title: string, description: string, stepNumber: string }) => (
  <div className="flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: `${parseInt(stepNumber) * 150}ms` }}>
    <div className="relative mb-4">
      <div className="w-16 h-16 bg-medical-soft rounded-full flex items-center justify-center">
        <Icon className="w-8 h-8 text-medical-primary" />
      </div>
      <span className="absolute -top-2 -right-2 bg-medical-secondary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">{stepNumber}</span>
    </div>
    <h4 className="text-lg font-semibold text-medical-tertiary mb-1">{title}</h4>
    <p className="text-muted-foreground text-sm max-w-xs">{description}</p>
  </div>
);

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-medical-light">
      {/* Header */}
      <header className="w-full py-4 px-6 md:py-6 sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold text-medical-primary">
            MedicMind<span className="text-medical-secondary">Assist</span>
          </Link>
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="outline" className="border-medical-primary text-medical-primary hover:bg-medical-primary/10">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-medical-primary hover:bg-medical-secondary text-white">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-gradient-to-br from-medical-soft to-medical-light text-center animate-fade-in">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-medical-primary leading-tight">
              Clinical Precision, Simplified.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              MedicMindAssist empowers healthcare professionals with intuitive calculators, vital reference tools, and streamlined workflow optimizations. Focus on your patients, we'll handle the complexities.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-medical-primary hover:bg-medical-secondary text-white px-10 py-6 text-xl font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105">
                Get Started for Free
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">No credit card required. Instant access.</p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-medical-tertiary">Why Choose MedicMindAssist?</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              We provide accurate, reliable, and easy-to-use tools designed by medical professionals, for medical professionals.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={Settings}
                title="Comprehensive Calculators"
                description="Access over 20+ evidence-based medical calculators, regularly updated and easy to navigate."
              />
              <FeatureCard
                icon={Shield}
                title="Secure & HIPAA-Compliant"
                description="Your data's security is our priority. All information is encrypted and handled with utmost confidentiality."
              />
              <FeatureCard
                icon={Zap}
                title="Optimized for Speed"
                description="Designed for efficiency in fast-paced clinical settings, helping you save valuable time."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-20 bg-medical-light">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-medical-tertiary">Get Started in 3 Simple Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 items-start">
              <HowItWorksStep
                stepNumber="1"
                icon={Users}
                title="Create Your Account"
                description="Quick and easy sign-up. Get immediate access to all features."
              />
              <HowItWorksStep
                stepNumber="2"
                icon={LayoutDashboard}
                title="Explore Powerful Tools"
                description="Navigate our extensive library of calculators and clinical resources."
              />
              <HowItWorksStep
                stepNumber="3"
                icon={Activity}
                title="Enhance Your Practice"
                description="Integrate MedicMindAssist into your daily workflow for improved efficiency and decision-making."
              />
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="py-16 md:py-24 bg-medical-primary/90 text-white">
          <div className="container mx-auto px-4 text-center animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Elevate Your Clinical Workflow?</h2>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-90">
              Join thousands of medical professionals who trust MedicMindAssist for accurate calculations and decision support.
            </p>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="bg-white text-medical-primary hover:bg-gray-100 px-10 py-6 text-xl font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105">
                Sign Up Now &rarr;
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-muted-foreground text-sm bg-medical-light border-t border-medical-soft">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} MedicMindAssist. All rights reserved.</p>
          <p className="mt-1">Built with care for the medical community.</p>
          <p className="block mt-3 text-xs opacity-70">This app is for demonstration and educational purposes only. Not for clinical decision-making without professional consultation.</p>
        </div>
      </footer>
    </div>
  );
}
