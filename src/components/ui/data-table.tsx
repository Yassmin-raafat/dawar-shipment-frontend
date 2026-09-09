import type { ReactNode } from "react";

export type DataTableColumn<TData> = {
  key: string;
  header: string;
  cell: (row: TData) => ReactNode;
  className?: string;
};

type DataTableProps<TData> = {
  columns: DataTableColumn<TData>[];
  data: TData[];
  emptyMessage?: string;
  getRowKey: (row: TData) => string;
};

export default function DataTable<TData>({
  columns,
  data,
  emptyMessage = "No data found.",
  getRowKey,
}: DataTableProps<TData>) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-secondary">
            <tr>
              {columns.map((column) => (
                <th
                  className={`border-b border-border px-5 py-4 text-left text-[12px] font-semibold uppercase tracking-normal text-text-secondary ${
                    column.className ?? ""
                  }`}
                  key={column.key}
                  scope="col"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {data.length > 0 ? (
              data.map((row) => (
                <tr
                  className="transition hover:bg-secondary/50"
                  key={getRowKey(row)}
                >
                  {columns.map((column) => (
                    <td
                      className={`px-5 py-4 text-[14px] text-text-primary ${
                        column.className ?? ""
                      }`}
                      key={column.key}
                    >
                      {column.cell(row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-5 py-10 text-center text-[14px] text-text-secondary"
                  colSpan={columns.length}
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
