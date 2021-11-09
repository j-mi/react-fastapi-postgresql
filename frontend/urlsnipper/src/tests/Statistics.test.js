import React from 'react';
import { render as rtlRender, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../store';
import Statistics from '../components/Statistics';

const render = (component) => rtlRender(
    <Provider store={store()}>
        {component}
    </Provider>
)

test('render Statistics', () => {
    render(<Statistics />)
    expect(screen.getByText('snipped URL address')).toBeInTheDocument();
    expect(screen.getByText('original URL')).toBeInTheDocument();
    expect(screen.getByText('saved')).toBeInTheDocument();
    expect(screen.getByText('URL clicked')).toBeInTheDocument();
    expect(screen.getByText('action')).toBeInTheDocument();
});