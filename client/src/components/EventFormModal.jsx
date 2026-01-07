// src/components/EventFormModal.jsx
import React, { useEffect, useMemo, useState } from "react";
import { X, Calendar, Clock, Plus, Check } from "lucide-react";

const Field = ({ label, icon, children }) => (
  <div>
    <div className="text-xs text-gray-500 dark:text-gray-400 inline-flex items-center gap-2">
      {icon}
      {label}
    </div>
    <div className="mt-1">{children}</div>
  </div>
);

const todayKey = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const EventFormModal = ({ open, onClose, onSubmit, initial = null }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(""); // YYYY-MM-DD
  const [time, setTime] = useState(""); // HH:mm

  const minDate = useMemo(() => todayKey(), []);

  useEffect(() => {
    if (!open) return;
    setTitle(initial?.title || "");
    setDate(initial?.date || minDate);
    setTime(initial?.time || "");
  }, [open, initial, minDate]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();

    if (!title.trim()) return alert("Title is required");
    if (!date) return alert("Date is required");

    // block past
    if (date < minDate) return alert("You cannot create events in past days.");

    onSubmit({
      title: title.trim(),
      date,
      time: time?.trim() || "",
    });
  };

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-0 grid place-items-center p-3">
        <div className="w-full max-w-lg rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] shadow-xl overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
            <div className="font-bold text-gray-900 dark:text-white">Add Event</div>
            <button
              onClick={onClose}
              className="h-9 w-9 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 grid place-items-center"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <form onSubmit={submit} className="p-4 space-y-4">
            <Field label="Title" icon={<Plus className="w-4 h-4" />}>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-10 px-3 rounded-xl text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Event title..."
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Date" icon={<Calendar className="w-4 h-4" />}>
                <input
                  type="date"
                  min={minDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none"
                />
              </Field>

              <Field label="Time (optional)" icon={<Clock className="w-4 h-4" />}>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none"
                />
              </Field>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="h-10 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1016] hover:bg-gray-50 dark:hover:bg-white/5 transition text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-10 px-4 rounded-xl bg-primary text-white hover:bg-primary/90 transition text-sm font-semibold inline-flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventFormModal;
