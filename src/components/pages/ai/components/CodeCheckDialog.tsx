import {
  IAction,
  convertActionsToCodeActions,
} from "@fullstackcraftllc/codevideo-types";
import { VirtualCodeBlock } from "@fullstackcraftllc/virtual-code-block";
import { Button, Code, Dialog, Flex, Text } from "@radix-ui/themes";
import * as React from "react";
import { useState } from "react";
import { ReadOnlyEditor } from "../../../shared/ReadOnlyEditor";

export interface ICodeCheckDialogProps {
  actions: Array<IAction>;
}

export function CodeCheckDialog(props: ICodeCheckDialogProps) {
  const { actions } = props;
  const [codeIndex, setCodeIndex] = useState(0);
  const virtualCodeBlock = new VirtualCodeBlock([]);
  const codeActions = convertActionsToCodeActions(actions);
  virtualCodeBlock.applyCodeActions(codeActions);
  const codeAtEachStep = virtualCodeBlock.getCodeAfterEachStep();
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Code Check</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Code Check</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Resulting code based on your code steps:
        </Dialog.Description>
        <Flex gap="2" mb="4" direction="column">
        <Text>Step {codeIndex + 1} of {codeAtEachStep.length}:</Text>
        <Code>
          <ReadOnlyEditor value={codeAtEachStep[codeIndex]}/>
        </Code>
        </Flex>
        <Flex gap="2" mt="4">
            <Button
                disabled={codeIndex === 0}
                onClick={() => setCodeIndex(codeIndex - 1)}
            >
                {'<'}
            </Button>
            <Button
                disabled={codeIndex === codeAtEachStep.length - 1}
                onClick={() => setCodeIndex(codeIndex + 1)}
            >
                {'>'}
            </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
