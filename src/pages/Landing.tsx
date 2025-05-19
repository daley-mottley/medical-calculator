import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-light-gray">
      <header className="w-full py-6 px-4 flex justify-between items-center bg-white shadow-md">
        <span className="text-2xl font-bold text-medical-primary">
          MedicMind<span className="text-medical-secondary">Assist</span>
        </span>
        <div className="flex gap-4">
          <Link to="/login">
            <Button className="bg-medical-primary hover:bg-medical-secondary text-white">Login</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <section className="max-w-2xl text-center mt-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-medical-primary leading-tight">
            Empowering Medical Professionals
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            MedicMindAssist is your all-in-one clinical decision support tool. Access calculators, reference tools, and workflow optimizations designed for busy healthcare providers.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-medical-primary hover:bg-medical-secondary text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg">
              Sign Up for Free
            </Button>
          </Link>
        </section>
        <section className="mt-20 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-medical-primary text-3xl font-bold mb-2">20+</span>
            <span className="font-medium text-lg mb-1">Medical Calculators</span>
            <span className="text-muted-foreground text-sm">Evidence-based, up-to-date, and easy to use</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-medical-primary text-3xl font-bold mb-2">Secure</span>
            <span className="font-medium text-lg mb-1">HIPAA-compliant</span>
            <span className="text-muted-foreground text-sm">Your data is encrypted and never shared</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-medical-primary text-3xl font-bold mb-2">Fast</span>
            <span className="font-medium text-lg mb-1">Optimized for Workflow</span>
            <span className="text-muted-foreground text-sm">Designed for efficiency in clinical settings</span>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 text-center text-muted-foreground text-sm bg-light-gray mt-12">
        &copy; {new Date().getFullYear()} MedicMindAssist. All rights reserved.<br />
        <span className="block mt-2">This app is for demonstration purposes only.</span>
      </footer>
    </div>
  );
} 