import React from "react";

export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin mx-auto mb-4" />
        <p className="text-lg font-semibold">LatNight Food...</p>
      </div>
    </div>
  );
}
