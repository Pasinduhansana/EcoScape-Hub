import React from "react";
import { Link } from "react-router-dom";
import {
  CheckIcon,
  ArrowRightIcon,
  ClockIcon,
  UserGroupIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const About = () => {
  const values = [
    {
      title: "Environmental Stewardship",
      description:
        "We believe in protecting and enhancing the natural environment through responsible landscaping practices.",
    },
    {
      title: "Community Focus",
      description:
        "Building stronger communities by creating spaces where people and nature can thrive together.",
    },
    {
      title: "Innovation",
      description:
        "Embracing new technologies and methods to deliver sustainable solutions that exceed expectations.",
    },
    {
      title: "Quality Craftsmanship",
      description:
        "Every project reflects our commitment to excellence, attention to detail, and lasting results.",
    },
  ];

  const teamMembers = [
    {
      name: "Sarah Green",
      role: "Founder & Lead Designer",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "With over 15 years in sustainable landscape design, Sarah founded EcoScape Hub to make eco-friendly landscaping accessible to everyone.",
    },
    {
      name: "Mike Rodriguez",
      role: "Senior Horticulturist",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Mike specializes in native plant ecosystems and has helped restore over 100 acres of natural habitat in our region.",
    },
    {
      name: "Emily Chen",
      role: "Water Conservation Specialist",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Emily designs innovative irrigation systems that reduce water usage by up to 70% while maintaining beautiful landscapes.",
    },
  ];

  const milestones = [
    {
      year: "2018",
      title: "Company Founded",
      description:
        "Started with a mission to transform landscaping through sustainability",
    },
    {
      year: "2019",
      title: "100th Project",
      description:
        "Completed our first 100 sustainable landscape transformations",
    },
    {
      year: "2021",
      title: "Award Recognition",
      description: "Received the Green Business Excellence Award",
    },
    {
      year: "2023",
      title: "500+ Projects",
      description:
        "Reached over 500 completed projects and 1M gallons of water saved",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-emerald-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="hero-title text-gray-900 mb-6">
                Creating Sustainable Landscapes
                <span className="text-gradient block">Since 2018</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We're passionate about transforming outdoor spaces into thriving
                ecosystems that benefit both people and the planet. Our approach
                combines innovative design with environmental responsibility.
              </p>
              <div className="flex items-center space-x-8 text-green-600">
                <div className="flex items-center space-x-2">
                  <CheckIcon className="h-5 w-5" />
                  <span className="font-medium">Licensed & Insured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckIcon className="h-5 w-5" />
                  <span className="font-medium">5+ Years Experience</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Our team working on a landscape project"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Our Mission & Values</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              We're driven by a simple belief: beautiful landscapes should
              enhance, not harm, the natural environment.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-green-50 rounded-2xl p-8 mb-16">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                To create sustainable, beautiful outdoor spaces that promote
                biodiversity, conserve resources, and connect communities with
                nature. We believe that thoughtful landscape design can address
                environmental challenges while providing spaces for people to
                thrive.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckIcon className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h4>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Meet Our Team</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Our passionate team of experts brings together decades of
              experience in sustainable landscaping, horticulture, and
              environmental conservation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="card text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-green-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Our Journey</h2>
            <p className="section-subtitle">
              From a small startup to a leading sustainable landscaping company,
              here are the key milestones in our growth.
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-2xl font-bold text-green-600">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {milestone.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-white mb-4">
              Our Impact by the Numbers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: UserGroupIcon, number: "500+", label: "Happy Clients" },
              {
                icon: GlobeAltIcon,
                number: "50K+",
                label: "Native Plants Installed",
              },
              { icon: ClockIcon, number: "1M+", label: "Gallons Water Saved" },
              { icon: CheckIcon, number: "95%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-12 w-12 text-green-200 mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-green-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-6">Ready to Start Your Project?</h2>
          <p className="section-subtitle mb-8">
            Let's discuss how we can transform your outdoor space into a
            sustainable, beautiful landscape that reflects your values.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">
              Get Free Consultation
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/projects" className="btn-secondary">
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
