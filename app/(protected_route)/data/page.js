"use client";
import DataTable from "@/components/data/DataTable";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import CountryFilter from "@/components/data/filterComponents/CountryFilter";
import JobFilter from "@/components/data/filterComponents/JobFilter";

function DataPage() {
  const [data, setData] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const countriesQueryString = selectedCountries
    .map((country) => `country=${country}`)
    .join("&");

  const handleCountryChange = (country, isChecked) => {
    setSelectedCountries((prevCountries) => {
      if (isChecked) {
        return [...prevCountries, country];
      } else {
        return prevCountries.filter((c) => c !== country);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/data?${countriesQueryString}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [countriesQueryString]);

  return (
    <main className="bg-base-300 h-screen flex justify-center items-center">
      <section className="container flex gap-16">
        <div className="filter-box w-96  border-2 rounded-md p-5 space-y-3">
          <h2 className=" font-bold text-lg">Filter</h2>
          <CountryFilter
            selectedCountries={selectedCountries}
            onCountryChange={handleCountryChange}
          />

          <JobFilter />
        </div>

        <div className=" data-container w-full overflow-hidden relative space-y-2">
          <div className="content-header border-2 rounded-md p-5">
            <h2 className="text-sm font-bold">Total(61.3M)</h2>
          </div>
          <div className="content-box h-96  border-2 rounded-md overflow-auto">
            {isLoading ? <Loader /> : <DataTable data={data} />}
          </div>
        </div>
      </section>
    </main>
  );
}

export default DataPage;
