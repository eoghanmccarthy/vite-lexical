import * as React from "react";
import { $getRoot, $getSelection } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
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
import { $generateHtmlFromNodes } from "@lexical/html";
import LoadHtmlPlugin from "./plugins/LoadHtmlPlugin.tsx";
import ToolbarPlugin from "./plugins/ToolbarPlugin.tsx";
import theme from "./theme";

import "./editor.css";

const initialConfig = {
  namespace: "MyEditor",
  nodes: [
    HeadingNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    CodeNode,
    CodeHighlightNode,
    AutoLinkNode,
    LinkNode,
  ],
  onError: (error) => {
    console.error(error);
  },
  theme,
};

function onChange(editorState, editor) {
  editorState.read(() => {
    const root = $getRoot();
    const selection = $getSelection();

    const html = $generateHtmlFromNodes(editor);
    // save html to server
  });
}

export default function Editor() {
  // mock html string from server
  const htmlString =
    '<p dir="ltr"><span style="white-space: pre-wrap;">Hello, World!</span></p>';

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            ErrorBoundary={LexicalErrorBoundary}
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
          />
          <OnChangePlugin onChange={onChange} />
          <ListPlugin />
          <LinkPlugin />
          <HistoryPlugin />
          <LoadHtmlPlugin htmlString={htmlString} />
        </div>
      </div>
    </LexicalComposer>
  );
}

function Placeholder() {
  return <div className="editor-placeholder">Enter some text...</div>;
}
