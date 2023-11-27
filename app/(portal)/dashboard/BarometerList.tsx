import { useState, useEffect } from "react";
import baralist from "@/constants/barometers";

interface propsType {
  addWidget: (w:any)=>void;
  layout: any[];
}

const BarometerList = ({ addWidget, layout }: propsType) => {
  const [selectedWidget, setSelectedWidget] = useState<any[]>([]);

  const handleAddWidget = (bId: string) => {
    const w = [...selectedWidget, bId];
    setSelectedWidget(w);
    addWidget(w);
  }

  const handleRemoveWidget = (bId: string) => {
    let ary = [...selectedWidget];
    let indexToDelete = ary.indexOf(bId);
    if (indexToDelete !== -1) {
      ary.splice(indexToDelete, 1);
    }
    setSelectedWidget(ary);
    addWidget(ary);
  }

  useEffect(()=>{
    let wIds:any = [];
    layout.map(val => {
      wIds.push(val['i']);
    })
    setSelectedWidget(wIds);
  },[layout])

  return (
    <div className="w-full md:w-[750px] lg:w-[900px] rounded-lg mt-4 overflow-y-auto">
      {
        baralist &&
        baralist.map((barometer, i) =>
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