import React, { useState, useEffect } from 'react';
import { permitData } from './data';
import { SortOrder, PermitRecord } from "./types";
import { getPermitForecast } from './helpers';
import { ArrowsUpDown } from "../design/icons/ArrowsUpDown";
import { DatePicker } from "../design/DatePicker";
import { Header } from "../design/Header";
import { Switcher } from "../design/Switcher";


/* This is your top-level component for page content. This scaffold
 * includes some basic components to get you started, but you are
 * free to change them as you see fit.
 *
 * Refer to the README for requirements for your final product.  */
export function Forecast() {
  const [kickoffDate, setKickoffDate] = useState(new Date());
  const [forecastData, setForecastData] = useState<PermitRecord[]>([]);
  const [sortOrder, setSortOrder] = useState(SortOrder.Submit);

  useEffect(() => {
    let sortedData = getPermitForecast(permitData, kickoffDate);

    // Sort based on sortOrder
    sortedData = sortedData.sort((a, b) => {
      if (sortOrder === SortOrder.Submit) {
        return (a.submitDate?.getTime() || 0) - (b.submitDate?.getTime() || 0);
      } else {
        return (a.approvalDate?.getTime() || 0) - (b.approvalDate?.getTime() || 0);
      }
    });
    setForecastData(sortedData);
  }, [kickoffDate, sortOrder]);

  const onDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setKickoffDate(newDate);
    }
  };

  // Calculate the project approval date
  const projectApprovalDate = forecastData.reduce((latest, permit) => {
    const approvalDate = permit.approvalDate ? new Date(permit.approvalDate) : new Date(0);
    return approvalDate > latest ? approvalDate : latest;
  }, new Date(0));

  return (
    <div className="flex flex-col flex-1 h-screen">
      <div className="flex flex-col border-b bg-white">
        <Header title="Project Forecast" />
      </div>
      <div className="flex flex-col flex-1 bg-[#F8FDFF]">
        <div className="flex justify-center align-middle p-8 w-screen">
          <div className="max-w-4xl w-full flex flex-col space-y-8">
            <ProjectKickoffInput kickoffDate={kickoffDate} onDateChange={onDateChange} />
            <ProjectApprovalCallout approvalDate={projectApprovalDate} />
            <PermitTable permits={forecastData} sortOrder={sortOrder} setSortOrder={setSortOrder} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectKickoffInput({ kickoffDate, onDateChange }: { kickoffDate: Date, onDateChange: (date: Date | undefined) => void }) {
  return (
    <div className="flex flex-row justify-end">
      <div className="flex flex-row space-x-4 items-center">
        <div className="text-md text-gray-500 whitespace-nowrap">
          Set your project kick off date
        </div>
        <DatePicker
          value={kickoffDate}
          onChange={onDateChange}
        />
      </div>
    </div>
  );
}

function ProjectApprovalCallout({ approvalDate }: { approvalDate: Date }) {
  return (
    <div className="text-md text-gray p-4 bg-cobalt-5 rounded-lg">
      We expect this project to be fully approved by{" "}
      <span className="font-semibold">
        {approvalDate.toLocaleDateString("en-US")}
      </span>
    </div>
  );
}

function PermitTable({ permits, sortOrder, setSortOrder }: { permits: PermitRecord[], sortOrder: SortOrder, setSortOrder: (sortOrder: SortOrder) => void }) {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-row justify-between items-end">
        <div className="text-2xl font-semibold">Your Permits</div>
        <div className="flex flex-row space-x-4 items-center">
          <ArrowsUpDown className="w-4 h-4" />
          <Switcher
            value={sortOrder}
            onChange={(value) => setSortOrder(value)}
            options={[
              { value: SortOrder.Submit, label: SortOrder.Submit },
              { value: SortOrder.Approval, label: SortOrder.Approval },
            ]}
          />
        </div>
      </div>
      <div className="flex flex-col border rounded-lg divide-y bg-white">
        <div className="grid grid-cols-3 p-4 items-center text-gray-500 text-sm">
          <div className="col-span-1">Permit Name</div>
          <div className="col-span-2 flex justify-center ">
            Forecasted Submit Date - Earliest Approval Date
          </div>
        </div>
        {permits.map((permit: PermitRecord) => (
          <div key={permit.id} className="grid grid-cols-3 p-4 items-centertext-md">
            <div className="font-semibold col-span-1">{permit.name}</div>
            <div className="col-span-2 flex justify-center">
              {permit.submitDate ? new Date(permit.submitDate).toLocaleDateString("en-US") : 'N/A'} -{" "}
              {permit.approvalDate ? new Date(permit.approvalDate).toLocaleDateString("en-US") : 'N/A'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
