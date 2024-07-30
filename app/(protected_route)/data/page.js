"use client";
import DataTable from "@/components/data/DataTable";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import CountryFilter from "@/components/data/filterComponents/CountryFilter";
import JobFilter from "@/components/data/filterComponents/JobFilter";
import FilterBox from "@/components/data/filterComponents/FilterBox";

function DataPage() {
  const [data, setData] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const countriesQueryString = selectedCountries
    .map((country) => `country=${country}`)
    .join("&");

  const handleCountryChange = (country, isChecked) => {
    setSelectedCountries((prevCountries) => {
      const newCountries = isChecked
        ? [...prevCountries, country]
        : prevCountries.filter((c) => c !== country);
      // Reset page to 1 whenever filters are updated
      setCurrentPage(1);
      return newCountries;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/data?${countriesQueryString}&page=${currentPage}$limit=${pageSize}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
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
  }, [countriesQueryString, currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    setCurrentPage(newPage);
  };

  return (
    <main className="h-screen flex justify-center items-center">
      <section className="w-full px-8 flex gap-16">
        <div className="filter-box bg-white w-96 rounded-md shadow-sm">
          <FilterBox />
          {/* <CountryFilter
            selectedCountries={selectedCountries}
            onCountryChange={handleCountryChange}
          />

          <JobFilter /> */}
        </div>

        <div className=" data-container w-full overflow-hidden relative space-y-2">
          <div className="content-header bg-white shadow-sm rounded-md p-5">
            <h2 className="text-sm font-bold">Total(61.3M)</h2>
          </div>
          <div className="content-box bg-white h-96  shadow-sm rounded-md overflow-auto">
            {isLoading ? <Loader /> : <DataTable data={data} />}
          </div>
          <div className="pagination join flex justify-center gap-2">
            <button
              className="join-item btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              «
            </button>
            <button className="join-item btn btn-info">{currentPage}</button>
            <button
              className="join-item btn"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              »
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DataPage;
