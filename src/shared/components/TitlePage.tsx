import { Helmet } from 'react-helmet';

function TitlePage(props: { content: string }) {
    return (
        <Helmet>
            <title>{props.content}</title>
        </Helmet>
    );
}

export default TitlePage;
