import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function Filtering() {
  return (
    <Select>
      <SelectTrigger className="w-60">
        <SelectValue placeholder="Vyberte typ triedenia" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="CenaN">Cena od najnižšej po najvyššiu</SelectItem>
        <SelectItem value="Cenanaj">Cena od najvyššej po najnižšiu</SelectItem>
      </SelectContent>
    </Select>
  );
}
