import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Bell, 
  Edit2, 
  Save,
  Camera
} from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    gender: "Male",
    age: "32",
    bloodGroup: "O+",
    address: "123, Main Street, Sector 15",
    city: "Mumbai",
    pincode: "400001",
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 md:pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">My Profile</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Manage your personal information and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="lg:col-span-1">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <Avatar className="w-24 h-24 md:w-32 md:h-32">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-2xl md:text-3xl bg-primary/10 text-primary">
                        {profile.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="absolute bottom-0 right-0 rounded-full w-8 h-8"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <h2 className="text-lg md:text-xl font-semibold mt-4">{profile.name}</h2>
                  <p className="text-muted-foreground text-sm">{profile.email}</p>
                  <Badge className="mt-2" variant="secondary">Verified</Badge>
                  
                  <div className="w-full mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{profile.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{profile.city}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Member since Jan 2024</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Details Tabs */}
            <Card className="lg:col-span-2">
              <Tabs defaultValue="personal" className="w-full">
                <CardHeader className="pb-0">
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="personal" className="text-xs md:text-sm">Personal</TabsTrigger>
                    <TabsTrigger value="address" className="text-xs md:text-sm">Address</TabsTrigger>
                    <TabsTrigger value="security" className="text-xs md:text-sm">Security</TabsTrigger>
                  </TabsList>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <TabsContent value="personal" className="mt-0">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-semibold">Personal Information</h3>
                      <Button 
                        variant={isEditing ? "default" : "outline"} 
                        size="sm"
                        onClick={isEditing ? handleSave : () => setIsEditing(true)}
                      >
                        {isEditing ? (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save
                          </>
                        ) : (
                          <>
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input 
                          value={profile.name} 
                          disabled={!isEditing}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input 
                          value={profile.email} 
                          disabled={!isEditing}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input 
                          value={profile.phone} 
                          disabled={!isEditing}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <Input 
                          value={profile.gender} 
                          disabled={!isEditing}
                          onChange={(e) => setProfile({...profile, gender: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Age</Label>
                        <Input 
                          value={profile.age} 
                          disabled={!isEditing}
                          onChange={(e) => setProfile({...profile, age: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Blood Group</Label>
                        <Input 
                          value={profile.bloodGroup} 
                          disabled={!isEditing}
                          onChange={(e) => setProfile({...profile, bloodGroup: e.target.value})}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="address" className="mt-0">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-semibold">Address Details</h3>
                      <Button 
                        variant={isEditing ? "default" : "outline"} 
                        size="sm"
                        onClick={isEditing ? handleSave : () => setIsEditing(true)}
                      >
                        {isEditing ? (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save
                          </>
                        ) : (
                          <>
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Full Address</Label>
                        <Input 
                          value={profile.address} 
                          disabled={!isEditing}
                          onChange={(e) => setProfile({...profile, address: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>City</Label>
                          <Input 
                            value={profile.city} 
                            disabled={!isEditing}
                            onChange={(e) => setProfile({...profile, city: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Pincode</Label>
                          <Input 
                            value={profile.pincode} 
                            disabled={!isEditing}
                            onChange={(e) => setProfile({...profile, pincode: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="security" className="mt-0">
                    <h3 className="font-semibold mb-6">Security Settings</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium text-sm">Change Password</p>
                            <p className="text-xs text-muted-foreground">Update your password regularly</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Change</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Bell className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium text-sm">Notifications</p>
                            <p className="text-xs text-muted-foreground">Manage email & SMS alerts</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
