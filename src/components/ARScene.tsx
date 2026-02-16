import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ARSceneProps {
  arPayload: any;
}

export const ARScene = ({ arPayload }: ARSceneProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!arPayload) return null;

  const step = arPayload.animationSteps[currentStep];

  return (
    <Card className="shadow-lg border">
      <CardHeader>
        <CardTitle>AR Preview Environment</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* Scene Info */}
        <div className="text-sm text-muted-foreground">
          Scene: {arPayload.scene}
        </div>

        {/* Node Visualization */}
        <div className="flex gap-4 justify-center">
          {arPayload.nodes.map((node: any, index: number) => {
            const isActive =
              step?.target === node.id;

            return (
              <div
                key={index}
                className={`w-16 h-16 flex items-center justify-center rounded-lg border text-white transition-all duration-500 ${
                  isActive
                    ? "bg-red-500 scale-110"
                    : "bg-blue-500"
                }`}
              >
                {node.id}
              </div>
            );
          })}
        </div>

        {/* Explanation */}
        <div className="p-4 bg-gray-100 rounded">
          {arPayload.explanationOverlay}
        </div>

        {/* Step Controls */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() =>
              setCurrentStep((prev) =>
                prev > 0 ? prev - 1 : prev
              )
            }
          >
            Previous
          </Button>

          <Button
            onClick={() =>
              setCurrentStep((prev) =>
                prev < arPayload.animationSteps.length - 1
                  ? prev + 1
                  : prev
              )
            }
          >
            Next
          </Button>
        </div>

        {/* Unity JSON Display */}
        <div className="mt-6 text-xs bg-black text-green-400 p-4 rounded overflow-auto">
          <pre>{JSON.stringify(arPayload, null, 2)}</pre>
        </div>

      </CardContent>
    </Card>
  );
};
