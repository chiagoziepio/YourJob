import React from "react";
import { IoIosSearch } from "react-icons/io";
import debounce from "lodash.debounce";
interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = ({ search, setSearch }: Props) => {
  const debouncedSearch = debounce((value: string) => {
    if (value.trim()) {
      setSearch(value);
    }
  }, 300);
  return (
    <div className="flex md:w-[350px] w-[200px] h-fit  items-center gap-2  p-2 rounded-[30px] bg-gray-200 dark:bg-transparent dark:border-gray-100 border-[1px]">
      <input
        type="text"
        value={search}
        onChange={(e) => {
          if (!e.target.value) {
            setSearch("");
          }
          debouncedSearch(e.target.value);
        }}
        className="h-8 flex-1 outline-none border-none"
        placeholder="Search for jobs"
      />
      <IoIosSearch size={20} />
    </div>
  );
};

export default SearchInput;
