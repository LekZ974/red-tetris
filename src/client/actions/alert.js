export const DISPLAY_COMMAND = 'alert/DISPLAY_COMMAND'
export const DISPLAY_CONFIG_FORM = 'alert/DISPLAY_CONFIG_FORM'

export const displayCommand = () => {
  return {
    type: DISPLAY_COMMAND,
  }
}

export const displayConfigForm = () => {
  return {
    type: DISPLAY_CONFIG_FORM,
  }
}

