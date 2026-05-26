import * as ExcelJS from 'exceljs';
export declare class ExportService {
    generateBeneficiariesExcel(): Promise<ExcelJS.Buffer>;
    generateAppointmentsExcel(): Promise<ExcelJS.Buffer>;
}
