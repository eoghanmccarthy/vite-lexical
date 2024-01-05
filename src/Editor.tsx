import {$getRoot, $getSelection} from 'lexical';
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import TreeViewPlugin from "./plugins/TreeViewPlugin.tsx";
import ToolbarPlugin from "./plugins/ToolbarPlugin.tsx";
import theme from "./theme";

import './editor.css'

function onError(error) {
    console.error(error);
}

function onChange(editorState) {
    console.log('onChange', editorState)

    const stringifiedEditorState = JSON.stringify(editorState.toJSON());
    console.log("stringifiedEditorState", stringifiedEditorState);

    editorState.read(() => {
        // Read the contents of the EditorState here.
        const root = $getRoot();
        const selection = $getSelection();

        console.log(root, selection);
    });
}

export default function Editor() {
    const initialConfig = {
        namespace: 'MyEditor',
        onError,
        theme,
        nodes: [
            HeadingNode,
            QuoteNode,
            ListNode,
            ListItemNode,
            CodeNode,
            CodeHighlightNode,
            AutoLinkNode,
            LinkNode
        ]
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div className="editor-container">
                <ToolbarPlugin />
                <div className="editor-inner">
                    {/*<PlainTextPlugin*/}
                    {/*    contentEditable={<ContentEditable />}*/}
                    {/*    placeholder={<div>Enter some text...</div>}*/}
                    {/*    ErrorBoundary={LexicalErrorBoundary}*/}
                    {/*/>*/}
                    <RichTextPlugin
                        contentEditable={<ContentEditable className="editor-input" />}
                        placeholder={<Placeholder />}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <OnChangePlugin onChange={onChange} />
                    <ListPlugin />
                    <LinkPlugin />
                    <HistoryPlugin />
                    <TreeViewPlugin />
                </div>
            </div>
        </LexicalComposer>
    );
}

function Placeholder() {
    return <div className="editor-placeholder">Enter some text...</div>;
}
