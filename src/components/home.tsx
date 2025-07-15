import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { authHelpers } from "@/lib/supabase";
import { LogOut, Menu, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import ExamCountdownBadge from "./ExamCountdownBadge";
import HomeContent from "./HomeContent";
import AISearchBar from "./AISearchBar";

export default function Home() {
  const [userName, setUserName] = useState("Student");

  useEffect(() => {
    const getUserInfo = async () => {
      const { user } = await authHelpers.getCurrentUser();
      if (user?.user_metadata?.full_name) {
        setUserName(user.user_metadata.full_name);
      } else if (user?.user_metadata?.first_name) {
        setUserName(user.user_metadata.first_name);
      } else if (user?.email) {
        setUserName(user.email.split("@")[0]);
      }
    };
    getUserInfo();
  }, []);

  const handleSignOut = async () => {
    await authHelpers.signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex flex-col items-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/10 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

      {/* Burger Menu */}
      <div className="absolute top-4 right-4 z-20">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:text-white hover:bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm bg-black/20 rounded-xl transition-all duration-200 hover:border-zinc-600/50 hover:bg-zinc-800/30"
            >
              <Menu className="w-5 h-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-zinc-900/95 backdrop-blur-md border-zinc-700/50 shadow-xl rounded-xl mt-2"
          >
            <div className="px-3 py-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{userName}</p>
                  <p className="text-xs text-zinc-400">Matric Prep</p>
                </div>
              </div>
            </div>
            <DropdownMenuSeparator className="bg-zinc-700/50" />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-zinc-300 hover:text-white hover:bg-zinc-800/50 cursor-pointer transition-colors duration-150 mx-1 rounded-lg"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative z-10 w-full max-w-md px-4 py-6 flex flex-col items-center">
        <div className="w-full flex justify-center mb-8">
          <ExamCountdownBadge />
        </div>

        <motion.div
          className="w-full mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <AISearchBar />
        </motion.div>

        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <motion.h1
              className="text-4xl font-bold mb-3 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Fundori
            </motion.h1>
            <motion.p
              className="text-zinc-400 text-lg font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Your matric exam preparation companion
            </motion.p>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mt-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <HomeContent />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
