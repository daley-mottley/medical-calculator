import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/ui/StatCard';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { ShieldCheck, Stethoscope, Timer, UserCheck, Star } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-light-gray font-sans">
      {/* Header */}
      <header className="w-full py-6 px-4 flex justify-between items-center bg-white shadow-md sticky top-0 z-30">
        <span className="text-3xl font-extrabold text-medical-primary tracking-tight flex items-center gap-2">
          <img src="/public/hero-medical.svg" alt="Logo" className="w-10 h-10 rounded-lg bg-white shadow-sm border border-medical-primary/20" />
          MedicMind<span className="text-medical-secondary">Assist</span>
        </span>
        <div className="flex gap-4">
          <Link to="/login">
            <Button className="bg-medical-primary hover:bg-medical-secondary text-white font-semibold shadow-md">Login</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4 w-full">
        {/* Hero Section */}
        <section className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between mt-16 gap-12 md:gap-20">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-medical-primary leading-tight drop-shadow-sm">
              Clinical Decisions, <span className="text-medical-secondary">Simplified</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0">
              The all-in-one platform for medical professionals: calculators, reference tools, and workflow optimizations—trusted by clinicians, built for speed and security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start justify-center md:justify-start mb-6">
              <Link to="/register">
                <Button size="lg" className="bg-medical-primary hover:bg-medical-secondary text-white px-10 py-5 text-xl font-bold rounded-2xl shadow-xl transition-transform duration-150 hover:scale-105">
                  Get Started Free
                </Button>
              </Link>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <Badge className="bg-green-100 text-green-700 border-green-200 text-base px-3 py-1">HIPAA Compliant</Badge>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-base px-3 py-1">Secure</Badge>
                <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 text-base px-3 py-1">Trusted by Clinicians</Badge>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end relative">
            <div className="relative w-96 h-96 max-w-full flex items-center justify-center">
              <img src="/public/hero-medical.svg" alt="Medical Illustration" className="w-full h-full object-contain rounded-2xl shadow-2xl bg-white p-6 border-4 border-medical-primary/10" onError={e => (e.currentTarget.style.display='none')} />
              <div className="absolute bottom-4 right-4 bg-white/80 rounded-xl px-4 py-2 shadow-md flex items-center gap-2 text-medical-primary text-lg font-semibold">
                <ShieldCheck className="w-5 h-5 text-green-500" /> Secure & Private
              </div>
            </div>
          </div>
        </section>
        {/* Stats Section */}
        <section className="mt-20 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard
            title="Medical Calculators"
            value="20+"
            icon={<Stethoscope className="w-7 h-7 text-medical-primary" />}
            description="Evidence-based, up-to-date, and easy to use"
          />
          <StatCard
            title="HIPAA-Compliant"
            value="Secure"
            icon={<ShieldCheck className="w-7 h-7 text-medical-primary" />}
            description="Your data is encrypted and never shared"
          />
          <StatCard
            title="Optimized for Workflow"
            value="Fast"
            icon={<Timer className="w-7 h-7 text-medical-primary" />}
            description="Designed for efficiency in clinical settings"
          />
        </section>
        {/* How It Works Section */}
        <section className="mt-24 w-full max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-medical-primary mb-10 tracking-tight">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card className="flex flex-col items-center p-8 shadow-lg border-2 border-medical-primary/10">
              <CardHeader>
                <div className="bg-medical-primary/10 rounded-full p-5 mb-3">
                  <UserCheck className="w-10 h-10 text-medical-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">Sign Up</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground text-lg">
                Create your free account in seconds. No credit card required.
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center p-8 shadow-lg border-2 border-medical-primary/10">
              <CardHeader>
                <div className="bg-medical-primary/10 rounded-full p-5 mb-3">
                  <Stethoscope className="w-10 h-10 text-medical-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">Access Tools</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground text-lg">
                Instantly access calculators and reference tools tailored for clinicians.
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center p-8 shadow-lg border-2 border-medical-primary/10">
              <CardHeader>
                <div className="bg-medical-primary/10 rounded-full p-5 mb-3">
                  <Timer className="w-10 h-10 text-medical-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">Save Time</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground text-lg">
                Streamline your workflow and focus on patient care, not paperwork.
              </CardContent>
            </Card>
          </div>
        </section>
        {/* Testimonials Section */}
        <section className="mt-24 w-full max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-medical-primary mb-10 tracking-tight">What Clinicians Say</h2>
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              <CarouselItem>
                <Card className="p-8 flex flex-col items-center shadow-xl border-2 border-medical-primary/10 bg-white/90">
                  <Avatar className="mb-4 w-20 h-20 shadow-md">
                    <AvatarImage src="/public/doctor1.jpg" alt="Dr. Smith" />
                    <AvatarFallback>DS</AvatarFallback>
                  </Avatar>
                  <p className="text-center text-xl font-medium mb-3 text-medical-primary">“MedicMindAssist has transformed my daily workflow. The calculators are spot on and save me so much time!”</p>
                  <span className="text-medical-primary font-semibold text-lg">Dr. Jane Smith</span>
                  <span className="text-muted-foreground text-base">Internal Medicine</span>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card className="p-8 flex flex-col items-center shadow-xl border-2 border-medical-primary/10 bg-white/90">
                  <Avatar className="mb-4 w-20 h-20 shadow-md">
                    <AvatarImage src="/public/doctor2.jpg" alt="Dr. Lee" />
                    <AvatarFallback>DL</AvatarFallback>
                  </Avatar>
                  <p className="text-center text-xl font-medium mb-3 text-medical-primary">“A must-have for any clinician. Secure, fast, and incredibly easy to use.”</p>
                  <span className="text-medical-primary font-semibold text-lg">Dr. Alex Lee</span>
                  <span className="text-muted-foreground text-base">Emergency Medicine</span>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card className="p-8 flex flex-col items-center shadow-xl border-2 border-medical-primary/10 bg-white/90">
                  <Avatar className="mb-4 w-20 h-20 shadow-md">
                    <AvatarImage src="/public/doctor3.jpg" alt="Dr. Patel" />
                    <AvatarFallback>DP</AvatarFallback>
                  </Avatar>
                  <p className="text-center text-xl font-medium mb-3 text-medical-primary">“I recommend MedicMindAssist to all my colleagues. It's become an essential part of my practice.”</p>
                  <span className="text-medical-primary font-semibold text-lg">Dr. Priya Patel</span>
                  <span className="text-muted-foreground text-base">Family Medicine</span>
                </Card>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </section>
        {/* Final CTA Section */}
        <section className="mt-24 w-full max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-medical-primary mb-6">Ready to Transform Your Workflow?</h2>
          <Link to="/register">
            <Button size="lg" className="bg-medical-primary hover:bg-medical-secondary text-white px-10 py-5 text-xl font-bold rounded-2xl shadow-xl transition-transform duration-150 hover:scale-105">
              Get Started Free
            </Button>
          </Link>
        </section>
        {/* Sticky CTA for Mobile */}
        <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center md:hidden pointer-events-none">
          <Link to="/register" className="pointer-events-auto">
            <Button size="lg" className="bg-medical-primary hover:bg-medical-secondary text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl animate-bounce-slow">
              Sign Up Free
            </Button>
          </Link>
        </div>
      </main>
      {/* Footer */}
      <footer className="w-full py-8 text-center text-muted-foreground text-base bg-light-gray mt-20 border-t border-medical-primary/10">
        &copy; {new Date().getFullYear()} MedicMindAssist. All rights reserved.<br />
        <span className="block mt-2">This app is for demonstration purposes only.</span>
      </footer>
    </div>
  );
} 