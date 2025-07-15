import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BookOpen, FileText, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface SubjectData {
  id: string;
  name: string;
  papers: PaperData[];
}

interface PaperData {
  id: string;
  year: number;
  type: string;
  downloadUrl: string;
  memoUrl: string;
  popular: boolean;
}

const HomeContent = () => {
  // Mock data for subjects and papers
  const subjects: SubjectData[] = [
    {
      id: "math",
      name: "Mathematics",
      papers: [
        {
          id: "math-2024-p1",
          year: 2024,
          type: "Paper 1",
          downloadUrl: "#",
          memoUrl: "#",
          popular: true,
        },
        {
          id: "math-2024-p2",
          year: 2024,
          type: "Paper 2",
          downloadUrl: "#",
          memoUrl: "#",
          popular: false,
        },
        {
          id: "math-2023-p1",
          year: 2023,
          type: "Paper 1",
          downloadUrl: "#",
          memoUrl: "#",
          popular: true,
        },
      ],
    },
    {
      id: "phys",
      name: "Physical Sciences",
      papers: [
        {
          id: "phys-2024-p1",
          year: 2024,
          type: "Paper 1",
          downloadUrl: "#",
          memoUrl: "#",
          popular: true,
        },
        {
          id: "phys-2023-p1",
          year: 2023,
          type: "Paper 1",
          downloadUrl: "#",
          memoUrl: "#",
          popular: false,
        },
      ],
    },
    {
      id: "eng",
      name: "English HL",
      papers: [
        {
          id: "eng-2024-p1",
          year: 2024,
          type: "Paper 1",
          downloadUrl: "#",
          memoUrl: "#",
          popular: false,
        },
        {
          id: "eng-2023-p1",
          year: 2023,
          type: "Paper 1",
          downloadUrl: "#",
          memoUrl: "#",
          popular: true,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col w-full h-full bg-transparent text-white p-4 pb-20">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          Exam Resources
        </h2>
        <p className="text-zinc-400 text-sm">
          Access past papers and study materials
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full mb-6 bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-1">
          <TabsTrigger
            value="all"
            className="flex-1 text-zinc-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg font-medium"
          >
            All Subjects
          </TabsTrigger>
          <TabsTrigger
            value="popular"
            className="flex-1 text-zinc-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg font-medium"
          >
            Popular
          </TabsTrigger>
          <TabsTrigger
            value="recent"
            className="flex-1 text-zinc-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg font-medium"
          >
            Recent
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {subjects.map((subject) => (
            <Card
              key={subject.id}
              className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 border border-zinc-700/50 text-white backdrop-blur-sm hover:border-green-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {subject.name}
                </CardTitle>
                <CardDescription className="text-zinc-400 font-medium">
                  {subject.papers.length} papers available
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {subject.papers.map((paper) => (
                  <div
                    key={paper.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-zinc-800/60 to-zinc-700/60 backdrop-blur-sm border border-zinc-600/30 hover:border-green-500/40 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-zinc-400" />
                      <div>
                        <p className="text-sm">
                          {paper.year} {paper.type}
                        </p>
                        {paper.popular && (
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 text-yellow-500 mr-1" />
                            <span className="text-xs text-yellow-500">
                              Popular
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent border-green-500/60 text-green-400 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-200 font-medium"
                      >
                        <BookOpen className="h-4 w-4 mr-1" />
                        Memo
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-green-500/25 transition-all duration-200 font-medium"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Paper
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full text-green-400 hover:text-green-300 hover:bg-gradient-to-r hover:from-zinc-800/50 hover:to-zinc-700/50 transition-all duration-200 font-medium"
                >
                  View all {subject.name} papers
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="popular" className="space-y-4">
          {subjects
            .map((subject) => {
              const popularPapers = subject.papers.filter(
                (paper) => paper.popular,
              );
              if (popularPapers.length === 0) return null;

              return (
                <Card
                  key={`${subject.id}-popular`}
                  className="bg-zinc-900 border-zinc-800 text-white"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-green-500">
                      {subject.name}
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                      {popularPapers.length} popular papers
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {popularPapers.map((paper) => (
                      <div
                        key={paper.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-zinc-800/60 to-zinc-700/60 backdrop-blur-sm border border-zinc-600/30 hover:border-green-500/40 transition-all duration-200 hover:shadow-md"
                      >
                        <div className="flex items-center space-x-2">
                          <FileText className="h-5 w-5 text-zinc-400" />
                          <div>
                            <p className="text-sm">
                              {paper.year} {paper.type}
                            </p>
                            <div className="flex items-center mt-1">
                              <Star className="h-3 w-3 text-yellow-500 mr-1" />
                              <span className="text-xs text-yellow-500">
                                Popular
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-transparent border-green-600 text-green-500 hover:bg-green-600 hover:text-white"
                          >
                            <BookOpen className="h-4 w-4 mr-1" />
                            Memo
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-600 text-white hover:bg-green-700"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Paper
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })
            .filter(Boolean)}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <div className="space-y-4">
            {subjects
              .map((subject) => {
                // Filter for only 2024 papers (most recent)
                const recentPapers = subject.papers.filter(
                  (paper) => paper.year === 2024,
                );
                if (recentPapers.length === 0) return null;

                return (
                  <Card
                    key={`${subject.id}-recent`}
                    className="bg-zinc-900 border-zinc-800 text-white"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-green-500">
                          {subject.name}
                        </CardTitle>
                        <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg font-medium">
                          New
                        </Badge>
                      </div>
                      <CardDescription className="text-zinc-400">
                        {recentPapers.length} recent papers
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {recentPapers.map((paper) => (
                        <div
                          key={paper.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-zinc-800/60 to-zinc-700/60 backdrop-blur-sm border border-zinc-600/30 hover:border-green-500/40 transition-all duration-200 hover:shadow-md"
                        >
                          <div className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-zinc-400" />
                            <div>
                              <p className="text-sm">
                                {paper.year} {paper.type}
                              </p>
                              {paper.popular && (
                                <div className="flex items-center mt-1">
                                  <Star className="h-3 w-3 text-yellow-500 mr-1" />
                                  <span className="text-xs text-yellow-500">
                                    Popular
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-transparent border-green-600 text-green-500 hover:bg-green-600 hover:text-white"
                            >
                              <BookOpen className="h-4 w-4 mr-1" />
                              Memo
                            </Button>
                            <Button
                              size="sm"
                              className="bg-green-600 text-white hover:bg-green-700"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Paper
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                );
              })
              .filter(Boolean)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomeContent;
