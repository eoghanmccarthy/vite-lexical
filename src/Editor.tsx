import * as React from "react";
import { $getRoot, $getSelection, $insertNodes } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
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
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
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

    // https://github.com/facebook/lexical/issues/2325
    // https://stackoverflow.com/questions/75292778/how-do-i-parse-the-html-from-the-lexical-editorstate-without-an-extra-lexical-ed
    const html = $generateHtmlFromNodes(editor);
    // save html to server
  });
}

const LoadHtmlPlugin = ({ htmlString }) => {
  const firstRender = React.useRef(true);
  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    editor.update(() => {
      if (!firstRender.current) {
        return;
      }

      const parser = new DOMParser();
      const dom = parser.parseFromString(htmlString, "text/html");

      const nodes = $generateNodesFromDOM(editor, dom);

      const root = $getRoot();
      root.clear();
      root.select();

      $insertNodes(nodes);

      firstRender.current = false;
    });
  }, []);

  return null;
};

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
