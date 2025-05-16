import React, { useState, useEffect } from 'react';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

interface PatientNoteEditorProps {
  initialContent?: string;
  onContentChange?: (content: string) => void;
  templateContent?: string; // New prop to receive template content
}

const PatientNoteEditor: React.FC<PatientNoteEditorProps> = ({
  initialContent = '',
  onContentChange,
  templateContent,
}) => {
  const [noteContent, setNoteContent] = useState(initialContent);

  useEffect(() => {
    if (templateContent) {
      setNoteContent((prevContent) => prevContent + templateContent);
    }
  }, [templateContent]);

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = event.target.value;
    setNoteContent(content);
    if (onContentChange) {
      onContentChange(content);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="patient-note">Patient Note</Label>
      <Textarea
        id="patient-note"
        className="min-h-[300px]"
        value={noteContent}
        onChange={handleContentChange}
        placeholder="Start typing your patient note here..."
      />
    </div>
  );
};

export default PatientNoteEditor;
