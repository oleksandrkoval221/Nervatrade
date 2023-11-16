"use client";

import { useState, useEffect } from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive) as any;

export default function GridLayouts() {
  const [compactType, setcompactType] = useState<'vertical'|'horizontal'|null>("vertical");
  const [mounted, setmounted] = useState(false);
  const [layout, setlayout] = useState<any[]>([
    { i: "a", x: 0, y: 0, w: 1, h: 2 },
    { i: "b", x: 1, y: 0, w: 3, h: 1 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
    { i: "d", x: 0, y: 2, w: 1, h: 2 },
    { i: "e", x: 0, y: 2, w: 1, h: 2 }
  ]);

  useEffect(() => {
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
    console.log('layout ===>> ', layout);
  }

  return (
    <div>
      <div>Compaction type: {compactType || "No Compaction"}</div>
      {/* <button onClick={onCompactTypeChange} className="">Change Compaction Type</button> */}
      <ResponsiveReactGridLayout
        rowHeight={30}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        layout={layout}
        onLayoutChange={(layout: Layout)=>onLayoutChange(layout)}
        // WidthProvider option
        measureBeforeMount={false}
        // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
        // and set `measureBeforeMount={true}`.
        useCSSTransforms={mounted}
        compactType={compactType}
        preventCollision={!compactType}
        // isDraggable={false}
        // isResizable={false}
      >
        {layout.map((itm, i) => (
          <div key={itm.i} data-grid={itm} className="bg-green-500">
            {itm.i}
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
}