// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// export const generateWillPDF = (willData) => {
//     return new Promise((resolve) => {
//         const doc = new jsPDF();
//         const pageWidth = doc.internal.pageSize.getWidth();
//         const pageHeight = doc.internal.pageSize.getHeight();
//         const margin = 15;
//         const headerHeight = 30;
//         const footerHeight = 20;
//         const maxWritableY = pageHeight - footerHeight;
//         let yPos = headerHeight;

//         // --- Reusable Helper Functions ---

//         const addHeader = () => {
//             doc.setFontSize(16);
//             doc.setFont('helvetica', 'bold');
//             doc.text('Last Will and Testament', pageWidth / 2, 15, { align: 'center' });
//             doc.setDrawColor(180, 180, 180);
//             doc.line(margin, 22, pageWidth - margin, 22);
//         };

//         const addFooter = () => {
//             const pageCount = doc.internal.getNumberOfPages();
//             for (let i = 1; i <= pageCount; i++) {
//                 doc.setPage(i);
//                 doc.setFontSize(9);
//                 doc.setFont('helvetica', 'italic');
//                 const footerTextLeft = `Will of ${willData.testator.name}`;
//                 const footerTextRight = `Page ${i} of ${pageCount}`;
//                 doc.text(footerTextLeft, margin, pageHeight - 10);
//                 doc.text(footerTextRight, pageWidth - margin, pageHeight - 10, { align: 'right' });
//             }
//         };

//         const checkPageBreak = (currentY, requiredHeight) => {
//             if (currentY + requiredHeight > maxWritableY) {
//                 doc.addPage();
//                 addHeader();
//                 return headerHeight; // Return new starting Y position
//             }
//             return currentY; // Return original Y position
//         };

//         const addSectionTitle = (title) => {
//             yPos = checkPageBreak(yPos, 20);
//             doc.setFontSize(12);
//             doc.setFont('helvetica', 'bold');
//             doc.text(title, margin, yPos);
//             yPos += 10;
//         };

//         const addParagraph = (text) => {
//             doc.setFontSize(11);
//             doc.setFont('helvetica', 'normal');
//             const splitText = doc.splitTextToSize(text, pageWidth - 2 * margin);
//             const textHeight = splitText.length * 7;
//             yPos = checkPageBreak(yPos, textHeight + 5);
//             doc.text(splitText, margin, yPos);
//             yPos += textHeight + 5;
//         };

//         // --- Document Generation Flow ---

//         // Start with the header on the first page
//         addHeader();

//         // 1. Declaration
//         const declarationText = `I, ${willData.testator.name}, son of ${willData.testator.fatherName}, residing at ${willData.testator.address} declare this to be my LAST WILL being made on ${new Date(willData.testator.date).toLocaleDateString()}.\n\nI revoke all prior wills, codicils & testamentary dispositions previously made by me. I am in good health and of sound mind, and am not making this will under any persuasion or coercion.\n\nI give, devise and bequeath all remaining movable and immovable assets, financial and physical assets owned by me and belonging to no one else to the following Beneficiaries as mentioned in this Will:`;
//         addParagraph(declarationText);
//         yPos += 5;

//         // 2. Beneficiaries Table
//         yPos = checkPageBreak(yPos, 40); // Check space before starting table
//         addSectionTitle('List of Beneficiaries');
//         autoTable(doc, {
//             startY: yPos,
//             head: [['S.N', 'Name of Beneficiary', 'Relationship', 'PAN / Aadhar No', 'Place of Residence', 'Age']],
//             body: willData.beneficiaries.map((b, i) => [i + 1, b.name, b.relationship, b.panAadhar || 'N/A', b.residence || 'N/A', b.age || 'N/A']),
//             theme: 'grid',
//             headStyles: { fillColor: [62, 81, 102], textColor: 255 },
//             didDrawPage: (data) => {
//                 // Add header to new pages created by autoTable
//                 addHeader();
//             }
//         });
//         yPos = doc.lastAutoTable.finalY + 15;

//         // 3. Asset Distribution
//         yPos = checkPageBreak(yPos, 20);
//         addParagraph('Below is the list of Assets and Percentage Share of each asset I would like to transfer to the above Beneficiaries:');
        
//         const categoryHeadings = {
//             'I. Movable Assets (Financial Assets)': ['Bank Accounts', 'Insurance Policies', 'Stocks', 'Mutual Funds'],
//             'II. Movable Assets (Physical Assets)': ['Jewellery'],
//             'III. Immovable Assets': ['House', 'Land'],
//         };

