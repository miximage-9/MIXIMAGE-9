import { useEffect, useState } from "react";
import AppShell from "./components/AppShell.jsx";
import Toast from "./components/Toast.jsx";
import { defaultPrompts } from "./data/defaultPrompts.js";
import useLocalStorage from "./hooks/useLocalStorage.js";
import AITools from "./pages/AITools.jsx";
import PromptLibrary from "./pages/PromptLibrary.jsx";
import Workspace from "./pages/Workspace.jsx";

function App() {
  const [activePage, setActivePage] = useState("prompts");
  const [prompts, setPrompts] = useLocalStorage(
    "mixtoole-prompts-th-v2",
    defaultPrompts
  );
  const [clipboardHistory, setClipboardHistory] = useLocalStorage(
    "mixtoole-clipboard-history-th-v2",
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
