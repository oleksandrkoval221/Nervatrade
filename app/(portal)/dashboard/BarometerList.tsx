import { useState } from "react";

const list = [
  {
    _id: "1",
    name: "Interest Rate"
  }, {
    _id: "2",
    name: "Bitcoin Dominance"
  }, {
    _id: "3",
    name: "Heatmap"
  }, {
    _id: "4",
    name: "Order Flow"
  }, {
    _id: "5",
    name: "Trading Chart"
  }
];

const BarometerList = () => {
  const [selectedWidget, setSelectedWidget] = useState<any[]>([]);

  const handleAddWidget = (bId: string) => {
    setSelectedWidget([...selectedWidget, bId]);
  }

  const handleRemoveWidget = (bId: string) => {
    let ary = [...selectedWidget];
    let indexToDelete = ary.indexOf(bId);
    if (indexToDelete !== -1) {
      ary.splice(indexToDelete, 1);
    }
    setSelectedWidget(ary);
  }

  return (
    <div className="w-full md:w-[750px] lg:w-[900px] rounded-lg mt-4 overflow-y-auto">
      {
        list &&
        list.map((barometer, i) =>
          <div key={i} className={`w-full rounded-lg flex items-center justify-between p-4 ${i % 2 === 0 && 'bg-dark-main'}`}>
            <div className="flex items-center gap-2">
              <div className="border border-gray-100 rounded px-1">{String(i + 1).padStart(2, '0')}</div>
              {barometer.name}
            </div>
            <div className="flex items-center gap-4">
              {
                selectedWidget.indexOf(barometer?._id) > -1 ?
                  <button
                    onClick={() => handleRemoveWidget(barometer?._id)}
                    className="rounded py-1 px-4 border border-gray-100">- Remove</button>
                  :
                  <button
                    onClick={() => handleAddWidget(barometer?._id)}
                    className="rounded py-1 px-4 bg-green-main text-black">+ ADD</button>
              }
            </div>
          </div>
        )
      }
    </div>
  )
}

export default BarometerList;