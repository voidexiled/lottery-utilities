import { useEffect } from "react";
import { useToolsStore } from "../store/tools";
import { TOOLS } from "../constants/Tools";
import { FigureSearcherTool } from "./Tools/FigureSearcher/FigureSearcherTool";
import { StandardGenerateTool } from "./Tools/StandardGenerator/StandardGenerateTool";

export const Tool = () => {
  const tool = useToolsStore((state) => state.tool);
  useEffect(() => {
    console.info(tool.name);
  });

  if (tool === TOOLS.FIGURE_SEARCHER)
    return <FigureSearcherTool />;
  if (tool === TOOLS.STANDARD_GENERATE)
    return <StandardGenerateTool></StandardGenerateTool>;

  return <></>;
};
