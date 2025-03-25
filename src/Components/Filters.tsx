import React from "react";
import SearchInput from "./FilterComponents/SearchInput";
import LocationFilter from "./FilterComponents/LocationFilter";

interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;

  setLocation: React.Dispatch<React.SetStateAction<string>>;
}
const Filters = ({ search, setSearch, setLocation }: Props) => {
  return (
    <div className="bg-white dark:bg-black/45 p-4 flex justify-between items-center">
      <SearchInput search={search} setSearch={setSearch} />
      <div>
        <LocationFilter setLocation={setLocation} />
      </div>
    </div>
  );
};

export default Filters;
