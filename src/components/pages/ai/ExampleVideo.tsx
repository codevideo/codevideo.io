import * as React from "react";
import { Text, Code, Dialog, Button, Heading, Container, Flex } from "@radix-ui/themes";

export interface IExampleVideoProps {
  title: string;
  videoPath: string;
  jsonCode?: string;
}

export function ExampleVideo(props: IExampleVideoProps) {
  const { title, videoPath, jsonCode } = props;
  return (
    <>
      <Heading color="mint">{title}</Heading>
      <video width="960" height="540" controls>
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {jsonCode &&<Dialog.Root>
        <Dialog.Trigger>
          <Button>Show Corresponding JSON</Button>
        </Dialog.Trigger>
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>JSON Steps Behind Fibonacci Example</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            These JSON steps are executed in CodeVideo's automation tool and are
            what produced the example video.
          </Dialog.Description>
           <Code>
            <pre
              style={{
                wordWrap: "break-word",
                overflowX: "auto",
                whiteSpace: "pre-wrap",
              }}
            >
              {jsonCode}
            </pre>
          </Code>
        </Dialog.Content>
      </Dialog.Root>}
    </>
  );
}