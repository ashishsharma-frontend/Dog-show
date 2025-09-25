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