import { Globe2, Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="text-center mb-12 animate-fade-in">
      <div className="inline-flex items-center justify-center gap-3 mb-4">
        <div className="relative">
          <Globe2 className="w-12 h-12 text-primary animate-float" />
          <Sparkles className="w-5 h-5 text-accent absolute -top-1 -right-1" />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-3">
        <span className="gradient-text">Language</span>{" "}
        <span className="text-foreground">Translator</span>
      </h1>
      
      <p className="text-muted-foreground text-lg max-w-md mx-auto">
        Translate between 30+ languages instantly with text-to-speech support
      </p>
      
      <div className="flex items-center justify-center gap-6 mt-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>Real-time translation</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>Text-to-speech</span>
        </div>
      </div>
    </header>
  );
};
