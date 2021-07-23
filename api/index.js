function clone(objArr) {
  return objArr.map(x => ({...x}))
}

export function fetchTodaysMedication () {
  return Promise.resolve(clone(todaysMedications))
}

const todaysMedications = [
  {
    name: "Vitamin C",
    isTaken: false,
    dueTime: 6,
    dosage: 1,
    dosageType: 'tablet'
  },
  {
    name: "Magnesium",
    isTaken: false,
    dueTime: 6,
    dosage: 1,
    dosageType: 'tablet'
  },
  {
    name: "Prednisolone",
    isTaken: false,
    dueTime: 6,
    dosage: 1,
    dosageType: 'pill'
  },
  {
    name: "Lisinopril",
    isTaken: true,
    dueTime: 6,
    dosage: 1,
    dosageType: 'pill'
  },
  {
    name: "Iron",
    isTaken: true,
    dueTime: 6,
    dosage: 1,
    dosageType: 'pill'
  },
  {
    name: "Vitamin D",
    isTaken: true,
    dueTime: 6,
    dosage: 2,
    dosageType: 'pill'
  },
  {
    name: "Magnesium",
    isTaken: false,
    dueTime: 17,
    dosage: 1,
    dosageType: 'tablet'
  },
  {
    name: "Prednisolone",
    isTaken: false,
    dueTime: 17,
    dosage: 1,
    dosageType: 'tablet'
  },
]

export function fetchBuddies () {
  return Promise.resolve(clone(buddyList))
}

const buddyList = [
  {
    id: 211,
    name: 'ArleneRichards'
  },
  {
    id: 540,
    name: 'Rebecca Johnson'
  },
  {
    id: 461,
    name: 'Tushar Gupta'
  }
]

export function fetchMedicationAdherence(id) {
  return Promise.resolve(medicationAdherence[id])
}

const medicationAdherence = {
  211: 90.213,
  540: 95.988,
  461: 87.002
}