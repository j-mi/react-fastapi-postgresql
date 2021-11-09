import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../store';
import App from '../App';

const render = (component) => rtlRender(
    <Provider store={store()}>
        {component}
    </Provider>
)

test('render App', () => {
  render(<App />);
});
