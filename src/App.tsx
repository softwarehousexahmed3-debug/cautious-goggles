import React, { useEffect, useState } from 'react';
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
  Sun
} from 'lucide-react';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const testimonials = [
    {
      name: "Fatima K.",
      location: "Karachi",
      text: "I was suffering from chronic back pain for years. After just a few sessions with Sobia, I feel like a new person. Her approach is so professional and caring. Highly recommended!",
      rating: 5
    },
    {
      name: "Aisha M.",
      location: "Karachi", 
      text: "The cosmetic hijama has done wonders for my skin! It looks clearer and feels so much healthier. Sobia is truly an expert in her field. The environment is very clean and relaxing.",
      rating: 5
    },
    {
      name: "Farid A.",
      location: "Karachi",
      text: "It significantly minimized my back pain. I did not expect it to be this effective. Sobia's knowledge and professionalism are impressive.",
      rating: 5
    }
  ];

  const services = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "General Body Hijama",
      description: "Comprehensive detoxification and immune system boost",
      price: "From PKR 3,000",
      features: ["Full body detox", "Immune boost", "Energy restoration"]
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Sunnah Points Hijama", 
      description: "Traditional Islamic cupping points for holistic wellness",
      price: "From PKR 2,500",
      features: ["Sunnah-based", "Spiritual wellness", "Traditional points"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Pain Relief Hijama",
      description: "Targeted therapy for chronic pain and inflammation",
      price: "From PKR 3,500", 
      features: ["Pain management", "Inflammation relief", "Muscle tension"]
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Facial & Cosmetic Hijama",
      description: "Natural skin rejuvenation and anti-aging treatment",
      price: "From PKR 4,000",
      features: ["Skin rejuvenation", "Anti-aging", "Natural glow"]
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Head & Migraine Hijama",
      description: "Specialized treatment for headaches and mental clarity",
      price: "From PKR 3,000",
      features: ["Migraine relief", "Mental clarity", "Stress reduction"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fertility & Hormonal Balance",
      description: "Support for reproductive health and hormone regulation",
      price: "From PKR 4,500",
      features: ["Hormonal balance", "Fertility support", "Reproductive health"]
    }
  ];

  const benefits = [
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Improved Circulation",
      description: "Enhances blood flow and oxygen delivery to tissues"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Detoxification", 
      description: "Removes toxins through improved lymphatic drainage"
    },
    {
      icon: <Leaf className="w-12 h-12" />,
      title: "Stress Relief",
      description: "Reduces stress hormones and promotes deep relaxation"
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Pain Management",
      description: "Alleviates chronic pain and muscle tension naturally"
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: "Natural Healing",
      description: "Stimulates body's natural healing mechanisms"
    },
    {
      icon: <Moon className="w-12 h-12" />,
      title: "Better Sleep",
      description: "Improves sleep quality by balancing nervous system"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 to-red-700 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Sobia's Hijama Therapy</h2>
          <p className="text-red-200">Loading your wellness journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-red-100 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Sobia's Hijama</h1>
                <p className="text-xs text-red-600 dark:text-red-400">Certified Therapy</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">About</button>
              <button onClick={() => scrollToSection('services')} className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">Services</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">Reviews</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">Contact</button>
            </nav>

            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700 flex items-center justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium">Certified Hijama Specialist</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Revitalize Your Health
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Naturally
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-red-100 leading-relaxed">
              Experience the ancient healing art of Hijama with Sobia, a certified practitioner in Karachi with over 6 years of dedicated experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button 
                onClick={() => scrollToSection('services')}
                className="bg-white text-red-800 px-8 py-4 rounded-full font-semibold hover:bg-red-50 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Explore Services</span>
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-red-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { icon: <Award className="w-8 h-8" />, number: "6+", label: "Years Experience" },
                { icon: <Users className="w-8 h-8" />, number: "500+", label: "Happy Clients" },
                { icon: <Shield className="w-8 h-8" />, number: "100%", label: "Safe & Hygienic" },
                { icon: <HeadphonesIcon className="w-8 h-8" />, number: "24/7", label: "Support Available" }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300">
                  <div className="text-yellow-400 mb-3 flex justify-center">{stat.icon}</div>
                  <div className="text-3xl font-bold mb-1">{stat.number}</div>
                  <div className="text-sm text-red-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Your <span className="text-red-600">Certified</span> Hijama Specialist
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Building trust through expertise and compassionate care
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Sobia - Hijama Practitioner" 
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">6+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Meet Sobia</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                With a passion for holistic wellness and over <strong>6 years of hands-on experience</strong>, I am dedicated to providing the highest standard of Hijama cupping therapy.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                My practice is built on trust, professionalism, and deep understanding of the Sunnah. I believe in personalized care for every client.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {["Certified Practitioner", "6+ Years Experience", "Hygienic & Safe", "Sunnah Based"].map((badge, index) => (
                  <span key={index} className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-4 py-2 rounded-full text-sm font-medium">
                    {badge}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center space-x-4 p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl">
                <Phone className="w-8 h-8 text-red-600" />
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Call for direct booking</div>
                  <div className="text-xl font-bold text-red-600">+92 317 0122099</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Health Benefits of <span className="text-red-600">Hijama Therapy</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover the scientifically-backed benefits of traditional cupping therapy
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="text-red-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Healing Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Select the therapies that align with your wellness goals
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border border-red-100 dark:border-red-900/30">
                <div className="text-red-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{service.description}</p>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-red-600">{service.price}</div>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors transform hover:scale-105"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Your health and comfort are our top priorities
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 italic leading-relaxed mb-6">
                  "{testimonials[activeTestimonial].text}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{testimonials[activeTestimonial].name}</div>
                    <div className="text-gray-600 dark:text-gray-400">{testimonials[activeTestimonial].location}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === activeTestimonial ? 'bg-red-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Begin Your Healing Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ready to experience the benefits of Hijama therapy? Get in touch today
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Phone</div>
                        <div className="text-red-600">+92 317 0122099</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Hours</div>
                        <div className="text-gray-600 dark:text-gray-400">Mon-Sat: 11 AM - 7 PM</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-8 rounded-2xl">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Booking</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    For immediate booking, call or WhatsApp us directly
                  </p>
                  <a 
                    href="https://wa.me/923170122099" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors transform hover:scale-105"
                  >
                    <span>WhatsApp Now</span>
                  </a>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Message</h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="+92 3XX XXXXXXX"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Service Interest
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                      <option>Select a service</option>
                      <option>General Body Hijama</option>
                      <option>Sunnah Points Hijama</option>
                      <option>Pain Relief Hijama</option>
                      <option>Facial & Cosmetic Hijama</option>
                      <option>Head & Migraine Hijama</option>
                      <option>Fertility & Hormonal Balance</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Tell us about your health concerns..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 font-semibold"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-red-900 to-red-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Sobia's Hijama Therapy</h3>
                  <p className="text-red-200 text-sm">Certified & Trusted</p>
                </div>
              </div>
              <p className="text-red-200 mb-6 leading-relaxed">
                Your partner in natural health and wellness in Karachi. Certified and experienced Hijama practitioner.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Home', id: 'home' },
                  { label: 'About', id: 'about' },
                  { label: 'Services', id: 'services' },
                  { label: 'Reviews', id: 'testimonials' },
                  { label: 'Contact', id: 'contact' }
                ].map((link, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => scrollToSection(link.id)}
                      className="text-red-200 hover:text-white transition-colors cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-red-300" />
                  <span className="text-red-200">+92 317 0122099</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-red-300" />
                  <span className="text-red-200">Mon-Sat: 11 AM - 7 PM</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-red-700 pt-8 text-center text-red-200">
            <p>&copy; 2024 Sobia's Hijama Therapy. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;