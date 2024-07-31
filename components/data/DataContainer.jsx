"use client";
import DataTable from "./DataTable";
import { useFilterContext } from "@/hooks/useFilter";
import Loader from "../Loader";
import { useEffect, useState } from "react";

function DataContainer() {
  const { filters } = useFilterContext();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErorr] = useState(null);
  const currentPage = filters.currentPage;

  const countriesQueryString = filters.countries
    .map((country) => `country=${country}`)
    .join("&");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setErorr(null);
        const response = await fetch(
          `/api/data?${countriesQueryString}&page=${currentPage}`,
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
        setIsLoading(false);
      } catch (err) {
        setErorr(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [countriesQueryString, currentPage]);

  return (
    <div className="content-box bg-white h-96  shadow-sm rounded-md overflow-auto">
      {!isLoading ? <DataTable data={data} /> : <Loader />}
      {error && <p>{error}</p>}
    </div>
  );
}

export default DataContainer;
