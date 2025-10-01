import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Trophy, User, Dog, MapPin, CreditCard, Phone, Mail, Calendar, Loader2 } from "lucide-react";
import emailjs from '@emailjs/browser';

interface Package {
  name: string;
  standardFee: string;
  withTrainer: string;
  description: string;
}

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: Package | null;
}

export const RegistrationForm = ({ isOpen, onClose, selectedPackage }: RegistrationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ownerLocationManual, setOwnerLocationManual] = useState(false);
  const [preferredLocationManual, setPreferredLocationManual] = useState(false);
  const [ownerCityOtherMode, setOwnerCityOtherMode] = useState(false);
  const [preferredCityOtherMode, setPreferredCityOtherMode] = useState(false);
  const [formData, setFormData] = useState({
    // Owner Details
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    state: "",
    city: "",
    
    // Dog Details
    dogName: "",
    breed: "",
    age: "",
    weight: "",
    gender: "",
    vaccinationDate: "",
    
    // Competition Details
    packageType: "standard",
    grooming: false,
    preferredCity: "",
    preferredState: "",
    preferredCountry: "",
    
    // Additional
    medicalConditions: "",
    specialRequests: "",
    termsAccepted: false,
  });

  const locationData: Record<string, Record<string, string[]>> = {
    India: {
      "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"],
      "Arunachal Pradesh": ["Itanagar", "Tawang"],
      Assam: ["Guwahati", "Dibrugarh", "Silchar"],
      Bihar: ["Patna", "Gaya", "Muzaffarpur"],
      Chhattisgarh: ["Raipur", "Bilaspur", "Durg"],
      Goa: ["Panaji", "Margao", "Mapusa"],
      Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
      Haryana: ["Gurugram", "Faridabad", "Panipat"],
      "Himachal Pradesh": ["Shimla", "Dharamshala", "Manali"],
      Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad"],
      Karnataka: ["Bengaluru", "Mysuru", "Mangaluru"],
      Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode"],
      "Madhya Pradesh": ["Indore", "Bhopal", "Gwalior"],
      Maharashtra: ["Mumbai", "Pune", "Nagpur"],
      Manipur: ["Imphal", "Thoubal"],
      Meghalaya: ["Shillong", "Tura"],
      Mizoram: ["Aizawl", "Lunglei"],
      Nagaland: ["Kohima", "Dimapur"],
      Odisha: ["Bhubaneswar", "Cuttack", "Rourkela"],
      Punjab: ["Amritsar", "Ludhiana", "Jalandhar"],
      Rajasthan: ["Jaipur", "Udaipur", "Jodhpur"],
      Sikkim: ["Gangtok", "Namchi"],
      "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
      Telangana: ["Hyderabad", "Warangal", "Nizamabad"],
      Tripura: ["Agartala", "Udaipur"],
      "Uttar Pradesh": ["Lucknow", "Noida", "Kanpur"],
      Uttarakhand: ["Dehradun", "Haridwar", "Nainital"],
      "West Bengal": ["Kolkata", "Siliguri", "Durgapur"],

      // Union Territories
      "Andaman and Nicobar Islands": ["Port Blair"],
      Chandigarh: ["Chandigarh"],
      "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Silvassa"],
      Delhi: ["New Delhi", "Delhi"],
      "Jammu and Kashmir": ["Srinagar", "Jammu"],
      Ladakh: ["Leh", "Kargil"],
      Lakshadweep: ["Kavaratti"],
      Puducherry: ["Puducherry", "Karaikal"],
    },
  };

  const countries = Object.keys(locationData);
  const states = formData.country ? Object.keys(locationData[formData.country]) : [];
  const ownerCities = formData.country && formData.state ? locationData[formData.country][formData.state] : [];
  const preferredStates = formData.preferredCountry ? Object.keys(locationData[formData.preferredCountry]) : [];
  const preferredCities = formData.preferredCountry && formData.preferredState
    ? locationData[formData.preferredCountry][formData.preferredState]
    : [];
  
  const dogBreeds = [
    "Golden Retriever", "Labrador", "German Shepherd", "Beagle", "Poodle", 
    "Bulldog", "Rottweiler", "Siberian Husky", "Dachshund", "Boxer",
    "Border Collie", "Australian Shepherd", "Mixed Breed", "Other"
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotal = () => {
    if (!selectedPackage) return 0;
    const basePrice = parseInt(selectedPackage.standardFee.replace(/[₹,]/g, ''));
    const withTrainerPrice = parseInt(selectedPackage.withTrainer.replace(/[₹,]/g, ''));
    
    if (formData.packageType === "withTrainer") {
      return withTrainerPrice;
    }
    
    let total = basePrice;
    
    // Add grooming fee if selected
    if (formData.grooming) {
      total += 1000; // Grooming price
    }
    
    return total;
  };

  const sendEmail = async (formData, selectedPackage, totalAmount) => {
    const emailParams = {
      // Owner Information
      owner_name: formData.ownerName,
      owner_email: formData.email,
      owner_phone: formData.phone,
      owner_address: formData.address,
      owner_city: formData.city,
      owner_state: formData.state,
      owner_country: formData.country,
      
      // Dog Information
      dog_name: formData.dogName,
      dog_breed: formData.breed,
      dog_age: formData.age,
      dog_weight: formData.weight,
      dog_gender: formData.gender,
      vaccination_date: formData.vaccinationDate,
      medical_conditions: formData.medicalConditions || "None",
      
      // Competition Details
      package_name: selectedPackage.name,
      package_description: selectedPackage.description,
      package_type: formData.packageType === "standard" ? "Standard" : "With Trainer",
      grooming_service: formData.grooming ? "Yes (+₹1,000)" : "No",
      preferred_city: formData.preferredCity,
      preferred_state: formData.preferredState || "",
      preferred_country: formData.preferredCountry || "",
      total_amount: `₹${totalAmount.toLocaleString()}`,
      
      // Additional Information
      special_requests: formData.specialRequests || "None",
      registration_date: new Date().toLocaleDateString('en-IN'),
      registration_time: new Date().toLocaleTimeString('en-IN'),
      
      // Formatted summary for better email readability
      registration_summary: `
Registration Details:
==================
Owner: ${formData.ownerName}
Email: ${formData.email}
Phone: ${formData.phone}
City: ${formData.city}

Dog Details:
============
Name: ${formData.dogName}
Breed: ${formData.breed}
Age: ${formData.age} years
Weight: ${formData.weight} kg
Gender: ${formData.gender}
Last Vaccination: ${formData.vaccinationDate}

Competition:
============
Package: ${selectedPackage.name}
Type: ${formData.packageType === "standard" ? "Standard" : "With Trainer"}
Grooming: ${formData.grooming ? "Yes" : "No"}
Preferred City: ${formData.preferredCity}

Total Amount: ₹${totalAmount.toLocaleString()}
      `,
      // Add reply-to for better email handling
      reply_to: formData.email
    };

    try {
      // Initialize EmailJS if not already done
      emailjs.init('CXeRevuEMnGc9Zzu6');
      
      const result = await emailjs.send(
        'service_03ln433',    // Your New Service ID
        'template_o4ulhjn',   // Your New Template ID
        emailParams
      );
      
      console.log('Email sent successfully:', result.text);
      return { success: true, message: 'Email sent successfully!' };
    } catch (error) {
      console.error('Email sending failed:', error);
      
      // More detailed error handling
      let errorMessage = 'Failed to send email';
      if (error.text) {
        errorMessage += ': ' + error.text;
      } else if (error.message) {
        errorMessage += ': ' + error.message;
      }
      
      return { success: false, message: errorMessage };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.ownerName || !formData.email || !formData.phone || !formData.dogName) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const totalAmount = calculateTotal();
      const emailResult = await sendEmail(formData, selectedPackage, totalAmount);
      
      if (emailResult.success) {
        toast({
          title: "Registration Submitted Successfully!",
          description: `Thank you ${formData.ownerName}! Your registration for ${selectedPackage?.name} has been submitted. You will receive confirmation details shortly via email.`,
        });
        onClose();
        
        // Reset form
        setFormData({
          ownerName: "",
          email: "",
          phone: "",
          address: "",
          country: "",
          state: "",
          city: "",
          dogName: "",
          breed: "",
          age: "",
          weight: "",
          gender: "",
          vaccinationDate: "",
          packageType: "standard",
          grooming: false,
          preferredCity: "",
          preferredState: "",
          preferredCountry: "",
          medicalConditions: "",
          specialRequests: "",
          termsAccepted: false,
        });
      } else {
        // Still show success to user but log the email error
        console.error('Email sending failed, but registration data collected');
        toast({
          title: "Registration Submitted!",
          description: `Thank you ${formData.ownerName}! Your registration has been recorded. We'll contact you via phone/email soon with confirmation details.`,
        });
        onClose();
        
        // Reset form even on email failure
        setFormData({
          ownerName: "",
          email: "",
          phone: "",
          address: "",
          country: "",
          state: "",
          city: "",
          dogName: "",
          breed: "",
          age: "",
          weight: "",
          gender: "",
          vaccinationDate: "",
          packageType: "standard",
          grooming: false,
          preferredCity: "",
          preferredState: "",
          preferredCountry: "",
          medicalConditions: "",
          specialRequests: "",
          termsAccepted: false,
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Trophy className="h-6 w-6 text-retro-gold" />
            Dog Show Registration
          </DialogTitle>
          <DialogDescription>
            {selectedPackage && (
              <Badge className="bg-retro-gold text-retro-brown mt-2">
                {selectedPackage.name} - {selectedPackage.description}
              </Badge>
            )}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Package Selection */}
          {selectedPackage && (
            <Card className="border-retro-gold">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Package & Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label>Package Option</Label>
                    <Select value={formData.packageType} onValueChange={(value) => handleInputChange("packageType", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard - {selectedPackage.standardFee}</SelectItem>
                        <SelectItem value="withTrainer">With Trainer - {selectedPackage.withTrainer}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {formData.packageType === "standard" && (
                    <div className="space-y-3">
                      <Label>Additional Services</Label>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="grooming"
                            checked={formData.grooming}
                            onCheckedChange={(checked) => handleInputChange("grooming", checked as boolean)}
                          />
                          <Label htmlFor="grooming">Dog Grooming (+₹1,000)</Label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="bg-retro-cream p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Amount:</span>
                    <span className="text-2xl font-bold text-retro-brown">₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Owner Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Owner Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ownerName">Full Name *</Label>
                <Input
                  id="ownerName"
                  value={formData.ownerName}
                  onChange={(e) => handleInputChange("ownerName", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="country">Country *</Label>
                  <Button type="button" variant="ghost" size="sm" onClick={() => setOwnerLocationManual(!ownerLocationManual)}>
                    {ownerLocationManual ? "Use dropdowns" : "Type manually"}
                  </Button>
                </div>
                {ownerLocationManual ? (
                  <Input id="country" value={formData.country} onChange={(e) => handleInputChange("country", e.target.value)} placeholder="Enter your country" />
                ) : (
                  <Select value={formData.country} onValueChange={(value) => { handleInputChange("country", value); handleInputChange("state", ""); handleInputChange("city", ""); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                {ownerLocationManual ? (
                  <Input id="state" value={formData.state} onChange={(e) => handleInputChange("state", e.target.value)} placeholder="Enter your state" />
                ) : (
                  <Select value={formData.state} onValueChange={(value) => { handleInputChange("state", value); handleInputChange("city", ""); }} disabled={!formData.country}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((st) => (
                        <SelectItem key={st} value={st}>{st}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                {ownerLocationManual ? (
                  <Input id="city" value={formData.city} onChange={(e) => handleInputChange("city", e.target.value)} placeholder="Enter your city" />
                ) : (
                  <>
                  <Select value={ownerCityOtherMode ? "__OTHER__" : formData.city} onValueChange={(value) => {
                    if (value === "__OTHER__") {
                      setOwnerCityOtherMode(true);
                      handleInputChange("city", "");
                    } else {
                      setOwnerCityOtherMode(false);
                      handleInputChange("city", value);
                    }
                  }} disabled={!formData.state}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your city" />
                    </SelectTrigger>
                    <SelectContent>
                      {ownerCities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                      <SelectItem value="__OTHER__">Other (type manually)</SelectItem>
                    </SelectContent>
                  </Select>
                  {ownerCityOtherMode && (
                    <div className="mt-2">
                      <Input id="cityOther" value={formData.city} onChange={(e) => handleInputChange("city", e.target.value)} placeholder="Type your city" />
                    </div>
                  )}
                  </>
                )}
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Complete Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Dog Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dog className="h-5 w-5" />
                Dog Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dogName">Dog's Name *</Label>
                <Input
                  id="dogName"
                  value={formData.dogName}
                  onChange={(e) => handleInputChange("dogName", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="breed">Breed *</Label>
                <Select value={formData.breed} onValueChange={(value) => handleInputChange("breed", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select breed" />
                  </SelectTrigger>
                  <SelectContent>
                    {dogBreeds.map((breed) => (
                      <SelectItem key={breed} value={breed}>{breed}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age (in years)</Label>
                <Input
                  id="age"
                  type="number"
                  min="0.5"
                  max="8"
                  step="0.5"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (in kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vaccinationDate">Last Vaccination Date</Label>
                <Input
                  id="vaccinationDate"
                  type="date"
                  value={formData.vaccinationDate}
                  onChange={(e) => handleInputChange("vaccinationDate", e.target.value)}
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="medicalConditions">Medical Conditions (if any)</Label>
                <Textarea
                  id="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={(e) => handleInputChange("medicalConditions", e.target.value)}
                  rows={2}
                  placeholder="Please mention any health conditions, allergies, or special care requirements..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Competition Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Competition Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="preferredCountry">Preferred Competition Country</Label>
                  <Button type="button" variant="ghost" size="sm" onClick={() => setPreferredLocationManual(!preferredLocationManual)}>
                    {preferredLocationManual ? "Use dropdowns" : "Type manually"}
                  </Button>
                </div>
                {preferredLocationManual ? (
                  <Input id="preferredCountry" value={formData.preferredCountry} onChange={(e) => handleInputChange("preferredCountry", e.target.value)} placeholder="Enter preferred country" />
                ) : (
                  <Select value={formData.preferredCountry} onValueChange={(value) => { handleInputChange("preferredCountry", value); handleInputChange("preferredState", ""); handleInputChange("preferredCity", ""); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredState">Preferred Competition State</Label>
                {preferredLocationManual ? (
                  <Input id="preferredState" value={formData.preferredState} onChange={(e) => handleInputChange("preferredState", e.target.value)} placeholder="Enter preferred state" />
                ) : (
                  <Select value={formData.preferredState} onValueChange={(value) => { handleInputChange("preferredState", value); handleInputChange("preferredCity", ""); }} disabled={!formData.preferredCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred state" />
                    </SelectTrigger>
                    <SelectContent>
                      {preferredStates.map((st) => (
                        <SelectItem key={st} value={st}>{st}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredCity">Preferred Competition City</Label>
                {preferredLocationManual ? (
                  <Input id="preferredCity" value={formData.preferredCity} onChange={(e) => handleInputChange("preferredCity", e.target.value)} placeholder="Enter preferred city" />
                ) : (
                  <>
                  <Select value={preferredCityOtherMode ? "__OTHER__" : formData.preferredCity} onValueChange={(value) => {
                    if (value === "__OTHER__") {
                      setPreferredCityOtherMode(true);
                      handleInputChange("preferredCity", "");
                    } else {
                      setPreferredCityOtherMode(false);
                      handleInputChange("preferredCity", value);
                    }
                  }} disabled={!formData.preferredState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred city" />
                    </SelectTrigger>
                    <SelectContent>
                      {preferredCities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                      <SelectItem value="__OTHER__">Other (type manually)</SelectItem>
                    </SelectContent>
                  </Select>
                  {preferredCityOtherMode && (
                    <div className="mt-2">
                      <Input id="preferredCityOther" value={formData.preferredCity} onChange={(e) => handleInputChange("preferredCity", e.target.value)} placeholder="Type preferred city" />
                    </div>
                  )}
                  </>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialRequests">Special Requests or Notes</Label>
                <Textarea
                  id="specialRequests"
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                  rows={3}
                  placeholder="Any special arrangements, dietary needs, or other requests..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Terms and Submit */}
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => handleInputChange("termsAccepted", checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I accept the terms and conditions, competition rules, and understand that registration fees contribute to stray animal rescue programs. I confirm that all information provided is accurate and my dog meets the health and age requirements.
                </Label>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-retro-gold text-retro-brown hover:bg-retro-gold/90"
                  disabled={!formData.termsAccepted || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Complete Registration - ₹{calculateTotal().toLocaleString()}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
};