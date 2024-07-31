import DataContainer from "@/components/data/DataContainer";
import FilterBox from "@/components/data/filterComponents/FilterBox";
import Pagination from "@/components/data/Pagination";
import { FilterProvider } from "@/contexts/FilterContext";

function DataPage() {
  return (
    <FilterProvider>
      <main className="h-screen flex justify-center items-center ">
        <section className="w-full px-8 flex gap-16">
          <div className="filter-box bg-white w-96 rounded-md shadow-sm">
            <FilterBox />
          </div>

          <div className=" data-container w-full overflow-hidden relative space-y-2">
            <div className="content-header bg-white shadow-sm rounded-md p-5">
              <h2 className="text-sm font-bold">Total(61.3M)</h2>
            </div>

            <DataContainer />
            <Pagination />
          </div>
        </section>
      </main>
    </FilterProvider>
  );
}

export default DataPage;
