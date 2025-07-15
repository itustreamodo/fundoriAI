import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authHelpers } from "@/lib/supabase";
import { Eye, EyeOff, BookOpen, Target, Trophy, Users } from "lucide-react";

interface LandingPageProps {
  onAuthSuccess: () => void;
}

export default function LandingPage({ onAuthSuccess }: LandingPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const { data, error } = await authHelpers.signIn(
        loginForm.email,
        loginForm.password,
      );

      if (error) {
        setError(error.message);
      } else if (data.user) {
        setSuccess("Login successful!");
        setTimeout(() => onAuthSuccess(), 1000);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await authHelpers.signUp(
        signupForm.email,
        signupForm.password,
        {
          firstName: signupForm.firstName,
          lastName: signupForm.lastName,
        },
      );

      if (error) {
        setError(error.message);
      } else if (data.user) {
        setSuccess(
          "Account created successfully! Please check your email to verify your account.",
        );
        // Clear form
        setSignupForm({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Study Materials",
      description: "Access curated content for all matric subjects",
    },
    {
      icon: Target,
      title: "Personalized Learning",
      description: "AI-powered study plans tailored to your needs",
    },
    {
      icon: Trophy,
      title: "Track Progress",
      description: "Monitor your improvement with detailed analytics",
    },
    {
      icon: Users,
      title: "Study Community",
      description: "Connect with fellow students and share knowledge",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex flex-col items-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/10 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-6xl px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
            Fundori
          </h1>
          <p className="text-xl text-zinc-400 mb-2">
            Your AI-powered matric exam preparation companion
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Features Section */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">
                Ace Your Matric Exams
              </h2>
              <p className="text-zinc-400 text-lg mb-8">
                Join thousands of students who have improved their grades with
                our comprehensive study platform.
              </p>
            </div>

            <div className="grid gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-zinc-400 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Auth Section */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="w-full max-w-md bg-zinc-800/50 backdrop-blur-sm border-zinc-700/50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-white">
                  Get Started
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Sign in to your account or create a new one
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-zinc-700/50">
                    <TabsTrigger
                      value="login"
                      className="text-white data-[state=active]:bg-green-600"
                    >
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger
                      value="signup"
                      className="text-white data-[state=active]:bg-green-600"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-4 mt-6">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Input
                          type="email"
                          placeholder="Email"
                          value={loginForm.email}
                          onChange={(e) =>
                            setLoginForm({
                              ...loginForm,
                              email: e.target.value,
                            })
                          }
                          required
                          className="bg-zinc-700/50 border-zinc-600 text-white placeholder:text-zinc-400"
                        />
                      </div>
                      <div className="space-y-2 relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={loginForm.password}
                          onChange={(e) =>
                            setLoginForm({
                              ...loginForm,
                              password: e.target.value,
                            })
                          }
                          required
                          className="bg-zinc-700/50 border-zinc-600 text-white placeholder:text-zinc-400 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold"
                      >
                        {isLoading ? "Signing In..." : "Sign In"}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4 mt-6">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Input
                            type="text"
                            placeholder="First Name"
                            value={signupForm.firstName}
                            onChange={(e) =>
                              setSignupForm({
                                ...signupForm,
                                firstName: e.target.value,
                              })
                            }
                            required
                            className="bg-zinc-700/50 border-zinc-600 text-white placeholder:text-zinc-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Input
                            type="text"
                            placeholder="Last Name"
                            value={signupForm.lastName}
                            onChange={(e) =>
                              setSignupForm({
                                ...signupForm,
                                lastName: e.target.value,
                              })
                            }
                            required
                            className="bg-zinc-700/50 border-zinc-600 text-white placeholder:text-zinc-400"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Input
                          type="email"
                          placeholder="Email"
                          value={signupForm.email}
                          onChange={(e) =>
                            setSignupForm({
                              ...signupForm,
                              email: e.target.value,
                            })
                          }
                          required
                          className="bg-zinc-700/50 border-zinc-600 text-white placeholder:text-zinc-400"
                        />
                      </div>
                      <div className="space-y-2 relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={signupForm.password}
                          onChange={(e) =>
                            setSignupForm({
                              ...signupForm,
                              password: e.target.value,
                            })
                          }
                          required
                          className="bg-zinc-700/50 border-zinc-600 text-white placeholder:text-zinc-400 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <div className="space-y-2">
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          value={signupForm.confirmPassword}
                          onChange={(e) =>
                            setSignupForm({
                              ...signupForm,
                              confirmPassword: e.target.value,
                            })
                          }
                          required
                          className="bg-zinc-700/50 border-zinc-600 text-white placeholder:text-zinc-400"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold"
                      >
                        {isLoading ? "Creating Account..." : "Create Account"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                {/* Error/Success Messages */}
                {error && (
                  <motion.div
                    className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-md text-red-400 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.div>
                )}
                {success && (
                  <motion.div
                    className="mt-4 p-3 bg-green-500/20 border border-green-500/50 rounded-md text-green-400 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {success}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
