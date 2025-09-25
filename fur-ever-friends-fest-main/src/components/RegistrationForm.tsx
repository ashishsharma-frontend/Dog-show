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
import { Trophy, User, Dog, MapPin, CreditCard, Phone, Mail, Calendar } from "lucide-react";

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
  const [formData, setFormData] = useState({
    // Owner Details
    ownerName: "",
    email: "",
    phone: "",
    address: "",
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
    
    // Additional
    medicalConditions: "",
    specialRequests: "",
    termsAccepted: false,
  });

  const cities = ["Gwalior", "Indore", "Delhi", "Bhopal", "Mumbai", "Chennai", "Ahmedabad", "Jaipur", "Kolkata", "Goa"];
  
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
  // Trainer is handled via 'withTrainer' package option; no separate add-on fee here

    // Add grooming fee if selected
    if (formData.grooming) {
      total += 1000; // Grooming price
    }
    
    return total;
  };

  const handleSubmit = (e: React.FormEvent) => {
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

    // Simulate form submission
    toast({
      title: "Registration Submitted!",
      description: `Thank you ${formData.ownerName}! Your registration for ${selectedPackage?.name} has been submitted. You will receive confirmation details shortly.`,
    });

    onClose();
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
                <Label htmlFor="city">City *</Label>
                <Select value={formData.city} onValueChange={(value) => handleInputChange("city", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <Label htmlFor="preferredCity">Preferred Competition City</Label>
                <Select value={formData.preferredCity} onValueChange={(value) => handleInputChange("preferredCity", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-retro-gold text-retro-brown hover:bg-retro-gold/90"
                  disabled={!formData.termsAccepted}
                >
                  Complete Registration - ₹{calculateTotal().toLocaleString()}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
};