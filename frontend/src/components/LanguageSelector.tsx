"use client";

import { useState, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import { languages, type Language } from "@/data/languages";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  value: string;
  onChange: (code: string) => void;
  label: string;
}

export const LanguageSelector = ({ value, onChange, label }: LanguageSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedLanguage = useMemo(() =>
    languages.find(lang => lang.code === value),
    [value]
  );

  const filteredLanguages = useMemo(() =>
    languages.filter(lang =>
      lang.name.toLowerCase().includes(search.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  const handleSelect = (lang: Language) => {
    onChange(lang.code);
    setOpen(false);
    setSearch("");
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-secondary/50 hover:bg-secondary/80 border border-border/50 transition-all duration-200 group">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedLanguage?.flag}</span>
              <div className="text-left">
                <p className="font-medium text-foreground">{selectedLanguage?.name}</p>
                <p className="text-xs text-muted-foreground">{selectedLanguage?.nativeName}</p>
              </div>
            </div>
            <ChevronDown className={cn(
              "w-5 h-5 text-muted-foreground transition-transform duration-200",
              open && "rotate-180"
            )} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0 glass-card border-border/50" align="start">
          <div className="p-3 border-b border-border/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search languages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-secondary/50 border-0 focus-visible:ring-1"
              />
            </div>
          </div>
          <div className="max-h-[300px] overflow-y-auto p-2">
            {filteredLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150",
                  lang.code === value
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-secondary/80 text-foreground"
                )}
              >
                <span className="text-xl">{lang.flag}</span>
                <div className="text-left">
                  <p className="font-medium text-sm">{lang.name}</p>
                  <p className="text-xs text-muted-foreground">{lang.nativeName}</p>
                </div>
              </button>
            ))}
            {filteredLanguages.length === 0 && (
              <p className="text-center text-muted-foreground py-4 text-sm">No languages found</p>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
