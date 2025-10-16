// // components/CKEditorClient.tsx
// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// interface CKEditorClientProps {
//   data: string;
//   onChange: (data: string) => void;
// }

// export default function CKEditorClient({ data, onChange }: CKEditorClientProps) {
//   // Optionally you can delay until mounted
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   if (!isMounted) {
//     return <div>Loading editor...</div>;
//   }

//   return (
//     <CKEditor
//       editor={ClassicEditor as any}
//       data={data}
//       config={{
//     licenseKey: "GPL",
//     // other config options...
//   }}
//       onReady={(editor) => {
//         console.log("Editor is ready to use!", editor);
//     }}
//       onChange={(_event, editor) => {
//         const html = editor.getData();
//         onChange(html);
//       }}
//       onBlur={(_event, editor) => {
//         // optional
//       }}
//       onFocus={(_event, editor) => {
//         // optional
//       }}
//     />
//   );
// }

// components/CKEditorClient.tsx
"use client";

import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface CKEditorClientProps {
  fetchContent: () => Promise<string>;  // function to fetch HTML content
  onChange: (data: string) => void;
}

export default function CKEditorClient({ fetchContent, onChange }: CKEditorClientProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [initialData, setInitialData] = useState<string | null>(null);

  // mark that component is mounted (to avoid SSR/hydration mismatch)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // fetch the content once
  useEffect(() => {
    fetchContent()
      .then((html) => {
        setInitialData(html);
      })
      .catch((err) => {
        console.error("Error fetching content:", err);
        // you could fallback to empty or show error
        setInitialData("");  
      });
  }, [fetchContent]);

  // while not mounted or data not yet loaded, show placeholder
  if (!isMounted || initialData === null) {
    return <div>Loading editor…</div>;
  }

  return (
    <CKEditor
      editor={ClassicEditor as any}
      data={initialData}
      config={{
        licenseKey: "GPL",
        // other config, licenseKey if needed, toolbar etc.
      }}
      onChange={(_event, editor) => {
        const html = editor.getData();
        onChange(html);
      }}
    />
  );
}

