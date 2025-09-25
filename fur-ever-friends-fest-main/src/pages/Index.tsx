import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import OneImage from "../assets/WhatsApp Image 2025-09-25 at 09.54.52_57e606aa.jpg";
import TwoImge from "../assets/WhatsApp Image 2025-09-25 at 09.54.50_6ac4383c.jpg";
import ThirdImage from "../assets/WhatsApp Image 2025-09-25 at 09.54.51_53a17276.jpg";


import {
  Calendar,
  MapPin,
  Trophy,
  Heart,
  Phone,
  Mail,
  Globe,
  Star,
  Award,
  Users,
  CheckCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RegistrationForm } from "@/components/RegistrationForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CreditCard, Smartphone, Building, Wallet } from "lucide-react";
import HeroLocal from "@/assets/Hero.jpg";
import DonateLocal from "@/assets/Donate.png";

const Index = () => {
  const { toast } = useToast();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLearnOpen, setIsLearnOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setIsRegistrationOpen(true);
  };

  const packages = [
    {
      name: "Smart Competition",
      standardFee: "₹2,000",
      withTrainer: "₹3,500",
      description: "Intelligence and obedience challenges",
    },
    {
      name: "Cute Look Competition",
      standardFee: "₹3,000",
      withTrainer: "₹5,000",
      description: "Beauty and grooming showcase",
    },
    {
      name: "Race & Skill Dogs Competition",
      standardFee: "₹5,000",
      withTrainer: "₹6,500",
      description: "Speed and agility tests",
    },
    {
      name: "Smartest + Cutest Competition",
      standardFee: "₹3,500",
      withTrainer: "₹5,000",
      description: "Combo: participate in both the Smart Competition and Cute Look Competition at a special price.",
    },
    {
      name: "Smartest + Race and Skills Competition",
      standardFee: "₹3,500",
      withTrainer: "₹5,000",
      description: "Combo: participate in Smart Competition and Race & Skill Dogs Competition with combo pricing.",
    },
    {
      name: "Smarter + Cutest + Faster Competition",
      standardFee: "₹7,000",
      withTrainer: "₹9,500",
      description: "Full package: participate in Smart, Cutest and Race & Skill competitions. Best value for competing across all categories.",
    },
  ];

  const cities = [
    "Gwalior",
    "Indore",
    "Delhi",
    "Bhopal",
    "Mumbai",
    "Chennai",
    "Ahmedabad",
    "Jaipur",
    "Kolkata",
    "Goa",
  ];

  const rules = [
    "All dogs must be vaccinated and healthy",
    "Age limit: 6 months to 8 years",
    "Registration closes 48 hours before event",
    "Participants must bring vaccination certificates",
    "Professional trainers available for hire",
    "Winners advance to state championships",
  ];

  // Carousel functions
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === Math.max(0, packages.length - visibleCount) ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, packages.length - visibleCount) : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(nextSlide, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, currentIndex]);

  // Responsive visible count (1 on mobile, 2 on tablet, 3 on desktop)
  useEffect(() => {
    const updateVisible = () => {
      const w = window.innerWidth;
      if (w >= 1024) setVisibleCount(3);
      else if (w >= 768) setVisibleCount(2);
      else setVisibleCount(1);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  // Clamp currentIndex when visibleCount or packages change
  useEffect(() => {
    const maxIndex = Math.max(0, packages.length - visibleCount);
    if (currentIndex > maxIndex) setCurrentIndex(maxIndex);
  }, [visibleCount, packages.length]);

  // Compute transform percent for carousel movement
  const transformPercent = visibleCount === 1 ? currentIndex * 100 : currentIndex * (100 / visibleCount);

  return (
    <div className="min-h-screen bg-gradient-warm font-retro">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${HeroLocal})`
            }}
          role="img"
          aria-label="Indian street dogs in an urban setting"
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
            A nationwide celebration of canine talent — every registration helps
            rescue, rehabilitate, and shelter stray animals across India.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4">
            <Button
              size="lg"
              aria-label="Register for dog show competition"
              className="w-full sm:w-auto bg-retro-gold text-retro-brown hover:bg-retro-gold/95 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl transform-gpu transition-all duration-300 hover:-translate-y-1 hover:shadow-retro"
              onClick={() =>
                document
                  .getElementById("packages")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Trophy className="mr-2 h-5 w-5" />
              Register Now
            </Button>

            <Button
              variant="outline"
              size="lg"
              aria-label="Support the rescue cause"
              className="w-full sm:w-auto bg-white/10 text-white border-white/30 hover:bg-white hover:text-retro-brown text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full backdrop-blur-sm transition-all duration-300"
              onClick={() =>
                document
                  .getElementById("contact-donate")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Heart className="mr-2 h-5 w-5" />
              Donate Now
            </Button>
          </div>

          <div className="text-xs sm:text-sm lg:text-base opacity-90 px-4">
            <p className="mb-1 font-medium">
              An Initiative by: <strong>Dog Foundation (Netherlands)</strong>
            </p>
            <p className="text-xs sm:text-sm">
              Barchman Wuytierslaan, 2321, AC Amersfoort, Netherlands
            </p>
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
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 text-accent">
                Rescue & Care
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                All registration fees directly fund medical care, shelter, and
                rehabilitation programs for rescued animals.
              </p>
            </Card>

            <Card className="bg-card p-6 lg:p-8 rounded-2xl shadow-warm border border-primary/10 hover:shadow-retro transition-shadow duration-300 group">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-retro-gold/10 text-retro-gold rounded-full flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Trophy className="w-6 h-6 lg:w-7 lg:h-7" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 text-accent">
                Competitions & Prizes
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Compete for trophies, cash prizes, and recognition — and help
                local rescue efforts at the same time.
              </p>
            </Card>

            <Card className="bg-card p-6 lg:p-8 rounded-2xl shadow-warm border border-primary/10 hover:shadow-retro transition-shadow duration-300 group">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-retro-gold/10 text-retro-gold rounded-full flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 lg:w-7 lg:h-7" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 text-accent">
                Community & Impact
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Join a nationwide community; every participant helps build
                sustainable rescue programs and awareness.
              </p>
            </Card>
          </div>
        </div>
        
          <div className="mt-12 lg:mt-16 text-center">
            <p className="text-base sm:text-lg lg:text-xl font-semibold mb-6 lg:mb-8 text-accent max-w-4xl mx-auto">
              Competing supports rescue, medical care, and shelter for stray
              animals — join a movement that makes a measurable difference.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                className="w-full sm:w-auto bg-retro-gold text-retro-brown hover:bg-retro-gold/95 px-6 lg:px-8 py-3 lg:py-4 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1"
                onClick={() =>
                  document
                    .getElementById("packages")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Register to Save a Life
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto px-6 lg:px-8 py-3 lg:py-4 rounded-full border-2 hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
                onClick={() => setIsLearnOpen(true)}
              >
                Learn More
              </Button>
            </div>
          </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-retro-cream">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold text-accent mb-8 lg:mb-12">
            ABOUT THE COMPETITION
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <Card className="bg-card shadow-warm hover:shadow-retro transition-all duration-300 hover:-translate-y-2 group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-8 w-8 lg:h-10 lg:w-10 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl sm:text-2xl lg:text-2xl text-accent">
                  STAGE 1: CITY TRIALS
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-base sm:text-md text-muted-foreground mb-4 font-semibold">
                  December 15, 2025
                </p>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                  Compete in your city! Multiple locations across India
                  including Indore, Delhi, Mumbai, and more.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-warm hover:shadow-retro transition-all duration-300 hover:-translate-y-2 group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-retro rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 lg:h-10 lg:w-10 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl sm:text-2xl lg:text-2xl text-accent">
                  STAGE 2: STATE CHAMPIONSHIPS
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-base sm:text-lg text-muted-foreground mb-4 font-semibold">
                  City Winners Advance
                </p>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                  Free entry and travel for qualified participants. State-level
                  competition with bigger prizes.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-warm hover:shadow-retro transition-all duration-300 hover:-translate-y-2 group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-retro-gold rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Star className="h-8 w-8 lg:h-10 lg:w-10 text-retro-brown" />
                </div>
                <CardTitle className="text-xl sm:text-2xl lg:text-2xl text-accent">
                  STAGE 3: GRAND NATIONAL FINAL
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-base sm:text-lg text-muted-foreground mb-4 font-semibold">
                  Ultimate Championship
                </p>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                  Battle for the ultimate title! National recognition and grand
                  prizes await the winners.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Packages Section with Carousel */}
      <section
        id="packages"
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold text-accent mb-3 lg:mb-4">
              COMPETITION PACKAGES
            </h2>
            <p className="text-lg sm:text-xl lg:text-xl text-muted-foreground mb-2">
              Choose your category and unleash your dog's potential!
            </p>
          </div>

          {/* Desktop Carousel */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-300 hover:scale-110 hover:shadow-xl hidden sm:block"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className={`w-6 h-6 ${currentIndex === 0 ? 'text-gray-300' : 'text-gray-700'}`} />
            </button>

            <button
              onClick={nextSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-300 hover:scale-110 hover:shadow-xl hidden sm:block"
              disabled={currentIndex === Math.max(0, packages.length - visibleCount)}
            >
              <ChevronRight className={`w-6 h-6 ${currentIndex === Math.max(0, packages.length - visibleCount) ? 'text-gray-300' : 'text-gray-700'}`} />
            </button>

            {/* Cards Container */}
            <div 
              className="overflow-hidden mx-4 sm:mx-12"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out gap-2 sm:gap-6"
                style={{
                  transform: `translateX(-${transformPercent}%)`
                }}
              >
                {packages.map((pkg, index) => (
                  <div key={index} className={`${visibleCount === 3 ? 'w-1/3' : visibleCount === 2 ? 'w-1/2' : 'w-full'} flex-shrink-0`}>
                    <Card className="bg-card border-2 border-primary shadow-retro hover:scale-105 hover:border-retro-gold transition-all duration-300 group cursor-pointer flex flex-col h-full">
                      <CardHeader className="text-center py-6 lg:py-8">
                        <CardTitle className="text-xl sm:text-2xl lg:text-3xl text-accent group-hover:text-retro-gold transition-colors duration-300">
                          {pkg.name}
                        </CardTitle>
                        <p className="text-sm sm:text-base text-muted-foreground mt-2 lg:mt-3">
                          {pkg.description}
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-6 lg:space-y-8 flex-1 flex flex-col justify-between">
                        <div className="flex items-baseline justify-center gap-2 lg:gap-4">
                          <div className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-primary">
                            {pkg.standardFee}
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground">
                            Standard
                          </div>
                        </div>

                        <div className="flex items-baseline justify-center gap-2 lg:gap-4 border-t pt-6 lg:pt-8">
                          <div className="text-2xl sm:text-3xl lg:text-3xl font-bold text-retro-gold">
                            {pkg.withTrainer}
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground">
                            With Trainer
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <Badge className="bg-retro-gold text-retro-brown text-xs sm:text-sm px-3 py-1">
                            Save ₹7,500
                          </Badge>
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
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.max(1, packages.length - visibleCount + 1) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          <Card className="bg-retro-gold/10 border-2 border-retro-gold mt-12">
            <CardContent className="p-6 sm:p-8 lg:p-10 text-center">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-retro-brown mb-4 lg:mb-6">
                Need a Professional Trainer?
              </h3>
              <p className="text-base sm:text-lg lg:text-xl text-accent mb-6 lg:mb-8">
                Hire a certified trainer separately for ₹7,500 or book upfront
                with your package to save!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Rules Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-muted">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold text-accent text-center mb-12 lg:mb-16">
            COMPETITION RULES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {rules.map((rule, index) => (
              <Card
                key={index}
                className="bg-card shadow-warm hover:shadow-retro transition-all duration-300 hover:-translate-y-1 group"
              >
                <CardContent className="p-4 sm:p-6 lg:p-8 flex items-center gap-4 lg:gap-6">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-primary flex-shrink-0 group-hover:text-retro-gold transition-colors duration-300" />
                  <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                    {rule}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Date & Cities Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-retro">
        <div className="max-w-7xl mx-auto text-center text-primary-foreground">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold mb-6 sm:mb-8 lg:mb-12">
            CITY TRIALS
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12 lg:mb-16">
            <Calendar className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10" />
            <span className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold">
              December 15, 2025
            </span>
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
          <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold text-accent text-center mb-12 lg:mb-16">
            GALLERY
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <Card className="overflow-hidden shadow-retro hover:shadow-warm transition-all duration-300 hover:-translate-y-2 group">
              <div className="overflow-hidden">
                <img
                  src={OneImage}
                  alt="Indian street dog - competition categories"
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-accent mb-2 lg:mb-3">
                  Three Competition Categories
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Smart, Cute Look, and Fastest competitions
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden shadow-retro hover:shadow-warm transition-all duration-300 hover:-translate-y-2 group">
              <div className="overflow-hidden">
                <img
                  src={TwoImge}
                  alt="Indian street dogs gathering"
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-accent mb-2 lg:mb-3">
                  Professional Arena
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  State-of-the-art competition venues
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden shadow-retro hover:shadow-warm transition-all duration-300 hover:-translate-y-2 group">
              <div className="overflow-hidden">
                <img
                  src={ThirdImage}
                  alt="Rescued Indian street dog in shelter"
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-accent mb-2 lg:mb-3">
                  Supporting the Cause
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Every entry helps rescue and rehabilitate strays
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Registration Form Modal */}
      <RegistrationForm
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        selectedPackage={selectedPackage}
      />

      {/* Learn More Dialog */}
      <Dialog open={isLearnOpen} onOpenChange={(open) => setIsLearnOpen(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>About Dog Shows</DialogTitle>
            <DialogDescription>
              A dog show is an event where dogs are exhibited and judged based
              on their conformation to breed standards or performance in skills
              like agility and obedience. It celebrates purebred dogs, often
              with competitions to select the best in breed and best in show.
              The first modern dog show was in Newcastle, England in 1859.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
            <p className="mb-3">
              Dog shows often include various classes or groups, including breed
              competitions and best in show contests where the top dogs from
              different breeds compete against each other.
            </p>
            <p>
              Competing supports rescue, medical care, and shelter for stray
              animals — join a movement that makes a measurable difference.
            </p>
          </div>

          <DialogFooter className="mt-6">
            <Button onClick={() => setIsLearnOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact & Support Section */}
      <section
        id="contact-donate"
        style={{ marginTop: "-6rem" }}
        className="pt-6 pb-10 sm:pt-8 sm:pb-12 lg:pt-10 lg:pb-14 px-4 sm:px-6 lg:px-8 bg-retro-cream"
      >
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-2xl mx-auto" style={{marginTop : '3rem', marginBottom : '3rem'}}>
          {/* Header with actual dog images - keep original image */}
          <div className="relative p-6">
            {/* Local donate hero image */}
            <div className="mb-6 rounded-2xl overflow-hidden">
              <img src={DonateLocal} alt="Donate - Indian street dog" className="w-full h-56 object-cover rounded-lg" />
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
                <p className="text-sm font-semibold text-gray-700">
                  Credit/Debit
                  <br />
                  Cards
                </p>
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
                <p className="text-sm font-semibold text-gray-700">
                  Net
                  <br />
                  Banking
                </p>
              </div>

              <div className="text-center group cursor-pointer">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 group-hover:from-orange-100 group-hover:to-orange-200 transition-all duration-300 rounded-2xl p-6 mb-3 shadow-sm hover:shadow-md">
                  <Wallet className="mx-auto text-orange-600" size={36} />
                </div>
                <p className="text-sm font-semibold text-gray-700">
                  Digital
                  <br />
                  Wallets
                </p>
              </div>
            </div>

            {/* Payment Options Summary */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 text-center mb-6 border border-gray-100">
              <p className="text-lg font-semibold text-gray-800 mb-2">
                Accepted Payment Methods:
              </p>
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
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Every Donation Makes a Difference
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
                Your support provides vaccinations, nutritious meals, and
                medical care to street dogs who need it most.
              </p>
              <button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg">
                💝 Donate Now
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-6">
              <div className="flex items-center bg-green-50 rounded-full px-4 py-2">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">
                  100% Transparent
                </span>
              </div>
              <div className="flex items-center bg-blue-50 rounded-full px-4 py-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                <span className="text-sm text-blue-700 font-medium">
                  Secure Payments
                </span>
              </div>
              <div className="flex items-center bg-purple-50 rounded-full px-4 py-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full mr-2"></div>
                <span className="text-sm text-purple-700 font-medium">
                  Direct Impact
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-8 lg:mb-10 text-accent">
            CONTACT & SUPPORT
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
            <Card className="bg-card border border-primary/10 shadow-sm hover:shadow-warm transition-all duration-300">
              <CardContent className="p-6 lg:p-8 text-center">
                <Globe className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 mx-auto mb-4 lg:mb-6" />
                <h3 className="font-bold mb-1 lg:mb-2 text-base lg:text-lg">
                  Website
                </h3>
                <p className="text-sm sm:text-base">tranquil-dogshow.in</p>
              </CardContent>
            </Card>

            <Card className="bg-card border border-primary/10 shadow-sm hover:shadow-warm transition-all duration-300">
              <CardContent className="p-6 lg:p-8 text-center">
                <Mail className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 mx-auto mb-4 lg:mb-6" />
                <h3 className="font-bold mb-1 lg:mb-2 text-base lg:text-lg">
                  Email
                </h3>
                <p className="text-sm sm:text-base">info@tranquil-dogshow.in</p>
              </CardContent>
            </Card>

            <Card className="bg-card border border-primary/10 shadow-sm hover:shadow-warm transition-all duration-300">
              <CardContent className="p-6 lg:p-8 text-center">
                <Phone className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 mx-auto mb-4 lg:mb-6" />
                <h3 className="font-bold mb-1 lg:mb-2 text-base lg:text-lg">
                  Phone
                </h3>
                <p className="text-sm sm:text-base">+91 98XXX XXXXX</p>
              </CardContent>
            </Card>
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
              Every registration helps rescue, rehabilitate, and care for stray
              animals across India
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;