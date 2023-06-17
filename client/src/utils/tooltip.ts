export const tooltip = (title: string) => {
  return {
    'data-te-toggle': 'tooltip',
    'data-te-placement': 'bottom',
    'data-te-ripple-init': true,
    'data-te-ripple-color': 'light',
    title: title,
  }
}
