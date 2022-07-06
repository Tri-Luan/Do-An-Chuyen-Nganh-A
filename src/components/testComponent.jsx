import CodeMirror from '@uiw/react-codemirror';
import {eclipse} from '@uiw/codemirror-theme-eclipse';
import { javascript } from '@codemirror/lang-javascript';

function TestComponent() {
  return (
    <CodeMirror
      value="console.log('hello world!');"
      height="200px"
      theme={eclipse.extension}
      extensions={[javascript({ jsx: true })]}
    />
  );
}
export default TestComponent;

