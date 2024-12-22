import { createTheme, Text } from '@mantine/core';

import '@mantine/core/styles.css';

const theme = createTheme({
    /** Put your mantine theme override here */
    fontFamily: 'Epilogue',
    headings: { fontFamily: 'Montserrat', fontWeight: '600' },
    components: {
        Text: Text.extend({
            defaultProps: {
                c: 'var(--bg-color-secondary)',
                style: {
                    fontWeight: 400,
                },
            },
        }),
    },
});

export default theme;
