"use client";

import { Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import DropdownSearchBox from "./DropdownSearchBox";
import { useRouter } from "next/navigation";

function FilterBox() {
  const filterItem = ["Country", "Job Title", "Gender"];
  const [expandedFilter, setIsExpandedFilter] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (selectedCountries.length > 0) {
      const queryParams = [
        ...selectedCountries.map(
          (country) => `country=${encodeURIComponent(country)}`
        ),
      ].join("&");
      const url = `/data?${queryParams}`;
      router.push(url);
    } else {
      router.push("/data");
    }
  }, [router, selectedCountries]);

  const handleCountrySelect = (selectedItems) => {
    setSelectedCountries(selectedItems);
  };

  const handleToggle = (item) => {
    setIsExpandedFilter((prev) => (prev === item ? null : item));
  };

  const countryList = [
    "United States",
    "Bangladesh",
    "Spain",
    "Germany",
    "India",
    "Pakistan",
    "United Kingdom",
  ];

  const renderFilterContent = (item) => {
    switch (item) {
      case "Country":
        return (
          <DropdownSearchBox
            data={countryList}
            onSelect={handleCountrySelect}
          />
        );

      case "Job Title":
        return (
          <div>
            <p>Country Filter Options here</p>
          </div>
        );

      case "Gender":
        return (
          <div>
            {/* Content for Gender filter */}
            <p>Gender filter options here...</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="w-full flex justify-between items-center p-5 border-b-2">
        <span className="font-semibold">Filter</span>
      </div>

      {filterItem.map((item) => (
        <div
          key={item}
          className={`w-full border-b-2 text-sm hover:bg-gray-100 ${
            expandedFilter === item && "bg-gray-100"
          } group`}
        >
          <div
            className=" flex justify-between items-center px-5 py-3"
            onClick={() => handleToggle(item)}
          >
            <span>{item}</span>
            <span className="group-hover:text-primary">
              {expandedFilter === item ? (
                <Minus size={16} />
              ) : (
                <Plus size={16} />
              )}
            </span>
          </div>
          {expandedFilter == item && renderFilterContent(item)}
        </div>
      ))}
    </>
  );
}

export default FilterBox;
