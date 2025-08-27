import { getAnalysesById } from './getAnalysesById';
import { getAnalysis } from './getAnalysis';
import { remove } from './remove';
import { uploadFile } from './upload';

export const leadsService = {
  remove,
  uploadFile,
  getAnalysis,
  getAnalysesById,
};