//         Object.entries(categoryHeadings).forEach(([mainHeading, subCategories]) => {
//             const assetsInMainCategory = willData.assets.filter(a => subCategories.includes(a.category));
//             if (assetsInMainCategory.length > 0) {
//                 yPos = checkPageBreak(yPos, 25);
//                 addSectionTitle(mainHeading);

//                 subCategories.forEach((category, subIndex) => {
//                     const assetsInCategory = willData.assets.filter(a => a.category === category);
//                     if (assetsInCategory.length > 0) {
//                         yPos = checkPageBreak(yPos, 30);
//                         doc.setFontSize(11);
//                         doc.setFont('helvetica', 'bolditalic');
//                         doc.text(`${String.fromCharCode(97 + subIndex)}. ${category}`, margin, yPos);
//                         yPos += 8;

//                         const head = [['S.N', assetsInCategory[0].field1_label, assetsInCategory[0].field2_label, assetsInCategory[0].field3_label || 'Type / Remark', 'Beneficiary’s Name', '% Share']];
//                         const body = assetsInCategory.map((a, i) => [i + 1, a.field1_value, a.field2_value, a.field3_value || 'N/A', a.beneficiaryName, `${a.share}%`]);
                        
//                         autoTable(doc, {
//                             startY: yPos,
//                             head,
//                             body,
//                             theme: 'grid',
//                             headStyles: { fillColor: [230, 230, 230], textColor: 0, fontSize: 9, fontStyle: 'bold' },
//                             bodyStyles: { fontSize: 9 },
//                             didDrawPage: (data) => { addHeader(); }
//                         });
//                         yPos = doc.lastAutoTable.finalY + 10;
//                     }
//                 });
//             }
//         });
//         yPos += 5;

//         // 4. Special Clauses
//         if (willData.residueClause?.beneficiaryName) {
//             addSectionTitle('Residue Assets:');
//             addParagraph(`I have mentioned all the assets that I Possess. In case if anything is left out or if I Purchase anything after this Will is made then it should be transferred to my Wife, ${willData.residueClause.beneficiaryName}, Completely.`);
//         }

//         if (willData.guardian?.name) {
//             yPos = checkPageBreak(yPos, 20);
//             addSectionTitle('Guardian:');
//             doc.setFontSize(11);
//             doc.setFont('helvetica', 'normal');
//             const guardianText = willData.residueClause?.beneficiaryName
//             ? `If my wife ${willData.residueClause.beneficiaryName} predeceases me, I appoint my ${willData.guardian.relation} Mr. ${willData.guardian.name} as the guardian for my children ${willData.guardian.childrenNames} till they turn age 21.`
//             : `I appoint my ${willData.guardian.relation} Mr. ${willData.guardian.name} as the guardian for my minor children ${willData.guardian.childrenNames} till they turn age 21.`;
//             addParagraph(guardianText + " He shall be responsible for taking care of their assets till age 21 and handing over the assets thereafter.");
//             yPos += 5;
//         }

//         addSectionTitle('Discharge of Liabilities:');
//         addParagraph('On my death, the beneficiaries shall equally bear the administration expenses of Will Execution. And shall discharge my debts and liabilities from the respective assets attached to them, if any.');
//         yPos += 5;

//         // 5. Executors
//         addSectionTitle('Executors:');
//         const primaryExecutor = willData.executors.find(e => !e.isAlternate);
//         const alternateExecutor = willData.executors.find(e => e.isAlternate);
//         let executorText = `I appoint my ${primaryExecutor.relation || 'executor'} ${primaryExecutor.name}, son of ${primaryExecutor.fatherName}, resident of ${primaryExecutor.address}, to be the executor of this will.`;
//         if (alternateExecutor) {
//             executorText += ` If ${primaryExecutor.name} is unable or unwilling to act, I appoint my ${alternateExecutor.relation || 'alternate executor'} ${alternateExecutor.name}, daughter of ${alternateExecutor.fatherName}, resident of ${alternateExecutor.address}, to be the executor of this will.`;
//         }
//         addParagraph(executorText);
//         yPos += 5;

//         // 6. Signature Block
//         yPos = checkPageBreak(yPos, 100); // Reserve a large block for signatures
//         addParagraph(`I hereby sign this will on ${new Date().toLocaleDateString()}, at _____________ in the presence of the following persons who have witnessed this will in my presence:`);
//         yPos += 25;

