import { render } from 'vue-testing-library'
import App from './App.vue'

it('render App', () => {
  const { getByTestId } = render(App)
  expect(getByTestId('app')).toBeInTheDocument()
})
