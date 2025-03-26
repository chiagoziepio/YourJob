import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { CiLocationOn } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import { useLazyGetJobLocationQuery } from "@/lib/Redux/Features/AppSlice";

interface props {
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  location: string;
}

const LocationFilter = ({ setLocation, location }: props) => {
  const [page, setPage] = useState(0);
  const [alllocations, setAllLocation] = useState<string[]>([]);
  const [getLocation, { data, isLoading, isFetching }] =
    useLazyGetJobLocationQuery();

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    getLocation({ page });
  }, [page, getLocation]);

  // Update locations when new data arrives
  useEffect(() => {
    if (data?.data) {
      setAllLocation((prev) => {
        // Prevent duplicate locations
        const uniqueNewLocations = data.data.filter(
          (location) => !prev.includes(location)
        );
        return [...prev, ...uniqueNewLocations];
      });
    }
  }, [data]);
  // const locations: string[] = data?.data || [];

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (
        scrollTop + clientHeight >= scrollHeight - 10 &&
        !isFetching &&
        data?.nextPage !== null
      ) {
        setPage(data?.nextPage || 0);
      }
    }
  };

  // console.log(locations);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={isLoading} className="flex gap-1">
          <CiLocationOn /> <span>location</span> <FaAngleDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        ref={containerRef}
        onScroll={handleScroll}
        className="max-h-[300px] overflow-y-auto"
      >
        <DropdownMenuItem
          onClick={() => setLocation("")}
          className="cursor-pointer"
        >
          <p className={`${!location && "bg-gray-400 p-1 w-full rounded-sm"}`}>
            All
          </p>
        </DropdownMenuItem>
        {alllocations.map((loca, index) => (
          <DropdownMenuItem onClick={() => setLocation(loca)} key={index}>
            <p
              className={`${
                location === loca && "bg-gray-400 p-1 w-full rounded-sm"
              }`}
            >
              {loca}
            </p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocationFilter;
