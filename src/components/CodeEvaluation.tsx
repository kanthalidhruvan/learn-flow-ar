import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Brain, 
  Star,
  TrendingUp,
  FileText,
  Lightbulb,
  Target
} from "lucide-react";

interface EvaluationMetric {
  name: string;
  score: number;
  maxScore: number;
  description: string;
  suggestions: string[];
}

interface CodeEvaluationProps {
  overallScore: number;
  grade: string;
  metrics: EvaluationMetric[];
  feedback: {
    strengths: string[];
    improvements: string[];
    recommendations: string[];
  };
  graphAnalysis: {
    astComplexity: number;
    cfgComplexity: number;
    semanticSimilarity: number;
  };
}

export const CodeEvaluation = ({ 
  overallScore, 
  grade, 
  metrics, 
  feedback,
  graphAnalysis 
}: CodeEvaluationProps) => {
  const getGradeColor = (grade: string) => {
    switch (grade.toUpperCase()) {
      case "A+":
      case "A":
        return "text-accent";
      case "A-":
      case "B+":
      case "B":
        return "text-primary";
      case "B-":
      case "C+":
      case "C":
        return "text-ar-orange";
      default:
        return "text-destructive";
    }
  };

  const getScoreIcon = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return <CheckCircle className="w-4 h-4 text-accent" />;
    if (percentage >= 60) return <AlertCircle className="w-4 h-4 text-ar-orange" />;
    return <XCircle className="w-4 h-4 text-destructive" />;
  };

  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <Card className="bg-card shadow-card-ar border-border/50">
        <CardHeader className="border-b border-border/50">
          <CardTitle className="flex items-center gap-3 text-foreground">
            <Brain className="w-6 h-6 text-primary animate-float" />
            AI-Powered Code Evaluation
            <Badge variant="outline" className="ml-auto text-primary border-primary/30">
              Graph-Based Analysis
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4">
              <div className="text-6xl font-bold animate-ar-glow">
                <span className={getGradeColor(grade)}>{grade}</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-semibold text-foreground">
                  {overallScore}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Overall Score
                </div>
              </div>
            </div>
            <Progress value={overallScore} className="h-3 bg-muted" />
          </div>
        </CardContent>
      </Card>

      {/* Graph Analysis */}
      <Card className="bg-card shadow-card-ar border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Target className="w-5 h-5 text-ar-cyan" />
            Semantic Graph Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-code rounded-lg border border-border/30">
              <div className="text-lg font-semibold text-foreground">
                {graphAnalysis.astComplexity}
              </div>
              <div className="text-xs text-muted-foreground">AST Complexity</div>
            </div>
            <div className="text-center p-4 bg-gradient-code rounded-lg border border-border/30">
              <div className="text-lg font-semibold text-foreground">
                {graphAnalysis.cfgComplexity}
              </div>
              <div className="text-xs text-muted-foreground">CFG Complexity</div>
            </div>
            <div className="text-center p-4 bg-gradient-code rounded-lg border border-border/30">
              <div className="text-lg font-semibold text-primary">
                {graphAnalysis.semanticSimilarity}%
              </div>
              <div className="text-xs text-muted-foreground">Semantic Match</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <Card className="bg-card shadow-card-ar border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Star className="w-5 h-5 text-ar-orange" />
            Evaluation Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getScoreIcon(metric.score, metric.maxScore)}
                  <span className="font-medium text-foreground">{metric.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {metric.score}/{metric.maxScore}
                </span>
              </div>
              <Progress value={(metric.score / metric.maxScore) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Feedback Sections */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {/* Strengths */}
        <Card className="bg-card shadow-card-ar border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-accent text-sm">
              <CheckCircle className="w-4 h-4" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {feedback.strengths.map((strength, index) => (
              <div key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                <div className="w-1 h-1 bg-accent rounded-full mt-2 flex-shrink-0" />
                {strength}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Areas for Improvement */}
        <Card className="bg-card shadow-card-ar border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-ar-orange text-sm">
              <TrendingUp className="w-4 h-4" />
              Improvements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {feedback.improvements.map((improvement, index) => (
              <div key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                <div className="w-1 h-1 bg-ar-orange rounded-full mt-2 flex-shrink-0" />
                {improvement}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="bg-card shadow-card-ar border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-primary text-sm">
              <Lightbulb className="w-4 h-4" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {feedback.recommendations.map((recommendation, index) => (
              <div key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                {recommendation}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Action Button */}
      <Card className="bg-gradient-ar-secondary border-border/50">
        <CardContent className="p-6 text-center">
          <Button variant="ar" size="ar-large" className="w-full md:w-auto">
            <FileText className="w-5 h-5 mr-2" />
            Generate Detailed Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};