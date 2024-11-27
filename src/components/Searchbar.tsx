import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Searchbar() {
  return (
    <div className="block md:hidden left-0 right-0 top-[97px] bg-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 border-b border-zinc-200">
      <div className="flex items-center justify-center pb-4">
        <Input
          className="w-full rounded-tr-none rounded-br-none"
          placeholder="Zadajte názov knihy, autora"
        />
        <Button className="rounded-tl-none rounded-bl-none">
          <Search size={20} />
        </Button>
      </div>
    </div>
  );
}
