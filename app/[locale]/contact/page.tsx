'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FiMapPin, FiPhone, FiMail, FiClock, FiTruck, FiGlobe, FiUsers, FiPackage, FiSend, FiCheck } from 'react-icons/fi';

interface FormData { name: string; email: string; phone: string; company: string; serviceType: string; message: string; }
interface FormErrors { name?: string; email?: string; phone?: string; serviceType?: string; message?: string; }

export default function ContactPage() {
  const t = useTranslations('contact');
  const tServices = useTranslations('services');
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', company: '', serviceType: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const serviceTypes = [
    { key: 'oceanFreight', label: tServices('oceanFreight') },
    { key: 'airFreight', label: tServices('airFreight') },
    { key: 'roadTransport', label: tServices('roadTransport') },
    { key: 'customs', label: tServices('customs') },
    { key: 'warehousing', label: tServices('warehousing') },
    { key: 'projectCargo', label: tServices('projectCargo') },
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
    setTimeout(() => { setIsSubmitting(false); setIsSubmitted(true); }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const inputClass = (hasError: boolean) => `w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white dark:bg-slate-900/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 ${hasError ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'} focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20`;

  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0f1a]">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 text-white py-20 px-6 overflow-hidden -mt-16 md:-mt-24 pt-32 md:pt-40">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-white rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">{t('heroTitle')}</h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light">{t('heroDescription')}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Form */}
            <div className="w-full lg:w-[70%]">
              <div className="bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/50 rounded-2xl p-8 shadow-sm">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('sendMessage')}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('responseTime')}</p>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4"><FiCheck className="w-8 h-8 text-white" /></div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('messageSent')}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{t('thankYou')}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">{t('fullName')} *</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={inputClass(!!errors.name)} />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">{t('emailAddress')} *</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className={inputClass(!!errors.email)} placeholder="your@email.com" />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">{t('phoneNumber')} *</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className={inputClass(!!errors.phone)} placeholder="+90 501 064 40 68" />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">{t('companyName')}</label>
                        <input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} className={inputClass(false)} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">{t('serviceType')} *</label>
                      <select id="serviceType" name="serviceType" value={formData.serviceType} onChange={handleInputChange} className={inputClass(!!errors.serviceType)}>
                        <option value="">{t('selectService')}</option>
                        {serviceTypes.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                      </select>
                      {errors.serviceType && <p className="text-red-500 text-sm mt-1">{errors.serviceType}</p>}
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">{t('message')} *</label>
                      <textarea id="message" name="message" rows={6} value={formData.message} onChange={handleInputChange} className={`${inputClass(!!errors.message)} resize-none`} placeholder={t('messagePlaceholder')} />
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full py-4 px-8 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-3 disabled:opacity-50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
                      {isSubmitting ? (<><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>{t('sending')}</>) : (<><FiSend className="w-5 h-5" />{t('sendButton')}</>)}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-[30%] space-y-6">
              <div className="card-hover bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('contactInfo')}</h3>
                <div className="space-y-4">
                  {[
                    { icon: FiMapPin, gradient: 'from-indigo-500 to-violet-500', label: t('address'), value: <><br/>Beycenter Residence<br/>Cumhuriyet Mahallesi, Esenyurt<br/>İstanbul, Turkey</> },
                    { icon: FiPhone, gradient: 'from-blue-500 to-cyan-500', label: t('phone'), value: '+90 501 064 40 68' },
                    { icon: FiMail, gradient: 'from-emerald-500 to-teal-500', label: t('email'), value: 'sales@dvnlog.com' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}><item.icon className="w-5 h-5 text-white" /></div>
                      <div><h4 className="font-semibold text-gray-900 dark:text-white">{item.label}</h4><p className="text-gray-500 dark:text-gray-400 text-sm">{item.value}</p></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-hover bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('officeHours')}</h3>
                <div className="flex items-center gap-3 mb-4"><FiClock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /><span className="font-semibold text-gray-900 dark:text-white">{t('workingHours')}</span></div>
                <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex justify-between"><span>{t('mondaySunday')}</span><span>09:00 - 18:00</span></div>
                  <div className="flex justify-between"><span>{t('publicHolidays')}</span><span>09:00 - 14:00</span></div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">{t('timezone')}</p>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-2">{t('emergencySupport')}</p>
                </div>
              </div>

              <div className="card-hover bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('whyChoose')}</h3>
                <div className="space-y-4">
                  {[
                    { icon: FiTruck, gradient: 'from-emerald-500 to-teal-500', main: t('reliableService'), sub: t('excellenceDelivery') },
                    { icon: FiGlobe, gradient: 'from-violet-500 to-fuchsia-500', main: '50+', sub: t('globalCoverage') },
                    { icon: FiUsers, gradient: 'from-amber-500 to-orange-500', main: '98%', sub: t('customerSatisfaction') },
                    { icon: FiPackage, gradient: 'from-blue-500 to-cyan-500', main: t('sevenDaySupport'), sub: t('available') },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center`}><item.icon className="w-5 h-5 text-white" /></div>
                      <div><div className="font-bold text-gray-900 dark:text-white">{item.main}</div><div className="text-sm text-gray-500 dark:text-gray-400">{item.sub}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-8 px-6 bg-white dark:bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">{t('findUs')}</h2>
          <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 dark:border-slate-700/50">
            <iframe title="DVN LOJISTIK Location Map" src="https://www.google.com/maps?q=DVN+LOJISTIK,+Beycenter+residance,+Cumhuriyet,+1991.+Sk.+Kat:+7+D:+56,+34515+Esenyurt/İstanbul&output=embed" className="w-full h-[300px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" aria-label="Map showing DVN LOJISTIK location" />
          </div>
        </div>
      </section>
    </main>
  );
}
