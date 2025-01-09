const Table = ({ data }) => {
    return (
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-700 text-gray-200">
              <th className="border border-gray-600 px-4 py-2">Date</th>
              <th className="border border-gray-600 px-4 py-2">Revenue</th>
              <th className="border border-gray-600 px-4 py-2">Net Income</th>
              <th className="border border-gray-600 px-4 py-2">Gross Profit</th>
              <th className="border border-gray-600 px-4 py-2">EPS</th>
              <th className="border border-gray-600 px-4 py-2">Operating Income</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className={`${
                  idx % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } text-gray-300`}
              >
                <td className="border border-gray-600 px-4 py-2">{row.date}</td>
                <td className="border border-gray-600 px-4 py-2">{row.revenue}</td>
                <td className="border border-gray-600 px-4 py-2">{row.netIncome}</td>
                <td className="border border-gray-600 px-4 py-2">{row.grossProfit}</td>
                <td className="border border-gray-600 px-4 py-2">{row.eps}</td>
                <td className="border border-gray-600 px-4 py-2">{row.operatingIncome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Table;
  