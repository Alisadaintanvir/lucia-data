function DataTable({ data }) {
  return (
    <table className="items-center bg-transparent w-full border-collapse ">
      <thead>
        <tr>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            Name
          </th>

          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            Job Title
          </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            Country
          </th>

          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            Email Address
          </th>
        </tr>
      </thead>

      <tbody>
        {data &&
          data.map((item) => (
            <tr key={item._id}>
              <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                {item._source.person_name ? item._source.person_name : "-"}
              </th>

              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                {item._source.person_title ? item._source.person_title : "-"}
              </td>

              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                {item._source.person_location_country
                  ? item._source.person_location_country
                  : "-"}
              </td>

              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                {item._source.person_email ? item._source.person_email : "-"}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default DataTable;
