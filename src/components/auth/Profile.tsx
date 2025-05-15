import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext'; // Import useAuth hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Profile: React.FC = () => {
  const { user, logout } = useAuth(); // Use the user and logout function from AuthContext
  const navigate = useNavigate(); // Use navigate for redirection

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  if (!user) {
    // Optionally redirect to login if not authenticated, or show a message
    // navigate('/login'); // Uncomment to automatically redirect
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Please log in to view your profile.</p>
            <Button onClick={() => navigate('/login')} className="mt-4 w-full bg-medical-primary hover:bg-medical-secondary">Go to Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Manage your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">User Information</h3>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={user.name} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user.email} readOnly />
            </div>
            {/* Add Medical Specialty field if available in user object */}
            {/* <div className="space-y-2">
              <Label htmlFor="specialty">Medical Specialty</Label>
              <Input id="specialty" value={user.specialty} readOnly />
            </div> */}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Settings</h3>
            {/* Placeholder for settings options */}
            <p className="text-muted-foreground">[Settings options will go here]</p>
            {/* Example setting */}
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              {/* Replace with actual theme selector component */}
              <Input id="theme" value="Light Mode" readOnly />
            </div>
          </div>

          <Button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600">Logout</Button>
        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate(-1)} className="w-full" variant="outline">Back</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
