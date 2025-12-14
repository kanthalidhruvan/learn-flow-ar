import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CodeInputModule } from "@/components/CodeInputModule";
import { SolutionComparison } from "@/components/SolutionComparison";
import { CodeEvaluation } from "@/components/CodeEvaluation";
import { ARVideoPlayer } from "@/components/ARVideoPlayer";
import { 
  Brain, 
  Zap, 
  Eye, 
  Code2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Target
} from "lucide-react";

// Mock data - in real implementation, this would come from AI analysis
const mockSolutions = [
  {
    type: "brute-force" as const,
    title: "Brute Force Approach",
    description: "Simple nested loop solution that checks every possible combination. Easy to understand but not optimal for large datasets.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    efficiency: 25,
    code: `function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}`,
    explanation: "Iterates through array once, comparing each element to find maximum."
  },
  {
    type: "better" as const,
    title: "Optimized Solution",
    description: "Uses built-in methods with better readability and slightly improved performance through native optimization.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    efficiency: 75,
    code: `function findMax(arr) {
  return Math.max(...arr);
}`,
    explanation: "Leverages JavaScript's built-in Math.max function for better performance."
  },
  {
    type: "optimal" as const,
    title: "Optimal Implementation",
    description: "Most efficient approach using reduce function with proper error handling and edge case management.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    efficiency: 95,
    code: `function findMax(arr) {
  if (!arr.length) return undefined;
  return arr.reduce((max, current) => 
    current > max ? current : max, arr[0]
  );
}`,
    explanation: "Uses functional programming approach with reduce for optimal readability and performance."
  }
];

const mockEvaluation = {
  overallScore: 78,
  grade: "B+",
  metrics: [
    {
      name: "Algorithm Correctness",
      score: 9,
      maxScore: 10,
      description: "Code produces correct output for all test cases",
      suggestions: ["Add edge case handling for empty arrays"]
    },
    {
      name: "Code Efficiency",
      score: 6,
      maxScore: 10,
      description: "Time complexity could be improved",
      suggestions: ["Consider using built-in methods", "Optimize loop structure"]
    },
    {
      name: "Code Style",
      score: 8,
      maxScore: 10,
      description: "Good variable naming and structure",
      suggestions: ["Add JSDoc comments", "Consider const over let where applicable"]
    },
    {
      name: "Best Practices",
      score: 7,
      maxScore: 10,
      description: "Follows most coding conventions",
      suggestions: ["Add input validation", "Consider error handling"]
    }
  ],
  feedback: {
    strengths: [
      "Clear and readable code structure",
      "Proper variable naming conventions",
      "Correct algorithm implementation",
      "Good use of basic programming constructs"
    ],
    improvements: [
      "Add input validation for edge cases",
      "Consider more efficient algorithms",
      "Include error handling mechanisms",
      "Add documentation and comments"
    ],
    recommendations: [
      "Study built-in array methods like Math.max()",
      "Learn about functional programming approaches",
      "Practice with larger datasets to understand efficiency",
      "Explore advanced JavaScript features"
    ]
  },
  graphAnalysis: {
    astComplexity: 12,
    cfgComplexity: 8,
    semanticSimilarity: 87
  }
};

