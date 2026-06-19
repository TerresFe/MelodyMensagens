// src/components/Reviews.tsx

import { useEffect } from "react";

export default function Reviews() {
  useEffect(() => {
    if (document.querySelector('script[src="https://apps.elfsight.com/p/platform.js"]')) return;
    const script = document.createElement("script");
    script.src = "https://apps.elfsight.com/p/platform.js";
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 text-center">
      <div className="elfsight-app-a8826aae-1e4d-4757-8b1a-6c4a07d776ba" data-elfsight-app-lazy />
    </div>
  );
}
