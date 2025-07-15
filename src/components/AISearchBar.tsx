import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Mic,
  MicOff,
  Sparkles,
  BookOpen,
  Brain,
  Target,
  Zap,
  Send,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

interface AISearchBarProps {
  className?: string;
}

interface SearchResult {
  id: string;
  title: string;
  content: string;
  subject: string;
  relevance: number;
  type: "concept" | "example" | "practice" | "tip";
}

const AISearchBar: React.FC<AISearchBarProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [userName, setUserName] = useState("Scholar");
  const [currentPrompts, setCurrentPrompts] = useState<string[]>([]);
  const [motivationalText, setMotivationalText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // South African Grade 12 NCF curriculum-specific prompts
  const curriculumPrompts = [
    "Explain the concept of oxidation and reduction in Physical Sciences",
    "How do I solve quadratic equations using the quadratic formula?",
    "What are the main themes in Cry, the Beloved Country?",
    "Explain the process of photosynthesis and cellular respiration",
    "How do I calculate compound interest in Mathematical Literacy?",
    "What were the causes of the Anglo-Boer War in South African History?",
    "Explain the concept of supply and demand in Economics",
    "How do I analyze poetry for English Home Language?",
    "What is the difference between ionic and covalent bonding?",
    "Explain the concept of derivatives in Mathematics",
    "What are the main features of apartheid legislation?",
    "How do I solve trigonometric equations?",
    "Explain the concept of ecosystems and biodiversity",
    "What is the role of enzymes in biological processes?",
    "How do I write a persuasive essay for English?",
    "Explain the concept of electric circuits and Ohm's law",
    "What are the main economic systems and their characteristics?",
    "How do I solve systems of linear equations?",
    "Explain the concept of genetics and inheritance",
    "What were the key events of the Soweto Uprising?",
  ];

  const motivationalTexts = [
    "You're doing amazing, {name}! Every question brings you closer to success! 🌟",
    "Keep pushing forward, {name}! Your matric dreams are within reach! 💪",
    "Brilliant work, {name}! Knowledge is your superpower! 🧠✨",
    "You've got this, {name}! Every study session counts! 📚🔥",
    "Outstanding effort, {name}! Your future self will thank you! 🚀",
    "Incredible dedication, {name}! Success is just around the corner! 🎯",
    "Phenomenal progress, {name}! You're building your bright future! 🌈",
    "Exceptional work, {name}! Your hard work will pay off! 💎",
  ];

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-ZA"; // South African English

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        handleSearch(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Get user name and generate prompts on component mount
  useEffect(() => {
    const initializeComponent = async () => {
      // Get user info
      const { data } = await supabase.auth.getUser();
      let fetchedUserName = "Scholar";

      if (data.user?.user_metadata?.first_name) {
        fetchedUserName = data.user.user_metadata.first_name;
      } else if (data.user?.user_metadata?.full_name) {
        fetchedUserName = data.user.user_metadata.full_name.split(" ")[0];
      } else if (data.user?.email) {
        fetchedUserName = data.user.email.split("@")[0];
      }

      setUserName(fetchedUserName);

      // Generate random prompts
      generateRandomPrompts();

      // Set motivational text with the fetched user name
      const randomMotivation =
        motivationalTexts[Math.floor(Math.random() * motivationalTexts.length)];
      setMotivationalText(randomMotivation.replace("{name}", fetchedUserName));
    };

    initializeComponent();
  }, []);

  const generateRandomPrompts = () => {
    const shuffled = [...curriculumPrompts].sort(() => 0.5 - Math.random());
    setCurrentPrompts(shuffled.slice(0, 4));
  };

  const handleVoiceSearch = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSearch = async (query: string = searchQuery) => {
    if (!query.trim()) return;

    setIsSearching(true);
    setShowResults(true);
    setIsExpanded(true);

    // Simulate AI search with mock results
    // In a real implementation, this would call your AI service
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const mockResults: SearchResult[] = [
      {
        id: "1",
        title: "Understanding " + query,
        content: `Here's a comprehensive explanation of ${query} tailored for Grade 12 students. This concept is fundamental to your matric success.`,
        subject: "General",
        relevance: 95,
        type: "concept",
      },
      {
        id: "2",
        title: "Practice Questions",
        content: `Try these practice questions related to ${query} to test your understanding and prepare for exams.`,
        subject: "Practice",
        relevance: 88,
        type: "practice",
      },
      {
        id: "3",
        title: "Study Tips",
        content: `Pro tips for mastering ${query} and excelling in your matric exams. These strategies have helped thousands of students.`,
        subject: "Study Tips",
        relevance: 82,
        type: "tip",
      },
    ];

    setSearchResults(mockResults);
    setIsSearching(false);
  };

  const handlePromptClick = (prompt: string) => {
    setSearchQuery(prompt);
    handleSearch(prompt);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
    setIsExpanded(false);
    generateRandomPrompts();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "concept":
        return <Brain className="w-4 h-4" />;
      case "practice":
        return <Target className="w-4 h-4" />;
      case "tip":
        return <Zap className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "concept":
        return "from-blue-500 to-indigo-500";
      case "practice":
        return "from-green-500 to-emerald-500";
      case "tip":
        return "from-yellow-500 to-orange-500";
      default:
        return "from-purple-500 to-pink-500";
    }
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Motivational Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="flex items-center justify-center mb-2">
          <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
          <p className="text-sm font-medium bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            {motivationalText}
          </p>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative mb-6"
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-400" />
          </div>
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Ask me anything about your matric subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="pl-12 pr-24 h-14 text-lg bg-gradient-to-r from-zinc-900/80 to-zinc-800/80 border border-zinc-700/50 text-white placeholder:text-zinc-400 focus:border-green-500/50 focus:ring-green-500/20 backdrop-blur-sm rounded-2xl"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-2">
            {searchQuery && (
              <Button
                size="sm"
                variant="ghost"
                onClick={clearSearch}
                className="text-zinc-400 hover:text-white hover:bg-zinc-700/50 rounded-xl"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={handleVoiceSearch}
              className={cn(
                "rounded-xl transition-all duration-200",
                isListening
                  ? "text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-700/50",
              )}
            >
              {isListening ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </Button>
            <Button
              size="sm"
              onClick={() => handleSearch()}
              disabled={!searchQuery.trim() || isSearching}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 rounded-xl px-4"
            >
              {isSearching ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Suggested Prompts */}
      {!showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="text-sm font-medium text-zinc-400 mb-3 flex items-center">
            <Brain className="w-4 h-4 mr-2" />
            Suggested Questions for Today
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentPrompts.map((prompt, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => handlePromptClick(prompt)}
                className="text-left p-4 rounded-xl bg-gradient-to-r from-zinc-900/60 to-zinc-800/60 border border-zinc-700/30 hover:border-green-500/40 transition-all duration-200 hover:shadow-lg hover:shadow-green-500/10 group"
              >
                <p className="text-sm text-zinc-300 group-hover:text-white transition-colors duration-200">
                  {prompt}
                </p>
              </motion.button>
            ))}
          </div>
          <div className="text-center mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={generateRandomPrompts}
              className="text-green-400 hover:text-green-300 hover:bg-zinc-800/50 rounded-xl"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Get New Suggestions
            </Button>
          </div>
        </motion.div>
      )}

      {/* Search Results */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Search className="w-5 h-5 mr-2 text-green-400" />
                Search Results
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl"
              >
                <X className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>

            {isSearching ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-zinc-400">
                  Searching for the best answers...
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 border border-zinc-700/50 text-white backdrop-blur-sm hover:border-green-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg font-semibold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent flex items-center">
                            <div
                              className={cn(
                                "w-8 h-8 rounded-lg bg-gradient-to-r flex items-center justify-center mr-3",
                                getTypeColor(result.type),
                              )}
                            >
                              {getTypeIcon(result.type)}
                            </div>
                            {result.title}
                          </CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-400 border-green-500/30">
                              {result.subject}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-zinc-400 border-zinc-600"
                            >
                              {result.relevance}% match
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-zinc-300 leading-relaxed">
                          {result.content}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AISearchBar;
