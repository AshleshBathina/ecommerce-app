import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { userApi } from "../lib/api"
import { useNavigate } from "react-router"
import {
  ArrowLeft,
  MapPin,
  Plus,
  X,
  PenLine,
  Trash2,
  Home,
  Briefcase,
  Building2,
} from "lucide-react"

/* ─── helpers ─────────────────────────────────────────────── */

const LABEL_ICONS = {
  Home: <Home className="size-4" />,
  Work: <Briefcase className="size-4" />,
  Office: <Building2 className="size-4" />,
}

const getLabelIcon = (label = "") =>
  LABEL_ICONS[label] ?? <MapPin className="size-4" />

const EMPTY_FORM = {
  label: "",
  fullName: "",
  streetAddress: "",
  city: "",
  state: "",
  zipCode: "",
  phoneNumber: "",
  isDefault: false,
}

/* ─── AddressCard ──────────────────────────────────────────── */

const AddressCard = ({ address, onEdit, onDelete, isDeleting }) => (
  <div className="bg-[#1C1C1E] rounded-2xl p-4 space-y-3">
    {/* Header row */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-green-600/20 text-green-500">
          {getLabelIcon(address.label)}
        </div>
        <span className="text-white font-semibold text-base">{address.label}</span>
      </div>
      {address.isDefault && (
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-600 text-white">
          Default
        </span>
      )}
    </div>

    {/* Address details */}
    <div className="space-y-0.5 text-sm text-white/60">
      <p className="text-white/90 font-medium">{address.fullName}</p>
      <p>{address.streetAddress}</p>
      <p>
        {address.city}, {address.state} {address.zipCode}
      </p>
      <p>{address.phoneNumber}</p>
    </div>

    {/* Action buttons */}
    <div className="grid grid-cols-2 gap-2 pt-1">
      <button
        onClick={() => onEdit(address)}
        className="flex items-center justify-center gap-1.5 py-2 rounded-xl border border-green-600 text-green-500 text-sm font-semibold hover:bg-green-600/10 active:scale-95 transition-all"
      >
        <PenLine className="size-3.5" />
        Edit
      </button>
      <button
        onClick={() => onDelete(address._id)}
        disabled={isDeleting}
        className="flex items-center justify-center gap-1.5 py-2 rounded-xl border border-red-700 text-red-500 text-sm font-semibold hover:bg-red-900/20 active:scale-95 transition-all disabled:opacity-50"
      >
        <Trash2 className="size-3.5" />
        Delete
      </button>
    </div>
  </div>
)

/* ─── AddressForm (bottom sheet on mobile / modal on desktop) ─ */

const FIELD_CONFIGS = [
  { key: "label", label: "Label", placeholder: "e.g., Home, Work, Office", type: "text" },
  { key: "fullName", label: "Full Name", placeholder: "Enter your full name", type: "text" },
  { key: "streetAddress", label: "Street Address", placeholder: "Street address, apt/suite number", type: "text" },
  { key: "city", label: "City", placeholder: "e.g., New York", type: "text" },
  { key: "state", label: "State", placeholder: "e.g., NY", type: "text" },
  { key: "zipCode", label: "ZIP Code", placeholder: "e.g., 10001", type: "text" },
  { key: "phoneNumber", label: "Phone Number", placeholder: "+1 (555) 123-4567", type: "tel" },
]

const AddressForm = ({ initial, onSave, onClose, isSaving }) => {
  const [form, setForm] = useState(initial ?? EMPTY_FORM)

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Sheet / modal */}
      <div className="relative w-full md:max-w-lg bg-[#1C1C1E] rounded-t-3xl md:rounded-3xl p-6 md:mx-4 z-10 max-h-[92dvh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-xl">
            {initial ? "Edit Address" : "Add New Address"}
          </h2>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {FIELD_CONFIGS.map(({ key, label, placeholder, type }) => (
            <div key={key}>
              <label className="block text-white/70 text-sm mb-1.5 font-medium">
                {label}
              </label>
              <input
                type={type}
                value={form[key]}
                onChange={(e) => set(key, e.target.value)}
                placeholder={placeholder}
                required
                className="w-full bg-[#2C2C2E] text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
              />
            </div>
          ))}

          {/* Default toggle */}
          <div className="flex items-center justify-between py-2">
            <span className="text-white/80 text-sm font-medium">
              Set as default address
            </span>
            <button
              type="button"
              onClick={() => set("isDefault", !form.isDefault)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.isDefault ? "bg-green-600" : "bg-white/20"
                }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${form.isDefault ? "translate-x-6" : "translate-x-1"
                  }`}
              />
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-white/20 text-white/70 text-sm font-semibold hover:bg-white/5 active:scale-95 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-3 rounded-xl bg-green-600 text-white text-sm font-bold hover:bg-green-500 active:scale-95 transition-all disabled:opacity-60"
            >
              {isSaving ? "Saving…" : "Save Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ─── main page ──────────────────────────────────────────────── */

const AddressesPage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [showForm, setShowForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null) // null = add mode

  /* ── queries ── */
  const { data: addresses = [], isLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: userApi.getAddresses,
  })

  /* ── mutations ── */
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["addresses"] })

  const addMutation = useMutation({
    mutationFn: userApi.addAddress,
    onSuccess: () => { invalidate(); closeForm() },
  })

  const updateMutation = useMutation({
    mutationFn: userApi.updateAddress,
    onSuccess: () => { invalidate(); closeForm() },
  })

  const deleteMutation = useMutation({
    mutationFn: userApi.deleteAddress,
    onSuccess: invalidate,
  })

  /* ── handlers ── */
  const openAddForm = () => {
    setEditingAddress(null)
    setShowForm(true)
  }

  const openEditForm = (address) => {
    setEditingAddress(address)
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingAddress(null)
  }

  const handleSave = (formData) => {
    if (editingAddress) {
      updateMutation.mutate({ addressId: editingAddress._id, ...formData })
    } else {
      addMutation.mutate(formData)
    }
  }

  const handleDelete = (addressId) => {
    if (window.confirm("Delete this address?")) {
      deleteMutation.mutate(addressId)
    }
  }

  const isSaving = addMutation.isPending || updateMutation.isPending

  /* ── loading skeleton ── */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] pt-7 pb-28 md:pb-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
            <div className="h-6 w-32 bg-white/10 rounded-lg animate-pulse" />
          </div>
          {[1, 2].map((i) => (
            <div key={i} className="bg-[#1C1C1E] rounded-2xl p-4 mb-3 space-y-2 animate-pulse">
              <div className="h-4 w-24 bg-white/10 rounded" />
              <div className="h-3 w-40 bg-white/10 rounded" />
              <div className="h-3 w-32 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] pb-40 md:pb-10 pt-7">
      <div className="max-w-2xl mx-auto px-4">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/10 active:scale-95 transition-all text-white"
            >
              <ArrowLeft className="size-5" />
            </button>
            <h1 className="text-white font-bold text-xl">My Addresses</h1>
          </div>

          {/* Desktop: Add button in header */}
          {addresses.length > 0 && (
            <button
              onClick={openAddForm}
              className="hidden md:flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-xl active:scale-95 transition-all"
            >
              <Plus className="size-4" />
              Add Address
            </button>
          )}
        </div>

        {/* ── Empty State ── */}
        {addresses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/5">
              <MapPin className="size-10 text-white/25" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-white font-semibold text-lg">No addresses yet</p>
              <p className="text-white/40 text-sm mt-1">Add your first delivery address</p>
            </div>
            <button
              onClick={openAddForm}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-full active:scale-95 transition-all"
            >
              Add Address
            </button>
          </div>
        ) : (
          <>
            {/* ── Desktop: grid layout / Mobile: single column ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {addresses.map((address) => (
                <AddressCard
                  key={address._id}
                  address={address}
                  onEdit={openEditForm}
                  onDelete={handleDelete}
                  isDeleting={deleteMutation.isPending && deleteMutation.variables === address._id}
                />
              ))}
            </div>

            {/* spacer so cards don't hide behind fixed button on mobile */}
            <div className="h-2 md:hidden" />

            {/* ── Desktop: separate add card below grid ── */}
            <button
              onClick={openAddForm}
              className="mt-4 hidden md:flex w-full items-center justify-center gap-2 border-2 border-dashed border-white/15 hover:border-green-600/60 hover:bg-green-600/5 text-white/40 hover:text-green-500 font-semibold py-5 rounded-2xl active:scale-95 transition-all"
            >
              <Plus className="size-5" />
              Add New Address
            </button>
          </>
        )}
      </div>

      {/* ── Mobile: fixed bottom Add button ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 px-4 pb-6 pt-3 bg-linear-to-t from-[#0F0F0F] via-[#0F0F0F]/90 to-transparent pointer-events-none">
        <button
          onClick={openAddForm}
          className="pointer-events-auto w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-2xl active:scale-95 transition-all shadow-xl shadow-green-900/30"
        >
          <Plus className="size-5" />
          Add New Address
        </button>
      </div>

      {/* ── Form modal / bottom sheet ── */}
      {showForm && (
        <AddressForm
          initial={
            editingAddress
              ? {
                label: editingAddress.label,
                fullName: editingAddress.fullName,
                streetAddress: editingAddress.streetAddress,
                city: editingAddress.city,
                state: editingAddress.state,
                zipCode: editingAddress.zipCode,
                phoneNumber: editingAddress.phoneNumber,
                isDefault: editingAddress.isDefault,
              }
              : null
          }
          onSave={handleSave}
          onClose={closeForm}
          isSaving={isSaving}
        />
      )}
    </div>
  )
}

export default AddressesPage
