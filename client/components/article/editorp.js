import React, { useState, useEffect, useRef } from 'react'
import {
  Image,
  ImageCaption,
  ImageResize,
  ImageToolbar,
} from '@ckeditor/ckeditor5-image'
import { LinkImage } from '@ckeditor/ckeditor5-link'

function EditorH1({ onChange, editorLoaded, name, value }) {
  const editorRef = useRef()
  const { CKEditor, ClassicEditor } = editorRef.current || {}

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    }
  }, [])

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          type=""
          name={name}
          editor={ClassicEditor}
          config={
            ({
              plugins: [
                Image,
                ImageToolbar,
                ImageCaption,
                ImageResize,
                LinkImage,
              ],
              toolbar: [
                'imageUpload',
                '|',
                'imageStyle:full',
                'imageStyle:side',
                '|',
                'imageTextAlternative',
              ],
            },
            {
              ckfinder: {
                // Upload the images to the server using the CKFinder QuickUpload command
                // You have to change this address to your server that has the ckfinder php connector
                uploadUrl: '', //Enter your upload url
              },
            })
          }
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData()
            // console.log({ event, editor, data })
            onChange(data)
          }}
        />
      ) : (
        <div>Heading 1</div>
      )}
    </div>
  )
}

export default EditorH1
