import { useRouter } from "next/navigation";
import { List } from "lucide-react";
import { Button } from "../ui/button";

export function Filtering() {
  const router = useRouter();

  const handleSort = (order: string) => {
    router.push(`?order=${order}`);
  };

  return (
    <div className="flex gap-2 items-center pt-4 pb-4">
      <div className="flex gap-1">
        <List />
        <h1>Zoradiť:</h1>
      </div>
      <Button onClick={() => handleSort("asc")}>Najlacnejšie</Button>
      <Button onClick={() => handleSort("desc")}>Najdrahšie</Button>
    </div>
  );
}
