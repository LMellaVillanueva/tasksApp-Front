interface Errors {
  name: string
  description: string
}

export const validations = (data: Errors): Errors => {
  const errors: Errors = {
    name: '',
    description: ''
  }

  if (data.name.trim().length === 0) errors.name = 'You must type a task name!'
  if (data.name.trim().length > 30) errors.name = 'Name cannot be longer than 20 characters!'
  if (data.description.trim().length === 0) errors.description = 'The task must have a description!'
  if (data.description.trim().length > 70) errors.description = 'Description cannot has more than 70 characters!'

  return errors
}
