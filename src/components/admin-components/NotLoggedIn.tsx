import { OctagonX } from "lucide-react";
import React from "react";

const NotLoggedIn = () => {
  return (
    <div className="flex min-h-screen items-center justify-center text-center flex-col">
      <OctagonX className="w-52 h-52 text-red-500 mb-8" />
      <h2 className="text-4xl font-semibold">
        Prosím prihláste sa, aby ste videli obsah stránky!
      </h2>
    </div>
  );
};

export default NotLoggedIn;
