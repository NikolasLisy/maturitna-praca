"use client";

import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Searchbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/products?q=${encodedSearchQuery}`);
  };

  return (
    <form onSubmit={onSearch}>
      <div className="block md:hidden left-0 right-0 top-[97px] bg-white px-4 border-b border-zinc-200">
        <div className="flex items-center justify-center pb-4">
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full rounded-tr-none rounded-br-none"
            placeholder="Zadajte názov knihy, autora"
          />
          <Button type="submit" className="rounded-tl-none rounded-bl-none">
            <Search size={20} />
          </Button>
        </div>
      </div>
    </form>
  );
}
