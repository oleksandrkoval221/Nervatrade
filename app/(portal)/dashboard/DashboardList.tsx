
const DashboardList = ({ list }: {
  list: any[]
}) => {
  return (
    <div className="w-full rounded-lg bg-dark-second p-4 mt-4 h-[calc(100vh-140px)] overflow-y-auto">
      {
        list &&
        list.map((dashboard, i) =>
          <div key={i} className={`w-full rounded-lg flex items-center justify-between p-4 ${i % 2 === 0 && 'bg-dark-main'}`}>
            <div className="flex items-center gap-2">
              <div className="border border-gray-100 rounded px-1">{ String(i+1).padStart(2, '0') }</div>
              {dashboard.name}
            </div>
            <div className="flex items-center gap-4">
              <button className="rounded-lg py-2 px-4 border border-red-main">Delete</button>
              <button className="rounded-lg py-2 px-4 border border-gray-100">Edit</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default DashboardList;