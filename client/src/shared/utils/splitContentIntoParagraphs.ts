export const splitContentIntoParagraphs = (content: string,
                                           sentencesPerParagraph: number = 10) => {
    if (!content) {
        return [];
    }

    const sentences = content.match(/[^.!?]+[.!?]+/g) || [];
    const paragraphs = [];

    for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
        const paragraph = sentences.slice(i, i + sentencesPerParagraph).join(' ').trim();
        paragraphs.push(paragraph);
    }

    return paragraphs;
};
