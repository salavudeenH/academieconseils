export function validateStep1(data) {
  const errors = {}
  
  if (!data.companyName?.trim()) {
    errors.companyName = 'La dénomination sociale est obligatoire'
  } else if (data.companyName.length < 2) {
    errors.companyName = 'La dénomination doit contenir au moins 2 caractères'
  }
  
  if (!data.capital || data.capital < 1) {
    errors.capital = 'Le capital social doit être d\'au moins 1€'
  } else if (data.capital > 10000000) {
    errors.capital = 'Le capital social ne peut dépasser 10 000 000€'
  }
  
  if (!data.purpose?.trim()) {
    errors.purpose = 'L\'objet social est obligatoire'
  } else if (data.purpose.length < 10) {
    errors.purpose = 'L\'objet social doit contenir au moins 10 caractères'
  }
  
  return errors
}

export function validateStep2(data) {
  const errors = {}
  
  if (!data.address?.trim()) {
    errors.address = 'L\'adresse du siège social est obligatoire'
  }
  
  if (!data.postalCode?.trim()) {
    errors.postalCode = 'Le code postal est obligatoire'
  } else if (!/^\d{5}$/.test(data.postalCode)) {
    errors.postalCode = 'Le code postal doit contenir 5 chiffres'
  }
  
  if (!data.city?.trim()) {
    errors.city = 'La ville est obligatoire'
  }
  
  return errors
}

export function validateStep3(data) {
  const errors = {}
  
  if (!data.managerFirstName?.trim()) {
    errors.managerFirstName = 'Le prénom du gérant est obligatoire'
  }
  
  if (!data.managerLastName?.trim()) {
    errors.managerLastName = 'Le nom du gérant est obligatoire'
  }
  
  if (!data.managerAddress?.trim()) {
    errors.managerAddress = 'L\'adresse du gérant est obligatoire'
  }
  
  if (!data.managerPostalCode?.trim()) {
    errors.managerPostalCode = 'Le code postal du gérant est obligatoire'
  } else if (!/^\d{5}$/.test(data.managerPostalCode)) {
    errors.managerPostalCode = 'Le code postal doit contenir 5 chiffres'
  }
  
  if (!data.managerCity?.trim()) {
    errors.managerCity = 'La ville du gérant est obligatoire'
  }
  
  if (!data.shareholders || data.shareholders.length === 0) {
    errors.shareholders = 'Au moins un associé est obligatoire'
  } else {
    const totalShares = data.shareholders.reduce((sum, sh) => sum + (parseInt(sh.shares) || 0), 0)
    if (totalShares !== 100) {
      errors.shareholders = 'La répartition du capital doit totaliser 100%'
    }
    
    data.shareholders.forEach((shareholder, index) => {
      if (!shareholder.name?.trim()) {
        errors[`shareholder_${index}_name`] = 'Le nom de l\'associé est obligatoire'
      }
      if (!shareholder.shares || shareholder.shares < 1 || shareholder.shares > 100) {
        errors[`shareholder_${index}_shares`] = 'Les parts doivent être entre 1% et 100%'
      }
    })
  }
  
  return errors
}

export function validateStep4(data) {
  const errors = {}
  
  if (!data.firstName?.trim()) {
    errors.firstName = 'Le prénom est obligatoire'
  }
  
  if (!data.lastName?.trim()) {
    errors.lastName = 'Le nom est obligatoire'
  }
  
  if (!data.email?.trim()) {
    errors.email = 'L\'email est obligatoire'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Format d\'email invalide'
  }
  
  return errors
}