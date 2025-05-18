export const checkDrugInteractions = async (drugNames: string[]): Promise<any> => {
  console.log('Simulating drug interaction check for:', drugNames);
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock interaction data based on input drug names
  const mockInteractions: any = {};
  if (drugNames.includes('Metoprolol') && drugNames.includes('Diphenhydramine')) {
    mockInteractions['Metoprolol + Diphenhydramine'] = {
      severity: 'Moderate',
      description: 'Increased risk of drowsiness and dizziness.',
    };
  }
  if (drugNames.includes('Metformin') && drugNames.includes('Iodinated Contrast Agents')) {
     mockInteractions['Metformin + Iodinated Contrast Agents'] = {
       severity: 'Severe',
       description: 'Increased risk of lactic acidosis. Metformin should be temporarily discontinued.',
     };
  }
  if (drugNames.includes('Lisinopril') && drugNames.includes('Potassium Supplements')) {
    mockInteractions['Lisinopril + Potassium Supplements'] = {
      severity: 'Moderate',
      description: 'Increased risk of hyperkalemia.',
    };
  }
   if (drugNames.includes('Atorvastatin') && drugNames.includes('Clarithromycin')) {
    mockInteractions['Atorvastatin + Clarithromycin'] = {
      severity: 'Severe',
      description: 'Increased risk of muscle toxicity (myopathy/rhabdomyolysis).',
    };
  }


  if (Object.keys(mockInteractions).length === 0) {
    return { message: 'No significant interactions found for the selected drugs (simulated).' };
  } else {
    return mockInteractions;
  }
};

// Placeholder API client for saving and fetching calculations
// TODO: Replace with actual backend API client implementation
export const apiClient = {
  get: async (url: string) => {
    console.log(`Simulating GET request to: ${url}`);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay

    if (url === '/api/saved-calculations') {
      // Simulate fetching saved calculations from local storage or a mock data source
      const mockSavedCalculations = JSON.parse(localStorage.getItem('mockSavedCalculations') || '[]');
      return { data: mockSavedCalculations };
    }

    // Default response for other GET requests
    return { data: [] };
  },
  post: async (url: string, data: any) => {
    console.log(`Simulating POST request to: ${url} with data:`, data);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay

    if (url === '/api/saved-calculations') {
      // Simulate saving calculation to local storage
      const mockSavedCalculations = JSON.parse(localStorage.getItem('mockSavedCalculations') || '[]');
      const newCalculation = { ...data, id: Date.now().toString(), timestamp: new Date().toISOString() };
      mockSavedCalculations.push(newCalculation);
      localStorage.setItem('mockSavedCalculations', JSON.stringify(mockSavedCalculations));
      console.log('Calculation saved (simulated):', newCalculation);
      return { data: newCalculation };
    }

    if (url === '/api/send-suggestion') {
      // Simulate sending suggestion to admin email
      console.log(`Suggestion sent to admin (${data.to}):`, data.suggestion);
      return { data: { success: true } };
    }

    // Default response for other POST requests
    return { data: {} };
  },
  // Add other HTTP methods (put, patch, delete) as needed
};