//         const signatureBlock = (title, startX, startY) => {
//             doc.setFontSize(10);
//             doc.text('_________________________', startX, startY);
//             doc.text(`${title} (Sign)`, startX, startY + 6);
//             doc.text('Name:', startX, startY + 12);
//             doc.text('Address:', startX, startY + 18);
//             doc.text('Date:', startX, startY + 24);
//         };

//         signatureBlock('Witness 1', margin, yPos);
//         signatureBlock('Witness 2', pageWidth / 2, yPos);
//         yPos += 45;
//         signatureBlock('Testator', margin, yPos);

//         // --- Finalize Document ---
//         addFooter();
//         doc.save(`Will_of_${willData.testator.name.replace(/\s+/g, '_')}.pdf`);
//         resolve();
//     });
// };


import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateWillPDF = (willData) => {
    return new Promise((resolve) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        const headerHeight = 35;
        const footerHeight = 25;
        const maxWritableY = pageHeight - footerHeight;
        let yPos = headerHeight;

        // --- Color Scheme & Styles ---
        const primaryColor = [61, 90, 128];       // Dark blue
        const secondaryColor = [152, 193, 217];    // Light blue
        const accentColor = [224, 122, 95];        // Coral accent
        const lightBg = [240, 245, 249];           // Light background
        const darkText = [30, 30, 30];             // Dark text

        // Track if we're on first page
        let isFirstPage = true;
        
        // --- Reusable Helper Functions ---
        const addHeader = () => {
            // Header background
            doc.setFillColor(...primaryColor);
            doc.rect(0, 0, pageWidth, headerHeight - 5, 'F');
            
            // Title
            doc.setFontSize(isFirstPage ? 18 : 16);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(255, 255, 255);
            doc.text('LAST WILL AND TESTAMENT', pageWidth / 2, 15, { align: 'center' });
            
            // Testator info
            doc.setFontSize(10);
            doc.text(`of ${willData.testator.name}`, pageWidth / 2, isFirstPage ? 25 : 22, { align: 'center' });
            
            // Reset text color
            doc.setTextColor(...darkText);
        };

        const addFooter = () => {
            const pageCount = doc.internal.getNumberOfPages();
            
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                
                // Footer line
                doc.setDrawColor(200, 200, 200);
                doc.line(margin, pageHeight - footerHeight + 5, pageWidth - margin, pageHeight - footerHeight + 5);
                
                // Footer text
                doc.setFontSize(9);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(100, 100, 100);
                
                const footerTextLeft = `Generated on ${new Date().toLocaleDateString()}`;
                const footerTextCenter = `Will of ${willData.testator.name}`;
                const footerTextRight = `Page ${i} of ${pageCount}`;
                
                doc.text(footerTextLeft, margin, pageHeight - 10);
                doc.text(footerTextCenter, pageWidth / 2, pageHeight - 10, { align: 'center' });
                doc.text(footerTextRight, pageWidth - margin, pageHeight - 10, { align: 'right' });
            }
        };

        const checkPageBreak = (requiredHeight) => {
            if (yPos + requiredHeight > maxWritableY) {
                doc.addPage();
                isFirstPage = false;
                addHeader();
                yPos = headerHeight + 5;
                return true;
            }
            return false;
        };

        const addSectionTitle = (title) => {
            checkPageBreak(20);
            
            // Title background
            doc.setFillColor(...secondaryColor);
            doc.rect(margin - 3, yPos - 8, pageWidth - 2 * margin + 6, 12, 'F');
            
            // Title text
            doc.setFontSize(13);
            doc.setFont('helvetica', 'bold');
            doc.text(title, margin, yPos);
            
            yPos += 15;
        };

        const addSubsectionTitle = (title) => {
            checkPageBreak(15);
            
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...primaryColor);
            doc.text(title, margin, yPos);
            doc.setTextColor(...darkText);
            
            yPos += 8;
        };

        // Improved paragraph handling with multi-page support
        const addParagraph = (text, spacing = 5, indent = false) => {
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            const lineHeight = 6;
            const maxWidth = pageWidth - 2 * margin - (indent ? 5 : 0);
            
            // Split text into lines
            let lines = doc.splitTextToSize(text, maxWidth);
            let currentLine = 0;
            
            while (currentLine < lines.length) {
                // Calculate space needed for remaining lines
                const remainingLines = lines.length - currentLine;
                const linesThatFit = Math.min(
                    remainingLines,
                    Math.floor((maxWritableY - yPos) / lineHeight)
                );
                
                if (linesThatFit <= 0) {
                    doc.addPage();
                    isFirstPage = false;
                    addHeader();
                    yPos = headerHeight + 5;
                    continue;
                }
                
                // Get current chunk of lines
                const chunk = lines.slice(currentLine, currentLine + linesThatFit);
                
                // Draw bullet for first line if indented
                if (indent && currentLine === 0) {
                    doc.setFont('helvetica', 'bold');
                    doc.text('•', margin - 5, yPos);
                }
                
                // Draw text chunk
                doc.setFont('helvetica', 'normal');
                doc.text(chunk, indent ? margin + 5 : margin, yPos);
                
                // Update positions
                const chunkHeight = chunk.length * lineHeight;
                yPos += chunkHeight;
                currentLine += linesThatFit;
                
                // Add spacing between paragraphs
                if (currentLine >= lines.length) {
                    yPos += spacing;
                }
            }
        };

        const addDivider = () => {
            checkPageBreak(10);
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.5);
            doc.line(margin, yPos, pageWidth - margin, yPos);
            yPos += 10;
        };

        // --- Document Generation Flow ---
        addHeader();

        // 1. Declaration
        const declarationText = `I, ${willData.testator.name}, son of ${willData.testator.fatherName}, residing at ${willData.testator.address} declare this to be my LAST WILL being made on ${new Date(willData.testator.date).toLocaleDateString()}.\n\nI revoke all prior wills, codicils & testamentary dispositions previously made by me. I am in good health and of sound mind, and am not making this will under any persuasion or coercion.\n\nI give, devise and bequeath all remaining movable and immovable assets, financial and physical assets owned by me and belonging to no one else to the following Beneficiaries as mentioned in this Will:`;
        addParagraph(declarationText, 10);

        // 2. Beneficiaries Table
        addSectionTitle('Beneficiaries');
        addParagraph('The following individuals are designated as beneficiaries in this will:', 5);
        
        autoTable(doc, {
            startY: yPos,
            head: [['No', 'Beneficiary', 'Relationship', 'ID Number', 'Residence', 'Age']],
            body: willData.beneficiaries.map((b, i) => [
                i + 1, 
                b.name, 
                b.relationship, 
                b.panAadhar || 'N/A', 
                b.residence || 'N/A', 
                b.age || 'N/A'
            ]),
            theme: 'grid',
            headStyles: { 
                fillColor: primaryColor, 
                textColor: 255,
                fontSize: 10,
                fontStyle: 'bold'
            },
            bodyStyles: { fontSize: 9 },
            alternateRowStyles: { fillColor: lightBg },
            margin: { left: margin, right: margin },
            tableWidth: 'auto',
            styles: { cellPadding: 3 },
            didDrawPage: () => {
                isFirstPage = false;
                addHeader();
            },
            didDrawCell: (data) => {
                // Handle page breaks within tables
                if (data.section === 'body' && data.row.index === data.table.body.length - 1) {
                    yPos = data.cursor.y + 10;
                }
            }
        });
        
        // Update position after table
        if (typeof doc.lastAutoTable === 'undefined' || doc.lastAutoTable.finalY < maxWritableY) {
            yPos = doc.lastAutoTable?.finalY + 15 || yPos;
        } else {
            yPos = headerHeight + 5;
        }

        // 3. Asset Distribution
        addSectionTitle('Asset Distribution');
        addParagraph('Below is the detailed distribution of assets to beneficiaries:');
        
        const categoryHeadings = {
            'I. Financial Assets': ['Bank Accounts', 'Insurance Policies', 'Stocks', 'Mutual Funds'],
            'II. Physical Assets': ['Jewellery', 'Vehicles', 'Artwork'],
            'III. Real Estate': ['House', 'Land', 'Commercial Property'],
        };

        Object.entries(categoryHeadings).forEach(([mainHeading, subCategories]) => {
            const assetsInMainCategory = willData.assets.filter(a => subCategories.includes(a.category));
            if (assetsInMainCategory.length > 0) {
                addSubsectionTitle(mainHeading);

                subCategories.forEach((category, subIndex) => {
                    const assetsInCategory = willData.assets.filter(a => a.category === category);
                    if (assetsInCategory.length > 0) {
                        addSubsectionTitle(`${String.fromCharCode(97 + subIndex)}. ${category}`);
                        
                        const head = [[
                            '#', 
                            assetsInCategory[0].field1_label, 
                            assetsInCategory[0].field2_label, 
                            assetsInCategory[0].field3_label || 'Details', 
                            'Beneficiary', 
                            'Share'
                        ]];
                        
                        const body = assetsInCategory.map((a, i) => [
                            i + 1, 
                            a.field1_value, 
                            a.field2_value, 
                            a.field3_value || 'N/A', 
                            a.beneficiaryName, 
                            `${a.share}%`
                        ]);
                        
                        autoTable(doc, {
                            startY: yPos,
                            head,
                            body,
                            theme: 'grid',
                            headStyles: { 
                                fillColor: secondaryColor, 
                                textColor: darkText,
                                fontSize: 9,
                                fontStyle: 'bold'
                            },
                            bodyStyles: { fontSize: 8.5 },
                            alternateRowStyles: { fillColor: [255, 255, 255] },
                            margin: { left: margin, right: margin },
                            tableWidth: 'auto',
                            styles: { cellPadding: 2.5 },
                            didDrawPage: () => {
                                isFirstPage = false;
                                addHeader();
                            },
                            didDrawCell: (data) => {
                                if (data.section === 'body' && data.row.index === data.table.body.length - 1) {
                                    yPos = data.cursor.y + 12;
                                }
                            }
                        });
                        
                        // Handle table overflow
                        if (doc.lastAutoTable.finalY > maxWritableY) {
                            yPos = headerHeight + 5;
                        } else {
                            yPos = doc.lastAutoTable.finalY + 12;
                        }
                    }
                });
                addDivider();
            }
        });

        // 4. Special Clauses
        addSectionTitle('Special Provisions');
        
        if (willData.residueClause?.beneficiaryName) {
            addParagraph(`Residuary Estate: Any assets not specifically mentioned shall be transferred to ${willData.residueClause.beneficiaryName}.`, 7, true);
        }

        if (willData.guardian?.name) {
            const children = willData.guardian.childrenNames || 'my minor children';
            const guardianText = willData.residueClause?.beneficiaryName
                ? `Guardianship: Should ${willData.residueClause.beneficiaryName} predecease me, I appoint ${willData.guardian.name} (${willData.guardian.relation}) as guardian for ${children} until age 21.`
                : `Guardianship: I appoint ${willData.guardian.name} (${willData.guardian.relation}) as guardian for ${children} until age 21.`;
            
            addParagraph(guardianText + " The guardian shall manage their assets until majority.", 7, true);
        }

        addParagraph(`Debts and Liabilities: All debts, taxes, and administrative expenses shall be paid from the estate before distribution. Beneficiaries shall bear proportional costs.`, 7, true);
        yPos += 5;

        // 5. Executors
        const primaryExecutor = willData.executors.find(e => !e.isAlternate);
        const alternateExecutor = willData.executors.find(e => e.isAlternate);
        
        let executorText = `Executor Appointment: I appoint ${primaryExecutor.name} (${primaryExecutor.relation || 'executor'}), residing at ${primaryExecutor.address}, as primary executor.`;
        
        if (alternateExecutor) {
            executorText += ` Should they be unable to serve, ${alternateExecutor.name} (${alternateExecutor.relation || 'executor'}) shall act as executor.`;
        }
        
        addParagraph(executorText, 10, true);

        // 6. Signature Block
        addSectionTitle('Execution');
        addParagraph(`Executed by me on ${new Date().toLocaleDateString()} at ________________________ in the presence of witnesses:`);
        yPos += 20;

        // Witness signatures
        const signatureBlock = (title, startX, startY, width = 100) => {
            // Title
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text(title, startX + width/2, startY - 5, { align: 'center' });
            
            // Signature line
            doc.setDrawColor(120, 120, 120);
            doc.line(startX, startY, startX + width, startY);
            
            // Details
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.text('Name:', startX, startY + 10);
            doc.text('Address:', startX, startY + 20);
            doc.text('Date:', startX, startY + 30);
        };

        // Witnesses side-by-side
        signatureBlock('Witness 1', margin, yPos);
        signatureBlock('Witness 2', pageWidth - margin - 100, yPos);
        
        // Testator centered
        yPos += 50;
        signatureBlock('Testator', (pageWidth - 100) / 2, yPos);
        yPos += 40;

        // --- Finalize Document ---
        addFooter();
        doc.save(`Will_${willData.testator.name.replace(/\s+/g, '_')}.pdf`);
        resolve();
    });
};