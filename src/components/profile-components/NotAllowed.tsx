import { OctagonX } from "lucide-react";
import React from "react";

const NotAllowed = () => {
  return (
    <div className="flex min-h-screen items-center justify-center text-center flex-col">
      <OctagonX className="w-52 h-52 text-red-500 mb-8" />
      <h2 className="text-4xl font-semibold">Nie ste oprávnený</h2>
      <p className="text-2xl items-center">
        Nemáte dostatočné práva aby ste videli obsah tejto stránky.
      </p>
      <p className="text-l text-slate-500">
        {`(Ak je toto chyba kontaktuje majiteľa stránky)`}
      </p>
    </div>
  );
};

export default NotAllowed;
