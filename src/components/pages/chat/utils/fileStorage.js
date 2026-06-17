// ── IndexedDB file storage utility ──
// Files are stored here instead of localStorage to avoid the 5MB limit

const DB_NAME    = "vmpFilesDB";
const DB_VERSION = 1;
const STORE_NAME = "files";

// ── open (or create) the database ──
function openDB() {
return new Promise((resolve, reject) => {
const request = indexedDB.open(DB_NAME, DB_VERSION);

request.onupgradeneeded = (e) => {
    const db = e.target.result;
    if (!db.objectStoreNames.contains(STORE_NAME)) {
    db.createObjectStore(STORE_NAME, { keyPath: "id" });
    }
};

request.onsuccess  = (e) => resolve(e.target.result);
request.onerror    = (e) => reject(e.target.error);
});
}

// ── save a file to IndexedDB ──
export async function saveFile(id, base64, fileName, fileType) {
const db = await openDB();
return new Promise((resolve, reject) => {
const tx      = db.transaction(STORE_NAME, "readwrite");
const store   = tx.objectStore(STORE_NAME);
const request = store.put({ id, base64, fileName, fileType });
request.onsuccess = () => resolve();
request.onerror   = (e) => reject(e.target.error);
});
}

// ── get a file from IndexedDB ──
export async function getFile(id) {
const db = await openDB();
return new Promise((resolve, reject) => {
const tx      = db.transaction(STORE_NAME, "readonly");
const store   = tx.objectStore(STORE_NAME);
const request = store.get(id);
request.onsuccess = (e) => resolve(e.target.result || null);
request.onerror   = (e) => reject(e.target.error);
});
}

// ── delete a file from IndexedDB ──
export async function deleteFile(id) {
const db = await openDB();
return new Promise((resolve, reject) => {
const tx      = db.transaction(STORE_NAME, "readwrite");
const store   = tx.objectStore(STORE_NAME);
const request = store.delete(id);
request.onsuccess = () => resolve();
request.onerror   = (e) => reject(e.target.error);
});
}

// ── clear ALL files (call on logout/deactivate) ──
export async function clearAllFiles() {
const db = await openDB();
return new Promise((resolve, reject) => {
const tx      = db.transaction(STORE_NAME, "readwrite");
const store   = tx.objectStore(STORE_NAME);
const request = store.clear();
request.onsuccess = () => resolve();
request.onerror   = (e) => reject(e.target.error);
});
}

// ── convert File object to base64 string ──
export function fileToBase64(file) {
return new Promise((resolve, reject) => {
const reader    = new FileReader();
reader.onloadend = () => resolve(reader.result);
reader.onerror   = () => reject(new Error("Failed to read file"));
reader.readAsDataURL(file);
});
}