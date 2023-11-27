"use client";

import { useState, useEffect } from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import baralist from "@/constants/barometers";

const ResponsiveReactGridLayout = WidthProvider(Responsive) as any;

interface propsType{
  layout: any[];
  setlayout: any;
  editFlag: boolean;
}
export default function GridLayouts({layout, setlayout, editFlag}: propsType) {
  const [compactType, setcompactType] = useState<'vertical'|'horizontal'|null>("vertical");
  const [mounted, setmounted] = useState(false);

  const [widgetList, setWidgetList] = useState<any>({});

  useEffect(() => {
    const wList:any = {};
    baralist.map((list, i)=>{
      wList[list?._id] = list;
    });
    setWidgetList(wList);

    setmounted(true);
  }, []);

  // const onCompactTypeChange = () => {
  //   const oldCompactType = compactType;
  //   const compactTypeAgain =
  //     oldCompactType === "horizontal"
  //       ? "vertical"
  //       : oldCompactType === "vertical"
  //       ? null
  //       : "horizontal";
  //   setcompactType(compactTypeAgain);
  // };

  const onLayoutChange = (layout: Layout) => {
    setlayout(layout)
  }

  return (
    <div>
      {/* <div>Compaction type: {compactType || "No Compaction"}</div> */}
      {/* <button onClick={onCompactTypeChange} className="">Change Compaction Type</button> */}
      <ResponsiveReactGridLayout
        rowHeight={30}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        layout={layout}
        onDragStop={(layout: Layout)=>onLayoutChange(layout)}
        onResizeStop={(layout: Layout)=>onLayoutChange(layout)}
        // WidthProvider option
        measureBeforeMount={false}
        // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
        // and set `measureBeforeMount={true}`.
        useCSSTransforms={mounted}
        compactType={compactType}
        preventCollision={!compactType}
        isDraggable={editFlag}
        isResizable={editFlag}
      >
        {layout && layout.map((itm, i) => (
          <div key={itm.i} data-grid={itm} className={`flex justify-center items-center ${editFlag?"bg-green-700":"bg-green-500"}`}>
            { widgetList[itm.i].name }
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
}