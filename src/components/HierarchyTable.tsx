// Import
import React, { useState } from 'react';
import { IRecord } from '@/types';
import { useDispatch } from 'react-redux';
import { deleteTableData } from '@/store/tableDataSlice';
import Icon from '@/components/Icon';
import Button from '@/components/Button.tsx';

// Interface
interface HierarchyTableProps {
  data: IRecord[];
  level?: number;
}

// Component
const HierarchyTable: React.FC<HierarchyTableProps> = ({ data, level = 0 }) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteTableData(id));
  };

  const hasChildren = (record: IRecord) => record.children && Object.keys(record.children).length > 0;

  const toggleExpand = (index: string) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const keys = Object.keys(data[0].data);

  return (
    <table className="border-collapse w-full">
      <thead>
        <tr className="bg-emerald-300">
          <th className="p-2"></th>
          {keys.map((key) => (
            <th key={key} className="p-2">
              {key}
            </th>
          ))}
          <th className="p-2">Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((record) => {
          return (
            <React.Fragment key={record.data.ID}>
              <tr className="bg-gray-600 even:bg-gray-500 text-white">
                <td className="p-2 text-center">
                  {hasChildren(record) && (
                    <Button
                      onClick={() => toggleExpand(record.data.ID)}
                      className="text-white" // Odstraňte cursor-pointer, je již v komponentě Button
                      ariaLabel={expanded[record.data.ID] ? 'Collapse row' : 'Expand row'}
                      ariaExpanded={expanded[record.data.ID]}
                    >
                      {expanded[record.data.ID] ? (
                        <Icon className="size-4" svg="iconChevronUp" />
                      ) : (
                        <Icon className="size-4" svg="iconChevronDown" />
                      )}
                    </Button>
                  )}
                </td>
                {keys.map((key) => (
                  <td key={key} className="p-2 text-center">
                    {/* Ověření, zda record.data existuje */}
                    {record?.data && record.data[key] ? String(record.data[key]) : 'N/A'}
                  </td>
                ))}
                <td className="p-2 text-center">
                  <Button
                    type="button"
                    className="text-red-500 hover:text-red-400"
                    aria-label="deleteRow"
                    onClick={() => handleDelete(record.data?.ID)}
                  >
                    <Icon className="size-4" svg="iconDelete" />
                  </Button>
                </td>
              </tr>

              {/* Childrens */}
              {expanded[record.data.ID] && record.children && Object.values(record.children).length > 0 && (
                <tr>
                  <td colSpan={keys.length + 1} className={'p-4 text-center'}>
                    <HierarchyTable data={Object.values(record.children)[0]?.records || []} level={level + 1} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default HierarchyTable;
