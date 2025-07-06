import React from "react";
import ExamCountdownBadge from "./ExamCountdownBadge";
import HomeContent from "./HomeContent";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <div className="w-full max-w-md px-4 py-6 flex flex-col items-center">
        <div className="w-full flex justify-center mb-6">
          <ExamCountdownBadge />
        </div>

        <div className="w-full">
          <h1 className="text-2xl font-bold mb-2 text-green-500">Fundori</h1>
          <p className="text-gray-400 mb-6">
            Your matric exam preparation companion
          </p>

          <HomeContent />
        </div>
      </div>
    </div>
  );
}
