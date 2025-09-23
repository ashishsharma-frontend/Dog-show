import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Trophy, Heart, Phone, Mail, Globe, Star, Award, Users, CheckCircle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RegistrationForm } from "@/components/RegistrationForm";
import heroImage from "@/assets/hero-dog-show.jpg";
import rescueImage from "@/assets/rescue-dogs.jpg";
import galleryImage from "@/assets/gallery-dogs.jpg";
import DonateImg from "@/assets/Donate.png";
import { CreditCard, Smartphone, Building, Wallet,} from 'lucide-react';


const Index = () => {
  const { toast } = useToast();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsRegistrationOpen(true);
  };

  interface Package {
    name: string;
    standardFee: string;
    withTrainer: string;
    description: string;
  }

  const packages: Package[] = [
    { 
      name: "Smart Competition", 
      standardFee: "₹2,000", 
      withTrainer: "₹3,500",
      description: "Intelligence and obedience challenges"
    },
    { 
      name: "Cute Look Competition", 
      standardFee: "₹3,000", 
      withTrainer: "₹5,000",
      description: "Beauty and grooming showcase"
    },
    { 
      name: "Fastest Competition", 
      standardFee: "₹5,000", 
      withTrainer: "₹6,500",
      description: "Speed and agility tests"
    }
  ];

  const cities = ["Gwalior", "Indore", "Delhi", "Bhopal", "Mumbai", "Chennai", "Ahmedabad", "Jaipur", "Kolkata", "Goa"];

  const rules = [
    "All dogs must be vaccinated and healthy",
    "Age limit: 6 months to 8 years",
    "Registration closes 48 hours before event",
    "Participants must bring vaccination certificates",
    "Professional trainers available for hire",
    "Winners advance to state championships"
  ];

  return (
    <div className="min-h-screen bg-gradient-warm font-retro">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-label="Dogs competing in a professional show arena"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/80 via-primary-900/60 to-transparent" />

        <div className="relative z-10 text-center text-primary-foreground px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Badge className="mb-4 sm:mb-6 inline-block bg-retro-gold text-retro-brown text-sm sm:text-base lg:text-lg px-4 sm:px-6 py-2 rounded-full shadow-lg animate-float">
            <Calendar className="w-4 h-4 mr-2 inline" />
            December 15, 2025 • Nationwide Event
          </Badge>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight tracking-tight">
            INDIA'S
            <br />
            <span className="text-retro-gold">ULTIMATE</span>
            <br />
            DOG SHOW
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-xl mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed text-primary-foreground/95 px-4">
            A nationwide celebration of canine talent — every registration helps rescue,
            rehabilitate, and shelter stray animals across India.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4">
            <Button
              size="lg"
              aria-label="Register for dog show competition"
              className="w-full sm:w-auto bg-retro-gold text-retro-brown hover:bg-retro-gold/95 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl transform-gpu transition-all duration-300 hover:-translate-y-1 hover:shadow-retro"
              onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Trophy className="mr-2 h-5 w-5" />
              Register Now
            </Button>

            <Button
              variant="outline"
              size="lg"
              aria-label="Support the rescue cause"
              className="w-full sm:w-auto bg-white/10 text-white border-white/30 hover:bg-white hover:text-retro-brown text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full backdrop-blur-sm transition-all duration-300"
            >
              <Heart className="mr-2 h-5 w-5" />
              Support the Cause
            </Button>
          </div>

          <div className="text-xs sm:text-sm lg:text-base opacity-90 px-4">
            <p className="mb-1 font-medium">An Initiative by: <strong>Dog Foundation (Netherlands)</strong></p>
            <p className="text-xs sm:text-sm">Barchman Wuytierslaan, 2321, AC Amersfoort, Netherlands</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <Card className="bg-card p-6 lg:p-8 rounded-2xl shadow-warm border border-primary/10 hover:shadow-retro transition-shadow duration-300 group">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-retro-gold/10 text-retro-gold rounded-full flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-6 h-6 lg:w-7 lg:h-7" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 text-accent">Rescue & Care</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">All registration fees directly fund medical care, shelter, and rehabilitation programs for rescued animals.</p>
            </Card>

            <Card className="bg-card p-6 lg:p-8 rounded-2xl shadow-warm border border-primary/10 hover:shadow-retro transition-shadow duration-300 group">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-retro-gold/10 text-retro-gold rounded-full flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Trophy className="w-6 h-6 lg:w-7 lg:h-7" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 text-accent">Competitions & Prizes</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">Compete for trophies, cash prizes, and recognition — and help local rescue efforts at the same time.</p>
            </Card>

            <Card className="bg-card p-6 lg:p-8 rounded-2xl shadow-warm border border-primary/10 hover:shadow-retro transition-shadow duration-300 group">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-retro-gold/10 text-retro-gold rounded-full flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 lg:w-7 lg:h-7" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 text-accent">Community & Impact</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">Join a nationwide community; every participant helps build sustainable rescue programs and awareness.</p>
            </Card>
          </div>

          <div className="mt-12 lg:mt-16 text-center">
            <p className="text-base sm:text-lg lg:text-xl font-semibold mb-6 lg:mb-8 text-accent max-w-4xl mx-auto">Competing supports rescue, medical care, and shelter for stray animals — join a movement that makes a measurable difference.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                className="w-full sm:w-auto bg-retro-gold text-retro-brown hover:bg-retro-gold/95 px-6 lg:px-8 py-3 lg:py-4 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1" 
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Register to Save a Life
              </Button>
              <Button variant="outline" className="w-full sm:w-auto px-6 lg:px-8 py-3 lg:py-4 rounded-full border-2 hover:bg-accent hover:text-accent-foreground transition-colors duration-300">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-retro-cream">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold text-accent mb-8 lg:mb-12">ABOUT THE COMPETITION</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <Card className="bg-card shadow-warm hover:shadow-retro transition-all duration-300 hover:-translate-y-2 group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-8 w-8 lg:h-10 lg:w-10 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl sm:text-2xl lg:text-2xl text-accent">STAGE 1: CITY TRIALS</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-base sm:text-md text-muted-foreground mb-4 font-semibold">December 15, 2025</p>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">Compete in your city! Multiple locations across India including Indore, Delhi, Mumbai, and more.</p>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-warm hover:shadow-retro transition-all duration-300 hover:-translate-y-2 group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-retro rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 lg:h-10 lg:w-10 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl sm:text-2xl lg:text-2xl text-accent">STAGE 2: STATE CHAMPIONSHIPS</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-base sm:text-lg text-muted-foreground mb-4 font-semibold">City Winners Advance</p>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">Free entry and travel for qualified participants. State-level competition with bigger prizes.</p>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-warm hover:shadow-retro transition-all duration-300 hover:-translate-y-2 group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-retro-gold rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Star className="h-8 w-8 lg:h-10 lg:w-10 text-retro-brown" />
                </div>
                <CardTitle className="text-xl sm:text-2xl lg:text-2xl text-accent">STAGE 3: GRAND NATIONAL FINAL</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-base sm:text-lg text-muted-foreground mb-4 font-semibold">Ultimate Championship</p>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">Battle for the ultimate title! National recognition and grand prizes await the winners.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 lg:mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold text-accent mb-3 lg:mb-4">COMPETITION PACKAGES</h2>
            <p className="text-lg sm:text-xl lg:text-xl text-muted-foreground mb-2">Choose your category and unleash your dog's potential!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {packages.map((pkg, index) => (
              <Card key={index} className="bg-card border-2 border-primary shadow-retro hover:scale-105 hover:border-retro-gold transition-all duration-300 group cursor-pointer">
                <CardHeader className="text-center py-6 lg:py-8">
                  <CardTitle className="text-xl sm:text-2xl lg:text-3xl text-accent group-hover:text-retro-gold transition-colors duration-300">{pkg.name}</CardTitle>
                  <p className="text-sm sm:text-base text-muted-foreground mt-2 lg:mt-3">{pkg.description}</p>
                </CardHeader>
                <CardContent className="space-y-6 lg:space-y-8">
                  <div className="flex items-baseline justify-center gap-2 lg:gap-4">
                    <div className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-primary">{pkg.standardFee}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Standard</div>
                  </div>

                  <div className="flex items-baseline justify-center gap-2 lg:gap-4 border-t pt-6 lg:pt-8">
                    <div className="text-2xl sm:text-3xl lg:text-3xl font-bold text-retro-gold">{pkg.withTrainer}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">With Trainer</div>
                  </div>

                  <div className="flex justify-center">
                    <Badge className="bg-retro-gold text-retro-brown text-xs sm:text-sm px-3 py-1">Save ₹7,500</Badge>
                  </div>

                  <Button 
                    className="w-full bg-gradient-primary hover:brightness-95 text-base sm:text-lg py-3 lg:py-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    onClick={() => handlePackageSelect(pkg)}
                  >
                    <Trophy className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                    Select Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-retro-gold/10 border-2 border-retro-gold">
            <CardContent className="p-6 sm:p-8 lg:p-10 text-center">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-retro-brown mb-4 lg:mb-6">
                Need a Professional Trainer?
              </h3>
              <p className="text-base sm:text-lg lg:text-xl text-accent mb-6 lg:mb-8">
                Hire a certified trainer separately for ₹7,500 or book upfront with your package to save!
              </p>
              <Button variant="outline" className="border-2 border-retro-gold text-retro-brown hover:bg-retro-gold hover:text-retro-brown transition-colors duration-300 px-6 lg:px-8 py-3 lg:py-4">
                Book Trainer Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Rules Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-muted">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold text-accent text-center mb-12 lg:mb-16">COMPETITION RULES</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {rules.map((rule, index) => (
              <Card key={index} className="bg-card shadow-warm hover:shadow-retro transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="p-4 sm:p-6 lg:p-8 flex items-center gap-4 lg:gap-6">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-primary flex-shrink-0 group-hover:text-retro-gold transition-colors duration-300" />
                  <p className="text-sm sm:text-base lg:text-lg leading-relaxed">{rule}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Date & Cities Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-retro">
        <div className="max-w-7xl mx-auto text-center text-primary-foreground">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold mb-6 sm:mb-8 lg:mb-12">CITY TRIALS</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12 lg:mb-16">
            <Calendar className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10" />
            <span className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold">December 15, 2025</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12 lg:mb-16">
            {cities.map((city) => (
              <Badge
                key={city}
                role="button"
                tabIndex={0}
                className="bg-white text-retro-brown text-sm sm:text-base lg:text-lg py-2 sm:py-3 lg:py-4 px-3 sm:px-4 lg:px-6 font-medium rounded-full shadow-sm hover:bg-retro-gold hover:text-white focus:outline-none focus:ring-2 focus:ring-retro-gold transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                {city}
              </Badge>
            ))}
          </div>
          
          <p className="text-lg sm:text-xl lg:text-2xl opacity-90">
            Locations: Indore, Madhya Pradesh & Major Cities Nationwide
          </p>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold text-accent text-center mb-12 lg:mb-16">GALLERY</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <Card className="overflow-hidden shadow-retro hover:shadow-warm transition-all duration-300 hover:-translate-y-2 group">
              <div className="overflow-hidden">
                <img 
                  src={galleryImage} 
                  alt="Dog competition categories - smart, cute look, and fastest competitions" 
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-accent mb-2 lg:mb-3">Three Competition Categories</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">Smart, Cute Look, and Fastest competitions</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden shadow-retro hover:shadow-warm transition-all duration-300 hover:-translate-y-2 group">
              <div className="overflow-hidden">
                <img 
                  src={heroImage} 
                  alt="Professional dog show arena with competition setup" 
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-accent mb-2 lg:mb-3">Professional Arena</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">State-of-the-art competition venues</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden shadow-retro hover:shadow-warm transition-all duration-300 hover:-translate-y-2 group">
              <div className="overflow-hidden">
                <img 
                  src={rescueImage} 
                  alt="Rescued dogs being cared for in shelter facilities" 
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-accent mb-2 lg:mb-3">Supporting the Cause</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">Every entry helps rescue and rehabilitate strays</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Registration Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-retro-cream">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold text-accent mb-4 lg:mb-6">READY TO REGISTER?</h2>
            <p className="text-lg sm:text-xl lg:text-xl text-muted-foreground mb-8 lg:mb-12">Join the movement and make a difference!</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8 sm:mb-12">
              {packages.map((pkg, index) => (
                <Card key={index} className="bg-card shadow-warm hover:shadow-retro transition-all duration-300 cursor-pointer hover:-translate-y-2 group" onClick={() => handlePackageSelect(pkg)}>
                  <CardContent className="p-6 lg:p-8 text-center">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-accent mb-3 lg:mb-4 group-hover:text-retro-gold transition-colors duration-300">{pkg.name}</h3>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-4 lg:mb-6">{pkg.standardFee}</div>
                    <Button className="w-full mt-4 bg-gradient-primary hover:brightness-95 transition-all duration-300 hover:-translate-y-1 py-3 lg:py-4">
                      Quick Register
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              Select a package above to open the professional registration form with all details.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form Modal */}
      <RegistrationForm 
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        selectedPackage={selectedPackage}
      />

      {/* Contact & Support Section */}
      <section style={{marginTop : '-6rem'}} className="pt-6 pb-10 sm:pt-8 sm:pb-12 lg:pt-10 lg:pb-14 px-4 sm:px-6 lg:px-8 bg-retro-cream">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-8 lg:mb-10 text-accent">CONTACT & SUPPORT</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
            <Card className="bg-card border border-primary/10 shadow-sm hover:shadow-warm transition-all duration-300">
              <CardContent className="p-6 lg:p-8 text-center">
                <Globe className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 mx-auto mb-4 lg:mb-6" />
                <h3 className="font-bold mb-1 lg:mb-2 text-base lg:text-lg">Website</h3>
                <p className="text-sm sm:text-base">tranquil-dogshow.in</p>
              </CardContent>
            </Card>

            <Card className="bg-card border border-primary/10 shadow-sm hover:shadow-warm transition-all duration-300">
              <CardContent className="p-6 lg:p-8 text-center">
                <Mail className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 mx-auto mb-4 lg:mb-6" />
                <h3 className="font-bold mb-1 lg:mb-2 text-base lg:text-lg">Email</h3>
                <p className="text-sm sm:text-base">info@tranquil-dogshow.in</p>
              </CardContent>
            </Card>

            <Card className="bg-card border border-primary/10 shadow-sm hover:shadow-warm transition-all duration-300">
              <CardContent className="p-6 lg:p-8 text-center">
                <Phone className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 mx-auto mb-4 lg:mb-6" />
                <h3 className="font-bold mb-1 lg:mb-2 text-base lg:text-lg">Phone</h3>
                <p className="text-sm sm:text-base">+91 98XXX XXXXX</p>
              </CardContent>
            </Card>
          </div>

<div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-2xl mx-auto">
      {/* Header with actual dog images - keep original image */}
      <div className="relative p-6">
        {/* Dog Images Collage */}
        <div style={{marginBottom : '2rem'}}>
          <img src={DonateImg} alt="" />
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">Ways to Donate Directly</h2>
          <p className="text-lg text-gray-600 mb-4">
            Support stray animal rescue through multiple payment methods
          </p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="px-8 pb-8">
        {/* Payment Methods Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center group cursor-pointer">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300 rounded-2xl p-6 mb-3 shadow-sm hover:shadow-md">
              <CreditCard className="mx-auto text-blue-600" size={36} />
            </div>
            <p className="text-sm font-semibold text-gray-700">Credit/Debit<br/>Cards</p>
          </div>
          
          <div className="text-center group cursor-pointer">
            <div className="bg-gradient-to-br from-green-50 to-green-100 group-hover:from-green-100 group-hover:to-green-200 transition-all duration-300 rounded-2xl p-6 mb-3 shadow-sm hover:shadow-md">
              <Smartphone className="mx-auto text-green-600" size={36} />
            </div>
            <p className="text-sm font-semibold text-gray-700">UPI</p>
          </div>
          
          <div className="text-center group cursor-pointer">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 group-hover:from-purple-100 group-hover:to-purple-200 transition-all duration-300 rounded-2xl p-6 mb-3 shadow-sm hover:shadow-md">
              <Building className="mx-auto text-purple-600" size={36} />
            </div>
            <p className="text-sm font-semibold text-gray-700">Net<br/>Banking</p>
          </div>
          
          <div className="text-center group cursor-pointer">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 group-hover:from-orange-100 group-hover:to-orange-200 transition-all duration-300 rounded-2xl p-6 mb-3 shadow-sm hover:shadow-md">
              <Wallet className="mx-auto text-orange-600" size={36} />
            </div>
            <p className="text-sm font-semibold text-gray-700">Digital<br/>Wallets</p>
          </div>
        </div>

        {/* Payment Options Summary */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 text-center mb-6 border border-gray-100">
          <p className="text-lg font-semibold text-gray-800 mb-2">Accepted Payment Methods:</p>
          <p className="text-base text-gray-600">
            <span className="font-medium">Credit/Debit Cards</span> • 
            <span className="font-medium"> UPI</span> • 
            <span className="font-medium"> Net Banking</span> • 
            <span className="font-medium"> Digital Wallets</span>
          </p>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 rounded-2xl p-8 text-center border border-orange-100 shadow-sm">
          <Heart className="mx-auto text-red-500 mb-4" size={48} />
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Every Donation Makes a Difference</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
            Your support provides vaccinations, nutritious meals, and medical care to street dogs who need it most.
          </p>
          <button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg">
            💝 Donate Now
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-6">
          <div className="flex items-center bg-green-50 rounded-full px-4 py-2">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm text-green-700 font-medium">100% Transparent</span>
          </div>
          <div className="flex items-center bg-blue-50 rounded-full px-4 py-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
            <span className="text-sm text-blue-700 font-medium">Secure Payments</span>
          </div>
          <div className="flex items-center bg-purple-50 rounded-full px-4 py-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full mr-2"></div>
            <span className="text-sm text-purple-700 font-medium">Direct Impact</span>
          </div>
        </div>
      </div>
    </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-accent text-accent-foreground">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 lg:mb-12">
            <p className="text-xl sm:text-2xl lg:text-2xl font-bold mb-2 lg:mb-4">
              Dog Foundation (Netherlands)
            </p>
            <p className="text-base sm:text-lg lg:text-xl opacity-90">
              Barchman Wuytierslaan, 2321, AC Amersfoort, Netherlands
            </p>
          </div>
          
          <div className="border-t border-accent-foreground/20 pt-8 lg:pt-12">
            <p className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-bold text-retro-gold mb-3 lg:mb-4">
              YOUR PARTICIPATION FUELS OUR MISSION
            </p>
            <p className="text-base sm:text-lg lg:text-xl opacity-90 max-w-4xl mx-auto">
              Every registration helps rescue, rehabilitate, and care for stray animals across India
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;