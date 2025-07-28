import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Scan, Upload, FileText } from "lucide-react";

interface CodeInputModuleProps {
  onCodeSubmit: (code: string, language: string) => void;
  isAnalyzing: boolean;
}

export const CodeInputModule = ({ onCodeSubmit, isAnalyzing }: CodeInputModuleProps) => {
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  const languages = [
    { id: "javascript", name: "JavaScript", color: "bg-ar-orange" },
    { id: "python", name: "Python", color: "bg-primary" },
    { id: "java", name: "Java", color: "bg-destructive" },
    { id: "cpp", name: "C++", color: "bg-ar-cyan" },
    { id: "csharp", name: "C#", color: "bg-ar-purple" }
  ];

  const handleSubmit = () => {
    if (code.trim()) {
      onCodeSubmit(code, selectedLanguage);
    }
  };

  const sampleCodes = {
    javascript: `// Sample: Find maximum in array
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}`,
    python: `# Sample: Binary search implementation
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`
  };

  return (
    <Card className="bg-card shadow-card-ar border-border/50 backdrop-blur-sm">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="flex items-center gap-3 text-foreground">
          <Code className="w-6 h-6 text-primary animate-float" />
          Code Input & Analysis Module
          <Badge variant="outline" className="ml-auto text-primary border-primary/30">
            AR-Enhanced
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Language Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground/80">
            Programming Language
          </label>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <Badge
                key={lang.id}
                variant={selectedLanguage === lang.id ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-300 hover:shadow-ar-glow ${
                  selectedLanguage === lang.id ? "shadow-ar-glow" : ""
                }`}
                onClick={() => setSelectedLanguage(lang.id)}
              >
                {lang.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Code Input Area */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground/80">
            Enter Your Code or Technical Text
          </label>
          <div className="relative">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here or try one of the sample codes..."
              className="min-h-[300px] bg-gradient-code border-border/50 text-foreground font-mono text-sm resize-none focus:shadow-ar-glow transition-all duration-300"
            />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-primary/10 flex items-center justify-center rounded-md">
                <div className="flex items-center gap-2 text-primary">
                  <Scan className="w-5 h-5 animate-spin" />
                  <span className="text-sm font-medium">Analyzing Code Structure...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sample Code Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="ar-outline"
            size="sm"
            onClick={() => setCode(sampleCodes.javascript)}
            className="text-xs"
          >
            <FileText className="w-3 h-3 mr-1" />
            Array Max Sample
          </Button>
          <Button
            variant="ar-outline"
            size="sm"
            onClick={() => setCode(sampleCodes.python)}
            className="text-xs"
          >
            <FileText className="w-3 h-3 mr-1" />
            Binary Search Sample
          </Button>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-border/30">
          <Button
            onClick={handleSubmit}
            disabled={!code.trim() || isAnalyzing}
            variant="ar"
            size="ar-large"
            className="w-full animate-ar-glow"
          >
            {isAnalyzing ? (
              <>
                <Scan className="w-5 h-5 animate-spin mr-2" />
                Analyzing in AR Environment...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 mr-2" />
                Start AR Code Analysis
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};