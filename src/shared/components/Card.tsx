import { Card as CardMantine } from '@mantine/core';
import { ComponentProps, ReactElement } from 'react';

function Card(props: { content: ReactElement; cardProps?: ComponentProps<typeof CardMantine> }) {
    return (
        <CardMantine {...props.cardProps} className='shadow-card'>
            {props.content}
        </CardMantine>
    );
}

export default Card;
