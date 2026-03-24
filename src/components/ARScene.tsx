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
  const metadata = arPayload.metadata || {};
  const currentAnimation = animations[currentStep];

  /* ---------------- Auto Play ---------------- */
  useEffect(() => {
    if (!autoPlay) return;
    if (currentStep >= animations.length - 1) return;

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, (currentAnimation?.duration || 1) * 1000);

    return () => clearTimeout(timer);
  }, [autoPlay, currentStep]);

  /* ---------------- Format Problem Name ---------------- */
  const formatProblem = (name: string) => {
    if (!name) return "Algorithm Visualization";
    return name
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  /* ---------------- Node Styling ---------------- */
  const getNodeStyle = (nodeId: number) => {
    let style: any = {
      transition: "all 0.6s ease-in-out",
      transform: "scale(1)",
      opacity: 1,
    };

    if (!currentAnimation) return style;

    if (currentAnimation.type === "highlight" &&
        currentAnimation.node === nodeId) {
      style.backgroundColor =
        currentAnimation.color === "green"
          ? "#16a34a"
          : "#dc2626";
      style.transform = "scale(1.2)";
      style.boxShadow = "0 0 15px rgba(0,0,0,0.4)";
    }

    if (currentAnimation.type === "highlight_range" &&
        nodeId >= currentAnimation.low &&
        nodeId <= currentAnimation.high) {
      style.backgroundColor = "#facc15";
    }

    return style;
  };

  const progress =
    animations.length > 0
      ? ((currentStep + 1) / animations.length) * 100
      : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* LEFT PANEL */}
      <Card className="bg-slate-900 text-white shadow-xl border border-slate-700">
        <CardHeader>
          <CardTitle className="text-blue-400">
            AR Algorithm Visualization
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Progress Bar */}
          <div className="w-full bg-slate-700 h-2 rounded">
            <div
              className="bg-blue-500 h-2 rounded transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Nodes */}
          <div className="flex gap-6 justify-center items-end min-h-[120px]">
            {arPayload.nodes?.map((node: any, index: number) => (
              <div
                key={index}
                style={getNodeStyle(node.id)}
                className="w-16 h-16 flex items-center justify-center rounded-lg font-bold bg-blue-500 text-white shadow-md"
              >
                {node.label}
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() =>
                setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev))
              }
            >
              Previous
            </Button>

            <Button
              variant="outline"
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

      {/* RIGHT PANEL */}
      <Card className="bg-white text-gray-800 shadow-xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-indigo-600">
            Algorithm Details & Explanation
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5 text-sm">

          <div className="grid grid-cols-2 gap-4">

            <div>
              <p className="text-gray-500 text-xs">Detected Problem</p>
              <p className="font-semibold text-base">
                {formatProblem(metadata.problem)}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-xs">Programming Language</p>
              <p className="font-semibold text-base">
                {metadata.language
                  ? metadata.language.toUpperCase()
                  : "User Selected Language"}
              </p>
            </div>

          </div>

          <div>
            <p className="text-gray-500 text-xs">Total Animation Steps</p>
            <p className="font-semibold">
              {metadata.totalSteps || animations.length}
            </p>
          </div>

          <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
            <p className="text-gray-500 text-xs mb-2">
              Current Step Explanation
            </p>
            <p className="font-medium text-gray-800">
              {explanations[currentStep] ||
                "Click 'Auto Play' or 'Next' to begin visualization."}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-xs mb-1">
              Current Animation Type
            </p>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded text-xs">
              {currentAnimation?.type || "Not Started"}
            </span>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};