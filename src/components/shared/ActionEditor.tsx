import * as React from "react";
import {
  AllActionStrings,
  IAction,
  isEditorAction
} from "@fullstackcraftllc/codevideo-types";
import { Card, Flex, Select, TextField, Text, Button } from "@radix-ui/themes";

export interface IActionEditorProps {
  actions: Array<IAction>;
  setActions: (actions: Array<IAction>) => void;
}

export function ActionEditor(props: IActionEditorProps) {
  const { actions, setActions } = props;

  // TODO: move this into the types library
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

  const handleSelectChange = (index: number, event: string) => {
    // call setActions with the new array of actions
    setActions(
      actions.map((action, i) => {
        if (i === index) {
          // if we're switching to a repeatable action, default the value to 1
          return {
            ...action,
            name: event as any,
            value: isRepeatableAction(event) ? "1" : "",
          };
        }
        return action;
      })
    );
  };

  // Generate dropdown options dynamically from the AllActions type
  const dropdownOptions = AllActionStrings.map((actionType: string) => (
    <Select.Item key={actionType} value={actionType}>
      {actionType}
    </Select.Item>
  ));

  return (
    <div style={{ height: "500px", overflowY: "auto" }}>
      <Flex direction="column" gap="1" style={{ width: "900px" }}>
        {actions.map((action, index) => (
          <>
            <Card color="mint">
              <Flex direction="row" align="center" gap="1">
                <Text color="mint" mr="1">#{index + 1}</Text>
                <Flex key={index} direction="column" gap="1">
                  <Flex direction="row" align="center" gap="1">
                    <Text>Name:</Text>
                    <Select.Root
                      defaultValue={action.name}
                      onValueChange={(e) => handleSelectChange(index, e)}
                    >
                      <Select.Trigger />
                      <Select.Content>
                        <Select.Group>{dropdownOptions}</Select.Group>
                      </Select.Content>
                    </Select.Root>
                    <Button
                      ml="auto"
                      color="red"
                      onClick={() =>
                        setActions(actions.filter((action, i) => i !== index))
                      }
                    >
                      Remove
                    </Button>
                  </Flex>
                  <Flex direction="row" align="center" gap="1">
                    <Text>Value:</Text>
                    <TextField.Root>
                      <TextField.Input
                        style={{
                          width: "700px",
                          fontFamily: isEditorAction(action)
                            ? "monospace"
                            : "inherit",
                        }}
                        width="700px"
                        type={
                          isRepeatableAction(action.name) ? "number" : "text"
                        }
                        value={action.value}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </TextField.Root>
                    {/* duplicate button */}
                    <Button
                      ml="auto"
                      color="mint"
                      onClick={() =>
                        setActions(
                          actions
                            .slice(0, index + 1)
                            .concat([action, ...actions.slice(index + 1)])
                        )
                      }
                    >
                      Duplicate
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Card>
            {/* add additional step button */}
            <Flex direction="row" align="center" justify="center" gap="1">
              <div>
                <Button
                  color="mint"
                  onClick={() =>
                    setActions(
                      actions
                        .slice(0, index + 1)
                        .concat([
                          { name: "author-speak-before", value: "My new action" },
                          ...actions.slice(index + 1),
                        ])
                    )
                  }
                >
                  +
                </Button>
              </div>
            </Flex>
          </>
        ))}
      </Flex>
    </div>
  );
}
