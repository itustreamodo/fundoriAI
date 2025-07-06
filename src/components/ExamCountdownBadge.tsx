import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
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
    <div className="flex justify-center w-full py-2 bg-background">
      <Badge
        variant="outline"
        className="px-4 py-2 text-sm font-medium bg-black border-green-500 text-white flex items-center gap-2 shadow-md"
      >
        <Calendar className="h-4 w-4 text-green-500" />
        <span className="text-white">Days until Matric Finals:</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={daysRemaining}
            initial={animate ? { y: -20, opacity: 0 } : false}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="font-bold text-green-500"
          >
            {daysRemaining}
          </motion.span>
        </AnimatePresence>
      </Badge>
    </div>
  );
};

export default ExamCountdownBadge;
