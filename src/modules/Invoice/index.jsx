import React, { useEffect } from 'react';
import axiosInstance from 'main/axios';
import useAuth from 'shared/hooks/useAuth';
import FileSaver from 'file-saver';

const Invoice = () => {
  const user = useAuth();

  const fetchInvoice = async () => {
    const invoice = await axiosInstance.get(`/api/trade/invoice/${user.clientId}`, { responseType: 'blob' });
    const file = new Blob([invoice.data], { type: 'application/pdf' });
    const fileUrl = window.URL.createObjectURL(file);
    const iframe = document.querySelector('iframe');
    if (iframe?.src) iframe.src = fileUrl + '#toolbar=0&navpanes=1';
  };

  const downloadInvoice = async () => {
    const response = await axiosInstance.get(`/api/trade/invoice/${user.clientId}`, {
      responseType: 'blob',
    });

    return FileSaver.saveAs(response.data, 'test.pdf');
  };

  useEffect(() => {
    fetchInvoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between p-6">
        <h6 className="my-4 text-xl font-bold tracking-tight text-white">Invoice</h6>
        <button
          onClick={() => downloadInvoice()}
          className="bg-[#4ea35f] px-6 rounded-xl text-white shadow-xl hover:shadow-inner transition duration-500">
          Export
        </button>
      </div>

      <div className="px-16 flex flex-end justify-center h-10">
        <iframe title="invoice" src="#toolbar=0" width="100%" height="600px"></iframe>
      </div>
    </div>
  );
};

export default Invoice;
