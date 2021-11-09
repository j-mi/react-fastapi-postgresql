import React from 'react';
import { render, screen } from '@testing-library/react';
import NavigationItems from '../components/Navigation/NavigationItems/NavigationItems';
import { BrowserRouter } from 'react-router-dom';


test('render NavigationItems', () => {
    render(<BrowserRouter>
      <NavigationItems />
    </BrowserRouter>);

    expect(screen.getByText('snipper')).toBeInTheDocument();
    expect(screen.getByText('statistics')).toBeInTheDocument();
});
