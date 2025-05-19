import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/AuthContext'; // Import useAuth hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

const Registration: React.FC = () => {
  const { register } = useAuth(); // Use the register function from AuthContext
  const navigate = useNavigate(); // Use navigate for redirection
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await register(values.email, values.password);
      setShowDisclaimer(true);
      setAgreed(false);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleGuestSignUp = async () => {
    try {
      await register('guest@example.com', 'guestpassword');
      setShowDisclaimer(true);
      setAgreed(false);
    } catch (error) {
      console.error('Guest sign up failed:', error);
    }
  };

  const handleAgreeChange = (checked: boolean | 'indeterminate') => {
    setAgreed(checked === true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new MedicMindAssist account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-medical-primary hover:bg-medical-secondary text-white font-bold rounded-lg">Sign Up</Button>
            </form>
          </Form>
          <div className="mt-4">
            <Button onClick={handleGuestSignUp} className="w-full bg-medical-primary hover:bg-medical-secondary text-white font-bold rounded-lg" variant="outline">Sign Up as Guest</Button>
          </div>
        </CardContent>
      </Card>
      <Dialog open={showDisclaimer} onOpenChange={setShowDisclaimer}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disclaimer</DialogTitle>
            <DialogDescription>
              <div className="mb-4 text-sm text-foreground text-justify space-y-2">
                <strong>Important Notice:</strong><br/>
                <p>MedicMindAssist is provided for demonstration and educational purposes only. This application is not intended for use in actual clinical decision-making, diagnosis, or treatment of patients.</p>
                <p>The calculators, reference tools, and any information provided by this app may be incomplete, outdated, or inaccurate. Do not rely on this app for medical advice, and always consult a qualified healthcare professional for clinical decisions.</p>
                <p>By continuing, you acknowledge that you understand and accept these limitations and agree not to use this app for real patient care or as a substitute for professional judgment.</p>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Checkbox id="agree" checked={agreed} onCheckedChange={handleAgreeChange} />
                <label htmlFor="agree" className="text-xs">I have read and agree to the above disclaimer.</label>
              </div>
              <Button className="w-full bg-medical-primary hover:bg-medical-secondary text-white font-bold rounded-lg" disabled={!agreed} onClick={() => { setShowDisclaimer(false); navigate('/calculators'); }}>Continue</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Registration;
