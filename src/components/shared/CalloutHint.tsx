import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";
import * as React from "react";

export interface ICalloutHintProps {
  text: string;
  color: any; // TODO: Fix this type
}

export function CalloutHint(props: ICalloutHintProps) {
  const { text, color } = props;
  return (
    <Callout.Root color={color}>
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>{text}</Callout.Text>
    </Callout.Root>
  );
}
