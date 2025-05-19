import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext'; // Import useAuth hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useRef, useState } from 'react';

const Profile: React.FC = () => {
  const { user, logout, updateUser, updateProfileImage } = useAuth(); // Use the user and logout function from AuthContext
  const navigate = useNavigate(); // Use navigate for redirection
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user?.name || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  const handleNameSave = () => {
    updateUser({ name: nameInput });
    setEditingName(false);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
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
      <Card className="w-[400px] shadow-xl rounded-2xl">
        <CardHeader className="items-center text-center pb-0 pt-8">
          <CardTitle className="text-2xl font-bold">Profile</CardTitle>
          <CardDescription className="mb-2">Manage your account information</CardDescription>
        </CardHeader>
        <div className="flex flex-col items-center justify-center gap-2 mt-2 mb-6">
          <Avatar className="h-24 w-24 shadow border-4 border-white bg-muted">
            <AvatarImage src={user.profileImage} alt={user.name} />
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
          </Avatar>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleProfileImageChange}
          />
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => fileInputRef.current?.click()}
          >
            Change Profile Image
          </Button>
        </div>
        <CardContent className="space-y-6 pt-0">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-left">User Information</h3>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              {editingName ? (
                <div className="flex gap-2">
                  <Input
                    id="name"
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    autoFocus
                  />
                  <Button size="sm" onClick={handleNameSave} className="bg-medical-primary">Save</Button>
                  <Button size="sm" variant="outline" onClick={() => { setEditingName(false); setNameInput(user.name); }}>Cancel</Button>
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <Input id="name" value={user.name} readOnly />
                  <Button size="sm" variant="outline" onClick={() => setEditingName(true)}>Edit</Button>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user.email} readOnly />
            </div>
          </div>
          <hr className="my-6 border-t border-gray-200" />
          <div className="flex flex-col gap-2">
            <Button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600">Logout</Button>
            <Button onClick={() => navigate(-1)} className="w-full" variant="outline">Back</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
