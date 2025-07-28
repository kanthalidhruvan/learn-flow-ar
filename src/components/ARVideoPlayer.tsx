import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  Volume2, 
  Maximize, 
  Eye,
  Youtube,
  ExternalLink,
  VolumeX,
  RotateCcw
} from "lucide-react";

interface VideoExplanation {
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  topics: string[];
}

interface ARVideoPlayerProps {
  video: VideoExplanation;
  concept: string;
  onEnterAR?: () => void;
}

export const ARVideoPlayer = ({ video, concept, onEnterAR }: ARVideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-accent";
      case "intermediate":
        return "bg-ar-orange";
      case "advanced":
        return "bg-destructive";
      default:
        return "bg-primary";
    }
  };

  const youtubeEmbedUrl = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}`;

  return (
    <Card className="bg-card shadow-card-ar border-border/50 overflow-hidden">
      <CardHeader className="border-b border-border/50">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-foreground">
            <Youtube className="w-6 h-6 text-destructive animate-float" />
            AR Video Explanation
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge 
              className={`${getDifficultyColor(video.difficulty)} text-white text-xs`}
            >
              {video.difficulty}
            </Badge>
            <Badge variant="outline" className="text-primary border-primary/30 text-xs">
              {video.duration}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* Video Player Container */}
        <div className="relative aspect-video bg-black">
          <iframe
            src={youtubeEmbedUrl}
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          
          {/* AR Overlay Controls */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              size="sm"
              variant="ar"
              onClick={onEnterAR}
              className="bg-black/50 backdrop-blur-sm hover:bg-black/70"
            >
              <Eye className="w-4 h-4 mr-1" />
              AR View
            </Button>
          </div>
          
          {/* Custom Control Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ar-outline"
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-black/70"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                variant="ar-outline"
                onClick={() => setIsMuted(!isMuted)}
                className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-black/70"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </div>
            
            <Button
              size="sm"
              variant="ar-outline"
              onClick={() => window.open(`https://youtube.com/watch?v=${video.youtubeId}`, '_blank')}
              className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-black/70"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Video Information */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {video.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {video.description}
            </p>
          </div>
          
          {/* Topics Covered */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-foreground">
              Concepts Covered:
            </div>
            <div className="flex flex-wrap gap-2">
              {video.topics.map((topic, index) => (
                <Badge 
                  key={index}
                  variant="outline" 
                  className="text-xs text-muted-foreground border-border/50"
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* AR Integration Actions */}
          <div className="pt-4 border-t border-border/30 space-y-3">
            <div className="text-sm font-medium text-foreground">
              AR Learning Experience:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button 
                variant="ar-secondary" 
                size="sm"
                onClick={onEnterAR}
                className="justify-start"
              >
                <Eye className="w-4 h-4 mr-2" />
                View in AR Space
              </Button>
              <Button 
                variant="ar-outline" 
                size="sm"
                className="justify-start"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Replay with AR Overlay
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground bg-gradient-code p-3 rounded border border-border/30">
              <strong>AR Enhancement:</strong> This video can be overlaid in your AR environment 
              using Unity or ARCore, allowing you to see code visualizations in 3D space while 
              learning about {concept}.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};