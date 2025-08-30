'use client';

import { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock, FiTruck, FiGlobe, FiUsers, FiPackage, FiSend, FiCheck } from 'react-icons/fi/index.js';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  serviceType?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const serviceTypes = [
    'Ocean Freight',
    'Air Freight', 
    'Land Transportation',
    'Customs Clearance',
    'Warehousing',
    'Project Cargo',
    'Other Services'
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.serviceType) newErrors.serviceType = 'Service type is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <>
      <style jsx>{`
        .gradient-bg {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .form-input {
          transition: all 0.3s ease;
          border: 2px solid #e5e7eb;
        }
        .form-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .form-input.error {
          border-color: #ef4444;
        }
        .btn-primary {
          background: linear-gradient(135deg, #1e3a8a, #3b82f6);
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
        }
        .contact-card {
          transition: all 0.3s ease;
        }
        .contact-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        @media (max-width: 768px) {
          .split-layout {
            flex-direction: column;
          }
          .form-section {
            width: 100% !important;
          }
          .sidebar-section {
            width: 100% !important;
          }
        }
      `}</style>

      <main className="min-h-screen">
        {/* Hero Section with Blue Gradient */}
        <section className="gradient-bg text-white py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Ready to streamline your logistics? Contact our expert team for personalized solutions.
            </p>
          </div>
        </section>

        {/* Main Content - Split Layout */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="split-layout flex gap-8">
              {/* Left Side - Contact Form (70%) */}
              <div className="form-section" style={{ width: '70%' }}>
                <div className="glass-card rounded-2xl p-8 shadow-xl">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a message</h2>
                  <p className="text-sm text-slate-600">We&apos;ll get back to you within 24 hours.</p>
                  
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiCheck className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                      <p className="text-gray-600">Thank you for contacting us. We&apos;ll respond within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`form-input w-full px-4 py-3 rounded-lg ${errors.name ? 'error' : ''}`}
                            placeholder="Your full name"
                          />
                          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`form-input w-full px-4 py-3 rounded-lg ${errors.email ? 'error' : ''}`}
                            placeholder="your@email.com"
                          />
                          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`form-input w-full px-4 py-3 rounded-lg ${errors.phone ? 'error' : ''}`}
                            placeholder="+90 501 064 40 68"
                          />
                          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                            Company Name
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="form-input w-full px-4 py-3 rounded-lg"
                            placeholder="Your company"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-700 mb-2">
                          Service Type *
                        </label>
                        <select
                          id="serviceType"
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleInputChange}
                          className={`form-input w-full px-4 py-3 rounded-lg ${errors.serviceType ? 'error' : ''}`}
                        >
                          <option value="">Select a service</option>
                          {serviceTypes.map((service) => (
                            <option key={service} value={service}>{service}</option>
                          ))}
                        </select>
                        {errors.serviceType && <p className="text-red-500 text-sm mt-1">{errors.serviceType}</p>}
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={6}
                          value={formData.message}
                          onChange={handleInputChange}
                          className={`form-input w-full px-4 py-3 rounded-lg resize-none ${errors.message ? 'error' : ''}`}
                          placeholder="Tell us about your logistics needs..."
                        />
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full py-4 px-8 rounded-lg text-white font-semibold text-lg flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <FiSend className="w-5 h-5" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Right Side - Contact Info & Stats (30%) */}
              <div className="sidebar-section" style={{ width: '30%' }}>
                <div className="space-y-6">
                  {/* Contact Information Card */}
                  <div className="contact-card glass-card rounded-2xl p-6 shadow-xl">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FiMapPin className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Address</h4>
                          <p className="text-gray-600 text-sm">
                            Beycenter Residence<br />
                            Cumhuriyet Mahallesi, Esenyurt<br />
                            İstanbul, Turkey
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FiPhone className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Phone</h4>
                          <p className="text-gray-600 text-sm">+90 501 064 40 68</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FiMail className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Email</h4>
                          <p className="text-gray-600 text-sm">sales@dvnlog.com</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Office Hours Card */}
                  <div className="contact-card glass-card rounded-2xl p-6 shadow-xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Office Hours</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <FiClock className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-gray-900">Working Hours</span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Monday - Sunday</span>
                        <span>09:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Public Holidays</span>
                        <span>09:00 - 14:00</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-3">GMT+3 (Turkey Time)</p>
                      <p className="text-xs font-semibold text-blue-600 mt-2">Emergency Support Available 24/7</p>
                    </div>
                  </div>

                  {/* Company Stats Card */}
                  <div className="contact-card glass-card rounded-2xl p-6 shadow-xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose DVN LOG</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <FiTruck className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-bold text-lg text-gray-900">Reliable Service</div>
                          <div className="text-sm text-gray-600">Excellence in every delivery</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <FiGlobe className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-bold text-2xl text-gray-900">50+</div>
                          <div className="text-sm text-gray-600">Global Coverage</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <FiUsers className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <div className="font-bold text-2xl text-gray-900">98%</div>
                          <div className="text-sm text-gray-600">Customer Satisfaction</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FiPackage className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-bold text-lg text-gray-900">7-Day Support</div>
                          <div className="text-sm text-gray-600">Available</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-8 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Find Us</h2>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <iframe
                title="DVN LOJISTIK Location Map"
                src="https://www.google.com/maps?q=DVN+LOJISTIK,+Beycenter+residance,+Cumhuriyet,+1991.+Sk.+Kat:+7+D:+56,+34515+Esenyurt/İstanbul&output=embed"
                className="w-full h-[300px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Map showing DVN LOJISTIK location"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
