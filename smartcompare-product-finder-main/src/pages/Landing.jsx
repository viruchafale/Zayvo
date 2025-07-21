import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, BarChart3, Shield, Zap } from 'lucide-react';
import heroImage from '../assets/hero-image.jpg';

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-poppins">
                Compare Products Like Never Before
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
                Find the best deals across multiple e-commerce platforms. Compare prices, ratings, and features all in one place with our intelligent comparison engine.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/search">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    <Search className="h-5 w-5 mr-2" />
                    Start Comparing Now
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Product comparison illustration" 
                className="w-full h-auto rounded-lg shadow-elegant"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-poppins">
              Why Choose SmartCompare?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our advanced platform makes product comparison simple, fast, and reliable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-card shadow-card border border-border">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Smart Search</h3>
              <p className="text-muted-foreground">
                Find products across multiple platforms with our intelligent search engine that understands what you're looking for.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-card shadow-card border border-border">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Detailed Comparison</h3>
              <p className="text-muted-foreground">
                Compare prices, ratings, features, and availability side-by-side to make informed purchasing decisions.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-card shadow-card border border-border">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Real-time Updates</h3>
              <p className="text-muted-foreground">
                Get the latest prices and availability information updated in real-time from all major e-commerce sites.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-poppins">
            Ready to Start Comparing?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Join thousands of smart shoppers who save money and time with SmartCompare.
          </p>
          <Link to="/search">
            <Button size="lg" variant="secondary">
              <Search className="h-5 w-5 mr-2" />
              Start Your First Search
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}