const mockVideo = {
  title: "Understanding Array Maximum: From Brute Force to Optimal",
  description: "Learn how to find the maximum element in an array using different approaches, from basic loops to advanced functional programming techniques.",
  youtubeId: "lrMPbTGrZM4", // This would be a real educational video ID
  duration: "8:42",
  difficulty: "beginner" as const,
  topics: ["Arrays", "Loops", "Built-in Methods", "Time Complexity", "Algorithm Optimization"]
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState<"input" | "analysis" | "solutions" | "evaluation" | "video">("input");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedCode, setAnalyzedCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const { toast } = useToast();

  const handleCodeSubmit = async (code: string, language: string) => {
    setIsAnalyzing(true);
    setAnalyzedCode(code);
    setSelectedLanguage(language);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setCurrentStep("analysis");
      toast({
        title: "Analysis Complete!",
        description: "Your code has been analyzed using Graph-Based Semantic Similarity.",
      });
    }, 3000);
  };

  const handleViewInAR = (solution: any) => {
    toast({
      title: "AR Mode Activated",
      description: "Solution visualization ready for AR overlay (Unity/ARCore integration required).",
    });
  };

  const handleWatchVideo = (solution: any) => {
    setCurrentStep("video");
  };

  const handleEnterAR = () => {
    toast({
      title: "AR Environment Ready",
      description: "Launching immersive AR learning experience...",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-ar-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        <div className="relative container mx-auto px-6 py-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-8 h-8 text-primary-foreground animate-float" />
              <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">
                AR-Enhanced Learning
              </Badge>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Learn<span className="text-accent-glow">Flow</span> AR
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl">
              Revolutionary programming education platform combining Augmented Reality with 
              Graph-Based Semantic Similarity for immersive, intelligent code learning.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="ar-accent" 
                size="ar-large"
                onClick={() => setCurrentStep("input")}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start AR Learning
              </Button>
              <Button 
                variant="ar-outline" 
                size="ar-large"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Steps */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center gap-4 mb-8">
          {[
            { id: "input", icon: Code2, label: "Code Input", description: "Enter your code" },
            { id: "analysis", icon: Brain, label: "AI Analysis", description: "Graph-based evaluation" },
            { id: "solutions", icon: Target, label: "Solutions", description: "Multiple approaches" },
            { id: "evaluation", icon: Zap, label: "Evaluation", description: "Detailed feedback" },
            { id: "video", icon: Eye, label: "AR Learning", description: "Immersive experience" }
          ].map((step, index) => (
            <div key={step.id} className="flex items-center">
              <Card 
                className={`p-4 cursor-pointer transition-all duration-300 ${
                  currentStep === step.id 
                    ? "bg-primary shadow-ar-glow border-primary" 
                    : "bg-card hover:bg-muted"
                }`}
                onClick={() => setCurrentStep(step.id as any)}
              >
                <div className="flex items-center gap-3">
                  <step.icon className={`w-5 h-5 ${
                    currentStep === step.id ? "text-primary-foreground" : "text-muted-foreground"
                  }`} />
                  <div>
                    <div className={`text-sm font-medium ${
                      currentStep === step.id ? "text-primary-foreground" : "text-foreground"
                    }`}>
                      {step.label}
                    </div>
                    <div className={`text-xs ${
                      currentStep === step.id ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}>
                      {step.description}
                    </div>
                  </div>
                </div>
              </Card>
              {index < 4 && (
                <ArrowRight className="w-4 h-4 text-muted-foreground mx-2" />
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {currentStep === "input" && (
            <CodeInputModule 
              onCodeSubmit={handleCodeSubmit}
              isAnalyzing={isAnalyzing}
            />
          )}

          {currentStep === "analysis" && (
            <div className="space-y-6">
              <Card className="bg-card shadow-card-ar border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-foreground">
                    <Brain className="w-6 h-6 text-primary animate-float" />
                    AI Analysis Complete
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Your code has been analyzed using advanced Graph-Based Semantic Similarity algorithms, 
                    converting it to Abstract Syntax Trees and Control Flow Graphs for comprehensive evaluation.
                  </p>
                  <div className="flex gap-4">
                    <Button 
                      variant="ar" 
                      onClick={() => setCurrentStep("solutions")}
                    >
                      View Solutions
                    </Button>
                    <Button 
                      variant="ar-outline" 
                      onClick={() => setCurrentStep("evaluation")}
                    >
                      See Evaluation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === "solutions" && (
            <SolutionComparison
              solutions={mockSolutions}
              originalCode={analyzedCode}
              onViewInAR={handleViewInAR}
              onWatchVideo={handleWatchVideo}
            />
          )}

          {currentStep === "evaluation" && (
            <CodeEvaluation
              overallScore={mockEvaluation.overallScore}
              grade={mockEvaluation.grade}
              metrics={mockEvaluation.metrics}
              feedback={mockEvaluation.feedback}
              graphAnalysis={mockEvaluation.graphAnalysis}
            />
          )}

          {currentStep === "video" && (
            <ARVideoPlayer
              video={mockVideo}
              concept="Array Maximum Finding"
              onEnterAR={handleEnterAR}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
