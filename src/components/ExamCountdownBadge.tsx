import React, { useState, useEffect } from "react";
import { Calendar, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "./ui/badge";

interface ExamCountdownBadgeProps {
  examDate?: Date;
}

const ExamCountdownBadge = ({
  examDate = new Date("2025-10-21"),
}: ExamCountdownBadgeProps) => {
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  const [animate, setAnimate] = useState<boolean>(false);

  useEffect(() => {
    const calculateDaysRemaining = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const timeDiff = examDate.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (daysDiff !== daysRemaining) {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 1000);
      }

      setDaysRemaining(daysDiff);
    };

    calculateDaysRemaining();

    // Update the countdown every day at midnight
    const interval = setInterval(calculateDaysRemaining, 86400000); // 24 hours

    return () => clearInterval(interval);
  }, [examDate, daysRemaining]);

  return (
    <div className="flex justify-center w-full py-4 bg-gradient-to-b from-black to-zinc-900">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 rounded-full blur-xl" />

        <Badge
          variant="outline"
          className="relative px-6 py-3 text-sm font-semibold bg-gradient-to-r from-zinc-900 via-black to-zinc-900 border-2 border-green-500/50 text-white flex items-center gap-3 shadow-2xl backdrop-blur-sm hover:border-green-400/70 transition-all duration-300 rounded-full"
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <Calendar className="h-5 w-5 text-green-400" />
              <Sparkles className="h-2 w-2 text-green-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-zinc-200 font-medium">
              Days until Matric Finals:
            </span>
          </div>

          <div className="flex items-center gap-1">
            <AnimatePresence mode="wait">
              <motion.span
                key={daysRemaining}
                initial={animate ? { y: -20, opacity: 0, scale: 0.8 } : false}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 20, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="font-bold text-2xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
              >
                {daysRemaining}
              </motion.span>
            </AnimatePresence>
            <span className="text-green-400 font-medium ml-1">days</span>
          </div>
        </Badge>
      </motion.div>
    </div>
  );
};

export default ExamCountdownBadge;
