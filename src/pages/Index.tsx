import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CodeInputModule } from "@/components/CodeInputModule";
import { SolutionComparison } from "@/components/SolutionComparison";
import { CodeEvaluation } from "@/components/CodeEvaluation";
import { ARVideoPlayer } from "@/components/ARVideoPlayer";
import { analyzeCode, evaluateCode, fetchVideo } from "@/lib/api";
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

const Index = () => {
  const [currentStep, setCurrentStep] = useState<
    "input" | "analysis" | "solutions" | "evaluation" | "video"
  >("input");

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedCode, setAnalyzedCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const [solutions, setSolutions] = useState<any[]>([]);
  const [evaluation, setEvaluation] = useState<any | null>(null);
  const [video, setVideo] = useState<any | null>(null);

  const { toast } = useToast();

  /* ---------- BACKEND CONNECTED PIPELINE ---------- */
  const handleCodeSubmit = async (code: string, language: string) => {
    try {
      setIsAnalyzing(true);
      setAnalyzedCode(code);
      setSelectedLanguage(language);

      // 1️⃣ Analyze code
      const analysisRes = await analyzeCode(code, language);
      setSolutions(analysisRes.solutions);

      // 2️⃣ Evaluate code
      const evaluationRes = await evaluateCode(code, language);
      setEvaluation(evaluationRes);

      // 3️⃣ Fetch learning video
      const videoRes = await fetchVideo(language, "algorithm");
      setVideo(videoRes);

      setCurrentStep("analysis");

      toast({
        title: "Analysis Complete",
        description: "Code analyzed, evaluated, and learning content generated.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Backend Error",
        description: "Failed to process code. Check backend server.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleViewInAR = () => {
    toast({
      title: "AR Mode Activated",
      description: "Solution ready for AR visualization.",
    });
  };

  const handleWatchVideo = () => {
    setCurrentStep("video");
  };

  const handleEnterAR = () => {
    toast({
      title: "AR Environment Ready",
      description: "Launching immersive AR learning experience.",
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
              <Badge
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground"
              >
                AR-Enhanced Learning
              </Badge>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Learn<span className="text-accent-glow">Flow</span> AR
            </h1>

            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl">
              Augmented Reality based code evaluation, explanation, and immersive learning platform.
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
              {index < 4 && (
                <ArrowRight className="mx-2 w-4 h-4 text-muted-foreground" />
              )}
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
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep("evaluation")}
                >
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

          {currentStep === "evaluation" && evaluation && (
            <CodeEvaluation
              overallScore={evaluation.overallScore}
              grade={evaluation.grade}
              metrics={evaluation.metrics}
              feedback={evaluation.feedback}
              graphAnalysis={evaluation.graphAnalysis}
            />
          )}

          {currentStep === "video" && video && (
            <ARVideoPlayer
              video={video}
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
