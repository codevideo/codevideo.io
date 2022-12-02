import * as React from "react";
import { CanvasWidget } from "../../shared/CanvasWidget";
import { EditorWidget } from "../../shared/EditorWidget";

export interface IEditorAndVideoGeneratorProps {}

export function EditorAndVideoGenerator(props: IEditorAndVideoGeneratorProps) {
  return (
    <div className="container text-center">
      <div className="d-flex flex-row flex-wrap justify-content-center">
        <EditorWidget />
        <CanvasWidget />
      </div>
    </div>
  );
}
