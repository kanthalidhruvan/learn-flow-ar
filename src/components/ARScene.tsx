import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ARSceneProps {
  arPayload: any;
}

export const ARScene = ({ arPayload }: ARSceneProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  if (!arPayload) return null;

  const animations = arPayload.animations || [];
  const explanations = arPayload.explanationOverlay || [];
  const currentAnimation = animations[currentStep];

  // Auto Play
  useEffect(() => {
    if (!autoPlay) return;
    if (currentStep >= animations.length - 1) return;

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, (currentAnimation?.duration || 1) * 1000);

    return () => clearTimeout(timer);
  }, [autoPlay, currentStep]);

  const getNodeStyle = (nodeId: number) => {
    let style: any = {
      transition: "all 0.6s ease-in-out",
      transform: "scale(1)",
      opacity: 1,
      boxShadow: "none"
    };

    if (!currentAnimation) return style;

    // Highlight
    if (currentAnimation.type === "highlight" &&
        currentAnimation.node === nodeId) {
      style.backgroundColor =
        currentAnimation.color === "green" ? "#16a34a" : "#dc2626";
      style.transform = "scale(1.2)";
      style.boxShadow = "0 0 20px rgba(255,0,0,0.7)";
    }

    // Compare
    if (currentAnimation.type === "compare" &&
        (currentAnimation.nodeA === nodeId ||
         currentAnimation.nodeB === nodeId)) {
      style.backgroundColor = "#f97316";
      style.transform = "scale(1.15)";
      style.boxShadow = "0 0 15px orange";
    }

    // Elimination
    if (currentAnimation.type === "eliminate" &&
        nodeId >= currentAnimation.from &&
        nodeId <= currentAnimation.to) {
      style.opacity = 0.2;
      style.transform = "translateY(10px)";
    }

    return style;
  };

  const progress =
    animations.length > 0
      ? ((currentStep + 1) / animations.length) * 100
      : 0;

  return (
    <Card className="shadow-lg border bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <CardHeader>
        <CardTitle>AR Preview Environment</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">

        <div className="text-sm text-gray-400">
          Scene: {arPayload.scene}
        </div>

        <div className="text-center text-sm font-semibold">
          Step {currentStep + 1} / {animations.length}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 h-2 rounded">
          <div
            className="bg-blue-500 h-2 rounded transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Nodes */}
        <div className="flex gap-6 justify-center items-end min-h-[120px]">
          {arPayload.nodes.map((node: any, index: number) => (
            <div
              key={index}
              style={getNodeStyle(node.id)}
              className="w-16 h-16 flex items-center justify-center rounded-lg font-bold shadow-lg bg-blue-500"
            >
              {node.label || node.id}
            </div>
          ))}
        </div>

        {/* Explanation */}
        <div className="p-4 bg-slate-700 rounded text-center font-medium">
          {explanations[currentStep] || "Animation Ready"}
        </div>

        {/* Controls */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() =>
              setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev))
            }
          >
            Previous
          </Button>

          <Button
            onClick={() =>
              setCurrentStep((prev) =>
                prev < animations.length - 1 ? prev + 1 : prev
              )
            }
          >
            Next
          </Button>

          <Button
            onClick={() => {
              setCurrentStep(0);
              setAutoPlay(true);
            }}
          >
            Auto Play
          </Button>
        </div>

      </CardContent>
    </Card>
  );
};