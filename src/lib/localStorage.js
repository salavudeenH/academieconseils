const STORAGE_KEY = 'sarl_form_data'

export function saveFormData(data) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }
}

export function loadFormData() {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : null
  }
  return null
}

export function clearFormData() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY)
  }
}

export function updateFormStep(stepNumber, stepData) {
  const currentData = loadFormData() || {}
  const updatedData = {
    ...currentData,
    [`step${stepNumber}`]: stepData,
    lastStep: stepNumber
  }
  saveFormData(updatedData)
  return updatedData
}