import * as React from "react";
import MimicTypos from "../../enums/MimicTypos";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  resetVideoSettings,
  setDimensions,
  setEngine,
  setGradientColors,
  setMimicTypos,
} from "../../store/videoSlice";
import Engine from "../../enums/Engine";
import {
  AlertDialog,
  Button,
  Flex,
  Inset,
  RadioGroup,
  Table,
  Text,
  TextField,
} from "@radix-ui/themes";

export interface IAdvancedVideoOptionsDialogProps {
  onClicked: () => void;
}

export function AdvancedVideoOptionsDialog(
  props: IAdvancedVideoOptionsDialogProps
) {
  const { onClicked } = props;
  const { height, width, gradientColors, mimicTypos, engine } = useAppSelector(
    (state) => state.video
  );
  const dispatch = useAppDispatch();

  const onEngineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as Engine;
    dispatch(setEngine(value));
  };

  const onChangeTypos = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as MimicTypos;
    dispatch(setMimicTypos(value));
  };

  const onChangeVideoSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const [width, height] = value.split("x").map((v) => parseInt(v));
    dispatch(setDimensions({ width, height }));
  };

  const onChangeWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setDimensions({ width: parseInt(value), height }));
  };

  const onChangeHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setDimensions({ width, height: parseInt(value) }));
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="soft" onClick={onClicked}>
          Advanced options
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title size="6">Advanced options</AlertDialog.Title>
        <AlertDialog.Description size="5">
          Modify the size, background color, and simulation of typos for your
          video.
        </AlertDialog.Description>
        <Flex gap="5" mt="5" direction="column">
          <Text size="4">Background color around editor:</Text>
          <RadioGroup.Root defaultValue="1">
            <Flex gap="3" direction="row">
              <Text as="label" size="2">
                <Flex
                  gap="1"
                  justify="center"
                  align="center"
                  onClick={() =>
                    dispatch(setGradientColors(["#91ffd9", "#f5ff97"]))
                  }
                >
                  <RadioGroup.Item
                    value="1"
                    checked={
                      gradientColors[0] === "#91ffd9" &&
                      gradientColors[1] === "#f5ff97"
                    }
                  />
                  <div
                    className="m-3 rounded"
                    style={{
                      display: "inline-block",
                      background:
                        "linear-gradient(315deg, #91ffd9 0%, #f5ff97 100%)",
                      width: 40,
                      height: 40,
                      borderRadius: 5,
                    }}
                  />
                </Flex>
              </Text>
              <Text as="label" size="2">
                <Flex
                  gap="1"
                  justify="center"
                  align="center"
                  onClick={() =>
                    dispatch(setGradientColors(["#9900ff", "#ff9500"]))
                  }
                >
                  <RadioGroup.Item
                    value="2"
                    checked={
                      gradientColors[0] === "#9900ff" &&
                      gradientColors[1] === "#ff9500"
                    }
                  />{" "}
                  <div
                    className="m-3 rounded"
                    style={{
                      display: "inline-block",
                      background:
                        "linear-gradient(315deg, #9900ff 0%, #ff9500 100%)",
                      width: 40,
                      height: 40,
                      borderRadius: 5,
                    }}
                  />
                </Flex>
              </Text>
              <Text as="label" size="2">
                <Flex
                  gap="1"
                  justify="center"
                  align="center"
                  onClick={() =>
                    dispatch(setGradientColors(["#00ffa6", "#00acff"]))
                  }
                >
                  <RadioGroup.Item
                    value="3"
                    checked={
                      gradientColors[0] === "#00ffa6" &&
                      gradientColors[1] === "#00acff"
                    }
                  />
                  <div
                    className="m-3 rounded"
                    style={{
                      display: "inline-block",
                      background:
                        "linear-gradient(315deg, #00ffa6 0%, #00acff 100%)",
                      width: 40,
                      height: 40,
                      borderRadius: 5,
                    }}
                  />
                </Flex>
              </Text>
              <Text as="label" size="2">
                <Flex
                  gap="1"
                  justify="center"
                  align="center"
                  onClick={() =>
                    dispatch(setGradientColors(["#000000", "#ffffff"]))
                  }
                >
                  <RadioGroup.Item
                    value="4"
                    checked={
                      gradientColors[0] === "#000000" &&
                      gradientColors[1] === "#ffffff"
                    }
                  />
                  <div
                    className="m-3 rounded"
                    style={{
                      display: "inline-block",
                      background:
                        "linear-gradient(315deg, #000000 0%, #ffffff 100%)",
                      width: 40,
                      height: 40,
                      borderRadius: 5,
                    }}
                  />
                </Flex>
              </Text>
            </Flex>
          </RadioGroup.Root>
          <Text size="4">Video Size:</Text>
          <Inset side="x">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>
                    <Text size="3">Type</Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>
                    <Text size="3">Dimension Options</Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="3">Landscape</Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <RadioGroup.Root
                      defaultValue="1"
                      onChange={onChangeVideoSize}
                    >
                      <Flex gap="3" direction="row">
                        <Text as="label" size="2">
                          <Flex gap="1" onClick={() => dispatch(setDimensions({ width: 1920, height: 1080 }))}>
                            <RadioGroup.Item value="1920x1080" checked={width === 1920 && height === 1080} /> 1920x1080
                          </Flex>
                        </Text>
                        <Text as="label" size="2">
                          <Flex gap="1" onClick={() => dispatch(setDimensions({ width: 1280, height: 720 }))}>
                            <RadioGroup.Item value="1280x720" checked={width === 1280 && height === 720} /> 1280x720
                          </Flex>
                        </Text>
                        <Text as="label" size="2">
                          <Flex gap="1" onClick={() => dispatch(setDimensions({ width: 960, height: 540 }))}>
                            <RadioGroup.Item value="960x540" checked={width === 960 && height === 540} /> 960x540
                          </Flex>
                        </Text>
                      </Flex>
                    </RadioGroup.Root>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="3">Portrait</Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <RadioGroup.Root
                      defaultValue="1"
                      onChange={onChangeVideoSize}
                    >
                      <Flex gap="3" direction="row">
                        <Text as="label" size="2">
                          <Flex gap="1" onClick={() => dispatch(setDimensions({ width: 1080, height: 1920 }))}>
                            <RadioGroup.Item value="1080x1920" checked={width === 1080 && height === 1920} /> 1080x1920
                          </Flex>
                        </Text>
                        <Text as="label" size="2">
                          <Flex gap="1" onClick={() => dispatch(setDimensions({ width: 720, height: 1280 }))}>
                            <RadioGroup.Item value="720x1280" checked={width === 720 && height === 1280} /> 720x1280
                          </Flex>
                        </Text>
                        <Text as="label" size="2">
                          <Flex gap="1" onClick={() => dispatch(setDimensions({ width: 540, height: 960 }))}>
                            <RadioGroup.Item value="540x960" checked={width === 540 && height === 960} /> 540x960
                          </Flex>
                        </Text>
                      </Flex>
                    </RadioGroup.Root>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="3">Square</Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <RadioGroup.Root
                      defaultValue="1"
                      onChange={onChangeVideoSize}
                    >
                      <Flex gap="3" direction="row">
                        <Text as="label" size="2">
                          <Flex gap="1" onClick={() => dispatch(setDimensions({ width: 1080, height: 1080 }))}>
                            <RadioGroup.Item value="1080x1080" checked={width === 1080 && height === 1080} /> 1080x1080
                          </Flex>
                        </Text>
                        <Text as="label" size="2">
                          <Flex gap="1" onClick={() => dispatch(setDimensions({ width: 720, height: 720 }))}>
                            <RadioGroup.Item value="720x720" checked={width === 720 && height === 720} /> 720x720
                          </Flex>
                        </Text>
                        <Text as="label" size="2">
                          <Flex gap="1" onClick={() => dispatch(setDimensions({ width: 540, height: 540 }))}>
                            <RadioGroup.Item value="540x540" checked={width === 540 && height === 540} /> 540x540
                          </Flex>
                        </Text>
                      </Flex>
                    </RadioGroup.Root>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="3">Custom</Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Flex gap="1" align="center">
                      <TextField.Root>
                        <TextField.Input
                          type="number"
                          value={width}
                          onChange={onChangeWidth}
                        />
                      </TextField.Root>
                      x
                      <TextField.Root>
                        <TextField.Input
                          type="number"
                          value={height}
                          onChange={onChangeHeight}
                        />
                      </TextField.Root>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Inset>
          <Text size="4">Mimic Typos:</Text>
          <RadioGroup.Root
            defaultValue={MimicTypos.NEVER}
            onChange={onChangeTypos}
          >
            <Flex gap="3" direction="row">
              <Text as="label" size="2">
                <Flex gap="1">
                  <RadioGroup.Item value={MimicTypos.NEVER} /> Never
                </Flex>
              </Text>
              <Text as="label" size="2">
                <Flex gap="1">
                  <RadioGroup.Item value={MimicTypos.SOMETIMES} /> Sometimes
                </Flex>
              </Text>
              <Text as="label" size="2">
                <Flex gap="1">
                  <RadioGroup.Item value={MimicTypos.OFTEN} /> Often
                </Flex>
              </Text>
            </Flex>
          </RadioGroup.Root>
        </Flex>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button
              variant="soft"
              color="mint"
              onClick={() => dispatch(resetVideoSettings)}
            >
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="mint">
              Done
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
