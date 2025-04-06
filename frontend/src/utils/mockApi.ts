interface MockResponse {
  diagnosis: string;
  positive: number;
  recommendations: string[];
}

export const mockPredict = async (file: File): Promise<MockResponse> => {
  
  await new Promise(resolve => setTimeout(resolve, 1500));
  file;

  return {
    diagnosis: Math.random() > 0.5 ? 'Cancer' : 'Benign',
    positive: Math.random(),
    recommendations: [
      'Please consult a dermatologist for a professional evaluation.',
      'Regular monitoring of skin changes is recommended.',
      'Keep track of any changes in size, shape, or color.'
    ]
  };
}; 