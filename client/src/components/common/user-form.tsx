"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FormState {
  username: string
  email: string
  password: string
  role: string
}

interface Props {
  form: FormState
  setForm: (f: FormState | ((p: FormState) => FormState)) => void
  editing: boolean
}

export default function UserForm({ form, setForm, editing }: Props) {
  const update = (field: keyof FormState, value: any) =>
    setForm((p) => ({ ...p, [field]: value }))

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Username</Label>
          <Input value={form.username} onChange={(e) => update("username", e.target.value)} required />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
        </div>
      </div>
      <div>
        <Label>Password {editing && "(leave empty to keep current)"}</Label>
        <Input type="password" value={form.password} onChange={(e) => update("password", e.target.value)} required={!editing} />
      </div>
      <div>
        <Label>Role</Label>
        <Select value={form.role} onValueChange={(v) => update("role", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="User">User</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
