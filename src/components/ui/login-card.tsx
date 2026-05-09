'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, easeOut } from 'framer-motion';
import { MoveRight, X, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PulsatingDots from './pulsating-loader';
import { Loader } from './loader';

interface LoginCardProps {
  onClose: () => void;
}

export default function LoginCard({ onClose }: LoginCardProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      router.push('/dashboard');
      onClose();
    }
  }, [router, onClose]);

  const containerVariants: any = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: easeOut },
    },
  };

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 1. Check Super Admin via API
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const authData = await response.json();
      
      if (response.ok && authData.success && authData.userRole === 'superadmin') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'superadmin');
        setIsRedirecting(true);
        setTimeout(() => {
          router.push('/admin');
          onClose();
        }, 1500);
        return;
      }
    } catch (apiError) {
      // API auth check
    }

    // 2. Check Dynamic Agencies from localStorage
    const storedAgenciesData = localStorage.getItem('clinicai_agencies');
    if (storedAgenciesData) {
      const agencies = JSON.parse(storedAgenciesData);
      const agency = agencies.find((a: any) => a.email === email && a.password === password);
      
      if (agency) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'agency');
        localStorage.setItem('currentAgencyId', agency.id);
        setIsRedirecting(true);
        setTimeout(() => {
          router.push('/dashboard');
          onClose();
        }, 1500);
        return;
      }
    }

    // 3. Check Dynamic Clinics from localStorage
    const storedClinicsData = localStorage.getItem('clinicai_clinics');
    if (storedClinicsData) {
      const clinics = JSON.parse(storedClinicsData);
      const clinic = clinics.find((c: any) => c.email === email && c.password === password);
      
      if (clinic) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'clinic');
        localStorage.setItem('currentClinicId', clinic.id);
        setIsRedirecting(true);
        setTimeout(() => {
          const slug = clinic.name.toLowerCase().replace(/\s+/g, '-');
          // Assuming the agency slug is 'agency-os' or similar, we use a generic path or the one provided
          router.push(`/agency-os/${slug}`);
          onClose();
        }, 1500);
        return;
      }
    }

    // No match found
    setIsLoading(false);
    setError('Invalid credentials. Access restricted to authorized personnel.');
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setError(`No AIVOICE OS account found for this ${provider} profile. Access is restricted to authorized clinic staff.`);
    }, 1500);
  };

  const handleContactRedirect = () => {
    onClose();
    window.location.href = '/#contact';
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[2px]"
      />

      <AnimatePresence>
        {isRedirecting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[210] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md"
          >
            <div className="flex flex-col items-center gap-6">
              <Loader variant="bars" size="xl" className="text-primary" />
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg font-medium text-foreground tracking-tight"
              >
                Accessing AIVOICE OS...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full max-w-md relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="bg-white/5 dark:bg-zinc-950/20 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-foreground/5 mb-4">
               <span className="text-2xl font-bold text-foreground">A</span>
            </div>
            <h1 className="text-3xl font-semibold text-black dark:text-white mb-2">
              Welcome back
            </h1>
            <p className="text-black/60 dark:text-white/60 text-sm">Sign in to your AIVOICE OS dashboard</p>
          </motion.div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm text-red-500 leading-snug">{error}</p>
                <button 
                  onClick={handleContactRedirect}
                  className="text-sm font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
                >
                  Get started here <MoveRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.form
                key="email-step"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={(e) => { e.preventDefault(); if(email) setStep(2); }}
                className="mb-6"
              >
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Work Email"
                    required
                    className="w-full bg-white/5 dark:bg-black/10 border border-white/10 rounded-full px-6 py-4 text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <motion.button 
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary rounded-full p-3 transition-colors hover:scale-105 active:scale-95"
                  >
                    <MoveRight className="w-4 h-4 text-primary-foreground" />
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.form
                key="password-step"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onSubmit={handleLogin}
                className="space-y-4 mb-6"
              >
                <div className="relative">
                  <input
                    type="password"
                    autoFocus
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    disabled={isLoading}
                    className="w-full bg-white/5 dark:bg-black/10 border border-white/10 rounded-full px-6 py-4 text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
                  />
                  <motion.button 
                    type="submit"
                    disabled={isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary rounded-full p-3 transition-colors hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    {isLoading ? <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <MoveRight className="w-4 h-4 text-primary-foreground" />}
                  </motion.button>
                </div>
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-medium text-black/40 dark:text-white/40 hover:text-primary transition-colors ml-6"
                >
                  ← Use different email
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <motion.div variants={itemVariants} className="flex items-center mb-6">
            <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
            <span className="px-4 text-black/40 dark:text-white/40 text-[10px] font-medium uppercase tracking-[0.2em]">or continue with</span>
            <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-3 mb-8">
            {['Google', 'Twitter', 'Apple'].map((provider) => (
              <motion.button
                key={provider}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSocialLogin(provider)}
                disabled={isLoading}
                className="w-full bg-white/5 dark:bg-black/10 border border-white/10 rounded-full px-6 py-3.5 text-black dark:text-white flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors group disabled:opacity-50"
              >
                <div className="flex items-center">
                  <div className="w-5 h-5 mr-3">
                    {provider === 'Google' && (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-black dark:text-white">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                    )}
                    {provider === 'Twitter' && (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-black dark:text-white">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    )}
                    {provider === 'Apple' && (
                      <svg viewBox="0 0 30 30" fill="currentColor" className="w-full h-full text-black dark:text-white">
                        <path d="M25.565,9.785c-0.123,0.077-3.051,1.702-3.051,5.305c0.138,4.109,3.695,5.55,3.756,5.55 c-0.061,0.077-0.537,1.963-1.947,3.94C23.204,26.283,21.962,28,20.076,28c-1.794,0-2.438-1.135-4.508-1.135 c-2.223,0-2.852,1.135-4.554,1.135c-1.886,0-3.22-1.809-4.4-3.496c-1.533-2.208-2.836-5.673-2.882-9 c-0.031-1.763,0.307-3.496,1.165-4.968c1.211-2.055,3.373-3.45,5.734-3.496c1.809-0.061,3.419,1.242,4.523,1.242 c1.058,0,3.036-1.242,5.274-1.242C21.394,7.041,23.97,7.332,25.565,9.785z M15.001,6.688c-0.322-1.61,0.567-3.22,1.395-4.247 c1.058-1.242,2.729-2.085,4.17-2.085c0.092,1.61-0.491,3.189-1.533,4.339C18.098,5.937,16.488,6.872,15.001,6.688z" />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium text-black dark:text-white">{provider}</span>
                </div>
                <MoveRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </motion.button>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <p className="text-black/50 dark:text-white/50 text-sm">
              Don&apos;t have an account?{' '}
              <button
                onClick={handleContactRedirect}
                className="text-primary font-bold hover:underline transition-colors"
              >
                 Get in touch
              </button>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
