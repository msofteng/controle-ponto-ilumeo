import { createTheme, Text, Title } from '@mantine/core';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';

const theme = createTheme({
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
        Title: Title.extend({
            defaultProps: {
                c: 'var(--bg-color-secondary)',
                style: {
                    fontWeight: 600,
                },
            },
        }),
    },
});

export default theme;
