import { useState } from 'react';
import PropTypes from 'prop-types';

import './style/Faq.css'
import { items } from '/src/assets/data/faq.json'
import Container from 'react-bootstrap/Container'

function Faq() {
    return (
        <Container>
            <div id="page-title">
                <h2>Frequently Asked Questions</h2>
                <p>Check this page first before asking a question in our support server. Your question might already be answered here!</p>
            </div>

            <div id="faq">
                {items.map(({ title, description }, index) =>
                    <FaqItem key={index} title={title} description={description} />
                )}
            </div>
        </Container>
    )
}

function FaqItem({ title, description }) {
    const [state, setState] = useState(false);

    return (
        <div className={`faq-item${state ? " item-expanded" : ""}`} onClick={() => setState(state => !state)}>
            <h4>{title}</h4>
            {state ? <p dangerouslySetInnerHTML={{ __html: description }}></p> : null}
        </div>
    )
}

FaqItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

export default Faq