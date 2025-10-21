"use client"
import { about, getAbout, updateAbout } from "@/data/About";
import dynamic from "next/dynamic";
import { useState } from "react";

// dynamically import so it won’t be server-rendered
const CKEditorClient = dynamic(
    () => import("../../../../admincomponents/CkeEditorComponent"),
    { ssr: false }
);

export default function EditorPage() {
    const [content, setContent] = useState<string>("");
    let title = "";

    async function fetchContentFromServer(): Promise<string> {
        const res = await getAbout();
        title = res.title;
        return res.content;
    }


    const handleSave = async () => {
        // send `content` to server
        await updateAbout({ title, content });
    };

    return (
        <div>
            <h1>About – formatering af ”content”-teksten (fed, linjeskift osv.)</h1>
            <CKEditorClient
                fetchContent={fetchContentFromServer}
                onChange={(html) => setContent(html)}
            />
            <button onClick={handleSave} className="bg-green-600 p-2 cursor-pointer mt-2 rounded-2xl">Save</button>
            <div className="border mt-4 ">
                <h2 className="text-2xl font-bold">Preview</h2>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
}

// "use client";

// import type { about } from "@/data/About";
// import { getAbout, updateAbout } from "@/data/About";
// import dynamic from "next/dynamic";
// import { useCallback, useState } from "react";

// // dynamically import so it won’t be server-rendered
// const CKEditorClient = dynamic(
//   () => import("../../../../admincomponents/CkeEditorComponent"),
//   { ssr: false }
// );

// export default function EditorPage() {
//   const [content, setContent] = useState<string>("");
//   const [title, setTitle] = useState<string>("");
//   const [id, setId] = useState<string | null>(null);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // CKEditorClient will call this to get initial HTML
//   const fetchContentFromServer = useCallback(async (): Promise<string> => {
//     const res: about = await getAbout();
//     setTitle(res.title ?? "");
//     setId(res._id);
//     return res.content ?? "";
//   }, []);

//   const handleSave = useCallback(async () => {
//     if (!id) {
//       setError("Kan ikke gemme: mangler _id fra serveren.");
//       return;
//     }
//     setSaving(true);
//     setError(null);
//     try {
//       await updateAbout(id, {
//         title,
//         // send raw HTML string; don't stringify an object
//         content,
//       });
//     } catch (e: any) {
//       setError(e?.message ?? "Der opstod en fejl ved gemning.");
//     } finally {
//       setSaving(false);
//     }
//   }, [id, title, content]);

//   return (
//     <div className="space-y-4">
//       <h1>About – formatering af ”content”-teksten (fed, linjeskift osv.)</h1>

//       {/* Optional: allow editing the title, since we persist it */}
//       <label className="block">
//         <span className="text-sm font-medium">Title</span>
//         <input
//           className="mt-1 w-full rounded border p-2"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="About title"
//         />
//       </label>

//       <CKEditorClient
//         fetchContent={fetchContentFromServer}
//         onChange={(html: string) => setContent(html)}
//       />

//       <button
//         onClick={handleSave}
//         disabled={saving}
//         className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
//       >
//         {saving ? "Saving..." : "Save"}
//       </button>

//       {error && <p className="text-red-600">{error}</p>}

//       <div>
//         <h2>Preview</h2>
//         <div dangerouslySetInnerHTML={{ __html: content }} />
//       </div>
//     </div>
//   );
// }

