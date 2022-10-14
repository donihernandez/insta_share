import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

describe('Home', () => {
    it('renders a heading', () => {
        render(<Home session={} />);

        const heading = screen.getByRole('heading', {
            name: /welcome to Insta Share/i,
        });

        expect(heading).toBeInTheDocument();
    });
});
