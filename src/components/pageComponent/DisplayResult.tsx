'use client';

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

interface AiResponseItem {
    question: string;
    answer: string;
}

interface DisplayResultProps {
    aiResponse: AiResponseItem[] | null;
}

const DisplayResult: React.FC<DisplayResultProps> = ({ aiResponse }) => {
    return (
        <>
            {aiResponse?.map((item, index) => (
                <div key={index}>
                    <Accordion type="single" collapsible>
                        <AccordionItem value={`item-${index}`}>
                            <AccordionTrigger>{item.question}</AccordionTrigger>
                            <AccordionContent>{item.answer}</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            ))}
        </>
    );
};

export default DisplayResult;
