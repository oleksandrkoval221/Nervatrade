"use client";

import { useState, useEffect } from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import baralist from "@/constants/barometers";

const ResponsiveReactGridLayout = WidthProvider(Responsive) as any;

interface propsType {
  layout: any[];
  setlayout: any;
  editFlag: boolean;
}
export default function GridLayouts({
  layout,
  setlayout,
  editFlag,
}: propsType) {
  const [compactType, setcompactType] = useState<
    "vertical" | "horizontal" | null
  >("vertical");
  const [mounted, setmounted] = useState(false);
  const [rowHeight, setRowHeight] = useState((window.innerWidth - 240) / 6 - 1);

  const [widgetList, setWidgetList] = useState<any>({});

  useEffect(() => {
    const wList: any = {};
    baralist.map((list, i) => {
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
    setlayout(layout);
  };

  type Breakpoints = "lg" | "md" | "sm" | "xs" | "xxs";

  const cols: Record<Breakpoints, number> = {
    lg: 6,
    md: 4,
    sm: 3,
    xs: 2,
    xxs: 1,
  };

  const onBreakpointChange = (newBreakpoint: Breakpoints) => {
    const containerWidth = window.innerWidth - 240;
    setRowHeight(containerWidth / cols[newBreakpoint] - 1);
  };

  return (
    <div>
      {/* <div>Compaction type: {compactType || "No Compaction"}</div> */}
      <ResponsiveReactGridLayout
        breakpoints={{ lg: 1040, md: 784, sm: 528, xs: 400, xxs: 0 }}
        containerPadding={[1, 1]}
        margin={[1, 1]}
        rowHeight={rowHeight}
        cols={cols}
        layout={layout}
        onDragStop={(layout: Layout) => onLayoutChange(layout)}
        onResizeStop={(layout: Layout) => onLayoutChange(layout)}
        onBreakpointChange={onBreakpointChange}
        // WidthProvider option
        measureBeforeMount={false}
        // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
        // and set `measureBeforeMount={true}`.
        useCSSTransforms={mounted}
        compactType={compactType}
        preventCollision={!compactType}
        isDraggable={editFlag}
        isResizable={editFlag}
        resizeHandle={
          <span className="react-resizable-handle !w-10 !h-10 border-b-4 border-r-4 border-b-[#FFF] border-r-[#FFF] absolute right-0 bottom-0 cursor-nwse-resize !bg-none after:!content-none" />
        }
      >
        {layout &&
          layout.map((itm, i) => (
            <div
              key={itm.i}
              data-grid={itm}
              className="flex justify-center items-center bg-gray-active"
            >
              {widgetList[itm.i]?.component}
            </div>
          ))}
      </ResponsiveReactGridLayout>
    </div>
  );
}
