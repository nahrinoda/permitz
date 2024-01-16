import { ArrowsUpDown } from "../design/icons/ArrowsUpDown";
import { DatePicker } from "../design/DatePicker";
import { Header } from "../design/Header";
import { Switcher } from "../design/Switcher";
import { SortOrder } from "./types";

/* This is your top-level component for page content. This scaffold
 * includes some basic components to get you started, but you are
 * free to change them as you see fit.
 *
 * Refer to the README for requirements for your final product.  */
export function Forecast() {
  return (
    <div className="flex flex-col flex-1 h-screen">
      <div className="flex flex-col border-b bg-white">
        <Header title="Project Forecast" />
      </div>
      <div className="flex flex-col flex-1 bg-[#F8FDFF]">
        <div className="flex justify-center align-middle p-8 w-screen">
          <div className="max-w-4xl w-full flex flex-col space-y-8">
            {/* TODO: connect this component to your forecast calculations */}
            <ProjectKickoffInput />
            {/* TODO: replace with the project's approval date once implemented. */}
            <ProjectApprovalCallout approvalDate={new Date("01-20-2024")} />
            <PermitTable />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectKickoffInput() {
  return (
    <div className="flex flex-row justify-end">
      <div className="flex flex-row space-x-4 items-center">
        <div className="text-md text-gray-500 whitespace-nowrap">
          Set your project kick off date
        </div>
        <DatePicker
          value={new Date()}
          onChange={(value) => {          }}
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

function PermitTable() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-row justify-between items-end">
        <div className="text-2xl font-semibold">Your Permits</div>
        <div className="flex flex-row space-x-4 items-center">
          <ArrowsUpDown className="w-4 h-4" />
          {/* TODO - make the switcher change the sort order of the permit table */}
          <Switcher
            value={SortOrder.Submit}
            onChange={(value) => console.log(`Sort order changed to ${value}`)}
            options={[
              {
                value: SortOrder.Submit,
                label: SortOrder.Submit,
              },
              {
                value: SortOrder.Approval,
                label: SortOrder.Approval,
              },
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
        <div className="grid grid-cols-3 p-4 items-centertext-md">
          <div className="font-semibold col-span-1">Sample Permit</div>
          <div className="col-span-2 flex justify-center">
            {new Date("12-10-2022").toLocaleDateString("en-US")} -{" "}
            {new Date("01-20-2023").toLocaleDateString("en-US")}
          </div>
        </div>
      </div>
    </div>
  );
}
