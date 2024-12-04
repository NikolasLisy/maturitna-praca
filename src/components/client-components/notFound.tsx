import { SearchX } from "lucide-react";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex pt-40 md:pt-56 items-center justify-center text-center flex-col">
      <SearchX className="w-52 h-52 text-red-500 mb-8" />
      <h2 className="text-4xl font-semibold">
        Neboli najdené žiadne výsledky.
      </h2>
      <p className="text-2xl items-center">
        Produkt podľa zadaného názvu neexistuje
      </p>
    </div>
  );
};

export default NotFound;
