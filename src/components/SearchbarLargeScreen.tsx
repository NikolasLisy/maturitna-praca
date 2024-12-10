"use client";

import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SearchbarLargeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/products?q=${encodedSearchQuery}`);
  };

  return (
    <form onSubmit={onSearch}>
      <div className="flex md:w-[300px] lg:w-[500px]">
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
    </form>
  );
}
