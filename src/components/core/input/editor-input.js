import React from "react";
import {Editor} from "react-draft-wysiwyg";

import useEditorInput from "./hook/editor-input";


import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


function EditorInput(props) {

  const { title } = props;

  const {
    editorState,
    onUploadImage,
    onEditorStateChange
  } = useEditorInput(props);

  return (
    <>
      <label>{title}</label>
      <div className="editor-input">
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            toolbar={
                {
                    image: { uploadCallback: onUploadImage, alt: { present: true, mandatory: true } },
                }
            }
          ></Editor>
      </div>
    </>
    
);
}

export default EditorInput;
