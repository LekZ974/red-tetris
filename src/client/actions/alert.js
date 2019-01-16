export const DISPLAY_COMMAND = 'alert/DISPLAY_COMMAND'
export const DISPLAY_CONFIG_FORM = 'alert/DISPLAY_CONFIG_FORM'
export const DISPLAY_RESULT = 'alert/DISPLAY_RESULT'
export const ALERT_INIT = 'alert/ALERT_INIT'

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

export const displayResult = () => {
  return {
    type: DISPLAY_RESULT,
  }
}

export const alertInit = () => {
  return {
    type: ALERT_INIT,
  }
}

