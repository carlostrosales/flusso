import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type Block = {
    id: string;
    content: string;
    type: 'paragraph' | 'prompt' | 'response';
  };

interface Document {
  documentId: string;
  title: string;
  blocks: Block[];
}

interface CreateDocumentRequest {
    title: string;
    blocks?: Block[];
}

const documentBaseUrl = 'http://localhost:8081/';


// Define a service using a base URL and expected endpoints
export const documentApi = createApi({
    reducerPath: 'documentApi',
    baseQuery: fetchBaseQuery({ baseUrl: documentBaseUrl}),
    endpoints: (build) => ({
        getDocumentById: build.query<Document, string>({query: (id: string) => `documents/${id}` }),
        
    }),
})

export const { useGetDocumentByIdQuery } = documentApi