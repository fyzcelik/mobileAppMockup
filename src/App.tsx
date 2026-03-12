/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<"welcome" | "signup" | "login" | "onboarding_goal" | "onboarding_info" | "onboarding_avatar" | "onboarding_diagnostic" | "onboarding_test" | "onboarding_result" | "onboarding_academic_goals" | "dashboard" | "profile" | "lessons" | "active_test" | "test_result">("welcome");
  const [testResult, setTestResult] = useState<{ score: number; level: string } | null>(null);
  const [userGoal, setUserGoal] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col items-center justify-center p-4 font-sans">
      {/* Mobile Device Mockup Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative mx-auto border-[8px] border-zinc-900 rounded-[3rem] h-[720px] w-[340px] shadow-2xl overflow-hidden bg-white"
      >
        <AnimatePresence mode="wait">
          {currentScreen === "welcome" && (
            <WelcomeScreen 
              onGetStarted={() => setCurrentScreen("dashboard")} 
              onSignIn={() => setCurrentScreen("login")} 
            />
          )}
          {currentScreen === "signup" && (
            <SignUpScreen 
              onBack={() => setCurrentScreen("welcome")} 
              onLogin={() => setCurrentScreen("login")}
            />
          )}
          {currentScreen === "login" && (
            <LoginScreen 
              onBack={() => setCurrentScreen("welcome")} 
              onSignUp={() => setCurrentScreen("signup")}
              onLoginSuccess={() => setCurrentScreen("onboarding_goal")}
            />
          )}
          {currentScreen === "onboarding_goal" && (
            <GoalSelectionScreen 
              onNext={(goal) => {
                setUserGoal(goal);
                setCurrentScreen("onboarding_info");
              }} 
            />
          )}
          {currentScreen === "onboarding_info" && (
            <PersonalInfoScreen 
              onNext={() => setCurrentScreen("onboarding_avatar")} 
            />
          )}
          {currentScreen === "onboarding_avatar" && (
            <AvatarSelectionScreen 
              onNext={() => setCurrentScreen("onboarding_diagnostic")} 
            />
          )}
          {currentScreen === "onboarding_diagnostic" && (
            <DiagnosticChoiceScreen 
              onStartTest={() => setCurrentScreen("onboarding_test")}
              onSkipWithScore={(score) => {
                setTestResult({ score: parseInt(score), level: getLevelFromScore(parseInt(score)) });
                setCurrentScreen("onboarding_result");
              }}
            />
          )}
          {currentScreen === "onboarding_test" && (
            <DiagnosticTestScreen 
              onComplete={(score) => {
                setTestResult({ score, level: getLevelFromScore(score) });
                setCurrentScreen("onboarding_result");
              }}
            />
          )}
          {currentScreen === "onboarding_result" && (
            <DiagnosticResultScreen 
              score={testResult?.score || 0}
              level={testResult?.level || "B1"}
              onNext={() => setCurrentScreen("onboarding_academic_goals")} 
            />
          )}
          {currentScreen === "onboarding_academic_goals" && (
            <AcademicGoalsScreen 
              score={testResult?.score || 0}
              onNext={() => setCurrentScreen("dashboard")} 
            />
          )}
          {currentScreen === "dashboard" && (
            <DashboardScreen 
              onLogout={() => setCurrentScreen("welcome")}
              onSeeResults={() => setCurrentScreen("profile")}
              onProfileClick={() => setCurrentScreen("profile")}
              onLessonsClick={() => setCurrentScreen("lessons")}
            />
          )}
          {currentScreen === "profile" && (
            <ProfileScreen 
              score={testResult?.score || 86}
              goal={userGoal || "65"}
              onBack={() => setCurrentScreen("dashboard")}
              onHomeClick={() => setCurrentScreen("dashboard")}
              onLessonsClick={() => setCurrentScreen("lessons")}
            />
          )}
          {currentScreen === "lessons" && (
            <LessonsScreen 
              onHomeClick={() => setCurrentScreen("dashboard")}
              onProfileClick={() => setCurrentScreen("profile")}
              onStartTest={() => setCurrentScreen("active_test")}
              onSeeResults={() => setCurrentScreen("test_result")}
            />
          )}
          {currentScreen === "active_test" && (
            <ActiveTestScreen 
              onBack={() => setCurrentScreen("lessons")}
              onComplete={() => setCurrentScreen("test_result")}
              onHomeClick={() => setCurrentScreen("dashboard")}
              onProfileClick={() => setCurrentScreen("profile")}
            />
          )}
          {currentScreen === "test_result" && (
            <TestResultScreen 
              onBack={() => setCurrentScreen("lessons")}
              onHomeClick={() => setCurrentScreen("dashboard")}
              onLessonsClick={() => setCurrentScreen("lessons")}
              onProfileClick={() => setCurrentScreen("profile")}
            />
          )}
        </AnimatePresence>

        {/* Home Indicator */}
        <div className="absolute bottom-2 inset-x-0 flex justify-center z-30">
          <div className={`${currentScreen === "welcome" ? "bg-white/40" : "bg-zinc-200"} h-1.5 w-32 rounded-full`}></div>
        </div>
      </motion.div>
    </div>
  );
}

