import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { IoFilterOutline } from "react-icons/io5";
import SalaryFilter from "./SalaryFilter";
import SiteFilter from "./SiteFilter";
import LocationFilter from "./LocationFilter";
interface props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSalary: React.Dispatch<React.SetStateAction<string>>;
  setJobMode: React.Dispatch<React.SetStateAction<number | string>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  location: string;
}

const DrawerFile = ({
  open,
  setOpen,
  setSalary,
  setJobMode,
  setLocation,
  location,
}: props) => {
  return (
    <Drawer
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          setOpen(v);
        }
      }}
    >
      <DrawerTrigger onClick={() => setOpen(true)} asChild>
        <Button variant={"ghost"}>
          <IoFilterOutline />
          <span className="sr-only">open filter open</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent onClick={() => setOpen(false)}>
        <DrawerHeader>
          <DrawerTitle>Filter options</DrawerTitle>
          <DrawerDescription>
            Filter jobs to get what you want easily.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-7flex flex-col gap-4">
          <LocationFilter setLocation={setLocation} location={location} />
          <SalaryFilter setSalary={setSalary} />
          <SiteFilter setJobMode={setJobMode} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerFile;
