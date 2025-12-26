import { languages } from "@/data/languages";
import { cn } from "@/lib/utils";

export const LanguageGrid = () => {
  return (
    <div className="mt-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <h2 className="text-center text-lg font-semibold text-muted-foreground mb-6">
        Supported Languages
      </h2>
      
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        {languages.map((lang, index) => (
          <div
            key={lang.code}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-full",
              "bg-secondary/30 hover:bg-secondary/60 transition-all duration-200",
              "text-sm text-muted-foreground hover:text-foreground",
              "cursor-default select-none"
            )}
            style={{ animationDelay: `${index * 0.02}s` }}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