function WelcomeScreen({ onGetStarted, onSignIn }: { onGetStarted: () => void; onSignIn: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -20 }}
      className="absolute inset-0 bg-[#7a0000]"
    >
      {/* Deep Red Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#5c0000] via-[#8b0000] to-[#4a0000]"></div>

      {/* Status Bar */}
      <div className="relative z-20 pt-4 px-8 flex justify-between items-center text-[12px] font-medium text-white/90">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M2 22h20V2z" opacity="0.3" /><path d="M2 22h16V6z" /></svg>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17 7H7c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z" /></svg>
        </div>
      </div>

      {/* Main Content - Centered Logo Block */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="mb-4">
            <img 
              src="/logo_welcome.png" 
              alt="YDSKazan Logo" 
              className="w-56 h-auto drop-shadow-2xl"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "https://picsum.photos/seed/welcome/400/200?blur=2";
              }}
            />
          </div>
          <h2 className="text-white text-5xl font-serif tracking-tight">
            YDSKazan
          </h2>
        </motion.div>

        {/* Buttons Container */}
        <div className="absolute bottom-16 w-full px-6 space-y-6">
          <motion.button
            onClick={onGetStarted}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-[#ff69b4] to-[#ff1493] text-white font-bold rounded-2xl shadow-lg text-lg"
          >
            Get Started
          </motion.button>

          <motion.button
            onClick={onSignIn}
            whileHover={{ opacity: 0.8 }}
            className="w-full text-white font-medium text-lg"
          >
            Sign In
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function SignUpScreen({ onBack, onLogin }: { onBack: () => void; onLogin: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white flex flex-col px-6 pt-12 pb-8 overflow-y-auto"
    >
      {/* Status Bar (Dark) */}
      <div className="absolute top-0 inset-x-0 pt-4 px-8 flex justify-between items-center text-[12px] font-medium text-zinc-900 z-20">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M2 22h20V2z" opacity="0.3" /><path d="M2 22h16V6z" /></svg>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17 7H7c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z" /></svg>
        </div>
      </div>

      {/* Back Button */}
      <button onClick={onBack} className="self-start mb-4 text-zinc-400 hover:text-zinc-600 transition-colors">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-[28px] font-bold text-[#101828] leading-tight mb-2">
          Sign-up to see all our lectures!
        </h1>
        <p className="text-zinc-500 text-[15px]">
          Start your 3-day free trial.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4 mb-6">
        <input 
          type="text" 
          placeholder="Name" 
          className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-100 transition-all placeholder:text-zinc-400"
        />
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-100 transition-all placeholder:text-zinc-400"
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-100 transition-all placeholder:text-zinc-400"
        />
      </div>

      {/* Remember Me */}
      <div className="flex items-start gap-3 mb-6">
        <input type="checkbox" id="remember" className="mt-1 w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900" />
        <label htmlFor="remember" className="flex flex-col">
          <span className="text-sm font-semibold text-[#344054]">Remember me</span>
          <span className="text-xs text-zinc-500">Save my login details for next time.</span>
        </label>
      </div>

      {/* Submit Button */}
      <button className="w-full py-3.5 bg-[#0a0a0a] text-white font-bold rounded-xl shadow-sm hover:bg-zinc-800 transition-colors mb-6">
        Continue with email
      </button>

      {/* Divider */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="absolute inset-x-0 h-px bg-zinc-100"></div>
        <span className="relative px-4 bg-white text-[12px] font-medium text-zinc-400 uppercase tracking-wider">OR</span>
      </div>

      {/* Social Buttons */}
      <div className="space-y-3 mb-8">
        <SocialButton icon="google" label="Sign up with Google" />
        <SocialButton icon="facebook" label="Sign up with Facebook" />
        <SocialButton icon="apple" label="Sign up with Apple" />
      </div>

      {/* Footer */}
      <div className="text-center mt-auto">
        <p className="text-sm text-zinc-500">
          Already have an account? <button onClick={onLogin} className="font-bold text-[#101828] hover:underline">Log in</button>
        </p>
      </div>
    </motion.div>
  );
}

function LoginScreen({ onBack, onSignUp, onLoginSuccess }: { onBack: () => void; onSignUp: () => void; onLoginSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email === "test123@gmail.com" && password === "123") {
      onLoginSuccess();
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white flex flex-col px-6 pt-12 pb-8 overflow-y-auto"
    >
      {/* Status Bar (Dark) */}
      <div className="absolute top-0 inset-x-0 pt-4 px-8 flex justify-between items-center text-[12px] font-medium text-zinc-900 z-20">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M2 22h20V2z" opacity="0.3" /><path d="M2 22h16V6z" /></svg>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17 7H7c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z" /></svg>
        </div>
      </div>

      {/* Back Button */}
      <button onClick={onBack} className="self-start mb-4 text-zinc-400 hover:text-zinc-600 transition-colors">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-[28px] font-bold text-[#101828] leading-tight mb-2">
          Welcome back!
        </h1>
        <p className="text-zinc-500 text-[15px]">
          Please enter your details.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4 mb-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#344054]">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" 
            className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-100 transition-all placeholder:text-zinc-400"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#344054]">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" 
            className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-100 transition-all placeholder:text-zinc-400"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-xs mb-4 text-center">{error}</p>}

      {/* Options */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <input type="checkbox" id="remember-login" className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900" />
          <label htmlFor="remember-login" className="text-sm font-medium text-[#344054]">Remember for 30 days</label>
        </div>
        <button className="text-sm font-bold text-[#101828] hover:underline">Forgot password</button>
      </div>

      {/* Submit Button */}
      <button 
        onClick={handleLogin}
        className="w-full py-3.5 bg-[#0a0a0a] text-white font-bold rounded-xl shadow-sm hover:bg-zinc-800 transition-colors mb-6"
      >
        Sign in
      </button>

      {/* Divider */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="absolute inset-x-0 h-px bg-zinc-100"></div>
        <span className="relative px-4 bg-white text-[12px] font-medium text-zinc-400 uppercase tracking-wider">OR</span>
      </div>

      {/* Social Buttons */}
      <div className="space-y-3 mb-8">
        <SocialButton icon="google" label="Sign in with Google" />
        <SocialButton icon="facebook" label="Sign in with Facebook" />
        <SocialButton icon="apple" label="Sign in with Apple" />
      </div>

      {/* Footer */}
      <div className="text-center mt-auto">
        <p className="text-sm text-zinc-500">
          Don't have an account? <button onClick={onSignUp} className="font-bold text-[#101828] hover:underline">Sign up</button>
        </p>
      </div>
    </motion.div>
  );
}

function GoalSelectionScreen({ onNext }: { onNext: (goal: string) => void }) {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const goals = [
    { id: "50", label: "Get 50 from YDS", min: 50 },
    { id: "65", label: "Get 65 from YDS (academic minimum)", min: 65 },
    { id: "70", label: "Get 70 from YDS", min: 70 },
    { id: "80", label: "Get 80+ from YDS", min: 80 },
    { id: "docent", label: "Preparing for Associate Professorship", min: 65 },
    { id: "abroad", label: "Preparing for education abroad", min: 75 },
    { id: "custom", label: "I want to set my own goal", min: 55 }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="absolute inset-0 bg-white flex flex-col px-6 pt-16 pb-8 overflow-y-auto"
    >
      <h1 className="text-[32px] font-bold text-[#101828] text-center mb-10 leading-tight">
        What is your goal?
      </h1>

      <div className="space-y-3 mb-10">
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => setSelectedGoal(goal.id)}
            className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
              selectedGoal === goal.id 
                ? "border-[#7a0000] bg-[#7a0000]/5 text-[#101828]" 
                : "border-zinc-100 text-zinc-600"
            }`}
          >
            <span className="text-[15px] font-medium leading-snug pr-4">{goal.label}</span>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              selectedGoal === goal.id ? "border-[#7a0000] bg-[#7a0000]" : "border-zinc-200"
            }`}>
              {selectedGoal === goal.id && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              )}
            </div>
          </button>
        ))}
      </div>

      <button 
        onClick={() => selectedGoal && onNext(selectedGoal)}
        disabled={!selectedGoal}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all mt-auto ${
          selectedGoal ? "bg-[#0a0a0a] text-white" : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </motion.div>
  );
}

