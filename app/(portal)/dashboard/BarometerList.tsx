import { useState, useEffect } from "react";
import baralist from "@/constants/barometers";

interface propsType {
  addWidget: (w: any) => void;
  layout: any[];
}

const BarometerList = ({ addWidget, layout }: propsType) => {
  const [selectedWidget, setSelectedWidget] = useState<any[]>([]);

  const handleAddWidget = (bId: string) => {
    const w = [...selectedWidget, bId];
    setSelectedWidget(w);
    addWidget(w);
  };

  const handleRemoveWidget = (bId: string) => {
    let ary = [...selectedWidget];
    let indexToDelete = ary.indexOf(bId);
    if (indexToDelete !== -1) {
      ary.splice(indexToDelete, 1);
    }
    setSelectedWidget(ary);
    addWidget(ary);
  };

  useEffect(() => {
    let wIds: any = [];
    layout.map((val) => {
      wIds.push(val["i"]);
    });
    setSelectedWidget(wIds);
  }, [layout]);

  return (
    <div className="w-full md:w-[570px] overflow-y-auto">
      {baralist &&
        baralist.map((barometer, i) => (
          <div
            key={i}
            className="w-full h-12 flex items-center justify-between px-3 border-b border-b-gray-border"
          >
            <div className="flex items-center gap-3 font-medium text-base">
              <span className="text-[#626D7C]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{barometer.name}</span>
            </div>
            <div className="flex items-center gap-4">
              {selectedWidget.indexOf(barometer?._id) > -1 ? (
                <button
                  onClick={() => handleRemoveWidget(barometer?._id)}
                  className="min-w-[95px] h-8 flex items-center justify-center gap-2 rounded-lg border border-[#343B45]"
                >
                  <img src="/icons/minus.svg" className="w-4" alt="" />
                  <span className="font-semibold text-xs">Remove</span>
                </button>
              ) : (
                <button
                  onClick={() => handleAddWidget(barometer?._id)}
                  className="min-w-[95px] h-8 flex items-center justify-center gap-2 rounded-lg bg-gray-border"
                >
                  <img src="/icons/plus.svg" className="w-4 invert" alt="" />
                  <span className="font-semibold text-xs">Add</span>
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default BarometerList;
