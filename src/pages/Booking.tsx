import { useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { AddressSelector } from "@/components/booking/AddressSelector";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  Phone,
  CheckCircle2,
} from "lucide-react";

const allTests = [
  { id: 1, name: "Complete Blood Count (CBC)", price: 399 },
  { id: 2, name: "Lipid Profile", price: 499 },
  { id: 3, name: "Thyroid Panel (T3, T4, TSH)", price: 599 },
  { id: 4, name: "Diabetes Panel", price: 699 },
  { id: 5, name: "Vitamin Profile", price: 1299 },
  { id: 6, name: "Bone Health Panel", price: 899 },
  { id: 7, name: "Liver Function Test (LFT)", price: 549 },
  { id: 8, name: "Kidney Function Test (KFT)", price: 499 },
  { id: 9, name: "Iron Studies", price: 699 },
  { id: 10, name: "Cardiac Markers", price: 1499 },
  { id: 11, name: "MRI Brain", price: 5999 },
  { id: 12, name: "CT Scan Chest", price: 3999 },
  { id: 13, name: "X-Ray Chest", price: 399 },
  { id: 14, name: "Ultrasound Abdomen", price: 999 },
  { id: 15, name: "Hormone Panel (Female)", price: 1999 },
  { id: 16, name: "Hormone Panel (Male)", price: 1799 },
];

const timeSlots = [
  "7:00 AM - 8:00 AM",
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
];

const Booking = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const partner = searchParams.get("partner") || "Dr. Diagnostic Lab";
  const test = allTests.find((t) => t.id === Number(id));

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    timeSlot: "",
    addressType: "home" as "home" | "office" | "other",
    address: "",
    landmark: "",
    city: "",
    pincode: "",
    latitude: 0,
    longitude: 0,
  });
  const [addressConfirmed, setAddressConfirmed] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressConfirm = (addressData: {
    address: string;
    landmark: string;
    city: string;
    pincode: string;
    latitude: number;
    longitude: number;
    addressType: "home" | "office" | "other";
  }) => {
    setFormData({
      ...formData,
      ...addressData,
    });
    setAddressConfirmed(true);
  };

  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
      });
    }
    return dates;
  };

  if (!test) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 text-center py-20">
            <h1 className="text-2xl font-bold mb-4">Test not found</h1>
            <Link to="/tests">
              <Button>Back to Tests</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Link to={`/tests/${id}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Test Details
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              {/* Progress Steps */}
              <div className="flex items-center gap-4 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                    </div>
                    <span className={`text-sm hidden sm:block ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                      {s === 1 ? "Details" : s === 2 ? "Schedule" : "Address"}
                    </span>
                    {s < 3 && <div className="w-12 h-0.5 bg-muted" />}
                  </div>
                ))}
              </div>

              {/* Step 1: Personal Details */}
              {step === 1 && (
                <div className="bg-card rounded-2xl p-6 border border-border animate-fade-in">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Personal Details
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number *</label>
                      <div className="flex">
                        <span className="flex items-center px-4 border border-r-0 border-border rounded-l-xl bg-muted text-muted-foreground">
                          +91
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter 10-digit number"
                          className="flex-1 h-12 px-4 rounded-r-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-6" 
                    size="lg"
                    onClick={() => setStep(2)}
                    disabled={!formData.name || !formData.phone}
                  >
                    Continue to Schedule
                  </Button>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <div className="bg-card rounded-2xl p-6 border border-border animate-fade-in">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Select Date & Time
                  </h2>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-3">Select Date *</label>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {generateDates().map((d) => (
                        <button
                          key={d.value}
                          onClick={() => setFormData({ ...formData, date: d.value })}
                          className={`p-3 rounded-xl text-center transition-all ${
                            formData.date === d.value
                              ? "bg-primary text-primary-foreground shadow-glow"
                              : "bg-muted hover:bg-muted/80"
                          }`}
                        >
                          <div className="text-xs opacity-70">{d.day}</div>
                          <div className="text-lg font-bold">{d.date}</div>
                          <div className="text-xs opacity-70">{d.month}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Select Time Slot *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setFormData({ ...formData, timeSlot: slot })}
                          className={`p-3 rounded-xl text-sm font-medium transition-all ${
                            formData.timeSlot === slot
                              ? "bg-primary text-primary-foreground shadow-glow"
                              : "bg-muted hover:bg-muted/80"
                          }`}
                        >
                          <Clock className="w-4 h-4 mx-auto mb-1" />
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Button variant="outline" size="lg" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button 
                      className="flex-1" 
                      size="lg"
                      onClick={() => setStep(3)}
                      disabled={!formData.date || !formData.timeSlot}
                    >
                      Continue to Address
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Address */}
              {step === 3 && (
                <div className="bg-card rounded-2xl p-6 border border-border animate-fade-in">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Collection Address
                  </h2>

                  {!addressConfirmed ? (
                    <AddressSelector
                      initialData={{
                        address: formData.address,
                        landmark: formData.landmark,
                        city: formData.city,
                        pincode: formData.pincode,
                        latitude: formData.latitude,
                        longitude: formData.longitude,
                        addressType: formData.addressType,
                      }}
                      onAddressConfirm={handleAddressConfirm}
                    />
                  ) : (
                    <div className="space-y-4">
                      {/* Confirmed Address Display */}
                      <div className="p-4 rounded-xl bg-success/10 border border-success/30">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
                          <div className="flex-1">
                            <p className="font-medium text-foreground capitalize">{formData.addressType}</p>
                            <p className="text-sm text-muted-foreground mt-1">{formData.address}</p>
                            {formData.landmark && (
                              <p className="text-sm text-muted-foreground">Near: {formData.landmark}</p>
                            )}
                            <p className="text-sm text-muted-foreground">{formData.city} - {formData.pincode}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setAddressConfirmed(false)}
                            className="text-primary"
                          >
                            Change
                          </Button>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-6">
                        <Button variant="outline" size="lg" onClick={() => setStep(2)}>
                          Back
                        </Button>
                        <Button className="flex-1" size="lg">
                          Proceed to Payment
                        </Button>
                      </div>
                    </div>
                  )}

                  {!addressConfirmed && (
                    <div className="mt-4">
                      <Button variant="outline" size="lg" onClick={() => setStep(2)}>
                        Back
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-card rounded-2xl p-6 border border-border sticky top-28">
                <h3 className="font-bold mb-4">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="p-4 rounded-xl bg-muted/50">
                    <p className="font-medium mb-1">{test.name}</p>
                    <p className="text-sm text-muted-foreground">Partner: {partner}</p>
                  </div>

                  {formData.date && formData.timeSlot && (
                    <div className="p-4 rounded-xl bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-1">Scheduled for</p>
                      <p className="font-medium">{formData.date}</p>
                      <p className="text-sm text-primary">{formData.timeSlot}</p>
                    </div>
                  )}
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Test Price</span>
                    <span>₹{test.price}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Home Collection</span>
                    <span className="text-success">FREE</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">₹{test.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

    </div>
  );
};

export default Booking;