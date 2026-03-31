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
 const [currentStep, setCurrentStep] = useState<"input" | "analysis" | "solutions" | "evaluation" | "video" | "ar">("input");

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

      // 1️⃣ Analyze Code
      const analysisRes = await analyzeCode(code, language);
      setSolutions(analysisRes.solutions || []);
      setArPayload(analysisRes.arPayload || null);

      // 2️⃣ Evaluate Code
      const evaluationRes = await evaluateCode(code, language);
      setEvaluation(evaluationRes || null);

      // 3️⃣ Fetch Video
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

  /* ------------------- NAVIGATION HANDLERS ------------------- */

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

  /* ------------------- UI ------------------- */

  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO SECTION ── */}
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
              Augmented Reality based code evaluation, explanation,
              and immersive learning platform.
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

      {/* ── STEP NAVIGATION + CONTENT ── */}
      <div className="container mx-auto px-6 py-8">

        {/* Step Navigation Bar */}
        <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
          {[
            { id: "input",      icon: Code2,  label: "Code Input"  },
            { id: "analysis",   icon: Brain,  label: "Analysis"    },
            { id: "solutions",  icon: Target, label: "Solutions"   },
            { id: "evaluation", icon: Zap,    label: "Evaluation"  },
            { id: "video",      icon: Eye,    label: "Video"       },
            { id: "ar",         icon: Eye,    label: "AR View"     },
          ].map((step, index) => (
            <div key={step.id} className="flex items-center">
              <Card
                className={`p-4 cursor-pointer transition-all duration-200 ${
                  currentStep === step.id
                    ? "bg-primary text-primary-foreground shadow-ar-glow"
                    : "bg-card hover:bg-muted"
                }`}
                onClick={() => setCurrentStep(step.id as any)}
              >
                <div className="flex items-center gap-2">
                  <step.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{step.label}</span>
                </div>
              </Card>
              {index < 5 && (
                <ArrowRight className="mx-2 w-4 h-4 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>

        {/* ── MAIN CONTENT AREA ── */}
        <div className="max-w-7xl mx-auto">

          {/* STEP: Code Input */}
          {currentStep === "input" && (
            <CodeInputModule
              onCodeSubmit={handleCodeSubmit}
              isAnalyzing={isAnalyzing}
            />
          )}

          {/* STEP: Analysis */}
          {currentStep === "analysis" && (
            <Card className="bg-card border border-border shadow-card-ar">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="flex items-center gap-3 text-foreground">
                  <Brain className="w-6 h-6 text-primary animate-float" />
                  AI Analysis Complete
                  <Badge
                    variant="outline"
                    className="ml-auto text-primary border-primary/30"
                  >
                    Ready
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-6">
                  Your code has been analyzed. Choose what you want to explore next:
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="ar"
                    onClick={() => setCurrentStep("solutions")}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    View Solutions
                  </Button>
                  <Button
                    variant="ar-secondary"
                    onClick={() => setCurrentStep("evaluation")}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    View Evaluation
                  </Button>
                  <Button
                    variant="ar-outline"
                    onClick={() => setCurrentStep("video")}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Watch Video
                  </Button>
                  <Button
                    variant="ar-outline"
                    onClick={handleViewInAR}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View in AR
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* STEP: Solutions */}
          {currentStep === "solutions" && (
            <SolutionComparison
              solutions={solutions}
              originalCode={analyzedCode}
              onViewInAR={handleViewInAR}
              onWatchVideo={handleWatchVideo}
            />
          )}

          {/* STEP: Evaluation */}
          {currentStep === "evaluation" && evaluation && (
            <CodeEvaluation
              overallScore={evaluation.overallScore}
              grade={evaluation.grade}
              metrics={evaluation.metrics}
              feedback={evaluation.feedback}
              graphAnalysis={evaluation.graphAnalysis}
            />
          )}

          {/* STEP: Evaluation — not yet loaded */}
          {currentStep === "evaluation" && !evaluation && (
            <Card className="p-6 text-center bg-card border border-border">
              <CardTitle className="text-foreground mb-2">
                Evaluation Not Available
              </CardTitle>
              <p className="text-muted-foreground">
                Please submit code first to generate an evaluation.
              </p>
            </Card>
          )}

          {/* STEP: Video */}
          {currentStep === "video" && video && (
            <ARVideoPlayer
              video={video}
              concept={video.title}
              onEnterAR={handleEnterAR}
              arPayload={arPayload}
            />
          )}

          {/* STEP: Video — not yet loaded */}
          {currentStep === "video" && !video && (
            <Card className="p-6 text-center bg-card border border-border">
              <CardTitle className="text-foreground mb-2">
                Video Not Available
              </CardTitle>
              <p className="text-muted-foreground">
                Please submit code first to load the video explanation.
              </p>
            </Card>
          )}

          {/* STEP: AR View */}
          {currentStep === "ar" && (
            arPayload ? (
              <ARScene arPayload={arPayload} />
            ) : (
              <Card className="p-6 text-center bg-card border border-border">
                <CardTitle className="text-foreground mb-2">
                  AR Not Available
                </CardTitle>
                <p className="text-muted-foreground">
                  No AR payload generated for this problem. Please submit code first.
                </p>
              </Card>
            )
          )}

        </div>
      </div>
    </div>
  );
};

export default Index;