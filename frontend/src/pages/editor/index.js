import React from 'react';
import ReactDOM from 'react-dom';

import Editor from '@monaco-editor/react';

export default function EditorPage() {
  return <Editor height="90vh" defaultLanguage="javascript" defaultValue="// some comment" />;
}