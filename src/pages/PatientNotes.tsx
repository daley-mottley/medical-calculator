import React, { useState } from 'react';
import PatientNoteTemplates from '../components/patient-notes/PatientNoteTemplates';
import PatientNoteEditor from '../components/patient-notes/PatientNoteEditor';
import { AppLayout } from '../components/layout/AppLayout';

const PatientNotesPage: React.FC = () => {
  const [templateContentToApply, setTemplateContentToApply] = useState<string | undefined>(undefined);

  const handleUseTemplate = (content: string) => {
    setTemplateContentToApply(content);
  };

  return (
    <AppLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <PatientNoteEditor templateContent={templateContentToApply} />
        </div>
        <div className="md:col-span-1">
          <PatientNoteTemplates onUseTemplate={handleUseTemplate} />
        </div>
      </div>
    </AppLayout>
  );
};

export default PatientNotesPage;