function PersonalInfoScreen({ onNext }: { onNext: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="absolute inset-0 bg-white flex flex-col px-6 pt-12 pb-8 overflow-y-auto"
    >
      <div className="flex justify-center mb-8">
        <img 
          src="/logo_onboarding.png" 
          alt="Logo" 
          className="w-32 h-auto"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = "https://picsum.photos/seed/onboarding/200/200?blur=1";
          }}
        />
      </div>

      <h1 className="text-[32px] font-bold text-[#101828] text-center mb-10">
        Lets get to know you?
      </h1>

      <div className="space-y-6 mb-10">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-500">Date of Birth</label>
          <div className="relative">
            <select className="w-full p-4 border border-zinc-200 rounded-xl appearance-none bg-white text-zinc-700 font-medium">
              <option>Select Year</option>
              {Array.from({ length: 50 }, (_, i) => 2024 - i).map(year => (
                <option key={year}>{year}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-500">Gender</label>
          <div className="relative">
            <select className="w-full p-4 border border-zinc-200 rounded-xl appearance-none bg-white text-zinc-700 font-medium">
              <option>Woman</option>
              <option>Man</option>
              <option>Other</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-500">Grade</label>
          <div className="relative">
            <select className="w-full p-4 border border-zinc-200 rounded-xl appearance-none bg-white text-zinc-700 font-medium">
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>University</option>
              <option>Graduate</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-500">Region</label>
          <div className="relative">
            <select className="w-full p-4 border border-zinc-200 rounded-xl appearance-none bg-white text-zinc-700 font-medium">
              <option>Turkey</option>
              <option>Europe</option>
              <option>USA</option>
              <option>Other</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={onNext}
        className="w-full py-4 bg-[#0a0a0a] text-white rounded-xl font-bold text-lg mt-auto"
      >
        Next
      </button>
    </motion.div>
  );
}

function AvatarSelectionScreen({ onNext }: { onNext: () => void }) {
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  const avatars = [
    "/avatar_1.png",
    "/avatar_2.png",
    "/avatar_3.png",
    "/avatar_4.png",
    "/avatar_5.png",
    "/avatar_6.png",
    "/avatar_7.png",
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="absolute inset-0 bg-white flex flex-col px-6 pt-16 pb-8 overflow-y-auto"
    >
      <h1 className="text-[32px] font-bold text-[#101828] text-center mb-10 leading-tight">
        Choose your avatar!
      </h1>

      <div className="grid grid-cols-2 gap-4 mb-10">
        {avatars.map((avatar, index) => (
          <motion.button
            key={index}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedAvatar(index)}
            className={`relative aspect-square rounded-[2rem] overflow-hidden border-4 transition-all ${
              selectedAvatar === index ? "border-[#7a0000] scale-105 z-10 shadow-lg" : "border-transparent"
            }`}
          >
            <img 
              src={avatar} 
              alt={`Avatar ${index + 1}`} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = `https://picsum.photos/seed/avatar${index + 1}/200/200`;
              }}
            />
            {selectedAvatar === index && (
              <div className="absolute inset-0 bg-[#7a0000]/10 flex items-center justify-center">
                <div className="bg-white rounded-full p-1 shadow-md">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7a0000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <button 
        onClick={onNext}
        disabled={selectedAvatar === null}
        className={`w-full py-4 rounded-xl font-bold text-lg mt-auto transition-all ${
          selectedAvatar !== null ? "bg-[#0a0a0a] text-white" : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </motion.div>
  );
}

function DiagnosticChoiceScreen({ onStartTest, onSkipWithScore }: { onStartTest: () => void; onSkipWithScore: (score: string) => void }) {
  const [choice, setChoice] = useState<"test" | "score" | null>(null);
  const [score, setScore] = useState("");

  const handleNext = () => {
    if (choice === "test") {
      onStartTest();
    } else if (choice === "score" && score) {
      onSkipWithScore(score);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="absolute inset-0 bg-white flex flex-col px-6 pt-16 pb-8 overflow-y-auto"
    >
      <h1 className="text-[32px] font-bold text-[#101828] text-center mb-4 leading-tight">
        Diagnostic Test
      </h1>
      <p className="text-zinc-500 text-center mb-10 px-4">
        Choose a method to determine your starting level.
      </p>

      <div className="space-y-4 mb-10">
        <button
          onClick={() => setChoice("test")}
          className={`w-full p-6 rounded-2xl border-2 transition-all text-left flex flex-col gap-2 ${
            choice === "test" ? "border-[#7a0000] bg-[#7a0000]/5" : "border-zinc-100"
          }`}
        >
          <span className="text-lg font-bold text-[#101828]">Take Diagnostic Test</span>
          <span className="text-sm text-zinc-500 leading-relaxed">
            Let's determine your level quickly with a short test.
          </span>
        </button>

        <div className={`w-full p-6 rounded-2xl border-2 transition-all flex flex-col gap-4 ${
          choice === "score" ? "border-[#7a0000] bg-[#7a0000]/5" : "border-zinc-100"
        }`}>
          <button
            onClick={() => setChoice("score")}
            className="text-left flex flex-col gap-2"
          >
            <span className="text-lg font-bold text-[#101828]">I'll Enter My Current Score</span>
            <span className="text-sm text-zinc-500 leading-relaxed">
              Continue by entering your most recent YDS score.
            </span>
          </button>
          
          {choice === "score" && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="pt-2"
            >
              <input 
                type="number" 
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="Enter your score (0-100)"
                className="w-full p-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7a0000]/20"
              />
            </motion.div>
          )}
        </div>
      </div>

      <button 
        onClick={handleNext}
        disabled={!choice || (choice === "score" && !score)}
        className={`w-full py-4 rounded-xl font-bold text-lg mt-auto transition-all ${
          (choice === "test" || (choice === "score" && score)) 
            ? "bg-[#0a0a0a] text-white" 
            : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
        }`}
      >
        {choice === "test" ? "Start Test" : "Continue"}
      </button>
    </motion.div>
  );
}

function DiagnosticTestScreen({ onComplete }: { onComplete: (score: number) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const questions = [
    {
      question: "I ___ to the cinema yesterday.",
      options: ["go", "went", "gone", "going"],
      correct: 1
    },
    {
      question: "What is the opposite of 'generous'?",
      options: ["kind", "mean", "happy", "tall"],
      correct: 1
    },
    {
      question: "She is interested ___ learning new languages.",
      options: ["in", "on", "at", "for"],
      correct: 0
    },
    {
      question: "If it rains tomorrow, we ___ the picnic.",
      options: ["cancel", "will cancel", "cancelled", "would cancel"],
      correct: 1
    },
    {
      question: "Choose the best response: 'How long have you been living here?'",
      options: ["Since 2010", "For 2010", "In 2010", "At 2010"],
      correct: 0
    }
  ];

  const handleNext = () => {
    if (selectedOption === null) return;
    
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score (0-100)
      const correctCount = newAnswers.reduce((acc, curr, idx) => {
        return acc + (curr === questions[idx].correct ? 1 : 0);
      }, 0);
      const finalScore = Math.round((correctCount / questions.length) * 100);
      onComplete(finalScore);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="absolute inset-0 bg-white flex flex-col px-6 pt-16 pb-8"
    >
      <div className="w-full h-1.5 bg-zinc-100 rounded-full mb-8 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-[#7a0000]"
        />
      </div>

      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-bold text-[#7a0000]">Question {currentQuestion + 1}</span>
        <span className="text-sm text-zinc-400">{currentQuestion + 1} / {questions.length}</span>
      </div>

      <h2 className="text-2xl font-bold text-[#101828] mb-8 leading-tight">
        {questions[currentQuestion].question}
      </h2>

      <div className="space-y-3">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedOption(index)}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
              selectedOption === index 
                ? "border-[#7a0000] bg-[#7a0000]/5 text-[#101828] font-bold" 
                : "border-zinc-100 text-zinc-600"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <button 
        onClick={handleNext}
        disabled={selectedOption === null}
        className={`w-full py-4 rounded-xl font-bold text-lg mt-auto transition-all ${
          selectedOption !== null ? "bg-[#0a0a0a] text-white" : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
        }`}
      >
        {currentQuestion === questions.length - 1 ? "Finish Test" : "Next Question"}
      </button>
    </motion.div>
  );
}

function DiagnosticResultScreen({ score, level, onNext }: { score: number; level: string; onNext: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -20 }}
      className="absolute inset-0 bg-white flex flex-col px-6 pt-20 pb-8 items-center text-center"
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 12 }}
        className="w-32 h-32 bg-[#7a0000]/10 rounded-full flex items-center justify-center mb-8"
      >
        <div className="w-24 h-24 bg-[#7a0000] rounded-full flex flex-col items-center justify-center text-white">
          <span className="text-3xl font-bold">{level}</span>
          <span className="text-[10px] uppercase tracking-widest opacity-80">Level</span>
        </div>
      </motion.div>

      <h1 className="text-3xl font-bold text-[#101828] mb-4">Level Determined!</h1>
      <p className="text-zinc-500 mb-8 leading-relaxed">
        Your estimated YDS score based on the test result: <span className="font-bold text-[#7a0000]">{score}</span>. 
        You're very close to your goal with the study plan we've prepared specifically for you!
      </p>

      <div className="w-full bg-zinc-50 rounded-2xl p-6 mb-10 text-left space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <div>
            <p className="text-sm font-bold text-[#101828]">Strong Areas</p>
            <p className="text-xs text-zinc-500">Basic grammar and tenses.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          </div>
          <div>
            <p className="text-sm font-bold text-[#101828]">Areas for Improvement</p>
            <p className="text-xs text-zinc-500">Academic vocabulary and conjunctions.</p>
          </div>
        </div>
      </div>

      <button 
        onClick={onNext}
        className="w-full py-4 bg-[#0a0a0a] text-white rounded-xl font-bold text-lg mt-auto"
      >
        Next
      </button>
    </motion.div>
  );
}

function AcademicGoalsScreen({ score, onNext }: { score: number; onNext: () => void }) {
  const goals = [
    { title: "PhD Application", min: 55, icon: "🎓" },
    { title: "Academic Staff (Lecturer)", min: 70, icon: "🏅" },
    { title: "Erasmus+ Mobility", min: 50, icon: "🌍" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="absolute inset-0 bg-zinc-50 flex flex-col"
    >
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-4 flex items-center justify-between border-b border-zinc-100">
        <button className="text-zinc-400">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h2 className="text-lg font-bold text-[#101828]">Academic Goals</h2>
        <div className="w-6" />
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-zinc-500">Onboarding Completing</span>
          <span className="text-sm font-bold text-[#7a0000]">3/3</span>
        </div>
        <div className="w-full h-2 bg-zinc-200 rounded-full mb-10 overflow-hidden">
          <div className="h-full bg-[#7a0000] w-full" />
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#101828] mb-4">Shape Your Career</h1>
          <p className="text-zinc-500 text-sm leading-relaxed px-4">
            Track how close you are to your academic goals with your language score and determine your strategy.
          </p>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 bg-[#7a0000]/10 rounded flex items-center justify-center text-[#7a0000]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
          </div>
          <h3 className="font-bold text-[#101828]">Academic Eligibility Status</h3>
        </div>

        <div className="space-y-4 mb-10">
          {goals.map((goal, index) => {
            const isReady = score >= goal.min;
            const progress = Math.min(Math.round((score / goal.min) * 100), 100);
            
            return (
              <div key={index} className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-xl">
                      {goal.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#101828]">{goal.title}</p>
                      <p className="text-[11px] text-zinc-400 font-medium">Required Minimum: {goal.min} Points</p>
                    </div>
                  </div>
                  {isReady ? (
                    <div className="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-[11px] font-bold">
                      Ready
                    </div>
                  ) : (
                    <div className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-[11px] font-bold">
                      %{progress} Close
                    </div>
                  )}
                </div>
                <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${isReady ? "bg-green-500" : "bg-[#7a0000]"}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-6 bg-white border-t border-zinc-100">
        <button 
          onClick={onNext}
          className="w-full py-4 bg-[#7a0000] text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-red-200"
        >
          Let's Get Started 🚀
        </button>
      </div>
    </motion.div>
  );
}

function getLevelFromScore(score: number): string {
  if (score < 30) return "A1";
  if (score < 50) return "A2";
  if (score < 70) return "B1";
  if (score < 85) return "B2";
  return "C1";
}

function MountainScreen({ userScore, onSelectLevel }: { userScore: number; onSelectLevel: () => void }) {
  const levels = [
    { id: "C2", range: "95-100", min: 95, x: 50, y: 15 },
    { id: "C1", range: "80-94", min: 80, x: 20, y: 28 },
    { id: "B2", range: "70-79", min: 70, x: 80, y: 42 },
    { id: "B1", range: "55-69", min: 55, x: 25, y: 58 },
    { id: "A2", range: "49-54", min: 49, x: 75, y: 72 },
    { id: "A1", range: "0-48", min: 0, x: 30, y: 85 },
  ];

  const userLevelIndex = levels.findIndex(l => userScore >= l.min);
  const userLevel = levels[userLevelIndex] || levels[levels.length - 1];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-[#1a302a] overflow-hidden flex flex-col"
    >
      {/* Mountain Background Illustration */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Far Mountains */}
        <svg className="absolute bottom-0 w-full h-[60%] opacity-20" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0 100 L20 40 L40 80 L60 30 L80 70 L100 20 L100 100 Z" fill="#2d5a4e" />
        </svg>
        {/* Mid Mountains */}
        <svg className="absolute bottom-0 w-full h-[45%] opacity-30" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0 100 L15 50 L35 85 L55 40 L75 90 L100 30 L100 100 Z" fill="#1e3d35" />
        </svg>
        {/* Near Mountains */}
        <svg className="absolute bottom-0 w-full h-[30%] opacity-40" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0 100 L25 60 L50 95 L75 55 L100 100 Z" fill="#142d27" />
        </svg>
        
        {/* Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a302a] via-transparent to-transparent opacity-60" />
      </div>

      {/* Back Button */}
      <div className="relative z-20 pt-12 px-6">
        <button className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
      </div>

      {/* Path and Nodes */}
      <div className="relative flex-1 z-10">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <motion.path
            d={`M ${levels[levels.length-1].x}% ${levels[levels.length-1].y}% ${levels.slice(0, -1).reverse().map(l => `L ${l.x}% ${l.y}%`).join(' ')}`}
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeOpacity="0.1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>

        {levels.map((level, index) => {
          const isUserLevel = level.id === userLevel.id;
          const isCompleted = userScore > level.min && !isUserLevel;
          const isFuture = userScore < level.min;
          
          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (levels.length - index) * 0.05 }}
              style={{ left: `${level.x}%`, top: `${level.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            >
              {/* Avatar Bubble */}
              {isUserLevel && (
                <motion.div 
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-14 z-20"
                >
                  <div className="relative w-12 h-12 rounded-full border-2 border-blue-400 overflow-hidden shadow-lg">
                    <img 
                      src="https://picsum.photos/seed/avatar_user/100/100" 
                      alt="User" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-400 rotate-45" />
                </motion.div>
              )}

              {/* Level Node */}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg ${
                  isUserLevel 
                    ? "bg-[#3b82f6] border-[4px] border-white scale-110" 
                    : isCompleted 
                      ? "bg-[#22c55e] border-[4px] border-white/20" 
                      : "bg-[#fef9c3] border-[4px] border-white/10"
                }`}
              >
                {isCompleted && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                )}
              </div>

              {/* Label Card */}
              <div className={`mt-3 px-4 py-1.5 rounded-full whitespace-nowrap bg-white/20 backdrop-blur-sm ${
                isFuture ? "opacity-40" : "opacity-100"
              }`}>
                <span className={`text-[11px] font-bold ${isFuture ? "text-zinc-400" : "text-white"}`}>
                  {level.id} {level.range}
                </span>
              </div>

              {/* Tooltips (Only for specific nodes to match image) */}
              {isUserLevel && (
                <div className="absolute top-20 -left-4 bg-white p-4 rounded-2xl shadow-2xl w-52 text-left z-30">
                  <p className="text-[#00a3ff] text-[10px] font-extrabold uppercase mb-1 tracking-wider">KEEP GOING!</p>
                  <p className="text-[#101828] text-base font-black">{level.id} {level.range}</p>
                  <p className="text-zinc-400 text-[10px] font-bold">%5 Completed</p>
                  {/* Tooltip Arrow */}
                  <div className="absolute -top-2 left-10 w-4 h-4 bg-white rotate-45" />
                </div>
              )}

              {isCompleted && level.id === "A2" && (
                <div className="absolute top-20 -right-4 bg-white p-4 rounded-2xl shadow-2xl w-52 text-left z-30">
                  <p className="text-[#22c55e] text-[10px] font-extrabold uppercase mb-1 tracking-wider">COMPLETED!</p>
                  <p className="text-[#101828] text-base font-black">{level.id} {level.range}</p>
                  <p className="text-zinc-400 text-[10px] font-bold leading-tight">Ranked 34th among 760 people.</p>
                  {/* Tooltip Arrow */}
                  <div className="absolute -top-2 right-10 w-4 h-4 bg-white rotate-45" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Bar */}
      <div className="relative z-20 p-8">
        <button 
          onClick={onSelectLevel}
          className="w-full py-4 bg-white text-[#1a302a] rounded-2xl font-black text-lg shadow-2xl hover:bg-zinc-100 transition-colors"
        >
          Enter Dashboard
        </button>
      </div>
    </motion.div>
  );
}

function DashboardScreen({ onLogout, onSeeResults, onProfileClick, onLessonsClick }: { onLogout: () => void; onSeeResults: () => void; onProfileClick: () => void; onLessonsClick: () => void }) {
  const [selectedDay, setSelectedDay] = useState(13);
  const days = [9, 10, 13, 11, 12, 14];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white flex flex-col font-sans"
    >
      {/* Red Header */}
      <div className="bg-[#b00000] pt-14 pb-6 px-6 flex items-center gap-4">
        <button onClick={onLogout} className="text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h1 className="text-4xl font-bold text-white tracking-tight">60-69</h1>
      </div>

      {/* Calendar Section */}
      <div className="px-6 py-6">
        <div className="flex justify-between items-center mb-6 px-10">
          <button className="text-zinc-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <h2 className="text-[17px] font-semibold text-zinc-600">January 2022</h2>
          <button className="text-zinc-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
        
        <div className="bg-[#f0f7ff] rounded-full p-1.5 flex justify-between items-center">
          {days.map((day) => (
            <button 
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`w-11 h-11 flex items-center justify-center rounded-full text-[17px] font-medium transition-all ${
                selectedDay === day 
                  ? "bg-[#42a5f5] text-white shadow-md" 
                  : "text-[#42a5f5]"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Session 1 */}
        <div className="bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 flex flex-col items-center">
          <h3 className="text-[32px] font-bold text-[#101828] mb-1">YDS Session 1</h3>
          <p className="text-zinc-400 text-[16px] mb-6">Labels help organize projects.</p>
          
          <div className="flex justify-center gap-12 mb-8">
            <div className="flex items-center gap-3 text-zinc-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span className="text-[16px] font-medium">25 Min</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="m9 12 2 2 4-4"/></svg>
              <span className="text-[16px] font-medium">32 Question</span>
            </div>
          </div>

          <button 
            onClick={onSeeResults}
            className="w-full py-4.5 bg-[#42a5f5] text-white font-bold rounded-2xl shadow-lg shadow-blue-100 text-lg"
          >
            Solved, See Results
          </button>
        </div>

        {/* Session 2 */}
        <div className="bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 flex flex-col items-center">
          <h3 className="text-[32px] font-bold text-[#101828] mb-1">YDS Session 2</h3>
          <p className="text-zinc-400 text-[16px] mb-6">Labels help organize projects.</p>
          
          <div className="flex justify-center gap-12 mb-8">
            <div className="flex items-center gap-3 text-zinc-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span className="text-[16px] font-medium">25 Min</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="m9 12 2 2 4-4"/></svg>
              <span className="text-[16px] font-medium">32 Question</span>
            </div>
          </div>

          <button className="w-full py-4.5 bg-[#1c1c1c] text-white font-bold rounded-2xl shadow-lg text-lg">
            Start Test
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="px-4 pb-8">
        <div className="bg-black p-2 flex justify-around items-center rounded-[3rem] shadow-2xl">
          <button className="flex flex-col items-center">
            <div className="bg-white px-5 py-2 rounded-full flex flex-col items-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#42a5f5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              <span className="text-[10px] text-[#42a5f5] font-bold mt-0.5">Homepage</span>
            </div>
          </button>
          <button onClick={onLessonsClick} className="flex flex-col items-center gap-1 p-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            <span className="text-[10px] text-white/60 font-medium">Lessons</span>
          </button>
          <button onClick={onProfileClick} className="flex flex-col items-center gap-1 p-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span className="text-[10px] text-white/60 font-medium">Profile</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z"/></svg>
            <span className="text-[10px] text-white/60 font-medium">AI YDS</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ProfileScreen({ score, goal, onBack, onHomeClick, onLessonsClick }: { score: number; goal: string; onBack: () => void; onHomeClick: () => void; onLessonsClick: () => void }) {
  const [activeTab, setActiveTab] = useState("Scores");

  const getToefl = (yds: number) => {
    if (yds >= 90) return 108;
    if (yds >= 80) return 95;
    if (yds >= 70) return 84;
    return Math.round(yds * 1.1);
  };

  const getAcademicStatus = (yds: number) => {
    const cards = [];
    if (yds >= 55) cards.push("Master's degree application can be made with this score");
    if (yds >= 65) cards.push("PhD application can be made with this score");
    if (yds >= 65) cards.push("Associate professorship language requirement is met");
    if (yds >= 50) cards.push("Academic staff applications can be made with this score");
    return cards;
  };

  const getGoalDiff = () => {
    const goalMap: Record<string, number> = {
      "50": 50, "65": 65, "70": 70, "80": 80, "docent": 65, "abroad": 75, "custom": 55
    };
    const target = goalMap[goal] || 65;
    const diff = target - score;
    const progress = Math.min(100, Math.max(0, (score / target) * 100));
    return {
      text: diff > 0 ? `You need ${diff} more points to reach your goal.` : "You've reached your goal! 🎉",
      progress,
      isMet: diff <= 0
    };
  };

  const goalInfo = getGoalDiff();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-[#f9fafb] flex flex-col font-sans overflow-hidden"
    >
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-black text-[#101828]">Iclal Peker</h1>
            <p className="text-sm text-zinc-400 font-medium">iclal@gmail.com</p>
          </div>
          <button onClick={onBack} className="text-zinc-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-zinc-100 p-1 rounded-xl flex gap-1">
          {["Scores", "Personal Info", "Missing Exams"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-[11px] font-bold rounded-lg transition-all ${
                activeTab === tab ? "bg-white text-[#101828] shadow-sm" : "text-zinc-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-32 space-y-8">
        {/* Score Section */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 self-start mb-4">
            <div className="w-5 h-5 rounded-full border-2 border-red-500 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
            </div>
            <span className="text-sm font-black text-[#101828]">Score</span>
          </div>
          
          <h2 className="text-[80px] font-black text-[#101828] leading-none mb-8 tracking-tighter">{score}</h2>

          {/* YDS Result Cards */}
          <div className="w-full space-y-4 mb-8">
            {/* TOEFL Equivalent */}
            <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 flex justify-between items-center">
              <div>
                <h4 className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-1">TOEFL Equivalent</h4>
                <p className="text-2xl font-black text-blue-600">~{getToefl(score)}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              </div>
            </div>

            {/* Goal Proximity */}
            <div className="bg-[#b00000] p-6 rounded-[2rem] text-white shadow-lg">
              <h4 className="text-[10px] font-black uppercase tracking-[0.25em] opacity-60 mb-2">Goal Proximity</h4>
              <p className="text-lg font-black leading-tight mb-4">{goalInfo.text}</p>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${goalInfo.progress}%` }}
                  className="h-full bg-white" 
                />
              </div>
            </div>
          </div>

          {/* Success Rate Card */}
          <div className="w-full bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-zinc-50 flex flex-col items-center">
            <div className="relative w-44 h-44 mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background Track */}
                <circle 
                  cx="50" cy="50" r="40" 
                  fill="none" stroke="#f0f7ff" strokeWidth="10" 
                  strokeDasharray="251.2" strokeDashoffset="62.8" 
                  strokeLinecap="round" 
                  className="rotate-[135deg] origin-center"
                />
                {/* Progress Track */}
                <circle 
                  cx="50" cy="50" r="40" 
                  fill="none" stroke="#42a5f5" strokeWidth="10" 
                  strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.8 * 0.75)} 
                  strokeLinecap="round" 
                  className="rotate-[135deg] origin-center"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-[#101828]">%80</span>
                <span className="text-[11px] text-zinc-400 font-bold">Success rate!</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-zinc-400 mb-8">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="m9 12 2 2 4-4"/></svg>
              <span className="text-xs font-bold">80 Question</span>
            </div>

            <div className="w-full space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-zinc-400">True</span>
                  <span className="text-red-500">70</span>
                </div>
                <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[87%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-zinc-400">False</span>
                  <span className="text-zinc-400">10</span>
                </div>
                <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[12%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-zinc-400">Empty</span>
                  <span className="text-zinc-400">0</span>
                </div>
                <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden" />
              </div>
            </div>

            <div className="mt-8 flex gap-3 bg-zinc-50 p-4 rounded-2xl w-full">
              <div className="flex-shrink-0 mt-0.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              </div>
              <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">
                You need to increase your speed on medium-difficulty questions.
              </p>
            </div>

            {/* Category Breakdown */}
            <div className="grid grid-cols-2 gap-4 w-full mt-6">
              <div className="bg-zinc-50 p-5 rounded-[2rem] flex flex-col items-center">
                <span className="text-[10px] font-bold text-zinc-400 mb-2">Grammar</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-[#101828]">20</span>
                  <span className="text-[11px] text-zinc-400 font-bold">/40</span>
                </div>
                <div className="w-full h-1 bg-zinc-200 rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-red-500 w-1/2" />
                </div>
              </div>
              <div className="bg-zinc-50 p-5 rounded-[2rem] flex flex-col items-center">
                <span className="text-[10px] font-bold text-zinc-400 mb-2">Vocabulary</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-[#101828]">20</span>
                  <span className="text-[11px] text-zinc-400 font-bold">/20</span>
                </div>
                <div className="w-full h-1 bg-zinc-200 rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-purple-500 w-full" />
                </div>
              </div>
            </div>
            <div className="bg-zinc-50 p-5 rounded-[2rem] flex flex-col items-center w-3/4 mt-4">
              <span className="text-[10px] font-bold text-zinc-400 mb-2">Reading</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-[#101828]">20</span>
                <span className="text-[11px] text-zinc-400 font-bold">/20</span>
              </div>
              <div className="w-full h-1 bg-zinc-200 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-red-500 w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Academic Equivalent */}
        <div className="space-y-4">
          <h4 className="text-[11px] font-black text-[#101828] uppercase tracking-widest ml-1">Academic Equivalent</h4>
          <div className="grid grid-cols-1 gap-3">
            {getAcademicStatus(score).map((text, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-zinc-100 flex items-center gap-4 shadow-sm">
                <div className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center text-green-500 flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <span className="text-[13px] font-bold text-[#101828] leading-tight">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ranking Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#f43f5e"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
            <span className="text-sm font-black text-[#101828]">Ranking</span>
          </div>
          <p className="text-[11px] text-zinc-400 font-bold">Graduate & Erasmus Programs Segment</p>
          <div className="bg-white p-7 rounded-[2rem] border border-zinc-50 shadow-sm">
            <p className="text-[13px] font-bold text-[#101828] mb-3">You are ranked A you are in first %11!</p>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-[#101828]">#B</span>
              <span className="text-3xl">🏆</span>
            </div>
          </div>
        </div>

        {/* Repeat and Improve */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center text-white text-[10px] font-bold">↑</div>
            <span className="text-sm font-black text-[#101828]">Repeat and Improve</span>
          </div>
          <div className="space-y-3">
            <div className="bg-white p-5 rounded-2xl border border-zinc-50 flex items-center gap-5 shadow-sm">
              <div className="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center text-red-500 font-black text-lg">!</div>
              <div className="flex-1">
                <h5 className="text-[13px] font-black text-[#101828]">Grammar</h5>
                <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">The error rate is high (45%). You need to solve more questions.</p>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-zinc-50 flex items-center gap-5 shadow-sm">
              <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 text-lg">⌛</div>
              <div className="flex-1">
                <h5 className="text-[13px] font-black text-[#101828]">Reading</h5>
                <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">Review of the topic is suggested. You need to review the matter again.</p>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>
        </div>

        {/* Video Card */}
        <div className="relative rounded-[2.5rem] overflow-hidden aspect-video shadow-2xl">
          <img src="https://picsum.photos/seed/teacher/400/225" alt="Teacher" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
            <div className="bg-white/20 backdrop-blur-md self-start px-4 py-1.5 rounded-full text-[11px] font-bold text-white mb-3">Part 1</div>
            <h4 className="text-2xl font-black text-white mb-5">How to get started</h4>
            <div className="flex items-center gap-5">
              <button className="text-white hover:scale-110 transition-transform">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="m7 4 12 8-12 8V4z"/></svg>
              </button>
              <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white w-1/3" />
              </div>
            </div>
          </div>
        </div>

        {/* AI Assistant Card */}
        <div className="bg-[#b00000] p-10 rounded-[3rem] text-white flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
          <div className="absolute -left-10 -top-10 text-[120px] opacity-10 rotate-12">🦌</div>
          <h4 className="text-xl font-black mb-8 relative z-10">Talk to the AI Assistant!</h4>
          <button className="bg-white text-[#b00000] px-10 py-4 rounded-full font-black flex items-center gap-4 shadow-xl hover:scale-105 transition-transform relative z-10">
            AI Deer <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-8 left-4 right-4 z-50">
        <div className="bg-black p-2 flex justify-around items-center rounded-[3rem] shadow-2xl">
          <button onClick={onHomeClick} className="flex flex-col items-center gap-1 p-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            <span className="text-[10px] text-white/60 font-medium">Homepage</span>
          </button>
          <button onClick={onLessonsClick} className="flex flex-col items-center gap-1 p-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            <span className="text-[10px] text-white/60 font-medium">Lessons</span>
          </button>
          <button className="flex flex-col items-center">
            <div className="bg-white px-5 py-2 rounded-full flex flex-col items-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#42a5f5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span className="text-[10px] text-[#42a5f5] font-bold mt-0.5">Profile</span>
            </div>
          </button>
          <button className="flex flex-col items-center gap-1 p-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z"/></svg>
            <span className="text-[10px] text-white/60 font-medium">AI YDS</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}




function LessonsScreen({ onHomeClick, onProfileClick, onStartTest, onSeeResults }: { onHomeClick: () => void; onProfileClick: () => void; onStartTest: () => void; onSeeResults: () => void }) {
  const [activeTab, setActiveTab] = useState<"video" | "practice">("practice");

  const exams = [
    { id: 1, title: "Practice Exam 1", status: "solved" },
    { id: 2, title: "Practice Exam 2", status: "start" },
    { id: 3, title: "Practice Exam 3", status: "start" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white flex flex-col font-sans overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-[32px] font-bold text-[#101828] mb-2">Grammar</h1>
        <p className="text-zinc-500 text-sm leading-relaxed mb-8">
          High-frequency YDS words, synonyms and antonyms, collocations, and contextual usage.
        </p>

        {/* Tabs */}
        <div className="flex gap-4 mb-10">
          <button 
            onClick={() => setActiveTab("video")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${
              activeTab === "video" ? "border-[#42a5f5] bg-[#42a5f5]/5 text-[#42a5f5]" : "border-zinc-100 text-zinc-400"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
            <div className="text-left">
              <p className="text-[11px] font-bold leading-none">Video Lessons</p>
              <p className="text-[10px] opacity-60">160 Video</p>
            </div>
          </button>
          <button 
            onClick={() => setActiveTab("practice")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${
              activeTab === "practice" ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-100 text-zinc-400"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <div className="text-left">
              <p className="text-[11px] font-bold leading-none">Practice Tests</p>
              <p className="text-[10px] opacity-60">46 Test</p>
            </div>
          </button>
        </div>
      </div>

      {/* Exams List */}
      <div className="flex-1 overflow-y-auto px-6 pb-32 space-y-4">
        {exams.map((exam) => (
          <div key={exam.id} className="bg-white p-6 rounded-[2rem] border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col items-center">
            <h3 className="text-2xl font-bold text-[#101828] mb-1">{exam.title}</h3>
            <p className="text-zinc-400 text-xs mb-6">Labels help organize projects.</p>
            
            <div className="flex justify-center gap-8 mb-8">
              <div className="flex items-center gap-2 text-zinc-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span className="text-xs font-bold">25 Min</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                <span className="text-xs font-bold">32 Question</span>
              </div>
            </div>

            {exam.status === "solved" ? (
              <button 
                onClick={onSeeResults}
                className="w-full py-4 bg-[#e91e63] text-white font-bold rounded-2xl shadow-lg shadow-pink-100 text-sm"
              >
                Solved See Results
              </button>
            ) : (
              <button 
                onClick={onStartTest}
                className="w-full py-4 bg-zinc-900 text-white font-bold rounded-2xl shadow-lg text-sm"
              >
                Start Test
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-8 left-4 right-4 z-50">
        <div className="bg-black p-2 flex justify-around items-center rounded-[3rem] shadow-2xl">
          <button onClick={onHomeClick} className="flex flex-col items-center gap-1 p-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            <span className="text-[10px] text-white/60 font-medium">Homepage</span>
          </button>
          <button className="flex flex-col items-center">
            <div className="bg-white px-5 py-2 rounded-full flex flex-col items-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#42a5f5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              <span className="text-[10px] text-[#42a5f5] font-bold mt-0.5">Lessons</span>
            </div>
          </button>
          <button onClick={onProfileClick} className="flex flex-col items-center gap-1 p-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span className="text-[10px] text-white/60 font-medium">Profile</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z"/></svg>
            <span className="text-[10px] text-white/60 font-medium">AI YDS</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}


function ActiveTestScreen({ onBack, onComplete, onHomeClick, onProfileClick }: { onBack: () => void; onComplete: () => void; onHomeClick: () => void; onProfileClick: () => void }) {
  const [selectedOption, setSelectedOption] = useState<string | null>("A");

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="absolute inset-0 bg-white flex flex-col font-sans overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 pt-12 pb-4 flex items-center justify-between">
        <button onClick={onBack} className="text-zinc-400">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div className="flex items-center gap-2 text-zinc-900 font-bold">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span className="text-sm">25 Min</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-6">
        <h2 className="text-2xl font-bold text-[#101828] mb-10 leading-tight">
          Vol. 1: Common YDS Vocabulary
        </h2>

        <p className="text-zinc-400 text-sm font-bold text-center mb-8">Question 1 of 25</p>

        <div className="bg-zinc-50/50 rounded-3xl p-8 mb-8">
          <h3 className="text-lg font-bold text-[#101828] leading-relaxed">
            Which word is the synonym of rapid?
          </h3>
        </div>

        <div className="space-y-3 mb-12">
          {[
            { id: "A", label: "Quick" },
            { id: "B", label: "Slow" },
            { id: "C", label: "Weak" },
            { id: "D", label: "Small" },
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`w-full p-5 rounded-xl border-2 text-left flex items-center gap-6 transition-all ${
                selectedOption === option.id 
                  ? "border-[#42a5f5] bg-[#f0f7ff] text-[#101828]" 
                  : "border-zinc-100 text-zinc-600"
              }`}
            >
              <span className="text-sm font-bold opacity-60">{option.id}</span>
              <span className="text-sm font-bold">{option.label}</span>
            </button>
          ))}
        </div>

        {/* Question Navigation */}
        <div className="flex items-center justify-between mb-12">
          <button className="w-12 h-12 rounded-xl border border-zinc-100 flex items-center justify-center text-zinc-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <span className="text-sm font-bold text-zinc-400">1 of 25</span>
          <button onClick={onComplete} className="w-12 h-12 rounded-xl border border-zinc-100 flex items-center justify-center text-zinc-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="px-4 pb-8">
        <div className="bg-black p-2 flex justify-around items-center rounded-[3rem] shadow-2xl">
          <button onClick={onHomeClick} className="flex flex-col items-center gap-1 p-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            <span className="text-[10px] text-white/60 font-medium">Homepage</span>
          </button>
          <button className="flex flex-col items-center">
            <div className="bg-white px-5 py-2 rounded-full flex flex-col items-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#42a5f5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              <span className="text-[10px] text-[#42a5f5] font-bold mt-0.5">Lessons</span>
            </div>
          </button>
          <button onClick={onProfileClick} className="flex flex-col items-center gap-1 p-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span className="text-[10px] text-white/60 font-medium">Profile</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z"/></svg>
            <span className="text-[10px] text-white/60 font-medium">AI YDS</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function TestResultScreen({ onBack, onHomeClick, onLessonsClick, onProfileClick }: { onBack: () => void; onHomeClick: () => void; onLessonsClick: () => void; onProfileClick: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="absolute inset-0 bg-white flex flex-col font-sans overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 pt-12 pb-4">
        <button onClick={onBack} className="text-zinc-400 mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h2 className="text-2xl font-bold text-[#101828] leading-tight">
          Vol. 1: Common YDS Vocabulary
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-6">
        <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center">
          <h3 className="text-[#667085] font-bold text-sm mb-10">YDS Vocabulary Exam 1 Result</h3>
          
          {/* Circular Progress */}
          <div className="relative w-48 h-48 mb-10">
            <svg className="w-full h-full transform -rotate-180">
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="#f2f4f7"
                strokeWidth="16"
                fill="transparent"
                strokeDasharray="251.3 502.6"
                strokeDashoffset="0"
                strokeLinecap="round"
              />
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="#d4ff00"
                strokeWidth="16"
                fill="transparent"
                strokeDasharray="125.6 502.6"
                strokeDashoffset="0"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
              <div className="flex items-baseline">
                <span className="text-2xl font-black text-[#101828]">%</span>
                <span className="text-4xl font-black text-[#101828]">50</span>
              </div>
              <p className="text-zinc-400 text-xs font-bold">Success rate!</p>
            </div>
            {/* Dot at the end of progress */}
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#00a651] rounded-full border-2 border-white shadow-sm" style={{ transform: 'translate(-50%, -50%) rotate(-90deg) translateY(-80px)' }} />
          </div>

          <div className="w-full border-t border-zinc-100 pt-6 mb-6 flex flex-col items-center">
            <p className="text-zinc-400 text-xs font-bold mb-1">Total</p>
            <p className="text-4xl font-black text-[#e91e63]">86</p>
          </div>

          <div className="w-full space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-[#101828]">True</span>
                <span className="text-xs font-bold text-[#e91e63]">70</span>
              </div>
              <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#e91e63] w-[70%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-[#101828]">False</span>
                <span className="text-xs font-bold text-zinc-400">10</span>
              </div>
              <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#e91e63] w-[30%] opacity-60" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="px-4 pb-8">
        <div className="bg-black p-2 flex justify-around items-center rounded-[3rem] shadow-2xl">
          <button onClick={onHomeClick} className="flex flex-col items-center gap-1 p-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            <span className="text-[10px] text-white/60 font-medium">Homepage</span>
          </button>
          <button onClick={onLessonsClick} className="flex flex-col items-center">
            <div className="bg-white px-5 py-2 rounded-full flex flex-col items-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#42a5f5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              <span className="text-[10px] text-[#42a5f5] font-bold mt-0.5">Lessons</span>
            </div>
          </button>
          <button onClick={onProfileClick} className="flex flex-col items-center gap-1 p-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span className="text-[10px] text-white/60 font-medium">Profile</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z"/></svg>
            <span className="text-[10px] text-white/60 font-medium">AI YDS</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function SocialButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="w-full py-3 px-4 border border-zinc-200 rounded-xl flex items-center justify-center gap-3 hover:bg-zinc-50 transition-colors">
      {icon === "google" && (
        <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
      )}
      {icon === "facebook" && (
        <svg width="20" height="20" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      )}
      {icon === "apple" && (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.066 11.34c.023 2.69 2.343 3.585 2.368 3.597-.02.067-.37 1.268-1.21 2.502-.725 1.064-1.477 2.123-2.665 2.145-1.17.02-1.548-.695-2.888-.695-1.34 0-1.76.673-2.867.716-1.15.043-2.022-1.15-2.752-2.214-1.49-2.175-2.63-6.144-1.102-8.794.76-1.314 2.112-2.148 3.575-2.17 1.112-.02 2.162.753 2.846.753.683 0 1.956-.945 3.28-.81 0.553.023 2.106.223 3.105 1.685-0.08.05-1.855 1.08-1.835 3.21l.023 0.07zM14.88 4.878c.6-0.73 1.005-1.743 0.895-2.753-0.868.035-1.92.58-2.543 1.31-0.558.646-1.045 1.675-0.915 2.665.968.075 1.963-0.493 2.563-1.222l0 0z"/></svg>
      )}
      <span className="text-sm font-semibold text-[#344054]">{label}</span>
    </button>
  );
}
