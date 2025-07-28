import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  Zap, 
  Target, 
  TrendingUp, 
  Eye, 
  Play,
  ChevronRight,
  Lightbulb
} from "lucide-react";

interface Solution {
  type: "brute-force" | "better" | "optimal";
  title: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  code: string;
  efficiency: number;
  explanation: string;
  visualDemo?: string;
}

interface SolutionComparisonProps {
  solutions: Solution[];
  originalCode: string;
  onViewInAR: (solution: Solution) => void;
  onWatchVideo: (solution: Solution) => void;
}

export const SolutionComparison = ({ 
  solutions, 
  originalCode, 
  onViewInAR, 
  onWatchVideo 
}: SolutionComparisonProps) => {
  const getSolutionIcon = (type: string) => {
    switch (type) {
      case "brute-force":
        return <Clock className="w-5 h-5 text-destructive" />;
      case "better":
        return <TrendingUp className="w-5 h-5 text-ar-orange" />;
      case "optimal":
        return <Target className="w-5 h-5 text-accent" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  const getSolutionBadgeVariant = (type: string) => {
    switch (type) {
      case "brute-force":
        return "destructive";
      case "better":
        return "secondary";
      case "optimal":
        return "default";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card shadow-card-ar border-border/50">
        <CardHeader className="border-b border-border/50">
          <CardTitle className="flex items-center gap-3 text-foreground">
            <Lightbulb className="w-6 h-6 text-primary animate-float" />
            Multi-Solution Analysis
            <Badge variant="outline" className="ml-auto text-accent border-accent/30">
              AR-Ready
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-sm text-muted-foreground mb-4">
            Your code has been analyzed and compared against multiple algorithmic approaches. 
            Each solution is optimized for different scenarios and learning objectives.
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {solutions.map((solution, index) => (
          <Card key={index} className="bg-card shadow-card-ar border-border/50 hover:shadow-ar-glow transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getSolutionIcon(solution.type)}
                  <CardTitle className="text-lg capitalize">
                    {solution.title}
                  </CardTitle>
                </div>
                <Badge variant={getSolutionBadgeVariant(solution.type)} className="text-xs">
                  {solution.type.replace("-", " ")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Efficiency Meter */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Efficiency</span>
                  <span className="font-medium">{solution.efficiency}%</span>
                </div>
                <Progress value={solution.efficiency} className="h-2" />
              </div>

              {/* Complexity Analysis */}
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                      {solution.timeComplexity}
                    </code>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-muted-foreground">Space:</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                      {solution.spaceComplexity}
                    </code>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground">
                {solution.description}
              </p>

              {/* Code Preview */}
              <div className="bg-gradient-code p-3 rounded border border-border/30">
                <pre className="text-xs text-foreground/80 font-mono overflow-x-auto">
                  {solution.code.substring(0, 120)}...
                </pre>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <Button
                  onClick={() => onViewInAR(solution)}
                  variant="ar-secondary"
                  size="sm"
                  className="w-full justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View in AR
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => onWatchVideo(solution)}
                  variant="ar-outline"
                  size="sm"
                  className="w-full justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Watch Explanation
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};