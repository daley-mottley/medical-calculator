import React, { useState, useEffect } from 'react';

interface Template {
  id: number;
  name: string;
  content: string;
}

interface PatientNoteTemplatesProps {
  onUseTemplate: (content: string) => void;
}

const PatientNoteTemplates: React.FC<PatientNoteTemplatesProps> = ({ onUseTemplate }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [templates, setTemplates] = useState<Template[]>(() => {
    // Load from local storage on initial render
    const savedTemplates = localStorage.getItem('patientNoteTemplates');
    return savedTemplates ? JSON.parse(savedTemplates) : [];
  });
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateContent, setNewTemplateContent] = useState('');
  const [editedTemplateName, setEditedTemplateName] = useState('');
  const [editedTemplateContent, setEditedTemplateContent] = useState('');


  // Save to local storage whenever templates state changes
  useEffect(() => {
    localStorage.setItem('patientNoteTemplates', JSON.stringify(templates));
  }, [templates]);

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleCancelClick = () => {
    setShowAddForm(false);
    setNewTemplateName('');
    setNewTemplateContent('');
  };

  const handleSaveTemplate = () => {
    if (newTemplateName.trim() && newTemplateContent.trim()) {
      const newTemplate: Template = {
        id: Date.now(), // Simple unique ID
        name: newTemplateName,
        content: newTemplateContent,
      };
    setTemplates([...templates, newTemplate]);
    handleCancelClick(); // Hide form and clear inputs
  } else {
    alert('Please enter both template name and content.');
  }
};

const handleEditClick = (template: Template) => {
  setEditingTemplate(template);
  setEditedTemplateName(template.name);
  setEditedTemplateContent(template.content);
};

const handleCancelEdit = () => {
  setEditingTemplate(null);
  setEditedTemplateName('');
  setEditedTemplateContent('');
};

const handleUpdateTemplate = () => {
  if (editingTemplate && editedTemplateName.trim() && editedTemplateContent.trim()) {
    setTemplates(templates.map(template =>
      template.id === editingTemplate.id
        ? { ...template, name: editedTemplateName.trim(), content: editedTemplateContent.trim() }
        : template
    ));
    handleCancelEdit(); // Hide form and clear inputs
  } else {
    alert('Please enter both template name and content.');
  }
};


const handleDeleteTemplate = (templateId: number) => {
  setTemplates(templates.filter(template => template.id !== templateId));
};

  const handleUseTemplate = (template: Template) => {
    onUseTemplate(template.content);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Patient Note Templates</h2>
        {/* Button to add new template */}
        <button
          className="bg-medical-primary text-primary-foreground px-4 py-2 rounded-md"
          onClick={handleAddClick}
        >
          Add New Template
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border rounded-md">
          <h3 className="text-xl font-semibold mb-4">Add New Template</h3>
          <div>
            <label htmlFor="templateName" className="block text-sm font-medium text-foreground">Template Name</label>
            <input
              type="text"
              id="templateName"
              className="mt-1 block w-full border rounded-md shadow-sm p-2"
              value={newTemplateName}
              onChange={(e) => setNewTemplateName(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="templateContent" className="block text-sm font-medium text-foreground">Template Content</label>
            <textarea
              id="templateContent"
              rows={6}
              className="mt-1 block w-full border rounded-md shadow-sm p-2"
              value={newTemplateContent}
              onChange={(e) => setNewTemplateContent(e.target.value)}
            ></textarea>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={handleSaveTemplate}
            >
              Save Template
            </button>
          </div>
        </div>
      )}

      {editingTemplate && (
         <div className="mb-6 p-4 border rounded-md">
          <h3 className="text-xl font-semibold mb-4">Edit Template</h3>
          <div>
            <label htmlFor="editTemplateName" className="block text-sm font-medium text-foreground">Template Name</label>
            <input
              type="text"
              id="editTemplateName"
              className="mt-1 block w-full border rounded-md shadow-sm p-2"
              value={editedTemplateName}
              onChange={(e) => setEditedTemplateName(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="editTemplateContent" className="block text-sm font-medium text-foreground">Template Content</label>
            <textarea
              id="editTemplateContent"
              rows={6}
              className="mt-1 block w-full border rounded-md shadow-sm p-2"
              value={editedTemplateContent}
              onChange={(e) => setEditedTemplateContent(e.target.value)}
            ></textarea>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={handleUpdateTemplate}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* List of templates */}
      <div className="space-y-4">
        {templates.length === 0 ? (
          <p className="text-muted-foreground">No templates added yet.</p>
        ) : (
          templates.map((template) => (
            <div key={template.id} className="border rounded-md p-4">
              <h3 className="text-lg font-semibold">{template.name}</h3>
              <p className="text-muted-foreground line-clamp-2">{template.content}</p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={() => handleUseTemplate(template)}
                >
                  Use Template
                </button>
                 <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={() => handleEditClick(template)}
                >
                  Edit
                </button>
                 <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={() => handleDeleteTemplate(template.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PatientNoteTemplates;
