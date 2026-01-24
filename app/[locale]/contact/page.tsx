'use client';

import { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock, FiTruck, FiGlobe, FiUsers, FiPackage, FiSend, FiCheck } from 'react-icons/fi';

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
    <main className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section with Blue Gradient */}
      <section className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white py-20 px-6">
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
      <section className="py-16 px-6 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side - Contact Form (70%) */}
            <div className="w-full lg:w-[70%]">
              <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-white/20 dark:border-slate-700 rounded-2xl p-8 shadow-xl">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Send us a message</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">We&apos;ll get back to you within 24 hours.</p>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-slate-400">Thank you for contacting us. We&apos;ll respond within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-slate-600'} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`}
                          placeholder="Your full name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-slate-600'} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`}
                          placeholder="your@email.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 ${errors.phone ? 'border-red-500' : 'border-gray-200 dark:border-slate-600'} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`}
                          placeholder="+90 501 064 40 68"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 border-gray-200 dark:border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                          placeholder="Your company"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                        Service Type *
                      </label>
                      <select
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-white dark:bg-slate-800 text-gray-900 dark:text-white ${errors.serviceType ? 'border-red-500' : 'border-gray-200 dark:border-slate-600'} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`}
                      >
                        <option value="">Select a service</option>
                        {serviceTypes.map((service) => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                      {errors.serviceType && <p className="text-red-500 text-sm mt-1">{errors.serviceType}</p>}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 resize-none ${errors.message ? 'border-red-500' : 'border-gray-200 dark:border-slate-600'} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Tell us about your logistics needs..."
                      />
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-8 rounded-lg text-white font-semibold text-lg flex items-center justify-center gap-3 disabled:opacity-50 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
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
            <div className="w-full lg:w-[30%]">
              <div className="space-y-6">
                {/* Contact Information Card */}
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-white/20 dark:border-slate-700 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiMapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Address</h4>
                        <p className="text-gray-600 dark:text-slate-400 text-sm">
                          Beycenter Residence<br />
                          Cumhuriyet Mahallesi, Esenyurt<br />
                          İstanbul, Turkey
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiPhone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Phone</h4>
                        <p className="text-gray-600 dark:text-slate-400 text-sm">+90 501 064 40 68</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiMail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Email</h4>
                        <p className="text-gray-600 dark:text-slate-400 text-sm">sales@dvnlog.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Office Hours Card */}
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-white/20 dark:border-slate-700 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Office Hours</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <FiClock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">Working Hours</span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-slate-400">
                    <div className="flex justify-between">
                      <span>Monday - Sunday</span>
                      <span>09:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Public Holidays</span>
                      <span>09:00 - 14:00</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-slate-500 mt-3">GMT+3 (Turkey Time)</p>
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-2">Emergency Support Available 24/7</p>
                  </div>
                </div>

                {/* Company Stats Card */}
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-white/20 dark:border-slate-700 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Why Choose DVN LOG</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                        <FiTruck className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <div className="font-bold text-lg text-gray-900 dark:text-white">Reliable Service</div>
                        <div className="text-sm text-gray-600 dark:text-slate-400">Excellence in every delivery</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                        <FiGlobe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <div className="font-bold text-2xl text-gray-900 dark:text-white">50+</div>
                        <div className="text-sm text-gray-600 dark:text-slate-400">Global Coverage</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                        <FiUsers className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <div className="font-bold text-2xl text-gray-900 dark:text-white">98%</div>
                        <div className="text-sm text-gray-600 dark:text-slate-400">Customer Satisfaction</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <FiPackage className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="font-bold text-lg text-gray-900 dark:text-white">7-Day Support</div>
                        <div className="text-sm text-gray-600 dark:text-slate-400">Available</div>
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
      <section className="py-8 px-6 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Find Us</h2>
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
  );
}
