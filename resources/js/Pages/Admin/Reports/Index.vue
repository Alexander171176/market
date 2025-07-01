<script setup>
import {ref, watch, onMounted} from 'vue';
import {useI18n} from 'vue-i18n';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue';
import * as XLSX from 'xlsx';

// @ts-ignore
import html2pdf from 'html2pdf.js';
import JSZip from 'jszip';

// @ts-ignore
import {saveAs} from 'file-saver';

import {Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType, PageOrientation, TextRun} from 'docx';

const {t} = useI18n();

// reportType может принимать значения: 'rubrics', 'articles', 'sections'
const reportType = ref('rubrics');
const items = ref([]);
const selectedFields = ref([]);
const currentDate = new Date().toLocaleDateString('ru-RU');
const currentDateTime = new Date().toISOString().slice(0, 19).replace(/:/g, '-');

const fetchData = async () => {
    try {
        const response = await fetch(`/admin/reports?type=${reportType.value}`, {
            headers: {'Accept': 'application/json'}
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        items.value = data.data;
        if (data.data.length > 0) {
            selectedFields.value = Object.keys(data.data[0]);
        }
    } catch (error) {
        console.error('Не удалось получить данные:', error);
    }
};

watch(reportType, fetchData);
onMounted(fetchData);

const formatData = (data) => {
    return data.map(item => {
        const newItem = {};
        selectedFields.value.forEach(field => {
            if (field === 'rubrics' && Array.isArray(item[field])) {
                newItem[field] = item[field].map(rubric => rubric.title).join(', ');
            }
            else if (field === 'sections' && Array.isArray(item[field])) {
                newItem[field] = item[field].map(section => section.title).join(', ');
            }
            else if (field === 'articles' && Array.isArray(item[field])) {
                newItem[field] = item[field].map(article => article.title).join(', ');
            }
            else {
                newItem[field] = item[field];
            }
        });
        if (typeof newItem.activity === 'boolean') {
            newItem.activity = newItem.activity ? 'true' : 'false';
        }
        return newItem;
    });
};

const downloadReport = (format) => {
    switch (format) {
        case 'csv':
            downloadCSV();
            break;
        case 'xls':
            downloadXLS();
            break;
        case 'pdf':
            downloadPDF();
            break;
        case 'zip':
            downloadZIP();
            break;
        case 'docx':
            downloadDOCX();
            break;
    }
};

const downloadCSV = () => {
    const formattedData = formatData(items.value);
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob(["\uFEFF" + csvOutput], {type: 'text/csv;charset=utf-8;'});
    saveAs(blob, `reports_${reportType.value}_${currentDateTime}.csv`);
};

const downloadXLS = () => {
    const formattedData = formatData(items.value);
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    const xlsOutput = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    const blob = new Blob([xlsOutput], {type: 'application/octet-stream'});
    saveAs(blob, `reports_${reportType.value}_${currentDateTime}.xlsx`);
};

const downloadPDF = () => {
    const formattedData = formatData(items.value);
    const tableHeaders = selectedFields.value.map(field => `<th style="padding: 5px; border: 1px solid black;">${field}</th>`).join('');
    const tableRows = formattedData.map(item => {
        const row = selectedFields.value.map(field => `<td style="padding: 5px; padding-bottom: 10px; border: 1px solid black;">${item[field]}</td>`).join('');
        return `<tr>${row}</tr>`;
    }).join('');

    const htmlContent = `
    <html>
      <head>
        <style>
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { padding: 5px; border: 1px solid black; vertical-align: top; }
          h1 { margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <h1>Отчёт: ${reportType.value === 'rubrics' ? 'Рубрики' : (reportType.value === 'sections' ? 'Секции' : 'Статьи')} - ${currentDate}</h1>
        <table>
          <thead><tr>${tableHeaders}</tr></thead>
          <tbody>${tableRows}</tbody>
        </table>
      </body>
    </html>
  `;

    const options = {
        margin: 0.5,
        filename: `reports_${reportType.value}_${currentDateTime}.pdf`,
        image: {type: 'jpeg', quality: 0.98},
        html2canvas: {scale: 2, logging: true, letterRendering: true, useCORS: true},
        jsPDF: {unit: 'in', format: 'a4', orientation: 'landscape'}
    };

    html2pdf().from(htmlContent).set(options).save();
};

const downloadZIP = async () => {
    const zip = new JSZip();

    const formattedData = formatData(items.value);
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    const csvBlob = new Blob(["\uFEFF" + csvOutput], {type: 'text/csv;charset=utf-8;'});
    zip.file(`reports_${reportType.value}_${currentDateTime}.csv`, csvBlob);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    const xlsOutput = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    const xlsBlob = new Blob([xlsOutput], {type: 'application/octet-stream'});
    zip.file(`reports_${reportType.value}_${currentDateTime}.xlsx`, xlsBlob);

    const element = document.querySelector('#reportContent');
    const pdfOptions = {
        margin: 0.5,
        filename: `reports_${reportType.value}_${currentDateTime}.pdf`,
        image: {type: 'jpeg', quality: 0.98},
        html2canvas: {scale: 2, logging: true, letterRendering: true, useCORS: true},
        jsPDF: {unit: 'in', format: 'a4', orientation: 'landscape'}
    };

    const pdfBlob = await html2pdf().from(element).set(pdfOptions).output('blob');
    zip.file(`reports_${reportType.value}_${currentDateTime}.pdf`, pdfBlob);

    const doc = createDOCX();
    const docBlob = await Packer.toBlob(doc);
    zip.file(`reports_${reportType.value}_${currentDateTime}.docx`, docBlob);

    const content = await zip.generateAsync({type: 'blob'});
    saveAs(content, `reports_${reportType.value}_${currentDateTime}.zip`);
};

const downloadDOCX = () => {
    const doc = createDOCX();
    Packer.toBlob(doc).then(blob => {
        saveAs(blob, `reports_${reportType.value}_${currentDateTime}.docx`);
    });
};

const createDOCX = () => {
    const formattedData = formatData(items.value);
    const tableRows = [
        new TableRow({
            children: selectedFields.value.map(key => new TableCell({
                children: [new Paragraph({
                    children: [new TextRun(key)],
                    spacing: {after: 200}
                })]
            }))
        })
    ];

    formattedData.forEach(item => {
        const row = new TableRow({
            children: selectedFields.value.map(key => new TableCell({
                children: [new Paragraph({
                    children: [new TextRun(String(item[key]))],
                    spacing: {after: 200}
                })]
            }))
        });
        tableRows.push(row);
    });

    return new Document({
        sections: [
            {
                properties: {page: {size: {orientation: PageOrientation.LANDSCAPE}}},
                children: [
                    new Paragraph({
                        text: `Отчёт: ${reportType.value === 'rubrics' ? 'Рубрики' : (reportType.value === 'sections' ? 'Секции' : 'Статьи')} - ${currentDate}`,
                        heading: 'Heading1',
                        spacing: {after: 400}
                    }),
                    new Table({
                        rows: tableRows,
                        width: {size: 100, type: WidthType.PERCENTAGE}
                    })
                ]
            }
        ]
    });
};
</script>

<template>
    <AdminLayout :title="t('reports')">
        <template #header>
            <TitlePage>{{ t('reports') }}</TitlePage>
        </template>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">
            <div class="sm:flex sm:justify-between sm:items-center mb-4
                  p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200
                  overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400
                  bg-opacity-95 dark:bg-opacity-95">
                <div>
                    <label for="reportType" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {{ t('selectReportType') }}
                    </label>
                    <select id="reportType" v-model="reportType"
                            class="mt-1 block w-full py-1 px-3 border border-gray-300 bg-white dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="rubrics">Рубрики</option>
                        <option value="articles">Статьи</option>
                        <option value="sections">Секции</option>
                    </select>
                </div>
                <div class="mt-4 sm:mt-0 sm:ml-4">
                    <button @click="downloadReport('csv')"
                            class="inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
                        CSV
                    </button>
                    <button @click="downloadReport('xls')"
                            class="ml-2 inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                        Excel
                    </button>
                    <button @click="downloadReport('docx')"
                            class="ml-2 inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                        Word
                    </button>
                    <button @click="downloadReport('pdf')"
                            class="ml-2 inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                        PDF
                    </button>
                    <button @click="downloadReport('zip')"
                            class="ml-2 inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700">
                        ZIP
                    </button>
                </div>
            </div>
            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200
                  overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400
                  bg-opacity-95 dark:bg-opacity-95">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {{ t('selectFieldsPrint') }}
                </label>
                <div class="mt-2 grid grid-cols-4 gap-2">
                    <div v-for="(value, key) in items[0]" :key="key">
                        <input type="checkbox" v-model="selectedFields" :value="key"
                               class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out">
                        <span class="ml-2 text-gray-700 dark:text-gray-300">{{ key }}</span>
                    </div>
                </div>
            </div>

            <div ref="reportContent" id="reportContent"
                 class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200
                  overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400
                  bg-opacity-95 dark:bg-opacity-95 text-xs">
                <h1 class="text-md font-semibold mb-4 dark:text-white">
                    {{ t('report') }}
                    {{ reportType === 'rubrics' ? 'Рубрики' : (reportType === 'sections' ? 'Секции' : 'Статьи') }} -
                    {{ currentDate }}
                </h1>
                <div class="overflow-x-auto mb-2">
                    <div class="h-2"></div>
                </div>
                <div class="overflow-x-auto">
                    <table class="min-w-full bg-white dark:bg-gray-800 dark:text-white text-xxs">
                        <thead>
                        <tr class="dark:text-slate-700">
                            <th v-for="key in selectedFields" :key="key"
                                class="px-4 py-1 dark:bg-gray-900 dark:text-white">{{ key }}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in items" :key="item.id"
                            class="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                            <td v-for="key in selectedFields" :key="key"
                                :class="{'truncate': key === 'url' || key === 'image_url'}" class="px-4 py-1">
                                {{ item[key] }}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="overflow-x-auto mt-2">
                    <div class="h-2"></div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
    font-size: 10px;
}

th {
    background-color: #f2f2f2;
}

.truncate {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.dark th {
    background-color: #374151;
    color: #ffffff;
}
</style>
