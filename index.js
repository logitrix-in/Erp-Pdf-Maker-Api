const express = require('express');
const app = express();
const fs = require('fs');
const ejs = require('ejs');
const html_to_pdf = require('html-pdf-node');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function generatePdf(data, filePath) {
    try {

        const templateContent = await readFileAsync(filePath, 'utf-8');

        const renderedHtml = ejs.render(templateContent, data);


        let file = {content: renderedHtml};

        const pdfBuffer = html_to_pdf.generatePdf(file, {
            format: 'A4',
        });
        return pdfBuffer;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

app.get('/', (req, res) => {
    res.send('hi');
});

app.post('/admit-card', async (req, res) => {
    const templateFilePath = 'template.ejs';
    const data = req.body.data;
    console.log(data)

    try {
        const pdfBuffer = await generatePdf(data, templateFilePath);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="admit-card.pdf"'
        });
        res.send(pdfBuffer);
    } catch (error) {

        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(8000, () => {
    console.log(`App started at http://localhost:8000`);
});
