export function load (component) {
  return () => System.import(`components/${component}.vue`)
}
