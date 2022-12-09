import React, { useEffect } from 'react';
import axiosInstance from 'main/axios';
import useAuth from 'shared/hooks/useAuth';
import FileSaver from 'file-saver';
import { useState } from 'react';

const Invoice = () => {
  const user = useAuth();
  const [invoiceErr, setInvoiceErr] = useState(false);

  const fetchInvoice = async () => {
    const invoice = await axiosInstance
      .get(`/api/trade/invoice/${user.clientId}`, { responseType: 'blob' })
      .catch(e => {
        setInvoiceErr(true);
      });
    const file = new Blob([invoice.data], { type: 'application/pdf' });
    const fileUrl = window.URL.createObjectURL(file);
    const iframe = document.querySelector('iframe');
    if (iframe?.src) iframe.src = fileUrl + '#toolbar=0&navpanes=1';
  };

  const downloadInvoice = async () => {
    const response = await axiosInstance.get(`/api/trade/invoice/${user.clientId}`, {
      responseType: 'blob',
    });

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const fileName = `${user.clientId}_${year}${month}.pdf`;

    return FileSaver.saveAs(response.data, fileName);
  };

  useEffect(() => {
    fetchInvoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-scroll">
      <div className="flex justify-between p-6">
        <h6 className="my-4 text-xl font-bold tracking-tight text-white">Invoice</h6>
        <button
          onClick={() => downloadInvoice()}
          className="bg-[#4ea35f] px-6 rounded-xl text-white shadow-xl hover:shadow-inner transition duration-500">
          Export
        </button>
      </div>

      <div className="px-16 flex flex-end justify-center mb-12">
        {invoiceErr ? (
          <div className="bg-white shadow flex p-8 items-center my-5 rounded-lg justify-center">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-red-400">Invoice Not found</h5>
          </div>
        ) : (
          <iframe title="invoice" src="" width="595px" height="842px">Loading...</iframe>
        )}
      </div>
    </div>
  );
};

export default Invoice;
