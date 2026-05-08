const STORAGE_KEYS = {
  favorites: "mix-prompt-favs",
  history: "mix-prompt-history-v1",
  presets: "mix-prompt-presets-v1",
  syncKey: "mix-cloud-sync-key-v1",
};

export type CloudWorkspace = {
  favorites?: unknown[];
  promptHistory?: unknown[];
  presets?: unknown[];
  updatedAt?: string | null;
  version?: number;
};

export function getSavedSyncKey() {
  return readString(STORAGE_KEYS.syncKey);
}

export function saveSyncKey(value: string) {
  writeString(STORAGE_KEYS.syncKey, value.trim());
}

export function clearSavedSyncKey() {
  localStorage.removeItem(STORAGE_KEYS.syncKey);
}

export function collectWorkspaceData(): CloudWorkspace {
  return {
    favorites: readArray(STORAGE_KEYS.favorites),
    promptHistory: readArray(STORAGE_KEYS.history),
    presets: readArray(STORAGE_KEYS.presets),
    updatedAt: new Date().toISOString(),
    version: 2,
  };
}

export function applyWorkspaceData(workspace: CloudWorkspace) {
  writeArray(STORAGE_KEYS.favorites, workspace.favorites);
  writeArray(
    STORAGE_KEYS.history,
    workspace.promptHistory || migrateLegacyClipboard(workspace)
  );
  writeArray(STORAGE_KEYS.presets, workspace.presets);
  window.dispatchEvent(new Event("mix-cloud-sync-restored"));
}

function migrateLegacyClipboard(workspace: CloudWorkspace) {
  const legacy = (workspace as { clipboardHistory?: unknown[] }).clipboardHistory;
  if (!Array.isArray(legacy)) return [];

  return legacy.slice(0, 15).map((item, index) => {
    const entry = item as { id?: string; label?: string; text?: string; copiedAt?: string };
    return {
      id: entry.id || `legacy-${Date.now()}-${index}`,
      label: entry.label || "Imported",
      text: entry.text || "",
      ts: entry.copiedAt ? new Date(entry.copiedAt).getTime() : Date.now(),
    };
  }).filter((item) => item.text);
}

function readArray(key: string) {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeArray(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(Array.isArray(value) ? value : []));
  } catch {
    // Ignore restricted storage modes.
  }
}

function readString(key: string) {
  try {
    return localStorage.getItem(key) || "";
  } catch {
    return "";
  }
}

function writeString(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore restricted storage modes.
  }
}
