"use client";
import { getData } from "@/actions/dataActions";
import DataTable from "@/components/data/DataTable";
import FilterBox from "@/components/data/FilterBox";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";

function DataPage() {
  const [data, setData] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      const query = { countries: selectedCountries };
      const fetchedData = await getData(query);
      setData(fetchedData);
      setIsLoading(false);
    };

    fetchData();
  }, [selectedCountries]);

  return (
    <main className="h-screen flex justify-center items-center">
      <section className="container flex gap-16">
        <div className="filter-box w-96  bg-white border-2 rounded-md p-5 space-y-3">
          <h2 className=" font-bold">Filter by Country</h2>
          <FilterBox
            selectedCountries={selectedCountries}
            onCountryChange={handleCountryChange}
          />
        </div>

        <div className=" data-container w-full  overflow-hidden relative">
          <div className="content-header bg-white border-2 rounded-md p-5">
            <h2 className="text-sm font-bold">Total(61.3M)</h2>
          </div>
          <div className="content-box h-96 bg-white border-2 rounded-md overflow-auto">
            {isLoading ? <Loader /> : <DataTable data={data} />}
          </div>
        </div>
      </section>
    </main>
  );
}

export default DataPage;
