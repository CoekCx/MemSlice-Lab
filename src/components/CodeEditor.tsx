import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';
import '../styles/CodeEditor.css';

interface CodeEditorProps {
    code: string;
    readOnly?: boolean;
    onChange?: (value: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
    code,
    readOnly = false,
    onChange
}) => {
    return (
        <div className="code-editor">
            <AceEditor
                mode="c_cpp"
                theme="monokai"
                value={code}
                onChange={onChange}
                readOnly={readOnly}
                width="100%"
                height="100%"
                fontSize={14}
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={true}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 4,
                }}
            />
        </div>
    );
}; 