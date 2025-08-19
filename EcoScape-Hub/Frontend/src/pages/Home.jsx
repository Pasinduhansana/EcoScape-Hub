import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  GlobeAltIcon,
  LightBulbIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { FaLeaf } from "react-icons/fa";

const Home = () => {
  const features = [
    {
      icon: FaLeaf,
      title: "Sustainable Design",
      description:
        "Eco-friendly landscapes that work with nature, not against it.",
    },
    {
      icon: GlobeAltIcon,
      title: "Native Plant Focus",
      description: "Promoting biodiversity with locally adapted plant species.",
    },
    {
      icon: LightBulbIcon,
      title: "Smart Solutions",
      description:
        "Innovative approaches to water conservation and energy efficiency.",
    },
    {
      icon: HeartIcon,
      title: "Community Care",
      description:
        "Building healthy environments for people and wildlife to thrive.",
    },
  ];

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "95%", label: "Client Satisfaction" },
    { number: "50K+", label: "Plants Installed" },
    { number: "1M+", label: "Gallons Water Saved" },
  ];

  const testimonials = [
    {
      text: "EcoScape Hub transformed our backyard into a beautiful, sustainable oasis. The native plants they recommended have attracted so many birds and butterflies!",
      author: "Sarah Johnson",
      location: "Residential Client",
    },
    {
      text: "Their expertise in water-wise landscaping helped us reduce our irrigation costs by 60% while maintaining a gorgeous landscape year-round.",
      author: "Mike Chen",
      location: "Commercial Property Manager",
    },
    {
      text: "The team's commitment to sustainability and attention to detail exceeded our expectations. Highly recommend for any eco-conscious project.",
      author: "Emily Rodriguez",
      location: "Municipal Parks Director",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-emerald-100 overflow-hidden">
        <div className="absolute inset-0 bg-white/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="hero-title text-gray-900 mb-6">
                Transform Your Space with
                <span className="text-gradient block">
                  Sustainable Landscaping
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Create beautiful, eco-friendly outdoor spaces that benefit both
                your property and the environment. Expert sustainable
                landscaping services you can trust.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/services" className="btn-primary">
                  Explore Services
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/projects" className="btn-secondary">
                  View Our Work
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/hero-landscape.jpg"
                  alt="Beautiful sustainable landscape"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
                  }}
                />
              </div>
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircleIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">500+</div>
                    <div className="text-sm text-gray-600">Happy Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Why Choose EcoScape Hub?</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              We combine environmental responsibility with stunning design to
              create landscapes that are both beautiful and beneficial for our
              planet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="sustainability-icon mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-white mb-4">Our Impact</h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Making a difference one landscape at a time. Here's what we've
              accomplished together.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="stats-number text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-green-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Our Services</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              From design consultation to ongoing maintenance, we offer
              comprehensive sustainable landscaping services tailored to your
              needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Landscape Design",
                description:
                  "Custom sustainable landscape designs that reflect your vision and environmental values.",
                image:
                  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
              },
              {
                title: "Native Plant Installation",
                description:
                  "Expert installation of native plants that thrive in your local climate and support wildlife.",
                image:
                  "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
              },
              {
                title: "Water Conservation",
                description:
                  "Smart irrigation systems and drought-resistant landscaping to minimize water usage.",
                image:
                  "https://images.unsplash.com/photo-1574263867128-3d65da4b8e3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="card service-card group cursor-pointer"
              >
                <div className="aspect-w-16 aspect-h-10 mb-6">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <div className="flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors">
                  Learn More
                  <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/services" className="btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">What Our Clients Say</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients
              have to say about their EcoScape Hub experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-green-600 text-sm">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-bg">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Outdoor Space?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Let's work together to create a beautiful, sustainable landscape
            that you'll love and the environment will thank you for.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-green-600 hover:bg-gray-50 font-semibold py-3 px-8 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600"
            >
              Get Free Consultation
            </Link>
            <Link
              to="/projects"
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold py-3 px-8 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600"
            >
              View Our Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
