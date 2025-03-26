import React from "react";
import SearchInput from "./FilterComponents/SearchInput";
import LocationFilter from "./FilterComponents/LocationFilter";
import DrawerFile from "./FilterComponents/DrawerFile";

interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  isDrawerOpen: boolean;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSalary: React.Dispatch<React.SetStateAction<string>>;
  setJobMode: React.Dispatch<React.SetStateAction<number | string>>;
  location: string;
}
const Filters = ({
  search,
  setSearch,
  setLocation,
  isDrawerOpen,
  setIsDrawerOpen,
  setSalary,
  setJobMode,
  location,
}: Props) => {
  return (
    <div className="bg-white dark:bg-black/45 p-4 flex justify-between items-center">
      <SearchInput search={search} setSearch={setSearch} />
      <div className="flex gap-4">
        <div className="lg:hidden">
          <DrawerFile
            open={isDrawerOpen}
            setOpen={setIsDrawerOpen}
            setSalary={setSalary}
            setJobMode={setJobMode}
            setLocation={setLocation}
          />
        </div>
        <div className="hidden lg:block">
          <LocationFilter setLocation={setLocation} location={location} />
        </div>
      </div>
    </div>
  );
};

export default Filters;
