import { useEffect } from "react";
import { useToolsStore } from "../store/tools";
import { TOOLS } from "../constants/Tools";
import { FigureSearcherTool } from "./Tools/FigureSearcher/FigureSearcherTool";
import { StandardGenerateTool } from "./Tools/StandardGenerator/StandardGenerateTool";
import { PDFTool } from "./Tools/PDFGenerator/PDFTool";
import { MultipleGeneratorTool } from "./Tools/MultipleGenerator/MultipleGeneratorTool";

export const Tool = () => {
  const tool = useToolsStore((state) => state.tool);
  useEffect(() => {
    console.info(tool.name);
  });

  if (tool === TOOLS.FIGURE_SEARCHER)
    return <FigureSearcherTool />;
  if (tool === TOOLS.STANDARD_GENERATE)
    return <StandardGenerateTool></StandardGenerateTool>;
  if (tool === TOOLS.GENERATE_PDF)
    return <PDFTool></PDFTool>;
  if (tool === TOOLS.MULTIPLE_GENERATE)
    return <MultipleGeneratorTool></MultipleGeneratorTool>;
  return <></>;
};
