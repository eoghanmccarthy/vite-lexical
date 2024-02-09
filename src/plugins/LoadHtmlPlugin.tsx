import * as React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateNodesFromDOM } from "@lexical/html";
import { $getRoot, $insertNodes } from "lexical";

const LoadHtmlPlugin = ({ htmlString = "" }: { htmlString: string }) => {
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

export default LoadHtmlPlugin;
