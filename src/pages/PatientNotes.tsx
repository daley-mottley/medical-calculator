import React from 'react';
import PatientNoteTemplates from '../components/patient-notes/PatientNoteTemplates';
import { AppLayout } from '../components/layout/AppLayout';

const PatientNotesPage: React.FC = () => {
  return (
    <AppLayout>
      <PatientNoteTemplates />
    </AppLayout>
  );
};

export default PatientNotesPage;
