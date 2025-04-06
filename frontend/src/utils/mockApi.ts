interface MockResponse {
  diagnosis: string;
  positive: number;
  recommendations: string[];
}

interface SkinAdvice {
  Info: string;
  "At-Home Treatment": string;
  "Clinical Treatment": string;
  Severity: string;
}

interface SkinResponse {
  prediction: string;
  advice: SkinAdvice;
  confidence: number;
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

export const mockSkinPredict = async (file: File): Promise<SkinResponse> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  file;

  return {
    prediction: "Melanoma",
    confidence: 0.87,
    advice: {
      "Info": "Skin cancer is a type of cancer that develops in the skin cells, with the most common types being basal cell carcinoma, squamous cell carcinoma, and melanoma. Skin cancer can be caused by exposure to ultraviolet (UV) radiation from the sun or tanning beds, as well as genetic factors. Symptoms may include changes in the size, shape, or color of a mole or skin lesion, itching, bleeding, or crustiness.",
      "At-Home Treatment": "While skin cancer typically requires medical treatment, some at-home steps can help with prevention and recovery. These include avoiding further sun exposure, keeping the affected area clean and dry, and applying topical creams or ointments as directed by a healthcare professional. Additionally, maintaining a healthy diet and staying hydrated can help support the body's overall health.",
      "Clinical Treatment": "Clinical treatment options for skin cancer depend on the type, size, and location of the cancer, as well as the individual's overall health. Common treatments include surgical excision, topical creams or ointments, radiation therapy, and immunotherapy. In some cases, a combination of these treatments may be used. A healthcare professional can determine the best course of treatment and develop a personalized plan.",
      "Severity": "High - Skin cancer can be life-threatening if left untreated, and prompt medical attention is essential. It is crucial to follow the recommended treatment plan and attend all scheduled follow-up appointments to ensure the best possible outcome. One should consult a healthcare professional for personalized medical advice, as they can provide tailored guidance and support throughout the treatment process."
    }
  };
}; 