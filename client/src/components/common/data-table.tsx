"use client"

import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"

interface Column {
  key: string
  label: string
  render?: (row: any) => React.ReactNode
}

interface Props {
  columns: Column[]
  data: any[]
  loading: boolean
  onEdit: (item: any) => void
  onDelete: (id: number) => void
}

export default function DataTable({ columns, data, loading, onEdit, onDelete }: Props) {
  if (loading) return <div className="px-4 py-8 text-center text-slate-500">Loading...</div>
  if (!data.length) return <div className="px-4 py-8 text-center text-slate-500">No items found</div>

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50 border-b">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-3 text-left text-sm font-medium">{c.label}</th>
            ))}
            <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3 text-sm">
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
              <td className="px-4 py-3 flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => onEdit(row)} className="text-blue-600">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(row.id)} className="text-rose-600 hover:text-rose-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
