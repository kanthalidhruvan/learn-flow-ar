import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CodeInputModule } from "@/components/CodeInputModule";
import { SolutionComparison } from "@/components/SolutionComparison";
import { CodeEvaluation } from "@/components/CodeEvaluation";
import { ARVideoPlayer } from "@/components/ARVideoPlayer";
import { ARScene } from "@/components/ARScene";
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
  // ✅ FIXED HERE
  const [currentStep, setCurrentStep] = useState<
    "input" | "analysis" | "solutions" | "evaluation" | "video" | "ar"
  >("input");

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedCode, setAnalyzedCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const [solutions, setSolutions] = useState<any[]>([]);
  const [evaluation, setEvaluation] = useState<any | null>(null);
  const [video, setVideo] = useState<any | null>(null);
  const [arPayload, setArPayload] = useState<any | null>(null);

  const { toast } = useToast();

  /* ------------------- FULL BACKEND PIPELINE ------------------- */
  const handleCodeSubmit = async (code: string, language: string) => {
    try {
      setIsAnalyzing(true);
      setAnalyzedCode(code);
      setSelectedLanguage(language);

      const analysisRes = await analyzeCode(code, language);

      setSolutions(analysisRes.solutions || []);
      setArPayload(analysisRes.arPayload || null);

      const evaluationRes = await evaluateCode(code, language);
      setEvaluation(evaluationRes || null);

      const detectedProblem = analysisRes.problemDetected || "unknown";
      const videoRes = await fetchVideo(language, detectedProblem);
      setVideo(videoRes || null);

      setCurrentStep("analysis");

      toast({
        title: "Analysis Complete",
        description: "Code analyzed, evaluation generated, AR payload ready.",
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

  /* ------------------- NAVIGATION ------------------- */

  const handleViewInAR = () => {
    if (!arPayload) {
      toast({
        title: "AR Not Available",
        description: "AR payload not generated for this problem.",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep("ar");
  };

  const handleWatchVideo = () => setCurrentStep("video");

  const handleEnterAR = () => {
    if (arPayload) setCurrentStep("ar");
  };

  return (
    <div className="min-h-screen bg-background">
    {/* // <div className="min-h-screen bg-white dark:bg-background"> */}
      {/* HERO */}
      <div className="relative overflow-hidden bg-gradient-ar-primary">
        <div className="relative container mx-auto px-6 py-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-8 h-8 text-primary-foreground animate-float" />
              <Badge className="border-primary-foreground/30 text-primary-foreground">
                AR-Enhanced Learning
              </Badge>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Learn<span className="text-accent-glow">Flow</span> AR
            </h1>

            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl">
              Augmented Reality based code evaluation and learning platform.
            </p>

            <Button onClick={() => setCurrentStep("input")}>
              Start AR Learning
            </Button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-6 py-8">
      {/* <div className="container mx-auto px-6 py-8 bg-white dark:bg-gray-950 min-h-screen"> */}
        {currentStep === "input" && (
          <CodeInputModule
            onCodeSubmit={handleCodeSubmit}
            isAnalyzing={isAnalyzing}
          />
        )}

        {currentStep === "video" && video && (
          <ARVideoPlayer
            video={video}
            concept={video.title}
            onEnterAR={handleEnterAR}
            arPayload={arPayload}
          />
        )}

        {currentStep === "ar" &&
          (arPayload ? (
            <ARScene arPayload={arPayload} />
          ) : (
            <Card className="p-6 text-center">
              <CardTitle>AR Not Available</CardTitle>
              <p>No AR payload generated.</p>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Index;