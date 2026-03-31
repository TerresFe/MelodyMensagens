// src/components/Reviews.tsx

import { useEffect } from "react";

export default function Reviews() {
  useEffect(() => {
    // carrega o script do widget
    const script = document.createElement("script");
    script.src = "https://apps.elfsight.com/p/platform.js";
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="max-w-5xl mx-auto p-4 space-y-6 text-center">
      <h2 className="text-2xl font-bold">
       
      </h2>

      {/* widget aqui */}
      <div className="elfsight-app-a8826aae-1e4d-4757-8b1a-6c4a07d776ba"data-elfsight-app-lazy></div>
    </section>
  );
}