import React from 'react';
import { render as rtlRender, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import store from '../store';
import InputURLTextField from '../components/InputURLTextField';

const render = (component) => rtlRender(
    <Provider store={store()}>
        {component}
    </Provider>
)

test('Landing page', () => {
    render(<InputURLTextField />)
    expect(screen.getByText(/no valid URL/i)).toBeInTheDocument();
    expect(screen.getByText(/get shorter link/i)).toBeDisabled()
});

test('Textfield input', () => {
    render(<InputURLTextField />)
    fireEvent.change(screen.getByLabelText("URL"), {target: {value: 'www'}});
    expect(screen.getByLabelText("URL").value).toBe('www');
  });

test('no valid URL input', async () => {
    render(<InputURLTextField />)
    userEvent.type(screen.getByLabelText("URL"), "lorum ipsum")
    await waitFor(() => {
        expect(screen.getByLabelText("URL")).toHaveValue("lorum ipsum");
        expect(screen.getByText(/no valid URL/i)).toBeInTheDocument();
        expect(screen.getByText(/get shorter link/i)).toBeDisabled();
    });
});

test('valid URL input', async () => {
    render(<InputURLTextField />)
    userEvent.type(screen.getByLabelText("URL"), "https://www.google.com")
    await waitFor(() => {
        expect(screen.getByLabelText("URL")).toHaveValue("https://www.google.com");
        expect(screen.getByText(/valid URL/i)).toBeInTheDocument();
        expect(screen.getByText(/get shorter link/i)).toBeEnabled();
    });
});

