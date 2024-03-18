import * as React from "react";
import { IAction } from "@fullstackcraftllc/codevideo-types";
import { VirtualCodeBlock } from "@fullstackcraftllc/virtual-code-block";
import { Button, Code, Dialog, Flex, Text } from "@radix-ui/themes";
import { useState } from "react";
import { ReadOnlyEditor } from "../../../shared/ReadOnlyEditor";

export interface ICodeCheckDialogProps {
  actions: Array<IAction>;
}

export function CodeCheckDialog(props: ICodeCheckDialogProps) {
  const { actions } = props;
  const [codeIndex, setCodeIndex] = useState(0);
  const virtualCodeBlock = new VirtualCodeBlock([]);
  virtualCodeBlock.applyActions(actions);
  const dataAtEachFrame = virtualCodeBlock.getDataForAnnotatedFrames();
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Code Frames</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Code Frames</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          View your code and speech captions every step of the way.
        </Dialog.Description>
        <Flex gap="2" mb="4" direction="column">
          <Text>
            Step {codeIndex + 1} of {dataAtEachFrame.length}:
          </Text>
          {dataAtEachFrame[codeIndex].speechCaptions.length > 0 && (
            <Text m="4">
              "<i>{dataAtEachFrame[codeIndex].speechCaptions[0].speechValue}</i>"
            </Text>
          )}
          <Code>
            <ReadOnlyEditor
              value={dataAtEachFrame[codeIndex].code}
              caretPosition={dataAtEachFrame[codeIndex].caretPosition}
            />
          </Code>
        </Flex>
        <Flex gap="2" mt="4">
          <Button
            disabled={codeIndex === 0}
            onClick={() => setCodeIndex(codeIndex - 1)}
          >
            {"<"}
          </Button>
          <Button
            disabled={codeIndex === dataAtEachFrame.length - 1}
            onClick={() => setCodeIndex(codeIndex + 1)}
          >
            {">"}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
