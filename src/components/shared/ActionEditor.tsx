import * as React from "react";
import {
  IAction,
  allActionStrings
} from "@fullstackcraftllc/codevideo-types";
import { Card, Flex, Select, TextField } from "@radix-ui/themes";

export interface IActionEditorProps {
  actions: Array<IAction>;
  setActions: (actions: Array<IAction>) => void;
}

export function ActionEditor(props: IActionEditorProps) {
  const { actions, setActions } = props;
  const isRepeatableAction = (actionName: string): boolean => {
    return ["enter", "space", "backspace", "tab"].includes(actionName);
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // call setActions with the new array of actions
    setActions(
      actions.map((action, i) => {
        if (i === index) {
          return { ...action, value: event.target.value };
        }
        return action;
      })
    );
  };

  const handleSelectChange = (
    index: number,
    event: string
  ) => {
    // call setActions with the new array of actions
    setActions(
      actions.map((action, i) => {
        if (i === index) {
          return { ...action, name: event as any };
        }
        return action;
      })
    );
  };

  // Generate dropdown options dynamically from the AllActions type
  const dropdownOptions = allActionStrings.map((actionType: string) => (
    <Select.Item key={actionType} value={actionType}>
      {actionType}
    </Select.Item>
  ));

  return (
    <Card>
      <Flex direction="column" gap="5" style={{width:"900px"}}>
        {actions.map((action, index) => (
          <Card color="mint">
            <Flex key={index} direction="column" gap="1">
              <Select.Root defaultValue={action.name} onValueChange={(e) => handleSelectChange(index, e)}>
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>{dropdownOptions}</Select.Group>
                </Select.Content>
              </Select.Root>
              <TextField.Root>
                <TextField.Input
                  type={isRepeatableAction(action.name) ? "number" : "text"}
                  value={action.value}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </TextField.Root>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Card>
  );
}
