import React, { useEffect, useState, useCallback } from 'react';
import { 
  Heart, 
  Shield, 
  Star, 
  Phone, 
  Calendar, 
  CheckCircle, 
  Award,
  Users,
  Clock,
  HeadphonesIcon,
  Sparkles,
  Leaf,
  Brain,
  Zap,
  Moon,
  Sun,
  Menu,
  X,
  ArrowRight,
  MapPin,
  Mail,
  ChevronLeft,
  ChevronRight,
  Quote
} from 'lucide-react';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  // Smooth loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Scroll tracking for header effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: "Fatima K.",
      location: "Karachi",
      text: "I was suffering from chronic back pain for years. After just a few sessions with Sobia, I feel like a new person. Her approach is so professional and caring. Highly recommended!",
      rating: 5,
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      name: "Aisha M.",
      location: "Karachi", 
      text: "The cosmetic hijama has done wonders for my skin! It looks clearer and feels so much healthier. Sobia is truly an expert in her field. The environment is very clean and relaxing.",
      rating: 5,
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      name: "Farid A.",
      location: "Karachi",
      text: "It significantly minimized my back pain. I did not expect it to be this effective. Sobia's knowledge and professionalism are impressive.",
      rating: 5,
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
  ];

  const services = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "General Body Hijama",
      description: "Comprehensive detoxification and immune system boost",
      price: "From PKR 3,000",
      features: ["Full body detox", "Immune boost", "Energy restoration"],
      duration: "45-60 mins",
      popular: false
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Sunnah Points Hijama", 
      description: "Traditional Islamic cupping points for holistic wellness",
      price: "From PKR 2,500",
      features: ["Sunnah-based", "Spiritual wellness", "Traditional points"],
      duration: "30-45 mins",
      popular: true
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Pain Relief Hijama",
      description: "Targeted therapy for chronic pain and inflammation",
      price: "From PKR 3,500", 
      features: ["Pain management", "Inflammation relief", "Muscle tension"],
      duration: "40-50 mins",
      popular: false
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Facial & Cosmetic Hijama",
      description: "Natural skin rejuvenation and anti-aging treatment",
      price: "From PKR 4,000",
      features: ["Skin rejuvenation", "Anti-aging", "Natural glow"],
      duration: "30-40 mins",
      popular: false
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Head & Migraine Hijama",
      description: "Specialized treatment for headaches and mental clarity",
      price: "From PKR 3,000",
      features: ["Migraine relief", "Mental clarity", "Stress reduction"],
      duration: "25-35 mins",
      popular: false
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fertility & Hormonal Balance",
      description: "Support for reproductive health and hormone regulation",
      price: "From PKR 4,500",
      features: ["Hormonal balance", "Fertility support", "Reproductive health"],
      duration: "50-60 mins",
      popular: false
    }
  ];

  const benefits = [
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Improved Circulation",
      description: "Enhances blood flow and oxygen delivery to tissues, promoting natural healing processes throughout your body."
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Detoxification", 
      description: "Removes harmful toxins and metabolic waste through improved lymphatic drainage and blood purification."
    },
    {
      icon: <Leaf className="w-12 h-12" />,
      title: "Stress Relief",
      description: "Reduces cortisol levels and promotes deep relaxation through therapeutic pressure point stimulation."
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Pain Management",
      description: "Alleviates chronic pain, muscle tension, and joint stiffness using natural healing methods."
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: "Natural Healing",
      description: "Stimulates your body's innate healing mechanisms without pharmaceutical side effects."
    },
    {
      icon: <Moon className="w-12 h-12" />,
      title: "Better Sleep",
      description: "Improves sleep quality by balancing the nervous system and reducing anxiety levels."
    }
  ];

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  }, [isDarkMode]);

  const nextTestimonial = useCallback(() => {
    setActiveTestimonial(prev => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-white border-t-transparent mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-red-300 border-t-transparent mx-auto animate-ping"></div>
          </div>
          <h2 className="text-3xl font-bold mb-2 animate-pulse">Sobia's Hijama Therapy</h2>
          <p className="text-red-200 animate-fade-in-up">Preparing your wellness journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark' : ''}`}>
      {/* Enhanced Header */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-red-100 dark:border-gray-700' 
          : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('home')}>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg">
                  <Leaf className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Sobia's Hijama</h1>
                <p className="text-xs text-red-600 dark:text-red-400 font-medium">Certified Therapy</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { label: 'Home', id: 'home' },
                { label: 'About', id: 'about' },
                { label: 'Services', id: 'services' },
                { label: 'Benefits', id: 'benefits' },
                { label: 'Reviews', id: 'testimonials' },
                { label: 'Contact', id: 'contact' }
              ].map((link, index) => (
                <button 
                  key={index}
                  onClick={() => scrollToSection(link.id)} 
                  className="relative text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
                aria-label="Toggle theme"
              >
                {isDarkMode ? 
                  <Sun className="w-5 h-5 text-yellow-500" /> : 
                  <Moon className="w-5 h-5 text-gray-600" />
                }
              </button>
              
              <button 
                onClick={() => scrollToSection('contact')}
                className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2.5 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Now</span>
              </button>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}>
            <nav className="flex flex-col space-y-3 py-4 border-t border-gray-200 dark:border-gray-700">
              {[
                { label: 'Home', id: 'home' },
                { label: 'About', id: 'about' },
                { label: 'Services', id: 'services' },
                { label: 'Benefits', id: 'benefits' },
                { label: 'Reviews', id: 'testimonials' },
                { label: 'Contact', id: 'contact' }
              ].map((link, index) => (
                <button 
                  key={index}
                  onClick={() => scrollToSection(link.id)} 
                  className="text-left text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {link.label}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('contact')}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium mt-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section id="home" className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700 flex items-center justify-center text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-700/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10 pt-20">
          <div className="animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium">Certified Hijama Specialist • 6+ Years Experience</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block">Revitalize Your Health</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 animate-pulse">
                Naturally
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-4xl mx-auto text-red-100 leading-relaxed">
              Experience the ancient healing art of Hijama with Sobia, a certified practitioner in Karachi with over 
              <span className="font-semibold text-yellow-300"> 6 years of dedicated experience</span> in traditional cupping therapy.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button 
                onClick={() => scrollToSection('services')}
                className="group bg-white text-red-800 px-8 py-4 rounded-full font-semibold hover:bg-red-50 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2 btn-hover-lift"
              >
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="group border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-red-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 btn-hover-lift"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: <Award className="w-8 h-8" />, number: "6+", label: "Years Experience", color: "from-yellow-400 to-orange-500" },
                { icon: <Users className="w-8 h-8" />, number: "500+", label: "Happy Clients", color: "from-green-400 to-blue-500" },
                { icon: <Shield className="w-8 h-8" />, number: "100%", label: "Safe & Hygienic", color: "from-blue-400 to-purple-500" },
                { icon: <HeadphonesIcon className="w-8 h-8" />, number: "24/7", label: "Support Available", color: "from-purple-400 to-pink-500" }
              ].map((stat, index) => (
                <div key={index} className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
                  <div className={`text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-3 flex justify-center group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.number}</div>
                  <div className="text-sm text-red-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-orange-50/50 dark:from-gray-800/50 dark:to-gray-900/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16" data-animate id="about-title">
            <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-700 ${
              isVisible['about-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Your <span className="text-red-600">Certified</span> Hijama Specialist
            </h2>
            <p className={`text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible['about-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Building trust through expertise and compassionate care
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`relative transition-all duration-700 delay-300 ${
              isVisible['about-title'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`} data-animate>
              <div className="relative group">
                <img 
                  src="https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Sobia - Hijama Practitioner" 
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-2xl shadow-xl animate-float">
                  <div className="text-3xl font-bold">6+</div>
                  <div className="text-sm">Years Experience</div>
                </div>
              </div>
            </div>
            
            <div className={`transition-all duration-700 delay-500 ${
              isVisible['about-title'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Meet Sobia</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                With a passion for holistic wellness and over <strong className="text-red-600">6 years of hands-on experience</strong>, 
                I am dedicated to providing the highest standard of Hijama cupping therapy. I hold multiple certifications in both 
                traditional and modern cupping techniques.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                My practice is built on the foundation of <strong>trust, professionalism</strong>, and a deep understanding of the Sunnah. 
                I believe in a personalized approach, taking time to understand your specific health concerns.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { text: "Certified Practitioner", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" },
                  { text: "6+ Years Experience", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" },
                  { text: "Hygienic & Safe", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" },
                  { text: "Sunnah Based", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" }
                ].map((badge, index) => (
                  <span key={index} className={`${badge.color} px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-default`}>
                    {badge.text}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl border border-red-100 dark:border-red-800/30 hover:shadow-lg transition-all duration-300">
                <div className="p-3 bg-red-600 rounded-full">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Call for direct booking</div>
                  <div className="text-xl font-bold text-red-600">+92 317 0122099</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-orange-50/30 dark:from-gray-700/30 dark:to-gray-800/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16" data-animate id="benefits-title">
            <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-700 ${
              isVisible['benefits-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Health Benefits of <span className="text-red-600">Hijama Therapy</span>
            </h2>
            <p className={`text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible['benefits-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Discover the scientifically-backed benefits of traditional cupping therapy
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className={`group bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-700 ${
                  isVisible['benefits-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
                data-animate
              >
                <div className="text-red-600 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-red-600 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section id="services" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/20 to-orange-50/20 dark:from-gray-800/20 dark:to-gray-900/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16" data-animate id="services-title">
            <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-700 ${
              isVisible['services-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Our Healing Services
            </h2>
            <p className={`text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible['services-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Select the therapies that align with your wellness goals
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`group relative bg-gradient-to-br from-white to-red-50/50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-red-100/50 dark:border-red-900/30 hover:border-red-200 dark:hover:border-red-700 ${
                  isVisible['services-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
                data-animate
              >
                {service.popular && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    POPULAR
                  </div>
                )}
                
                <div className="text-red-600 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-red-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-red-600">{service.price}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{service.duration}</div>
                  </div>
                </div>
                
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg group-hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-orange-50/30 dark:from-gray-700/30 dark:to-gray-800/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16" data-animate id="testimonials-title">
            <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-700 ${
              isVisible['testimonials-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              What Our Clients Say
            </h2>
            <p className={`text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible['testimonials-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Your health and comfort are our top priorities
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-red-100 dark:text-red-900/30">
                <Quote className="w-16 h-16" />
              </div>
              
              <div className="text-center mb-8">
                {/* Stars */}
                <div className="flex justify-center space-x-1 mb-6">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 italic leading-relaxed mb-8 min-h-[120px] flex items-center justify-center">
                  "{testimonials[activeTestimonial].text}"
                </blockquote>
                
                {/* Client Info */}
                <div className="flex items-center justify-center space-x-4">
                  <img 
                    src={testimonials[activeTestimonial].image} 
                    alt={testimonials[activeTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-red-100 dark:border-red-800"
                    loading="lazy"
                  />
                  <div className="text-left">
                    <div className="font-bold text-gray-900 dark:text-white text-lg">
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{testimonials[activeTestimonial].location}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 text-red-600" />
                </button>
                
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeTestimonial 
                          ? 'bg-red-600 w-8' 
                          : 'bg-gray-300 dark:bg-gray-600 hover:bg-red-300 dark:hover:bg-red-700'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/20 to-orange-50/20 dark:from-gray-800/20 dark:to-gray-900/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16" data-animate id="contact-title">
            <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-700 ${
              isVisible['contact-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Begin Your Healing Journey
            </h2>
            <p className={`text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible['contact-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Ready to experience the benefits of Hijama therapy? Get in touch today
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className={`space-y-8 transition-all duration-700 delay-300 ${
                isVisible['contact-title'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}>
                <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-8 rounded-2xl border border-red-100 dark:border-red-800/30 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 group">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Phone</div>
                        <a href="tel:+923170122099" className="text-red-600 hover:text-red-700 transition-colors font-medium">
                          +92 317 0122099
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 group">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Email</div>
                        <a href="mailto:sobia.hijama@gmail.com" className="text-red-600 hover:text-red-700 transition-colors">
                          sobia.hijama@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 group">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Hours</div>
                        <div className="text-gray-600 dark:text-gray-400">Mon-Sat: 11 AM - 7 PM</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 group">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Location</div>
                        <div className="text-gray-600 dark:text-gray-400">Karachi, Pakistan</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-8 rounded-2xl border border-green-100 dark:border-green-800/30 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Booking</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    For immediate booking, call or WhatsApp us directly
                  </p>
                  <a 
                    href="https://wa.me/923170122099?text=Assalam-o-Alaikum%20Sobia,%20I%20would%20like%20to%20book%20a%20Hijama%20session.%20Please%20let%20me%20know%20your%20availability." 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg group"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span>WhatsApp Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className={`bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-700 delay-500 ${
                isVisible['contact-title'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Message</h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-red-300 dark:hover:border-red-600"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input 
                        type="tel" 
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-red-300 dark:hover:border-red-600"
                        placeholder="+92 3XX XXXXXXX"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email (Optional)
                    </label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-red-300 dark:hover:border-red-600"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Service Interest
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-red-300 dark:hover:border-red-600">
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service.title}>{service.title}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-red-300 dark:hover:border-red-600 resize-none"
                      placeholder="Tell us about your health concerns or any specific requirements..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Send Message</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-red-900 via-red-800 to-red-700 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Sobia's Hijama Therapy</h3>
                  <p className="text-red-200 text-sm">Certified & Trusted Since 2018</p>
                </div>
              </div>
              <p className="text-red-200 mb-6 leading-relaxed max-w-md">
                Your partner in natural health and wellness in Karachi. Certified and experienced Hijama practitioner 
                dedicated to providing safe, effective, and Sunnah-based treatments for holistic healing.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: <Phone className="w-5 h-5" />, href: "tel:+923170122099", label: "Call us" },
                  { icon: <Mail className="w-5 h-5" />, href: "mailto:sobia.hijama@gmail.com", label: "Email us" },
                  { 
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    ), 
                    href: "https://wa.me/923170122099", 
                    label: "WhatsApp" 
                  }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Home', id: 'home' },
                  { label: 'About', id: 'about' },
                  { label: 'Services', id: 'services' },
                  { label: 'Benefits', id: 'benefits' },
                  { label: 'Reviews', id: 'testimonials' },
                  { label: 'Contact', id: 'contact' }
                ].map((link, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => scrollToSection(link.id)}
                      className="text-red-200 hover:text-white transition-colors cursor-pointer hover:translate-x-1 transform duration-300 flex items-center space-x-2 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="text-lg font-bold mb-6">Our Services</h4>
              <ul className="space-y-3">
                {services.slice(0, 4).map((service, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => scrollToSection('services')}
                      className="text-red-200 hover:text-white transition-colors cursor-pointer text-sm hover:translate-x-1 transform duration-300 flex items-center space-x-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{service.title}</span>
                    </button>
                  </li>
                ))}
                <li>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="text-red-300 hover:text-white transition-colors cursor-pointer text-sm font-medium hover:translate-x-1 transform duration-300 flex items-center space-x-2 group"
                  >
                    <span>View All Services</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-red-700/50 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-red-200 text-sm text-center md:text-left">
              <p>&copy; 2024 Sobia's Hijama Therapy. All Rights Reserved.</p>
              <p className="mt-1">Licensed & Certified Hijama Practitioner in Karachi, Pakistan</p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-red-200">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>for your wellness</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;