import { useEffect, useState } from "react";
import AppShell from "./components/AppShell.jsx";
import Toast from "./components/Toast.jsx";
import { defaultPrompts } from "./data/defaultPrompts.js";
import useLocalStorage from "./hooks/useLocalStorage.js";
import AITools from "./pages/AITools.jsx";
import PromptLibrary from "./pages/PromptLibrary.jsx";
import Workspace from "./pages/Workspace.jsx";

const STORAGE_KEYS = {
  clipboardHistory: "mixtoole-clipboard-history-th-v2",
  prompts: "mixtoole-prompts-th-v2",
  youtubePreset: "mixtoole-youtube-description-preset-v1",
};

function App() {
  const [activePage, setActivePage] = useState("prompts");
  const [prompts, setPrompts] = useLocalStorage(
    STORAGE_KEYS.prompts,
    defaultPrompts
  );
  const [clipboardHistory, setClipboardHistory] = useLocalStorage(
    STORAGE_KEYS.clipboardHistory,
    []
  );
  const [toast, setToast] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  useEffect(() => {
    if (!toast) return undefined;

    const timeoutId = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  async function copyToClipboard(text, label = "รายการ", key = text) {
    if (!text?.trim()) return;

    const copied = await writeTextToClipboard(text);
    if (!copied) {
      setToast({
        id: createId(),
        message: "คัดลอกไม่สำเร็จ",
        detail: "เบราว์เซอร์ไม่อนุญาตให้เข้าคลิปบอร์ด",
      });
      return;
    }

    setCopiedKey(key);
    setClipboardHistory((items) => {
      const nextItem = {
        id: createId(),
        label,
        text,
        copiedAt: new Date().toISOString(),
      };

      return [
        nextItem,
        ...items.filter((item) => item.text !== text),
      ].slice(0, 20);
    });
    setToast({ id: createId(), message: "คัดลอกแล้ว", detail: label });

    window.setTimeout(() => setCopiedKey(null), 1200);
  }

  function saveToPromptLibrary({
    imageDataUrl = "",
    previewStyle = "violet-fog",
    tags = ["เอไอ"],
    text,
    title,
  }) {
    if (!text?.trim()) return;

    setPrompts((items) => [
      {
        id: createId(),
        imageDataUrl,
        title: title?.trim() || "พรอมป์จากเครื่องมือเอไอ",
        text: text.trim(),
        tags,
        previewStyle,
        updatedAt: new Date().toISOString(),
      },
      ...items,
    ]);
    setToast({
      id: createId(),
      message: "บันทึกแล้ว",
      detail: "เพิ่มเข้าคลังพรอมป์",
    });
  }

  async function saveCloudSync(syncKey) {
    const payload = {
      clipboardHistory,
      prompts,
      youtubePreset: readLocalStorageValue(STORAGE_KEYS.youtubePreset, null),
    };

    const response = await fetch("/api/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Sync-Key": syncKey,
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "บันทึกขึ้นคลาวด์ไม่สำเร็จ");
    }

    setToast({
      id: createId(),
      message: "ซิงก์แล้ว",
      detail: "บันทึกข้อมูลขึ้นคลาวด์",
    });

    return data;
  }

  async function loadCloudSync(syncKey) {
    const response = await fetch("/api/sync", {
      headers: {
        "X-Sync-Key": syncKey,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "โหลดข้อมูลจากคลาวด์ไม่สำเร็จ");
    }

    const workspace = data.data || {};
    setPrompts(
      Array.isArray(workspace.prompts) && workspace.prompts.length
        ? workspace.prompts
        : defaultPrompts
    );
    setClipboardHistory(
      Array.isArray(workspace.clipboardHistory)
        ? workspace.clipboardHistory.slice(0, 20)
        : []
    );
    writeLocalStorageValue(
      STORAGE_KEYS.youtubePreset,
      workspace.youtubePreset || null
    );
    window.dispatchEvent(new Event("mixtoole-sync-restored"));
    setToast({
      id: createId(),
      message: "โหลดแล้ว",
      detail: "ข้อมูลจากคลาวด์พร้อมใช้",
    });

    return workspace;
  }

  function renderPage() {
    if (activePage === "tools") {
      return (
        <AITools
          onCopy={copyToClipboard}
          onSavePrompt={saveToPromptLibrary}
        />
      );
    }

    if (activePage === "workspace") {
      return (
        <Workspace
          clipboardHistory={clipboardHistory}
          prompts={prompts}
          onCloudLoad={loadCloudSync}
          onCloudSave={saveCloudSync}
          onCopy={copyToClipboard}
        />
      );
    }

    return (
      <PromptLibrary
        copiedKey={copiedKey}
        onCopy={copyToClipboard}
        prompts={prompts}
        setPrompts={setPrompts}
      />
    );
  }

  return (
    <>
      <AppShell
        activePage={activePage}
        clipboardCount={clipboardHistory.length}
        onNavigate={setActivePage}
        promptCount={prompts.length}
      >
        {renderPage()}
      </AppShell>
      <Toast toast={toast} />
    </>
  );
}

function createId() {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

function readLocalStorageValue(key, fallback) {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocalStorageValue(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage failures in restricted browser modes.
  }
}

async function writeTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Some in-app browsers expose the Clipboard API but block writes.
    }
  }

  return writeTextWithTextarea(text);
}

function writeTextWithTextarea(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  } finally {
    document.body.removeChild(textarea);
  }

  return copied;
}

export default App;
