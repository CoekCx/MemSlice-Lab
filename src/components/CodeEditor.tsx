import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/ext-language_tools';
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
                theme="tomorrow_night"
                value={code}
                onChange={onChange}
                readOnly={readOnly}
                name="code-editor"
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 4,
                    lineHeight: 2,
                }}
                width="100%"
                height="100%"
                fontSize={25}
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={!readOnly}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
}; 