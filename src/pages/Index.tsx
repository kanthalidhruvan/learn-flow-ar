import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CodeInputModule } from "@/components/CodeInputModule";
import { SolutionComparison } from "@/components/SolutionComparison";
import { CodeEvaluation } from "@/components/CodeEvaluation";
import { ARVideoPlayer } from "@/components/ARVideoPlayer";
import { analyzeCode } from "@/lib/api";
import {
  Brain,
  Zap,
  Eye,
  Code2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Target,
} from "lucide-react";

/* ---------- TEMP MOCK DATA (will be replaced later) ---------- */
const mockEvaluation = {
  overallScore: 78,
  grade: "B+",
  metrics: [],
  feedback: {
    strengths: [],
    improvements: [],
    recommendations: [],
  },
  graphAnalysis: {
    astComplexity: 12,
    cfgComplexity: 8,
    semanticSimilarity: 87,
  },
};

const mockVideo = {
  title: "Understanding Algorithm Optimization",
  description: "Step-by-step explanation of brute force to optimal solutions.",
  youtubeId: "lrMPbTGrZM4",
  duration: "8:42",
  difficulty: "beginner" as const,
  topics: ["Algorithms", "Time Complexity", "Optimization"],
};
/* ------------------------------------------------------------- */

const Index = () => {
  const [currentStep, setCurrentStep] = useState<
    "input" | "analysis" | "solutions" | "evaluation" | "video"
  >("input");

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedCode, setAnalyzedCode] = useState("");
  const [solutions, setSolutions] = useState<any[]>([]);
  const { toast } = useToast();

  /* -------- BACKEND CONNECTED FUNCTION -------- */
  const handleCodeSubmit = async (code: string, language: string) => {
    try {
      setIsAnalyzing(true);
      setAnalyzedCode(code);

      const response = await analyzeCode(code, language);

      setSolutions(response.solutions);
      setCurrentStep("analysis");

      toast({
        title: "Analysis Complete",
        description: "Code analyzed using backend AI pipeline.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Backend Error",
        description: "Failed to analyze code. Is backend running?",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleViewInAR = () => {
    toast({
      title: "AR Mode",
      description: "AR visualization hook triggered.",
    });
  };

  const handleWatchVideo = () => {
    setCurrentStep("video");
  };

  const handleEnterAR = () => {
    toast({
      title: "AR Environment Ready",
      description: "Launching AR overlay (WebAR).",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ---------- HERO SECTION ---------- */}
      <div className="relative overflow-hidden bg-gradient-ar-primary">
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
              Augmented Reality based code evaluation and explanation platform.
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

              <Button variant="ar-outline" size="ar-large">
                <BookOpen className="w-5 h-5 mr-2" />
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- STEP NAVIGATION ---------- */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center gap-4 mb-8">
          {[
            { id: "input", icon: Code2, label: "Code Input" },
            { id: "analysis", icon: Brain, label: "Analysis" },
            { id: "solutions", icon: Target, label: "Solutions" },
            { id: "evaluation", icon: Zap, label: "Evaluation" },
            { id: "video", icon: Eye, label: "AR Learning" },
          ].map((step, index) => (
            <div key={step.id} className="flex items-center">
              <Card
                className={`p-4 cursor-pointer ${
                  currentStep === step.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card"
                }`}
                onClick={() => setCurrentStep(step.id as any)}
              >
                <div className="flex items-center gap-2">
                  <step.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{step.label}</span>
                </div>
              </Card>
              {index < 4 && <ArrowRight className="mx-2 w-4 h-4 text-muted-foreground" />}
            </div>
          ))}
        </div>

        {/* ---------- MAIN CONTENT ---------- */}
        <div className="max-w-7xl mx-auto">
          {currentStep === "input" && (
            <CodeInputModule
              onCodeSubmit={handleCodeSubmit}
              isAnalyzing={isAnalyzing}
            />
          )}

          {currentStep === "analysis" && (
            <Card>
              <CardHeader>
                <CardTitle>AI Analysis Complete</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Button onClick={() => setCurrentStep("solutions")}>
                  View Solutions
                </Button>
                <Button variant="outline" onClick={() => setCurrentStep("evaluation")}>
                  View Evaluation
                </Button>
              </CardContent>
            </Card>
          )}

          {currentStep === "solutions" && (
            <SolutionComparison
              solutions={solutions}
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
              concept="Algorithm Optimization"
              onEnterAR={handleEnterAR}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
