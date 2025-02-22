import { Card, Flex, Switch, Text } from '@radix-ui/themes';
import * as React from 'react';
import { useState } from 'react';
import { ActionEditor } from './ActionEditor';
import { SimpleEditor } from './SimpleEditor';
import { IAction } from '@fullstackcraftllc/codevideo-types';

export interface IToggleEditorProps {
    actions: Array<IAction>;
    setActions: (actions: Array<IAction>) => void;
    stepsJson: string;
    setStepsJson: (stepsJson: string) => void;
    tokenizerCode: string;
}

export function ToggleEditor(props: IToggleEditorProps) {
    const { actions, setActions, stepsJson, setStepsJson, tokenizerCode } = props;
    const [editorMode, setEditorMode] = useState(true);
    return (
        <Card>
            <Flex gap="5" mb="2" direction="row" justify="center" align="center">
                <Switch
                    defaultChecked
                    onCheckedChange={() => setEditorMode(!editorMode)}
                />
                <Text>{editorMode ? "Editor" : "JSON"} Mode</Text>
            </Flex>
            {editorMode ? (
                <ActionEditor actions={actions} setActions={setActions} />
            ) : (
                <SimpleEditor
                    path="json/"
                    value={stepsJson}
                    actions={[]}
                    language="json"
                    tokenizerCode={tokenizerCode}
                    onChangeCode={(code) => {
                        if (code) {
                            setStepsJson(code);
                        }
                    }}
                    focus={false}
                    withCard={false}
                />
            )}
        </Card>
    );
}
