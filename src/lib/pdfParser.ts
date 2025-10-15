// PDF Parser utility to handle pdf-parse import issues with Turbopack

export async function parsePDF(buffer: Buffer): Promise<{ text: string }> {
  try {
    // Dynamic import to avoid ESM issues with Turbopack
    const pdfParse = await import('pdf-parse');
    // Type assertion to handle both default and named exports
    const pdf = (pdfParse as any).default || pdfParse;
    return await pdf(buffer);
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF file');
  }
}
