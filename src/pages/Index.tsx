import { useState } from "react";
import { AppHeader, type TabKey } from "@/components/AppHeader";
import { PromptGenerator } from "@/components/PromptGenerator";
import { UniformsTab } from "@/components/UniformsTab";
import { SpecialTab } from "@/components/SpecialTab";
import { LibraryTab } from "@/components/LibraryTab";
import { FavoritesView } from "@/components/FavoritesView";
import { DocumentPhotosTab } from "@/components/DocumentPhotosTab";
import { ProfessionsTab } from "@/components/ProfessionsTab";
import { HeroSection } from "@/components/HeroSection";
import { HistoryDrawer } from "@/components/HistoryDrawer";
import { CloudSyncModal } from "@/components/CloudSyncModal";
import { AiStudioTab } from "@/components/AiStudioTab";
import { useFavorites } from "@/hooks/useFavorites";

const Index = () => {
  const [tab, setTab] = useState<TabKey>("generator");
  const [search, setSearch] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);
  const [syncOpen, setSyncOpen] = useState(false);
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen">
      <AppHeader
        active={tab}
        onChange={setTab}
        search={search}
        onSearch={setSearch}
        favCount={favorites.length}
        onOpenHistory={() => setHistoryOpen(true)}
        onOpenSync={() => setSyncOpen(true)}
      />

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6">
        {tab === "generator" && <HeroSection />}
        {tab === "generator" && <PromptGenerator />}
        {tab === "ai" && <AiStudioTab />}
        {tab === "documents" && <DocumentPhotosTab search={search} />}
        {tab === "uniforms" && <UniformsTab search={search} />}
        {tab === "professions" && <ProfessionsTab search={search} />}
        {tab === "special" && <SpecialTab search={search} />}
        {tab === "library" && <LibraryTab search={search} />}
        {tab === "favorites" && <FavoritesView />}
      </main>

      <HistoryDrawer open={historyOpen} onClose={() => setHistoryOpen(false)} />
      <CloudSyncModal open={syncOpen} onClose={() => setSyncOpen(false)} />

      <footer className="mt-12 border-t border-border-subtle bg-surface/40 py-6 text-center text-xs text-muted-foreground">
        <p>
          <a href="http://piscopy.shop" target="_blank" rel="noopener noreferrer" className="font-medium text-neon-pink transition hover:text-neon-green">
            🎨 MIX Image
          </a>{" "}
          | บรบือ จ.มหาสารคาม
        </p>
        <p className="mt-1 text-muted-foreground/60">Prompt Library v2.1 — Gemini / DALL·E tuned prompt flow © 2026</p>
      </footer>
    </div>
  );
};

export default Index;
